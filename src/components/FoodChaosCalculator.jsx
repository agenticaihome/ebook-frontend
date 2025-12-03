import React, { useState } from 'react';
import { m } from 'framer-motion';
import { UtensilsCrossed, DollarSign, Clock, TrendingDown } from 'lucide-react';

const FoodChaosCalculator = () => {
    const [inputs, setInputs] = useState({
        grocerySpending: 250,
        takeoutSpending: 150,
        foodWaste: 30,
        foodHours: 6,
        foodStress: 6
    });
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (field, value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const calculateResults = () => {
        const { grocerySpending, takeoutSpending, foodWaste, foodHours, foodStress } = inputs;

        // Chaos score (1-10)
        let score = 0;
        score += Math.min((takeoutSpending / 50), 3); // Max 3 from takeout
        score += Math.min((foodWaste / 10), 2); // Max 2 from waste
        score += Math.min((foodHours / 2), 3); // Max 3 from time
        score += foodStress * 0.2;
        score = Math.min(Math.round(score), 10);

        // Money wasted
        const wasteAmount = (grocerySpending * foodWaste) / 100;
        const totalSpending = grocerySpending + takeoutSpending;
        const monthlyWaste = wasteAmount + (takeoutSpending * 0.5); // Half of takeout is "panic spending"

        // Time wasted
        const weeklyTimeWasted = foodHours;
        const monthlyTimeWasted = weeklyTimeWasted * 4;

        // Opportunities
        const opportunities = [];
        if (takeoutSpending >= 120) opportunities.push({ name: 'Reduce panic takeout', savings: '$' + Math.round(takeoutSpending * 0.6) + '/month' });
        if (foodWaste >= 25) opportunities.push({ name: 'Meal planning to reduce waste', savings: '$' + Math.round(wasteAmount * 4) + '/month' });
        if (foodHours >= 6) opportunities.push({ name: 'Streamline shopping & planning', savings: Math.round(foodHours * 0.4) + ' hrs/week' });

        // Estimated savings
        const monthlySavings = Math.round(monthlyWaste * 0.7);
        const timeSavings = Math.round(weeklyTimeWasted * 0.5);

        return {
            score,
            monthlyWaste: Math.round(monthlyWaste),
            monthlyTimeWasted,
            opportunities: opportunities.slice(0, 3),
            monthlySavings,
            timeSavings,
            totalSpending
        };
    };

    const results = showResults ? calculateResults() : null;

    const getScoreColor = (score) => {
        if (score <= 3) return 'text-green-400';
        if (score <= 6) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreLabel = (score) => {
        if (score <= 3) return 'Under Control';
        if (score <= 6) return 'Moderate Chaos';
        if (score <= 8) return 'High Chaos';
        return 'Food Crisis';
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <UtensilsCrossed className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Food Chaos Calculator</h3>
            </div>

            {!showResults ? (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    <div>
                        <label className="block text-white font-medium mb-3">
                            Weekly grocery spending
                        </label>
                        <input
                            type="range"
                            min="50"
                            max="500"
                            step="10"
                            value={inputs.grocerySpending}
                            onChange={(e) => handleInputChange('grocerySpending', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>$50</span>
                            <span className="text-cyan-400 font-bold">${inputs.grocerySpending}/week</span>
                            <span>$500</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            Weekly takeout/delivery spending
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="400"
                            step="10"
                            value={inputs.takeoutSpending}
                            onChange={(e) => handleInputChange('takeoutSpending', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>$0</span>
                            <span className="text-cyan-400 font-bold">${inputs.takeoutSpending}/week</span>
                            <span>$400</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            Estimated food waste percentage
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            step="5"
                            value={inputs.foodWaste}
                            onChange={(e) => handleInputChange('foodWaste', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0%</span>
                            <span className="text-cyan-400 font-bold">{inputs.foodWaste}%</span>
                            <span>50%</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            Hours spent on food-related tasks per week
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={inputs.foodHours}
                            onChange={(e) => handleInputChange('foodHours', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>1 hour</span>
                            <span className="text-cyan-400 font-bold">{inputs.foodHours} hours</span>
                            <span>20 hours</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            Stress level around food (1-10)
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs.foodStress}
                            onChange={(e) => handleInputChange('foodStress', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>Low (1)</span>
                            <span className="text-cyan-400 font-bold">{inputs.foodStress}</span>
                            <span>High (10)</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(true)}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all mt-4"
                    >
                        Calculate My Food Chaos
                    </button>
                </m.div>
            ) : (
                <m.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="text-center mb-8">
                        <div className="mb-4">
                            <div className={`text-6xl font-bold ${getScoreColor(results.score)}`}>
                                {results.score}/10
                            </div>
                            <div className="text-slate-400 mt-2">{getScoreLabel(results.score)}</div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 p-6 rounded-xl border border-red-500/30">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign size={20} className="text-red-400" />
                                <div className="text-sm text-slate-400">Money Wasted Monthly</div>
                            </div>
                            <div className="text-red-400 font-bold text-3xl">${results.monthlyWaste}</div>
                            <div className="text-xs text-slate-500 mt-1">${results.monthlyWaste * 12}/year!</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/10 p-6 rounded-xl border border-orange-500/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock size={20} className="text-orange-400" />
                                <div className="text-sm text-slate-400">Time Wasted Monthly</div>
                            </div>
                            <div className="text-orange-400 font-bold text-3xl">{results.monthlyTimeWasted} hrs</div>
                            <div className="text-xs text-slate-500 mt-1">That's {Math.round(results.monthlyTimeWasted / 8)} work days!</div>
                        </div>
                    </div>

                    {results.opportunities.length > 0 && (
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-6">
                            <h4 className="text-white font-bold mb-4">Top 3 Opportunities for Improvement</h4>
                            <div className="space-y-3">
                                {results.opportunities.map((opp, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                        <div className="text-white font-medium">{opp.name}</div>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                                            Save {opp.savings}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-6 bg-gradient-to-r from-green-900/20 to-cyan-900/20 rounded-xl border border-green-500/30">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingDown className="text-green-400" size={24} />
                            <h4 className="text-white font-bold">Estimated Savings with Kitchen Agent</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-slate-400 mb-1">Monthly Savings</div>
                                <div className="text-green-400 font-bold text-2xl">${results.monthlySavings}</div>
                                <div className="text-xs text-slate-500 mt-1">${results.monthlySavings * 12}/year</div>
                            </div>
                            <div>
                                <div className="text-sm text-slate-400 mb-1">Time Saved Weekly</div>
                                <div className="text-cyan-400 font-bold text-2xl">{results.timeSavings} hrs</div>
                                <div className="text-xs text-slate-500 mt-1">{results.timeSavings * 52} hrs/year</div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(false)}
                        className="mt-6 w-full text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                        Recalculate
                    </button>
                </m.div>
            )}
        </div>
    );
};

export default FoodChaosCalculator;
