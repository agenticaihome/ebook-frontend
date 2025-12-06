import { Helmet } from 'react-helmet-async';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import PasswordGate from '../../components/common/PasswordGate';

import React, { useState, Suspense, createContext } from 'react';
import { motion } from 'framer-motion';
import {
    Clock, Zap, CheckCircle, ArrowRight,
    Share2, Copy, Eye, EyeOff, Heart, Activity, Pill,
    Calendar, Moon, Sun, Droplets, Brain, Shield,
    AlertCircle, TrendingUp, Stethoscope,
    Dumbbell, ClipboardList, Plus, Check, Smile, Meh, Frown
} from 'lucide-react';

// Lazy load interactive components
const HealthAuditCalculator = React.lazy(() => import('../../components/HealthAuditCalculator'));
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
import AIToolLinks from '../../components/AIToolLinks';
import FAQSection, { chapter10FAQs } from '../../components/FAQSection';

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
            <div className="text-rose-400 font-bold text-sm mb-2 uppercase tracking-wider">
                Part {part}: {partTitle}
            </div>
        )}
        <div className="flex items-center gap-3">
            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(current / total) * 100}%` }}
                    className="h-full bg-gradient-to-r from-rose-500 to-orange-500"
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
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
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
            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50'
            : 'bg-slate-800/30 text-slate-400 border border-slate-500/40 hover:border-slate-400 backdrop-blur-sm'
            }`}
    >
        {enabled ? <Eye size={16} /> : <EyeOff size={16} />}
        {enabled ? 'Professional Mode: ON' : 'Professional Mode: OFF'}
    </button>
);

const TLDRCard = ({ stats, primaryCTA, onCTAClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-rose-900/40 to-orange-900/40 rounded-2xl p-6 border border-rose-500/30 mb-8"
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
                className="flex items-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-bold px-6 py-3 rounded-xl transition-all whitespace-nowrap"
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl" />

            <div className="relative">
                <div className="text-6xl text-rose-500/30 font-serif leading-none mb-2">"</div>
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
        secondary: 'from-rose-900/30 to-pink-900/20 border-rose-500/40',
        tertiary: 'from-blue-900/30 to-cyan-900/20 border-blue-500/40',
        bonus: 'from-yellow-900/30 to-orange-900/20 border-yellow-500/40',
    };

    const labelColors = {
        default: 'text-green-400',
        secondary: 'text-rose-400',
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
    <div className="bg-gradient-to-r from-green-900/30 to-rose-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
            </div>
            <div>
                <span className="text-green-400 font-bold block">Chapter 10 Complete</span>
                <span className="text-slate-400 text-sm">You're 62% of the way there</span>
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

        <button className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-bold px-6 py-4 rounded-xl transition-all">
            Continue to Chapter {nextChapter}: {nextTitle}
            <ArrowRight size={18} />
        </button>
    </div>
);

// ============================================
// CHAPTER 10 SPECIFIC COMPONENTS
// ============================================

// Part 4 Intro Banner - Warmer, more personal tone
const Part4Intro = () => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-rose-900/40 via-orange-900/30 to-rose-900/40 rounded-2xl p-6 border border-rose-500/40 backdrop-blur-sm mb-8 relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center">
                <Heart className="text-rose-400" size={28} />
            </div>
            <div>
                <div className="text-rose-400 font-bold uppercase text-sm tracking-wider mb-1">
                    Entering Part 4
                </div>
                <h2 className="text-2xl font-bold text-white">Life Systems</h2>
                <p className="text-slate-400 text-sm mt-1">
                    Your work is optimized. Now let's take care of <span className="text-rose-400">you</span>.
                </p>
            </div>
        </div>
    </motion.div>
);

