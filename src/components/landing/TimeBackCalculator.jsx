import React, { useState } from 'react';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function TimeBackCalculator() {
    const [emailHours, setEmailHours] = useState(5);
    const [choreHours, setChoreHours] = useState(4);
    const [planningHours, setPlanningHours] = useState(3);

    const totalHours = emailHours + choreHours + planningHours;
    const savedHours = Math.round(totalHours * 0.7); // Assume 70% efficiency gain
    const yearlySaved = savedHours * 52;

    return (
        <div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700 backdrop-blur-sm">
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
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
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
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
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
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 rounded-xl p-6 border border-cyan-500/30 text-center">
                <div className="text-slate-400 text-sm mb-1">POTENTIAL TIME RECLAIMED</div>
                <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="text-yellow-400 w-6 h-6" />
                    {savedHours} Hours <span className="text-lg text-slate-400 font-normal">/ week</span>
                </div>
                <div className="text-cyan-400 font-mono text-sm">
                    That's {yearlySaved} hours per year!
                </div>
            </div>
        </div>
    );
}
