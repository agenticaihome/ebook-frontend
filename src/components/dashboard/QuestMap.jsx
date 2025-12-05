import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import {
    CheckCircle, Circle, Lock, MapPin, Swords,
    ChevronRight, Sparkles, Flag, Trophy
} from 'lucide-react';

// ============================================
// FRONTIER TERRITORY STRUCTURE
// ============================================
const REGIONS = [
    {
        id: 1,
        name: 'Base Camp',
        subtitle: 'Territory I: The Foundations',
        color: 'from-emerald-500 to-cyan-500',
        chapters: [
            { id: 1, title: 'Expedition: First Contact', path: '/part1/chapter1', xp: 100, duration: '6 min' },
            { id: 2, title: 'Expedition: Basic Recon', path: '/part1/chapter2', xp: 100, duration: '7 min' },
            { id: 3, title: 'Expedition: Secure Perimeter', path: '/part1/chapter3', xp: 100, duration: '8 min' },
        ]
    },
    {
        id: 2,
        name: 'Homestead Valley',
        subtitle: 'Territory II: The Home Front',
        color: 'from-orange-500 to-amber-500',
        chapters: [
            { id: 4, title: 'Expedition: Morning Patrol', path: '/part2/chapter1', xp: 100, duration: '8 min' },
            { id: 5, title: 'Expedition: Kitchen Outpost', path: '/part2/chapter2', xp: 100, duration: '9 min' },
            { id: 6, title: 'Expedition: Household Command', path: '/part2/chapter3', xp: 100, duration: '8 min' },
        ]
    },
    {
        id: 3,
        name: 'Digital Frontier',
        subtitle: 'Territory III: The Digital Wilds',
        color: 'from-purple-500 to-pink-500',
        chapters: [
            { id: 7, title: 'Expedition: Inbox Clearing', path: '/part3/chapter1', xp: 100, duration: '9 min' },
            { id: 8, title: 'Expedition: Calendar Territory', path: '/part3/chapter2', xp: 100, duration: '8 min' },
            { id: 9, title: 'Expedition: Digital Cleanup', path: '/part3/chapter3', xp: 100, duration: '7 min' },
        ]
    },
    {
        id: 4,
        name: 'Wellness Mountains',
        subtitle: 'Territory IV: Health & Wealth',
        color: 'from-red-500 to-orange-500',
        chapters: [
            { id: 10, title: 'Expedition: Wealth Mapping', path: '/part4/chapter1', xp: 100, duration: '10 min' },
            { id: 11, title: 'Expedition: Health Outpost', path: '/part4/chapter2', xp: 100, duration: '9 min' },
            { id: 12, title: 'Expedition: Recovery Base', path: '/part4/chapter3', xp: 100, duration: '8 min' },
        ]
    },
    {
        id: 5,
        name: 'Grand Command',
        subtitle: 'Territory V: Life HQ',
        color: 'from-cyan-500 to-blue-600',
        chapters: [
            { id: 13, title: 'Expedition: Knowledge Base', path: '/part5/chapter1', xp: 100, duration: '12 min' },
            { id: 14, title: 'Expedition: Automation Grid', path: '/part5/chapter2', xp: 100, duration: '10 min' },
            { id: 15, title: 'Expedition: Future Outpost', path: '/part5/chapter3', xp: 100, duration: '8 min' },
            { id: 16, title: 'Expedition: Final Summit', path: '/part5/chapter4', xp: 150, duration: '6 min' },
        ]
    }
];

const BOSS_ARENAS = [
    { id: 'deepwork', name: 'Deep Focus Trial', path: '/games', xp: 50, icon: '🎯', afterRegion: 1 },
    { id: 'triage', name: 'Inbox Assault', path: '/games', xp: 50, icon: '📧', afterRegion: 2 },
    { id: 'calendar', name: 'Calendar Siege', path: '/games', xp: 50, icon: '📅', afterRegion: 3 },
    { id: 'focusfury', name: 'Focus Blitz', path: '/games', xp: 50, icon: '⚡', afterRegion: 4 },
    { id: 'clicker', name: 'Captain Click Rally', path: '/games', xp: 50, icon: '🖱️', afterRegion: 5 },
];

// ============================================
// EXPEDITION NODE (Chapter)
// ============================================
const QuestNode = ({ chapter, isCompleted, isActive, index }) => {
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
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 shadow-lg shadow-cyan-500/30 animate-pulse'
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
                            <span className="text-cyan-400">+{chapter.xp} DP</span>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1.5" />
                    </div>
                </div>
            </m.div>
        </Link>
    );
};

