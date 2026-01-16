import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 1) Your “knowledge base” (ATS/resume facts) — the bot should ONLY talk from here.
 * 2) Pricing is separate and ONLY used if user asks.
 */

const PROFILE = {
  name: "Prasad Kadam",
  title: "Full Stack Developer",
  location: "Nashik, India (Remote-friendly)",
  email: "prasadkadam29503@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/prasadkadam03/",
    github: "https://github.com/prasadkadam03",
  },
  summary:
    "Full Stack Developer with internship + full-time experience delivering web applications end-to-end. Skilled in JavaScript/TypeScript, React, Node.js, Express, REST APIs, and SQL/NoSQL databases.",
  experience: [
    {
      company: "VIZIPP",
      period: "Apr 2025 — Present",
      role:
        "Full Stack Developer Intern (Apr 2025 — Sep 2025) → Junior Developer (Oct 2025 — Present)",
      highlights: [
        "Shipped 10+ responsive UI components using React, Angular, and TailwindCSS with cross-browser and accessible UI patterns.",
        "Delivered 8+ REST API endpoints with Node.js/Express, adding JWT auth, Zod validation, and consistent error handling.",
        "Modeled MongoDB collections with Mongoose and implemented CRUD for users, content, and transactions modules.",
        "Optimized queries and response payloads to cut average endpoint latency by ~25% for high-traffic routes.",
        "Worked in a 4-person Agile team (2-week sprints), owned PRs, reviews, and release-ready merges via Git/GitHub.",
      ],
    },
  ],
  skills: {
    languages: ["JavaScript (ES6+)", "TypeScript", "SQL"],
    frontend: ["React", "Next.js", "Angular", "TailwindCSS", "HTML5", "CSS3", "Bootstrap", "Material UI"],
    backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Zod Validation"],
    dbTools: ["MongoDB (Atlas, Mongoose)", "PostgreSQL", "MySQL", "Prisma ORM", "Git/GitHub", "Postman", "Docker (basic)", "Vercel", "Cloudflare Workers"],
  },
  projects: [
    {
      name: "InspireWrite",
      stack: ["React", "TypeScript", "Zod", "JWT", "Cloudflare Workers", "Prisma", "PostgreSQL"],
      period: "Feb 2025",
      bullets: [
        "Engineered a serverless app on Cloudflare Workers (edge runtime), reducing perceived latency by ~30% vs centralized setup.",
        "Secured 5+ protected routes using JWT; enforced runtime validation using Zod; managed relational data via Prisma + PostgreSQL.",
      ],
      live: "https://inspirewrite.vercel.app/",
      code: "https://github.com/Prasadkadam03/INSPIREWRITE",
    },
    {
      name: "PayTM Clone",
      stack: ["React", "Node.js", "Express", "TailwindCSS", "MongoDB"],
      period: "Dec 2024",
      bullets: [
        "Created a mock payments workflow (auth + transfers) with rollback handling for consistency on failures.",
        "Designed MongoDB schemas for users/transactions; reduced invalid requests via server-side validation with Zod.",
      ],
      live: "https://paytm-1-6ke7.onrender.com",
      code: "https://github.com/Prasadkadam03/PayTM",
    },
    {
      name: "BookAtlas",
      stack: ["React", "TypeScript", "Vite", "TailwindCSS", "Open Library API"],
      period: "Sep 2025",
      bullets: [
        "Built an API-driven search UI with reusable components; deployed to Vercel; optimized dev workflow via Vite HMR.",
      ],
      live: "https://book-atlas.vercel.app/",
      code: "https://github.com/prasadkadam03/BookAtlas",
    },
    {
      name: "News App",
      stack: ["HTML", "CSS", "JavaScript"],
      period: "Jul 2024 — Aug 2024",
      bullets: [
        "Integrated a news API with async JS; added search + filters and dark mode for better usability across devices.",
      ],
      live: "https://news-app-blue-tau.vercel.app/",
      code: "https://github.com/Prasadkadam03/News_App",
    },
  ],
};

