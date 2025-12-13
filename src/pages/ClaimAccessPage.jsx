import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { m } from 'framer-motion';
import { ShieldCheck, Search, Loader2, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';

const ClaimAccessPage = () => {
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleClaim = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!identifier || identifier.trim().length < 5) {
            setError('Please enter a valid Transaction ID or Access Code.');
            setLoading(false);
            return;
        }

        try {
            const data = await api.claimPayment(identifier);

            if (data.success) {
                // Redirect to create account with the found payment details
                navigate(`/create-account?payment_id=${data.paymentId}&type=${data.type}&email=${data.email || ''}`);
            } else {
                setError(data.error || 'Failed to find payment');
            }
        } catch (err) {
            console.error('Claim error:', err);
            setError(err.message || 'Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Claim Access | Agentic AI Home</title>
                <meta name="description" content="Enter your access code to unlock premium content." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Ambience */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px]" />

                <m.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-slate-800/50 backdrop-blur-lg border border-slate-600 rounded-2xl p-8 relative z-10"
                >
                    <button
                        onClick={() => navigate('/login')}
                        className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="text-center mb-8 mt-4">
                        <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                            <ShieldCheck className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Claim Your Purchase</h1>
                        <p className="text-slate-400 text-sm">
                            Lost your connection? Enter your Transaction ID or Access Code to resume setup.
                        </p>
                    </div>

                    <form onSubmit={handleClaim} className="space-y-6">
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-2 block">
                                Transaction ID / Access Code
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    placeholder="e.g. pi_3Q..."
                                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                                Check your email (Stripe) or wallet history (Ergo) for this ID.
                            </p>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Verify & Continue
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </m.div>
            </div>
        </>
    );
};

export default ClaimAccessPage;
