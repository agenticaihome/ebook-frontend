import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Award, Share2, Check } from 'lucide-react';

const EfficiencyBadge = ({ savedHours, yearlySaved }) => {
    const [copied, setCopied] = useState(false);

    const getRank = (hours) => {
        // Lower hours spent = higher efficiency rank (inverted logic)
        if (hours < 100) return { title: "Time Lord", color: "text-purple-400", bg: "from-purple-900/50 to-indigo-900/50", border: "border-purple-500" };
        if (hours < 300) return { title: "Efficiency Expert", color: "text-cyan-400", bg: "from-cyan-900/50 to-blue-900/50", border: "border-cyan-500" };
        return { title: "Productivity Seeker", color: "text-green-400", bg: "from-green-900/50 to-emerald-900/50", border: "border-green-500" };
    };

    const rank = getRank(yearlySaved);

    const shareText = `I can reclaim ${savedHours} hours/week (${yearlySaved} hours/year) with Agentic AI! 
Rank: ${rank.title} 🏆
Calculate your time back: https://agenticaihome.com`;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Efficiency Score',
                    text: shareText,
                    url: 'https://agenticaihome.com',
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(shareText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <m.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`relative overflow-hidden rounded-2xl border-2 ${rank.border} bg-gradient-to-br ${rank.bg} p-6 text-center shadow-2xl my-6`}
        >
            {/* Background Glow */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 ${rank.color.replace('text', 'bg')}/20 blur-3xl rounded-full`} />

            <div className="relative z-10">
                <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full border-2 ${rank.border} bg-slate-900/50`}>
                        <Award className={`w-8 h-8 ${rank.color}`} />
                    </div>
                </div>

                <div className="uppercase tracking-widest text-xs font-bold text-slate-400 mb-1">
                    Certified Efficiency Score
                </div>

                <div className={`text-3xl font-black text-white mb-2`}>
                    {yearlySaved} <span className="text-lg font-medium text-slate-300">hrs/year</span>
                </div>

                <div className={`inline-block px-3 py-1 rounded-full bg-slate-900/60 border ${rank.border} ${rank.color} text-sm font-bold mb-6`}>
                    {rank.title}
                </div>

                <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-bold transition-all group"
                >
                    {copied ? <Check size={18} className="text-green-400" /> : <Share2 size={18} />}
                    {copied ? "Copied to Clipboard!" : "Share Badge"}
                </button>
            </div>
        </m.div>
    );
};

export default EfficiencyBadge;
