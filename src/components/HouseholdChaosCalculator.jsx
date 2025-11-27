import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, AlertTriangle, DollarSign } from 'lucide-react';

const HouseholdChaosCalculator = () => {
    const [inputs, setInputs] = useState({
        emergencyRepairs: 1,
        lateFees: 2,
        emergencyRuns: 3,
        forgettingFrequency: 'sometimes',
        adminHours: 3
    });
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (field, value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const calculateResults = () => {
        const { emergencyRepairs, lateFees, emergencyRuns, forgettingFrequency, adminHours } = inputs;

        // Chaos score (1-10)
        let score = 0;
        score += Math.min(emergencyRepairs * 2, 4);
        score += Math.min(lateFees * 0.5, 2);
        score += Math.min(emergencyRuns * 0.3, 2);
        score += forgettingFrequency === 'often' ? 2 : forgettingFrequency === 'sometimes' ? 1 : 0;
        score = Math.min(Math.round(score), 10);

        // Money lost annually
        const repairCost = emergencyRepairs * 800; // Avg emergency repair
        const feesCost = lateFees * 35 * 12; // $35 per late fee
        const annualLoss = repairCost + feesCost;

        // Problem areas
        const problems = [];
        if (emergencyRepairs >= 2) problems.push('Neglected maintenance');
        if (lateFees >= 3) problems.push('Bill tracking');
        if (emergencyRuns >= 4) problems.push('Supply management');
        if (forgettingFrequency === 'often') problems.push('Task tracking');

        return { score, annualLoss, problems: problems.slice(0, 3), adminHours };
    };

    const results = showResults ? calculateResults() : null;

    const getScoreColor = (score) => {
        if (score <= 3) return 'text-green-400';
        if (score <= 6) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreLabel = (score) => {
        if (score <= 3) return 'Well Maintained';
        if (score <= 6) return 'Moderate Chaos';
        if (score <= 8) return 'High Chaos';
        return 'Crisis Mode';
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Home className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Household Chaos Score Calculator</h3>
            </div>

            {!showResults ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    <div>
                        <label className="block text-white font-medium mb-3">
                            Emergency repairs last year from neglect
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={inputs.emergencyRepairs}
                            onChange={(e) => handleInputChange('emergencyRepairs', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0</span>
                            <span className="text-cyan-400 font-bold">{inputs.emergencyRepairs}</span>
                            <span>10+</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            Late fees paid last year
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="20"
                            value={inputs.lateFees}
                            onChange={(e) => handleInputChange('lateFees', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0</span>
                            <span className="text-cyan-400 font-bold">{inputs.lateFees}</span>
                            <span>20+</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            Emergency store runs per month
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="15"
                            value={inputs.emergencyRuns}
                            onChange={(e) => handleInputChange('emergencyRuns', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0</span>
                            <span className="text-cyan-400 font-bold">{inputs.emergencyRuns}</span>
                            <span>15+</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            How often do you think "what am I forgetting?"
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {['rarely', 'sometimes', 'often'].map((freq) => (
                                <button
                                    key={freq}
                                    onClick={() => handleInputChange('forgettingFrequency', freq)}
                                    className={`p-3 rounded-xl border-2 transition-all capitalize ${inputs.forgettingFrequency === freq
                                            ? 'border-cyan-500 bg-cyan-900/20 text-white'
                                            : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                                        }`}
                                >
                                    {freq}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            Hours spent on household admin weekly
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="15"
                            value={inputs.adminHours}
                            onChange={(e) => handleInputChange('adminHours', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0 hours</span>
                            <span className="text-cyan-400 font-bold">{inputs.adminHours} hours</span>
                            <span>15 hours</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(true)}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all mt-4"
                    >
                        Calculate My Household Chaos
                    </button>
                </motion.div>
            ) : (
                <motion.div
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
                                <div className="text-sm text-slate-400">Money Lost Annually</div>
                            </div>
                            <div className="text-red-400 font-bold text-3xl">${results.annualLoss.toLocaleString()}</div>
                            <div className="text-xs text-slate-500 mt-1">From preventable issues</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/10 p-6 rounded-xl border border-orange-500/30">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle size={20} className="text-orange-400" />
                                <div className="text-sm text-slate-400">Problem Areas</div>
                            </div>
                            <div className="text-orange-400 font-bold text-3xl">{results.problems.length}</div>
                            <div className="text-xs text-slate-500 mt-1">Priority fixes needed</div>
                        </div>
                    </div>

                    {results.problems.length > 0 && (
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-6">
                            <h4 className="text-white font-bold mb-4">Top Problem Areas</h4>
                            <div className="space-y-2">
                                {results.problems.map((problem, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                                        <div className="text-white font-medium">{problem}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-6 bg-gradient-to-r from-green-900/20 to-cyan-900/20 rounded-xl border border-green-500/30">
                        <h4 className="text-white font-bold mb-3">Priority Setup Recommendations</h4>
                        <div className="space-y-2 text-sm text-slate-300">
                            <div className="flex items-start gap-2">
                                <div className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                                <div>Set up the Essential 5 maintenance reminders (HVAC, smoke detectors, car, water heater, gutters)</div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                                <div>Create a bill tracker with auto-pay where possible</div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                                <div>Track household supplies and set reorder points</div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <div className="text-green-400 font-bold">Potential Annual Savings: ${Math.round(results.annualLoss * 0.8).toLocaleString()}</div>
                            <div className="text-xs text-slate-400 mt-1">By preventing 80% of these issues</div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(false)}
                        className="mt-6 w-full text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                        Recalculate
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default HouseholdChaosCalculator;
