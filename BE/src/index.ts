import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { registerAskRoute } from "./askRoute";

dotenv.config();

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "16kb" }));

// ✅ Configure allowed origins from env (comma separated) or default to localhost
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const PORT = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
  })
);

// ✅ Rate limit
app.use(
  rateLimit({
    windowMs: 60_000,
    max: 30, 
    standardHeaders: true,
    legacyHeaders: false,
  })
);

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL =
  process.env.OPENROUTER_BASE_URL ||
  "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL || "nvidia/nemotron-3.5-lightning:free";

const ZAI_API_KEY = process.env.ZAI_API_KEY;
const ZAI_BASE_URL =
  process.env.ZAI_BASE_URL ||
  "https://api.z.ai/api/paas/v4/chat/completions";

if (!OPENROUTER_API_KEY || !ZAI_API_KEY) {
  const missingApiKeys = [
    !OPENROUTER_API_KEY && "OPENROUTER_API_KEY",
    !ZAI_API_KEY && "ZAI_API_KEY",
  ].filter(Boolean);

  throw new Error(`Missing ${missingApiKeys.join(", ")} in .env`);
}

// Route
registerAskRoute(app, {
  primary: {
    name: "OpenRouter",
    apiKey: OPENROUTER_API_KEY,
    baseUrl: OPENROUTER_BASE_URL,
    model: OPENROUTER_MODEL,
  },
  fallback: {
    name: "Z.AI",
    apiKey: ZAI_API_KEY,
    baseUrl: ZAI_BASE_URL,
    model: "glm-4.7-flash",
  },
});

app.listen(PORT, () => {
  console.log("Allowed Origins:", ALLOWED_ORIGINS);
  console.log(`🚀 AI server running at http://localhost:${PORT}`);
});
