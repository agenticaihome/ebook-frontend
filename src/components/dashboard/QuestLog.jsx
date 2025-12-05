import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import {
    BookOpen, ChevronDown, ChevronUp, CheckCircle,
    Circle, Clock, Sparkles, Play, ArrowRight
} from 'lucide-react';

// ============================================
// COURSE STRUCTURE (same as QuestMap for consistency)
// ============================================
const PARTS = [
    {
        id: 1,
        name: 'Part I: Daily Ops',
        subtitle: 'The Foundations',
        color: 'from-emerald-500 to-cyan-500',
        emoji: '🏕️',
        chapters: [
            { id: 1, title: 'Operation: Wake-Up Call', path: '/part1/chapter1', xp: 100, duration: '6 min' },
            { id: 2, title: 'Operation: Basic Training', path: '/part1/chapter2', xp: 100, duration: '7 min' },
            { id: 3, title: 'Operation: Security Perimeter', path: '/part1/chapter3', xp: 100, duration: '8 min' },
        ]
    },
    {
        id: 2,
        name: 'Part II: Domestic Ops',
        subtitle: 'The Home Front',
        color: 'from-orange-500 to-amber-500',
        emoji: '🏠',
        chapters: [
            { id: 4, title: 'Operation: Morning Brief', path: '/part2/chapter1', xp: 100, duration: '8 min' },
            { id: 5, title: 'Operation: Kitchen Command', path: '/part2/chapter2', xp: 100, duration: '9 min' },
            { id: 6, title: 'Operation: Household HQ', path: '/part2/chapter3', xp: 100, duration: '8 min' },
        ]
    },
    {
        id: 3,
        name: 'Part III: Digital Life',
        subtitle: 'Digital Frontier',
        color: 'from-purple-500 to-pink-500',
        emoji: '💻',
        chapters: [
            { id: 7, title: 'Operation: Inbox Zero', path: '/part3/chapter1', xp: 100, duration: '9 min' },
            { id: 8, title: 'Operation: Calendar Defense', path: '/part3/chapter2', xp: 100, duration: '8 min' },
            { id: 9, title: 'Operation: Digital Declutter', path: '/part3/chapter3', xp: 100, duration: '7 min' },
        ]
    },
    {
        id: 4,
        name: 'Part IV: Health & Wealth',
        subtitle: 'The Stronghold',
        color: 'from-red-500 to-orange-500',
        emoji: '💪',
        chapters: [
            { id: 10, title: 'Operation: Wealth Watch', path: '/part4/chapter1', xp: 100, duration: '10 min' },
            { id: 11, title: 'Operation: Health Protocol', path: '/part4/chapter2', xp: 100, duration: '9 min' },
            { id: 12, title: 'Operation: Recovery Mode', path: '/part4/chapter3', xp: 100, duration: '8 min' },
        ]
    },
    {
        id: 5,
        name: 'Part V: Life OS',
        subtitle: 'Grand Command',
        color: 'from-cyan-500 to-blue-600',
        emoji: '🚀',
        chapters: [
            { id: 13, title: 'Operation: Second Brain', path: '/part5/chapter1', xp: 100, duration: '12 min' },
            { id: 14, title: 'Operation: Automation Army', path: '/part5/chapter2', xp: 100, duration: '10 min' },
            { id: 15, title: 'Operation: Future Proof', path: '/part5/chapter3', xp: 100, duration: '8 min' },
            { id: 16, title: 'Operation: Grand Finale', path: '/part5/chapter4', xp: 150, duration: '6 min' },
        ]
    }
];

