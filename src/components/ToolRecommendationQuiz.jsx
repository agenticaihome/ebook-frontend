import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ExternalLink, DollarSign } from 'lucide-react';

const ToolRecommendationQuiz = () => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 'ecosystem',
            question: 'What ecosystem are you already in?',
            options: [
                { value: 'apple', label: 'Apple (iPhone, Mac, iCloud)' },
                { value: 'google', label: 'Google (Android, Gmail, Drive)' },
                { value: 'microsoft', label: 'Microsoft (Windows, Office 365)' },
                { value: 'mixed', label: 'Mixed / No preference' }
            ]
        },
        {
            id: 'budget',
            question: "What's your budget for AI tools?",
            options: [
                { value: 'free', label: '$0 - Free only' },
                { value: 'low', label: '$20/month' },
                { value: 'medium', label: '$50/month' },
                { value: 'high', label: '$100+/month' }
            ]
        },
        {
            id: 'technical',
            question: 'How technical are you?',
            options: [
                { value: 'beginner', label: 'Beginner - I want simple and easy' },
                { value: 'intermediate', label: 'Intermediate - Comfortable with apps' },
                { value: 'advanced', label: 'Advanced - I can code if needed' }
            ]
        },
        {
            id: 'painPoint',
            question: "What's your #1 pain point?",
            options: [
                { value: 'email', label: 'Email overload' },
                { value: 'calendar', label: 'Calendar chaos' },
                { value: 'household', label: 'Household management' },
                { value: 'finance', label: 'Financial tracking' },
                { value: 'general', label: 'General overwhelm' }
            ]
        },
        {
            id: 'privacy',
            question: 'How important is privacy to you?',
            options: [
                { value: 'very', label: 'Very - Privacy is critical' },
                { value: 'somewhat', label: 'Somewhat - Balanced approach' },
                { value: 'not', label: 'Not concerned - Convenience first' }
            ]
        }
    ];

    const handleAnswer = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const calculateRecommendations = () => {
        const { ecosystem, budget, technical, painPoint, privacy } = answers;

        // Foundation AI recommendation
        let foundationAI = {
            name: 'Claude Pro',
            reason: 'Best balance of capability and privacy',
            cost: 20,
            link: 'https://claude.ai'
        };

        if (privacy === 'very') {
            foundationAI = {
                name: 'Claude Pro',
                reason: 'Strongest privacy commitments',
                cost: 20,
                link: 'https://claude.ai'
            };
        } else if (ecosystem === 'google') {
            foundationAI = {
                name: 'Google Gemini Advanced',
                reason: 'Deep integration with your Google ecosystem',
                cost: 20,
                link: 'https://gemini.google.com'
            };
        } else if (ecosystem === 'microsoft') {
            foundationAI = {
                name: 'Microsoft Copilot',
                reason: 'Built into your Microsoft 365 suite',
                cost: 20,
                link: 'https://copilot.microsoft.com'
            };
        } else if (budget === 'free') {
            foundationAI = {
                name: 'Claude (Free)',
                reason: 'Best free tier available',
                cost: 0,
                link: 'https://claude.ai'
            };
        }

        // Specialized tools
        const specializedTools = [];

        if (painPoint === 'email' && budget !== 'free') {
            specializedTools.push({
                name: 'SaneBox',
                reason: 'Automatic email triage and filtering',
                cost: 7,
                link: 'https://sanebox.com'
            });
        }

        if (painPoint === 'calendar' && budget !== 'free') {
            specializedTools.push({
                name: 'Reclaim.ai',
                reason: 'Smart time blocking and meeting optimization',
                cost: 10,
                link: 'https://reclaim.ai'
            });
        }

        if (painPoint === 'finance' && budget !== 'free') {
            specializedTools.push({
                name: 'Copilot (Finance)',
                reason: 'AI-powered spending tracking',
                cost: 10,
                link: 'https://copilot.money'
            });
        }

        // Calculate total cost
        const totalCost = foundationAI.cost + specializedTools.reduce((sum, tool) => sum + tool.cost, 0);

        return { foundationAI, specializedTools, totalCost };
    };

    const results = showResults ? calculateRecommendations() : null;
    const allAnswered = questions.every(q => answers[q.id]);

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <h3 className="text-2xl font-bold text-white mb-6">Tool Recommendation Quiz</h3>

            <AnimatePresence mode="wait">
                {!showResults ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        {questions.map((question, qIdx) => (
                            <div key={question.id}>
                                <label className="block text-white font-medium mb-3">
                                    {qIdx + 1}. {question.question}
                                </label>
                                <div className="space-y-2">
                                    {question.options.map((option) => {
                                        const isSelected = answers[question.id] === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => handleAnswer(question.id, option.value)}
                                                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${isSelected
                                                        ? 'border-cyan-500 bg-cyan-900/20'
                                                        : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-slate-600'
                                                    }`}>
                                                    {isSelected && <CheckCircle size={16} className="text-white" />}
                                                </div>
                                                <span className="text-white">{option.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={() => setShowResults(true)}
                            disabled={!allAnswered}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-bold transition-all"
                        >
                            Get My Recommendations
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="mb-6 p-6 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-xl border border-cyan-500/30">
                            <h4 className="text-white font-bold text-xl mb-2">Your Foundation AI</h4>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="text-cyan-400 font-bold text-2xl mb-1">{results.foundationAI.name}</div>
                                    <div className="text-slate-300 text-sm mb-3">{results.foundationAI.reason}</div>
                                    <a
                                        href={results.foundationAI.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                                    >
                                        Sign up <ExternalLink size={14} />
                                    </a>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-white">
                                        ${results.foundationAI.cost}
                                    </div>
                                    <div className="text-xs text-slate-400">/month</div>
                                </div>
                            </div>
                        </div>

                        {results.specializedTools.length > 0 && (
                            <div className="mb-6">
                                <h4 className="text-white font-bold mb-3">Recommended Specialized Tools</h4>
                                <div className="space-y-3">
                                    {results.specializedTools.map((tool, idx) => (
                                        <div key={idx} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="text-white font-bold mb-1">{tool.name}</div>
                                                <div className="text-slate-400 text-sm mb-2">{tool.reason}</div>
                                                <a
                                                    href={tool.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                                                >
                                                    Learn more <ExternalLink size={14} />
                                                </a>
                                            </div>
                                            <div className="text-right ml-4">
                                                <div className="text-xl font-bold text-white">${tool.cost}</div>
                                                <div className="text-xs text-slate-400">/month</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="p-6 bg-slate-900 rounded-xl border-2 border-cyan-500/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <DollarSign className="text-cyan-400" size={24} />
                                    <div>
                                        <div className="text-sm text-slate-400">Estimated Monthly Cost</div>
                                        <div className="text-white font-bold text-2xl">${results.totalCost}/month</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-slate-400">Annual Investment</div>
                                    <div className="text-cyan-400 font-bold">${results.totalCost * 12}/year</div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowResults(false)}
                            className="mt-6 w-full text-cyan-400 hover:text-cyan-300 font-medium"
                        >
                            Retake Quiz
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ToolRecommendationQuiz;
