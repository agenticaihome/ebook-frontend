import React, { useState } from 'react';
import CaptainCallout from './CaptainCallout';

export default function HouseholdTriageQuiz() {
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const questions = [
        {
            id: 1,
            question: "Which scenario makes you want to scream?",
            options: [
                { value: "A", text: "It's 5 PM and you have no idea what's for dinner. Again." },
                { value: "B", text: "Your inbox has 127 unread emails and 14 need responses today." },
                { value: "C", text: "You just double-booked two important meetings and nobody told you." },
                { value: "D", text: "You forgot your partner's birthday until this morning." }
            ]
        },
        {
            id: 2,
            question: "What's your biggest time waster?",
            options: [
                { value: "A", text: "Grocery shopping and meal prep logistics" },
                { value: "B", text: "Sifting through spam and low-priority emails" },
                { value: "C", text: "Scheduling meetings and managing calendar conflicts" },
                { value: "D", text: "Remembering routine maintenance and bills" }
            ]
        },
        {
            id: 3,
            question: "If you could hire one human assistant, what would they do?",
            options: [
                { value: "A", text: "Chef & Nutritionist" },
                { value: "B", text: "Executive Secretary" },
                { value: "C", text: "Chief of Staff / Scheduler" },
                { value: "D", text: "House Manager" }
            ]
        }
    ];

    const calculateResult = () => {
        // Count A, B, C, D responses
        const counts = Object.values(answers).reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});

        // Return most common answer
        return Object.keys(counts).reduce((a, b) =>
            counts[a] > counts[b] ? a : b
        );
    };

    const QuizResult = ({ result }) => {
        const results = {
            A: {
                title: "The Kitchen Firefighter",
                diagnosis: "You're losing 8-12 hours/week on meal planning and logistics. You're stuck in a reactive loop of 'what's for dinner?'",
                prescription: "Kitchen Agent (Chapter 5)",
                timeSaved: "10 hours/week"
            },
            B: {
                title: "The Inbox Captive",
                diagnosis: "Your attention is being fractured by constant notifications. You're working for your email instead of it working for you.",
                prescription: "Email Agent (Chapter 8)",
                timeSaved: "5 hours/week"
            },
            C: {
                title: "The Calendar Tetris Player",
                diagnosis: "You're spending more time scheduling work than actually doing it. Your deep work blocks are non-existent.",
                prescription: "Calendar Agent (Chapter 9)",
                timeSaved: "4 hours/week"
            },
            D: {
                title: "The Mental Load Carrier",
                diagnosis: "You're carrying the invisible weight of 'remembering everything.' It's causing low-grade anxiety and decision fatigue.",
                prescription: "Home Agent (Chapter 6)",
                timeSaved: "Mental Sanity (Priceless)"
            }
        };

        const data = results[result] || results['A']; // Default to A if something goes wrong

        return (
            <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Diagnosis: <span className="text-blue-600">{data.title}</span></h2>

                <CaptainCallout title="CAPTAIN'S ANALYSIS" type="tip">
                    {data.diagnosis}
                </CaptainCallout>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6 shadow-lg mt-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Your Prescription:</h3>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                            Start with: {data.prescription}
                        </div>
                        <div className="flex items-center text-green-600 font-bold">
                            <span className="text-2xl mr-2">⚡</span>
                            Potential Savings: {data.timeSaved}
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-4">Ready to fix this permanently?</p>
                    <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition transform hover:scale-105 shadow-md">
                        Get the Cure - Start Reading
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto my-12 border border-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">The Household Triage Quiz</h2>
                <p className="text-gray-600">Where is your time actually going? Take this 60-second diagnostic.</p>
            </div>

            {!result ? (
                <div className="space-y-8">
                    {questions.map(q => (
                        <div key={q.id} className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{q.question}</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                {q.options.map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setAnswers({ ...answers, [q.id]: opt.value })}
                                        className={`text-left p-4 rounded-lg border-2 transition-all ${answers[q.id] === opt.value
                                                ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-sm'
                                                : 'border-gray-200 hover:border-blue-300 hover:bg-white'
                                            }`}
                                    >
                                        <span className="font-bold mr-2">{opt.value}.</span> {opt.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="text-center pt-4">
                        <button
                            className={`px-8 py-4 rounded-lg font-bold text-lg transition-all transform ${Object.keys(answers).length < questions.length
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg'
                                }`}
                            onClick={() => setResult(calculateResult())}
                            disabled={Object.keys(answers).length < questions.length}
                        >
                            Show My Results 🩺
                        </button>
                        {Object.keys(answers).length < questions.length && (
                            <p className="text-sm text-gray-500 mt-2">Answer all questions to proceed</p>
                        )}
                    </div>
                </div>
            ) : (
                <QuizResult result={result} />
            )}
        </div>
    );
}
