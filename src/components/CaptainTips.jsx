import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Lightbulb } from 'lucide-react';
import { api } from '../services/api';

const CaptainTips = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [tip, setTip] = useState('');

    useEffect(() => {
        console.log('✅ CaptainTips mounted - will show tip in 5 seconds');

        // Show tip after 5 seconds
        const timer = setTimeout(async () => {
            console.log('⏰ Fetching Captain tip from API...');
            try {
                // Get context from current page
                const context = window.location.pathname.includes('part')
                    ? 'productivity and AI automation'
                    : 'general productivity';

                const result = await api.getAiTip(context);

                if (result && result.tip) {
                    setTip(result.tip);
                } else {
                    // Fallback tip
                    setTip("Captain's Insight: Automating your grocery list can save you 2 hours a week!");
                }
                setIsVisible(true);
            } catch (error) {
                console.error('Failed to fetch tip:', error);
                // Fallback tip if API fails
                setTip("Captain's Insight: Use AI to draft your emails. It reduces mental load by 40%.");
                setIsVisible(true);
            }
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
                <motion.div
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
                                        src="/assets/captain-efficiency-dark-transparent.png"
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
                                    className="text-slate-500 hover:text-white transition-colors"
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
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CaptainTips;
