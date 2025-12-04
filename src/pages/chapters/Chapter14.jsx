import React, { useState, Suspense, createContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, Wand2, Layers, GitBranch,
    Mic, Smartphone, Settings, Code, Brain, Target, Lightbulb,
    RefreshCw, Shield, Lock, Unlock, Play, Terminal, Puzzle,
    Workflow, Command, Crown, Star, ChevronRight, AlertCircle,
    Sliders, Cpu, Network, BookOpen, PenTool, Repeat, Gauge,
    Users, Rocket, Award, TrendingUp
} from 'lucide-react';
import PasswordGate from '../../components/common/PasswordGate';

// Lazy load interactive components
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

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
            <div className="text-cyan-400 font-bold text-sm mb-2 uppercase tracking-wider">
                Part {part}: {partTitle}
            </div>
        )}
        <div className="flex items-center gap-3">
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
    </div>
);

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

const ShareableQuote = ({ quote, chapter }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`"${quote}" — Agentic AI at Home, Chapter ${chapter}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-8 border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
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

// Quick Win Component with variants
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
            gradient: 'from-purple-900/40 to-violet-900/40',
            border: 'border-purple-500/40',
            icon: 'bg-purple-500/20 text-purple-400',
            button: 'bg-purple-500 hover:bg-purple-400',
            accent: 'text-purple-400',
        },
        tertiary: {
            gradient: 'from-blue-900/40 to-indigo-900/40',
            border: 'border-blue-500/40',
            icon: 'bg-blue-500/20 text-blue-400',
            button: 'bg-blue-500 hover:bg-blue-400',
            accent: 'text-blue-400',
        },
        master: {
            gradient: 'from-yellow-900/40 to-orange-900/40',
            border: 'border-yellow-500/40',
            icon: 'bg-yellow-500/20 text-yellow-400',
            button: 'bg-yellow-500 hover:bg-yellow-400',
            accent: 'text-yellow-400',
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
                    {variant === 'master' ? <Crown size={24} /> : <Zap size={24} />}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold uppercase ${v.accent}`}>
                            {variant === 'master' ? '👑 Master Prompt' : '⚡ Quick Win'}
                        </span>
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

