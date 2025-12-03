import React, { useState, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Mail, Calendar, Zap, ArrowLeft, Trophy, Clock, BarChart2, Lock } from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';
import LeaderboardModal from '../components/gamification/LeaderboardModal';
import PasswordGate from '../components/PasswordGate';
import { api } from '../services/api';

// Lazy load games
const AgentTriageGame = React.lazy(() => import('../components/gamification/AgentTriageGame'));
const CalendarDefenseGame = React.lazy(() => import('../components/gamification/CalendarDefenseGame'));
const CaptainClickChallenge = React.lazy(() => import('../components/gamification/CaptainClickChallenge'));
const DeepWorkDive = React.lazy(() => import('../components/gamification/DeepWorkDive'));
const FocusFury = React.lazy(() => import('../components/gamification/FocusFury'));

const GamesPage = () => {
    const [activeGame, setActiveGame] = useState(null); // 'triage', 'calendar', 'clicker', 'deepwork'
    const [highScores, setHighScores] = useState({});
    const [leaderboardOpen, setLeaderboardOpen] = useState(false);
    const [selectedLeaderboardGame, setSelectedLeaderboardGame] = useState(null);
    const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
    const [showPasswordGate, setShowPasswordGate] = useState(false);

    // Load high scores from backend
    useEffect(() => {
        const fetchScores = async () => {
            const games = ['triage', 'calendar', 'clicker', 'deepwork', 'focusfury'];
            const scores = {};

            for (const gameId of games) {
                try {
                    // Try backend first
                    const response = await api.getMyBestScore(gameId);
                    scores[gameId] = response.score || 0;
                } catch (e) {
                    // Fallback to localStorage if backend fails or offline
                    console.warn(`Failed to fetch score for ${gameId}, falling back to local storage`);
                    scores[gameId] = parseInt(localStorage.getItem(`highscore_${gameId}`) || '0');
                }
            }
            setHighScores(scores);
        };

        fetchScores();
    }, [activeGame]); // Reload when returning from a game

    const games = React.useMemo(() => [
        {
            id: 'triage',
            title: 'Inbox Defense',
            description: 'Train your triage instincts. Every email is someone else\'s agenda—learn to spot what\'s actually yours.',
            icon: Mail,
            color: 'from-cyan-500 to-blue-500',
            component: AgentTriageGame,
            difficulty: 'Beginner',
            playtime: '~2 min',
            objective: 'Triage 20 emails correctly',
            isPremium: true
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
            objective: 'Protect 3+ hours of Deep Work',
            isPremium: true
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
            objective: 'Score 40+ clicks for Legendary status',
            isPremium: true
        },
        {
            id: 'deepwork',
            title: 'Deep Work Dive',
            description: '🔥 FREE TO PLAY! Flappy Bird meets productivity. Tap to surge, dodge distractions. Can you survive 30?',
            icon: Zap,
            color: 'from-blue-500 to-cyan-400',
            component: DeepWorkDive,
            difficulty: 'Hard',
            playtime: '~1 min',
            objective: 'Survive 30 distractions for viral bragging rights',
            isPremium: false,
            isFeatured: true
        },
        {
            id: 'focusfury',
            title: 'Focus Blitz',
            description: 'NEW! Zap incoming distractions with focus beams. 60 seconds of pure attention defense.',
            icon: Zap,
            color: 'from-cyan-500 to-blue-600',
            component: FocusFury,
            difficulty: 'Intermediate',
            playtime: '~1 min',
            objective: 'Zap 100+ distractions to reach Legendary status',
            isPremium: true
        }
    ], []);

    const handleGameClick = (game) => {
        if (game.isPremium && !isPremiumUnlocked) {
            setShowPasswordGate(true);
        } else {
            setActiveGame(game.id);
        }
    };

    const handlePasswordSuccess = () => {
        setIsPremiumUnlocked(true);
        setShowPasswordGate(false);
    };

    const openLeaderboard = (e, game) => {
        e.stopPropagation();
        setSelectedLeaderboardGame(game);
        setLeaderboardOpen(true);
    };

    return (
        <WebbookLayout>
            <div className="min-h-screen bg-[#0f0f1a] text-white p-6 pb-24">
                <div className="max-w-6xl mx-auto mt-8">

                    {/* Header */}
                    <div className="text-center mb-12">
                        {activeGame ? (
                            <div className="flex items-center justify-between mb-8">
                                <button
                                    onClick={() => setActiveGame(null)}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700 hover:border-cyan-500/50 transition-all text-slate-300 hover:text-white"
                                >
                                    <ArrowLeft size={20} />
                                    <span>Back to Hub</span>
                                </button>
                                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                    {games.find(g => g.id === activeGame)?.title}
                                </h1>
                                <div className="w-[120px]"></div> {/* Spacer for centering */}
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
                                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
                                    Sharpen your agentic skills. Practice rapid triage, calendar defense, and efficiency optimization.
                                </p>

                                {/* Global Stats / Ticker could go here */}
                                <div className="flex justify-center gap-8 text-sm text-slate-500 mb-12">
                                    <div className="flex items-center gap-2">
                                        <Trophy size={16} className="text-yellow-500" />
                                        <span>Compete for Global Rank</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BarChart2 size={16} className="text-cyan-500" />
                                        <span>Track Your Progress</span>
                                    </div>
                                </div>
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
                                        return GameComponent ? <GameComponent onBack={() => setActiveGame(null)} /> : null;
                                    })()}
                                </Suspense>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="list-view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
                            >
                                {games.map((game) => (
                                    <motion.div
                                        key={game.id}
                                        whileHover={{ y: -5 }}
                                        className="group relative bg-slate-800/40 border border-slate-700 hover:border-cyan-500/50 rounded-3xl overflow-hidden transition-all shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm flex flex-col"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                        {/* Card Content */}
                                        <div className="p-8 flex-1 flex flex-col relative z-10">
                                            {/* Locked Overlay */}
                                            {game.isPremium && !isPremiumUnlocked && (
                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 rounded-3xl">
                                                    <Lock size={48} className="text-cyan-400 mb-4" />
                                                    <h4 className="text-xl font-bold text-white mb-2">Premium Game</h4>
                                                    <p className="text-slate-300 text-sm text-center mb-4">
                                                        Unlock with Parts 2-5 of the webbook
                                                    </p>
                                                    <button
                                                        onClick={() => setShowPasswordGate(true)}
                                                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold text-sm hover:scale-105 transition-all"
                                                    >
                                                        🔓 Unlock Now
                                                    </button>
                                                </div>
                                            )}

                                            {/* FREE Badge */}
                                            {game.isFeatured && (
                                                <div className="absolute top-4 right-4 z-20">
                                                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 text-white text-xs font-bold shadow-lg">
                                                        ✨ FREE
                                                    </span>
                                                </div>
                                            )}

                                            {/* Top Row */}
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${game.color} shadow-lg shadow-black/20`}>
                                                    <game.icon size={32} className="text-white" />
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Personal Best</div>
                                                    <div className="font-mono text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                        {highScores[game.id] > 0 ? highScores[game.id].toLocaleString() : '--'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Title & Desc */}
                                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                                {game.title}
                                            </h3>
                                            <p className="text-slate-400 leading-relaxed mb-6 flex-1">
                                                {game.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                <span className="px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700 text-xs text-slate-300 font-medium">
                                                    {game.difficulty}
                                                </span>
                                                <span className="px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700 text-xs text-slate-300 font-medium flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {game.playtime}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                                <button
                                                    onClick={(e) => openLeaderboard(e, game)}
                                                    className="px-4 py-3 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Trophy size={16} className="text-yellow-500" />
                                                    Leaderboard
                                                </button>
                                                <button
                                                    onClick={() => handleGameClick(game)}
                                                    className={`px-4 py-3 rounded-xl bg-gradient-to-r ${game.color} text-white font-bold text-sm shadow-lg shadow-cyan-900/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2`}
                                                >
                                                    {game.isPremium && !isPremiumUnlocked ? (
                                                        <>
                                                            <Lock size={16} />
                                                            Unlock
                                                        </>
                                                    ) : (
                                                        <>
                                                            Play Now
                                                            <ArrowLeft className="rotate-180" size={16} />
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Leaderboard Modal */}
                    <LeaderboardModal
                        isOpen={leaderboardOpen}
                        onClose={() => setLeaderboardOpen(false)}
                        gameId={selectedLeaderboardGame?.id}
                        gameTitle={selectedLeaderboardGame?.title}
                    />

                    {/* Password Gate for Premium Games */}
                    <PasswordGate
                        isOpen={showPasswordGate}
                        onClose={() => setShowPasswordGate(false)}
                        onSuccess={handlePasswordSuccess}
                    />

                </div>
            </div>
        </WebbookLayout>
    );
};

export default GamesPage;
