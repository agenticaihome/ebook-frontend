import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, ChevronUp, Sparkles, RefreshCw, TrendingUp, Lightbulb, HelpCircle, Zap, Eye } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 9 - LEARNING & GROWTH
// Your system gets smarter with you
// ============================================

// Import shared AI platforms data
import { AI_PLATFORMS } from '../../data/aiPlatforms';

const Chapter9 = () => {
    const [copied, setCopied] = useState(false);
    const [showExamples, setShowExamples] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [showExampleOutput, setShowExampleOutput] = useState(false);
    const [showFillInHelpers, setShowFillInHelpers] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `Be my Reflection Agent.

Your role is to help me notice patterns and gently improve my system over time — without pressure or judgment.

Weekly check-in (default: Sunday evening)
Ask me only these 3 questions:
1. What worked well this week?
2. What felt harder than it should have?
3. Is there anything I want to do differently next week?

How to respond
- Listen first, then summarize briefly
- Point out patterns I might not notice
  (example: "This is the third week you've mentioned feeling rushed on Mondays")
- Offer one small suggestion at most (optional)
- Celebrate wins, even small ones

Rules
- Keep it calm and short (5 minutes max)
- No guilt, no "should have" language
- This is reflection, not optimization
- If I skip a week, welcome me back warmly
- Awareness beats perfection

Tone
Supportive. Curious. Like a wise friend checking in.

Start by asking me how my week went.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        triggerDelight('copy');
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 9: Learning & Growth | Agentic AI Home</title>
                <meta name="description" content="Your system gets smarter with you. Learn the power of gentle reflection." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 9 of 10 • Premium</span>
                        </div>
                    </motion.div>

                    {/* WHY THIS MATTERS */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-4">
                        <p className="text-slate-500 text-sm italic">
                            "Learning beats perfection. Every time."
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Learning & Growth</span>
                        </h1>
                        <p className="text-slate-300 text-lg">Your system gets smarter with you.</p>
                        <p className="text-slate-400 text-sm mt-2">No journaling required. If you only answer one sentence per question, that's enough.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero size="md" pose="default" message="You've built the agents. Now you learn how to make them BETTER over time — not through hustle, but through gentle awareness. This is where the magic compounds." />
                        </Suspense>
                    </motion.div>

                    {/* THE CONCEPT */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/30">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <RefreshCw className="text-emerald-400" size={20} />
                                How This Works
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                                    <div><span className="text-white font-medium">Weekly check-in</span><p className="text-slate-300 text-sm">5 minutes on Sunday to reflect — not plan, just notice</p></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                                    <div><span className="text-white font-medium">Spot patterns</span><p className="text-slate-300 text-sm">Your AI notices what you might miss (example: the same task keeps stressing you out every Monday)</p></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                                    <div><span className="text-white font-medium">Small adjustments</span><p className="text-slate-300 text-sm">Tiny tweaks that compound over months</p></div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">→</div>
                            <h3 className="text-white font-bold">Your Reflection Agent</h3>
                        </div>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-emerald-500/30">
                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>
                            <button onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white'}`}>
                                {copied ? <><CheckCircle size={22} /> Copied!</> : <><Copy size={22} /> Copy These Instructions</>}
                            </button>

                            {/* See Example Output */}
                            <button
                                onClick={() => setShowExampleOutput(!showExampleOutput)}
                                className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                            >
                                <Eye size={16} />
                                {showExampleOutput ? 'Hide Example Output' : 'See What You\'ll Get'}
                                {showExampleOutput ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {showExampleOutput && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-3 bg-slate-900/80 rounded-xl p-4 border border-emerald-500/20"
                                >
                                    <p className="text-emerald-400 text-xs font-bold mb-2">🌱 EXAMPLE REFLECTION CHECK-IN:</p>
                                    <div className="bg-black/40 rounded-lg p-3 text-sm text-slate-300 space-y-3">
                                        <p><strong className="text-white">You said:</strong> "My mornings felt rushed this week. I kept forgetting to check my briefing."</p>
                                        <p><strong className="text-emerald-300">Your AI noticed:</strong></p>
                                        <div className="bg-emerald-900/20 rounded-lg p-2 text-sm border border-emerald-500/20">
                                            <p>"That's the third week you've mentioned morning stress. I notice you usually check your phone first thing — would it help to set your briefing as your alarm notification? Just a thought."</p>
                                        </div>
                                        <p><strong className="text-white">Result:</strong> One tiny system tweak that fixes a recurring frustration.</p>
                                    </div>
                                    <p className="text-center text-slate-500 text-xs mt-3">👆 Awareness leads to effortless improvement!</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.section>

                    {/* FILL-IN HELPERS */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mb-6">
                        <button
                            onClick={() => setShowFillInHelpers(!showFillInHelpers)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 rounded-xl border border-emerald-500/30 text-left hover:from-emerald-900/30 hover:to-teal-900/30 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-white text-sm font-medium">
                                <Sparkles size={16} className="text-emerald-400" />
                                📝 Example reflection answers
                            </span>
                            <ChevronDown size={16} className={`text-emerald-400 transition-transform ${showFillInHelpers ? 'rotate-180' : ''}`} />
                        </button>

                        {showFillInHelpers && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 space-y-4"
                            >
                                <p className="text-slate-300 text-sm mb-3">Here's how a weekly reflection might sound:</p>

                                <div className="space-y-3">
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-emerald-400 text-xs font-bold mb-2 flex items-center gap-1"><TrendingUp size={14} /> WHAT WORKED WELL</p>
                                        <p className="text-slate-300 text-sm font-mono">"My meal planning agent saved me 3 grocery trips"</p>
                                        <p className="text-slate-300 text-sm font-mono">"I actually stuck to my workout plan all week"</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-teal-400 text-xs font-bold mb-2 flex items-center gap-1"><HelpCircle size={14} /> WHAT FELT HARDER</p>
                                        <p className="text-slate-300 text-sm font-mono">"Email still overwhelms me by Tuesday"</p>
                                        <p className="text-slate-300 text-sm font-mono">"I forgot to do my Sunday money check-in"</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-amber-400 text-xs font-bold mb-2 flex items-center gap-1"><Lightbulb size={14} /> WHAT TO TRY DIFFERENTLY</p>
                                        <p className="text-slate-300 text-sm font-mono">"Move email triage earlier in the day"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Set a Sunday reminder for the money check-in"</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* HOW THIS MAKES THE WHOLE SYSTEM BETTER */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
                        <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl p-6 border border-emerald-500/20">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Sparkles className="text-emerald-400" size={20} />How this improves your whole system</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3"><CheckCircle className="text-green-400 mt-0.5" size={18} /><div><span className="text-white font-medium">Agents get tweaked</span><p className="text-slate-300 text-sm">Your reflection reveals which prompts need adjusting</p></div></div>
                                <div className="flex items-start gap-3"><CheckCircle className="text-green-400 mt-0.5" size={18} /><div><span className="text-white font-medium">Rhythms get refined</span><p className="text-slate-300 text-sm">You'll notice if Sunday check-ins work better than Fridays</p></div></div>
                                <div className="flex items-start gap-3"><CheckCircle className="text-green-400 mt-0.5" size={18} /><div><span className="text-white font-medium">Patterns emerge</span><p className="text-slate-300 text-sm">After a month, you'll see what consistently helps (and what doesn't)</p></div></div>
                            </div>
                        </div>
                    </motion.section>

                    {/* TIPS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
                        <button onClick={() => setShowTips(!showTips)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Zap className="text-amber-400" size={18} />Make reflection even easier</span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showTips ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTips && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">1</div><p className="text-slate-300 text-sm"><strong>Same time each week:</strong> Sunday evening works for most people. Pick your time.</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">2</div><p className="text-slate-300 text-sm"><strong>Keep it short:</strong> 5 minutes max. If it feels like a chore, you'll skip it.</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">3</div><p className="text-slate-300 text-sm"><strong>Skip weeks guilt-free:</strong> Life happens. Your AI will welcome you back.</p></div>
                            </div>
                        )}
                    </motion.section>

                    {/* AGENT COUNT */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.63 }} className="mb-6">
                        <div className="bg-gradient-to-r from-emerald-900/30 via-teal-900/20 to-cyan-900/30 rounded-xl p-4 border border-emerald-500/30">
                            <p className="text-white font-bold text-sm mb-1">🎯 Your Agent Squad: 9 <span className="text-slate-400 font-normal">down. 1 to go. Almost there!</span></p>
                            <p className="text-slate-300 text-sm">Morning + Meal + Dates + Email + Money + Fitness + Work + Custom + Reflection</p>
                        </div>
                    </motion.section>

                    {/* SHARE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mb-6">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/30 rounded-xl" />}>
                            <ShareToX chapterNumber={9} />
                        </Suspense>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                        <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 rounded-2xl p-6 border border-emerald-500/30 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm mb-4"><CheckCircle size={16} />Chapter 9 Complete!</div>
                            <h3 className="text-white font-bold text-xl mb-2">Ready to command your entire system?</h3>
                            <p className="text-slate-300 text-sm mb-4">The finale: Your Agent Army awaits.</p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                <Link to="/part3/chapter2" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">
                                    ← Back to Chapter 8
                                </Link>
                                <Link to="/part4/chapter1" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl transition-all">🏆 Final chapter! Let's finish this<ArrowRight size={18} /></Link>
                            </div>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter9;
