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

if (!OPENROUTER_API_KEY) {
  throw new Error("Missing OPENROUTER_API_KEY in .env");
}

const provider = (model: string, name: string) => ({
  name,
  apiKey: OPENROUTER_API_KEY as string,
  baseUrl: OPENROUTER_BASE_URL,
  model,
});

registerAskRoute(app, {
  primary: provider(
    "nvidia/nemotron-3-ultra-550b-a55b:free",
    "Nemotron 3 Ultra (primary)"
  ),
  codingFirst: provider(
    "nex-agi/nex-n2.5-pro:free",
    "Nex-N2.5-Pro (coding)"
  ),
  fallbacks: [
    provider(
      "nvidia/nemotron-3.5-lightning:free",
      "Nemotron 3.5 Lightning"
    ),
    provider("thinkingmachines/inkling-small:free", "Inkling Small"),
    provider("poolside/laguna-s-2.1:free", "Laguna S 2.1"),
  ],
});

app.listen(PORT, () => {
  console.log("Allowed Origins:", ALLOWED_ORIGINS);
  console.log(`🚀 AI server running at http://localhost:${PORT}`);
});
