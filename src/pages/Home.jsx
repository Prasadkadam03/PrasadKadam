import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
    Code2, Layers, Rocket, Search, ExternalLink, Github, Globe, ShieldCheck, Server, Phone, Mail, Clock,
    BriefcaseBusiness,
} from 'lucide-react';

import GPTWindow from '../components/GPTWindow';
import SectionHeading from '../components/SectionHeading';
import Footer from '../components/Footer';

// Data Arrays
const PROJECTS = [
    {
        title: "InspireWrite",
        description: "Serverless writing platform on Cloudflare Workers with JWT auth, runtime Zod validation, and Prisma/PostgreSQL for relational data.",
        tags: ["React", "TypeScript", "Cloudflare Workers", "Prisma", "PostgreSQL", "JWT"],
        github: "https://github.com/Prasadkadam03/INSPIREWRITE",
        demo: "https://inspirewrite.vercel.app/",
        featured: true
    },
    {
        title: "PayTM Clone",
        description: "Mock payments workflow with auth, transfers, and rollback handling. Built REST APIs with Node/Express, MongoDB schemas, and server-side Zod validation.",
        tags: ["React", "Node.js", "Express", "MongoDB", "Zod", "TailwindCSS"],
        github: "https://github.com/Prasadkadam03/PayTM",
        demo: "https://paytm-1-6ke7.onrender.com",
        featured: false
    },
    {
        title: "BookAtlas",
        description: "API-driven search experience using Open Library data with reusable components, Vite HMR, and Vercel deployment.",
        tags: ["React", "TypeScript", "Vite", "TailwindCSS", "API"],
        github: "https://github.com/prasadkadam03/BookAtlas",
        demo: "https://book-atlas.vercel.app/",
        featured: false
    },
    {
        title: "Tirupati Mobile Shop",
        description: "Angular 17 site for a mobile shop showcasing products and services with lazy-loaded modules and EmailJS-powered inquiries.",
        tags: ["Angular", "TypeScript", "Lazy Loading", "EmailJS", "Responsive UI"],
        github: "https://github.com/Prasadkadam03/Tirupati_Mobiles",
        demo: "https://tirupatimobiles.netlify.app/",
        featured: false
    },
    {
        title: "News App",
        description: "Frontend for browsing news with async fetch, search, filters, and dark mode optimized for mobile and desktop.",
        tags: ["HTML", "CSS", "JavaScript", "API", "Responsive"],
        github: "https://github.com/Prasadkadam03/News_App",
        demo: "https://news-app-blue-tau.vercel.app/",
        featured: false
    },
    {
        title: "File Packer & Unpacker",
        description: "Java utility that packs multiple files from a directory into a single archive and restores them with custom headers and byte-level parsing.",
        tags: ["Java", "File I/O", "Data Structures"],
        github: "https://github.com/Prasadkadam03/File_Packer_Unpacker-JAVA",
        demo: "https://github.com/Prasadkadam03/File_Packer_Unpacker-JAVA",
        featured: false
    },
    {
        title: "Customized Virtual File System (CVFS)",
        description: "C/C++ virtual file system emulating inode, file table, super block, and data block behaviors with OS-like syscalls (open, read, write, close).",
        tags: ["C", "C++", "File Systems", "Data Structures"],
        github: "https://github.com/Prasadkadam03/Customized_Virtual_File_System_-CVFS-",
        demo: "https://github.com/Prasadkadam03/Customized_Virtual_File_System_-CVFS-",
        featured: false
    }
];

const SKILL_GROUPS = [
    {
        title: "Frontend Craft",
        icon: <Globe size={20} />,
        skills: ["React", "Next.js", "Angular", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "HTML5/CSS3", "Framer Motion"]
    },
    {
        title: "Backend & APIs",
        icon: <Server size={20} />,
        skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Zod Validation"]
    },
    {
        title: "Data & Ops",
        icon: <Layers size={20} />,
        skills: ["MongoDB (Mongoose)", "PostgreSQL", "MySQL", "Prisma ORM", "Git/GitHub", "Docker (basic)", "CI/CD (learning)", "Vercel & Cloudflare Workers"]
    }
];

