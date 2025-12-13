import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles, Clock, Target, Zap } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AIExperienceQuiz = () => {
    const { updatePersona } = useUser();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 'currentTools',
            question: 'Which AI tools have you tried?',
            subtitle: 'Select all that apply',
            type: 'multiple',
            options: [
                { value: 'chatgpt', label: 'ChatGPT' },
                { value: 'claude', label: 'Claude' },
                { value: 'gemini', label: 'Google Gemini' },
                { value: 'copilot', label: 'Microsoft Copilot' },
                { value: 'other', label: 'Other AI tools' },
                { value: 'none', label: "I haven't tried any yet" }
            ]
        },
        {
            id: 'howYouUseAI',
            question: 'How do you currently use AI?',
            subtitle: 'Be honest - there are no wrong answers!',
            options: [
                { value: 'never', label: "I don't use AI tools yet", icon: '🌱' },
                { value: 'questions', label: 'I ask questions and get answers', icon: '💬' },
                { value: 'tasks', label: 'I have it help me write or create things', icon: '✍️' },
                { value: 'workflows', label: 'I use it regularly in my daily work', icon: '⚡' },
                { value: 'automations', label: 'I have AI automations running for me', icon: '🤖' }
            ]
        },
        {
            id: 'biggestTimeDrain',
            question: "What eats up most of your time each day?",
            subtitle: "We'll recommend which agent to build first",
            options: [
                { value: 'morning', label: 'Getting organized each morning', icon: '🌅' },
                { value: 'email', label: 'Email and messages', icon: '📧' },
                { value: 'scheduling', label: 'Calendar and scheduling', icon: '📅' },
                { value: 'decisions', label: 'Making decisions (what to eat, buy, do)', icon: '🤔' },
                { value: 'tasks', label: 'Tracking todos and tasks', icon: '✅' },
                { value: 'research', label: 'Research and information gathering', icon: '🔍' }
            ]
        },
        {
            id: 'weeklyHours',
            question: 'How many hours per week do you spend on repetitive tasks?',
            subtitle: 'Email, scheduling, planning, organizing, etc.',
            options: [
                { value: '0-2', label: 'Less than 2 hours', hours: 1 },
                { value: '2-5', label: '2-5 hours', hours: 3.5 },
                { value: '5-10', label: '5-10 hours', hours: 7.5 },
                { value: '10-15', label: '10-15 hours', hours: 12.5 },
                { value: '15+', label: '15+ hours', hours: 18 }
            ]
        },
        {
            id: 'automationComfort',
            question: 'How comfortable are you with AI acting on your behalf?',
            subtitle: 'For example: sending emails, scheduling meetings, ordering items',
            type: 'scale',
            min: 1,
            max: 10,
            labels: {
                low: 'I want to approve everything',
                high: 'Let it run on autopilot'
            }
        }
    ];

    const handleAnswer = (questionId, value) => {
        if (questions[currentQuestion].type === 'multiple') {
            const current = answers[questionId] || [];
            // If selecting "none", clear other selections
            if (value === 'none') {
                setAnswers({ ...answers, [questionId]: ['none'] });
            } else {
                // If selecting something else, remove "none"
                const filtered = current.filter(v => v !== 'none');
                const newValue = filtered.includes(value)
                    ? filtered.filter(v => v !== value)
                    : [...filtered, value];
                setAnswers({ ...answers, [questionId]: newValue });
            }
        } else {
            setAnswers({ ...answers, [questionId]: value });
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
            const results = calculateResults();
            updatePersona({
                ...answers,
                ...results
            });
        }
    };

    const calculateResults = () => {
        const tools = answers.currentTools || [];
        const usage = answers.howYouUseAI || 'never';
        const timeDrain = answers.biggestTimeDrain || 'morning';
        const weeklyHours = answers.weeklyHours || '2-5';
        const comfort = answers.automationComfort || 5;

        // Determine experience level based on actual usage
        let experienceLevel = 'Newcomer';
        let levelDescription = "You're just getting started with AI - that's exciting!";

        if (usage === 'automations') {
            experienceLevel = 'Power User';
            levelDescription = "You're already ahead of 95% of people. Let's take it further.";
        } else if (usage === 'workflows') {
            experienceLevel = 'Practitioner';
            levelDescription = "You use AI regularly - now let's make it work FOR you.";
        } else if (usage === 'tasks') {
            experienceLevel = 'Explorer';
            levelDescription = "You've got the basics down. Ready to level up?";
        } else if (usage === 'questions') {
            experienceLevel = 'Beginner';
            levelDescription = "Using AI for answers is great! Let's teach it to do more.";
        }

        // Tool-specific insights (unbiased)
        let toolInsight = '';
        if (tools.includes('chatgpt')) {
            toolInsight = 'ChatGPT is a great foundation - you can build agents right inside it.';
        } else if (tools.includes('claude')) {
            toolInsight = 'Claude is excellent for detailed work - perfect for building agents.';
        } else if (tools.includes('gemini')) {
            toolInsight = 'Gemini integrates well with Google tools - useful for calendar agents.';
        } else if (tools.length > 0 && !tools.includes('none')) {
            toolInsight = 'Your tool experience will transfer directly to agent building.';
        } else {
            toolInsight = "No worries! We'll start from the basics with free tools.";
        }

        // Calculate time savings based on their current time drain
        const hoursMap = { '0-2': 1, '2-5': 3.5, '5-10': 7.5, '10-15': 12.5, '15+': 18 };
        const currentHours = hoursMap[weeklyHours] || 3.5;
        const potentialSavings = Math.round(currentHours * 0.4 * 10) / 10; // 40% savings
        const yearlySavings = Math.round(potentialSavings * 52);

        // First agent recommendation based on time drain
        const agentMap = {
            morning: { name: 'Morning Commander', chapter: 'Chapter 4', description: 'Automates your morning routine and daily planning' },
            email: { name: 'Email Agent', chapter: 'Chapter 6', description: 'Drafts, triages, and responds to emails for you' },
            scheduling: { name: 'Calendar Agent', chapter: 'Chapter 7', description: 'Manages your schedule and finds optimal meeting times' },
            decisions: { name: 'Decision Agent', chapter: 'Chapter 5', description: 'Helps you make faster, better decisions' },
            tasks: { name: 'Task Agent', chapter: 'Chapter 8', description: 'Tracks, prioritizes, and reminds you about tasks' },
            research: { name: 'Research Agent', chapter: 'Chapter 9', description: 'Gathers and summarizes information for you' }
        };

        const firstAgent = agentMap[timeDrain] || agentMap.morning;

        // Recommended starting point
        let startingChapter = 'Chapter 1';
        let startingAdvice = 'Start from the beginning for the full journey';

        if (experienceLevel === 'Power User') {
            startingChapter = 'Chapter 4';
            startingAdvice = 'Jump straight to building your first agent';
        } else if (experienceLevel === 'Practitioner') {
            startingChapter = 'Chapter 3';
            startingAdvice = 'Quick foundations review, then straight to agents';
        } else if (experienceLevel === 'Explorer') {
            startingChapter = 'Chapter 2';
            startingAdvice = 'Level up your prompting before building agents';
        }

        // Automation readiness
        let automationReadiness = 'Supervised';
        if (comfort >= 8) {
            automationReadiness = 'Full Autopilot';
        } else if (comfort >= 5) {
            automationReadiness = 'Guided Automation';
        }

        return {
            experienceLevel,
            levelDescription,
            toolInsight,
            potentialSavings,
            yearlySavings,
            firstAgent,
            startingChapter,
            startingAdvice,
            automationReadiness,
            timeDrain
        };
    };

    const results = showResults ? calculateResults() : null;
    const currentQ = questions[currentQuestion];
    const hasAnswer = currentQ.type === 'multiple'
        ? (answers[currentQ.id] || []).length > 0
        : answers[currentQ.id] !== undefined;

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
                        {/* Progress */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-cyan-400 font-mono">
                                    Question {currentQuestion + 1} of {questions.length}
                                </span>
                                <div className="flex gap-1">
                                    {questions.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`h-1 w-8 rounded ${idx <= currentQuestion ? 'bg-cyan-500' : 'bg-slate-700'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {currentQ.question}
                            </h3>
                            {currentQ.subtitle && (
                                <p className="text-slate-400 text-sm">{currentQ.subtitle}</p>
                            )}
                        </div>

                        {/* Scale type question */}
                        {currentQ.type === 'scale' ? (
                            <div className="space-y-4">
                                <input
                                    type="range"
                                    min={currentQ.min}
                                    max={currentQ.max}
                                    value={answers[currentQ.id] || 5}
                                    onChange={(e) => handleAnswer(currentQ.id, parseInt(e.target.value))}
                                    className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                />
                                <div className="flex justify-between text-sm text-slate-300">
                                    <span>{currentQ.labels?.low || `${currentQ.min}`}</span>
                                    <span className="text-cyan-400 font-bold text-2xl">
                                        {answers[currentQ.id] || 5}
                                    </span>
                                    <span>{currentQ.labels?.high || `${currentQ.max}`}</span>
                                </div>
                            </div>
                        ) : (
                            /* Option buttons */
                            <div className="space-y-3">
                                {currentQ.options.map((option) => {
                                    const isSelected = currentQ.type === 'multiple'
                                        ? (answers[currentQ.id] || []).includes(option.value)
                                        : answers[currentQ.id] === option.value;

                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => handleAnswer(currentQ.id, option.value)}
                                            className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${isSelected
                                                ? 'border-cyan-500 bg-cyan-900/30'
                                                : 'border-slate-600 hover:border-slate-500 bg-slate-900/50'
                                                }`}
                                        >
                                            {option.icon && (
                                                <span className="text-2xl">{option.icon}</span>
                                            )}
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-slate-600'}`}>
                                                {isSelected && <CheckCircle size={14} className="text-white" />}
                                            </div>
                                            <span className="text-white font-medium">{option.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        <button
                            onClick={handleNext}
                            disabled={!hasAnswer}
                            className="mt-8 w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See My Results'}
                            <ArrowRight size={20} />
                        </button>
                    </m.div>
                ) : (
                    /* Results */
                    <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
                                <Sparkles size={32} className="text-cyan-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">Your AI Profile</h3>
                            <div className="inline-block px-4 py-2 bg-cyan-500/20 rounded-full">
                                <span className="text-cyan-400 text-xl font-bold">{results.experienceLevel}</span>
                            </div>
                            <p className="text-slate-300 mt-3">{results.levelDescription}</p>
                        </div>

                        {/* Tool insight */}
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-600 mb-6">
                            <p className="text-slate-300 text-center">{results.toolInsight}</p>
                        </div>

                        {/* Stats grid */}
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-600 text-center">
                                <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                                <div className="text-sm text-slate-400 mb-1">Weekly Time Savings</div>
                                <div className="text-2xl font-bold text-cyan-400">{results.potentialSavings} hrs</div>
                            </div>
                            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-600 text-center">
                                <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                                <div className="text-sm text-slate-400 mb-1">Yearly Time Back</div>
                                <div className="text-2xl font-bold text-purple-400">{results.yearlySavings} hrs</div>
                            </div>
                            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-600 text-center">
                                <Zap className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                                <div className="text-sm text-slate-400 mb-1">Automation Style</div>
                                <div className="text-lg font-bold text-amber-400">{results.automationReadiness}</div>
                            </div>
                        </div>

                        {/* First agent recommendation */}
                        <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 rounded-xl border border-cyan-500/30 mb-6">
                            <div className="text-sm text-slate-300 mb-2">🤖 Your First Agent Should Be</div>
                            <div className="text-white font-bold text-2xl mb-1">{results.firstAgent.name}</div>
                            <div className="text-slate-400 text-sm mb-3">{results.firstAgent.description}</div>
                            <div className="text-cyan-400 text-sm font-medium">
                                Learn how in {results.firstAgent.chapter}
                            </div>
                        </div>

                        {/* Starting point */}
                        <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-600 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">Recommended Starting Point</div>
                                    <div className="text-white font-bold">{results.startingChapter}</div>
                                    <div className="text-slate-400 text-sm">{results.startingAdvice}</div>
                                </div>
                                <ArrowRight className="text-cyan-400" size={24} />
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setShowResults(false);
                                setCurrentQuestion(0);
                                setAnswers({});
                            }}
                            className="w-full text-cyan-400 hover:text-cyan-300 font-medium py-2"
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
