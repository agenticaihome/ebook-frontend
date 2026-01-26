import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, Terminal, Rocket, Server, Zap, Shield, Clock, Mail, Calendar, ExternalLink, Crown } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 11 - GOING ALWAYS-ON
// Clawdbot graduation for power users
// ============================================

const Chapter11 = () => {
    const [copiedInstall, setCopiedInstall] = useState(false);
    const [copiedMorning, setCopiedMorning] = useState(false);
    const [copiedMeal, setCopiedMeal] = useState(false);
    const [copiedMoney, setCopiedMoney] = useState(false);
    const [showComparison, setShowComparison] = useState(false);
    const [showCommands, setShowCommands] = useState(false);
    const { triggerDelight } = useImmersion();

    const installCommand = `curl -fsSL https://clawd.bot/install.sh | bash`;
    
    const morningCron = `clawdbot cron add \\
  --name "Morning Briefing" \\
  --cron "0 7 * * *" \\
  --tz "America/New_York" \\
  --session isolated \\
  --message "Good morning! Give me today's weather, my top 3 calendar events, and one thing I should remember. Keep it under 100 words." \\
  --deliver \\
  --channel telegram`;

    const mealCron = `clawdbot cron add \\
  --name "Meal Planning" \\
  --cron "0 18 * * 0" \\
  --tz "America/New_York" \\
  --session isolated \\
  --message "Create my dinner plan for this week. 5 weeknight meals under 30 minutes. Include a shopping list organized by store section." \\
  --deliver \\
  --channel telegram`;

    const moneyCron = `clawdbot cron add \\
  --name "Money Check-In" \\
  --cron "0 10 * * 0" \\
  --tz "America/New_York" \\
  --session isolated \\
  --message "It's Sunday. Walk me through my weekly money check-in. Ask about unusual purchases and upcoming expenses." \\
  --deliver \\
  --channel telegram`;

    const handleCopy = (text, setter) => {
        navigator.clipboard.writeText(text);
        setter(true);
        triggerDelight('copy');
        setTimeout(() => setter(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 11: Going Always-On | Agentic AI Home</title>
                <meta name="description" content="Graduate to 24/7 AI agents with Clawdbot. Unlimited automation, real integrations, full control." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-amber-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
                    <div className="absolute bottom-1/3 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-purple-500/10 rounded-full blur-[50px] sm:blur-[70px] md:blur-[100px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* BADGE */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/50">
                            <Crown className="text-amber-400" size={18} />
                            <span className="text-amber-300 text-sm font-bold">Bonus Chapter • Advanced • Power Users</span>
                        </div>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Going <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-400">Always-On</span>
                        </h1>
                        <p className="text-slate-300 text-lg mb-2">
                            24/7 agents that run while you sleep
                        </p>
                        <p className="text-slate-500 text-sm">
                            For readers who want unlimited automation and real integrations
                        </p>
                    </motion.div>

                    {/* CAPTAIN */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="You've hit the ceiling with ChatGPT Tasks — 10 active tasks, no real inbox access, running on someone else's servers. Ready to graduate? This chapter is for you."
                            />
                        </Suspense>
                    </motion.div>

                    {/* THE CEILING */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">You've Hit the Limits</h2>
                        
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 mb-4">
                            <p className="text-slate-300 mb-4">If you've implemented everything in this book, you've probably noticed:</p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-red-400 mt-1">✗</span>
                                    <span><strong className="text-white">10 Tasks max</strong> — not enough for a full agent army</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-red-400 mt-1">✗</span>
                                    <span><strong className="text-white">No real inbox access</strong> — still copy-pasting emails</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-red-400 mt-1">✗</span>
                                    <span><strong className="text-white">No calendar integration</strong> — can't actually see your schedule</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-red-400 mt-1">✗</span>
                                    <span><strong className="text-white">Their servers, their rules</strong> — you don't control the schedule</span>
                                </li>
                            </ul>
                        </div>

                        <p className="text-slate-400 text-sm">
                            For most people, these limits are fine. But if you want <em>true</em> always-on agents, there's a next level.
                        </p>
                    </motion.section>

                    {/* WHAT IS CLAWDBOT */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Enter Clawdbot</h2>

                        <div className="bg-gradient-to-br from-amber-900/20 to-purple-900/20 rounded-2xl p-5 border border-amber-500/30 mb-4">
                            <p className="text-slate-300 mb-4">
                                <strong className="text-white">Clawdbot</strong> is open-source software that turns your computer into an AI agent server. It's what the viral videos are showing.
                            </p>
                            
                            <div className="grid sm:grid-cols-2 gap-3">
                                <div className="flex items-start gap-2">
                                    <Server className="text-amber-400 mt-1 flex-shrink-0" size={16} />
                                    <span className="text-slate-300 text-sm">Runs 24/7 on your Mac, Windows, or Linux</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Mail className="text-amber-400 mt-1 flex-shrink-0" size={16} />
                                    <span className="text-slate-300 text-sm">Real Gmail and Calendar access</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Zap className="text-amber-400 mt-1 flex-shrink-0" size={16} />
                                    <span className="text-slate-300 text-sm">Unlimited scheduled jobs</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Shield className="text-amber-400 mt-1 flex-shrink-0" size={16} />
                                    <span className="text-slate-300 text-sm">You control everything</span>
                                </div>
                            </div>
                        </div>

                        {/* WHO IT'S FOR */}
                        <button
                            onClick={() => setShowComparison(!showComparison)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-slate-800/30 rounded-xl border border-slate-700/50 text-left hover:bg-slate-800/50 transition-colors"
                        >
                            <span className="text-slate-300 text-sm font-medium">Is Clawdbot right for me?</span>
                            <ChevronDown size={16} className={`text-slate-400 transition-transform ${showComparison ? 'rotate-180' : ''}`} />
                        </button>

                        {showComparison && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50"
                            >
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-green-400 font-bold text-sm mb-2">✓ Clawdbot is for you if:</h4>
                                        <ul className="text-slate-300 text-sm space-y-1">
                                            <li>• You want unlimited agents</li>
                                            <li>• You need real email/calendar access</li>
                                            <li>• Your computer runs 24/7 anyway</li>
                                            <li>• You want full control over your AI</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-slate-400 font-bold text-sm mb-2">✗ Stay with ChatGPT Tasks if:</h4>
                                        <ul className="text-slate-400 text-sm space-y-1">
                                            <li>• 10 tasks is enough</li>
                                            <li>• You don't need real integrations</li>
                                            <li>• You want zero maintenance</li>
                                            <li>• The current setup works for you</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* THE SETUP */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">The 30-Minute Setup</h2>

                        {/* REQUIREMENTS */}
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 mb-4">
                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                <Clock size={18} className="text-teal-400" />
                                What You'll Need
                            </h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• A computer that stays on (Mac, Windows via WSL, or Linux)</li>
                                <li>• An API key (Anthropic or OpenAI — same as you might already have)</li>
                                <li>• Telegram or WhatsApp on your phone</li>
                                <li>• 30 minutes of focused time</li>
                            </ul>
                        </div>

                        {/* STEP 1 */}
                        <div className="mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                                <h3 className="text-white font-bold">Install Clawdbot</h3>
                            </div>

                            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-slate-400 text-xs">Mac / Linux (one command)</span>
                                    <button
                                        onClick={() => handleCopy(installCommand, setCopiedInstall)}
                                        className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${copiedInstall ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                                    >
                                        {copiedInstall ? <><CheckCircle size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                                    </button>
                                </div>
                                <code className="text-teal-400 text-sm font-mono">{installCommand}</code>
                            </div>

                            <p className="text-slate-500 text-xs mt-2">
                                Windows users: Install WSL2 first, then run this in Ubuntu.
                            </p>
                        </div>

                        {/* STEP 2 */}
                        <div className="mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                                <h3 className="text-white font-bold">Run the Setup Wizard</h3>
                            </div>

                            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                                <code className="text-teal-400 text-sm font-mono">clawdbot onboard --install-daemon</code>
                            </div>

                            <p className="text-slate-400 text-sm mt-2">
                                The wizard walks you through: picking a model (Claude or GPT), entering your API key, connecting Telegram or WhatsApp, and installing as a background service.
                            </p>
                        </div>

                        {/* STEP 3 */}
                        <div className="mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                                <h3 className="text-white font-bold">Say Hello</h3>
                            </div>

                            <p className="text-slate-300 text-sm">
                                Open Telegram, find your bot, send a message. If it responds, you're live. 🎉
                            </p>
                        </div>
                    </motion.section>

                    {/* CONVERT YOUR AGENTS */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mb-8"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Convert Your Agents to Cron Jobs</h2>
                        <p className="text-slate-400 text-sm mb-4">
                            Every agent from this book can become an always-on scheduled job. Here are the conversions:
                        </p>

                        {/* MORNING BRIEFING */}
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-bold">☀️ Morning Briefing</h3>
                                <button
                                    onClick={() => handleCopy(morningCron, setCopiedMorning)}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${copiedMorning ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                                >
                                    {copiedMorning ? <><CheckCircle size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                                </button>
                            </div>
                            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap bg-slate-900/50 rounded-lg p-3 overflow-x-auto">{morningCron}</pre>
                            <p className="text-slate-500 text-xs mt-2">Runs every day at 7am ET</p>
                        </div>

                        {/* MEAL PLANNING */}
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-bold">🍽️ Meal Planning</h3>
                                <button
                                    onClick={() => handleCopy(mealCron, setCopiedMeal)}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${copiedMeal ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                                >
                                    {copiedMeal ? <><CheckCircle size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                                </button>
                            </div>
                            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap bg-slate-900/50 rounded-lg p-3 overflow-x-auto">{mealCron}</pre>
                            <p className="text-slate-500 text-xs mt-2">Runs every Sunday at 6pm ET</p>
                        </div>

                        {/* MONEY CHECK-IN */}
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-bold">💰 Money Check-In</h3>
                                <button
                                    onClick={() => handleCopy(moneyCron, setCopiedMoney)}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${copiedMoney ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                                >
                                    {copiedMoney ? <><CheckCircle size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                                </button>
                            </div>
                            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap bg-slate-900/50 rounded-lg p-3 overflow-x-auto">{moneyCron}</pre>
                            <p className="text-slate-500 text-xs mt-2">Runs every Sunday at 10am ET</p>
                        </div>

                        {/* MANAGEMENT COMMANDS */}
                        <button
                            onClick={() => setShowCommands(!showCommands)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-slate-800/30 rounded-xl border border-slate-700/50 text-left hover:bg-slate-800/50 transition-colors"
                        >
                            <span className="text-slate-300 text-sm font-medium flex items-center gap-2">
                                <Terminal size={16} />
                                Management Commands
                            </span>
                            <ChevronDown size={16} className={`text-slate-400 transition-transform ${showCommands ? 'rotate-180' : ''}`} />
                        </button>

                        {showCommands && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-900/50 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-2"
                            >
                                <div><span className="text-slate-500"># List all jobs</span></div>
                                <div className="text-teal-400">clawdbot cron list</div>
                                <div className="mt-3"><span className="text-slate-500"># Test a job now</span></div>
                                <div className="text-teal-400">clawdbot cron run "Morning Briefing" --force</div>
                                <div className="mt-3"><span className="text-slate-500"># Pause a job</span></div>
                                <div className="text-teal-400">clawdbot cron edit "Job Name" --disable</div>
                                <div className="mt-3"><span className="text-slate-500"># Delete a job</span></div>
                                <div className="text-teal-400">clawdbot cron remove "Job Name"</div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* POWER FEATURES */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mb-8"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">The Power Features</h2>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-4 border border-blue-500/30">
                                <Mail className="text-blue-400 mb-2" size={24} />
                                <h3 className="text-white font-bold mb-1">Real Gmail Access</h3>
                                <p className="text-slate-400 text-sm">
                                    With the <code className="text-blue-400">gog</code> skill, your agents can actually read your inbox and check your calendar.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-xl p-4 border border-green-500/30">
                                <Calendar className="text-green-400 mb-2" size={24} />
                                <h3 className="text-white font-bold mb-1">Calendar Integration</h3>
                                <p className="text-slate-400 text-sm">
                                    Your agents know your actual schedule. No more describing your day — they can see it.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/30">
                                <Zap className="text-purple-400 mb-2" size={24} />
                                <h3 className="text-white font-bold mb-1">Unlimited Jobs</h3>
                                <p className="text-slate-400 text-sm">
                                    No 10-task limit. Run as many agents as you want, on whatever schedule you need.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-xl p-4 border border-amber-500/30">
                                <Shield className="text-amber-400 mb-2" size={24} />
                                <h3 className="text-white font-bold mb-1">Full Control</h3>
                                <p className="text-slate-400 text-sm">
                                    Runs on your hardware. Your data stays local. You own everything.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* RESOURCES */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mb-8"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Resources</h2>

                        <div className="space-y-2">
                            <a
                                href="https://docs.clawd.bot"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors"
                            >
                                <span className="text-white">Clawdbot Docs</span>
                                <ExternalLink size={16} className="text-slate-400" />
                            </a>
                            <a
                                href="https://discord.com/invite/clawd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors"
                            >
                                <span className="text-white">Discord Community</span>
                                <ExternalLink size={16} className="text-slate-400" />
                            </a>
                            <a
                                href="https://github.com/clawdbot/clawdbot"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors"
                            >
                                <span className="text-white">GitHub Repository</span>
                                <ExternalLink size={16} className="text-slate-400" />
                            </a>
                        </div>
                    </motion.section>

                    {/* GRADUATION */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="mb-10"
                    >
                        <div className="bg-gradient-to-r from-amber-900/30 to-purple-900/30 rounded-2xl p-6 border border-amber-500/30 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm mb-4">
                                <Crown size={16} />
                                You've Graduated
                            </div>
                            <h3 className="text-white font-bold text-xl mb-3">Welcome to the Always-On Future</h3>
                            <p className="text-slate-300 text-sm mb-4">
                                You started this book wondering if AI could help with daily life.<br />
                                You're ending it with a personal AI staff running 24/7.
                            </p>
                            <p className="text-slate-400 text-sm">
                                The point was never the technology.<br />
                                It's about reclaiming your attention for what actually matters.
                            </p>
                        </div>

                        {/* Share */}
                        <div className="mt-6">
                            <Suspense fallback={<div className="h-12" />}>
                                <ShareToX chapterNumber={11} />
                            </Suspense>
                        </div>

                        {/* Back to Dashboard */}
                        <Link
                            to="/dashboard"
                            className="group flex items-center justify-center gap-3 w-full mt-6 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Rocket size={24} />
                            Back to Dashboard
                        </Link>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter11;