// ============================================
// QUEST ENTRY
// ============================================
const QuestEntry = ({ chapter, isCompleted, isNext }) => {
    return (
        <Link to={chapter.path}>
            <m.div
                whileHover={{ x: 4, backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
                className={`
                    flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer
                    ${isCompleted ? 'bg-green-900/10' : 'bg-slate-800/30'}
                    ${isNext ? 'ring-1 ring-cyan-500/50' : ''}
                `}
            >
                {/* Status icon */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'bg-slate-700'}`}>
                    {isCompleted ? (
                        <CheckCircle className="text-white" size={14} />
                    ) : isNext ? (
                        <Play className="text-cyan-400" size={10} fill="currentColor" />
                    ) : (
                        <Circle className="text-slate-500" size={14} />
                    )}
                </div>

                {/* Quest info */}
                <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium ${isCompleted ? 'text-green-400 line-through opacity-70' : 'text-white'}`}>
                        {chapter.title}
                    </h4>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                        <Clock size={10} />
                        {chapter.duration}
                    </span>
                    <span className={`font-bold ${isCompleted ? 'text-green-400' : 'text-cyan-400'}`}>
                        {isCompleted ? '✓' : `+${chapter.xp}`}
                    </span>
                </div>

                {isNext && (
                    <ArrowRight className="text-cyan-400" size={14} />
                )}
            </m.div>
        </Link>
    );
};

// ============================================
// PART SECTION
// ============================================
const PartSection = ({ part, completedChapters, nextChapterId }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const completedInPart = part.chapters.filter(c => completedChapters.includes(c.id)).length;
    const isPartComplete = completedInPart === part.chapters.length;
    const containsNextChapter = part.chapters.some(c => c.id === nextChapterId);

    // Auto-expand if this part contains the next chapter
    useEffect(() => {
        if (containsNextChapter) setIsExpanded(true);
    }, [containsNextChapter]);

    return (
        <div className="mb-3">
            {/* Part Header */}
            <m.button
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.005 }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${isPartComplete ? 'bg-green-900/20' : 'bg-slate-800/50 hover:bg-slate-800'}`}
            >
                <span className="text-2xl">{part.emoji}</span>
                <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-sm">{part.name}</span>
                        {isPartComplete && <Sparkles className="text-yellow-400" size={12} />}
                    </div>
                    <span className="text-xs text-slate-400">{part.subtitle}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isPartComplete ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                        {completedInPart}/{part.chapters.length}
                    </span>
                    {isExpanded ? <ChevronUp className="text-slate-400" size={16} /> : <ChevronDown className="text-slate-400" size={16} />}
                </div>
            </m.button>

            {/* Chapters */}
            <AnimatePresence>
                {isExpanded && (
                    <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 pl-4 space-y-1">
                            {part.chapters.map((chapter) => (
                                <QuestEntry
                                    key={chapter.id}
                                    chapter={chapter}
                                    isCompleted={completedChapters.includes(chapter.id)}
                                    isNext={chapter.id === nextChapterId}
                                />
                            ))}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ============================================
// QUEST LOG (MAIN COMPONENT)
// ============================================
const QuestLog = () => {
    const [completedChapters, setCompletedChapters] = useState([]);

    useEffect(() => {
        const chapters = JSON.parse(localStorage.getItem('completed_chapters') || '[]');
        setCompletedChapters(chapters);
    }, []);

    // Find next chapter
    const allChapterIds = PARTS.flatMap(p => p.chapters.map(c => c.id));
    const nextChapterId = allChapterIds.find(id => !completedChapters.includes(id)) || null;

    const totalChapters = PARTS.reduce((acc, p) => acc + p.chapters.length, 0);
    const totalCompleted = completedChapters.length;
    const progressPercent = Math.round((totalCompleted / totalChapters) * 100);

    return (
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <BookOpen className="text-white" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Quest Log</h3>
                        <p className="text-xs text-slate-400">{progressPercent}% Complete</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-white">{totalCompleted}</div>
                    <div className="text-xs text-slate-400">/ {totalChapters} quests</div>
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
                <m.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>

            {/* Parts */}
            <div className="space-y-1 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent pr-1">
                {PARTS.map((part) => (
                    <PartSection
                        key={part.id}
                        part={part}
                        completedChapters={completedChapters}
                        nextChapterId={nextChapterId}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuestLog;
