import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { BookOpen, Gamepad2, Trophy, Settings, LogOut, ChevronRight, CheckCircle, Wrench } from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';
import WelcomeModal from '../components/common/WelcomeModal';
import ChapterBadge from '../components/gamification/ChapterBadge';

// ============================================
// GRANDMA DASHBOARD - Ultra Simple Version
// Design Goal: 99-year-old can navigate this
// ============================================

// Chapter titles for "Continue Learning" button
const CHAPTER_TITLES = {
    1: 'Morning Agent',
    2: 'Meal Planning Agent',
    3: 'Important Dates Agent',
    4: 'Email Triage Agent',
    5: 'Money Check-In Agent',
    6: 'Fitness Agent',
    7: 'Work Task Agent',
    8: 'Custom Agent Builder',
    9: 'Multi-Agent Coordination',
    10: 'Your Agent Army'
};

const CHAPTER_ROUTES = {
    1: '/part1/chapter1',
    2: '/part1/chapter2',
    3: '/part1/chapter3',
    4: '/part2/chapter4',
    5: '/part2/chapter5',
    6: '/part2/chapter6',
    7: '/part2/chapter7',
    8: '/part3/chapter8',
    9: '/part3/chapter9',
    10: '/part3/chapter10'
};

// ============================================
// BIG BUTTON COMPONENT
// ============================================
const BigButton = ({ to, icon: Icon, title, subtitle, color, external }) => {
    const content = (
        <m.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-2xl ${color} shadow-lg cursor-pointer group transition-all`}
        >
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Icon className="text-white" size={32} />
                </div>
                <div className="flex-1">
                    <div className="text-xl font-bold text-white">{title}</div>
                    <div className="text-white/80">{subtitle}</div>
                </div>
                <ChevronRight className="text-white/60 group-hover:translate-x-1 transition-transform" size={28} />
            </div>
        </m.div>
    );

    if (external) {
        return <a href={to} target="_blank" rel="noopener noreferrer" className="block">{content}</a>;
    }
    return <Link to={to} className="block">{content}</Link>;
};

// ============================================
// SMALL ACTION BUTTON
// ============================================
const SmallButton = ({ to, icon: Icon, title, color }) => (
    <Link to={to}>
        <m.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`p-5 rounded-xl ${color} text-center cursor-pointer transition-all h-full`}
        >
            <Icon className="mx-auto mb-2 text-white" size={28} />
            <div className="text-white font-bold text-lg">{title}</div>
        </m.div>
    </Link>
);

// ============================================
// MAIN DASHBOARD
// ============================================
const Dashboard = () => {
    const navigate = useNavigate();
    const [completedChapters, setCompletedChapters] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        // Load progress
        const completed = JSON.parse(localStorage.getItem('completed_chapters') || '[]');
        setCompletedChapters(completed);

        // Show welcome modal for purchasers
        const hasSeenWelcome = localStorage.getItem('welcome_modal_seen');
        const isPurchaser = localStorage.getItem('unlocked_part_2') === 'true' ||
            localStorage.getItem('beta_access') === 'true' ||
            localStorage.getItem('token');
        if (!hasSeenWelcome && isPurchaser) {
            setShowWelcome(true);
        }
    }, []);

    // Find next uncompleted chapter
    const getNextChapter = () => {
        for (let i = 1; i <= 10; i++) {
            const chapterId = `chapter${i}`;
            if (!completedChapters.includes(chapterId)) {
                return { number: i, title: CHAPTER_TITLES[i], route: CHAPTER_ROUTES[i] };
            }
        }
        return null; // All complete!
    };

    const nextChapter = getNextChapter();
    const completedCount = completedChapters.length;
    const allComplete = completedCount >= 10;

    return (
        <WebbookLayout>
            <Helmet>
                <title>My Progress | Agentic AI Home</title>
                <meta name="description" content="Track your AI learning progress and continue where you left off." />
            </Helmet>

            {/* Welcome Modal */}
            <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} />

            <div className="min-h-screen bg-[#0a0a12] text-white px-4 py-8">
                <div className="max-w-2xl mx-auto">

                    {/* ===================== */}
                    {/* HEADER - With Captain Efficiency Tip */}
                    {/* ===================== */}
                    <div className="flex flex-col items-center gap-4 mb-10 text-center">
                        {/* DELIGHT: Floating Captain Efficiency Speech Bubble (Disney Audit) */}
                        <m.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="bg-slate-800 border border-teal-500/30 rounded-2xl p-4 max-w-sm mx-auto shadow-lg shadow-teal-900/20 relative z-10">
                                <p className="text-white text-base">
                                    {allComplete
                                        ? "All 10 agents deployed. Life on autopilot. 🎉"
                                        : completedCount === 0
                                            ? "Ready for your first agent? Let's go!"
                                            : "Nice progress! One more today?"}
                                </p>
                                {/* Triangle pointer */}
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-b border-r border-teal-500/30 transform rotate-45"></div>
                            </div>
                        </m.div>

                        <div className="mt-4">
                            <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
                                My Dashboard
                            </h1>
                            <p className="text-xl text-slate-300">
                                <span className="text-teal-400 font-bold">{completedCount}</span> of 10 complete.
                            </p>
                        </div>
                    </div>

                    {/* ===================== */}
                    {/* PROGRESS BAR - Visual */}
                    {/* ===================== */}
                    <div className="mb-8">
                        <div className="flex justify-between text-sm text-slate-300 mb-2">
                            <span>Progress</span>
                            <span>{Math.round((completedCount / 10) * 100)}%</span>
                        </div>
                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                            <m.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(completedCount / 10) * 100}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full progress-shimmer"
                            />
                        </div>
                    </div>

                    {/* ===================== */}
                    {/* PRIMARY ACTION */}
                    {/* ===================== */}
                    {!allComplete ? (
                        <div className="mb-8">
                            <BigButton
                                to={nextChapter?.route || '/part1/chapter1'}
                                icon={BookOpen}
                                title="Continue Learning"
                                subtitle={`Next: Chapter ${nextChapter?.number} - ${nextChapter?.title}`}
                                color="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500"
                            />
                        </div>
                    ) : (
                        <div className="mb-8 p-6 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl text-center">
                            <div className="text-4xl mb-3">🎉</div>
                            <div className="text-2xl font-bold mb-2">You did it!</div>
                            <div className="text-white/80">All 10 agents are deployed. Your life is officially on autopilot!</div>
                        </div>
                    )}

                    {/* ===================== */}
                    {/* SECTION DIVIDER */}
                    {/* ===================== */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-slate-700" />
                        <span className="text-slate-300 text-sm font-medium">More</span>
                        <div className="flex-1 h-px bg-slate-700" />
                    </div>

                    {/* ===================== */}
                    {/* SECONDARY ACTIONS */}
                    {/* ===================== */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <SmallButton
                            to="/games"
                            icon={Gamepad2}
                            title="Play Games"
                            color="bg-gradient-to-br from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500"
                        />
                        <SmallButton
                            to="/tools"
                            icon={Wrench}
                            title="Tools"
                            color="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                        />
                        <SmallButton
                            to="/hall-of-fame"
                            icon={Trophy}
                            title="Leaderboard"
                            color="bg-gradient-to-br from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400"
                        />
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-5 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-center cursor-pointer transition-all"
                        >
                            <Settings className="mx-auto mb-2 text-white" size={28} />
                            <div className="text-white font-bold text-lg">Settings</div>
                        </button>
                    </div>

                    {/* ===================== */}
                    {/* SETTINGS PANEL */}
                    {/* ===================== */}
                    {showSettings && (
                        <m.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700"
                        >
                            <h3 className="text-xl font-bold mb-4">⚙️ Settings</h3>

                            {isLoggedIn ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-xl">
                                        <CheckCircle className="text-green-400" size={24} />
                                        <span className="text-slate-300">You're logged in</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            navigate('/login');
                                        }}
                                        className="w-full flex items-center justify-center gap-3 p-4 bg-red-900/30 hover:bg-red-900/50 border border-red-500/30 rounded-xl text-red-400 font-bold text-lg transition-colors"
                                    >
                                        <LogOut size={22} />
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login">
                                    <button className="w-full p-4 bg-teal-600 hover:bg-teal-500 rounded-xl text-white font-bold text-lg transition-colors">
                                        Sign In to Save Progress
                                    </button>
                                </Link>
                            )}
                        </m.div>
                    )}

                    {/* ===================== */}
                    {/* CHAPTER LIST (Simple) */}
                    {/* ===================== */}
                    <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
                        <h3 className="text-xl font-bold mb-4">📖 Your Chapters</h3>
                        <div className="space-y-2">
                            {Object.entries(CHAPTER_TITLES).map(([num, title]) => {
                                const isComplete = completedChapters.includes(`chapter${num}`);
                                const isPremium = parseInt(num) >= 4;

                                return (
                                    <Link key={num} to={CHAPTER_ROUTES[num]}>
                                        <div className={`flex items-center gap-4 p-3 rounded-xl card-glow-hover ${isComplete
                                            ? 'bg-green-900/20 border border-green-500/30'
                                            : parseInt(num) === nextChapter?.number
                                                ? 'bg-teal-900/20 border border-teal-500/40'
                                                : 'bg-slate-700/30 border border-transparent opacity-60'
                                            }`}>

                                            <div className="-my-2">
                                                <ChapterBadge
                                                    num={parseInt(num)}
                                                    isComplete={isComplete}
                                                    isLocked={!isComplete && parseInt(num) !== nextChapter?.number}
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className={`text-base font-bold ${isComplete ? 'text-white' : 'text-slate-300'}`}>
                                                    {title}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {isPremium ? 'Premium Mission' : 'Free Training'}
                                                </div>
                                            </div>

                                            {isComplete && (
                                                <span className="text-xs text-green-400 font-medium">Complete</span>
                                            )}
                                            {!isComplete && parseInt(num) === nextChapter?.number && (
                                                <span className="text-xs text-teal-400 font-bold animate-pulse">Next Up</span>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile bottom nav spacer */}
                    <div className="h-24 md:hidden" />

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Dashboard;