const PRICING = {
  landing: { title: "Landing Page / Portfolio", start: "₹5,399", includes: ["React/Next.js + Tailwind UI", "Responsive & accessible layout", "Deployment to Vercel + domain guidance", "Essential SEO + analytics hooks", "3 revision loops"] },
  mvp: { title: "Full Stack MVP", start: "₹7,399", includes: ["React/Next.js frontend", "Node.js/Express REST APIs + JWT", "Zod validation + error handling", "MongoDB or PostgreSQL setup (Mongoose/Prisma)", "Postman collection + API docs"] },
  edge: { title: "Edge/Serverless App", start: "₹10,999", includes: ["Cloudflare Workers or Vercel functions", "JWT-protected routes + rate limiting", "Prisma/PostgreSQL or MongoDB", "CI/CD hooks", "Performance + observability checks"] },
  enterprise: { title: "Enterprise Custom", start: "Custom", includes: ["High-availability architecture", "Enterprise cloud infra (AWS/GCP)", "Security & compliance audits", "Priority support"] },
};

/** ---------- helpers ---------- */

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const includesAny = (text, words) => words.some((w) => text.includes(w));

const detectIntent = (raw) => {
  const text = raw.toLowerCase();

  // IMPORTANT: pricing must be explicit
  const pricing = /(price|pricing|rate|cost|charges|fees|budget|quote|quotation)/.test(text);

  if (pricing) return "pricing";
  if (/(hi|hello|hey|yo|good (morning|evening|afternoon))/.test(text)) return "greeting";
  if (/(hire|hiring|job|role|position|open to work|resume|cv|interview|notice)/.test(text)) return "hiring";
  if (/(stack|tech|skills|typescript|javascript|react|next|node|express|mongodb|postgres|sql|angular|tailwind)/.test(text)) return "tech";
  if (/(project|build|mvp|app|website|dashboard|saas|api|serverless|cloudflare|vercel)/.test(text)) return "project";
  if (/(contact|email|reach|linkedin|github)/.test(text)) return "contact";
  return "generic";
};

const extractSignals = (raw) => {
  const text = raw.toLowerCase();
  const signals = {
    wantsRemote: /(remote)/.test(text),
    wantsFullTime: /(full[-\s]?time|permanent|job)/.test(text),
    wantsFrontend: /(frontend|ui|ux|react|next)/.test(text),
    wantsBackend: /(backend|api|node|express)/.test(text),
    wantsServerless: /(serverless|edge|cloudflare|workers)/.test(text),
    mentionsMongo: /(mongo)/.test(text),
    mentionsPostgres: /(postgres|postgresql)/.test(text),
  };
  return signals;
};

/**
 * Resume-driven “fake GPT brain”
 * - Uses: intent, memory, and small “response library”
 * - Pricing only on intent === 'pricing'
 */
