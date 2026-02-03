import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../../components/layout/WebbookLayout';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, ChevronUp, Briefcase, Clock, Mail, Calendar, Brain, ExternalLink, Zap, AlertCircle, Settings, Play, Target } from 'lucide-react';

// ============================================
// WEEK 1 - CHIEF OF STAFF
// Morning briefings, email triage, priorities
// ============================================

const Week1 = () => {
    const [copiedPrompt, setCopiedPrompt] = useState(null);
    const [showZapierGuide, setShowZapierGuide] = useState(false);
    const [showTroubleshooting, setShowTroubleshooting] = useState(false);

    // Chief of Staff Prompt
    const chiefOfStaffPrompt = `You are my AI Chief of Staff. Your job is to help me start each day focused and prepared.

**Your daily responsibilities:**

1. **Morning Briefing** (send at 7:00 AM)
   - Weather for [YOUR CITY] and what to wear
   - My top 3 priorities for today (ask me if calendar isn't connected)
   - Any deadlines or important dates this week
   - One thing I'm likely to forget

2. **Email Triage** (when I share my inbox)
   - Flag urgent emails that need immediate response
   - Draft suggested replies for routine emails
   - Identify which emails can wait or be deleted
   - Summarize long threads in 2-3 sentences

3. **End of Day Review** (when I ask)
   - What got done today
   - What's rolling over to tomorrow
   - Any balls I might be dropping

**Rules:**
- Keep everything concise — I'm busy
- Use bullet points, not paragraphs
- If you need info, ask ONE question at a time
- Flag things by urgency: 🔴 Urgent, 🟡 Today, 🟢 This Week

**About my business:**
[DESCRIBE YOUR BUSINESS IN 1-2 SENTENCES]

Start by asking me: What city are you in, and what does your business do?`;

    // Email Triage Prompt
    const emailTriagePrompt = `I'm going to paste emails from my inbox. For each one, tell me:

1. **Priority:** 🔴 Urgent / 🟡 Today / 🟢 This Week / ⚪ Delete/Ignore
2. **Summary:** One sentence max
3. **Action:** What I should do (Reply, Delegate, Schedule, Archive)
4. **Draft:** If it needs a reply, write a 2-3 sentence draft

Keep it tight. I have 50 more emails to go through.

Here are the emails:
[PASTE EMAILS HERE]`;

    // Weekly Planning Prompt
    const weeklyPlanningPrompt = `Help me plan my week. I'll tell you what's on my plate, and you help me prioritize.

**The Framework:**
- 🎯 **Big 3**: The 3 things that would make this week a win
- 📅 **Time Blocks**: When I'll do focused work vs. meetings vs. admin
- 🚨 **Risks**: What might derail me and how to prevent it
- 🏆 **Quick Wins**: Easy tasks I can knock out to build momentum

**My context:**
- Business type: [YOUR BUSINESS]
- Biggest challenge right now: [YOUR CHALLENGE]
- Hours I can dedicate to business: [X HOURS/WEEK]

What do you have on your plate this week?`;

    const handleCopy = (prompt, id) => {
        navigator.clipboard.writeText(prompt);
        setCopiedPrompt(id);
        setTimeout(() => setCopiedPrompt(null), 3000);
    };

    const PromptCard = ({ id, title, description, prompt, icon: Icon }) => (
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <Icon className="text-white" size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold">{title}</h4>
                        <p className="text-slate-400 text-sm">{description}</p>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-slate-950/50">
                <pre className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto mb-4 font-mono">
                    {prompt}
                </pre>
                <button
                    onClick={() => handleCopy(prompt, id)}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                        copiedPrompt === id
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white'
                    }`}
                >
                    {copiedPrompt === id ? (
                        <><CheckCircle size={18} /> Copied!</>
                    ) : (
                        <><Copy size={18} /> Copy Prompt</>
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <WebbookLayout>
            <Helmet>
                <title>Week 1: Chief of Staff | AI for Small Business</title>
                <meta name="description" content="Build your AI Chief of Staff — morning briefings, email triage, and daily priorities in 30 minutes." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                {/* Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* BADGE */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Week 1 of 7 • ~30 min • Free Preview</span>
                        </div>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Hire Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"> Chief of Staff</span>
                        </h1>
                        <p className="text-slate-300 text-lg">
                            An AI that runs your mornings, triages your email, and keeps you focused on what matters.
                        </p>
                    </motion.div>

                    {/* OUTCOME BOX */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-5 mb-8"
                    >
                        <p className="text-white text-center">
                            ✅ <span className="font-medium">By the end of this chapter</span>, you'll have an AI that sends you a daily briefing, helps triage your inbox, and keeps your priorities clear.
                        </p>
                    </motion.div>

                    {/* WHY THIS MATTERS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="text-amber-400" size={20} />
                            Why Start Here?
                        </h2>
                        <div className="bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50">
                            <p className="text-slate-300 mb-4">
                                Your Chief of Staff is the <span className="text-white font-medium">foundation of your AI team</span>. Here's why:
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                        <Clock className="text-amber-400" size={16} />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Reclaim your mornings</p>
                                        <p className="text-slate-400 text-sm">Stop checking 5 apps to figure out what to do first</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-amber-400" size={16} />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Tame your inbox</p>
                                        <p className="text-slate-400 text-sm">Get through 50 emails in 10 minutes instead of 50</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                        <Brain className="text-amber-400" size={16} />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Protect your focus</p>
                                        <p className="text-slate-400 text-sm">Know exactly what matters today — no more decision fatigue</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ROI CALCULATOR */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="bg-green-900/20 border border-green-500/30 rounded-2xl p-5 mb-8"
                    >
                        <p className="text-green-400 font-bold mb-3 flex items-center gap-2">
                            <Zap size={18} />
                            ROI Calculator
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-2xl font-black text-white">30 min</p>
                                <p className="text-slate-400 text-xs">saved daily on email</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-white">15 min</p>
                                <p className="text-slate-400 text-xs">saved on morning planning</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-green-400">3.75 hrs</p>
                                <p className="text-slate-400 text-xs">saved per week</p>
                            </div>
                        </div>
                        <p className="text-center text-slate-400 text-sm mt-3">
                            At $50/hour, that's <span className="text-green-400 font-bold">$187.50/week</span> of your time back.
                        </p>
                    </motion.div>

                    {/* STEP 1: SET UP CHATGPT */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">1</div>
                            <h3 className="text-xl font-bold text-white">Set Up ChatGPT (5 min)</h3>
                        </div>

                        <div className="bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50 space-y-4">
                            <p className="text-slate-300">
                                We'll use ChatGPT as your Chief of Staff's "brain." Here's why:
                            </p>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                                    <span>Free tier is enough to start (upgrade to Plus for scheduling)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                                    <span>Can connect to your Google Calendar</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                                    <span>Memory feature remembers your preferences</span>
                                </li>
                            </ul>

                            <a
                                href="https://chat.openai.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all"
                            >
                                Open ChatGPT <ExternalLink size={16} />
                            </a>

                            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3">
                                <p className="text-amber-400 text-sm font-bold mb-1">💡 Pro Tip</p>
                                <p className="text-slate-300 text-sm">
                                    Already have ChatGPT Plus ($20/mo)? Go to Settings → Personalization → Memory and turn it ON. This lets your Chief of Staff remember your preferences.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* STEP 2: THE PROMPTS */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">2</div>
                            <h3 className="text-xl font-bold text-white">Copy These Prompts (10 min)</h3>
                        </div>

                        <p className="text-slate-300 mb-4">
                            Your Chief of Staff has <span className="text-white font-medium">3 core capabilities</span>. Set each one up by copying the prompt into ChatGPT:
                        </p>

                        <div className="space-y-4">
                            <PromptCard
                                id="chief"
                                title="Daily Briefing"
                                description="Get your morning rundown automatically"
                                prompt={chiefOfStaffPrompt}
                                icon={Briefcase}
                            />
                            <PromptCard
                                id="email"
                                title="Email Triage"
                                description="Sort and respond to emails 5x faster"
                                prompt={emailTriagePrompt}
                                icon={Mail}
                            />
                            <PromptCard
                                id="weekly"
                                title="Weekly Planning"
                                description="Plan your week with clarity"
                                prompt={weeklyPlanningPrompt}
                                icon={Calendar}
                            />
                        </div>
                    </motion.section>

                    {/* STEP 3: AUTOMATE */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">3</div>
                            <h3 className="text-xl font-bold text-white">Make It Automatic (Optional, 15 min)</h3>
                        </div>

                        <div className="bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50">
                            <p className="text-slate-300 mb-4">
                                Want your briefing to arrive <span className="text-white font-medium">automatically every morning</span>? Connect Zapier:
                            </p>

                            <button
                                onClick={() => setShowZapierGuide(!showZapierGuide)}
                                className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-white font-medium transition-all"
                            >
                                <span className="flex items-center gap-2">
                                    <Settings size={18} />
                                    Set up Zapier automation
                                </span>
                                {showZapierGuide ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>

                            {showZapierGuide && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 space-y-4"
                                >
                                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                        <p className="text-white font-bold mb-3">Quick Setup (Free Zapier Account)</p>
                                        <ol className="space-y-3 text-sm text-slate-300">
                                            <li className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</span>
                                                <span>Go to <a href="https://zapier.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">zapier.com</a> and create a free account</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</span>
                                                <span>Click "Create Zap" → Search "Schedule" for trigger</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</span>
                                                <span>Set trigger to "Every Day at 7:00 AM"</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</span>
                                                <span>Add action "ChatGPT" → "Conversation"</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</span>
                                                <span>Paste your Chief of Staff prompt as the message</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">6</span>
                                                <span>Add another action "Email" or "Slack" to send yourself the response</span>
                                            </li>
                                        </ol>
                                    </div>

                                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                                        <p className="text-green-400 text-sm">
                                            ✅ Done! You'll now get your briefing automatically every morning.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.section>

                    {/* TROUBLESHOOTING */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-8"
                    >
                        <button
                            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                            className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-slate-800/30 border border-slate-700/50 text-white font-medium transition-all hover:bg-slate-800/50"
                        >
                            <span className="flex items-center gap-2">
                                <AlertCircle size={18} className="text-amber-400" />
                                Common Issues & Fixes
                            </span>
                            {showTroubleshooting ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>

                        {showTroubleshooting && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50 space-y-4"
                            >
                                <div>
                                    <p className="text-white font-medium mb-1">"ChatGPT doesn't know my calendar"</p>
                                    <p className="text-slate-400 text-sm">Go to Settings → Connected Apps → Connect Google Calendar. Then ask ChatGPT to check your schedule.</p>
                                </div>
                                <div>
                                    <p className="text-white font-medium mb-1">"The responses are too long"</p>
                                    <p className="text-slate-400 text-sm">Add this to the prompt: "Keep all responses under 100 words. Use bullet points only."</p>
                                </div>
                                <div>
                                    <p className="text-white font-medium mb-1">"It forgot my preferences"</p>
                                    <p className="text-slate-400 text-sm">Make sure Memory is enabled in ChatGPT settings. Or save the prompt as a "Custom GPT" for persistence.</p>
                                </div>
                                <div>
                                    <p className="text-white font-medium mb-1">"Zapier costs money"</p>
                                    <p className="text-slate-400 text-sm">The free tier gives you 100 tasks/month — enough for daily briefings. Or skip automation and just type "Morning briefing" each day.</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* WHAT YOU BUILT */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-6 mb-8"
                    >
                        <p className="text-green-400 font-bold mb-4 flex items-center gap-2">
                            <CheckCircle size={20} />
                            What You Just Built
                        </p>
                        <ul className="space-y-2 text-slate-300">
                            <li className="flex items-center gap-2">
                                <CheckCircle className="text-green-400" size={16} />
                                AI Chief of Staff that gives you daily briefings
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="text-green-400" size={16} />
                                Email triage system to sort your inbox 5x faster
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="text-green-400" size={16} />
                                Weekly planning framework for clarity
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="text-green-400" size={16} />
                                (Optional) Zapier automation for hands-free delivery
                            </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-green-500/30">
                            <p className="text-white font-medium">
                                🎉 Your first AI hire is complete. Tomorrow morning, you'll feel the difference.
                            </p>
                        </div>
                    </motion.div>

                    {/* NEXT WEEK PREVIEW */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 mb-8"
                    >
                        <p className="text-slate-400 text-sm mb-2">Coming in Week 2</p>
                        <h3 className="text-xl font-bold text-white mb-2">AI Receptionist</h3>
                        <p className="text-slate-300 mb-4">
                            Never miss a call again. Set up 24/7 AI phone answering that qualifies leads, books appointments, and sends you summaries.
                        </p>
                        <div className="flex items-center gap-2 text-amber-400 text-sm">
                            <span>Tools: Upfirst, Intercom, Tidio</span>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="text-center"
                    >
                        <Link
                            to="/courses/business/week2"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02]"
                        >
                            Continue to Week 2
                            <ArrowRight size={20} />
                        </Link>
                        <p className="text-slate-500 text-sm mt-4">
                            Or take a day to practice with your Chief of Staff first.
                        </p>
                    </motion.div>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Week1;
