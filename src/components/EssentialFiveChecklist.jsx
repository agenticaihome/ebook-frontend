import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { CheckCircle, Shield, DollarSign, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';
import confetti from 'canvas-confetti';

const EssentialFiveChecklist = () => {
    const { unlockBadge } = useUser();
    const [checkedItems, setCheckedItems] = useState({});
    const [isComplete, setIsComplete] = useState(false);

    const items = [
        { id: 'hvac', name: 'HVAC Filter', freq: 'Every 90 days', icon: '🌡️' },
        { id: 'smoke', name: 'Smoke Detectors', freq: 'Every 6 months', icon: '🔥' },
        { id: 'car', name: 'Car Registration', freq: 'Annually', icon: '🚗' },
        { id: 'water', name: 'Water Heater', freq: 'Annually', icon: '💧' },
        { id: 'gutters', name: 'Gutter Cleaning', freq: 'Twice yearly', icon: '🏠' }
    ];

    const handleCheck = (id) => {
        const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newChecked);

        // Check completion
        const allChecked = items.every(item => newChecked[item.id]);
        if (allChecked && !isComplete) {
            setIsComplete(true);
            unlockBadge('home_guardian');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else if (!allChecked) {
            setIsComplete(false);
        }
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Shield className="text-cyan-400" size={28} />
                <div>
                    <h3 className="text-2xl font-bold text-white">The Essential 5 Tracker</h3>
                    <p className="text-slate-300 text-sm">Check these off to unlock your "Home Guardian" badge</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {items.map((item) => (
                    <m.button
                        key={item.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCheck(item.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${checkedItems[item.id]
                                ? 'bg-green-900/20 border-green-500/50'
                                : 'bg-slate-900/50 border-slate-600 hover:border-slate-600'
                            }`}
                    >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${checkedItems[item.id] ? 'bg-green-500 border-green-500' : 'border-slate-500'
                            }`}>
                            {checkedItems[item.id] && <CheckCircle size={14} className="text-white" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{item.icon}</span>
                                <span className={`font-bold ${checkedItems[item.id] ? 'text-green-400' : 'text-white'}`}>
                                    {item.name}
                                </span>
                            </div>
                            <div className="text-xs text-slate-300 pl-8">{item.freq}</div>
                        </div>
                    </m.button>
                ))}
            </div>

            {isComplete && (
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/50 rounded-xl p-6 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Award size={100} className="text-green-500" />
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-1 rounded-full text-green-400 font-bold text-sm mb-4">
                            <Award size={16} /> Badge Unlocked: Home Guardian
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">
                            Potential Savings Unlocked: ~$3,500/year
                        </h4>
                        <p className="text-slate-300 text-sm max-w-lg mx-auto">
                            By automating these 5 reminders, you've prevented the most common and expensive home disasters.
                        </p>
                    </div>
                </m.div>
            )}
        </div>
    );
};

export default EssentialFiveChecklist;
