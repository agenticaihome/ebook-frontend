import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';

const EmbeddableInfectionDiagnostic = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [showEmbedCode, setShowEmbedCode] = useState(false);
    const [direction, setDirection] = useState(0);

    const questions = [
        { id: 1, text: "Groceries go bad before use?", badAnswer: "yes" },
        { id: 2, text: "Unopened mail > 1 week?", badAnswer: "yes" },
        { id: 3, text: "Late fees in last 3 months?", badAnswer: "yes" },
        { id: 4, text: "Dinner plan for tonight?", badAnswer: "no" },
        { id: 5, text: "Find insurance policy < 2 min?", badAnswer: "no" }
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
        return badAnswers; // Max 5
    };

    const getDiagnosis = () => {
        const infectionLevel = calculateInfectionLevel();
        // Scale for 5 questions
        if (infectionLevel <= 1) return { stage: "Optimized", color: "#00FF00", emoji: "✨" };
        if (infectionLevel <= 2) return { stage: "Minor Chaos", color: "#FFFF00", emoji: "⚠️" };
        if (infectionLevel <= 3) return { stage: "Disorder", color: "#FFA500", emoji: "🔥" };
        return { stage: "Total Chaos", color: "#FF4444", emoji: "🚨" };
    };

    const diagnosis = getDiagnosis();
    const infectionLevel = calculateInfectionLevel();

    const embedCode = `<iframe src="https://agenticaihome.com/chaos-quiz-widget" width="100%" height="600" frameborder="0"></iframe>`;

    return (
        <div className="min-h-screen bg-transparent flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                {/* Header */}
                <div className="bg-slate-900 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🤖</span>
                        <span className="font-bold text-white text-sm">Agentic AI Chaos Check</span>
                    </div>
                </div>

                <div className="p-6">
                    {!showResults ? (
                        <>
                            <div className="mb-6">
                                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                                    <span>QUESTION {currentQuestion + 1}/{questions.length}</span>
                                    <span>{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-blue-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentQuestion}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    className="min-h-[120px] flex items-center justify-center text-center"
                                >
                                    <h3 className="text-xl font-bold text-slate-800">
                                        {questions[currentQuestion].text}
                                    </h3>
                                </motion.div>
                            </AnimatePresence>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <button
                                    onClick={() => handleAnswer('yes')}
                                    className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 transition-colors"
                                >
                                    YES
                                </button>
                                <button
                                    onClick={() => handleAnswer('no')}
                                    className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 transition-colors"
                                >
                                    NO
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                <div className="text-6xl mb-4">{diagnosis.emoji}</div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">{diagnosis.stage}</h3>
                                <p className="text-slate-500 mb-6">
                                    Your Chaos Score: <span className="font-bold" style={{ color: diagnosis.color }}>{infectionLevel}/5</span>
                                </p>

                                <div className="bg-blue-50 p-4 rounded-xl mb-6">
                                    <p className="text-sm text-blue-800 font-medium mb-2">
                                        Don't let chaos win. Build your Life OS with AI Agents.
                                    </p>
                                    <a
                                        href="https://agenticaihome.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors"
                                    >
                                        Get the Solution <ArrowRight size={16} />
                                    </a>
                                </div>

                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => setShowEmbedCode(!showEmbedCode)}
                                        className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                                    >
                                        <Code size={12} /> Embed this quiz
                                    </button>
                                </div>

                                {showEmbedCode && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        className="mt-4"
                                    >
                                        <textarea
                                            readOnly
                                            className="w-full p-2 text-xs bg-slate-100 rounded border border-slate-200 font-mono text-slate-600 h-20"
                                            value={embedCode}
                                            onClick={(e) => e.target.select()}
                                        />
                                        <p className="text-[10px] text-slate-400 mt-1">Copy and paste to your site</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmbeddableInfectionDiagnostic;
