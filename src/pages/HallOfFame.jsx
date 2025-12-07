import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Medal, Star, ArrowLeft, Gamepad2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Helmet } from 'react-helmet-async';

const GAMES = [
    { id: 'clicker', name: 'Captain Click Challenge', emoji: '🎯', color: 'from-orange-500 to-orange-600' },
    { id: 'deepwork', name: 'Deep Work Dive', emoji: '🧘', color: 'from-cyan-500 to-cyan-600' },
    { id: 'focusfury', name: 'Focus Fury', emoji: '⚡', color: 'from-purple-500 to-purple-600' },
    { id: 'triage', name: 'Agent Triage', emoji: '📧', color: 'from-green-500 to-green-600' },
    { id: 'calendar', name: 'Calendar Defense', emoji: '🗓️', color: 'from-blue-500 to-blue-600' },
];

const HallOfFame = () => {
    const [leaderboards, setLeaderboards] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState(GAMES[0].id);

    useEffect(() => {
        fetchAllLeaderboards();
    }, []);

    const fetchAllLeaderboards = async () => {
        setLoading(true);
        const results = {};

        for (const game of GAMES) {
            try {
                const data = await api.getLeaderboard(game.id);
                results[game.id] = data.slice(0, 10); // Top 10 only
            } catch (err) {
                console.error(`Failed to fetch ${game.id} leaderboard:`, err);
                results[game.id] = [];
            }
        }

        setLeaderboards(results);
        setLoading(false);
    };

    const getRankDisplay = (index) => {
        if (index === 0) return { icon: <Crown className="text-yellow-400" size={20} />, bg: 'bg-gradient-to-r from-yellow-500/30 to-orange-500/20', border: 'border-yellow-500/50' };
        if (index === 1) return { icon: <Medal className="text-slate-300" size={18} />, bg: 'bg-slate-400/10', border: 'border-slate-400/30' };
        if (index === 2) return { icon: <Medal className="text-orange-400" size={18} />, bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
        return { icon: null, bg: 'bg-slate-800/30', border: 'border-slate-700/50' };
    };

    const currentGame = GAMES.find(g => g.id === selectedGame);
    const currentScores = leaderboards[selectedGame] || [];

    return (
        <>
            <Helmet>
                <title>Hall of Fame | AgenticAI Home</title>
                <meta name="description" content="All-time greatest players. Top 10 legends for each game." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#0f0f1a] to-[#0a0a14] text-white">
                {/* Header */}
                <div className="sticky top-0 z-40 bg-[#0f0f1a]/90 backdrop-blur-xl border-b border-slate-800">
                    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                        <Link to="/games" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={20} />
                            <span className="hidden sm:inline">Back to Games</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            <Trophy className="text-yellow-400" size={28} />
                            <h1 className="text-xl sm:text-2xl font-black">Hall of Fame</h1>
                        </div>
                        <div className="w-20" /> {/* Spacer for centering */}
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Hero Section */}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full mb-4 border border-yellow-500/30">
                            <Sparkles size={16} />
                            <span className="font-bold">All-Time Legends</span>
                        </div>
                        <p className="text-slate-400 max-w-md mx-auto">
                            The greatest agents who ever played. Your name could be here forever.
                        </p>
                    </m.div>

                    {/* Game Selector */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {GAMES.map((game) => (
                            <m.button
                                key={game.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedGame(game.id)}
                                className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${selectedGame === game.id
                                        ? `bg-gradient-to-r ${game.color} text-white shadow-lg`
                                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                                    }`}
                            >
                                <span>{game.emoji}</span>
                                <span className="hidden sm:inline">{game.name}</span>
                            </m.button>
                        ))}
                    </div>

                    {/* Leaderboard Display */}
                    <m.div
                        key={selectedGame}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className={`bg-gradient-to-r ${currentGame.color} p-1 rounded-2xl shadow-2xl`}>
                            <div className="bg-[#131320] rounded-xl overflow-hidden">
                                {/* Game Header */}
                                <div className="p-6 text-center border-b border-slate-800">
                                    <div className="text-4xl mb-2">{currentGame.emoji}</div>
                                    <h2 className="text-2xl font-black">{currentGame.name}</h2>
                                    <p className="text-sm text-slate-400 mt-1">Top 10 All-Time</p>
                                </div>

                                {/* Scores */}
                                <div className="p-4">
                                    {loading ? (
                                        <div className="flex justify-center py-12">
                                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500" />
                                        </div>
                                    ) : currentScores.length === 0 ? (
                                        <div className="text-center py-12 text-slate-400">
                                            <Gamepad2 size={48} className="mx-auto mb-4 opacity-30" />
                                            <p className="font-bold">No legends yet!</p>
                                            <p className="text-sm mt-1">Be the first to claim your spot.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {currentScores.map((score, index) => {
                                                const rank = getRankDisplay(index);
                                                return (
                                                    <m.div
                                                        key={score.id || index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        className={`flex items-center justify-between p-4 rounded-xl border ${rank.bg} ${rank.border}`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <m.div
                                                                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${index === 0
                                                                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black'
                                                                        : index === 1
                                                                            ? 'bg-gradient-to-br from-slate-200 to-slate-400 text-black'
                                                                            : index === 2
                                                                                ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-black'
                                                                                : 'bg-slate-700 text-slate-300'
                                                                    }`}
                                                                animate={index === 0 ? { scale: [1, 1.1, 1] } : {}}
                                                                transition={{ repeat: Infinity, duration: 2 }}
                                                            >
                                                                {index + 1}
                                                            </m.div>
                                                            <div>
                                                                <div className="font-bold text-white flex items-center gap-2">
                                                                    {score.username || score.user?.email?.split('@')[0] || 'Anonymous'}
                                                                    {rank.icon}
                                                                </div>
                                                                <div className="text-xs text-slate-400">
                                                                    {score.achievedAt
                                                                        ? new Date(score.achievedAt).toLocaleDateString()
                                                                        : 'Legend'
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <m.div
                                                                className={`font-mono font-bold text-xl ${index === 0 ? 'text-yellow-400' : 'text-cyan-400'
                                                                    }`}
                                                                animate={index === 0 ? {
                                                                    textShadow: ['0 0 10px #fbbf24', '0 0 30px #fbbf24', '0 0 10px #fbbf24']
                                                                } : {}}
                                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                            >
                                                                {score.score?.toLocaleString() || 0}
                                                            </m.div>
                                                        </div>
                                                    </m.div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="p-4 border-t border-slate-800 bg-slate-900/50 text-center">
                                    <p className="text-xs text-slate-400">
                                        ⭐ All-Time Records • Eternal Glory
                                    </p>
                                </div>
                            </div>
                        </div>
                    </m.div>

                    {/* Call to Action */}
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-12"
                    >
                        <Link
                            to="/games"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-cyan-500/30 transition-all"
                        >
                            <Gamepad2 size={20} />
                            Play Now to Join the Legends
                        </Link>
                    </m.div>
                </div>
            </div>
        </>
    );
};

export default HallOfFame;
