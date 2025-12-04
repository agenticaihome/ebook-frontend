import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { m } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
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
                    setMessage('Payment confirmed! Redirecting to account creation...');

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

                    // Wait 2 seconds then redirect
                    setTimeout(() => {
                        navigate(`/create-account?payment_id=${result.paymentId}&email=${result.email}&type=stripe`);
                    }, 2000);
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
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4">
            <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-slate-800/50 backdrop-blur-lg border border-slate-600 rounded-2xl p-8 text-center"
            >
                {status === 'verifying' && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-16 h-16 text-cyan-400 animate-spin" />
                        <h2 className="text-2xl font-bold text-white">Verifying Payment</h2>
                        <p className="text-slate-400">{message}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Success!</h2>
                        <p className="text-green-300">{message}</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-10 h-10 text-red-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
                        <p className="text-red-300">{message}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-4 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                        >
                            Return Home
                        </button>
                    </div>
                )}
            </m.div>
        </div>
    );
};

export default SuccessPage;
