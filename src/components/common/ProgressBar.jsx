import React from 'react';

/**
 * ProgressBar Component
 * 
 * Shows user progress through a part with visual progress bar.
 * Sticky to viewport top for constant visibility.
 * 
 * @param {number} current - Current chapter/section number
 * @param {number} total - Total number of chapters/sections
 * @param {string} label - Label to display (e.g., "Part 1: Foundations")
 */
const ProgressBar = ({ current, total, label }) => {
    const percentage = Math.round((current / total) * 100);

    return (
        <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 py-3 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">{label}</span>
                    <span className="text-sm font-bold text-cyan-400">{percentage}% Complete</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
