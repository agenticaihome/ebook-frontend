import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';

import React, { useState, Suspense, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Shield, Sparkles, Share2, Copy, Eye, EyeOff, Lock, Unlock,
    AlertTriangle, Target, Server, Cloud, Database, Smartphone,
    FileText, Settings, XCircle, CheckCircle2, HelpCircle, Info,
    ShieldAlert, ShieldCheck, Radio
} from 'lucide-react';

// Game Components
import MissionBriefing from '../../components/gamification/MissionBriefing';
import MissionComplete from '../../components/gamification/MissionComplete';
import ObjectivesChecklist from '../../components/gamification/ObjectivesChecklist';
import IntelReport from '../../components/gamification/IntelReport';
import FutureProofBanner from '../../components/gamification/FutureProofBanner';
import AgentCardUnlock from '../../components/gamification/AgentCardUnlock';
import ChapterNavigation from '../../components/common/ChapterNavigation';

// Lazy load interactive components
const PrivacyAssessment = React.lazy(() => import('../../components/PrivacyAssessment'));
const AgentConstitutionBuilder = React.lazy(() => import('../../components/AgentConstitutionBuilder'));
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// AGENT CARD DEFINITIONS
// ============================================

const privacyGuardCard = {
    id: 'privacy_guard',
    name: 'Privacy Guard Agent',
    category: 'Daily Ops',
    rarity: 'Rare',
    power: 65,
    description: 'Sets privacy boundaries for any AI conversation. Establishes ground rules before sharing sensitive information.',
    emoji: '🛡️',
    prompt: `Before we begin, here are my privacy rules:

1. Never ask for passwords, SSN, or financial account numbers
2. Don't store or reference personal info beyond this conversation
3. If I accidentally share sensitive data, remind me to delete this chat
4. Focus on helping me with [YOUR TASK], nothing more

Acknowledge these rules, then let's proceed.`,
    unlockMessage: "Your Privacy Guard is deployed. Use this prompt to establish boundaries in any AI conversation."
};

const dataAuditorCard = {
    id: 'data_auditor',
    name: 'Data Auditor Agent',
    category: 'Daily Ops',
    rarity: 'Epic',
    power: 72,
    description: 'Helps you audit what data you\'ve shared and where it might be stored. Creates a personal data inventory.',
    emoji: '🔍',
    prompt: `Help me audit my data exposure across AI tools. Ask me about:

1. Which AI tools I use (ChatGPT, Claude, Gemini, Copilot, etc.)
2. What types of information I've shared with each
3. Whether I've checked the privacy settings on each

Then create:
- A summary of my potential data exposure
- Specific settings I should check for each tool
- A reminder system to periodically review my data

Be honest about what's stored vs. what's deleted.`,
    unlockMessage: "Data Auditor online. This agent helps you understand exactly where your information lives."
};

// ============================================
// BLITZ MODE CONTEXT
// ============================================
const BlitzModeContext = createContext(false);

// ============================================
// REUSABLE COMPONENTS
// ============================================

