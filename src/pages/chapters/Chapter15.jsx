import React, { useState, Suspense, createContext } from 'react';
import { Helmet } from 'react-helmet-async';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, Wrench, AlertTriangle,
    RefreshCw, Shield, HelpCircle, Search, Bug, Lightbulb,
    ThumbsUp, ThumbsDown, Settings, Target, XCircle, CheckCircle2,
    MessageSquare, Repeat, TrendingDown, TrendingUp, Activity,
    FileQuestion, Clipboard, Heart, AlertCircle, Timer, RotateCcw
} from 'lucide-react';
import PasswordGate from '../../components/common/PasswordGate';

// Lazy load interactive components
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
import AIToolLinks from '../../components/AIToolLinks';
import FAQSection, { chapter15FAQs } from '../../components/FAQSection';

// ============================================
// SPEED RUN CONTEXT
// ============================================
const SpeedRunContext = createContext(false);

// ============================================
// REUSABLE COMPONENTS
// ============================================

const ChapterProgress = ({ current, total, part, partTitle }) => (
    <div className="mb-6">
        {part && (
            <div className="text-teal-400 font-bold text-sm mb-2 uppercase tracking-wider">
                Part {part}: {partTitle}
            </div>
        )}
        <div className="flex items-center gap-3">
            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(current / total) * 100}%` }}
                    className="h-full bg-gradient-to-r from-teal-500 to-purple-500"
                />
            </div>
            <span className="text-slate-500 text-sm font-mono">
                {current}/{total}
            </span>
        </div>
    </div>
);

const SpeedRunToggle = ({ enabled, onToggle }) => (
    <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${enabled
            ? 'bg-teal-500/20 text-teal-400 border border-teal-500/50'
            : 'bg-slate-800/30 text-slate-400 border border-slate-500/40 hover:border-slate-400 backdrop-blur-sm'
            }`}
    >
        {enabled ? <Eye size={16} /> : <EyeOff size={16} />}
        {enabled ? 'Professional Mode: ON' : 'Professional Mode: OFF'}
    </button>
);

const TLDRCard = ({ stats, primaryCTA, onCTAClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-900/40 to-red-900/40 rounded-2xl p-6 border border-orange-500/30 mb-8"
    >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                ))}
            </div>
            <button
                onClick={onCTAClick}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all whitespace-nowrap"
            >
                {primaryCTA} <ArrowRight size={18} />
            </button>
        </div>
    </motion.div>
);

