import type { Request, Response, Application } from "express";
import { z } from "zod";
import {
  SYSTEM_INSTRUCTION,
  OFF_TOPIC_REPLY,
  CODE_REQUEST_REPLY,
  OUT_OF_STACK_REPLY,
} from "./profile";

const AskSchema = z.object({
  question: z.string().min(1).max(400),
});

function normalize(text: string) {
  return text.trim().toLowerCase();
}

function isGreeting(q: string) {
  const t = normalize(q);
  return /^(hi|hello|hey|hii|hiii|good morning|good afternoon|good evening|namaste|yo)\b/.test(
    t
  );
}

function isOffTopic(q: string) {
  const t = normalize(q);
  const mentionsPrasad = /(prasad|kadam|you|your|portfolio|resume|cv)/.test(t);
  const offTopicPatterns = [
    /(capital|president|prime minister|population|weather|temperature|forecast)/,
    /(news|stock|crypto|bitcoin|football|cricket|movie|song|lyrics|math|equation)/,
  ];
  return !mentionsPrasad && offTopicPatterns.some((re) => re.test(t));
}

function isCodeLikeRequest(q: string) {
  const t = normalize(q);
  return /(code|html|css|javascript|typescript|react component|return me|give me|generate|build).*portfolio/.test(
    t
  );
}

function isCodeQuestion(q: string) {
  const t = normalize(q);
  const stack = [
    "react",
    "node",
    "express",
    "javascript",
    "typescript",
    "tailwind",
    "postgres",
    "postgresql",
    "firebase",
    "mongodb",
    "mongo",
    "redux",
    "socket",
    "vite",
    "docker",
    "graphql",
    "redis",
    "backend",
    "frontend",
    "api",
    "database",
    "auth",
    "authentication",
    "deploy",
    "deployment",
    "function",
    "component",
    "hook",
    "state",
    "database",
    "query",
    "rest api",
  ];
  return stack.some((tech) => t.includes(tech));
}

function isOutOfStack(q: string) {
  const t = normalize(q);
  const nonStack = [
    "rust",
    "go ",
    "golang",
    "php",
    "laravel",
    "django",
    "flask",
    "rails",
    "ruby",
    "swift",
    "kotlin",
    "android",
    "ios",
    "flutter",
    "swiftui",
  ];
  for (const tech of nonStack) {
    if (t.includes(tech)) return tech.trim();
  }
  return null;
}

type AiProviderConfig = {
  name: string;
  apiKey: string;
  baseUrl: string;
  model: string;
};

type AiConfig = {
  primary: AiProviderConfig;
  codingFirst?: AiProviderConfig;
  fallbacks: AiProviderConfig[];
};

const REQUEST_TIMEOUT_MS = 20_000;
const MAX_ATTEMPTS = 3;
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

function getProviderFailureSummary(error: unknown) {
  if (error instanceof Error && error.name === "AbortError") {
    return "request timed out";
  }

  const status = (error as { status?: unknown })?.status;
  if (typeof status === "number") {
    return `HTTP ${status}`;
  }

  if (error instanceof TypeError) {
    return "network error";
  }

  return "invalid or empty response";
}

async function fetchProviderAnswer({
  question,
  provider,
}: {
  question: string;
  provider: AiProviderConfig;
}) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(provider.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${provider.apiKey}`,
        },
        body: JSON.stringify({
          model: provider.model,
          messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            { role: "user", content: question },
          ],
          temperature: 0.6,
          max_tokens: 2000,
        }),
        signal: controller.signal,
      });

      const rawText = await response.text();
      let data: any = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch {
        // keep data null if parsing fails
      }

      if (!response.ok) {
        const err: any = new Error(
          data?.error?.message ||
            data?.message ||
            `${provider.name} request failed (${response.status})`
        );
        err.status = response.status;
        err.retryable = RETRYABLE_STATUSES.has(response.status);
        throw err;
      }

      const answer = (data?.choices?.[0]?.message?.content || "").trim();
      if (!answer) {
        const err: any = new Error(`No answer returned from ${provider.name}`);
        err.status = response.status;
        err.retryable = RETRYABLE_STATUSES.has(response.status);
        throw err;
      }

      const finishReason = data?.choices?.[0]?.finish_reason;
      const usage = data?.usage;

      console.log(`[AI] ${provider.name} finish:`, finishReason);
      console.log(`[AI] ${provider.name} usage:`, usage);

      return answer;
    } catch (error: any) {
      if (error?.retryable && attempt < MAX_ATTEMPTS) {
        const delayMs = 500 * 2 ** (attempt - 1);
        console.warn(
          `[AI] ${provider.name} failed (${error.status}), retrying in ${delayMs}ms (attempt ${attempt}/${MAX_ATTEMPTS})`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}

async function fetchAnswer({
  question,
  config,
}: {
  question: string;
  config: AiConfig;
}) {
  const chain = [config.primary, ...config.fallbacks];
  if (config.codingFirst && isCodeQuestion(question)) {
    chain.unshift(config.codingFirst);
  }

  let lastSummary = getProviderFailureSummary(new Error("unknown"));

  for (const provider of chain) {
    try {
      return await fetchProviderAnswer({ question, provider });
    } catch (providerError) {
      lastSummary = getProviderFailureSummary(providerError);
      console.error(`[AI] ${provider.name} failed: ${lastSummary}`);
    }
  }

  const err: any = new Error(
    "AI providers are temporarily unavailable. Please try again later."
  );
  err.status = 503;
  throw err;
}

export function registerAskRoute(app: Application, config: AiConfig) {
  app.post("/ask", async (req: Request, res: Response) => {
    try {
      const { question } = AskSchema.parse(req.body);

      if (isGreeting(question)) {
        return res.json({
          answer:
            "Hi! I’m PrasadGPT (speaking as Prasad Kadam). I can tell you about my skills, projects, and experience — what do you want to know?",
        });
      }

      if (isOffTopic(question)) {
        return res.json({ answer: OFF_TOPIC_REPLY });
      }

      if (isCodeLikeRequest(question)) {
        return res.json({ answer: CODE_REQUEST_REPLY });
      }

      const outOfStack = isOutOfStack(question);
      if (outOfStack) {
        return res.json({ answer: OUT_OF_STACK_REPLY(outOfStack) });
      }

      const answer = await fetchAnswer({ question, config });

      return res.json({ answer });
    } catch (err: any) {
      let msg =
        err?.issues?.[0]?.message ||
        err?.message ||
        "AI error";

      console.error("Error:", msg);
      const status = err?.issues
        ? 400
        : typeof err?.status === "number"
          ? err.status
          : 500;

      return res.status(status).json({ error: msg });
    }
  });
}
