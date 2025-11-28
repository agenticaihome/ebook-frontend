import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Wrench, Volume2, VolumeX, Calculator, Activity } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

const MobileBottomNav = () => {
    const location = useLocation();
    const { isSoundEnabled, toggleSound } = useSound();
    const [showTools, setShowTools] = useState(false);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Tools Menu */}
            {showTools && (
                <div className="fixed bottom-20 left-4 right-4 bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-2xl z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            to="/#calculator"
                            onClick={() => setShowTools(false)}
                            className="flex flex-col items-center gap-2 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            <Calculator className="text-cyan-400" />
                            <span className="text-xs font-bold text-slate-300">Time Calc</span>
                        </Link>
                        <Link
                            to="/part1#diagnostic"
                            onClick={() => setShowTools(false)}
                            className="flex flex-col items-center gap-2 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            <Activity className="text-purple-400" />
                            <span className="text-xs font-bold text-slate-300">Diagnostic</span>
                        </Link>
                    </div>
                </div>
            )}

            {/* Backdrop for tools */}
            {showTools && (
                <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowTools(false)} />
            )}

            <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f1a]/95 backdrop-blur-lg border-t border-slate-800 md:hidden z-50 pb-safe">
                <div className="flex justify-around items-center p-3">
                    <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-cyan-400' : 'text-slate-500'}`}>
                        <Home size={24} />
                        <span className="text-[10px] font-bold">Home</span>
                    </Link>

                    <Link to="/part1" className={`flex flex-col items-center gap-1 ${isActive('/part1') ? 'text-cyan-400' : 'text-slate-500'}`}>
                        <BookOpen size={24} />
                        <span className="text-[10px] font-bold">Read</span>
                    </Link>

                    <button
                        onClick={() => setShowTools(!showTools)}
                        className={`flex flex-col items-center gap-1 ${showTools ? 'text-cyan-400' : 'text-slate-500'}`}
                    >
                        <Wrench size={24} />
                        <span className="text-[10px] font-bold">Tools</span>
                    </button>

                    <button
                        onClick={toggleSound}
                        className={`flex flex-col items-center gap-1 ${isSoundEnabled ? 'text-purple-400' : 'text-slate-500'}`}
                    >
                        {isSoundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                        <span className="text-[10px] font-bold">Sound</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default MobileBottomNav;
