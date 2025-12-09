import React, { useState, useEffect, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Flame, Star, Trophy, Sparkles, ChevronUp } from 'lucide-react';
import { useUser } from '../../context/UserContext';

// ============================================
// RANK SYSTEM - LEARNING LEVELS
// ============================================
const RANKS = [
    { name: 'Beginner', minXP: 0, icon: '📚', color: 'from-slate-400 to-slate-500' },
    { name: 'Learner', minXP: 200, icon: '📖', color: 'from-green-400 to-emerald-500' },
    { name: 'Builder', minXP: 400, icon: '🛠️', color: 'from-teal-400 to-cyan-500' },
    { name: 'Practitioner', minXP: 600, icon: '⚡', color: 'from-blue-400 to-indigo-500' },
    { name: 'Advanced', minXP: 850, icon: '💎', color: 'from-purple-400 to-violet-500' },
    { name: 'Expert', minXP: 1000, icon: '⭐', color: 'from-amber-400 to-orange-500' },
    { name: 'Master', minXP: 1200, icon: '🏆', color: 'from-orange-400 to-red-500' },
    { name: 'AI Commander', minXP: 1600, icon: '👑', color: 'from-yellow-400 to-amber-500' },
];

const getRank = (xp) => {
    for (let i = RANKS.length - 1; i >= 0; i--) {
        if (xp >= RANKS[i].minXP) return RANKS[i];
    }
    return RANKS[0];
};

const getNextRank = (xp) => {
    for (let i = 0; i < RANKS.length; i++) {
        if (xp < RANKS[i].minXP) return RANKS[i];
    }
    return null; // Max rank
};

