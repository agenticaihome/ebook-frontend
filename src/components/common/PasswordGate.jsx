import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import CaptainHero from '../CaptainHero';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Simple hash for "password" to prevent plain text viewing
            // SHA-256 for 'password'
            const msgBuffer = new TextEncoder().encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            // Hash for "password" = 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
            if (hashHex === '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8') {
                setIsAuthenticated(true);
                sessionStorage.setItem(`auth_${partName}`, 'true');
                setError('');
            } else {
                setError('Incorrect password');
            }
        } catch (err) {
            console.error("Auth error:", err);
            setError('Authentication failed');
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <CaptainHero
                            size="md"
                            message="I need to verify your clearance level before we can proceed to operations."
                        />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Level 2 Clearance Required</h1>
                    <p className="text-slate-300 mb-6">
                        The "Morning Agent" protocols are locked.
                        <br />
                        Upgrade to full access to deploy your household staff.
                    </p>

                    <div className="flex flex-col gap-4 justify-center items-center mb-8">
                        <a
                            href="/#pricing"
                            className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-green-900/20 transition-all transform hover:scale-105"
                        >
                            Get Full Access
                        </a>
                        <div className="text-sm text-slate-500">
                            Already have a password? Enter it below.
                        </div>
                    </div>
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
