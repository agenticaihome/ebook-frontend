import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';

import React, { useState, Suspense, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, ShoppingCart, Utensils,
    DollarSign, Target, Refrigerator, Trash2, Users, Calendar,
    AlertTriangle, HelpCircle, Leaf, ChefHat, Receipt, TrendingDown,
    Brain, MessageSquare, Lightbulb
} from 'lucide-react';

// Game Components
import MissionBriefing from '../../components/gamification/MissionBriefing';
import MissionComplete from '../../components/gamification/MissionComplete';
import ObjectivesChecklist from '../../components/gamification/ObjectivesChecklist';
import IntelReport from '../../components/gamification/IntelReport';
import FutureProofBanner from '../../components/gamification/FutureProofBanner';
import AgentCardUnlock from '../../components/gamification/AgentCardUnlock';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import AIToolLinks from '../../components/AIToolLinks';
import PasswordGate from '../../components/common/PasswordGate';

// Lazy load interactive components
const FoodChaosCalculator = React.lazy(() => import('../../components/FoodChaosCalculator'));
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
                className="flex items-center gap-2 text-teal-400 text-sm mt-4 hover:text-teal-300 transition-colors"
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
        teal: 'bg-teal-900/20 border-teal-500/30 text-teal-400',
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
    const blitzMode = useContext(BlitzModeContext);
    if (blitzMode) return null;

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

