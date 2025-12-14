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
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <m.div
                    initial={{ scale: 0.5, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.5, y: 50 }}
                    className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-8 max-w-md w-full text-center relative shadow-[0_0_50px_rgba(6,182,212,0.3)]"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-300 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-slate-800/50"
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
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                                Share on X
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
