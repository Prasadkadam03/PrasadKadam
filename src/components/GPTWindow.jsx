import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const starterMessages = [
    { role: 'ai', content: 'Hi there! I’m PrasadGPT. Ask me about projects, pricing, timelines, or tech stack.' }
];

const quickReply = (prompt) => {
    const lower = prompt.toLowerCase();
    if (lower.includes('pricing') || lower.includes('rate')) return 'I offer scoped pricing with clear deliverables. Share your scope and timeline to get an exact quote.';
    if (lower.includes('stack') || lower.includes('tech') || lower.includes('skills')) return 'Typical stack: React/Next.js, Node, and PostgreSQL.';
    if (lower.includes('available') || lower.includes('timeline')) return 'I can start new engagements this week and usually deliver first milestones within a few days.';
    return 'Got it! I’ll follow up with a clear plan. Want to share scope, timeline, and budget?';
};

const GPTWindow = () => {
    const [messages, setMessages] = useState(starterMessages);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        setMessages(prev => [...prev, { role: 'user', content: trimmed }]);
        setInput('');
        setIsThinking(true);

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'ai', content: quickReply(trimmed) }]);
            setIsThinking(false);
        }, 800);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl mx-auto bg-white border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
            {/* Header */}
            <div className="border-b-2 border-black px-4 py-3 bg-white flex justify-between items-center relative overflow-hidden">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full bg-black opacity-75 "></span>
                        <span className="relative inline-flex h-3 w-3 bg-black"></span>
                    </div>
                    <span className="font-black uppercase tracking-tighter text-lg">PrasadGPT </span>
                    <span className='font-extralight  uppercase text-xs  text-red-500 '>Under developement....</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold border border-black px-2 py-1 uppercase bg-white">
                    <span>v1.0.4 — Live</span>
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full bg-green-500 opacity-75 "></span>
                        <span className="relative inline-flex h-2 w-2 bg-green-500 "></span>
                    </div>
                </div>
            </div>

            

            {/* Chat Body */}
            <div
                ref={scrollRef}
                className="h-80 overflow-y-auto p-4 space-y-4 bg-white scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] px-4 py-3 border border-black font-medium text-sm leading-snug ${msg.role === 'user'
                                        ? 'bg-orange-50 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                        : 'bg-white text-black'
                                    }`}
                            >
                                <span className="block text-[10px] uppercase font-black mb-1 opacity-50">
                                    {msg.role === 'user' ? 'You' : 'PrasadGPT'}
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
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                        rows={1}
                        placeholder="Wait its underdevelopement . . . !"
                        className="flex-1 border border-black p-3 text-sm font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:bg-gray-50 resize-none"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-orange-500 border border-black px-6 py-2 font-black uppercase text-sm hover:bg-orange-600 active:translate-x-0.5 active:translate-y-0.5 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                    >
                        Send
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default GPTWindow;
