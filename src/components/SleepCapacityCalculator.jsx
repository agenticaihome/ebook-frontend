import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Battery, Moon, Coffee, AlertTriangle } from 'lucide-react';
import CaptainTooltip from './tools/CaptainTooltip';

const SleepCapacityCalculator = () => {
    const [inputs, setInputs] = useState({
        hoursSlept: 7,
        sleepQuality: 7,
        disruptions: 'none',
        consecutiveBadNights: 0,
        sleepDebt: 0
    });
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (field, value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const calculateResults = () => {
        const { hoursSlept, sleepQuality, disruptions, consecutiveBadNights, sleepDebt } = inputs;

        // Base capacity starts at 100%
        let capacity = 100;

        // Deduct for hours slept (assuming 8 is target)
        if (hoursSlept < 8) capacity -= (8 - hoursSlept) * 10;

        // Deduct for quality
        if (sleepQuality < 8) capacity -= (8 - sleepQuality) * 5;

        // Deduct for disruptions
        if (disruptions === 'minor') capacity -= 10;
        if (disruptions === 'significant') capacity -= 25;

        // Deduct for consecutive bad nights (compounding)
        capacity -= consecutiveBadNights * 5;

        // Deduct for accumulated debt
        capacity -= sleepDebt * 2;

        // Clamp between 0 and 100
        capacity = Math.max(Math.min(Math.round(capacity), 100), 10);

        // Determine category
        let category = 'Green';
        if (capacity < 70) category = 'Yellow';
        if (capacity < 40) category = 'Red';

        // Recommendations
        let maxTasks = 5;
        let protocol = "Standard High-Performance";
        let caffeineCutoff = "2:00 PM";
        let recoveryTime = "1 night";

        if (category === 'Yellow') {
            maxTasks = 3;
            protocol = "Moderate Load / Protect Recovery";
            caffeineCutoff = "12:00 PM";
            recoveryTime = "1-2 nights";
        } else if (category === 'Red') {
            maxTasks = 1;
            protocol = "Survival Mode / Active Recovery";
            caffeineCutoff = "11:00 AM";
            recoveryTime = "3+ nights";
        }

        return { capacity, category, maxTasks, protocol, caffeineCutoff, recoveryTime };
    };

    const results = showResults ? calculateResults() : null;

    const getCategoryColor = (category) => {
        if (category === 'Green') return 'text-green-400';
        if (category === 'Yellow') return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Battery className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Sleep Capacity Calculator</h3>
            </div>

            {!showResults ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div>
                        <label className="block text-white font-medium mb-3">Hours slept last night</label>
                        <input
                            type="range"
                            min="0"
                            max="12"
                            step="0.5"
                            value={inputs.hoursSlept}
                            onChange={(e) => handleInputChange('hoursSlept', parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0 hrs</span>
                            <span className="text-cyan-400 font-bold">{inputs.hoursSlept} hrs</span>
                            <span>12 hrs</span>
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center text-white font-medium mb-3">
                            Sleep Quality (1-10)
                            <CaptainTooltip content="Rate based on how refreshed you felt upon waking, not just duration. 10 = Woke up naturally without an alarm." />
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs.sleepQuality}
                            onChange={(e) => handleInputChange('sleepQuality', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>Terrible (1)</span>
                            <span className="text-cyan-400 font-bold">{inputs.sleepQuality}</span>
                            <span>Perfect (10)</span>
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center text-white font-medium mb-3">
                            Disruptions
                            <CaptainTooltip content="Minor = 1-2 brief awakenings. Significant = 30+ mins awake or multiple interruptions (e.g., kids, pets)." />
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {['none', 'minor', 'significant'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleInputChange('disruptions', opt)}
                                    className={`p-3 rounded-xl border-2 transition-all capitalize text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputs.disruptions === opt
                                        ? 'border-cyan-500 bg-cyan-900/20 text-white'
                                        : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white font-medium mb-3 text-sm">Consecutive bad nights</label>
                            <input
                                type="number"
                                min="0"
                                max="14"
                                value={inputs.consecutiveBadNights}
                                onChange={(e) => handleInputChange('consecutiveBadNights', parseInt(e.target.value))}
                                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                        </div>
                        <div>
                            <label className="flex items-center text-white font-medium mb-3 text-sm">
                                Est. Sleep Debt (hrs)
                                <CaptainTooltip content="Rough estimate of missed hours relative to your need over the last 14 days." />
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="50"
                                value={inputs.sleepDebt}
                                onChange={(e) => handleInputChange('sleepDebt', parseInt(e.target.value))}
                                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(true)}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all mt-4"
                    >
                        Calculate Capacity
                    </button>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="text-center mb-8">
                        <div className={`text-6xl font-bold ${getCategoryColor(results.category)} mb-2`}>
                            {results.capacity}%
                        </div>
                        <div className="text-slate-400">Daily Capacity Score</div>
                        <div className={`text-xl font-bold mt-2 ${getCategoryColor(results.category)}`}>
                            {results.category.toUpperCase()} DAY
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-6">
                        <h4 className="text-white font-bold mb-4">Recommended Protocol</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <span className="text-slate-400">Strategy</span>
                                <span className="text-white font-medium text-right">{results.protocol}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <span className="text-slate-400">Max Major Tasks</span>
                                <span className="text-white font-medium">{results.maxTasks}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <span className="text-slate-400">Caffeine Cutoff</span>
                                <span className="text-white font-medium">{results.caffeineCutoff}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Est. Recovery Time</span>
                                <span className="text-white font-medium">{results.recoveryTime}</span>
                            </div>
                        </div>
                    </div>

                    {results.category === 'Red' && (
                        <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/30 flex items-start gap-3 mb-6">
                            <AlertTriangle className="text-red-400 flex-shrink-0 mt-1" size={20} />
                            <div>
                                <div className="text-red-400 font-bold">Survival Mode Activated</div>
                                <p className="text-slate-300 text-sm">
                                    Your cognitive function is significantly impaired. Do not attempt deep work or critical decisions today. Focus on rest.
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => setShowResults(false)}
                        className="w-full text-slate-400 hover:text-white transition-colors"
                    >
                        Recalculate
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default SleepCapacityCalculator;
