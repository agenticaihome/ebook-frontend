import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Calendar, Check, Clock, Shield } from 'lucide-react';

const CalendarHealthScore = () => {
    const [inputs, setInputs] = useState({
        meetingHours: 15,
        longestBlock: 2,
        acceptanceRate: 80,
        interruptionFreq: 'daily'
    });
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (field, value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const calculateResults = () => {
        const { meetingHours, longestBlock, acceptanceRate, interruptionFreq } = inputs;

        // Health score calculation (1-10)
        let score = 10;

        // Deduct for meeting hours (ideal < 10)
        if (meetingHours > 10) score -= Math.min((meetingHours - 10) / 5, 4);

        // Deduct for short blocks (ideal > 3h)
        if (longestBlock < 3) score -= (3 - longestBlock) * 1.5;

        // Deduct for high acceptance (ideal < 70% for ICs, maybe higher for managers but let's assume need for control)
        if (acceptanceRate > 70) score -= (acceptanceRate - 70) / 10;

        // Deduct for interruptions
        if (interruptionFreq === 'daily') score -= 2;
        if (interruptionFreq === 'hourly') score -= 4;

        score = Math.max(Math.round(score), 1);

        // Problem area
        let problem = "General Overload";
        if (meetingHours > 20) problem = "Meeting Fatigue";
        else if (longestBlock < 2) problem = "Fragmentation";
        else if (acceptanceRate > 90) problem = "Lack of Boundaries";
        else if (interruptionFreq === 'hourly') problem = "Constant Interruption";

        // Recoverable hours (simple estimate)
        const recoverable = Math.round(meetingHours * 0.3); // 30% reduction target

        // Fix
        let fix = "Implement Time Architecture";
        if (problem === "Meeting Fatigue") fix = "Decline 20% of meetings next week";
        if (problem === "Fragmentation") fix = "Block 2h Deep Work daily";
        if (problem === "Lack of Boundaries") fix = "Set 'No Meeting' blocks";

        return { score, problem, recoverable, fix };
    };

    const results = showResults ? calculateResults() : null;

    const getScoreColor = (score) => {
        if (score >= 8) return 'text-green-400';
        if (score >= 5) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Calendar Health Score</h3>
            </div>

            {!showResults ? (
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div>
                        <label className="block text-white font-medium mb-3">Hours in meetings per week</label>
                        <input
                            type="range"
                            min="0"
                            max="40"
                            value={inputs.meetingHours}
                            onChange={(e) => handleInputChange('meetingHours', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-300 mt-2">
                            <span>0 hrs</span>
                            <span className="text-cyan-400 font-bold">{inputs.meetingHours} hrs</span>
                            <span>40+ hrs</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">Longest uninterrupted work block (avg)</label>
                        <input
                            type="range"
                            min="0"
                            max="8"
                            step="0.5"
                            value={inputs.longestBlock}
                            onChange={(e) => handleInputChange('longestBlock', parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-300 mt-2">
                            <span>0 hrs</span>
                            <span className="text-cyan-400 font-bold">{inputs.longestBlock} hrs</span>
                            <span>8 hrs</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">Percentage of meetings you accept</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={inputs.acceptanceRate}
                            onChange={(e) => handleInputChange('acceptanceRate', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-300 mt-2">
                            <span>Selectively (0%)</span>
                            <span className="text-cyan-400 font-bold">{inputs.acceptanceRate}%</span>
                            <span>Everything (100%)</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">How often does deep work get interrupted?</label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { val: 'hourly', label: 'Constantly / Hourly' },
                                { val: 'daily', label: 'Daily' },
                                { val: 'weekly', label: 'Rarely / Weekly' },
                                { val: 'never', label: 'Never' }
                            ].map((opt) => (
                                <button
                                    key={opt.val}
                                    onClick={() => handleInputChange('interruptionFreq', opt.val)}
                                    className={`p-3 rounded-xl border-2 transition-all text-sm ${inputs.interruptionFreq === opt.val
                                            ? 'border-cyan-500 bg-cyan-900/20 text-white'
                                            : 'border-slate-600 bg-slate-900/50 text-slate-300 hover:border-slate-600'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
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
                        <div className="text-slate-300">Calendar Health Score</div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-600">
                            <div className="flex items-center gap-2 mb-2 text-red-400">
                                <Shield size={18} />
                                <span className="text-sm">Biggest Problem</span>
                            </div>
                            <div className="text-xl font-bold text-white">{results.problem}</div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-600">
                            <div className="flex items-center gap-2 mb-2 text-green-400">
                                <Clock size={18} />
                                <span className="text-sm">Recoverable Hours</span>
                            </div>
                            <div className="text-2xl font-bold text-green-400">{results.recoverable} hrs/week</div>
                            <div className="text-xs text-slate-300 mt-1">Potential gain</div>
                        </div>
                    </div>

                    <div className="bg-cyan-900/20 p-6 rounded-xl border border-cyan-500/30 mb-6">
                        <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                            <Check size={20} />
                            Recommended First Fix
                        </h4>
                        <p className="text-white text-lg">{results.fix}</p>
                    </div>

                    <button
                        onClick={() => setShowResults(false)}
                        className="w-full text-slate-300 hover:text-white transition-colors"
                    >
                        Recalculate
                    </button>
                </m.div>
            )}
        </div>
    );
};

export default CalendarHealthScore;
