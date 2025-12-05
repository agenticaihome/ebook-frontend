import React, { useState, Suspense, createContext, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';
import { useNavigate } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import WebbookLayout from '../../components/layout/WebbookLayout';
import PasswordGate from '../../components/common/PasswordGate';
import ChapterNavigation from '../../components/common/ChapterNavigation';

import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, Home, Wrench, Package,
    Calendar, Trash2, Droplets, Wind, Thermometer, Bug, Leaf,
    AlertTriangle, HelpCircle, ClipboardList, Settings, Shield,
    Star, Trophy, Rocket, Sun, Moon, CloudSnow, Flower2, Target,
    CheckCircle2, XCircle, Timer, RotateCcw, Lightbulb
} from 'lucide-react';

// Lazy load interactive components
const HouseholdChaosCalculator = React.lazy(() => import('../../components/HouseholdChaosCalculator'));
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
                    <m.div
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
                    </m.div>
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
            color: 'cyan',
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
        cyan: { bg: 'from-cyan-900/40 to-cyan-900/20', border: 'border-cyan-500/40', text: 'text-cyan-400', icon: 'bg-cyan-500/20' },
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
                        <m.div
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
                        </m.div>
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
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <ClipboardList className="text-cyan-400" size={20} />
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
                                                ? 'bg-cyan-500 text-white'
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
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-900'
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
                <Home className="text-cyan-400" />
                Your Household Command Center
            </h2>
            <p className="text-slate-400 mb-6">
                This is what you've built across Part 2. All your daily operations, working together.
            </p>

            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl p-6 border border-cyan-500/30 backdrop-blur-sm">
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
                    <h4 className="text-cyan-400 font-bold text-sm mb-3 uppercase tracking-wider">Coming Up</h4>
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
        <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-yellow-900/30 via-orange-900/20 to-red-900/20 rounded-2xl p-8 border-2 border-yellow-500/50 backdrop-blur-sm mb-8 relative overflow-hidden"
        >
            {/* Celebration particles */}
            {celebrated && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <m.div
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
                        </m.div>
                    ))}
                </div>
            )}

            <div className="relative z-10">
                <div className="text-center mb-6">
                    <m.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4"
                    >
                        <Trophy className="text-yellow-400" size={40} />
                    </m.div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        🎉 PART 2 COMPLETE! 🎉
                    </h2>
                    <p className="text-slate-300">
                        You've automated your entire daily operations
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {achievements.map((item, i) => (
                        <m.div
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
                        </m.div>
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
                            <div className="text-3xl font-bold text-cyan-400">∞</div>
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
        </m.div>
    );
};

// Chapter Complete (custom for Part end)
const ChapterCompleteWithPartEnd = ({ achievements, nextChapter, nextTitle, nextPart }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="text-green-400" size={24} />
                </div>
                <div>
                    <span className="text-green-400 font-bold block">Chapter 6 Complete</span>
                    <span className="text-slate-400 text-sm">Part 2 finished — 37% of the way there</span>
                </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
                <p className="text-white font-bold text-sm mb-3">Your Household Command Center includes:</p>
                <ul className="space-y-2">
                    {achievements.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-orange-900/20 rounded-xl p-4 border border-orange-500/30 mb-6">
                <div className="flex items-center gap-2 text-orange-400 font-bold mb-1">
                    <Rocket size={16} />
                    Next: Part 3 — Digital Operations
                </div>
                <p className="text-slate-400 text-sm">
                    Email triage, calendar defense, admin automation. Where the hours really add up.
                </p>
            </div>

            <button
                onClick={() => navigate(nextChapter)}
                className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-4 rounded-xl transition-all"
            >
                Continue to Part {nextPart}, Chapter {typeof nextChapter === 'string' && nextChapter.includes('chapter') ? nextChapter.split('chapter')[1] : nextChapter}: {nextTitle}
                <ArrowRight size={18} />
            </button>
        </div>
    );
};

// ============================================
// CHAPTER 6 MAIN COMPONENT
// ============================================

const Chapter6 = () => {
    const [speedRun, setSpeedRun] = useState(false);
    const navigate = useNavigate();

    const scrollToCalculator = () => {
        document.getElementById('household-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const cleaningAgentPrompt = `You are my Household Cleaning Agent. Your job is to keep my home clean without me having to remember everything.

MY CLEANING SCHEDULE:
[Paste your Room Schedule Builder output here]

MY HOUSEHOLD:
- Home type: [House/Apartment/Condo]
- Bedrooms: [X]
- Bathrooms: [X]
- People living here: [X adults, X kids, X pets]
- Biggest cleaning challenges: [e.g., pet hair, kids' messes, dust]

YOUR RESPONSIBILITIES:
1. Create a daily/weekly checklist
2. Remind me of seasonal tasks (e.g., change filters)
3. Suggest "burst cleaning" sessions when I'm overwhelmed
4. Help me delegate tasks to other family members

Ask me for any missing details, then generate my first weekly plan.`;

    const maintenanceAgentPrompt = `You are my Home Maintenance Agent. Your job is to prevent expensive repairs by keeping everything running smoothly.

MY HOME:
- Age: [Approximate year built]
- Key systems: [HVAC, Water Heater, Sump Pump, etc.]
- Last major repairs: [Any recent work done]

YOUR RESPONSIBILITIES:
1. Track maintenance schedules for all systems
2. Remind me to schedule service appointments
3. Help me troubleshoot simple issues before calling a pro
4. Keep a log of all maintenance performed

Generate a 12-month maintenance calendar for my home based on standard recommendations.`;

    const supplyAgentPrompt = `You are my Supply Manager Agent. Your job is to ensure we never run out of essentials.

MY HOUSEHOLD SUPPLIES TO TRACK:

CLEANING:
- All-purpose cleaner
- Dish soap
- Laundry detergent
- Dishwasher pods
- Toilet cleaner
- Glass cleaner
- Sponges/scrubbers
- Trash bags (kitchen & small)

PAPER GOODS:
- Paper towels
- Toilet paper
- Tissues
- Napkins

PERSONAL CARE:
- Shampoo/conditioner
- Body wash
- Toothpaste
- [Add your items]

OTHER:
- Light bulbs
- Batteries (AA, AAA, 9V)
- Air fresheners
- [Add your items]

MY PREFERENCES:
- Preferred store: [Target/Costco/Amazon/etc.]
- Budget consciousness: [Price-sensitive/Brand-loyal/Mix]
- Bulk buying: [Yes, have storage / No, limited space]

YOUR RESPONSIBILITIES:
1. Monthly check-in: "What's running low?"
2. Suggest restock list before my regular shopping trip
3. Track approximate usage rates
4. Alert me to good deals if I mention price sensitivity

Ask me about my household size and preferences to estimate usage.`;

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 6: Household Management | Agentic AI at Home</title>
                <meta name="description" content="Master household management with AI-powered prompts and systems" />
            </Helmet>

            <SEO
                title="Household Management - Agentic AI at Home"
                description="Automate your home operations. Cleaning, maintenance, and supplies."
                canonical="/part2/chapter3"
            />
            <SpeedRunContext.Provider value={speedRun}>
                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* Progress Bar with Part indicator */}
                        <ChapterProgress
                            current={6}
                            total={16}
                            part={2}
                            partTitle="Daily Operations"
                        />

                        {/* Author Credibility */}
                        <AuthorCredibility />

                        {/* Chapter Navigation */}
                        <ChapterNavigation
                            previousChapter="/part2/chapter2"
                            nextChapter="/part3/chapter1"
                            partNumber={2}
                            chapterNumber={6}
                        />

                        {/* Header */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="text-cyan-400 font-mono text-sm mb-2">Chapter 6</div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Household Management
                            </h1>
                            <p className="text-xl text-slate-400 mb-4">
                                Your home, running itself—cleaning, maintenance, supplies, all of it
                            </p>

                            {/* Reading time + Speed Run toggle */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4 text-slate-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        <span>10 min read</span>
                                    </div>
                                    <span>•</span>
                                    <span className="text-cyan-400">20 min to build your system</span>
                                </div>
                                <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                            </div>
                        </m.div>

                        {/* TL;DR Card */}
                        <TLDRCard
                            stats={[
                                { value: '4', label: 'pillars of home ops' },
                                { value: '3', label: 'agents deployed' },
                                { value: '0', label: 'forgotten chores' },
                            ]}
                            primaryCTA="Build My Schedule"
                            onCTAClick={() => document.getElementById('schedule-builder')?.scrollIntoView({ behavior: 'smooth' })}
                        />

                        <PasswordGate partNumber={2} chapterNumber={6}>
                            {/* CAPTAIN EFFICIENCY - OPENER */}
                            {!speedRun && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="default"
                                        message="We've handled your morning and your meals. Now for the big one: the house itself. It's the silent energy drain—the mental load of remembering filters, lightbulbs, and deep cleaning. Today, we build a 'Command Center' that does the remembering for you. Let's turn your home into a well-oiled machine."
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
                                        Showing only the essential prompts and tools. Toggle off to see the full chapter.
                                    </p>
                                </m.div>
                            )}

                            {/* VISUAL: The Invisible Load */}
                            {!speedRun && <InvisibleLoadVisual />}

                            {/* FRAMEWORK: The 4 Pillars */}
                            <FourPillarsFramework />

                            {/* ★ TOOL 1: Room Schedule Builder ★ */}
                            <section id="schedule-builder" className="mb-10">
                                <RoomScheduleBuilder />
                            </section>

                            {/* PROMPT 1: CLEANING AGENT */}
                            <QuickWin
                                title="Agent 1: The Cleaning Manager"
                                setupTime="10 min"
                                prompt={cleaningAgentPrompt}
                            />

                            {/* VISUAL: Maintenance Calendar */}
                            <MaintenanceCalendar />

                            {/* PROMPT 2: MAINTENANCE AGENT */}
                            <QuickWin
                                title="Agent 2: The Maintenance Tracker"
                                setupTime="5 min"
                                prompt={maintenanceAgentPrompt}
                                variant="secondary"
                            />

                            {/* PROMPT 3: SUPPLY AGENT */}
                            <QuickWin
                                title="Agent 3: The Supply Manager"
                                setupTime="5 min"
                                prompt={supplyAgentPrompt}
                                variant="tertiary"
                            />

                            {/* DASHBOARD PREVIEW */}
                            {!speedRun && <CommandCenterDashboard />}

                            {/* CASE STUDY */}
                            {!speedRun && (
                                <CaseStudyCard
                                    name="The Chen Family"
                                    role="New homeowners, both working full-time"
                                    problem="Spent every Saturday cleaning, fixing things, and running to the hardware store. Zero relaxation."
                                    result="Saturdays are now 100% free. The 'Cleaning Manager' assigns 15-min daily tasks, so the mess never piles up."
                                    timeframe="4 weeks"
                                    quote="We didn't realize how much the 'invisible load' was weighing us down until it was gone. Our house runs on autopilot now."
                                />
                            )}

                            {/* SHAREABLE QUOTE */}
                            <ShareableQuote
                                quote="A home shouldn't be a second job. It should be the place you rest from your first one."
                                chapter={6}
                            />

                            {/* CAPTAIN EFFICIENCY - CLOSER */}
                            {!speedRun && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="celebrating"
                                        message="Look at what you've built! Morning Brief, Meal Planning, and now a full Household Command Center. You have effectively 'outsourced' the mental load of running your home to your AI agents. Take a moment to celebrate. You've just reclaimed hours of your life, every single week."
                                    />
                                </Suspense>
                            )}

                            {/* PART 2 CELEBRATION */}
                            <Part2Celebration />

                            {/* CHAPTER COMPLETE */}
                            <ChapterCompleteWithPartEnd
                                achievements={[
                                    'Built Room-by-Room Cleaning Schedule',
                                    'Set up Cleaning Manager Agent',
                                    'Set up Maintenance Tracker Agent',
                                    'Set up Supply Manager Agent',
                                    'Completed Part 2: Daily Operations',
                                ]}
                                nextChapter="/part3/chapter1"
                                nextTitle="Email & Communications"
                                nextPart={3}
                            />

                            {/* Bottom Navigation */}
                            <ChapterNavigation
                                previousChapter="/part2/chapter2"
                                nextChapter="/part3/chapter1"
                                partNumber={2}
                                chapterNumber={6}
                            />
                        </PasswordGate>

                    </div>
                </div>
            </SpeedRunContext.Provider>
        </WebbookLayout>
    );
};

export default Chapter6;