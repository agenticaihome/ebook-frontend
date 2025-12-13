import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, Star } from 'lucide-react';

const ChapterBadge = ({ chapter, num, isComplete, isLocked }) => {
    // Badge configuration based on chapter number
    const badgeConfig = {
        free: { color: 'from-green-500 to-emerald-600', shadow: 'shadow-green-500/40', icon: '🌱' },
        foundation: { color: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/40', icon: '🏗️' },
        systems: { color: 'from-cyan-500 to-teal-600', shadow: 'shadow-cyan-500/40', icon: '⚙️' },
        deep: { color: 'from-purple-500 to-violet-600', shadow: 'shadow-purple-500/40', icon: '🧠' },
        mastery: { color: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/40', icon: '👑' },
    };

    let type = 'free';
    if (num >= 2 && num <= 3) type = 'foundation';
    if (num >= 4 && num <= 6) type = 'systems';
    if (num >= 7 && num <= 9) type = 'deep';
    if (num === 10) type = 'mastery';

    const config = badgeConfig[type];

    if (isLocked) {
        return (
            <div className="relative w-16 h-20 bg-slate-800 rounded-b-full rounded-t-lg flex flex-col items-center justify-center border-2 border-slate-700 opacity-60">
                <Lock size={16} className="text-slate-500 mb-1" />
                <span className="text-xs font-mono text-slate-600">{num}</span>
            </div>
        );
    }

    return (
        <motion.div
            whileHover={{ scale: 1.1, rotate: [-2, 2, 0] }}
            className={`relative w-16 h-20 rounded-b-full rounded-t-lg bg-gradient-to-b ${isComplete ? config.color : 'from-slate-700 to-slate-800'} flex flex-col items-center justify-center border-2 ${isComplete ? 'border-white/20' : 'border-slate-600'} cursor-pointer group`}
            style={{ boxShadow: isComplete ? `0 10px 20px -5px var(--tw-shadow-color)` : 'none' }}
        >
            {/* Shine effect for completed badges */}
            {isComplete && (
                <div className="absolute inset-0 rounded-b-full rounded-t-lg overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer" />
                </div>
            )}

            <div className="text-2xl mb-1 drop-shadow-md">
                {isComplete ? config.icon : '🔒'}
            </div>

            {isComplete ? (
                <div className="bg-white/20 p-0.5 rounded-full">
                    <Check size={12} className="text-white" />
                </div>
            ) : (
                <span className="text-xs font-bold text-slate-300 font-mono">
                    {num}
                </span>
            )}

            {/* Tooltip */}
            <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-[10px] text-white px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                {isComplete ? `Mastered Ch.${num}` : `Complete Ch.${num}`}
            </div>
        </motion.div>
    );
};

export default ChapterBadge;