const BlitzModeToggle = ({ enabled, onToggle }) => (
    <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${enabled
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
            : 'bg-slate-800/30 text-slate-400 border border-slate-500/40 hover:border-slate-400 backdrop-blur-sm'
            }`}
    >
        {enabled ? <Eye size={16} /> : <EyeOff size={16} />}
        {enabled ? 'Blitz Mode: ON' : 'Blitz Mode: OFF'}
    </button>
);

const ShareableQuote = ({ quote, operation }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`"${quote}" — The Agentic AI Adventure, Discovery ${operation}`);
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
                    <span className="text-slate-400 text-sm">— Discovery {operation}</span>
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

const DeepDive = ({ title, children }) => {
    const [expanded, setExpanded] = useState(false);
    const blitzMode = useContext(BlitzModeContext);

    if (blitzMode) return null;

    return (
        <div className="bg-purple-900/20 rounded-xl border border-purple-500/40 backdrop-blur-sm mb-6 overflow-hidden">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-purple-900/30 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Server className="text-purple-400" size={18} />
                    <span className="text-purple-400 font-medium text-sm">Intel Brief:</span>
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

// ============================================
// OPERATION 3 SPECIFIC COMPONENTS
// ============================================

// Honest Opening Hook
const ProvocativeHook = () => (
    <div className="relative bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-8 border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl" />

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What does your AI know about you <span className="text-yellow-400">right now</span>?
        </h2>

        <div className="space-y-3 text-slate-300">
            <p>
                In Operation 2, you connected your first agent. Maybe you shared your calendar.
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
            Let's find out—and establish your security perimeter.
        </p>
    </div>
);

// HONEST 3-Tier Data Model Visual
const DataTierVisual = () => {
    const tiers = [
        {
            level: 1,
            name: 'Local Only',
            icon: Smartphone,
            color: 'green',
            description: 'Stays on your device. Never leaves.',
            examples: 'Apple Notes (offline mode), local Obsidian vault, downloaded models',
            risk: 'Lowest',
            caveat: 'Truly local AI is limited in capability compared to cloud models.',
        },
        {
            level: 2,
            name: 'Cloud Processed',
            icon: Cloud,
            color: 'yellow',
            description: 'Sent to servers for processing. May be stored for conversation history.',
            examples: 'Claude, ChatGPT (with settings adjusted), most AI assistants',
            risk: 'Medium',
            caveat: 'Even with "history off," data passes through their servers temporarily.',
        },
        {
            level: 3,
            name: 'Training Eligible',
            icon: Database,
            color: 'red',
            description: 'May be used to improve AI models (often the default setting).',
            examples: 'ChatGPT default, Gemini default, free tiers of most services',
            risk: 'Highest',
            caveat: 'Your conversations could influence future model responses for all users.',
        },
    ];

    const colors = {
        green: { bg: 'from-green-900/40 to-green-900/20', border: 'border-green-500/40', text: 'text-green-400', badge: 'bg-green-500/20' },
        yellow: { bg: 'from-yellow-900/40 to-yellow-900/20', border: 'border-yellow-500/40', text: 'text-yellow-400', badge: 'bg-yellow-500/20' },
        red: { bg: 'from-red-900/40 to-red-900/20', border: 'border-red-500/40', text: 'text-red-400', badge: 'bg-red-500/20' },
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Radio className="text-cyan-400" size={24} />
                Threat Assessment: 3-Tier Data Model
            </h2>
            <p className="text-slate-400 mb-6">
                Not all AI tools handle your data the same way. Here's the honest breakdown:
            </p>

            <div className="space-y-4">
                {tiers.map((tier) => {
                    const c = colors[tier.color];
                    return (
                        <motion.div
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
                                    <p className="text-slate-500 text-xs mb-2">
                                        <span className="text-slate-400">Examples:</span> {tier.examples}
                                    </p>
                                    {/* HONEST CAVEAT */}
                                    <p className="text-yellow-400/80 text-xs italic flex items-start gap-1">
                                        <Info size={12} className="flex-shrink-0 mt-0.5" />
                                        {tier.caveat}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex justify-center my-4">
                <div className="flex flex-col items-center text-slate-600">
                    <ChevronDown size={20} />
                    <span className="text-xs">More exposure →</span>
                </div>
            </div>
        </div>
    );
};

// HONEST Tool Privacy Comparison Table
const ToolPrivacyTable = () => {
    const tools = [
        {
            name: 'Claude',
            company: 'Anthropic',
            defaultTier: 2,
            canOptOut: true,
            historyControl: true,
            notes: 'Doesn\'t train on conversations by default. Still processes on their servers.',
            honestNote: 'Generally considered most privacy-friendly of major AI tools.',
        },
        {
            name: 'ChatGPT',
            company: 'OpenAI',
            defaultTier: 3,
            canOptOut: true,
            historyControl: true,
            notes: 'Trains on conversations by default. Must manually opt out.',
            honestNote: 'Opt-out is buried in settings. Many users don\'t know it exists.',
        },
        {
            name: 'Gemini',
            company: 'Google',
            defaultTier: 3,
            canOptOut: true,
            historyControl: true,
            notes: 'Integrated with Google account. Activity may be stored.',
            honestNote: 'Google already has extensive data. This adds to it.',
        },
        {
            name: 'Copilot',
            company: 'Microsoft',
            defaultTier: 2,
            canOptOut: true,
            historyControl: true,
            notes: 'Enterprise has stricter policies. Consumer version varies.',
            honestNote: 'Privacy depends heavily on which version you use.',
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
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <ShieldAlert className="text-yellow-400" size={24} />
                Intel: Tool Privacy Comparison
            </h2>
            <p className="text-slate-400 mb-4">
                Here's how the major AI tools handle your data by default:
            </p>

            {/* HONEST DISCLAIMER */}
            <div className="mb-6 p-4 bg-yellow-900/20 rounded-xl border border-yellow-500/30">
                <p className="text-yellow-400 text-sm flex items-start gap-2">
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>
                        <strong>Honest note:</strong> Privacy policies change frequently. These are accurate as of late 2024,
                        but you should verify current settings in each tool. Companies can update their terms at any time.
                    </span>
                </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl border border-slate-500/40 backdrop-blur-sm overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-slate-700 bg-slate-900/50">
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
                            <span className="text-slate-500 text-xs block">{tool.company}</span>
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
                        <div>
                            <p className="text-slate-400 text-sm">{tool.notes}</p>
                            <p className="text-slate-500 text-xs mt-1 italic">{tool.honestNote}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-cyan-900/20 rounded-xl border border-cyan-500/30">
                <p className="text-cyan-400 text-sm flex items-start gap-2">
                    <Info size={16} className="flex-shrink-0 mt-0.5" />
                    <span>
                        <strong>Tactical recommendation:</strong> If privacy is a priority, Claude is currently the most
                        privacy-friendly major option. But no cloud AI is truly private—your data still passes through their servers.
                    </span>
                </p>
            </div>
        </div>
    );
};

// 5-Minute Privacy Lockdown
const PrivacyLockdown = ({ onComplete }) => {
    const [completed, setCompleted] = useState({});

    const steps = [
        {
            id: 'chatgpt',
            tool: 'ChatGPT',
            action: 'Disable training on your conversations',
            path: 'Settings → Data Controls → "Improve the model for everyone" → OFF',
            time: '30 sec',
            honestNote: 'This stops future conversations from training, but doesn\'t delete past data.',
        },
        {
            id: 'gemini',
            tool: 'Gemini',
            action: 'Turn off Gemini Apps Activity',
            path: 'Google Account → Data & Privacy → Gemini Apps Activity → OFF',
            time: '1 min',
            honestNote: 'You may also want to review what Google already has stored.',
        },
        {
            id: 'history',
            tool: 'All tools',
            action: 'Delete sensitive conversations',
            path: 'Go through each tool and delete any chats containing passwords, SSNs, financial data, or health info',
            time: '2-5 min',
            honestNote: 'Deletion requests are honored, but data may persist in backups for a period.',
        },
        {
            id: 'review',
            tool: 'Your phone',
            action: 'Review AI app permissions',
            path: 'Settings → Apps → Check permissions for each AI app (microphone, contacts, photos)',
            time: '1 min',
            honestNote: 'Ask yourself: does this app really need access to my contacts?',
        },
    ];

    const toggleStep = (id) => {
        setCompleted(prev => {
            const newCompleted = { ...prev, [id]: !prev[id] };
            const completedCount = Object.values(newCompleted).filter(Boolean).length;
            if (completedCount === steps.length && onComplete) {
                setTimeout(() => onComplete(), 500);
            }
            return newCompleted;
        });
    };

    const completedCount = Object.values(completed).filter(Boolean).length;

    return (
        <div className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 rounded-2xl p-6 border-2 border-teal-500/50 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                        <ShieldCheck className="text-teal-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">5-Minute Security Lockdown</h3>
                        <p className="text-slate-400 text-sm">Quick wins to establish your perimeter</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-teal-400">{completedCount}/{steps.length}</span>
                    <span className="text-slate-500 text-xs block">secured</span>
                </div>
            </div>

            <div className="space-y-3">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        onClick={() => toggleStep(step.id)}
                        className={`bg-slate-900/50 rounded-xl p-4 border cursor-pointer transition-all ${completed[step.id]
                            ? 'border-green-500/50 bg-green-900/10'
                            : 'border-slate-700 hover:border-slate-600'
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
                                        <h4 className={`font-medium ${completed[step.id] ? 'text-slate-500 line-through' : 'text-white'}`}>
                                            {step.action}
                                        </h4>
                                    </div>
                                    <span className="text-slate-500 text-xs">{step.time}</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-1">{step.path}</p>
                                {/* HONEST NOTE */}
                                <p className="text-yellow-400/70 text-xs mt-2 italic flex items-start gap-1">
                                    <Info size={10} className="flex-shrink-0 mt-0.5" />
                                    {step.honestNote}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {completedCount === steps.length && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-900/30 rounded-xl border border-green-500/40 text-center"
                >
                    <CheckCircle className="text-green-400 mx-auto mb-2" size={24} />
                    <p className="text-green-400 font-bold">Privacy settings configured!</p>
                    <p className="text-slate-400 text-sm">You've taken more privacy precautions than most AI users.</p>
                </motion.div>
            )}
        </div>
    );
};

