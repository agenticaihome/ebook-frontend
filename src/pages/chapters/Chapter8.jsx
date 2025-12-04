import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import PasswordGate from '../../components/common/PasswordGate';

import React, { useState, Suspense, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, Calendar, CalendarX,
    CalendarCheck, Shield, Target, Users, Video, Coffee, Brain,
    Ban, AlertTriangle, Timer, TrendingDown, Lock, Unlock,
    Play, Pause, ChevronRight, HelpCircle, X, Check, Layers
} from 'lucide-react';

// Lazy load interactive components
const MeetingAuditCalculator = React.lazy(() => import('../../components/MeetingAuditCalculator'));
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
                <span className="text-green-400 font-bold block">Chapter 8 Complete</span>
                <span className="text-slate-400 text-sm">You're 50% of the way there!</span>
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
// CHAPTER 8 SPECIFIC COMPONENTS
// ============================================

// Calendar Autopsy Visual - Shows a horrifying meeting-filled week
const CalendarAutopsyVisual = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const hours = ['9 AM', '10', '11', '12 PM', '1', '2', '3', '4', '5'];

    // Meeting blocks: { day: 0-4, startHour: 0-8, duration: 1-3, type: 'meeting'|'focus'|'free' }
    const meetings = [
        // Monday
        { day: 0, startHour: 0, duration: 1, type: 'meeting', label: 'Standup' },
        { day: 0, startHour: 1, duration: 2, type: 'meeting', label: 'Project Review' },
        { day: 0, startHour: 4, duration: 1, type: 'meeting', label: '1:1 w/ Manager' },
        { day: 0, startHour: 6, duration: 2, type: 'meeting', label: 'Team Sync' },
        // Tuesday
        { day: 1, startHour: 0, duration: 1, type: 'meeting', label: 'Standup' },
        { day: 1, startHour: 2, duration: 3, type: 'meeting', label: 'Planning Session' },
        { day: 1, startHour: 5, duration: 1, type: 'meeting', label: 'Vendor Call' },
        { day: 1, startHour: 7, duration: 1, type: 'meeting', label: 'Status Update' },
        // Wednesday
        { day: 2, startHour: 0, duration: 1, type: 'meeting', label: 'Standup' },
        { day: 2, startHour: 1, duration: 1, type: 'meeting', label: 'Design Review' },
        { day: 2, startHour: 3, duration: 2, type: 'meeting', label: 'All Hands' },
        { day: 2, startHour: 6, duration: 2, type: 'meeting', label: 'Client Call' },
        // Thursday
        { day: 3, startHour: 0, duration: 1, type: 'meeting', label: 'Standup' },
        { day: 3, startHour: 2, duration: 1, type: 'meeting', label: 'Interview' },
        { day: 3, startHour: 3, duration: 1, type: 'meeting', label: 'Interview' },
        { day: 3, startHour: 4, duration: 2, type: 'meeting', label: 'Strategy Meeting' },
        { day: 3, startHour: 7, duration: 1, type: 'meeting', label: 'Wrap-up' },
        // Friday
        { day: 4, startHour: 0, duration: 1, type: 'meeting', label: 'Standup' },
        { day: 4, startHour: 1, duration: 2, type: 'meeting', label: 'Sprint Retro' },
        { day: 4, startHour: 4, duration: 1, type: 'meeting', label: 'Demo' },
        { day: 4, startHour: 6, duration: 1, type: 'meeting', label: '1:1' },
    ];

    const getMeetingAtSlot = (day, hour) => {
        return meetings.find(m =>
            m.day === day &&
            hour >= m.startHour &&
            hour < m.startHour + m.duration
        );
    };

    const isStartOfMeeting = (day, hour) => {
        return meetings.find(m => m.day === day && m.startHour === hour);
    };

    // Calculate meeting hours
    const totalMeetingHours = meetings.reduce((sum, m) => sum + m.duration, 0);
    const totalWorkHours = 45;
    const meetingPercentage = Math.round((totalMeetingHours / totalWorkHours) * 100);

    return (
        <div className="bg-gradient-to-br from-red-900/20 via-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-red-500/30 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">The Calendar Autopsy</h2>
                    <p className="text-slate-400 text-sm">A real week. Does this look familiar?</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-red-400">{meetingPercentage}%</div>
                    <div className="text-slate-500 text-xs">in meetings</div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="overflow-x-auto">
                <div className="min-w-[500px]">
                    {/* Header */}
                    <div className="grid grid-cols-6 gap-1 mb-1">
                        <div className="text-slate-600 text-xs p-1"></div>
                        {days.map(day => (
                            <div key={day} className="text-slate-400 text-xs p-1 text-center font-medium">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Time slots */}
                    {hours.map((hour, hourIndex) => (
                        <div key={hour} className="grid grid-cols-6 gap-1 mb-1">
                            <div className="text-slate-600 text-xs p-1 text-right pr-2">{hour}</div>
                            {days.map((day, dayIndex) => {
                                const meeting = getMeetingAtSlot(dayIndex, hourIndex);
                                const isStart = isStartOfMeeting(dayIndex, hourIndex);

                                if (meeting && !isStart) {
                                    return <div key={day} className="h-8"></div>; // Part of longer meeting
                                }

                                if (meeting && isStart) {
                                    return (
                                        <motion.div
                                            key={day}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: (dayIndex + hourIndex) * 0.02 }}
                                            className="bg-red-500/30 border border-red-500/50 rounded text-xs p-1 text-red-300 truncate"
                                            style={{ height: `${meeting.duration * 32 + (meeting.duration - 1) * 4}px` }}
                                        >
                                            {meeting.label}
                                        </motion.div>
                                    );
                                }

                                return (
                                    <motion.div
                                        key={day}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: (dayIndex + hourIndex) * 0.02 }}
                                        className="bg-slate-800/30 border border-slate-700/50 rounded h-8"
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Analysis */}
            <div className="mt-4 p-4 bg-slate-900/50 rounded-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-red-400">{totalMeetingHours}h</div>
                        <div className="text-slate-500 text-xs">in meetings</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-yellow-400">{totalWorkHours - totalMeetingHours}h</div>
                        <div className="text-slate-500 text-xs">"free" (fragmented)</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-500">~2h</div>
                        <div className="text-slate-500 text-xs">actual deep work</div>
                    </div>
                </div>
                <p className="text-slate-400 text-sm text-center mt-3">
                    Those tiny gaps? That's not "free time." That's recovery time. Bathroom breaks. Context-switching.
                    <span className="text-white font-medium"> Where does the actual work happen?</span>
                </p>
            </div>
        </div>
    );
};

// Meeting Worthiness Test - Decision Flowchart
const MeetingWorthinessTest = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [result, setResult] = useState(null);

    const steps = [
        {
            question: "Does this require real-time discussion?",
            yes: 1,
            no: { result: 'async', message: "This could be an email, Slack message, or Loom video." }
        },
        {
            question: "Are decisions being made that need multiple perspectives?",
            yes: 2,
            no: { result: 'async', message: "Sounds like information sharing. A doc or recording works better." }
        },
        {
            question: "Do you specifically need to be in the room?",
            yes: 3,
            no: { result: 'decline', message: "Request notes or a recording instead. Decline with grace." }
        },
        {
            question: "Is the time proposed your best focus time?",
            yes: { result: 'accept', message: "This meeting passes the test. Accept it." },
            no: { result: 'reschedule', message: "Propose a different time that protects your focus blocks." }
        },
    ];

    const handleAnswer = (isYes) => {
        const current = steps[currentStep];
        const next = isYes ? current.yes : current.no;

        if (typeof next === 'number') {
            setCurrentStep(next);
        } else {
            setResult(next);
        }
    };

    const reset = () => {
        setCurrentStep(0);
        setResult(null);
    };

    const resultColors = {
        async: 'from-blue-900/40 to-blue-900/20 border-blue-500/40 text-blue-400',
        decline: 'from-yellow-900/40 to-yellow-900/20 border-yellow-500/40 text-yellow-400',
        reschedule: 'from-purple-900/40 to-purple-900/20 border-purple-500/40 text-purple-400',
        accept: 'from-green-900/40 to-green-900/20 border-green-500/40 text-green-400',
    };

    const resultIcons = {
        async: '📧',
        decline: '🙅',
        reschedule: '📅',
        accept: '✅',
    };

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <HelpCircle className="text-cyan-400" size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">The Meeting Worthiness Test</h3>
                    <p className="text-slate-400 text-sm">Should this meeting exist?</p>
                </div>
            </div>

            {!result ? (
                <div className="space-y-4">
                    {/* Progress */}
                    <div className="flex items-center gap-2 mb-4">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 flex-1 rounded-full ${i <= currentStep ? 'bg-cyan-500' : 'bg-slate-700'}`}
                            />
                        ))}
                    </div>

                    {/* Question */}
                    <div className="bg-slate-900/50 rounded-xl p-6 text-center">
                        <p className="text-white text-lg font-medium mb-6">
                            {steps[currentStep].question}
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => handleAnswer(true)}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/20 text-green-400 font-bold hover:bg-green-500/30 transition-all"
                            >
                                <Check size={18} /> Yes
                            </button>
                            <button
                                onClick={() => handleAnswer(false)}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/20 text-red-400 font-bold hover:bg-red-500/30 transition-all"
                            >
                                <X size={18} /> No
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-gradient-to-br ${resultColors[result.result]} rounded-xl p-6 border text-center`}
                >
                    <div className="text-4xl mb-3">{resultIcons[result.result]}</div>
                    <h4 className={`text-xl font-bold mb-2 ${resultColors[result.result].split(' ').pop()}`}>
                        {result.result === 'async' && 'Make it Async'}
                        {result.result === 'decline' && 'Politely Decline'}
                        {result.result === 'reschedule' && 'Propose New Time'}
                        {result.result === 'accept' && 'Accept the Meeting'}
                    </h4>
                    <p className="text-slate-300 mb-4">{result.message}</p>
                    <button
                        onClick={reset}
                        className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 text-sm hover:bg-slate-600 transition-all"
                    >
                        Test Another Meeting
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// Time Blocking Framework Visual
const TimeBlockingFramework = () => {
    const blocks = [
        { time: '6-8 AM', label: '🧠 Deep Work Block 1', color: 'green', description: 'Most important task. No meetings.' },
        { time: '8-9 AM', label: '📧 Communication Block', color: 'blue', description: 'Email triage, Slack catch-up.' },
        { time: '9-12 PM', label: '🤝 Meeting Window', color: 'yellow', description: 'All meetings scheduled here.' },
        { time: '12-1 PM', label: '🍽️ Lunch + Buffer', color: 'slate', description: 'Actual break. Not "working lunch."' },
        { time: '1-3 PM', label: '🧠 Deep Work Block 2', color: 'green', description: 'Second priority task. Protected.' },
        { time: '3-4 PM', label: '🤝 Meeting Overflow', color: 'yellow', description: 'If morning was full.' },
        { time: '4-5 PM', label: '📋 Admin Block', color: 'purple', description: 'Planning, wrap-up, tomorrow prep.' },
    ];

    const colors = {
        green: 'from-green-900/40 to-green-900/20 border-green-500/40 text-green-400',
        blue: 'from-blue-900/40 to-blue-900/20 border-blue-500/40 text-blue-400',
        yellow: 'from-yellow-900/40 to-yellow-900/20 border-yellow-500/40 text-yellow-400',
        purple: 'from-purple-900/40 to-purple-900/20 border-purple-500/40 text-purple-400',
        slate: 'from-slate-800/40 to-slate-800/20 border-slate-500/40 text-slate-400',
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">The Ideal Day Structure</h2>
            <p className="text-slate-400 mb-6">
                Time blocking isn't about rigidity—it's about intentionality. Here's a template:
            </p>

            <div className="space-y-2">
                {blocks.map((block, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-gradient-to-r ${colors[block.color]} rounded-xl p-4 border backdrop-blur-sm`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-slate-500 text-sm font-mono w-20">{block.time}</div>
                            <div className="flex-1">
                                <div className={`font-bold ${colors[block.color].split(' ').pop()}`}>
                                    {block.label}
                                </div>
                                <div className="text-slate-400 text-sm">{block.description}</div>
                            </div>
                            {block.color === 'green' && (
                                <Lock className="text-green-400" size={18} />
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-cyan-900/20 rounded-xl border border-cyan-500/30">
                <p className="text-cyan-400 text-sm flex items-start gap-2">
                    <Shield size={16} className="flex-shrink-0 mt-0.5" />
                    <span>
                        <strong>Key insight:</strong> The 🧠 blocks are non-negotiable. Your agent will help defend them.
                    </span>
                </p>
            </div>
        </div>
    );
};

// Decline Templates
const DeclineTemplates = () => {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const templates = [
        {
            name: 'The Async Redirect',
            scenario: 'When it could be an email',
            template: `Thanks for thinking to include me! I'm protecting some focus time this week. Could you share the key points in writing? I'll review and respond thoughtfully. If we still need to sync after that, happy to find time.`,
        },
        {
            name: 'The Delegate',
            scenario: 'When you\'re not essential',
            template: `I appreciate the invite! Given my current priorities, I think [NAME] might be better positioned to contribute here. I've CC'd them. Please let me know if there's something specific you need from me that they can't cover.`,
        },
        {
            name: 'The Time Protector',
            scenario: 'When it conflicts with focus time',
            template: `That time is blocked for deep work on [PROJECT]. I'm protective of these blocks because they're when I do my best thinking. Could we look at [ALTERNATIVE TIME]? Or if it's urgent, let me know what specifically you need from me.`,
        },
        {
            name: 'The Scope Reducer',
            scenario: 'When the meeting is too long',
            template: `I can join for the first 30 minutes to cover [SPECIFIC TOPIC]. Would that work? If the full hour is needed, could you send the agenda so I can see which parts need my input specifically?`,
        },
        {
            name: 'The Information Requester',
            scenario: 'When there\'s no agenda',
            template: `Happy to join if it's the best use of everyone's time! Could you share an agenda or the specific decisions we need to make? That'll help me come prepared—or let you know if I can contribute async instead.`,
        },
    ];

    const handleCopy = (index, template) => {
        navigator.clipboard.writeText(template);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Meeting Decline Templates</h2>
            <p className="text-slate-400 mb-6">
                Say no gracefully. Copy and customize.
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

// Focus Block Builder
const FocusBlockBuilder = () => {
    const [blocks, setBlocks] = useState([
        { day: 'Monday', time: '6:00 AM - 8:00 AM', active: true },
        { day: 'Tuesday', time: '6:00 AM - 8:00 AM', active: true },
        { day: 'Wednesday', time: '6:00 AM - 8:00 AM', active: true },
        { day: 'Thursday', time: '6:00 AM - 8:00 AM', active: true },
        { day: 'Friday', time: '6:00 AM - 8:00 AM', active: true },
    ]);

    const toggleBlock = (index) => {
        setBlocks(blocks.map((b, i) => i === index ? { ...b, active: !b.active } : b));
    };

    const activeCount = blocks.filter(b => b.active).length;
    const weeklyHours = activeCount * 2;

    return (
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-6 border border-green-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Brain className="text-green-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Your Focus Block Schedule</h3>
                        <p className="text-slate-400 text-sm">Lock in your deep work time</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-green-400">{weeklyHours}h</span>
                    <span className="text-slate-500 text-xs block">/week protected</span>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                {blocks.map((block, i) => (
                    <div
                        key={i}
                        onClick={() => toggleBlock(i)}
                        className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${block.active
                                ? 'bg-green-900/30 border border-green-500/30'
                                : 'bg-slate-900/50 border border-slate-700 opacity-50'
                            }`}
                    >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${block.active
                                ? 'bg-green-500 text-white'
                                : 'bg-slate-700 text-slate-400'
                            }`}>
                            {block.active ? <Lock size={12} /> : <Unlock size={12} />}
                        </div>
                        <span className={`font-medium ${block.active ? 'text-white' : 'text-slate-500'}`}>
                            {block.day}
                        </span>
                        <span className="text-slate-400 text-sm ml-auto">{block.time}</span>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-slate-900/50 rounded-xl">
                <p className="text-slate-400 text-sm">
                    <strong className="text-green-400">Pro tip:</strong> Block these in your calendar as "Focus Time" with
                    auto-decline enabled. Your Calendar Defense Agent will help enforce them.
                </p>
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
// CHAPTER 8 MAIN COMPONENT
// ============================================

const Chapter8 = () => {
    const [speedRun, setSpeedRun] = useState(false);

    const scrollToCalculator = () => {
        document.getElementById('meeting-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const calendarDefensePrompt = `You are my Calendar Defense Agent. Your job is to protect my time and help me evaluate meeting requests.

MY WORK CONTEXT:
- Role: [Your role]
- Protected focus times: [e.g., 6-8 AM daily, 1-3 PM daily]
- Meeting-friendly windows: [e.g., 9 AM-12 PM]
- VIP people (always accept): [e.g., direct manager, key clients]
- Auto-decline categories: [e.g., vendor demos, "quick syncs" without agenda]

WHEN I SHARE A MEETING INVITE, EVALUATE:
1. Does this need to be a meeting? (Could it be async?)
2. Do I need to be there? (Or can someone else cover?)
3. Is the time appropriate? (Does it conflict with focus time?)
4. Is there an agenda? (No agenda = probably not necessary)
5. Is the duration appropriate? (Most meetings should be 25 or 50 min, not 30/60)

OUTPUT FORMAT:
📊 Meeting Assessment:
- Necessity Score: [1-5]
- My Required Presence: [Essential/Helpful/Optional]
- Time Conflict: [Yes/No]
- Recommendation: [Accept/Decline/Propose Alternative/Request Agenda]

📝 Suggested Response: [If declining or proposing alternative]

Help me protect my deep work time while maintaining good relationships.`;

    const meetingPrepPrompt = `You are my Meeting Prep Agent. Before important meetings, help me prepare efficiently.

WHEN I TELL YOU ABOUT AN UPCOMING MEETING:

1. ASK ME:
   - What's the meeting about?
   - Who's attending?
   - What outcome do I want?
   - Any background context?

2. HELP ME PREPARE:
   - Key points I should raise
   - Questions I should ask
   - Potential objections to anticipate
   - One-page summary of relevant context

3. AFTER THE MEETING (if I share notes):
   - Extract action items
   - Identify follow-ups needed
   - Draft any necessary follow-up emails
   - Update my task list

OUTPUT FORMAT:
📋 Pre-Meeting Brief:
- Objective: [What success looks like]
- My Key Points: [Bullet points]
- Questions to Ask: [List]
- Watch Out For: [Potential issues]

Keep prep under 5 minutes. I want to be prepared, not over-prepared.`;

    const weeklyCalendarReviewPrompt = `You are my Weekly Calendar Review Agent. Every Sunday (or when I check in), help me prepare for the week ahead.

WEEKLY REVIEW PROCESS:

1. CALENDAR AUDIT:
   - How many hours of meetings this week?
   - Are my focus blocks protected?
   - Any back-to-back meeting marathons?
   - Any meetings without agendas?

2. OPTIMIZATION OPPORTUNITIES:
   - Meetings that could be combined?
   - Meetings that could be shortened?
   - Meetings that could be async?
   - Time to add buffer blocks?

3. PREP NEEDED:
   - Which meetings need advance prep?
   - Any high-stakes meetings to prepare for?
   - Materials I need to review?

4. WEEK AHEAD SETUP:
   - Block focus time for key priorities
   - Identify "must protect" time
   - Plan meeting-free day if possible

OUTPUT FORMAT:
📅 Week Overview:
- Total meeting hours: X
- Focus time available: X
- Meeting-free blocks: X

⚠️ Watch Out:
- [Specific concerns]

✅ Prep Needed:
- [Meetings requiring preparation]

Help me enter each week with my calendar under control.`;

    return (            <Helmet>
                <title>Chapter 8: Calendar Defense | Agentic AI at Home</title>
                <meta name="description" content="Protect your time from meeting creep and reclaim your schedule" />
            </Helmet>

        <SpeedRunContext.Provider value={speedRun}>
            <div className="min-h-screen bg-[#0f0f1a]">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    {/* Progress Bar with Part indicator */}
                    <ChapterProgress
                        current={8}
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
                        <div className="text-cyan-400 font-mono text-sm mb-2">Chapter 8</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Calendar Defense
                        </h1>
                        <p className="text-xl text-slate-400 mb-4">
                            Stop letting meetings eat your life
                        </p>

                        {/* Reading time + Speed Run toggle */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4 text-slate-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} />
                                    <span>10 min read</span>
                                </div>
                                <span>•</span>
                                <span className="text-purple-400">15 min to reclaim your calendar</span>
                            </div>
                            <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                        </div>
                    </motion.div>

                    {/* TL;DR Card */}
                    <TLDRCard
                        stats={[
                            { value: '10+', label: 'hrs/week reclaimed' },
                            { value: '4', label: 'question filter' },
                            { value: '2h', label: 'daily focus protected' },
                        ]}
                        primaryCTA="Audit My Calendar"
                        onCTAClick={scrollToCalculator}
                    />

                    <PasswordGate partNumber={3}>
                        {/* CAPTAIN EFFICIENCY - OPENER */}
                    {!speedRun && (
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="Email is conquered. Now we face the other time thief: your calendar. The average professional spends 31 hours per month in unproductive meetings. That's almost 4 full workdays—gone. Today we install a bouncer at the door. Every meeting request will need to earn its place on your calendar."
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
                                Showing only the essential prompts and frameworks. Toggle off for full context.
                            </p>
                        </motion.div>
                    )}

                    {/* ★ CALENDAR AUTOPSY ★ */}
                    {!speedRun && <CalendarAutopsyVisual />}

                    {/* MEETING AUDIT CALCULATOR */}
                    <section id="meeting-calculator" className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                            <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Audit Your Calendar</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                        </div>

                        <Suspense fallback={
                            <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                Loading calculator...
                            </div>
                        }>
                            <MeetingAuditCalculator />
                        </Suspense>
                    </section>

                    {/* MEETING WORTHINESS TEST */}
                    <MeetingWorthinessTest />

                    {/* TIME BLOCKING FRAMEWORK */}
                    {!speedRun && <TimeBlockingFramework />}

                    {/* AGENT 1: CALENDAR DEFENSE */}
                    <QuickWin
                        title="Agent 1: The Calendar Defender"
                        setupTime="10 min"
                        prompt={calendarDefensePrompt}
                        variant="default"
                    />

                    {/* FOCUS BLOCK BUILDER */}
                    {!speedRun && <FocusBlockBuilder />}

                    {/* AGENT 2: MEETING PREP */}
                    <QuickWin
                        title="Agent 2: The Meeting Prep Assistant"
                        setupTime="5 min"
                        prompt={meetingPrepPrompt}
                        variant="secondary"
                    />

                    {/* DECLINE TEMPLATES */}
                    {!speedRun && <DeclineTemplates />}

                    {/* AGENT 3: WEEKLY CALENDAR REVIEW */}
                    <QuickWin
                        title="Agent 3: Weekly Calendar Review"
                        setupTime="5 min"
                        prompt={weeklyCalendarReviewPrompt}
                        variant="tertiary"
                    />

                    {/* CASE STUDY */}
                    {!speedRun && (
                        <CaseStudyCard
                            name="Rachel"
                            role="Engineering manager, 8 direct reports"
                            problem="35+ hours/week in meetings. Zero deep work. Coding on weekends just to keep up."
                            result="18 hours/week meetings. 3 focus blocks daily. Actually leading instead of just attending."
                            timeframe="1 month"
                            quote="I used to accept every meeting by default. Now my default is 'Does this need me?' My team actually respects me more for protecting my time."
                        />
                    )}

                    {/* SHAREABLE QUOTE */}
                    <ShareableQuote
                        quote="Every meeting is a trade. You're trading an hour of your life. Make sure you're getting something worth an hour in return."
                        chapter={8}
                    />

                                            {/* CAPTAIN EFFICIENCY - CLOSER */}
                    {!speedRun && (
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="celebrating"
                                message="Your calendar has a bouncer now. The Meeting Worthiness Test filters requests. Your focus blocks are locked. And you have templates to decline gracefully. But there's one more piece of digital chaos we haven't touched: all those admin tasks that nibble away at your time—bills, paperwork, subscriptions, the stuff that's not hard but never stops. Let's automate that too. 📋"
                            />
                        </Suspense>
                    )}

                    {/* CHAPTER COMPLETE */}
                    <ChapterComplete
                        achievements={[
                            'Calendar Defense Agent (meeting filter)',
                            'Meeting Prep Assistant (5-min prep)',
                            'Weekly Calendar Review system',
                            'Meeting Worthiness Test framework',
                            'Focus block schedule created',
                            'Decline templates library',
                        ]}
                        nextChapter={9}
                        nextTitle="Admin & Paperwork"
                    />

                </PasswordGate>
                <ChapterNavigation
                    previousChapter="/part3/chapter1"
                    nextChapter="/part3/chapter3"
                    partNumber={3}
                    chapterNumber={2}
                />






                </div>
            </div>
        </SpeedRunContext.Provider>
    );
};

export default Chapter8;