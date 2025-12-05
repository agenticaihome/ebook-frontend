import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import {
    Gamepad2, Trophy, Zap, Play, Star,
    Sword, Target, Timer, ArrowRight
} from 'lucide-react';

// ============================================
// GAME DATA
// ============================================
const GAMES = [
    {
        id: 'deepwork',
        name: 'Deep Work Dive',
        description: 'Dodge distractions in this Flappy Bird-style challenge',
        icon: '🎯',
        color: 'from-blue-500 to-cyan-400',
        difficulty: 'Hard',
        playtime: '~1 min',
    },
    {
        id: 'triage',
        name: 'Inbox Defense',
        description: 'Sort emails at lightning speed',
        icon: '📧',
        color: 'from-cyan-500 to-blue-500',
        difficulty: 'Beginner',
        playtime: '~2 min',
    },
    {
        id: 'calendar',
        name: 'Calendar Defense',
        description: 'Protect your deep work from meeting invaders',
        icon: '📅',
        color: 'from-purple-500 to-pink-500',
        difficulty: 'Medium',
        playtime: '~1 min',
    },
    {
        id: 'focusfury',
        name: 'Focus Blitz',
        description: 'Zap distractions with focus beams',
        icon: '⚡',
        color: 'from-cyan-500 to-blue-600',
        difficulty: 'Medium',
        playtime: '~1 min',
    },
    {
        id: 'clicker',
        name: 'Captain Click',
        description: 'Speed-click your way to efficiency',
        icon: '🖱️',
        color: 'from-yellow-400 to-orange-500',
        difficulty: 'Easy',
        playtime: '~30 sec',
    },
];

// ============================================
// GAME CARD
// ============================================
const GameCard = ({ game, highScore, rank }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to="/games">
            <m.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 cursor-pointer overflow-hidden group"
            >
                {/* Background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                <div className="relative flex items-start gap-3">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {game.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">
                            {game.name}
                        </h4>
                        <p className="text-slate-400 text-xs line-clamp-1 mb-2">
                            {game.description}
                        </p>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Timer size={10} />
                                {game.playtime}
                            </span>
                            {highScore > 0 && (
                                <span className="text-xs text-yellow-400 font-bold flex items-center gap-1">
                                    <Trophy size={10} />
                                    {highScore.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Play button */}
                    <m.div
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${game.color} flex items-center justify-center shadow-lg`}
                    >
                        <Play className="text-white" size={14} fill="white" />
                    </m.div>
                </div>
            </m.div>
        </Link>
    );
};

// ============================================
// CHALLENGE ARENA (MAIN COMPONENT)
// ============================================
const ChallengeArena = () => {
    const [highScores, setHighScores] = useState({});

    useEffect(() => {
        // Load high scores from localStorage
        const scores = {};
        GAMES.forEach(game => {
            scores[game.id] = parseInt(localStorage.getItem(`highscore_${game.id}`) || '0');
        });
        setHighScores(scores);
    }, []);

    const totalGamesPlayed = Object.values(highScores).filter(s => s > 0).length;

    return (
        <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-5 mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                        <Sword className="text-white" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Challenge Arena</h3>
                        <p className="text-xs text-slate-400">Train your skills anytime</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full">
                    <Gamepad2 className="text-purple-400" size={14} />
                    <span className="text-xs text-purple-400 font-bold">{totalGamesPlayed}/{GAMES.length} Played</span>
                </div>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {GAMES.map((game, idx) => (
                    <GameCard
                        key={game.id}
                        game={game}
                        highScore={highScores[game.id] || 0}
                        rank={idx + 1}
                    />
                ))}
            </div>

            {/* View All Button */}
            <Link to="/games">
                <m.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full mt-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl text-slate-300 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                    View All Challenges
                    <ArrowRight size={14} />
                </m.button>
            </Link>
        </div>
    );
};

export default ChallengeArena;
