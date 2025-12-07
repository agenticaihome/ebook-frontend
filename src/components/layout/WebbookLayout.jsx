import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Shield, Zap, Home, HelpCircle, Lock, ChevronDown, ChevronRight, Gamepad2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PrefetchLink from './PrefetchLink';

import CaptainTips from '../CaptainTips';
import PreLaunchBanner from '../common/PreLaunchBanner';
import { useUser } from '../../context/UserContext';
import BadgeNotification from '../gamification/BadgeNotification';

const WebbookLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isCaptainOpen, setIsCaptainOpen] = useState(false);
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
        '/part1': { id: 'part1_complete', title: 'Privacy Architect', description: 'You have secured your digital perimeter. The foundation is laid.' },
        '/part2': { id: 'part2_complete', title: 'Automation Rookie', description: 'Your first agents are deployed. The morning chaos is tamed.' },
        '/part3': { id: 'part3_complete', title: 'Deep Work Defender', description: 'You have reclaimed your focus from the distraction economy.' },
        '/part4': { id: 'part4_complete', title: 'Bio-Hacker', description: 'Health and productivity are now synced. You are optimizing the machine.' },
        '/part5': { id: 'part5_complete', title: 'System Architect', description: 'You have built a fully autonomous life system. Welcome to the future.' }
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

    const chapters = [
        {
            id: 'part1', title: 'Part 1: Foundations', path: '/part1/chapter1', icon: <BookOpen size={18} />, progress: 0,
            subChapters: [
                { title: '1: Wake-Up Call', id: 'chapter1', path: '/part1/chapter1' },
                { title: '2: Your AI Toolkit', id: 'chapter2', path: '/part1/chapter2' },
                { title: '3: Privacy & Control', id: 'chapter3', path: '/part1/chapter3' }
            ]
        },
        {
            id: 'part2', title: 'Part 2: Daily Life', path: '/part2/chapter1', icon: <Zap size={18} />, progress: 0, locked: true,
            subChapters: [
                { title: '4: Morning Routines', id: 'chapter1', path: '/part2/chapter1' },
                { title: '5: Kitchen & Grocery', id: 'chapter2', path: '/part2/chapter2' },
                { title: '6: Household Management', id: 'chapter3', path: '/part2/chapter3' }
            ]
        },
        {
            id: 'part3', title: 'Part 3: Work & Focus', path: '/part3/chapter1', icon: <Shield size={18} />, progress: 0, locked: true,
            subChapters: [
                { title: '7: Deep Work', id: 'chapter1', path: '/part3/chapter1' },
                { title: '8: Email Triage', id: 'chapter2', path: '/part3/chapter2' },
                { title: '9: Meeting Intelligence', id: 'chapter3', path: '/part3/chapter3' }
            ]
        },
        {
            id: 'part4', title: 'Part 4: Health & Wellness', path: '/part4/chapter1', icon: <BookOpen size={18} />, progress: 0, locked: true,
            subChapters: [
                { title: '10: Sleep Optimization', id: 'chapter1', path: '/part4/chapter1' },
                { title: '11: Nutrition Systems', id: 'chapter2', path: '/part4/chapter2' },
                { title: '12: Fitness Tracking', id: 'chapter3', path: '/part4/chapter3' }
            ]
        },
        {
            id: 'part5', title: 'Part 5: Advanced Systems', path: '/part5/chapter1', icon: <Zap size={18} />, progress: 0, locked: true,
            subChapters: [
                { title: '13: Advanced Automation', id: 'chapter1', path: '/part5/chapter1' },
                { title: '14: Family Dashboard', id: 'chapter2', path: '/part5/chapter2' },
                { title: '15: Your Life System', id: 'chapter3', path: '/part5/chapter3' }
            ]
        },
    ];

    // Accordion State
    const [expandedChapter, setExpandedChapter] = useState(() => localStorage.getItem('expanded_chapter') || null);

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

    // Dynamic Captain Messages based on route
    const getCaptainMessages = (path) => {
        switch (path) {
            case '/part1': return { sidebar: "Privacy isn't about hiding. It's about control. Let's secure your perimeter.", tip: "Start with 'Observer Mode'. Let the AI watch your workflow for a week before you let it take action." };
            case '/part2': return { sidebar: "A chaotic home drains your mental battery. Let's automate the mundane.", tip: "The 'Grocery Agent' alone can save you ~2 hours a week. That's 100+ hours a year!" };
            case '/part3': return { sidebar: "Deep work requires deep focus. Delegate the shallow work to your digital staff.", tip: "Email triage is the #1 time-saver for most professionals. Train your agent to draft responses." };
            case '/part4': return { sidebar: "Your health is your wealth. Don't let admin tasks get in the way of self-care.", tip: "Use an agent to cross-reference your sleep data with your calendar. You'll see patterns instantly." };
            case '/part5': return { sidebar: "You are now the Architect of your own time. Build wisely.", tip: "Review your agent logs weekly. It's like a staff meeting, but much shorter." };
            case '/payment-guide': return { sidebar: "Investing in yourself is the best ROI there is.", tip: "Ergo payments are secure and give you a 50% discount. It's a no-brainer." };
            case '/games': return { sidebar: "Welcome to the fun zone! Sharpen your AI skills here.", tip: "Gamification helps reinforce the concepts. Try 'Inbox Defense' to practice rapid triage." };
            default: return { sidebar: "I'm here to help you on your AI adventure!", tip: "Did you know? You can automate your grocery list using a simple text-based agent. Check out Chapter 5!" };
        }
    };

    const captainMessages = getCaptainMessages(location.pathname);

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

            {/* Sidebar Navigation */}
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
                className="fixed md:relative z-40 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-amber-500/20 shadow-2xl overflow-hidden flex flex-col"
                aria-label="Main Navigation"
            >
                {/* HEADER - Brand Logo */}
                <div className="p-5 border-b border-amber-500/20 bg-gradient-to-r from-slate-900 to-slate-900/80">
                    <Link to="/" className="flex items-center gap-3 font-bold" aria-label="Go to Home">
                        <img
                            src="/assets/logo-new.webp"
                            alt="Agentic AI Home"
                            width="40"
                            height="40"
                            className="w-10 h-10 rounded-lg shadow-lg shadow-amber-500/20"
                        />
                        <div>
                            <span className="text-white text-sm font-bold block">Agentic AI</span>
                            <span className="text-amber-400 text-xs">Home</span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
                        aria-label="Close Menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Chapter Navigation">
                    {/* Home Link */}
                    <PrefetchLink
                        to="/"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === '/'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                            }`}
                    >
                        <Home size={18} />
                        <span className="font-medium">Home</span>
                    </PrefetchLink>

                    {/* Dashboard Link - Prominent */}
                    <PrefetchLink
                        to="/dashboard"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === '/dashboard'
                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20'
                            : 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 border border-amber-500/20 hover:border-amber-500/40'
                            }`}
                    >
                        <Zap size={18} />
                        <span className="font-bold">My Dashboard</span>
                    </PrefetchLink>

                    {/* Table of Contents Header */}
                    <div className="pt-4 pb-2 px-3 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">📖 Discoveries</span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-medium">
                            {Math.round((Object.keys(userState?.progress || {}).length / 15) * 100)}%
                        </span>
                    </div>

                    {chapters.map((chapter) => {
                        const isExpanded = expandedChapter === chapter.id;
                        const isActive = location.pathname === chapter.path;

                        return (
                            <div key={chapter.id} className="flex flex-col">
                                <div className={`flex items-center gap-2 px-3 py-3 rounded-xl transition-all group ${isActive
                                    ? 'bg-teal-600/90 text-white shadow-lg shadow-teal-900/30'
                                    : 'text-slate-300 hover:bg-slate-800/70'
                                    }`}>
                                    <Link to={chapter.path} className="flex-1 flex items-center gap-3 focus:outline-none">
                                        <span className={isActive ? 'text-teal-200' : 'text-slate-400 group-hover:text-teal-400'}>{chapter.icon}</span>
                                        <div className="flex-1">
                                            <span className="font-medium text-sm block">{chapter.title}</span>
                                            <div className="w-full bg-slate-700/30 h-1 rounded-full mt-1 overflow-hidden">
                                                <div className={`h-full rounded-full ${isActive ? 'bg-teal-300' : 'bg-teal-500'}`} style={{ width: `${chapter.progress}%` }} />
                                            </div>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={(e) => toggleChapter(e, chapter.id)}
                                        className={`p-1 rounded hover:bg-white/10 transition-colors ${isActive ? 'text-teal-200' : 'text-slate-400'}`}
                                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${chapter.title}`}
                                        aria-expanded={isExpanded}
                                    >
                                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                            <div className="pl-12 pr-4 py-2 space-y-2 border-l border-slate-700 ml-6">
                                                {chapter.subChapters?.map((sub) => (
                                                    <Link
                                                        key={sub.id}
                                                        to={sub.path}
                                                        className={`flex items-center gap-2 text-xs py-1.5 transition-colors rounded px-2 ${location.pathname === sub.path
                                                            ? 'text-teal-400 font-semibold bg-teal-900/20'
                                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                                            }`}
                                                    >
                                                        <div className={`w-1.5 h-1.5 rounded-full ${location.pathname === sub.path ? 'bg-teal-400' : 'bg-slate-700'}`} />
                                                        <span>{sub.title}</span>
                                                        {chapter.locked && <Lock size={10} className="ml-auto text-slate-600" />}
                                                    </Link>
                                                ))}
                                            </div>
                                        </m.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}

                    {/* EXTRAS Section - Fun stuff first! */}
                    <div className="pt-4 pb-2 px-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">✨ Extras</span>
                    </div>
                    <div className="space-y-1">
                        <PrefetchLink
                            to="/games"
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${location.pathname === '/games'
                                ? 'bg-purple-600/90 text-white shadow-lg shadow-purple-900/30'
                                : 'text-slate-300 hover:bg-slate-800/70'
                                }`}
                        >
                            <Gamepad2 size={18} className={location.pathname === '/games' ? 'text-purple-200' : 'text-purple-400'} />
                            <span className="font-medium text-sm">Games Hub</span>
                            <span className="ml-auto text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">Fun!</span>
                        </PrefetchLink>

                        <PrefetchLink
                            to="/deck"
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${location.pathname === '/deck'
                                ? 'bg-teal-600/90 text-white shadow-lg shadow-teal-900/30'
                                : 'text-slate-300 hover:bg-slate-800/70'
                                }`}
                        >
                            <span className="text-teal-400">🎴</span>
                            <span className="font-medium text-sm">AI Helper Deck</span>
                        </PrefetchLink>
                    </div>
                </nav>

                {/* HELP Section - At bottom, compact */}
                <div className="border-t border-slate-700/50 px-3 py-3 space-y-1">
                    <div className="px-2 pb-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">🆘 Help</span>
                    </div>
                    <PrefetchLink
                        to="/faq"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${location.pathname === '/faq' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`}
                    >
                        <HelpCircle size={16} />
                        <span>FAQ & Support</span>
                    </PrefetchLink>
                    <PrefetchLink
                        to="/payment-guide"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${location.pathname === '/payment-guide' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`}
                    >
                        <Shield size={16} />
                        <span>Payment Guide</span>
                    </PrefetchLink>
                    <PrefetchLink
                        to="/why-ergo"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${location.pathname === '/why-ergo' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`}
                    >
                        <img src="/assets/ergo-logo.png" alt="Ergo" className="w-4 h-4 object-contain invert opacity-60" />
                        <span>Why Ergo?</span>
                    </PrefetchLink>
                </div>

                {/* Captain Section - Warm amber styling */}
                <div className="p-3 border-t border-amber-500/20 bg-gradient-to-r from-amber-900/10 to-transparent">
                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-3 rounded-xl border border-amber-500/20">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                🧑‍✈️
                            </div>
                            <div>
                                <p className="text-xs font-bold text-amber-400">Captain E</p>
                                <p className="text-[9px] text-slate-400">Your Guide</p>
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed italic">
                            "{captainMessages.sidebar}"
                        </p>
                    </div>
                </div>
            </m.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <PreLaunchBanner />
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-lg border-b border-slate-600/50 h-16 flex items-center px-4 justify-between transition-all duration-300">
                    <div className="flex items-center gap-3 overflow-hidden">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 flex-shrink-0"
                                aria-label="Open Sidebar"
                            >
                                <Menu size={24} />
                            </button>
                        )}

                        {/* Mobile Logo - Only visible when sidebar is closed on mobile */}
                        <div className="flex items-center gap-2 md:hidden">
                            <img
                                src="/assets/logo-new.webp"
                                alt="Agentic AI Home"
                                width="32"
                                height="32"
                                className="w-8 h-8 object-contain"
                            />
                        </div>

                        <h1 className="font-semibold text-slate-200 truncate text-sm md:text-base">
                            {chapters.find(c => c.path === location.pathname)?.title || ''}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <Link to="/dashboard" className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:from-amber-400 hover:to-orange-500 transition-colors shadow-lg shadow-amber-900/30">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-amber-400 rounded-lg px-2 py-1">
                                    Login
                                </Link>
                                <Link to="/payment-guide" className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:from-amber-400 hover:to-orange-500 transition-colors shadow-lg shadow-amber-900/30">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full" role="progressbar" aria-label="Reading progress" aria-valuenow={Math.round(scrollProgress * 100)} aria-valuemin="0" aria-valuemax="100">
                        <m.div className="h-full bg-gradient-to-r from-amber-500 to-teal-500" style={{ width: `${scrollProgress * 100}%` }} />
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
