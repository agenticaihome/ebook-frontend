import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { Compass, AlertCircle, Map, Lock } from 'lucide-react';

// Territory names for each part
const TERRITORY_NAMES = {
    2: 'Homestead Valley',
    3: 'Digital Frontier',
    4: 'Wellness Mountains',
    5: 'Grand Command'
};

const PasswordGate = ({ children, partNumber }) => {
    const [password, setPassword] = useState('');
    const storageKey = `unlocked_part_${partNumber}`;

    const [isUnlocked, setIsUnlocked] = useState(() => {
        // Check localStorage (permanent save)
        try {
            return localStorage.getItem(storageKey) === 'true' || localStorage.getItem('beta_access') === 'true';
        } catch (e) {
            return false;
        }
    });
    const [error, setError] = useState('');
    const [isShaking, setIsShaking] = useState(false);

    const BETA_PASSWORD = 'family1!';
    const territoryName = TERRITORY_NAMES[partNumber] || `Territory ${partNumber}`;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === BETA_PASSWORD) {
            setIsUnlocked(true);
            try {
                localStorage.setItem(storageKey, 'true');
                // Also set legacy key for backward compatibility if needed
                if (partNumber === undefined) {
                    localStorage.setItem('beta_access', 'true');
                }
            } catch (e) {
                console.error('Failed to save unlock status', e);
            }
            setError('');
        } else {
            setError('Access code not recognized');
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            setPassword('');
        }
    };

    if (isUnlocked) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4">
            {/* Background - Map/Frontier aesthetic */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-900/15 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px]" />
                {/* Subtle grid overlay for map feel */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    x: isShaking ? [0, -10, 10, -10, 10, 0] : 0
                }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 shadow-2xl">
                    {/* Uncharted Territory Header */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-amber-500/30">
                            <Compass className="w-10 h-10 text-amber-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Uncharted Territory</h2>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Map size={16} className="text-cyan-400" />
                            <span className="text-cyan-400 font-medium">{territoryName}</span>
                        </div>
                        <p className="text-slate-400 text-sm">
                            This territory requires expedition clearance
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                            Early explorers only • Opening to all pioneers soon
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Enter Expedition Code
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                className="w-full px-4 py-3 bg-slate-800 border border-amber-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                placeholder="••••••••"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <m.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-lg p-3"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </m.div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-amber-900/20 hover:shadow-amber-900/40 flex items-center justify-center gap-2"
                        >
                            <Lock size={18} />
                            Unlock Territory
                        </button>
                    </form>

                    <p className="text-center text-slate-400 text-xs mt-6">
                        Don't have access? <span className="text-amber-400 font-medium">Public expedition launching soon</span>
                    </p>
                </div>
            </m.div>
        </div>
    );
};

export default PasswordGate;
