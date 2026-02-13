import type { Request, Response, Application } from "express";
import { z } from "zod";
import { SYSTEM_INSTRUCTION } from "./profile";

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

type AiConfig = {
  zaiApiKey: string;
  zaiBaseUrl: string;
};

// const REQUEST_TIMEOUT_MS = 20_000;

async function fetchAnswer({
  question,
  config,
}: {
  question: string;
  config: AiConfig;
}) {
  const controller = new AbortController();
  // const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(config.zaiBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.zaiApiKey}`,
      },
      body: JSON.stringify({
        model: "glm-4.7-flash",
        messages: [
          { role: "system", content: SYSTEM_INSTRUCTION },
          { role: "user", content: question },
        ],
        temperature: 0.6,
        max_tokens: 800,
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
          `Z.AI request failed (${response.status})`
      );
      err.status = response.status;
      err.raw = data;
      throw err;
    }

    const answer = (data?.choices?.[0]?.message?.content || "").trim();
    if (!answer) {
      const err: any = new Error("No answer returned from Z.AI");
      err.status = response.status;
      err.raw = data;
      throw err;
    }

    const finishReason = data?.choices?.[0]?.finish_reason;
    const usage = data?.usage;

    console.log("FINISH:", finishReason);
    console.log("USAGE:", usage);

    return answer;
  } finally {
    // clearTimeout(timeout);
  }
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

      const answer = await fetchAnswer({ question, config });

      return res.json({ answer });
    } catch (err: any) {
      let msg =
        err?.issues?.[0]?.message ||
        err?.message ||
        "AI error";

      if (err?.name === "AbortError") {
        msg = "AI request timed out. Please try again.";
      } else if (err?.status === 401) {
        msg = "Invalid Z.AI API key.";
      } else if (err?.status === 429) {
        msg = "Z.AI rate limit hit. Please slow down.";
      }

      console.error("Error:", msg);
      return res.status(400).json({ error: msg });
    }
  });
}
