import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Mail, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';

const CreateAccountPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Get payment info from URL params
    const paymentId = searchParams.get('payment_id');
    const urlEmail = searchParams.get('email');
    const paymentType = searchParams.get('type'); // 'stripe' or 'ergo'

    const [email, setEmail] = useState(urlEmail || '');

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            // Call backend to create account
            const data = await api.register(email, password, paymentId);

            if (data.success) {
                // Save auth token (MUST BE 'token' to match API expectations)
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('user_email', email);

                // Redirect to dashboard
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                setError(data.message || 'Failed to create account');
                setLoading(false);
            }
        } catch (err) {
            console.error('Account creation error:', err);
            setError(err.message || 'Server error. Please try again.');
            setLoading(false);
        }
    };

    if (!paymentId) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
                <div className="text-center text-white">
                    <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                    <h1 className="text-2xl font-bold mb-2">Invalid Access</h1>
                    <p className="text-slate-300">Please complete payment first</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-8"
            >
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Payment Confirmed!
                    </h1>
                    <p className="text-slate-300">
                        {paymentType === 'stripe' ? 'Stripe payment' : 'ERG payment'} successful
                    </p>
                </div>

                {/* Create Account Form */}
                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="w-6 h-6 text-purple-400" />
                        <h2 className="text-xl font-bold text-white">Create Your Account</h2>
                    </div>

                    <p className="text-sm text-purple-200 mb-6">
                        Set a password to secure your account and access all 5 parts
                    </p>

                    <form onSubmit={handleCreateAccount} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="text-sm text-slate-400 block mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    readOnly={true}
                                    placeholder="Enter your email"
                                    className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white cursor-not-allowed opacity-75`}
                                />
                            </div>
                            {email.includes('@temp.ergo') && (
                                <p className="text-xs text-yellow-400 mt-2">
                                    * This is a temporary ID. You can update your email in the Dashboard after logging in.
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm text-slate-400 block mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password (min 8 characters)"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="text-sm text-slate-400 block mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter password"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <ShieldCheck className="w-5 h-5" />
                                    Create Account & Access Content
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Security Note */}
                <div className="text-center text-sm text-slate-400">
                    <p>🔒 Your password is encrypted and secure</p>
                    <p className="mt-1">You'll be automatically logged in after creation</p>
                </div>
            </motion.div >
        </div >
    );
};

export default CreateAccountPage;
