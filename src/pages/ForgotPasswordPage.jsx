import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { Mail, ArrowLeft, AlertCircle, CheckCircle, Loader2, Shield } from 'lucide-react';
import { api } from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';
import { validateEmail, preventDoubleClick } from '../utils/sanitizer';

const ForgotPasswordPage = () => {
    usePageTitle('Forgot Password');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const handleSubmit = preventDoubleClick(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const cleanEmail = validateEmail(email);
        if (!cleanEmail) {
            setError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        try {
            await api.forgotPassword(cleanEmail);
            setSuccess(true);
        } catch (err) {
            // Even on error, show success to prevent email enumeration
            setSuccess(true);
        } finally {
            setIsLoading(false);
        }
    }, 2000);

    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[200px] sm:w-[350px] md:w-[600px] h-[200px] sm:h-[350px] md:h-[600px] bg-teal-900/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[150px] sm:w-[250px] md:w-[500px] h-[150px] sm:h-[250px] md:h-[500px] bg-cyan-900/20 rounded-full blur-[50px] sm:blur-[70px] md:blur-[100px]" />
            </div>

            {/* Back Button */}
            <button
                onClick={() => navigate('/login')}
                className="absolute top-6 left-6 flex items-center gap-2 text-slate-300 hover:text-white transition-colors group z-20"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back to Login</span>
            </button>

            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Glass Card */}
                <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-600/50 overflow-hidden">

                    {/* Header */}
                    <div className="p-8 text-center border-b border-slate-700/50 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-48 h-48 bg-gradient-to-r from-amber-500/30 via-orange-500/20 to-red-500/30 rounded-full blur-3xl animate-pulse" />
                        </div>

                        <div className="relative flex justify-center mb-6">
                            <div className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl shadow-amber-500/10">
                                <Mail className="h-12 w-12 text-amber-400" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-2 relative z-10">Forgot Password?</h1>
                        <p className="text-slate-300 relative z-10">No worries, we'll send you reset instructions</p>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {success ? (
                            <m.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="text-green-400" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
                                <p className="text-slate-400 mb-6">
                                    If an account exists with that email, we've sent password reset instructions.
                                </p>
                                <p className="text-slate-500 text-sm mb-6">
                                    Didn't receive an email? Check your spam folder or try again in a few minutes.
                                </p>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-all"
                                >
                                    Back to Login
                                </button>
                            </m.div>
                        ) : (
                            <>
                                {error && (
                                    <m.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-6 flex items-center gap-2 text-sm"
                                    >
                                        <AlertCircle size={16} />
                                        {error}
                                    </m.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
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
                                                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-11 pr-4 text-white text-base placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
                                                placeholder="you@example.com"
                                                required
                                                autoComplete="email"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/25"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Reset Link'
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-slate-900/30 border-t border-slate-700/50">
                        <div className="text-center">
                            <p className="text-slate-500 text-sm">
                                Remember your password? <Link to="/login" className="text-teal-400 hover:text-teal-300 font-medium">Sign In</Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <p className="text-center text-slate-600 text-xs mt-6 flex items-center justify-center gap-1">
                    <Shield size={12} />
                    Link expires in 1 hour for security
                </p>
            </m.div>
        </div>
    );
};

export default ForgotPasswordPage;
