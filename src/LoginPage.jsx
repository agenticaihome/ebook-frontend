import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { Mail, Lock, Key, ArrowRight, ArrowLeft, AlertCircle, Sparkles, Shield, Loader2 } from 'lucide-react';
import { api } from './services/api';
import { usePageTitle } from './hooks/usePageTitle';
import { validateEmail, preventDoubleClick } from './utils/sanitizer';

const LoginPage = () => {
    usePageTitle('Login');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailLogin = preventDoubleClick(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

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
            await api.login(cleanEmail, password);
            setEmail('');
            setPassword('');
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    }, 2000);

    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[250px] sm:w-[400px] md:w-[600px] h-[250px] sm:h-[400px] md:h-[600px] bg-teal-900/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[200px] sm:w-[350px] md:w-[500px] h-[200px] sm:h-[350px] md:h-[500px] bg-cyan-900/20 rounded-full blur-[50px] sm:blur-[70px] md:blur-[100px]" />
                <div className="absolute top-[40%] right-[20%] w-[150px] sm:w-[200px] md:w-[300px] h-[150px] sm:h-[200px] md:h-[300px] bg-purple-900/10 rounded-full blur-[40px] sm:blur-[60px] md:blur-[80px]" />
            </div>

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 flex items-center gap-2 text-slate-300 hover:text-white transition-colors group z-20"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back to Home</span>
            </button>

            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Glass Card */}
                <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-600/50 overflow-hidden">

                    {/* Header with Masterpiece Logo */}
                    <div className="p-8 text-center border-b border-slate-700/50 relative overflow-hidden">
                        {/* Ambient glow behind logo */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-48 h-48 bg-gradient-to-r from-teal-500/30 via-cyan-500/20 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
                        </div>

                        {/* Logo Container - The Masterpiece */}
                        <div className="relative flex justify-center mb-6">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-xl animate-pulse" />
                            </div>

                            {/* Glass frame */}
                            <div className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl shadow-teal-500/10">
                                {/* Inner shimmer */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/10 via-transparent to-purple-400/10" />

                                {/* The Logo */}
                                <img
                                    src="/assets/logo-new.webp"
                                    alt="Agentic AI at Home"
                                    className="relative z-10 h-16 w-auto drop-shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                                />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-2 relative z-10">Welcome Back!</h1>
                        <p className="text-slate-300 relative z-10">Your AI agents are waiting</p>

                        {/* Trust Badge */}
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium relative z-10">
                            <Shield size={12} />
                            <span>Secure Login</span>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-8">
                        {error && (
                            <m.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                role="alert"
                                className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-6 flex items-center gap-2 text-sm"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </m.div>
                        )}

                        <form onSubmit={handleEmailLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 255) setEmail(e.target.value);
                                        }}
                                        maxLength={255}
                                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-11 pr-4 text-white text-base placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-all"
                                        placeholder="you@example.com"
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 128) setPassword(e.target.value);
                                        }}
                                        maxLength={128}
                                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-11 pr-4 text-white text-base placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-all"
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                            {/* Forgot Password Link */}
                            <div className="text-center pt-2">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-slate-900/30 border-t border-slate-700/50 space-y-4">
                        {/* Claim Purchase */}
                        <div className="text-center">
                            <p className="text-slate-500 text-sm mb-3">
                                Paid but no account yet?
                            </p>
                            <button
                                onClick={() => navigate('/claim-access')}
                                className="w-full py-3 px-4 bg-slate-800/50 hover:bg-slate-700/50 text-teal-400 font-medium rounded-xl border border-slate-600 hover:border-teal-500/50 transition-all flex items-center justify-center gap-2 group"
                            >
                                <Key size={16} />
                                <span>Claim Your Purchase</span>
                                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>

                        {/* Don't have access? */}
                        <div className="text-center pt-2">
                            <p className="text-slate-500 text-xs mb-2">
                                Don't have access yet?
                            </p>
                            <Link
                                to="/unlock"
                                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                            >
                                <Sparkles size={14} />
                                🚀 Start My Agent Army
                            </Link>
                        </div>

                        {/* Support */}
                        <div className="text-center pt-2 border-t border-slate-700/30">
                            <p className="text-slate-500 text-xs pt-3">
                                Need help? <Link to="/faq" className="text-teal-400 hover:text-teal-300 hover:underline">Contact Support</Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <p className="text-center text-slate-600 text-xs mt-6">
                    Your data is encrypted and secure 🔒
                </p>
            </m.div>
        </div>
    );
};

export default LoginPage;
