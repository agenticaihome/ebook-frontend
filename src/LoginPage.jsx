import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { Mail, Lock, Key, CreditCard, ArrowRight, AlertCircle } from 'lucide-react';
import { api } from './services/api';
import { usePageTitle } from './hooks/usePageTitle';
import { validateEmail, sanitizeInput, preventDoubleClick } from './utils/sanitizer';

const LoginPage = () => {
    usePageTitle('Login');
    const [activeTab, setActiveTab] = useState('email');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Email Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Ergo Form State
    const [txId, setTxId] = useState('');
    const [accessCode, setAccessCode] = useState('');

    const handleEmailLogin = preventDoubleClick(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validate and sanitize email
        const cleanEmail = validateEmail(email);
        if (!cleanEmail) {
            setError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        if (!password || password.length < 1) {
            setError('Please enter your password.');
            setIsLoading(false);
            return;
        }

        if (password.length > 128) {
            setError('Password is too long.');
            setIsLoading(false);
            return;
        }

        try {
            // Don't store password in variable - use directly
            const data = await api.login(cleanEmail, password);
            // JWT is now in httpOnly cookie - no localStorage needed
            
            // Clear sensitive data
            setEmail('');
            setPassword('');
            
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
        }, 2000);

    const handleErgoClaim = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const data = await api.claimErgoPayment(txId, accessCode);
            if (data.success) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                setError(data.error || 'Verification failed');
            }
        } catch (err) {
            setError(err.message || 'Claim failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-700">

                {/* Header */}
                <div className="p-8 text-center bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-400">Access your digital library</p>
                </div>

                {/* Content */}
                <div className="p-8">
                    {error && (
                        <m.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm"
                        >
                            <AlertCircle size={16} />
                            {error}
                        </m.div>
                    )}

                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value.length <= 255) {
                                            setEmail(value);
                                        }
                                    }}
                                    maxLength={255}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    placeholder="you@example.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value.length <= 128) {
                                            setPassword(value);
                                        }
                                    }}
                                    maxLength={128}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Logging in...' : 'Sign In'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-slate-900/50 border-t border-slate-700 space-y-4">
                    <div className="text-center">
                        <p className="text-slate-400 text-sm mb-2">
                            Paid but no account?
                        </p>
                        <button
                            onClick={() => navigate('/claim-access')}
                            className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-medium rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Key size={16} />
                            Claim Purchase
                        </button>
                    </div>

                    <div className="text-center pt-2">
                        <p className="text-slate-500 text-xs">
                            Need help? <Link to="/faq" className="text-blue-400 hover:underline">Contact Support</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
