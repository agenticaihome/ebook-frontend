import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Star, ChevronRight, X } from 'lucide-react';

// ============================================
// LEVEL UP CELEBRATION MODAL
// ============================================
const LevelUpCelebration = ({ isOpen, onClose, newRank }) => {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowConfetti(true);
            // Play sound effect (if implemented)
            // playSound('levelup');

            // Auto-close after 5 seconds
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!newRank) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

                    {/* Confetti particles */}
                    {showConfetti && (
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(50)].map((_, i) => (
                                <m.div
                                    key={i}
                                    initial={{
                                        y: -20,
                                        x: Math.random() * window.innerWidth,
                                        rotate: 0,
                                        scale: Math.random() * 0.5 + 0.5
                                    }}
                                    animate={{
                                        y: window.innerHeight + 20,
                                        rotate: Math.random() * 360,
                                    }}
                                    transition={{
                                        duration: Math.random() * 2 + 2,
                                        delay: Math.random() * 0.5,
                                        ease: 'linear'
                                    }}
                                    className={`absolute w-3 h-3 rounded-sm ${['bg-yellow-400', 'bg-cyan-400', 'bg-purple-400', 'bg-pink-400', 'bg-green-400'][Math.floor(Math.random() * 5)]
                                        }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Modal content */}
                    <m.div
                        initial={{ scale: 0.5, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.5, y: 50 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="relative bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 border-2 border-yellow-500/50 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl shadow-purple-500/20"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Crown icon */}
                        <m.div
                            animate={{
                                rotate: [0, -10, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/30"
                        >
                            <Crown className="text-white" size={48} />
                        </m.div>

                        {/* Title */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-2 flex items-center justify-center gap-2">
                                <Sparkles size={14} />
                                Level Up!
                                <Sparkles size={14} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {newRank.name}
                            </h2>
                            <p className="text-slate-400 mb-6">
                                You've earned a new rank!
                            </p>
                        </m.div>

                        {/* Rank icon */}
                        <m.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.4 }}
                            className="text-6xl mb-6"
                        >
                            {newRank.icon}
                        </m.div>

                        {/* Captain message */}
                        <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700">
                            <div className="flex items-start gap-3">
                                <img
                                    src="/images/captain-efficiency-default.png"
                                    alt="Captain"
                                    className="w-10 h-10 rounded-full bg-slate-700"
                                    onError={(e) => { e.target.src = ''; e.target.className = 'hidden'; }}
                                />
                                <p className="text-sm text-slate-300 text-left italic">
                                    "Outstanding work, Operator! Your dedication to mastering AI agents is truly impressive. Keep pushing forward!"
                                </p>
                            </div>
                        </div>

                        {/* Continue button */}
                        <m.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClose}
                            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                        >
                            Continue Quest
                            <ChevronRight size={18} />
                        </m.button>
                    </m.div>
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default LevelUpCelebration;
