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

const ZAI_API_KEY = process.env.ZAI_API_KEY;
const ZAI_BASE_URL =
  process.env.ZAI_BASE_URL ||
  "https://api.z.ai/api/paas/v4/chat/completions";

if (!ZAI_API_KEY) {
  throw new Error("Missing ZAI_API_KEY in .env");
}

// Route
registerAskRoute(app, {
  zaiApiKey: ZAI_API_KEY,
  zaiBaseUrl: ZAI_BASE_URL,
});

app.listen(PORT, () => {
  console.log("Allowed Origins:", ALLOWED_ORIGINS);
  console.log(`🚀 AI server running at http://localhost:${PORT}`);
});
