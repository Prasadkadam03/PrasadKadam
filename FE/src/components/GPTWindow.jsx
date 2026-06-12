import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PROFILE = {
  name: "Prasad Kadam",
  title: "Full Stack Developer",
  location: "Nashik, India",
  locationPreferred: "Nashik, India",
  email: "prasadkadam29503@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/prasadkadam03/",
    github: "https://github.com/prasadkadam03",
  },
  summary:
    "Full Stack Developer with hands-on experience delivering web and mobile applications end-to-end. Skilled in JavaScript/TypeScript, React, React Native, Node.js, Next.js, Express, REST APIs, and SQL/NoSQL databases.",
  experience: [
    {
      company: "VIZIPP",
      period: "Apr 2025 - Present",
      role: "Frontend Developer Intern -> Junior Developer",
      highlights: [
        "Developed 10+ responsive UI components using React, React Native, and TailwindCSS for VIZIPP products with strong accessibility and cross-browser support.",
        "Enhanced Next.js applications with dynamic routing, SSR, and API integrations to improve performance and SEO.",
        "Delivered 8+ REST API endpoints with Node.js/Express, JWT auth, Zod validation, and production-grade error handling.",
        "Modeled MongoDB collections with Mongoose and optimized queries and response payloads to reduce endpoint latency by about 25%.",
        "Built and maintained cross-platform mobile features with React Native at VIZIPP, connected to Node.js backend APIs.",
      ],
    },
  ],
  skills: {
    languages: ["JavaScript (ES6+)", "TypeScript", "SQL"],
    frontend: ["React", "React Native", "Next.js", "TailwindCSS", "HTML5", "CSS3", "Bootstrap"],
    backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Zod Validation"],
    dbTools: ["MongoDB (Atlas, Mongoose)", "PostgreSQL", "MySQL", "Prisma ORM", "Git/GitHub", "Postman", "Vercel", "Cloudflare Workers"],
  },
  projects: [
    {
      name: "InspireWrite",
      stack: ["React", "React Native", "TypeScript", "Cloudflare Workers", "Prisma", "PostgreSQL", "JWT", "Zod"],
      period: "Feb 2025",
      bullets: [
        "Engineered a serverless app on Cloudflare Workers (edge runtime), reducing perceived latency by about 30%.",
        "Secured protected routes with JWT auth, enforced runtime validation with Zod, and managed relational data using Prisma plus PostgreSQL.",
        "Implemented cross-platform mobile features in React Native that synced with backend APIs.",
      ],
      live: "https://inspirewrite.vercel.app/",
      code: "https://github.com/Prasadkadam03/INSPIREWRITE",
    },
    {
      name: "PayTM Clone",
      stack: ["React", "React Native", "Node.js", "Express", "TailwindCSS", "MongoDB", "Zod"],
      period: "Dec 2024",
      bullets: [
        "Created a mock payments workflow with auth, transfers, and rollback handling for data consistency.",
        "Designed MongoDB schemas for users and transactions, validated inputs with Zod, and connected mobile features to backend APIs.",
      ],
      live: "https://paytm-1-6ke7.onrender.com",
      code: "https://github.com/Prasadkadam03/PayTM",
    },
    {
      name: "BookAtlas",
      stack: ["React", "TypeScript", "Vite", "TailwindCSS", "Next.js", "Open Library API"],
      period: "Sep 2025",
      bullets: [
        "Built an API-driven search UI with reusable components and deployed it to Vercel.",
        "Optimized the development workflow with Vite HMR and improved SEO and performance using Next.js features.",
      ],
      live: "https://book-atlas.vercel.app/",
      code: "https://github.com/prasadkadam03/BookAtlas",
    },
    {
      name: "News App",
      stack: ["HTML", "CSS", "JavaScript"],
      period: "Jul 2024 - Aug 2024",
      bullets: [
        "Integrated a news API with async JavaScript and added search, filters, and dark mode for better usability across devices.",
      ],
      live: "https://news-app-blue-tau.vercel.app/",
      code: "https://github.com/Prasadkadam03/News_App",
    },
  ],
};

const API_URL = import.meta.env.VITE_API_URL;
const OFF_TOPIC_REPLY =
  "I'm PrasadGPT - I only know about Prasad Kadam. Ask me about my skills, projects, or experience.";
