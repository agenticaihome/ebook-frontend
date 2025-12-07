import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { Activity, TrendingUp, AlertCircle, Award, Lock, Share2 } from 'lucide-react';
import { useUser } from '../context/UserContext';

const STORAGE_KEY = 'mentalLoadCalculator';

const MentalLoadCalculator = () => {
    const { unlockBadge } = useUser();
    const [inputs, setInputs] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {
            emailHours: 2,
            adminHours: 5,
            recurringTasks: 10,
            forgetFrequency: 'sometimes',
            stressLevel: 5
        };
    });
    const [showResults, setShowResults] = useState(false);
    const [unlockedTip, setUnlockedTip] = useState(null);

    // Save to localStorage whenever inputs change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
    }, [inputs]);

    const handleInputChange = (field, value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const calculateResults = () => {
        const { emailHours, adminHours, recurringTasks, forgetFrequency, stressLevel } = inputs;

        // Mental load score calculation (1-10)
        let score = 0;
        score += Math.min(emailHours * 1.5, 3); // Max 3 points from email
        score += Math.min(adminHours * 0.4, 2); // Max 2 points from admin
        score += Math.min(recurringTasks * 0.15, 2); // Max 2 points from tasks
        score += forgetFrequency === 'often' ? 2 : forgetFrequency === 'sometimes' ? 1 : 0;
        score += stressLevel * 0.1;
        score = Math.min(Math.round(score), 10);

        // Efficiency Score (0-100%) - Inverted from Load
        // Lower load = Higher Efficiency
        const efficiencyScore = Math.max(0, 100 - (score * 10));

        // Hours recoverable
        const recoverable = Math.round(emailHours * 0.5 + adminHours * 0.6);

        // Top intervention areas
        const areas = [];
        if (emailHours >= 2) areas.push({ name: 'Email Management', impact: 'High', agent: 'Email Agent' });
        if (adminHours >= 4) areas.push({ name: 'Life Admin', impact: 'High', agent: 'Morning Agent' });
        if (recurringTasks >= 15) areas.push({ name: 'Task Tracking', impact: 'Medium', agent: 'Household Agent' });
        if (stressLevel >= 7) areas.push({ name: 'Decision Fatigue', impact: 'High', agent: 'Calendar Agent' });

        // Comparison
        const avgScore = 65; // Average efficiency
        const comparison = efficiencyScore > avgScore ? 'above' : efficiencyScore < avgScore ? 'below' : 'at';

        return { score: efficiencyScore, rawLoad: score, recoverable, areas: areas.slice(0, 3), comparison, avgScore };
    };

    const handleCalculate = () => {
        const results = calculateResults();
        setShowResults(true);

        // Gamification: Unlock Badges & Tips
        if (results.score >= 90) {
            unlockBadge('time_lord');
            setUnlockedTip({
                title: '🏆 Rank: TIME LORD',
                content: 'You have mastered your time. You spend almost zero time on admin. You are ready for Level 2: Creative Automation.'
            });
        } else if (results.score >= 60) {
            unlockBadge('efficiency_seeker');
            setUnlockedTip({
                title: 'Rank: Efficiency Seeker',
                content: 'You have good baseline control. Now focus on speed. Use "Text Replacement" for your most common email replies to save another 15 mins/day.'
            });
        } else {
            unlockBadge('chaos_survivor');
            setUnlockedTip({
                title: 'Rank: Chaos Survivor',
                content: 'Your load is critical. Stop trying to remember. Spend 15 mins writing down EVERY open loop. Then, assign 3 to an agent and delete the rest.'
            });
        }
    };

    const results = showResults ? calculateResults() : null;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 50) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreLabel = (score) => {
        if (score >= 90) return 'Time Lord Status';
        if (score >= 70) return 'Highly Efficient';
        if (score >= 50) return 'Moderate Load';
        return 'Critical Overload';
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Activity className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Mental Load Calculator</h3>
            </div>

            {!showResults ? (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    <div>
                        <label htmlFor="emailHours" className="block text-white font-medium mb-3">
                            Hours spent on email daily
                        </label>
                        <input
                            id="emailHours"
                            type="range"
                            min="0"
                            max="8"
                            step="0.5"
                            value={inputs.emailHours}
                            onChange={(e) => handleInputChange('emailHours', parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0 hours</span>
                            <span className="text-cyan-400 font-bold">{inputs.emailHours} hours</span>
                            <span>8 hours</span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="adminHours" className="block text-white font-medium mb-3">
                            Hours spent on "life admin" weekly
                        </label>
                        <input
                            id="adminHours"
                            type="range"
                            min="0"
                            max="20"
                            value={inputs.adminHours}
                            onChange={(e) => handleInputChange('adminHours', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0 hours</span>
                            <span className="text-cyan-400 font-bold">{inputs.adminHours} hours</span>
                            <span>20 hours</span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="recurringTasks" className="block text-white font-medium mb-3">
                            Number of recurring tasks you track mentally
                        </label>
                        <input
                            id="recurringTasks"
                            type="range"
                            min="0"
                            max="50"
                            value={inputs.recurringTasks}
                            onChange={(e) => handleInputChange('recurringTasks', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0 tasks</span>
                            <span className="text-cyan-400 font-bold">{inputs.recurringTasks} tasks</span>
                            <span>50+ tasks</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            How often do you forget important things?
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {['rarely', 'sometimes', 'often'].map((freq) => (
                                <button
                                    key={freq}
                                    onClick={() => handleInputChange('forgetFrequency', freq)}
                                    className={`p-3 rounded-xl border-2 transition-all capitalize ${inputs.forgetFrequency === freq
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
                        <label htmlFor="stressLevel" className="block text-white font-medium mb-3">
                            Stress level around managing daily life (1-10)
                        </label>
                        <input
                            id="stressLevel"
                            type="range"
                            min="1"
                            max="10"
                            value={inputs.stressLevel}
                            onChange={(e) => handleInputChange('stressLevel', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>Low (1)</span>
                            <span className="text-cyan-400 font-bold">{inputs.stressLevel}</span>
                            <span>High (10)</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCalculate}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all mt-4"
                    >
                        Calculate My Mental Load
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
                                {results.score}%
                            </div>
                            <div className="text-slate-400 mt-2">{getScoreLabel(results.score)}</div>
                        </div>
                        <div className="inline-flex items-center gap-2 text-sm text-slate-400">
                            <TrendingUp size={16} />
                            <span>
                                You're {results.comparison} the course average ({results.avgScore})
                            </span>
                        </div>
                    </div>

                    {/* Gamification Reward */}
                    {unlockedTip && (
                        <m.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 p-6 rounded-xl mb-8 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Award size={80} className="text-yellow-500" />
                            </div>
                            <div className="flex items-start gap-4 relative z-10">
                                <div className="bg-yellow-500/20 p-3 rounded-full">
                                    <Lock size={24} className="text-yellow-400" />
                                </div>
                                <div>
                                    <div className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-1">Reward Unlocked</div>
                                    <h4 className="text-white font-bold text-lg mb-2">{unlockedTip.title}</h4>
                                    <p className="text-slate-300 text-sm">{unlockedTip.content}</p>
                                </div>
                            </div>
                        </m.div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 p-6 rounded-xl border border-cyan-500/30">
                            <div className="text-sm text-slate-400 mb-1">Hours Potentially Recoverable</div>
                            <div className="text-cyan-400 font-bold text-3xl">{results.recoverable} hrs/week</div>
                            <div className="text-xs text-slate-400 mt-2">
                                That's {results.recoverable * 52} hours per year!
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 p-6 rounded-xl border border-purple-500/30">
                            <div className="text-sm text-slate-400 mb-1">Intervention Priority</div>
                            <div className="text-purple-400 font-bold text-3xl">{results.areas.length} areas</div>
                            <div className="text-xs text-slate-400 mt-2">
                                Focus here for maximum impact
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-600">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertCircle className="text-cyan-400" size={20} />
                            <h4 className="text-white font-bold">Top 3 Areas for Agent Intervention</h4>
                        </div>
                        <div className="space-y-3">
                            {results.areas.map((area, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                    <div>
                                        <div className="text-white font-medium">{area.name}</div>
                                        <div className="text-sm text-slate-400">Recommended: {area.agent}</div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${area.impact === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                        {area.impact} Impact
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SOCIAL SHARE - VIRAL MOMENT */}
                    <div className="mt-6 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-xl p-4 border border-cyan-500/30">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <Share2 className="text-cyan-400" size={18} />
                                <span className="text-slate-300 text-sm">Share your results!</span>
                            </div>
                            <button
                                onClick={() => {
                                    const text = `My efficiency score: ${results.score}%! I could reclaim ${results.recoverable} hrs/week with AI agents. Taking the Agentic AI Adventure 🚀 #AgenticAI #Productivity`;
                                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=https://agenticaihome.com`, '_blank');
                                }}
                                className="flex items-center gap-2 bg-black hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                Share Score
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(false)}
                        className="mt-4 w-full text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                        Recalculate
                    </button>
                </m.div>
            )}
        </div>
    );
};

export default MentalLoadCalculator;
