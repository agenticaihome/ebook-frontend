import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import {
    Home, Settings, LogOut, Shield, Trophy,
    Sparkles, ChevronRight, Bell, Map, Gamepad2
} from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';
import { usePageTitle } from '../hooks/usePageTitle';
import { api } from '../services/api';

// Dashboard Components
import HeroStatusBar from '../components/dashboard/HeroStatusBar';
import QuestMap from '../components/dashboard/QuestMap';
import ChallengeArena from '../components/dashboard/ChallengeArena';
import QuestLog from '../components/dashboard/QuestLog';
import LevelUpCelebration from '../components/dashboard/LevelUpCelebration';

// ============================================
// ACHIEVEMENTS DATA
// ============================================
const ACHIEVEMENTS = [
    { id: 'first_quest', name: 'First Steps', description: 'Complete your first chapter', icon: '🎯', condition: (c) => c.length >= 1 },
    { id: 'five_quests', name: 'Adventurer', description: 'Complete 5 chapters', icon: '⚔️', condition: (c) => c.length >= 5 },
    { id: 'ten_quests', name: 'Veteran', description: 'Complete 10 chapters', icon: '🛡️', condition: (c) => c.length >= 10 },
    { id: 'all_quests', name: 'Grand Master', description: 'Complete all 16 chapters', icon: '👑', condition: (c) => c.length >= 16 },
    { id: 'first_game', name: 'Challenger', description: 'Play your first game', icon: '🎮', condition: (_, g) => g.length >= 1 },
    { id: 'all_games', name: 'Arena Champion', description: 'Play all games', icon: '🏆', condition: (_, g) => g.length >= 5 },
    { id: 'streak_3', name: 'On Fire', description: '3-day streak', icon: '🔥', condition: (_, __, s) => s >= 3 },
    { id: 'streak_7', name: 'Unstoppable', description: '7-day streak', icon: '💫', condition: (_, __, s) => s >= 7 },
];

