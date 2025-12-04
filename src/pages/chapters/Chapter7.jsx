import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import PasswordGate from '../../components/common/PasswordGate';

import React, { useState, Suspense, createContext, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, Mail, Inbox, Send,
    Archive, Trash2, Star, AlertCircle, Bell, BellOff, Filter,
    Tag, FolderOpen, MailX, MailCheck, Timer, TrendingDown,
    Shield, Target, Layers, CheckCircle2, XCircle, Rocket
} from 'lucide-react';

// Lazy load interactive components
const EmailVolumeCalculator = React.lazy(() => import('../../components/EmailVolumeCalculator'));
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// SPEED RUN CONTEXT
// ============================================
const SpeedRunContext = createContext(false);

// ============================================
// REUSABLE COMPONENTS (matching previous chapters)
// ============================================

const ChapterProgress = ({ current, total, part, partTitle }) => (
    <div className="mb-6">
        {part && (
            <div className="text-purple-400 font-bold text-sm mb-2 uppercase tracking-wider">
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

const QuickWin = ({ title, prompt, setupTime, variant = 'default' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const variants = {
        default: 'from-green-900/30 to-emerald-900/20 border-green-500/40',
        secondary: 'from-purple-900/30 to-indigo-900/20 border-purple-500/40',
        tertiary: 'from-blue-900/30 to-cyan-900/20 border-blue-500/40',
        bonus: 'from-yellow-900/30 to-orange-900/20 border-yellow-500/40',
    };

    const labelColors = {
        default: 'text-green-400',
        secondary: 'text-purple-400',
        tertiary: 'text-blue-400',
        bonus: 'text-yellow-400',
    };

    return (
        <div className={`bg-gradient-to-br ${variants[variant]} rounded-2xl p-6 border backdrop-blur-sm mb-6`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Zap className={labelColors[variant]} size={20} />
                    <span className={`${labelColors[variant]} font-bold uppercase text-sm tracking-wider`}>
                        {variant === 'bonus' ? 'Bonus Prompt' : 'Agent Prompt'}
                    </span>
                </div>
                <span className="text-slate-400 text-sm">{setupTime}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>

            <div className="bg-slate-900/80 rounded-xl p-4 font-mono text-sm text-slate-300 mb-4 max-h-64 overflow-y-auto">
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

const ChapterComplete = ({ achievements, nextChapter, nextTitle }) => (
    <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
            </div>
            <div>
                <span className="text-green-400 font-bold block">Chapter 7 Complete</span>
                <span className="text-slate-400 text-sm">You're 44% of the way there</span>
            </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
            <p className="text-white font-bold text-sm mb-3">What you built:</p>
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
// CHAPTER 7 SPECIFIC COMPONENTS
// ============================================

// Part 3 Intro Banner
const Part3Intro = () => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-purple-900/40 rounded-2xl p-6 border border-purple-500/40 backdrop-blur-sm mb-8 relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                <Rocket className="text-purple-400" size={28} />
            </div>
            <div>
                <div className="text-purple-400 font-bold uppercase text-sm tracking-wider mb-1">
                    Entering Part 3
                </div>
                <h2 className="text-2xl font-bold text-white">Digital Operations</h2>
                <p className="text-slate-400 text-sm mt-1">
                    Your physical world is handled. Now we tackle where the hours really disappear.
                </p>
            </div>
        </div>
    </motion.div>
);

// Inbox Anxiety Visual
const InboxAnxietyVisual = () => {
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNotificationCount(prev => prev < 47 ? prev + 1 : prev);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const anxietyTriggers = [
        { text: "RE: RE: RE: Quick question", type: 'thread' },
        { text: "Just checking in...", type: 'followup' },
        { text: "URGENT: Need response ASAP", type: 'urgent' },
        { text: "Newsletter you subscribed to in 2019", type: 'newsletter' },
        { text: "The email you've been avoiding for 3 days", type: 'avoided' },
        { text: "Meeting invite for 7:30 AM tomorrow", type: 'meeting' },
    ];

    return (
        <div className="relative bg-gradient-to-br from-red-900/20 via-slate-900/30 to-slate-800/20 rounded-2xl p-8 border border-red-500/30 backdrop-blur-sm mb-8 overflow-hidden">
            {/* Animated notification badge */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4"
            >
                <div className="relative">
                    <Mail className="text-slate-500" size={32} />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                    >
                        {notificationCount}
                    </motion.div>
                </div>
            </motion.div>

            <div className="max-w-lg">
                <h2 className="text-2xl font-bold text-white mb-4">
                    The Inbox That Owns You
                </h2>

                <div className="space-y-2 mb-6">
                    {anxietyTriggers.map((trigger, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className={`flex items-center gap-3 p-3 rounded-lg ${trigger.type === 'urgent' ? 'bg-red-900/30 border border-red-500/30' :
                                    trigger.type === 'avoided' ? 'bg-yellow-900/20 border border-yellow-500/20' :
                                        'bg-slate-900/50 border border-slate-700'
                                }`}
                        >
                            <div className={`w-2 h-2 rounded-full ${trigger.type === 'urgent' ? 'bg-red-500' :
                                    trigger.type === 'avoided' ? 'bg-yellow-500' :
                                        trigger.type === 'newsletter' ? 'bg-slate-500' :
                                            'bg-blue-500'
                                }`} />
                            <span className="text-slate-300 text-sm">{trigger.text}</span>
                        </motion.div>
                    ))}
                </div>

                <p className="text-slate-400 text-sm mb-4">
                    Every unread email is a tiny open loop in your brain. A decision unmade.
                    A task undefined. Mental weight you carry all day.
                </p>

                <p className="text-cyan-400 font-bold">
                    It's time for your inbox to work for YOU.
                </p>
            </div>
        </div>
    );
};

// Email Stats Impact
const EmailStatsImpact = () => {
    const stats = [
        { value: '2.5', unit: 'hrs', label: 'Average daily email time', color: 'red' },
        { value: '121', unit: '', label: 'Emails received per day', color: 'orange' },
        { value: '28', unit: '%', label: 'Of workday spent on email', color: 'yellow' },
        { value: '650', unit: 'hrs', label: 'Per year on email', color: 'red' },
    ];

    const colors = {
        red: 'text-red-400 bg-red-500/20',
        orange: 'text-orange-400 bg-orange-500/20',
        yellow: 'text-yellow-400 bg-yellow-500/20',
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-4 border border-slate-500/40 backdrop-blur-sm text-center"
                >
                    <div className={`text-3xl font-bold ${colors[stat.color].split(' ')[0]}`}>
                        {stat.value}<span className="text-xl">{stat.unit}</span>
                    </div>
                    <div className="text-slate-400 text-xs mt-1">{stat.label}</div>
                </motion.div>
            ))}
        </div>
    );
};

// The Triage Matrix
const TriageMatrix = () => {
    const quadrants = [
        {
            position: 'top-left',
            title: '🔥 DO NOW',
            subtitle: 'Urgent + Important',
            color: 'red',
            actions: ['Respond immediately', 'Time-sensitive deadlines', 'Crisis management'],
            time: '< 2 min response',
        },
        {
            position: 'top-right',
            title: '📅 SCHEDULE',
            subtitle: 'Important, Not Urgent',
            color: 'blue',
            actions: ['Block time to respond thoughtfully', 'Strategic decisions', 'Relationship building'],
            time: 'Within 24-48 hrs',
        },
        {
            position: 'bottom-left',
            title: '⚡ DELEGATE',
            subtitle: 'Urgent, Not Important',
            color: 'yellow',
            actions: ['Forward to right person', 'Use template response', 'Quick acknowledgment'],
            time: 'Quick handoff',
        },
        {
            position: 'bottom-right',
            title: '🗑️ DELETE/ARCHIVE',
            subtitle: 'Not Urgent, Not Important',
            color: 'gray',
            actions: ['Unsubscribe', 'Archive for reference', 'Auto-filter in future'],
            time: 'Zero time spent',
        },
    ];

    const colors = {
        red: 'from-red-900/40 to-red-900/20 border-red-500/40',
        blue: 'from-blue-900/40 to-blue-900/20 border-blue-500/40',
        yellow: 'from-yellow-900/40 to-yellow-900/20 border-yellow-500/40',
        gray: 'from-slate-800/40 to-slate-800/20 border-slate-500/40',
    };

    const textColors = {
        red: 'text-red-400',
        blue: 'text-blue-400',
        yellow: 'text-yellow-400',
        gray: 'text-slate-400',
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">The Email Triage Matrix</h2>
            <p className="text-slate-400 mb-6">
                Every email falls into one of four categories. Train your agent to sort automatically.
            </p>

            <div className="grid grid-cols-2 gap-4">
                {quadrants.map((q, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-gradient-to-br ${colors[q.color]} rounded-xl p-5 border backdrop-blur-sm`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-bold ${textColors[q.color]}`}>{q.title}</h3>
                            <span className="text-slate-500 text-xs">{q.time}</span>
                        </div>
                        <p className="text-slate-500 text-xs mb-3">{q.subtitle}</p>
                        <ul className="space-y-1">
                            {q.actions.map((action, j) => (
                                <li key={j} className="text-slate-300 text-sm flex items-center gap-2">
                                    <span className={textColors[q.color]}>•</span>
                                    {action}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* Axis labels */}
            <div className="flex justify-center mt-4 text-slate-500 text-xs">
                <span>← Less Urgent | More Urgent →</span>
            </div>
        </div>
    );
};

// Auto-Response Library
const AutoResponseLibrary = () => {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const templates = [
        {
            name: 'The Acknowledger',
            scenario: 'When you need time to respond properly',
            template: `Thanks for reaching out! I've received this and will give it the attention it deserves. You can expect a thoughtful response by [DAY].`,
        },
        {
            name: 'The Redirector',
            scenario: 'When someone else should handle it',
            template: `Thanks for thinking of me! For this type of request, [NAME] is actually the best person to help. I've CC'd them here. They'll take great care of you.`,
        },
        {
            name: 'The Boundary Setter',
            scenario: 'When the request is outside your scope',
            template: `I appreciate you reaching out. Unfortunately, this falls outside what I'm able to help with right now. I'd suggest [ALTERNATIVE RESOURCE] as a great option for this.`,
        },
        {
            name: 'The Meeting Deflector',
            scenario: 'When a meeting isn\'t necessary',
            template: `Thanks for suggesting we meet! Before we schedule, could you send over the key points or questions? Often we can resolve things faster async, and if we still need to talk, I'll have context to make our time more productive.`,
        },
        {
            name: 'The Closure Seeker',
            scenario: 'When an email thread won\'t die',
            template: `I think we've covered the key points here. Unless there's something specific still unresolved, I'll consider this wrapped up. Feel free to reach out if anything else comes up!`,
        },
    ];

    const handleCopy = (index, template) => {
        navigator.clipboard.writeText(template);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Auto-Response Library</h2>
            <p className="text-slate-400 mb-6">
                Copy these templates. Your agent can suggest them automatically.
            </p>

            <div className="space-y-4">
                {templates.map((t, i) => (
                    <div
                        key={i}
                        className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl border border-slate-500/40 backdrop-blur-sm overflow-hidden"
                    >
                        <div className="p-4 border-b border-slate-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-bold">{t.name}</h3>
                                    <p className="text-slate-500 text-xs">{t.scenario}</p>
                                </div>
                                <button
                                    onClick={() => handleCopy(i, t.template)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${copiedIndex === i
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                        }`}
                                >
                                    {copiedIndex === i ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-900/50">
                            <p className="text-slate-300 text-sm italic">"{t.template}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Unsubscribe Blitz Checklist
const UnsubscribeBlitz = () => {
    const [completed, setCompleted] = useState({});

    const categories = [
        { id: 'retail', label: 'Retail/Shopping emails', estimate: '10-20 emails/week', icon: '🛍️' },
        { id: 'social', label: 'Social media notifications', estimate: '5-15 emails/week', icon: '📱' },
        { id: 'news', label: 'News digests you don\'t read', estimate: '7-14 emails/week', icon: '📰' },
        { id: 'saas', label: 'SaaS tools you don\'t use', estimate: '5-10 emails/week', icon: '💻' },
        { id: 'promo', label: 'Promotional emails', estimate: '15-30 emails/week', icon: '📢' },
    ];

    const toggleComplete = (id) => {
        setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const completedCount = Object.values(completed).filter(Boolean).length;
    const estimatedSaved = completedCount * 12; // rough estimate

    return (
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-6 border border-green-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <MailX className="text-green-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">10-Minute Unsubscribe Blitz</h3>
                        <p className="text-slate-400 text-sm">Quick wins to reduce inbox volume</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-green-400">~{estimatedSaved}</span>
                    <span className="text-slate-500 text-xs block">emails/week saved</span>
                </div>
            </div>

            <div className="space-y-3 mb-4">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        onClick={() => toggleComplete(cat.id)}
                        className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${completed[cat.id]
                                ? 'bg-green-900/30 border border-green-500/30'
                                : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                            }`}
                    >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${completed[cat.id]
                                ? 'bg-green-500 text-white'
                                : 'bg-slate-700 text-slate-400'
                            }`}>
                            {completed[cat.id] ? <CheckCircle size={14} /> : '○'}
                        </div>
                        <span className="text-xl">{cat.icon}</span>
                        <div className="flex-1">
                            <span className={`font-medium ${completed[cat.id] ? 'text-slate-500 line-through' : 'text-white'}`}>
                                {cat.label}
                            </span>
                            <span className="text-slate-500 text-xs ml-2">({cat.estimate})</span>
                        </div>
                    </div>
                ))}
            </div>

            {completedCount === categories.length && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-900/30 rounded-xl border border-green-500/40 text-center"
                >
                    <MailCheck className="text-green-400 mx-auto mb-2" size={24} />
                    <p className="text-green-400 font-bold">Unsubscribe blitz complete!</p>
                    <p className="text-slate-400 text-sm">You'll receive ~{estimatedSaved} fewer emails per week.</p>
                </motion.div>
            )}
        </div>
    );
};

// Email Boundaries Card
const EmailBoundariesCard = () => {
    const boundaries = [
        {
            title: 'Check email at set times',
            description: 'Not constantly. Try 9 AM, 1 PM, 5 PM.',
            icon: Timer,
        },
        {
            title: 'Turn off notifications',
            description: 'Email will wait. Your focus won\'t.',
            icon: BellOff,
        },
        {
            title: 'Use the 2-minute rule',
            description: 'If it takes <2 min, do it now. Otherwise, schedule it.',
            icon: Zap,
        },
        {
            title: 'Batch similar responses',
            description: 'Handle all newsletters, all requests, all FYIs together.',
            icon: Layers,
        },
    ];

    return (
        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-2xl p-6 border border-purple-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Shield className="text-purple-400" size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Email Boundaries</h3>
                    <p className="text-slate-400 text-sm">Protect your attention</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {boundaries.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-900/50 rounded-xl p-4">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                            <b.icon className="text-purple-400" size={16} />
                        </div>
                        <div>
                            <h4 className="text-white font-medium text-sm">{b.title}</h4>
                            <p className="text-slate-400 text-xs mt-1">{b.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Case Study Card
const CaseStudyCard = ({ name, role, problem, result, timeframe, quote }) => (
    <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-5 border border-slate-500/40 backdrop-blur-sm mb-8">
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

        <p className="text-slate-400 text-sm italic border-l-2 border-cyan-500/50 pl-3">
            "{quote}"
        </p>
    </div>
);

// ============================================
// CHAPTER 7 MAIN COMPONENT
// ============================================

const Chapter7 = () => {
    const [speedRun, setSpeedRun] = useState(false);

    const scrollToCalculator = () => {
        document.getElementById('email-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const emailTriagePrompt = `You are my Email Triage Agent. Your job is to help me process my inbox efficiently using the triage matrix.

MY EMAIL CONTEXT:
- Work email: [Personal/Professional/Both]
- Average emails per day: [X]
- Biggest email pain points: [e.g., newsletters, CC chains, cold outreach]
- VIP senders (always important): [e.g., boss, key clients, family]
- Auto-archive senders: [e.g., specific newsletters, notifications]

TRIAGE CATEGORIES:
1. 🔥 DO NOW - Urgent + Important (respond immediately)
2. 📅 SCHEDULE - Important, Not Urgent (block time to respond)
3. ⚡ DELEGATE - Urgent, Not Important (forward or template)
4. 🗑️ DELETE/ARCHIVE - Neither (unsubscribe or file away)

WHEN I SHARE EMAILS WITH YOU:
1. Categorize each email into one of the 4 quadrants
2. For "DO NOW" - suggest a quick response
3. For "SCHEDULE" - suggest when to respond and key points to address
4. For "DELEGATE" - suggest who to forward to or which template to use
5. For "DELETE/ARCHIVE" - confirm it's safe to remove

OUTPUT FORMAT:
For each email, provide:
- Category: [emoji + name]
- Reasoning: (1 sentence why)
- Suggested action: (specific next step)
- Draft response: (if applicable)

Ask me clarifying questions about my email setup before we begin.`;

    const emailDraftPrompt = `You are my Email Drafting Assistant. When I share an email I need to respond to, help me craft the perfect response.

MY COMMUNICATION STYLE:
- Tone: [Professional/Friendly/Casual/Formal]
- Length preference: [Concise/Detailed/Depends on recipient]
- Signature style: [Full/Brief/None needed]

WHEN I ASK FOR A DRAFT:
1. Ask clarifying questions if the intent is unclear
2. Match my tone and style preferences
3. Keep it as short as possible while being complete
4. Offer 2-3 variations if appropriate (e.g., more direct vs. softer)
5. Highlight any risks or things I should consider before sending

FORMAT YOUR DRAFTS:
- Subject line suggestion (if new thread or should change)
- Body of email
- Notes: Any concerns or alternatives

My goal is to respond thoughtfully in minimal time. Help me do that.`;

    const weeklyReviewPrompt = `You are my Weekly Email Review Agent. Every Sunday evening (or whenever I check in), help me prepare for the week ahead.

WEEKLY REVIEW CHECKLIST:
1. INBOX ZERO CHECK
   - How many emails are currently in my inbox?
   - Any that have been sitting for more than 3 days?
   - What's blocking me from processing them?

2. FOLLOW-UP TRACKER
   - Any emails I sent that need follow-up?
   - Anyone who hasn't responded that I should nudge?

3. UPCOMING WEEK PREP
   - Any emails related to this week's meetings I should review?
   - Anything I committed to in email that's due this week?

4. UNSUBSCRIBE AUDIT
   - Any new newsletters that aren't providing value?
   - Notification settings that should change?

OUTPUT FORMAT:
- Current inbox count
- Top 3 emails to address first
- Follow-ups needed
- Week ahead email prep
- Suggested unsubscribes

Help me start each week with email under control.`;

    return (
        <SpeedRunContext.Provider value={speedRun}>
            <div className="min-h-screen bg-[#0f0f1a]">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    {/* Progress Bar with Part indicator */}
                    <ChapterProgress
                        current={7}
                        total={16}
                        part={3}
                        partTitle="Digital Operations"
                    />

                    {/* Part 3 Intro Banner */}
                    {!speedRun && <Part3Intro />}

                    {/* Author Credibility */}
                    <AuthorCredibility />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <div className="text-cyan-400 font-mono text-sm mb-2">Chapter 7</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Email Triage
                        </h1>
                        <p className="text-xl text-slate-400 mb-4">
                            Stop drowning. Start commanding.
                        </p>

                        {/* Reading time + Speed Run toggle */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4 text-slate-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} />
                                    <span>10 min read</span>
                                </div>
                                <span>•</span>
                                <span className="text-purple-400">15 min to reclaim your inbox</span>
                            </div>
                            <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                        </div>
                    </motion.div>

                    {/* TL;DR Card */}
                    <TLDRCard
                        stats={[
                            { value: '2.5 hrs', label: 'saved daily' },
                            { value: '4', label: 'quadrant system' },
                            { value: '0', label: 'inbox anxiety' },
                        ]}
                        primaryCTA="Calculate Email Load"
                        onCTAClick={scrollToCalculator}
                    />

                    <PasswordGate partNumber={3}>
                        {/* CAPTAIN EFFICIENCY - OPENER */}
                    {!speedRun && (
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="Welcome to Part 3. Your physical world is handled—morning, meals, household, all running smoothly. Now we go where the hours REALLY disappear: your inbox. The average professional spends 28% of their workday on email. That's 2.5 hours daily, 650 hours yearly. Let's take that back. By the end of this chapter, your inbox will serve YOU, not the other way around."
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
                                Showing only the essential prompts and triage system. Toggle off for full context.
                            </p>
                        </motion.div>
                    )}

                    {/* ★ INBOX ANXIETY VISUAL ★ */}
                    {!speedRun && <InboxAnxietyVisual />}

                    {/* EMAIL STATS IMPACT */}
                    {!speedRun && <EmailStatsImpact />}

                    {/* EMAIL VOLUME CALCULATOR */}
                    <section id="email-calculator" className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                            <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Calculate Your Load</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                        </div>

                        <Suspense fallback={
                            <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                Loading calculator...
                            </div>
                        }>
                            <EmailVolumeCalculator />
                        </Suspense>
                    </section>

                    {/* THE TRIAGE MATRIX */}
                    <TriageMatrix />

                    {/* AGENT 1: EMAIL TRIAGE */}
                    <QuickWin
                        title="Agent 1: The Email Triage Master"
                        setupTime="10 min"
                        prompt={emailTriagePrompt}
                        variant="default"
                    />

                    {/* AGENT 2: EMAIL DRAFTER */}
                    <QuickWin
                        title="Agent 2: The Email Draft Assistant"
                        setupTime="5 min"
                        prompt={emailDraftPrompt}
                        variant="secondary"
                    />

                    {/* AUTO-RESPONSE LIBRARY */}
                    {!speedRun && <AutoResponseLibrary />}

                    {/* UNSUBSCRIBE BLITZ */}
                    {!speedRun && <UnsubscribeBlitz />}

                    {/* AGENT 3: WEEKLY REVIEW */}
                    <QuickWin
                        title="Agent 3: Weekly Email Review"
                        setupTime="5 min"
                        prompt={weeklyReviewPrompt}
                        variant="tertiary"
                    />

                    {/* EMAIL BOUNDARIES */}
                    {!speedRun && <EmailBoundariesCard />}

                    {/* CASE STUDY */}
                    {!speedRun && (
                        <CaseStudyCard
                            name="Michael"
                            role="Marketing director, 200+ emails/day"
                            problem="4+ hours daily in email. Missed important messages buried in noise. Constant anxiety."
                            result="90 minutes daily. Zero missed priorities. Inbox zero every Friday."
                            timeframe="3 weeks"
                            quote="I used to check email 50+ times a day. Now I check 4 times and get more done. The triage system changed everything."
                        />
                    )}

                    {/* SHAREABLE QUOTE */}
                    <ShareableQuote
                        quote="Your inbox is everyone else's to-do list for you. It's time to take back control."
                        chapter={7}
                    />

                    <PasswordGate partNumber={3}>
                        {/* CAPTAIN EFFICIENCY - CLOSER */}
                    {!speedRun && (
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="celebrating"
                                message="Your inbox just got a bouncer. The Email Triage Agent now guards the door, letting in what matters and handling the rest. You've got template responses ready, an unsubscribe blitz behind you, and a weekly review system to keep things clean. But email is just one piece of your digital chaos. Next up: we defend your calendar from the meeting creep that's stealing your deep work time. 📅"
                            />
                        </Suspense>
                    )}

                    {/* CHAPTER COMPLETE */}
                    <ChapterComplete
                        achievements={[
                            'Email Triage Agent (4-quadrant categorization)',
                            'Email Draft Assistant (quick, tone-matched responses)',
                            'Weekly Email Review system',
                            'Auto-response template library',
                            'Unsubscribe blitz completed',
                        ]}
                        nextChapter={8}
                        nextTitle="Calendar Defense"
                    />

                    </PasswordGate>





                </div>
            </div>
        </SpeedRunContext.Provider>
    );
};

export default Chapter7;