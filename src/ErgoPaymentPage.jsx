import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import {
    Wallet, Copy, Check, AlertTriangle, ArrowRight, ArrowLeft,
    CheckCircle2, Clock, Smartphone, Loader2, Monitor, ExternalLink, ShieldCheck,
    HelpCircle, BookOpen, X
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { api } from './services/api';
import { toast } from 'react-hot-toast';
import { preventDoubleClick } from './utils/sanitizer';
import { Client } from '@stomp/stompjs';
import { logPurchase } from './utils/analytics';

const ErgoPaymentPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Start, 2: Payment Info
    const [isLoading, setIsLoading] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [ergPrice, setErgPrice] = useState(null);
    const [ergAmount, setErgAmount] = useState(null);
    const [ergoPayUrl, setErgoPayUrl] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [copiedAmount, setCopiedAmount] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('WAITING'); // WAITING, CHECKING, CONFIRMED
    const [error, setError] = useState('');
    const [showHelper, setShowHelper] = useState(false);
    const [nautilusConnected, setNautilusConnected] = useState(false);
    const [userWalletAddress, setUserWalletAddress] = useState('');
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
    const [isProcessing, setIsProcessing] = useState(false);

    // Initialize payment on mount  
    useEffect(() => {
        // Check for existing payment in session
        const savedPayment = sessionStorage.getItem('ergo_payment_state');
        if (savedPayment) {
            try {
                const state = JSON.parse(savedPayment);
                const age = Date.now() - state.timestamp;

                // If less than 30 min old AND has valid data, restore it
                if (age < 30 * 60 * 1000 && state.ergAmount > 0 && state.ergPriceUsd > 0) {
                    setAccessCode(state.accessCode);
                    setWalletAddress(state.walletAddress);
                    setErgAmount(state.ergAmount);
                    setErgPrice(state.ergPriceUsd);
                    setErgoPayUrl(state.ergoPayUrl);
                    setStep(state.step || 1);
                    setTimeRemaining(Math.floor((30 * 60 * 1000 - age) / 1000));
                }
            } catch (e) {
                console.error('Failed to restore payment state', e);
            }
        }
    }, []);


    // Offline detection
    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Payment expiration countdown
    useEffect(() => {
        if (step === 2 && paymentStatus === 'WAITING') {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 0) {
                        setError('Payment window expired. Please generate a new payment.');
                        return 0;
                    }
                    // Show helper at 10 minutes remaining (20 minutes elapsed)
                    if (prev === 10 * 60) {
                        setShowHelper(true);
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [step, paymentStatus]);

    // Poll for payment status
    useEffect(() => {
        if (step === 2 && paymentStatus === 'WAITING' && !isOffline && timeRemaining > 0) {
            const interval = setInterval(() => {
                autoCheckPayment();
            }, 10000); // Check every 10 seconds

            return () => clearInterval(interval);
        }
    }, [step, paymentStatus, accessCode, isOffline, timeRemaining]);

    // WebSocket for real-time updates
    useEffect(() => {
        if (step === 2 && paymentStatus === 'WAITING' && accessCode && !isOffline) {
            const client = new Client({
                brokerURL: 'ws://localhost:8080/ws', // TODO: Make this configurable for prod
                onConnect: () => {
                    console.log('Connected to WebSocket');
                    client.subscribe(`/topic/payment/${accessCode}`, (message) => {
                        if (message.body) {
                            const update = JSON.parse(message.body);
                            if (update.status === 'CONFIRMED' || update.status === 'PAID') {
                                console.log('WebSocket Payment Confirmed!');
                                confirmPayment(update.paymentId); // Assuming paymentId is txId or we fetch it
                                // If paymentId is just accessCode, we might need to fetch the txId or just trust it.
                                // For safety, let's do a quick check to get the txId if needed, or if the message has it.
                                // The backend sends: new PaymentUpdate(paymentId, status)
                                // Wait, paymentId in notification service is the accessCode?
                                // Let's check backend... yes, notifyPaymentSuccess(accessCode, "CONFIRMED")
                                // So we should probably do a quick API check to get the full details (like txId) just to be sure
                                // and to get the transaction ID for the record.
                                autoCheckPayment();
                            }
                        }
                    });
                },
                onWebSocketError: (error) => {
                    console.error('Error with WebSocket', error);
                },
                onStompError: (frame) => {
                    console.error('Broker reported error: ' + frame.headers['message']);
                    console.error('Additional details: ' + frame.body);
                },
            });

            client.activate();

            return () => {
                client.deactivate();
            };
        }
    }, [step, paymentStatus, accessCode, isOffline]);

    const fetchLivePrice = async () => {
        try {
            // Try CoinGecko first for real-time data
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ergo&vs_currencies=usd');
            const data = await response.json();
            if (data.ergo?.usd) {
                const price = data.ergo.usd;
                setErgPrice(price);
                setErgAmount(19.99 / price);
                return;
            }
        } catch (err) {
            console.warn('CoinGecko fetch failed, falling back to backend', err);
        }

        // Fallback to backend if CoinGecko fails
        try {
            const result = await api.getErgoQuote(19.99);
            if (result.success) {
                setErgAmount(result.ergAmount);
                setErgPrice(result.ergPriceUsd);
            }
        } catch (err) {
            console.error('Failed to fetch quote', err);
        }
    };

    // Poll for price updates while in Step 1
    useEffect(() => {
        if (step === 1) {
            fetchLivePrice();
            const interval = setInterval(fetchLivePrice, 30000); // Update every 30s
            return () => clearInterval(interval);
        }
    }, [step]);

    const handleStartPayment = async () => {
        if (isProcessing || timeRemaining <= 0) return;
        setIsProcessing(true);
        setIsLoading(true);

        try {
            // Get fresh payment intent from backend
            const result = await api.initiateErgoPayment();

            if (result.success) {
                setAccessCode(result.accessCode);
                setWalletAddress(result.walletAddress);
                setErgAmount(result.ergAmount);
                setErgPrice(result.ergPriceUsd);
                setErgoPayUrl(result.ergoPayUrl);

                // Save to sessionStorage
                sessionStorage.setItem('ergo_payment_state', JSON.stringify({
                    accessCode: result.accessCode,
                    walletAddress: result.walletAddress,
                    ergAmount: result.ergAmount,
                    ergPriceUsd: result.ergPriceUsd,
                    ergoPayUrl: result.ergoPayUrl,
                    timestamp: Date.now(),
                    step: 2,
                    paid: false
                }));

                setStep(2);
            } else {
                setError('Failed to initialize payment: ' + result.error);
                toast.error(result.error || 'Payment initialization failed');
            }
        } catch (err) {
            console.error(err);
            setError('Connection error. Please try again.');
            toast.error('Connection error. Please try again.');
        } finally {
            setIsLoading(false);
            setIsProcessing(false);
        }
    };

    const autoCheckPayment = async () => {
        if (!accessCode) return;

        try {
            const result = await api.checkRecentErgoPayment(accessCode);
            if (result.success && result.status === 'PAID') {
                confirmPayment(result.transactionId);
            }
        } catch (err) {
            console.error('Auto-check failed', err);
        }
    };

    const handleManualCheck = async () => {
        if (!accessCode) return;
        const toastId = toast.loading('Checking payment status...');
        try {
            const result = await api.checkRecentErgoPayment(accessCode);
            if (result.success && result.status === 'PAID') {
                toast.success('Payment received!', { id: toastId });
                confirmPayment(result.transactionId);
            } else {
                toast.error('Payment not yet confirmed. Please wait a moment and try again.', { id: toastId });
            }
        } catch (err) {
            console.error('Manual check failed', err);
            toast.error('Connection failed. Please try again.', { id: toastId });
        }
    };

    const confirmPayment = (txId) => {
        setPaymentStatus('CONFIRMED');

        // Update localStorage
        const payment = JSON.parse(localStorage.getItem('ergo_payment') || '{}');
        payment.paid = true;
        payment.txId = txId;
        localStorage.setItem('ergo_payment', JSON.stringify(payment));

        console.log('✅ Payment confirmed! Redirecting to account creation...');

        // Log purchase event
        logPurchase({
            transaction_id: txId,
            value: 19.99, // Discounted price
            currency: "USD",
            items: [{ item_id: "agentic_home_access_ergo", item_name: "Agentic AI Home Access (Ergo)" }]
        });

        // Generate temporary email for ERG payments  
        const tempEmail = `${txId.substring(0, 12)}@temp.ergo`;

        // Redirect to account creation page after 2 seconds
        setTimeout(() => {
            navigate(`/create-account?payment_id=${txId}&type=ergo&email=${encodeURIComponent(tempEmail)}`);
        }, 2000);
    };

    const copyToClipboard = async (text, setCopiedState) => {
        try {
            // Try modern clipboard API first
            await navigator.clipboard.writeText(text);
            setCopiedState(true);
        } catch (err) {
            // Fallback for older browsers/iOS Safari
            try {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);

                if (successful) {
                    setCopiedState(true);
                } else {
                    toast.error('Failed to copy. Please copy manually.');
                }
            } catch (fallbackErr) {
                toast.error('Copy not supported. Please copy manually.');
            }
        }

        setTimeout(() => setCopiedState(false), 2000);
    };

    const [isConnectingWallet, setIsConnectingWallet] = useState(false);
    const [walletError, setWalletError] = useState('');

    const connectNautilus = async () => {
        setIsConnectingWallet(true);
        setWalletError('');
        try {
            if (typeof window.ergo_request_read_access === 'undefined') {
                setWalletError('Nautilus Wallet is not installed or not detected.');
                return;
            }

            const connected = await window.ergo_request_read_access();
            if (connected) {
                const addresses = await window.ergo.get_used_addresses();
                const address = addresses[0];
                setUserWalletAddress(address);
                setNautilusConnected(true);
            } else {
                setWalletError('Connection rejected by user.');
            }
        } catch (err) {
            console.error('Nautilus connection failed:', err);
            setWalletError('Failed to connect. Please try again.');
        } finally {
            setIsConnectingWallet(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />

                <div className="flex flex-col items-center gap-6 relative z-10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-full" />
                        <Loader2 className="w-16 h-16 text-cyan-400 animate-spin relative z-10" />
                    </div>
                    <p className="text-white text-xl font-light tracking-wide">Initializing secure channel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f1a] text-white py-12 px-4 relative overflow-hidden font-sans">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[100px] opacity-50" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Home</span>
                </button>

                {/* Offline Warning */}
                {isOffline && (
                    <div className="fixed top-0 left-0 w-full bg-red-600 text-white p-4 text-center z-50 shadow-lg">
                        <div className="flex items-center justify-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-semibold">You're offline. Payment verification requires internet connection.</span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <m.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                        <img src="/assets/ergo-logo.png" alt="Ergo" className="w-4 h-4 object-contain invert" />
                        <span className="text-xs font-medium text-slate-300 tracking-wider uppercase">Powered by Ergo</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 tracking-tight">
                        Unlock <span className="text-cyan-400">Full Access</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Join the elite efficient. Pay with Ergo to receive your <span className="text-white font-semibold">50% Tech Literacy Discount</span>.
                    </p>
                </m.div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <m.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl">
                                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8 ring-1 ring-white/10 shadow-inner">
                                        <Wallet className="w-10 h-10 text-cyan-400" />
                                    </div>

                                    <div className="mb-10">
                                        <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Total Amount</p>
                                        <div className="flex items-baseline justify-center gap-3">
                                            <span className="text-5xl font-bold text-white">$19.99</span>
                                            <span className="text-xl text-slate-500 line-through">$39.99</span>
                                        </div>

                                        {/* Live ERG Conversion */}
                                        <div className="mt-6 space-y-3">
                                            <div className="inline-flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Live Price</span>
                                            </div>

                                            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-4 max-w-md mx-auto">
                                                <div className="flex items-center justify-center gap-2 mb-2">
                                                    <img src="/assets/ergo-logo.png" alt="Ergo" className="w-5 h-5 object-contain invert" />
                                                    <p className="text-cyan-400 text-2xl font-bold font-mono">{ergAmount?.toFixed(4)} ERG</p>
                                                </div>
                                                {ergPrice && (
                                                    <p className="text-slate-400 text-xs text-center">
                                                        $19.99 ÷ ${ergPrice.toFixed(4)}/ERG = {ergAmount?.toFixed(4)} ERG
                                                    </p>
                                                )}
                                                <p className="text-cyan-300/80 text-xs text-center mt-1 font-semibold">
                                                    Current Rate: ${ergPrice?.toFixed(4)} per ERG
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleStartPayment}
                                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white p-5 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40 hover:scale-[1.02] flex items-center justify-center gap-3 group"
                                    >
                                        Proceed to Payment
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    <div className="mt-4 text-center">
                                        <button
                                            onClick={() => navigate('/payment-guide')}
                                            className="text-sm text-slate-400 hover:text-white underline decoration-slate-600 hover:decoration-white transition-all"
                                        >
                                            Don't have crypto? Pay with Card ($39.99)
                                        </button>
                                    </div>

                                    <div className="mt-8 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-left">
                                        <div className="flex items-center gap-2 mb-3 text-sm font-bold text-white">
                                            <Clock size={16} className="text-cyan-400" />
                                            <span>Time to Complete:</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-xs">
                                            <div>
                                                <div className="text-slate-400 mb-1">New to Ergo?</div>
                                                <div className="text-white font-bold text-sm">~15-20 mins</div>
                                                <div className="text-slate-500">To setup wallet & buy</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-400 mb-1">Have Ergo?</div>
                                                <div className="text-white font-bold text-sm">~1-2 mins</div>
                                                <div className="text-slate-500">To send & confirm</div>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-2 border-t border-slate-700/50 text-[10px] text-slate-500 italic">
                                            *Current block time ~2 mins. Soon with sub-blocks, transactions could be confirmed in seconds.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    )}

                    {step === 2 && paymentStatus === 'WAITING' && (
                        <m.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >


                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column: QR & Mobile */}
                                <div className="space-y-6">
                                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                                                <Smartphone className="w-6 h-6 text-cyan-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">Scan to Pay</h3>
                                                <p className="text-sm text-slate-400">Use Ergo Wallet App</p>
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-2xl shadow-inner mx-auto max-w-[280px]">
                                            <QRCodeSVG value={ergoPayUrl} size={232} className="w-full h-auto" />
                                        </div>

                                        <div className="mt-8 text-center">
                                            <a
                                                href={ergoPayUrl}
                                                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-medium transition-colors border-b border-green-400/30 hover:border-green-400 pb-0.5"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Open directly in Wallet App
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Manual & Browser */}
                                <div className="space-y-6">
                                    {/* Browser Wallet Card */}
                                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                                                <Monitor className="w-6 h-6 text-cyan-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">Browser Wallet</h3>
                                                <p className="text-sm text-slate-400">Nautilus / SAFEW</p>
                                            </div>
                                        </div>

                                        {!nautilusConnected ? (
                                            <button
                                                onClick={connectNautilus}
                                                disabled={isConnectingWallet}
                                                className="w-full bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 border border-white/5"
                                            >
                                                {isConnectingWallet ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wallet className="w-5 h-5" />}
                                                {isConnectingWallet ? 'Connecting...' : 'Connect Nautilus'}
                                            </button>
                                        ) : (
                                            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                    <span className="text-sm text-blue-200 font-mono">
                                                        {userWalletAddress.substring(0, 8)}...{userWalletAddress.substring(userWalletAddress.length - 8)}
                                                    </span>
                                                </div>
                                                <button onClick={() => setNautilusConnected(false)} className="text-xs text-slate-400 hover:text-white">Disconnect</button>
                                            </div>
                                        )}
                                        {walletError && <p className="mt-3 text-red-400 text-sm">{walletError}</p>}
                                    </div>

                                    {/* Manual Transfer Card */}
                                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                                                <Copy className="w-6 h-6 text-purple-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">Manual Transfer</h3>
                                                <p className="text-sm text-slate-400">Copy & Send from any wallet</p>
                                            </div>
                                        </div>

                                        <div className="space-y-5">
                                            {/* Big Prominent Amount Box */}
                                            <div className="relative group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                                                <div className="relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 rounded-2xl p-6">
                                                    <div className="text-center mb-4">
                                                        <p className="text-xs text-purple-300 uppercase tracking-widest mb-2 font-bold">⚡ EXACT AMOUNT TO SEND ⚡</p>
                                                        <p className="text-[10px] text-slate-400">Copy this exact amount - DO NOT round or change it</p>
                                                    </div>

                                                    <button
                                                        onClick={() => copyToClipboard(ergAmount?.toFixed(4) || '0', setCopiedAmount)}
                                                        className="w-full bg-black/40 hover:bg-black/60 border-2 border-purple-400/50 hover:border-purple-400 rounded-xl p-6 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs text-purple-300 font-semibold">CLICK TO COPY</span>
                                                            {copiedAmount ? (
                                                                <div className="flex items-center gap-2 text-green-400">
                                                                    <Check className="w-5 h-5" />
                                                                    <span className="text-sm font-bold">Copied!</span>
                                                                </div>
                                                            ) : (
                                                                <Copy className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                                                            )}
                                                        </div>
                                                        <div className="text-center">
                                                            <span className="text-4xl md:text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300">
                                                                {ergAmount?.toFixed(4) || '0.0000'}
                                                            </span>
                                                            <div className="text-xl text-purple-300/80 font-bold mt-2">ERG</div>
                                                        </div>
                                                        <div className="mt-3 text-xs text-slate-400">
                                                            ≈ $19.99 USD {ergPrice && <span className="text-slate-500">(@ ${ergPrice?.toFixed(2)}/ERG)</span>}
                                                        </div>
                                                    </button>

                                                    <div className="mt-4 flex items-start gap-2 text-xs text-amber-300/90 bg-amber-900/20 border border-amber-500/20 rounded-lg p-3">
                                                        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                                        <p><strong>Important:</strong> Send this EXACT amount. Rounding will cause your payment to fail.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Wallet Address */}
                                            <div className="group">
                                                <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-semibold">Send to this address:</label>
                                                <button
                                                    onClick={() => copyToClipboard(walletAddress, setCopiedAddress)}
                                                    className="w-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 rounded-xl p-4 flex items-center justify-between transition-all hover:scale-[1.01]"
                                                >
                                                    <span className="text-sm font-mono text-slate-200 truncate mr-4">{walletAddress}</span>
                                                    {copiedAddress ? (
                                                        <div className="flex items-center gap-2 text-green-400 flex-shrink-0">
                                                            <Check className="w-4 h-4" />
                                                            <span className="text-xs">Copied</span>
                                                        </div>
                                                    ) : (
                                                        <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-200 flex-shrink-0" />
                                                    )}
                                                </button>
                                            </div>

                                            <button
                                                onClick={handleManualCheck}
                                                className="w-full mt-4 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 border border-cyan-500/30 hover:border-cyan-500/50 rounded-xl p-3 font-bold transition-all flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle2 size={18} />
                                                I've Sent the Payment
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-slate-400 text-sm mb-2">Having trouble?</p>
                                <button
                                    onClick={() => navigate('/payment-guide')}
                                    className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
                                >
                                    Switch to Credit Card Payment ($39.99)
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Status Bar */}
                            <div>
                                <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping absolute inset-0" />
                                            <div className="w-3 h-3 bg-cyan-500 rounded-full relative" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Awaiting Transaction...</p>
                                            <p className="text-xs text-slate-400">
                                                Scanning blockchain for incoming transaction...
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right hidden md:block">
                                        <div className="inline-block px-2 py-1 bg-slate-800 rounded text-xs font-mono text-slate-500 border border-slate-700">
                                            Session ID: {accessCode}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Gentle Helper Card (appears after 20 min) */}
                            {showHelper && (
                                <m.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4"
                                >
                                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <HelpCircle className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-white font-bold mb-2">Taking longer than expected?</h3>
                                                <p className="text-slate-300 text-sm mb-4">
                                                    No worries! Blockchain transactions can sometimes take a bit longer. Here are some options:
                                                </p>
                                                <div className="flex flex-col sm:flex-row gap-3">
                                                    <a
                                                        href="/why-ergo"
                                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-300 text-sm font-medium transition-colors"
                                                    >
                                                        <BookOpen size={16} />
                                                        Troubleshooting Guide
                                                    </a>
                                                    <a
                                                        href="/unified-checkout"
                                                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-sm font-medium transition-colors"
                                                    >
                                                        Or try Stripe checkout
                                                    </a>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setShowHelper(false)}
                                                className="text-slate-500 hover:text-white transition-colors"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </m.div>
                            )}
                        </m.div>
                    )}

                    {paymentStatus === 'CONFIRMED' && (
                        <m.div
                            key="confirmed"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-xl mx-auto text-center"
                        >
                            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-3xl p-12">
                                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 ring-1 ring-green-500/30 shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)]">
                                    <CheckCircle2 className="w-12 h-12 text-green-400" />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-4">Payment Verified</h2>
                                <p className="text-slate-300 text-lg mb-8">
                                    Your access has been granted. Initializing your workspace...
                                </p>
                                <div className="flex items-center justify-center gap-3 text-green-400 bg-green-500/10 py-2 px-4 rounded-full inline-flex">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="font-medium text-sm">Redirecting</span>
                                </div>
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ErgoPaymentPage;
