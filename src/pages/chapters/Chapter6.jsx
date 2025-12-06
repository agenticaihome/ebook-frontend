import React, { useState, Suspense, createContext, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WebbookLayout from '../../components/layout/WebbookLayout';
import PasswordGate from '../../components/common/PasswordGate';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import AIToolLinks from '../../components/AIToolLinks';
import FAQSection, { chapter6FAQs } from '../../components/FAQSection';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, Home, Wrench, Package,
    Calendar, Trash2, Droplets, Wind, Thermometer, Bug, Leaf,
    AlertTriangle, HelpCircle, ClipboardList, Settings, Shield,
    Star, Trophy, Rocket, Sun, Moon, CloudSnow, Flower2, Target,
    CheckCircle2, XCircle, Timer, RotateCcw, Lightbulb
} from 'lucide-react';

// Game Components
import MissionBriefing from '../../components/gamification/MissionBriefing';
import MissionComplete from '../../components/gamification/MissionComplete';
import ObjectivesChecklist from '../../components/gamification/ObjectivesChecklist';
import IntelReport from '../../components/gamification/IntelReport';
import FutureProofBanner from '../../components/gamification/FutureProofBanner';
import AgentCardUnlock from '../../components/gamification/AgentCardUnlock';

// Lazy load interactive components
const HouseholdChaosCalculator = React.lazy(() => import('../../components/HouseholdChaosCalculator'));
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
        {enabled ? 'Professional Mode: ON' : 'Professional Mode: OFF'}
    </button>
);

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

