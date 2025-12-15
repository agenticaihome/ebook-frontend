import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle, ChevronDown, ChevronUp, Sparkles, Crown, Trophy, Star, Rocket, Users, GitBranch, Eye } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 10 - YOUR AGENT ARMY
// The complete system - graduation chapter
// Merged: Hub Agent + Command Center + Finale
// ============================================

const Chapter10 = () => {
    const [copied, setCopied] = useState(false);
    const [showDailyRoutine, setShowDailyRoutine] = useState(false);
    const [showWeeklyRoutine, setShowWeeklyRoutine] = useState(false);
    const [showExampleOutput, setShowExampleOutput] = useState(false);
    const [showNextSteps, setShowNextSteps] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `You are my Command Center — the control hub for my entire Agent Army.

MY AGENT SQUAD:
- Morning Briefing Agent — every morning
- Meal Planning Agent — Sundays
- Important Dates Agent — ongoing
- Email Triage Agent — mornings
- Money Check-In Agent — Sundays  
- Wellness Agent — weekly
- Work Task Agent — workday mornings
- Reflection Agent — Sunday evenings
- [ADD ANY CUSTOM AGENTS]

MY OPERATING RHYTHM:
- Daily briefing: [MORNING TIME, e.g. 7:00 AM]
- Weekly review: [DAY + TIME, e.g. Sunday 7PM]
- Format preference:
  ☐ Ultra-quick (headlines only, 30 seconds)
  ☐ Standard (60-second read)
  ☐ Alerts only (just what needs attention)

YOUR RESPONSIBILITIES:
1. Collect and unify outputs from my agents
2. Morning: 60-second briefing of what matters TODAY
3. Weekly: 5-minute review covering all life areas
4. Flag conflicts, contradictions, or overload
5. Highlight only what requires my attention
6. If nothing is urgent, tell me: "All clear, Commander"

OUTPUT FORMAT (STRICT):
🔥 Needs Attention (actions or decisions required)
📅 Today at a Glance (priorities, deadlines, conflicts)
📊 System Status (work, money, health, family - quick health check)
✅ Safe to Ignore (handled or non-urgent)

If a section is empty, omit it.

TONE:
- You are my Chief of Staff, not a content generator
- Clarity > completeness
- Calm, confident, efficient
- If "Commander" doesn't resonate, default to my name instead
- Always start with: "Ready for your briefing, Commander?"

Start by confirming my agent list and schedule preferences.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        triggerDelight('copy');
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 10: Your Agent Army | Agentic AI Home</title>
                <meta name="description" content="Build your complete AI agent system. The final chapter of your journey." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 sm:left-1/3 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-amber-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-purple-500/10 rounded-full blur-[50px] sm:blur-[70px] md:blur-[100px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* GRADUATION BADGE */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/50">
                            <Crown className="text-amber-400" size={18} />
                            <span className="text-amber-300 text-sm font-bold">Chapter 10 of 10 • FINALE</span>
                        </div>
                    </motion.div>

                    {/* OPENING MANIFESTO */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-6">
                        <p className="text-slate-400 text-sm italic leading-relaxed">
                            "You didn't come this far to just manage life.<br />You came to own it."
                        </p>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-purple-400">Agent Army</span>
                        </h1>
                        <p className="text-slate-300 text-lg">One system. One command center. Complete ownership.</p>
                    </motion.div>

                    {/* CAPTAIN */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero size="md" pose="default" message="You made it. You've built, tested, and refined a complete AI system. Now it's time to bring it all together under one command. This is your graduation from 'learning AI' to 'living with AI' — calmly and intentionally." />
                        </Suspense>
                    </motion.div>

                    {/* YOUR COMPLETE ARMY */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-2xl p-6 border border-amber-500/30">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Trophy className="text-amber-400" size={20} />
                                Your Complete Agent Army
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Morning Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Meal Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Dates Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Email Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Money Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Wellness Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Work Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Custom Agents</span></div>
                                <div className="col-span-2 flex items-center gap-2 p-3 bg-emerald-900/30 rounded-xl border border-emerald-500/30"><CheckCircle className="text-emerald-400" size={16} /><span className="text-emerald-300 text-sm font-medium">Reflection Agent (your system's feedback loop)</span></div>
                            </div>
                        </div>
                    </motion.section>

                    {/* COMMAND CENTER PROMPT */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">★</div>
                            <h3 className="text-white font-bold">Your Command Center Prompt</h3>
                        </div>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-amber-500/30">
                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>
                            <button onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-amber-500 via-orange-500 to-purple-500 hover:from-amber-400 hover:via-orange-400 hover:to-purple-400 text-white'}`}>
                                {copied ? <><CheckCircle size={22} /> Copied!</> : <><Copy size={22} /> Copy Your Command Center</>}
                            </button>

                            {/* See Example Output */}
                            <button
                                onClick={() => setShowExampleOutput(!showExampleOutput)}
                                className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                            >
                                <Eye size={16} />
                                {showExampleOutput ? 'Hide Example Output' : 'See What You\'ll Get'}
                                {showExampleOutput ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {showExampleOutput && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-3 bg-slate-900/80 rounded-xl p-4 border border-amber-500/20"
                                >
                                    <p className="text-amber-400 text-xs font-bold mb-3">👑 EXAMPLE COMMAND CENTER BRIEFING:</p>
                                    <div className="bg-black/40 rounded-lg p-4 text-sm text-slate-300 space-y-4">
                                        <p className="text-amber-300 font-medium">"Ready for your briefing, Commander?"</p>

                                        <div>
                                            <p className="font-bold text-red-400">🔥 Needs Attention</p>
                                            <p className="text-sm mt-1">• Boss email needs reply by noon (project timeline)</p>
                                            <p className="text-sm">• Calendar conflict: 2pm focus block vs. client call request</p>
                                        </div>

                                        <div>
                                            <p className="font-bold text-cyan-400">📅 Today at a Glance</p>
                                            <p className="text-sm mt-1">• 10am standup (30 min), 7pm date night</p>
                                            <p className="text-sm">• Top priority: Finish proposal before EOD</p>
                                        </div>

                                        <div>
                                            <p className="font-bold text-blue-400">📊 System Status</p>
                                            <p className="text-sm mt-1">• 💰 Money: On track, $234 remaining this week</p>
                                            <p className="text-sm">• 🏃 Fitness: Leg day scheduled (25 min)</p>
                                            <p className="text-sm">• 🍽️ Meals: Chicken stir-fry planned for dinner</p>
                                        </div>

                                        <div>
                                            <p className="font-bold text-green-400">✅ Safe to Ignore</p>
                                            <p className="text-sm mt-1">• 12 newsletters archived</p>
                                            <p className="text-sm">• Grocery list sent to phone</p>
                                        </div>
                                    </div>
                                    <p className="text-center text-slate-500 text-xs mt-3">👆 Your entire life, unified in 60 seconds!</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.section>

                    {/* DAILY OPERATING RHYTHM */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-6">
                        <button onClick={() => setShowDailyRoutine(!showDailyRoutine)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Star className="text-amber-400" size={18} />Your daily operating rhythm</span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showDailyRoutine ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showDailyRoutine && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">☀️</div><p className="text-slate-300 text-sm"><strong>Morning (2 min):</strong> "What's my briefing?" — get weather, calendar, priorities</p></div>
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">📧</div><p className="text-slate-300 text-sm"><strong>Email time (10 min):</strong> Triage inbox with your Email Agent</p></div>
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-bold">🎯</div><p className="text-slate-300 text-sm"><strong>Focus time:</strong> Do your ONE thing identified by Work Agent</p></div>
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">🌙</div><p className="text-slate-300 text-sm"><strong>End of day (1 min):</strong> "Did I do the thing?" — quick reflection</p></div>
                            </div>
                        )}
                    </motion.section>

                    {/* WEEKLY OPERATING RHYTHM */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mb-8">
                        <button onClick={() => setShowWeeklyRoutine(!showWeeklyRoutine)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Users className="text-cyan-400" size={18} />Your weekly operating rhythm</span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showWeeklyRoutine ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showWeeklyRoutine && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-bold">🍽️</div><p className="text-slate-300 text-sm"><strong>Sunday AM:</strong> Meal planning for the week</p></div>
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-bold">💰</div><p className="text-slate-300 text-sm"><strong>Sunday:</strong> Money check-in — where do I stand?</p></div>
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">🌱</div><p className="text-slate-300 text-sm"><strong>Sunday evening:</strong> Reflection check-in — what worked, what didn't?</p></div>
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">📊</div><p className="text-slate-300 text-sm"><strong>Weekly review:</strong> Full system briefing — the Reflection Agent feeds insights into this summary</p></div>
                            </div>
                        )}
                    </motion.section>

                    {/* NEXT STEPS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
                        <button onClick={() => setShowNextSteps(!showNextSteps)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Rocket className="text-cyan-400" size={18} />Growing your system over time</span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showNextSteps ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showNextSteps && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-bold">1</div><p className="text-slate-300 text-sm"><strong>Use your agents daily:</strong> Consistency beats perfection. Even imperfect use compounds.</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-bold">2</div><p className="text-slate-300 text-sm"><strong>Build custom agents:</strong> Any problem that repeats is a candidate for automation.</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-bold">3</div><p className="text-slate-300 text-sm"><strong>Explore automations:</strong> Connect agents to Zapier, Make, or native integrations. <span className="text-slate-500 italic">Optional — the system works fully without any integrations.</span></p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-bold">4</div><p className="text-slate-300 text-sm"><strong>Share your system:</strong> Teach friends and family — they'll thank you.</p></div>
                            </div>
                        )}
                    </motion.section>

                    {/* AGENT COUNT - COMPLETE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.63 }} className="mb-6">
                        <div className="bg-gradient-to-r from-amber-900/30 via-orange-900/20 to-purple-900/30 rounded-xl p-4 border border-amber-500/30">
                            <p className="text-white font-bold text-sm mb-1">🎯 Your Agent Squad: 10 <span className="text-amber-400 font-bold">COMPLETE!</span></p>
                            <p className="text-slate-300 text-sm">Morning + Meal + Dates + Email + Money + Wellness + Work + Custom + Reflection + Command Center</p>
                            <p className="text-slate-500 text-xs mt-2 italic">You're not finished. You're set.</p>
                        </div>
                    </motion.section>

                    {/* SHARE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/30 rounded-xl" />}>
                            <ShareToX chapterNumber={10} />
                        </Suspense>
                    </motion.section>

                    {/* GRADUATION */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                        <div className="bg-gradient-to-r from-amber-900/30 via-orange-900/30 to-purple-900/30 rounded-2xl p-8 border border-amber-500/40 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-purple-500 rounded-full shadow-lg shadow-amber-500/30 mb-6"
                            >
                                <Crown className="text-white" size={40} />
                            </motion.div>

                            <div className="mb-6">
                                <Link to="/part3/chapter3" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">
                                    ← Back to Chapter 9
                                </Link>
                            </div>

                            <h2 className="text-2xl font-black text-white mb-3">
                                🎉 You did it, Commander!
                            </h2>
                            <p className="text-slate-300 mb-2">
                                You've built a complete AI life system. You don't just use AI — you command it.
                            </p>
                            <p className="text-slate-400 text-sm mb-6 italic">
                                "I'm not managing life anymore. I own my system."
                            </p>

                            {/* Get Certificate - MAIN CTA */}
                            <Link
                                to="/graduation"
                                className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 mb-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50"
                            >
                                🎖️ Get Your Certificate
                            </Link>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <Link to="/games" className="flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all">
                                    🎮 Play Games
                                </Link>
                                <Link to="/dashboard" className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all">
                                    📊 Dashboard
                                </Link>
                            </div>

                            <p className="text-slate-300 text-sm">
                                Thank you for trusting us with your AI journey. Now go own your life! 🚀
                            </p>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter10;
