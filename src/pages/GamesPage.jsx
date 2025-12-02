import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Mail, Calendar, Zap, ArrowLeft, Trophy } from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';

// Lazy load games
const AgentTriageGame = React.lazy(() => import('../components/gamification/AgentTriageGame'));
const CalendarDefenseGame = React.lazy(() => import('../components/gamification/CalendarDefenseGame'));
const CaptainClickChallenge = React.lazy(() => import('../components/gamification/CaptainClickChallenge'));

const GamesPage = () => {
    const [activeGame, setActiveGame] = useState(null); // 'triage', 'calendar', 'clicker'

    const games = [
        {
            id: 'triage',
            title: 'Inbox Defense',
            description: 'Training Simulation: Filter the noise. Delegate the work. Delete the spam.',
            icon: Mail,
            color: 'from-cyan-500 to-blue-500',
            component: AgentTriageGame
        },
        {
            id: 'calendar',
            title: 'Calendar Defense',
            description: 'Protect your Deep Work blocks from the onslaught of useless meetings.',
            icon: Calendar,
            color: 'from-purple-500 to-pink-500',
            component: CalendarDefenseGame
        },
        {
            id: 'clicker',
            title: 'Captain Click Challenge',
            description: 'Test your reflexes with Captain Efficiency. How fast can you optimize?',
            icon: Zap,
            color: 'from-yellow-400 to-orange-500',
            component: CaptainClickChallenge
        }
    ];

    return (
        <WebbookLayout>
            <div className="min-h-screen bg-[#0f0f1a] text-white p-6 pb-24">
                <div className="max-w-4xl mx-auto mt-8">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        {activeGame ? (
                            <button
                                onClick={() => setActiveGame(null)}
                                className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
                            >
                                <ArrowLeft size={24} />
                            </button>
                        ) : (
                            <div className="p-3 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20">
                                <Gamepad2 size={32} className="text-white" />
                            </div>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                {activeGame ? games.find(g => g.id === activeGame)?.title : 'Agent Training Center'}
                            </h1>
                            {!activeGame && (
                                <p className="text-slate-400 text-sm">Sharpen your productivity skills with these simulations.</p>
                            )}
                        </div>
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
                                        className="text-left group relative overflow-hidden bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 rounded-2xl p-6 transition-all shadow-lg hover:shadow-cyan-500/10"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                                        <div className="relative z-10 flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${game.color} shadow-lg`}>
                                                <game.icon size={24} className="text-white" />
                                            </div>
                                            <Trophy size={20} className="text-slate-600 group-hover:text-yellow-400 transition-colors" />
                                        </div>

                                        <h3 className="relative z-10 text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                            {game.title}
                                        </h3>
                                        <p className="relative z-10 text-slate-400 text-sm leading-relaxed">
                                            {game.description}
                                        </p>

                                        <div className="relative z-10 mt-6 flex items-center text-cyan-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                            START SIMULATION <ArrowLeft className="rotate-180 ml-2" size={16} />
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
