import React, { useState, Suspense, createContext, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WebbookLayout from '../../components/layout/WebbookLayout';
import PasswordGate from '../../components/common/PasswordGate';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sun, Sparkles, Share2, Copy, Eye, EyeOff, Coffee, Calendar,
    AlertTriangle, Target, Mail, CloudSun, Bell, Smartphone,
    Play, Pause, RotateCcw, Check, X, HelpCircle, Sunrise
} from 'lucide-react';

// Lazy load interactive components
const MorningChaosCalculator = React.lazy(() => import('../../components/MorningChaosCalculator'));
const MorningBriefBuilder = React.lazy(() => import('../../components/MorningBriefBuilder'));
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

const QuickWin = ({ title, prompt, setupTime }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 rounded-2xl p-6 border border-green-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Zap className="text-green-400" size={20} />
                    <span className="text-green-400 font-bold uppercase text-sm tracking-wider">Quick Win</span>
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

const ChapterComplete = ({ achievements, nextChapter, nextTitle }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="text-green-400" size={24} />
                </div>
                <div>
                    <span className="text-green-400 font-bold block">Chapter 4 Complete</span>
                    <span className="text-slate-400 text-sm">You're 25% of the way there</span>
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

            <button
                onClick={() => navigate(nextChapter)}
                className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-4 rounded-xl transition-all"
            >
                Continue to Chapter {typeof nextChapter === 'string' && nextChapter.includes('chapter') ? nextChapter.split('chapter')[1] : nextChapter}: {nextTitle}
                <ArrowRight size={18} />
            </button>
        </div>
    );
};

// ============================================
// CHAPTER 4 SPECIFIC COMPONENTS
// ============================================

// Morning Timeline Comparison
const MorningTimeline = () => {
    const beforeItems = [
        { time: '6:00', task: 'Alarm goes off', icon: Bell, status: 'chaos' },
        { time: '6:05', task: 'Check phone (emails, news, social)', icon: Smartphone, status: 'chaos' },
        { time: '6:15', task: 'Try to remember today\'s schedule', icon: Calendar, status: 'chaos' },
        { time: '6:20', task: 'Check weather app', icon: CloudSun, status: 'chaos' },
        { time: '6:25', task: 'Look for that important email', icon: Mail, status: 'chaos' },
        { time: '6:35', task: 'Finally start getting ready', icon: Coffee, status: 'chaos' },
    ];

    const afterItems = [
        { time: '6:00', task: 'Alarm goes off', icon: Bell, status: 'good' },
        { time: '6:01', task: 'Read Morning Brief (30 seconds)', icon: Sunrise, status: 'good' },
        { time: '6:02', task: 'Know exactly what today looks like', icon: CheckCircle, status: 'good' },
        { time: '6:03', task: 'Start getting ready with clarity', icon: Coffee, status: 'good' },
    ];

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">The Morning Transformation</h2>
            <p className="text-slate-400 mb-6">
                Same wake-up time. Completely different start.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="bg-red-900/10 rounded-2xl p-5 border border-red-500/30">
                    <div className="flex items-center gap-2 mb-4">
                        <X className="text-red-400" size={18} />
                        <span className="text-red-400 font-bold uppercase text-sm tracking-wider">Before</span>
                        <span className="text-slate-500 text-xs ml-auto">35 min of chaos</span>
                    </div>
                    <div className="space-y-3">
                        {beforeItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-slate-600 text-xs font-mono w-12">{item.time}</span>
                                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                                    <item.icon className="text-red-400" size={14} />
                                </div>
                                <span className="text-slate-400 text-sm">{item.task}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* After */}
                <div className="bg-green-900/10 rounded-2xl p-5 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-4">
                        <Check className="text-green-400" size={18} />
                        <span className="text-green-400 font-bold uppercase text-sm tracking-wider">After</span>
                        <span className="text-slate-500 text-xs ml-auto">3 min to clarity</span>
                    </div>
                    <div className="space-y-3">
                        {afterItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-slate-600 text-xs font-mono w-12">{item.time}</span>
                                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                                    <item.icon className="text-green-400" size={14} />
                                </div>
                                <span className="text-slate-300 text-sm">{item.task}</span>
                            </div>
                        ))}
                    </div>

                    {/* Time saved callout */}
                    <div className="mt-4 pt-4 border-t border-green-500/20">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Time saved:</span>
                            <span className="text-green-400 font-bold text-xl">32 min/day</span>
                        </div>
                        <p className="text-slate-500 text-xs mt-1">
                            That's 194 hours/year you get back.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Platform Setup Tabs
