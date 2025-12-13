import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { m } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { logPurchase } from '../utils/analytics';

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your payment...');

    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        if (!sessionId) {
            setStatus('error');
            setMessage('No payment session found.');
            return;
        }

        const verifyPayment = async () => {
            try {
                const result = await api.verifyStripePayment(sessionId);
                if (result.success) {
                    setStatus('success');
                    setMessage('Payment successful! Redirecting to setup...');

                    // Store paid status in localStorage (only non-sensitive flags)
                    localStorage.setItem('stripe_payment', JSON.stringify({
                        paid: true,
                        timestamp: new Date().toISOString()
                    }));

                    // 🎉 DIS audit: Celebration moment
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#14b8a6', '#f59e0b', '#ec4899']
                    });

                    // Log purchase event with dynamic pricing
                    const actualPrice = result.paymentType === 'stripe' ? 39.99 : 19.99;
                    logPurchase({
                        transaction_id: result.paymentId,
                        value: actualPrice,
                        currency: "USD",
                        payment_method: result.paymentType || 'stripe',
                        items: [{
                            item_id: result.paymentType === 'stripe' ? 'ebook_standard' : 'ebook_crypto',
                            item_name: `Agentic AI at Home - ${result.paymentType === 'stripe' ? 'Standard' : 'Crypto'} Access`,
                            price: actualPrice,
                            quantity: 1,
                            item_category: 'digital_product'
                        }]
                    });

                    // Wait 3 seconds (slightly longer to enjoy confetti) then redirect
                    setTimeout(() => {
                        navigate(`/create-account?payment_id=${result.paymentId}&email=${result.email}&type=stripe`);
                    }, 3000);
                } else {
                    setStatus('error');
                    setMessage('Payment verification failed: ' + (result.status || 'Unknown status'));
                }
            } catch (err) {
                console.error('Verification error:', err);
                setStatus('error');
                setMessage('Failed to verify payment. Please contact support.');
            }
        };

        verifyPayment();
    }, [searchParams, navigate]);

    return (
        <>
            <Helmet>
                <title>Payment Successful | Agentic AI Home</title>
                <meta name="description" content="Your payment was successful. You now have full access to all chapters." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4 overflow-hidden relative">

                {/* Background ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

                <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-slate-800/50 backdrop-blur-lg border border-slate-600 rounded-2xl p-8 text-center relative z-10 shadow-2xl shadow-teal-900/20"
                >
                    {status === 'verifying' && (
                        <div className="flex flex-col items-center gap-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
                                <Loader2 className="w-16 h-16 text-cyan-400 animate-spin relative z-10" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Confirming...</h2>
                                <p className="text-slate-400 text-sm">Just a moment while we secure your spot.</p>
                            </div>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="flex flex-col items-center gap-6">
                            <m.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/30"
                            >
                                <Sparkles className="w-12 h-12 text-white" />
                            </m.div>

                            <div>
                                <h2 className="text-3xl font-black text-white mb-2">Payment Successful</h2>
                                <p className="text-teal-300 font-medium text-lg">{message}</p>
                            </div>

                            <div className="text-slate-400 text-sm bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                Check your email for your receipt.
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-10 h-10 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
                                <p className="text-red-300">{message}</p>
                            </div>
                            <button
                                onClick={() => navigate('/')}
                                className="mt-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full"
                            >
                                Return Home
                            </button>
                        </div>
                    )}
                </m.div>
            </div>
        </>
    );
};

export default SuccessPage;
