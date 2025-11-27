import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';

const PrivacyAssessment = () => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 'concern',
            question: 'How concerned are you about data privacy?',
            type: 'scale',
            min: 1,
            max: 10,
            labels: { min: 'Not concerned', max: 'Very concerned' }
        },
        {
            id: 'breach',
            question: 'Have you experienced a data breach before?',
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'unsure', label: 'Not sure' }
            ]
        },
        {
            id: 'sensitiveWork',
            question: 'Does your work involve sensitive information?',
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'children',
            question: 'Do you have children whose data needs protection?',
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'preference',
            question: 'Which would you prefer?',
            options: [
                { value: 'privacy', label: 'More privacy with more manual work' },
                { value: 'balanced', label: 'Balanced approach' },
                { value: 'convenience', label: 'More convenience with more data sharing' }
            ]
        }
    ];

    const handleAnswer = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const calculateResults = () => {
        const { concern, breach, sensitiveWork, children, preference } = answers;

        let tier = 'Balanced';
        let tierDescription = 'Share selectively with trusted providers';
        let tierColor = 'cyan';
        let score = 0;

        // Calculate privacy score
        score += (concern || 5);
        if (breach === 'yes') score += 3;
        if (sensitiveWork === 'yes') score += 2;
        if (children === 'yes') score += 2;
        if (preference === 'privacy') score += 3;
        else if (preference === 'convenience') score -= 2;

        // Determine tier
        if (score >= 15 || preference === 'privacy') {
            tier = 'Conservative';
            tierDescription = 'Minimize data sharing, maximize control';
            tierColor = 'green';
        } else if (score <= 8 || preference === 'convenience') {
            tier = 'Convenience-Focused';
            tierDescription = 'Optimize for ease of use with reasonable safeguards';
            tierColor = 'purple';
        }

        // Tool recommendations
        const tools = [];
        if (tier === 'Conservative') {
            tools.push({ name: 'Claude Pro', reason: 'Strongest privacy commitments' });
            tools.push({ name: 'Local tools', reason: 'Self-hosted options when possible' });
        } else if (tier === 'Balanced') {
            tools.push({ name: 'Claude or ChatGPT', reason: 'Good privacy with opt-out options' });
            tools.push({ name: 'Selective integrations', reason: 'Connect only what you need' });
        } else {
            tools.push({ name: 'Ecosystem AI', reason: 'Google/Microsoft for deep integration' });
            tools.push({ name: 'Full automation', reason: 'Maximum convenience features' });
        }

        // Caution areas
        const cautionAreas = [];
        if (children === 'yes') cautionAreas.push("Children's information");
        if (sensitiveWork === 'yes') cautionAreas.push('Work-related data');
        if (breach === 'yes') cautionAreas.push('Financial accounts');
        if (concern >= 7) cautionAreas.push('Location data');

        return { tier, tierDescription, tierColor, tools, cautionAreas };
    };

    const results = showResults ? calculateResults() : null;
    const allAnswered = questions.every(q => answers[q.id]);

    const getTierIcon = (color) => {
        const iconProps = { size: 32, className: `text-${color}-400` };
        if (color === 'green') return <Lock {...iconProps} />;
        if (color === 'purple') return <Eye {...iconProps} />;
        return <Shield {...iconProps} />;
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Shield className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Privacy Preference Assessment</h3>
            </div>

            {!showResults ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    {questions.map((question, idx) => (
                        <div key={question.id}>
                            <label className="block text-white font-medium mb-3">
                                {idx + 1}. {question.question}
                            </label>

                            {question.type === 'scale' ? (
                                <div>
                                    <input
                                        type="range"
                                        min={question.min}
                                        max={question.max}
                                        value={answers[question.id] || 5}
                                        onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                    />
                                    <div className="flex justify-between text-sm text-slate-400 mt-2">
                                        <span>{question.labels.min} ({question.min})</span>
                                        <span className="text-cyan-400 font-bold">{answers[question.id] || 5}</span>
                                        <span>{question.labels.max} ({question.max})</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {question.options.map((option) => {
                                        const isSelected = answers[question.id] === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => handleAnswer(question.id, option.value)}
                                                className={`w-full p-3 rounded-xl border-2 transition-all text-left ${isSelected
                                                        ? 'border-cyan-500 bg-cyan-900/20 text-white'
                                                        : 'border-slate-700 hover:border-slate-600 bg-slate-900/50 text-slate-300'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={() => setShowResults(true)}
                        disabled={!allAnswered}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-bold transition-all mt-4"
                    >
                        Get My Privacy Tier
                    </button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full mb-4">
                            {getTierIcon(results.tierColor)}
                        </div>
                        <h4 className="text-3xl font-bold text-white mb-2">
                            {results.tier} Privacy Tier
                        </h4>
                        <p className="text-slate-400">{results.tierDescription}</p>
                    </div>

                    <div className="mb-6">
                        <h5 className="text-white font-bold mb-3">Recommended Tools</h5>
                        <div className="space-y-3">
                            {results.tools.map((tool, idx) => (
                                <div key={idx} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                                    <div className="text-white font-bold mb-1">{tool.name}</div>
                                    <div className="text-slate-400 text-sm">{tool.reason}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {results.cautionAreas.length > 0 && (
                        <div className="p-6 bg-red-900/10 rounded-xl border border-red-500/30">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="text-red-400" size={20} />
                                <h5 className="text-white font-bold">Areas Requiring Extra Caution</h5>
                            </div>
                            <ul className="space-y-2">
                                {results.cautionAreas.map((area, idx) => (
                                    <li key={idx} className="text-slate-300 text-sm flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                        {area}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-6 p-4 bg-cyan-900/20 rounded-xl border border-cyan-500/30">
                        <div className="text-sm text-slate-300">
                            <strong className="text-white">Next Step:</strong> Use the Agent Constitution Builder below to create your personalized privacy rules.
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(false)}
                        className="mt-6 w-full text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                        Retake Assessment
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default PrivacyAssessment;
