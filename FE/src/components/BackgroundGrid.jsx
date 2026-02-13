import React from 'react';
import { motion } from 'framer-motion';

const BackgroundGrid = () => (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: '120px 120px' }} />
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
            style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
        />
    </div>
);

export default BackgroundGrid;
