import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import {
    CheckCircle, Circle, Lock, BookOpen, Gamepad2,
    ChevronRight, Sparkles, Flag, Trophy
} from 'lucide-react';

// ============================================
// COURSE STRUCTURE - 10 CHAPTERS
// ============================================
const PARTS = [
    {
        id: 1,
        name: 'Getting Started',
        subtitle: 'Part 1: Foundations',
        color: 'from-teal-500 to-cyan-500',
        chapters: [
            { id: 1, title: 'Chapter 1: Your First Agent', path: '/part1/chapter1', xp: 100, duration: '6 min' },
            { id: 2, title: 'Chapter 2: Meal Planning Agent', path: '/part1/chapter2', xp: 100, duration: '7 min' },
            { id: 3, title: 'Chapter 3: Important Dates Agent', path: '/part1/chapter3', xp: 100, duration: '8 min' },
        ]
    },
    {
        id: 2,
        name: 'Daily Operations',
        subtitle: 'Part 2: Home & Productivity',
        color: 'from-orange-500 to-amber-500',
        chapters: [
            { id: 4, title: 'Chapter 4: Email Triage Agent', path: '/part2/chapter4', xp: 100, duration: '8 min' },
            { id: 5, title: 'Chapter 5: Money Check Agent', path: '/part2/chapter5', xp: 100, duration: '9 min' },
            { id: 6, title: 'Chapter 6: Fitness Agent', path: '/part2/chapter6', xp: 100, duration: '8 min' },
        ]
    },
    {
        id: 3,
        name: 'Power User',
        subtitle: 'Part 3: Advanced Systems',
        color: 'from-purple-500 to-pink-500',
        chapters: [
            { id: 7, title: 'Chapter 7: Work Tasks Agent', path: '/part3/chapter7', xp: 100, duration: '9 min' },
            { id: 8, title: 'Chapter 8: Custom Agent Builder', path: '/part3/chapter8', xp: 100, duration: '8 min' },
            { id: 9, title: 'Chapter 9: Multi-Agent Coordination', path: '/part3/chapter9', xp: 100, duration: '7 min' },
        ]
    },
    {
        id: 4,
        name: 'Mastery',
        subtitle: 'Part 4: Your Agent Army',
        color: 'from-cyan-500 to-blue-600',
        chapters: [
            { id: 10, title: 'Chapter 10: The Complete System', path: '/part3/chapter10', xp: 150, duration: '10 min' },
        ]
    }
];

const GAMES = [
    { id: 'deepwork', name: 'Deep Work Dive', path: '/games', xp: 50, icon: '🎯' },
    { id: 'clicker', name: 'Captain Click', path: '/games', xp: 50, icon: '🖱️' },
    { id: 'calendar', name: 'Calendar Defense', path: '/games', xp: 50, icon: '📅' },
];

// ============================================
// CHAPTER NODE
// ============================================
const ChapterNode = ({ chapter, isCompleted, isActive, index }) => {
    return (
        <Link to={chapter.path}>
            <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative group cursor-pointer`}
            >
                {/* Node */}
                <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center
                    border-2 transition-all duration-300
                    ${isCompleted
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-500/30'
                        : isActive
                            ? 'bg-gradient-to-br from-teal-500 to-cyan-600 border-teal-400 shadow-lg shadow-teal-500/30 animate-pulse'
                            : 'bg-slate-800/80 border-slate-600 hover:border-slate-500'
                    }
                `}>
                    {isCompleted ? (
                        <CheckCircle className="text-white" size={24} />
                    ) : (
                        <span className="text-white font-bold text-lg">{chapter.id}</span>
                    )}
                </div>

                {/* Completed flag */}
                {isCompleted && (
                    <div className="absolute -top-2 -right-2">
                        <Flag className="text-yellow-400" size={16} fill="currentColor" />
                    </div>
                )}

                {/* Hover tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-left shadow-xl min-w-[200px]">
                        <div className="text-white font-bold text-sm mb-1">{chapter.title}</div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span>⏱️ {chapter.duration}</span>
                            <span className="text-teal-400">+{chapter.xp} XP</span>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1.5" />
                    </div>
                </div>
            </m.div>
        </Link>
    );
};

// ============================================
// PART SECTION
// ============================================
const PartSection = ({ part, completedChapters, partIndex }) => {
    const completedInPart = part.chapters.filter(c => completedChapters.includes(c.id)).length;
    const isPartComplete = completedInPart === part.chapters.length;

    return (
        <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: partIndex * 0.1 }}
            className="relative"
        >
            {/* Part Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${part.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                    {part.id}
                </div>
                <div>
                    <h3 className="text-white font-bold">{part.name}</h3>
                    <p className="text-xs text-slate-400">{part.subtitle}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${isPartComplete ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                        {completedInPart}/{part.chapters.length}
                    </div>
                </div>
            </div>

            {/* Chapter Path */}
            <div className="relative flex items-center gap-4 pl-4 pb-8">
                {/* Path line */}
                <div className="absolute left-8 top-7 bottom-0 w-0.5 bg-gradient-to-b from-slate-600 via-slate-700 to-transparent" />

                {/* Horizontal path */}
                <div className="flex items-center gap-6">
                    {part.chapters.map((chapter, idx) => (
                        <React.Fragment key={chapter.id}>
                            <ChapterNode
                                chapter={chapter}
                                isCompleted={completedChapters.includes(chapter.id)}
                                isActive={!completedChapters.includes(chapter.id) && (idx === 0 || completedChapters.includes(part.chapters[idx - 1].id))}
                                index={idx}
                            />
                            {idx < part.chapters.length - 1 && (
                                <div className="w-8 h-0.5 bg-slate-700" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </m.div>
    );
};

// ============================================
// PROGRESS MAP (MAIN COMPONENT)
// ============================================
const QuestMap = () => {
    const [completedChapters, setCompletedChapters] = useState([]);

    useEffect(() => {
        const chapters = JSON.parse(localStorage.getItem('completed_chapters') || '[]');
        setCompletedChapters(chapters);
    }, []);

    const totalChapters = PARTS.reduce((acc, p) => acc + p.chapters.length, 0);
    const totalCompleted = completedChapters.length;

    return (
        <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-6 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <div className="relative flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <BookOpen className="text-teal-400" size={24} />
                    <div>
                        <h2 className="text-xl font-bold text-white">Your Progress</h2>
                        <p className="text-sm text-slate-400">Track your learning journey</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="text-yellow-400" size={16} />
                    <span className="text-white font-bold">{totalCompleted}</span>
                    <span className="text-slate-400">/ {totalChapters} chapters</span>
                </div>
            </div>

            {/* Scrollable Map */}
            <div className="relative overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <div className="min-w-max space-y-2">
                    {PARTS.map((part, idx) => (
                        <PartSection
                            key={part.id}
                            part={part}
                            completedChapters={completedChapters}
                            partIndex={idx}
                        />
                    ))}
                </div>
            </div>

            {/* Continue Button */}
            <div className="relative mt-4 pt-4 border-t border-slate-700/50">
                <Link to={completedChapters.length === 0 ? '/part1/chapter1' : `/part${Math.ceil((completedChapters[completedChapters.length - 1] || 1) / 3)}/chapter${((completedChapters[completedChapters.length - 1] || 0) % 3) + 1}`}>
                    <m.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all"
                    >
                        <BookOpen size={18} />
                        Continue Learning
                        <ChevronRight size={18} />
                    </m.button>
                </Link>
            </div>
        </div>
    );
};

export default QuestMap;