// ============================================
// BOSS ARENA NODE
// ============================================
const BossArenaNode = ({ arena, isCompleted }) => {
    return (
        <Link to={arena.path}>
            <m.div
                whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                whileTap={{ scale: 0.95 }}
                className="relative group cursor-pointer"
            >
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl blur-xl transition-opacity ${isCompleted ? 'bg-yellow-500/30' : 'bg-purple-500/30 animate-pulse'} opacity-50 group-hover:opacity-100`} />

                {/* Node */}
                <div className={`
                    relative w-20 h-20 rounded-2xl flex flex-col items-center justify-center
                    border-2 transition-all duration-300
                    ${isCompleted
                        ? 'bg-gradient-to-br from-yellow-500 to-orange-600 border-yellow-400'
                        : 'bg-gradient-to-br from-purple-600 to-pink-600 border-purple-400'
                    }
                    shadow-lg
                `}>
                    <span className="text-3xl mb-1">{arena.icon}</span>
                    <Swords className="text-white/80" size={14} />
                </div>

                {/* Trophy for completed */}
                {isCompleted && (
                    <div className="absolute -top-2 -right-2">
                        <Trophy className="text-yellow-400" size={20} fill="currentColor" />
                    </div>
                )}

                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-center">
                    <div className="text-xs text-white font-bold whitespace-nowrap">{arena.name}</div>
                    <div className="text-xs text-purple-400">CHALLENGE</div>
                </div>
            </m.div>
        </Link>
    );
};

// ============================================
// REGION SECTION
// ============================================
const RegionSection = ({ region, completedChapters, bossArena, completedGames, regionIndex }) => {
    const completedInRegion = region.chapters.filter(c => completedChapters.includes(c.id)).length;
    const isRegionComplete = completedInRegion === region.chapters.length;

    return (
        <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: regionIndex * 0.1 }}
            className="relative"
        >
            {/* Region Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${region.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                    {region.id}
                </div>
                <div>
                    <h3 className="text-white font-bold">{region.name}</h3>
                    <p className="text-xs text-slate-400">{region.subtitle}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${isRegionComplete ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                        {completedInRegion}/{region.chapters.length}
                    </div>
                </div>
            </div>

            {/* Quest Path */}
            <div className="relative flex items-center gap-4 pl-4 pb-8">
                {/* Path line */}
                <div className="absolute left-8 top-7 bottom-0 w-0.5 bg-gradient-to-b from-slate-600 via-slate-700 to-transparent" />

                {/* Horizontal path */}
                <div className="flex items-center gap-6">
                    {region.chapters.map((chapter, idx) => (
                        <React.Fragment key={chapter.id}>
                            <QuestNode
                                chapter={chapter}
                                isCompleted={completedChapters.includes(chapter.id)}
                                isActive={!completedChapters.includes(chapter.id) && (idx === 0 || completedChapters.includes(region.chapters[idx - 1].id))}
                                index={idx}
                            />
                            {idx < region.chapters.length - 1 && (
                                <div className="w-8 h-0.5 bg-slate-700" />
                            )}
                        </React.Fragment>
                    ))}

                    {/* Boss Arena after region */}
                    {bossArena && (
                        <>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-slate-700 to-purple-500" />
                            <BossArenaNode
                                arena={bossArena}
                                isCompleted={completedGames.includes(bossArena.id)}
                            />
                        </>
                    )}
                </div>
            </div>
        </m.div>
    );
};

// ============================================
// QUEST MAP (MAIN COMPONENT)
// ============================================
const QuestMap = () => {
    const [completedChapters, setCompletedChapters] = useState([]);
    const [completedGames, setCompletedGames] = useState([]);

    useEffect(() => {
        const chapters = JSON.parse(localStorage.getItem('completed_chapters') || '[]');
        const games = JSON.parse(localStorage.getItem('completed_games') || '[]');
        setCompletedChapters(chapters);
        setCompletedGames(games);
    }, []);

    const totalChapters = REGIONS.reduce((acc, r) => acc + r.chapters.length, 0);
    const totalCompleted = completedChapters.length;

    return (
        <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-6 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <div className="relative flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <MapPin className="text-cyan-400" size={24} />
                    <div>
                        <h2 className="text-xl font-bold text-white">Territory Map</h2>
                        <p className="text-sm text-slate-400">Chart your path across the frontier</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="text-yellow-400" size={16} />
                    <span className="text-white font-bold">{totalCompleted}</span>
                    <span className="text-slate-400">/ {totalChapters} expeditions</span>
                </div>
            </div>

            {/* Scrollable Map */}
            <div className="relative overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <div className="min-w-max space-y-2">
                    {REGIONS.map((region, idx) => (
                        <RegionSection
                            key={region.id}
                            region={region}
                            completedChapters={completedChapters}
                            bossArena={BOSS_ARENAS.find(b => b.afterRegion === region.id)}
                            completedGames={completedGames}
                            regionIndex={idx}
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
                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                    >
                        <Flag size={18} />
                        Continue Your Expedition
                        <ChevronRight size={18} />
                    </m.button>
                </Link>
            </div>
        </div>
    );
};

export default QuestMap;
