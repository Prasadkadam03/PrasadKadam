import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    const navItems = [
        { name: 'Services', id: 'services' },
        { name: 'Workflow', id: 'workflow' },
        { name: 'Work', id: 'work' },
        { name: 'Contact', id: 'contact' }
    ];

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuVariants = {
        closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
        open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30, staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const itemVariants = {
        closed: { opacity: 0, x: 20 },
        open: { opacity: 1, x: 0 }
    };

    const renderMobileLink = (item, index) => {
        const Tag = isHome ? 'a' : Link;
        const to = `/${item.id}`;
        const href = `/#/${item.id}`;

        return (
            <motion.div key={item.name} variants={itemVariants}>
                <Tag
                    to={to}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between py-5 border-b border-white/10 w-full"
                >
                    <span className="text-2xl font-display font-bold uppercase tracking-tighter text-white group-hover:text-neutral-400 transition-colors">
                        {item.name}
                    </span>
                    <ArrowRight size={20} className="text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </Tag>
            </motion.div>
        );
    };

    return (
        <nav className="fixed top-0 w-full z-10000 bg-white border-b border-black/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" onClick={() => setIsOpen(false)} className="font-mono font-bold text-black tracking-widest text-lg uppercase flex items-center gap-2 z-70">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full  bg-black opacity-75"></span>
                        <span className="relative inline-flex  h-2 w-2 bg-black"></span>
                    </div>                    Prasad Kadam
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-10 text-[11px] text-neutral-500 items-center">
                    {navItems.map(item => (
                        <a
                            key={item.name}
                            href={`/#/${item.id}`}
                            className="font-bold uppercase tracking-[0.2em] hover:text-black transition-colors relative group py-2"
                        >
                            {item.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                    <Link to="/pricing" className="hover:text-black transition-colors relative group py-2 text-green-600 font-bold uppercase tracking-[0.2em]">
                        Pricing
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={toggleMenu}
                    className={`md:hidden p-2 z-100 transition-colors flex items-center gap-2 ${isOpen ? 'text-white hover:bg-white/10' : 'text-black hover:bg-neutral-100'}`}
                    aria-label="Toggle Menu"
                >
                    <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">
                        {isOpen ? 'Close' : 'Menu'}
                    </span>
                    <div className="relative w-6 h-6">
                        <motion.div
                            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="absolute top-1 left-0 w-6 h-0.5 bg-current"
                        />
                        <motion.div
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="absolute top-3 left-0 w-6 h-0.5 bg-current"
                        />
                        <motion.div
                            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="absolute top-5 left-0 w-6 h-0.5 bg-current"
                        />
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-80 md:hidden"
                        />
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-black z-90 md:hidden p-8 flex flex-col shadow-2xl border-l border-white/10"
                        >
                            <div className="flex flex-col h-full overflow-y-auto">
                                <div className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-3 shrink-0">
                                    <div className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
                                    Navigation Hub
                                </div>

                                <div className="space-y-1 shrink-0">
                                    {navItems.map((item, i) => renderMobileLink(item, i))}
                                    <motion.div variants={itemVariants}>
                                        <Link
                                            to="/pricing"
                                            onClick={() => setIsOpen(false)}
                                            className="group flex items-center justify-between py-5 border-b border-white/10"
                                        >
                                            <span className="text-2xl font-display font-bold uppercase tracking-tighter text-green-500 group-hover:text-green-400 transition-colors">
                                                Pricing
                                            </span>
                                            <ArrowRight size={20} className="text-green-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                                        </Link>
                                    </motion.div>
                                </div>

                                <div className="mt-auto pt-10 space-y-8 shrink-0">
                                    <div className="space-y-4">
                                        <div className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">Connect</div>
                                        <div className="flex gap-6">
                                            <a href="https://github.com/prasadkadam03" target="_blank" rel="noreferrer" className="text-white hover:text-neutral-400 transition-colors"><Github size={24} /></a>
                                            <a href="https://www.linkedin.com/in/prasadkadam03/" target="_blank" rel="noreferrer" className="text-white hover:text-neutral-400 transition-colors"><Linkedin size={24} /></a>
                                            <a href="mailto:prasadkadam29503@gmail.com" className="text-white hover:text-neutral-400 transition-colors"><Mail size={24} /></a>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-white/5 border border-white/10 rounded">
                                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">System Status</div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-white text-xs font-mono">OPERATIONAL</span>
                                            <span className="text-green-500 text-[10px] font-bold animate-pulse font-mono">100%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Nav;
