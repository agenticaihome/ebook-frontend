import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Lightbulb, ArrowRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

// Captain Efficiency's insights - specific to book content
const CAPTAIN_TIPS = [
    // Chapter 1: Morning Agent
    {
        tip: "Your Morning Agent can save you 15 minutes every day. That's 90+ hours a year of clarity!",
        chapter: 1,
        cta: { text: "Build it in Chapter 1", link: "/part1/chapter1" }
    },
    // Chapter 2: Meal Planning
    {
        tip: "Stop the 'what's for dinner?' stress. Your Meal Planning Agent handles it in seconds.",
        chapter: 2,
        cta: { text: "Learn how in Chapter 2", link: "/part1/chapter2" }
    },
    // Chapter 3: Important Dates
    {
        tip: "Never forget a birthday again. The Important Dates Agent sends reminders automatically.",
        chapter: 3,
        cta: { text: "Set it up in Chapter 3", link: "/part1/chapter3" }
    },
    // Chapter 4: Email Triage
    {
        tip: "Inbox zero is possible. The Email Triage Agent sorts 100 emails in 10 minutes.",
        chapter: 4,
        cta: { text: "Unlock in Chapter 4", link: "/unlock" }
    },
    // Chapter 5: Money Check-In
    {
        tip: "Weekly money anxiety? Your Money Check-In Agent gives you a calm financial snapshot.",
        chapter: 5,
        cta: { text: "Build it in Chapter 5", link: "/unlock" }
    },
    // Chapter 6: Fitness
    {
        tip: "No more gym guilt. The Fitness Agent creates workouts that fit YOUR schedule.",
        chapter: 6,
        cta: { text: "Get fit in Chapter 6", link: "/unlock" }
    },
    // General productivity insights
    {
        tip: "AI isn't about replacing you — it's about giving you back the time to be human.",
        chapter: null,
        cta: null
    },
    {
        tip: "Most people use ChatGPT once and forget. You're building systems. That's the difference.",
        chapter: null,
        cta: null
    },
    {
        tip: "The best automation is invisible. It just works. That's what we're building here.",
        chapter: null,
        cta: null
    },
    {
        tip: "5 minutes of setup today = 5 hours saved every week. The math always works out.",
        chapter: null,
        cta: null
    },
    // Motivation
    {
        tip: "You're already ahead. Most people talk about AI. You're actually using it.",
        chapter: null,
        cta: null
    },
    {
        tip: "Each agent you build compounds. By Chapter 10, you'll have an entire army working for you.",
        chapter: null,
        cta: null
    },
];

// Pages where we DON'T show Captain tips (sales/payment flows)
const EXCLUDED_PATHS = [
    '/unlock',
    '/payment-guide',
    '/pay-ergo',
    '/ergo-guide',
    '/login',
    '/create-account',
    '/success',
];

const CaptainTips = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentTip, setCurrentTip] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Check if we've already shown a tip this session
        const hasSeenTip = sessionStorage.getItem('captainTipShown');

        // Don't show on excluded pages
        const isExcludedPage = EXCLUDED_PATHS.some(path => location.pathname.includes(path));

        // Don't show if already seen or on excluded page
        if (hasSeenTip || isExcludedPage) {
            return;
        }

        // Show tip after 20 seconds of reading
        const timer = setTimeout(() => {
            // Pick a random tip
            const randomTip = CAPTAIN_TIPS[Math.floor(Math.random() * CAPTAIN_TIPS.length)];
            setCurrentTip(randomTip);
            setIsVisible(true);

            // Mark as seen for this session
            sessionStorage.setItem('captainTipShown', 'true');
        }, 20000); // 20 seconds

        return () => clearTimeout(timer);
    }, [location.pathname]);

    const closeTip = () => {
        setIsVisible(false);
    };

    if (!currentTip) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <m.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.95 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="fixed bottom-20 md:bottom-4 right-4 z-[55] max-w-xs md:max-w-sm"
                >
                    <div className="relative bg-slate-900/95 backdrop-blur-xl border border-teal-500/40 rounded-2xl p-5 shadow-2xl shadow-teal-900/30">
                        {/* Close button */}
                        <button
                            onClick={closeTip}
                            className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg hover:bg-slate-800/50"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 p-0.5 shadow-lg">
                                <img
                                    src="/assets/captain-efficiency-dark-transparent.webp"
                                    alt="Captain Efficiency"
                                    className="w-full h-full object-contain rounded-full bg-slate-800"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Lightbulb size={14} className="text-amber-400" />
                                <span className="text-teal-400 font-bold text-xs uppercase tracking-wide">Captain's Insight</span>
                            </div>
                        </div>

                        {/* Tip Content */}
                        <p className="text-slate-200 text-sm leading-relaxed mb-3">
                            {currentTip.tip}
                        </p>

                        {/* CTA if available */}
                        {currentTip.cta && (
                            <Link
                                to={currentTip.cta.link}
                                onClick={closeTip}
                                className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 text-xs font-medium transition-colors"
                            >
                                {currentTip.cta.text}
                                <ArrowRight size={12} />
                            </Link>
                        )}

                        {/* Dismiss text */}
                        <div className="mt-3 pt-3 border-t border-slate-700/50 flex justify-between items-center">
                            <span className="text-slate-600 text-xs">💡 Tips appear once per visit</span>
                            <button
                                onClick={closeTip}
                                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                Got it!
                            </button>
                        </div>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default CaptainTips;
