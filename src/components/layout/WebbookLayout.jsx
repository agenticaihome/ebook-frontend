import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Zap, HelpCircle, Lock, ChevronDown, ChevronRight, Gamepad2, Unlock, CheckCircle, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PrefetchLink from './PrefetchLink';

import CaptainTips from '../CaptainTips';
import PreLaunchBanner from '../common/PreLaunchBanner';
import { useUser } from '../../context/UserContext';
import BadgeNotification from '../gamification/BadgeNotification';

const WebbookLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [newBadge, setNewBadge] = useState(null);
    const { userState, setUserState, unlockBadge } = useUser();
    const location = useLocation();

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [location]);

    // Handle Scroll Progress
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const totalScroll = document.documentElement.scrollTop;
                    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scroll = totalScroll / windowHeight;
                    setScrollProgress(Number(scroll));
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Progress Persistence Toast
    const [hasSaved, setHasSaved] = useState(false);

    useEffect(() => {
        setHasSaved(false);
    }, [location.pathname]);

    // Badge Definitions
    const badges = {
        '/part1': { id: 'free_complete', title: 'First Steps', description: 'You completed the free agents. Welcome to the AI life!' },
        '/part2': { id: 'premium_complete', title: 'Productivity Pro', description: 'Your daily agents are deployed. Time savings unlocked.' },
        '/part3': { id: 'advanced_complete', title: 'Agent Architect', description: 'You built your complete agent army. Welcome to the future.' }
    };

    useEffect(() => {
        if (scrollProgress > 0.95 && !hasSaved && location.pathname.includes('part')) {
            toast.success("Progress Saved", {
                icon: '💾',
                style: { background: '#0f172a', color: '#22d3ee', border: '1px solid #0891b2' }
            });
            setHasSaved(true);
            const currentChapterId = location.pathname;
            setUserState(prev => ({
                ...prev,
                progress: { ...prev.progress, [currentChapterId]: true }
            }));
            const badge = badges[location.pathname];
            if (badge) {
                const isNew = unlockBadge(badge.id);
                if (isNew) setNewBadge(badge);
            }
        }
    }, [scrollProgress, hasSaved, location.pathname, unlockBadge, setUserState]);

    // Mobile: Auto-close sidebar on route change
    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    }, [location]);

    // OPTIMIZED CHAPTER STRUCTURE - Benefit-focused with emojis
    const chapters = [
        {
            id: 'free',
            title: '🆓 Start Here',
            subtitle: 'Your first AI agent',
            path: '/part1/chapter1',
            icon: <BookOpen size={18} />,
            isFree: true,
            subChapters: [
                { title: '☀️ Morning Briefing', id: 'chapter1', path: '/part1/chapter1' }
            ]
        },
        {
            id: 'part1',
            title: 'Part 1: Foundation',
            subtitle: 'Automate daily routines',
            path: '/part1/chapter2',
            icon: <Zap size={18} />,
            locked: true,
            subChapters: [
                { title: '🍽️ Meal Planner', id: 'chapter2', path: '/part1/chapter2' },
                { title: '🎂 Never-Forget Dates', id: 'chapter3', path: '/part1/chapter3' }
            ]
        },
        {
            id: 'part2',
            title: 'Part 2: Daily Systems',
            subtitle: 'Email, money, health',
            path: '/part2/chapter4',
            icon: <Zap size={18} />,
            locked: true,
            subChapters: [
                { title: '📧 Inbox Zero', id: 'chapter4', path: '/part2/chapter4' },
                { title: '💰 Money Clarity', id: 'chapter5', path: '/part2/chapter5' },
                { title: '💪 Workout Planner', id: 'chapter6', path: '/part2/chapter6' }
            ]
        },
        {
            id: 'part3',
            title: 'Part 3: Deep Automation',
            subtitle: 'Build anything you need',
            path: '/part3/chapter7',
            icon: <Zap size={18} />,
            locked: true,
            subChapters: [
                { title: '📋 Task Prioritizer', id: 'chapter7', path: '/part3/chapter7' },
                { title: '🔧 Build-Your-Own', id: 'chapter8', path: '/part3/chapter8' },
                { title: '🤖 Agent Teamwork', id: 'chapter9', path: '/part3/chapter9' }
            ]
        },
        {
            id: 'part4',
            title: 'Part 4: Mastery',
            subtitle: 'Your complete system',
            path: '/part4/chapter10',
            icon: <Zap size={18} />,
            locked: true,
            subChapters: [
                { title: '👑 Your Agent Army', id: 'chapter10', path: '/part4/chapter10' }
            ]
        },
    ];

    // Accordion State
    const [expandedChapter, setExpandedChapter] = useState(() => localStorage.getItem('expanded_chapter') || 'free');

    useEffect(() => {
        if (expandedChapter) localStorage.setItem('expanded_chapter', expandedChapter);
    }, [expandedChapter]);

    useEffect(() => {
        const currentPath = location.pathname;
        const activeChapter = chapters.find(c => currentPath.startsWith(`/${c.id.replace('part', 'part')}`));
        if (activeChapter) setExpandedChapter(activeChapter.id);
    }, [location.pathname]);

    const toggleChapter = (e, chapterId) => {
        e.preventDefault();
        setExpandedChapter(prev => prev === chapterId ? null : chapterId);
    };

    // Calculate progress
    const completedChapters = Object.keys(userState?.progress || {}).length;
    const progressPercent = Math.round((completedChapters / 10) * 100);

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Skip Link for Accessibility */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-500 text-white px-4 py-2 rounded-lg z-50 font-bold shadow-lg">
                Skip to content
            </a>

            {/* Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-slate-900/50">
                <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30 transition-all duration-150 ease-out"
                    style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
                />
            </div>

            {/* Mobile Backdrop Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* ========== REDESIGNED SIDEBAR ========== */}
            <m.aside
                initial={{ x: -280, opacity: 0 }}
                animate={{
                    x: isSidebarOpen ? 0 : -280,
                    opacity: isSidebarOpen ? 1 : 0,
                    width: 280
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    opacity: { duration: 0.2 }
                }}
                className="fixed md:relative z-40 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl overflow-hidden flex flex-col"
                aria-label="Main Navigation"
            >
                {/* HEADER - Brand Logo */}
                <div className="p-4 border-b border-slate-700/50 bg-slate-900/80">
                    <Link to="/" className="flex items-center gap-3 font-bold" aria-label="Go to Home">
                        <img
                            src="/assets/logo-new.webp"
                            alt="Agentic AI Home"
                            width="36"
                            height="36"
                            className="w-9 h-9 rounded-lg shadow-lg"
                        />
                        <div>
                            <span className="text-white text-sm font-bold block">Agentic AI</span>
                            <span className="text-teal-400 text-xs">Home</span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden absolute top-3 right-3 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
                        aria-label="Close Menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Chapter Navigation">
                    {/* Progress Button - Full Width */}
                    <PrefetchLink
                        to="/dashboard"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-3 ${location.pathname === '/dashboard'
                            ? 'bg-teal-600 text-white shadow-md'
                            : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                            }`}
                    >
                        <BarChart3 size={18} />
                        <span className="font-bold">My Progress</span>
                        <span className="ml-auto text-sm bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded-lg font-bold">{progressPercent}%</span>
                    </PrefetchLink>

                    {/* Course Section Header */}
                    <div className="pt-2 pb-2 px-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">📚 The Course</span>
                    </div>

                    {/* CHAPTERS */}
                    {chapters.map((chapter, index) => {
                        const isExpanded = expandedChapter === chapter.id;
                        const isActive = location.pathname === chapter.path;
                        const isFreeSection = chapter.isFree;

                        return (
                            <div key={chapter.id} className="flex flex-col">
                                {/* Chapter Header */}
                                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all group ${isFreeSection
                                    ? 'bg-green-900/30 border border-green-500/30 hover:bg-green-900/40'
                                    : isActive
                                        ? 'bg-teal-600/90 text-white shadow-md'
                                        : 'text-slate-300 hover:bg-slate-800/70'
                                    }`}>
                                    <Link to={chapter.path} className="flex-1 flex items-center gap-3 focus:outline-none">
                                        <span className={`${isFreeSection ? 'text-green-400' : isActive ? 'text-teal-200' : 'text-slate-500'}`}>
                                            {chapter.locked ? <Lock size={16} /> : chapter.icon}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <span className={`font-medium text-sm block truncate ${isFreeSection ? 'text-green-400' : ''}`}>
                                                {chapter.title}
                                            </span>
                                            {chapter.subtitle && (
                                                <span className="text-[10px] text-slate-500 truncate block">{chapter.subtitle}</span>
                                            )}
                                        </div>
                                    </Link>
                                    <button
                                        onClick={(e) => toggleChapter(e, chapter.id)}
                                        className={`p-1 rounded hover:bg-white/10 transition-colors ${isFreeSection ? 'text-green-400' : isActive ? 'text-teal-200' : 'text-slate-500'}`}
                                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${chapter.title}`}
                                        aria-expanded={isExpanded}
                                    >
                                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                    </button>
                                </div>

                                {/* Sub-chapters */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                            <div className="pl-10 pr-3 py-2 space-y-1">
                                                {chapter.subChapters?.map((sub) => {
                                                    const isSubActive = location.pathname === sub.path;
                                                    const isCompleted = userState?.progress?.[sub.path];

                                                    return (
                                                        <Link
                                                            key={sub.id}
                                                            to={sub.path}
                                                            className={`flex items-center gap-2 text-xs py-2 px-2 transition-colors rounded-lg ${isSubActive
                                                                ? 'text-teal-400 font-semibold bg-teal-900/30'
                                                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                                                }`}
                                                        >
                                                            {isCompleted ? (
                                                                <CheckCircle size={12} className="text-green-400" />
                                                            ) : (
                                                                <div className={`w-1.5 h-1.5 rounded-full ${isSubActive ? 'bg-teal-400' : 'bg-slate-600'}`} />
                                                            )}
                                                            <span className="flex-1">{sub.title}</span>
                                                            {chapter.locked && <Lock size={10} className="text-slate-600" />}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </m.div>
                                    )}
                                </AnimatePresence>

                                {/* UNLOCK CTA - After Free Section */}
                                {isFreeSection && (
                                    <div className="mx-2 my-3">
                                        <Link
                                            to="/unlock"
                                            className="block bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/40 hover:border-amber-400/60 rounded-xl p-3 transition-all group"
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <Unlock size={16} className="text-amber-400" />
                                                <span className="text-amber-400 font-bold text-sm">Unlock 9 More Agents</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-400 text-xs">One-time purchase</span>
                                                <span className="text-white font-bold text-sm">$39.99 →</span>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* EXTRAS Section */}
                    <div className="pt-4 pb-2 px-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">✨ Extras</span>
                    </div>
                    <PrefetchLink
                        to="/games"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${location.pathname === '/games'
                            ? 'bg-purple-600/90 text-white shadow-md'
                            : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
                            }`}
                    >
                        <Gamepad2 size={16} className={location.pathname === '/games' ? 'text-purple-200' : 'text-purple-400'} />
                        <span className="font-medium text-sm">Practice Games</span>
                        <span className="ml-auto text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">5</span>
                    </PrefetchLink>
                </nav>

                {/* FOOTER - Help + Support */}
                <div className="border-t border-slate-700/50 p-3">
                    <PrefetchLink
                        to="/faq"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${location.pathname === '/faq' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:bg-slate-800/70 hover:text-white'}`}
                    >
                        <HelpCircle size={16} />
                        <span>FAQ & Support</span>
                    </PrefetchLink>
                </div>
            </m.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <PreLaunchBanner />
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-lg border-b border-slate-600/50 h-14 flex items-center px-4 justify-between transition-all duration-300">
                    <div className="flex items-center gap-3 overflow-hidden">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 flex-shrink-0"
                                aria-label="Open Sidebar"
                            >
                                <Menu size={22} />
                            </button>
                        )}

                        {/* Mobile Logo - Only visible when sidebar is closed on mobile */}
                        <div className="flex items-center gap-2 md:hidden">
                            <img
                                src="/assets/logo-new.webp"
                                alt="Agentic AI Home"
                                width="28"
                                height="28"
                                className="w-7 h-7 object-contain"
                            />
                        </div>

                        <h1 className="font-medium text-slate-300 truncate text-sm">
                            {chapters.flatMap(c => c.subChapters).find(s => s.path === location.pathname)?.title || ''}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {isLoggedIn ? (
                            <Link to="/dashboard" className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:from-teal-400 hover:to-cyan-400 transition-colors shadow-lg shadow-teal-900/30">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-teal-400 rounded-lg px-2 py-1">
                                    Login
                                </Link>
                                <Link to="/unlock" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:from-amber-400 hover:to-orange-400 transition-colors shadow-lg shadow-amber-900/30">
                                    Get Full Access
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-0.5 bg-slate-800 w-full" role="progressbar" aria-label="Reading progress" aria-valuenow={Math.round(scrollProgress * 100)} aria-valuemin="0" aria-valuemax="100">
                        <m.div className="h-full bg-gradient-to-r from-teal-500 to-cyan-500" style={{ width: `${scrollProgress * 100}%` }} />
                    </div>
                </header>

                {/* Page Content */}
                <main id="main-content" className="flex-1 overflow-x-hidden focus:outline-none" tabIndex="-1">
                    {children}
                </main>
            </div>

            {/* Floating Captain Helper */}
            <CaptainTips />

            {/* Gamification Badge Modal */}
            <BadgeNotification badge={newBadge} onClose={() => setNewBadge(null)} />
        </div>
    );
};

export default WebbookLayout;
