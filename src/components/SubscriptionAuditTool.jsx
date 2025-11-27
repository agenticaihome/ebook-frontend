import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, TrendingDown, AlertTriangle } from 'lucide-react';

const SubscriptionAuditTool = () => {
    const [subscriptions, setSubscriptions] = useState([
        { id: 1, name: 'Netflix', cost: 15.99, frequency: 'monthly', status: 'keep' },
        { id: 2, name: 'Spotify', cost: 10.99, frequency: 'monthly', status: 'keep' },
        { id: 3, name: 'Gym', cost: 49.99, frequency: 'monthly', status: 'review' },
        { id: 4, name: 'Amazon Prime', cost: 139.00, frequency: 'yearly', status: 'keep' }
    ]);
    const [newSub, setNewSub] = useState({ name: '', cost: '', frequency: 'monthly' });
    const [showResults, setShowResults] = useState(false);

    const addSubscription = () => {
        if (newSub.name && newSub.cost) {
            setSubscriptions([...subscriptions, { ...newSub, id: Date.now(), cost: parseFloat(newSub.cost), status: 'review' }]);
            setNewSub({ name: '', cost: '', frequency: 'monthly' });
        }
    };

    const updateStatus = (id, status) => {
        setSubscriptions(subscriptions.map(sub => sub.id === id ? { ...sub, status } : sub));
    };

    const calculateResults = () => {
        let monthlyTotal = 0;
        let potentialSavings = 0;

        subscriptions.forEach(sub => {
            let monthlyCost = sub.frequency === 'yearly' ? sub.cost / 12 : sub.cost;
            monthlyTotal += monthlyCost;
            if (sub.status === 'cancel') {
                potentialSavings += monthlyCost;
            }
        });

        return {
            monthlyTotal: monthlyTotal.toFixed(2),
            annualTotal: (monthlyTotal * 12).toFixed(2),
            potentialSavings: potentialSavings.toFixed(2),
            annualSavings: (potentialSavings * 12).toFixed(2),
            cancelCount: subscriptions.filter(s => s.status === 'cancel').length
        };
    };

    const results = calculateResults();

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Subscription Audit Tool</h3>
            </div>

            <div className="space-y-6">
                {/* Input Section */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                    <h4 className="text-white font-bold mb-4">Add Your Subscriptions</h4>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Name (e.g. Netflix)"
                            value={newSub.name}
                            onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
                            className="flex-1 p-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm"
                        />
                        <input
                            type="number"
                            placeholder="Cost"
                            value={newSub.cost}
                            onChange={(e) => setNewSub({ ...newSub, cost: e.target.value })}
                            className="w-24 p-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm"
                        />
                        <select
                            value={newSub.frequency}
                            onChange={(e) => setNewSub({ ...newSub, frequency: e.target.value })}
                            className="p-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm"
                        >
                            <option value="monthly">/mo</option>
                            <option value="yearly">/yr</option>
                        </select>
                        <button
                            onClick={addSubscription}
                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold text-sm"
                        >
                            Add
                        </button>
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {subscriptions.map(sub => (
                            <div key={sub.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                <div>
                                    <div className="text-white font-medium">{sub.name}</div>
                                    <div className="text-xs text-slate-400">${sub.cost} / {sub.frequency}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => updateStatus(sub.id, 'keep')}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${sub.status === 'keep' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
                                            }`}
                                    >
                                        Keep
                                    </button>
                                    <button
                                        onClick={() => updateStatus(sub.id, 'review')}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${sub.status === 'review' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-700 text-slate-400'
                                            }`}
                                    >
                                        Review
                                    </button>
                                    <button
                                        onClick={() => updateStatus(sub.id, 'cancel')}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${sub.status === 'cancel' ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-400'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Results Section */}
                <motion.div layout className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-2 mb-2 text-slate-400">
                            <DollarSign size={18} />
                            <span className="text-sm">Total Monthly Cost</span>
                        </div>
                        <div className="text-2xl font-bold text-white">${results.monthlyTotal}</div>
                        <div className="text-xs text-slate-500 mt-1">${results.annualTotal} / year</div>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-2 mb-2 text-green-400">
                            <TrendingDown size={18} />
                            <span className="text-sm">Potential Savings</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">${results.potentialSavings}</div>
                        <div className="text-xs text-slate-500 mt-1">${results.annualSavings} / year if cancelled</div>
                    </div>
                </motion.div>

                {results.cancelCount > 0 && (
                    <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/30 flex items-start gap-3">
                        <AlertTriangle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                        <div>
                            <div className="text-green-400 font-bold">Action Item</div>
                            <p className="text-slate-300 text-sm">
                                You've identified {results.cancelCount} subscriptions to cancel.
                                Doing this today saves you <strong>${results.annualSavings}</strong> this year.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionAuditTool;
