import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';

import React, { useState, Suspense, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sun, Sparkles, Share2, Copy, Eye, EyeOff, Coffee, Calendar,
    AlertTriangle, Target, Mail, CloudSun, Bell, Smartphone,
    Play, Pause, RotateCcw, Check, X, HelpCircle, Sunrise, Brain,
    Lightbulb, MessageSquare
} from 'lucide-react';

// Game Components
import MissionBriefing from '../../components/gamification/MissionBriefing';
import MissionComplete from '../../components/gamification/MissionComplete';
import ObjectivesChecklist from '../../components/gamification/ObjectivesChecklist';
import IntelReport from '../../components/gamification/IntelReport';
import FutureProofBanner from '../../components/gamification/FutureProofBanner';
import AgentCardUnlock from '../../components/gamification/AgentCardUnlock';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import AIToolLinks from '../../components/AIToolLinks';
import FAQSection, { chapter4FAQs } from '../../components/FAQSection';
import PasswordGate from '../../components/common/PasswordGate';

// Lazy load interactive components
const MorningChaosCalculator = React.lazy(() => import('../../components/MorningChaosCalculator'));
const MorningBriefBuilder = React.lazy(() => import('../../components/MorningBriefBuilder'));
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

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
            ? 'bg-teal-500/20 text-teal-400 border border-teal-500/50'
            : 'bg-slate-800/30 text-slate-400 border border-slate-500/40 hover:border-slate-400 backdrop-blur-sm'
            }`}
    >
        {enabled ? <Eye size={16} /> : <EyeOff size={16} />}
        {enabled ? 'Blitz Mode: ON' : 'Blitz Mode: OFF'}
    </button>
);

const StoryHook = ({ hook, fullStory }) => {
    const [expanded, setExpanded] = useState(false);
    const blitzMode = useContext(BlitzModeContext);

    if (blitzMode) return null;

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
                        <div className="pt-4 mt-4 border-t border-slate-600 prose prose-invert prose-sm max-w-none">
                            {fullStory}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-teal-400 text-sm mt-4 hover:text-teal-300 transition-colors"
            >
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {expanded ? 'Show less' : 'Read the full story'}
            </button>
        </div>
    );
};

const ShareableQuote = ({ quote, chapter }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`"${quote}" — The Agentic AI Adventure, Discovery ${chapter}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-8 border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative">
                <div className="text-6xl text-teal-500/30 font-serif leading-none mb-2">"</div>
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-4 -mt-8 pl-8">
                    {quote}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">— Discovery {chapter}</span>
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

const StatCard = ({ value, label, color = 'red' }) => {
    const colors = {
        red: 'bg-red-900/20 border-red-500/30 text-red-400',
        green: 'bg-green-900/20 border-green-500/30 text-green-400',
        teal: 'bg-teal-900/20 border-teal-500/30 text-teal-400',
        purple: 'bg-purple-900/20 border-purple-500/30 text-purple-400',
    };

    return (
        <div className={`rounded-xl p-5 border ${colors[color]}`}>
            <div className="text-3xl font-bold mb-1">{value}</div>
            <div className="text-slate-400 text-sm">{label}</div>
        </div>
    );
};

const BeforeAfter = ({ before, after, metric }) => {
    const blitzMode = useContext(BlitzModeContext);
    if (blitzMode) return null;

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
                    <ArrowRight className="text-slate-400" size={20} />
                    <span className="text-green-400 font-bold text-2xl">{metric.after}</span>
                    <span className="text-slate-400 text-sm">{metric.label}</span>
                </div>
            )}
        </div>
    );
};

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

// ============================================
// CHAPTER 4 SPECIFIC COMPONENTS
// ============================================

