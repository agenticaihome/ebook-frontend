import React, { Suspense, lazy } from 'react';
import { ArrowRight, Clock, CheckCircle, Zap } from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';

const QuickStart = () => {
    return (
        <WebbookLayout currentPart={6}>
            <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#131320] to-[#0a0a0f]">
                {/* Hero Section */}
                <section className="py-16 px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-block p-4 rounded-full bg-green-900/30 text-green-400 mb-6 border border-green-500/30">
                            <Zap size={48} />
                        </div>
                        <h1 className="text-5xl font-bold text-white mb-6">Quick Start Guide</h1>
                        <p className="text-2xl text-cyan-400 mb-4">
                            Your First Agent in 20 Minutes
                        </p>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Skip the theory. This is the fastest path from "just read the book" to "I have a working agent handling my life."
                        </p>
                    </div>
                </section>

                {/* The 20-Minute Protocol */}
                <section className="py-16 px-6 bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">The 20-Minute Protocol</h2>
                        <p className="text-slate-300 text-center mb-12">
                            Follow these steps <strong className="text-white">exactly</strong>. No skipping. No "I'll do it later." <span className="text-cyan-400 font-bold">Right now.</span>
                        </p>

                        {/* Step 1 */}
                        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-8 rounded-2xl border border-purple-500/50 mb-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-purple-500/20 text-purple-400 rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Pick Your Brain (5 min)</h3>
                                    <p className="text-slate-400 text-sm">Choose the AI tool that will run your agents</p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 p-6 rounded-xl mb-4">
                                <p className="text-white font-bold mb-3">Recommended: Claude (claude.ai)</p>
                                <div className="space-y-2 text-sm text-slate-300">
                                    <div>✓ Best for thoughtful, nuanced responses</div>
                                    <div>✓ Strong privacy protections</div>
                                    <div>✓ $20/month (free tier available)</div>
                                </div>
                            </div>

                            <div className="bg-yellow-900/30 p-4 rounded-xl border border-yellow-500/30">
                                <p className="text-yellow-400 font-bold text-sm mb-2">⚡ ACTION:</p>
                                <div className="space-y-2 text-xs text-slate-300">
                                    <div>1. Go to <span className="text-cyan-400 font-mono">claude.ai</span></div>
                                    <div>2. Create free account (takes 2 min)</div>
                                    <div>3. Open a new conversation</div>
                                    <div>4. Come back here when ready ✅</div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-8 rounded-2xl border border-cyan-500/50 mb-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-cyan-500/20 text-cyan-400 rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Choose Your First Agent (2 min)</h3>
                                    <p className="text-slate-400 text-sm">Pick the ONE thing that's driving you crazy RIGHT NOW</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-slate-900/50 p-4 rounded-xl border border-green-500/30">
                                    <p className="text-green-400 font-bold mb-2">Email Chaos?</p>
                                    <p className="text-xs text-slate-400">Inbox at 47+ unread, important stuff gets buried</p>
                                    <p className="text-cyan-400 text-xs mt-2">→ Start: Email Triage Agent</p>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-xl border border-orange-500/30">
                                    <p className="text-orange-400 font-bold mb-2">Mental Load?</p>
                                    <p className="text-xs text-slate-400">3 AM wake-ups remembering bills, tasks, appointments</p>
                                    <p className="text-cyan-400 text-xs mt-2">→ Start: Mental Wellbeing Agent</p>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-xl border border-purple-500/30">
                                    <p className="text-purple-400 font-bold mb-2">Meal Chaos?</p>
                                    <p className="text-xs text-slate-400">Takeout 5x/week, fridge full of expired food</p>
                                    <p className="text-cyan-400 text-xs mt-2">→ Start: Kitchen Agent</p>
                                </div>
                            </div>

                            <div className="bg-yellow-900/30 p-4 rounded-xl border border-yellow-500/30">
                                <p className="text-yellow-400 font-bold text-sm mb-2">⚡ ACTION:</p>
                                <p className="text-slate-300 text-xs">Pick ONE. Write it down. (Seriously, write it: "I'm starting with _____ Agent")</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-8 rounded-2xl border border-green-500/50 mb-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-green-500/20 text-green-400 rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Copy/Paste the Prompt (10 min)</h3>
                                    <p className="text-slate-400 text-sm">No thinking required. Just copy, paste, and answer Claude's questions.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Email Triage Prompt */}
                                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                                    <p className="text-green-400 font-bold mb-3">📧 Email Triage Agent Prompt:</p>
                                    <div className="bg-slate-950 p-4 rounded font-mono text-xs text-slate-300 mb-4 overflow-x-auto">
                                        {`You are my Email Triage Agent. Every morning, I'll paste my unread emails. Your job:

1. Categorize each as:
   - URGENT (needs reply today)
   - IMPORTANT (needs reply this week)
   - FYI (no reply needed)
   - SPAM (unsubscribe/delete)

2. For URGENT/IMPORTANT: draft a response

3. For SPAM: tell me why to unsubscribe

Ask me: What's your email pain point? (Too many newsletters? Missing important client emails? Getting buried in CC's?)`}
                                    </div>
                                    <button className="text-cyan-400 text-xs font-bold hover:text-cyan-300">
                                        📋 Copy Email Agent Prompt
                                    </button>
                                </div>

                                {/* Mental Load Prompt */}
                                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                                    <p className="text-orange-400 font-bold mb-3">🧠 Mental Load Agent Prompt:</p>
                                    <div className="bg-slate-950 p-4 rounded font-mono text-xs text-slate-300 mb-4 overflow-x-auto">
                                        {`You are my Mental Wellbeing Agent. I'm going to do a "worry dump" every evening at 9 PM.

Your job:
1. Take my random list of worries/tasks/thoughts
2. Triage into:
   - DO NOW (urgent, < 5 min)
   - SCHEDULE (needs time block)
   - DELEGATE (someone else should handle)
   - DELETE (not actually important)

3. For SCHEDULE items: suggest specific time slots tomorrow

Ask me: What time works best for your evening worry dump? What's your biggest mental load right now?`}
                                    </div>
                                    <button className="text-cyan-400 text-xs font-bold hover:text-cyan-300">
                                        📋 Copy Mental Load Agent Prompt
                                    </button>
                                </div>

                                {/* Kitchen Agent Prompt */}
                                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                                    <p className="text-purple-400 font-bold mb-3">🍳 Kitchen Agent Prompt:</p>
                                    <div className="bg-slate-950 p-4 rounded font-mono text-xs text-slate-300 mb-4 overflow-x-auto">
                                        {`You are my Kitchen Agent. I'll share:
- What's in my fridge/pantry
- My dietary restrictions
- How much time I have

Your job:
1. Suggest 3 meals I can make RIGHT NOW (no shopping)
2. Create a simple grocery list for the week (5-7 dinners)
3. Prevent food waste (tell me what's expiring soon)

Ask me: What's in your fridge right now? Any dietary restrictions? How many nights/week do you cook at home?`}
                                    </div>
                                    <button className="text-cyan-400 text-xs font-bold hover:text-cyan-300">
                                        📋 Copy Kitchen Agent Prompt
                                    </button>
                                </div>
                            </div>

                            <div className="bg-yellow-900/30 p-4 rounded-xl border border-yellow-500/30 mt-6">
                                <p className="text-yellow-400 font-bold text-sm mb-2">⚡ ACTION:</p>
                                <div className="space-y-1 text-xs text-slate-300">
                                    <div>1. Copy the prompt for YOUR chosen agent</div>
                                    <div>2. Paste into Claude</div>
                                    <div>3. Answer  Claude's questions honestly (2-3 min)</div>
                                    <div>4. Claude will create your custom system ✅</div>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-8 rounded-2xl border border-red-500/50">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-red-500/20 text-red-400 rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">
                                    4
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Test It Tomorrow (3 min)</h3>
                                    <p className="text-slate-400 text-sm">Proof that it works. See results by tomorrow evening.</p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 p-6 rounded-xl mb-4">
                                <p className="text-white font-bold mb-3">Tomorrow Morning Checklist:</p>
                                <div className="space-y-2 text-sm text-slate-300">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
                                        <span><strong>Email Agent:</strong> Paste your 10 newest emails → Get triage + draft responses</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
                                        <span><strong>Mental Load Agent:</strong> Do 9 PM worry dump → Wake up with clear action plan</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
                                        <span><strong>Kitchen Agent:</strong> Take fridge photo → Get 3 meals you can make tonight</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-900/30 p-4 rounded-xl border border-green-500/30">
                                <p className="text-green-400 font-bold text-sm mb-2">✅ SUCCESS METRIC:</p>
                                <p className="text-slate-300 text-xs">If you save 15-30 minutes tomorrow, you've validated the system. Now add agent #2.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What's Next */}
                <section className="py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-8 rounded-2xl border border-purple-500/50">
                            <h2 className="text-3xl font-bold text-white mb-6">After Your First Agent Works...</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="bg-purple-500/20 text-purple-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    <div>
                                        <p className="text-white font-bold">Week 2: Add Agent #2</p>
                                        <p className="text-slate-400 text-sm">Go back to the book → Pick your next biggest pain point</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-purple-500/20 text-purple-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    <div>
                                        <p className="text-white font-bold">Week 3-4: Add Agents #3-4</p>
                                        <p className="text-slate-400 text-sm">Calendar Defense + Admin Agent = 5-7 hrs/week saved</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-purple-500/20 text-purple-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                                    <div>
                                        <p className="text-white font-bold">Month 2: Read Part 4-5</p>
                                        <p className="text-slate-400 text-sm">Advanced systems (Recovery, Mental Load, Second Brain, Life OS)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/80 p-6 rounded-xl border border-cyan-500/30">
                                <p className="text-cyan-400 font-bold mb-2">📊 30-Day Target:</p>
                                <div className="space-y-1 text-sm text-slate-300">
                                    <div>• 4-5 agents running</div>
                                    <div>• 8-12 hours/week saved</div>
                                    <div>• Visible reduction in stress/overwhelm</div>
                                    <div>• Friends asking "how are you so calm?"</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <button
                                onClick={() => window.location.href = '/part1'}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold transition-all"
                            >
                                Start With Chapter 1
                                <ArrowRight size={20} />
                            </button>
                            <p className="text-slate-500 text-sm mt-4">Or jump straight to your agent's chapter if you're ready</p>
                        </div>
                    </div>
                </section>
            </div>
        </WebbookLayout>
    );
};

export default QuickStart;