const PlatformSetup = () => {
    const [activePlatform, setActivePlatform] = useState('claude');

    const platforms = {
        claude: {
            name: 'Claude',
            color: 'orange',
            steps: [
                'Go to claude.ai and start a new conversation',
                'Paste the Morning Brief prompt below',
                'Answer Claude\'s setup questions',
                'Ask Claude to save this as a "Project" for daily use',
                'Set a phone reminder: "Check Claude Morning Brief"',
            ],
            tip: 'Claude remembers context within a conversation. Start a new "Morning Brief" chat each week to keep context fresh.',
        },
        chatgpt: {
            name: 'ChatGPT',
            color: 'green',
            steps: [
                'Go to chat.openai.com and start a new chat',
                'Paste the Morning Brief prompt below',
                'Answer the setup questions',
                'Click "Create GPT" to save as a custom assistant (Plus required)',
                'Or: Pin this conversation for easy access',
            ],
            tip: 'With ChatGPT Plus, you can create a custom GPT that remembers your preferences permanently.',
        },
        gemini: {
            name: 'Gemini',
            color: 'blue',
            steps: [
                'Go to gemini.google.com',
                'Paste the Morning Brief prompt below',
                'Gemini can pull from your Google Calendar automatically',
                'Enable Google Workspace integration for best results',
                'Use the Gemini app for mobile notifications',
            ],
            tip: 'Gemini\'s strength is Google integration. It can read your Calendar and Gmail directly if you grant access.',
        },
    };

    const platform = platforms[activePlatform];

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
            {/* Tab buttons */}
            <div className="flex border-b border-slate-700">
                {Object.entries(platforms).map(([key, p]) => (
                    <button
                        key={key}
                        onClick={() => setActivePlatform(key)}
                        className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${activePlatform === key
                            ? 'bg-slate-800/50 text-white border-b-2 border-cyan-500'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-4">
                    Setup for {platform.name}
                </h3>

                <div className="space-y-3 mb-6">
                    {platform.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold flex-shrink-0">
                                {i + 1}
                            </div>
                            <span className="text-slate-300 text-sm">{step}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-yellow-900/20 rounded-xl p-4 border border-yellow-500/30">
                    <div className="flex items-start gap-2">
                        <Sparkles className="text-yellow-400 flex-shrink-0 mt-0.5" size={16} />
                        <div>
                            <span className="text-yellow-400 font-bold text-sm">Pro tip:</span>
                            <p className="text-slate-300 text-sm mt-1">{platform.tip}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Week One Milestones
const WeekOneMilestones = () => {
    const days = [
        { day: 1, title: 'Setup Day', desc: 'Create your Morning Brief agent, answer setup questions', icon: '🛠️' },
        { day: 2, title: 'First Real Brief', desc: 'Wake up to your first AI-generated morning summary', icon: '🌅' },
        { day: 3, title: 'Refinement', desc: 'Tell your agent what was helpful vs. not helpful', icon: '✏️' },
        { day: 4, title: 'Habit Forming', desc: 'It starts feeling automatic—check brief, start day', icon: '🔄' },
        { day: 5, title: 'Tweaking', desc: 'Add/remove info based on what you actually use', icon: '⚙️' },
        { day: 6, title: 'Weekend Test', desc: 'Does your weekend brief need different info?', icon: '📅' },
        { day: 7, title: 'Review', desc: 'Compare this week to last week. Notice the difference?', icon: '📊' },
    ];

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Your First Week</h2>
            <p className="text-slate-400 mb-6">
                What to expect as you build the habit:
            </p>

            <div className="grid grid-cols-7 gap-2">
                {days.map((day) => (
                    <div
                        key={day.day}
                        className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-3 border border-slate-500/40 backdrop-blur-sm text-center"
                    >
                        <div className="text-2xl mb-2">{day.icon}</div>
                        <div className="text-cyan-400 font-bold text-xs">Day {day.day}</div>
                        <div className="text-white font-medium text-xs mt-1">{day.title}</div>
                        <div className="text-slate-500 text-[10px] mt-1 hidden md:block">{day.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Troubleshooting Accordion
const TroubleshootingAccordion = () => {
    const [openItem, setOpenItem] = useState(null);

    const items = [
        {
            id: 'too-long',
            question: 'My brief is too long / overwhelming',
            answer: 'Tell your agent: "Make the brief more concise. Limit to 5 bullet points max. Only include things I need to act on today." You can also ask for a TL;DR at the top.',
        },
        {
            id: 'too-short',
            question: 'My brief is missing important info',
            answer: 'Ask: "Add [weather/commute time/kids\' schedule/etc.] to my morning brief." Be specific about what you want included.',
        },
        {
            id: 'forget',
            question: 'I keep forgetting to check it',
            answer: 'Set a phone alarm labeled "Morning Brief" for 1 minute after your wake-up alarm. Put the AI app on your home screen. Or ask Siri/Google to "read my morning brief."',
        },
        {
            id: 'stale',
            question: 'The information feels stale/repeated',
            answer: 'Your agent needs fresh context. Once a week, tell it what changed: new projects, schedule shifts, priorities. Or start a fresh conversation weekly.',
        },
        {
            id: 'no-calendar',
            question: 'My AI can\'t access my calendar',
            answer: 'Option 1: Use Gemini (native Google Calendar access). Option 2: Copy-paste today\'s calendar into your chat. Option 3: Use Zapier to email you a daily calendar summary, then share with your agent.',
        },
    ];

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle className="text-cyan-400" size={24} />
                Troubleshooting
            </h2>
            <p className="text-slate-400 mb-6">
                Common issues and quick fixes:
            </p>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl border border-slate-500/40 backdrop-blur-sm overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/30 transition-colors"
                        >
                            <span className="text-white font-medium">{item.question}</span>
                            {openItem === item.id ? (
                                <ChevronUp size={18} className="text-cyan-400" />
                            ) : (
                                <ChevronDown size={18} className="text-slate-400" />
                            )}
                        </button>

                        <AnimatePresence>
                            {openItem === item.id && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-4 pb-4 pt-0 border-t border-slate-700">
                                        <p className="text-slate-300 text-sm pt-4">{item.answer}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
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
// CHAPTER 4 MAIN COMPONENT
// ============================================

const Chapter4 = () => {
    const [speedRun, setSpeedRun] = useState(false);
    const navigate = useNavigate();

    const scrollToCalculator = () => {
        document.getElementById('chaos-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const morningBriefPrompt = `You are my Morning Brief Agent. Every morning, I'll check in with you for a quick summary to start my day right.

Here's what I need in my brief:
1. TODAY'S SCHEDULE: What's on my calendar? Any conflicts or tight transitions?
2. WEATHER: Temperature and conditions. Do I need an umbrella or jacket?
3. TOP 3 PRIORITIES: What must get done today? (based on deadlines, importance)
4. HEADS UP: Anything coming up in the next 2-3 days I should prep for?
5. ONE THING: A quick motivational thought or reminder based on my goals.

Format: Keep it scannable. Bullet points. No fluff. I should be able to read it in 30 seconds.

Before generating briefs, ask me:
- What time do I usually wake up?
- What's my work situation (office, remote, hybrid)?
- Do I have kids/family morning responsibilities?
- What are my current top priorities or projects?
- Any recurring events I should always know about?`;

    return (
        <WebbookLayout>
            <PasswordGate partNumber={2} chapterNumber={4}>
                <SpeedRunContext.Provider value={speedRun}>
                    <div className="min-h-screen bg-[#0f0f1a]">
                        <div className="max-w-4xl mx-auto px-6 py-12">

                            {/* Progress Bar with Part indicator */}
                            <ChapterProgress
                                current={4}
                                total={16}
                                part={2}
                                partTitle="Daily Operations"
                            />

                            {/* Author Credibility */}
                            <AuthorCredibility />

                            {/* Chapter Navigation */}
                            <ChapterNavigation
                                previousChapter="/part1/chapter3"
                                nextChapter="/part2/chapter2"
                                partNumber={2}
                                chapterNumber={4}
                            />

                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6"
                            >
                                <div className="text-cyan-400 font-mono text-sm mb-2">Chapter 4</div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    Morning Routines
                                </h1>
                                <p className="text-xl text-slate-400 mb-4">
                                    Build the agent you'll actually use every single day
                                </p>

                                {/* Reading time + Speed Run toggle */}
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-4 text-slate-500 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} />
                                            <span>8 min read</span>
                                        </div>
                                        <span>•</span>
                                        <span className="text-orange-400">15 min to build your brief</span>
                                    </div>
                                    <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                                </div>
                            </motion.div>

                            {/* TL;DR Card */}
                            <TLDRCard
                                stats={[
                                    { value: '30 min', label: 'saved daily' },
                                    { value: '30 sec', label: 'to read brief' },
                                    { value: '15 min', label: 'one-time setup' },
                                ]}
                                primaryCTA="Calculate My Chaos"
                                onCTAClick={scrollToCalculator}
                            />

                            {/* CAPTAIN EFFICIENCY - OPENER (Energetic/Practical) */}
                            {!speedRun && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="default"
                                        message="Enough theory. Time to build something you'll use EVERY SINGLE DAY. The Morning Brief Agent is about to become your favorite 30 seconds of the day. By tomorrow morning, you'll wonder how you ever started your day without it. Let's build it."
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
                                        Showing only the essential prompts and tools. Toggle off to see the full chapter.
                                    </p>
                                </motion.div>
                            )}

                            {/* ★ TOOL FIRST: Morning Chaos Calculator ★ */}
                            <section id="chaos-calculator" className="mb-10">
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
                                    <MorningChaosCalculator />
                                </Suspense>
                            </section>

                            {/* MORNING TIMELINE COMPARISON */}
                            {!speedRun && <MorningTimeline />}

                            {/* THE CORE PROMPT - Quick Win */}
                            <QuickWin
                                title="The Morning Brief Prompt"
                                setupTime="15 min"
                                prompt={morningBriefPrompt}
                            />

                            {/* PLATFORM-SPECIFIC SETUP */}
                            {!speedRun && <PlatformSetup />}

                            {/* MORNING BRIEF BUILDER */}
                            <section className="mb-10">
                                <h2 className="text-2xl font-bold text-white mb-2">Customize Your Brief</h2>
                                <p className="text-slate-400 mb-6">
                                    Use this builder to create a personalized Morning Brief prompt:
                                </p>

                                <Suspense fallback={
                                    <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                        Loading builder...
                                    </div>
                                }>
                                    <MorningBriefBuilder />
                                </Suspense>
                            </section>

                            {/* WEEK ONE MILESTONES */}
                            {!speedRun && <WeekOneMilestones />}

                            {/* TROUBLESHOOTING */}
                            {!speedRun && <TroubleshootingAccordion />}

                            {/* CASE STUDY */}
                            {!speedRun && (
                                <CaseStudyCard
                                    name="David"
                                    role="Software engineer, father of 2"
                                    problem="Checked 6 apps before breakfast. Often forgot kid's activities or deadlines."
                                    result="One 30-second brief. Zero forgotten events. Calmer mornings for the whole family."
                                    timeframe="1 week"
                                    quote="My wife noticed the difference before I did. I'm just... less frantic now. The day starts smoothly instead of in chaos."
                                />
                            )}

                            {/* SHAREABLE QUOTE */}
                            <ShareableQuote
                                quote="The best morning routine isn't about waking up earlier. It's about waking up smarter."
                                chapter={4}
                            />

                            {/* CAPTAIN EFFICIENCY - CLOSER (Celebrating First Win) */}
                            {!speedRun && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="celebrating"
                                        message="You just built your first real agent. Not a chatbot you ask questions. An AGENT that works while you sleep and greets you with exactly what you need. Tomorrow morning is going to feel different. That's not hype—that's the system working. Now let's tackle what happens AFTER the morning brief: your kitchen. 🍳"
                                    />
                                </Suspense>
                            )}

                            {/* CHAPTER COMPLETE */}
                            <ChapterComplete
                                achievements={[
                                    'Calculated your morning chaos cost',
                                    'Built your personalized Morning Brief Agent',
                                    'Know how to refine it over Week 1',
                                    'Troubleshooting tools if something goes wrong',
                                ]}
                                nextChapter="/part2/chapter2"
                                nextTitle="Kitchen & Grocery"
                            />

                            {/* Bottom Navigation */}
                            <ChapterNavigation
                                previousChapter="/part1/chapter3"
                                nextChapter="/part2/chapter2"
                                partNumber={2}
                                chapterNumber={4}
                            />

                        </div>
                    </div>
                </SpeedRunContext.Provider>
            </PasswordGate>
        </WebbookLayout>
    );
};

export default Chapter4;