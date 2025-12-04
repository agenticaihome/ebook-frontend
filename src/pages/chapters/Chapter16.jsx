import React, { useState, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Heart, Star, Crown, Trophy, Rocket,
    Sun, Moon, Coffee, Utensils, Home, Mail, Calendar, Brain,
    Users, BookOpen, Target, TrendingUp, Gift, MessageCircle,
    Twitter, Linkedin, Award, PartyPopper, Gem, Sunrise, Flag
} from 'lucide-react';
import PasswordGate from '../../components/common/PasswordGate';

// Lazy load interactive components
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

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
                    className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
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

// ============================================
// CHAPTER 16 SPECIFIC COMPONENTS
// ============================================

// Confetti Animation Component
const Confetti = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const emojis = ['🎉', '⭐', '🚀', '💜', '✨', '🎊', '🏆', '💫', '🌟', '🎯'];
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            left: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 2,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    initial={{ y: -50, x: `${particle.left}vw`, opacity: 1 }}
                    animate={{ y: '110vh', opacity: 0 }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        ease: 'linear',
                    }}
                    className="absolute text-2xl"
                >
                    {particle.emoji}
                </motion.div>
            ))}
        </div>
    );
};

// Epic Header with Animation
const EpicHeader = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
    >
        <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-6 py-2 rounded-full border border-yellow-500/30 mb-6"
        >
            <Crown className="text-yellow-400" size={20} />
            <span className="text-yellow-400 font-bold">THE FINALE</span>
            <Crown className="text-yellow-400" size={20} />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your New Life
            </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto">
            You started overwhelmed. You're ending in control.
            <br />
            <span className="text-white font-medium">Let's see how far you've come.</span>
        </p>
    </motion.div>
);

