import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Clock, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const PersonalizedLaunchPlanGenerator = () => {
    const [step, setStep] = useState(0);
    const [inputs, setInputs] = useState({
        timePerDay: 30,
        painPoint: 'chaos',
        tools: 'basic',
        family: false
    });
    const [showPlan, setShowPlan] = useState(false);

    const handleInput = (field, value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        else setShowPlan(true);
    };

    const generatePlan = () => {
        const plan = [
            { week: 1, focus: "Foundation", tasks: ["Setup Morning Brief", "Create Food Profile", "First Meal Plan"] },
            { week: 2, focus: "Systems", tasks: ["Essential 5 Maintenance", "Email Triage Rules", "Bill Reminders"] },
            { week: 3, focus: "Optimization", tasks: ["Time Audit", "Recovery Protocol", "Focus Blocks"] },
            { week: 4, focus: "Integration", tasks: ["Goal Hierarchy", "Weekly Review Ritual", "Second Brain Setup"] }
        ];

        // Customization Logic
        if (inputs.timePerDay < 20) {
            plan[0].tasks = ["Setup Morning Brief (Simple)", "Quick Meal List"];
            plan[1].tasks = ["One Maintenance Reminder", "Unsubscribe 5 Lists"];
        }

        if (inputs.painPoint === 'overwhelm') {
            plan[0].focus = "Mental Clarity";
            plan[0].tasks = ["Brain Dump", "Morning Brief", "Email Bankruptcy"];
        }

        if (inputs.family) {
            plan[1].tasks.push("Family Calendar Sync");
            plan[0].tasks.push("Dinner Vote System");
        }

        return plan;
    };

    const plan = showPlan ? generatePlan() : [];

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Rocket className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Your 30-Day Launch Plan</h3>
            </div>

            {!showPlan ? (
                <div className="space-y-6">
                    {step === 0 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                            <label className="block text-white font-medium mb-4">How much time can you invest daily?</label>
                            <div className="space-y-3">
                                {[15, 30, 60].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => { handleInput('timePerDay', t); nextStep(); }}
                                        className="w-full text-left p-4 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-cyan-500 hover:bg-cyan-900/10 transition-all text-slate-300 hover:text-white"
                                    >
                                        {t} minutes
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                            <label className="block text-white font-medium mb-4">What's your biggest pain point?</label>
                            <div className="space-y-3">
                                {[
                                    { label: "Chaos / Disorganization", value: "chaos" },
                                    { label: "Overwhelm / Stress", value: "overwhelm" },
                                    { label: "Procrastination", value: "procrastination" }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => { handleInput('painPoint', opt.value); nextStep(); }}
                                        className="w-full text-left p-4 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-cyan-500 hover:bg-cyan-900/10 transition-all text-slate-300 hover:text-white"
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                            <label className="block text-white font-medium mb-4">Do you need to coordinate with family?</label>
                            <div className="space-y-3">
                                <button onClick={() => { handleInput('family', true); nextStep(); }} className="w-full text-left p-4 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-cyan-500 transition-all text-slate-300 hover:text-white">Yes, I have a partner/kids</button>
                                <button onClick={() => { handleInput('family', false); nextStep(); }} className="w-full text-left p-4 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-cyan-500 transition-all text-slate-300 hover:text-white">No, just me</button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                            <div className="text-center mb-6">
                                <h4 className="text-white font-bold text-xl mb-2">Ready to launch?</h4>
                                <p className="text-slate-400">We've built a custom roadmap based on your {inputs.timePerDay} min/day commitment.</p>
                            </div>
                            <button onClick={nextStep} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all">
                                Generate My Plan
                            </button>
                        </motion.div>
                    )}
                </div>
            ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="text-center mb-8">
                        <div className="text-3xl font-bold text-white mb-2">Your 30-Day Roadmap</div>
                        <div className="text-cyan-400 font-mono text-sm">CUSTOMIZED ACTION PLAN</div>
                    </div>

                    <div className="space-y-6">
                        {plan.map((week, i) => (
                            <div key={i} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Calendar size={64} />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-400 font-bold border border-cyan-500/30">
                                        {week.week}
                                    </div>
                                    <h4 className="text-xl font-bold text-white">Week {week.week}: {week.focus}</h4>
                                </div>
                                <ul className="space-y-3 pl-11">
                                    {week.tasks.map((task, j) => (
                                        <li key={j} className="flex items-center gap-3 text-slate-300">
                                            <CheckCircle size={16} className="text-slate-600" />
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-6 rounded-xl border border-cyan-500/30 text-center">
                        <h4 className="text-white font-bold mb-2">Captain's Promise</h4>
                        <p className="text-slate-300 text-sm mb-4">
                            "If you follow this plan for 30 days, you will save 500+ hours over the next year. The only way to fail is to not start."
                        </p>
                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold transition-all"
                        >
                            Print Roadmap
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            setStep(0);
                            setShowPlan(false);
                        }}
                        className="w-full mt-6 text-slate-500 hover:text-white transition-colors"
                    >
                        Create New Plan
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default PersonalizedLaunchPlanGenerator;
