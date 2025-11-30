import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, CheckCircle } from 'lucide-react';

const StudySystemGenerator = () => {
    const [step, setStep] = useState(0);
    const [inputs, setInputs] = useState({
        examType: '',
        examDate: '',
        hoursPerWeek: 10,
        weakAreas: ''
    });
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (field, value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        else setShowResults(true);
    };

    const generatePlan = () => {
        const { examType, hoursPerWeek, weakAreas } = inputs;

        // Simple logic to generate a plan structure
        const totalHours = hoursPerWeek * 12; // Assume 12 week default horizon if no date logic
        const weakAreaFocus = Math.round(totalHours * 0.4);
        const practiceFocus = Math.round(totalHours * 0.3);
        const reviewFocus = Math.round(totalHours * 0.3);

        return {
            examType: examType || "Certification Exam",
            totalHours,
            weakAreaFocus,
            practiceFocus,
            reviewFocus,
            weakAreas: weakAreas || "General Knowledge",
            schedule: [
                { phase: "Phase 1: Foundation", focus: "Weak Areas Deep Dive", duration: "4 weeks" },
                { phase: "Phase 2: Application", focus: "Practice Questions & Cases", duration: "4 weeks" },
                { phase: "Phase 3: Integration", focus: "Mock Exams & Timed Review", duration: "4 weeks" }
            ]
        };
    };

    const plan = showResults ? generatePlan() : null;

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Study System Generator</h3>
            </div>

            {!showResults ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {step === 0 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                            <label className="block text-white font-medium mb-3">What are you studying for?</label>
                            <input
                                type="text"
                                placeholder="e.g. Board Exams, PMP, Bar Exam"
                                value={inputs.examType}
                                onChange={(e) => handleInputChange('examType', e.target.value)}
                                className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white mb-4 focus:border-cyan-500 outline-none"
                            />
                            <button onClick={nextStep} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all">
                                Next
                            </button>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                            <label className="block text-white font-medium mb-3">How many hours can you study per week?</label>
                            <input
                                type="range"
                                min="5"
                                max="40"
                                value={inputs.hoursPerWeek}
                                onChange={(e) => handleInputChange('hoursPerWeek', parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 mb-2"
                            />
                            <div className="text-center text-cyan-400 font-bold text-xl mb-6">{inputs.hoursPerWeek} hours</div>
                            <button onClick={nextStep} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all">
                                Next
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                            <label className="block text-white font-medium mb-3">What are your weakest topics?</label>
                            <textarea
                                placeholder="e.g. Pharmacology, Ethics, Case Management"
                                value={inputs.weakAreas}
                                onChange={(e) => handleInputChange('weakAreas', e.target.value)}
                                className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white mb-4 h-32 focus:border-cyan-500 outline-none"
                            />
                            <button onClick={nextStep} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all">
                                Next
                            </button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                            <div className="text-center mb-6">
                                <h4 className="text-white font-bold text-xl mb-2">Ready to generate?</h4>
                                <p className="text-slate-400">We'll build a custom plan based on your inputs.</p>
                            </div>
                            <button onClick={nextStep} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all">
                                Generate Study System
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="text-center mb-8">
                        <div className="text-2xl font-bold text-white mb-1">{plan.examType} Plan</div>
                        <div className="text-cyan-400 font-mono text-sm">OPTIMIZED STUDY ARCHITECTURE</div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 text-center">
                            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Weak Areas</div>
                            <div className="text-2xl font-bold text-red-400">{plan.weakAreaFocus} hrs</div>
                            <div className="text-xs text-slate-500">Deep Dive</div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 text-center">
                            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Practice</div>
                            <div className="text-2xl font-bold text-yellow-400">{plan.practiceFocus} hrs</div>
                            <div className="text-xs text-slate-500">Active Recall</div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 text-center">
                            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Review</div>
                            <div className="text-2xl font-bold text-green-400">{plan.reviewFocus} hrs</div>
                            <div className="text-xs text-slate-500">Spaced Repetition</div>
                        </div>
                    </div>

                    <div className="bg-slate-900/30 rounded-xl border border-slate-700 p-6 mb-6">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Calendar size={20} className="text-cyan-400" />
                            Your Adaptive Schedule
                        </h4>
                        <div className="space-y-4">
                            {plan.schedule.map((phase, i) => (
                                <div key={i} className="flex items-start gap-4 p-3 bg-slate-800/50 rounded-lg">
                                    <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-400 font-bold text-sm flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold">{phase.phase}</div>
                                        <div className="text-sm text-slate-300">{phase.focus}</div>
                                        <div className="text-xs text-slate-500 mt-1">{phase.duration}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/30 flex items-start gap-3 mb-6">
                        <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                        <div>
                            <div className="text-green-400 font-bold">System Recommendation</div>
                            <p className="text-slate-300 text-sm">
                                Based on your weak areas ({plan.weakAreas}), we recommend creating a <strong>Case Database</strong> in your Second Brain to track specific examples and outcomes.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setStep(0);
                            setShowResults(false);
                        }}
                        className="w-full text-slate-400 hover:text-white transition-colors"
                    >
                        Create New Plan
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default StudySystemGenerator;