const CODE_REQUEST_REPLY =
  "I can't provide full code or HTML here. Please check my live portfolio and GitHub for examples of my work.";
const OUT_OF_STACK_REPLY = (tech) =>
  `I haven't used ${tech} yet, but I can ramp quickly. My core stack is React, React Native, Next.js, Node.js/Express, TypeScript, and MongoDB/PostgreSQL. If the role needs ${tech}, I'm confident I can pick it up fast.\n\nContact: ${PROFILE.email} | ${PROFILE.links.linkedin}`;

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const detectIntent = (raw) => {
  const text = raw.toLowerCase();

  if (/(hi|hello|hey|yo|good (morning|evening|afternoon))/.test(text)) return "greeting";
  if (/(hire|hiring|job|role|position|open to work|resume|cv|interview|notice)/.test(text)) return "hiring";
  if (/(stack|tech|skills|typescript|javascript|react native|react|next|node|express|mongodb|postgres|sql|tailwind)/.test(text)) return "tech";
  if (/(project|build|mvp|app|website|dashboard|saas|api|serverless|cloudflare|vercel)/.test(text)) return "project";
  if (/(contact|email|phone|reach|linkedin|github)/.test(text)) return "contact";
  return "generic";
};

const extractSignals = (raw) => {
  const text = raw.toLowerCase();
  return {
    wantsRemote: /(remote)/.test(text),
    wantsFullTime: /(full[-\s]?time|permanent|job)/.test(text),
    wantsFrontend: /(frontend|ui|ux|react native|react|next)/.test(text),
    wantsBackend: /(backend|api|node|express)/.test(text),
    wantsServerless: /(serverless|edge|cloudflare|workers)/.test(text),
    mentionsMongo: /(mongo)/.test(text),
    mentionsPostgres: /(postgres|postgresql)/.test(text),
  };
};

const buildReply = ({ prompt, memory }) => {
  const intent = detectIntent(prompt);
  const signals = extractSignals(prompt);
  const userText = prompt.trim();
  const echo = userText && userText.length < 120 ? `You said: "${userText}".\n\n` : "";

  const nextMemory = {
    ...memory,
    lastIntent: intent,
    signals: { ...memory.signals, ...signals },
    lastUserMessage: userText,
  };

  const greeting = () =>
    pick([
      `Hey, I'm **PrasadGPT**.\nI'm a **${PROFILE.title}** working across React, React Native, Next.js, Node/Express, and MongoDB/PostgreSQL.\n\nAre you here for **hiring**, or do you want to talk about a **project**?`,
      `Hi, I'm **PrasadGPT** - built from my real resume.\n\nAsk me about **experience**, **projects**, **tech stack**, or **role fit**.`,
    ]);

  const hiring = () => {
    const focus = nextMemory.signals.wantsFrontend
      ? "Frontend / Mobile"
      : nextMemory.signals.wantsBackend
      ? "Backend / API"
      : "Full Stack";

    return (
      echo +
      `Yes - I'm open to roles.\n\n` +
      `**Quick fit summary (${focus}):**\n` +
      `- ${PROFILE.experience[0].company} - ${PROFILE.experience[0].role}\n` +
      `- Built React, React Native, and Next.js interfaces with Node/Express REST APIs\n` +
      `- JWT auth + Zod validation + MongoDB/PostgreSQL/MySQL\n` +
      `- Improved API latency by about 25% on high-traffic routes\n\n` +
      `If you paste a JD or tell me the stack and responsibilities, I'll map my experience to it in a recruiter-friendly way.`
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
      `**Here's my core stack:**\n` +
      `- Frontend: ${PROFILE.skills.frontend.join(", ")}\n` +
      `- Backend: ${PROFILE.skills.backend.join(", ")}\n` +
      `- DB/Tools: ${PROFILE.skills.dbTools.join(", ")}\n\n` +
      `**Best matching project:**\n` +
      `- **${bestProject.name}** (${bestProject.period}) - ${bestProject.stack.join(", ")}\n` +
      `${bestProject.bullets.map((bullet) => `  - ${bullet}`).join("\n")}\n\n` +
      `Want the **live demo + GitHub** links for that one?`
    );
  };

  const project = () => {
    const followups = [
      "What are you building (1-2 lines)?",
      "Who are the users?",
      "Must-have features for v1?",
      "Any deadline?",
      "MongoDB or PostgreSQL, or are you flexible?",
    ];

    return (
      echo +
      `Nice - I can help you shape **scope + architecture** based on what I've shipped.\n\n` +
      `Answer any 2-3:\n` +
      followups.map((q) => `- ${q}`).join("\n") +
      `\n\nThen I'll reply with:\n- suggested v1 scope\n- recommended stack\n- milestones for what to build first`
    );
  };

  const contact = () =>
    `You can reach me through:\n\n` +
    `- **Email:** ${PROFILE.email}\n` +
    `- **Location:** ${PROFILE.location}\n` +
    `- **LinkedIn:** [${PROFILE.links.linkedin}](${PROFILE.links.linkedin})\n` +
    `- **GitHub:** [${PROFILE.links.github}](${PROFILE.links.github})\n\n` +
    `I'm always happy to talk about roles, projects, or product builds.`;

  const generic = () => {
    const nudge = pick([
      "Do you want to talk hiring and role fit, or a project?",
      "Are you looking to hire me, or are you scoping a build?",
      "Tell me what you need: role fit, tech stack, or project planning.",
    ]);

    return (
      echo +
      `Got it.\n\nI can help with:\n- role fit from my resume\n- my tech stack and strongest projects\n- scoping your app into milestones\n\n${nudge}`
    );
  };

  let content = "";
  if (intent === "greeting") content = greeting();
  else if (intent === "hiring") content = hiring();
  else if (intent === "tech") content = tech();
  else if (intent === "project") content = project();
  else if (intent === "contact") content = contact();
  else content = generic();

  return { content, nextMemory };
};

