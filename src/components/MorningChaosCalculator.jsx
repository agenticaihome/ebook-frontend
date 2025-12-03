import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Coffee, AlertCircle, Clock } from 'lucide-react';

const MorningChaosCalculator = () => {
    const [inputs, setInputs] = useState({
        snoozeCount: 2,
        appsChecked: 5,
        forgetThings: 'sometimes',
        lateFrequency: 'sometimes',
        stressLevel: 5
    });
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (field, value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const calculateResults = () => {
        const { snoozeCount, appsChecked, forgetThings, lateFrequency, stressLevel } = inputs;

        // Chaos score calculation (1-10)
        let score = 0;
        score += Math.min(snoozeCount * 1.5, 3); // Max 3 from snoozing
        score += Math.min(appsChecked * 0.5, 2.5); // Max 2.5 from apps
        score += forgetThings === 'often' ? 2 : forgetThings === 'sometimes' ? 1 : 0;
        score += lateFrequency === 'often' ? 2 : lateFrequency === 'sometimes' ? 1 : 0;
        score += stressLevel * 0.15;
        score = Math.min(Math.round(score), 10);

        // Minutes wasted
        const minutesWasted = snoozeCount * 9 + appsChecked * 5 + (forgetThings === 'often' ? 15 : 10);

        // Annual time lost
        const annualHours = Math.round((minutesWasted * 365) / 60);

        // Top chaos sources
        const sources = [];
        if (snoozeCount >= 3) sources.push({ name: 'Excessive snoozing', impact: 'High' });
        if (appsChecked >= 5) sources.push({ name: 'App checking addiction', impact: 'High' });
        if (forgetThings === 'often') sources.push({ name: 'Forgetting items', impact: 'Medium' });
        if (lateFrequency === 'often') sources.push({ name: 'Chronic lateness', impact: 'High' });
        if (stressLevel >= 7) sources.push({ name: 'Morning stress', impact: 'High' });

        // First fix recommendation
        let firstFix = 'Start with a Morning Brief';
        if (snoozeCount >= 3) firstFix = 'Set alarm for actual wake time (no snooze)';
        else if (appsChecked >= 6) firstFix = 'Replace app checking with Morning Brief';
        else if (forgetThings === 'often') firstFix = 'Night-before prep checklist';

        return { score, minutesWasted, annualHours, sources: sources.slice(0, 3), firstFix };
    };

    const results = showResults ? calculateResults() : null;

    const getScoreColor = (score) => {
        if (score <= 3) return 'text-green-400';
        if (score <= 6) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreLabel = (score) => {
        if (score <= 3) return 'Smooth Sailing';
        if (score <= 6) return 'Moderate Chaos';
        if (score <= 8) return 'High Chaos';
        return 'Complete Mayhem';
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Coffee className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Morning Chaos Score Calculator</h3>
            </div>

            {!showResults ? (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    <div>
                        <label className="block text-white font-medium mb-3">
                            How many times do you hit snooze?
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={inputs.snoozeCount}
                            onChange={(e) => handleInputChange('snoozeCount', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0 times</span>
                            <span className="text-cyan-400 font-bold">{inputs.snoozeCount} times</span>
                            <span>10+ times</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            How many apps do you check before leaving?
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="15"
                            value={inputs.appsChecked}
                            onChange={(e) => handleInputChange('appsChecked', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0 apps</span>
                            <span className="text-cyan-400 font-bold">{inputs.appsChecked} apps</span>
                            <span>15+ apps</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            How often do you forget things?
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {['rarely', 'sometimes', 'often'].map((freq) => (
                                <button
                                    key={freq}
                                    onClick={() => handleInputChange('forgetThings', freq)}
                                    className={`p-3 rounded-xl border-2 transition-all capitalize ${inputs.forgetThings === freq
                                            ? 'border-cyan-500 bg-cyan-900/20 text-white'
                                            : 'border-slate-600 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                                        }`}
                                >
                                    {freq}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            How often do you leave late?
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {['rarely', 'sometimes', 'often'].map((freq) => (
                                <button
                                    key={freq}
                                    onClick={() => handleInputChange('lateFrequency', freq)}
                                    className={`p-3 rounded-xl border-2 transition-all capitalize ${inputs.lateFrequency === freq
                                            ? 'border-cyan-500 bg-cyan-900/20 text-white'
                                            : 'border-slate-600 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                                        }`}
                                >
                                    {freq}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            Stress level on average morning (1-10)
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs.stressLevel}
                            onChange={(e) => handleInputChange('stressLevel', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>Calm (1)</span>
                            <span className="text-cyan-400 font-bold">{inputs.stressLevel}</span>
                            <span>Panic (10)</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(true)}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all mt-4"
                    >
                        Calculate My Morning Chaos
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

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 p-6 rounded-xl border border-red-500/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock size={20} className="text-red-400" />
                                <div className="text-sm text-slate-400">Minutes Wasted Daily</div>
                            </div>
                            <div className="text-red-400 font-bold text-3xl">{results.minutesWasted} min</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/10 p-6 rounded-xl border border-orange-500/30">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle size={20} className="text-orange-400" />
                                <div className="text-sm text-slate-400">Annual Time Lost</div>
                            </div>
                            <div className="text-orange-400 font-bold text-3xl">{results.annualHours} hrs</div>
                            <div className="text-xs text-slate-400 mt-1">That's {Math.round(results.annualHours / 8)} work days!</div>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 p-6 rounded-xl border border-cyan-500/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Coffee size={20} className="text-cyan-400" />
                                <div className="text-sm text-slate-400">Chaos Sources</div>
                            </div>
                            <div className="text-cyan-400 font-bold text-3xl">{results.sources.length}</div>
                            <div className="text-xs text-slate-400 mt-1">Priority areas to fix</div>
                        </div>
                    </div>

                    {results.sources.length > 0 && (
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-600 mb-6">
                            <h4 className="text-white font-bold mb-4">Top Chaos Sources</h4>
                            <div className="space-y-3">
                                {results.sources.map((source, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                        <div className="text-white font-medium">{source.name}</div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${source.impact === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {source.impact} Impact
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-6 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-xl border border-cyan-500/30">
                        <h4 className="text-white font-bold mb-2">Your First Fix</h4>
                        <p className="text-cyan-400 text-lg">{results.firstFix}</p>
                        <p className="text-slate-400 text-sm mt-2">
                            Start here for maximum impact. Build your Morning Agent below!
                        </p>
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

export default MorningChaosCalculator;