// Health Chaos Audit - Gentle reality check
const HealthChaosAudit = () => {
    const [checkedItems, setCheckedItems] = useState({});

    const items = [
        { id: 'physical', text: 'Annual physical scheduled (or overdue)', icon: Stethoscope },
        { id: 'dental', text: 'Dental cleaning in the past 6 months', icon: Smile },
        { id: 'prescription', text: 'Prescription refills handled before running out', icon: Pill },
        { id: 'sleep', text: 'Getting 7+ hours of sleep most nights', icon: Moon },
        { id: 'water', text: 'Drinking enough water daily', icon: Droplets },
        { id: 'exercise', text: 'Moving your body regularly', icon: Dumbbell },
        { id: 'symptoms', text: 'Not ignoring any persistent symptoms', icon: AlertCircle },
        { id: 'mental', text: 'Taking care of mental health', icon: Brain },
    ];

    const toggleItem = (id) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const healthScore = Math.round((checkedCount / items.length) * 100);

    const getScoreMessage = () => {
        if (healthScore >= 80) return { text: "You're doing great! Let's make it effortless.", color: 'text-green-400' };
        if (healthScore >= 50) return { text: "Room for improvement—and that's okay. We'll build systems.", color: 'text-yellow-400' };
        return { text: "You're not alone. Most busy people struggle here. Let's fix it together.", color: 'text-rose-400' };
    };

    const message = getScoreMessage();

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                        <ClipboardList className="text-rose-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Health Reality Check</h3>
                        <p className="text-slate-400 text-sm">No judgment—just awareness</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className={`text-3xl font-bold ${message.color}`}>{healthScore}%</div>
                    <div className="text-slate-500 text-xs">health basics covered</div>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${checkedItems[item.id]
                            ? 'bg-green-900/20 border border-green-500/30'
                            : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                            }`}
                    >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${checkedItems[item.id]
                            ? 'bg-green-500 text-white'
                            : 'bg-slate-700 text-slate-400'
                            }`}>
                            {checkedItems[item.id] ? <Check size={14} /> : <item.icon size={14} />}
                        </div>
                        <span className={`text-sm ${checkedItems[item.id] ? 'text-green-400' : 'text-slate-300'}`}>
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>

            <div className={`p-4 rounded-xl border ${healthScore >= 80 ? 'bg-green-900/20 border-green-500/30' :
                healthScore >= 50 ? 'bg-yellow-900/20 border-yellow-500/30' :
                    'bg-rose-900/20 border-rose-500/30'
                }`}>
                <p className={`text-sm font-medium ${message.color}`}>
                    {message.text}
                </p>
            </div>
        </div>
    );
};

