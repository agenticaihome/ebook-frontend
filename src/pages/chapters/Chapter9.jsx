import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import PasswordGate from '../../components/common/PasswordGate';

import React, { useState, Suspense, createContext, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, FileText, FolderOpen,
    CreditCard, Car, Home, Heart, Briefcase, Calendar, Bell,
    DollarSign, AlertTriangle, RefreshCw, Trash2, Shield, Key,
    Plane, PawPrint, GraduationCap, Receipt, TrendingDown, Trophy,
    Rocket, CheckCircle2, XCircle, Clock3, AlertCircle, Layers
} from 'lucide-react';

// Lazy load interactive components
const AdminInventoryCalculator = React.lazy(() => import('../../components/AdminInventoryCalculator'));
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

// ============================================
// CHAPTER 9 SPECIFIC COMPONENTS
// ============================================

// Admin Ambush Calendar - Shows surprise tasks throughout the year
const AdminAmbushCalendar = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const ambushes = [
        { month: 0, task: 'Annual credit report', icon: CreditCard, severity: 'medium' },
        { month: 1, task: 'Tax docs arrive', icon: FileText, severity: 'high' },
        { month: 2, task: 'Car registration', icon: Car, severity: 'high' },
        { month: 3, task: 'Spring insurance review', icon: Shield, severity: 'medium' },
        { month: 4, task: 'Pet vaccinations', icon: PawPrint, severity: 'medium' },
        { month: 5, task: 'Passport renewal', icon: Plane, severity: 'high' },
        { month: 6, task: 'Mid-year subscription audit', icon: RefreshCw, severity: 'low' },
        { month: 7, task: 'Back-to-school forms', icon: GraduationCap, severity: 'high' },
        { month: 8, task: 'Annual physical scheduling', icon: Heart, severity: 'medium' },
        { month: 9, task: 'Open enrollment prep', icon: Briefcase, severity: 'high' },
        { month: 10, task: 'Holiday budget planning', icon: DollarSign, severity: 'medium' },
        { month: 11, task: 'Year-end financial review', icon: Receipt, severity: 'high' },
    ];

    const severityColors = {
        low: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
        medium: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400',
        high: 'bg-red-500/20 border-red-500/40 text-red-400',
    };

    return (
        <div className="bg-gradient-to-br from-red-900/20 via-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-red-500/30 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">The Admin Ambush</h2>
                    <p className="text-slate-400 text-sm">Tasks that sneak up on you every year</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-red-400">12+</div>
                    <div className="text-slate-500 text-xs">surprise tasks/year</div>
                </div>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-4">
                {months.map((month, i) => {
                    const ambush = ambushes.find(a => a.month === i);
                    return (
                        <motion.div
                            key={month}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`relative rounded-xl p-3 border ${ambush ? severityColors[ambush.severity] : 'bg-slate-900/30 border-slate-700'}`}
                        >
                            <div className="text-center">
                                <div className="text-xs font-bold text-slate-400 mb-1">{month}</div>
                                {ambush && (
                                    <>
                                        <ambush.icon size={18} className="mx-auto mb-1" />
                                        <div className="text-[9px] leading-tight">{ambush.task}</div>
                                    </>
                                )}
                            </div>
                            {ambush && ambush.severity === 'high' && (
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <div className="p-4 bg-slate-900/50 rounded-xl">
                <p className="text-slate-300 text-sm">
                    <span className="text-red-400 font-bold">The problem:</span> Each of these tasks seems small.
                    But they arrive without warning, always at the worst time, and the consequences of missing them—
                    late fees, expired documents, lapsed coverage—compound fast.
                </p>
                <p className="text-cyan-400 text-sm mt-2 font-medium">
                    Your Admin Agent will see them coming 30 days out.
                </p>
            </div>
        </div>
    );
};

// Admin Inventory Builder
const AdminInventoryBuilder = () => {
    const categories = [
        {
            name: 'Financial',
            icon: DollarSign,
            color: 'green',
            items: [
                { label: 'Monthly bills (utilities, phone, internet)', tracked: false },
                { label: 'Credit card payments', tracked: false },
                { label: 'Insurance premiums', tracked: false },
                { label: 'Subscriptions', tracked: false },
                { label: 'Tax deadlines', tracked: false },
            ],
        },
        {
            name: 'Vehicle',
            icon: Car,
            color: 'blue',
            items: [
                { label: 'Registration renewal', tracked: false },
                { label: 'Insurance renewal', tracked: false },
                { label: 'Oil change / maintenance', tracked: false },
                { label: 'Inspection / emissions', tracked: false },
            ],
        },
        {
            name: 'Health',
            icon: Heart,
            color: 'red',
            items: [
                { label: 'Annual physicals', tracked: false },
                { label: 'Dental cleanings', tracked: false },
                { label: 'Prescription refills', tracked: false },
                { label: 'Vaccinations', tracked: false },
                { label: 'Open enrollment', tracked: false },
            ],
        },
        {
            name: 'Home',
            icon: Home,
            color: 'orange',
            items: [
                { label: 'Rent/mortgage', tracked: false },
                { label: 'Property taxes', tracked: false },
                { label: 'HOA dues', tracked: false },
                { label: 'Home insurance renewal', tracked: false },
            ],
        },
        {
            name: 'Documents',
            icon: FileText,
            color: 'purple',
            items: [
                { label: 'Passport renewal', tracked: false },
                { label: 'Driver\'s license renewal', tracked: false },
                { label: 'Professional licenses', tracked: false },
                { label: 'Domain renewals', tracked: false },
            ],
        },
    ];

    const [inventory, setInventory] = useState(
        categories.reduce((acc, cat) => ({
            ...acc,
            [cat.name]: cat.items.map(item => ({ ...item }))
        }), {})
    );

    const colors = {
        green: 'border-green-500/40 text-green-400',
        blue: 'border-blue-500/40 text-blue-400',
        red: 'border-red-500/40 text-red-400',
        orange: 'border-orange-500/40 text-orange-400',
        purple: 'border-purple-500/40 text-purple-400',
    };

    const toggleItem = (categoryName, itemIndex) => {
        setInventory(prev => ({
            ...prev,
            [categoryName]: prev[categoryName].map((item, i) =>
                i === itemIndex ? { ...item, tracked: !item.tracked } : item
            )
        }));
    };

    const trackedCount = Object.values(inventory).flat().filter(i => i.tracked).length;
    const totalCount = Object.values(inventory).flat().length;

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <FolderOpen className="text-cyan-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Admin Inventory</h3>
                        <p className="text-slate-400 text-sm">Check what you need to track</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-cyan-400">{trackedCount}</span>
                    <span className="text-slate-500">/{totalCount}</span>
                    <span className="text-slate-500 text-xs block">items to track</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
                {categories.map((cat) => (
                    <div key={cat.name} className={`border ${colors[cat.color]} rounded-xl p-4 bg-slate-900/30`}>
                        <div className="flex items-center gap-2 mb-3">
                            <cat.icon size={18} className={colors[cat.color].split(' ')[1]} />
                            <span className={`font-bold ${colors[cat.color].split(' ')[1]}`}>{cat.name}</span>
                        </div>
                        <div className="space-y-2">
                            {inventory[cat.name].map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => toggleItem(cat.name, i)}
                                    className={`flex items-center gap-2 text-sm cursor-pointer p-2 rounded-lg transition-all ${item.tracked
                                        ? 'bg-green-900/30 text-green-400'
                                        : 'text-slate-400 hover:bg-slate-800/50'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded flex items-center justify-center ${item.tracked ? 'bg-green-500' : 'border border-slate-600'
                                        }`}>
                                        {item.tracked && <CheckCircle size={10} className="text-white" />}
                                    </div>
                                    <span className={item.tracked ? 'line-through opacity-70' : ''}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {trackedCount > 0 && (
                <div className="p-4 bg-green-900/20 rounded-xl border border-green-500/30 text-center">
                    <p className="text-green-400 font-medium">
                        Great! Your agent will track {trackedCount} admin tasks and remind you before each deadline.
                    </p>
                </div>
            )}
        </div>
    );
};

// Subscription Audit Tool
const SubscriptionAudit = () => {
    const [subscriptions, setSubscriptions] = useState([
        { name: 'Netflix', cost: 15.99, frequency: 'monthly', keep: null },
        { name: 'Spotify', cost: 10.99, frequency: 'monthly', keep: null },
        { name: 'Amazon Prime', cost: 139, frequency: 'yearly', keep: null },
        { name: 'Adobe Creative Cloud', cost: 54.99, frequency: 'monthly', keep: null },
        { name: 'Gym Membership', cost: 49, frequency: 'monthly', keep: null },
        { name: 'Cloud Storage', cost: 9.99, frequency: 'monthly', keep: null },
    ]);

    const setDecision = (index, keep) => {
        setSubscriptions(subs => subs.map((s, i) => i === index ? { ...s, keep } : s));
    };

    const calculateMonthlyCost = (sub) => {
        return sub.frequency === 'yearly' ? sub.cost / 12 : sub.cost;
    };

    const totalMonthly = subscriptions.reduce((sum, s) => sum + calculateMonthlyCost(s), 0);
    const canceledMonthly = subscriptions
        .filter(s => s.keep === false)
        .reduce((sum, s) => sum + calculateMonthlyCost(s), 0);

    return (
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-6 border border-green-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <RefreshCw className="text-green-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Quick Subscription Audit</h3>
                        <p className="text-slate-400 text-sm">Keep or cancel?</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-slate-400">Potential savings:</div>
                    <span className="text-2xl font-bold text-green-400">${canceledMonthly.toFixed(0)}</span>
                    <span className="text-slate-500">/mo</span>
                </div>
            </div>

            <div className="space-y-3 mb-4">
                {subscriptions.map((sub, i) => (
                    <div
                        key={i}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${sub.keep === true ? 'bg-green-900/20 border-green-500/30' :
                            sub.keep === false ? 'bg-red-900/20 border-red-500/30 opacity-60' :
                                'bg-slate-900/50 border-slate-700'
                            }`}
                    >
                        <div>
                            <span className={`font-medium ${sub.keep === false ? 'line-through text-slate-500' : 'text-white'}`}>
                                {sub.name}
                            </span>
                            <span className="text-slate-500 text-sm ml-2">
                                ${sub.cost}/{sub.frequency === 'yearly' ? 'yr' : 'mo'}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setDecision(i, true)}
                                className={`px-3 py-1 rounded-lg text-sm transition-all ${sub.keep === true
                                    ? 'bg-green-500 text-white'
                                    : 'bg-slate-700 text-slate-400 hover:bg-green-500/20 hover:text-green-400'
                                    }`}
                            >
                                Keep
                            </button>
                            <button
                                onClick={() => setDecision(i, false)}
                                className={`px-3 py-1 rounded-lg text-sm transition-all ${sub.keep === false
                                    ? 'bg-red-500 text-white'
                                    : 'bg-slate-700 text-slate-400 hover:bg-red-500/20 hover:text-red-400'
                                    }`}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-slate-900/50 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Current total:</span>
                    <span className="text-white font-bold">${totalMonthly.toFixed(0)}/month (${(totalMonthly * 12).toFixed(0)}/year)</span>
                </div>
                {canceledMonthly > 0 && (
                    <div className="flex items-center justify-between text-sm mt-2">
                        <span className="text-green-400">After canceling:</span>
                        <span className="text-green-400 font-bold">
                            ${(totalMonthly - canceledMonthly).toFixed(0)}/month
                            (Save ${(canceledMonthly * 12).toFixed(0)}/year)
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

// The Late Fee Graveyard
const LateFeeGraveyard = () => {
    const fees = [
        { item: 'Credit card late payment', cost: 35, icon: CreditCard },
        { item: 'Car registration late', cost: 50, icon: Car },
        { item: 'Utility reconnection', cost: 75, icon: Home },
        { item: 'Expired passport rush renewal', cost: 200, icon: Plane },
        { item: 'Insurance lapse reinstatement', cost: 150, icon: Shield },
        { item: 'License renewal late', cost: 25, icon: Key },
    ];

    const totalPotential = fees.reduce((sum, f) => sum + f.cost, 0);

    return (
        <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl p-6 border border-red-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="text-red-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">The Late Fee Graveyard</h3>
                        <p className="text-slate-400 text-sm">Money burned by forgetting things</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-slate-400">Potential annual cost:</div>
                    <span className="text-2xl font-bold text-red-400">${totalPotential}+</span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {fees.map((fee, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-900/50 rounded-xl p-3 border border-red-500/20"
                    >
                        <fee.icon className="text-red-400 mb-2" size={18} />
                        <div className="text-slate-400 text-xs">{fee.item}</div>
                        <div className="text-red-400 font-bold">${fee.cost}</div>
                    </motion.div>
                ))}
            </div>

            <div className="p-4 bg-green-900/20 rounded-xl border border-green-500/30">
                <p className="text-green-400 text-sm flex items-start gap-2">
                    <Shield size={16} className="flex-shrink-0 mt-0.5" />
                    <span>
                        <strong>Your Admin Agent prevents all of this.</strong> 30-day advance reminders
                        mean you're never caught off guard. That's ${totalPotential}+ saved per year.
                    </span>
                </p>
            </div>
        </div>
    );
};

// Part 3 Celebration
const Part3Celebration = () => {
    const [celebrated, setCelebrated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setCelebrated(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const achievements = [
        { chapter: 7, title: 'Email Triage', icon: FileText, result: '2.5 hrs/day saved' },
        { chapter: 8, title: 'Calendar Defense', icon: Calendar, result: '10+ hrs/week protected' },
        { chapter: 9, title: 'Admin Automation', icon: FolderOpen, result: '$500+/year saved' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-cyan-900/20 rounded-2xl p-8 border-2 border-purple-500/50 backdrop-blur-sm mb-8 relative overflow-hidden"
        >
            {/* Celebration particles */}
            {celebrated && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 1, y: 0 }}
                            animate={{
                                opacity: 0,
                                y: -100,
                                x: Math.random() * 200 - 100,
                            }}
                            transition={{ duration: 2, delay: i * 0.1 }}
                            className="absolute text-2xl"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: '100%',
                            }}
                        >
                            {['💻', '📧', '📅', '✨', '🎯'][i % 5]}
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="relative z-10">
                <div className="text-center mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/20 mb-4"
                    >
                        <Rocket className="text-purple-400" size={40} />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        🚀 PART 3 COMPLETE! 🚀
                    </h2>
                    <p className="text-slate-300">
                        Your digital world is now under control
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {achievements.map((item, i) => (
                        <motion.div
                            key={item.chapter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="bg-slate-900/50 rounded-xl p-4 text-center"
                        >
                            <item.icon className="text-purple-400 mx-auto mb-2" size={24} />
                            <div className="text-white font-bold text-sm">Ch {item.chapter}</div>
                            <div className="text-slate-400 text-xs mb-2">{item.title}</div>
                            <div className="text-green-400 font-bold text-sm">{item.result}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-8">
                        <div>
                            <div className="text-3xl font-bold text-green-400">20+ hrs</div>
                            <div className="text-slate-400 text-xs">Saved per week</div>
                        </div>
                        <div className="h-12 w-px bg-slate-700" />
                        <div>
                            <div className="text-3xl font-bold text-green-400">$500+</div>
                            <div className="text-slate-400 text-xs">Saved per year</div>
                        </div>
                        <div className="h-12 w-px bg-slate-700" />
                        <div>
                            <div className="text-3xl font-bold text-cyan-400">0</div>
                            <div className="text-slate-400 text-xs">Missed deadlines</div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-cyan-400 font-bold">
                        Next: Part 4 — Life Systems (Health, Social, Learning)
                    </p>
                    <p className="text-slate-500 text-sm mt-1">
                        Your physical and digital worlds are handled. Now we optimize YOU.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

// Chapter Complete with Part End
const ChapterCompleteWithPartEnd = ({ achievements, nextChapter, nextTitle, nextPart }) => (
    <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
            </div>
            <div>
                <span className="text-green-400 font-bold block">Chapter 9 Complete</span>
                <span className="text-slate-400 text-sm">Part 3 finished — 56% of the way there</span>
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

        <div className="bg-cyan-900/20 rounded-xl p-4 border border-cyan-500/30 mb-6">
            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                <Rocket size={16} />
                Next: Part 4 — Life Systems
            </div>
            <p className="text-slate-400 text-sm">
                Health tracking, social connections, learning & growth. Optimizing your actual life.
            </p>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-4 rounded-xl transition-all">
            Continue to Chapter {nextChapter}: {nextTitle}
            <ArrowRight size={18} />
        </button>
    </div>
);

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
// CHAPTER 9 MAIN COMPONENT
// ============================================

const Chapter9 = () => {
    const [speedRun, setSpeedRun] = useState(false);

    const scrollToCalculator = () => {
        document.getElementById('admin-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const adminTrackerPrompt = `You are my Admin & Paperwork Agent. Your job is to track all recurring administrative tasks and remind me before deadlines.

MY ADMIN INVENTORY:
[Paste your inventory from the checklist above, or list your items here]

Categories to track:
- Financial: Bills, payments, insurance, taxes
- Vehicle: Registration, insurance, maintenance
- Health: Appointments, prescriptions, open enrollment
- Home: Rent/mortgage, property taxes, HOA
- Documents: Passport, license, certifications

FOR EACH ITEM, TRACK:
- What it is
- When it's due (specific date or recurring schedule)
- What happens if missed (late fee, lapse, etc.)
- Lead time needed (how far in advance to remind me)

REMINDER SCHEDULE:
- 30 days before: First heads-up
- 14 days before: Planning reminder
- 7 days before: Action required
- 3 days before: Urgent reminder
- Day of: Final alert

OUTPUT FORMAT:
📋 Upcoming Admin (Next 30 Days):
- [Date] - [Task] - [Action needed]

⚠️ Overdue:
- [Any missed items]

💰 Cost to miss: [Potential late fees if not addressed]

Help me stay ahead of all admin tasks. No more surprises.`;

    const subscriptionManagerPrompt = `You are my Subscription Manager Agent. Your job is to track all my recurring subscriptions and help me optimize spending.

MY CURRENT SUBSCRIPTIONS:
[List your subscriptions here with costs and billing frequency]

FOR EACH SUBSCRIPTION, TRACK:
- Service name
- Monthly cost (or annual/12)
- Billing date
- Last time I actually used it
- Cancel difficulty (easy/medium/hard)

QUARTERLY AUDIT CHECKLIST:
1. Which subscriptions haven't I used in 30+ days?
2. Any subscriptions with overlapping features?
3. Any free alternatives available?
4. Any annual plans that would save money?
5. Any trials about to convert to paid?

REMIND ME:
- Before any free trial ends
- Before any annual renewal
- When a subscription hasn't been used in 30 days
- When prices increase

OUTPUT FORMAT:
💳 Active Subscriptions: [X] totaling $[X]/month
📊 Usage Check:
- High use: [List]
- Low use: [List - candidates for cancellation]
- Unused: [List - cancel now]

🎯 Potential savings: $[X]/month

Help me pay only for what I actually use.`;

    const documentProcessorPrompt = `You are my Document Processing Agent. When I need to fill out forms, applications, or paperwork, help me do it quickly and correctly.

WHEN I SHARE A FORM OR DESCRIBE PAPERWORK:

1. IDENTIFY what's being asked
   - What type of document is this?
   - What's the deadline?
   - What information is needed?

2. GATHER information systematically
   - Ask me for required details one section at a time
   - Flag any documents I'll need to locate
   - Note any fields I might not know offhand

3. HELP ME COMPLETE IT
   - Suggest appropriate responses
   - Flag any tricky questions
   - Remind me of common mistakes to avoid

4. VERIFY before submission
   - Checklist of required attachments
   - Signature reminders
   - Submission method and deadline

COMMON PAPERWORK I NEED HELP WITH:
- Tax forms and documentation
- Insurance applications/claims
- School forms for kids
- Medical paperwork
- Financial applications
- Government forms (DMV, passport, etc.)

OUTPUT FORMAT:
📝 Form: [Name]
📅 Due: [Date]
⏱️ Time estimate: [X minutes]

📋 Information needed:
- [List of fields]

📎 Documents to attach:
- [List]

Help me get through paperwork without the dread.`;

    return (            <Helmet>
                <title>Chapter 9: Admin & Finances | Agentic AI at Home</title>
                <meta name="description" content="Automate the life admin tasks you hate" />
            </Helmet>
            
            
        <SpeedRunContext.Provider value={speedRun}>
            <div className="min-h-screen bg-[#0f0f1a]">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    {/* Progress Bar with Part indicator */}
                    <ChapterProgress
                        current={9}
                        total={16}
                        part={3}
                        partTitle="Digital Operations"
                    />

                    {/* Author Credibility */}
                    <AuthorCredibility />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <div className="text-cyan-400 font-mono text-sm mb-2">Chapter 9</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Admin & Paperwork
                        </h1>
                        <p className="text-xl text-slate-400 mb-4">
                            Death by a thousand paper cuts—automated away
                        </p>

                        {/* Reading time + Speed Run toggle */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4 text-slate-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} />
                                    <span>9 min read</span>
                                </div>
                                <span>•</span>
                                <span className="text-purple-400">20 min to inventory & automate</span>
                            </div>
                            <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                        </div>
                    </motion.div>

                    {/* TL;DR Card */}
                    <TLDRCard
                        stats={[
                            { value: '$500+', label: 'late fees avoided/yr' },
                            { value: '30', label: 'day advance warnings' },
                            { value: '0', label: 'surprise deadlines' },
                        ]}
                        primaryCTA="Audit My Admin"
                        onCTAClick={scrollToCalculator}
                    />

                    <PasswordGate partNumber={3}>
                        {/* CAPTAIN EFFICIENCY - OPENER */}
                    {!speedRun && (
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="Email? Handled. Calendar? Protected. But there's one more digital dragon to slay: the never-ending stream of admin tasks. Car registration. Insurance renewals. Subscription fees. Forms to fill. None of it is hard—but all of it steals your peace of mind when it ambushes you. Let's build a system that sees it all coming."
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
                                Showing only the essential prompts. Toggle off for full inventory tools.
                            </p>
                        </motion.div>
                    )}

                    {/* ★ ADMIN AMBUSH CALENDAR ★ */}
                    {!speedRun && <AdminAmbushCalendar />}

                    {/* ADMIN INVENTORY CALCULATOR */}
                    <section id="admin-calculator" className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                            <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Build Your Inventory</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                        </div>

                        <Suspense fallback={
                            <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                Loading calculator...
                            </div>
                        }>
                            <AdminInventoryCalculator />
                        </Suspense>
                    </section>

                    {/* ADMIN INVENTORY BUILDER */}
                    {!speedRun && <AdminInventoryBuilder />}

                    {/* AGENT 1: ADMIN TRACKER */}
                    <QuickWin
                        title="Agent 1: The Admin Tracker"
                        setupTime="10 min"
                        prompt={adminTrackerPrompt}
                        variant="default"
                    />

                    {/* SUBSCRIPTION AUDIT */}
                    {!speedRun && <SubscriptionAudit />}

                    {/* AGENT 2: SUBSCRIPTION MANAGER */}
                    <QuickWin
                        title="Agent 2: The Subscription Manager"
                        setupTime="10 min"
                        prompt={subscriptionManagerPrompt}
                        variant="secondary"
                    />

                    {/* LATE FEE GRAVEYARD */}
                    {!speedRun && <LateFeeGraveyard />}

                    {/* AGENT 3: DOCUMENT PROCESSOR */}
                    <QuickWin
                        title="Agent 3: The Document Processor"
                        setupTime="5 min"
                        prompt={documentProcessorPrompt}
                        variant="tertiary"
                    />

                    {/* CASE STUDY */}
                    {!speedRun && (
                        <CaseStudyCard
                            name="Kevin"
                            role="Freelancer, managing everything himself"
                            problem="Missed car registration = $150 late fee. Forgot to cancel trial = $200 charge. Insurance lapsed = panic."
                            result="Zero surprises. 30-day warnings on everything. Saved $400+ in first 3 months."
                            timeframe="3 months"
                            quote="I used to dread opening my mail. Now my agent tells me what's coming before it arrives. The anxiety is just... gone."
                        />
                    )}

                    {/* SHAREABLE QUOTE */}
                    <ShareableQuote
                        quote="Admin isn't hard. It's just relentless. The key isn't doing more—it's never being surprised."
                        chapter={9}
                    />

                                            {/* CAPTAIN EFFICIENCY - CLOSER */}
                    {!speedRun && (
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="celebrating"
                                message="PART 3 IS COMPLETE! Your digital life is now on autopilot. Email triaged. Calendar defended. Admin tracked. You've reclaimed 20+ hours per week and saved hundreds in avoided late fees. But here's the thing—we've optimized your work. Now it's time to optimize your LIFE. Part 4 tackles health, relationships, and personal growth. The best is yet to come. 🚀"
                            />
                        </Suspense>
                    )}

                    {/* ★ PART 3 CELEBRATION ★ */}
                    {!speedRun && <Part3Celebration />}

                    {/* CHAPTER COMPLETE */}
                    <ChapterCompleteWithPartEnd
                        achievements={[
                            'Admin Tracker Agent (30-day advance warnings)',
                            'Subscription Manager (audit & optimization)',
                            'Document Processor (paperwork made easy)',
                            'Admin inventory mapped across 5 categories',
                            'Late fee prevention system active',
                        ]}
                        nextChapter={10}
                        nextTitle="Health & Wellness Tracking"
                        nextPart={4}
                    />

                </PasswordGate>
                <ChapterNavigation
                    previousChapter="/part3/chapter2"
                    nextChapter="/part4/chapter1"
                    partNumber={3}
                    chapterNumber={3}
                />






                </div>
            </div>
        </SpeedRunContext.Provider>
    );
};

export default Chapter9;
