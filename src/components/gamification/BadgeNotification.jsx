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
        const text = `I just unlocked the "${badge.title}" badge on Agentic AI Home! 🚀 #AgenticAI #Productivity`;
        const shareUrl = badge.image ? `https://agenticaihome.com${badge.image}` : 'https://agenticaihome.com';
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://agenticaihome.com')}`;
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

                        <div className="flex gap-3 justify-center flex-wrap">
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                Share
                            </button>
                            <button
                                onClick={() => {
                                    const url = encodeURIComponent('https://agenticaihome.com');
                                    const quote = encodeURIComponent(`I just unlocked the "${badge.title}" badge on Agentic AI Home! 🚀`);
                                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`, '_blank');
                                }}
                                className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white px-5 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                Facebook
                            </button>
                            <button
                                onClick={onClose}
                                className="px-5 py-3 rounded-xl font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
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