// Health Pillar Framework
const HealthPillarFramework = () => {
    const pillars = [
        {
            name: 'PREVENT',
            icon: Shield,
            color: 'green',
            description: 'Catch problems before they start',
            items: ['Annual checkups', 'Screenings', 'Vaccinations', 'Dental cleanings'],
        },
        {
            name: 'MANAGE',
            icon: Pill,
            color: 'blue',
            description: 'Handle ongoing health needs',
            items: ['Medications', 'Chronic conditions', 'Prescriptions', 'Specialist visits'],
        },
        {
            name: 'RECOVER',
            icon: Moon,
            color: 'purple',
            description: 'Rest and restoration',
            items: ['Sleep quality', 'Stress management', 'Rest days', 'Mental breaks'],
        },
        {
            name: 'OPTIMIZE',
            icon: TrendingUp,
            color: 'orange',
            description: 'Feel your best daily',
            items: ['Hydration', 'Movement', 'Nutrition', 'Energy levels'],
        },
    ];

    const colors = {
        green: 'from-green-900/40 to-green-900/20 border-green-500/40 text-green-400',
        blue: 'from-blue-900/40 to-blue-900/20 border-blue-500/40 text-blue-400',
        purple: 'from-purple-900/40 to-purple-900/20 border-purple-500/40 text-purple-400',
        orange: 'from-orange-900/40 to-orange-900/20 border-orange-500/40 text-orange-400',
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">The 4 Pillars of Health Management</h2>
            <p className="text-slate-400 mb-6">
                Your Health prompts will help you track all four with minimal effort.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
                {pillars.map((pillar, i) => (
                    <motion.div
                        key={pillar.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-gradient-to-br ${colors[pillar.color]} rounded-xl p-5 border backdrop-blur-sm`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <pillar.icon size={24} />
                            <div>
                                <h3 className="font-bold">{pillar.name}</h3>
                                <p className="text-slate-400 text-xs">{pillar.description}</p>
                            </div>
                        </div>
                        <ul className="space-y-1">
                            {pillar.items.map((item, j) => (
                                <li key={j} className="text-slate-300 text-sm flex items-center gap-2">
                                    <span className={colors[pillar.color].split(' ').pop()}>•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Annual Health Calendar
const AnnualHealthCalendar = () => {
    const appointments = [
        { month: 'Jan', task: 'Annual physical', icon: Stethoscope, frequency: 'Yearly' },
        { month: 'Feb', task: 'Dental cleaning #1', icon: Smile, frequency: '6 months' },
        { month: 'Mar', task: 'Eye exam', icon: Eye, frequency: 'Yearly' },
        { month: 'Apr', task: 'Dermatologist', icon: Sun, frequency: 'Yearly' },
        { month: 'Aug', task: 'Dental cleaning #2', icon: Smile, frequency: '6 months' },
        { month: 'Sep', task: 'Flu shot', icon: Shield, frequency: 'Yearly' },
        { month: 'Oct', task: 'Open enrollment review', icon: ClipboardList, frequency: 'Yearly' },
    ];

    return (
        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-2xl p-6 border border-blue-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Calendar className="text-blue-400" size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Annual Health Calendar</h3>
                    <p className="text-slate-400 text-sm">Preventive care, pre-scheduled</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {appointments.map((apt, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-slate-900/50 rounded-xl p-3 border border-blue-500/20"
                    >
                        <div className="text-blue-400 text-xs font-bold mb-1">{apt.month}</div>
                        <apt.icon className="text-slate-400 mb-1" size={16} />
                        <div className="text-white text-sm font-medium">{apt.task}</div>
                        <div className="text-slate-500 text-xs">{apt.frequency}</div>
                    </motion.div>
                ))}
            </div>

            <div className="p-4 bg-slate-900/50 rounded-xl">
                <p className="text-blue-400 text-sm">
                    <strong>Pro tip:</strong> Schedule all annual appointments in January.
                    Your Health Agent will remind you 2 weeks before each one.
                </p>
            </div>
        </div>
    );
};

// Medication Schedule Builder
const MedicationScheduleBuilder = () => {
    const [medications, setMedications] = useState([
        { name: 'Example: Daily vitamin', time: 'morning', withFood: true },
    ]);

    const times = ['morning', 'afternoon', 'evening', 'bedtime'];

    const addMedication = () => {
        setMedications([...medications, { name: '', time: 'morning', withFood: false }]);
    };

    const updateMedication = (index, field, value) => {
        setMedications(meds => meds.map((m, i) =>
            i === index ? { ...m, [field]: value } : m
        ));
    };

    const removeMedication = (index) => {
        setMedications(meds => meds.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-gradient-to-br from-rose-900/20 to-pink-900/20 rounded-2xl p-6 border border-rose-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                        <Pill className="text-rose-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Medication Schedule</h3>
                        <p className="text-slate-400 text-sm">Never miss a dose</p>
                    </div>
                </div>
                <button
                    onClick={addMedication}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 text-sm hover:bg-rose-500/30 transition-all"
                >
                    <Plus size={14} /> Add
                </button>
            </div>

            <div className="space-y-3 mb-4">
                {medications.map((med, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-900/50 rounded-xl p-3 border border-slate-700">
                        <input
                            type="text"
                            value={med.name}
                            onChange={(e) => updateMedication(i, 'name', e.target.value)}
                            placeholder="Medication name"
                            className="flex-1 bg-transparent border-none text-white placeholder-slate-500 focus:outline-none text-sm"
                        />
                        <select
                            value={med.time}
                            onChange={(e) => updateMedication(i, 'time', e.target.value)}
                            className="bg-slate-800 text-slate-300 text-sm rounded-lg px-2 py-1 border border-slate-600"
                        >
                            {times.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        <label className="flex items-center gap-1 text-slate-400 text-xs">
                            <input
                                type="checkbox"
                                checked={med.withFood}
                                onChange={(e) => updateMedication(i, 'withFood', e.target.checked)}
                                className="rounded"
                            />
                            w/ food
                        </label>
                        <button
                            onClick={() => removeMedication(i)}
                            className="text-slate-500 hover:text-red-400 transition-all"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {medications.length > 0 && (
                <div className="p-4 bg-slate-900/50 rounded-xl">
                    <p className="text-rose-400 text-sm">
                        <strong>Your schedule:</strong> {medications.filter(m => m.name).map(m =>
                            `${m.name} (${m.time}${m.withFood ? ', with food' : ''})`
                        ).join(' • ') || 'Add your medications above'}
                    </p>
                </div>
            )}
        </div>
    );
};

// Daily Wellness Check-in Preview
const WellnessCheckInPreview = () => {
    const [mood, setMood] = useState(null);
    const [energy, setEnergy] = useState(null);
    const [sleep, setSleep] = useState(null);
    const [water, setWater] = useState(null);

    const moods = [
        { value: 'great', icon: Smile, label: 'Great', color: 'text-green-400' },
        { value: 'okay', icon: Meh, label: 'Okay', color: 'text-yellow-400' },
        { value: 'low', icon: Frown, label: 'Low', color: 'text-red-400' },
    ];

    return (
        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-2xl p-6 border border-purple-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Activity className="text-purple-400" size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Daily Wellness Check-in</h3>
                    <p className="text-slate-400 text-sm">30 seconds to track how you're doing</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Mood */}
                <div>
                    <label className="text-slate-400 text-sm mb-2 block">How's your mood?</label>
                    <div className="flex gap-3">
                        {moods.map((m) => (
                            <button
                                key={m.value}
                                onClick={() => setMood(m.value)}
                                className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${mood === m.value
                                    ? 'bg-purple-500/20 border-2 border-purple-500'
                                    : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                                    }`}
                            >
                                <m.icon className={mood === m.value ? m.color : 'text-slate-500'} size={24} />
                                <span className={`text-xs ${mood === m.value ? m.color : 'text-slate-500'}`}>
                                    {m.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Energy */}
                <div>
                    <label className="text-slate-400 text-sm mb-2 block">Energy level? (1-5)</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((level) => (
                            <button
                                key={level}
                                onClick={() => setEnergy(level)}
                                className={`flex-1 py-2 rounded-lg transition-all ${energy === level
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sleep */}
                <div>
                    <label className="text-slate-400 text-sm mb-2 block">Hours of sleep?</label>
                    <div className="flex gap-2">
                        {['<5', '5-6', '6-7', '7-8', '8+'].map((hours, i) => (
                            <button
                                key={hours}
                                onClick={() => setSleep(hours)}
                                className={`flex-1 py-2 rounded-lg text-sm transition-all ${sleep === hours
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                            >
                                {hours}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Water */}
                <div>
                    <label className="text-slate-400 text-sm mb-2 block">Water intake? (glasses)</label>
                    <div className="flex gap-2">
                        {['1-2', '3-4', '5-6', '7-8', '8+'].map((glasses) => (
                            <button
                                key={glasses}
                                onClick={() => setWater(glasses)}
                                className={`flex-1 py-2 rounded-lg text-sm transition-all ${water === glasses
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                            >
                                {glasses}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {mood && energy && sleep && water && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-900/20 rounded-xl border border-green-500/30"
                >
                    <p className="text-green-400 text-sm">
                        ✓ Check-in complete! Your agent tracks patterns over time to spot trends.
                    </p>
                </motion.div>
            )}
        </div>
    );
};

// Case Study Card
const CaseStudyCard = ({ name, role, problem, result, timeframe, quote }) => (
    <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-5 border border-slate-500/40 backdrop-blur-sm mb-8">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 text-sm">
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

        <p className="text-slate-400 text-sm italic border-l-2 border-rose-500/50 pl-3">
            "{quote}"
        </p>
    </div>
);

// ============================================
// CHAPTER 10 MAIN COMPONENT
// ============================================

const Chapter10 = () => {
    const [speedRun, setSpeedRun] = useState(false);

    const scrollToCalculator = () => {
        document.getElementById('health-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const healthCoordinatorPrompt = `You are my Health Coordinator Agent. Your job is to help me stay on top of preventive care and health appointments.

MY HEALTH PROFILE:
- Age: [Your age]
- Primary care doctor: [Name/Practice]
- Dentist: [Name/Practice]
- Any specialists: [List]
- Known conditions: [Any chronic conditions or concerns]
- Medications: [Current medications]

PREVENTIVE CARE SCHEDULE:
Track and remind me about:
- Annual physical (yearly)
- Dental cleanings (every 6 months)
- Eye exam (yearly or as needed)
- Dermatologist (yearly skin check)
- Flu shot (every fall)
- Any age-appropriate screenings

REMINDER SCHEDULE:
- 2 weeks before: Time to schedule [appointment]
- 1 week before: Reminder about upcoming [appointment]
- Day before: Tomorrow you have [appointment] at [time]
- After: Did you schedule any follow-ups?

ALSO TRACK:
- When prescriptions need refilling (7 days before running out)
- Annual insurance changes (open enrollment)
- FSA/HSA deadlines

OUTPUT FORMAT:
🏥 Health Status:
- Next appointment: [Type] on [Date]
- Overdue: [Any missed appointments]
- Coming up: [Next 30 days]

💊 Medications:
- Refills needed: [List]

Help me never miss a health appointment or run out of medication.`;

    const medicationManagerPrompt = `You are my Medication Manager Agent. Your job is to help me track medications, timing, and refills.

MY MEDICATIONS:
[List your medications with dosage and frequency]

FOR EACH MEDICATION, TRACK:
- Name and dosage
- Frequency (daily, twice daily, etc.)
- Best time to take (morning, with food, bedtime, etc.)
- Quantity on hand
- Refill date
- Pharmacy info

DAILY REMINDERS:
- Morning medications at [time]
- Evening medications at [time]
- Any special timing requirements

REFILL MANAGEMENT:
- Alert 7 days before running out
- Track which pharmacy has best price
- Note any prior authorization requirements

INTERACTION AWARENESS:
- Flag if I mention starting new medications
- Remind me of timing separations (e.g., take X 2 hours before Y)

OUTPUT FORMAT:
💊 Today's Medications:
- Morning: [List]
- Evening: [List]

📅 Refills Needed Soon:
- [Medication] - [X days remaining]

Help me take the right medications at the right time, every time.`;

    const wellnessTrackerPrompt = `You are my Wellness Tracker Agent. Your job is to help me maintain daily wellness habits and notice patterns.

DAILY CHECK-IN (ask me each morning or evening):
1. How's your mood? (1-5 or great/okay/low)
2. Energy level? (1-5)
3. Hours of sleep last night?
4. Water intake today?
5. Any movement/exercise?
6. Anything bothering you physically?

WEEKLY PATTERNS TO TRACK:
- Average sleep hours
- Mood trends
- Energy patterns
- Exercise frequency
- Hydration consistency

GENTLE NUDGES (not nagging):
- If sleep drops below 6 hours for 3+ nights
- If mood is "low" for 3+ days
- If no exercise in 5+ days
- If I mention persistent symptoms

MONTHLY SUMMARY:
- Sleep average and best/worst nights
- Mood patterns (any triggers?)
- Exercise frequency
- Notable symptoms or concerns
- Wins to celebrate

OUTPUT FORMAT:
🌟 Daily Check-in Complete:
- Mood: [X/5]
- Energy: [X/5]
- Sleep: [X hours]
- Water: [X glasses]
- Movement: [Yes/No]

📊 This Week:
- Sleep avg: [X hrs]
- Mood trend: [stable/improving/declining]

Help me notice patterns before they become problems. Be supportive, not judgmental.`;

    return (
        <>
            <Helmet>
                <title>Chapter 10: Health & Wellness | Agentic AI at Home</title>
                <meta name="description" content="Track and improve your health automatically" />
            </Helmet>

            <SpeedRunContext.Provider value={speedRun}>
                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* Progress Bar with Part indicator */}
                        <ChapterProgress
                            current={10}
                            total={16}
                            part={4}
                            partTitle="Life Systems"
                        />

                        {/* Part 4 Intro Banner */}
                        {!speedRun && <Part4Intro />}

                        {/* Author Credibility */}
                        <AuthorCredibility />

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="text-rose-400 font-mono text-sm mb-2">Chapter 10</div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Health & Wellness
                            </h1>
                            <p className="text-xl text-slate-400 mb-4">
                                Take care of yourself—without thinking about it
                            </p>

                            {/* Reading time + Speed Run toggle */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4 text-slate-500 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        <span>10 min read</span>
                                    </div>
                                    <span>•</span>
                                    <span className="text-rose-400">15 min to set up your health system</span>
                                </div>
                                <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                            </div>
                        </motion.div>

                        {/* TL;DR Card */}
                        <TLDRCard
                            stats={[
                                { value: '4', label: 'health pillars covered' },
                                { value: '0', label: 'missed appointments' },
                                { value: '∞', label: 'peace of mind' },
                            ]}
                            primaryCTA="Check My Health Basics"
                            onCTAClick={scrollToCalculator}
                        />

                        <PasswordGate partNumber={4}>
                            {/* CAPTAIN EFFICIENCY - OPENER (Gentler tone) */}
                            {!speedRun && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="default"
                                        message="We've optimized your work. Now let's take care of YOU. This chapter is different—it's not about productivity, it's about wellbeing. The annual physical you keep postponing. The prescription that runs out at midnight. The water bottle that's been empty since noon. None of this is hard. But when life gets busy, we neglect ourselves first. Let's build a gentle system that has your back."
                                    />
                                </Suspense>
                            )}

                            {/* Speed Run Notice */}
                            {speedRun && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-rose-900/30 rounded-xl p-4 border border-rose-500/40 backdrop-blur-sm mb-8"
                                >
                                    <div className="flex items-center gap-2 text-rose-400">
                                        <Zap size={18} />
                                        <span className="font-bold">Speed Run Mode</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Showing only the essential prompts. Toggle off for interactive health tools.
                                    </p>
                                </motion.div>
                            )}

                            {/* ★ HEALTH CHAOS AUDIT ★ */}
                            {!speedRun && <HealthChaosAudit />}

                            {/* HEALTH CALCULATOR */}
                            <section id="health-calculator" className="mb-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-500/50" />
                                    <span className="text-rose-400 font-bold uppercase text-sm tracking-wider">Your Health Baseline</span>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-500/50" />
                                </div>

                                <Suspense fallback={
                                    <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                        Loading health assessment...
                                    </div>
                                }>
                                    <HealthAuditCalculator />
                                </Suspense>
                            </section>

                            {/* HEALTH PILLAR FRAMEWORK */}
                            {!speedRun && <HealthPillarFramework />}

                            {/* AGENT 1: HEALTH COORDINATOR */}
                            <QuickWin
                                title="Agent 1: The Health Coordinator"
                                setupTime="10 min"
                                prompt={healthCoordinatorPrompt}
                                variant="default"
                            />

                            {/* ANNUAL HEALTH CALENDAR */}
                            {!speedRun && <AnnualHealthCalendar />}

                            {/* MEDICATION SCHEDULE BUILDER */}
                            {!speedRun && <MedicationScheduleBuilder />}

                            {/* AGENT 2: MEDICATION MANAGER */}
                            <QuickWin
                                title="Agent 2: The Medication Manager"
                                setupTime="10 min"
                                prompt={medicationManagerPrompt}
                                variant="secondary"
                            />

                            {/* DAILY WELLNESS CHECK-IN */}
                            {!speedRun && <WellnessCheckInPreview />}

                            {/* AGENT 3: WELLNESS TRACKER */}
                            <QuickWin
                                title="Agent 3: The Wellness Tracker"
                                setupTime="5 min"
                                prompt={wellnessTrackerPrompt}
                                variant="tertiary"
                            />

                            {/* CASE STUDY */}
                            {!speedRun && (
                                <CaseStudyCard
                                    name="Maria"
                                    role="Working mom, 2 kids, managing parents' health too"
                                    problem="Missed her own physical for 3 years. Ran out of thyroid medication twice. Kids' vaccinations always last-minute panic."
                                    result="All appointments scheduled for the year. Refill reminders work perfectly. Even tracks her parents' appointments."
                                    timeframe="2 months"
                                    quote="I used to feel guilty about neglecting my health. Now it just... happens. The system remembers so I don't have to."
                                />
                            )}

                            {/* SHAREABLE QUOTE */}
                            <ShareableQuote
                                quote="You can't pour from an empty cup. Taking care of yourself isn't selfish—it's essential."
                                chapter={10}
                            />

                            {/* CAPTAIN EFFICIENCY - CLOSER (Warm, supportive) */}
                            {!speedRun && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="celebrating"
                                        message="You now have a system that cares about your health when you're too busy to. Appointments tracked. Medications managed. Wellness patterns noticed. But health is just one part of a full life. Next, we tackle something most people struggle with: staying connected to the people who matter. Let's make sure important relationships don't slip through the cracks. 💜"
                                    />
                                </Suspense>
                            )}

                            {/* QUICK ACCESS TO ALL AI TOOLS */}
                            <section className="mb-10">
                                <AIToolLinks />
                            </section>

                            {/* FAQ SECTION */}
                            <section className="mb-10">
                                <FAQSection faqs={chapter10FAQs} title="Health FAQ" />
                            </section>

                            {/* CHAPTER COMPLETE */}
                            <ChapterComplete
                                achievements={[
                                    'Health Coordinator Agent (preventive care tracking)',
                                    'Medication Manager (never run out again)',
                                    'Wellness Tracker (daily check-ins & patterns)',
                                    'Annual health calendar mapped',
                                    'Medication schedule built',
                                ]}
                                nextChapter={11}
                                nextTitle="Social & Relationship Management"
                            />

                        </PasswordGate>
                        <ChapterNavigation
                            previousChapter="/part3/chapter3"
                            nextChapter="/part4/chapter2"
                            partNumber={4}
                            chapterNumber={1}
                        />






                    </div>
                </div>
            </SpeedRunContext.Provider>

        </>
    );
};

export default Chapter10;
