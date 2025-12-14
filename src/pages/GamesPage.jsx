import React, { useState, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { m, AnimatePresence } from 'framer-motion';
import { Gamepad2, Mail, Calendar, Zap, ArrowLeft, Trophy, Clock, BarChart2, Lock, Brain, Crosshair, MousePointerClick } from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';
import LeaderboardModal from '../components/gamification/LeaderboardModal';
import PasswordGate from '../components/common/PasswordGate';
import { api } from '../services/api';
import { logEvent } from '../utils/analytics';
import { getHighScore, getErgoPayment, getStripePayment, getBetaAccess } from '../utils/typedStorage';

// Lazy load games
const AgentTriageGame = React.lazy(() => import('../components/gamification/AgentTriageGame'));
const CalendarDefenseGame = React.lazy(() => import('../components/gamification/CalendarDefenseGame'));
const CaptainClickChallenge = React.lazy(() => import('../components/gamification/CaptainClickChallenge'));
const DeepWorkDive = React.lazy(() => import('../components/gamification/DeepWorkDive'));
const FocusFury = React.lazy(() => import('../components/gamification/FocusFury'));



const GamesPage = () => {
    const [activeGame, setActiveGame] = useState(null); // 'triage', 'calendar', 'clicker', 'deepwork'
    const [isLoading, setIsLoading] = useState(false); // Loading state for game launch feedback
    const [highScores, setHighScores] = useState({});
    const [leaderboardOpen, setLeaderboardOpen] = useState(false);
    const [selectedLeaderboardGame, setSelectedLeaderboardGame] = useState(null);
    const navigate = useNavigate();

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
                    // Fallback to typedStorage if backend fails or offline
                    console.warn(`Failed to fetch score for ${gameId}, falling back to local storage`);
                    scores[gameId] = getHighScore(gameId);
                }
            }
            setHighScores(scores);
        };

        fetchScores();
    }, [activeGame]); // Reload when returning from a game

    const games = React.useMemo(() => [
        {
            id: 'deepwork',
            title: 'Deep Work Dive',
            description: '🔥 FREE TO PLAY! Flappy Bird meets productivity. Tap to surge, can you beat the urge to scroll?',
            icon: Brain,
            color: 'from-blue-500 to-teal-400',
            component: DeepWorkDive,
            difficulty: 'Hard',
            playtime: '~1 min',
            objective: 'Survive 30 distractions for viral bragging rights',
            isFeatured: true,
            unlockCondition: null // Always unlocked
        },
        {
            id: 'triage',
            title: 'Inbox Defense',
            description: 'Train your email sorting instincts. Feel the zen of an empty inbox.',
            icon: Mail,
            color: 'from-teal-500 to-blue-500',
            component: AgentTriageGame,
            difficulty: 'Beginner',
            playtime: '~2 min',
            objective: 'Triage 20 emails correctly',
            unlockCondition: 2 // Unlocks with Part 2
        },
        {
            id: 'calendar',
            title: 'Meeting Mayhem',
            description: 'Your calendar is under siege. Practice saying "no" here so you can say it in real life.',
            icon: Calendar,
            color: 'from-purple-500 to-pink-500',
            component: CalendarDefenseGame,
            difficulty: 'Intermediate',
            playtime: '~1 min',
            objective: 'Protect 3+ hours of Deep Work',
            unlockCondition: 3 // Unlocks with Part 3
        },
        {
            id: 'focusfury',
            title: 'Focus Blitz',
            description: 'NEW! Zap incoming distractions with focus beams. 60 seconds of pure attention defense.',
            icon: Crosshair,
            color: 'from-teal-500 to-blue-600',
            component: FocusFury,
            difficulty: 'Intermediate',
            playtime: '~1 min',
            objective: 'Zap 100+ distractions to reach Legendary status',
            unlockCondition: 4 // Unlocks with Part 4
        },
        {
            id: 'clicker',
            title: 'Tap Blitz',
            description: 'How fast can you tap? Tap Captain Efficiency before time runs out.',
            icon: MousePointerClick,
            color: 'from-yellow-400 to-orange-500',
            component: CaptainClickChallenge,
            difficulty: 'Beginner',
            playtime: '~30 sec',
            objective: 'Score 40+ clicks for Legendary status',
            unlockCondition: 5 // Unlocks with Part 5
        }
    ], []);

    const handleGameClick = (game) => {
        // Use the shared unlock check
        if (!isGameUnlocked(game)) return;

        logEvent('Game', 'Select', game.id);

        // Show loading feedback before game loads
        setIsLoading(true);
        setTimeout(() => {
            setActiveGame(game.id);
            setIsLoading(false);
        }, 300); // Brief delay for visual feedback
    };

    const openLeaderboard = (e, game) => {
        e.stopPropagation();
        setSelectedLeaderboardGame(game);
        setLeaderboardOpen(true);
    };

    // Helper to check unlock status - ALL games unlock with purchase
    const isGameUnlocked = (game) => {
        // Free games (no unlock condition) are always unlocked
        if (!game.unlockCondition) return true;

        // Use typedStorage for safe access (auto-recovers from corruption)
        // Check if user has paid for full access (Ergo or Stripe) - unlocks ALL games
        const ergoPayment = getErgoPayment();
        const stripePayment = getStripePayment();
        if (ergoPayment?.paid === true || stripePayment?.paid === true) return true;

        // Check beta access (also unlocks all games)
        if (getBetaAccess()) return true;

        // Not purchased - game is locked
        return false;
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Games Hub - Agentic AI Training Grounds</title>
                <meta name="description" content="Train your efficiency skills with our suite of productivity games. Inbox Defense, Deep Work Dive, and more." />
            </Helmet>

            <div className="min-h-screen bg-[#0f0f1a] text-white p-6 pb-24">
                <div className="max-w-6xl mx-auto mt-8">

                    {/* Header */}
                    <div className="text-center mb-12">
                        {activeGame ? (
                            <div className="flex items-center justify-between mb-8">
                                <button
                                    onClick={() => setActiveGame(null)}
                                    className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-slate-800/50 border border-slate-600 rounded-xl hover:bg-slate-700 hover:border-teal-500/50 transition-all text-slate-300 hover:text-white"
                                    aria-label="Go back to Games Hub"
                                >
                                    <ArrowLeft size={20} />
                                    <span>Back to Hub</span>
                                </button>
                                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
                                    {games.find(g => g.id === activeGame)?.title}
                                </h1>                                <div className="w-[120px]"></div> {/* Spacer for centering */}
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-center mb-6">
                                    <div className="p-4 bg-gradient-to-br from-teal-500 to-purple-600 rounded-2xl shadow-lg shadow-purple-500/20 inline-block">
                                        <Gamepad2 size={40} className="text-white" />
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-6 drop-shadow-2xl">
                                    Training Games
                                </h1>
                                <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                                    Play. Learn. Master. Skills transfer to real life.
                                </p>
                                {/* Challenge Hook */}
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-6">
                                    <span className="text-yellow-400 text-sm font-medium">
                                        🎮 Deep Work Dive: Most can't survive 15 distractions. Can you?
                                    </span>
                                </div>

                                {/* Global Stats / Ticker */}
                                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-slate-300 mb-12">
                                    <div className="flex items-center gap-2">
                                        <Trophy size={16} className="text-yellow-500" />
                                        <span>Compete for Global Rank</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BarChart2 size={16} className="text-teal-500" />
                                        <span>Track Your Progress</span>
                                    </div>
                                    <a
                                        href="/hall-of-fame"
                                        className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                                    >
                                        <Trophy size={16} />
                                        <span className="underline underline-offset-2">Hall of Fame</span>
                                    </a>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Game View or List View */}
                    <AnimatePresence mode="wait">
                        {activeGame ? (
                            <m.div
                                key="game-view"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.15 }}
                                className="bg-slate-900/50 border border-slate-600 rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <Suspense fallback={
                                    <div className="h-96 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                                    </div>
                                }>
                                    {(() => {
                                        const GameComponent = games.find(g => g.id === activeGame)?.component;
                                        return GameComponent ? <GameComponent onBack={() => setActiveGame(null)} /> : null;
                                    })()}
                                </Suspense>
                            </m.div>
                        ) : (
                            <m.div
                                key="list-view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
                            >
                                {games.map((game) => {
                                    const unlocked = isGameUnlocked(game);

                                    return (
                                        <m.div
                                            key={game.id}
                                            whileHover={unlocked ? { y: -5 } : {}}
                                            className={`group relative bg-slate-800/40 border border-slate-600 rounded-3xl overflow-hidden transition-all shadow-lg backdrop-blur-sm flex flex-col ${unlocked ? 'hover:border-teal-500/50 hover:shadow-teal-500/10 cursor-pointer' : 'opacity-75'}`}
                                            onClick={() => unlocked && handleGameClick(game)}
                                        >
                                            {/* Background Gradient */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 ${unlocked ? 'group-hover:opacity-5' : ''} transition-opacity duration-500`} />

                                            {/* LOCKED OVERLAY */}
                                            {!unlocked && (
                                                <div className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                                                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-600">
                                                        <Zap className="text-slate-300" size={24} />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-2">Locked</h3>
                                                    <p className="text-slate-300 text-sm mb-4">
                                                        Unlock <strong className="text-teal-400">all games</strong> with full access
                                                    </p>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate('/unlock');
                                                        }}
                                                        className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 rounded-lg text-sm text-white transition-all flex items-center gap-2 font-bold shadow-lg"
                                                    >
                                                        Start My Agent Army
                                                    </button>
                                                </div>
                                            )}

                                            {/* Card Content */}
                                            <div className="p-8 flex-1 flex flex-col relative z-10">

                                                {/* FREE Badge */}
                                                {game.isFeatured && (
                                                    <div className="absolute top-4 right-4 z-20">
                                                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold shadow-lg">
                                                            ✨ FREE
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Top Row */}
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${game.color} shadow-lg shadow-black/20 ${!unlocked && 'grayscale opacity-50'}`}>
                                                        <game.icon size={32} className="text-white" />
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Personal Best</div>
                                                        <div className="font-mono text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">
                                                            {highScores[game.id] > 0 ? highScores[game.id].toLocaleString() : '--'}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Title & Desc */}
                                                <h3 className={`text-2xl font-bold text-white mb-3 ${unlocked ? 'group-hover:text-teal-400' : ''} transition-colors`}>
                                                    {game.title}
                                                </h3>
                                                <p className="text-slate-300 leading-relaxed mb-6 flex-1">
                                                    {game.description}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    <span className="px-3 py-1 rounded-full bg-slate-900/50 border border-slate-600 text-xs text-slate-300 font-medium">
                                                        {game.difficulty}
                                                    </span>
                                                    <span className="px-3 py-1 rounded-full bg-slate-900/50 border border-slate-600 text-xs text-slate-300 font-medium flex items-center gap-1">
                                                        <Clock size={12} />
                                                        {game.playtime}
                                                    </span>
                                                </div>

                                                {/* Actions */}
                                                <div className="grid grid-cols-2 gap-4 mt-auto">
                                                    <button
                                                        onClick={(e) => openLeaderboard(e, game)}
                                                        className="px-4 py-3 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-slate-600 hover:border-slate-600 text-slate-300 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <Trophy size={16} className="text-yellow-500" />
                                                        Leaderboard
                                                    </button>
                                                    <button
                                                        disabled={!unlocked || isLoading}
                                                        className={`px-4 py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${unlocked
                                                            ? `bg-gradient-to-r ${game.color} text-white shadow-teal-900/20 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]`
                                                            : 'bg-slate-700 text-slate-300 cursor-not-allowed'
                                                            }`}
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                Loading...
                                                            </>
                                                        ) : unlocked ? (
                                                            <>
                                                                Play Now
                                                                <ArrowLeft className="rotate-180" size={16} />
                                                            </>
                                                        ) : 'Locked'}
                                                    </button>
                                                </div>
                                            </div>
                                        </m.div>
                                    );
                                })}
                            </m.div>
                        )}
                    </AnimatePresence>

                    {/* Leaderboard Modal */}
                    <LeaderboardModal
                        isOpen={leaderboardOpen}
                        onClose={() => setLeaderboardOpen(false)}
                        gameId={selectedLeaderboardGame?.id}
                        gameTitle={selectedLeaderboardGame?.title}
                    />

                </div>
            </div>
        </WebbookLayout>
    );
};

export default GamesPage;
