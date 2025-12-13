import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, AlertCircle, BookOpen, Sparkles } from 'lucide-react';

// Section names for each part
const SECTION_NAMES = {
    1: 'Part 1: The Foundation',
    2: 'Part 2: Daily Operations',
    3: 'Part 3: Productivity',
    4: 'Part 4: Advanced Systems',
    5: 'Part 5: Mastery'
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
    const sectionName = SECTION_NAMES[partNumber] || `Part ${partNumber}`;

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
        <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center p-4">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-900/15 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px]" />
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
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-teal-500/30">
                            <Lock className="w-8 h-8 text-teal-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Premium Content</h2>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <BookOpen size={16} className="text-teal-400" />
                            <span className="text-teal-400 font-medium">{sectionName}</span>
                        </div>
                        <p className="text-slate-300 text-sm">
                            This section requires full access
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                            Beta testers • Launch Pricing Available
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Enter Access Code
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-600/50 rounded-xl text-white text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
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
                            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-teal-900/20 hover:shadow-teal-900/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <Sparkles size={18} />
                            Unlock Content
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-xs mt-6">
                        Don't have access? <Link to="/unlock" className="text-teal-400 font-medium hover:underline">Get instant access here</Link>
                    </p>
                </div>
            </m.div>
        </div>
    );
};

export default PasswordGate;
