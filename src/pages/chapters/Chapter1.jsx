import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import ChapterNavigation from '../../components/common/ChapterNavigation';

import React, { useState, Suspense, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Brain, Sparkles, Share2, Copy, Eye, EyeOff, MessageSquare,
    AlertTriangle, Target, Lightbulb
} from 'lucide-react';

// Lazy load interactive components
const AIExperienceQuiz = React.lazy(() => import('../../components/AIExperienceQuiz'));
const MentalLoadCalculator = React.lazy(() => import('../../components/MentalLoadCalculator'));
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
// ============================================
// SPEED RUN CONTEXT
// ============================================
const SpeedRunContext = createContext(false);

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Progress bar showing chapter position
const ChapterProgress = ({ current, total }) => (
    <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(current / total) * 100}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            />
        </div>
        <span className="text-slate-500 text-sm font-mono">
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
    <motion.div
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
    </motion.div>
);

// Expandable Story Hook
const StoryHook = ({ hook, fullStory }) => {
    const [expanded, setExpanded] = useState(false);
    const speedRun = useContext(SpeedRunContext);

    if (speedRun) return null;

    return (
        <div className="relative bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-8 border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
            <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-0">{hook}</p>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 mt-4 border-t border-slate-700 prose prose-invert prose-sm max-w-none">
                            {fullStory}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-cyan-400 text-sm mt-4 hover:text-cyan-300 transition-colors"
            >
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {expanded ? 'Show less' : 'Read the full story'}
            </button>
        </div>
    );
};

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