// Red Flags Checklist - HONEST VERSION
const RedFlagsChecklist = () => {
    const flags = [
        {
            flag: 'Tool asks for SSN, credit card, or passwords',
            why: 'Legitimate AI tools never need this sensitive data to function',
            action: 'Never share. If asked, stop using that tool immediately.',
        },
        {
            flag: 'No clear privacy policy or vague data handling',
            why: 'Reputable companies are transparent (though policies can be dense)',
            action: 'Avoid or research before sharing anything sensitive.',
        },
        {
            flag: '"Free" tools with no clear business model',
            why: 'Running AI is expensive. If you\'re not paying, your data might be the product.',
            action: 'Check terms carefully. Free often means data collection.',
        },
        {
            flag: 'Requests access to contacts, photos, or full device',
            why: 'Most AI assistants don\'t need your photo library or contact list',
            action: 'Grant only necessary permissions. When in doubt, deny.',
        },
        {
            flag: 'Can\'t delete your data or conversation history',
            why: 'GDPR and CCPA require deletion rights. Tools without this are red flags.',
            action: 'Use tools that offer clear data deletion options.',
        },
    ];

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="text-yellow-400" size={24} />
                Threat Indicators
            </h2>
            <p className="text-slate-400 mb-6">
                If you encounter any of these, reassess before proceeding:
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
        <div className="flex items-center gap-2 mb-1">
            <span className="text-cyan-400 font-bold uppercase text-xs tracking-wider">Field Report</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">
                {name.charAt(0)}
            </div>
            <div>
                <span className="text-white font-medium">{name}</span>
                <span className="text-slate-500 text-sm ml-2">{role}</span>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/20">
                <span className="text-red-400 text-xs font-bold uppercase">Before Deployment</span>
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
    const navigate = useNavigate();
    const [blitzMode, setBlitzMode] = useState(false);
    const [showMissionBriefing, setShowMissionBriefing] = useState(true);
    const [unlockedCards, setUnlockedCards] = useState([]);
    const [lockdownComplete, setLockdownComplete] = useState(false);

    const handleCardUnlock = (cardId) => {
        if (!unlockedCards.includes(cardId)) {
            setUnlockedCards(prev => [...prev, cardId]);
        }
    };

    const scrollToAudit = () => {
        document.getElementById('privacy-audit')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Mission objectives for this operation
    const objectives = [
        {
            id: 'obj_1',
            text: 'Understand the 3-tier data model',
            type: 'primary',
            completed: true,
        },
        {
            id: 'obj_2',
            text: 'Complete the 5-minute security lockdown',
            type: 'primary',
            completed: lockdownComplete,
        },
        {
            id: 'obj_3',
            text: 'Know the threat indicators (red flags)',
            type: 'primary',
            completed: true,
        },
        {
            id: 'obj_bonus_1',
            text: 'Take the Privacy Assessment',
            type: 'bonus',
            xpReward: 25,
            completed: false,
        },
        {
            id: 'obj_bonus_2',
            text: 'Unlock both Agent Cards',
            type: 'bonus',
            xpReward: 50,
            completed: unlockedCards.length >= 2,
        },
    ];

    return (
        <BlitzModeContext.Provider value={blitzMode}>
            <WebbookLayout>
                <Helmet>
                    <title>Discovery 3: Privacy & Control | The Agentic AI Adventure</title>
                    <meta name="description" content="Understand where your data goes with AI tools and how to protect it. Establish smart boundaries." />
                </Helmet>

                {/* MISSION BRIEFING MODAL */}
                <MissionBriefing
                    isOpen={showMissionBriefing}
                    onClose={() => setShowMissionBriefing(false)}
                    operationNumber={3}
                    operationName="SECURITY PERIMETER"
                    operationSubtitle="Establish Your Boundaries"
                    objectives={[
                        'Understand the 3-tier data model (Local → Cloud → Training)',
                        'Execute 5-minute security lockdown protocol',
                        'Learn threat indicators to watch for',
                    ]}
                    rewards={{
                        dp: 100,
                        cards: 2,
                        cardNames: ['Privacy Guard Companion', 'Data Auditor Companion']
                    }}
                    intel="You gave AI tools access to personal information. Before building further, you need to understand where that data goes—and establish clear boundaries. This is your security briefing."
                />

                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* OBJECTIVES SIDEBAR */}
                        <ObjectivesChecklist
                            objectives={objectives}
                            operationNumber={3}
                        />

                        {/* OPERATION HEADER */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-amber-400 font-mono text-sm">EXPEDITION 3</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-slate-500 text-sm">Territory I: Base Camp</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                SECURITY PERIMETER
                            </h1>
                            <p className="text-xl text-slate-400 mb-4">
                                How to get all the benefits without giving up control
                            </p>

                            {/* Reading time + Blitz Mode toggle */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4 text-slate-500 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        <span>5 min read</span>
                                    </div>
                                    <span>•</span>
                                    <span className="text-teal-400">5 min to secure</span>
                                </div>
                                <BlitzModeToggle enabled={blitzMode} onToggle={() => setBlitzMode(!blitzMode)} />
                            </div>
                        </motion.div>

                        {/* INTEL REPORT */}
                        <IntelReport
                            classification="SECURITY"
                            stats={[
                                { value: '3', label: 'data tiers' },
                                { value: '5 min', label: 'to secure' },
                                { value: '100%', label: 'your control' },
                            ]}
                            primaryCTA="Start Security Audit"
                            onCTAClick={scrollToAudit}
                        />

                        {/* CAPTAIN EFFICIENCY - OPENER */}
                        {!blitzMode && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="default"
                                    message="Before we build anything else, we need to talk about protection. You just gave an AI access to your calendar, maybe your email, your tasks. That's powerful—but power requires boundaries. This isn't fear-mongering; it's common sense. I won't let you build a system that puts your family's data at risk."
                                />
                            </Suspense>
                        )}

                        {/* Blitz Mode Notice */}
                        {blitzMode && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-cyan-900/30 rounded-xl p-4 border border-cyan-500/40 backdrop-blur-sm mb-8"
                            >
                                <div className="flex items-center gap-2 text-cyan-400">
                                    <Zap size={18} />
                                    <span className="font-bold">Blitz Mode Active</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-1">
                                    Showing only essential security actions. Toggle off for full intel.
                                </p>
                            </motion.div>
                        )}

                        {/* ★ PROVOCATIVE OPENING HOOK ★ */}
                        {!blitzMode && <ProvocativeHook />}

                        {/* PRIVACY AUDIT TOOL */}
                        <section id="privacy-audit" className="mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                                <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Security Audit</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                            </div>

                            <Suspense fallback={
                                <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                    Loading audit tool...
                                </div>
                            }>
                                <PrivacyAssessment />
                            </Suspense>
                        </section>

                        {/* 3-TIER DATA MODEL */}
                        {!blitzMode && <DataTierVisual />}

                        {/* TOOL PRIVACY COMPARISON */}
                        {!blitzMode && <ToolPrivacyTable />}

                        {/* CARD UNLOCK 1 - Data Auditor */}
                        <AgentCardUnlock
                            card={dataAuditorCard}
                            onUnlock={handleCardUnlock}
                            onComplete={() => console.log('Data Auditor added to deck')}
                            autoReveal={false}
                        />

                        {/* 5-MINUTE PRIVACY LOCKDOWN */}
                        <section className="mb-10">
                            <PrivacyLockdown onComplete={() => setLockdownComplete(true)} />
                        </section>

                        {/* DEEP DIVE: How Data Actually Flows */}
                        <DeepDive title="How your data actually flows (technical)">
                            <div className="space-y-4 text-sm">
                                <p className="text-slate-300">
                                    When you send a message to an AI tool, here's what typically happens:
                                </p>
                                <div className="space-y-3">
                                    {[
                                        { step: '1', title: 'Encryption in transit', desc: 'Your message is encrypted (HTTPS/TLS) between your device and their servers. This is standard.' },
                                        { step: '2', title: 'Processing', desc: 'The AI model processes your request on their servers. Your text exists in memory during processing.' },
                                        { step: '3', title: 'Response generation', desc: 'The model generates a response and sends it back (also encrypted).' },
                                        { step: '4', title: 'Storage decision', desc: 'Depending on your settings, the conversation may be stored for history, used for training, or discarded.' },
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
                                <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                                    <p className="text-yellow-400 text-xs">
                                        <strong>Honest note:</strong> Even with "history off," your data passes through their servers.
                                        The only way to avoid this is to use locally-run AI models, which have capability limitations.
                                        It's a tradeoff between privacy and functionality.
                                    </p>
                                </div>
                            </div>
                        </DeepDive>

                        {/* AGENT CONSTITUTION BUILDER */}
                        {!blitzMode && (
                            <section className="mb-10">
                                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                    <FileText className="text-cyan-400" size={24} />
                                    Your Agent Constitution
                                </h2>
                                <p className="text-slate-400 mb-6">
                                    Define the boundaries your agents must respect. This becomes your permission framework.
                                </p>

                                <Suspense fallback={
                                    <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                        Loading constitution builder...
                                    </div>
                                }>
                                    <AgentConstitutionBuilder />
                                </Suspense>
                            </section>
                        )}

                        {/* RED FLAGS CHECKLIST */}
                        {!blitzMode && <RedFlagsChecklist />}

                        {/* CARD UNLOCK 2 - Privacy Guard */}
                        <AgentCardUnlock
                            card={privacyGuardCard}
                            onUnlock={handleCardUnlock}
                            onComplete={() => console.log('Privacy Guard added to deck')}
                            autoReveal={false}
                        />

                        {/* CASE STUDY */}
                        {!blitzMode && (
                            <CaseStudyCard
                                name="Jennifer"
                                role="Healthcare administrator"
                                problem="Worried about HIPAA compliance. Avoided AI tools entirely despite needing help with admin work."
                                result="Uses Claude with strict boundaries. 40% faster on admin work, zero compliance issues."
                                timeframe="1 month"
                                quote="I realized privacy isn't about avoiding AI—it's about using it intentionally. Now I get the benefits without the risk."
                            />
                        )}

                        {/* SHAREABLE QUOTE */}
                        <ShareableQuote
                            quote="Privacy isn't about hiding. It's about choosing what to share—and with whom."
                            operation={3}
                        />

                        {/* FUTURE PROOF BANNER */}
                        <FutureProofBanner currentOperation={3} />

                        {/* CAPTAIN EFFICIENCY - CLOSER */}
                        {!blitzMode && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="celebrating"
                                    message="You now have a privacy-first foundation. You know exactly what your tools collect, you've locked down the settings that matter, and you understand the tradeoffs. Every system we build from here respects YOUR boundaries. You're not just protected—you're informed. Now let's put this foundation to work. 🛡️"
                                />
                            </Suspense>
                        )}

                        {/* MISSION COMPLETE */}
                        <MissionComplete
                            operationId="exp_3"
                            operationName="SECURITY PERIMETER"
                            operationNumber={3}
                            nextOperationPath="/part1/chapter4"
                            nextOperationName="MORNING ROUTINE"
                            rewards={{
                                dp: 100,
                                cards: ['Privacy Guard Companion', 'Data Auditor Companion'],
                                achievements: ['perimeter_secured']
                            }}
                            stats={{
                                objectivesCompleted: "3/3",
                                settingsSecured: "4",
                            }}
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
            </WebbookLayout>
        </BlitzModeContext.Provider>
    );
};

export default Chapter3;