const buildReply = ({ prompt, memory }) => {
  const intent = detectIntent(prompt);
  const signals = extractSignals(prompt);
  const userText = prompt.trim();
  const echo = userText && userText.length < 120 ? `You said: “${userText}”.\n\n` : "";

  // Update memory (light, safe)
  const nextMemory = {
    ...memory,
    lastIntent: intent,
    signals: { ...memory.signals, ...signals },
    lastUserMessage: userText,
  };

  // --- Response templates (varied) ---
  const greeting = () =>
    pick([
      `Hey 👋 I’m PrasadGPT.\nI’m ${PROFILE.title} (React/Next.js, Node/Express, MongoDB/PostgreSQL).\n\nAre you here for hiring, or do you want to talk about a project?`,
      `Hi! 👋 I’m PrasadGPT — built from my real resume.\n\nAsk me about my experience, projects, tech stack, or role fit.`,
    ]);

  const hiring = () => {
    const focus = nextMemory.signals.wantsFrontend
      ? "Frontend/React"
      : nextMemory.signals.wantsBackend
      ? "Backend/API"
      : "Full Stack";

    return (
      echo +
      `Yes — I’m open to roles (freelancing is secondary).\n\n` +
      `Quick fit summary (${focus}):\n` +
      `• ${PROFILE.experience[0].company} — ${PROFILE.experience[0].role}\n` +
      `• Built React/Angular UI components + Node/Express REST APIs\n` +
      `• JWT auth + Zod validation + MongoDB/PostgreSQL\n` +
      `• Improved API latency by ~25% on high-traffic routes\n\n` +
      `If you paste a JD or tell me the stack + responsibilities, I’ll map my experience to it in a recruiter-friendly way.`
    );
  };

  const tech = () => {
    const bestProject = nextMemory.signals.wantsServerless
      ? PROFILE.projects.find((p) => p.name === "InspireWrite")
      : nextMemory.signals.wantsBackend
      ? PROFILE.projects.find((p) => p.name === "PayTM Clone")
      : PROFILE.projects.find((p) => p.name === "BookAtlas") || PROFILE.projects[0];

    return (
      echo +
      `Here’s my core stack:\n` +
      `• Frontend: ${PROFILE.skills.frontend.join(", ")}\n` +
      `• Backend: ${PROFILE.skills.backend.join(", ")}\n` +
      `• DB/Tools: ${PROFILE.skills.dbTools.join(", ")}\n\n` +
      `If you want a project match, best example:\n` +
      `• ${bestProject.name} (${bestProject.period}) — ${bestProject.stack.join(", ")}\n` +
      `  - ${bestProject.bullets[0]}\n` +
      (bestProject.bullets[1] ? `  - ${bestProject.bullets[1]}\n` : "") +
      `\nWant links to the live demo + GitHub for that one?`
    );
  };

  const project = () => {
    const followups = [
      "1) What are you building (1–2 lines)?",
      "2) Who are the users?",
      "3) Must-have features for v1?",
      "4) Any deadline?",
      "5) Do you prefer MongoDB or PostgreSQL (or you’re flexible)?",
    ];

    return (
      echo +
      `Nice — I can help you shape scope + architecture based on what I’ve shipped.\n\n` +
      `To make this concrete, answer any 2–3:\n` +
      followups.map((q) => `• ${q}`).join("\n") +
      `\n\nThen I’ll reply with:\n• suggested v1 scope\n• recommended stack\n• milestones (what to build first)\n\n(And I’ll only discuss pricing if you ask.)`
    );
  };

  const contact = () =>
    `You can reach me here:\n\n` +
    `• Email: ${PROFILE.email}\n` +
    `• Location: ${PROFILE.location}\n` +
    `• LinkedIn: ${PROFILE.links.linkedin}\n` +
    `• GitHub: ${PROFILE.links.github}\n\n` +
    `If you share the role + requirements, I can also draft a tight “why me” message you can send to recruiters.`;

  // PRICING: strictly gated
  const pricing = () => {
    const blocks = [
      `• ${PRICING.landing.title}: starts ${PRICING.landing.start}\n  - ${PRICING.landing.includes.join("\n  - ")}`,
      `• ${PRICING.mvp.title}: starts ${PRICING.mvp.start}\n  - ${PRICING.mvp.includes.join("\n  - ")}`,
      `• ${PRICING.edge.title}: starts ${PRICING.edge.start}\n  - ${PRICING.edge.includes.join("\n  - ")}`,
      `• ${PRICING.enterprise.title}: ${PRICING.enterprise.start}\n  - ${PRICING.enterprise.includes.join("\n  - ")}`,
    ].join("\n\n");

    return (
      echo +
      `Sure — pricing (since you asked) 💰\n\n` +
      blocks +
      `\n\nIf you share scope + deadline, I’ll tell you which tier fits and what to ship in v1.`
    );
  };

  const generic = () => {
    const nudge = pick([
      "Do you want to talk hiring/role fit, or a project?",
      "Are you looking to hire me, or are you scoping a build?",
      "Tell me what you need: role fit, tech stack, or project planning.",
    ]);

    // IMPORTANT: do not mention pricing here
    return (
      echo +
      `Got it.\n\n` +
      `I can help with:\n` +
      `• role fit (resume-based)\n` +
      `• my tech stack & strongest projects\n` +
      `• scoping your app into milestones\n\n` +
      `${nudge}`
    );
  };

  let content = "";
  if (intent === "greeting") content = greeting();
  else if (intent === "hiring") content = hiring();
  else if (intent === "tech") content = tech();
  else if (intent === "project") content = project();
  else if (intent === "contact") content = contact();
  else if (intent === "pricing") content = pricing();
  else content = generic();

  return { content, nextMemory };
};

