import React, { useState, Suspense, createContext, useContext } from 'react';
import SEO from '../../components/SEO';
import { useNavigate } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import WebbookLayout from '../../components/layout/WebbookLayout';
import PasswordGate from '../../components/common/PasswordGate';
import ChapterNavigation from '../../components/common/ChapterNavigation';

import {
    Clock, ChevronDown, ChevronUp, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, ShoppingCart, Utensils,
    DollarSign, Target, Refrigerator, Trash2, Users, Calendar,
    AlertTriangle, HelpCircle, Leaf, ChefHat, Receipt, TrendingDown
} from 'lucide-react';

// Lazy load interactive components
const FoodChaosCalculator = React.lazy(() => import('../../components/FoodChaosCalculator'));
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
        default: {
            bg: 'from-green-900/30 to-emerald-900/20',
            border: 'border-green-500/40',
            icon: Zap,
            iconColor: 'text-green-400',
            btn: 'bg-green-500 text-white',
            btnHover: 'bg-slate-700 hover:bg-slate-600'
        },
        secondary: {
            bg: 'from-blue-900/30 to-cyan-900/20',
            border: 'border-blue-500/40',
            icon: ShoppingCart,
            iconColor: 'text-blue-400',
            btn: 'bg-blue-500 text-white',
            btnHover: 'bg-slate-700 hover:bg-slate-600'
        },
        bonus: {
            bg: 'from-purple-900/30 to-pink-900/20',
            border: 'border-purple-500/40',
            icon: Sparkles,
            iconColor: 'text-purple-400',
            btn: 'bg-purple-500 text-white',
            btnHover: 'bg-slate-700 hover:bg-slate-600'
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
                        {variant === 'bonus' ? 'Bonus Agent' : 'Quick Win'}
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
                    ? v.btn
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
                    <span className="text-green-400 font-bold block">Chapter 5 Complete</span>
                    <span className="text-slate-400 text-sm">You're 31% of the way there</span>
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
// CHAPTER 5 MAIN COMPONENT
// ============================================

const Chapter5 = () => {
    const [speedRun, setSpeedRun] = useState(false);
    const navigate = useNavigate();

    const scrollToCalculator = () => {
        document.getElementById('food-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const mealPlannerPrompt = `You are my Meal Planning Agent. Your job is to create weekly meal plans that my whole family will actually eat.

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

    const groceryListPrompt = `You are my Grocery List Agent. Based on the meal plan I provide, create an organized shopping list.

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
            <SEO
                title="Kitchen & Grocery - Agentic AI at Home"
                description="End 'what's for dinner?' forever. Automated meal planning and grocery lists."
                canonical="/part2/chapter2"
            />
            <SpeedRunContext.Provider value={speedRun}>
                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* Progress Bar with Part indicator */}
                        <ChapterProgress
                            current={5}
                            total={16}
                            part={2}
                            partTitle="Daily Operations"
                        />

                        {/* Author Credibility */}
                        <AuthorCredibility />

                        {/* Chapter Navigation */}
                        <ChapterNavigation
                            previousChapter="/part2/chapter1"
                            nextChapter="/part2/chapter3"
                            partNumber={2}
                            chapterNumber={5}
                        />

                        {/* Header */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="text-cyan-400 font-mono text-sm mb-2">Chapter 5</div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Kitchen & Grocery
                            </h1>
                            <p className="text-xl text-slate-400 mb-4">
                                End "what's for dinner?" forever—and save $200/month doing it
                            </p>

                            {/* Reading time + Speed Run toggle */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4 text-slate-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        <span>9 min read</span>
                                    </div>
                                    <span>•</span>
                                    <span className="text-orange-400">20 min to set up both agents</span>
                                </div>
                                <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                            </div>
                        </m.div>

                        {/* TL;DR Card */}
                        <TLDRCard
                            stats={[
                                { value: '$290', label: 'saved/month' },
                                { value: '2', label: 'agents working together' },
                                { value: '0', label: '"what\'s for dinner?"' },
                            ]}
                            primaryCTA="Calculate My Food Chaos"
                            onCTAClick={scrollToCalculator}
                        />

                        <PasswordGate partNumber={2} chapterNumber={5}>
                            {/* CAPTAIN EFFICIENCY - OPENER */}
                            {!speedRun && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="default"
                                        message="The kitchen is where families come together—or fall apart into hangry chaos. Every 'what's for dinner?' drains energy you could spend actually enjoying the meal. Let's fix that. By the end of this chapter, you'll have TWO agents working together: one that plans your meals, one that builds your grocery list. Your fridge is about to make sense."
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

                            {/* ★ TOOL FIRST: Food Chaos Calculator ★ */}
                            <section id="food-calculator" className="mb-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                                    <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Calculate Your Food Chaos</span>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
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
                                title="Agent 1: The Meal Planner"
                                setupTime="15 min"
                                prompt={mealPlannerPrompt}
                            />

                            {/* PROMPT 2: GROCERY LIST */}
                            <QuickWin
                                title="Agent 2: The Grocery List Generator"
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

                            {/* CASE STUDY */}
                            {!speedRun && (
                                <CaseStudyCard
                                    name="The Martinez Family"
                                    role="2 adults, 3 kids (ages 4, 7, 11)"
                                    problem="$460/week on groceries + takeout. 35% food waste. Constant dinner stress."
                                    result="$235/week average. 10% waste. Kids actually eat what's served (most nights)."
                                    timeframe="8 weeks"
                                    quote="We went from food chaos to food peace. Sunday planning takes 15 minutes now, and the whole week just... works."
                                />
                            )}

                            {/* SHAREABLE QUOTE */}
                            <ShareableQuote
                                quote="The best meal plan isn't about eating healthy. It's about deciding once so you don't decide 21 times a week."
                                chapter={5}
                            />

                            {/* CAPTAIN EFFICIENCY - CLOSER */}
                            {!speedRun && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="celebrating"
                                        message="You just automated the most-asked question in your household. No more staring into the fridge. No more 'I don't know, what do YOU want?' No more $40 impulse runs to the store. Your Meal Planning Agent and Grocery Agent are now a team. Next up: we tackle the rest of your household chaos—cleaning, maintenance, all of it. 🏠"
                                    />
                                </Suspense>
                            )}

                            {/* CHAPTER COMPLETE */}
                            <ChapterComplete
                                achievements={[
                                    'Calculated your food chaos cost (time + money)',
                                    'Built your family taste profile',
                                    'Set up Meal Planning Agent',
                                    'Set up Grocery List Agent',
                                    'Bonus: Leftover Transformer prompt',
                                ]}
                                nextChapter="/part2/chapter3"
                                nextTitle="Household Management"
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
            </SpeedRunContext.Provider>
        </WebbookLayout>
    );
};

export default Chapter5;
