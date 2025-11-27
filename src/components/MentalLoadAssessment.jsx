import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cloud, Wind, CheckCircle } from 'lucide-react';

const MentalLoadAssessment = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 'night_worry',
            text: "How often do you lie awake thinking about tasks?",
            options: [
                { label: "Rarely / Never", score: 1 },
                { label: "Sometimes (1-2x/week)", score: 3 },
                { label: "Often (3+ nights/week)", score: 5 }
            ]
        },
        {
            id: 'overwhelm',
            text: "How often do you feel overwhelmed by logistics?",
            options: [
                { label: "Rarely", score: 1 },
                { label: "Weekly", score: 3 },
                { label: "Daily", score: 5 }
            ]
        },
        {
            id: 'memory_load',
            text: "How many things are you 'trying to remember' right now?",
            options: [
                { label: "0-2 things", score: 1 },
                { label: "3-5 things", score: 3 },
                { label: "Too many to count", score: 5 }
            ]
        },
        {
            id: 'relaxation',
            text: "When did you last feel truly relaxed without guilt?",
            options: [
                { label: "Today/Yesterday", score: 1 },
                { label: "Last week", score: 3 },
                { label: "Can't remember", score: 5 }
            ]
        },
        {
            id: 'wind_down',
            text: "Do you have an established wind-down routine?",
            options: [
                { label: "Yes, consistent", score: 0 },
                { label: "Sort of / Inconsistent", score: 2 },
                { label: "No", score: 4 }
            ]
        }
    ];

    const handleAnswer = (score) => {
        const newAnswers = { ...answers, [questions[step].id]: score };
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setShowResults(true);
        }
    };

    const calculateResults = () => {
        const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
        const maxScore = 24; // Max possible based on options

        // Normalize to 1-10 scale
        const normalizedScore = Math.round((totalScore / maxScore) * 10);

        let level = "Low Load";
        let recommendation = "Maintain your systems";
        let action = "Optimize wind-down";

        if (normalizedScore >= 8) {
            level = "Critical Overload";
            recommendation = "Immediate offloading required";
            action = "Brain Dump & System Reset";
        } else if (normalizedScore >= 5) {
            level = "Heavy Load";
            recommendation = "Systemize recurring decisions";
            action = "Implement Evening Wind-Down";
        }

        return { score: normalizedScore, level, recommendation, action };
    };

    const results = showResults ? calculateResults() : null;

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Brain className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Mental Load Assessment</h3>
            </div>

            {!showResults ? (
                <div className="space-y-6">
                    <div className="flex justify-between text-sm text-slate-400 mb-4">
                        <span>Question {step + 1} of {questions.length}</span>
                        <span>{Math.round(((step) / questions.length) * 100)}% Complete</span>
                    </div>

                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <h4 className="text-xl text-white font-medium mb-6">{questions[step].text}</h4>
                        <div className="space-y-3">
                            {questions[step].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option.score)}
                                    className="w-full text-left p-4 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-cyan-500 hover:bg-cyan-900/10 transition-all text-slate-300 hover:text-white"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="text-center mb-8">
                        <div className="text-6xl font-bold text-cyan-400 mb-2">{results.score}/10</div>
                        <div className="text-slate-400">Mental Load Score</div>
                        <div className="text-xl font-bold text-white mt-2">{results.level}</div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-cyan-400">
                                <Cloud size={18} />
                                <span className="text-sm">Primary Strategy</span>
                            </div>
                            <div className="text-lg font-bold text-white">{results.recommendation}</div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-green-400">
                                <CheckCircle size={18} />
                                <span className="text-sm">First Action Step</span>
                            </div>
                            <div className="text-lg font-bold text-green-400">{results.action}</div>
                        </div>
                    </div>

                    <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30 mb-6">
                        <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                            <Wind size={20} />
                            Captain's Insight
                        </h4>
                        <p className="text-white">
                            {results.score > 7
                                ? "You're carrying too much in your head. It's not a capacity failure; it's a system failure. Let's move those 'trying to remember' items into a trusted system immediately."
                                : "You have some load, but it's manageable. Focus on refining your wind-down routine to fully disconnect in the evenings."}
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setStep(0);
                            setAnswers({});
                            setShowResults(false);
                        }}
                        className="w-full text-slate-400 hover:text-white transition-colors"
                    >
                        Retake Assessment
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default MentalLoadAssessment;
