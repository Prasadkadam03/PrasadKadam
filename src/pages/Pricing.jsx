import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Footer from '../components/Footer';

const PRICING_PLANS = [
    {
        title: "Landing Page / Portfolio",
        price: "₹5,399",
        originalPrice: "₹7,000",
        unit: "/project",
        description: "Perfect for resumes, marketing pages, and lightweight product intros.",
        features: ["React/Next.js + Tailwind UI", "Responsive & accessible layout", "Deployment to Vercel with custom domain guidance", "Essential SEO and analytics hooks", "3 revision loops included"]
    },
    {
        title: "Full Stack MVP",
        price: "₹7,399",
        originalPrice: "₹9,000",
        unit: "/project",
        description: "A complete dynamic application connecting your UI to a real database.",
        features: ["React/Next.js frontend with reusable components", "Node.js/Express REST APIs with JWT auth", "Zod/server-side validation + predictable error handling", "MongoDB or PostgreSQL schema setup (Mongoose/Prisma)", "Postman collection + API docs"],


    },
    {
        title: "Edge/Serverless App",
        price: "₹10,999",
        originalPrice: "₹12,500",
        unit: "/project",
        description: "Low-latency deployments on Cloudflare Workers or Vercel edge.",
        features: ["Cloudflare Workers or Vercel functions", "JWT-protected routes and rate limiting", "Prisma/PostgreSQL or MongoDB data layer", "CI/CD hooks for quick iterations", "Performance + observability checks"],


    },
    {
        title: "Enterprise Custom",
        price: "Custom",
        originalPrice: "",
        unit: "",
        description: "Tailored architecture for large-scale or complex requirements.",
        features: ["High-Availability Architecture Design", "Enterprise Cloud Infrastructure (AWS/GCP)", "Rigorous Security & Compliance Audits", "Priority 24/7 Dedicated Support"],
        buttonText: "Book a Call to Discuss"
    }
];


const Pricing = () => {
    return (
        <div className="pt-24 md:pt-40 min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeading title="Pricing" subtitle="Pick a scope that fits your build or request a custom engagement." centered />

        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-4 bg-green-50 border border-green-200 flex items-center justify-center gap-3 text-sm md:text-base text-green-800 "
        >
            <Info size={20} className="text-green-600" />
            <span className="font-bold uppercase tracking-wide">Early Bird Offer:</span>
            <span>Limited availability pricing — lock your slot for this quarter.</span>
        </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {PRICING_PLANS.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="p-6 md:p-8 border border-neutral-200 bg-white hover:border-black transition-colors flex flex-col"
                        >
                            <h3 className="text-base md:text-lg font-bold uppercase tracking-widest mb-4">{plan.title}</h3>
                            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-2">Starts from</span>
                            <div className="mb-6 flex items-baseline gap-2">
                                {plan.originalPrice && (
                                    <span className="text-neutral-400 line-through text-xs md:text-sm decoration-red-500/50">{plan.originalPrice}</span>
                                )}
                                <span className={`text-3xl md:text-4xl font-display font-bold ${plan.price === 'Custom' ? 'text-black' : 'text-green-600'}`}>{plan.price}</span>
                                {plan.unit && <span className="text-neutral-500 text-xs md:text-sm">{plan.unit}</span>}
                            </div>
                            <p className="text-neutral-500 font-light mb-8 text-sm min-h-[40px]">{plan.description}</p>
                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-3 text-sm font-mono text-neutral-600">
                                        <div className={`w-1.5 h-1.5 rounded-full ${plan.price === 'Custom' ? 'bg-black' : 'bg-green-500'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={`mailto:prasadkadam29503@gmail.com?subject=${encodeURIComponent(`Project Inquiry: ${plan.title}`)}&body=${encodeURIComponent(`I am interested in the ${plan.title} plan (${plan.price}).\n\nPlease contact me for further discussion.`)}`}
                                className={`w-full py-3 border border-black text-center font-bold uppercase text-xs transition-colors ${plan.price === 'Custom' ? 'bg-black text-white hover:bg-neutral-800' : 'hover:bg-black hover:text-white'}`}
                            >
                                {plan.buttonText || "Select Plan"}
                            </a>
                        </motion.div>
                    ))}
                </div>

            </div>

            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
};

export default Pricing;