/** Streaming effect: feels like real GPT */
const streamText = async ({ fullText, onChunk, speed = 12, chunkSize = 2 }) => {
  // speed: ms per chunk (smaller = faster)
  let i = 0;
  while (i < fullText.length) {
    const next = fullText.slice(i, i + chunkSize);
    onChunk(next);
    i += chunkSize;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, speed));
  }
};

const starterMessages = [
  {
    role: "ai",
    content:
      "Hey, I’m PrasadGPT 👋\nI’m a Full Stack Developer (React/Next.js, Node/Express, MongoDB/PostgreSQL).\nAsk about hiring, my projects, or tech stack.",
  },
];

const GPTWindow = () => {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);

  // memory makes it feel “aware” across turns
  const [memory, setMemory] = useState({
    lastIntent: null,
    lastUserMessage: "",
    signals: {},
  });

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isThinking]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsThinking(true);

    // Build reply (resume-driven, pricing gated)
    const { content, nextMemory } = buildReply({ prompt: trimmed, memory });

    // Add an empty AI message, then stream into it
    const aiIndex = messages.length + 1; // approximate next index
    setMessages((prev) => [...prev, { role: "ai", content: "" }]);

    let streamed = "";
    await streamText({
      fullText: content,
      speed: 10,
      chunkSize: 2,
      onChunk: (chunk) => {
        streamed += chunk;
        setMessages((prev) => {
          const copy = [...prev];
          // last message should be the AI message
          copy[copy.length - 1] = { role: "ai", content: streamed };
          return copy;
        });
      },
    });

    setMemory(nextMemory);
    setIsThinking(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto bg-white border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
    >
      {/* Header */}
      <div className="border-b-2 border-black px-4 py-3 bg-white flex justify-between items-center relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full bg-black opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 bg-black"></span>
          </div>
          <span className="font-black uppercase tracking-tighter text-lg">PrasadGPT</span>
          <span className="font-extralight uppercase text-xs text-red-500">Under development....</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold border border-black px-2 py-1 uppercase bg-white">
          <span>v1.0.4 — Live</span>
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 bg-green-500"></span>
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div
        ref={scrollRef}
        className="h-96 overflow-y-auto p-4 space-y-4 bg-white scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 border border-black font-medium text-sm leading-snug whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-orange-50 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-black"
                }`}
              >
                <span className="block text-[10px] uppercase font-black mb-1 opacity-50">
                  {msg.role === "user" ? "You" : "PrasadGPT"}
                </span>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isThinking && (
          <div className="flex justify-start">
            <div className="px-4 py-2 border border-black bg-white text-xs font-bold animate-pulse">
              THINKING...
            </div>
          </div>
        )}
      </div>

      {/* Input Footer */}
      <div className="border-t border-black p-4 bg-white">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={1}
            placeholder="Ask about hiring, projects, or tech stack..."
            className="flex-1 border border-black p-3 text-sm font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:bg-gray-50 resize-none"
          />
          <button
            onClick={handleSend}
            disabled={isThinking}
            className={`border border-black px-6 py-2 font-black uppercase text-sm transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              ${isThinking ? "bg-gray-200 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"}
            `}
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GPTWindow;
