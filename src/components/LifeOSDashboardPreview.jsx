import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { Shield, Zap, Activity, Award, CheckCircle, Lock } from 'lucide-react';
import { useUser } from '../context/UserContext';
import confetti from 'canvas-confetti';

const LifeOSDashboardPreview = () => {
    const { userState, unlockBadge } = useUser();
    const [systemHealth, setSystemHealth] = useState(0);

    // Calculate "System Health" based on unlocked badges
    const badges = userState?.unlockedBadges || [];
    const totalBadges = 5; // Total possible badges in the course
    const healthPercentage = Math.min(100, Math.round((badges.length / totalBadges) * 100));

    useEffect(() => {
        // Animate health bar
        const timer = setTimeout(() => {
            setSystemHealth(healthPercentage);
            if (badges.length >= 3) {
                unlockBadge('chief_automation_officer');
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#A855F7', '#EC4899', '#8B5CF6'] // Purple/Pink theme
                });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [badges.length, healthPercentage, unlockBadge]);

    const badgeList = [
        { id: 'chaos_survivor', name: 'Chaos Survivor', icon: '🌪️' },
        { id: 'home_guardian', name: 'Home Guardian', icon: '🏠' },
        { id: 'digital_zen', name: 'Digital Zen', icon: '🧘' },
        { id: 'bio_hacker', name: 'Bio-Hacker', icon: '🧬' },
        { id: 'chief_automation_officer', name: 'Chief Automation Officer', icon: '👑' }
    ];

    return (
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-600 my-12 shadow-2xl relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Zap className="text-yellow-400" /> LifeOS System Status
                        </h3>
                        <p className="text-slate-400 text-sm">Agentic Architecture v1.0</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-mono font-bold text-cyan-400">{systemHealth}%</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Optimization Level</div>
                    </div>
                </div>

                {/* Health Bar */}
                <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden mb-8 border border-slate-600">
                    <m.div
                        initial={{ width: 0 }}
                        animate={{ width: `${systemHealth}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                    />
                </div>

                {/* Badge Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {badgeList.map((badge) => {
                        const isUnlocked = badges.includes(badge.id);
                        return (
                            <div
                                key={badge.id}
                                className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${isUnlocked
                                        ? 'bg-slate-800/80 border-cyan-500/50 shadow-lg shadow-cyan-900/20'
                                        : 'bg-slate-900/50 border-slate-800 opacity-50'
                                    }`}
                            >
                                <div className="text-3xl mb-2 filter drop-shadow-lg">
                                    {isUnlocked ? badge.icon : <Lock size={24} className="text-slate-600 mx-auto" />}
                                </div>
                                <div className={`text-xs font-bold ${isUnlocked ? 'text-white' : 'text-slate-600'}`}>
                                    {badge.name}
                                </div>
                                {isUnlocked && (
                                    <div className="mt-2 text-[10px] text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded-full">
                                        ACTIVE
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {badges.includes('chief_automation_officer') && (
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="mt-8 p-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl border border-purple-500/50 text-center"
                    >
                        <div className="text-purple-300 font-bold mb-1">🎓 CERTIFICATION COMPLETE</div>
                        <p className="text-slate-300 text-sm">
                            You have successfully installed the core components of your Life Operating System.
                        </p>
                    </m.div>
                )}
            </div>
        </div>
    );
};

export default LifeOSDashboardPreview;
