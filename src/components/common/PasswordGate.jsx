import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, AlertCircle } from 'lucide-react';

const PasswordGate = ({ children, partNumber }) => {
    const [password, setPassword] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(() => {
        // Check sessionStorage
        return sessionStorage.getItem('beta_access') === 'true';
    });
    const [error, setError] = useState('');
    const [isShaking, setIsShaking] = useState(false);

    const BETA_PASSWORD = 'family1!';

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === BETA_PASSWORD) {
            setIsUnlocked(true);
            sessionStorage.setItem('beta_access', 'true');
            setError('');
        } else {
            setError('Incorrect password');
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
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    x: isShaking ? [0, -10, 10, -10, 10, 0] : 0
                }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-cyan-500/30">
                            <Lock className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Beta Access</h2>
                        <p className="text-slate-400 text-sm">
                            Part {partNumber} is currently in beta testing
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                            Family testing • Public release: December 4th
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Enter Beta Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                placeholder="••••••••"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-lg p-3"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40"
                        >
                            Unlock Content
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-xs mt-6">
                        Don't have access? Public release: <span className="text-cyan-400 font-medium">December 4th</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default PasswordGate;
