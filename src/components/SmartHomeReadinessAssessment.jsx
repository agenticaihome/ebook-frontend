import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Lock, Zap } from 'lucide-react';

const SmartHomeReadinessAssessment = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 'ecosystem',
            text: "What phones do most people in your home use?",
            options: [
                { label: "iPhone (Apple)", value: "apple" },
                { label: "Android (Samsung, Pixel, etc.)", value: "google" },
                { label: "Mix of both", value: "alexa" }
            ]
        },
        {
            id: 'current_devices',
            text: "Do you already own any smart speakers?",
            options: [
                { label: "No / Not sure", value: "none" },
                { label: "Amazon Echo / Alexa", value: "alexa" },
                { label: "Google Nest / Home", value: "google" },
                { label: "Apple HomePod", value: "apple" }
            ]
        },
        {
            id: 'privacy',
            text: "How concerned are you about privacy/data?",
            options: [
                { label: "Very concerned (Local only)", value: "high" },
                { label: "Moderate (Standard features)", value: "medium" },
                { label: "Low (Convenience first)", value: "low" }
            ]
        },
        {
            id: 'tech_comfort',
            text: "How comfortable are you with tech setup?",
            options: [
                { label: "I want plug-and-play", value: "low" },
                { label: "I can troubleshoot basic issues", value: "medium" },
                { label: "I love tinkering / coding", value: "high" }
            ]
        }
    ];

    const handleAnswer = (value) => {
        const newAnswers = { ...answers, [questions[step].id]: value };
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setShowResults(true);
        }
    };

    const calculateRecommendation = () => {
        let ecosystem = "Amazon Alexa";
        let reason = "Best compatibility and lowest price point.";
        let tier1 = ["Echo Dot", "Smart Plugs", "Smart Bulbs"];

        // Ecosystem Logic
        if (answers.ecosystem === 'apple' || (answers.current_devices === 'apple')) {
            ecosystem = "Apple HomeKit";
            reason = "Best for privacy and seamless iPhone integration.";
            tier1 = ["HomePod Mini", "Nanoleaf Bulbs", "Eve Smart Plug"];
        } else if (answers.ecosystem === 'google' || answers.current_devices === 'google') {
            ecosystem = "Google Home";
            reason = "Best voice recognition and Android integration.";
            tier1 = ["Nest Mini", "Cync Bulbs", "Nest Thermostat"];
        }

        // Privacy Override
        if (answers.privacy === 'high' && answers.tech_comfort === 'high') {
            ecosystem = "Home Assistant";
            reason = "Maximum privacy and local control (requires setup).";
            tier1 = ["Raspberry Pi", "Zigbee Stick", "Local Devices"];
        }

        return { ecosystem, reason, tier1 };
    };

    const result = showResults ? calculateRecommendation() : null;

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Home className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Smart Home Readiness</h3>
            </div>

            {!showResults ? (
                <div className="space-y-6">
                    <div className="flex justify-between text-sm text-slate-400 mb-4">
                        <span>Question {step + 1} of {questions.length}</span>
                        <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-cyan-500 transition-all duration-300"
                                style={{ width: `${((step) / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h4 className="text-xl text-white font-medium mb-6">{questions[step].text}</h4>
                        <div className="space-y-3">
                            {questions[step].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option.value)}
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
                        <div className="text-slate-400 mb-2">Recommended Ecosystem</div>
                        <div className="text-4xl font-bold text-white mb-4">{result.ecosystem}</div>
                        <p className="text-slate-300 max-w-md mx-auto">{result.reason}</p>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-6">
                        <h4 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                            <Zap size={20} />
                            Your Tier 1 Starter Kit
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                            {result.tier1.map((item, i) => (
                                <div key={i} className="bg-slate-800 p-3 rounded-lg text-center">
                                    <div className="text-white font-medium text-sm">{item}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 text-sm text-slate-400 bg-slate-800/30 p-4 rounded-lg">
                        <Lock size={16} className="flex-shrink-0 mt-0.5" />
                        <p>
                            Remember: Start small. Don't buy everything at once. Get one light and one speaker working perfectly before expanding.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setStep(0);
                            setAnswers({});
                            setShowResults(false);
                        }}
                        className="w-full mt-6 text-slate-500 hover:text-white transition-colors"
                    >
                        Retake Assessment
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default SmartHomeReadinessAssessment;
