import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Wrench, Volume2, VolumeX, Calculator, Activity, LayoutDashboard, Gamepad2 } from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import PrefetchLink from './PrefetchLink';

const MobileBottomNav = () => {
    const location = useLocation();
    const { isSoundEnabled, toggleSound } = useSound();
    const [showTools, setShowTools] = useState(false);

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    // Common touch-optimized button classes
    const navButtonBase = "flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[56px] rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-95 active:bg-slate-700/50 touch-manipulation";
    const toolsButtonBase = "flex flex-col items-center justify-center gap-2 p-4 min-h-[64px] bg-slate-700/50 rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400 active:scale-95 active:bg-slate-600 touch-manipulation";

    // Only show on content consumption pages (Dashboard, Chapters, Games, FAQ, Why Ergo)
    // Hide on conversion pages (splash, onboarding, sales, login, success, etc.)
    const showNavPaths = [
        '/dashboard',
        '/part1',
        '/part2',
        '/part3',
        '/part4',
        '/games',
        '/faq',
        '/why-ergo',
        '/hall-of-fame',
        '/graduation'
    ];

    const shouldShowNav = showNavPaths.some(path => location.pathname.startsWith(path));

    if (!shouldShowNav) {
        return null;
    }

    return (
        <>
            {/* Tools Menu - Touch-optimized with larger targets */}
            {showTools && (
                <div className="fixed bottom-24 left-3 right-3 bg-slate-800/95 backdrop-blur-lg border border-slate-600 rounded-2xl p-4 shadow-2xl z-[65] animate-in slide-in-from-bottom-5 fade-in duration-200">
                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            to="/tools"
                            onClick={() => setShowTools(false)}
                            className={toolsButtonBase}
                        >
                            <Calculator size={24} className="text-cyan-400" />
                            <span className="text-sm font-bold text-slate-200">Time Calc</span>
                        </Link>
                        <Link
                            to="/part1/chapter1#experience-quiz"
                            onClick={() => setShowTools(false)}
                            className={toolsButtonBase}
                        >
                            <Activity size={24} className="text-purple-400" />
                            <span className="text-sm font-bold text-slate-200">Diagnostic</span>
                        </Link>
                        <button
                            onClick={toggleSound}
                            className={`${toolsButtonBase} col-span-2`}
                        >
                            {isSoundEnabled ? <Volume2 size={24} className="text-purple-400" /> : <VolumeX size={24} className="text-slate-300" />}
                            <span className="text-sm font-bold text-slate-200">Sound: {isSoundEnabled ? 'On' : 'Off'}</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Backdrop for tools */}
            {showTools && (
                <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowTools(false)} />
            )}

            {/* Main Bottom Navigation - Touch-optimized with safe area support */}
            <nav
                className="fixed bottom-0 left-0 right-0 bg-[#0f0f1a]/95 backdrop-blur-xl border-t border-slate-700/50 md:hidden z-[60]"
                style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
                aria-label="Main navigation"
            >
                <div className="flex justify-around items-center px-2 pt-2">
                    <PrefetchLink
                        to="/"
                        className={`${navButtonBase} ${isActive('/') ? 'text-cyan-400 bg-cyan-400/10' : 'text-slate-400'}`}
                        aria-label="Home"
                        aria-current={isActive('/') ? 'page' : undefined}
                    >
                        <Home size={24} strokeWidth={2} />
                        <span className="text-xs font-semibold">Home</span>
                    </PrefetchLink>

                    <PrefetchLink
                        to={localStorage.getItem('last_visited_route') || '/part1/chapter1'}
                        className={`${navButtonBase} ${isActive('/part1') || isActive('/part2') || isActive('/part3') || isActive('/part4') ? 'text-cyan-400 bg-cyan-400/10' : 'text-slate-400'}`}
                        aria-label="Resume reading"
                    >
                        <BookOpen size={24} strokeWidth={2} />
                        <span className="text-xs font-semibold">Resume</span>
                    </PrefetchLink>

                    <PrefetchLink
                        to="/games"
                        className={`${navButtonBase} ${isActive('/games') ? 'text-cyan-400 bg-cyan-400/10' : 'text-slate-400'}`}
                        aria-label="Practice games"
                        aria-current={isActive('/games') ? 'page' : undefined}
                    >
                        <Gamepad2 size={24} strokeWidth={2} />
                        <span className="text-xs font-semibold">Games</span>
                    </PrefetchLink>

                    <button
                        onClick={() => setShowTools(!showTools)}
                        className={`${navButtonBase} ${showTools ? 'text-cyan-400 bg-cyan-400/10' : 'text-slate-400'}`}
                        aria-label="Tools menu"
                        aria-expanded={showTools}
                    >
                        <Wrench size={24} strokeWidth={2} />
                        <span className="text-xs font-semibold">Tools</span>
                    </button>
                </div>
            </nav>
        </>
    );
}; export default MobileBottomNav;
