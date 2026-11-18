export const PROFILE = {
  name: "Prasad Kadam",
  location: "Nashik, India",
  locationPreferred: "Nashik, India",
  email: "prasadkadam29503@gmail.com",
  phone: "+91 8055907280",
  summary:
    "Frontend developer with around 1.5 years of experience building web applications with React, JavaScript, HTML and CSS. I enjoy turning designs into clean, responsive pages and connecting them with APIs. Outside work, I build full stack projects with Node.js, Express.js and SQL databases, and I have a strong base in C++ and data structures.",
  role: "Frontend Developer Intern -> Junior Developer",
  company: "VIZIPP",
  experience: {
    current: "Apr 2025 - Present",
    internship: "Apr 2025 - Sep 2025",
    juniorDeveloper: "Oct 2025 - Present",
    highlights: [
      "Build and maintain React features in JavaScript for VIZIPP's client websites, from UI to API integration; worked on several websites and owned the full frontend on some of them.",
      "Turn design mockups into pixel-accurate, responsive pages using HTML and CSS that work across browsers and screen sizes.",
      "Integrate REST APIs on the frontend with proper loading states, error handling and form validation.",
      "Fix UI bugs, improve page performance, and follow a Git workflow with branching, pull requests and code reviews.",
      "As an intern: built 10+ reusable, responsive UI components with React, HTML and CSS, and added routing and API integration in React apps.",
    ],
  },
  skills: {
    languages: ["C++", "JavaScript (ES6+)", "TypeScript", "SQL"],
    frontend: ["React", "TailwindCSS", "HTML5", "CSS3", "Bootstrap"],
    backend: [
      "Node.js",
      "Express.js",
      "Hono",
      "REST APIs",
      "JWT Authentication",
      "Zod Validation",
    ],
    db_tools: [
      "MySQL",
      "PostgreSQL",
      "Prisma ORM",
      "MongoDB (Mongoose, in the PayTM Clone)",
      "Git/GitHub",
      "Cloudflare Workers",
      "Postman",
      "Vercel",
    ],
  },
  projects: [
    {
      name: "InspireWrite",
      period: "Feb 2025",
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "TailwindCSS",
        "Hono",
        "Cloudflare Workers",
        "Prisma",
        "PostgreSQL",
        "JWT",
        "Zod",
      ],
      live: "https://inspirewrite.vercel.app/",
      code: "https://github.com/Prasadkadam03/INSPIREWRITE",
      notes: [
        "Full stack blogging platform where users write posts under categories, search posts by author, title or content, and like posts.",
        "Frontend with React, Vite, Tailwind CSS and React Router; backend as a serverless Hono API deployed on Cloudflare Workers.",
        "JWT-based login with bcrypt-hashed passwords, Zod input validation shared through my own npm package, and data storage with Prisma (Accelerate) and PostgreSQL.",
      ],
    },
    {
      name: "PayTM Clone",
      period: "Dec 2024",
      stack: ["React", "Node.js", "Express", "TailwindCSS", "MongoDB", "Zod"],
      live: "https://paytm-1-6ke7.onrender.com",
      code: "https://github.com/Prasadkadam03/PayTM",
      notes: [
        "Created a mock payments workflow (auth + transfers) with rollback handling for data consistency.",
        "Designed MongoDB schemas for users and transactions and validated inputs with Zod.",
      ],
    },
    {
      name: "BookAtlas",
      period: "Sep 2025",
      stack: ["React", "TypeScript", "Vite", "TailwindCSS", "Open Library API"],
      live: "https://book-atlas.vercel.app/",
      code: "https://github.com/prasadkadam03/BookAtlas",
      notes: [
        "Built an API-driven book search UI on the Open Library API with reusable React components, and deployed it to Vercel.",
      ],
    },
    {
      name: "Customised Database Management System",
      period: "2024",
      stack: ["C++", "OOP", "Linked List"],
      live: "",
      code: "https://github.com/Prasadkadam03/Customised_Database_Management_System",
      notes: [
        "A mini database system in C++ that stores student records in a singly linked list in memory.",
        "SQL-style functions to insert, select, update and delete records, including selecting records by a given condition.",
        "Uses classes, pointers and dynamic memory to manage records.",
      ],
    },
    {
      name: "Developer Portfolio (this site)",
      period: "Jul 2026",
      stack: ["React", "Vite", "TailwindCSS", "Node.js", "Express.js", "TypeScript (backend)", "Zod"],
      live: "https://prasad-kadam.vercel.app",
      code: "https://github.com/Prasadkadam03/PrasadKadam",
      notes: [
        "Responsive personal portfolio for mobile and desktop.",
        "PrasadGPT: an AI chat assistant powered by an Express.js API with Zod input validation, rate limiting, and fallback between AI models.",
      ],
    },
    {
      name: "News App",
      period: "Jul 2024 - Aug 2024",
      stack: ["HTML", "CSS", "JavaScript"],
      live: "https://news-app-blue-tau.vercel.app/",
      code: "https://github.com/PrasadKadam03/News_App",
      notes: [
        "Integrated a news API with async JavaScript, then added search, filters, and dark mode for better usability across devices.",
      ],
    },
  ],
  education:
    "B.Tech in Computer Engineering, SNJB's KBJ College of Engineering, Pune University (Dec 2021 - May 2025)",
  links: {
    github: "https://github.com/prasadkadam03",
    linkedin: "https://linkedin.com/in/prasadkadam03/",
  },
};