const isOffTopic = (raw) => {
  const t = raw.trim().toLowerCase();
  const mentionsPrasad = /(prasad|kadam|you|your|portfolio|resume|cv)/.test(t);
  const patterns = [
    /(capital|president|prime minister|population|weather|temperature|forecast)/,
    /(news|stock|crypto|bitcoin|football|cricket|movie|song|lyrics|math|equation)/,
  ];
  return !mentionsPrasad && patterns.some((re) => re.test(t));
};

const isCodeLikeRequest = (raw) => {
  const t = raw.trim().toLowerCase();
  return /(code|html|css|javascript|typescript|react component|return me|give me|generate|build).*portfolio/.test(t);
};

const isOutOfStack = (raw) => {
  const t = raw.trim().toLowerCase();
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
};

const askBackend = async (question) => {
  const response = await fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  const rawText = await response.text();
  let data = null;
  try {
    data = JSON.parse(rawText);
  } catch {
    data = null;
  }

  if (!response.ok) {
    const err = new Error(data?.error || `Request failed (${response.status})`);
    err.status = response.status;
    err.raw = data;
    throw err;
  }

  if (!data?.answer) {
    const err = new Error("No answer returned from backend");
    err.status = response.status;
    err.raw = data;
    throw err;
  }

  return String(data.answer);
};

const streamText = async ({ fullText, onChunk, speed = 12, chunkSize = 2 }) => {
  let i = 0;
  while (i < fullText.length) {
    const next = fullText.slice(i, i + chunkSize);
    onChunk(next);
    i += chunkSize;
    await new Promise((r) => setTimeout(r, speed));
  }
};

const starterMessages = [
  {
    role: "ai",
    content:
      "Hey, I'm **PrasadGPT**.\nI'm a Full Stack Developer working across React, React Native, Next.js, Node/Express, and MongoDB/PostgreSQL.\nAsk about hiring, my projects, or tech stack.",
    meta: { tag: "" },
  },
];

function classifyError(err) {
  const msg = (err?.message || "").toLowerCase();
  const status = err?.status;

  if (!status && (msg.includes("failed to fetch") || msg.includes("network") || msg.includes("cors"))) {
    return "BACKEND DOWN";
  }

  if (status === 429 || msg.includes("quota") || msg.includes("rate") || msg.includes("too many")) {
    return "RATE LIMITED";
  }

  if (
    msg.includes("token") ||
    msg.includes("context") ||
    msg.includes("maxoutputtokens") ||
    msg.includes("too large") ||
    msg.includes("resource_exhausted")
  ) {
    return "TOKEN LIMIT EXCEEDED";
  }

  return "AI DOWN";
}

