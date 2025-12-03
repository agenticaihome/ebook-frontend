import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Lightbulb } from 'lucide-react';

// Captain E's Productivity Tips - 20 unique insights
const CAPTAIN_TIPS = [
    "Automating your grocery list can save you 2 hours a week. That's 100+ hours a year!",
    "Use AI to draft your emails. It reduces mental load by 40%.",
    "A 5-minute daily planning session with AI prevents 2 hours of chaos.",
    "Batch your low-energy tasks for the afternoon slump. Your future self will thank you.",
    "Set up a morning automation routine. The first win of the day compounds.",
    "Your calendar is a to-do list. If it's not scheduled, it's not happening.",
    "Automate expense tracking: 10 minutes monthly beats 2 hours quarterly.",
    "Use voice memos for quick captures. Transcribe later with AI. Your brain isn't a storage device.",
    "Build a 'Second Brain' for recurring decisions. Document once, reference forever.",
    "Red days = survival mode. Yellow days = essentials only. Green days = attack mode. Know your state.",
    "Template your recurring emails. Why rewrite the same explanation 50 times a year?",
    "Block 'No Meeting' days. Deep work requires uninterrupted time, not fragmented hours.",
    "Automate your bill payments. Decision fatigue is real - eliminate the trivial choices.",
    "Use AI to summarize long documents. Read the 500-word summary, not the 50-page report.",
    "Meal prep on Sunday. Deciding what to eat 21 times a week is exhausting.",
    "Set up auto-replies for common questions. Your time is too valuable for repetitive responses.",
    "Track your energy levels, not just your time. Optimize for when you're naturally productive.",
    "Create a shutdown ritual. Your brain needs a clear 'work is done' signal.",
    "Automate your morning: coffee timer, lights, music. Remove 15 decisions before 8am.",
    "Use AI agents for research. Let them filter 100 articles down to the 5 that matter."
];

const CaptainTips = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [tip, setTip] = useState('');

    useEffect(() => {
        console.log('✅ CaptainTips mounted - will show tip in 5 seconds');

        // Show tip after 5 seconds
        const timer = setTimeout(() => {
            // Pick a random tip
            const randomTip = CAPTAIN_TIPS[Math.floor(Math.random() * CAPTAIN_TIPS.length)];
            setTip(`Captain's Insight: ${randomTip}`);
            setIsVisible(true);
            console.log('⏰ Showing Captain tip!');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const closeTip = () => {
        console.log('🚫 Closing tip');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <m.div
                    initial={{ opacity: 0, y: 50, x: 50 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className="fixed bottom-8 right-8 z-50 max-w-sm"
                >
                    <div className="relative bg-[#1a1a2e]/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-900/20">
                        {/* Captain Avatar */}
                        <div className="absolute -top-10 -left-6">
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full p-1 shadow-lg ring-4 ring-[#0f0f1a]">
                                    <img
                                        src="/assets/captain-efficiency-dark-transparent.webp"
                                        alt="Captain Efficiency"
                                        className="w-full h-full object-contain rounded-full"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-[#0f0f1a] flex items-center justify-center">
                                    <Sparkles size={12} className="text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="ml-8 mt-2">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                    <Lightbulb size={14} />
                                    Captain's Insight
                                </h3>
                                <button
                                    onClick={closeTip}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <p className="text-slate-200 text-sm leading-relaxed">
                                {tip}
                            </p>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={closeTip}
                                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                                >
                                    Thanks, Captain!
                                </button>
                            </div>
                        </div>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default CaptainTips;
