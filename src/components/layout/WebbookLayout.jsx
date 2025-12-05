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
    // ... existing state ...
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isCaptainOpen, setIsCaptainOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [newBadge, setNewBadge] = useState(null);
    const { userState, setUserState, unlockBadge } = useUser();
    const location = useLocation();

    // ... existing effects ...
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
        setHasSaved(false); // Reset on route change
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
            // 1. Save Progress Toast
            toast.success("Progress Saved", {
                icon: '💾',
                style: {
                    background: '#0f172a',
                    color: '#22d3ee',
                    border: '1px solid #0891b2'
                }
            });
            setHasSaved(true);

            // 1.5 Update User Progress
            const currentChapterId = location.pathname;
            setUserState(prev => ({
                ...prev,
                progress: { ...prev.progress, [currentChapterId]: true }
            }));

            // 2. Check for Badge Unlock
            const badge = badges[location.pathname];
            if (badge) {
                const isNew = unlockBadge(badge.id);
                if (isNew) {
                    setNewBadge(badge);
                }
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
            id: 'part1', title: 'Part 1: Diagnosis', path: '/part1/chapter1', icon: <BookOpen size={18} />, progress: 0,
            subChapters: [
                { title: 'Op 1: Wake-Up Call', id: 'chapter1', path: '/part1/chapter1' },
                { title: 'Op 2: Basic Training', id: 'chapter2', path: '/part1/chapter2' },
                { title: 'Op 3: Privacy & Security', id: 'chapter3', path: '/part1/chapter3' }
            ]
        },
        {
            id: 'part2', title: 'Part 2: Getting Started', path: '/part2/chapter1', icon: <Zap size={18} />, progress: 0, locked: true,
            subChapters: [
                { title: 'Op 4: Morning Routines', id: 'chapter1', path: '/part2/chapter1' },
                { title: 'Op 5: Kitchen & Grocery', id: 'chapter2', path: '/part2/chapter2' },
                { title: 'Op 6: Household Management', id: 'chapter3', path: '/part2/chapter3' }
            ]
        },
        {
            id: 'part3', title: 'Part 3: Work & Productivity', path: '/part3/chapter1', icon: <Shield size={18} />, progress: 0, locked: true,
            subChapters: [
                { title: 'Op 7: Deep Work', id: 'chapter1', path: '/part3/chapter1' },
                { title: 'Op 8: Email Triage', id: 'chapter2', path: '/part3/chapter2' },
                { title: 'Op 9: Meeting Intelligence', id: 'chapter3', path: '/part3/chapter3' }
            ]
        },
        {
            id: 'part4', title: 'Part 4: Health & Wellness', path: '/part4/chapter1', icon: <BookOpen size={18} />, progress: 0, locked: true,
            subChapters: [
                { title: 'Op 10: Sleep Optimization', id: 'chapter1', path: '/part4/chapter1' },
                { title: 'Op 11: Nutrition Systems', id: 'chapter2', path: '/part4/chapter2' },
                { title: 'Op 12: Fitness Tracking', id: 'chapter3', path: '/part4/chapter3' }
            ]
        },
        {
            id: 'part5', title: 'Part 5: Advanced Systems', path: '/part5/chapter1', icon: <Zap size={18} />, progress: 0, locked: true,
            subChapters: [
                { title: 'Op 13: Advanced Automation', id: 'chapter1', path: '/part5/chapter1' },
                { title: 'Op 14: Family Dashboard', id: 'chapter2', path: '/part5/chapter2' },
                { title: 'Op 15: Legacy & Ethics', id: 'chapter3', path: '/part5/chapter3' }
            ]
        },
    ];

    // Accordion State
    const [expandedChapter, setExpandedChapter] = useState(() => localStorage.getItem('expanded_chapter') || null);

    useEffect(() => {
        if (expandedChapter) {
            localStorage.setItem('expanded_chapter', expandedChapter);
        }
    }, [expandedChapter]);

    useEffect(() => {
        // Auto-expand active chapter based on current path
        const currentPath = location.pathname;
        const activeChapter = chapters.find(c =>
            currentPath.startsWith(`/${c.id.replace('part', 'part')}`)
        );
        if (activeChapter) {
            setExpandedChapter(activeChapter.id);
        }
    }, [location.pathname]);

    const toggleChapter = (e, chapterId) => {
        e.preventDefault(); // Prevent navigation if clicking the toggle area
        setExpandedChapter(prev => prev === chapterId ? null : chapterId);
    };

    // Dynamic Captain Messages based on route
    const getCaptainMessages = (path) => {
        switch (path) {
            case '/part1':
                return {
                    sidebar: "Privacy isn't about hiding. It's about control. Let's secure your perimeter.",
                    tip: "Start with 'Observer Mode'. Let the AI watch your workflow for a week before you let it take action."
                };
            case '/part2':
                return {
                    sidebar: "A chaotic home drains your mental battery. Let's automate the mundane.",
                    tip: "The 'Grocery Agent' alone can save you ~2 hours a week. That's 100+ hours a year!"
                };
            case '/part3':
                return {
                    sidebar: "Deep work requires deep focus. Delegate the shallow work to your digital staff.",
                    tip: "Email triage is the #1 time-saver for most professionals. Train your agent to draft responses."
                };
            case '/part4':
                return {
                    sidebar: "Your health is your wealth. Don't let admin tasks get in the way of self-care.",
                    tip: "Use an agent to cross-reference your sleep data with your calendar. You'll see patterns instantly."
                };
            case '/part5':
                return {
                    sidebar: "You are now the Architect of your own time. Build wisely.",
                    tip: "Review your agent logs weekly. It's like a staff meeting, but much shorter."
                };
            case '/payment-guide':
                return {
                    sidebar: "Investing in yourself is the best ROI there is.",
                    tip: "Ergo payments are secure and give you a 50% discount. It's a no-brainer."
                };
            case '/games':
                return {
                    sidebar: "Welcome to the Training Center. Sharpen your agentic skills here.",
                    tip: "Gamification helps reinforce the concepts. Try the 'Inbox Defense' to practice rapid triage."
                };
            default:
                return {
                    sidebar: "I'm here to help you navigate the agentic future!",
                    tip: "Did you know? You can automate your grocery list using a simple text-based agent. Check out Chapter 2!"
                };
        }
    };

    const captainMessages = getCaptainMessages(location.pathname);

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Skip Link for Accessibility */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 font-bold shadow-lg">
                Skip to content
            </a>

            {/* Sidebar Navigation */}
            <m.aside
                initial={{ width: 280 }}
                animate={{ width: isSidebarOpen ? 280 : 0 }}
                className={`fixed md:relative z-40 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-600/50 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out`}
                aria-label="Main Navigation"
            >
                <div className="p-6 border-b border-slate-600 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 font-bold text-cyan-400" aria-label="Go to Home">
                        <Shield size={24} />
                        <span>Agentic AI Home</span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-slate-400 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
                        aria-label="Close Sidebar"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-2" aria-label="Chapter Navigation">
                    <PrefetchLink
                        to="/"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 ${location.pathname === '/' ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-500/30' : 'text-slate-300 hover:bg-slate-800'
                            }`}
                    >
                        <Home size={18} />
                        <span className="font-medium">Home</span>
                    </PrefetchLink>

                    <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center">
                        <span>Table of Contents</span>
                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                            {Math.round((Object.keys(userState?.progress || {}).length / 15) * 100)}% Done
                        </span>
                    </div>

                    {chapters.map((chapter) => {
                        const isExpanded = expandedChapter === chapter.id;
                        const isActive = location.pathname === chapter.path;

                        return (
                            <div key={chapter.id} className="flex flex-col">
                                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all group focus-within:ring-2 focus-within:ring-cyan-400 ${isActive
                                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30 border border-cyan-500/50'
                                    : 'text-slate-300 hover:bg-slate-800'
                                    }`}>
                                    <Link
                                        to={chapter.path}
                                        className="flex-1 flex items-center gap-3 focus:outline-none"
                                    >
                                        <span className={isActive ? 'text-cyan-200' : 'text-slate-400 group-hover:text-cyan-400'}>
                                            {chapter.icon}
                                        </span>
                                        <div className="flex-1">
                                            <span className="font-medium text-sm block">{chapter.title}</span>
                                            <div className="w-full bg-slate-700/30 h-1 rounded-full mt-1 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${isActive ? 'bg-cyan-300' : 'bg-cyan-500'}`}
                                                    style={{ width: `${chapter.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </Link>

                                    <button
                                        onClick={(e) => toggleChapter(e, chapter.id)}
                                        className={`p-1 rounded hover:bg-white/10 transition-colors ${isActive ? 'text-cyan-200' : 'text-slate-400'}`}
                                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${chapter.title}`}
                                        aria-expanded={isExpanded}
                                    >
                                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <m.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-12 pr-4 py-2 space-y-2 border-l border-slate-800 ml-6">
                                                {chapter.subChapters?.map((sub) => (
                                                    <Link
                                                        key={sub.id}
                                                        to={sub.path}
                                                        className={`flex items-center gap-2 text-xs py-1 transition-colors rounded px-2 ${location.pathname === sub.path
                                                            ? 'text-cyan-400 font-semibold bg-cyan-900/20'
                                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                                            }`}
                                                    >
                                                        <div className={`w-1.5 h-1.5 rounded-full ${location.pathname === sub.path ? 'bg-cyan-400' : 'bg-slate-700'
                                                            }`} />
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

                    <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Quick Jumps
                    </div>
                    <div className="grid grid-cols-2 gap-2 px-2">
                        <PrefetchLink to="/part1/chapter1" className="p-2 bg-slate-800 hover:bg-cyan-900/30 rounded-lg text-xs font-medium text-slate-300 text-center border border-slate-600 hover:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                            Foundations
                        </PrefetchLink>
                        <PrefetchLink to="/part5/chapter1" className="p-2 bg-slate-800 hover:bg-cyan-900/30 rounded-lg text-xs font-medium text-slate-300 text-center border border-slate-600 hover:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                            Life OS
                        </PrefetchLink>
                        <PrefetchLink to="/part2/chapter1" className="p-2 bg-slate-800 hover:bg-cyan-900/30 rounded-lg text-xs font-medium text-slate-300 text-center border border-slate-600 hover:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                            Daily Ops
                        </PrefetchLink>
                        <PrefetchLink to="/part4/chapter1" className="p-2 bg-slate-800 hover:bg-cyan-900/30 rounded-lg text-xs font-medium text-slate-300 text-center border border-slate-600 hover:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                            Health
                        </PrefetchLink>
                    </div>
                </nav>

                <div className="px-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-4">
                    Support & Help
                </div>
                <nav className="px-4 space-y-2 mb-4" aria-label="Support Navigation">
                    <PrefetchLink
                        to="/payment-guide"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-cyan-400 ${location.pathname === '/payment-guide'
                            ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                            : 'text-slate-300 hover:bg-slate-800'
                            }`}
                    >
                        <span className={location.pathname === '/payment-guide' ? 'text-cyan-200' : 'text-slate-400 group-hover:text-cyan-400'}>
                            <Shield size={18} />
                        </span>
                        <span className="font-medium text-sm">Payment Guide</span>
                    </PrefetchLink>
                    <PrefetchLink
                        to="/why-ergo"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-cyan-400 ${location.pathname === '/why-ergo'
                            ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                            : 'text-slate-300 hover:bg-slate-800'
                            }`}
                    >
                        <span className={location.pathname === '/why-ergo' ? 'text-cyan-200' : 'text-slate-400 group-hover:text-cyan-400'}>
                            <img src="/assets/ergo-logo.png" alt="Ergo" className="w-5 h-5 object-contain invert opacity-70 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <span className="font-medium text-sm">Why Ergo?</span>
                    </PrefetchLink>

                    <PrefetchLink
                        to="/games"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-cyan-400 ${location.pathname === '/games'
                            ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                            : 'text-slate-300 hover:bg-slate-800'
                            }`}
                    >
                        <span className={location.pathname === '/games' ? 'text-cyan-200' : 'text-slate-400 group-hover:text-cyan-400'}>
                            <Gamepad2 size={18} />
                        </span>
                        <span className="font-medium text-sm">Games Hub</span>
                    </PrefetchLink>

                    <PrefetchLink
                        to="/deck"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-cyan-400 ${location.pathname === '/deck'
                            ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                            : 'text-slate-300 hover:bg-slate-800'
                            }`}
                    >
                        <span className={location.pathname === '/deck' ? 'text-cyan-200' : 'text-slate-400 group-hover:text-cyan-400'}>
                            <div className="w-[18px] h-[18px] border-2 border-current rounded-sm flex items-center justify-center text-[10px] font-bold">A</div>
                        </span>
                        <span className="font-medium text-sm">Agent Deck</span>
                    </PrefetchLink>

                    <PrefetchLink
                        to="/faq"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-cyan-400 ${location.pathname === '/faq'
                            ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                            : 'text-slate-300 hover:bg-slate-800'
                            }`}
                    >
                        <span className={location.pathname === '/faq' ? 'text-cyan-200' : 'text-slate-400 group-hover:text-cyan-400'}>
                            <HelpCircle size={18} />
                        </span>
                        <span className="font-medium text-sm">FAQ & Support</span>
                    </PrefetchLink>
                </nav>

                <div className="p-4 border-t border-slate-600">
                    <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 p-4 rounded-xl border border-cyan-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                CE
                            </div>
                            <div>
                                <p className="text-xs font-bold text-cyan-400">Captain Efficiency</p>
                                <p className="text-[10px] text-cyan-300/70">AI Assistant Active</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
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
                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                aria-label="Open Sidebar"
                            >
                                <Menu size={24} />
                            </button>
                        )}
                        <h1 className="font-semibold text-slate-200 truncate">
                            {chapters.find(c => c.path === location.pathname)?.title || ''}
                        </h1>
                    </div>


                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <Link to="/dashboard" className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-900/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg px-2 py-1">
                                    Login
                                </Link>
                                <Link to="/payment-guide" className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-900/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900">
                                    Get the System
                                </Link>
                            </>
                        )}
                    </div>


                    {/* Progress Bar */}
                    <div
                        className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full"
                        role="progressbar"
                        aria-label="Reading progress"
                        aria-valuenow={Math.round(scrollProgress * 100)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <m.div
                            className="h-full bg-cyan-500"
                            style={{ width: `${scrollProgress * 100}%` }}
                        />
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