const Markdown = ({ text }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noreferrer noopener"
            className="underline font-bold wrap-break-word"
          />
        ),
        ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 my-2" />,
        ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-5 my-2" />,
        li: ({ node, ...props }) => <li {...props} className="my-1" />,
        p: ({ node, ...props }) => <p {...props} className="my-2 last:mb-0" />,
        strong: ({ node, ...props }) => <strong {...props} className="font-black" />,
        code: ({ node, ...props }) => (
          <code {...props} className="px-1 py-0.5 border border-black bg-gray-50 text-[12px]" />
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

const GPTWindow = () => {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState(null);
  const scrollRef = useRef(null);

  const [memory, setMemory] = useState({
    lastIntent: null,
    lastUserMessage: "",
    signals: {},
  });

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isThinking]);

  useEffect(() => {
    if (!pendingQuestion) return;

    let canceled = false;

    const streamAnswer = async (fullText, metaUpdate) => {
      let streamed = "";
      await streamText({
        fullText,
        speed: 10,
        chunkSize: 2,
        onChunk: (chunk) => {
          if (canceled) return;
          streamed += chunk;
          setMessages((prev) => {
            const copy = [...prev];
            const last = copy.length - 1;
            copy[last] = {
              ...copy[last],
              content: streamed,
              meta: { ...(copy[last]?.meta || {}), ...(metaUpdate || {}) },
            };
            return copy;
          });
        },
      });
    };

    const run = async () => {
      try {
        const answer = await askBackend(pendingQuestion.question);
        await streamAnswer(answer, { tag: "" });
      } catch (err) {
        const tag = classifyError(err);
        const { content, nextMemory } = buildReply({
          prompt: pendingQuestion.question,
          memory: pendingQuestion.memorySnapshot,
        });
        setMemory(nextMemory);

        const fallback =
          `**${tag}**\n\n` +
          `Backend/AI isn't available right now, so I'm replying in **offline mode** from my resume data:\n\n` +
          content;

        await streamAnswer(fallback, { tag });
      } finally {
        if (!canceled) {
          setIsThinking(false);
          setPendingQuestion(null);
        }
      }
    };

    run();

    return () => {
      canceled = true;
    };
  }, [pendingQuestion]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: trimmed, meta: {} },
      { role: "ai", content: "", meta: { tag: "" } },
    ]);

    setInput("");
    setIsThinking(true);

    if (isOffTopic(trimmed)) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", content: OFF_TOPIC_REPLY, meta: {} },
      ]);
      setIsThinking(false);
      return;
    }

    if (isCodeLikeRequest(trimmed)) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", content: CODE_REQUEST_REPLY, meta: {} },
      ]);
      setIsThinking(false);
      return;
    }

    const outOfStack = isOutOfStack(trimmed);
    if (outOfStack) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", content: OUT_OF_STACK_REPLY(outOfStack), meta: {} },
      ]);
      setIsThinking(false);
      return;
    }

    setPendingQuestion({
      question: trimmed,
      memorySnapshot: memory,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto bg-white border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
    >
      <div className="border-b-2 border-black px-4 py-3 bg-white flex justify-between items-center relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full bg-black opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 bg-black"></span>
          </div>
          <span className="font-black uppercase tracking-tighter text-lg">PrasadGPT</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold border border-black px-2 py-1 uppercase bg-white">
          <span>v1.0.5 - Live</span>
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 bg-green-500"></span>
          </div>
        </div>
      </div>

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
                className={`max-w-[85%] px-4 py-3 border border-black font-medium text-sm leading-snug ${
                  msg.role === "user"
                    ? "bg-orange-50 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-black"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-black opacity-50">
                    {msg.role === "user" ? "You" : "PrasadGPT"}
                  </span>

                  {msg?.meta?.tag ? (
                    <span className="text-[9px] uppercase font-black border border-black px-2 py-0.5 bg-white">
                      {msg.meta.tag}
                    </span>
                  ) : null}
                </div>

                {msg.role === "ai" ? (
                  <div className="text-[13px] leading-relaxed">
                    <Markdown text={msg.content || ""} />
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                )}
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
            className="flex-1 border border-black p-3 text-sm font-bold  placeholder:text-gray-400 focus:outline-none focus:bg-gray-50 resize-none"
          />
          <button
            onClick={handleSend}
            disabled={isThinking}
            className={`border border-black px-6 py-2 font-black uppercase text-sm transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              ${
                isThinking
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              }
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
