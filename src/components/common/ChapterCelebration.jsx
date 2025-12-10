import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Share2, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSound } from '../../context/SoundContext';

/**
 * ChapterCelebration - Pixar-level celebration moment for chapter completion
 * This is the MVP celebration component with confetti and Captain E
 */
const ChapterCelebration = ({
    chapterNumber,
    chapterTitle,
    nextChapterRoute,
    nextChapterTitle,
    isVisible = true,
    onDismiss,
    isFinalChapter = false
}) => {
    const [showContent, setShowContent] = useState(false);
    const { playChime } = useSound();

    useEffect(() => {
        if (isVisible) {
            // Delay content appearance for dramatic effect
            const timer = setTimeout(() => setShowContent(true), 300);

            // Fire confetti and play celebration sound
            fireConfetti();
            playChime('celebration');

            return () => clearTimeout(timer);
        }
    }, [isVisible, playChime]);

    const fireConfetti = () => {
        // Left side burst
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.1, y: 0.6 },
            colors: ['#14b8a6', '#06b6d4', '#f59e0b', '#10b981']
        });

        // Right side burst
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.9, y: 0.6 },
            colors: ['#14b8a6', '#06b6d4', '#f59e0b', '#10b981']
        });

        // Center burst (delayed)
        setTimeout(() => {
            confetti({
                particleCount: 150,
                spread: 120,
                origin: { x: 0.5, y: 0.4 },
                colors: ['#14b8a6', '#06b6d4', '#f59e0b', '#10b981', '#a855f7']
            });
        }, 200);
    };

    const celebrationMessages = {
        1: "Your first agent is live! 🌅",
        2: "Meal planning is now on autopilot! 🍽️",
        3: "You'll never forget important dates again! 🎂",
        4: "Email chaos? Not anymore! 📧",
        5: "Money check-ins are automatic now! 💰",
        6: "Fitness just got easier! 💪",
        7: "Work tasks organized! 💼",
        8: "You just became an agent builder! 🔧",
        9: "Your agents now work together! 🤝",
        10: "YOUR AGENT ARMY IS COMPLETE! 🎖️"
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="relative max-w-lg w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-teal-500/30 p-8 text-center overflow-hidden"
                >
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 pointer-events-none" />

                    {/* Captain E celebrating */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="relative z-10 mb-6"
                    >
                        <div className="w-28 h-28 mx-auto relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-amber-500/30 rounded-full blur-xl animate-pulse" />
                            <img
                                src="/assets/captain-celebrating-transparent.webp"
                                alt="Captain Efficiency celebrating"
                                className="w-full h-full object-contain relative z-10"
                            />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative z-10"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/40 mb-4">
                            <Trophy className="text-amber-400" size={18} />
                            <span className="text-teal-400 font-bold text-sm">
                                {isFinalChapter ? 'ALL 10 CHAPTERS COMPLETE!' : `CHAPTER ${chapterNumber} COMPLETE`}
                            </span>
                        </div>

                        {/* Main headline */}
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                            {isFinalChapter ? (
                                <>You did it! <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Your Agent Army is complete!</span></>
                            ) : (
                                <>Amazing work! <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">🎉</span></>
                            )}
                        </h2>

                        {/* Celebration message */}
                        <p className="text-slate-300 text-lg mb-2">
                            {celebrationMessages[chapterNumber] || "Another agent deployed!"}
                        </p>
                        <p className="text-slate-500 text-sm mb-6">
                            {chapterTitle}
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            {isFinalChapter ? (
                                <>
                                    <Link
                                        to="/graduation"
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20"
                                    >
                                        <Trophy size={18} />
                                        Get My Certificate
                                    </Link>
                                    <button
                                        onClick={() => {
                                            // Share functionality
                                            const shareText = "🎉 I just finished all 10 chapters at @agenticaihome! My AI agents now handle my mornings, meals, emails, and more. The future is here. agenticaihome.com";
                                            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                                            window.open(url, '_blank');
                                        }}
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold rounded-xl transition-all"
                                    >
                                        <Share2 size={18} />
                                        Share
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={nextChapterRoute}
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-500/20"
                                    >
                                        Next Chapter
                                        <ArrowRight size={18} />
                                    </Link>
                                    <button
                                        onClick={onDismiss}
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold rounded-xl transition-all"
                                    >
                                        Stay Here
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Agent count */}
                        <div className="mt-6 pt-4 border-t border-slate-700/50">
                            <p className="text-slate-500 text-sm">
                                🤖 {chapterNumber} of 10 agents deployed
                            </p>
                            <div className="flex justify-center gap-1 mt-2">
                                {[...Array(10)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-3 h-3 rounded-full transition-all ${i < chapterNumber
                                            ? 'bg-teal-500 shadow-lg shadow-teal-500/30'
                                            : 'bg-slate-700'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ChapterCelebration;