// Deep Dive expandable section
const DeepDive = ({ title, children }) => {
    const [expanded, setExpanded] = useState(false);
    const speedRun = useContext(SpeedRunContext);

    if (speedRun) return null;

    return (
        <div className="bg-purple-900/20 rounded-xl border border-purple-500/40 backdrop-blur-sm mb-6 overflow-hidden">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-purple-900/30 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Brain className="text-purple-400" size={18} />
                    <span className="text-purple-400 font-medium text-sm">Deep Dive:</span>
                    <span className="text-white font-medium">{title}</span>
                </div>
                {expanded ? <ChevronUp size={18} className="text-purple-400" /> : <ChevronDown size={18} className="text-purple-400" />}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 border-t border-purple-500/20">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Stat Card
const StatCard = ({ value, label, color = 'red' }) => {
    const colors = {
        red: 'bg-red-900/20 border-red-500/30 text-red-400',
        green: 'bg-green-900/20 border-green-500/30 text-green-400',
        cyan: 'bg-cyan-900/20 border-cyan-500/30 text-cyan-400',
        purple: 'bg-purple-900/20 border-purple-500/30 text-purple-400',
    };

    return (
        <div className={`rounded-xl p-5 border ${colors[color]}`}>
            <div className="text-3xl font-bold mb-1">{value}</div>
            <div className="text-slate-400 text-sm">{label}</div>
        </div>
    );
};

// Before/After Comparison
const BeforeAfter = ({ before, after, metric }) => {
    const speedRun = useContext(SpeedRunContext);

    if (speedRun) return null;

    return (
        <div className="mb-8">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-900/20 rounded-xl p-5 border border-red-500/30">
                    <div className="text-red-400 font-bold text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                        <AlertTriangle size={14} /> Before
                    </div>
                    <ul className="space-y-2">
                        {before.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="text-red-400 mt-0.5">✗</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-green-900/20 rounded-xl p-5 border border-green-500/30">
                    <div className="text-green-400 font-bold text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle size={14} /> After
                    </div>
                    <ul className="space-y-2">
                        {after.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={14} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {metric && (
                <div className="bg-gradient-to-r from-slate-900/30 to-slate-800/20 rounded-xl p-4 flex items-center justify-center gap-4 backdrop-blur-sm">
                    <span className="text-red-400 line-through text-xl">{metric.before}</span>
                    <ArrowRight className="text-slate-500" size={20} />
                    <span className="text-green-400 font-bold text-2xl">{metric.after}</span>
                    <span className="text-slate-400 text-sm">{metric.label}</span>
                </div>
            )}
        </div>
    );
};

// Newbie-Friendly Explainer
const NewbieBox = ({ title, children }) => (
    <div className="bg-blue-900/20 rounded-xl p-5 border border-blue-500/30 mb-6">
        <div className="flex items-start gap-3">
            <MessageSquare className="text-blue-400 flex-shrink-0 mt-1" size={18} />
            <div>
                <h4 className="text-blue-400 font-bold text-sm mb-2">{title}</h4>
                <div className="text-slate-300 text-sm">{children}</div>
            </div>
        </div>
    </div>
);

// Captain Efficiency - Your AI Guide
const CaptainEfficiency = ({ variant = 'default', children }) => {
    const variants = {
        default: {
            bg: 'from-cyan-900/40 to-blue-900/40',
            border: 'border-cyan-500/50',
            accent: 'text-cyan-400',
        },
        celebration: {
            bg: 'from-green-900/40 to-cyan-900/40',
            border: 'border-green-500/50',
            accent: 'text-green-400',
        },
        tip: {
            bg: 'from-yellow-900/40 to-orange-900/40',
            border: 'border-yellow-500/50',
            accent: 'text-yellow-400',
        },
    };

    const v = variants[variant];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-gradient-to-r ${v.bg} rounded-2xl p-6 border ${v.border} mb-8 relative overflow-hidden`}
        >
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex gap-4 relative">
                {/* Captain Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                        <span className="text-2xl">🦸</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`font-bold ${v.accent}`}>Captain Efficiency</span>
                        <Sparkles size={14} className={v.accent} />
                    </div>
                    <div className="text-slate-200 text-[15px] leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
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
                <span className="text-green-400 font-bold block">Chapter 1 Complete</span>
                <span className="text-slate-400 text-sm">You're 6% of the way there</span>
            </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
            <p className="text-white font-bold text-sm mb-3">What you now understand:</p>
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
// CHAPTER 1 MAIN COMPONENT
// ============================================

const Chapter1 = () => {
    const [speedRun, setSpeedRun] = useState(false);

    const scrollToQuiz = () => {
        document.getElementById('experience-quiz')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <SpeedRunContext.Provider value={speedRun}>
            <div className="min-h-screen bg-[#0f0f1a]">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    {/* Progress Bar */}
                    <ChapterProgress current={1} total={16} />

                    {/* Author Credibility */}
                    <AuthorCredibility />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <div className="text-cyan-400 font-mono text-sm mb-2">Chapter 1</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            The Everything-Manager
                        </h1>
                        <p className="text-xl text-slate-400 mb-4">
                            Why you're drowning in decisions—and how agents change that
                        </p>

                        {/* Reading time + Speed Run toggle */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <Clock size={14} />
                                <span>6 min read</span>
                            </div>
                            <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                        </div>
                    </motion.div>

                    {/* TL;DR Card */}
                    <TLDRCard
                        stats={[
                            { value: '100+', label: 'decisions/morning' },
                            { value: '30 min', label: 'saved daily' },
                            { value: '$0', label: 'to start' },
                        ]}
                        primaryCTA="Take the Quiz"
                        onCTAClick={scrollToQuiz}
                    />

                    {/* CAPTAIN EFFICIENCY - OPENER */}
                    {!speedRun && (
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="Welcome, future agent-builder. I'm Captain Efficiency, and I'll be your guide through this book. Right now, your brain is juggling a hundred things it shouldn't have to. By the end of this chapter, you'll understand why that's happening—and see the first glimpse of how we fix it. Ready?"
                            />
                        </Suspense>
                    )}

                    {/* Speed Run Notice */}
                    {speedRun && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-cyan-900/30 rounded-xl p-4 border border-cyan-500/40 backdrop-blur-sm mb-8"
                        >
                            <div className="flex items-center gap-2 text-cyan-400">
                                <Zap size={18} />
                                <span className="font-bold">Speed Run Mode</span>
                            </div>
                            <p className="text-slate-400 text-sm mt-1">
                                Showing only the essential prompts and tools. Toggle off to see the full chapter.
                            </p>
                        </motion.div>
                    )}

                    {/* Story Hook - DARKER, SHORTER */}
                    <StoryHook
                        hook={
                            <>
                                <strong className="text-white">Sarah didn't remember falling asleep.</strong>{' '}
                                She remembered her laptop at 11:47 PM. Then—alarm. 5:47 AM. Presentation in 48 minutes.
                                Wrong calendar day. <em>Again.</em>{' '}
                                <span className="text-cyan-400 font-medium">
                                    "Something has to break. I just hope it's not me."
                                </span>
                            </>
                        }
                        fullStory={
                            <>
                                <p className="text-slate-300 mb-4">
                                    Her hands shook as she grabbed her phone. 47 unread emails. The important one from her manager—buried between a Target receipt and a LinkedIn notification she'd never asked for.
                                </p>
                                <p className="text-slate-300 mb-4">
                                    While scanning emails, she started the coffee maker. No filter. She didn't notice until brown water pooled across the counter.
                                </p>
                                <p className="text-slate-300 mb-4">
                                    By 6:32 AM, Sarah was sitting in her car, presentation half-ready, wondering how other people made this look easy. Her kids would wake up in an hour. Her husband was traveling. And she couldn't remember if she'd paid the electricity bill.
                                </p>
                                <p className="text-slate-400 italic">
                                    Three months later, Sarah would wake up to a single notification. Everything she needed—weather, calendar, kids' schedules, that electricity bill—summarized in 30 seconds. She didn't ask for it. Her agent just... handled it.
                                </p>
                            </>
                        }
                    />

                    {/* THE PROBLEM - Stat Cards */}
                    {!speedRun && (
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-white mb-4">The Chaos Is Measurable</h2>
                            <p className="text-slate-400 mb-6">
                                This isn't about discipline. It's about capacity.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <StatCard value="200+" label="decisions per day" color="red" />
                                <StatCard value="23 min" label="to refocus after interruption" color="red" />
                                <StatCard value="2.5 hrs" label="daily life admin" color="red" />
                                <StatCard value="80%" label="can be automated" color="cyan" />
                            </div>
                        </section>
                    )}

                    {/* Before/After Visual */}
                    <BeforeAfter
                        before={[
                            'Check 6 apps to piece together your morning',
                            '30 minutes of mental chaos before work starts',
                            'Constant background anxiety: "What am I forgetting?"',
                            'Reactive—always catching up',
                        ]}
                        after={[
                            'One notification with everything you need',
                            '5 minutes to full clarity',
                            'Agent tracks it—your brain doesn\'t have to',
                            'Proactive—you start ahead',
                        ]}
                        metric={{ before: '30 min', after: '5 min', label: 'morning routine' }}
                    />

                    {/* SHAREABLE QUOTE */}
                    <ShareableQuote
                        quote="You don't need more willpower. You need fewer decisions. Agents don't add to your life—they subtract from the chaos."
                        chapter={1}
                    />

                    {/* NEWBIE EXPLAINER */}
                    <NewbieBox title="New to AI? Start here.">
                        <p className="mb-2">
                            You've probably heard of ChatGPT, Claude, or Gemini. Those are <strong className="text-white">chatbots</strong>—you ask, they answer.
                        </p>
                        <p>
                            An <strong className="text-white">agent</strong> is different. It watches, plans, and acts <em>without you asking</em>. Like having an assistant who already knows your routine.
                        </p>
                    </NewbieBox>

                    {/* CORE CONCEPT: Chatbot vs Agent */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">The Difference That Changes Everything</h2>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-orange-900/20 rounded-xl p-5 border border-orange-500/30">
                                <div className="text-3xl mb-3">💬</div>
                                <h3 className="text-orange-400 font-bold text-lg mb-2">Chatbot</h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    A brilliant assistant who waits for instructions.
                                </p>
                                <div className="bg-slate-900/50 rounded-lg p-3 text-sm">
                                    <span className="text-slate-500">You:</span>{' '}
                                    <span className="text-slate-300">"What's the weather?"</span>
                                    <br />
                                    <span className="text-slate-500">Bot:</span>{' '}
                                    <span className="text-slate-300">"72°F and sunny."</span>
                                </div>
                            </div>

                            <div className="bg-cyan-900/20 rounded-xl p-5 border border-cyan-500/30">
                                <div className="text-3xl mb-3">🤖</div>
                                <h3 className="text-cyan-400 font-bold text-lg mb-2">Agent</h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    A team member who runs your playbook autonomously.
                                </p>
                                <div className="bg-slate-900/50 rounded-lg p-3 text-sm">
                                    <span className="text-slate-500">Agent:</span>{' '}
                                    <span className="text-slate-300">"Rain at 2 PM. I moved your outdoor meeting inside and texted the team."</span>
                                </div>
                            </div>
                        </div>

                        {/* Key Insight */}
                        <div className="bg-cyan-900/30 rounded-xl p-6 border border-cyan-500/40">
                            <div className="flex items-start gap-4">
                                <Lightbulb className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
                                <div>
                                    <p className="text-white font-bold mb-2">The shift in one sentence:</p>
                                    <p className="text-slate-300">
                                        Chatbots answer questions.{' '}
                                        <strong className="text-cyan-400">Agents eliminate the need to ask.</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Deep Dive - Technical Explainer */}
                    <DeepDive title="How agents actually work (technical)">
                        <div className="space-y-4 text-sm">
                            <p className="text-slate-300">
                                Agents operate on a continuous loop with four stages:
                            </p>
                            <div className="grid md:grid-cols-4 gap-3">
                                {[
                                    { emoji: '👁', label: 'OBSERVE', desc: 'Monitor inputs (calendar, email, sensors)' },
                                    { emoji: '🧠', label: 'PLAN', desc: 'Decide what action serves your goals' },
                                    { emoji: '✋', label: 'ACT', desc: 'Execute within defined permissions' },
                                    { emoji: '📊', label: 'REPORT', desc: 'Surface only what needs your attention' },
                                ].map((step, i) => (
                                    <div key={i} className="bg-slate-900/50 rounded-lg p-3 text-center">
                                        <div className="text-2xl mb-2">{step.emoji}</div>
                                        <div className="text-purple-400 font-bold text-xs mb-1">{step.label}</div>
                                        <div className="text-slate-400 text-xs">{step.desc}</div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-slate-400">
                                The key: this loop runs <em>continuously</em>, not just when you ask. That's the difference between a tool you use and a system that works for you.
                            </p>
                        </div>
                    </DeepDive>

                    {/* INTERACTIVE: AI Experience Quiz */}
                    <section id="experience-quiz" className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                            <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Interactive</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                        </div>

                        <Suspense fallback={
                            <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                Loading quiz...
                            </div>
                        }>
                            <AIExperienceQuiz />
                        </Suspense>
                    </section>

                    {/* INTERACTIVE: Mental Load Calculator */}
                    {!speedRun && (
                        <section className="mb-10">
                            <Suspense fallback={
                                <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                    Loading calculator...
                                </div>
                            }>
                                <MentalLoadCalculator />
                            </Suspense>
                        </section>
                    )}

                    {/* QUICK WIN */}
                    <QuickWin
                        title="Your First Agent Conversation"
                        setupTime="10 min"
                        prompt={`I want you to act as my morning briefing agent.

Ask me:
1. What time I wake up
2. What info I need each morning (weather, calendar, priorities)
3. How I want it formatted (bullet points, paragraphs, etc.)

Then show me what tomorrow's briefing would look like.`}
                    />

                    {/* YOUR FIRST TEST - Commitment Device */}
                    {!speedRun && (
                        <section className="mb-10">
                            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/20 rounded-2xl p-8 border-2 border-yellow-500/50">
                                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <Target className="text-yellow-400" />
                                    Before You Continue
                                </h3>

                                <p className="text-slate-300 mb-6">
                                    Write down <strong className="text-white">ONE task</strong> you're tired of remembering.
                                </p>

                                <div className="bg-slate-900/80 rounded-xl p-6 mb-6">
                                    <p className="text-white font-medium mb-2">
                                        The one that slips through the cracks. The recurring "I forgot to..." moment.
                                    </p>
                                    <p className="text-slate-400 text-sm">
                                        Water the plants. Pay a bill. Send that follow-up. Check the school calendar.
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    {[
                                        { emoji: '📝', label: 'Write it down' },
                                        { emoji: '📱', label: 'Text it to yourself' },
                                        { emoji: '🐦', label: 'Tweet #AgenticAI' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-slate-800/50 rounded-lg p-3 text-center">
                                            <div className="text-2xl mb-1">{item.emoji}</div>
                                            <div className="text-xs text-slate-400">{item.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-500/40">
                                    <p className="text-cyan-400 font-bold text-center">
                                        Chapter 2 shows you exactly how to delete this task from your brain.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CAPTAIN EFFICIENCY - CLOSER */}
                    {!speedRun && (
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="celebrating"
                                message="Look at you! You just learned the most important concept in this entire book—the difference between a tool that waits and a system that works. That task you wrote down? In Chapter 2, I'm going to show you exactly how to hand it off to your first agent. No more mental Post-It notes. Let's go. 🚀"
                            />
                        </Suspense>
                    )}                {/* CHAPTER COMPLETE */}
                    <ChapterComplete
                        achievements={[
                            'The difference between chatbots and agents',
                            'Why mental load is measurable (and fixable)',
                            'The Observe → Plan → Act → Report loop',
                        ]}
                        nextChapter={2}
                        nextTitle="Building Your AI Team"
                    />

                </div>
            </div>
        </SpeedRunContext.Provider>
    );
};

export default Chapter1;