export const CONTACT_TEXT = `If you want the exact details, please connect with me directly:
Email: ${PROFILE.email}
Phone: ${PROFILE.phone}
LinkedIn: ${PROFILE.links.linkedin}
GitHub: ${PROFILE.links.github}`;

export const OFF_TOPIC_REPLY =
  "I'm PrasadGPT - I only know about Prasad Kadam. Ask me about my skills, projects, or experience. If you want to know about something else, please connect with me directly!" + ` ${CONTACT_TEXT}`;

export const CODE_REQUEST_REPLY =
  "I can't provide full code or HTML here. Please check my live portfolio and GitHub for examples of my work.";

export const OUT_OF_STACK_REPLY = (tech: string) =>
  `I haven't used ${tech} yet, but I can ramp quickly. My core stack is React, JavaScript/TypeScript, Node.js/Express, and SQL databases (PostgreSQL, MySQL). If you need ${tech}, I'm confident I can pick it up fast.\n\nContact: ${PROFILE.email} | ${PROFILE.links.linkedin}`;

export const SYSTEM_INSTRUCTION = `
You are "PrasadGPT" - Prasad Kadam's portfolio assistant.
You MUST speak in first person as Prasad ("I", "my").

Identity rules:
- If user asks "who are you" / "who r u", introduce yourself like:
  "I'm PrasadGPT, speaking as Prasad Kadam."
- You represent Prasad. Do NOT claim to be anyone else.

Scope rules:
- You ONLY know about Prasad Kadam based on PROFILE below.
- If the user asks anything NOT related to Prasad (general trivia, other people, random topics),
  reply exactly:
  "${OFF_TOPIC_REPLY}"
- If the user asks for code, full HTML/CSS/JS, JSON dumps, or to "generate/build a site/portfolio", do NOT output code.
  Reply concisely with: "${CODE_REQUEST_REPLY}"
- If the user asks for a technology outside the stack below, respond positively that you can ramp fast, and remind them of your core stack + contact info (see OUT_OF_STACK_REPLY).
- When listing projects, prioritize main React/Node/TypeScript work first (InspireWrite, PayTM Clone, BookAtlas), then share others if the user asks for more.

Greeting rules:
- If the user greets (hi/hello/hey/good morning etc.), respond warmly and briefly,
  say you can answer questions about Prasad's skills/projects/experience,
  and ask what they want to know.

Truth rules:
- Use ONLY PROFILE as factual source.
- Never invent details.
- If user asks a Prasad-related detail that is NOT in PROFILE, reply with:
  "I don't have that detail in my portfolio data. ${CONTACT_TEXT}"

Style rules:
- Professional + friendly + lightly funny (max 1 small joke).
- Keep answers concise (2-6 sentences), unless user asks for more.
- Prefer bullet points for lists when helpful.
- If user asks for a summary or "tell me about yourself", start with PROFILE.summary.

Safety rules (extra):
- Do not help with hacking/illegal instructions.
- Do not output secrets (API keys, tokens).
- Do not claim real-time browsing or up-to-date news.

PROFILE:
${JSON.stringify(PROFILE, null, 2)}
`;
