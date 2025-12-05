import { Helmet } from 'react-helmet-async';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import PasswordGate from '../../components/common/PasswordGate';

import React, { useState, Suspense, createContext } from 'react';
import { motion } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, Cpu, Network, Layers,
    Sun, Moon, Coffee, Utensils, Mail, Calendar, Home, Heart,
    Users, BookOpen, FileText, ShoppingCart, Pill, Brain, Bell,
    Settings, Activity, TrendingUp, Shield, Target, Play, Pause,
    RefreshCw, Link2, Workflow, Command, Rocket, Crown, Star,
    ChevronRight, Circle, CheckCircle2, Zap as Lightning
} from 'lucide-react';

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
        master: 'from-yellow-900/30 via-orange-900/20 to-red-900/20 border-yellow-500/40',
    };

    const labelColors = {
        default: 'text-green-400',
        secondary: 'text-purple-400',
        tertiary: 'text-blue-400',
        master: 'text-yellow-400',
    };

    return (
        <div className={`bg-gradient-to-br ${variants[variant]} rounded-2xl p-6 border backdrop-blur-sm mb-6`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {variant === 'master' ? (
                        <Crown className={labelColors[variant]} size={20} />
                    ) : (
                        <Zap className={labelColors[variant]} size={20} />
                    )}
                    <span className={`${labelColors[variant]} font-bold uppercase text-sm tracking-wider`}>
                        {variant === 'master' ? 'Master Agent' : 'Agent Prompt'}
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
                <span className="text-green-400 font-bold block">Chapter 13 Complete</span>
                <span className="text-slate-400 text-sm">You're 81% of the way there!</span>
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
// CHAPTER 13 SPECIFIC COMPONENTS
// ============================================

// Part 5 Intro Banner
const Part5Intro = () => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan-900/40 via-purple-900/30 to-cyan-900/40 rounded-2xl p-6 border border-cyan-500/40 backdrop-blur-sm mb-8 relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                <Crown className="text-cyan-400" size={28} />
            </div>
            <div>
                <div className="text-cyan-400 font-bold uppercase text-sm tracking-wider mb-1">
                    Entering Part 5
                </div>
                <h2 className="text-2xl font-bold text-white">Integration & Mastery</h2>
                <p className="text-slate-400 text-sm mt-1">
                    Everything you've built is about to become <span className="text-cyan-400">one powerful system</span>.
                </p>
            </div>
        </div>
    </motion.div>
);

// The Agent Army - What You've Built
const AgentArmyVisual = () => {
    const [hoveredAgent, setHoveredAgent] = useState(null);

    const agents = [
        // Part 2: Daily Operations
        { name: 'Morning Brief', chapter: 4, icon: Sun, color: 'orange', domain: 'Daily' },
        { name: 'Meal Planner', chapter: 5, icon: Utensils, color: 'green', domain: 'Daily' },
        { name: 'Grocery List', chapter: 5, icon: ShoppingCart, color: 'green', domain: 'Daily' },
        { name: 'Cleaning Coordinator', chapter: 6, icon: Home, color: 'cyan', domain: 'Daily' },
        { name: 'Maintenance Manager', chapter: 6, icon: Settings, color: 'cyan', domain: 'Daily' },
        { name: 'Supplies Tracker', chapter: 6, icon: FileText, color: 'cyan', domain: 'Daily' },
        // Part 3: Digital Operations
        { name: 'Email Triage', chapter: 7, icon: Mail, color: 'purple', domain: 'Digital' },
        { name: 'Email Drafter', chapter: 7, icon: FileText, color: 'purple', domain: 'Digital' },
        { name: 'Calendar Defender', chapter: 8, icon: Calendar, color: 'blue', domain: 'Digital' },
        { name: 'Meeting Prep', chapter: 8, icon: Target, color: 'blue', domain: 'Digital' },
        { name: 'Admin Tracker', chapter: 9, icon: FileText, color: 'indigo', domain: 'Digital' },
        { name: 'Subscription Manager', chapter: 9, icon: RefreshCw, color: 'indigo', domain: 'Digital' },
        // Part 4: Life Systems
        { name: 'Health Coordinator', chapter: 10, icon: Heart, color: 'rose', domain: 'Life' },
        { name: 'Medication Manager', chapter: 10, icon: Pill, color: 'rose', domain: 'Life' },
        { name: 'Wellness Tracker', chapter: 10, icon: Activity, color: 'rose', domain: 'Life' },
        { name: 'Connection Agent', chapter: 11, icon: Users, color: 'pink', domain: 'Life' },
        { name: 'Occasion Agent', chapter: 11, icon: Star, color: 'pink', domain: 'Life' },
        { name: 'Network Nurturer', chapter: 11, icon: Link2, color: 'pink', domain: 'Life' },
        { name: 'Recovery Learner', chapter: 12, icon: BookOpen, color: 'amber', domain: 'Life' },
        { name: 'Second Brain', chapter: 12, icon: Brain, color: 'amber', domain: 'Life' },
    ];

    const colors = {
        orange: 'bg-orange-500/20 border-orange-500/50 text-orange-400',
        green: 'bg-green-500/20 border-green-500/50 text-green-400',
        cyan: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400',
        purple: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
        blue: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
        indigo: 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400',
        rose: 'bg-rose-500/20 border-rose-500/50 text-rose-400',
        pink: 'bg-pink-500/20 border-pink-500/50 text-pink-400',
        amber: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
    };

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8 relative overflow-hidden">
            {/* Connection lines */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                    {[...Array(10)].map((_, i) => (
                        <motion.line
                            key={i}
                            x1={`${10 + i * 10}%`}
                            y1="10%"
                            x2={`${50}%`}
                            y2="50%"
                            stroke="url(#lineGradient)"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: i * 0.1 }}
                        />
                    ))}
                </svg>
            </div>

            <div className="relative">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Your Agent Army</h2>
                        <p className="text-slate-400 text-sm">20+ agents, built and ready</p>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                            {agents.length}
                        </div>
                        <div className="text-slate-500 text-xs">Active Agents</div>
                    </div>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 mb-4">
                    {agents.map((agent, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                            onMouseEnter={() => setHoveredAgent(i)}
                            onMouseLeave={() => setHoveredAgent(null)}
                            className={`relative p-3 rounded-xl border transition-all cursor-pointer ${colors[agent.color]} ${hoveredAgent === i ? 'scale-110 z-10' : ''
                                }`}
                        >
                            <agent.icon size={18} className="mx-auto mb-1" />
                            <div className="text-[10px] text-center truncate">{agent.name}</div>
                            {hoveredAgent === i && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-2 py-1 rounded text-xs whitespace-nowrap z-20 border border-slate-700"
                                >
                                    Ch {agent.chapter} • {agent.domain}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="p-4 bg-slate-900/50 rounded-xl">
                    <p className="text-slate-300 text-sm">
                        <span className="text-cyan-400 font-bold">Each agent is powerful alone.</span> But when they
                        work together—sharing information, triggering each other, covering blind spots—they become
                        your <span className="text-white font-bold">Life Operating System</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Day In The Life Timeline
const DayInTheLifeTimeline = () => {
    const [activeHour, setActiveHour] = useState(6);

    const timeline = [
        { hour: 6, time: '6:00 AM', label: 'Wake Up', agents: ['Morning Brief'], color: 'orange', description: 'Your Morning Brief Agent delivers: weather, calendar, priorities, and one motivating thought.' },
        { hour: 7, time: '7:00 AM', label: 'Breakfast', agents: ['Meal Planner'], color: 'green', description: 'Your Meal Planner prompt gave you breakfast ideas. You added groceries to your list with a quick prompt.' },
        { hour: 8, time: '8:00 AM', label: 'Email Block', agents: ['Email Triage', 'Email Drafter'], color: 'purple', description: 'Email Triage has pre-sorted your inbox. Drafts ready for quick responses.' },
        { hour: 9, time: '9:00 AM', label: 'Focus Block', agents: ['Calendar Defender'], color: 'blue', description: 'Calendar Defender protected this time. No meetings scheduled. Deep work happens.' },
        { hour: 12, time: '12:00 PM', label: 'Lunch', agents: ['Wellness Tracker', 'Meal Planner'], color: 'rose', description: 'Wellness check-in. Lunch planned. Hydration reminder.' },
        { hour: 14, time: '2:00 PM', label: 'Meeting Prep', agents: ['Meeting Prep', 'Second Brain'], color: 'blue', description: 'Meeting Prep has your talking points ready. Second Brain surfaces relevant notes.' },
        { hour: 17, time: '5:00 PM', label: 'Transition', agents: ['Admin Tracker', 'Connection Agent'], color: 'indigo', description: 'Admin reminder: car registration due in 2 weeks. Connection Agent: Call mom tonight?' },
        { hour: 18, time: '6:00 PM', label: 'Dinner', agents: ['Meal Planner', 'Supplies Tracker'], color: 'green', description: 'Dinner ready (ingredients prepped from meal plan). Supplies Tracker notes you\'re low on paper towels.' },
        { hour: 20, time: '8:00 PM', label: 'Learning', agents: ['Recovery Learner'], color: 'amber', description: 'Energy check: Medium. Suggests 20 min of video course, not deep study tonight.' },
        { hour: 22, time: '10:00 PM', label: 'Wind Down', agents: ['Health Coordinator', 'Medication Manager'], color: 'rose', description: 'Evening medication reminder. Tomorrow\'s schedule preview. Sleep well.' },
    ];

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Clock className="text-cyan-400" size={20} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">A Day in Your Life OS</h2>
                    <p className="text-slate-400 text-sm">How your agents work together, all day</p>
                </div>
            </div>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-purple-500 to-rose-500 opacity-30" />

                <div className="space-y-4">
                    {timeline.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => setActiveHour(item.hour)}
                            className={`relative pl-10 cursor-pointer transition-all ${activeHour === item.hour ? 'scale-[1.02]' : 'opacity-70 hover:opacity-100'
                                }`}
                        >
                            {/* Timeline dot */}
                            <div className={`absolute left-2 top-2 w-5 h-5 rounded-full border-2 transition-all ${activeHour === item.hour
                                ? 'bg-cyan-500 border-cyan-400 scale-125'
                                : 'bg-slate-800 border-slate-600'
                                }`} />

                            <div className={`bg-slate-900/50 rounded-xl p-4 border transition-all ${activeHour === item.hour
                                ? 'border-cyan-500/50'
                                : 'border-slate-700'
                                }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-cyan-400 font-mono text-sm">{item.time}</span>
                                        <span className="text-white font-medium">{item.label}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {item.agents.map((agent, j) => (
                                            <span key={j} className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-400">
                                                {agent}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {activeHour === item.hour && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="text-slate-400 text-sm"
                                    >
                                        {item.description}
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-4 p-4 bg-cyan-900/20 rounded-xl border border-cyan-500/30">
                <p className="text-cyan-400 text-sm">
                    <strong>Notice:</strong> You're not managing 20 agents. They're managing your day.
                    The right information surfaces when you need it—one prompt away.
                </p>
            </div>
        </div>
    );
};

// The Life OS Dashboard
const LifeOSDashboard = () => {
    const domains = [
        {
            name: 'Daily Operations',
            icon: Sun,
            color: 'orange',
            status: 'Running',
            agents: 6,
            lastActive: 'Just now',
        },
        {
            name: 'Digital Systems',
            icon: Mail,
            color: 'purple',
            status: 'Running',
            agents: 6,
            lastActive: '5 min ago',
        },
        {
            name: 'Life Management',
            icon: Heart,
            color: 'rose',
            status: 'Running',
            agents: 8,
            lastActive: '2 min ago',
        },
    ];

    const colors = {
        orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/40 text-orange-400',
        purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/40 text-purple-400',
        rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/40 text-rose-400',
    };

    return (
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl p-6 border border-cyan-500/30 backdrop-blur-sm mb-8 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-2 rounded-full border border-cyan-500/30 mb-3">
                        <Cpu className="text-cyan-400" size={16} />
                        <span className="text-cyan-400 font-bold text-sm">LIFE OPERATING SYSTEM</span>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Your Command Center</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {domains.map((domain, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-gradient-to-br ${colors[domain.color]} rounded-xl p-4 border backdrop-blur-sm`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <domain.icon size={20} />
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-xs text-green-400">{domain.status}</span>
                                </div>
                            </div>
                            <h3 className="font-bold text-white mb-1">{domain.name}</h3>
                            <div className="flex items-center justify-between text-xs text-slate-400">
                                <span>{domain.agents} agents</span>
                                <span>{domain.lastActive}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-400 text-sm">System Status</span>
                        <span className="text-green-400 text-sm font-bold">All Systems Operational</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-white">20</div>
                            <div className="text-slate-500 text-xs">Active Agents</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-400">98%</div>
                            <div className="text-slate-500 text-xs">Automation Rate</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-cyan-400">7h</div>
                            <div className="text-slate-500 text-xs">Saved Weekly</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-400">$350</div>
                            <div className="text-slate-500 text-xs">Saved Monthly</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Agent Communication Flow
const AgentCommunicationFlow = () => {
    const flows = [
        {
            trigger: 'Meal Planner creates weekly menu',
            flow: ['Meal Planner', 'Grocery List', 'Supplies Tracker'],
            description: 'Menu → Ingredients → Shopping list → Stock levels updated',
        },
        {
            trigger: 'Calendar Defender blocks focus time',
            flow: ['Calendar Defender', 'Email Triage', 'Meeting Prep'],
            description: 'Focus block set → Email delays non-urgent → Prep queued for after',
        },
        {
            trigger: 'Health Coordinator schedules appointment',
            flow: ['Health Coordinator', 'Calendar Defender', 'Admin Tracker'],
            description: 'Appointment → Calendar blocked → Reminder set → Insurance checked',
        },
        {
            trigger: 'Connection Agent flags birthday',
            flow: ['Connection Agent', 'Occasion Agent', 'Admin Tracker'],
            description: 'Birthday in 7 days → Gift ideas generated → Budget checked',
        },
    ];

    return (
        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-2xl p-6 border border-purple-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Network className="text-purple-400" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Agent Communication</h2>
                    <p className="text-slate-400 text-sm">How your agents talk to each other</p>
                </div>
            </div>

            <div className="space-y-4">
                {flows.map((flow, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-900/50 rounded-xl p-4 border border-slate-700"
                    >
                        <div className="text-white font-medium mb-2 text-sm">{flow.trigger}</div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            {flow.flow.map((agent, j) => (
                                <React.Fragment key={j}>
                                    <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                                        {agent}
                                    </span>
                                    {j < flow.flow.length - 1 && (
                                        <ChevronRight className="text-slate-600" size={14} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <p className="text-slate-500 text-xs">{flow.description}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-slate-900/50 rounded-xl">
                <p className="text-purple-400 text-sm">
                    <strong>The power:</strong> No prompt works in isolation. The frameworks you learn connect together,
                    so nothing falls through the cracks.
                </p>
            </div>
        </div>
    );
};

// Weekly Review Framework
const WeeklyReviewFramework = () => {
    const sections = [
        { name: 'Wins', icon: Star, color: 'green', question: 'What worked well this week?' },
        { name: 'Misses', icon: Target, color: 'red', question: 'What fell through the cracks?' },
        { name: 'Adjustments', icon: Settings, color: 'yellow', question: 'What needs tuning?' },
        { name: 'Next Week', icon: Calendar, color: 'blue', question: 'What\'s the priority?' },
    ];

    const colors = {
        green: 'bg-green-500/20 border-green-500/40 text-green-400',
        red: 'bg-red-500/20 border-red-500/40 text-red-400',
        yellow: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400',
        blue: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
    };

    return (
        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-2xl p-6 border border-blue-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <RefreshCw className="text-blue-400" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Weekly System Review</h2>
                    <p className="text-slate-400 text-sm">Keep your Life OS running smoothly</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sections.map((section, i) => (
                    <div
                        key={i}
                        className={`${colors[section.color]} rounded-xl p-4 border text-center`}
                    >
                        <section.icon className="mx-auto mb-2" size={20} />
                        <h3 className="font-bold text-white text-sm mb-1">{section.name}</h3>
                        <p className="text-xs opacity-70">{section.question}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-slate-900/50 rounded-xl">
                <p className="text-blue-400 text-sm">
                    <strong>Ritual:</strong> 15 minutes every Sunday. Review, adjust, prepare.
                    Your Conductor Agent will guide you through it.
                </p>
            </div>
        </div>
    );
};

// ============================================
// CHAPTER 13 MAIN COMPONENT
// ============================================

const Chapter13 = () => {
    const [speedRun, setSpeedRun] = useState(false);

    const scrollToDashboard = () => {
        document.getElementById('life-os-dashboard')?.scrollIntoView({ behavior: 'smooth' });
    };

    const conductorAgentPrompt = `You are my Life Operating System Conductor. You're the master agent that orchestrates all my other agents and ensures everything works together.

MY AGENT INVENTORY:
Daily Operations:
- Morning Brief Agent (daily priorities)
- Meal Planner + Grocery List (food system)
- Cleaning Coordinator, Maintenance Manager, Supplies Tracker (household)

Digital Operations:
- Email Triage + Email Drafter (inbox management)
- Calendar Defender + Meeting Prep (time protection)
- Admin Tracker + Subscription Manager (paperwork)

Life Systems:
- Health Coordinator + Medication Manager + Wellness Tracker (health)
- Connection Agent + Occasion Agent + Network Nurturer (relationships)
- Recovery-Aware Learner + Second Brain (growth)

YOUR RESPONSIBILITIES:

1. MORNING BRIEFING (Daily)
When I check in each morning, provide:
- Today's top 3 priorities
- Any agent alerts (appointments, reminders, overdue items)
- Weather and schedule overview
- One thing to look forward to

2. CROSS-AGENT COORDINATION
- When Meal Planner creates a menu → trigger Grocery List
- When Health Coordinator schedules appointment → update Calendar
- When Connection Agent flags birthday → alert Occasion Agent
- Ensure no conflicts between agent activities

3. WEEKLY REVIEW (Sunday)
Guide me through:
- What worked well (wins)
- What fell through the cracks (misses)
- System adjustments needed
- Next week's priorities

4. SYSTEM HEALTH MONITORING
- Flag any agents that haven't been used in 2+ weeks
- Identify patterns (e.g., consistently missing meal planning)
- Suggest optimizations

OUTPUT FORMAT:
🎯 Good morning! Here's your Life OS briefing:

📊 System Status: [All green / Needs attention]

🔥 Top Priorities:
1. [Most important]
2. [Second priority]
3. [Third priority]

⚠️ Agent Alerts:
- [Any reminders, due dates, or flags from agents]

💡 Today's Focus: [One sentence summary]

You are the conductor of my life's symphony. Help it play beautifully.`;

    const dailyBriefingPrompt = `You are my Daily Briefing Agent—the morning voice of my Life Operating System.

Every morning when I check in (or when I say "good morning"), provide a comprehensive but concise briefing.

GATHER INFORMATION FROM:
- Calendar (today's schedule, any conflicts)
- Weather (temperature, conditions, anything notable)
- Email Triage (any urgent items from overnight)
- Health Coordinator (any appointments or medication reminders)
- Admin Tracker (any deadlines approaching)
- Connection Agent (any birthdays or check-ins due)
- Meal Planner (what's for breakfast/lunch/dinner)

BRIEFING FORMAT:

🌅 Good morning! Here's your briefing for [Day, Date]:

🌤️ Weather: [Temp, conditions, anything to prepare for]

📅 Today's Schedule:
- [Time] - [Event]
- [Time] - [Event]
- Focus blocks: [Protected times]

🔥 Top 3 Priorities:
1. [Most important task]
2. [Second priority]
3. [Third priority]

⚠️ Heads Up:
- [Any alerts from other agents]
- [Upcoming deadlines in next 2-3 days]

🍽️ Meals Planned:
- Breakfast: [Item]
- Lunch: [Item]
- Dinner: [Item]

💭 One Thought: [Brief motivational or mindset note]

Keep it under 30 seconds to read. I want clarity, not overwhelm.`;

    const weeklyReviewPrompt = `You are my Weekly Review Agent. Every Sunday (or when I say "weekly review"), guide me through a comprehensive system check.

THE WEEKLY REVIEW RITUAL (15-20 minutes):

PART 1: CELEBRATE WINS (3 min)
Ask me:
- What went well this week?
- Which agents saved you time or stress?
- Any small victories worth noting?

PART 2: IDENTIFY MISSES (3 min)
Ask me:
- What fell through the cracks?
- Any agent that didn't perform as expected?
- Anything you wish you had automated?

PART 3: SYSTEM ADJUSTMENTS (5 min)
Review together:
- Any agents that need tuning?
- Prompts that need updating?
- New situations that need coverage?

PART 4: NEXT WEEK PREP (5 min)
Plan ahead:
- What are the top 3 priorities for next week?
- Any big events or deadlines?
- Focus blocks to protect?

PART 5: AGENT HEALTH CHECK (2 min)
Quick status:
- All agents active and useful?
- Any to retire or combine?
- Missing any capabilities?

OUTPUT FORMAT:

📊 WEEKLY REVIEW - [Date Range]

✅ WINS:
- [Win 1]
- [Win 2]

❌ MISSES:
- [Miss 1 - with fix]

🔧 ADJUSTMENTS:
- [Change to make]

📅 NEXT WEEK FOCUS:
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

🤖 AGENT STATUS: [All healthy / Needs attention]

Help me continuously improve my Life Operating System.`;

    return (
        <>
            <Helmet>
                <title>Chapter 13: Your Life OS | Agentic AI at Home</title>
                <meta name="description" content="Bringing it all together into a complete life operating system" />
            </Helmet>

            <SpeedRunContext.Provider value={speedRun}>
                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* Progress Bar with Part indicator */}
                        <ChapterProgress
                            current={13}
                            total={16}
                            part={5}
                            partTitle="Integration & Mastery"
                        />

                        {/* Part 5 Intro Banner */}
                        {!speedRun && <Part5Intro />}

                        {/* Author Credibility */}
                        <AuthorCredibility />

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="text-cyan-400 font-mono text-sm mb-2">Chapter 13</div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Life Operating System
                            </h1>
                            <p className="text-xl text-slate-400 mb-4">
                                Where everything connects. Where the magic happens.
                            </p>

                            {/* Reading time + Speed Run toggle */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4 text-slate-500 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        <span>12 min read</span>
                                    </div>
                                    <span>•</span>
                                    <span className="text-cyan-400">15 min to connect your agents</span>
                                </div>
                                <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                            </div>
                        </motion.div>

                        {/* TL;DR Card */}
                        <TLDRCard
                            stats={[
                                { value: '20+', label: 'agents unified' },
                                { value: '1', label: 'operating system' },
                                { value: '∞', label: 'peace of mind' },
                            ]}
                            primaryCTA="See My Life OS"
                            onCTAClick={scrollToDashboard}
                        />

                        <PasswordGate partNumber={5}>
                            {/* CAPTAIN EFFICIENCY - OPENER */}
                            {!speedRun && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="default"
                                        message="Welcome to Part 5. This is where everything changes. Look at what you've built: a Morning Brief Agent, a Meal Planner, a Household Command Center, Email Triage, Calendar Defense, Admin Tracking, Health Coordination, Connection Management, Recovery-Aware Learning. Twenty-plus agents. Each one powerful. But here's the secret: they're about to become MORE than the sum of their parts. Today, we connect them into your Life Operating System."
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
                                        Showing only the master prompts. Toggle off for the full integration experience.
                                    </p>
                                </motion.div>
                            )}

                            {/* ★ AGENT ARMY VISUAL ★ */}
                            {!speedRun && <AgentArmyVisual />}

                            {/* LIFE OS DASHBOARD */}
                            <section id="life-os-dashboard">
                                <LifeOSDashboard />
                            </section>

                            {/* DAY IN THE LIFE */}
                            {!speedRun && <DayInTheLifeTimeline />}

                            {/* MASTER AGENT: THE CONDUCTOR */}
                            <QuickWin
                                title="The Conductor Agent"
                                setupTime="15 min"
                                prompt={conductorAgentPrompt}
                                variant="master"
                            />

                            {/* AGENT COMMUNICATION FLOW */}
                            {!speedRun && <AgentCommunicationFlow />}

                            {/* DAILY BRIEFING AGENT */}
                            <QuickWin
                                title="Daily Briefing Agent"
                                setupTime="10 min"
                                prompt={dailyBriefingPrompt}
                                variant="default"
                            />

                            {/* WEEKLY REVIEW FRAMEWORK */}
                            {!speedRun && <WeeklyReviewFramework />}

                            {/* WEEKLY REVIEW AGENT */}
                            <QuickWin
                                title="Weekly Review Agent"
                                setupTime="10 min"
                                prompt={weeklyReviewPrompt}
                                variant="secondary"
                            />

                            {/* SHAREABLE QUOTE */}
                            <ShareableQuote
                                quote="A Life Operating System isn't about doing more. It's about the right things happening at the right time, without you having to remember them all."
                                chapter={13}
                            />

                            {/* CAPTAIN EFFICIENCY - CLOSER */}
                            {!speedRun && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="celebrating"
                                        message="Your Life Operating System is LIVE. Twenty agents, one conductor, working together like a symphony. The Morning Brief pulls from calendar, weather, and priorities. The Meal Planner triggers the Grocery List. The Calendar Defender protects your focus time. Everything connected. Everything automated. But we're not done yet—next chapter, we unlock the advanced techniques. Power user mode, activated. ⚡"
                                    />
                                </Suspense>
                            )}

                            {/* CHAPTER COMPLETE */}
                            <ChapterComplete
                                achievements={[
                                    'Life Operating System activated',
                                    'Conductor Agent (master orchestrator)',
                                    'Daily Briefing Agent (morning overview)',
                                    'Weekly Review Agent (system maintenance)',
                                    'Agent communication flows mapped',
                                    '20+ agents working as one system',
                                ]}
                                nextChapter={14}
                                nextTitle="Advanced Techniques"
                            />

                        </PasswordGate>
                        <ChapterNavigation
                            previousChapter="/part4/chapter3"
                            nextChapter="/part5/chapter2"
                            partNumber={5}
                            chapterNumber={1}
                        />






                    </div>
                </div>
            </SpeedRunContext.Provider>

        </>
    );
};

export default Chapter13;