const PROCESS_STEPS = [
    {
        title: "Discovery & Scope",
        description: "Clarify goals, users, and success metrics before writing code.",
        icon: <Search size={24} />
    },
    {
        title: "Data & API Design",
        description: "Model schemas and REST endpoints with validation and authentication baked in.",
        icon: <Layers size={24} />
    },
    {
        title: "Build & Iterate",
        description: "Ship React/TypeScript frontends and Node/Express services in small increments.",
        icon: <Code2 size={24} />
    },
    {
        title: "Ship & Observe",
        description: "Deploy to Vercel/Cloudflare, test flows, and monitor performance to refine.",
        icon: <Rocket size={24} />
    }
];

const QUICK_FACTS = [
    { label: "Current Role", value: "Junior Developer @ VIZIPP", icon: <BriefcaseBusiness size={16} /> },
    { label: "Location", value: "Nashik, India (IST)", icon: <Globe size={16} /> },
    { label: "Availability", value: "Open to full-time & freelance contracts", icon: <Rocket size={16} /> },
    { label: "Response Time", value: "Replies within 24 hours", icon: <Clock size={16} /> }
];

const EXPERIENCE = [
    {
        company: "VIZIPP",
        role: "Junior Developer",
        period: "Oct 2025 – PRESENT",
        description: "Owning React/Angular UI components, Node/Express endpoints with JWT + Zod, and MongoDB models. Focused on latency wins, payload trims, and release-ready PRs across sprints."
    },
    {
        company: "VIZIPP",
        role: "Full Stack Developer Intern",
        period: "Apr 2025 – Sep 2025",
        description: "Shipped 10+ responsive React/Angular components, 8+ REST endpoints, and CRUD flows with Mongoose models. Improved average endpoint latency by ~25% on high-traffic routes."
    },
];

const FAQS = [
    {
        q: "Can you own both frontend and backend?",
        a: "Yes. I build React/Next/Angular interfaces and pair them with Node.js/Express APIs, JWT auth, and Zod validation for predictable inputs."
    },
    {
        q: "How do you handle databases?",
        a: "I model data in MongoDB with Mongoose or in SQL with Prisma/PostgreSQL/MySQL, keeping indexes, relationships, and migrations documented."
    },
    {
        q: "What does delivery look like?",
        a: "Short feedback loops. I share progress in days, not weeks, ship to Vercel/Cloudflare early, and keep API docs/Postman collections updated."
    }
];

const SERVICES = [
    {
        title: "Product UI Engineering",
        description: "Responsive, accessible interfaces in React/Next/Angular with reusable components and micro-animations.",
        icon: <Code2 size={24} />
    },
    {
        title: "Web App Development",
        description: "Full-stack web builds from landing pages to dashboards, wired with forms, auth, and integrations.",
        icon: <Layers size={24} />
    },
    {
        title: "Full-Stack Delivery",
        description: "React/Next.js frontends paired with Node/Express APIs, JWT, Zod validation, and CI-ready workflows.",
        icon: <Rocket size={24} />
    },
    {
        title: "API + Auth Development",
        description: "Express.js REST APIs with JWT authentication, server-side validation, and predictable error handling.",
        icon: <ShieldCheck size={24} />
    },
    {
        title: "Data Modeling & Delivery",
        icon: <Server size={24} />,
        description: "MongoDB/PostgreSQL schemas via Mongoose or Prisma, tuned queries, and deploys on Vercel/Cloudflare Workers."
    },
    {
        title: "App & Platform Launch",
        description: "Performance-checked deployments, observability hooks, and release support for web and edge apps.",
        icon: <Globe size={24} />
    }
];