// Morning Timeline Comparison
const MorningTimeline = () => {
    const beforeItems = [
        { time: '6:00', task: 'Alarm screams. You hit snooze.', icon: Bell, status: 'chaos' },
        { time: '6:09', task: 'Grab phone. Doom scroll begins.', icon: Smartphone, status: 'chaos' },
        { time: '6:18', task: '"Wait, what day is it again?"', icon: Calendar, status: 'chaos' },
        { time: '6:23', task: 'Check weather. Forget immediately.', icon: CloudSun, status: 'chaos' },
        { time: '6:28', task: 'Hunt for that email you need.', icon: Mail, status: 'chaos' },
        { time: '6:35', task: 'Finally start getting ready. Already stressed.', icon: Coffee, status: 'chaos' },
    ];

    const afterItems = [
        { time: '6:00', task: 'Alarm goes off. You reach for your brief.', icon: Bell, status: 'good' },
        { time: '6:01', task: '30 seconds: Everything you need to know.', icon: Sunrise, status: 'good' },
        { time: '6:02', task: 'Full clarity. Zero anxiety.', icon: CheckCircle, status: 'good' },
        { time: '6:03', task: 'Start getting ready with intention.', icon: Coffee, status: 'good' },
    ];

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Target className="text-teal-400" size={24} />
                The Morning Transformation
            </h2>
            <p className="text-slate-400 mb-6">
                Same alarm. Same you. <span className="text-white font-medium">Completely different start.</span>
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="bg-red-900/10 rounded-2xl p-5 border border-red-500/30">
                    <div className="flex items-center gap-2 mb-4">
                        <X className="text-red-400" size={18} />
                        <span className="text-red-400 font-bold uppercase text-sm tracking-wider">Before</span>
                        <span className="text-slate-400 text-xs ml-auto">35 min of chaos</span>
                    </div>
                    <div className="space-y-3">
                        {beforeItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-slate-600 text-xs font-mono w-12">{item.time}</span>
                                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                                    <item.icon className="text-red-400" size={14} />
                                </div>
                                <span className="text-slate-400 text-sm">{item.task}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* After */}
                <div className="bg-green-900/10 rounded-2xl p-5 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-4">
                        <Check className="text-green-400" size={18} />
                        <span className="text-green-400 font-bold uppercase text-sm tracking-wider">After</span>
                        <span className="text-slate-400 text-xs ml-auto">3 min to clarity</span>
                    </div>
                    <div className="space-y-3">
                        {afterItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-slate-600 text-xs font-mono w-12">{item.time}</span>
                                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                                    <item.icon className="text-green-400" size={14} />
                                </div>
                                <span className="text-slate-300 text-sm">{item.task}</span>
                            </div>
                        ))}
                    </div>

                    {/* Time saved callout */}
                    <div className="mt-4 pt-4 border-t border-green-500/20">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Time reclaimed:</span>
                            <span className="text-green-400 font-bold text-xl">32 min/day</span>
                        </div>
                        <p className="text-slate-400 text-xs mt-1">
                            That's <span className="text-green-400 font-medium">194 hours/year</span>. Almost 5 full work weeks.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Platform Setup Tabs
