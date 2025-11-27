import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, AlertCircle } from 'lucide-react';

const EmailChaosCalculator = () => {
    const [inputs, setInputs] = useState({
        dailyEmails: 50,
        dailyHours: 2,
        checkFrequency: 'hourly',
        painPoint: 'distraction'
    });
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (field, value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const calculateResults = () => {
        const { dailyEmails, dailyHours, checkFrequency, painPoint } = inputs;

        // Chaos score calculation (1-10)
        let score = 0;
        score += Math.min(dailyEmails / 20, 3); // Max 3
        score += Math.min(dailyHours, 3); // Max 3

        const freqScore = {
            'constant': 4,
            'hourly': 3,
            'few_times': 1,
            'once': 0
        };
        score += freqScore[checkFrequency] || 2;

        score = Math.min(Math.round(score), 10);

        // Hours wasted
        const weeklyHours = dailyHours * 5;
        const annualHours = weeklyHours * 50; // 50 work weeks

        // Recoverable hours (assuming 40% efficiency gain with agent)
        const recoverableWeekly = Math.round(weeklyHours * 0.4);
        const recoverableAnnual = Math.round(annualHours * 0.4);

        // Recommendation
        let recommendation = "";
        if (painPoint === 'distraction') recommendation = "Turn off notifications and set 3 specific check times.";
        else if (painPoint === 'volume') recommendation = "Implement the Triage Agent to filter noise.";
        else if (painPoint === 'response') recommendation = "Use the Response Drafting Agent for routine replies.";
        else recommendation = "Start with the Triage system.";

        return { score, weeklyHours, annualHours, recoverableWeekly, recoverableAnnual, recommendation };
    };

    const results = showResults ? calculateResults() : null;

    const getScoreColor = (score) => {
        if (score <= 3) return 'text-green-400';
        if (score <= 6) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Mail className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Email Chaos Calculator</h3>
            </div>

            {!showResults ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div>
                        <label className="block text-white font-medium mb-3">Emails received per day (estimate)</label>
                        <input
                            type="range"
                            min="10"
                            max="200"
                            value={inputs.dailyEmails}
                            onChange={(e) => handleInputChange('dailyEmails', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>10</span>
                            <span className="text-cyan-400 font-bold">{inputs.dailyEmails}</span>
                            <span>200+</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">Hours spent on email daily</label>
                        <input
                            type="range"
                            min="0.5"
                            max="6"
                            step="0.5"
                            value={inputs.dailyHours}
                            onChange={(e) => handleInputChange('dailyHours', parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0.5 hrs</span>
                            <span className="text-cyan-400 font-bold">{inputs.dailyHours} hrs</span>
                            <span>6+ hrs</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">How often do you check email?</label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { val: 'constant', label: 'Constantly / Notifications' },
                                { val: 'hourly', label: 'Every hour' },
                                { val: 'few_times', label: '3-4 times a day' },
                                { val: 'once', label: 'Once or twice' }
                            ].map((opt) => (
                                <button
                                    key={opt.val}
                                    onClick={() => handleInputChange('checkFrequency', opt.val)}
                                    className={`p-3 rounded-xl border-2 transition-all text-sm ${inputs.checkFrequency === opt.val
                                            ? 'border-cyan-500 bg-cyan-900/20 text-white'
                                            : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">Biggest email pain point</label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { val: 'distraction', label: 'Constant distraction' },
                                { val: 'volume', label: 'Too many emails' },
                                { val: 'response', label: 'Writing replies' },
                                { val: 'anxiety', label: 'Fear of missing out' }
                            ].map((opt) => (
                                <button
                                    key={opt.val}
                                    onClick={() => handleInputChange('painPoint', opt.val)}
                                    className={`p-3 rounded-xl border-2 transition-all text-sm ${inputs.painPoint === opt.val
                                            ? 'border-cyan-500 bg-cyan-900/20 text-white'
                                            : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600'
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
                        Calculate Email Chaos
                    </button>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="text-center mb-8">
                        <div className={`text-6xl font-bold ${getScoreColor(results.score)} mb-2`}>
                            {results.score}/10
                        </div>
                        <div className="text-slate-400">Email Chaos Score</div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-slate-400">
                                <Clock size={18} />
                                <span className="text-sm">Hours Wasted Annually</span>
                            </div>
                            <div className="text-2xl font-bold text-white">{results.annualHours} hours</div>
                            <div className="text-xs text-slate-500 mt-1">That's {Math.round(results.annualHours / 8)} work days!</div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-green-400">
                                <Clock size={18} />
                                <span className="text-sm">Recoverable with Agent</span>
                            </div>
                            <div className="text-2xl font-bold text-green-400">{results.recoverableAnnual} hours</div>
                            <div className="text-xs text-slate-500 mt-1">~{results.recoverableWeekly} hours per week back</div>
                        </div>
                    </div>

                    <div className="bg-cyan-900/20 p-6 rounded-xl border border-cyan-500/30 mb-6">
                        <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                            <AlertCircle size={20} />
                            Priority Recommendation
                        </h4>
                        <p className="text-white text-lg">{results.recommendation}</p>
                    </div>

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

export default EmailChaosCalculator;
