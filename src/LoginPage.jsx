import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Key, CreditCard, ArrowRight, AlertCircle } from 'lucide-react';
import { api } from './services/api';

const LoginPage = () => {
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

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const data = await api.login(email, password);
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

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
                <div className="p-8 text-center bg-gradient-to-b from-slate-800 to-slate-900">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-400">Access your digital library</p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-700">
                    <button
                        onClick={() => setActiveTab('email')}
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'email'
                            ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800/50'
                            : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        Email Login
                    </button>
                    <button
                        onClick={() => setActiveTab('ergo')}
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'ergo'
                            ? 'text-orange-400 border-b-2 border-orange-400 bg-slate-800/50'
                            : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        Claim Ergo Purchase
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm"
                        >
                            <AlertCircle size={16} />
                            {error}
                        </motion.div>
                    )}

                    {activeTab === 'email' ? (
                        <motion.form
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={handleEmailLogin}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        placeholder="you@example.com"
                                        required
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
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        placeholder="••••••••"
                                        required
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
                        </motion.form>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={handleErgoClaim}
                            className="space-y-4"
                        >
                            <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg mb-4">
                                <p className="text-orange-200 text-xs leading-relaxed">
                                    Enter the Transaction ID from your wallet and the Secret Access Code provided during payment.
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Transaction ID</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        type="text"
                                        value={txId}
                                        onChange={(e) => setTxId(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono text-sm"
                                        placeholder="e.g., 8f3a..."
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Secret Access Code</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        type="text"
                                        value={accessCode}
                                        onChange={(e) => setAccessCode(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono text-sm"
                                        placeholder="ERGO-XXXX-XXXX"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Verifying...' : 'Claim Access'}
                                {!isLoading && <ArrowRight size={18} />}
                            </button>
                        </motion.form>
                    )}
                </div>

                <div className="p-4 bg-slate-900/50 text-center border-t border-slate-700">
                    <p className="text-slate-500 text-xs">
                        Need help? <Link to="/faq" className="text-blue-400 hover:underline">Contact Support</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