const PlatformSetup = () => {
    const [activePlatform, setActivePlatform] = useState('claude');

    const platforms = {
        claude: {
            name: 'Claude',
            color: 'orange',
            steps: [
                'Go to claude.ai and start a new conversation',
                'Paste the Morning Brief prompt below',
                'Answer Claude\'s setup questions honestly',
                'Ask Claude to save this as a "Project" for daily use',
                'Set a phone reminder: "Check Claude Morning Brief"',
            ],
            tip: 'Claude remembers context within conversations. Start a fresh "Morning Brief" chat each week to keep things sharp.',
        },
        chatgpt: {
            name: 'ChatGPT',
            color: 'green',
            steps: [
                'Go to chat.openai.com and start a new chat',
                'Paste the Morning Brief prompt below',
                'Answer the setup questions',
                'Click "Create GPT" to save as a custom assistant (Plus users)',
                'Or: Pin this conversation for easy access',
            ],
            tip: 'With ChatGPT Plus, you can create a custom GPT that remembers your preferences permanently. Worth it for daily use.',
        },
        gemini: {
            name: 'Gemini',
            color: 'blue',
            steps: [
                'Go to gemini.google.com',
                'Paste the Morning Brief prompt below',
                'Gemini can pull from your Google Calendar automatically',
                'Enable Google Workspace integration for best results',
                'Use the Gemini app for mobile notifications',
            ],
            tip: 'Gemini\'s superpower is Google integration. It can read your Calendar and Gmail directly—no copy-pasting needed.',
        },
    };

    const platform = platforms[activePlatform];

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
            {/* Tab buttons */}
            <div className="flex border-b border-slate-600">
                {Object.entries(platforms).map(([key, p]) => (
                    <button
                        key={key}
                        onClick={() => setActivePlatform(key)}
                        className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${activePlatform === key
                            ? 'bg-slate-800/50 text-white border-b-2 border-teal-500'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-4">
                    Deploy on {platform.name}
                </h3>

                <div className="space-y-3 mb-6">
                    {platform.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-bold flex-shrink-0">
                                {i + 1}
                            </div>
                            <span className="text-slate-300 text-sm">{step}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-yellow-900/20 rounded-xl p-4 border border-yellow-500/30">
                    <div className="flex items-start gap-2">
                        <Lightbulb className="text-yellow-400 flex-shrink-0 mt-0.5" size={16} />
                        <div>
                            <span className="text-yellow-400 font-bold text-sm">Pro tip:</span>
                            <p className="text-slate-300 text-sm mt-1">{platform.tip}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Week One Milestones
const WeekOneMilestones = () => {
    const days = [
        { day: 1, title: 'Setup', desc: 'Create your agent', icon: '🛠️' },
        { day: 2, title: 'First Brief', desc: 'Wake up to it', icon: '🌅' },
        { day: 3, title: 'Tune', desc: 'Give feedback', icon: '✏️' },
        { day: 4, title: 'Habit', desc: 'Feels automatic', icon: '🔄' },
        { day: 5, title: 'Tweak', desc: 'Customize more', icon: '⚙️' },
        { day: 6, title: 'Weekend', desc: 'Adjust if needed', icon: '📅' },
        { day: 7, title: 'Review', desc: 'Notice the change', icon: '📊' },
    ];

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Your First Week</h2>
            <p className="text-slate-400 mb-6">
                Building the habit that changes everything:
            </p>

            <div className="grid grid-cols-7 gap-2">
                {days.map((day) => (
                    <div
                        key={day.day}
                        className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-3 border border-slate-500/40 backdrop-blur-sm text-center"
                    >
                        <div className="text-2xl mb-2">{day.icon}</div>
                        <div className="text-teal-400 font-bold text-xs">Day {day.day}</div>
                        <div className="text-white font-medium text-xs mt-1">{day.title}</div>
                        <div className="text-slate-400 text-[10px] mt-1 hidden md:block">{day.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Troubleshooting Accordion
const TroubleshootingAccordion = () => {
    const [openItem, setOpenItem] = useState(null);

    const items = [
        {
            id: 'too-long',
            question: 'My brief is too long / overwhelming',
            answer: 'Tell your agent: "Make the brief more concise. Limit to 5 bullet points max. Only include things I need to act on today." You can also ask for a TL;DR at the top.',
        },
        {
            id: 'too-short',
            question: 'My brief is missing important info',
            answer: 'Ask: "Add [weather/commute time/kids\' schedule/etc.] to my morning brief." Be specific about what you want included.',
        },
        {
            id: 'forget',
            question: 'I keep forgetting to check it',
            answer: 'Set a phone alarm labeled "Morning Brief" for 1 minute after your wake-up alarm. Put the AI app on your home screen. Make it the first thing you see.',
        },
        {
            id: 'stale',
            question: 'The information feels stale/repeated',
            answer: 'Your agent needs fresh context. Once a week, tell it what changed: new projects, schedule shifts, priorities. Or start a fresh conversation weekly.',
        },
        {
            id: 'no-calendar',
            question: 'My AI can\'t access my calendar',
            answer: 'Option 1: Use Gemini (native Google Calendar access). Option 2: Copy-paste today\'s calendar into your chat. Option 3: Use Zapier to email you a daily calendar summary.',
        },
    ];

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle className="text-teal-400" size={24} />
                Troubleshooting
            </h2>
            <p className="text-slate-400 mb-6">
                Common issues and quick fixes:
            </p>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl border border-slate-500/40 backdrop-blur-sm overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/30 transition-colors"
                        >
                            <span className="text-white font-medium">{item.question}</span>
                            {openItem === item.id ? (
                                <ChevronUp size={18} className="text-teal-400" />
                            ) : (
                                <ChevronDown size={18} className="text-slate-400" />
                            )}
                        </button>

                        <AnimatePresence>
                            {openItem === item.id && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-4 pb-4 pt-0 border-t border-slate-600">
                                        <p className="text-slate-300 text-sm pt-4">{item.answer}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
            <span className="text-teal-400 font-bold uppercase text-xs tracking-wider">Field Report</span>
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
                <span className="text-red-400 text-xs font-bold uppercase">Before</span>
                <p className="text-slate-300 text-sm mt-1">{problem}</p>
            </div>
            <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/20">
                <span className="text-green-400 text-xs font-bold uppercase">After {timeframe}</span>
                <p className="text-slate-300 text-sm mt-1">{result}</p>
            </div>
        </div>

        <p className="text-slate-400 text-sm italic border-l-2 border-teal-500/50 pl-3">
            "{quote}"
        </p>
    </div>
);

// ============================================
// CHAPTER 4 MAIN COMPONENT
// ============================================

const Chapter4 = () => {
    const [blitzMode, setBlitzMode] = useState(false);
    const [cardUnlocked, setCardUnlocked] = useState(false);
    const navigate = useNavigate();

    // Morning Brief Agent card data
    const morningBriefCard = {
        id: 'morning_brief_v2',
        name: 'Morning Brief Companion',
        rarity: 'common',
        category: 'Daily Ops',
        timeSaved: '30 min/day',
        moneySaved: '$0',
        complexity: 2,
        powerLevel: 55,
        prompt: `You are my Morning Brief Companion. Every morning, deliver a 30-second summary:

1. TODAY'S SCHEDULE: Key meetings/events. Any conflicts?
2. WEATHER: Do I need umbrella/jacket?
3. TOP 3 PRIORITIES: What must happen today?
4. HEADS UP: Anything coming up I should prep for?
5. ONE THING: A quick motivating thought.

Format: Bullet points. Scannable. Zero fluff.

First, ask me about my typical morning, work situation, and current priorities.`,
    };

    const handleCardUnlock = (cardId) => {
        setCardUnlocked(true);
        const unlockedCards = JSON.parse(localStorage.getItem('unlocked_cards') || '[]');
        if (!unlockedCards.includes(cardId)) {
            unlockedCards.push(cardId);
            localStorage.setItem('unlocked_cards', JSON.stringify(unlockedCards));
        }
    };

    const scrollToCalculator = () => {
        document.getElementById('chaos-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const morningBriefPrompt = `You are my Morning Brief Companion. Every morning, I'll check in for a quick summary to start my day right.

Here's what I need in my brief:
1. TODAY'S SCHEDULE: What's on my calendar? Any conflicts or tight transitions?
2. WEATHER: Temperature and conditions. Do I need an umbrella or jacket?
3. TOP 3 PRIORITIES: What must get done today? (based on deadlines, importance)
4. HEADS UP: Anything coming up in the next 2-3 days I should prep for?
5. ONE THING: A quick motivational thought or reminder based on my goals.

Format: Keep it scannable. Bullet points. No fluff. I should read it in 30 seconds.

Before generating briefs, ask me:
- What time do I usually wake up?
- What's my work situation (office, remote, hybrid)?
- Do I have kids/family morning responsibilities?
- What are my current top priorities or projects?
- Any recurring events I should always know about?`;

    return (
        <WebbookLayout>
            <Helmet>
                <title>Discovery 4: Morning Glory | The Agentic AI Adventure</title>
                <meta name="description" content="Build the AI companion you'll actually use every single day. The Morning Brief changes everything." />
            </Helmet>

            <BlitzModeContext.Provider value={blitzMode}>
                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* MISSION BRIEFING - Epic Header */}
                        <MissionBriefing
                            title="EXPEDITION: MORNING GLORY"
                            missionNumber={4}
                            totalMissions={16}
                            duration="8 min"
                            briefing="Enough theory, Explorer. It's time to build something you'll use EVERY. SINGLE. DAY. The Morning Brief Companion is about to become the best 30 seconds of your morning. By tomorrow, you won't remember how you started days without it. Let's deploy."
                            status="IN PROGRESS"
                            classification="TERRITORY 2"
                            objectives={[
                                "Calculate your morning chaos",
                                "Build your Morning Brief Companion",
                                "Deploy on your platform"
                            ]}
                        />

                        {/* FUTURE-PROOF BANNER */}
                        <FutureProofBanner />

                        {/* BLITZ MODE TOGGLE */}
                        <div className="flex justify-end mb-6">
                            <BlitzModeToggle enabled={blitzMode} onToggle={() => setBlitzMode(!blitzMode)} />
                        </div>

                        {/* OBJECTIVES CHECKLIST */}
                        <ObjectivesChecklist
                            operationId="exp_4"
                            primaryObjectives={[
                                { id: "chaos_calc", label: "Calculate your morning chaos" },
                                { id: "build_companion", label: "Build your Morning Brief Companion" },
                                { id: "deploy_platform", label: "Deploy on your platform" }
                            ]}
                            bonusObjectives={[
                                { id: "week_one", label: "Complete Week 1 milestones" },
                                { id: "share_win", label: "Share your first morning brief win" }
                            ]}
                        />

                        {/* INTEL REPORT */}
                        <IntelReport
                            title="MORNING BRIEF INTEL"
                            classification="LEVEL 4"
                            defaultExpanded={false}
                            content={`This is the companion most people deploy first—and use longest.

Why? Because mornings set the tone for everything. Start scattered, stay scattered. Start clear, stay clear.

The Morning Brief takes 30 seconds to read but saves 30+ minutes of context-switching chaos. And unlike apps that buzz you with notifications, this companion waits for YOU to check in.

One quick look. Full clarity. No anxiety.`}
                        />

                        {/* QUICK ACCESS TO ALL AI TOOLS */}
                        <section className="mb-10">
                            <AIToolLinks />
                        </section>

                        <PasswordGate partNumber={2} chapterNumber={4}>
                            {/* CAPTAIN EFFICIENCY - Welcome */}
                            {!blitzMode && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="default"
                                        message="Welcome back, Explorer! We've covered the basics—now it's time to BUILD. The Morning Brief Companion is where most successful AI explorers start. It's simple to set up, impossible to forget, and the benefits compound every single day. Ready to transform your mornings?"
                                    />
                                </Suspense>
                            )}

                            {/* Blitz Mode Notice */}
                            {blitzMode && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-teal-900/30 rounded-xl p-4 border border-teal-500/40 backdrop-blur-sm mb-8"
                                >
                                    <div className="flex items-center gap-2 text-teal-400">
                                        <Zap size={18} />
                                        <span className="font-bold">Blitz Mode Active</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Showing only essential prompts and tools. Toggle off for full expedition.
                                    </p>
                                </motion.div>
                            )}

                            {/* STORY HOOK */}
                            <StoryHook
                                hook={
                                    <>
                                        <strong className="text-white">6:47 AM. Marcus stared at his phone like it was an enemy.</strong>{' '}
                                        Email. Calendar. Weather. Slack. News. By the time he figured out what his day actually looked like,
                                        the coffee was cold and the anxiety was hot.{' '}
                                        <span className="text-teal-400 font-medium">
                                            "There has to be a better way to start a day."
                                        </span>
                                    </>
                                }
                                fullStory={
                                    <>
                                        <p className="text-slate-300 mb-4">
                                            Three weeks later, Marcus opens one app at 6:01 AM. Thirty seconds of reading. Today's three meetings.
                                            Rain at 2 PM—grab the umbrella. The client proposal is due Thursday, not today. His daughter's recital is tomorrow.
                                        </p>
                                        <p className="text-slate-300 mb-4">
                                            He closes the app and pours coffee with a clear head. No doom scroll. No anxiety spiral. Just... clarity.
                                        </p>
                                        <div className="bg-teal-900/20 rounded-lg p-4 border-l-4 border-teal-500/50 my-4">
                                            <p className="text-slate-300 mb-2">
                                                <strong className="text-white">The difference?</strong> He built a Morning Brief Companion in 15 minutes.
                                            </p>
                                            <p className="text-slate-400 text-sm">
                                                Same information. Zero hunting. Brain preserved for what actually matters.
                                            </p>
                                        </div>
                                    </>
                                }
                            />

                            {/* STATS - The Problem */}
                            {!blitzMode && (
                                <section className="mb-10">
                                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                        <AlertTriangle className="text-amber-400" size={24} />
                                        THE MORNING CHAOS PROBLEM
                                    </h2>
                                    <p className="text-slate-400 mb-6">
                                        You're not lazy. You're not disorganized. You're just starting every day in the worst possible way.
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                        <StatCard value="35 min" label="avg morning chaos" color="red" />
                                        <StatCard value="6 apps" label="checked before coffee" color="red" />
                                        <StatCard value="23 min" label="to refocus after" color="red" />
                                        <StatCard value="30 sec" label="with Morning Brief" color="teal" />
                                    </div>
                                </section>
                            )}

                            {/* NEWBIE BOX */}
                            <NewbieBox title="New to AI Companions? Start here.">
                                <p className="mb-2">
                                    A Morning Brief is just a <strong className="text-white">personalized daily summary</strong> delivered by AI.
                                </p>
                                <p>
                                    You tell it what matters to you (calendar, weather, priorities), and every morning it gives you everything in one place. No hunting through apps.
                                </p>
                            </NewbieBox>

                            {/* Before/After */}
                            <BeforeAfter
                                before={[
                                    'Check 6 apps before you even pour coffee',
                                    'Forget about that 9 AM meeting until 8:55',
                                    'Wonder if you need an umbrella (then forget to check)',
                                    'Start the day reactive and scattered',
                                ]}
                                after={[
                                    'One 30-second read gives you full clarity',
                                    'See your whole day at a glance',
                                    'Weather, calendar, priorities—all in one place',
                                    'Start every day proactive and prepared',
                                ]}
                                metric={{ before: '35 min', after: '30 sec', label: 'morning prep' }}
                            />

                            {/* ★ TOOL FIRST: Morning Chaos Calculator ★ */}
                            <section id="chaos-calculator" className="mb-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-teal-500/50" />
                                    <span className="text-teal-400 font-bold uppercase text-sm tracking-wider">Calculate Your Chaos</span>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-teal-500/50" />
                                </div>

                                <Suspense fallback={
                                    <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-800/50 rounded-xl animate-pulse">
                                        Loading calculator...
                                    </div>
                                }>
                                    <MorningChaosCalculator />
                                </Suspense>
                            </section>

                            {/* MORNING TIMELINE COMPARISON */}
                            {!blitzMode && <MorningTimeline />}

                            {/* THE CORE PROMPT - Quick Win */}
                            <QuickWin
                                title="The Morning Brief Prompt"
                                setupTime="15 min"
                                prompt={morningBriefPrompt}
                            />

                            {/* DEEP DIVE - How it works */}
                            <DeepDive title="How the Morning Brief actually works">
                                <div className="space-y-4 text-sm">
                                    <p className="text-slate-300">
                                        The Morning Brief Companion works on a simple principle: <strong className="text-white">consolidation beats hunting.</strong>
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-3">
                                        {[
                                            { emoji: '📥', label: 'GATHER', desc: 'You give it context about your life once' },
                                            { emoji: '🧠', label: 'PROCESS', desc: 'It pulls together what matters for today' },
                                            { emoji: '📤', label: 'DELIVER', desc: 'You get a scannable brief in seconds' },
                                        ].map((step, i) => (
                                            <div key={i} className="bg-slate-900/50 rounded-lg p-3 text-center">
                                                <div className="text-2xl mb-2">{step.emoji}</div>
                                                <div className="text-purple-400 font-bold text-xs mb-1">{step.label}</div>
                                                <div className="text-slate-400 text-xs">{step.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-slate-400 text-xs">
                                        The key is that YOU control what's included. Some people want weather and commute. Others want meeting prep and priority reminders. Your brief, your rules.
                                    </p>
                                </div>
                            </DeepDive>

                            {/* PLATFORM-SPECIFIC SETUP */}
                            {!blitzMode && <PlatformSetup />}

                            {/* MORNING BRIEF BUILDER */}
                            <section className="mb-10">
                                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    <Sparkles className="text-teal-400" size={24} />
                                    Customize Your Brief
                                </h2>
                                <p className="text-slate-400 mb-6">
                                    Use this builder to create a personalized Morning Brief prompt:
                                </p>

                                <Suspense fallback={
                                    <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-800/50 rounded-xl animate-pulse">
                                        Loading builder...
                                    </div>
                                }>
                                    <MorningBriefBuilder />
                                </Suspense>
                            </section>

                            {/* CARD UNLOCK - Morning Brief Agent */}
                            <AgentCardUnlock
                                card={morningBriefCard}
                                onUnlock={handleCardUnlock}
                                onComplete={() => console.log('Card added to deck')}
                                autoReveal={false}
                            />

                            {/* WEEK ONE MILESTONES */}
                            {!blitzMode && <WeekOneMilestones />}

                            {/* TROUBLESHOOTING */}
                            {!blitzMode && <TroubleshootingAccordion />}

                            {/* CASE STUDY */}
                            {!blitzMode && (
                                <CaseStudyCard
                                    name="David"
                                    role="Engineer, father of 2"
                                    problem="Checked 6 apps before breakfast. Often forgot kid's activities or deadlines until the last minute."
                                    result="His Companion flagged a 7 AM parent-teacher conference he would have slept through. Zero forgotten events since."
                                    timeframe="1 week"
                                    quote="My wife noticed before I did. I'm just... less frantic now. The day starts smoothly instead of in chaos."
                                />
                            )}

                            {/* SHAREABLE QUOTE */}
                            <ShareableQuote
                                quote="The best morning routine isn't about waking up earlier. It's about waking up smarter."
                                chapter={4}
                            />

                            {/* CAPTAIN EFFICIENCY - CLOSER */}
                            {!blitzMode && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="celebrating"
                                        message="Outstanding, Explorer! You just built your first practical AI workflow. Not a toy—a SYSTEM you'll use every single day. Copy that prompt into your AI of choice tonight, and tomorrow morning will feel different. That's not hype—that's compounding leverage in action. Next up: we're tackling the kitchen. Because the second-most chaotic part of your day is deciding what to eat. 🍳"
                                    />
                                </Suspense>
                            )}

                            {/* FAQ SECTION */}
                            <FAQSection
                                title="Morning Routine Questions"
                                faqs={chapter4FAQs}
                                className="mb-10"
                            />

                            {/* MISSION COMPLETE */}
                            <MissionComplete
                                operationId="exp_4"
                                operationName="MORNING GLORY"
                                operationNumber={4}
                                nextOperationPath="/part2/chapter2"
                                nextOperationName="KITCHEN & GROCERY"
                                rewards={{
                                    dp: 150,
                                    cards: ['Morning Brief Companion'],
                                    achievements: ['morning_glory', 'first_daily_companion']
                                }}
                                stats={{
                                    objectivesCompleted: "3/3",
                                }}
                            />

                            {/* Bottom Navigation */}
                            <ChapterNavigation
                                previousChapter="/part1/chapter3"
                                nextChapter="/part2/chapter2"
                                partNumber={2}
                                chapterNumber={4}
                            />
                        </PasswordGate>

                    </div>
                </div>
            </BlitzModeContext.Provider>
        </WebbookLayout>
    );
};

export default Chapter4;