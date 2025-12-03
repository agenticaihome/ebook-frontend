import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Target, Calendar, Flag, CheckCircle, ArrowRight } from 'lucide-react';

const GoalHierarchyBuilder = () => {
    const [step, setStep] = useState(0);
    const [goals, setGoals] = useState({
        yearlyVision: ['', '', ''],
        quarterlyTargets: ['', '', ''],
        monthlyMilestones: ['', '', ''],
        weeklyPriorities: ['', '', '', '', '']
    });
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (section, index, value) => {
        const newSection = [...goals[section]];
        newSection[index] = value;
        setGoals({ ...goals, [section]: newSection });
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        else setShowResults(true);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const renderInputStep = (title, subtitle, section, count, placeholder) => (
        <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <p className="text-slate-400">{subtitle}</p>
            </div>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="relative">
                    <span className="absolute left-4 top-4 text-slate-400 font-mono text-sm">0{i + 1}</span>
                    <input
                        type="text"
                        value={goals[section][i]}
                        onChange={(e) => handleInputChange(section, i, e.target.value)}
                        placeholder={placeholder}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-4 pl-12 text-white focus:border-cyan-500 outline-none transition-all"
                    />
                </div>
            ))}
            <div className="flex gap-4 mt-8">
                {step > 0 && (
                    <button onClick={prevStep} className="flex-1 py-4 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 transition-all">
                        Back
                    </button>
                )}
                <button onClick={nextStep} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                    {step === 3 ? 'Generate Hierarchy' : 'Next Level'} <ArrowRight size={20} />
                </button>
            </div>
        </m.div>
    );

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600 my-8">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-600 pb-4">
                <Target className="text-cyan-400" size={28} />
                <div>
                    <h3 className="text-xl font-bold text-white">Goal Hierarchy Builder</h3>
                    <p className="text-xs text-slate-400">Align your daily actions with your yearly vision</p>
                </div>
            </div>

            {!showResults ? (
                <div>
                    {step === 0 && renderInputStep(
                        "Yearly Vision",
                        "What are your 1-3 big themes for this year?",
                        "yearlyVision",
                        3,
                        "e.g. Financial Freedom, Health Transformation"
                    )}
                    {step === 1 && renderInputStep(
                        "Quarterly Targets",
                        "What would success look like in 90 days?",
                        "quarterlyTargets",
                        3,
                        "e.g. Save $5k, Run 5k, Launch Website"
                    )}
                    {step === 2 && renderInputStep(
                        "Monthly Milestones",
                        "What needs to happen THIS month?",
                        "monthlyMilestones",
                        3,
                        "e.g. Set up auto-save, Train 3x/week"
                    )}
                    {step === 3 && renderInputStep(
                        "Weekly Priorities",
                        "What are the top 3-5 priorities for THIS week?",
                        "weeklyPriorities",
                        5,
                        "e.g. Open savings account, Buy running shoes"
                    )}
                </div>
            ) : (
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Your Life Operating System</h3>
                        <p className="text-slate-400">Strategic Alignment Document</p>
                    </div>

                    <div className="space-y-6 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500 opacity-30 hidden md:block"></div>

                        <div className="bg-slate-900/80 p-6 rounded-xl border border-cyan-500/30 relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-400 border border-cyan-500/50">
                                    <Flag size={20} />
                                </div>
                                <h4 className="text-lg font-bold text-cyan-400">Yearly Vision</h4>
                            </div>
                            <ul className="space-y-2 pl-16">
                                {goals.yearlyVision.map((g, i) => g && <li key={i} className="text-white list-disc">{g}</li>)}
                            </ul>
                        </div>

                        <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-600 relative z-10 ml-0 md:ml-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-600">
                                    <Calendar size={18} />
                                </div>
                                <h4 className="text-lg font-bold text-white">Quarterly Targets</h4>
                            </div>
                            <ul className="space-y-2 pl-14">
                                {goals.quarterlyTargets.map((g, i) => g && <li key={i} className="text-slate-300 list-disc">{g}</li>)}
                            </ul>
                        </div>

                        <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-600 relative z-10 ml-0 md:ml-16">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-600">
                                    <CheckCircle size={16} />
                                </div>
                                <h4 className="text-lg font-bold text-white">Weekly Priorities</h4>
                            </div>
                            <ul className="space-y-2 pl-12">
                                {goals.weeklyPriorities.map((g, i) => g && <li key={i} className="text-slate-400 list-disc">{g}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                        <h4 className="text-green-400 font-bold mb-2">Captain's Command</h4>
                        <p className="text-slate-300 text-sm mb-4">
                            "I've aligned your agents. Your Calendar Agent will now prioritize '{goals.weeklyPriorities[0]}' above all else. Your Recovery Agent knows that '{goals.yearlyVision[0]}' depends on your energy."
                        </p>
                        <button
                            onClick={() => window.print()}
                            className="text-green-400 hover:text-white font-bold text-sm uppercase tracking-wider"
                        >
                            Print / Save as PDF
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            setStep(0);
                            setShowResults(false);
                        }}
                        className="w-full mt-6 text-slate-400 hover:text-white transition-colors"
                    >
                        Edit Hierarchy
                    </button>
                </m.div>
            )}
        </div>
    );
};

export default GoalHierarchyBuilder;
