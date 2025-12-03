import React, { useState, Suspense, createContext, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Shield, Sparkles, Share2, Copy, Eye, EyeOff, Lock, Unlock,
    AlertTriangle, Target, Server, Cloud, Database, Smartphone,
    FileText, Settings, XCircle, CheckCircle2, HelpCircle, Info
} from 'lucide-react';

import WebbookLayout from '../../components/layout/WebbookLayout';
import ChapterNavigation from '../../components/common/ChapterNavigation';

// Lazy load interactive components
const PrivacyAssessment = React.lazy(() => import('../../components/PrivacyAssessment'));
const AgentConstitutionBuilder = React.lazy(() => import('../../components/AgentConstitutionBuilder'));
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// SPEED RUN CONTEXT
// ============================================
const SpeedRunContext = createContext(false);

// ============================================
// REUSABLE COMPONENTS (matching Chapters 1 & 2)
// ============================================

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
                    <Server className="text-purple-400" size={18} />
                    <span className="text-purple-400 font-medium text-sm">Deep Dive:</span>
                    <span className="text-white font-medium">{title}</span>
                </div>
                {expanded ? <ChevronUp size={18} className="text-purple-400" /> : <ChevronDown size={18} className="text-purple-400" />}
            </button>

            <AnimatePresence>
                {expanded && (
                    <m.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 border-t border-purple-500/20">
                            {children}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ChapterComplete = ({ achievements, nextChapter, nextTitle }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="text-green-400" size={24} />
                </div>
                <div>
                    <span className="text-green-400 font-bold block">Chapter 3 Complete</span>
                    <span className="text-slate-400 text-sm">You're 19% of the way there</span>
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

            <button
                onClick={() => navigate(nextChapter)}
                className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-4 rounded-xl transition-all"
            >
                Continue to Chapter {typeof nextChapter === 'string' && nextChapter.includes('chapter') ? nextChapter.split('chapter')[1] : nextChapter}: {nextTitle}
                <ArrowRight size={18} />
            </button>
        </div>
    );
};
// ============================================
// CHAPTER 3 SPECIFIC COMPONENTS
// ============================================

// Provocative Opening Hook
const ProvocativeHook = () => (
    <div className="relative bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-8 border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl" />

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What does your AI know about you <span className="text-yellow-400">right now</span>?
        </h2>

        <div className="space-y-3 text-slate-300">
            <p>
                In Chapter 2, you connected your first agent. Maybe you shared your calendar.
                Your recurring task. Perhaps some personal context about your family.
            </p>
            <p className="text-white font-medium">
                That information went somewhere. Do you know where?
            </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
            {[
                { icon: Smartphone, label: 'Your device?', color: 'text-green-400' },
                { icon: Cloud, label: 'Their servers?', color: 'text-yellow-400' },
                { icon: Database, label: 'Training data?', color: 'text-red-400' },
            ].map((item, i) => (
                <div key={i} className="bg-slate-900/50 rounded-lg p-3 text-center">
                    <item.icon className={`${item.color} mx-auto mb-2`} size={24} />
                    <span className="text-slate-400 text-xs">{item.label}</span>
                </div>
            ))}
        </div>

        <p className="text-cyan-400 font-medium mt-6">
            Let's find out—and lock it down.
        </p>
    </div>
);

// 3-Tier Data Model Visual
const DataTierVisual = () => {
    const tiers = [
        {
            level: 1,
            name: 'Local Only',
            icon: Smartphone,
            color: 'green',
            description: 'Stays on your device. Never leaves.',
            examples: 'Apple Notes (offline), local Obsidian vault',
            risk: 'Lowest',
        },
        {
            level: 2,
            name: 'Cloud Processed',
            icon: Cloud,
            color: 'yellow',
            description: 'Sent to servers, processed, then discarded.',
            examples: 'ChatGPT (with history off), Claude conversations',
            risk: 'Medium',
        },
        {
            level: 3,
            name: 'Training Eligible',
            icon: Database,
            color: 'red',
            description: 'May be used to improve AI models.',
            examples: 'ChatGPT (default settings), some free tiers',
            risk: 'Highest',
        },
    ];

    const colors = {
        green: { bg: 'from-green-900/40 to-green-900/20', border: 'border-green-500/40', text: 'text-green-400', badge: 'bg-green-500/20' },
        yellow: { bg: 'from-yellow-900/40 to-yellow-900/20', border: 'border-yellow-500/40', text: 'text-yellow-400', badge: 'bg-yellow-500/20' },
        red: { bg: 'from-red-900/40 to-red-900/20', border: 'border-red-500/40', text: 'text-red-400', badge: 'bg-red-500/20' },
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">The 3-Tier Data Model</h2>
            <p className="text-slate-400 mb-6">
                Not all AI tools handle your data the same way. Here's the spectrum:
            </p>

            <div className="space-y-4">
                {tiers.map((tier) => {
                    const c = colors[tier.color];
                    return (
                        <m.div
                            key={tier.level}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: tier.level * 0.1 }}
                            className={`bg-gradient-to-r ${c.bg} rounded-xl p-5 border ${c.border} backdrop-blur-sm`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl ${c.badge} flex items-center justify-center`}>
                                    <tier.icon className={c.text} size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className={`font-bold ${c.text}`}>Tier {tier.level}: {tier.name}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge} ${c.text}`}>
                                            {tier.risk} Risk
                                        </span>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-2">{tier.description}</p>
                                    <p className="text-slate-400 text-xs">
                                        <span className="text-slate-400">Examples:</span> {tier.examples}
                                    </p>
                                </div>
                            </div>
                        </m.div>
                    );
                })}
            </div>

            {/* Connection arrows */}
            <div className="flex justify-center my-4">
                <div className="flex flex-col items-center text-slate-600">
                    <ChevronDown size={20} />
                    <span className="text-xs">More exposure →</span>
                </div>
            </div>
        </div>
    );
};

