import React, { useState } from 'react';
import { CreditCard, Coins } from 'lucide-react';

export default function ErgoFeeCalculator() {
    const [coursePrice] = useState(40);

    // Constants
    const STRIPE_FIXED = 0.30;
    const STRIPE_PERCENT = 0.029;

    const ERGO_FEE = 0.01; // Approx network fee

    const stripeFee = (coursePrice * STRIPE_PERCENT) + STRIPE_FIXED;


    // Discount calculation (what I pass to user)
    const discountAmount = coursePrice * 0.50;
    const finalPrice = coursePrice - discountAmount;

    return (
        <div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-600 backdrop-blur-sm max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">The "Middleman Tax" Calculator</h3>
                <p className="text-slate-400 text-sm">See why I can afford to give you 50% off.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Traditional Path */}
                <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-6 relative">
                    <div className="absolute -top-3 left-4 bg-red-900/80 text-red-200 text-xs px-2 py-1 rounded">
                        TRADITIONAL
                    </div>
                    <div className="flex items-center gap-2 mb-4 text-red-400">
                        <CreditCard size={20} />
                        <span className="font-bold">Credit Card / PayPal</span>
                    </div>
                    <div className="space-y-2 text-sm text-slate-400">
                        <div className="flex justify-between">
                            <span>Processing Fee:</span>
                            <span className="text-red-400 font-mono">~${stripeFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Data Harvested:</span>
                            <span className="text-red-400">YES</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Intermediaries:</span>
                            <span className="text-red-400">3-4</span>
                        </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-red-900/30">
                        <div className="text-xs text-slate-400 mb-1">YOU PAY</div>
                        <div className="text-3xl font-bold text-white">${coursePrice}</div>
                    </div>
                </div>

                {/* Ergo Path */}
                <div className="bg-green-900/10 border border-green-500/30 rounded-xl p-6 relative">
                    <div className="absolute -top-3 left-4 bg-green-900/80 text-green-200 text-xs px-2 py-1 rounded">
                        ERGO WAY
                    </div>
                    <div className="flex items-center gap-2 mb-4 text-green-400">
                        <Coins size={20} />
                        <span className="font-bold">Ergo Blockchain</span>
                    </div>
                    <div className="space-y-2 text-sm text-slate-400">
                        <div className="flex justify-between">
                            <span>Network Fee:</span>
                            <span className="text-green-400 font-mono">~${ERGO_FEE.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Data Harvested:</span>
                            <span className="text-green-400">NO</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Intermediaries:</span>
                            <span className="text-green-400">0</span>
                        </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-green-500/30">
                        <div className="text-xs text-slate-400 mb-1">YOU PAY (50% OFF)</div>
                        <div className="text-3xl font-bold text-green-400">${finalPrice}</div>
                    </div>
                </div>
            </div>

            <div className="text-center bg-slate-900/50 rounded-xl p-4 border border-slate-600">
                <p className="text-slate-300 text-sm">
                    Because Ergo cuts out the middlemen, I don't pay processing fees or fraud insurance.
                    <br />
                    <span className="text-cyan-400 font-bold">I pass those savings directly to you.</span>
                </p>
            </div>
        </div>
    );
}
