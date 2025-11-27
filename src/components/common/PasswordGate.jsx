import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

const PasswordGate = ({ children, partName = "This Section" }) => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const auth = sessionStorage.getItem(`auth_${partName}`);
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, [partName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'password') {
            setIsAuthenticated(true);
            sessionStorage.setItem(`auth_${partName}`, 'true');
            setError('');
        } else {
            setError('Incorrect password');
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                        <Lock className="text-cyan-400" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Restricted Access</h1>
                    <p className="text-slate-300 mb-6">
                        Parts 2-5 will be ready for purchase on <span className="text-cyan-400 font-bold">December 4th</span>.
                    </p>
                    <p className="text-sm text-slate-400">
                        Please enter the password to continue previewing.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded-lg border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        Unlock Access
                        <ArrowRight size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordGate;
