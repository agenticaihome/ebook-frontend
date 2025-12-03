import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Share2, X, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const BadgeNotification = ({ badge, onClose }) => {
    useEffect(() => {
        if (badge) {
            // Trigger confetti explosion
            const count = 200;
            const defaults = {
                origin: { y: 0.9, x: 0.5 }  // Bottom center of viewport
            };

            function fire(particleRatio, opts) {
                confetti({
                    ...defaults,
                    ...opts,
                    particleCount: Math.floor(count * particleRatio)
                });
            }

            fire(0.25, { spread: 26, startVelocity: 55 });
            fire(0.2, { spread: 60 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });
        }
    }, [badge]);

    if (!badge) return null;

    const handleShare = () => {
        const text = `I just unlocked the "${badge.title}" badge on Agentic AI Home! I'm building my autonomous future. 🚀 #AgenticAI #Productivity`;
        const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
        window.open(url, '_blank');
    };

    return (
        <AnimatePresence>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-end justify-center pb-8 bg-black/80 backdrop-blur-sm p-4"
            >
                <m.div
                    initial={{ scale: 0.5, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.5, y: 50 }}
                    className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-8 max-w-md w-full text-center relative shadow-[0_0_50px_rgba(6,182,212,0.3)]"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50 ring-4 ring-cyan-900/50">
                        <Trophy size={48} className="text-white" />
                    </div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                            Badge Unlocked!
                        </h2>
                        <h3 className="text-2xl font-bold text-white mb-4">{badge.title}</h3>
                        <p className="text-slate-300 mb-8 leading-relaxed">
                            {badge.description}
                        </p>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
                            >
                                <Share2 size={20} />
                                Share
                            </button>
                            <button
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                            >
                                Keep Learning
                            </button>
                        </div>
                    </m.div>
                </m.div>
            </m.div>
        </AnimatePresence>
    );
};

export default BadgeNotification;
