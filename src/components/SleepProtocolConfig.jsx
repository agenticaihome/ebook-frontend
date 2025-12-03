import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Moon, Battery, Activity, Award, Check } from 'lucide-react';
import { useUser } from '../context/UserContext';
import confetti from 'canvas-confetti';

const SleepProtocolConfig = () => {
    const { unlockBadge } = useUser();
    const [minSleep, setMinSleep] = useState(6);
    const [optimalSleep, setOptimalSleep] = useState(8);
    const [redDayRules, setRedDayRules] = useState({});
    const [isSaved, setIsSaved] = useState(false);

    const rules = [
        { id: 'cancel', label: 'Cancel non-essential meetings' },
        { id: 'workout', label: 'Switch to light yoga/walk' },
        { id: 'caffeine', label: 'Cut caffeine after 12pm' },
        { id: 'decisions', label: 'Defer major decisions 24h' }
    ];

    const toggleRule = (id) => {
        setRedDayRules(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSave = () => {
        setIsSaved(true);
        unlockBadge('bio_hacker');
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#4ADE80', '#22C55E', '#16A34A'] // Green theme
        });
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Activity className="text-green-400" size={28} />
                <div>
                    <h3 className="text-2xl font-bold text-white">Configure Your Protocol</h3>
                    <p className="text-slate-400 text-sm">Define your thresholds to unlock the "Bio-Hacker" badge</p>
                </div>
            </div>

            <div className="space-y-8 mb-8">
                {/* Thresholds */}
                <div className="bg-slate-900/50 p-4 rounded-xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Battery className="text-yellow-400" size={18} /> Sleep Thresholds
                    </h4>

                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-red-400 font-bold">Red Zone (Survival)</span>
                            <span className="text-slate-300">&lt; {minSleep} hours</span>
                        </div>
                        <input
                            type="range"
                            min="4"
                            max="7"
                            step="0.5"
                            value={minSleep}
                            onChange={(e) => setMinSleep(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-green-400 font-bold">Green Zone (Peak)</span>
                            <span className="text-slate-300">&gt; {optimalSleep} hours</span>
                        </div>
                        <input
                            type="range"
                            min="7"
                            max="10"
                            step="0.5"
                            value={optimalSleep}
                            onChange={(e) => setOptimalSleep(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                        />
                    </div>
                </div>

                {/* Red Day Rules */}
                <div className="bg-slate-900/50 p-4 rounded-xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Moon className="text-purple-400" size={18} /> Red Day Protocols
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">What happens automatically when you're in the Red Zone?</p>

                    <div className="grid md:grid-cols-2 gap-3">
                        {rules.map(rule => (
                            <button
                                key={rule.id}
                                onClick={() => toggleRule(rule.id)}
                                className={`flex items-center gap-3 p-3 rounded-lg border text-sm text-left transition-all ${redDayRules[rule.id]
                                        ? 'bg-red-900/20 border-red-500/50 text-white'
                                        : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${redDayRules[rule.id] ? 'bg-red-500 border-red-500' : 'border-slate-500'
                                    }`}>
                                    {redDayRules[rule.id] && <Check size={12} className="text-white" />}
                                </div>
                                {rule.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {!isSaved ? (
                <button
                    onClick={handleSave}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                    Save Protocol & Unlock Badge
                </button>
            ) : (
                <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-900/30 border border-green-500/50 rounded-xl p-4 text-center"
                >
                    <div className="flex items-center justify-center gap-2 text-green-400 font-bold mb-1">
                        <Award size={20} /> Badge Unlocked: Bio-Hacker
                    </div>
                    <p className="text-slate-300 text-sm">Your recovery agent is now calibrated.</p>
                </m.div>
            )}
        </div>
    );
};

export default SleepProtocolConfig;
