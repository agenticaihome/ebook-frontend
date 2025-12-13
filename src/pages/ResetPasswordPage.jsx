import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { m } from 'framer-motion';
import { Lock, ArrowLeft, AlertCircle, CheckCircle, Loader2, Shield, Eye, EyeOff } from 'lucide-react';
import { api } from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';
import { validateEmail, preventDoubleClick } from '../utils/sanitizer';
import PasswordStrengthMeter from '../components/common/PasswordStrengthMeter';

const ResetPasswordPage = () => {
    usePageTitle('Reset Password');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Get email and token from URL
    const email = searchParams.get('email') || '';
    const token = searchParams.get('token') || '';

    useEffect(() => {
        if (!email || !token) {
            setError('Invalid reset link. Please request a new password reset.');
        }
    }, [email, token]);

    const handleSubmit = preventDoubleClick(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validate password
        if (!password || password.length < 8) {
            setError('Password must be at least 8 characters.');
            setIsLoading(false);
            return;
        }

        if (password.length > 128) {
            setError('Password is too long.');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        // Check password strength
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);

        if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
            setError('Password must contain uppercase, lowercase, and numbers.');
            setIsLoading(false);
            return;
        }

        try {
            await api.resetPassword(email, token, password);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Password reset failed. The link may have expired.');
        } finally {
            setIsLoading(false);
        }
    }, 2000);

    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-green-900/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-[100px]" />
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
                            <div className="w-48 h-48 bg-gradient-to-r from-green-500/30 via-teal-500/20 to-cyan-500/30 rounded-full blur-3xl animate-pulse" />
                        </div>

                        <div className="relative flex justify-center mb-6">
                            <div className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl shadow-green-500/10">
                                <Lock className="h-12 w-12 text-green-400" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-2 relative z-10">Reset Password</h1>
                        <p className="text-slate-300 relative z-10">Choose a new secure password</p>
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
                                <h3 className="text-xl font-bold text-white mb-2">Password Reset!</h3>
                                <p className="text-slate-400 mb-6">
                                    Your password has been successfully reset. You can now log in with your new password.
                                </p>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-teal-500/25"
                                >
                                    Go to Login
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
                                        <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => {
                                                    if (e.target.value.length <= 128) setPassword(e.target.value);
                                                }}
                                                maxLength={128}
                                                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-11 pr-11 text-white text-base placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                                                placeholder="••••••••"
                                                required
                                                autoComplete="new-password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <PasswordStrengthMeter password={password} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    if (e.target.value.length <= 128) setConfirmPassword(e.target.value);
                                                }}
                                                maxLength={128}
                                                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-11 pr-4 text-white text-base placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                                                placeholder="••••••••"
                                                required
                                                autoComplete="new-password"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading || !email || !token}
                                        className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/25"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Resetting...
                                            </>
                                        ) : (
                                            'Reset Password'
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
                                Need a new link? <Link to="/forgot-password" className="text-amber-400 hover:text-amber-300 font-medium">Request Reset</Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <p className="text-center text-slate-600 text-xs mt-6 flex items-center justify-center gap-1">
                    <Shield size={12} />
                    Your password is securely encrypted
                </p>
            </m.div>
        </div>
    );
};

export default ResetPasswordPage;
