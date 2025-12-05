import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';

import React, { useState, Suspense, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Brain, Sparkles, Share2, Copy, Eye, EyeOff, Database, Hand,
    Activity, Target, HelpCircle, DollarSign, Lightbulb, Shield,
    Users, Crosshair
} from 'lucide-react';

// Game Components
import MissionBriefing from '../../components/gamification/MissionBriefing';
import MissionComplete from '../../components/gamification/MissionComplete';
import ObjectivesChecklist from '../../components/gamification/ObjectivesChecklist';
import IntelReport from '../../components/gamification/IntelReport';
import FutureProofBanner from '../../components/gamification/FutureProofBanner';
import AgentCardUnlock from '../../components/gamification/AgentCardUnlock';
import ChapterNavigation from '../../components/common/ChapterNavigation';

// Lazy load interactive components
const ToolRecommendationQuiz = React.lazy(() => import('../../components/ToolRecommendationQuiz'));
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// AGENT CARD DEFINITIONS
// ============================================

const taskDelegateCard = {
    id: 'task_delegate',
    name: 'Task Delegate Agent',
    category: 'Daily Ops',
    rarity: 'Common',
    power: 48,
    description: 'Transforms any recurring task into an automated check-in system. Never forget the small stuff again.',
    emoji: '📋',
    prompt: `I have a recurring task I always forget: [YOUR TASK].

Act as my personal task agent. Ask me:
- When does this typically need to happen?
- What information do you need to help me?
- What does "done" look like?

Then create:
1. A weekly/daily check-in message
2. The exact questions to ask each time
3. How to track completion

Save this as "Agent: [Task Name]" for future use.`,
    unlockMessage: "You've recruited your first operational agent! This one handles the tasks that slip through the cracks."
};

