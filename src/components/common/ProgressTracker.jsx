import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Calendar, Sparkles } from 'lucide-react';
import { m } from 'framer-motion';

/**
 * ProgressTracker - Shows streak and journey progress
 * Uses localStorage to track first visit date and current streak
 */
const ProgressTracker = ({ currentChapter = 1, totalChapters = 10 }) => {
    const [journeyDays, setJourneyDays] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        // Get or set the journey start date
        let startDate = localStorage.getItem('agentic_journey_start');
        if (!startDate) {
            startDate = new Date().toISOString();
            localStorage.setItem('agentic_journey_start', startDate);
        }

        // Calculate days since journey started
        const start = new Date(startDate);
        const now = new Date();
        const diffTime = Math.abs(now - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setJourneyDays(diffDays);

        // Track last visit for streak calculation
        localStorage.setItem('agentic_last_visit', new Date().toISOString());
    }, []);

    // Calculate completion percentage
    const completionPercent = Math.round((currentChapter / totalChapters) * 100);

    return (
        <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
        >
            <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-4 border border-slate-700/50 hover:border-teal-500/30 transition-colors text-left"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Agent Count */}
                        <div className="flex items-center gap-2">
                            <Trophy className="text-amber-400" size={18} />
                            <span className="text-white font-bold">{currentChapter}/{totalChapters}</span>
                            <span className="text-slate-300 text-sm hidden sm:inline">agents</span>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-4 bg-slate-700" />

                        {/* Journey Days */}
                        <div className="flex items-center gap-2">
                            <Flame className="text-orange-400" size={18} />
                            <span className="text-white font-bold">{journeyDays}</span>
                            <span className="text-slate-300 text-sm hidden sm:inline">
                                {journeyDays === 1 ? 'day' : 'days'} in
                            </span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
                                style={{ width: `${completionPercent}%` }}
                            />
                        </div>
                        <span className="text-teal-400 text-sm font-medium">{completionPercent}%</span>
                    </div>
                </div>

                {/* Expanded Details */}
                {showDetails && (
                    <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-slate-700/50"
                    >
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-slate-900/50 rounded-lg p-3">
                                <div className="flex items-center gap-2 text-teal-400 mb-1">
                                    <Sparkles size={14} />
                                    <span className="font-medium">Your Progress</span>
                                </div>
                                <p className="text-slate-300">
                                    {currentChapter === 10
                                        ? "🎉 You've completed the course!"
                                        : `${10 - currentChapter} more agents to go`}
                                </p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3">
                                <div className="flex items-center gap-2 text-amber-400 mb-1">
                                    <Calendar size={14} />
                                    <span className="font-medium">Journey Started</span>
                                </div>
                                <p className="text-slate-300">
                                    {journeyDays === 0
                                        ? "Today!"
                                        : `${journeyDays} ${journeyDays === 1 ? 'day' : 'days'} ago`}
                                </p>
                            </div>
                        </div>
                        <p className="text-slate-500 text-xs mt-3 text-center">
                            Keep going! Consistency beats perfection. 🚀
                        </p>
                    </m.div>
                )}
            </button>
        </m.div>
    );
};

export default ProgressTracker;
