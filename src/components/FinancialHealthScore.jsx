import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Activity, TrendingUp, AlertCircle, ShieldCheck } from 'lucide-react';

const FinancialHealthScore = () => {
    const [inputs, setInputs] = useState({
        monthlyIncome: 5000,
        monthlyExpenses: 4000,
        totalDebt: 5000,
        totalSavings: 2000,
        subscriptionCount: 5
    });
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (field, value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const calculateResults = () => {
        const { monthlyIncome, monthlyExpenses, totalDebt, totalSavings, subscriptionCount } = inputs;

        // Health score calculation (1-10)
        let score = 5; // Start at baseline

        // Cash flow
        const savingsRate = (monthlyIncome - monthlyExpenses) / monthlyIncome;
        if (savingsRate > 0.2) score += 2;
        else if (savingsRate > 0.1) score += 1;
        else if (savingsRate < 0) score -= 2;

        // Emergency fund (months of expenses)
        const monthsSaved = totalSavings / monthlyExpenses;
        if (monthsSaved >= 6) score += 2;
        else if (monthsSaved >= 3) score += 1;
        else if (monthsSaved < 1) score -= 1;

        // Debt to income ratio (simple proxy)
        const debtRatio = totalDebt / (monthlyIncome * 12);
        if (debtRatio === 0) score += 1;
        if (debtRatio > 0.5) score -= 1;

        // Subscription bloat
        if (subscriptionCount > 10) score -= 1;

        score = Math.max(Math.min(Math.round(score), 10), 1);

        // Vulnerability & Opportunity
        let vulnerability = "None";
        let opportunity = "Maximize Investments";

        if (savingsRate < 0) {
            vulnerability = "Negative Cash Flow";
            opportunity = "Cut Expenses / Audit Subscriptions";
        } else if (monthsSaved < 3) {
            vulnerability = "Low Emergency Fund";
            opportunity = "Build 3-Month Safety Net";
        } else if (totalDebt > 0) {
            vulnerability = "Debt Drag";
            opportunity = "Debt Snowball Method";
        }

        return { score, vulnerability, opportunity, savingsRate: (savingsRate * 100).toFixed(0) };
    };

    const results = showResults ? calculateResults() : null;

    const getScoreColor = (score) => {
        if (score >= 8) return 'text-green-400';
        if (score >= 5) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Activity className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Financial Health Score</h3>
            </div>

            {!showResults ? (
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div>
                        <label className="block text-white font-medium mb-3">Monthly Take-Home Income</label>
                        <input
                            type="range"
                            min="1000"
                            max="20000"
                            step="500"
                            value={inputs.monthlyIncome}
                            onChange={(e) => handleInputChange('monthlyIncome', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>$1k</span>
                            <span className="text-cyan-400 font-bold">${inputs.monthlyIncome}</span>
                            <span>$20k+</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">Monthly Expenses (Fixed + Variable)</label>
                        <input
                            type="range"
                            min="500"
                            max="15000"
                            step="500"
                            value={inputs.monthlyExpenses}
                            onChange={(e) => handleInputChange('monthlyExpenses', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>$500</span>
                            <span className="text-cyan-400 font-bold">${inputs.monthlyExpenses}</span>
                            <span>$15k+</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">Total Liquid Savings</label>
                        <input
                            type="range"
                            min="0"
                            max="50000"
                            step="1000"
                            value={inputs.totalSavings}
                            onChange={(e) => handleInputChange('totalSavings', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>$0</span>
                            <span className="text-cyan-400 font-bold">${inputs.totalSavings}</span>
                            <span>$50k+</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">Total Consumer Debt (Credit Cards, etc.)</label>
                        <input
                            type="range"
                            min="0"
                            max="50000"
                            step="1000"
                            value={inputs.totalDebt}
                            onChange={(e) => handleInputChange('totalDebt', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>$0</span>
                            <span className="text-cyan-400 font-bold">${inputs.totalDebt}</span>
                            <span>$50k+</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(true)}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all mt-4"
                    >
                        Calculate Health Score
                    </button>
                </m.div>
            ) : (
                <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="text-center mb-8">
                        <div className={`text-6xl font-bold ${getScoreColor(results.score)} mb-2`}>
                            {results.score}/10
                        </div>
                        <div className="text-slate-400">Financial Health Score</div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-red-400">
                                <AlertCircle size={18} />
                                <span className="text-sm">Top Vulnerability</span>
                            </div>
                            <div className="text-xl font-bold text-white">{results.vulnerability}</div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-green-400">
                                <TrendingUp size={18} />
                                <span className="text-sm">Biggest Opportunity</span>
                            </div>
                            <div className="text-xl font-bold text-green-400">{results.opportunity}</div>
                        </div>
                    </div>

                    <div className="bg-cyan-900/20 p-6 rounded-xl border border-cyan-500/30 mb-6">
                        <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                            <ShieldCheck size={20} />
                            Captain's Recommendation
                        </h4>
                        <p className="text-white text-lg">
                            {results.score < 5
                                ? "Focus on stability first. Use the Subscription Audit Tool to free up cash flow, then build your emergency fund."
                                : "You're on solid ground. Now optimize. Automate your savings transfers and review your investment allocations."}
                        </p>
                    </div>

                    <button
                        onClick={() => setShowResults(false)}
                        className="w-full text-slate-400 hover:text-white transition-colors"
                    >
                        Recalculate
                    </button>
                </m.div>
            )}
        </div>
    );
};

export default FinancialHealthScore;