const aiStackAdvisorCard = {
    id: 'ai_stack_advisor',
    name: 'AI Stack Advisor',
    category: 'Daily Ops',
    rarity: 'Rare',
    power: 62,
    description: 'Analyzes your digital ecosystem and recommends the optimal AI tools for your workflow.',
    emoji: '🧩',
    prompt: `Analyze my current digital setup and recommend my AI stack:

My ecosystem:
- Primary email: [Gmail/Outlook/Other]
- Calendar: [Google/Outlook/Apple/Other]
- Notes: [Notion/Obsidian/Apple Notes/Other]
- Priority: [Privacy/Integration/Cost/Ease of use]

Based on this, recommend:
1. Which AI "Brain" I should start with
2. What tools to use for Memory, Hands, and Nerves
3. Total monthly cost estimate
4. First 3 integrations to set up`,
    unlockMessage: "Your stack advisor is online. It'll help anyone build the perfect AI toolkit for their workflow."
};

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
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
            : 'bg-slate-800/30 text-slate-400 border border-slate-500/40 hover:border-slate-400 backdrop-blur-sm'
            }`}
    >
        {enabled ? <Eye size={16} /> : <EyeOff size={16} />}
        {enabled ? 'Blitz Mode: ON' : 'Blitz Mode: OFF'}
    </button>
);

const StoryHook = ({ hook, fullStory }) => {
    const [expanded, setExpanded] = useState(false);
    const blitzMode = useContext(BlitzModeContext);

    if (blitzMode) return null;

    return (
        <div className="relative bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-8 border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
            <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-0">{hook}</p>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 mt-4 border-t border-slate-600 prose prose-invert prose-sm max-w-none">
                            {fullStory}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-cyan-400 text-sm mt-4 hover:text-cyan-300 transition-colors"
            >
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {expanded ? 'Show less' : 'Read the full briefing'}
            </button>
        </div>
    );
};

const ShareableQuote = ({ quote, operation }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`"${quote}" — AI Frontier Adventure, Discovery ${operation}`);
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
                    <span className="text-slate-400 text-sm">— Operation {operation}</span>
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

const DeepDive = ({ title, children }) => {
    const [expanded, setExpanded] = useState(false);
    const blitzMode = useContext(BlitzModeContext);

    if (blitzMode) return null;

    return (
        <div className="bg-purple-900/20 rounded-xl border border-purple-500/40 backdrop-blur-sm mb-6 overflow-hidden">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-purple-900/30 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Brain className="text-purple-400" size={18} />
                    <span className="text-purple-400 font-medium text-sm">Intel Brief:</span>
                    <span className="text-white font-medium">{title}</span>
                </div>
                {expanded ? <ChevronUp size={18} className="text-purple-400" /> : <ChevronDown size={18} className="text-purple-400" />}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 border-t border-purple-500/20">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ============================================
// OPERATION 2 SPECIFIC COMPONENTS
// ============================================

// The 4-Role Card (visual, not paragraph)
const RoleCard = ({ emoji, title, subtitle, description, examples, color, isFirst }) => {
    const colors = {
        green: { bg: 'from-green-900/40 to-green-900/20', border: 'border-green-500/40', text: 'text-green-400' },
        orange: { bg: 'from-orange-900/40 to-orange-900/20', border: 'border-orange-500/40', text: 'text-orange-400' },
        cyan: { bg: 'from-cyan-900/40 to-cyan-900/20', border: 'border-cyan-500/40', text: 'text-cyan-400' },
        purple: { bg: 'from-purple-900/40 to-purple-900/20', border: 'border-purple-500/40', text: 'text-purple-400' },
    };

    const c = colors[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative bg-gradient-to-br ${c.bg} rounded-xl p-5 border ${c.border} backdrop-blur-sm`}
        >
            {isFirst && (
                <div className="absolute -top-3 left-4 bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                    START HERE
                </div>
            )}
            <div className="flex items-start gap-4">
                <div className="text-4xl">{emoji}</div>
                <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-bold ${c.text}`}>{title}</h3>
                    <p className="text-slate-400 text-sm mb-2">{subtitle}</p>
                    <p className="text-slate-300 text-sm mb-3">{description}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {examples.map((ex, i) => (
                            <span key={i} className="bg-slate-900/60 text-slate-400 text-xs px-2 py-1 rounded">
                                {ex}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Decision Tree Component
const DecisionTree = () => {
    const [answer, setAnswer] = useState(null);

    const recommendations = {
        google: { name: 'Gemini', reason: 'Deep integration with your existing Google tools' },
        microsoft: { name: 'Microsoft Copilot', reason: 'Already in your Microsoft 365 workflow' },
        privacy: { name: 'Claude', reason: 'Best balance of capability and data handling' },
        unsure: { name: 'Claude', reason: 'Most versatile starting point—you can always switch' },
    };

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Crosshair className="text-cyan-400" size={20} />
                Choose Your Brain
            </h3>

            {answer === null ? (
                <div className="space-y-3">
                    <p className="text-slate-400 text-sm mb-4">What's your primary ecosystem?</p>

                    {[
                        { id: 'google', label: 'Google (Gmail, Calendar, Docs)', emoji: '🔵' },
                        { id: 'microsoft', label: 'Microsoft (Outlook, Word, Teams)', emoji: '🟢' },
                        { id: 'privacy', label: 'Privacy is my priority', emoji: '🔒' },
                        { id: 'unsure', label: "I don't know / Mixed", emoji: '🤷' },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setAnswer(option.id)}
                            className="w-full flex items-center gap-3 bg-slate-900/50 hover:bg-slate-900 border border-slate-700 hover:border-cyan-500/50 rounded-xl p-4 text-left transition-all"
                        >
                            <span className="text-xl">{option.emoji}</span>
                            <span className="text-slate-200">{option.label}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 mb-4">
                        <CheckCircle className="text-cyan-400" size={32} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">
                        Target Acquired: {recommendations[answer].name}
                    </h4>
                    <p className="text-slate-400 mb-4">
                        {recommendations[answer].reason}
                    </p>
                    <button
                        onClick={() => setAnswer(null)}
                        className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
                    >
                        ← Reassess
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// Minimum Viable Stack Visual
const MinimumViableStack = () => (
    <div className="bg-gradient-to-br from-green-900/20 to-cyan-900/20 rounded-2xl p-6 border border-green-500/40 backdrop-blur-sm mb-8">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Shield className="text-green-400" size={20} />
                Your Starter Kit
            </h3>
            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                READY TO GO
            </span>
        </div>

        <div className="space-y-3 mb-6">
            {[
                { role: '🧠 BRAIN', tool: 'Claude or ChatGPT', cost: '$0-20/mo' },
                { role: '📚 MEMORY', tool: 'Apple Notes, Google Keep, or Notion', cost: 'Free' },
                { role: '✋ HANDS', tool: 'Your calendar + reminders app', cost: 'Free' },
                { role: '⚡ NERVES', tool: '(Set up in Discovery 13)', cost: '—' },
            ].map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                        <span className="text-lg">{item.role.split(' ')[0]}</span>
                        <div>
                            <span className="text-cyan-400 font-bold text-xs">{item.role.split(' ')[1]}</span>
                            <span className="text-slate-300 text-sm ml-2">{item.tool}</span>
                        </div>
                    </div>
                    <span className="text-green-400 text-xs font-medium">{item.cost}</span>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-900/50 rounded-xl">
            <div className="text-center">
                <div className="text-2xl font-bold text-green-400">$0-20</div>
                <div className="text-xs text-slate-400">/month</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">30 min</div>
                <div className="text-xs text-slate-400">setup + tuning</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">70%</div>
                <div className="text-xs text-slate-400">of benefits</div>
            </div>
        </div>
    </div>
);

// The 20-Minute Task Killer Protocol
const TaskKillerProtocol = ({ onComplete }) => {
    const [copiedStep, setCopiedStep] = useState(null);
    const [completedSteps, setCompletedSteps] = useState([]);

    const steps = [
        {
            num: 1,
            title: 'Deploy your chosen Brain',
            description: 'Claude, ChatGPT, Gemini, or Copilot—whichever you selected above',
            prompt: null,
        },
        {
            num: 2,
            title: 'Brief it on your recurring task',
            description: 'The one you identified in Operation 1',
            prompt: `I have a recurring task I always forget: [YOUR TASK FROM OPERATION 1].