// Compact Case Study
const CaseStudyCard = ({ name, role, problem, result, timeframe, quote }) => (
    <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-5 border border-slate-500/40 backdrop-blur-sm mb-8">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-sm">
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
// CHAPTER 6 SPECIFIC COMPONENTS
// ============================================

// The Invisible Load - Animated Floating Thoughts
const InvisibleLoadVisual = () => {
    const thoughts = [
        "Did I pay the water bill?",
        "When did we last change air filters?",
        "The gutters need cleaning...",
        "Are we out of dish soap?",
        "Smoke detector batteries?",
        "Is the car due for oil change?",
        "The dryer vent needs cleaning",
        "Property taxes due soon?",
        "Need to schedule HVAC service",
        "Kids' bathroom needs deep clean",
        "Refrigerator coils...",
        "When was the last pest control?",
    ];

    return (
        <div className="relative bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-8 border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden min-h-[300px]">
            <div className="absolute inset-0 overflow-hidden">
                {thoughts.map((thought, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: [0, 0.7, 0.7, 0],
                            y: [20, 0, -10, -30],
                            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
                        }}
                        transition={{
                            duration: 4,
                            delay: i * 0.5,
                            repeat: Infinity,
                            repeatDelay: thoughts.length * 0.5 - 4,
                        }}
                        className="absolute text-slate-400 text-sm whitespace-nowrap"
                        style={{
                            left: `${10 + (i % 3) * 30}%`,
                            top: `${20 + Math.floor(i / 3) * 25}%`,
                        }}
                    >
                        "{thought}"
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 text-center pt-16">
                <h2 className="text-3xl font-bold text-white mb-4">The Invisible Load</h2>
                <p className="text-slate-300 max-w-lg mx-auto mb-6">
                    All those thoughts running through your head. Things to remember.
                    Things that might break. Things you've probably forgotten.
                </p>
                <p className="text-cyan-400 font-bold">
                    Let's make it visible—then automate it away.
                </p>
            </div>
        </div>
    );
};

// The Four Pillars Framework
const FourPillarsFramework = () => {
    const pillars = [
        {
            name: 'CLEANING',
            icon: Sparkles,
            color: 'teal',
            description: 'Daily, weekly, monthly, deep clean schedules',
            examples: ['Daily dishes', 'Weekly vacuuming', 'Monthly fridge clean', 'Quarterly deep clean'],
        },
        {
            name: 'MAINTENANCE',
            icon: Wrench,
            color: 'orange',
            description: 'Preventive care that saves expensive repairs',
            examples: ['HVAC filters', 'Smoke detectors', 'Gutter cleaning', 'Appliance care'],
        },
        {
            name: 'SUPPLIES',
            icon: Package,
            color: 'green',
            description: 'Never run out of essentials again',
            examples: ['Cleaning products', 'Paper goods', 'Light bulbs', 'Batteries'],
        },
        {
            name: 'SEASONAL',
            icon: Leaf,
            color: 'purple',
            description: 'Tasks that happen yearly but are easy to forget',
            examples: ['Winterizing', 'Spring cleaning', 'AC prep', 'Holiday prep'],
        },
    ];

    const colors = {
        teal: { bg: 'from-teal-900/40 to-teal-900/20', border: 'border-teal-500/40', text: 'text-teal-400', icon: 'bg-teal-500/20' },
        orange: { bg: 'from-orange-900/40 to-orange-900/20', border: 'border-orange-500/40', text: 'text-orange-400', icon: 'bg-orange-500/20' },
        green: { bg: 'from-green-900/40 to-green-900/20', border: 'border-green-500/40', text: 'text-green-400', icon: 'bg-green-500/20' },
        purple: { bg: 'from-purple-900/40 to-purple-900/20', border: 'border-purple-500/40', text: 'text-purple-400', icon: 'bg-purple-500/20' },
    };

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">The 4 Pillars of Home Operations</h2>
            <p className="text-slate-400 mb-6">
                Every household task falls into one of these categories. Master all four, master your home.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
                {pillars.map((pillar, i) => {
                    const c = colors[pillar.color];
                    return (
                        <motion.div
                            key={pillar.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-gradient-to-br ${c.bg} rounded-xl p-5 border ${c.border} backdrop-blur-sm`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center`}>
                                    <pillar.icon className={c.text} size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-bold ${c.text} mb-1`}>{pillar.name}</h3>
                                    <p className="text-slate-300 text-sm mb-3">{pillar.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {pillar.examples.map((ex, j) => (
                                            <span key={j} className="bg-slate-900/50 text-slate-400 text-xs px-2 py-1 rounded">
                                                {ex}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

// Room-by-Room Schedule Builder
const RoomScheduleBuilder = () => {
    const [rooms, setRooms] = useState({
        kitchen: { daily: true, weekly: true, monthly: true },
        bathrooms: { daily: false, weekly: true, monthly: true },
        bedrooms: { daily: false, weekly: true, monthly: false },
        living: { daily: false, weekly: true, monthly: true },
        floors: { daily: false, weekly: true, monthly: false },
    });

    const roomLabels = {
        kitchen: '🍳 Kitchen',
        bathrooms: '🚿 Bathrooms',
        bedrooms: '🛏️ Bedrooms',
        living: '🛋️ Living Areas',
        floors: '🧹 All Floors',
    };

    const toggleRoom = (room, frequency) => {
        setRooms(prev => ({
            ...prev,
            [room]: { ...prev[room], [frequency]: !prev[room][frequency] }
        }));
    };

    const generateSchedule = () => {
        let schedule = "MY CLEANING SCHEDULE:\n\n";

        schedule += "DAILY:\n";
        Object.entries(rooms).forEach(([room, freq]) => {
            if (freq.daily) schedule += `- ${roomLabels[room]} quick tidy\n`;
        });

        schedule += "\nWEEKLY:\n";
        Object.entries(rooms).forEach(([room, freq]) => {
            if (freq.weekly) schedule += `- ${roomLabels[room]} thorough clean\n`;
        });

        schedule += "\nMONTHLY:\n";
        Object.entries(rooms).forEach(([room, freq]) => {
            if (freq.monthly) schedule += `- ${roomLabels[room]} deep clean\n`;
        });

        return schedule;
    };

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(generateSchedule());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                    <ClipboardList className="text-teal-400" size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Room-by-Room Schedule Builder</h3>
                    <p className="text-slate-400 text-sm">Toggle what gets cleaned when</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-600">
                            <th className="text-left text-slate-400 text-sm py-2">Room</th>
                            <th className="text-center text-slate-400 text-sm py-2">Daily</th>
                            <th className="text-center text-slate-400 text-sm py-2">Weekly</th>
                            <th className="text-center text-slate-400 text-sm py-2">Monthly</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(rooms).map(([room, freq]) => (
                            <tr key={room} className="border-b border-slate-800">
                                <td className="py-3 text-white">{roomLabels[room]}</td>
                                {['daily', 'weekly', 'monthly'].map((f) => (
                                    <td key={f} className="text-center py-3">
                                        <button
                                            onClick={() => toggleRoom(room, f)}
                                            className={`w-8 h-8 rounded-lg transition-all ${freq[f]
                                                ? 'bg-teal-500 text-white'
                                                : 'bg-slate-800 text-slate-600 hover:bg-slate-700'
                                                }`}
                                        >
                                            {freq[f] ? <CheckCircle size={16} className="mx-auto" /> : '○'}
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                onClick={handleCopy}
                className={`w-full mt-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${copied
                    ? 'bg-green-500 text-white'
                    : 'bg-teal-500 hover:bg-teal-400 text-slate-900'
                    }`}
            >
                {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy My Schedule'}
            </button>
        </div>
    );
};

// Maintenance Calendar Visual
const MaintenanceCalendar = () => {
    const seasons = [
        {
            name: 'Spring',
            icon: Flower2,
            color: 'green',
            tasks: ['HVAC service', 'Gutter cleaning', 'Window washing', 'Deck/patio prep'],
        },
        {
            name: 'Summer',
            icon: Sun,
            color: 'yellow',
            tasks: ['AC filter change', 'Pest control', 'Lawn equipment', 'Outdoor furniture care'],
        },
        {
            name: 'Fall',
            icon: Leaf,
            color: 'orange',
            tasks: ['Heating system check', 'Chimney cleaning', 'Weatherstripping', 'Gutter guards'],
        },
        {
            name: 'Winter',
            icon: CloudSnow,
            color: 'blue',
            tasks: ['Pipe insulation check', 'Smoke detector batteries', 'Emergency kit review', 'Indoor air quality'],
        },
    ];

    const colors = {
        green: { bg: 'bg-green-900/20', border: 'border-green-500/30', text: 'text-green-400' },
        yellow: { bg: 'bg-yellow-900/20', border: 'border-yellow-500/30', text: 'text-yellow-400' },
        orange: { bg: 'bg-orange-900/20', border: 'border-orange-500/30', text: 'text-orange-400' },
        blue: { bg: 'bg-blue-900/20', border: 'border-blue-500/30', text: 'text-blue-400' },
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Seasonal Maintenance Calendar</h2>
            <p className="text-slate-400 mb-6">
                Your agent will remind you before each season. No more "oh no, I forgot to winterize."
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {seasons.map((season) => {
                    const c = colors[season.color];
                    return (
                        <div key={season.name} className={`${c.bg} rounded-xl p-4 border ${c.border}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <season.icon className={c.text} size={20} />
                                <span className={`font-bold ${c.text}`}>{season.name}</span>
                            </div>
                            <ul className="space-y-1">
                                {season.tasks.map((task, i) => (
                                    <li key={i} className="text-slate-400 text-xs flex items-start gap-1">
                                        <span className={c.text}>•</span>
                                        {task}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Command Center Dashboard Preview
const CommandCenterDashboard = () => {
    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Home className="text-teal-400" />
                Your Household Command Center
            </h2>
            <p className="text-slate-400 mb-6">
                This is what you've built across Part 2. All your daily operations, working together.
            </p>

            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl p-6 border border-teal-500/30 backdrop-blur-sm">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {/* Morning Brief Status */}
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm">Morning Brief</span>
                            <span className="text-green-400 text-xs flex items-center gap-1">
                                <CheckCircle2 size={12} /> Active
                            </span>
                        </div>
                        <div className="text-white font-bold">Delivered 6:00 AM</div>
                        <div className="text-slate-400 text-xs mt-1">3 priorities • 2 meetings • sunny</div>
                    </div>

                    {/* Meal Plan Status */}
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm">Meal Plan</span>
                            <span className="text-green-400 text-xs flex items-center gap-1">
                                <CheckCircle2 size={12} /> Active
                            </span>
                        </div>
                        <div className="text-white font-bold">Week Planned</div>
                        <div className="text-slate-400 text-xs mt-1">Tonight: Taco Tuesday</div>
                    </div>

                    {/* Household Status */}
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm">Household</span>
                            <span className="text-green-400 text-xs flex items-center gap-1">
                                <CheckCircle2 size={12} /> Active
                            </span>
                        </div>
                        <div className="text-white font-bold">All Systems Go</div>
                        <div className="text-slate-400 text-xs mt-1">Next: Bathroom deep clean (Sat)</div>
                    </div>
                </div>

                {/* Upcoming Section */}
                <div className="bg-slate-900/30 rounded-xl p-4">
                    <h4 className="text-teal-400 font-bold text-sm mb-3 uppercase tracking-wider">Coming Up</h4>
                    <div className="space-y-2">
                        {[
                            { task: 'Grocery shopping', time: 'Tomorrow', icon: Package },
                            { task: 'HVAC filter change', time: 'This weekend', icon: Wind },
                            { task: 'Monthly fridge clean', time: 'Next Monday', icon: Thermometer },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <item.icon className="text-slate-400" size={14} />
                                    <span className="text-slate-300">{item.task}</span>
                                </div>
                                <span className="text-slate-400 text-xs">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-slate-600 text-center">
                    <p className="text-slate-400 text-sm">
                        Your Morning Brief Agent can pull from all of these systems.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Part 2 Celebration Component
const Part2Celebration = () => {
    const [celebrated, setCelebrated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setCelebrated(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const achievements = [
        { chapter: 4, title: 'Morning Brief Agent', icon: Sun, result: '30 min saved daily' },
        { chapter: 5, title: 'Meal Planning System', icon: Leaf, result: '$290/month saved' },
        { chapter: 6, title: 'Household Command Center', icon: Home, result: 'Zero forgotten tasks' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-yellow-900/30 via-orange-900/20 to-red-900/20 rounded-2xl p-8 border-2 border-yellow-500/50 backdrop-blur-sm mb-8 relative overflow-hidden"
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
                            {['🎉', '⭐', '🏆', '✨', '🚀'][i % 5]}
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
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4"
                    >
                        <Trophy className="text-yellow-400" size={40} />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        🎉 PART 2 COMPLETE! 🎉
                    </h2>
                    <p className="text-slate-300">
                        You've automated your entire daily operations
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
                            <item.icon className="text-yellow-400 mx-auto mb-2" size={24} />
                            <div className="text-white font-bold text-sm">Ch {item.chapter}</div>
                            <div className="text-slate-400 text-xs mb-2">{item.title}</div>
                            <div className="text-green-400 font-bold text-sm">{item.result}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-8">
                        <div>
                            <div className="text-3xl font-bold text-green-400">7+ hrs</div>
                            <div className="text-slate-400 text-xs">Saved per week</div>
                        </div>
                        <div className="h-12 w-px bg-slate-700" />
                        <div>
                            <div className="text-3xl font-bold text-green-400">$350+</div>
                            <div className="text-slate-400 text-xs">Saved per month</div>
                        </div>
                        <div className="h-12 w-px bg-slate-700" />
                        <div>
                            <div className="text-3xl font-bold text-teal-400">∞</div>
                            <div className="text-slate-400 text-xs">Mental load lifted</div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-orange-400 font-bold">
                        Next: Part 3 — Digital Operations (Email, Calendar, Admin)
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                        The real productivity gains are just beginning...
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

// ============================================
// CHAPTER 6 MAIN COMPONENT
// ============================================

const Chapter6 = () => {
    const [blitzMode, setBlitzMode] = useState(false);
    const [cardUnlocked, setCardUnlocked] = useState(false);
    const navigate = useNavigate();

    // Household Manager Agent card data
    const householdManagerCard = {
        id: 'household_manager',
        name: 'Household Manager Agent',
        rarity: 'epic',
        category: 'Household',
        timeSaved: '4 hrs/mo',
        moneySaved: '$500+/yr',
        complexity: 4,
        powerLevel: 80,
        prompt: `You are my Household Manager Agent. Your job is to track maintenance, cleaning, and supplies so I don't have to.

MY HOME PROFILE:
- Type: [House/Apartment]
- Size: [Sq ft]
- Residents: [Number]
- Pets: [Number/Type]

RESPONSIBILITIES:
1. Create a seasonal maintenance calendar
2. Build a cleaning schedule (Daily/Weekly/Monthly)
3. Monitor supply levels and add to grocery list
4. Remind me of critical tasks (HVAC, filters, smoke detectors)

Ask me for the specific details of my home to build the initial database.`,
    };

    const handleCardUnlock = (cardId) => {
        setCardUnlocked(true);
        // Save to localStorage
        const unlockedCards = JSON.parse(localStorage.getItem('unlocked_cards') || '[]');
        if (!unlockedCards.includes(cardId)) {
            unlockedCards.push(cardId);
            localStorage.setItem('unlocked_cards', JSON.stringify(unlockedCards));
        }
    };

    const scrollToCalculator = () => {
        document.getElementById('household-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const cleaningPrompt = `You are my Cleaning Schedule Agent. Create a realistic cleaning routine for my home.

MY HOME:
[Paste your Room Schedule Builder output here]

CONSTRAINTS:
- I have about 30 mins/day for cleaning on weekdays.
- I can do 1-2 hours on weekends.
- I want to avoid "marathon cleaning" sessions.

OUTPUT:
1. A daily checklist (morning/evening)
2. A weekly schedule (e.g., "Monday: Bathrooms", "Tuesday: Floors")
3. A monthly rotation for deep cleaning tasks

Format this as a checklist I can print or import into a task manager.`;

    const maintenancePrompt = `You are my Home Maintenance Agent. Build a preventive maintenance calendar for my specific home.

MY HOME DETAILS:
- Age of home: [Year]
- HVAC system: [Type/Age]
- Appliances: [List major ones]
- Outdoor areas: [Lawn, deck, pool, etc.]

Create a seasonal calendar (Spring, Summer, Fall, Winter) with:
1. Essential maintenance tasks
2. Estimated cost if DIY vs. Professional
3. "Red flags" to watch out for
4. A shopping list for supplies needed for each season`;

    return (
        <WebbookLayout>
            <Helmet>
                <title>Discovery 6: Home Base | The Agentic AI Adventure</title>
                <meta name="description" content="Automate household chores, maintenance, and supplies. Build your Command Center." />
            </Helmet>

            <BlitzModeContext.Provider value={blitzMode}>
                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* MISSION BRIEFING */}
                        <MissionBriefing
                            title="OPERATION: HOME BASE"
                            missionNumber={6}
                            duration="12 min"
                            briefing="Your home should be a sanctuary, not a source of stress. But the 'Invisible Load' of maintenance, cleaning, and logistics constantly drains your mental battery. Your objective: Establish a Command Center that manages the house for you, turning 'remembering' into 'automated reminding'."
                            objectives={[
                                "Calculate Household Chaos",
                                "Build Cleaning Schedule",
                                "Establish Maintenance Calendar",
                                "Launch Command Center"
                            ]}
                        />

                        {/* OBJECTIVES */}
                        <ObjectivesChecklist
                            operationId="op_6"
                            primaryObjectives={[
                                { id: "chaos_calc", label: "Calculate Household Chaos" },
                                { id: "cleaning_schedule", label: "Build Cleaning Schedule" },
                                { id: "maintenance_cal", label: "Establish Maintenance Calendar" }
                            ]}
                            bonusObjectives={[
                                { id: "command_center", label: "Launch Command Center Dashboard" }
                            ]}
                        />

                        {/* Author Credibility */}
                        

                        {/* Chapter Navigation */}
                        <ChapterNavigation
                            previousChapter="/part2/chapter2"
                            nextChapter="/part3/chapter1"
                            partNumber={2}
                            chapterNumber={6}
                        />

                        {/* Speed Run Toggle */}
                        <div className="flex justify-end mb-6">
                            <BlitzModeToggle enabled={blitzMode} onToggle={() => setBlitzMode(!blitzMode)} />
                        </div>

                        <PasswordGate partNumber={2} chapterNumber={6}>
                            {/* CAPTAIN EFFICIENCY - OPENER */}
                            {!blitzMode && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="default"
                                        message="Welcome to the final operation of Part 2. We've conquered mornings and meals. Now, we take the hill: the house itself. The 'Invisible Load'—all those tiny things you have to remember—is about to become visible, manageable, and largely automated. Let's build your Household Command Center."
                                    />
                                </Suspense>
                            )}

                            {/* Professional Mode Notice */}
                            {blitzMode && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-teal-900/30 rounded-xl p-4 border border-teal-500/40 backdrop-blur-sm mb-8"
                                >
                                    <div className="flex items-center gap-2 text-teal-400">
                                        <Zap size={18} />
                                        <span className="font-bold">Professional Mode Active</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Showing only essential prompts and tools. Toggle off for full content.
                                    </p>
                                </motion.div>
                            )}

                            {/* INVISIBLE LOAD VISUAL */}
                            {!blitzMode && <InvisibleLoadVisual />}

                            {/* QUICK ACCESS TO ALL AI TOOLS */}
                            <section className="mb-10">
                                <AIToolLinks />
                            </section>

                            {/* ★ TOOL FIRST: Household Chaos Calculator ★ */}
                            <section id="household-calculator" className="mb-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                                    <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Calculate Your Household Chaos</span>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                                </div>

                                <Suspense fallback={
                                    <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-800/50 rounded-xl animate-pulse">
                                        Loading calculator...
                                    </div>
                                }>
                                    <HouseholdChaosCalculator />
                                </Suspense>
                            </section>

                            {/* THE 4 PILLARS */}
                            {!blitzMode && <FourPillarsFramework />}

                            {/* INTERACTIVE: ROOM SCHEDULE BUILDER */}
                            <RoomScheduleBuilder />

                            {/* PROMPT 1: CLEANING AGENT */}
                            <QuickWin
                                title="Agent 1: The Cleaning Scheduler"
                                setupTime="10 min"
                                prompt={cleaningPrompt}
                            />

                            {/* VISUAL: MAINTENANCE CALENDAR */}
                            {!blitzMode && <MaintenanceCalendar />}

                            {/* PROMPT 2: MAINTENANCE AGENT */}
                            <QuickWin
                                title="Agent 2: The Maintenance Manager"
                                setupTime="15 min"
                                prompt={maintenancePrompt}
                                variant="secondary"
                            />

                            {/* DASHBOARD PREVIEW */}
                            {!speedRun && <CommandCenterDashboard />}

                            {/* CARD UNLOCK - Household Manager Agent */}
                            <AgentCardUnlock
                                card={householdManagerCard}
                                onUnlock={handleCardUnlock}
                                onComplete={() => console.log('Card added to deck')}
                                autoReveal={false}
                            />

                            {/* CASE STUDY */}
                            {!speedRun && (
                                <CaseStudyCard
                                    name="Sarah & Mike"
                                    role="New homeowners"
                                    problem="Overwhelmed by maintenance. Forgot HVAC filters for 2 years. Constant cleaning battles."
                                    result="Automated reminders for everything. 'Cleaning Saturday' reduced to 90 mins. Saved $400 on a potential HVAC repair."
                                    timeframe="3 months"
                                    quote="Our house used to run us. Now we run the house. The mental space I have now that I'm not constantly scanning for 'what needs to be done' is priceless."
                                />
                            )}

                            {/* SHAREABLE QUOTE */}
                            <ShareableQuote
                                quote="A home is a machine for living. Like any machine, it needs an operating system. You just built yours."
                                chapter={6}
                            />

                            {/* PART 2 CELEBRATION */}
                            <Part2Celebration />

                            {/* FAQ SECTION */}
                            <FAQSection
                                title="Household Management Questions"
                                faqs={chapter6FAQs}
                                className="mb-10"
                            />

                            {/* MISSION COMPLETE */}
                            <MissionComplete
                                operationId="op_6"
                                operationName="HOME BASE"
                                operationNumber={6}
                                nextOperationPath="/part3/chapter1"
                                nextOperationName="INBOX ZERO"
                                rewards={{
                                    dp: 300,
                                    cards: ['Household Manager Agent'],
                                    achievements: ['home_base_secured', 'part_2_complete']
                                }}
                                stats={{
                                    objectivesCompleted: "4/4",
                                }}
                            />

                            {/* Bottom Navigation */}
                            <ChapterNavigation
                                previousChapter="/part2/chapter2"
                                nextChapter="/part3/chapter1"
                                partNumber={2}
                                chapterNumber={6}
                            />
                        </PasswordGate>

                    </div >
                </div >
            </BlitzModeContext.Provider >
        </WebbookLayout >
    );
};

export default Chapter6;
