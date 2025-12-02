import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Shield, Zap, Home, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PrefetchLink from './PrefetchLink';

import CaptainTips from '../CaptainTips';
import PreLaunchBanner from '../common/PreLaunchBanner';

const WebbookLayout = ({ children }) => {
    // ... existing state ...
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isCaptainOpen, setIsCaptainOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    // ... existing effects ...
    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [location]);

    // Handle Scroll Progress
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mobile: Auto-close sidebar on route change
    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    }, [location]);

    const chapters = [
        { id: 'part1', title: 'Part 1: Diagnosis', path: '/part1', icon: <BookOpen size={18} />, progress: 100 },
        { id: 'part2', title: 'Part 2: Getting Started', path: '/part2', icon: <Zap size={18} />, progress: 35 },
        { id: 'part3', title: 'Part 3: Work & Productivity', path: '/part3', icon: <Shield size={18} />, progress: 0 },
        { id: 'part4', title: 'Part 4: Health & Wellness', path: '/part4', icon: <BookOpen size={18} />, progress: 0 },
        { id: 'part5', title: 'Part 5: Advanced Systems', path: '/part5', icon: <Zap size={18} />, progress: 0 },
    ];

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
            <motion.aside
                initial={{ width: 280 }}
                animate={{ width: isSidebarOpen ? 280 : 0 }}
                className={`fixed md:relative z-40 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out`}
                aria-label="Main Navigation"
            >
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
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
                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">27% Done</span>
                    </div>

                    {chapters.map((chapter) => (
                        <PrefetchLink
                            key={chapter.id}
                            to={chapter.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-cyan-400 ${location.pathname === chapter.path
                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30 border border-cyan-500/50'
                                : 'text-slate-300 hover:bg-slate-800'
                                }`}
                            aria-current={location.pathname === chapter.path ? 'page' : undefined}
                        >
                            <span className={location.pathname === chapter.path ? 'text-cyan-200' : 'text-slate-500 group-hover:text-cyan-400'}>
                                {chapter.icon}
                            </span>
                            <div className="flex-1">
                                <span className="font-medium text-sm block">{chapter.title}</span>
                                <div className="w-full bg-slate-700/30 h-1 rounded-full mt-1 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${location.pathname === chapter.path ? 'bg-cyan-300' : 'bg-cyan-500'}`}
                                        style={{ width: `${chapter.progress}%` }}
                                    />
                                </div>
                            </div>
                            <span className={`text-xs font-mono ml-2 ${location.pathname === chapter.path ? 'text-cyan-200' : 'text-slate-500'}`}>
                                {chapter.progress}%
                            </span>
                        </PrefetchLink>
                    ))}

                    <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Quick Jumps
                    </div>
                    <div className="grid grid-cols-2 gap-2 px-2">
                        <PrefetchLink to="/part1" className="p-2 bg-slate-800 hover:bg-cyan-900/30 rounded-lg text-xs font-medium text-slate-300 text-center border border-slate-700 hover:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                            Foundations
                        </PrefetchLink>
                        <PrefetchLink to="/part5" className="p-2 bg-slate-800 hover:bg-cyan-900/30 rounded-lg text-xs font-medium text-slate-300 text-center border border-slate-700 hover:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                            Life OS
                        </PrefetchLink>
                        <PrefetchLink to="/part2" className="p-2 bg-slate-800 hover:bg-cyan-900/30 rounded-lg text-xs font-medium text-slate-300 text-center border border-slate-700 hover:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                            Daily Ops
                        </PrefetchLink>
                        <PrefetchLink to="/part4" className="p-2 bg-slate-800 hover:bg-cyan-900/30 rounded-lg text-xs font-medium text-slate-300 text-center border border-slate-700 hover:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400">
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
                        <span className={location.pathname === '/payment-guide' ? 'text-cyan-200' : 'text-slate-500 group-hover:text-cyan-400'}>
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
                        <span className={location.pathname === '/why-ergo' ? 'text-cyan-200' : 'text-slate-500 group-hover:text-cyan-400'}>
                            <img src="/assets/ergo-logo.png" alt="Ergo" className="w-5 h-5 object-contain invert opacity-70 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <span className="font-medium text-sm">Why Ergo?</span>
                    </PrefetchLink>
                    <PrefetchLink
                        to="/faq"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-cyan-400 ${location.pathname === '/faq'
                            ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                            : 'text-slate-300 hover:bg-slate-800'
                            }`}
                    >
                        <span className={location.pathname === '/faq' ? 'text-cyan-200' : 'text-slate-500 group-hover:text-cyan-400'}>
                            <HelpCircle size={18} />
                        </span>
                        <span className="font-medium text-sm">FAQ & Support</span>
                    </PrefetchLink>
                </nav>

                <div className="p-4 border-t border-slate-700">
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
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <PreLaunchBanner />
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 h-16 flex items-center px-4 justify-between transition-all duration-300">
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
                    <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full">
                        <motion.div
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
        </div>
    );
};

export default WebbookLayout;
