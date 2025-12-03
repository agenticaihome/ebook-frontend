import React, { useState } from 'react';
import EfficiencyBadge from './EfficiencyBadge';
import { Clock, Sparkles, Download, Lock } from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import {
    TwitterShareButton,
    LinkedinShareButton,
    FacebookShareButton,
    TwitterIcon,
    LinkedinIcon,
    FacebookIcon
} from 'react-share';

export default function TimeBackCalculator() {
    const [emailHours, setEmailHours] = useState(5);
    const [choreHours, setChoreHours] = useState(4);
    const [planningHours, setPlanningHours] = useState(3);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const { playChime } = useSound();

    const totalHours = emailHours + choreHours + planningHours;
    const savedHours = Math.round(totalHours * 0.7); // Assume 70% efficiency gain
    const yearlySaved = savedHours * 52;

    const shareUrl = "https://agenticaihome.com";
    const shareTitle = `I just found out I can reclaim ${savedHours} hours/week with Agentic AI! Check your potential savings:`;

    const handleShare = () => {
        // "Soft" verification: Listen for window focus after they return from the share dialog
        const checkFocus = () => {
            window.removeEventListener('focus', checkFocus);
            // Add a small delay to make it feel like we're "verifying"
            setTimeout(() => {
                setIsUnlocked(true);
                playChime('success');
                // Optional: Track the "unlock" event
                try {
                    const unlocks = JSON.parse(localStorage.getItem('agent_unlocks') || '[]');
                    unlocks.push({ type: 'triage_agent', timestamp: new Date().toISOString() });
                    localStorage.setItem('agent_unlocks', JSON.stringify(unlocks));
                } catch (e) { }
            }, 1000);
        };

        window.addEventListener('focus', checkFocus);
    };

    return (
        <div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-600 backdrop-blur-sm">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                    <Clock className="text-cyan-400" /> Time Back Calculator
                </h3>
                <p className="text-slate-400 text-sm">Estimate your current "Life Admin" load per week</p>
            </div>

            <div className="space-y-6 mb-8">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Email & Digital Clutter</span>
                        <span className="text-cyan-400 font-mono">{emailHours} hrs/wk</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={emailHours}
                        onChange={(e) => setEmailHours(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Household Chores & Meal Prep</span>
                        <span className="text-cyan-400 font-mono">{choreHours} hrs/wk</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={choreHours}
                        onChange={(e) => setChoreHours(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Planning & Scheduling</span>
                        <span className="text-cyan-400 font-mono">{planningHours} hrs/wk</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={planningHours}
                        onChange={(e) => setPlanningHours(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>
            </div>

            <EfficiencyBadge savedHours={savedHours} yearlySaved={yearlySaved} />

            {/* Referral / Unlock System */}
            <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-600 text-center">
                {!isUnlocked ? (
                    <div>
                        <div className="flex items-center justify-center gap-2 text-white font-bold mb-2">
                            <Lock size={16} className="text-slate-400" />
                            Unlock Free Agent Template
                        </div>
                        <p className="text-xs text-slate-400 mb-4">
                            Share your results to unlock a free "Daily Triage Agent" template.
                        </p>
                        <div className="flex justify-center gap-4" onClickCapture={handleShare}>
                            <TwitterShareButton url={shareUrl} title={shareTitle} hashtags={["AgenticAI", "Productivity"]}>
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <LinkedinShareButton url={shareUrl} title={shareTitle} summary={shareTitle} source="Agentic AI at Home">
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                            <FacebookShareButton url={shareUrl} quote={shareTitle} hashtag="#AgenticAI">
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in zoom-in duration-500">
                        <div className="flex items-center justify-center gap-2 text-green-400 font-bold mb-2">
                            <Sparkles size={16} />
                            Template Unlocked!
                        </div>
                        <a
                            href="/triage-agent.json"
                            download="Daily_Triage_Agent.json"
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                        >
                            <Download size={16} />
                            Download Triage Agent (.json)
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
