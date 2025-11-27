import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';

const InfectionDiagnostic = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [direction, setDirection] = useState(0);
    const resultsRef = useRef(null);

    const questions = [
        {
            id: 1,
            text: "Do you know what's for dinner tonight?",
            badAnswer: "no"
        },
        {
            id: 2,
            text: "Do you have unread emails from last month?",
            badAnswer: "yes"
        },
        {
            id: 3,
            text: "Can you find your last utility bill in under 2 minutes?",
            badAnswer: "no"
        },
        {
            id: 4,
            text: "Do you know exactly what subscriptions you're paying for?",
            badAnswer: "no"
        },
        {
            id: 5,
            text: "Have you thrown away expired food this week?",
            badAnswer: "yes"
        }
    ];

    const handleAnswer = (answer) => {
        const newAnswers = [...answers, answer];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setDirection(answer === 'yes' ? 1 : -1);
            setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1);
            }, 300);
        } else {
            setTimeout(() => {
                setShowResults(true);
            }, 300);
        }
    };

    const calculateInfectionLevel = () => {
        let badAnswers = 0;
        answers.forEach((answer, index) => {
            if (answer === questions[index].badAnswer) {
                badAnswers++;
            }
        });
        return badAnswers;
    };

    const getVitalsColor = () => {
        const infectionLevel = calculateInfectionLevel();
        if (infectionLevel === 0) return '#00FF00';
        if (infectionLevel <= 2) return '#FFFF00';
        if (infectionLevel <= 3) return '#FFA500';
        return '#FF4444';
    };

    const getVitalsWidth = () => {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        return `${progress}%`;
    };

    const getDiagnosis = () => {
        const infectionLevel = calculateInfectionLevel();
        if (infectionLevel === 0) return { stage: "Stage 0: Clean Bill of Health", severity: "HEALTHY", color: "#00FF00" };
        if (infectionLevel <= 2) return { stage: "Stage 1: Early Infection", severity: "MILD", color: "#FFFF00" };
        if (infectionLevel <= 3) return { stage: "Stage 2: Spreading Chaos", severity: "MODERATE", color: "#FFA500" };
        return { stage: "Stage 3: Systemic Overload", severity: "CRITICAL", color: "#FF4444" };
    };

    const downloadResults = async () => {
        if (resultsRef.current) {
            const canvas = await html2canvas(resultsRef.current, {
                backgroundColor: '#ffffff',
                scale: 2
            });
            const link = document.createElement('a');
            link.download = 'chaos-diagnosis.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    const diagnosis = getDiagnosis();
    const infectionLevel = calculateInfectionLevel();

    return (
        <div className="glass-card-xl p-8 md:p-12 max-w-4xl mx-auto">
            {!showResults ? (
                <>
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 medical-heading" style={{ color: '#0055FF' }}>
                            🩺 Infection Diagnostic Quiz
                        </h2>
                        <p className="text-gray-600 medical-body">
                            Answer honestly to discover your chaos infection level
                        </p>
                    </div>

                    {/* EKG Vitals Monitor */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold medical-body" style={{ color: '#0055FF' }}>
                                VITALS MONITOR
                            </span>
                            <span className="text-sm font-semibold" style={{ color: getVitalsColor() }}>
                                {currentQuestion + 1} / {questions.length}
                            </span>
                        </div>
                        <div className="relative h-16 bg-black rounded-lg overflow-hidden">
                            {/* EKG Line */}
                            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                <motion.path
                                    d={`M 0,32 ${answers.map((_, i) => {
                                        const x = ((i + 1) / questions.length) * 100;
                                        const isBad = answers[i] === questions[i].badAnswer;
                                        return `L ${x},${isBad ? Math.random() * 20 + 10 : 32}`;
                                    }).join(' ')} L 100,32`}
                                    stroke={getVitalsColor()}
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </svg>
                            {/* Progress Bar */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-1"
                                style={{ backgroundColor: getVitalsColor() }}
                                initial={{ width: '0%' }}
                                animate={{ width: getVitalsWidth() }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="relative h-96 flex items-center justify-center">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentQuestion}
                                custom={direction}
                                initial={{ x: direction > 0 ? 300 : -300, opacity: 0, rotate: direction > 0 ? 10 : -10 }}
                                animate={{ x: 0, opacity: 1, rotate: 0 }}
                                exit={{ x: direction > 0 ? -300 : 300, opacity: 0, rotate: direction > 0 ? -10 : 10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute w-full"
                            >
                                <div className="glass-card p-8 text-center">
                                    <div className="text-6xl mb-6">🔬</div>
                                    <h3 className="text-2xl font-bold mb-8 medical-heading" style={{ color: '#0055FF' }}>
                                        {questions[currentQuestion].text}
                                    </h3>
                                    <div className="flex gap-4 justify-center">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleAnswer('yes')}
                                            className="px-12 py-4 rounded-lg font-bold text-lg shadow-clinical-lg"
                                            style={{ backgroundColor: '#00DDDD', color: 'white' }}
                                        >
                                            ✓ YES
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleAnswer('no')}
                                            className="px-12 py-4 rounded-lg font-bold text-lg shadow-clinical-lg"
                                            style={{ backgroundColor: '#FF4444', color: 'white' }}
                                        >
                                            ✗ NO
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </>
            ) : (
                /* Results Card */
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div ref={resultsRef} className="bg-white p-8 rounded-2xl border-4" style={{ borderColor: diagnosis.color }}>
                        {/* Medical Chart Header */}
                        <div className="text-center mb-6 pb-6 border-b-2" style={{ borderColor: diagnosis.color }}>
                            <div className="text-sm font-mono text-gray-500 mb-2">MEDICAL DIAGNOSTIC REPORT</div>
                            <h2 className="text-4xl font-bold medical-heading mb-2" style={{ color: diagnosis.color }}>
                                {diagnosis.stage}
                            </h2>
                            <div className="inline-block px-4 py-2 rounded-full font-bold text-white" style={{ backgroundColor: diagnosis.color }}>
                                SEVERITY: {diagnosis.severity}
                            </div>
                        </div>

                        {/* Infection Score */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="text-center p-4 glass-card">
                                <div className="text-sm text-gray-600 mb-1">INFECTION SCORE</div>
                                <div className="text-5xl font-bold medical-heading" style={{ color: diagnosis.color }}>
                                    {infectionLevel}/5
                                </div>
                            </div>
                            <div className="text-center p-4 glass-card">
                                <div className="text-sm text-gray-600 mb-1">CHAOS LEVEL</div>
                                <div className="text-5xl font-bold medical-heading" style={{ color: diagnosis.color }}>
                                    {Math.round((infectionLevel / 5) * 100)}%
                                </div>
                            </div>
                        </div>

                        {/* Prescription */}
                        <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: `${diagnosis.color}20` }}>
                            <div className="text-sm font-semibold mb-2" style={{ color: diagnosis.color }}>
                                📋 PRESCRIPTION
                            </div>
                            <p className="text-lg font-bold medical-heading" style={{ color: '#0055FF' }}>
                                {infectionLevel >= 3 ? 'Immediate Agent Deployment Required' : 'Preventive Agent Deployment Recommended'}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                                Download the free guide to learn how AI agents can cure your household chaos
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="text-center text-xs text-gray-500 font-mono">
                            DIAGNOSED BY: Dr. Domestic Surgeon | REPORT ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center mt-8">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            onClick={downloadResults}
                            className="px-8 py-4 rounded-lg font-bold text-lg shadow-clinical-xl"
                            style={{ backgroundColor: diagnosis.color, color: 'white' }}
                        >
                            📸 Download & Share Results
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setCurrentQuestion(0);
                                setAnswers([]);
                                setShowResults(false);
                            }}
                            className="px-8 py-4 rounded-lg font-bold text-lg shadow-clinical-lg glass-card"
                            style={{ color: '#0055FF' }}
                        >
                            🔄 Retake Quiz
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default InfectionDiagnostic;