I want you to act as my agent for this. Ask me questions about:
- When this typically needs to happen
- What information you'd need to help me
- What "done" looks like for this task

(Note: Your first prompt won't be perfect. The agent will ask dumb questions. Iterate. That's the job.)`,
        },
        {
            num: 3,
            title: 'Answer its recon questions',
            description: 'Be specific—more intel = better execution',
            prompt: null,
        },
        {
            num: 4,
            title: 'Request a system deployment',
            description: 'Turn the conversation into a repeatable protocol',
            prompt: `Based on what I told you, create:
1. A weekly/daily check-in message you can send me
2. The exact questions you'll ask each time
3. How you'll track if this task is done

Save this as "Agent: [Task Name]" so we can use it again.`,
        },
        {
            num: 5,
            title: 'Set a trigger',
            description: 'Phone reminder to check in with your agent',
            prompt: null,
        },
    ];

    const handleCopy = (stepNum, prompt) => {
        navigator.clipboard.writeText(prompt);
        setCopiedStep(stepNum);
        setTimeout(() => setCopiedStep(null), 2000);
    };

    const toggleStep = (stepNum) => {
        setCompletedSteps(prev => {
            if (prev.includes(stepNum)) {
                return prev.filter(s => s !== stepNum);
            } else {
                const newCompleted = [...prev, stepNum];
                if (newCompleted.length === steps.length && onComplete) {
                    setTimeout(() => onComplete(), 500);
                }
                return newCompleted;
            }
        });
    };

    return (
        <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-2xl p-6 border-2 border-orange-500/50 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Crosshair className="text-orange-400" size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">20-Minute Task Delegation</h3>
                    <p className="text-slate-400 text-sm">Hand off that recurring task—right now</p>
                </div>
            </div>

            <div className="my-6 p-4 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                <p className="text-yellow-400 font-medium text-sm flex items-center gap-2">
                    <Target size={16} />
                    Remember the task you logged in Discovery 1? Let's delegate it now.
                </p>
            </div>

            <div className="space-y-4">
                {steps.map((step) => (
                    <div
                        key={step.num}
                        className={`bg-slate-900/50 rounded-xl p-4 border transition-all ${completedSteps.includes(step.num)
                            ? 'border-green-500/50'
                            : 'border-slate-700'
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            <button
                                onClick={() => toggleStep(step.num)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all ${completedSteps.includes(step.num)
                                    ? 'bg-green-500 text-white'
                                    : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
                                    }`}
                            >
                                {completedSteps.includes(step.num) ? <CheckCircle size={16} /> : step.num}
                            </button>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-bold">{step.title}</h4>
                                <p className="text-slate-400 text-sm mt-1">{step.description}</p>

                                {step.prompt && (
                                    <div className="mt-3">
                                        <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300 relative group">
                                            <pre className="whitespace-pre-wrap">{step.prompt}</pre>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(step.num, step.prompt)}
                                            className={`mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${copiedStep === step.num
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-slate-800 text-slate-400 hover:text-white'
                                                }`}
                                        >
                                            {copiedStep === step.num ? <CheckCircle size={14} /> : <Copy size={14} />}
                                            {copiedStep === step.num ? 'Copied!' : 'Copy prompt'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress indicator */}
            <div className="mt-6 p-4 bg-slate-900/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Protocol Progress</span>
                    <span className="text-cyan-400 font-bold">{completedSteps.length}/{steps.length}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-orange-500 to-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="mt-6 p-4 bg-green-900/30 rounded-xl border border-green-500/40">
                <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                    <CheckCircle size={16} />
                    Success Stories
                </h4>
                <div className="space-y-2 text-sm">
                    {[
                        { task: 'Water the plants', result: 'Agent checks in every Sunday, tracks which plants need attention' },
                        { task: 'Pay electricity bill', result: 'Agent reminds 3 days before due, confirms when done' },
                        { task: 'Meal planning', result: 'Agent asks about the week each Sunday, suggests recipes' },
                    ].map((example, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <span className="text-slate-500">"</span>
                            <span className="text-white font-medium">{example.task}</span>
                            <span className="text-slate-500">"</span>
                            <span className="text-slate-400">→ {example.result}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Compact Case Study
const CaseStudyCard = ({ name, role, problem, result, timeframe, quote }) => (
    <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-5 border border-slate-500/40 backdrop-blur-sm mb-8">
        <div className="flex items-center gap-2 mb-1">
            <span className="text-cyan-400 font-bold uppercase text-xs tracking-wider">Field Report</span>
        </div>
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
                <span className="text-red-400 text-xs font-bold uppercase">Before Deployment</span>
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
// CHAPTER 2 MAIN COMPONENT
// ============================================

const Chapter2 = () => {
    const navigate = useNavigate();
    const [blitzMode, setBlitzMode] = useState(false);
    const [showMissionBriefing, setShowMissionBriefing] = useState(true);
    const [unlockedCards, setUnlockedCards] = useState([]);
    const [protocolComplete, setProtocolComplete] = useState(false);

    const handleCardUnlock = (cardId) => {
        if (!unlockedCards.includes(cardId)) {
            setUnlockedCards(prev => [...prev, cardId]);
        }
    };

    const scrollToQuiz = () => {
        document.getElementById('tool-quiz')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Mission objectives for this operation
    const objectives = [
        {
            id: 'obj_1',
            text: 'Learn the 4-Role Framework',
            type: 'primary',
            completed: true, // Assume they've read it
        },
        {
            id: 'obj_2',
            text: 'Select your AI Brain tool',
            type: 'primary',
            completed: false,
        },
        {
            id: 'obj_3',
            text: 'Complete the Task Elimination Protocol',
            type: 'primary',
            completed: protocolComplete,
        },
        {
            id: 'obj_bonus_1',
            text: 'Take the Tool Recommendation Quiz',
            type: 'bonus',
            xpReward: 25,
            completed: false,
        },
        {
            id: 'obj_bonus_2',
            text: 'Unlock both Agent Cards',
            type: 'bonus',
            xpReward: 50,
            completed: unlockedCards.length >= 2,
        },
    ];

    return (
        <BlitzModeContext.Provider value={blitzMode}>
            <WebbookLayout>
                <Helmet>
                    <title>Discovery 2: Your AI Toolkit | AI Frontier Adventure</title>
                    <meta name="description" content="Build your AI team with the 4-Role Framework. Pick your Brain, set up your stack, and automate that recurring task." />
                </Helmet>

                {/* MISSION BRIEFING MODAL */}
                <MissionBriefing
                    isOpen={showMissionBriefing}
                    onClose={() => setShowMissionBriefing(false)}
                    operationNumber={2}
                    operationName="BASIC TRAINING"
                    operationSubtitle="Assemble Your AI Squad"
                    objectives={[
                        'Master the 4-Role Framework (Brain, Memory, Hands, Nerves)',
                        'Select and deploy your primary AI Brain',
                        'Execute the 20-Minute Task Elimination Protocol',
                    ]}
                    rewards={{
                        xp: 100,
                        cards: 2,
                        cardNames: ['Task Delegate Agent', 'AI Stack Advisor']
                    }}
                    intel="Your recurring task from Operation 1? Today it dies. You'll learn the exact framework for building your AI team and deploy your first operational agent."
                />

                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* OBJECTIVES SIDEBAR (Floating) */}
                        <ObjectivesChecklist
                            objectives={objectives}
                            operationNumber={2}
                        />

                        {/* OPERATION HEADER */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-cyan-400 font-mono text-sm">OPERATION 2</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-slate-500 text-sm">Part I: Daily Ops</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                BASIC TRAINING
                            </h1>
                            <p className="text-xl text-slate-400 mb-4">
                                The 4 roles that will eliminate that task you named
                            </p>

                            {/* Reading time + Blitz Mode toggle */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4 text-slate-500 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        <span>7 min read</span>
                                    </div>
                                    <span>•</span>
                                    <span className="text-orange-400">20 min to deploy</span>
                                </div>
                                <BlitzModeToggle enabled={blitzMode} onToggle={() => setBlitzMode(!blitzMode)} />
                            </div>
                        </motion.div>

                        {/* INTEL REPORT - TL;DR */}
                        <IntelReport
                            classification="TACTICAL"
                            stats={[
                                { value: '4', label: 'roles to fill' },
                                { value: '$0-20', label: 'to deploy' },
                                { value: '20 min', label: 'to eliminate task' },
                            ]}
                            primaryCTA="Find My Tools"
                            onCTAClick={scrollToQuiz}
                        />

                        {/* CAPTAIN EFFICIENCY - OPENER */}
                        {!blitzMode && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="default"
                                    message="Time to build your squad, Explorer! In Expedition 1, you learned the difference between tools that wait and systems that work. Now we assemble the team. By the end of this expedition, you'll have selected your AI 'Brain' and handed off that recurring task you've been carrying. Ready to meet your new companions?"
                                />
                            </Suspense>
                        )}

                        {/* Blitz Mode Notice */}
                        {blitzMode && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-cyan-900/30 rounded-xl p-4 border border-cyan-500/40 backdrop-blur-sm mb-8"
                            >
                                <div className="flex items-center gap-2 text-cyan-400">
                                    <Zap size={18} />
                                    <span className="font-bold">Blitz Mode Active</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-1">
                                    Showing only essential frameworks and prompts. Toggle off for full intel.
                                </p>
                            </motion.div>
                        )}

                        {/* ★ QUIZ FIRST - PATTERN INTERRUPT ★ */}
                        <section id="tool-quiz" className="mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                                <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Recon Assessment</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                            </div>

                            <Suspense fallback={
                                <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                    Loading assessment...
                                </div>
                            }>
                                <ToolRecommendationQuiz />
                            </Suspense>
                        </section>

                        {/* THE 4-ROLE FRAMEWORK */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                <Users className="text-cyan-400" size={24} />
                                The 4-Role Framework
                            </h2>
                            <p className="text-slate-400 mb-6">
                                You don't need 47 apps. You need <strong className="text-white">4 roles filled</strong>. That's your squad.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <RoleCard
                                    emoji="🧠"
                                    title="THE BRAIN"
                                    subtitle="Strategic Command"
                                    description="Plans, drafts, analyzes, decides. Your strategic partner."
                                    examples={['Claude', 'ChatGPT', 'Gemini']}
                                    color="green"
                                    isFirst={true}
                                />
                                <RoleCard
                                    emoji="📚"
                                    title="THE MEMORY"
                                    subtitle="Intel Archive"
                                    description="Remembers everything—preferences, files, past decisions."
                                    examples={['Notion', 'Obsidian', 'Apple Notes']}
                                    color="orange"
                                />
                                <RoleCard
                                    emoji="✋"
                                    title="THE HANDS"
                                    subtitle="Field Operations"
                                    description="Takes action—sends emails, schedules meetings, pays bills."
                                    examples={['Calendar', 'Gmail', 'YNAB']}
                                    color="cyan"
                                />
                                <RoleCard
                                    emoji="⚡"
                                    title="THE NERVES"
                                    subtitle="Communications Network"
                                    description="Wires the Brain to the Hands. Automations that trigger actions."
                                    examples={['Zapier', 'Make', 'IFTTT']}
                                    color="purple"
                                />
                            </div>

                            {/* Quick mapping help */}
                            {!blitzMode && (
                                <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-5 border border-slate-500/40 backdrop-blur-sm">
                                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                        <Target className="text-cyan-400" size={18} />
                                        Mission Assignment
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        That task from Operation 1? Here's which role handles it:
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        {[
                                            { role: 'BRAIN', examples: 'Morning briefings, email summaries, decision recommendations' },
                                            { role: 'MEMORY', examples: 'Recipes, preferences, birthdays, gift ideas' },
                                            { role: 'HANDS', examples: 'Scheduling, reminders, paying bills, sending messages' },
                                            { role: 'NERVES', examples: '"When X happens, do Y" (deploy in Operation 13)' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                                <span className="text-cyan-400 font-bold text-xs min-w-[60px]">{item.role}</span>
                                                <span className="text-slate-300">{item.examples}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* DECISION TREE - Which Tool? */}
                        {!blitzMode && (
                            <section className="mb-10">
                                <DecisionTree />
                            </section>
                        )}

                        {/* CARD UNLOCK 1 - AI Stack Advisor */}
                        <AgentCardUnlock
                            card={aiStackAdvisorCard}
                            onUnlock={handleCardUnlock}
                            onComplete={() => console.log('AI Stack Advisor added to deck')}
                            autoReveal={false}
                        />

                        {/* MINIMUM VIABLE STACK */}
                        <section className="mb-10">
                            <MinimumViableStack />
                        </section>

                        {/* THE 20-MINUTE TASK KILLER */}
                        <section className="mb-10">
                            <TaskKillerProtocol onComplete={() => setProtocolComplete(true)} />
                        </section>

                        {/* CARD UNLOCK 2 - Task Delegate Agent */}
                        <AgentCardUnlock
                            card={taskDelegateCard}
                            onUnlock={handleCardUnlock}
                            onComplete={() => console.log('Task Delegate Agent added to deck')}
                            autoReveal={false}
                        />

                        {/* CASE STUDY - Compact */}
                        {!blitzMode && (
                            <CaseStudyCard
                                name="Marcus"
                                role="Sales manager, father of 3"
                                problem="Forgot to follow up with leads. Missed his daughter's recital reminder."
                                result="Zero dropped leads. Phone buzzes only for what matters."
                                timeframe="2 weeks"
                                quote="I stopped being the person who forgets things. That identity shift was worth more than the hours saved."
                            />
                        )}

                        {/* SHAREABLE QUOTE */}
                        <ShareableQuote
                            quote="You don't need 47 apps. You need 4 roles filled. The Brain thinks. The Memory remembers. The Hands act. The Nerves connect. That's your whole squad."
                            operation={2}
                        />

                        {/* FUTURE PROOF BANNER */}
                        <FutureProofBanner currentOperation={2} />

                        {/* CAPTAIN EFFICIENCY - CLOSER */}
                        {!blitzMode && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="celebrating"
                                    message="Your first companion is deployed! That task you've been carrying? It's no longer your problem. Your Brain is handling it now. But here's the thing—you just gave an AI access to your calendar, your tasks, maybe your email. Before we go deeper, Expedition 3 establishes your security perimeter. Trust me, it's critical. 🔒"
                                />
                            </Suspense>
                        )}

                        {/* MISSION COMPLETE */}
                        <MissionComplete
                            operationId="exp_2"
                            operationName="BASIC TRAINING"
                            operationNumber={2}
                            nextOperationPath="/part1/chapter3"
                            nextOperationName="SECURITY PERIMETER"
                            rewards={{
                                dp: 100,
                                cards: ['Task Delegate Companion', 'AI Stack Advisor'],
                                achievements: ['squad_assembled']
                            }}
                            stats={{
                                objectivesCompleted: "3/3",
                                tasksEliminated: "1",
                            }}
                        />

                        {/* Bottom Navigation */}
                        <ChapterNavigation
                            previousChapter="/part1/chapter1"
                            nextChapter="/part1/chapter3"
                            partNumber={1}
                            chapterNumber={2}
                        />

                    </div>
                </div>
            </WebbookLayout>
        </BlitzModeContext.Provider>
    );
};

export default Chapter2;