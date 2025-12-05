import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';

import React, { useState, Suspense, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Brain, Sparkles, Share2, Copy, Eye, EyeOff, MessageSquare,
    AlertTriangle, Target, Lightbulb, HelpCircle
} from 'lucide-react';

// Game Components
import MissionBriefing from '../../components/gamification/MissionBriefing';
import MissionComplete from '../../components/gamification/MissionComplete';
import ObjectivesChecklist from '../../components/gamification/ObjectivesChecklist';
import IntelReport from '../../components/gamification/IntelReport';
import FutureProofBanner from '../../components/gamification/FutureProofBanner';
import AgentCardUnlock from '../../components/gamification/AgentCardUnlock';
import ChapterNavigation from '../../components/common/ChapterNavigation';

// Lazy load heavy components
const AIExperienceQuiz = React.lazy(() => import('../../components/AIExperienceQuiz'));
const MentalLoadCalculator = React.lazy(() => import('../../components/MentalLoadCalculator'));
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// SPEED RUN CONTEXT
// ============================================
const SpeedRunContext = createContext(false);

// ============================================
// REUSABLE COMPONENTS
// ============================================

const SpeedRunToggle = ({ enabled, onToggle }) => (
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
    const speedRun = useContext(SpeedRunContext);

    if (speedRun) return null;

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
                {expanded ? 'Show less' : 'Read the full story'}
            </button>
        </div>
    );
};