const ShareableQuote = ({ quote, chapter }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`"${quote}" — The Agentic AI Adventure, Chapter ${chapter}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-8 border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500/10 rounded-full blur-3xl" />

            <div className="relative">
                <div className="text-6xl text-orange-500/30 font-serif leading-none mb-2">"</div>
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-4 -mt-8 pl-8">
                    {quote}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">— Chapter {chapter}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${copied
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-slate-700/50 text-slate-400 hover:text-white'
                                }`}
                        >
                            {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-slate-700/50 text-slate-400 hover:text-white transition-all">
                            <Share2 size={14} />
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Quick Win Component
const QuickWin = ({ title, description, prompt, variant = 'default' }) => {
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const variants = {
        default: {
            gradient: 'from-green-900/40 to-emerald-900/40',
            border: 'border-green-500/40',
            icon: 'bg-green-500/20 text-green-400',
            button: 'bg-green-500 hover:bg-green-400',
            accent: 'text-green-400',
        },
        secondary: {
            gradient: 'from-orange-900/40 to-amber-900/40',
            border: 'border-orange-500/40',
            icon: 'bg-orange-500/20 text-orange-400',
            button: 'bg-orange-500 hover:bg-orange-400',
            accent: 'text-orange-400',
        },
        tertiary: {
            gradient: 'from-blue-900/40 to-indigo-900/40',
            border: 'border-blue-500/40',
            icon: 'bg-blue-500/20 text-blue-400',
            button: 'bg-blue-500 hover:bg-blue-400',
            accent: 'text-blue-400',
        },
    };

    const v = variants[variant];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-r ${v.gradient} rounded-2xl p-6 border ${v.border} backdrop-blur-sm mb-6`}
        >
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${v.icon} flex items-center justify-center flex-shrink-0`}>
                    <Zap size={24} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold uppercase ${v.accent}`}>⚡ Quick Win</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{description}</p>

                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-3"
                    >
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {expanded ? 'Hide prompt' : 'View prompt'}
                    </button>

                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-slate-900/70 rounded-xl p-4 mb-4 border border-slate-700">
                                    <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                                        {prompt}
                                    </pre>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center gap-2 ${v.button} text-slate-900 font-bold px-4 py-2 rounded-lg transition-all`}
                                >
                                    {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                                    {copied ? 'Copied!' : 'Copy Prompt'}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

const ChapterComplete = ({ achievements, nextChapter, nextTitle, isFinalChapter = false }) => (
    <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
            </div>
            <div>
                <span className="text-green-400 font-bold block">Discovery 15 Complete</span>
                <span className="text-slate-400 text-sm">You're 93% of the way there!</span>
            </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
            <p className="text-white font-bold text-sm mb-3">What you learned:</p>
            <ul className="space-y-2">
                {achievements.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-400 hover:to-purple-400 text-white font-bold px-6 py-4 rounded-xl transition-all">
            {isFinalChapter ? '🎉 Complete the Journey' : `Continue to Chapter ${nextChapter}: ${nextTitle}`}
            <ArrowRight size={18} />
        </button>
    </div>
);

// ============================================
// Discovery 15 SPECIFIC COMPONENTS
// ============================================

// Common Problems Visual
const CommonProblemsGrid = () => {
    const [expandedProblem, setExpandedProblem] = useState(null);

    const problems = [
        {
            id: 1,
            icon: MessageSquare,
            title: 'Agent gives generic responses',
            symptom: 'Outputs feel templated and unhelpful',
            cause: 'Not enough context in the prompt',
            fix: 'Add specific details about your situation, preferences, and constraints',
            example: 'Add: "I have 2 kids, work 50+ hours, hate meal prep on weekdays"',
            color: 'orange',
        },
        {
            id: 2,
            icon: Repeat,
            title: 'Agent forgets previous context',
            symptom: 'Have to re-explain everything each time',
            cause: 'AI doesn\'t retain memory between sessions',
            fix: 'Include key context at the start of each conversation, or use a "context block"',
            example: 'Start with: "Continuing our meal planning—family of 4, $150/week budget, no shellfish"',
            color: 'blue',
        },
        {
            id: 3,
            icon: TrendingDown,
            title: 'Agent output quality dropped',
            symptom: 'Used to work great, now gives worse results',
            cause: 'Your needs evolved but the prompt didn\'t',
            fix: 'Review and update prompts quarterly; add new constraints as life changes',
            example: 'Update: "Now also avoiding gluten" or "Kids are now in school, different schedule"',
            color: 'purple',
        },
        {
            id: 4,
            icon: XCircle,
            title: 'Agent misunderstands requests',
            symptom: 'Gives answers to questions you didn\'t ask',
            cause: 'Ambiguous language or missing specifics',
            fix: 'Be explicit. Use "I want X, not Y" format. Give examples of good output.',
            example: '"Give me 3 dinner ideas (not suggestions to meal prep, not recipes—just the dish names)"',
            color: 'red',
        },
        {
            id: 5,
            icon: Timer,
            title: 'Agent takes too long to be useful',
            symptom: 'By the time you explain, you could have done it yourself',
            cause: 'Using wrong agent for the task, or prompt too complex',
            fix: 'Match task to agent. Break complex requests into steps. Use shortcuts.',
            example: 'Instead of explaining, say: "Quick grocery add: milk, eggs, bread"',
            color: 'yellow',
        },
        {
            id: 6,
            icon: AlertCircle,
            title: 'Agent gives incorrect information',
            symptom: 'Facts are wrong, dates are off, numbers don\'t add up',
            cause: 'AI can hallucinate, especially with specific data',
            fix: 'Always verify critical info. Use agents for structure, not facts. Ask for sources.',
            example: 'Say: "Double-check this against my calendar" or "Cite where you got that"',
            color: 'rose',
        },
    ];

    const colorClasses = {
        orange: { bg: 'bg-orange-500/20', border: 'border-orange-500/40', text: 'text-orange-400' },
        blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-400' },
        purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-400' },
        red: { bg: 'bg-red-500/20', border: 'border-red-500/40', text: 'text-red-400' },
        yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-400' },
        rose: { bg: 'bg-rose-500/20', border: 'border-rose-500/40', text: 'text-rose-400' },
    };

    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Bug className="text-orange-400" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Common Problems & Fixes</h2>
                    <p className="text-slate-400 text-sm">Click any problem to see the solution</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {problems.map((problem) => {
                    const colors = colorClasses[problem.color];
                    const isExpanded = expandedProblem === problem.id;

                    return (
                        <motion.div
                            key={problem.id}
                            layout
                            onClick={() => setExpandedProblem(isExpanded ? null : problem.id)}
                            className={`${colors.bg} rounded-xl p-4 border ${colors.border} cursor-pointer transition-all hover:scale-[1.02]`}
                        >
                            <div className="flex items-start gap-3">
                                <problem.icon className={colors.text} size={20} />
                                <div className="flex-1">
                                    <h4 className="text-white font-medium mb-1">{problem.title}</h4>
                                    <p className="text-slate-400 text-sm">{problem.symptom}</p>
                                </div>
                                <ChevronDown
                                    className={`text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                    size={16}
                                />
                            </div>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 pt-4 border-t border-slate-700"
                                    >
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-slate-500 text-xs uppercase">Cause:</span>
                                                <p className="text-slate-300 text-sm">{problem.cause}</p>
                                            </div>
                                            <div>
                                                <span className="text-green-400 text-xs uppercase">Fix:</span>
                                                <p className="text-slate-300 text-sm">{problem.fix}</p>
                                            </div>
                                            <div className="bg-slate-900/50 rounded-lg p-2">
                                                <span className="text-slate-500 text-xs">Example:</span>
                                                <p className="text-slate-400 text-xs italic mt-1">{problem.example}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

// Diagnostic Flowchart
const DiagnosticFlowchart = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            question: 'Is the agent responding at all?',
            yes: 1,
            no: 'Check: Is the AI service working? Try a simple "Hello" test.',
            noAction: 'Service issue—wait and retry, or check status page',
        },
        {
            question: 'Is the response relevant to your request?',
            yes: 2,
            no: 'Your prompt may be unclear. Re-read it—would a stranger understand?',
            noAction: 'Rewrite prompt with more specific context',
        },
        {
            question: 'Is the quality good enough to use?',
            yes: 3,
            no: 'Missing context or constraints. What would make it better?',
            noAction: 'Add: examples of good output, specific constraints, or format requirements',
        },
        {
            question: 'Is it consistent across multiple uses?',
            yes: 'done',
            no: 'AI has variability. Add more structure to reduce randomness.',
            noAction: 'Use numbered lists, specific formats, or "always/never" rules',
        },
    ];

    const handleAnswer = (answer) => {
        if (answer === 'yes') {
            const next = steps[currentStep].yes;
            if (next === 'done') {
                setCurrentStep('done');
            } else {
                setCurrentStep(next);
            }
        } else {
            setCurrentStep(`no-${currentStep}`);
        }
    };

    const reset = () => setCurrentStep(0);

    const isNoState = typeof currentStep === 'string' && currentStep.startsWith('no-');
    const noIndex = isNoState ? parseInt(currentStep.split('-')[1]) : null;

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                    <Search className="text-teal-400" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Diagnostic Flowchart</h2>
                    <p className="text-slate-400 text-sm">Find the problem in 4 questions</p>
                </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6">
                {currentStep === 'done' ? (
                    <div className="text-center">
                        <CheckCircle2 className="text-green-400 mx-auto mb-3" size={48} />
                        <h3 className="text-green-400 font-bold text-xl mb-2">All Systems Go!</h3>
                        <p className="text-slate-400 mb-4">Your agent is working properly. If issues persist, try the System Health Check below.</p>
                        <button onClick={reset} className="text-teal-400 hover:text-teal-300 text-sm">
                            ↺ Run diagnostic again
                        </button>
                    </div>
                ) : isNoState ? (
                    <div>
                        <AlertTriangle className="text-orange-400 mb-3" size={32} />
                        <h3 className="text-orange-400 font-bold mb-2">Problem Identified</h3>
                        <p className="text-slate-300 mb-3">{steps[noIndex].no}</p>
                        <div className="bg-green-900/30 rounded-lg p-3 border border-green-500/30 mb-4">
                            <span className="text-green-400 font-bold text-sm">→ Fix:</span>
                            <p className="text-slate-300 text-sm mt-1">{steps[noIndex].noAction}</p>
                        </div>
                        <button onClick={reset} className="text-teal-400 hover:text-teal-300 text-sm">
                            ↺ Start over
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-teal-400 font-mono text-sm">Step {currentStep + 1}/4</span>
                            <div className="flex-1 h-1 bg-slate-700 rounded-full">
                                <div
                                    className="h-full bg-teal-500 rounded-full transition-all"
                                    style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                                />
                            </div>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-6">{steps[currentStep].question}</h3>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleAnswer('yes')}
                                className="flex-1 flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-bold py-3 rounded-xl border border-green-500/40 transition-all"
                            >
                                <ThumbsUp size={18} /> Yes
                            </button>
                            <button
                                onClick={() => handleAnswer('no')}
                                className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold py-3 rounded-xl border border-red-500/40 transition-all"
                            >
                                <ThumbsDown size={18} /> No
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Maintenance Schedule
const MaintenanceSchedule = () => {
    const schedule = [
        {
            frequency: 'Weekly',
            color: 'green',
            tasks: [
                'Review agent outputs from the week',
                'Note any friction points or annoyances',
                'Quick-fix obvious prompt issues',
            ],
            time: '5 min',
        },
        {
            frequency: 'Monthly',
            color: 'blue',
            tasks: [
                'Check which agents you\'re actually using',
                'Retire unused agents (less clutter)',
                'Update context for life changes',
            ],
            time: '15 min',
        },
        {
            frequency: 'Quarterly',
            color: 'purple',
            tasks: [
                'Full prompt review and optimization',
                'Add new agents for new needs',
                'Consolidate overlapping agents',
                'Update all personal context',
            ],
            time: '30 min',
        },
    ];

    const colorClasses = {
        green: 'bg-green-500/20 border-green-500/40 text-green-400',
        blue: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
        purple: 'bg-purple-500/20 border-purple-500/40 text-purple-400',
    };

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Settings className="text-blue-400" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Maintenance Schedule</h2>
                    <p className="text-slate-400 text-sm">Keep your system running smoothly</p>
                </div>
            </div>

            <div className="space-y-4">
                {schedule.map((item, i) => (
                    <div key={i} className={`${colorClasses[item.color]} rounded-xl p-4 border`}>
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-white">{item.frequency}</h4>
                            <span className="text-xs bg-slate-900/50 px-2 py-1 rounded">{item.time}</span>
                        </div>
                        <ul className="space-y-2">
                            {item.tasks.map((task, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                                    <CheckCircle2 size={12} className="text-slate-500" />
                                    {task}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

// When to Start Fresh
const WhenToStartFresh = () => {
    const signs = [
        { text: 'You\'re fighting the prompt more than it\'s helping', severity: 'high' },
        { text: 'The agent\'s purpose has completely changed', severity: 'high' },
        { text: 'Patches on top of patches (prompt is a mess)', severity: 'medium' },
        { text: 'You can\'t remember what half the instructions mean', severity: 'medium' },
        { text: 'A fresh CRAFT prompt would be faster than fixing', severity: 'low' },
    ];

    return (
        <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl p-6 border border-red-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <RotateCcw className="text-red-400" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">When to Start Fresh</h2>
                    <p className="text-slate-400 text-sm">Sometimes rebuilding is faster than fixing</p>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                {signs.map((sign, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-900/50 rounded-lg p-3">
                        <div className={`w-2 h-2 rounded-full ${sign.severity === 'high' ? 'bg-red-400' :
                            sign.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                            }`} />
                        <span className="text-slate-300 text-sm">{sign.text}</span>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900/50 rounded-lg p-3 border-l-2 border-red-500">
                <p className="text-red-400 text-sm">
                    <Lightbulb className="inline mr-1" size={12} />
                    Before deleting: Copy any good parts to reuse. Don't lose what worked.
                </p>
            </div>
        </div>
    );
};

// ============================================
// Discovery 15 MAIN COMPONENT
// ============================================

const Chapter15 = () => {
    const [speedRun, setSpeedRun] = useState(false);

    const scrollToProblems = () => {
        document.getElementById('common-problems')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <SpeedRunContext.Provider value={speedRun}>
            <Helmet>
                <title>Discovery 15: Troubleshooting | The Agentic AI Adventure</title>
                <meta name="description" content="Fix common agent problems, run diagnostics, and maintain your Life Operating System for peak performance." />
            </Helmet>

            <div className="min-h-screen bg-[#0f0f1a]">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    {/* Progress Bar */}
                    <ChapterProgress
                        current={15}
                        total={16}
                        part={5}
                        partTitle="Integration & Mastery"
                    />

                    {/* Author Credibility */}


                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <div className="text-orange-400 font-mono text-sm mb-2">Discovery 15</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Troubleshooting
                        </h1>
                        <p className="text-xl text-slate-400 mb-4">
                            When things go wrong (and how to fix them)
                        </p>

                        {/* Reading time */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4 text-slate-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} />
                                    <span>10 min read</span>
                                </div>
                                <span>•</span>
                                <span className="text-orange-400">System maintenance</span>
                            </div>
                            <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                        </div>
                    </motion.div>

                    {/* TL;DR Card */}
                    <TLDRCard
                        stats={[
                            { value: '6', label: 'common problems' },
                            { value: '4', label: 'diagnostic steps' },
                            { value: '∞', label: 'confidence' },
                        ]}
                        primaryCTA="Fix My Agent"
                        onCTAClick={scrollToProblems}
                    />

                    <PasswordGate partNumber={5}>
                        {/* CAPTAIN EFFICIENCY - OPENER */}
                        {!speedRun && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="default"
                                    message="Here's a secret: every system breaks sometimes. Your car needs oil changes. Your phone needs updates. Your agents need maintenance too. This isn't a failure—it's normal. The difference between frustrated users and power users? Knowing how to diagnose and fix problems quickly. Let's make you self-sufficient."
                                />
                            </Suspense>
                        )}

                        {/* Speed Run Notice */}
                        {speedRun && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-orange-900/30 rounded-xl p-4 border border-orange-500/40 backdrop-blur-sm mb-8"
                            >
                                <div className="flex items-center gap-2 text-orange-400">
                                    <Zap size={18} />
                                    <span className="font-bold">Speed Run Mode</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-1">
                                    Showing essential fixes only. Toggle off for interactive diagnostics.
                                </p>
                            </motion.div>
                        )}

                        {/* COMMON PROBLEMS */}
                        <section id="common-problems">
                            <CommonProblemsGrid />
                        </section>

                        {/* DIAGNOSTIC FLOWCHART */}
                        {!speedRun && <DiagnosticFlowchart />}

                        {/* QUICK WIN: System Health Check */}
                        <QuickWin
                            title="System Health Check Agent"
                            description="Run a diagnostic on your entire Life OS to find issues before they become problems."
                            prompt={`You are my System Health Check Agent. Help me audit my Life Operating System.

Ask me about each agent category:

1. DAILY OPERATIONS (Meals, Groceries, Household)
   - Which do I use regularly?
   - Any friction points?
   - Missing any needs?

2. DIGITAL SYSTEMS (Email, Calendar, Admin)
   - Working smoothly?
   - Any that feel redundant?
   - Response quality good?

3. LIFE SYSTEMS (Health, Relationships, Learning)
   - All still relevant?
   - Context up to date?
   - Any life changes to incorporate?

After the audit, provide:
- Health Score (1-10)
- Top 3 issues to fix
- Quick wins (easy improvements)
- Suggested retirements (agents to remove)
- Missing coverage (new agents to consider)

Keep it actionable—I want a clear to-do list.`}
                        />

                        {/* MAINTENANCE SCHEDULE */}
                        {!speedRun && <MaintenanceSchedule />}

                        {/* QUICK WIN: Prompt Doctor */}
                        <QuickWin
                            variant="secondary"
                            title="Prompt Doctor"
                            description="Diagnose and fix underperforming prompts with targeted improvements."
                            prompt={`You are my Prompt Doctor. I'll share a prompt that isn't working well, and you'll diagnose and fix it.

When I share a problematic prompt, analyze it for:

1. CONTEXT CHECK
   - Is there enough background?
   - Would a stranger understand the situation?

2. ROLE CHECK
   - Is the agent's expertise clear?
   - Is the personality defined?

3. ACTION CHECK
   - Are the tasks specific?
   - Are there clear action verbs?

4. FORMAT CHECK
   - Is output structure specified?
   - Length/style requirements clear?

5. TONE CHECK
   - Is the voice defined?
   - Does it match intended use?

For each issue found:
- Explain what's wrong
- Show the problematic part
- Provide the fixed version

Then give me the complete, improved prompt I can copy and use.`}
                        />

                        {/* WHEN TO START FRESH */}
                        {!speedRun && <WhenToStartFresh />}

                        {/* QUICK WIN: Fresh Start */}
                        <QuickWin
                            variant="tertiary"
                            title="Fresh Start Builder"
                            description="When fixing isn't worth it, build a better replacement from scratch."
                            prompt={`You are my Fresh Start Builder. I have an agent that's beyond repair—help me build a better replacement.

First, ask me:
1. What was the OLD agent supposed to do?
2. What actually worked well? (Save these parts)
3. What frustrated you most?
4. Has your need changed since you created it?

Then build the new agent using CRAFT:

CONTEXT: [Based on my current situation]
ROLE: [Clearer expertise definition]
ACTION: [Specific, prioritized tasks]
FORMAT: [Structured output requirements]
TONE: [Matched to my preferences]

Include:
- Everything that worked from the old version
- Fixes for everything that frustrated me
- Updates for how my needs have evolved

Give me the complete new prompt, ready to use.`}
                        />

                        {/* SHAREABLE QUOTE */}
                        <ShareableQuote
                            quote="The best systems aren't the ones that never break. They're the ones you know how to fix."
                            chapter={15}
                        />

                        {/* CAPTAIN EFFICIENCY - CLOSER */}
                        {!speedRun && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="celebrating"
                                    message="You're now self-sufficient. When agents misbehave, you know how to diagnose the problem. When prompts underperform, you can fix them. When systems need maintenance, you have a schedule. You're not dependent on anyone else to keep your Life OS running. One chapter left. Let's see how far you've come—and where you're going. The finale awaits. 🌟"
                                />
                            </Suspense>
                        )}

                        {/* CHAPTER COMPLETE */}
                        {/* QUICK ACCESS TO ALL AI TOOLS */}
                        <section className="mb-10">
                            <AIToolLinks />
                        </section>

                        {/* FAQ SECTION */}
                        <section className="mb-10">
                            <FAQSection faqs={chapter15FAQs} title="Troubleshooting FAQ" />
                        </section>

                        <ChapterComplete
                            achievements={[
                                '6 common problems and their fixes',
                                'Diagnostic flowchart mastery',
                                'System Health Check agent',
                                'Maintenance schedule established',
                                'Prompt Doctor for repairs',
                                'Fresh Start process for rebuilds',
                            ]}
                            nextChapter={16}
                            nextTitle="Your New Life"
                        />

                    </PasswordGate>
                    <ChapterNavigation
                        previousChapter="/part5/chapter2"
                        nextChapter="/part5/chapter4"
                        partNumber={5}
                        chapterNumber={3}
                    />






                </div>
            </div>
        </SpeedRunContext.Provider>
    );
};

export default Chapter15;
