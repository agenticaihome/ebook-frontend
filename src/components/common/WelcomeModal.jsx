import React from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Mail, Gamepad2, LayoutDashboard, ArrowRight, Sparkles, Crown } from 'lucide-react';

// ============================================
// WELCOME MODAL - Post-Purchase Celebration
// Shows once after first purchase, guides to Ch4
// ============================================

const WelcomeModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleDismiss = () => {
        // Mark as seen so it never shows again
        localStorage.setItem('welcome_modal_seen', 'true');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        onClick={handleDismiss}
                    />

                    {/* Modal */}
                    <m.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="welcome-modal-title"
                    >
                        <div className="relative w-full max-w-md bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden">

                            {/* Close Button */}
                            <button
                                onClick={handleDismiss}
                                className="absolute top-4 right-4 text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700/50 transition-colors z-10"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>

                            {/* Header Celebration */}
                            <div className="relative pt-8 pb-4 px-6 text-center bg-gradient-to-b from-purple-900/30 to-transparent">
                                <m.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-purple-500/30 mb-4"
                                >
                                    <Crown className="text-white" size={32} />
                                </m.div>

                                <h2 id="welcome-modal-title" className="text-2xl font-black text-white mb-2">
                                    🎉 Welcome to the Team!
                                </h2>
                                <p className="text-slate-300 text-sm">
                                    You're now part of the AI revolution
                                </p>
                            </div>

                            {/* What You Unlocked */}
                            <div className="px-6 py-4">
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                                        <CheckCircle className="text-green-400" size={18} />
                                        <span><strong className="text-white">7 Premium Agents</strong> — email, money, fitness & more</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                                        <CheckCircle className="text-green-400" size={18} />
                                        <span><strong className="text-white">5 Training Games</strong> — sharpen your skills</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                                        <CheckCircle className="text-green-400" size={18} />
                                        <span><strong className="text-white">Lifetime access</strong> — forever yours</span>
                                    </div>
                                </div>

                                {/* Start Chapter 4 CTA */}
                                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 mb-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-blue-500/20 rounded-xl">
                                            <Mail className="text-blue-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-sm">Start with Chapter 4</p>
                                            <p className="text-slate-300 text-xs">Email Triage Agent — inbox zero in 10 min/day</p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/part2/chapter4"
                                        onClick={handleDismiss}
                                        className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white py-3 rounded-xl font-bold text-sm transition-all"
                                    >
                                        Start Chapter 4
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Alternative Paths */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <Link
                                        to="/games"
                                        onClick={handleDismiss}
                                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-colors border border-slate-700"
                                    >
                                        <Gamepad2 size={16} className="text-purple-400" />
                                        Games Hub
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        onClick={handleDismiss}
                                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-colors border border-slate-700"
                                    >
                                        <LayoutDashboard size={16} className="text-amber-400" />
                                        Dashboard
                                    </Link>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 pb-6">
                                <button
                                    onClick={handleDismiss}
                                    className="w-full py-3 text-slate-300 hover:text-white text-sm font-medium transition-colors"
                                >
                                    Got it, let's go! →
                                </button>
                            </div>
                        </div>
                    </m.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WelcomeModal;
