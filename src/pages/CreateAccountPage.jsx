import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { m } from 'framer-motion';
import { ShieldCheck, Lock, Mail, Loader2, CheckCircle2, AlertTriangle, Sparkles, Rocket } from 'lucide-react';
import { api } from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';
import ReactGA from 'react-ga4';
import PasswordStrengthMeter from '../components/common/PasswordStrengthMeter';

const CreateAccountPage = () => {
    usePageTitle('Create Account');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formStarted, setFormStarted] = useState(false);

    // Get payment info from URL params
    const paymentId = searchParams.get('payment_id');
    const urlEmail = searchParams.get('email');
    const paymentType = searchParams.get('type'); // 'stripe' or 'ergo'

    const [email, setEmail] = useState(urlEmail || '');

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setError('');

        // Track form submission
        ReactGA.event('form_submit', {
            form_name: 'create_account',
            payment_type: paymentType
        });

        // Validation
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            // Call backend to create account
            const data = await api.register(email, password, paymentId);

            if (data.success) {
                // JWT is now in httpOnly cookie - no localStorage needed
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
            <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-6 relative overflow-hidden">
                {/* Ambient Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-20%] left-[-10%] w-[150px] sm:w-[250px] md:w-[500px] h-[150px] sm:h-[250px] md:h-[500px] bg-yellow-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[120px] sm:w-[200px] md:w-[400px] h-[120px] sm:h-[200px] md:h-[400px] bg-orange-500/10 rounded-full blur-[50px] sm:blur-[70px] md:blur-[100px]" />
                </div>

                <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center text-white relative z-10"
                >
                    <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/30">
                        <AlertTriangle className="w-10 h-10 text-yellow-400" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Invalid Access</h1>
                    <p className="text-slate-300 mb-6">Please complete payment first</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl transition-all font-bold shadow-lg shadow-purple-500/20"
                    >
                        Back to Home
                    </button>
                </m.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[200px] sm:w-[350px] md:w-[600px] h-[200px] sm:h-[350px] md:h-[600px] bg-purple-500/10 rounded-full blur-[60px] sm:blur-[90px] md:blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[150px] sm:w-[250px] md:w-[500px] h-[150px] sm:h-[250px] md:h-[500px] bg-blue-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[120px] sm:w-[200px] md:w-[400px] h-[120px] sm:h-[200px] md:h-[400px] bg-teal-500/5 rounded-full blur-[50px] sm:blur-[70px] md:blur-[100px]" />
            </div>

            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="max-w-md w-full relative z-10"
            >
                {/* Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-[1.5rem] blur-xl opacity-50" />

                <div className="relative bg-slate-800/60 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-8 shadow-2xl shadow-purple-900/20">

                    {/* Success Header */}
                    <div className="text-center mb-8">
                        <m.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30 relative"
                        >
                            {/* Pulsing glow */}
                            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                            <CheckCircle2 className="w-10 h-10 text-green-400 relative z-10" />
                        </m.div>

                        <m.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-extrabold text-white mb-2"
                        >
                            You're Almost Done!
                        </m.h1>

                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30"
                        >
                            <Sparkles size={14} className="text-purple-400" />
                            <span className="text-sm text-purple-300 font-medium">
                                {paymentType === 'stripe' ? 'Stripe payment' : 'ERG payment'} successful
                            </span>
                        </m.div>
                    </div>

                    {/* Create Account Form */}
                    <m.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 mb-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                                <ShieldCheck className="w-5 h-5 text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Create Your Account</h2>
                        </div>

                        <p className="text-sm text-purple-200 mb-6">
                            Set a password to secure your account and access all 5 parts
                        </p>

                        <form onSubmit={handleCreateAccount} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="text-sm text-slate-300 block mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        readOnly={paymentType === 'stripe'}
                                        placeholder="Enter your email"
                                        className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white text-base focus:border-purple-500 focus:outline-none transition-colors ${paymentType === 'stripe' ? 'cursor-not-allowed opacity-75' : ''}`}
                                    />
                                </div>
                                {email.includes('@temp.ergo') && (
                                    <div className="mt-2 p-3 bg-amber-900/30 border border-amber-500/40 rounded-lg">
                                        <p className="text-amber-300 text-sm font-medium mb-1">⚠️ Enter your real email above!</p>
                                        <p className="text-amber-200/70 text-xs">
                                            Replace the temporary ID with your actual email address. This is how you'll log in and receive important updates.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-sm text-slate-300 block mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password (min 8 characters)"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white text-base focus:border-purple-500 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <PasswordStrengthMeter password={password} />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                                    <div className="flex items-center gap-2 text-red-400 text-sm">
                                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                        {error}
                                    </div>
                                    <p className="text-red-300/70 text-xs mt-2">
                                        Need help? <a href="/faq" className="text-red-300 underline hover:text-white">Check our FAQ</a> or email support@agenticaihome.com
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <Rocket className="w-5 h-5" />
                                        Create Account & Start
                                    </>
                                )}
                            </button>
                        </form>
                    </m.div>

                    {/* Security Note */}
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center text-sm text-slate-400"
                    >
                        <p className="flex items-center justify-center gap-1.5">
                            <Lock size={12} className="text-green-400" />
                            Your password is encrypted and secure
                        </p>
                        <p className="mt-1 text-slate-500">You'll be automatically logged in after creation</p>
                    </m.div>
                </div>
            </m.div>
        </div>
    );
};

export default CreateAccountPage;
