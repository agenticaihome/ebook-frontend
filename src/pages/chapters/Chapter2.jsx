import React, { useState, Suspense, createContext, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Brain, Sparkles, Share2, Copy, Eye, EyeOff, Database, Hand,
    Activity, Target, HelpCircle, DollarSign, Lightbulb
} from 'lucide-react';

import WebbookLayout from '../../components/layout/WebbookLayout';
import ChapterNavigation from '../../components/common/ChapterNavigation';

// Lazy load interactive components
const ToolRecommendationQuiz = React.lazy(() => import('../../components/ToolRecommendationQuiz'));
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// SPEED RUN CONTEXT
// ============================================
const SpeedRunContext = createContext(false);

// ============================================
// REUSABLE COMPONENTS (matching Chapter 1)
// ============================================

// Progress bar showing chapter position
const ChapterProgress = ({ current, total }) => (
    <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
            <m.div
                initial={{ width: 0 }}
                animate={{ width: `${(current / total) * 100}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            />
        </div>
        <span className="text-slate-400 text-sm font-mono">
            {current}/{total}
        </span>
    </div>
);

// Author credibility - builds trust fast
const AuthorCredibility = () => (
    <div className="flex items-center gap-3 bg-gradient-to-r from-slate-900/30 to-slate-800/20 rounded-lg px-4 py-3 mb-6 border border-slate-500/40 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
            DDS
        </div>
        <div className="flex-1">
            <p className="text-slate-300 text-sm">
                Written by a dad working <span className="text-white font-medium">50+ hour weeks</span> with{' '}
                <span className="text-white font-medium">2 kids under 3</span>.
                These systems kept me sane.
            </p>
        </div>
    </div>
);

// Speed Run Toggle - for impatient readers
const SpeedRunToggle = ({ enabled, onToggle }) => (
    <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${enabled
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
            : 'bg-slate-800/30 text-slate-400 border border-slate-500/40 hover:border-slate-400 backdrop-blur-sm'
            }`}
    >
        {enabled ? <Eye size={16} /> : <EyeOff size={16} />}
        {enabled ? 'Speed Run: ON' : 'Speed Run: OFF'}
    </button>
);

// TL;DR Card with stats
const TLDRCard = ({ stats, primaryCTA, onCTAClick }) => (
    <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 rounded-2xl p-6 border border-cyan-500/30 mb-8"
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
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all whitespace-nowrap"
            >
                {primaryCTA} <ArrowRight size={18} />
            </button>
        </div>
    </m.div>
);

// Shareable Quote Card - for virality
const ShareableQuote = ({ quote, chapter }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`"${quote}" — Agentic AI at Home, Chapter ${chapter}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-8 border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative">
                <div className="text-6xl text-cyan-500/30 font-serif leading-none mb-2">"</div>
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-4 -mt-8 pl-8">
                    {quote}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">— Chapter {chapter}</span>
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

// Quick Win Box
const QuickWin = ({ title, prompt, setupTime }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 rounded-2xl p-6 border border-green-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Zap className="text-green-400" size={20} />
                    <span className="text-green-400 font-bold uppercase text-sm tracking-wider">Quick Win</span>
                </div>
                <span className="text-slate-400 text-sm">{setupTime} setup</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>

            <div className="bg-slate-900/80 rounded-xl p-4 font-mono text-sm text-slate-300 mb-4">
                <pre className="whitespace-pre-wrap">{prompt}</pre>
            </div>

            <button
                onClick={handleCopy}
                className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${copied
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
            >
                {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
        </div>
    );
};

// Chapter Complete Box
const ChapterComplete = ({ achievements, nextChapter, nextTitle }) => (
    <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
            </div>
            <div>
                <span className="text-green-400 font-bold block">Chapter 2 Complete</span>
                <span className="text-slate-400 text-sm">You're 12% of the way there</span>
            </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
            <p className="text-white font-bold text-sm mb-3">What you accomplished:</p>
            <ul className="space-y-2">
                {achievements.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-4 rounded-xl transition-all">
            Continue to Chapter {nextChapter}: {nextTitle}
            <ArrowRight size={18} />
        </button>
    </div>
);

// ============================================
// CHAPTER 2 SPECIFIC COMPONENTS
// ============================================

// The 4-Role Card (visual, not paragraph)
const RoleCard = ({ emoji, title, subtitle, description, examples, color, isFirst }) => {
    const colors = {
        green: { bg: 'from-green-900/40 to-green-900/20', border: 'border-green-500/40', text: 'text-green-400' },
        orange: { bg: 'from-orange-900/40 to-orange-900/20', border: 'border-orange-500/40', text: 'text-orange-400' },
        cyan: { bg: 'from-cyan-900/40 to-cyan-900/20', border: 'border-cyan-500/40', text: 'text-cyan-400' },
        purple: { bg: 'from-purple-900/40 to-purple-900/20', border: 'border-purple-500/40', text: 'text-purple-400' },
    };

    const c = colors[color];

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative bg-gradient-to-br ${c.bg} rounded-xl p-5 border ${c.border} backdrop-blur-sm`}
        >
            {isFirst && (
                <div className="absolute -top-3 left-4 bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                    START HERE
                </div>
            )}
            <div className="flex items-start gap-4">
                <div className="text-4xl">{emoji}</div>
                <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-bold ${c.text}`}>{title}</h3>
                    <p className="text-slate-400 text-sm mb-2">{subtitle}</p>
                    <p className="text-slate-300 text-sm mb-3">{description}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {examples.map((ex, i) => (
                            <span key={i} className="bg-slate-900/60 text-slate-400 text-xs px-2 py-1 rounded">
                                {ex}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </m.div>
    );
};

// Decision Tree Component
const DecisionTree = () => {
    const [answer, setAnswer] = useState(null);

    const recommendations = {
        google: { name: 'Gemini', reason: 'Deep integration with your existing Google tools' },
        microsoft: { name: 'Microsoft Copilot', reason: 'Already in your Microsoft 365 workflow' },
        privacy: { name: 'Claude', reason: 'Best balance of capability and data handling' },
        unsure: { name: 'Claude', reason: 'Most versatile starting point—you can always switch' },
    };

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <HelpCircle className="text-cyan-400" size={20} />
                Quick Decision: Which Brain Should You Pick?
            </h3>

            {answer === null ? (
                <div className="space-y-3">
                    <p className="text-slate-400 text-sm mb-4">What's your primary ecosystem?</p>

                    {[
                        { id: 'google', label: 'Google (Gmail, Calendar, Docs)', emoji: '🔵' },
                        { id: 'microsoft', label: 'Microsoft (Outlook, Word, Teams)', emoji: '🟢' },
                        { id: 'privacy', label: 'Privacy is my priority', emoji: '🔒' },
                        { id: 'unsure', label: "I don't know / Mixed", emoji: '🤷' },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setAnswer(option.id)}
                            className="w-full flex items-center gap-3 bg-slate-900/50 hover:bg-slate-900 border border-slate-600 hover:border-cyan-500/50 rounded-xl p-4 text-left transition-all"
                        >
                            <span className="text-xl">{option.emoji}</span>
                            <span className="text-slate-200">{option.label}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <m.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 mb-4">
                        <CheckCircle className="text-cyan-400" size={32} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">
                        Start with {recommendations[answer].name}
                    </h4>
                    <p className="text-slate-400 mb-4">
                        {recommendations[answer].reason}
                    </p>
                    <button
                        onClick={() => setAnswer(null)}
                        className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
                    >
                        ← Choose again
                    </button>
                </m.div>
            )}
        </div>
    );
};

// Minimum Viable Stack Visual
const MinimumViableStack = () => (
    <div className="bg-gradient-to-br from-green-900/20 to-cyan-900/20 rounded-2xl p-6 border border-green-500/40 backdrop-blur-sm mb-8">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">Your Minimum Viable Stack</h3>
            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                ALL YOU NEED
            </span>
        </div>

        <div className="space-y-3 mb-6">
            {[
                { role: '🧠 BRAIN', tool: 'Claude or ChatGPT', cost: '$0-20/mo' },
                { role: '📚 MEMORY', tool: 'Apple Notes, Google Keep, or Notion', cost: 'Free' },
                { role: '✋ HANDS', tool: 'Your calendar + reminders app', cost: 'Free' },
                { role: '⚡ NERVES', tool: '(Skip for now—Chapter 13)', cost: '—' },
            ].map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                        <span className="text-lg">{item.role.split(' ')[0]}</span>
                        <div>
                            <span className="text-cyan-400 font-bold text-xs">{item.role.split(' ')[1]}</span>
                            <span className="text-slate-300 text-sm ml-2">{item.tool}</span>
                        </div>
                    </div>
                    <span className="text-green-400 text-xs font-medium">{item.cost}</span>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-900/50 rounded-xl">
            <div className="text-center">
                <div className="text-2xl font-bold text-green-400">$0-20</div>
                <div className="text-xs text-slate-400">/month</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">30 min</div>
                <div className="text-xs text-slate-400">setup</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">70%</div>
                <div className="text-xs text-slate-400">of benefits</div>
            </div>
        </div>
    </div>
);

// The 20-Minute Task Killer Protocol
const TaskKillerProtocol = () => {
    const [copiedStep, setCopiedStep] = useState(null);

    const steps = [
        {
            num: 1,
            title: 'Open your chosen Brain',
            description: 'Claude, ChatGPT, Gemini, or Copilot—whichever you picked above',
            prompt: null,
        },
        {
            num: 2,
            title: 'Tell it about your recurring task',
            description: 'The one you wrote down in Chapter 1',
            prompt: `I have a recurring task I always forget: [YOUR TASK FROM CHAPTER 1].

I want you to act as my agent for this. Ask me questions about:
- When this typically needs to happen
- What information you'd need to help me
- What "done" looks like for this task`,
        },
        {
            num: 3,
            title: 'Answer its questions',
            description: 'Be specific—the more context, the better it can help',
            prompt: null,
        },
        {
            num: 4,
            title: 'Ask it to create a system',
            description: 'Turn the conversation into a repeatable process',
            prompt: `Based on what I told you, create:
1. A weekly/daily check-in message you can send me
2. The exact questions you'll ask each time
3. How you'll track if this task is done

Save this as "Agent: [Task Name]" so we can use it again.`,
        },
        {
            num: 5,
            title: 'Set a trigger',
            description: 'Phone reminder to check in with your agent',
            prompt: null,
        },
    ];

    const handleCopy = (stepNum, prompt) => {
        navigator.clipboard.writeText(prompt);
        setCopiedStep(stepNum);
        setTimeout(() => setCopiedStep(null), 2000);
    };

    return (
        <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-2xl p-6 border-2 border-orange-500/50 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Zap className="text-orange-400" size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">The 20-Minute Task Killer</h3>
                    <p className="text-slate-400 text-sm">Delete that recurring task from your brain—right now</p>
                </div>
            </div>

            <div className="my-6 p-4 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                <p className="text-yellow-400 font-medium text-sm flex items-center gap-2">
                    <Target size={16} />
                    Remember the task you wrote down in Chapter 1? This is where we fix it.
                </p>
            </div>

            <div className="space-y-4">
                {steps.map((step) => (
                    <div
                        key={step.num}
                        className="bg-slate-900/50 rounded-xl p-4 border border-slate-600"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm flex-shrink-0">
                                {step.num}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-bold">{step.title}</h4>
                                <p className="text-slate-400 text-sm mt-1">{step.description}</p>

                                {step.prompt && (
                                    <div className="mt-3">
                                        <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300 relative group">
                                            <pre className="whitespace-pre-wrap">{step.prompt}</pre>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(step.num, step.prompt)}
                                            className={`mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${copiedStep === step.num
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-slate-800 text-slate-400 hover:text-white'
                                                }`}
                                        >
                                            {copiedStep === step.num ? <CheckCircle size={14} /> : <Copy size={14} />}
                                            {copiedStep === step.num ? 'Copied!' : 'Copy prompt'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-green-900/30 rounded-xl border border-green-500/40">
                <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                    <CheckCircle size={16} />
                    Examples of Tasks Killed
                </h4>
                <div className="space-y-2 text-sm">
                    {[
                        { task: 'Water the plants', result: 'Agent checks in every Sunday, tracks which plants need attention' },
                        { task: 'Pay electricity bill', result: 'Agent reminds 3 days before due, confirms when done' },
                        { task: 'Meal planning', result: 'Agent asks about the week each Sunday, suggests recipes' },
                    ].map((example, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <span className="text-slate-400">"</span>
                            <span className="text-white font-medium">{example.task}</span>
                            <span className="text-slate-400">"</span>
                            <span className="text-slate-400">→ {example.result}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Compact Case Study
const CaseStudyCard = ({ name, role, problem, result, timeframe, quote }) => (
    <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-5 border border-slate-500/40 backdrop-blur-sm mb-8">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">
                {name.charAt(0)}
            </div>
            <div>
                <span className="text-white font-medium">{name}</span>
                <span className="text-slate-400 text-sm ml-2">{role}</span>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/20">
                <span className="text-red-400 text-xs font-bold uppercase">Before</span>
                <p className="text-slate-300 text-sm mt-1">{problem}</p>
            </div>
            <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/20">
                <span className="text-green-400 text-xs font-bold uppercase">After {timeframe}</span>
                <p className="text-slate-300 text-sm mt-1">{result}</p>
            </div>
        </div>

        <p className="text-slate-400 text-sm italic border-l-2 border-cyan-500/50 pl-3">
            "{quote}"
        </p>
    </div>
);

// ============================================
// CHAPTER 2 MAIN COMPONENT
// ============================================

const Chapter2 = () => {
    const [speedRun, setSpeedRun] = useState(false);
    const navigate = useNavigate();

    const scrollToQuiz = () => {
        document.getElementById('tool-quiz')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 2: Building Your AI Team | Agentic AI at Home</title>
                <meta name="description" content="How to create and manage your first AI agents for maximum efficiency" />
            </Helmet>
            
                        <SpeedRunContext.Provider value={speedRun}>
                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* Progress Bar */}
                        <ChapterProgress current={2} total={16} />

                        {/* Author Credibility */}
                        <AuthorCredibility />

                        {/* Chapter Navigation */}
                        <ChapterNavigation
                            previousChapter="/part1/chapter1"
                            nextChapter="/part1/chapter3"
                            partNumber={1}
                            chapterNumber={2}
                        />

                        {/* Header */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="text-cyan-400 font-mono text-sm mb-2">Chapter 2</div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Building Your AI Team
                            </h1>
                            <p className="text-xl text-slate-400 mb-4">
                                The 4 roles that will delete that task you named
                            </p>

                            {/* Reading time + Speed Run toggle */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4 text-slate-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        <span>7 min read</span>
                                    </div>
                                    <span>•</span>
                                    <span className="text-green-400">20 min to implement</span>
                                </div>
                                <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                            </div>
                        </m.div>

                        {/* TL;DR Card */}
                        <TLDRCard
                            stats={[
                                { value: '4', label: 'roles to fill' },
                                { value: '$0-20', label: 'to start' },
                                { value: '20 min', label: 'to kill your task' },
                            ]}
                            primaryCTA="Find My Tools"
                            onCTAClick={scrollToQuiz}
                        />

                        {/* CAPTAIN EFFICIENCY - OPENER */}
                        {!speedRun && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="default"
                                    message="Time to build your team. In Chapter 1, you learned the difference between tools that wait and systems that work. Now we put that into practice. By the end of this chapter, you'll have picked your AI 'Brain' and handed off that recurring task you've been carrying. Ready to meet your new team?"
                                />
                            </Suspense>
                        )}

                        {/* Speed Run Notice */}
                        {speedRun && (
                            <m.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-cyan-900/30 rounded-xl p-4 border border-cyan-500/40 backdrop-blur-sm mb-8"
                            >
                                <div className="flex items-center gap-2 text-cyan-400">
                                    <Zap size={18} />
                                    <span className="font-bold">Speed Run Mode</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-1">
                                    Showing only the essential frameworks and prompts. Toggle off to see the full chapter.
                                </p>
                            </m.div>
                        )}

                        {/* ★ QUIZ FIRST - PATTERN INTERRUPT ★ */}
                        <section id="tool-quiz" className="mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                                <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Find Your Match</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                            </div>

                            <Suspense fallback={
                                <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-800/50 rounded-xl animate-pulse">
                                    Loading quiz...
                                </div>
                            }>
                                <ToolRecommendationQuiz />
                            </Suspense>
                        </section>

                        {/* THE 4-ROLE FRAMEWORK */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-white mb-2">The 4-Role Framework</h2>
                            <p className="text-slate-400 mb-6">
                                You don't need 47 apps. You need <strong className="text-white">4 roles filled</strong>. That's it.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <RoleCard
                                    emoji="🧠"
                                    title="THE BRAIN"
                                    subtitle="The Thinker"
                                    description="Plans, drafts, analyzes, decides. Your strategic partner."
                                    examples={['Claude', 'ChatGPT', 'Gemini']}
                                    color="green"
                                    isFirst={true}
                                />
                                <RoleCard
                                    emoji="📚"
                                    title="THE MEMORY"
                                    subtitle="The Librarian"
                                    description="Remembers everything—preferences, files, past decisions."
                                    examples={['Notion', 'Obsidian', 'Apple Notes']}
                                    color="orange"
                                />
                                <RoleCard
                                    emoji="✋"
                                    title="THE HANDS"
                                    subtitle="The Doer"
                                    description="Takes action—sends emails, schedules meetings, pays bills."
                                    examples={['Calendar', 'Gmail', 'YNAB']}
                                    color="cyan"
                                />
                                <RoleCard
                                    emoji="⚡"
                                    title="THE NERVES"
                                    subtitle="The Connector"
                                    description="Wires the Brain to the Hands. Automations that trigger actions."
                                    examples={['Zapier', 'Make', 'IFTTT']}
                                    color="purple"
                                />
                            </div>

                            {/* Quick mapping help */}
                            {!speedRun && (
                                <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-5 border border-slate-500/40 backdrop-blur-sm">
                                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                        <Target className="text-cyan-400" size={18} />
                                        Where Does Your Task Go?
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        That task from Chapter 1? Here's which role handles it:
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        {[
                                            { role: 'BRAIN', examples: 'Morning briefings, email summaries, decision recommendations' },
                                            { role: 'MEMORY', examples: 'Recipes, preferences, birthdays, gift ideas' },
                                            { role: 'HANDS', examples: 'Scheduling, reminders, paying bills, sending messages' },
                                            { role: 'NERVES', examples: '"When X happens, do Y" (we\'ll cover this in Chapter 13)' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                                <span className="text-cyan-400 font-bold text-xs min-w-[60px]">{item.role}</span>
                                                <span className="text-slate-300">{item.examples}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* DECISION TREE - Which Tool? */}
                        {!speedRun && (
                            <section className="mb-10">
                                <DecisionTree />
                            </section>
                        )}

                        {/* MINIMUM VIABLE STACK */}
                        <section className="mb-10">
                            <MinimumViableStack />
                        </section>

                        {/* THE 20-MINUTE TASK KILLER */}
                        <section className="mb-10">
                            <TaskKillerProtocol />
                        </section>

                        {/* CASE STUDY - Compact */}
                        {!speedRun && (
                            <CaseStudyCard
                                name="Marcus"
                                role="Sales manager, father of 3"
                                problem="Forgot to follow up with leads. Missed his daughter's recital reminder."
                                result="Zero dropped leads. Phone buzzes only for what matters."
                                timeframe="2 weeks"
                                quote="I stopped being the person who forgets things. That identity shift was worth more than the hours saved."
                            />
                        )}

                        {/* SHAREABLE QUOTE */}
                        <ShareableQuote
                            quote="You don't need 47 apps. You need 4 roles filled. The Brain thinks. The Memory remembers. The Hands act. The Nerves connect. That's your whole team."
                            chapter={2}
                        />

                        {/* CAPTAIN EFFICIENCY - CLOSER */}
                        {!speedRun && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="celebrating"
                                    message="Your first agent is live. That task you've been carrying? It's no longer your problem. Your Brain is handling it now. But here's the thing—you just gave an AI access to your calendar, your tasks, maybe your email. Before we go deeper, Chapter 3 makes sure you stay safe while getting all the benefits. Trust me, it's important. 🔒"
                                />
                            </Suspense>
                        )}

                        {/* CHAPTER COMPLETE */}
                        <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <CheckCircle className="text-green-400" size={24} />
                                </div>
                                <div>
                                    <span className="text-green-400 font-bold block">Chapter 2 Complete</span>
                                    <span className="text-slate-400 text-sm">You're 12% of the way there</span>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
                                <p className="text-white font-bold text-sm mb-3">What you accomplished:</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                                        The 4-role framework (Brain, Memory, Hands, Nerves)
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                                        Picked your AI "Brain" tool
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                                        Set up your first agent to handle a recurring task
                                    </li>
                                </ul>
                            </div>

                            <button
                                onClick={() => navigate('/part1/chapter3')}
                                className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-4 rounded-xl transition-all"
                            >
                                Continue to Chapter 3: Privacy & Security
                                <ArrowRight size={18} />
                            </button>
                        </div>

                        {/* Bottom Navigation */}
                        <ChapterNavigation
                            previousChapter="/part1/chapter1"
                            nextChapter="/part1/chapter3"
                            partNumber={1}
                            chapterNumber={2}
                        />

                    </div>
                </div>
            </SpeedRunContext.Provider>
        </WebbookLayout>
    );
};

export default Chapter2;