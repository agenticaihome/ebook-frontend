import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, BookOpen, Shield, Zap, Home, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const WebbookLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isCaptainOpen, setIsCaptainOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation();

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

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Skip Link for Accessibility */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 font-bold shadow-lg">
                Skip to content
            </a>

            {/* Sidebar Navigation */}
            <motion.aside
                initial={{ width: 280 }}
                animate={{ width: isSidebarOpen ? 280 : 0 }}
                className={`fixed md:relative z-40 h-screen bg-white border-r border-slate-200 shadow-xl overflow-hidden flex flex-col`}
                aria-label="Main Navigation"
            >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 font-bold text-blue-600" aria-label="Go to Home">
                        <Shield size={24} />
                        <span>Agentic AI</span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1"
                        aria-label="Close Sidebar"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-2" aria-label="Chapter Navigation">
                    <Link
                        to="/"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <Home size={18} />
                        <span className="font-medium">Home</span>
                    </Link>

                    <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center">
                        <span>Table of Contents</span>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">27% Done</span>
                    </div>

                    {chapters.map((chapter) => (
                        <Link
                            key={chapter.id}
                            to={chapter.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-blue-400 ${location.pathname === chapter.path
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            aria-current={location.pathname === chapter.path ? 'page' : undefined}
                        >
                            <span className={location.pathname === chapter.path ? 'text-blue-200' : 'text-slate-400 group-hover:text-blue-500'}>
                                {chapter.icon}
                            </span>
                            <div className="flex-1">
                                <span className="font-medium text-sm block">{chapter.title}</span>
                                <div className="w-full bg-slate-200/30 h-1 rounded-full mt-1 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${location.pathname === chapter.path ? 'bg-blue-300' : 'bg-blue-500'}`}
                                        style={{ width: `${chapter.progress}%` }}
                                    />
                                </div>
                            </div>
                            <span className={`text-xs font-mono ml-2 ${location.pathname === chapter.path ? 'text-blue-200' : 'text-slate-400'}`}>
                                {chapter.progress}%
                            </span>
                        </Link>
                    ))}

                    <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Quick Jumps
                    </div>
                    <div className="grid grid-cols-2 gap-2 px-2">
                        <Link to="/part1" className="p-2 bg-slate-50 hover:bg-blue-50 rounded-lg text-xs font-medium text-slate-600 text-center border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Foundations
                        </Link>
                        <Link to="/part5" className="p-2 bg-slate-50 hover:bg-blue-50 rounded-lg text-xs font-medium text-slate-600 text-center border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Life OS
                        </Link>
                        <Link to="/part2" className="p-2 bg-slate-50 hover:bg-blue-50 rounded-lg text-xs font-medium text-slate-600 text-center border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Daily Ops
                        </Link>
                        <Link to="/part4" className="p-2 bg-slate-50 hover:bg-blue-50 rounded-lg text-xs font-medium text-slate-600 text-center border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Health
                        </Link>
                    </div>
                </nav>

                <div className="px-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-4">
                    Support & Help
                </div>
                <nav className="px-4 space-y-2 mb-4" aria-label="Support Navigation">
                    <Link
                        to="/why-ergo"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-green-400 ${location.pathname === '/why-ergo'
                            ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <span className={location.pathname === '/why-ergo' ? 'text-green-200' : 'text-slate-400 group-hover:text-green-500'}>
                            <Zap size={18} />
                        </span>
                        <span className="font-medium text-sm">Why Ergo?</span>
                    </Link>
                    <Link
                        to="/how-to-pay"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-green-400 ${location.pathname === '/how-to-pay'
                            ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <span className={location.pathname === '/how-to-pay' ? 'text-green-200' : 'text-slate-400 group-hover:text-green-500'}>
                            <Shield size={18} />
                        </span>
                        <span className="font-medium text-sm">How to Pay Guide</span>
                    </Link>
                    <Link
                        to="/how-to-buy-ergo"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-green-400 ${location.pathname === '/how-to-buy-ergo'
                            ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <span className={location.pathname === '/how-to-buy-ergo' ? 'text-green-200' : 'text-slate-400 group-hover:text-green-500'}>
                            <BookOpen size={18} />
                        </span>
                        <span className="font-medium text-sm">How to Buy ERG</span>
                    </Link>
                    <Link
                        to="/faq"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-green-400 ${location.pathname === '/faq'
                            ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <span className={location.pathname === '/faq' ? 'text-green-200' : 'text-slate-400 group-hover:text-green-500'}>
                            <HelpCircle size={18} />
                        </span>
                        <span className="font-medium text-sm">FAQ & Support</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                CE
                            </div>
                            <div>
                                <p className="text-xs font-bold text-blue-900">Captain Efficiency</p>
                                <p className="text-[10px] text-blue-600">AI Assistant Active</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            "I'm here to help you navigate the agentic future!"
                        </p>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-4 justify-between">
                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                                aria-label="Open Sidebar"
                            >
                                <Menu size={24} />
                            </button>
                        )}
                        <h1 className="font-semibold text-slate-800 truncate">
                            {chapters.find(c => c.path === location.pathname)?.title || 'Agentic AI at Home'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg px-2 py-1">
                            Login
                        </Link>
                        <Link to="/pay-ergo" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                            Get the System
                        </Link>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-slate-100 w-full">
                        <motion.div
                            className="h-full bg-blue-600"
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
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
                <AnimatePresence>
                    {isCaptainOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className="bg-white p-6 rounded-2xl shadow-2xl border border-blue-100 w-72 mb-2 relative"
                        >
                            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 border-r border-b border-blue-100"></div>
                            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <Zap size={16} className="text-yellow-500" />
                                Quick Tip
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Did you know? You can automate your grocery list using a simple text-based agent. Check out Chapter 2!
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCaptainOpen(!isCaptainOpen)}
                    className="w-14 h-14 bg-blue-600 rounded-full shadow-xl flex items-center justify-center text-white border-4 border-white ring-4 ring-blue-100"
                >
                    <span className="font-bold text-xl">CE</span>
                </motion.button>
            </div>
        </div>
    );
};

export default WebbookLayout;
