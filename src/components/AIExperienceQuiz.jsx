import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AIExperienceQuiz = () => {
    const { updatePersona } = useUser();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 'experience',
            question: 'Have you used AI tools before?',
            options: [
                { value: 'never', label: 'Never' },
                { value: 'few', label: 'A few times' },
                { value: 'regularly', label: 'Regularly' }
            ]
        },
        {
            id: 'usage',
            question: 'What have you used AI for?',
            type: 'multiple',
            options: [
                { value: 'writing', label: 'Writing' },
                { value: 'research', label: 'Research' },
                { value: 'images', label: 'Images' },
                { value: 'coding', label: 'Coding' },
                { value: 'none', label: 'None' }
            ]
        },
        {
            id: 'level',
            question: 'How would you describe your current AI usage?',
            options: [
                { value: 0, label: 'Level 0 - No AI usage' },
                { value: 1, label: 'Level 1 - AI as search engine' },
                { value: 2, label: 'Level 2 - AI as assistant' },
                { value: 3, label: 'Level 3 - AI as advisor' },
                { value: 4, label: 'Level 4 - AI as agent' }
            ]
        },
        {
            id: 'timeDrain',
            question: "What's your biggest daily time drain?",
            options: [
                { value: 'email', label: 'Email' },
                { value: 'scheduling', label: 'Scheduling' },
                { value: 'household', label: 'Household tasks' },
                { value: 'decisions', label: 'Decision fatigue' },
                { value: 'other', label: 'Other' }
            ]
        },
        {
            id: 'comfort',
            question: 'How comfortable are you letting technology act on your behalf?',
            type: 'scale',
            min: 1,
            max: 10
        }
    ];

    const handleAnswer = (questionId, value) => {
        if (questions[currentQuestion].type === 'multiple') {
            const current = answers[questionId] || [];
            const newValue = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            setAnswers({ ...answers, [questionId]: newValue });
        } else {
            setAnswers({ ...answers, [questionId]: value });
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
            // Save results to context
            const results = calculateResults();
            updatePersona({
                ...answers,
                ...results
            });
        }
    };

    const calculateResults = () => {
        const level = answers.level || 0;
        const comfort = answers.comfort || 5;

        let maturityLevel = 'Beginner';
        let recommendation = 'Start with Chapter 2 to pick your first AI tool';
        let timeSavings = '2-3 hours/week';
        let firstAgent = 'Morning Agent';

        if (level >= 3) {
            maturityLevel = 'Advanced';
            recommendation = 'Jump to Chapter 4 - you\'re ready for agents';
            timeSavings = '7-10 hours/week';
            firstAgent = 'Multi-agent system';
        } else if (level >= 2) {
            maturityLevel = 'Intermediate';
            recommendation = 'Follow Part 2 to build your first agent';
            timeSavings = '5-7 hours/week';
            firstAgent = 'Email or Calendar Agent';
        }

        const timeDrainMap = {
            email: 'Email Agent',
            scheduling: 'Calendar Agent',
            household: 'Kitchen or Household Agent',
            decisions: 'Morning Agent',
            other: 'Morning Agent'
        };

        if (answers.timeDrain) {
            firstAgent = timeDrainMap[answers.timeDrain];
        }

        return { maturityLevel, recommendation, timeSavings, firstAgent };
    };

    const results = showResults ? calculateResults() : null;

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600 my-8">
            <AnimatePresence mode="wait">
                {!showResults ? (
                    <m.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-cyan-400 font-mono">
                                    Question {currentQuestion + 1} of {questions.length}
                                </span>
                                <div className="flex gap-1">
                                    {questions.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`h-1 w-8 rounded ${idx <= currentQuestion ? 'bg-cyan-500' : 'bg-slate-700'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-6">
                                {questions[currentQuestion].question}
                            </h3>
                        </div>

                        {questions[currentQuestion].type === 'scale' ? (
                            <div className="space-y-4">
                                <input
                                    type="range"
                                    min={questions[currentQuestion].min}
                                    max={questions[currentQuestion].max}
                                    value={answers[questions[currentQuestion].id] || 5}
                                    onChange={(e) => handleAnswer(questions[currentQuestion].id, parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                />
                                <div className="flex justify-between text-sm text-slate-400">
                                    <span>Not comfortable (1)</span>
                                    <span className="text-cyan-400 font-bold text-lg">
                                        {answers[questions[currentQuestion].id] || 5}
                                    </span>
                                    <span>Very comfortable (10)</span>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {questions[currentQuestion].options.map((option) => {
                                    const isSelected = questions[currentQuestion].type === 'multiple'
                                        ? (answers[questions[currentQuestion].id] || []).includes(option.value)
                                        : answers[questions[currentQuestion].id] === option.value;

                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                                            className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${isSelected
                                                ? 'border-cyan-500 bg-cyan-900/20'
                                                : 'border-slate-600 hover:border-slate-600 bg-slate-900/50'
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-slate-600'
                                                }`}>
                                                {isSelected && <CheckCircle size={16} className="text-white" />}
                                            </div>
                                            <span className="text-white font-medium">{option.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        <button
                            onClick={handleNext}
                            disabled={!answers[questions[currentQuestion].id]}
                            className="mt-8 w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                            <ArrowRight size={20} />
                        </button>
                    </m.div>
                ) : (
                    <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
                                <CheckCircle size={32} className="text-cyan-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">Your AI Maturity Level</h3>
                            <p className="text-cyan-400 text-xl font-bold">{results.maturityLevel}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-600">
                                <div className="text-sm text-slate-400 mb-1">Recommended Starting Point</div>
                                <div className="text-white font-bold">{results.recommendation}</div>
                            </div>
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-600">
                                <div className="text-sm text-slate-400 mb-1">Potential Time Savings</div>
                                <div className="text-cyan-400 font-bold text-xl">{results.timeSavings}</div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 p-6 rounded-xl border border-cyan-500/30">
                            <div className="text-sm text-slate-400 mb-2">Your First Agent Should Be</div>
                            <div className="text-white font-bold text-2xl">{results.firstAgent}</div>
                        </div>

                        <button
                            onClick={() => {
                                setShowResults(false);
                                setCurrentQuestion(0);
                                setAnswers({});
                            }}
                            className="mt-6 text-cyan-400 hover:text-cyan-300 font-medium"
                        >
                            Retake Quiz
                        </button>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIExperienceQuiz;
