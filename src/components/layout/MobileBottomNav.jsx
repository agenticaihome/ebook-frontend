import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Zap, Settings, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

const MobileBottomNav = () => {
    const location = useLocation();
    const { isSoundEnabled, toggleSound } = useSound();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f1a]/95 backdrop-blur-lg border-t border-slate-800 md:hidden z-50 pb-safe">
            <div className="flex justify-around items-center p-3">
                <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-cyan-400' : 'text-slate-500'}`}>
                    <Home size={24} />
                    <span className="text-[10px] font-bold">Home</span>
                </Link>

                <Link to="/part1" className={`flex flex-col items-center gap-1 ${isActive('/part1') ? 'text-cyan-400' : 'text-slate-500'}`}>
                    <Zap size={24} />
                    <span className="text-[10px] font-bold">Start</span>
                </Link>

                <button
                    onClick={toggleSound}
                    className={`flex flex-col items-center gap-1 ${isSoundEnabled ? 'text-purple-400' : 'text-slate-500'}`}
                >
                    {isSoundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                    <span className="text-[10px] font-bold">Sound</span>
                </button>
            </div>
        </div>
    );
};

export default MobileBottomNav;