const ShareableQuote = ({ quote, chapter }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`"${quote}" — Agentic AI at Home, Operation ${chapter}`);
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
                    <span className="text-slate-400 text-sm">— Operation {chapter}</span>
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
    const speedRun = useContext(SpeedRunContext);

    if (speedRun) return null;

    return (
        <div className="bg-purple-900/20 rounded-xl border border-purple-500/40 backdrop-blur-sm mb-6 overflow-hidden">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-purple-900/30 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Brain className="text-purple-400" size={18} />
                    <span className="text-purple-400 font-medium text-sm">Deep Dive:</span>
                    <span className="text-white font-medium">{title}</span>
                </div>
                {expanded ? <ChevronUp size={18} className="text-purple-400" /> : <ChevronDown size={18} className="text-purple-400" />}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
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

const StatCard = ({ value, label, color = 'red' }) => {
    const colors = {
        red: 'bg-red-900/20 border-red-500/30 text-red-400',
        green: 'bg-green-900/20 border-green-500/30 text-green-400',
        cyan: 'bg-cyan-900/20 border-cyan-500/30 text-cyan-400',
        purple: 'bg-purple-900/20 border-purple-500/30 text-purple-400',
    };

    return (
        <div className={`rounded-xl p-5 border ${colors[color]}`}>
            <div className="text-3xl font-bold mb-1">{value}</div>
            <div className="text-slate-400 text-sm">{label}</div>
        </div>
    );
};

const BeforeAfter = ({ before, after, metric }) => {
    const speedRun = useContext(SpeedRunContext);
    if (speedRun) return null;

    return (
        <div className="mb-8">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-900/20 rounded-xl p-5 border border-red-500/30">
                    <div className="text-red-400 font-bold text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                        <AlertTriangle size={14} /> Before
                    </div>
                    <ul className="space-y-2">
                        {before.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="text-red-400 mt-0.5">✗</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-green-900/20 rounded-xl p-5 border border-green-500/30">
                    <div className="text-green-400 font-bold text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle size={14} /> After
                    </div>
                    <ul className="space-y-2">
                        {after.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={14} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {metric && (
                <div className="bg-gradient-to-r from-slate-900/30 to-slate-800/20 rounded-xl p-4 flex items-center justify-center gap-4 backdrop-blur-sm">
                    <span className="text-red-400 line-through text-xl">{metric.before}</span>
                    <ArrowRight className="text-slate-400" size={20} />
                    <span className="text-green-400 font-bold text-2xl">{metric.after}</span>
                    <span className="text-slate-400 text-sm">{metric.label}</span>
                </div>
            )}
        </div>
    );
};

const NewbieBox = ({ title, children }) => (
    <div className="bg-blue-900/20 rounded-xl p-5 border border-blue-500/30 mb-6">
        <div className="flex items-start gap-3">
            <MessageSquare className="text-blue-400 flex-shrink-0 mt-1" size={18} />
            <div>
                <h4 className="text-blue-400 font-bold text-sm mb-2">{title}</h4>
                <div className="text-slate-300 text-sm">{children}</div>
            </div>
        </div>
    </div>
);

// ============================================
// CHAPTER 1 MAIN COMPONENT
// ============================================

const Chapter1 = () => {
    const [speedRun, setSpeedRun] = useState(false);
    const [cardUnlocked, setCardUnlocked] = useState(false);
    const navigate = useNavigate();

    // Morning Brief Agent card data
    const morningBriefCard = {
        id: 'morning_brief',
        name: 'Morning Brief Agent',
        rarity: 'common',
        category: 'Daily Ops',
        timeSaved: '30 min/day',
        moneySaved: '$0',
        complexity: 2,
        powerLevel: 45,
        prompt: `I want you to act as my morning briefing agent.

Ask me:
1. What time I wake up
2. What info I need each morning (weather, calendar, priorities)
3. How I want it formatted (bullet points, paragraphs, etc.)

Then show me what tomorrow's briefing would look like.`,
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

    return (
        <WebbookLayout>
            <Helmet>
                <title>Operation: Wake-Up Call | Agentic AI at Home</title>
                <meta name="description" content="Recognize the battlefield and identify the enemy (Decision Fatigue). Deploy your first agent." />
            </Helmet>

            <SpeedRunContext.Provider value={speedRun}>
                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* MISSION BRIEFING - Epic Header */}
                        <MissionBriefing
                            title="OPERATION: WAKE-UP CALL"
                            missionNumber={1}
                            totalMissions={16}
                            duration="6 min"
                            briefing="ATTENTION, OPERATOR. Your mental capacity is under siege. Intelligence reports 35,000 decisions per day are draining your combat effectiveness. Your objective: Recognize the battlefield and identify the enemy (Decision Fatigue). Prepare to deploy your first agent."
                            status="IN PROGRESS"
                            objectives={[
                                "Read the mission intel",
                                "Understand Chatbots vs Agents",
                                "Deploy your first agent"
                            ]}
                        />

                        {/* FUTURE-PROOF BANNER - Honest framing */}
                        <FutureProofBanner />

                        {/* BLITZ MODE TOGGLE */}
                        <div className="flex justify-end mb-6">
                            <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                        </div>

                        {/* OBJECTIVES CHECKLIST - Interactive */}
                        <ObjectivesChecklist
                            operationId="op_1"
                            primaryObjectives={[
                                { id: "read_intel", label: "Read the mission intel" },
                                { id: "understand_difference", label: "Understand Chatbots vs Agents" },
                                { id: "deploy_first", label: "Deploy your first agent" }
                            ]}
                            bonusObjectives={[
                                { id: "quick_win", label: "Complete the Quick Win prompt" },
                                { id: "share", label: "Share your commitment" }
                            ]}
                        />

                        {/* INTEL REPORT - Honest framing about AI state */}
                        {!speedRun && (
                            <IntelReport
                                title="THE CURRENT STATE OF AI AGENTS"
                                classification="LEVEL 1"
                                defaultExpanded={false}
                                content={`Let's be straight with you, Operator.

When you hear 'AI agents,' you might imagine robots that run your life automatically while you sleep. That tech is coming—OpenAI, Google, Apple, and Anthropic are all racing to build it.

But we're not quite there yet.

What you're learning here is how to COMMAND these agents. Today, you'll deploy them manually using ChatGPT or Claude. Tomorrow, when fully autonomous agents arrive, you'll already know how to direct them.

Think of this as officer training before the army expands.

The soldiers are coming. You're learning how to lead them.`}
                            />
                        )}

                        {/* CAPTAIN EFFICIENCY - Welcome */}
                        {!speedRun && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="default"
                                    message="Welcome, future agent-builder. I'm Captain Efficiency, and I'll be your commanding officer through these operations. Right now, your brain is juggling a hundred things it shouldn't have to. By the end of this operation, you'll understand why that's happening—and deploy your first agent to fight back. Ready, Operator?"
                                />
                            </Suspense>
                        )}

                        {/* Blitz Mode Notice */}
                        {speedRun && (
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
                                    Showing only essential intel and card unlocks. Toggle off for full operation experience.
                                </p>
                            </motion.div>
                        )}

                        {/* STORY HOOK */}
                        <StoryHook
                            hook={
                                <>
                                    <strong className="text-white">Sarah didn't remember falling asleep.</strong>{' '}
                                    She remembered her laptop at 11:47 PM. Then—alarm. 5:47 AM. Presentation in 48 minutes.
                                    Wrong calendar day. <em>Again.</em>{' '}
                                    <span className="text-cyan-400 font-medium">
                                        "Something has to break. I just hope it's not me."
                                    </span>
                                </>
                            }
                            fullStory={
                                <>
                                    <p className="text-slate-300 mb-4">
                                        Her hands shook as she grabbed her phone. 47 unread emails. The important one from her manager—buried between a Target receipt and a LinkedIn notification she'd never asked for.
                                    </p>
                                    <p className="text-slate-300 mb-4">
                                        While scanning emails, she started the coffee maker. No filter. She didn't notice until brown water pooled across the counter.
                                    </p>
                                    <div className="bg-cyan-900/20 rounded-lg p-4 border-l-4 border-cyan-500/50 my-4">
                                        <p className="text-slate-300 mb-2">
                                            <strong className="text-white">Three months later:</strong> Sarah woke to one notification. Weather, calendar, bills—summarized in 30 seconds.
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            Her Morning Brief Agent had learned what mattered. She slept through the night for the first time in months.
                                        </p>
                                    </div>
                                </>
                            }
                        />

                        {/* THREAT ASSESSMENT - Stats */}
                        {!speedRun && (
                            <section className="mb-10">
                                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    <AlertTriangle className="text-red-400" size={24} />
                                    THREAT ASSESSMENT
                                </h2>
                                <p className="text-slate-400 mb-6">
                                    This isn't about discipline. It's about capacity.
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <StatCard value="35,000" label="decisions per day" color="red" />
                                    <StatCard value="23 min" label="to refocus after interruption" color="red" />
                                    <StatCard value="2.5 hrs" label="daily life admin" color="red" />
                                    <StatCard value="60%" label="tasks automatable" color="cyan" />
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                    <p className="text-slate-400 text-xs mb-2">
                                        <strong className="text-slate-300">Intel Sources:</strong>
                                    </p>
                                    <ul className="text-slate-500 text-xs space-y-1">
                                        <li>• 35,000 decisions/day: Cornell University food choice study</li>
                                        <li>• 23 min refocus: Gloria Mark, UC Irvine attention research</li>
                                        <li>• 60% automatable: McKinsey Global Institute, 2024</li>
                                    </ul>
                                </div>
                            </section>
                        )}

                        {/* REALITY CHECK */}
                        {!speedRun && (
                            <div className="bg-yellow-900/20 rounded-xl p-4 border border-yellow-500/30 mb-8 flex items-start gap-3">
                                <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-1">Reality Check: The First Week</h4>
                                    <p className="text-slate-300 text-sm">
                                        Let's be real: You will forget to check your agent. It will hallucinate. You will feel faster doing it yourself.
                                        <strong className="text-white"> This is normal.</strong> You are building a system, not just installing an app. The goal isn't instant magic—it's compounding leverage.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Before/After */}
                        <BeforeAfter
                            before={[
                                'Check 6 apps to piece together your morning',
                                '30 minutes of mental chaos before work starts',
                                'Constant background anxiety: "What am I forgetting?"',
                                'Reactive—always catching up',
                            ]}
                            after={[
                                'One notification with everything you need',
                                '5 minutes to full clarity',
                                'Agent tracks it—your brain doesn\'t have to',
                                'Proactive—you start ahead',
                            ]}
                            metric={{ before: '30 min', after: '5 min', label: 'morning routine' }}
                        />

                        {/* SHAREABLE QUOTE */}
                        <ShareableQuote
                            quote="You don't need more willpower. You need fewer decisions. Agents don't add to your life—they subtract from the chaos."
                            chapter={1}
                        />

                        {/* NEWBIE EXPLAINER */}
                        <NewbieBox title="New to AI? Start here.">
                            <p className="mb-2">
                                You've probably heard of ChatGPT, Claude, or Gemini. Those are <strong className="text-white">chatbots</strong>—you ask, they answer.
                            </p>
                            <p>
                                An <strong className="text-white">agent</strong> is different. It's a chatbot with a mission, context about YOUR life, and permission to help without being asked every time.
                            </p>
                        </NewbieBox>

                        {/* TACTICAL ANALYSIS: Chatbot vs Agent */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <Target className="text-cyan-400" size={24} />
                                TACTICAL ANALYSIS
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-orange-900/20 rounded-xl p-5 border border-orange-500/30">
                                    <div className="text-3xl mb-3">💬</div>
                                    <h3 className="text-orange-400 font-bold text-lg mb-2">Chatbot</h3>
                                    <p className="text-slate-300 text-sm mb-3">
                                        A brilliant assistant who waits for instructions.
                                    </p>
                                    <div className="bg-slate-900/50 rounded-lg p-3 text-sm">
                                        <span className="text-slate-400">You:</span>{' '}
                                        <span className="text-slate-300">"What's the weather?"</span>
                                        <br />
                                        <span className="text-slate-400">Bot:</span>{' '}
                                        <span className="text-slate-300">"72°F and sunny."</span>
                                    </div>
                                </div>

                                <div className="bg-cyan-900/20 rounded-xl p-5 border border-cyan-500/30">
                                    <div className="text-3xl mb-3">🤖</div>
                                    <h3 className="text-cyan-400 font-bold text-lg mb-2">Agent</h3>
                                    <p className="text-slate-300 text-sm mb-3">
                                        A team member who knows your playbook.
                                    </p>
                                    <div className="bg-slate-900/50 rounded-lg p-3 text-sm">
                                        <span className="text-slate-400">Agent:</span>{' '}
                                        <span className="text-slate-300">"Rain at 2 PM. Your outdoor meeting should move inside. Want me to draft a message to the team?"</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-cyan-900/30 rounded-xl p-6 border border-cyan-500/40">
                                <div className="flex items-start gap-4">
                                    <Lightbulb className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <p className="text-white font-bold mb-2">The shift in one sentence:</p>
                                        <p className="text-slate-300">
                                            Chatbots answer questions.{' '}
                                            <strong className="text-cyan-400">Agents eliminate the need to ask.</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Deep Dive */}
                        <DeepDive title="How agents actually work (technical)">
                            <div className="space-y-4 text-sm">
                                <p className="text-slate-300">
                                    Agents operate on a continuous loop with four stages:
                                </p>
                                <div className="grid md:grid-cols-4 gap-3">
                                    {[
                                        { emoji: '👁', label: 'OBSERVE', desc: 'Monitor inputs (calendar, email, sensors)' },
                                        { emoji: '🧠', label: 'PLAN', desc: 'Decide what action serves your goals' },
                                        { emoji: '✋', label: 'ACT', desc: 'Execute within defined permissions' },
                                        { emoji: '📊', label: 'REPORT', desc: 'Surface only what needs your attention' },
                                    ].map((step, i) => (
                                        <div key={i} className="bg-slate-900/50 rounded-lg p-3 text-center">
                                            <div className="text-2xl mb-2">{step.emoji}</div>
                                            <div className="text-purple-400 font-bold text-xs mb-1">{step.label}</div>
                                            <div className="text-slate-400 text-xs">{step.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DeepDive>

                        {/* INTERACTIVE: AI Experience Quiz */}
                        {!speedRun && (
                            <section id="experience-quiz" className="mb-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                                    <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Field Assessment</span>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                                </div>

                                <Suspense fallback={
                                    <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-800/50 rounded-xl animate-pulse">
                                        Loading assessment...
                                    </div>
                                }>
                                    <AIExperienceQuiz />
                                </Suspense>
                            </section>
                        )}

                        {/* CARD UNLOCK - Morning Brief Agent */}
                        <AgentCardUnlock
                            card={morningBriefCard}
                            onUnlock={handleCardUnlock}
                            onComplete={() => console.log('Card added to deck')}
                            autoReveal={false}
                        />

                        {/* PRE-MISSION CHECK */}
                        {!speedRun && (
                            <section className="mb-10">
                                <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/20 rounded-2xl p-8 border-2 border-yellow-500/50">
                                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <Target className="text-yellow-400" />
                                        PRE-MISSION CHECK
                                    </h3>

                                    <p className="text-slate-300 mb-6">
                                        Write down <strong className="text-white">ONE task</strong> you're tired of remembering.
                                    </p>

                                    <div className="bg-slate-900/80 rounded-xl p-6 mb-6">
                                        <p className="text-white font-medium mb-2">
                                            The one that slips through the cracks. The recurring "I forgot to..." moment.
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            Water the plants. Pay a bill. Send that follow-up. Check the school calendar.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-500/40">
                                        <p className="text-cyan-400 font-bold text-center">
                                            Operation 2 shows you exactly how to delegate this task to an agent.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* CAPTAIN EFFICIENCY - CLOSER */}
                        {!speedRun && (
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="celebrating"
                                    message="Outstanding work, Operator! You just completed your first operation and earned your first agent card. You now understand the most important concept in this entire training—the difference between a tool that waits and a system that works. That task you identified? In Operation 2, we're delegating it. No more mental Post-It notes. Move out! 🚀"
                                />
                            </Suspense>
                        )}

                        {/* MISSION COMPLETE */}
                        <MissionComplete
                            operationId="op_1"
                            operationName="WAKE-UP CALL"
                            operationNumber={1}
                            nextOperationPath="/part1/chapter2"
                            nextOperationName="BASIC TRAINING"
                            rewards={{
                                xp: 100,
                                cards: ['Morning Brief Agent'],
                                achievements: ['first_blood']
                            }}
                            stats={{
                                objectivesCompleted: "3/3",
                            }}
                        />

                        {/* Bottom Navigation */}
                        <ChapterNavigation
                            previousChapter={null}
                            nextChapter="/part1/chapter2"
                            partNumber={1}
                            chapterNumber={1}
                        />

                    </div>
                </div>
            </SpeedRunContext.Provider>
        </WebbookLayout>
    );
};

export default Chapter1;
