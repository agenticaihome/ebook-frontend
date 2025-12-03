import React from 'react';
import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import PasswordGate from '../../components/common/PasswordGate';
import ChapterNavigation from '../../components/common/ChapterNavigation';

import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import ChapterNavigation from '../../components/common/ChapterNavigation';

import React, { useState, Suspense, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, ShoppingCart, Utensils,
    DollarSign, Target, Refrigerator, Trash2, Users, Calendar,
    AlertTriangle, HelpCircle, Leaf, ChefHat, Receipt, TrendingDown
} from 'lucide-react';

// Lazy load interactive components
const FoodChaosCalculator = React.lazy(() => import('../../components/FoodChaosCalculator'));
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
            <div className="text-orange-400 font-bold text-sm mb-2 uppercase tracking-wider">
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
        bonus: 'from-yellow-900/30 to-orange-900/20 border-yellow-500/40',
    };

    const labelColors = {
        default: 'text-green-400',
        secondary: 'text-purple-400',
        bonus: 'text-yellow-400',
    };

    return (
        <div className={`bg-gradient-to-br ${variants[variant]} rounded-2xl p-6 border backdrop-blur-sm mb-8`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Zap className={labelColors[variant]} size={20} />
                    <span className={`${labelColors[variant]} font-bold uppercase text-sm tracking-wider`}>
                        {variant === 'bonus' ? 'Bonus Prompt' : 'Quick Win'}
                    </span>
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

const ChapterComplete = ({ achievements, nextChapter, nextTitle }) => (
    <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
            </div>
            <div>
                <span className="text-green-400 font-bold block">Chapter 5 Complete</span>
                <span className="text-slate-400 text-sm">You're 31% of the way there</span>
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
// CHAPTER 5 SPECIFIC COMPONENTS
// ============================================

// Food Chaos Diary - Emotional Hook
const FoodChaosDiary = () => {
    const moments = [
        { time: 'Monday 5:47 PM', text: 'Staring into fridge. Nothing goes together. Order pizza. Again.', emoji: '😩' },
        { time: 'Tuesday 6:15 PM', text: '"What\'s for dinner?" "I don\'t know, what do YOU want?"', emoji: '😤' },
        { time: 'Wednesday 7:30 PM', text: 'Discovered science experiment in back of fridge. RIP, $8 of produce.', emoji: '🤢' },
        { time: 'Thursday 5:30 PM', text: 'Emergency grocery run. 4 items planned. $67 spent.', emoji: '💸' },
        { time: 'Friday 6:00 PM', text: 'Kids won\'t eat what you made. Cereal for dinner it is.', emoji: '🥣' },
        { time: 'Sunday 11 AM', text: 'Meal prepping. Burn out by meal #2. Back to square one.', emoji: '😮‍💨' },
    ];

    return (
        <div className="relative bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />

            <h2 className="text-2xl font-bold text-white mb-2">Sound Familiar?</h2>
            <p className="text-slate-400 mb-6">A week in food chaos:</p>

            <div className="grid md:grid-cols-2 gap-3">
                {moments.map((moment, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-900/50 rounded-xl p-4 border border-slate-700"
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">{moment.emoji}</span>
                            <div>
                                <span className="text-orange-400 text-xs font-mono">{moment.time}</span>
                                <p className="text-slate-300 text-sm mt-1">{moment.text}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-red-900/20 rounded-xl border border-red-500/30">
                <p className="text-red-400 text-center font-medium">
                    This cycle repeats 52 times a year. Let's break it.
                </p>
            </div>
        </div>
    );
};

// Budget Impact Visual
const BudgetImpactVisual = () => {
    const savings = [
        { category: 'Reduced food waste', amount: 50, icon: Trash2, color: 'red' },
        { category: 'Fewer impulse buys', amount: 80, icon: ShoppingCart, color: 'orange' },
        { category: 'Less takeout/delivery', amount: 120, icon: Utensils, color: 'yellow' },
        { category: 'Better bulk buying', amount: 40, icon: Receipt, color: 'green' },
    ];

    const total = savings.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-6 border border-green-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <DollarSign className="text-green-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Monthly Savings Potential</h3>
                        <p className="text-slate-400 text-sm">Average family of 4</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-bold text-green-400">${total}</span>
                    <span className="text-slate-400 text-sm block">/month</span>
                </div>
            </div>

            <div className="space-y-3 mb-4">
                {savings.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900/50 flex items-center justify-center">
                            <item.icon className="text-slate-400" size={16} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-300 text-sm">{item.category}</span>
                                <span className="text-green-400 font-bold">${item.amount}</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(item.amount / total) * 100}%` }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="h-full bg-green-500/50 rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-slate-900/50 rounded-xl">
                <div className="flex items-center justify-between">
                    <span className="text-slate-400">Annual savings:</span>
                    <span className="text-green-400 font-bold text-xl">${total * 12}/year</span>
                </div>
                <p className="text-slate-500 text-xs mt-1">
                    That's a family vacation funded by eating smarter, not harder.
                </p>
            </div>
        </div>
    );
};

// Family Taste Profile Quick Builder
const FamilyTasteMapper = () => {
    const [profiles, setProfiles] = useState([
        { id: 1, name: '', likes: '', dislikes: '', dietary: '' },
    ]);

    const addProfile = () => {
        if (profiles.length < 6) {
            setProfiles([...profiles, { id: Date.now(), name: '', likes: '', dislikes: '', dietary: '' }]);
        }
    };

    const updateProfile = (id, field, value) => {
        setProfiles(profiles.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const removeProfile = (id) => {
        if (profiles.length > 1) {
            setProfiles(profiles.filter(p => p.id !== id));
        }
    };

    const generatePrompt = () => {
        const profileText = profiles
            .filter(p => p.name)
            .map(p => `- ${p.name}: Likes: ${p.likes || 'not specified'}. Dislikes: ${p.dislikes || 'none'}. Dietary: ${p.dietary || 'none'}.`)
            .join('\n');

        return `Here are my family's food preferences:\n\n${profileText}\n\nPlease consider these preferences when suggesting meals.`;
    };

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatePrompt());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Users className="text-purple-400" size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Family Taste Mapper</h3>
                    <p className="text-slate-400 text-sm">Quick-build your household preferences</p>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                {profiles.map((profile, index) => (
                    <div key={profile.id} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-cyan-400 text-xs font-bold uppercase">Person {index + 1}</span>
                            {profiles.length > 1 && (
                                <button
                                    onClick={() => removeProfile(profile.id)}
                                    className="text-slate-500 hover:text-red-400 text-xs"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="Name (e.g., Dad, Mom, Emma)"
                                value={profile.name}
                                onChange={(e) => updateProfile(profile.id, 'name', e.target.value)}
                                className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Dietary (vegetarian, gluten-free...)"
                                value={profile.dietary}
                                onChange={(e) => updateProfile(profile.id, 'dietary', e.target.value)}
                                className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Likes (pasta, chicken, spicy...)"
                                value={profile.likes}
                                onChange={(e) => updateProfile(profile.id, 'likes', e.target.value)}
                                className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Dislikes (mushrooms, seafood...)"
                                value={profile.dislikes}
                                onChange={(e) => updateProfile(profile.id, 'dislikes', e.target.value)}
                                className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-3">
                <button
                    onClick={addProfile}
                    disabled={profiles.length >= 6}
                    className="flex-1 py-2 rounded-xl border border-dashed border-slate-600 text-slate-400 hover:border-cyan-500 hover:text-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    + Add Family Member
                </button>
                <button
                    onClick={handleCopy}
                    className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${copied
                        ? 'bg-green-500 text-white'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-900'
                        }`}
                >
                    {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy Profile Prompt'}
                </button>
            </div>
        </div>
    );
};

// Two Agent System Visual
const TwoAgentSystem = () => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Your Food System: 2 Agents Working Together</h2>
            <p className="text-slate-400 mb-6">
                These agents feed into each other for seamless meal planning:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
                {/* Agent 1: Meal Planner */}
                <div className="bg-gradient-to-br from-orange-900/30 to-red-900/20 rounded-2xl p-5 border border-orange-500/40">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                            <ChefHat className="text-orange-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-orange-400 font-bold">Agent 1: Meal Planner</h3>
                            <p className="text-slate-400 text-sm">Decides what you'll eat</p>
                        </div>
                    </div>
                    <ul className="space-y-2 text-sm">
                        {[
                            'Creates weekly meal plans',
                            'Considers family preferences',
                            'Balances nutrition & variety',
                            'Suggests based on what you have',
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-slate-300">
                                <CheckCircle size={14} className="text-orange-400" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 w-8">
                    <ArrowRight className="text-cyan-400" size={24} />
                </div>

                {/* Agent 2: Grocery List */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 rounded-2xl p-5 border border-green-500/40">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <ShoppingCart className="text-green-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-green-400 font-bold">Agent 2: Grocery List</h3>
                            <p className="text-slate-400 text-sm">Gets you what you need</p>
                        </div>
                    </div>
                    <ul className="space-y-2 text-sm">
                        {[
                            'Generates list from meal plan',
                            'Organizes by store section',
                            'Suggests quantities',
                            'Reminds of pantry staples',
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-slate-300">
                                <CheckCircle size={14} className="text-green-400" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-4 p-4 bg-cyan-900/20 rounded-xl border border-cyan-500/30 text-center">
                <p className="text-cyan-400 text-sm">
                    <strong>The magic:</strong> Meal Planner output → Grocery List input. One seamless flow.
                </p>
            </div>
        </div>
    );
};

// Compact Case Study
const CaseStudyCard = ({ name, role, problem, result, timeframe, quote }) => (
    <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-5 border border-slate-500/40 backdrop-blur-sm mb-8">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-sm">
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
// CHAPTER 5 MAIN COMPONENT
// ============================================

const Chapter5 = () => {
    const [speedRun, setSpeedRun] = useState(false);

    const scrollToCalculator = () => {
        document.getElementById('food-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const mealPlannerPrompt = `You are my Meal Planning Agent. Your job is to create weekly meal plans that my whole family will actually eat.

MY FAMILY'S PREFERENCES:
[Paste your Family Taste Mapper output here]

CONSTRAINTS:
- Budget: Approximately $150-200/week for groceries
- Cooking time: Max 30-45 minutes on weeknights, more time okay on weekends
- Variety: Don't repeat proteins more than 2x per week
- Leftovers: Plan for 2-3 meals that make good next-day lunches

WEEKLY SCHEDULE:
- Monday-Thursday: Quick weeknight meals
- Friday: "Easy night" (leftovers, simple, or takeout-worthy homemade)
- Saturday: One slightly more involved recipe
- Sunday: Meal prep friendly (batch cooking okay)

OUTPUT FORMAT:
For each day, provide:
1. Meal name
2. Main ingredients
3. Estimated cook time
4. Brief description

At the end, include:
- A "Prep Ahead" section for things I can do Sunday
- Any ingredients that can be used across multiple meals

Ask me clarifying questions if needed, then generate this week's meal plan.`;

    const groceryListPrompt = `You are my Grocery List Agent. Based on the meal plan I provide, create an organized shopping list.

MEAL PLAN FOR THIS WEEK:
[Paste your meal plan here]

WHAT I ALREADY HAVE:
- Basic pantry staples (oil, salt, pepper, common spices)
- [Add any specific items you already have]

OUTPUT FORMAT:
Organize by store section:
🥬 PRODUCE
🥩 MEAT/PROTEIN  
🧀 DAIRY
🍞 BAKERY
🥫 PANTRY/CANNED
❄️ FROZEN
🧴 OTHER

For each item include:
- Quantity needed
- Any specific notes (e.g., "ripe avocados for Tuesday")

At the bottom, add:
- Estimated total cost
- Any suggested substitutions for expensive items
- "While you're there" reminder for household staples running low

Generate my grocery list now.`;

    const leftoverPrompt = `I have these leftovers in my fridge that need to be used:
[List your leftovers]

They need to be used within [X] days.

Please suggest 2-3 creative ways to transform these into new meals that:
1. Don't taste like "leftovers"
2. Take less than 20 minutes
3. Use minimal additional ingredients

For each suggestion, tell me:
- What to make
- What extra ingredients I need (if any)
- Quick instructions
- How it transforms the original dish`;

    return (
        <SpeedRunContext.Provider value={speedRun}>
            <div className="min-h-screen bg-[#0f0f1a]">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    {/* Progress Bar with Part indicator */}
                    <ChapterProgress
                        current={5}
                        total={16}
                        part={2}
                        partTitle="Daily Operations"
                    />

                    {/* Author Credibility */}
                    <AuthorCredibility />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <div className="text-cyan-400 font-mono text-sm mb-2">Chapter 5</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Kitchen & Grocery
                        </h1>
                        <p className="text-xl text-slate-400 mb-4">
                            End "what's for dinner?" forever—and save $200/month doing it
                        </p>

                        {/* Reading time + Speed Run toggle */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4 text-slate-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} />
                                    <span>9 min read</span>
                                </div>
                                <span>•</span>
                                <span className="text-orange-400">20 min to set up both agents</span>
                            </div>
                            <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                        </div>
                    </motion.div>

                    {/* TL;DR Card */}
                    <TLDRCard
                        stats={[
                            { value: '$290', label: 'saved/month' },
                            { value: '2', label: 'agents working together' },
                            { value: '0', label: '"what\'s for dinner?"' },
                        ]}
                        primaryCTA="Calculate My Food Chaos"
                        onCTAClick={scrollToCalculator}
                    />

                    {/* CAPTAIN EFFICIENCY - OPENER */}
                    {!speedRun && (
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="The kitchen is where families come together—or fall apart into hangry chaos. Every 'what's for dinner?' drains energy you could spend actually enjoying the meal. Let's fix that. By the end of this chapter, you'll have TWO agents working together: one that plans your meals, one that builds your grocery list. Your fridge is about to make sense."
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
                                Showing only the essential prompts. Toggle off to see family mapping tools and full context.
                            </p>
                        </motion.div>
                    )}

                    {/* ★ EMOTIONAL HOOK: Food Chaos Diary ★ */}
                    {!speedRun && <FoodChaosDiary />}

                    {/* FOOD CHAOS CALCULATOR */}
                    <section id="food-calculator" className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                            <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Calculate Your Chaos</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                        </div>

                        <Suspense fallback={
                            <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                Loading calculator...
                            </div>
                        }>
                            <FoodChaosCalculator />
                        </Suspense>
                    </section>

                    {/* BUDGET IMPACT VISUAL */}
                    {!speedRun && <BudgetImpactVisual />}

                    {/* TWO AGENT SYSTEM EXPLAINER */}
                    {!speedRun && <TwoAgentSystem />}

                    {/* FAMILY TASTE MAPPER */}
                    {!speedRun && <FamilyTasteMapper />}

                    {/* PROMPT 1: MEAL PLANNER */}
                    <QuickWin
                        title="Agent 1: The Meal Planner"
                        setupTime="10 min"
                        prompt={mealPlannerPrompt}
                    />

                    {/* PROMPT 2: GROCERY LIST */}
                    <QuickWin
                        title="Agent 2: The Grocery List Generator"
                        setupTime="5 min"
                        prompt={groceryListPrompt}
                        variant="secondary"
                    />

                    {/* BONUS: LEFTOVER TRANSFORMER */}
                    <QuickWin
                        title="Bonus: The Leftover Transformer"
                        setupTime="2 min"
                        prompt={leftoverPrompt}
                        variant="bonus"
                    />

                    {/* CASE STUDY */}
                    {!speedRun && (
                        <CaseStudyCard
                            name="The Martinez Family"
                            role="2 adults, 3 kids (ages 4, 7, 11)"
                            problem="$460/week on groceries + takeout. 35% food waste. Constant dinner stress."
                            result="$235/week average. 10% waste. Kids actually eat what's served (most nights)."
                            timeframe="8 weeks"
                            quote="We went from food chaos to food peace. Sunday planning takes 15 minutes now, and the whole week just... works."
                        />
                    )}

                    {/* SHAREABLE QUOTE */}
                    <ShareableQuote
                        quote="The best meal plan isn't about eating healthy. It's about deciding once so you don't decide 21 times a week."
                        chapter={5}
                    />

                    {/* CAPTAIN EFFICIENCY - CLOSER */}
                    {!speedRun && (
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="celebrating"
                                message="You just automated the most-asked question in your household. No more staring into the fridge. No more 'I don't know, what do YOU want?' No more $40 impulse runs to the store. Your Meal Planning Agent and Grocery Agent are now a team. Next up: we tackle the rest of your household chaos—cleaning, maintenance, all of it. 🏠"
                            />
                        </Suspense>
                    )}

                    {/* CHAPTER COMPLETE */}
                    <ChapterComplete
                        achievements={[
                            'Calculated your food chaos cost (time + money)',
                            'Built your family taste profile',
                            'Set up Meal Planning Agent',
                            'Set up Grocery List Agent',
                            'Bonus: Leftover Transformer prompt',
                        ]}
                        nextChapter={6}
                        nextTitle="Household Management"
                    />

                </div>
            </div>
        </SpeedRunContext.Provider>
    );
};

export default Chapter5;