const Home = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Handle scrolling for paths like /services, /work, /workflow, /contact
        const sectionId = pathname.replace('/', '');
        if (sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                // Short delay to ensure component is rendered
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [pathname]);

    return (
        <>
            {/* Hero Section */}
            <section className="min-h-screen pt-24 md:pt-40 flex items-center relative md:px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-15 items-center w-full">
                    <div className="space-y-8 md:space-y-10 md:px-0  px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-3 px-4 py-2 bg-neutral-50 border border-neutral-200  text-[10px] font-bold tracking-[0.2em] uppercase"
                        >
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full  bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex  h-2 w-2 bg-green-500"></span>
                            </div>
                            Open for full-time + freelance
                        </motion.div>

                        <div className="space-y-1">
                            <motion.h1
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-5xl md:text-9xl font-display font-bold leading-[0.9] tracking-tighter"
                            >
                                PRASAD<br />
                                <span className="outline-text text-transparent hover:text-black transition-colors duration-700">KADAM</span>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-2xl text-neutral-600 max-w-xl font-light leading-relaxed border-l-2 border-black pl-6"
                        >
                            Full Stack Developer delivering React/TypeScript frontends and Node.js/Express APIs with JWT security, Zod validation, and tuned queries across MongoDB, PostgreSQL, and MySQL. Open to full-time roles and freelance/contract projects.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap gap-4 md:gap-6 pt-6"
                        >
                            <a href="/#/contact" className="group relative px-6 md:px-8 py-3 md:py-4 bg-black text-white font-bold uppercase tracking-widest text-[10px] md:text-xs overflow-hidden text-center">
                                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Book Intro Call</span>
                                <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                            </a>
                            <a href="https://drive.google.com/drive/folders/1GAf5XFtumVJgHiWj9p4yz45hB3_40kCt?usp=drive_link" target="_blank" rel="noopener noreferrer" className="group px-6 md:px-8 py-3 md:py-4 border border-black text-black font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-black hover:text-white transition-all duration-300 text-center">
                                Download Resume
                            </a>
                            <a href="/#/work" className="group px-6 md:px-8 py-3 md:py-4 border border-neutral-200 text-neutral-700 font-bold uppercase tracking-widest text-[10px] md:text-xs hover:border-black hover:text-black transition-all duration-300 text-center">
                                View Projects
                            </a>
                        </motion.div>
                    </div>

                    <div className="relative pb-12 md:px-0 px-3 lg:pb-0">
                        <div className="absolute -inset-4 bg-linear-to-tr from-neutral-200 to-transparent  blur-3xl opacity-30 pointer-events-none" />
                        <GPTWindow />
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {QUICK_FACTS.map((fact) => (
                        <div key={fact.label} className="p-4 md:p-5 bg-white border border-neutral-200  shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start gap-3">
                            <div className="mt-0.5 text-neutral-500">
                                {fact.icon}
                            </div>
                            <div>
                                <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold mb-1">{fact.label}</p>
                                <p className="text-sm md:text-base text-neutral-800 font-semibold leading-snug">{fact.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 md:py-40 px-6 bg-neutral-50">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading title="Services" subtitle="Full-stack delivery across UI engineering, API/auth layers, and reliable data models." />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                        {SERVICES.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10 }}
                                className="p-8 md:p-10 bg-white border border-neutral-200 hover:border-black hover:shadow-2xl transition-all duration-500 group"
                            >
                                <div className="mb-6 md:mb-8 p-4 bg-neutral-50 w-fit rounded group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                    {s.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase tracking-tight">{s.title}</h3>
                                <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed mb-8">{s.description}</p>
                                <a href="/#/contact" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors cursor-pointer">
                                    <div className="h-px w-4 bg-current" /> Explore
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-24 md:py-40 bg-black text-white px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-16 md:mb-24"
                    >
                        <h2 className="text-4xl md:text-7xl font-display font-bold mb-6 tracking-tighter uppercase">Experience</h2>
                        <div className="h-1 w-24 bg-white mb-8" />
                    </motion.div>

                    <div className="space-y-12 md:space-y-20">
                        {EXPERIENCE.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-12 gap-6 md:gap-10 border-t border-white/10 pt-10 group"
                            >
                                <div className="md:col-span-3">
                                    <span className="font-mono text-sm tracking-[0.2em] text-neutral-500 group-hover:text-white transition-colors">{exp.period}</span>
                                </div>
                                <div className="md:col-span-9">
                                    <h3 className="text-2xl md:text-3xl font-display font-bold uppercase mb-2">{exp.company}</h3>
                                    <h4 className="text-lg md:text-xl text-neutral-400 mb-4 md:mb-6 flex items-center gap-2"><BriefcaseBusiness size={18} /> {exp.role}</h4>
                                    <p className="text-lg md:text-xl font-light text-neutral-500 max-w-3xl leading-relaxed group-hover:text-neutral-300 transition-colors">
                                        {exp.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section id="workflow" className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
                <SectionHeading title="Delivery Workflow" subtitle="How I take React/Node ideas from notes to deployed, stable releases." centered />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative mt-16 md:mt-20">
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-neutral-100 z-0" />
                    {PROCESS_STEPS.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative z-10 text-center group"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-white border-2 border-neutral-200 flex items-center justify-center mb-6 md:mb-8 group-hover:border-black group-hover:scale-110 transition-all duration-300 shadow-xl shadow-neutral-100">
                                <div className="text-neutral-400 group-hover:text-black transition-colors">{step.icon}</div>
                            </div>
                            <h3 className="font-display font-bold uppercase mb-4 text-base md:text-lg">0{i + 1}. {step.title}</h3>
                            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed px-2">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-24 md:py-40 bg-neutral-950 text-white px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 md:mb-24">
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tighter uppercase">Technical Stack</h2>
                        <div className="h-1 w-24 bg-white" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20">
                        {SKILL_GROUPS.map((group, idx) => (
                            <div key={idx} className="space-y-8 md:space-y-10">
                                <div className="flex items-center gap-4 border-b border-white/20 pb-4">
                                    {group.icon}
                                    <h3 className="font-display font-bold text-xl md:text-2xl uppercase tracking-tight">{group.title}</h3>
                                </div>
                                <div className="flex flex-col gap-4 md:gap-6">
                                    {group.skills.map((skill, sIdx) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: sIdx * 0.05 }}
                                            className="flex items-center justify-between group cursor-default"
                                        >
                                            <span className="font-mono text-sm md:text-base text-neutral-400 group-hover:text-white transition-colors">{skill}</span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-green-500 transition-colors" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Work Section */}
            <section id="work" className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
                <SectionHeading title="Projects" subtitle="Recent full-stack builds shipped with React/TypeScript, Node.js/Express, and well-modeled data layers." />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {PROJECTS.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className={`p-8 md:p-10 bg-white border border-neutral-200 flex flex-col hover:border-black hover:shadow-2xl transition-all duration-300 ${project.featured ? 'md:col-span-2 lg:col-span-1 border-black shadow-lg bg-neutral-50' : ''}`}
                        >
                            <div className="mb-6 md:mb-8 flex items-center justify-between border-b border-neutral-200 pb-4">
                                <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-400">SYS_0{idx + 1}</span>
                                {project.featured && <span className="text-[10px] font-bold bg-black text-white px-2 py-1 uppercase tracking-wider">Featured</span>}
                            </div>

                            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 uppercase leading-none">{project.title}</h3>
                            <p className="text-sm md:text-base text-neutral-500 mb-8 grow font-light leading-relaxed">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-mono font-bold uppercase border border-neutral-200 px-3 py-1 text-neutral-600">{tag}</span>
                                ))}
                            </div>

                            <div className="flex items-center gap-6 pt-4 mt-auto">
                                <a
                                    href={project.demo}
                                    className="text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Live <span className="hidden sm:inline">Demo</span> <ExternalLink size={12} />
                                </a>
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="ml-auto text-neutral-400 hover:text-black transition-colors"><Github size={20} /></a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 md:py-40 px-6 max-w-4xl mx-auto border-t border-neutral-200">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 uppercase">FAQs</h2>
                    <p className="text-sm md:text-base text-neutral-500">How I ship projects, structure data, and communicate.</p>
                </div>
                <div className="grid gap-6 md:gap-8">
                    {FAQS.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-6 md:p-8 border border-neutral-200 hover:border-black transition-colors bg-neutral-50"
                        >
                            <h4 className="font-display font-bold text-lg md:text-xl uppercase mb-4 flex items-start gap-3">
                                <span className="text-neutral-300">Q.</span> {faq.q}
                            </h4>
                            <p className="font-light text-neutral-600 leading-relaxed pl-6 md:pl-8 border-l border-neutral-300 text-base md:text-lg">
                                {faq.a}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact / Hiring */}
            <section id="contact" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
                    {/* Left Column: Content */}
                    <div className="space-y-6 md:pr-8">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Ready to Hire</p>
                        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight uppercase leading-[1.1] text-balance">
                            Let's ship your next release
                        </h2>
                        <p className="text-base md:text-xl text-neutral-600 leading-relaxed max-w-2xl">
                            I build production React/TypeScript frontends and Node.js/Express APIs with JWT auth, Zod validation, and tuned MongoDB/PostgreSQL queries. Open to full-time roles and freelance/contract work. I reply within one business day.
                        </p>

                        <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm text-neutral-700">
                            <span className="px-3 py-1.5  bg-neutral-100 border border-neutral-200">Frontend: React, Next.js</span>
                            <span className="px-3 py-1.5  bg-neutral-100 border border-neutral-200">Backend: Node.js, Express</span>
                            <span className="px-3 py-1.5  bg-neutral-100 border border-neutral-200">Databases: MongoDB, SQL</span>
                            <span className="px-3 py-1.5  bg-neutral-100 border border-neutral-200">Git/GitHub, CI/CD</span>
                        </div>
                    </div>

                    {/* Right Column: Contact Card */}
                    <div className="bg-white border border-neutral-200  shadow-xl p-5 md:p-8 space-y-6 w-full">
                        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
                            <div className="h-2.5 w-2.5 bg-green-500 animate-pulse" />
                            <p className="text-xs font-mono font-medium text-neutral-500 uppercase tracking-wider">Taking new engagements now</p>
                        </div>

                        <div className="space-y-3">
                            {/* Email Item */}
                            <a href="mailto:prasadkadam29503@gmail.com" className="group flex items-center justify-between gap-4 p-4 border border-neutral-200  hover:border-black hover:shadow-sm transition-all">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2.5 bg-neutral-100 rounded group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-0.5">Email</p>
                                        <p className="text-neutral-900 font-semibold break-all text-sm md:text-base">prasadkadam29503@gmail.com</p>
                                    </div>
                                </div>
                            </a>

                            {/* GitHub Item */}
                            <a href="https://github.com/prasadkadam03" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 p-4 border border-neutral-200  hover:border-black hover:shadow-sm transition-all">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2.5 bg-neutral-100 rounded group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                                        <Github size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-0.5">GitHub</p>
                                        <p className="text-neutral-900 font-semibold truncate text-sm md:text-base">github.com/prasadkadam03</p>
                                    </div>
                                </div>
                                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-400 shrink-0">OSS</span>
                            </a>

                            {/* LinkedIn Item */}
                            <a href="https://www.linkedin.com/in/prasadkadam03/" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 p-4 border border-neutral-200 hover:border-black hover:shadow-sm transition-all">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2.5 bg-neutral-100 rounded group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                                        <ExternalLink size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-0.5">LinkedIn</p>
                                        <p className="text-neutral-900 font-semibold truncate text-sm md:text-base">in/prasadkadam03</p>
                                    </div>
                                </div>
                            </a>

                            {/* Call Item */}
                            <a href="tel:+918055907280" className="group flex items-center justify-between gap-4 p-4 border border-neutral-200 hover:border-black hover:shadow-sm transition-all">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2.5 bg-neutral-100 rounded group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-0.5">Call</p>
                                        <p className="text-neutral-900 font-semibold text-sm md:text-base">+91 80559 07280</p>
                                    </div>
                                </div>
                                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-400 shrink-0">IST</span>
                            </a>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <a href="/#/pricing" className="flex items-center justify-center px-6 py-4 bg-black text-white font-bold uppercase tracking-[0.15em] text-[11px]  hover:bg-neutral-800 transition-colors text-center">
                                View Pricing
                            </a>
                            <a href="https://drive.google.com/..." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-6 py-4 border border-neutral-300 text-neutral-800 font-bold uppercase tracking-[0.15em] text-[11px] hover:border-black transition-colors text-center">
                                Resume
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section CTA */}
            <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto bg-neutral-50 border-y border-neutral-200">
                <div className="text-center">
                    <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-6 md:mb-8">Pricing</h2>
                    <p className="text-lg md:text-xl text-neutral-500 font-light max-w-2xl mx-auto mb-10 md:mb-12">
                        Open to full-time offers, long-term contracts, and scoped freelance work. Share your scope to get a tailored rate card.
                    </p>
                    <a href="#/pricing" className="inline-block px-8 md:px-12 py-4 md:py-5 bg-black text-white font-bold uppercase tracking-[0.2em] text-xs md:text-sm hover:scale-105 transition-transform shadow-2xl">
                        View Rate Card
                    </a>
                </div>
            </section>

            {/* Footer / Contact */}
            <Footer />
        </>
    );
};

export default Home;