// ============================================
// QUICK ACTION CARDS
// ============================================
const QuickAction = ({ icon: Icon, title, subtitle, to, color }) => (
    <Link to={to}>
        <m.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 cursor-pointer group transition-colors`}
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon className="text-white" size={20} />
                </div>
                <div>
                    <div className="text-white font-medium group-hover:text-cyan-400 transition-colors">{title}</div>
                    <div className="text-xs text-slate-400">{subtitle}</div>
                </div>
                <ChevronRight className="text-slate-600 ml-auto group-hover:text-cyan-400 transition-colors" size={16} />
            </div>
        </m.div>
    </Link>
);

// ============================================
// ACHIEVEMENT BADGE
// ============================================
const AchievementBadge = ({ achievement, unlocked }) => (
    <m.div
        whileHover={{ scale: 1.05 }}
        className={`p-3 rounded-xl text-center transition-all ${unlocked
            ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/20 border border-yellow-500/30'
            : 'bg-slate-800/30 border border-slate-700/30 opacity-50 grayscale'
            }`}
    >
        <div className="text-2xl mb-1">{achievement.icon}</div>
        <div className={`text-xs font-bold ${unlocked ? 'text-yellow-400' : 'text-slate-500'}`}>
            {achievement.name}
        </div>
    </m.div>
);

// ============================================
// CHANGE PASSWORD FORM
// ============================================
const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [status, setStatus] = useState('IDLE');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('LOADING');
        setMessage('');

        try {
            const data = await api.changePassword(currentPassword, newPassword);
            if (data.success) {
                setStatus('SUCCESS');
                setMessage('Password updated successfully.');
                setCurrentPassword('');
                setNewPassword('');
            } else {
                setStatus('ERROR');
                setMessage(data.error || 'Failed to update password.');
            }
        } catch (err) {
            setStatus('ERROR');
            setMessage(err.message || 'Network error. Please try again.');
        }
    };

    return (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                <Shield size={14} className="text-cyan-400" />
                Change Password
            </h4>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none"
                    required
                />
                <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none"
                    required
                />
                {message && (
                    <div className={`text-xs p-2 rounded ${status === 'SUCCESS' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                        {message}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={status === 'LOADING'}
                    className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                    {status === 'LOADING' ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </div>
    );
};

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================
const Dashboard = () => {
    usePageTitle('Quest Dashboard');
    const navigate = useNavigate();

    const [showLevelUp, setShowLevelUp] = useState(false);
    const [newRank, setNewRank] = useState(null);
    const [completedChapters, setCompletedChapters] = useState([]);
    const [completedGames, setCompletedGames] = useState([]);
    const [streak, setStreak] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);

    // Check login status (but don't redirect - dashboard is public)
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    // Load progress and check first visit
    useEffect(() => {
        setCompletedChapters(JSON.parse(localStorage.getItem('completed_chapters') || '[]'));
        setCompletedGames(JSON.parse(localStorage.getItem('completed_games') || '[]'));
        setStreak(parseInt(localStorage.getItem('daily_streak') || '0'));

        // Show welcome modal on first dashboard visit
        const hasSeenWelcome = localStorage.getItem('dashboard_welcomed');
        if (!hasSeenWelcome) {
            setShowWelcome(true);
        }
    }, []);

    const handleCloseWelcome = () => {
        setShowWelcome(false);
        localStorage.setItem('dashboard_welcomed', 'true');
    };

    const handleLevelUp = (rank) => {
        setNewRank(rank);
        setShowLevelUp(true);
    };

    const unlockedAchievements = ACHIEVEMENTS.filter(a =>
        a.condition(completedChapters, completedGames, streak)
    );

    return (
        <WebbookLayout>
            <Helmet>
                <title>Quest Dashboard | Agentic AI at Home</title>
                <meta name="description" content="Your Frontier Command center - track expeditions, earn Discovery Points, and conquer new territories on your AI journey." />
            </Helmet>

            {/* Welcome Modal - First Time Visitors */}
            <AnimatePresence>
                {showWelcome && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={handleCloseWelcome}
                    >
                        <m.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative max-w-md w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Captain Efficiency - Scout Companion */}
                            <div className="flex justify-center mb-4">
                                <div className="relative w-20 h-20">
                                    <img
                                        src="/assets/images/captain-e-transparent.png"
                                        alt="Captain Efficiency, your scout companion"
                                        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                                    />
                                    <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full" />
                                </div>
                            </div>

                            {/* Welcome Message */}
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Welcome, Explorer! 🧭
                                </h2>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    I'm Captain Efficiency, your scout companion! This is your <span className="text-cyan-400 font-medium">Frontier Command</span> —
                                    your base for charting the AI frontier.
                                </p>
                            </div>

                            {/* Quick Guide */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                    <Map className="text-cyan-400 flex-shrink-0 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-white text-sm font-medium">Territory Map</p>
                                        <p className="text-slate-400 text-xs">Explore 16 expeditions across 5 territories</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                    <Trophy className="text-yellow-400 flex-shrink-0 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-white text-sm font-medium">Earn Discovery Points</p>
                                        <p className="text-slate-400 text-xs">Complete expeditions to rank up</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                    <Gamepad2 className="text-purple-400 flex-shrink-0 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-white text-sm font-medium">Frontier Challenges</p>
                                        <p className="text-slate-400 text-xs">Unlock mini-games after each territory</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <Link
                                to="/part1/chapter1"
                                onClick={handleCloseWelcome}
                                className="block w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-center font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                            >
                                Begin First Expedition →
                            </Link>

                            {/* Skip */}
                            <button
                                onClick={handleCloseWelcome}
                                className="block w-full mt-3 py-2 text-slate-400 hover:text-white text-sm text-center transition-colors"
                            >
                                Explore Base Camp First
                            </button>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Level Up Celebration */}
            <LevelUpCelebration
                isOpen={showLevelUp}
                onClose={() => setShowLevelUp(false)}
                newRank={newRank}
            />

            <div className="min-h-screen bg-[#0f0f1a] text-white pt-20 pb-24 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Hero Status Bar */}
                    <HeroStatusBar onLevelUp={handleLevelUp} />

                    {/* Main Grid */}
                    <div className="grid lg:grid-cols-3 gap-6">

                        {/* Left Column - Quest Map & Arena */}
                        <div className="lg:col-span-2 space-y-6">
                            <QuestMap />
                            <ChallengeArena />
                        </div>

                        {/* Right Column - Quest Log & Extras */}
                        <div className="space-y-6">
                            <QuestLog />

                            {/* Achievements */}
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Trophy className="text-yellow-400" size={20} />
                                        <h3 className="text-white font-bold">Achievements</h3>
                                    </div>
                                    <span className="text-xs text-slate-400">
                                        {unlockedAchievements.length}/{ACHIEVEMENTS.length}
                                    </span>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {ACHIEVEMENTS.slice(0, 8).map((achievement) => (
                                        <AchievementBadge
                                            key={achievement.id}
                                            achievement={achievement}
                                            unlocked={unlockedAchievements.some(a => a.id === achievement.id)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-3">
                                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                                    <Sparkles size={14} className="text-purple-400" />
                                    Quick Actions
                                </h3>
                                <QuickAction
                                    icon={Home}
                                    title="Return to Camp"
                                    subtitle="Back to home page"
                                    to="/"
                                    color="from-emerald-500 to-cyan-500"
                                />
                                <QuickAction
                                    icon={Trophy}
                                    title="Agent Deck"
                                    subtitle="View your collected cards"
                                    to="/deck"
                                    color="from-purple-500 to-pink-500"
                                />
                            </div>

                            {/* Settings Toggle */}
                            {isLoggedIn ? (
                                <>
                                    <button
                                        onClick={() => setShowSettings(!showSettings)}
                                        className="w-full flex items-center justify-between p-3 bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm transition-colors"
                                    >
                                        <span className="flex items-center gap-2 text-slate-300">
                                            <Settings size={16} />
                                            Settings
                                        </span>
                                        <ChevronRight className={`text-slate-500 transition-transform ${showSettings ? 'rotate-90' : ''}`} size={16} />
                                    </button>

                                    {showSettings && (
                                        <m.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="space-y-3"
                                        >
                                            <ChangePasswordForm />
                                            <button
                                                onClick={() => {
                                                    localStorage.removeItem('token');
                                                    navigate('/login');
                                                }}
                                                className="w-full flex items-center justify-center gap-2 p-3 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium transition-colors"
                                            >
                                                <LogOut size={16} />
                                                Log Out
                                            </button>
                                        </m.div>
                                    )}
                                </>
                            ) : (
                                <Link to="/login">
                                    <m.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full flex items-center justify-center gap-2 p-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-white text-sm font-bold transition-colors"
                                    >
                                        Sign In to Save Progress
                                    </m.button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </WebbookLayout>
    );
};

export default Dashboard;
