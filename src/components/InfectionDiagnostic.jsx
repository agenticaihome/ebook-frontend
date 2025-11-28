import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';

const CaptainMemePopup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-white rounded-2xl max-w-md w-full overflow-hidden relative"
            >
                <div className="bg-blue-600 p-4 text-center">
                    <h3 className="text-white font-bold text-xl uppercase">Mission Accomplished!</h3>
                </div>
                <div className="p-6 text-center">
                    <div className="mb-4 relative inline-block">
                        <img
                            src="/assets/captain-hero.png" // Assuming this exists, or use a placeholder/emoji
                            alt="Captain Efficiency"
                            className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 object-cover bg-slate-900"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-xs transform rotate-12 shadow-lg">
                            BOOM!
                        </div>
                    </div>
                    <h4 className="text-2xl font-black text-slate-800 mb-2">
                        "You survived the diagnostic!"
                    </h4>
                    <p className="text-slate-600 mb-6">
                        Don't let your friends live in chaos. Challenge them to beat your score!
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                        I'll Share the Wisdom 🫡
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const InfectionDiagnostic = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [direction, setDirection] = useState(0);
    const [showMemePopup, setShowMemePopup] = useState(false);
    const resultsRef = useRef(null);

    const questions = [
        {
            id: 1,
            text: "Have you bought groceries that went bad before you used them this week?",
            badAnswer: "yes"
        },
        {
            id: 2,
            text: "Do you have unopened mail from more than a week ago?",
            badAnswer: "yes"
        },
        {
            id: 3,
            text: "Have you paid a late fee in the last 3 months?",
            badAnswer: "yes"
        },
        {
            id: 4,
            text: "Do you know what's for dinner tonight?",
            badAnswer: "no"
        },
        {
            id: 5,
            text: "Can you find your car insurance policy in under 2 minutes?",
            badAnswer: "no"
        },
        {
            id: 6,
            text: "Have you forgotten to cancel a free trial and gotten charged?",
            badAnswer: "yes"
        },
        {
            id: 7,
            text: "Do you have clothes you bought over a year ago with tags still on?",
            badAnswer: "yes"
        },
        {
            id: 8,
            text: "Have you missed a doctor's appointment in the last year?",
            badAnswer: "yes"
        },
        {
            id: 9,
            text: "Do you know exactly which subscriptions you're paying for right now?",
            badAnswer: "no"
        },
        {
            id: 10,
            text: "Have you ordered takeout because you 'had nothing to eat' while your fridge was full?",
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
                // Show popup after a short delay
                setTimeout(() => setShowMemePopup(true), 1500);
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
        if (infectionLevel <= 2) return '#00FF00';
        if (infectionLevel <= 4) return '#FFFF00';
        if (infectionLevel <= 6) return '#FFA500';
        return '#FF4444';
    };

    const getVitalsWidth = () => {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        return `${progress}%`;
    };

    const getDiagnosis = () => {
        const infectionLevel = calculateInfectionLevel();
        if (infectionLevel <= 2) return {
            stage: "Level 0: Fully Optimized",
            severity: "EXCELLENT",
            color: "#00FF00",
            emoji: "✨"
        };
        if (infectionLevel <= 4) return {
            stage: "Level 1: Minor Chaos",
            severity: "MANAGEABLE",
            color: "#FFFF00",
            emoji: "⚠️"
        };
        if (infectionLevel <= 6) return {
            stage: "Level 2: Spreading Disorder",
            severity: "CONCERNING",
            color: "#FFA500",
            emoji: "🔥"
        };
        return {
            stage: "Level 3: Total Chaos",
            severity: "CRITICAL",
            color: "#FF4444",
            emoji: "🚨"
        };
    };

    const trackShare = (platform) => {
        // Anonymous tracking
        try {
            const shares = JSON.parse(localStorage.getItem('chaos_shares') || '[]');
            shares.push({ platform, timestamp: new Date().toISOString() });
            localStorage.setItem('chaos_shares', JSON.stringify(shares));
            console.log(`Tracked share to ${platform}`);
        } catch (e) {
            console.error("Tracking failed", e);
        }
    };

    const shareToTwitter = () => {
        trackShare('twitter');
        const diagnosis = getDiagnosis();
        const text = `I just took the Household Chaos Assessment and got: ${diagnosis.stage}! ${diagnosis.emoji} Find out your chaos level:`;
        const url = window.location.href;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareToFacebook = () => {
        trackShare('facebook');
        const url = window.location.href;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const shareToLinkedIn = () => {
        trackShare('linkedin');
        const url = window.location.href;
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    };

    const downloadResults = async () => {
        if (resultsRef.current) {
            const canvas = await html2canvas(resultsRef.current, {
                backgroundColor: '#ffffff',
                scale: 2
            });
            const link = document.createElement('a');
            link.download = 'chaos-assessment.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    const diagnosis = getDiagnosis();
    const infectionLevel = calculateInfectionLevel();

    return (
        <div className="glass-card-xl p-8 md:p-12 max-w-4xl mx-auto relative">
            <AnimatePresence>
                {showMemePopup && (
                    <CaptainMemePopup onClose={() => setShowMemePopup(false)} />
                )}
            </AnimatePresence>

            {!showResults ? (
                <>
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 medical-heading" style={{ color: '#0055FF' }}>
                            🎯 Household Chaos Assessment
                        </h2>
                        <p className="text-gray-600 medical-body">
                            Answer honestly to discover your household chaos level
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                            *For entertainment purposes only. Not actual medical advice.
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
                    className="w-full"
                >
                    <div ref={resultsRef} className="bg-white rounded-2xl p-8 shadow-xl mb-8 border-2" style={{ borderColor: diagnosis.color }}>
                        <div className="text-6xl mb-4">{diagnosis.emoji}</div>
                        <h3 className="text-3xl font-bold mb-2 medical-heading" style={{ color: diagnosis.color }}>
                            {diagnosis.stage}
                        </h3>
                        <p className="text-xl font-bold mb-6" style={{ color: diagnosis.color }}>
                            SEVERITY: {diagnosis.severity}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <div className="text-sm text-gray-600 mb-2 font-semibold">INFECTION SCORE</div>
                                <div className="text-5xl font-bold medical-heading" style={{ color: diagnosis.color }}>
                                    {infectionLevel}/10
                                </div>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <div className="text-sm text-gray-600 mb-2 font-semibold">CHAOS LEVEL</div>
                                <div className="text-5xl font-bold medical-heading" style={{ color: diagnosis.color }}>
                                    {Math.round((infectionLevel / 10) * 100)}%
                                </div>
                            </div>
                        </div>

                        {/* Recommendation */}
                        <div className="p-6 rounded-2xl mb-6 text-center" style={{ backgroundColor: `${diagnosis.color}10`, borderLeft: `4px solid ${diagnosis.color}` }}>
                            <p className="text-lg font-bold medical-heading mb-2" style={{ color: '#0055FF' }}>
                                {infectionLevel >= 6 ? '🚨 Immediate Action Recommended' : '💡 Preventive Measures Suggested'}
                            </p>
                            <p className="text-sm text-gray-600">
                                Download the free guide to learn how AI agents can restore order to your household
                            </p>
                        </div>

                        {/* Disclaimer */}
                        <div className="text-center text-xs text-gray-400 border-t pt-4">
                            * Entertainment purposes only. Not medical or professional advice.
                        </div>
                    </div>

                    {/* Social Share Buttons */}
                    <div className="flex flex-wrap gap-3 justify-center mt-8">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={shareToTwitter}
                            className="px-6 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2"
                            style={{ backgroundColor: '#1DA1F2', color: 'white' }}
                        >
                            <span>🐦</span> Share on Twitter
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={shareToFacebook}
                            className="px-6 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2"
                            style={{ backgroundColor: '#4267B2', color: 'white' }}
                        >
                            <span>📘</span> Share on Facebook
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={shareToLinkedIn}
                            className="px-6 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2"
                            style={{ backgroundColor: '#0077B5', color: 'white' }}
                        >
                            <span>💼</span> Share on LinkedIn
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={downloadResults}
                            className="px-6 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2 glass-card"
                            style={{ color: '#0055FF' }}
                        >
                            <span>📥</span> Download Image
                        </motion.button>
                    </div>

                    {/* Retake Button */}
                    <div className="text-center mt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setCurrentQuestion(0);
                                setAnswers([]);
                                setShowResults(false);
                            }}
                            className="px-8 py-3 rounded-lg font-bold shadow-lg glass-card"
                            style={{ color: '#0055FF' }}
                        >
                            🔄 Retake Assessment
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </div >
    );
};

export default InfectionDiagnostic;