// Tool Privacy Comparison Table
const ToolPrivacyTable = () => {
    const tools = [
        {
            name: 'Claude',
            company: 'Anthropic',
            defaultTier: 2,
            canOptOut: true,
            historyControl: true,
            notes: 'Doesn\'t train on conversations by default',
        },
        {
            name: 'ChatGPT',
            company: 'OpenAI',
            defaultTier: 3,
            canOptOut: true,
            historyControl: true,
            notes: 'Must manually disable training in settings',
        },
        {
            name: 'Gemini',
            company: 'Google',
            defaultTier: 3,
            canOptOut: true,
            historyControl: true,
            notes: 'Connected to Google account data',
        },
        {
            name: 'Copilot',
            company: 'Microsoft',
            defaultTier: 2,
            canOptOut: true,
            historyControl: true,
            notes: 'Enterprise versions have stricter policies',
        },
    ];

    const getTierBadge = (tier) => {
        const styles = {
            1: 'bg-green-500/20 text-green-400',
            2: 'bg-yellow-500/20 text-yellow-400',
            3: 'bg-red-500/20 text-red-400',
        };
        const labels = { 1: 'Local', 2: 'Cloud', 3: 'Training' };
        return <span className={`text-xs px-2 py-0.5 rounded-full ${styles[tier]}`}>{labels[tier]}</span>;
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Tool Privacy Comparison</h2>
            <p className="text-slate-400 mb-6">
                Here's how the major AI tools handle your data by default:
            </p>

            <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl border border-slate-500/40 backdrop-blur-sm overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-slate-600 bg-slate-900/50">
                    <span className="text-slate-400 text-sm font-medium">Tool</span>
                    <span className="text-slate-400 text-sm font-medium">Default Tier</span>
                    <span className="text-slate-400 text-sm font-medium">Can Opt Out?</span>
                    <span className="text-slate-400 text-sm font-medium">Notes</span>
                </div>

                {/* Rows */}
                {tools.map((tool, i) => (
                    <div
                        key={tool.name}
                        className={`grid grid-cols-4 gap-4 p-4 ${i !== tools.length - 1 ? 'border-b border-slate-800' : ''}`}
                    >
                        <div>
                            <span className="text-white font-medium">{tool.name}</span>
                            <span className="text-slate-400 text-xs block">{tool.company}</span>
                        </div>
                        <div className="flex items-center">
                            {getTierBadge(tool.defaultTier)}
                        </div>
                        <div className="flex items-center">
                            {tool.canOptOut ? (
                                <CheckCircle2 className="text-green-400" size={18} />
                            ) : (
                                <XCircle className="text-red-400" size={18} />
                            )}
                        </div>
                        <div className="text-slate-400 text-sm">
                            {tool.notes}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-cyan-900/20 rounded-xl border border-cyan-500/30">
                <p className="text-cyan-400 text-sm flex items-start gap-2">
                    <Info size={16} className="flex-shrink-0 mt-0.5" />
                    <span>
                        <strong>Bottom line:</strong> Claude is the most privacy-friendly by default.
                        For any tool, check settings and disable training data collection if available.
                    </span>
                </p>
            </div>
        </div>
    );
};

// 5-Minute Privacy Lockdown
const PrivacyLockdown = () => {
    const [completed, setCompleted] = useState({});

    const steps = [
        {
            id: 'chatgpt',
            tool: 'ChatGPT',
            action: 'Disable training',
            path: 'Settings → Data Controls → "Improve the model for everyone" → OFF',
            time: '30 sec',
        },
        {
            id: 'gemini',
            tool: 'Gemini',
            action: 'Turn off activity',
            path: 'Google Account → Data & Privacy → Gemini Apps Activity → OFF',
            time: '1 min',
        },
        {
            id: 'history',
            tool: 'All tools',
            action: 'Clear sensitive chats',
            path: 'Delete any conversations containing passwords, SSNs, or financial data',
            time: '2 min',
        },
        {
            id: 'review',
            tool: 'Your phone',
            action: 'Review app permissions',
            path: 'Check which apps have access to contacts, calendar, location',
            time: '1 min',
        },
    ];

    const toggleStep = (id) => {
        setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const completedCount = Object.values(completed).filter(Boolean).length;

    return (
        <div className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 rounded-2xl p-6 border-2 border-teal-500/50 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                        <Shield className="text-teal-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">5-Minute Privacy Lockdown</h3>
                        <p className="text-slate-400 text-sm">Quick wins to secure your data right now</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-teal-400">{completedCount}/{steps.length}</span>
                    <span className="text-slate-400 text-xs block">completed</span>
                </div>
            </div>

            <div className="space-y-3">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        onClick={() => toggleStep(step.id)}
                        className={`bg-slate-900/50 rounded-xl p-4 border cursor-pointer transition-all ${completed[step.id]
                            ? 'border-green-500/50 bg-green-900/10'
                            : 'border-slate-600 hover:border-slate-600'
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${completed[step.id]
                                ? 'bg-green-500 text-white'
                                : 'bg-slate-700 text-slate-400'
                                }`}>
                                {completed[step.id] ? <CheckCircle size={14} /> : <span className="text-xs">○</span>}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-cyan-400 text-xs font-bold">{step.tool}</span>
                                        <h4 className={`font-medium ${completed[step.id] ? 'text-slate-400 line-through' : 'text-white'}`}>
                                            {step.action}
                                        </h4>
                                    </div>
                                    <span className="text-slate-400 text-xs">{step.time}</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-1">{step.path}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {completedCount === steps.length && (
                <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-900/30 rounded-xl border border-green-500/40 text-center"
                >
                    <CheckCircle className="text-green-400 mx-auto mb-2" size={24} />
                    <p className="text-green-400 font-bold">Privacy lockdown complete!</p>
                    <p className="text-slate-400 text-sm">Your data is now more protected than 90% of AI users.</p>
                </m.div>
            )}
        </div>
    );
};

// Red Flags Checklist
const RedFlagsChecklist = () => {
    const flags = [
        {
            flag: 'Tool requires SSN, credit card, or passwords',
            why: 'Legitimate AI tools never need this sensitive data',
            action: 'Never share. Report if asked.',
        },
        {
            flag: 'No clear privacy policy or data handling info',
            why: 'Reputable companies are transparent about data use',
            action: 'Avoid or research further.',
        },
        {
            flag: '"Free" tools with no clear business model',
            why: 'If you\'re not paying, your data might be the product',
            action: 'Check if data is sold to third parties.',
        },
        {
            flag: 'Requests access to contacts, photos, or full device',
            why: 'AI assistants don\'t need your photo library',
            action: 'Grant only necessary permissions.',
        },
        {
            flag: 'Can\'t delete your data or conversation history',
            why: 'GDPR and CCPA require deletion rights',
            action: 'Use tools that offer data deletion.',
        },
    ];

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="text-yellow-400" size={24} />
                Red Flags to Watch For
            </h2>
            <p className="text-slate-400 mb-6">
                If you see any of these, pause and reconsider:
            </p>

            <div className="space-y-3">
                {flags.map((item, i) => (
                    <div key={i} className="bg-red-900/10 rounded-xl p-4 border border-red-500/30">
                        <div className="flex items-start gap-3">
                            <XCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <h4 className="text-white font-medium">{item.flag}</h4>
                                <p className="text-slate-400 text-sm mt-1">{item.why}</p>
                                <p className="text-yellow-400 text-sm mt-1">
                                    <strong>Action:</strong> {item.action}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
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
// CHAPTER 3 MAIN COMPONENT
// ============================================

const Chapter3 = () => {
    const [speedRun, setSpeedRun] = useState(false);
    const navigate = useNavigate();

    const scrollToAudit = () => {
        document.getElementById('privacy-audit')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <WebbookLayout>
            <SpeedRunContext.Provider value={speedRun}>
                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* Progress Bar */}
                        <ChapterProgress current={3} total={16} />

                        {/* Author Credibility */}
                        <AuthorCredibility />

                        {/* Chapter Navigation */}
                        <ChapterNavigation
                            previousChapter="/part1/chapter2"
                            nextChapter="/part2/chapter1"
                            partNumber={1}
                            chapterNumber={3}
                        />

                        {/* Header */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="text-cyan-400 font-mono text-sm mb-2">Chapter 3</div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Privacy & Security
                            </h1>
                            <p className="text-xl text-slate-400 mb-4">
                                How to get all the benefits without giving up control
                            </p>

                            {/* Reading time + Speed Run toggle */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4 text-slate-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        <span>5 min read</span>
                                    </div>
                                    <span>•</span>
                                    <span className="text-teal-400">5 min to lock down</span>
                                </div>
                                <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                            </div>
                        </m.div>

                        {/* TL;DR Card */}
                        <TLDRCard
                            stats={[
                                { value: '3', label: 'data tiers to know' },
                                { value: '5 min', label: 'to lock down' },
                                { value: '100%', label: 'in your control' },
                            ]}
                            primaryCTA="Start Privacy Audit"
                            onCTAClick={scrollToAudit}
                        />

                        {/* CAPTAIN EFFICIENCY - OPENER (Protective Guardian) */}
                        {!speedRun && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="default"
                                    message="Before we build anything else, we need to talk about protection. You just gave an AI access to your calendar, maybe your email, your tasks. That's powerful—but power requires boundaries. This chapter is your security briefing. I won't let you build a system that puts your family at risk."
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
                                    Showing only the essential privacy actions. Toggle off to see the full chapter.
                                </p>
                            </m.div>
                        )}

                        {/* ★ PROVOCATIVE OPENING HOOK ★ */}
                        {!speedRun && <ProvocativeHook />}

                        {/* PRIVACY AUDIT TOOL */}
                        <section id="privacy-audit" className="mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                                <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Privacy Audit</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                            </div>

                            <Suspense fallback={
                                <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-800/50 rounded-xl animate-pulse">
                                    Loading audit tool...
                                </div>
                            }>
                                <PrivacyAssessment />
                            </Suspense>
                        </section>

                        {/* 3-TIER DATA MODEL */}
                        {!speedRun && <DataTierVisual />}

                        {/* TOOL PRIVACY COMPARISON */}
                        {!speedRun && <ToolPrivacyTable />}

                        {/* 5-MINUTE PRIVACY LOCKDOWN */}
                        <section className="mb-10">
                            <PrivacyLockdown />
                        </section>

                        {/* DEEP DIVE: How Data Actually Flows */}
                        <DeepDive title="How your data actually flows (technical)">
                            <div className="space-y-4 text-sm">
                                <p className="text-slate-300">
                                    When you send a message to an AI tool, here's what typically happens:
                                </p>
                                <div className="space-y-3">
                                    {[
                                        { step: '1', title: 'Encryption in transit', desc: 'Your message is encrypted (HTTPS/TLS) between your device and their servers.' },
                                        { step: '2', title: 'Processing', desc: 'The AI model processes your request on their servers. Your text is in memory briefly.' },
                                        { step: '3', title: 'Response generation', desc: 'The model generates a response and sends it back to you (also encrypted).' },
                                        { step: '4', title: 'Storage decision', desc: 'Depending on settings, your conversation may be stored for history, improvement, or deleted.' },
                                    ].map((item) => (
                                        <div key={item.step} className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                            <span className="bg-purple-500/20 text-purple-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                {item.step}
                                            </span>
                                            <div>
                                                <span className="text-white font-medium">{item.title}</span>
                                                <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-slate-400">
                                    The key variables are: (a) whether conversations are stored, (b) whether they're used for training,
                                    and (c) whether you can delete them. All major tools now offer controls for these.
                                </p>
                            </div>
                        </DeepDive>

                        {/* AGENT CONSTITUTION BUILDER */}
                        {!speedRun && (
                            <section className="mb-10">
                                <h2 className="text-2xl font-bold text-white mb-2">Your Agent Constitution</h2>
                                <p className="text-slate-400 mb-6">
                                    Define the boundaries your agents must respect. This becomes your permission framework.
                                </p>

                                <Suspense fallback={
                                    <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-800/50 rounded-xl animate-pulse">
                                        Loading constitution builder...
                                    </div>
                                }>
                                    <AgentConstitutionBuilder />
                                </Suspense>
                            </section>
                        )}

                        {/* RED FLAGS CHECKLIST */}
                        {!speedRun && <RedFlagsChecklist />}

                        {/* QUICK WIN: Privacy-First Prompt */}
                        <QuickWin
                            title="Privacy-First Agent Instructions"
                            setupTime="2 min"
                            prompt={`Add this to any AI conversation to set boundaries:

"Before we begin, here are my privacy rules:
1. Never ask for passwords, SSN, or financial account numbers
2. Don't store or reference personal info beyond this conversation
3. If I accidentally share sensitive data, remind me to delete this chat
4. Focus on helping me with [YOUR TASK], nothing more

Acknowledge these rules, then let's proceed."`}
                        />

                        {/* CASE STUDY */}
                        {!speedRun && (
                            <CaseStudyCard
                                name="Jennifer"
                                role="Healthcare administrator, privacy-conscious"
                                problem="Worried about HIPAA compliance. Avoided AI tools entirely despite needing help."
                                result="Uses Claude with strict boundaries. 40% faster on admin work, zero compliance issues."
                                timeframe="1 month"
                                quote="I realized privacy isn't about avoiding AI—it's about using it intentionally. Now I get the benefits without the risk."
                            />
                        )}

                        {/* SHAREABLE QUOTE */}
                        <ShareableQuote
                            quote="Privacy isn't about hiding. It's about choosing what to share—and with whom."
                            chapter={3}
                        />

                        {/* CAPTAIN EFFICIENCY - CLOSER (Reassuring/Empowering) */}
                        {!speedRun && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="celebrating"
                                    message="You now have a privacy-first foundation. You know exactly what your tools collect, you've locked down the settings that matter, and you've written your Agent Constitution. Every system we build from here respects YOUR boundaries. You're not just protected—you're in control. Now let's put this foundation to work. 🛡️"
                                />
                            </Suspense>
                        )}

                        {/* CHAPTER COMPLETE */}
                        <ChapterComplete
                            achievements={[
                                'Understand the 3-tier data model (Local → Cloud → Training)',
                                'Completed 5-minute privacy lockdown',
                                'Created your Agent Constitution',
                                'Know the red flags to watch for',
                            ]}
                            nextChapter="/part2/chapter1"
                            nextTitle="Morning Routines"
                        />

                        {/* Bottom Navigation */}
                        <ChapterNavigation
                            previousChapter="/part1/chapter2"
                            nextChapter="/part2/chapter1"
                            partNumber={1}
                            chapterNumber={3}
                        />

                    </div>
                </div>
            </SpeedRunContext.Provider>
        </WebbookLayout>
    );
};

export default Chapter3;