// Before/After Transformation
const TransformationVisual = () => {
    const [showAfter, setShowAfter] = useState(false);

    const beforeItems = [
        { icon: Sun, text: 'Wake up already behind', color: 'red' },
        { icon: Coffee, text: '"What should we eat?"', color: 'red' },
        { icon: Mail, text: '44 emails demanding attention', color: 'red' },
        { icon: Calendar, text: 'Double-booked, again', color: 'red' },
        { icon: Home, text: 'Maintenance surprises', color: 'red' },
        { icon: Users, text: 'Forgot another birthday', color: 'red' },
        { icon: Brain, text: 'Mental load crushing', color: 'red' },
        { icon: Moon, text: 'Fall asleep worried', color: 'red' },
    ];

    const afterItems = [
        { icon: Sunrise, text: 'Morning brief ready', color: 'green' },
        { icon: Utensils, text: 'Meals planned, groceries ordered', color: 'green' },
        { icon: Mail, text: '3 emails that actually matter', color: 'green' },
        { icon: Calendar, text: 'Focus time protected', color: 'green' },
        { icon: Home, text: 'Maintenance scheduled', color: 'green' },
        { icon: Heart, text: 'Never miss a connection', color: 'green' },
        { icon: Brain, text: 'Mind clear, system handles it', color: 'green' },
        { icon: Star, text: 'Fall asleep peaceful', color: 'green' },
    ];

    return (
        <div className="mb-12">
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setShowAfter(false)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${!showAfter
                        ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                        : 'bg-slate-800/50 text-slate-500'
                        }`}
                >
                    😰 Before
                </button>
                <button
                    onClick={() => setShowAfter(true)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${showAfter
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-slate-800/50 text-slate-500'
                        }`}
                >
                    😌 After
                </button>
            </div>

            <motion.div
                key={showAfter ? 'after' : 'before'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-6 border backdrop-blur-sm ${showAfter
                    ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/40'
                    : 'bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/40'
                    }`}
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(showAfter ? afterItems : beforeItems).map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-slate-900/50 rounded-xl p-4 text-center"
                        >
                            <item.icon
                                className={`mx-auto mb-2 ${showAfter ? 'text-green-400' : 'text-red-400'
                                    }`}
                                size={24}
                            />
                            <p className="text-slate-300 text-sm">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

// Impact Calculator Results
const ImpactResults = () => {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const metrics = [
        {
            value: '7-8',
            unit: 'hours',
            label: 'saved weekly',
            subtext: '364+ hours per year',
            color: 'cyan',
            icon: Clock,
        },
        {
            value: '$350',
            unit: '/month',
            label: 'in savings',
            subtext: '$4,200+ per year',
            color: 'green',
            icon: TrendingUp,
        },
        {
            value: '20+',
            unit: 'agents',
            label: 'working for you',
            subtext: 'Your personal team',
            color: 'purple',
            icon: Users,
        },
        {
            value: '∞',
            unit: '',
            label: 'peace of mind',
            subtext: 'Priceless',
            color: 'pink',
            icon: Heart,
        },
    ];

    const colorClasses = {
        cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/40 text-cyan-400',
        green: 'from-green-500/20 to-green-500/5 border-green-500/40 text-green-400',
        purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/40 text-purple-400',
        pink: 'from-pink-500/20 to-pink-500/5 border-pink-500/40 text-pink-400',
    };

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
                Your Total Impact
            </h2>

            <div className="grid md:grid-cols-4 gap-4">
                {metrics.map((metric, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={animated ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.15 }}
                        className={`bg-gradient-to-br ${colorClasses[metric.color]} rounded-2xl p-6 border text-center`}
                    >
                        <metric.icon className={`mx-auto mb-3 ${colorClasses[metric.color].split(' ').pop()}`} size={28} />
                        <div className="text-4xl font-bold text-white mb-1">
                            {metric.value}
                            <span className="text-lg font-normal text-slate-400">{metric.unit}</span>
                        </div>
                        <div className="text-slate-300 font-medium">{metric.label}</div>
                        <div className="text-slate-500 text-sm mt-1">{metric.subtext}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Journey Recap
const JourneyRecap = () => {
    const parts = [
        {
            part: 1,
            title: 'Foundations',
            chapters: ['The Overwhelm', 'The Agent Mindset', 'Your First Agent'],
            color: 'cyan',
            achievement: 'Understood the vision',
        },
        {
            part: 2,
            title: 'Daily Operations',
            chapters: ['Meal Planning', 'Household Management', 'Maintenance & Supplies'],
            color: 'orange',
            achievement: 'Home runs itself',
        },
        {
            part: 3,
            title: 'Digital Operations',
            chapters: ['Email Mastery', 'Calendar Defense', 'Admin & Finances'],
            color: 'purple',
            achievement: 'Digital life organized',
        },
        {
            part: 4,
            title: 'Life Systems',
            chapters: ['Health & Wellness', 'Relationships', 'Learning & Growth'],
            color: 'rose',
            achievement: 'YOU taken care of',
        },
        {
            part: 5,
            title: 'Integration & Mastery',
            chapters: ['Life OS', 'Advanced Techniques', 'Troubleshooting', 'Your New Life'],
            color: 'yellow',
            achievement: 'Complete mastery',
        },
    ];

    const colorClasses = {
        cyan: 'border-cyan-500/40 text-cyan-400',
        orange: 'border-orange-500/40 text-orange-400',
        purple: 'border-purple-500/40 text-purple-400',
        rose: 'border-rose-500/40 text-rose-400',
        yellow: 'border-yellow-500/40 text-yellow-400',
    };

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
                Your Journey
            </h2>

            <div className="space-y-4">
                {parts.map((part, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-slate-900/50 rounded-xl p-4 border ${colorClasses[part.color]} flex items-center gap-4`}
                    >
                        <div className={`w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold ${colorClasses[part.color]}`}>
                            {part.part}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h4 className="text-white font-bold">{part.title}</h4>
                                <CheckCircle className="text-green-400" size={16} />
                            </div>
                            <p className="text-slate-500 text-sm">{part.chapters.join(' → ')}</p>
                        </div>
                        <div className={`text-sm font-medium ${colorClasses[part.color]}`}>
                            {part.achievement}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// What You've Built
const AgentArmySummary = () => {
    const agentGroups = [
        {
            category: 'Daily Operations',
            agents: ['Morning Brief', 'Meal Planner', 'Grocery List', 'Cleaning Coordinator', 'Maintenance Manager', 'Supplies Tracker'],
            color: 'cyan',
        },
        {
            category: 'Digital Systems',
            agents: ['Email Triage', 'Email Drafter', 'Calendar Defender', 'Meeting Prep', 'Admin Tracker', 'Subscription Manager'],
            color: 'purple',
        },
        {
            category: 'Life Systems',
            agents: ['Health Coordinator', 'Medication Manager', 'Wellness Tracker', 'Connection Agent', 'Occasion Agent', 'Network Nurturer', 'Recovery Learner', 'Second Brain'],
            color: 'rose',
        },
        {
            category: 'Master Agents',
            agents: ['The Conductor', 'Daily Briefing', 'Weekly Review', 'System Health Check'],
            color: 'yellow',
        },
    ];

    const colorClasses = {
        cyan: 'bg-cyan-500/20 border-cyan-500/40',
        purple: 'bg-purple-500/20 border-purple-500/40',
        rose: 'bg-rose-500/20 border-rose-500/40',
        yellow: 'bg-yellow-500/20 border-yellow-500/40',
    };

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-12">
            <div className="text-center mb-6">
                <Trophy className="text-yellow-400 mx-auto mb-3" size={40} />
                <h2 className="text-2xl font-bold text-white">Your Agent Army</h2>
                <p className="text-slate-400">20+ agents working 24/7 for you</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {agentGroups.map((group, i) => (
                    <div key={i} className={`${colorClasses[group.color]} rounded-xl p-4 border`}>
                        <h4 className="text-white font-bold mb-3">{group.category}</h4>
                        <div className="flex flex-wrap gap-2">
                            {group.agents.map((agent, j) => (
                                <span key={j} className="bg-slate-900/50 text-slate-300 px-2 py-1 rounded text-xs">
                                    {agent}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Future Vision
const FutureVision = () => {
    const futures = [
        {
            timeframe: 'This Week',
            description: 'Agents handle the routine. You focus on what matters.',
            icon: Flag,
        },
        {
            timeframe: 'This Month',
            description: 'System runs smoothly. You barely think about logistics.',
            icon: TrendingUp,
        },
        {
            timeframe: 'This Year',
            description: '364 hours reclaimed. $4,200 saved. Life transformed.',
            icon: Rocket,
        },
        {
            timeframe: 'Beyond',
            description: 'You teach others. The ripple effect begins.',
            icon: Sparkles,
        },
    ];

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
                What's Next
            </h2>

            <div className="grid md:grid-cols-4 gap-4">
                {futures.map((future, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-900/50 rounded-xl p-5 border border-slate-700 text-center"
                    >
                        <future.icon className="text-cyan-400 mx-auto mb-3" size={28} />
                        <h4 className="text-white font-bold mb-2">{future.timeframe}</h4>
                        <p className="text-slate-400 text-sm">{future.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Call to Action
const CallToAction = () => {
    const [copied, setCopied] = useState(false);

    const shareText = "I just completed Agentic AI at Home and built a Life Operating System with 20+ AI agents. 7-8 hours saved weekly, $350/month in savings. The future is here. 🚀";

    const handleCopy = () => {
        navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl p-8 border border-purple-500/40 backdrop-blur-sm mb-8">
            <div className="text-center mb-6">
                <Gift className="text-purple-400 mx-auto mb-3" size={40} />
                <h2 className="text-2xl font-bold text-white mb-2">Share the Transformation</h2>
                <p className="text-slate-400">Help someone else escape the overwhelm</p>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
                <p className="text-slate-300 text-sm italic">"{shareText}"</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${copied
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                        }`}
                >
                    {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
                <button className="flex items-center gap-2 bg-[#1DA1F2]/20 text-[#1DA1F2] px-4 py-2 rounded-lg border border-[#1DA1F2]/50 hover:bg-[#1DA1F2]/30 transition-all">
                    <Twitter size={16} />
                    Tweet
                </button>
                <button className="flex items-center gap-2 bg-[#0A66C2]/20 text-[#0A66C2] px-4 py-2 rounded-lg border border-[#0A66C2]/50 hover:bg-[#0A66C2]/30 transition-all">
                    <Linkedin size={16} />
                    Share
                </button>
            </div>
        </div>
    );
};

// Final Celebration
const FinalCelebration = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-yellow-900/30 via-orange-900/30 to-red-900/30 rounded-2xl p-8 border border-yellow-500/40 backdrop-blur-sm text-center"
    >
        <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
            <Trophy className="text-yellow-400 mx-auto mb-4" size={64} />
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">
            🎉 Congratulations! 🎉
        </h2>

        <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
            You've completed <span className="text-yellow-400 font-bold">Agentic AI at Home</span>.
            You're no longer just surviving the chaos—you're <span className="text-green-400 font-bold">thriving</span> because of a system.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-slate-900/50 px-4 py-2 rounded-lg">
                <span className="text-slate-400 text-sm">Chapters Completed</span>
                <div className="text-2xl font-bold text-white">16/16</div>
            </div>
            <div className="bg-slate-900/50 px-4 py-2 rounded-lg">
                <span className="text-slate-400 text-sm">Agents Built</span>
                <div className="text-2xl font-bold text-white">20+</div>
            </div>
            <div className="bg-slate-900/50 px-4 py-2 rounded-lg">
                <span className="text-slate-400 text-sm">Life Status</span>
                <div className="text-2xl font-bold text-green-400">Transformed</div>
            </div>
        </div>

        <p className="text-slate-400 italic">
            "You didn't just read a book. You built a system. You changed your life."
        </p>
    </motion.div>
);

// ============================================
// CHAPTER 16 MAIN COMPONENT
// ============================================

const Chapter16 = () => {
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Helmet>
                <title>Chapter 16: Your New Life | Agentic AI at Home</title>
                <meta name="description" content="The grand finale. See your transformation: 7-8 hours saved weekly, $350/month in savings, 20+ agents working for you. Your new life begins now." />
            </Helmet>

            {showConfetti && <Confetti />}

            <div className="min-h-screen bg-[#0f0f1a]">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    {/* Progress Bar - COMPLETE */}
                    <ChapterProgress
                        current={16}
                        total={16}
                        part={5}
                        partTitle="Integration & Mastery"
                    />

                    {/* Author Credibility */}
                    <AuthorCredibility />

                    {/* EPIC HEADER */}
                    <EpicHeader />

                    <PasswordGate partNumber={5}>
                        {/* CAPTAIN EFFICIENCY - OPENER */}
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="lg"
                                pose="celebrating"
                                message="Look at you. You started this journey overwhelmed, drowning in tasks, wondering how other people seem to have it together. And now? You have a Life Operating System. Twenty-plus agents working around the clock. Meals planned. Emails handled. Calendar protected. Health tracked. Relationships nurtured. Growth happening. You didn't just read about AI. You BUILT with it. You TRANSFORMED with it. I couldn't be prouder."
                            />
                        </Suspense>

                        {/* BEFORE / AFTER */}
                        <TransformationVisual />

                        {/* IMPACT RESULTS */}
                        <ImpactResults />

                        {/* JOURNEY RECAP */}
                        <JourneyRecap />

                        {/* AGENT ARMY */}
                        <AgentArmySummary />

                        {/* FUTURE VISION */}
                        <FutureVision />

                        {/* SHAREABLE QUOTE */}
                        <div className="relative bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-8 border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl" />

                            <div className="relative text-center">
                                <div className="text-6xl text-purple-500/30 font-serif leading-none mb-2">"</div>
                                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-4 -mt-4">
                                    You didn't just learn about AI.
                                    <br />
                                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                        You built a new life with it.
                                    </span>
                                </p>
                                <span className="text-slate-500 text-sm">— The Doctor of Digital Systems</span>
                            </div>
                        </div>

                        {/* CALL TO ACTION */}
                        <CallToAction />

                        {/* CAPTAIN CLOSER */}
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="waving"
                                message="This isn't goodbye—it's the beginning. Your agents will keep working. Your system will keep evolving. And you? You'll keep getting better at this. Remember: the goal was never to be perfect. It was to have a system that handles the chaos so YOU can focus on what matters. Mission accomplished. Now go live your new life. I'll be here if you need me. 💜"
                            />
                        </Suspense>

                        {/* FINAL CELEBRATION */}
                        <FinalCelebration />

                    </PasswordGate>                <ChapterNavigation
                    previousChapter="/part5/chapter3"
                    nextChapter={null}
                    partNumber={5}
                    chapterNumber={4}
                />





                </div>
            </div>
        </>
    );
};

export default Chapter16;