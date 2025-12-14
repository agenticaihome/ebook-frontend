import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, ChevronUp, Sparkles, DollarSign, TrendingUp, PiggyBank, AlertCircle, HelpCircle, Zap, Eye } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 5 - MONEY CHECK-IN AGENT
// Weekly financial snapshot without the stress
// ============================================

// Import shared AI platforms data
import { AI_PLATFORMS } from '../../data/aiPlatforms';

const Chapter5 = () => {
    const [copied, setCopied] = useState(false);
    const [showTroubleshooting, setShowTroubleshooting] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [showExampleOutput, setShowExampleOutput] = useState(false);
    const [showFillInHelpers, setShowFillInHelpers] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `Be my Money Check-In Agent.

Your job is to help me stay aware of my money without stress.

MY FINANCIAL SETUP:
- I get paid: [WEEKLY / BIWEEKLY / MONTHLY] on [DAY]
- Main bills: [RENT/MORTGAGE, UTILITIES, CAR, SUBSCRIPTIONS, ETC.]
- Weekly spending target (after bills): $[AMOUNT] (rough estimate is fine)
- Current savings goal: [GOAL + AMOUNT] (optional)

MY CHECK-IN STYLE:
- Comfort level: [ROUGH NUMBERS / DETAILED / SOMEWHERE IN BETWEEN]
- Biggest money stress: [OVERSPENDING / BILLS / SAVING / UNCERTAINTY]

On my weekly check-in (default: Sunday), ask me:
1. Any big or unusual purchases this week?
2. Any upcoming expenses or surprises I should plan for?

Then give me a quick status:
- How I'm doing relative to my spending target (or recent average if no target set)
- Bills due in the next 7 days
- Progress toward my savings goal (if applicable)

Rules:
- Keep it short and calm
- No judgment or shaming
- Rough numbers are always OK
- Clarity > precision

Start by helping me fill in the setup details above.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        triggerDelight('copy');
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 5: Money Check-In Agent | Agentic AI Home</title>
                <meta name="description" content="Get a weekly financial check-in that keeps you aware without the anxiety." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* BADGE */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/30">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 5 of 10 • Premium</span>
                        </div>
                    </motion.div>

                    {/* WHY THIS MATTERS */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-4">
                        <p className="text-slate-500 text-sm italic">
                            "Money stress shouldn't keep you up at night."
                        </p>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">Money Check-In Agent</span>
                        </h1>
                        <p className="text-slate-300 text-lg">
                            A weekly financial pulse check without the anxiety.
                        </p>
                    </motion.div>

                    {/* CAPTAIN */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="Money stress comes from not knowing. This agent gives you a weekly pulse check so you always know where you stand—no spreadsheets required."
                            />
                        </Suspense>
                    </motion.div>

                    {/* STEP 1 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                            <h3 className="text-white font-bold">Open your AI</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 mb-3">
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {AI_PLATFORMS.map((platform) => (
                                    <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer"
                                        className={`relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:scale-[1.02] transition-all`}>
                                        {platform.recommended && <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">POPULAR</span>}
                                        {platform.logo}
                                        <span>{platform.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* STEP 2 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                            <h3 className="text-white font-bold">Copy These Instructions and paste it</h3>
                        </div>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-green-500/30">
                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>
                            <button onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white'}`}>
                                {copied ? <><CheckCircle size={22} /> Copied!</> : <><Copy size={22} /> Copy These Instructions</>}
                            </button>

                            {/* See Example Output */}
                            <button
                                onClick={() => setShowExampleOutput(!showExampleOutput)}
                                className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                            >
                                <Eye size={16} />
                                {showExampleOutput ? 'Hide Example Output' : 'See What You\'ll Get'}
                                {showExampleOutput ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {showExampleOutput && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-3 bg-slate-900/80 rounded-xl p-4 border border-green-500/20"
                                >
                                    <p className="text-green-400 text-xs font-bold mb-2">💰 EXAMPLE SUNDAY CHECK-IN:</p>
                                    <div className="bg-black/40 rounded-lg p-3 text-sm text-slate-300 space-y-3">
                                        <p>📊 <strong className="text-white">This Week:</strong><br />• Groceries: ~$120<br />• Gas: $45<br />• Dinner out: $65</p>
                                        <p>📅 <strong className="text-white">Coming Up:</strong><br />• Rent due Friday ($1,400)<br />• Phone bill auto-pays Wednesday</p>
                                        <p>✅ <strong className="text-white">Your Status:</strong><br />"You're $80 under your weekly budget. Nice! Rent is covered. You have about $400 flex money until next paycheck."</p>
                                    </div>
                                    <p className="text-center text-slate-500 text-xs mt-3">👆 A 2-minute check-in that keeps you in control!</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.section>

                    {/* STEP 3 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                            <h3 className="text-white font-bold">Set up your weekly check-in</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                            <p className="text-slate-300 text-sm mb-3">
                                Your AI will help you fill in the blanks naturally. No bank login or precise tracking needed!
                            </p>
                            <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/30">
                                <p className="text-green-400 text-sm flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                                    <span><strong>Optional:</strong> If scheduling is available, set a weekly check-in. Otherwise, just open your AI anytime and say "Money check-in."</span>
                                </p>
                            </div>
                            <p className="text-slate-500 text-xs mt-3">
                                🔒 Your AI doesn't connect to your bank — you share what you want, in rough numbers. Nothing is stored.
                            </p>
                        </div>
                    </motion.section>

                    {/* FILL-IN HELPERS */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mb-6">
                        <button
                            onClick={() => setShowFillInHelpers(!showFillInHelpers)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-xl border border-green-500/30 text-left hover:from-green-900/30 hover:to-teal-900/30 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-white text-sm font-medium">
                                <Sparkles size={16} className="text-green-400" />
                                📝 Not sure what to type? See examples
                            </span>
                            <ChevronDown size={16} className={`text-green-400 transition-transform ${showFillInHelpers ? 'rotate-180' : ''}`} />
                        </button>

                        {showFillInHelpers && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 space-y-4"
                            >
                                <p className="text-slate-300 text-sm mb-3">Here's how to fill in each section:</p>

                                <div className="space-y-3">
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-green-400 text-xs font-bold mb-2 flex items-center gap-1"><DollarSign size={14} /> FINANCIAL SETUP</p>
                                        <p className="text-slate-300 text-sm font-mono">"I get paid biweekly on Fridays"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Main bills: rent $1400, car $350, utilities ~$150, Netflix/Spotify $25"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Weekly spending budget: about $400 after bills"</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-teal-400 text-xs font-bold mb-2 flex items-center gap-1"><PiggyBank size={14} /> SAVINGS GOALS</p>
                                        <p className="text-slate-300 text-sm font-mono">"Saving for a vacation - $3000 goal, I have $800 so far"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Emergency fund - trying to save $200/month"</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-amber-400 text-xs font-bold mb-2 flex items-center gap-1"><TrendingUp size={14} /> CHECK-IN STYLE</p>
                                        <p className="text-slate-300 text-sm font-mono">"I prefer rough numbers - I don't track every dollar"</p>
                                        <p className="text-slate-300 text-sm font-mono">"My biggest stress: I never know how much is left before the next paycheck"</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* WEEKLY USAGE GUIDE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68 }} className="mb-6">
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-5 border border-slate-700/50">
                            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                💰 Your Weekly Money Routine
                            </h3>
                            <p className="text-slate-400 text-xs mb-3">This isn't about being perfect — it's about staying informed.</p>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <span className="text-green-400 font-bold mt-0.5">1</span>
                                    <div>
                                        <span className="text-white font-medium">Quick brain dump:</span>
                                        <p className="text-slate-300">Say <span className="text-green-400 font-mono">"Money check-in: I spent about $300 this week, mostly groceries and gas"</span></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <span className="text-green-400 font-bold mt-0.5">2</span>
                                    <div>
                                        <span className="text-white font-medium">Get your status:</span>
                                        <p className="text-slate-300">AI tells you: budget status, upcoming bills, savings progress</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <span className="text-green-400 font-bold mt-0.5">3</span>
                                    <div>
                                        <span className="text-white font-medium">Adjust if needed:</span>
                                        <p className="text-slate-300">Say <span className="text-green-400 font-mono">"Tight week coming up - help me cut back"</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* WHAT YOU'LL GET */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-8">
                        <div className="bg-gradient-to-r from-green-500/5 to-teal-500/5 rounded-2xl p-6 border border-green-500/20">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Sparkles className="text-green-400" size={20} />
                                What you'll get
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-400 mt-0.5" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Weekly money pulse</span>
                                        <p className="text-slate-300 text-sm">A 3-line summary of where you stand. No spreadsheets. No guilt.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-400 mt-0.5" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Bill reminders</span>
                                        <p className="text-slate-300 text-sm">Never get surprised by due dates again</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-400 mt-0.5" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Spending awareness</span>
                                        <p className="text-slate-300 text-sm">Track without obsessing</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* TIPS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mb-8">
                        <button onClick={() => setShowTips(!showTips)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-green-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Zap className="text-amber-400" size={18} />Make it even better</span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showTips ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTips && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">1</div>
                                    <p className="text-slate-300 text-sm"><strong>Set a budget:</strong> "My weekly spending limit is $500. Warn me if I'm over."</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">2</div>
                                    <p className="text-slate-300 text-sm"><strong>Track goals:</strong> "I'm saving for a $3000 vacation. Remind me of my progress."</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">3</div>
                                    <p className="text-slate-300 text-sm"><strong>Keep it simple:</strong> Don't overcomplicate. 3 questions max.</p>
                                </div>
                            </div>
                        )}
                    </motion.section>

                    {/* TROUBLESHOOTING */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mb-8">
                        <button onClick={() => setShowTroubleshooting(!showTroubleshooting)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-green-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><HelpCircle className="text-slate-300" size={18} />Troubleshooting</span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showTroubleshooting ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTroubleshooting && (
                            <div className="mt-3 space-y-3">
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">"I don't want to share my account details"</p>
                                    <p className="text-slate-300 text-sm">Great! Don't. Just tell your AI rough numbers — "I spent about $300 on food." No bank login needed.</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">"I forget to check in"</p>
                                    <p className="text-slate-300 text-sm">Set a Sunday phone reminder: "Money check-in with AI." Takes 2 minutes.</p>
                                </div>
                            </div>
                        )}
                    </motion.section>

                    {/* AGENT COUNT */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.93 }} className="mb-6">
                        <div className="bg-gradient-to-r from-green-900/30 via-teal-900/20 to-blue-900/30 rounded-xl p-4 border border-green-500/30">
                            <p className="text-white font-bold text-sm mb-1">🎯 Your Agent Squad: 5 <span className="text-slate-400 font-normal">down. 5 to go. Halfway there!</span></p>
                            <p className="text-slate-300 text-sm">Morning + Meal + Dates + Email + Money</p>
                        </div>
                    </motion.section>

                    {/* SHARE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }} className="mb-6">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/30 rounded-xl" />}>
                            <ShareToX chapterNumber={5} />
                        </Suspense>
                    </motion.section>

                    {/* NEXT CHAPTER */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
                        <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-2xl p-6 border border-green-500/30 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm mb-4">
                                <CheckCircle size={16} />
                                Chapter 5 Complete!
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2">Ready for your Fitness Agent?</h3>
                            <p className="text-slate-300 text-sm mb-4">Workouts that actually fit your life.</p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                <Link to="/part2/chapter2" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">
                                    ← Back to Chapter 4
                                </Link>
                                <Link to="/part2/chapter3" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white font-bold rounded-xl transition-all">
                                    🎉 Halfway there! On to Chapter 6
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter5;
