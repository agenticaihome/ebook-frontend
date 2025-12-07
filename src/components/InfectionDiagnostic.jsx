import React, { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
// html2canvas loaded dynamically when needed (saves ~400KB from initial bundle)
import { useSound } from '../context/SoundContext';
import { AlertTriangle, CheckCircle, Clock, ArrowRight, Share2, Download, X } from 'lucide-react';

const CaptainMemePopup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <m.div
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
            </m.div>
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
    const { playChime } = useSound();

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
        playChime('click');

        if (currentQuestion < questions.length - 1) {
            setDirection(answer === 'yes' ? 1 : -1);
            setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1);
            }, 300);
        } else {
            setTimeout(() => {
                setShowResults(true);
                playChime('success');
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
            localStorage.setItem('chaos_shares', JSON.stringify(shares));
        } catch (e) {
            // Silent fail
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
            // Dynamic import - only loads when user clicks download
            const html2canvas = (await import('html2canvas')).default;
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
                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden relative">
                            <m.div
                                className="h-full relative"
                                style={{ backgroundColor: getVitalsColor() }}
                                initial={{ width: 0 }}
                                animate={{ width: getVitalsWidth() }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="absolute top-0 right-0 w-full h-full animate-pulse bg-white/30"></div>
                            </m.div>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="relative h-64">
                        <AnimatePresence initial={false} custom={direction}>
                            <m.div
                                key={currentQuestion}
                                custom={direction}
                                initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: direction > 0 ? -1000 : 1000, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute w-full"
                            >
                                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-500">
                                    <h3 className="text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
                                        {questions[currentQuestion].text}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => handleAnswer('yes')}
                                            className="p-4 rounded-xl border-2 border-red-100 hover:border-red-500 hover:bg-red-50 transition-all group"
                                        >
                                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">😱</div>
                                            <div className="font-bold text-red-600">YES</div>
                                            <div className="text-xs text-red-400">Guilty as charged</div>
                                        </button>
                                        <button
                                            onClick={() => handleAnswer('no')}
                                            className="p-4 rounded-xl border-2 border-green-100 hover:border-green-500 hover:bg-green-50 transition-all group"
                                        >
                                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">😌</div>
                                            <div className="font-bold text-green-600">NO</div>
                                            <div className="text-xs text-green-400">I'm good here</div>
                                        </button>
                                    </div>
                                </div>
                            </m.div>
                        </AnimatePresence>
                    </div>
                </>
            ) : (
                <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                    ref={resultsRef}
                >
                    <div className="mb-8">
                        <div className="inline-block p-6 rounded-full bg-slate-50 mb-4 shadow-inner">
                            <div className="text-6xl animate-bounce">{diagnosis.emoji}</div>
                        </div>
                        <h2 className="text-4xl font-black mb-2" style={{ color: diagnosis.color }}>
                            {diagnosis.severity}
                        </h2>
                        <h3 className="text-2xl text-gray-700 font-bold mb-4">
                            {diagnosis.stage}
                        </h3>
                        <p className="text-gray-600 max-w-lg mx-auto mb-8">
                            You answered "YES" to {infectionLevel} out of {questions.length} chaos indicators.
                            {infectionLevel > 5
                                ? " Your household is running in survival mode. It's time to install an operating system."
                                : " You have some systems in place, but friction is slowing you down."}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                        <button
                            onClick={shareToTwitter}
                            className="flex items-center justify-center gap-2 p-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-all"
                        >
                            <Share2 size={20} /> Share Result
                        </button>
                        <button
                            onClick={downloadResults}
                            className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
                        >
                            <Download size={20} /> Save Report
                        </button>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-900 mb-2">Prescription:</h4>
                        <p className="text-blue-800 mb-4">
                            Start Part 1 of the Agentic Home Webbook immediately.
                        </p>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
                            Begin Treatment <ArrowRight className="inline ml-2" size={20} />
                        </button>
                    </div>
                </m.div>
            )}
        </div>
    );
};

export default InfectionDiagnostic;