const QuickWin = ({ title, prompt, setupTime, variant = 'default' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const variants = {
        default: {
            bg: 'from-green-900/30 to-emerald-900/20',
            border: 'border-green-500/40',
            icon: Zap,
            iconColor: 'text-green-400',
        },
        secondary: {
            bg: 'from-blue-900/30 to-teal-900/20',
            border: 'border-blue-500/40',
            icon: ShoppingCart,
            iconColor: 'text-blue-400',
        },
        bonus: {
            bg: 'from-purple-900/30 to-pink-900/20',
            border: 'border-purple-500/40',
            icon: Sparkles,
            iconColor: 'text-purple-400',
        }
    };

    const v = variants[variant] || variants.default;
    const Icon = v.icon;

    return (
        <div className={`bg-gradient-to-br ${v.bg} rounded-2xl p-6 border ${v.border} backdrop-blur-sm mb-8`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Icon className={v.iconColor} size={20} />
                    <span className={`${v.iconColor} font-bold uppercase text-sm tracking-wider`}>
                        {variant === 'bonus' ? 'Bonus Companion' : 'Quick Win'}
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

// Compact Case Study
const CaseStudyCard = ({ name, role, problem, result, timeframe, quote }) => (
    <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-5 border border-slate-500/40 backdrop-blur-sm mb-8">
        <div className="flex items-center gap-2 mb-1">
            <span className="text-teal-400 font-bold uppercase text-xs tracking-wider">Field Report</span>
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
                <span className="text-red-400 text-xs font-bold uppercase">Before</span>
                <p className="text-slate-300 text-sm mt-1">{problem}</p>
            </div>
            <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/20">
                <span className="text-green-400 text-xs font-bold uppercase">After {timeframe}</span>
                <p className="text-slate-300 text-sm mt-1">{result}</p>
            </div>
        </div>

        <p className="text-slate-400 text-sm italic border-l-2 border-teal-500/50 pl-3">
            "{quote}"
        </p>
    </div>
);

// ============================================
// CHAPTER 5 MAIN COMPONENT
// ============================================

const Chapter5 = () => {
    const [blitzMode, setBlitzMode] = useState(false);
    const [cardUnlocked, setCardUnlocked] = useState(false);
    const navigate = useNavigate();

    // Meal Planner Agent card data
    const mealPlannerCard = {
        id: 'meal_planner',
        name: 'Meal Planning Companion',
        rarity: 'rare',
        category: 'Kitchen',
        timeSaved: '2 hrs/week',
        moneySaved: '$200/mo',
        complexity: 3,
        powerLevel: 65,
        prompt: `You are my Meal Planning Companion. Create weekly meal plans my family will actually eat.

MY FAMILY'S PREFERENCES:
[Paste your Family Taste Mapper output here]

CONSTRAINTS:
- Budget: ~$150-200/week
- Cook time: Max 30-45 min on weeknights
- Variety: Don't repeat proteins more than 2x/week`,
    };

    const handleCardUnlock = (cardId) => {
        setCardUnlocked(true);
        const unlockedCards = JSON.parse(localStorage.getItem('unlocked_cards') || '[]');
        if (!unlockedCards.includes(cardId)) {
            unlockedCards.push(cardId);
            localStorage.setItem('unlocked_cards', JSON.stringify(unlockedCards));
        }
    };

    const scrollToCalculator = () => {
        document.getElementById('food-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const mealPlannerPrompt = `You are my Meal Planning Companion. Create weekly meal plans my whole family will actually eat.

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

    const groceryListPrompt = `You are my Grocery List Companion. Based on the meal plan I provide, create an organized shopping list.

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
        <WebbookLayout>
            <Helmet>
                <title>Discovery 5: Kitchen Sync | The Agentic AI Adventure</title>
                <meta name="description" content="End 'what's for dinner?' forever with AI-powered meal planning and grocery automation." />
            </Helmet>

            <BlitzModeContext.Provider value={blitzMode}>
                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* MISSION BRIEFING */}
                        <MissionBriefing
                            title="EXPEDITION: KITCHEN SYNC"
                            missionNumber={5}
                            totalMissions={16}
                            duration="9 min"
                            briefing="The kitchen is where families come together—or dissolve into hangry chaos. Every 'what's for dinner?' drains decision energy you could spend actually enjoying the meal. Your objective: Deploy a two-companion team to automate the entire food decision pipeline."
                            status="IN PROGRESS"
                            classification="TERRITORY 2"
                            objectives={[
                                "Calculate your food chaos cost",
                                "Deploy Meal Planning Companion",
                                "Deploy Grocery List Companion"
                            ]}
                        />

                        {/* FUTURE-PROOF BANNER */}
                        <FutureProofBanner />

                        {/* BLITZ MODE TOGGLE */}
                        <div className="flex justify-end mb-6">
                            <BlitzModeToggle enabled={blitzMode} onToggle={() => setBlitzMode(!blitzMode)} />
                        </div>

                        {/* OBJECTIVES */}
                        <ObjectivesChecklist
                            operationId="exp_5"
                            primaryObjectives={[
                                { id: "chaos_calc", label: "Calculate your food chaos" },
                                { id: "meal_companion", label: "Deploy Meal Planning Companion" },
                                { id: "grocery_companion", label: "Deploy Grocery List Companion" }
                            ]}
                            bonusObjectives={[
                                { id: "leftover_companion", label: "Deploy Leftover Transformer" }
                            ]}
                        />

                        {/* INTEL REPORT */}
                        <IntelReport
                            title="KITCHEN INTEL"
                            classification="LEVEL 5"
                            defaultExpanded={false}
                            content={`The kitchen is decision fatigue's favorite hunting ground.

"What's for dinner?" gets asked 365 times a year. Each time, you're not just deciding what to eat—you're mentally scanning ingredients, schedules, preferences, and what you had yesterday.

The average family wastes $1,500/year on food that goes bad. Not because they bought wrong—because they didn't have a plan.

Two AI companions working together can eliminate both problems: one plans the meals, one generates the grocery list. Your fridge is about to make sense.`}
                        />

                        <PasswordGate partNumber={2} chapterNumber={5}>
                            {/* CAPTAIN EFFICIENCY - OPENER */}
                            {!blitzMode && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="default"
                                        message="Welcome back, Explorer! You've got your mornings under control. Now let's tackle the second-biggest chaos zone in your home: the kitchen. By the end of this expedition, you'll have TWO companions working together—one that plans your meals, one that builds your grocery list. Say goodbye to 'what's for dinner?' forever."
                                    />
                                </Suspense>
                            )}

                            {/* Blitz Mode Notice */}
                            {blitzMode && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-teal-900/30 rounded-xl p-4 border border-teal-500/40 backdrop-blur-sm mb-8"
                                >
                                    <div className="flex items-center gap-2 text-teal-400">
                                        <Zap size={18} />
                                        <span className="font-bold">Blitz Mode Active</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Showing only essential prompts and tools. Toggle off for full expedition.
                                    </p>
                                </motion.div>
                            )}

                            {/* STORY HOOK */}
                            <StoryHook
                                hook={
                                    <>
                                        <strong className="text-white">5:47 PM. The Martinez kitchen.</strong>{' '}
                                        "What's for dinner?" The question hung in the air like an accusation.
                                        Mom opened the fridge. Dad checked the freezer. Both sighed.{' '}
                                        <span className="text-teal-400 font-medium">
                                            Forty-five minutes later, they ordered pizza. Again.
                                        </span>
                                    </>
                                }
                                fullStory={
                                    <>
                                        <p className="text-slate-300 mb-4">
                                            Sound familiar? The Martinez family was spending $460/week between groceries, takeout, and food they threw away.
                                            Thirty-five percent of what they bought ended up in the trash.
                                        </p>
                                        <p className="text-slate-300 mb-4">
                                            Eight weeks after deploying their Kitchen Companions, they're down to $235/week. Food waste: 10%.
                                            The kids actually eat what's served (most nights).
                                        </p>
                                        <div className="bg-teal-900/20 rounded-lg p-4 border-l-4 border-teal-500/50 my-4">
                                            <p className="text-slate-300 mb-2">
                                                <strong className="text-white">The secret?</strong> Sunday morning, they generate the week's plan over coffee.
                                                Grocery order is placed by 10 AM. No more mid-week "we have nothing to eat" store runs.
                                            </p>
                                            <p className="text-slate-400 text-sm">
                                                Two companions. One conversation. Entire week of food: handled.
                                            </p>
                                        </div>
                                    </>
                                }
                            />

                            {/* STATS - The Problem */}
                            {!blitzMode && (
                                <section className="mb-10">
                                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                        <AlertTriangle className="text-amber-400" size={24} />
                                        THE KITCHEN CHAOS PROBLEM
                                    </h2>
                                    <p className="text-slate-400 mb-6">
                                        Decision fatigue's favorite hunting ground. Every night, same questions.
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                        <StatCard value="365x" label="'what's for dinner?' per year" color="red" />
                                        <StatCard value="$1,500" label="wasted food annually" color="red" />
                                        <StatCard value="35%" label="avg food waste" color="red" />
                                        <StatCard value="$200+" label="saved monthly" color="teal" />
                                    </div>
                                </section>
                            )}

                            {/* NEWBIE BOX */}
                            <NewbieBox title="How does AI help with meals?">
                                <p className="mb-2">
                                    A Meal Planning Companion remembers your family's preferences, dietary restrictions, and schedule—then generates
                                    <strong className="text-white"> personalized weekly plans</strong> in seconds.
                                </p>
                                <p>
                                    A Grocery List Companion takes that meal plan and creates an <strong className="text-white">organized shopping list by store section</strong>.
                                    No more wandering aisles forgetting what you need.
                                </p>
                            </NewbieBox>

                            {/* Before/After */}
                            <BeforeAfter
                                before={[
                                    '"What\'s for dinner?" asked 365 times a year',
                                    'Impulse grocery runs 2-3 times per week',
                                    '35% of food wasted (forgot it was there)',
                                    'Same 5 recipes on rotation (boring)',
                                ]}
                                after={[
                                    'Entire week planned in one Sunday conversation',
                                    'One organized grocery order per week',
                                    'Buy only what you\'ll actually cook',
                                    'Variety optimized for your family\'s tastes',
                                ]}
                                metric={{ before: '$460/wk', after: '$235/wk', label: 'average family' }}
                            />

                            {/* ★ TOOL FIRST: Food Chaos Calculator ★ */}
                            <section id="food-calculator" className="mb-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-teal-500/50" />
                                    <span className="text-teal-400 font-bold uppercase text-sm tracking-wider">Calculate Your Food Chaos</span>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-teal-500/50" />
                                </div>

                                <Suspense fallback={
                                    <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-800/50 rounded-xl animate-pulse">
                                        Loading calculator...
                                    </div>
                                }>
                                    <FoodChaosCalculator />
                                </Suspense>
                            </section>

                            {/* PROMPT 1: MEAL PLANNER */}
                            <QuickWin
                                title="Companion 1: The Meal Planner"
                                setupTime="15 min"
                                prompt={mealPlannerPrompt}
                            />

                            {/* DEEP DIVE - How the two companions work together */}
                            <DeepDive title="How the two companions work together">
                                <div className="space-y-4 text-sm">
                                    <p className="text-slate-300">
                                        The magic is in the <strong className="text-white">handoff</strong>. One companion creates, the other organizes.
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-3">
                                        {[
                                            { emoji: '📋', label: 'PLAN', desc: 'Meal Planner creates your weekly menu' },
                                            { emoji: '📝', label: 'LIST', desc: 'You paste the plan to Grocery Companion' },
                                            { emoji: '🛒', label: 'SHOP', desc: 'Organized list by store section' },
                                        ].map((step, i) => (
                                            <div key={i} className="bg-slate-900/50 rounded-lg p-3 text-center">
                                                <div className="text-2xl mb-2">{step.emoji}</div>
                                                <div className="text-purple-400 font-bold text-xs mb-1">{step.label}</div>
                                                <div className="text-slate-400 text-xs">{step.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-slate-400 text-xs">
                                        Pro tip: In the future, you'll be able to chain these automatically. For now, copy-paste is the bridge.
                                    </p>
                                </div>
                            </DeepDive>

                            {/* PROMPT 2: GROCERY LIST */}
                            <QuickWin
                                title="Companion 2: The Grocery List Generator"
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

                            {/* CARD UNLOCK - Meal Planner Agent */}
                            <AgentCardUnlock
                                card={mealPlannerCard}
                                onUnlock={handleCardUnlock}
                                onComplete={() => console.log('Card added to deck')}
                                autoReveal={false}
                            />

                            {/* CASE STUDY */}
                            {!blitzMode && (
                                <CaseStudyCard
                                    name="The Martinez Family"
                                    role="2 adults, 3 kids (ages 4, 7, 11)"
                                    problem="$460/week on groceries + takeout. 35% food waste. Constant dinner stress."
                                    result="$235/week average. 10% waste. Kids actually eat what's served (most nights)."
                                    timeframe="8 weeks"
                                    quote="We went from food chaos to food peace. Sunday morning: generate plan, place order, done by 10 AM. No more mid-week panic."
                                />
                            )}

                            {/* SHAREABLE QUOTE */}
                            <ShareableQuote
                                quote="The best meal plan isn't about eating healthy. It's about deciding once so you don't decide 21 times a week."
                                chapter={5}
                            />

                            {/* CAPTAIN EFFICIENCY - CLOSER */}
                            {!blitzMode && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="celebrating"
                                        message="Outstanding work, Explorer! You just automated the most-asked question in households worldwide. No more staring into the fridge. No more 'I don't know, what do YOU want?' No more $40 impulse runs. Your Meal Planning and Grocery Companions are now a team. Next up: we tackle the REST of your household chaos—cleaning, maintenance, all of it. 🏠"
                                    />
                                </Suspense>
                            )}

                            {/* MISSION COMPLETE */}
                            <MissionComplete
                                operationId="exp_5"
                                operationName="KITCHEN SYNC"
                                operationNumber={5}
                                nextOperationPath="/part2/chapter3"
                                nextOperationName="HOUSEHOLD COMMAND"
                                rewards={{
                                    dp: 200,
                                    cards: ['Meal Planning Companion', 'Grocery List Companion'],
                                    achievements: ['kitchen_sync', 'two_companion_team']
                                }}
                                stats={{
                                    objectivesCompleted: "3/3",
                                }}
                            />

                            {/* Bottom Navigation */}
                            <ChapterNavigation
                                previousChapter="/part2/chapter1"
                                nextChapter="/part2/chapter3"
                                partNumber={2}
                                chapterNumber={5}
                            />
                        </PasswordGate>

                    </div>
                </div>
            </BlitzModeContext.Provider>
        </WebbookLayout>
    );
};

export default Chapter5;