// ============================================
// XP PROGRESS BAR
// ============================================
const XPProgressBar = ({ currentXP, maxXP = 1850 }) => {
    const percentage = Math.min((currentXP / maxXP) * 100, 100);
    const rank = getRank(currentXP);
    const nextRank = getNextRank(currentXP);

    // Calculate progress to next rank
    const currentRankXP = rank.minXP;
    const nextRankXP = nextRank ? nextRank.minXP : maxXP;
    const rankProgress = ((currentXP - currentRankXP) / (nextRankXP - currentRankXP)) * 100;

    return (
        <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400 font-medium">
                    {nextRank ? `${nextRank.minXP - currentXP} XP to ${nextRank.name}` : 'MAX LEVEL'}
                </span>
                <span className="text-xs text-teal-400">
                    {currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP
                </span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <m.div
                    className={`h-full bg-gradient-to-r ${rank.color} relative`}
                    initial={{ width: 0 }}
                    animate={{ width: `${rankProgress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </m.div>
            </div>
        </div>
    );
};

// ============================================
// DAILY STREAK
// ============================================
const DailyStreak = ({ streak }) => {
    const flameColors = streak >= 7 ? 'text-orange-400' : streak >= 3 ? 'text-yellow-400' : 'text-slate-400';

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700">
            <Flame className={`${flameColors} ${streak >= 3 ? 'animate-pulse' : ''}`} size={18} />
            <span className="text-white font-bold text-sm">{streak}</span>
            <span className="text-slate-400 text-xs">day{streak !== 1 ? 's' : ''}</span>
        </div>
    );
};

// ============================================
// CAPTAIN COMPANION (Scout)
// ============================================
const CaptainCompanion = ({ xp, streak }) => {
    const [message, setMessage] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const messages = useMemo(() => [
        { condition: () => streak === 0, msg: "Welcome back! Ready to learn something new?" },
        { condition: () => streak >= 7, msg: "🔥 A WEEK streak! Amazing dedication!" },
        { condition: () => streak >= 3, msg: "Great learning streak! Keep it up!" },
        { condition: () => xp >= 1600, msg: "👑 AI Commander! You've mastered all chapters!" },
        { condition: () => xp >= 1200, msg: "🏆 Master! Almost at the top!" },
        { condition: () => xp >= 1000, msg: "⭐ Expert status! Impressive progress!" },
        { condition: () => xp >= 850, msg: "💎 Advanced level! Building your system!" },
        { condition: () => xp >= 600, msg: "⚡ Practitioner! Making great progress!" },
        { condition: () => xp >= 400, msg: "🛠️ Builder! Creating your agents!" },
        { condition: () => xp >= 200, msg: "📖 Learner! Knowledge is growing!" },
        { condition: () => true, msg: "New chapters await!" },
    ], [xp, streak]);

    useEffect(() => {
        const applicable = messages.find(m => m.condition());
        setMessage(applicable?.msg || "Let's go!");
    }, [xp, streak, messages]);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Speech bubble */}
            <AnimatePresence>
                {isHovered && (
                    <m.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-slate-800 border border-cyan-500/50 rounded-xl text-xs text-slate-200 shadow-lg shadow-cyan-500/10"
                    >
                        <div className="absolute -bottom-2 right-4 w-4 h-4 bg-slate-800 border-r border-b border-cyan-500/50 rotate-45" />
                        {message}
                    </m.div>
                )}
            </AnimatePresence>

            {/* Captain sprite */}
            <m.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5 cursor-pointer"
            >
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img
                        src="/images/captain-efficiency-default.png"
                        alt="Captain Efficiency"
                        className="w-12 h-12 object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className="hidden items-center justify-center text-2xl">🦸</div>
                </div>
            </m.div>

            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
        </div>
    );
};

// ============================================
// RANK BADGE
// ============================================
const RankBadge = ({ xp, showLevelUp }) => {
    const rank = getRank(xp);

    return (
        <m.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
        >
            <div className={`text-2xl`}>{rank.icon}</div>
            <div>
                <div className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${rank.color}`}>
                    {rank.name}
                </div>
                <div className="text-xs text-slate-500">Current Rank</div>
            </div>
        </m.div>
    );
};

// ============================================
// HERO STATUS BAR (MAIN COMPONENT)
// ============================================
const HeroStatusBar = ({ onLevelUp }) => {
    const { userName } = useUser();
    const [xp, setXP] = useState(0);
    const [streak, setStreak] = useState(0);
    const [previousRank, setPreviousRank] = useState(null);

    // Load progress from localStorage
    useEffect(() => {
        const savedXP = parseInt(localStorage.getItem('hero_xp') || '0');
        const completedChapters = JSON.parse(localStorage.getItem('completed_chapters') || '[]');
        const completedGames = JSON.parse(localStorage.getItem('completed_games') || '[]');

        // Calculate XP if not cached
        const calculatedXP = savedXP || (completedChapters.length * 100 + completedGames.length * 50);
        setXP(calculatedXP);

        // Load streak
        const lastVisit = localStorage.getItem('last_visit_date');
        const savedStreak = parseInt(localStorage.getItem('daily_streak') || '0');
        const today = new Date().toDateString();

        if (lastVisit === today) {
            setStreak(savedStreak);
        } else if (lastVisit === new Date(Date.now() - 86400000).toDateString()) {
            // Yesterday - continue streak
            const newStreak = savedStreak + 1;
            setStreak(newStreak);
            localStorage.setItem('daily_streak', newStreak.toString());
            localStorage.setItem('last_visit_date', today);
        } else {
            // Streak broken or first visit
            setStreak(1);
            localStorage.setItem('daily_streak', '1');
            localStorage.setItem('last_visit_date', today);
        }

        setPreviousRank(getRank(calculatedXP));
    }, []);

    // Check for level up
    useEffect(() => {
        if (previousRank && getRank(xp).name !== previousRank.name) {
            onLevelUp?.(getRank(xp));
        }
    }, [xp, previousRank, onLevelUp]);

    return (
        <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 mb-6 shadow-xl"
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                {/* Avatar & Name */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/20">
                        {userName ? userName.charAt(0).toUpperCase() : '🎮'}
                    </div>
                    <div>
                        <div className="text-white font-bold">
                            {userName || 'Hero'}
                        </div>
                        <RankBadge xp={xp} />
                    </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-12 bg-slate-700" />

                {/* XP Bar */}
                <XPProgressBar currentXP={xp} />

                {/* Divider */}
                <div className="hidden md:block w-px h-12 bg-slate-700" />

                {/* Streak */}
                <DailyStreak streak={streak} />

                {/* Captain Companion */}
                <div className="hidden md:block">
                    <CaptainCompanion xp={xp} streak={streak} />
                </div>
            </div>
        </m.div>
    );
};

export default HeroStatusBar;
