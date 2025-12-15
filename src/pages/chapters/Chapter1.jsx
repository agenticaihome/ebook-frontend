import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, ChevronUp, Sparkles, Bell, ExternalLink, Sun, Calendar, Brain, AlertCircle, HelpCircle, Smartphone, Eye, Shield } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ProgressTracker = React.lazy(() => import('../../components/common/ProgressTracker'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 1 - SIMPLE, EFFECTIVE, HELPFUL
// For everyday users who want this to actually work
// ============================================

// Import shared AI platforms data (centralized to avoid duplication)
import { AI_PLATFORMS } from '../../data/aiPlatforms';

const Chapter1 = () => {
    const [copied, setCopied] = useState(false);
    const [showTroubleshooting, setShowTroubleshooting] = useState(false);
    const [showSetupTips, setShowSetupTips] = useState(false);
    const [showExampleOutput, setShowExampleOutput] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `You are my Morning Agent. Your job is to send me a short, helpful morning briefing every day.

**One-time setup (ask me these 3 questions):**
1. What city am I in? (for weather)
2. What time do I want this briefing? (ex: 7:00 AM)
3. What's one thing I tend to forget? (vitamins, keys, calling someone, etc.)

**Daily briefing (keep it under 120 words):**

🌤️ **Weather** — Look up the real current weather for my city (temp + conditions) and tell me what to wear.

📅 **Top 3 Today** — If I connected my calendar, list my next 3 events. If not, ask me for my 3 main things today.

🧠 **One Reminder** — The thing I usually forget (or a quick question if you need it).

⚡ **Captain's Tip** — One tiny action today that makes tomorrow easier.

---

**Rules:**
- Friendly, warm, simple language
- Emojis for easy scanning
- Under 120 words total
- If scheduling is available, set this to run daily at my chosen time
- If scheduling isn't available, tell me: "Type 'Morning Briefing' anytime and I'll generate today's briefing instantly."

Start by asking me question #1.`;

    // Fallback simple version for AI platforms without web access
    const simplePrompt = `You are my Morning Agent. Help me start each day focused.

Ask me 3 quick questions:
1. What city? (for weather)
2. What time for briefings?
3. What do I usually forget?

Then each morning give me:
🌤️ Weather + what to wear
📅 Top 3 things today
🧠 My usual reminder
⚡ One tiny win for the day

Under 100 words. Warm and helpful.
Start by asking my city.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        // Trigger delightful feedback on copy
        triggerDelight('copy');
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 1: Your Morning Agent | Agentic AI Home</title>
                <meta name="description" content="Create an AI agent that sends you a personalized briefing every morning. Step-by-step guide." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 sm:left-1/3 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-teal-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* BADGE */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 1 of 10 • ~5 min • Free</span>
                        </div>
                    </motion.div>

                    {/* PROGRESS TRACKER */}
                    <Suspense fallback={<div className="h-16" />}>
                        <ProgressTracker currentChapter={1} />
                    </Suspense>

                    {/* WHY THIS MATTERS */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-center mb-4"
                    >
                        <p className="text-slate-500 text-sm italic">
                            "You didn't wake up today to feel overwhelmed before breakfast."
                        </p>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400"> Morning Agent</span>
                        </h1>
                        <p className="text-slate-300 text-lg mb-2">
                            An AI that sends you a personalized briefing every morning.
                        </p>
                        <p className="text-slate-500 text-sm">
                            💡 "Agent" just means an AI helper that does tasks for you. Nothing technical!
                        </p>
                    </motion.div>

                    {/* OUTCOME BOX - What You'll Get */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-2xl p-4 mb-6 text-center"
                    >
                        <p className="text-white text-sm md:text-base">
                            ✅ <span className="font-medium">By the end of this 5-minute chapter</span>, you'll have an AI that sends you a personalized morning briefing every day.
                        </p>
                    </motion.div>


                    {/* CAPTAIN */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="Most people wake up, check their phone for 20 minutes, and still don't know what matters today. Let's fix that in 3 minutes."
                            />
                        </Suspense>
                    </motion.div>

                    {/* WHAT YOU'LL GET */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Bell className="text-teal-400" size={18} />
                                What you'll get every morning:
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <Sun className="text-amber-400 mt-1" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Weather check</span>
                                        <p className="text-slate-300 text-sm">So you know if you need an umbrella or jacket</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <Calendar className="text-teal-400 mt-1" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Your top 3 today</span>
                                        <p className="text-slate-300 text-sm">From your calendar if connected, or you tell it each morning</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <Brain className="text-purple-400 mt-1" size={18} />
                                    <div>
                                        <span className="text-white font-medium">One reminder</span>
                                        <p className="text-slate-300 text-sm">Something you told it you tend to forget</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* STEP 1: PICK AI */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                            <h3 className="text-white font-bold">Choose an AI (Any will work)</h3>
                        </div>

                        <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/50 mb-3">
                            <p className="text-slate-300 text-sm mb-3">
                                Don't have any of these? <strong className="text-teal-400">ChatGPT is the easiest to start with.</strong> It's free and takes 30 seconds to sign up with your Google or Apple account.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {AI_PLATFORMS.map((platform) => (
                                    <a
                                        key={platform.name}
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:scale-[1.02] transition-all`}
                                    >
                                        {platform.recommended && (
                                            <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[11px] px-2 py-0.5 rounded-full font-bold">
                                                POPULAR
                                            </span>
                                        )}
                                        {platform.logo}
                                        <span>{platform.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* STEP 2: THE PROMPT */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                            <h3 className="text-white font-bold">Copy this text and paste it</h3>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-teal-500/30">

                            {/* INSTANT GRATIFICATION: Show what they'll get FIRST */}
                            <div className="mb-5 bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-xl p-4 border border-teal-500/30">
                                <p className="text-teal-400 text-xs font-bold mb-2 flex items-center gap-2">
                                    <Eye size={14} />
                                    👀 PREVIEW: What you'll wake up to tomorrow
                                </p>
                                <div className="bg-black/40 rounded-lg p-3 text-sm text-slate-300 space-y-2">
                                    <p>☀️ <strong className="text-white">Weather:</strong> 72°F, partly cloudy. No umbrella needed!</p>
                                    <p>📅 <strong className="text-white">Today:</strong> Your top 3 priorities, ready to go</p>
                                    <p>🔔 <strong className="text-white">Reminder:</strong> That thing you always forget? Handled.</p>
                                    <p>⚡ <strong className="text-white">Captain's Tip:</strong> One small win to make tomorrow easier</p>
                                </div>
                                <p className="text-center text-slate-400 text-xs mt-3 italic">
                                    ✨ This is what calm mornings feel like. Copy below to make it yours.
                                </p>
                            </div>

                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>

                            <button
                                onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white'
                                    }`}
                            >
                                {copied ? (
                                    <><CheckCircle size={22} /> Copied! Your mornings are about to change ✨</>
                                ) : (
                                    <><Copy size={22} /> Copy These Instructions</>
                                )}
                            </button>

                            {/* EMOTIONAL PAYOFF: Explicit naming after copy */}
                            {copied && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-xl p-4 border border-green-500/30 text-center"
                                >
                                    <p className="text-green-400 font-bold text-sm mb-1">🎉 First Agent Created!</p>
                                    <p className="text-slate-300 text-sm mb-2">
                                        That anxious morning feeling? <span className="text-teal-400 font-medium">It's becoming calm focus.</span>
                                    </p>
                                    <p className="text-slate-500 text-xs">
                                        You're now ahead of 93% of people who only <em>think</em> about using AI.
                                    </p>
                                </motion.div>
                            )}

                            {/* Reassurance for hesitant users - ENHANCED */}
                            {!copied && (
                                <p className="text-center text-slate-500 text-xs mt-3">
                                    🛡️ This prompt is tested by 500+ people. You literally cannot break this.
                                </p>
                            )}

                            {/* Pro Tip: Calendar Connection */}
                            <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                                <p className="text-amber-400 text-xs font-bold mb-1">💡 PRO TIP</p>
                                <p className="text-slate-300 text-sm">
                                    Want your AI to <span className="text-white font-medium">automatically</span> know your schedule? Connect your Google Calendar to ChatGPT in Settings → Connected Apps.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* STEP 3: WHAT HAPPENS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                            <h3 className="text-white font-bold">Answer 3 questions</h3>
                        </div>

                        <div className="bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50">
                            <p className="text-slate-300 text-sm mb-4">The AI will ask you:</p>
                            <ul className="space-y-2 text-sm mb-4">
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-teal-400 font-bold">1.</span>
                                    <span><strong className="text-white">Where are you?</strong> - So it can get your weather</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-teal-400 font-bold">2.</span>
                                    <span><strong className="text-white">What time for your briefing?</strong> - e.g., 7:00 AM</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-teal-400 font-bold">3.</span>
                                    <span><strong className="text-white">What do you usually forget?</strong> - Keys, vitamins, calling mom, etc.</span>
                                </li>
                            </ul>
                            <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/30">
                                <p className="text-green-400 text-sm flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                                    <span><strong>That's it!</strong> Tomorrow morning, you'll get a notification with your first briefing.</span>
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* NOTIFICATIONS TIP */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mb-6">
                        <div className="bg-amber-900/20 rounded-2xl p-4 border border-amber-500/30">
                            <div className="flex items-start gap-3">
                                <Smartphone className="text-amber-400 flex-shrink-0 mt-0.5" size={20} />
                                <div>
                                    <p className="text-amber-400 font-bold text-sm mb-1">Important: Turn on notifications</p>
                                    <p className="text-slate-300 text-sm">
                                        For this to work, you need ChatGPT notifications enabled on your phone.
                                        Go to Settings → Notifications → ChatGPT → Allow.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* TROUBLESHOOTING */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mb-8">
                        <button
                            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 text-left hover:bg-slate-800/50 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                                <HelpCircle size={16} className="text-slate-300" />
                                Not working? Common questions
                            </span>
                            <ChevronDown size={16} className={`text-slate-300 transition-transform ${showTroubleshooting ? 'rotate-180' : ''}`} />
                        </button>

                        {showTroubleshooting && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 space-y-4"
                            >
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">"The AI didn't offer to send daily notifications"</p>
                                    <p className="text-slate-300 text-sm">Say: <span className="text-teal-400">"Can you set this up as a scheduled task that sends me a notification every day?"</span></p>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">"I don't see scheduling options"</p>
                                    <p className="text-slate-300 text-sm">This feature is mainly on ChatGPT. Claude and others may need you to start a new chat each morning (still useful, just manual).</p>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">"The AI didn't remember my info"</p>
                                    <p className="text-slate-300 text-sm">Say: <span className="text-teal-400">"Please remember this for next time"</span> - ChatGPT has a memory feature that stores your preferences.</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* NEXT - Jobs/Bezos Exclusivity Framing */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="mb-10"
                        onViewportEnter={() => {
                            // "One More Thing" - trigger confetti on first view
                            const hasSeenConfetti = localStorage.getItem('chapter1_confetti_seen');
                            if (!hasSeenConfetti) {
                                setShowConfetti(true);
                                localStorage.setItem('chapter1_confetti_seen', 'true');
                                setTimeout(() => setShowConfetti(false), 3000);
                            }
                        }}
                    >
                        {/* Confetti Celebration - "One More Thing" */}
                        {showConfetti && (
                            <div className="confetti-celebration">
                                {[...Array(15)].map((_, i) => (
                                    <div key={i} className="confetti-piece" />
                                ))}
                            </div>
                        )}

                        <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-2xl p-6 border border-green-500/30 text-center mb-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm mb-4 complete-pop">
                                <CheckCircle size={16} />
                                Chapter 1 Complete!
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2">You just built your first AI agent. 🎉</h3>
                            <p className="text-slate-300 text-sm mb-2">
                                Most people stop before they ever try this. <span className="text-white font-medium">You actually did it.</span>
                            </p>
                            <p className="text-slate-400 text-xs mb-4">
                                That heavy feeling you walked in with? It's becoming <span className="text-teal-400">calm focus</span>.
                            </p>
                        </div>

                        {/* YOUR NEW MORNING RITUAL - Names the habit explicitly */}
                        <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-2xl p-5 border border-amber-500/30 mb-6">
                            <h4 className="text-amber-400 font-bold text-sm mb-3 flex items-center gap-2">
                                <Sun size={16} />
                                ☀️ Your New Morning Ritual
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-500">1.</span>
                                    <span className="text-slate-300">Wake up</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-500">2.</span>
                                    <span className="text-slate-300">Open ChatGPT notification <span className="text-amber-400 text-xs">(or type "Morning Briefing")</span></span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-500">3.</span>
                                    <span className="text-slate-300">Read your personalized briefing while having coffee</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-500">4.</span>
                                    <span className="text-white font-medium">Start your day with clarity, not chaos ✨</span>
                                </div>
                            </div>
                            <p className="text-slate-500 text-xs mt-3 italic text-center">
                                Under 2 minutes. Simple. Calm. This is your new normal.
                            </p>
                        </div>

                        {/* TOMORROW HOOK - Explicit time anchor */}
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 mb-6">
                            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                                📅 What's Next
                            </h4>

                            {/* Tomorrow action */}
                            <div className="bg-teal-900/20 rounded-xl p-4 border border-teal-500/30 mb-4">
                                <p className="text-teal-400 font-bold text-sm mb-1">Tomorrow Morning</p>
                                <p className="text-slate-300 text-sm">
                                    Check ChatGPT for your first briefing. It'll feel like <span className="text-white font-medium">magic</span>.
                                </p>
                            </div>

                            {/* Chapter 2 preview */}
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                                <p className="text-purple-400 font-bold text-sm mb-1">📖 Your Next Agent (Chapter 2)</p>
                                <p className="text-white font-medium text-sm mb-1">The Meal Planning Agent</p>
                                <p className="text-slate-400 text-sm mb-2">
                                    No more "what's for dinner?" panic. <span className="text-teal-400">5 minutes to set up → 2+ hours/week saved</span>.
                                </p>
                                <p className="text-slate-500 text-xs italic">
                                    Best time: Tomorrow after your first briefing lands.
                                </p>
                            </div>
                        </div>

                        {/* Share to X */}
                        <Suspense fallback={<div className="h-12" />}>
                            <div className="mb-6">
                                <ShareToX chapterNumber={1} />
                            </div>
                        </Suspense>

                        {/* ONE MORE THING - Free Game CTA */}
                        <Link
                            to="/games"
                            className="group block mb-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-5 border border-purple-500/30 hover:border-purple-400/50 transition-all hover:scale-[1.01]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white">
                                    <Sparkles size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-purple-400 font-bold uppercase tracking-wide mb-1">🎮 Practice Your Skills</div>
                                    <div className="text-white font-bold">Play Deep Work Dive — FREE</div>
                                    <div className="text-slate-300 text-sm">Can you survive 30 distractions?</div>
                                </div>
                                <ArrowRight className="text-purple-400 group-hover:translate-x-1 transition-transform" size={20} />
                            </div>
                        </Link>

                        <Link
                            to="/unlock"
                            className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Continue Your Journey
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <div className="text-center mt-4 space-y-1">
                            <p className="text-slate-500 text-sm">
                                Reclaim 5+ hours every week — even 30 min/day = 3.5 hrs saved
                            </p>
                            <p className="text-green-400/80 text-xs flex items-center justify-center gap-1">
                                <Shield size={12} />
                                30-day money-back guarantee — no questions asked
                            </p>
                        </div>
                    </motion.section>

                </div>
            </div >
        </WebbookLayout >
    );
};

export default Chapter1;
