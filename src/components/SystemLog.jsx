import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SystemLog = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({ cpu: 12, mem: 4.2, net: 120 });

    useEffect(() => {
        // Log interval
        const messages = [
            "ASSEMBLING THE FRONTEND... pixels, stay where I put you",
            "POLLING THE DATABASE... 'Are we there yet?'",
            "CENTERING THE DIV... this might take a while",
            "SCOLDING THE CACHE... it's being stubborn again",
            "CHECKING STACK OVERFLOW... for the 4th time this hour",
            "IMPORTING WISDOM... from random NPM packages",
            "ZOD VALIDATION IN PROGRESS... keeping the bad data out",
            "OPTIMIZING MONGODB QUERIES... making them zoom 🏎️",
            "REMOVING CONSOLE.LOGS... mostly the 'pls work' ones",
            "RE-READING THE DOCS... because I skipped them the first time",
            "NEGOTIATING WITH CSS... it's winning",
            "SQUASHING BUGS... they have families, you know 🐛",
            "GENERATING TYPESCRIPT ERRORS... for character building",
            "DRINKING COFFEE... the real backend engine ☕",
            "PUSHING TO PROD... hold your breath",
            "GIT COMMIT -M 'FIX'... for the 10th time",
            "CLEANING UP THE TRASH... Garbage Collector is on duty 🗑️",
            "BYPASSING THE FIREWALL... legally, of course",
            "IGNORING JAVASCRIPT WARNINGS... they're just suggestions",
            "SYSTEM READY... (standard terms and conditions apply)"
        ];

        const logInterval = setInterval(() => {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + "." + Math.floor(Math.random() * 999);

            setLogs(prev => {
                const newLogs = [...prev, `[${timestamp}] ${msg}`];
                if (newLogs.length > 7) newLogs.shift();
                return newLogs;
            });
        }, 1500);

        // Stats interval
        const statsInterval = setInterval(() => {
            setStats({
                cpu: Math.floor(Math.random() * 30) + 10,
                mem: (Math.random() * 2 + 3).toFixed(1),
                net: Math.floor(Math.random() * 100) + 50
            });
        }, 800);

        return () => {
            clearInterval(logInterval);
            clearInterval(statsInterval);
        };
    }, []);

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity, scale }}
            className="w-full max-w-4xl mx-auto mt-10 md:mt-20 border border-white/20 bg-white/10 backdrop-blur-md font-mono text-[10px] text-neutral-700 shadow-xl rounded-lg overflow-hidden"
        >
            <div className="flex border-b border-white/20 bg-linear-to-r from-white/5 to-transparent px-3 md:px-4 py-2 justify-between items-center backdrop-blur-sm">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
                        <span className="font-bold tracking-widest uppercase text-[8px] md:text-[10px] text-neutral-800">System Status: ONLINE</span>
                    </div>
                    <div className="hidden md:flex gap-4 text-neutral-600">
                        <span className="transition-colors hover:text-neutral-800">CPU: {stats.cpu}%</span>
                        <span className="transition-colors hover:text-neutral-800">MEM: {stats.mem}GB</span>
                        <span className="transition-colors hover:text-neutral-800">NET: {stats.net}ms</span>
                    </div>
                </div>
                <div className="text-neutral-500 text-[8px] md:text-[10px] font-semibold">V.2.0.4</div>
            </div>

            <div className="p-3 md:p-4 h-32 md:h-40 overflow-hidden relative bg-linear-to-b from-white/5 to-white/10">
                <div className="absolute inset-x-0 bottom-0 h-10 md:h-12 bg-linear-to-t from-white/30 via-white/10 to-transparent pointer-events-none z-10" />
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-1 font-medium truncate text-[9px] md:text-[10px] text-neutral-700"
                    >
                        <span className="text-neutral-400 mr-2">{'>'}</span>{log}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default SystemLog;
