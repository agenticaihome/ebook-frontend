import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaywallGate = () => {
    return (
        <div className="relative py-12">
            {/* Blurred Content Preview */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/90 to-white z-10" />
            <div className="blur-sm select-none opacity-50 pointer-events-none space-y-6 max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-slate-800">Advanced Agent Configuration</h2>
                <p className="text-lg text-slate-600">
                    Now that we've covered the basics, let's dive into the advanced configuration of your home server.
                    This step is crucial for ensuring that your agents can communicate securely...
                </p>
                <div className="h-64 bg-slate-100 rounded-xl" />
                <p className="text-lg text-slate-600">
                    By setting up a reverse proxy, we can expose specific services while keeping the rest of your network hidden.
                    Here is the exact Nginx configuration you'll need...
                </p>
            </div>

            {/* Gate Card */}
            <div className="relative z-20 max-w-2xl mx-auto px-4 -mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-8 text-center overflow-hidden relative"
                >
                    {/* Decorative Background */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-blue-600" />
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        Unlock the Full Guide
                    </h2>
                    <p className="text-slate-600 mb-8 max-w-md mx-auto">
                        You've reached the end of the free preview. Upgrade now to access all 5 parts, 15 chapters, and the complete agent code library.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <Link
                            to="/payment-guide"
                            className="group relative p-4 rounded-xl border-2 border-slate-100 hover:border-green-500 transition-all bg-white hover:bg-green-50 text-left"
                        >
                            <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                                50% OFF
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Coins className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">Pay with Ergo</div>
                                    <div className="text-xs text-slate-500">Crypto Payment</div>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-green-600">$20</div>
                        </Link>

                        <Link
                            to="/payment-guide"
                            className="group p-4 rounded-xl border-2 border-slate-100 hover:border-purple-500 transition-all bg-white hover:bg-purple-50 text-left"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <CreditCard className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">Pay with Card</div>
                                    <div className="text-xs text-slate-500">Secure Stripe</div>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-purple-600">$40</div>
                        </Link>
                    </div>

                    <p className="text-xs text-slate-400">
                        Already purchased? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default PaywallGate;