const ChapterComplete = ({ achievements, nextChapter, nextTitle }) => (
    <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
            </div>
            <div>
                <span className="text-green-400 font-bold block">Chapter 14 Complete</span>
                <span className="text-slate-400 text-sm">You're 87% of the way there!</span>
            </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
            <p className="text-white font-bold text-sm mb-3">What you mastered:</p>
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
// CHAPTER 14 SPECIFIC COMPONENTS
// ============================================

// Skill Level Indicator
const SkillLevelBadge = () => (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 px-4 py-2 rounded-full border border-purple-500/30 mb-6">
        <Zap className="text-purple-400" size={16} />
        <span className="text-purple-400 font-bold text-sm">ADVANCED LEVEL</span>
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full ${i <= 4 ? 'bg-purple-400' : 'bg-slate-600'}`} />
            ))}
        </div>
    </div>
);

// Before/After Prompt Comparison
const PromptTransformation = () => {
    const examples = [
        {
            context: 'Grocery List Request',
            before: 'Make me a grocery list',
            after: `You are my Meal Planning Assistant. I'm feeding a family of 4 (2 adults, 2 toddlers) with a weekly grocery budget of $150.

Create a grocery list for this week's meals:
- Monday: Tacos
- Tuesday: Pasta
- Wednesday: Stir fry
- Thursday: Leftovers
- Friday: Pizza night (homemade)

Format as: Category → Items (with quantities)
Flag any items over $10
Suggest store-brand alternatives where possible`,
            improvement: '10x more useful output',
        },
        {
            context: 'Email Help',
            before: 'Help me write an email to my boss',
            after: `You are my Professional Communication Coach. I need to email my manager Sarah about taking PTO next month.

Context:
- We have a big project deadline on the 15th
- I want time off from the 20th-24th
- I've already arranged coverage with my colleague Mike
- Sarah prefers brief, direct communication

Write a professional email that:
1. States the request clearly upfront
2. Addresses the project deadline proactively
3. Mentions coverage is arranged
4. Keeps it under 100 words

Tone: Professional but warm`,
            improvement: 'Ready to send vs. needs 5 rewrites',
        },
    ];

    const [activeExample, setActiveExample] = useState(0);

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <TrendingUp className="text-cyan-400" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Prompt Transformation</h2>
                    <p className="text-slate-400 text-sm">See the difference context makes</p>
                </div>
            </div>

            {/* Example tabs */}
            <div className="flex gap-2 mb-4">
                {examples.map((ex, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveExample(i)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${activeExample === i
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                            : 'bg-slate-800/50 text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        {ex.context}
                    </button>
                ))}
            </div>

            {/* Before/After */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-900/20 rounded-xl p-4 border border-red-500/30">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-red-400 font-bold text-sm">❌ BEFORE</span>
                    </div>
                    <p className="text-slate-400 text-sm font-mono">{examples[activeExample].before}</p>
                </div>
                <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-green-400 font-bold text-sm">✓ AFTER (CRAFT)</span>
                    </div>
                    <pre className="text-slate-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                        {examples[activeExample].after}
                    </pre>
                </div>
            </div>

            <div className="mt-4 bg-cyan-900/20 rounded-lg p-3 border border-cyan-500/30">
                <p className="text-cyan-400 text-sm font-medium">
                    Result: {examples[activeExample].improvement}
                </p>
            </div>
        </div>
    );
};

// The CRAFT Framework for Prompts
const CRAFTFramework = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            letter: 'C',
            name: 'Context',
            color: 'cyan',
            description: 'Set the scene. Who is the agent? What\'s the situation?',
            example: '"You are my personal finance advisor. I\'m a 35-year-old with two kids, saving for retirement and college."',
            tip: 'More context = more relevant responses',
        },
        {
            letter: 'R',
            name: 'Role',
            color: 'purple',
            description: 'Define the agent\'s expertise and personality.',
            example: '"You are detail-oriented, proactive, and always explain your reasoning. You never make assumptions without asking."',
            tip: 'Be specific about HOW the agent should behave',
        },
        {
            letter: 'A',
            name: 'Action',
            color: 'green',
            description: 'What exactly should the agent DO?',
            example: '"Analyze my weekly spending, categorize expenses, identify savings opportunities, and suggest a realistic budget."',
            tip: 'Use action verbs: analyze, create, suggest, remind',
        },
        {
            letter: 'F',
            name: 'Format',
            color: 'orange',
            description: 'How should the output be structured?',
            example: '"Present findings as: 1) Summary (3 sentences), 2) Top 3 issues, 3) Specific recommendations, 4) Next steps."',
            tip: 'Specify length, structure, and style',
        },
        {
            letter: 'T',
            name: 'Tone',
            color: 'rose',
            description: 'What voice should the agent use?',
            example: '"Be encouraging but honest. Don\'t sugarcoat problems, but always offer solutions. Use casual language."',
            tip: 'Match the tone to your preference',
        },
    ];

    const colorClasses = {
        cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/40 text-cyan-400',
        purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/40 text-purple-400',
        green: 'from-green-500/20 to-green-500/5 border-green-500/40 text-green-400',
        orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/40 text-orange-400',
        rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/40 text-rose-400',
    };

    const bgColors = {
        cyan: 'bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/40',
        purple: 'bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/40',
        green: 'bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/40',
        orange: 'bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/40',
        rose: 'bg-gradient-to-br from-rose-500/20 to-rose-500/5 border border-rose-500/40',
    };

    const textColors = {
        cyan: 'text-cyan-400',
        purple: 'text-purple-400',
        green: 'text-green-400',
        orange: 'text-orange-400',
        rose: 'text-rose-400',
    };

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <PenTool className="text-purple-400" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">The CRAFT Framework</h2>
                    <p className="text-slate-400 text-sm">Build perfect prompts every time</p>
                </div>
            </div>

            {/* Letter tabs */}
            <div className="flex gap-2 mb-4">
                {steps.map((step, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`flex-1 py-3 rounded-xl font-bold text-2xl transition-all ${activeStep === i
                            ? `${bgColors[step.color]} ${textColors[step.color]}`
                            : 'bg-slate-800/50 text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        {step.letter}
                    </button>
                ))}
            </div>

            {/* Active step detail */}
            <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${bgColors[steps[activeStep].color]} rounded-xl p-5`}
            >
                <h3 className="font-bold text-white text-lg mb-2">
                    {steps[activeStep].letter} = {steps[activeStep].name}
                </h3>
                <p className="text-slate-300 mb-4">{steps[activeStep].description}</p>

                <div className="bg-slate-900/50 rounded-lg p-3 mb-3">
                    <span className="text-slate-500 text-xs uppercase">Example:</span>
                    <p className="text-slate-300 text-sm italic mt-1">{steps[activeStep].example}</p>
                </div>

                <div className="flex items-start gap-2">
                    <Lightbulb className="text-yellow-400 flex-shrink-0 mt-0.5" size={14} />
                    <p className="text-yellow-400 text-sm">{steps[activeStep].tip}</p>
                </div>
            </motion.div>
        </div>
    );
};

// Custom Agent Builder
const CustomAgentBuilder = () => {
    const [step, setStep] = useState(1);
    const [agent, setAgent] = useState({
        name: '',
        purpose: '',
        context: '',
        triggers: '',
    });

    const steps = [
        { num: 1, label: 'Name & Purpose', icon: Target },
        { num: 2, label: 'Context', icon: Brain },
        { num: 3, label: 'Triggers', icon: Zap },
        { num: 4, label: 'Generate', icon: Wand2 },
    ];

    return (
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-6 border border-green-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Wand2 className="text-green-400" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Custom Agent Builder</h2>
                    <p className="text-slate-400 text-sm">Create agents for YOUR unique needs</p>
                </div>
            </div>

            {/* Progress steps */}
            <div className="flex items-center justify-between mb-6">
                {steps.map((s, i) => (
                    <React.Fragment key={s.num}>
                        <button
                            onClick={() => setStep(s.num)}
                            className={`flex flex-col items-center gap-1 transition-all ${step >= s.num ? 'text-green-400' : 'text-slate-600'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= s.num ? 'bg-green-500/20 border border-green-500/50' : 'bg-slate-800'
                                }`}>
                                <s.icon size={18} />
                            </div>
                            <span className="text-xs hidden md:block">{s.label}</span>
                        </button>
                        {i < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2 ${step > s.num ? 'bg-green-500' : 'bg-slate-700'}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Step content */}
            <div className="bg-slate-900/50 rounded-xl p-4 mb-4">
                {step === 1 && (
                    <div className="space-y-4">
                        <div>
                            <label className="text-slate-400 text-sm mb-1 block">Agent Name</label>
                            <input
                                type="text"
                                placeholder="e.g., Pet Care Coordinator"
                                value={agent.name}
                                onChange={e => setAgent({ ...agent, name: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500"
                            />
                        </div>
                        <div>
                            <label className="text-slate-400 text-sm mb-1 block">What should this agent do?</label>
                            <textarea
                                placeholder="e.g., Track vet appointments, medication schedules, feeding times, and grooming needs for my two dogs"
                                value={agent.purpose}
                                onChange={e => setAgent({ ...agent, purpose: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 h-24"
                            />
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <label className="text-slate-400 text-sm mb-1 block">Relevant context</label>
                        <textarea
                            placeholder="e.g., I have a 3-year-old Golden Retriever named Max (needs daily medication) and a 1-year-old Beagle named Lucy (special diet for allergies)"
                            value={agent.context}
                            onChange={e => setAgent({ ...agent, context: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 h-32"
                        />
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <label className="text-slate-400 text-sm mb-1 block">When should this agent activate?</label>
                        <textarea
                            placeholder="e.g., Daily morning check-in, 1 week before vet appointments, when medication is running low, monthly grooming reminder"
                            value={agent.triggers}
                            onChange={e => setAgent({ ...agent, triggers: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 h-32"
                        />
                    </div>
                )}
                {step === 4 && (
                    <div className="text-center py-4">
                        <Wand2 className="text-green-400 mx-auto mb-3" size={32} />
                        <p className="text-white font-bold mb-2">Ready to generate your custom agent!</p>
                        <p className="text-slate-400 text-sm mb-4">
                            Based on your inputs, we'll create a complete prompt you can use.
                        </p>
                        <button className="bg-green-500 hover:bg-green-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all">
                            Generate Agent Prompt
                        </button>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
                <button
                    onClick={() => setStep(Math.max(1, step - 1))}
                    className={`px-4 py-2 rounded-lg text-sm ${step > 1 ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-600'}`}
                    disabled={step === 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => setStep(Math.min(4, step + 1))}
                    className={`px-4 py-2 rounded-lg text-sm ${step < 4 ? 'bg-green-500 text-slate-900 font-bold' : 'bg-slate-800 text-slate-600'}`}
                    disabled={step === 4}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

// Multi-Agent Chains
const MultiAgentChains = () => {
    const chains = [
        {
            name: 'Event Planning Chain',
            trigger: 'New event added to calendar',
            agents: ['Calendar Defender', 'Meal Planner', 'Admin Tracker', 'Connection Agent'],
            flow: 'Event detected → Block prep time → Plan food if hosting → Budget check → Guest list review',
            color: 'purple',
        },
        {
            name: 'Travel Prep Chain',
            trigger: '"I\'m traveling to X next week"',
            agents: ['Admin Tracker', 'Health Coordinator', 'Supplies Tracker', 'Email Triage'],
            flow: 'Check travel docs → Medication supply → Packing list → Set email auto-reply',
            color: 'blue',
        },
        {
            name: 'Sick Day Chain',
            trigger: '"I\'m not feeling well"',
            agents: ['Calendar Defender', 'Email Triage', 'Health Coordinator', 'Meal Planner'],
            flow: 'Clear today\'s meetings → Draft reschedule emails → Symptom tracking → Easy meal suggestions',
            color: 'rose',
        },
    ];

    const colorClasses = {
        purple: 'bg-gradient-to-r from-purple-900/40 to-purple-900/20 border-purple-500/40',
        blue: 'bg-gradient-to-r from-blue-900/40 to-blue-900/20 border-blue-500/40',
        rose: 'bg-gradient-to-r from-rose-900/40 to-rose-900/20 border-rose-500/40',
    };

    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <GitBranch className="text-indigo-400" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Multi-Agent Chains</h2>
                    <p className="text-slate-400 text-sm">Complex workflows, one trigger</p>
                </div>
            </div>

            <div className="space-y-4">
                {chains.map((chain, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`${colorClasses[chain.color]} rounded-xl p-5 border backdrop-blur-sm`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-white">{chain.name}</h3>
                            <span className="text-xs bg-slate-900/50 px-2 py-1 rounded text-slate-400">
                                {chain.agents.length} agents
                            </span>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg p-2 mb-3">
                            <span className="text-slate-500 text-xs">Trigger:</span>
                            <span className="text-white text-sm ml-2">{chain.trigger}</span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap mb-3">
                            {chain.agents.map((agent, j) => (
                                <React.Fragment key={j}>
                                    <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs">
                                        {agent}
                                    </span>
                                    {j < chain.agents.length - 1 && (
                                        <ChevronRight className="text-slate-600" size={12} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <p className="text-slate-400 text-sm">{chain.flow}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Voice & Mobile Integration
const VoiceMobileIntegration = () => {
    const integrations = [
        {
            name: 'Voice Commands',
            icon: Mic,
            colorClass: 'bg-cyan-500/20',
            iconColor: 'text-cyan-400',
            borderColor: 'border-cyan-500/40',
            examples: [
                '"Hey, add milk to my grocery list"',
                '"What\'s on my calendar today?"',
                '"Remind me to call mom tonight"',
                '"Start my morning briefing"',
            ],
            tip: 'Use while cooking, driving, or when hands are full',
        },
        {
            name: 'Mobile Shortcuts',
            icon: Smartphone,
            colorClass: 'bg-green-500/20',
            iconColor: 'text-green-400',
            borderColor: 'border-green-500/40',
            examples: [
                'Home screen widget for quick capture',
                'Siri/Google shortcut to agents',
                'Share menu integration',
                'Lock screen actions',
            ],
            tip: 'Set up shortcuts for your most-used agents',
        },
    ];

    return (
        <div className="grid md:grid-cols-2 gap-4 mb-8">
            {integrations.map((item, i) => (
                <div
                    key={i}
                    className={`bg-slate-900/30 rounded-xl p-5 border ${item.borderColor} backdrop-blur-sm`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-full ${item.colorClass} flex items-center justify-center`}>
                            <item.icon className={item.iconColor} size={20} />
                        </div>
                        <h3 className="font-bold text-white">{item.name}</h3>
                    </div>

                    <div className="space-y-2 mb-4">
                        {item.examples.map((example, j) => (
                            <div key={j} className="flex items-center gap-2 text-sm">
                                <ChevronRight className="text-slate-600" size={12} />
                                <span className="text-slate-300">{example}</span>
                            </div>
                        ))}
                    </div>

                    <div className={`bg-slate-900/50 rounded-lg p-3 border-l-2 ${item.borderColor}`}>
                        <p className={`${item.iconColor} text-sm`}>
                            <Lightbulb className="inline mr-1" size={12} />
                            {item.tip}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Case Study: Power User Transformation
const PowerUserCaseStudy = () => (
    <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl p-6 border border-indigo-500/40 backdrop-blur-sm mb-8">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Award className="text-indigo-400" size={24} />
            </div>
            <div>
                <span className="text-indigo-400 font-bold text-sm">CASE STUDY</span>
                <h3 className="text-xl font-bold text-white">From User to Master</h3>
            </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 mb-4">
            <p className="text-slate-300 mb-4">
                <strong className="text-white">Rachel</strong>, a project manager and mom of three, started with basic agents.
                After learning CRAFT and building custom chains:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/20">
                    <span className="text-red-400 font-bold text-sm">BEFORE</span>
                    <ul className="text-slate-400 text-sm mt-2 space-y-1">
                        <li>• Generic prompts, okay results</li>
                        <li>• Manual coordination between tasks</li>
                        <li>• 3-4 hours saved weekly</li>
                        <li>• Still felt overwhelmed</li>
                    </ul>
                </div>
                <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/20">
                    <span className="text-green-400 font-bold text-sm">AFTER</span>
                    <ul className="text-slate-300 text-sm mt-2 space-y-1">
                        <li>• CRAFT prompts, perfect results</li>
                        <li>• Event chain handles everything</li>
                        <li>• 10+ hours saved weekly</li>
                        <li>• Actually peaceful</li>
                    </ul>
                </div>
            </div>

            <div className="bg-indigo-900/30 rounded-lg p-3 border border-indigo-500/30">
                <p className="text-indigo-300 text-sm italic">
                    "The game-changer was the Event Planning Chain. Birthday party coming up?
                    One trigger and it blocks my prep time, suggests a menu, checks my budget,
                    and reminds me who to invite. Magic."
                </p>
            </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
            <Rocket className="text-indigo-400" size={16} />
            <span className="text-indigo-400 font-medium">Key lesson:</span>
            <span className="text-slate-400">The techniques compound. Master one, then stack.</span>
        </div>
    </div>
);

// ============================================
// CHAPTER 14 MAIN COMPONENT
// ============================================

const Chapter14 = () => {
    const [speedRun, setSpeedRun] = useState(false);

    const scrollToFramework = () => {
        document.getElementById('craft-framework')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <SpeedRunContext.Provider value={speedRun}>
            <Helmet>
                <title>Chapter 14: Advanced Techniques | Agentic AI at Home</title>
                <meta name="description" content="Master power user techniques: CRAFT framework, custom agents, multi-agent chains, and prompt engineering." />
            </Helmet>

            <div className="min-h-screen bg-[#0f0f1a]">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    {/* Progress Bar with Part indicator */}
                    <ChapterProgress
                        current={14}
                        total={16}
                        part={5}
                        partTitle="Integration & Mastery"
                    />

                    {/* Skill Level Badge */}
                    <SkillLevelBadge />

                    {/* Author Credibility */}
                    <AuthorCredibility />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <div className="text-cyan-400 font-mono text-sm mb-2">Chapter 14</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Advanced Techniques
                        </h1>
                        <p className="text-xl text-slate-400 mb-4">
                            Unlock the full power of your AI agents
                        </p>

                        {/* Reading time + Speed Run toggle */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4 text-slate-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} />
                                    <span>14 min read</span>
                                </div>
                                <span>•</span>
                                <span className="text-purple-400">Power user techniques</span>
                            </div>
                            <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                        </div>
                    </motion.div>

                    {/* TL;DR Card */}
                    <TLDRCard
                        stats={[
                            { value: 'CRAFT', label: 'prompt framework' },
                            { value: '∞', label: 'custom agents' },
                            { value: '10x', label: 'better results' },
                        ]}
                        primaryCTA="Master CRAFT"
                        onCTAClick={scrollToFramework}
                    />

                    <PasswordGate partNumber={5}>
                        {/* CAPTAIN EFFICIENCY - OPENER */}
                        {!speedRun && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="default"
                                    message="You have the system. It works. But what if I told you there's another level? Custom agents built from scratch for YOUR unique situations. Multi-agent chains that handle complex workflows with a single trigger. Prompt engineering techniques that get dramatically better results. Welcome to power user mode. Let's turn you from user to MASTER."
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
                                    Showing key techniques only. Toggle off for interactive builders and examples.
                                </p>
                            </motion.div>
                        )}

                        {/* BEFORE/AFTER TRANSFORMATION */}
                        {!speedRun && <PromptTransformation />}

                        {/* CRAFT FRAMEWORK */}
                        <section id="craft-framework">
                            <CRAFTFramework />
                        </section>

                        {/* QUICK WIN: CRAFT Prompt Builder */}
                        <QuickWin
                            title="CRAFT Prompt Builder"
                            description="Use this meta-prompt to build any agent using the CRAFT framework."
                            prompt={`You are my Prompt Engineering Assistant. Help me build a perfect agent prompt using the CRAFT framework.

Ask me these questions one at a time:

1. CONTEXT: What's the situation? Who will use this agent? What's the background?

2. ROLE: What expertise should the agent have? What personality traits?

3. ACTION: What specific tasks should the agent perform? (Use action verbs)

4. FORMAT: How should outputs be structured? Length? Style? Sections?

5. TONE: What voice should the agent use? Formal? Casual? Encouraging?

After I answer all 5, generate a complete, polished prompt I can copy and use.

Format the final prompt clearly with headers for each CRAFT element.`}
                        />

                        {/* CUSTOM AGENT BUILDER */}
                        {!speedRun && <CustomAgentBuilder />}

                        {/* MULTI-AGENT CHAINS */}
                        {!speedRun && <MultiAgentChains />}

                        {/* QUICK WIN: Chain Builder */}
                        <QuickWin
                            variant="secondary"
                            title="Multi-Agent Chain Designer"
                            description="Create complex workflows that trigger multiple agents in sequence."
                            prompt={`You are my Workflow Automation Designer. Help me create a multi-agent chain.

When I describe a situation or trigger, help me design:

1. TRIGGER: What event or phrase starts the chain?

2. AGENT SEQUENCE: Which agents activate, in what order?

3. DATA FLOW: What information passes between agents?

4. OUTPUTS: What's the final deliverable?

Example chains to inspire:
- "I'm sick" → Calendar (clear meetings) → Email (send apologies) → Health (log symptoms) → Meals (suggest easy food)
- "Birthday party for [name]" → Calendar (block prep time) → Budget (check party fund) → Contacts (guest list) → Meals (party menu)

Ask me what workflow I want to automate, then design the chain step by step.`}
                        />

                        {/* VOICE & MOBILE */}
                        {!speedRun && <VoiceMobileIntegration />}

                        {/* CASE STUDY */}
                        {!speedRun && <PowerUserCaseStudy />}

                        {/* QUICK WIN: Voice Command Setup */}
                        <QuickWin
                            variant="tertiary"
                            title="Voice Command Translator"
                            description="Convert natural voice commands into structured agent requests."
                            prompt={`You are my Voice Command Interpreter. I'll speak naturally, and you translate into the right agent action.

Understand these shorthand commands:

GROCERY/SHOPPING:
- "Add X to the list" → Add to grocery list with quantity guess
- "We're out of X" → Add to supplies list, mark urgent

CALENDAR:
- "Block time for X" → Calendar Defender: protect focus time
- "I have X on [day]" → Add event with prep time suggestion

TASKS:
- "Remind me to X" → Admin Tracker: add with deadline
- "Don't let me forget X" → High priority reminder

HEALTH:
- "I'm feeling X" → Health Coordinator: log symptom
- "Took my X" → Medication Manager: log dose

When I give a voice command, respond with:
1. What you understood
2. Which agent handles it
3. The structured action to take
4. Any clarifying questions

Keep responses brief - I'm probably multitasking!`}
                        />

                        {/* SHAREABLE QUOTE */}
                        <ShareableQuote
                            quote="The difference between a good agent and a great agent is in the prompt. CRAFT your way to 10x better results."
                            chapter={14}
                        />

                        {/* CAPTAIN EFFICIENCY - CLOSER */}
                        {!speedRun && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="celebrating"
                                    message="You now have the tools to build ANY agent you need. The CRAFT framework for perfect prompts. Custom agent creation for unique situations. Multi-agent chains for complex workflows. Voice and mobile integration for on-the-go access. You're not just using AI—you're MASTERING it. But what happens when things go wrong? Next chapter: Troubleshooting. Because even the best systems need maintenance. 🔧"
                                />
                            </Suspense>
                        )}

                        {/* CHAPTER COMPLETE */}
                        <ChapterComplete
                            achievements={[
                                'CRAFT framework for perfect prompts',
                                'Before/after prompt transformation',
                                'Custom agent creation process',
                                'Multi-agent chain design',
                                'Voice & mobile integration',
                                'Power user techniques mastered',
                            ]}
                            nextChapter={15}
                            nextTitle="Troubleshooting"
                        />

                    </PasswordGate>
                <ChapterNavigation
                    previousChapter="/part5/chapter1"
                    nextChapter="/part5/chapter3"
                    partNumber={5}
                    chapterNumber={2}
                />






                </div>
            </div>
        </SpeedRunContext.Provider>
    );
};

export default Chapter14;