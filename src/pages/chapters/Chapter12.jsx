import { Helmet } from 'react-helmet-async';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import PasswordGate from '../../components/common/PasswordGate';

import React, { useState, Suspense, createContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, BookOpen, GraduationCap,
    Brain, Target, Calendar, Repeat, Battery, BatteryLow, BatteryFull,
    Lightbulb, PenTool, Headphones, Video, FileText, Trophy,
    Rocket, Star, Coffee, Moon, Sun, Flame, Bookmark, Layers,
    RefreshCw, TrendingUp, Award, Heart, CheckCircle2, Play
} from 'lucide-react';

// Lazy load interactive components
const LearningAuditCalculator = React.lazy(() => import('../../components/LearningAuditCalculator'));
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
import AIToolLinks from '../../components/AIToolLinks';
import FAQSection, { chapter12FAQs } from '../../components/FAQSection';

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
        navigator.clipboard.writeText(`"${quote}" — The Agentic AI Adventure, Chapter ${chapter}`);
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
        tertiary: 'from-blue-900/30 to-teal-900/20 border-blue-500/40',
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

// ============================================
// Discovery 12 SPECIFIC COMPONENTS
// ============================================

// The Learning Graveyard
const LearningGraveyardVisual = () => {
    const [hoveredItem, setHoveredItem] = useState(null);

    const abandonedLearning = [
        { item: 'Udemy courses', count: '47', icon: Video, status: '3 completed', lastTouch: '6 months ago' },
        { item: 'Unfinished books', count: '12', icon: BookOpen, status: 'Chapter 3 of each', lastTouch: 'Nightstand' },
        { item: 'Language app', count: '1', icon: Headphones, status: '14-day streak lost', lastTouch: '8 months ago' },
        { item: 'Online certifications', count: '3', icon: Award, status: 'Started, never finished', lastTouch: '1 year ago' },
        { item: 'Skill you wanted', count: '∞', icon: PenTool, status: 'Guitar gathering dust', lastTouch: 'Christmas gift 2022' },
        { item: 'Course bookmarks', count: '23', icon: Bookmark, status: '"Will start Monday"', lastTouch: 'Every Monday' },
    ];

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8 relative overflow-hidden">
            {/* Cobwebs effect */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-400">
                    <path d="M0,0 Q50,50 100,0 Q50,50 100,100 Q50,50 0,100 Q50,50 0,0"
                        fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </div>

            <div className="relative">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">The Learning Graveyard</h2>
                        <p className="text-slate-400 text-sm">Where good intentions go to rest</p>
                    </div>
                    <div className="text-4xl opacity-50">🪦</div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {abandonedLearning.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onMouseEnter={() => setHoveredItem(i)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className={`bg-slate-900/50 rounded-xl p-4 border transition-all cursor-pointer ${hoveredItem === i
                                ? 'border-rose-500/50 bg-rose-900/20'
                                : 'border-slate-700'
                                }`}
                        >
                            <item.icon className={`mb-2 ${hoveredItem === i ? 'text-rose-400' : 'text-slate-500'}`} size={20} />
                            <div className="text-2xl font-bold text-white">{item.count}</div>
                            <div className="text-slate-400 text-sm">{item.item}</div>
                            <div className="text-slate-600 text-xs mt-1">{item.status}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="p-4 bg-slate-900/50 rounded-xl">
                    <p className="text-slate-300 text-sm">
                        <span className="text-rose-400 font-bold">Sound familiar?</span> You don't lack the desire to grow.
                        You lack a system that works with your actual life—your energy, your schedule, your reality.
                    </p>
                    <p className="text-teal-400 text-sm mt-2 font-medium">
                        Time to build a Recovery-Aware Learning system.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Recovery-Aware Learning Framework
const RecoveryAwareLearning = () => {
    const [selectedEnergy, setSelectedEnergy] = useState('medium');

    const energyLevels = [
        {
            level: 'high',
            icon: BatteryFull,
            label: 'High Energy',
            color: 'green',
            activities: ['Deep study sessions', 'Complex problem-solving', 'New concept learning', 'Hands-on practice'],
            time: 'Morning or post-exercise',
            duration: '45-90 min blocks',
        },
        {
            level: 'medium',
            icon: Battery,
            label: 'Medium Energy',
            color: 'yellow',
            activities: ['Review & reinforcement', 'Reading', 'Video courses', 'Note organization'],
            time: 'Afternoon or lunch break',
            duration: '20-30 min blocks',
        },
        {
            level: 'low',
            icon: BatteryLow,
            label: 'Low Energy',
            color: 'orange',
            activities: ['Podcasts while commuting', 'Audiobooks', 'Flashcard review', 'Passive video'],
            time: 'Evening wind-down',
            duration: '10-15 min or background',
        },
    ];

    const colors = {
        green: 'from-green-900/40 to-green-900/20 border-green-500/50 text-green-400',
        yellow: 'from-yellow-900/40 to-yellow-900/20 border-yellow-500/50 text-yellow-400',
        orange: 'from-orange-900/40 to-orange-900/20 border-orange-500/50 text-orange-400',
    };

    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-orange-500/20 flex items-center justify-center">
                    <Battery className="text-green-400" size={20} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Recovery-Aware Learning</h2>
                    <p className="text-slate-400 text-sm">Match learning to your energy, not your ambition</p>
                </div>
            </div>

            <div className="space-y-4">
                {energyLevels.map((energy, i) => (
                    <motion.div
                        key={energy.level}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedEnergy(energy.level)}
                        className={`bg-gradient-to-r ${colors[energy.color]} rounded-xl p-5 border backdrop-blur-sm cursor-pointer transition-all ${selectedEnergy === energy.level ? 'ring-2 ring-white/20' : ''
                            }`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <energy.icon size={24} />
                                <div>
                                    <h3 className="font-bold text-lg">{energy.label}</h3>
                                    <p className="text-slate-400 text-xs">{energy.time}</p>
                                </div>
                            </div>
                            <span className="text-sm bg-slate-900/50 px-3 py-1 rounded-lg">
                                {energy.duration}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {energy.activities.map((activity, j) => (
                                <span key={j} className="text-xs bg-slate-900/50 px-2 py-1 rounded-lg text-slate-300">
                                    {activity}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-teal-900/20 rounded-xl border border-teal-500/30">
                <p className="text-teal-400 text-sm">
                    <strong>The key insight:</strong> Forcing deep study when you're exhausted builds resentment, not knowledge.
                    Your Learning Agent matches content to your current energy level.
                </p>
            </div>
        </div>
    );
};

// The Second Brain Preview
const SecondBrainPreview = () => {
    const [activeNote, setActiveNote] = useState(0);

    const notes = [
        { title: 'Book: Atomic Habits', tags: ['habits', 'productivity'], connections: 3 },
        { title: 'Course: React Fundamentals', tags: ['coding', 'frontend'], connections: 5 },
        { title: 'Podcast: Tim Ferriss #523', tags: ['mindset', 'success'], connections: 2 },
        { title: 'Article: Spaced Repetition', tags: ['learning', 'memory'], connections: 4 },
    ];

    return (
        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-2xl p-6 border border-purple-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Brain className="text-purple-400" size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Your Second Brain</h3>
                    <p className="text-slate-400 text-sm">Capture insights, build connections</p>
                </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 mb-4">
                <div className="space-y-2">
                    {notes.map((note, i) => (
                        <motion.div
                            key={i}
                            onClick={() => setActiveNote(i)}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${activeNote === i
                                ? 'bg-purple-500/20 border border-purple-500/50'
                                : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <FileText className={activeNote === i ? 'text-purple-400' : 'text-slate-500'} size={16} />
                                <span className={activeNote === i ? 'text-white' : 'text-slate-400'}>{note.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {note.tags.slice(0, 2).map((tag, j) => (
                                    <span key={j} className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-400">
                                        {tag}
                                    </span>
                                ))}
                                <span className="text-xs text-purple-400">
                                    {note.connections} links
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-slate-900/50 rounded-xl">
                <p className="text-purple-400 text-sm">
                    <strong>The magic:</strong> When you learn something new, your agent helps you connect it
                    to what you already know. Knowledge compounds when it's connected.
                </p>
            </div>
        </div>
    );
};

// Real Case Study: Endo Boards Example
const EndoBoardsCaseStudy = () => (
    <div className="bg-gradient-to-br from-teal-900/20 to-blue-900/20 rounded-2xl p-6 border border-teal-500/40 backdrop-blur-sm mb-8 relative overflow-hidden">
        <div className="absolute top-4 right-4 text-4xl opacity-20">🦷</div>

        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                <GraduationCap className="text-teal-400" size={20} />
            </div>
            <div>
                <span className="text-teal-400 text-xs font-bold uppercase">Real Example</span>
                <h3 className="text-white font-bold text-lg">Board Exam Preparation</h3>
            </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 mb-4">
            <p className="text-slate-300 text-sm mb-4">
                <strong className="text-white">The scenario:</strong> A dental resident preparing for
                endodontic board exams while working 50+ hour weeks with two kids under 3.
            </p>

            <div className="space-y-3">
                <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs">1</span>
                    </div>
                    <div>
                        <span className="text-white font-medium">The Problem</span>
                        <p className="text-slate-400 text-sm">
                            Massive study material. Unpredictable energy. Guilt about time away from family.
                            Traditional "study 4 hours a day" advice doesn't work.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-yellow-400 text-xs">2</span>
                    </div>
                    <div>
                        <span className="text-white font-medium">The Recovery-Aware Approach</span>
                        <p className="text-slate-400 text-sm">
                            Agent checks energy level before each session. High energy → practice cases and complex topics.
                            Low energy → flashcard review or lecture audio while commuting.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-400 text-xs">3</span>
                    </div>
                    <div>
                        <span className="text-white font-medium">The System</span>
                        <p className="text-slate-400 text-sm">
                            Spaced repetition for retention. Progress tracking by topic. Weak area identification.
                            Micro-sessions that fit between cases. No guilt about "not studying enough."
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-teal-400 text-xs">4</span>
                    </div>
                    <div>
                        <span className="text-white font-medium">The Result</span>
                        <p className="text-slate-400 text-sm">
                            Consistent progress without burnout. Better retention through spaced repetition.
                            Actually present with family during "off" time. Sustainable all the way to exam day.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-4 bg-teal-900/30 rounded-xl border border-teal-500/30">
            <p className="text-teal-400 text-sm">
                <strong>The lesson:</strong> The goal isn't to study MORE. It's to study SMARTER—matching
                effort to energy, using proven retention techniques, and building sustainable habits.
            </p>
        </div>
    </div>
);

// Micro-Learning Schedule Builder
const MicroLearningSchedule = () => {
    const [schedule, setSchedule] = useState({
        morning: 'commute',
        lunch: 'reading',
        evening: 'none',
    });

    const options = {
        morning: [
            { value: 'commute', label: '🎧 Podcast/Audiobook', time: '20-30 min' },
            { value: 'deep', label: '📚 Deep study', time: '45 min' },
            { value: 'review', label: '🔄 Flashcard review', time: '10 min' },
            { value: 'none', label: '— Rest', time: '0 min' },
        ],
        lunch: [
            { value: 'reading', label: '📖 Reading', time: '15-20 min' },
            { value: 'video', label: '🎬 Course video', time: '20 min' },
            { value: 'practice', label: '💻 Hands-on practice', time: '30 min' },
            { value: 'none', label: '— Rest', time: '0 min' },
        ],
        evening: [
            { value: 'review', label: '🔄 Day review', time: '10 min' },
            { value: 'passive', label: '📺 Passive learning', time: '20 min' },
            { value: 'notes', label: '📝 Note organization', time: '15 min' },
            { value: 'none', label: '— Rest', time: '0 min' },
        ],
    };

    const getTotalTime = () => {
        let total = 0;
        Object.entries(schedule).forEach(([period, value]) => {
            const option = options[period].find(o => o.value === value);
            if (option && option.time !== '0 min') {
                const match = option.time.match(/(\d+)/);
                if (match) total += parseInt(match[1]);
            }
        });
        return total;
    };

    return (
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-6 border border-green-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Clock className="text-green-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Your Micro-Learning Schedule</h3>
                        <p className="text-slate-400 text-sm">Small pockets add up to big progress</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">~{getTotalTime()} min</div>
                    <div className="text-slate-500 text-xs">/day learning</div>
                </div>
            </div>

            <div className="space-y-4 mb-4">
                {Object.entries(options).map(([period, opts]) => (
                    <div key={period} className="bg-slate-900/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            {period === 'morning' && <Sun className="text-yellow-400" size={16} />}
                            {period === 'lunch' && <Coffee className="text-orange-400" size={16} />}
                            {period === 'evening' && <Moon className="text-purple-400" size={16} />}
                            <span className="text-white font-medium capitalize">{period}</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {opts.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setSchedule(s => ({ ...s, [period]: opt.value }))}
                                    className={`p-2 rounded-lg text-sm transition-all text-left ${schedule[period] === opt.value
                                        ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                                        : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-slate-600'
                                        }`}
                                >
                                    <div>{opt.label}</div>
                                    <div className="text-xs opacity-60">{opt.time}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {getTotalTime() > 0 && (
                <div className="p-4 bg-green-900/30 rounded-xl border border-green-500/30">
                    <p className="text-green-400 text-sm">
                        <strong>{getTotalTime()} minutes × 365 days = {Math.round(getTotalTime() * 365 / 60)} hours/year</strong> of learning.
                        That's real progress without disrupting your life.
                    </p>
                </div>
            )}
        </div>
    );
};

// Part 4 Celebration
const Part4Celebration = () => {
    const [celebrated, setCelebrated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setCelebrated(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const achievements = [
        { chapter: 10, title: 'Health & Wellness', icon: Heart, result: 'Self-care automated' },
        { chapter: 11, title: 'Social & Relationships', icon: Heart, result: '0 forgotten connections' },
        { chapter: 12, title: 'Learning & Growth', icon: GraduationCap, result: 'Sustainable growth' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-rose-900/30 via-orange-900/20 to-yellow-900/20 rounded-2xl p-8 border-2 border-rose-500/50 backdrop-blur-sm mb-8 relative overflow-hidden"
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
                            {['💜', '🌱', '✨', '🧠', '🎯'][i % 5]}
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
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-500/20 mb-4"
                    >
                        <Heart className="text-rose-400" size={40} />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        💜 PART 4 COMPLETE! 💜
                    </h2>
                    <p className="text-slate-300">
                        Your LIFE is now on autopilot
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
                            <item.icon className="text-rose-400 mx-auto mb-2" size={24} />
                            <div className="text-white font-bold text-sm">Ch {item.chapter}</div>
                            <div className="text-slate-400 text-xs mb-2">{item.title}</div>
                            <div className="text-green-400 font-bold text-sm">{item.result}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-8">
                        <div>
                            <div className="text-3xl font-bold text-rose-400">3</div>
                            <div className="text-slate-400 text-xs">Life systems</div>
                        </div>
                        <div className="h-12 w-px bg-slate-700" />
                        <div>
                            <div className="text-3xl font-bold text-green-400">∞</div>
                            <div className="text-slate-400 text-xs">Peace of mind</div>
                        </div>
                        <div className="h-12 w-px bg-slate-700" />
                        <div>
                            <div className="text-3xl font-bold text-teal-400">YOU</div>
                            <div className="text-slate-400 text-xs">Taken care of</div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-teal-400 font-bold">
                        Next: Part 5 — Integration & Mastery
                    </p>
                    <p className="text-slate-500 text-sm mt-1">
                        Bring it all together. Build your Life Operating System.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

// Chapter Complete with Part End
const ChapterCompleteWithPartEnd = ({ achievements, nextChapter, nextTitle }) => (
    <div className="bg-gradient-to-r from-green-900/30 to-rose-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
            </div>
            <div>
                <span className="text-green-400 font-bold block">Discovery 12 Complete</span>
                <span className="text-slate-400 text-sm">Part 4 finished — 75% of the way there!</span>
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

        <div className="bg-teal-900/20 rounded-xl p-4 border border-teal-500/30 mb-6">
            <div className="flex items-center gap-2 text-teal-400 font-bold mb-1">
                <Rocket size={16} />
                Next: Part 5 — Integration & Mastery
            </div>
            <p className="text-slate-400 text-sm">
                Bring all your agents together. Build your complete Life Operating System.
            </p>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-bold px-6 py-4 rounded-xl transition-all">
            Continue to Chapter {nextChapter}: {nextTitle}
            <ArrowRight size={18} />
        </button>
    </div>
);

// ============================================
// Discovery 12 MAIN COMPONENT
// ============================================

const Chapter12 = () => {
    const [speedRun, setSpeedRun] = useState(false);

    const scrollToCalculator = () => {
        document.getElementById('learning-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const recoveryAwareLearnerPrompt = `You are my Recovery-Aware Learning Agent. Your job is to help me learn and grow without burning out.

MY LEARNING CONTEXT:
- Current energy level: [Check with me each session]
- Time available: [Varies - sometimes 10 min, sometimes 1 hour]
- Primary learning goals: [List your goals]
- Preferred formats: [Video, reading, audio, hands-on]

THE RECOVERY-AWARE APPROACH:
Before suggesting any learning activity, ask:
1. How's your energy right now? (High/Medium/Low)
2. How much time do you have?
3. What did you learn yesterday? (For spaced repetition)

MATCH ACTIVITIES TO ENERGY:
High Energy (Morning, post-exercise):
- Deep study of new concepts
- Complex problem-solving
- Hands-on practice
- Active note-taking

Medium Energy (Afternoon, lunch):
- Review and reinforcement
- Reading
- Video courses
- Organizing notes

Low Energy (Evening, tired):
- Podcasts/audiobooks
- Passive video
- Flashcard review
- Light reading

SPACED REPETITION:
- Day 1: Learn new material
- Day 2: Quick review
- Day 7: Reinforcement
- Day 30: Long-term check

OUTPUT FORMAT:
🔋 Energy check: [Your level]
⏱️ Time: [Available]
📚 Suggested activity: [Matched to energy]
🔄 Due for review: [Items from previous sessions]

Help me make consistent progress without fighting my natural rhythms.`;

    const secondBrainAgentPrompt = `You are my Second Brain Agent. Your job is to help me capture, organize, and connect what I learn.

WHEN I SHARE SOMETHING I'VE LEARNED:
1. Help me extract the key insights (bullet points)
2. Suggest tags/categories for organization
3. Ask: "What does this remind you of?" (to find connections)
4. Identify potential applications in my life

KNOWLEDGE CATEGORIES:
- Career/Professional development
- Personal skills
- Health & wellness
- Relationships
- Finance
- Hobbies & interests
- [Add your own]

WEEKLY KNOWLEDGE REVIEW:
Ask me:
- What's the most valuable thing you learned this week?
- How might you apply it?
- What questions do you still have?

MONTHLY SYNTHESIS:
- Review notes from the month
- Identify patterns and themes
- Suggest connections between ideas
- Highlight insights that could become action items

OUTPUT FORMAT:
📝 Captured: [Key insight]
🏷️ Tags: [Categories]
🔗 Connects to: [Related notes/ideas]
💡 Application: [How this could be useful]

Help me build a knowledge system where ideas compound over time.`;

    const studySessionAgentPrompt = `You are my Study Session Agent. Your job is to help me prepare for exams, certifications, or intensive learning goals.

MY STUDY CONTEXT:
- What I'm studying: [Exam, certification, topic]
- Deadline/exam date: [Date]
- Time available per day: [Realistic amount]
- Current weak areas: [Topics needing work]

BEFORE EACH SESSION:
1. Check my energy level
2. Review what we covered last time (spaced repetition)
3. Identify today's focus area
4. Set a clear, achievable goal for the session

DURING THE SESSION:
- Break complex topics into digestible chunks
- Use active recall (ask me questions, don't just explain)
- Mix in review of previously learned material
- Take breaks every 25-30 minutes (Pomodoro-style)

AFTER EACH SESSION:
- Summarize what we covered
- Create flashcard-style questions for later review
- Schedule next review date
- Celebrate progress (no matter how small)

PROGRESS TRACKING:
- Topics mastered: [List]
- Topics in progress: [List]
- Topics not started: [List]
- Weak areas: [Needs extra attention]

OUTPUT FORMAT:
📅 Session Plan:
- Review: [5 min - previous material]
- New: [20 min - today's focus]
- Practice: [10 min - application]
- Wrap-up: [5 min - summary]

🎯 Today's goal: [Specific, achievable]
📊 Progress: [X% through material]

Help me prepare effectively without cramming or burning out.`;

    return (
        <SpeedRunContext.Provider value={speedRun}>
            <div className="min-h-screen bg-[#0f0f1a]">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    {/* Progress Bar with Part indicator */}
                    <ChapterProgress
                        current={12}
                        total={16}
                        part={4}
                        partTitle="Life Systems"
                    />

                    {/* Author Credibility */}


                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <div className="text-rose-400 font-mono text-sm mb-2">Discovery 12</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Learning & Growth
                        </h1>
                        <p className="text-xl text-slate-400 mb-4">
                            Grow without grinding. Learn without burning out.
                        </p>

                        {/* Reading time + Speed Run toggle */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4 text-slate-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} />
                                    <span>11 min read</span>
                                </div>
                                <span>•</span>
                                <span className="text-rose-400">15 min to build your learning system</span>
                            </div>
                            <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                        </div>
                    </motion.div>

                    {/* TL;DR Card */}
                    <TLDRCard
                        stats={[
                            { value: '3', label: 'energy-matched modes' },
                            { value: '∞', label: 'sustainable growth' },
                            { value: '0', label: 'abandoned courses' },
                        ]}
                        primaryCTA="Audit My Learning"
                        onCTAClick={scrollToCalculator}
                    />

                    {/* CAPTAIN EFFICIENCY - OPENER */}
                    {!speedRun && (
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="Final chapter of Part 4—and maybe the most honest one. Let's talk about all those Udemy courses gathering digital dust. The books half-read. The skills half-learned. You don't lack ambition. You lack a system that respects your actual energy, your actual schedule, your actual life. Today we build Recovery-Aware Learning—growth that happens because of your system, not despite your exhaustion."
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
                                Showing only the essential prompts. Toggle off for the full learning system.
                            </p>
                        </motion.div>
                    )}

                    {/* ★ LEARNING GRAVEYARD ★ */}
                    {!speedRun && <LearningGraveyardVisual />}

                    {/* LEARNING CALCULATOR */}
                    <section id="learning-calculator" className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-500/50" />
                            <span className="text-rose-400 font-bold uppercase text-sm tracking-wider">Your Learning Audit</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-500/50" />
                        </div>

                        <Suspense fallback={
                            <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                Loading learning audit...
                            </div>
                        }>
                            <LearningAuditCalculator />
                        </Suspense>
                    </section>

                    {/* RECOVERY-AWARE LEARNING FRAMEWORK */}
                    {!speedRun && <RecoveryAwareLearning />}

                    {/* AGENT 1: RECOVERY-AWARE LEARNER */}
                    <QuickWin
                        title="Agent 1: The Recovery-Aware Learner"
                        setupTime="10 min"
                        prompt={recoveryAwareLearnerPrompt}
                        variant="default"
                    />

                    {/* MICRO-LEARNING SCHEDULE */}
                    {!speedRun && <MicroLearningSchedule />}

                    {/* SECOND BRAIN PREVIEW */}
                    {!speedRun && <SecondBrainPreview />}

                    {/* AGENT 2: SECOND BRAIN */}
                    <QuickWin
                        title="Agent 2: The Second Brain"
                        setupTime="10 min"
                        prompt={secondBrainAgentPrompt}
                        variant="secondary"
                    />

                    {/* ENDO BOARDS CASE STUDY */}
                    {!speedRun && <EndoBoardsCaseStudy />}

                    {/* AGENT 3: STUDY SESSION */}
                    <QuickWin
                        title="Agent 3: The Study Session Coach"
                        setupTime="10 min"
                        prompt={studySessionAgentPrompt}
                        variant="tertiary"
                    />

                    {/* SHAREABLE QUOTE */}
                    <ShareableQuote
                        quote="The goal isn't to study more. It's to study smarter—matching effort to energy, using proven retention techniques, and building sustainable habits."
                        chapter={12}
                    />

                    {/* CAPTAIN EFFICIENCY - CLOSER */}
                    {!speedRun && (
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="celebrating"
                                message="PART 4 IS COMPLETE! You've built systems for the three pillars of a full life: your health, your relationships, and your growth. The agents will keep you healthy, connected, and learning—without adding to your overwhelm. But we're not done yet. Part 5 is where it all comes together. We'll integrate every agent into your Life Operating System. The finale is coming. 🚀"
                            />
                        </Suspense>
                    )}

                    {/* ★ PART 4 CELEBRATION ★ */}
                    {!speedRun && <Part4Celebration />}

                    {/* CHAPTER COMPLETE */}
                    {/* QUICK ACCESS TO ALL AI TOOLS */}
                    <section className="mb-10">
                        <AIToolLinks />
                    </section>

                    {/* FAQ SECTION */}
                    <section className="mb-10">
                        <FAQSection faqs={chapter12FAQs} title="Learning FAQ" />
                    </section>

                    <ChapterCompleteWithPartEnd
                        achievements={[
                            'Recovery-Aware Learning Agent (energy-matched study)',
                            'Second Brain Agent (capture & connect insights)',
                            'Study Session Coach (exam/certification prep)',
                            'Micro-learning schedule built',
                            'Learning graveyard acknowledged (no more guilt!)',
                        ]}
                        nextChapter={13}
                        nextTitle="Life Operating System"
                    />

                </div>
            </div>

            <ChapterNavigation
                previousChapter="/part4/chapter2"
                nextChapter="/part5/chapter1"
                partNumber={4}
                chapterNumber={3}
            />
        </SpeedRunContext.Provider>
    );
};

export default Chapter12;
