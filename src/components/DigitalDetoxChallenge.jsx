import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Mail, Bell, Shield, CheckCircle, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';
import confetti from 'canvas-confetti';

const DigitalDetoxChallenge = () => {
    const { unlockBadge } = useUser();
    const [checkedItems, setCheckedItems] = useState({});
    const [isComplete, setIsComplete] = useState(false);

    const items = [
        { id: 'unsub', name: 'Unsubscribe from 5 Newsletters', icon: '📧', desc: 'Search "unsubscribe" in inbox' },
        { id: 'notif', name: 'Turn Off Non-Human Notifications', icon: '🔕', desc: 'Social media, news, shopping apps' },
        { id: 'vip', name: 'Set Up VIP List', icon: '⭐', desc: 'Only spouse/boss/emergency bypass DND' },
        { id: 'batch', name: 'Schedule Email Batches', icon: '⏰', desc: 'Check only at 10am, 2pm, 4pm' }
    ];

    const handleCheck = (id) => {
        const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newChecked);

        const allChecked = items.every(item => newChecked[item.id]);
        if (allChecked && !isComplete) {
            setIsComplete(true);
            unlockBadge('digital_zen');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#60A5FA', '#818CF8', '#A78BFA'] // Blue/Indigo theme
            });
        } else if (!allChecked) {
            setIsComplete(false);
        }
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Shield className="text-blue-400" size={28} />
                <div>
                    <h3 className="text-2xl font-bold text-white">Digital Detox Challenge</h3>
                    <p className="text-slate-400 text-sm">Complete these steps to unlock the "Digital Zen" badge</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {items.map((item) => (
                    <m.button
                        key={item.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCheck(item.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${checkedItems[item.id]
                                ? 'bg-blue-900/20 border-blue-500/50'
                                : 'bg-slate-900/50 border-slate-600 hover:border-slate-600'
                            }`}
                    >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${checkedItems[item.id] ? 'bg-blue-500 border-blue-500' : 'border-slate-500'
                            }`}>
                            {checkedItems[item.id] && <CheckCircle size={14} className="text-white" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{item.icon}</span>
                                <span className={`font-bold ${checkedItems[item.id] ? 'text-blue-400' : 'text-white'}`}>
                                    {item.name}
                                </span>
                            </div>
                            <div className="text-xs text-slate-400 pl-8">{item.desc}</div>
                        </div>
                    </m.button>
                ))}
            </div>

            {isComplete && (
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/50 rounded-xl p-6 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Award size={100} className="text-blue-500" />
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-1 rounded-full text-blue-400 font-bold text-sm mb-4">
                            <Award size={16} /> Badge Unlocked: Digital Zen
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">
                            Attention Reclaimed!
                        </h4>
                        <p className="text-slate-300 text-sm max-w-lg mx-auto">
                            You've built the first layer of your digital defense system. Your focus is now protected.
                        </p>
                    </div>
                </m.div>
            )}
        </div>
    );
};

export default DigitalDetoxChallenge;
