import React, { useState, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Mail, Calendar, Zap, ArrowLeft, Trophy, Clock } from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';

// Lazy load games
const AgentTriageGame = React.lazy(() => import('../components/gamification/AgentTriageGame'));
const CalendarDefenseGame = React.lazy(() => import('../components/gamification/CalendarDefenseGame'));
const CaptainClickChallenge = React.lazy(() => import('../components/gamification/CaptainClickChallenge'));

const GamesPage = () => {
    const [activeGame, setActiveGame] = useState(null); // 'triage', 'calendar', 'clicker'
    const [highScores, setHighScores] = useState({});

    // Load high scores from localStorage
    useEffect(() => {
        const scores = {
            triage: localStorage.getItem('highscore_triage') || 0,
            calendar: localStorage.getItem('highscore_calendar') || 0,
            clicker: localStorage.getItem('highscore_clicker') || 0
        };
        setHighScores(scores);
    }, [activeGame]); // Reload when returning from a game

    const games = [
        {
            id: 'triage',
            title: 'Inbox Defense',
            description: 'Train your triage instincts. Every email is someone else\'s agenda—learn to spot what\'s actually yours.',
            icon: Mail,
            color: 'from-cyan-500 to-blue-500',
            component: AgentTriageGame,
            difficulty: 'Beginner',
            playtime: '~2 min',
            objective: 'Triage 20 emails correctly'
        },
        {
            id: 'calendar',
            title: 'Calendar Defense',
            description: 'Your calendar is under siege. Decline the noise, defend deep work, survive the meeting onslaught.',
            icon: Calendar,
            color: 'from-purple-500 to-pink-500',
            component: CalendarDefenseGame,
            difficulty: 'Intermediate',
            playtime: '~1 min',
            objective: 'Protect 3+ hours of Deep Work'
        },
        {
            id: 'clicker',
            title: 'Captain Click Challenge',
            description: 'How fast can you optimize? Click Captain Efficiency before time runs out. Speed = efficiency.',
            icon: Zap,
            color: 'from-yellow-400 to-orange-500',
            component: CaptainClickChallenge,
            difficulty: 'Beginner',
            playtime: '~30 sec',
            objective: 'Score 40+ clicks for Legendary status'
        }
    ];

    return (
        <WebbookLayout>
            <div className="min-h-screen bg-[#0f0f1a] text-white p-6 pb-24">
                <div className="max-w-4xl mx-auto mt-8">

                    {/* Header */}
                    <div className="text-center mb-12">
                        {activeGame ? (
                            <div className="flex items-center gap-4 mb-8">
                                <button
                                    onClick={() => setActiveGame(null)}
                                    className="p-2 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700 hover:border-cyan-500/50 transition-all"
                                >
                                    <ArrowLeft size={24} />
                                </button>
                                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                    {games.find(g => g.id === activeGame)?.title}
                                </h1>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-center mb-6">
                                    <div className="p-4 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl shadow-lg shadow-purple-500/20 inline-block">
                                        <Gamepad2 size={40} className="text-white" />
                                    </div>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                        Agent Training Center
                                    </span>
                                </h1>
                                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-2">
                                    Sharpen your agentic skills. Practice rapid triage, calendar defense, and efficiency optimization.
                                </p>
                                <p className="text-sm text-slate-500">
                                    Your high scores are saved locally. Come back daily to improve.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Game View or List View */}
                    <AnimatePresence mode="wait">
                        {activeGame ? (
                            <motion.div
                                key="game-view"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <Suspense fallback={
                                    <div className="h-96 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                                    </div>
                                }>
                                    {(() => {
                                        const GameComponent = games.find(g => g.id === activeGame)?.component;
                                        return GameComponent ? <GameComponent /> : null;
                                    })()}
                                </Suspense>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="list-view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid md:grid-cols-2 gap-6"
                            >
                                {games.map((game) => (
                                    <motion.button
                                        key={game.id}
                                        onClick={() => setActiveGame(game.id)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="text-left group relative overflow-hidden bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 rounded-2xl p-6 transition-all shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                                        <div className="relative z-10">
                                            {/* Header with Icon and Trophy */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-3 rounded-xl bg-gradient-to-br ${game.color} shadow-lg`}>
                                                    <game.icon size={24} className="text-white" />
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <Trophy size={16} className="text-slate-600 group-hover:text-yellow-400 transition-colors" />
                                                    <span className="text-xs text-slate-600 group-hover:text-yellow-400 font-mono">
                                                        {highScores[game.id] > 0 ? `Best: ${highScores[game.id]}` : 'Best: --'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                                {game.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                                {game.description}
                                            </p>

                                            {/* Metadata Badges */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600">
                                                    {game.difficulty}
                                                </span>
                                                <span className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600 flex items-center gap-1">
                                                    <Clock size={10} />
                                                    {game.playtime}
                                                </span>
                                            </div>

                                            {/* Objective */}
                                            <div className="text-xs text-slate-500 mb-4">
                                                <strong className="text-slate-400">Goal:</strong> {game.objective}
                                            </div>

                                            {/* CTA */}
                                            <div className="flex items-center text-cyan-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                                START TRAINING <ArrowLeft className="rotate-180 ml-2" size={16} />
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default GamesPage;
