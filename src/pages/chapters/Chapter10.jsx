import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle, ChevronDown, ChevronUp, Sparkles, Crown, Trophy, Rocket, Star, HelpCircle, Zap, Eye } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 10 - YOUR AGENT ARMY
// The complete system - graduation chapter
// ============================================

const Chapter10 = () => {
    const [copied, setCopied] = useState(false);
    const [showChecklist, setShowChecklist] = useState(false);
    const [showNextSteps, setShowNextSteps] = useState(false);
    const [showExampleOutput, setShowExampleOutput] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `You are my Personal AI Command Center.

You coordinate all my agents:
- Morning Agent: Daily briefing
- Email Agent: Inbox triage
- Money Agent: Weekly finances
- Fitness Agent: Workout plans
- Work Agent: Task priorities

Every morning, give me a 60-second summary of what matters TODAY.
Every Sunday, give me a 5-minute review of my week.

Start by asking: "Ready for your briefing?"`;

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
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* GRADUATION BADGE */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/50">
                            <Crown className="text-amber-400" size={18} />
                            <span className="text-amber-300 text-sm font-bold">Chapter 10 of 10 • FINAL</span>
                        </div>
                    </motion.div>

                    {/* WHY THIS MATTERS */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-4">
                        <p className="text-slate-500 text-sm italic">
                            "You didn't come this far to just manage life. You came to own it."
                        </p>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-purple-400">Agent Army</span>
                        </h1>
                        <p className="text-slate-300 text-lg">The complete system. Welcome to the future.</p>
                    </motion.div>

                    {/* CAPTAIN */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero size="md" pose="default" message="You made it. You now have the skills to build, coordinate, and command an entire army of AI agents. This final chapter brings it all together." />
                        </Suspense>
                    </motion.div>

                    {/* WHAT YOU'VE BUILT */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-2xl p-6 border border-amber-500/30">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Trophy className="text-amber-400" size={20} />
                                Your Agent Army
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Morning Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Meal Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Dates Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Email Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Money Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Fitness Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Work Agent</span></div>
                                <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"><CheckCircle className="text-green-400" size={16} /><span className="text-slate-300 text-sm">Custom Agents</span></div>
                            </div>
                        </div>
                    </motion.section>

                    {/* THE MASTER PROMPT */}
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
                                    <p className="text-amber-400 text-xs font-bold mb-2">🌟 EXAMPLE COMMAND CENTER OUTPUT:</p>
                                    <div className="bg-black/40 rounded-lg p-3 text-sm text-slate-300 space-y-3">
                                        <p>👑 <strong className="text-white">Good morning, Commander! Ready for your briefing?</strong></p>
                                        <p>☀️ <strong className="text-amber-300">Weather:</strong> 72°F, clear skies</p>
                                        <p>📅 <strong className="text-amber-300">Today:</strong> Team standup (10am), dentist (2pm), date night (7pm)</p>
                                        <p>🎯 <strong className="text-amber-300">Priority:</strong> Finish quarterly report (due tomorrow)</p>
                                        <p>📧 <strong className="text-amber-300">Inbox:</strong> 4 emails need replies - nothing urgent</p>
                                        <p>💰 <strong className="text-amber-300">Money:</strong> On track for the week, $234 remaining in budget</p>
                                        <p>🏋️ <strong className="text-amber-300">Fitness:</strong> Leg day scheduled - 25 min workout ready</p>
                                        <p className="pt-2 text-white font-medium">"You've got this. Focus on that report and everything else will fall into place."</p>
                                    </div>
                                    <p className="text-center text-slate-500 text-xs mt-3">👆 Your entire life, organized in 60 seconds!</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.section>

                    {/* DAILY CHECKLIST */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
                        <button onClick={() => setShowChecklist(!showChecklist)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Star className="text-amber-400" size={18} />Your new daily routine</span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showChecklist ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showChecklist && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">☀️</div><p className="text-slate-300 text-sm"><strong>Morning (2 min):</strong> Ask your AI "What's my briefing?" — get weather, calendar, priorities</p></div>
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">📧</div><p className="text-slate-300 text-sm"><strong>Email time (10 min):</strong> Triage inbox with your Email Agent</p></div>
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-bold">🎯</div><p className="text-slate-300 text-sm"><strong>Focus time:</strong> Do your ONE thing identified by Work Agent</p></div>
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">📊</div><p className="text-slate-300 text-sm"><strong>Sunday (5 min):</strong> Weekly review — money, fitness, accomplishments</p></div>
                            </div>
                        )}
                    </motion.section>

                    {/* NEXT STEPS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
                        <button onClick={() => setShowNextSteps(!showNextSteps)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Rocket className="text-cyan-400" size={18} />What's next?</span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showNextSteps ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showNextSteps && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-bold">1</div><p className="text-slate-300 text-sm"><strong>Expand your agents:</strong> Use the Custom Builder to create agents for your specific needs</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-bold">2</div><p className="text-slate-300 text-sm"><strong>Explore automations:</strong> Connect agents to Zapier, Make, or native integrations</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-bold">3</div><p className="text-slate-300 text-sm"><strong>Share your system:</strong> Teach friends and family — they'll thank you</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-bold">4</div><p className="text-slate-300 text-sm"><strong>Play the games:</strong> Sharpen your skills in the Games Hub</p></div>
                            </div>
                        )}
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
                                🎉 You did it!
                            </h2>
                            <p className="text-slate-300 mb-6">
                                You've completed all 10 chapters. Your Agent Army is ready — AI is now working for you every day.
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
                                Thank you for trusting us with your AI journey. Now go save some time! 🚀
                            </p>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter10;
