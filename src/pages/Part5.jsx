import React, { useState, Suspense } from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import PasswordGate from '../components/common/PasswordGate';
import BackgroundEffects from '../components/common/BackgroundEffects';
import { motion } from 'framer-motion';
import { Layers, Home, Wrench, Flag, ArrowRight } from 'lucide-react';

const CaptainHero = React.lazy(() => import('../components/CaptainHero'));
const CaptainTip = React.lazy(() => import('../components/CaptainTip'));
const ProgressBar = React.lazy(() => import('../components/common/ProgressBar'));
const TryThisNow = React.lazy(() => import('../components/common/TryThisNow'));
const GoalHierarchyBuilder = React.lazy(() => import('../components/GoalHierarchyBuilder'));
const WeeklyReviewTemplateGenerator = React.lazy(() => import('../components/WeeklyReviewTemplateGenerator'));
const SmartHomeReadinessAssessment = React.lazy(() => import('../components/SmartHomeReadinessAssessment'));
const SystemHealthDiagnostic = React.lazy(() => import('../components/SystemHealthDiagnostic'));
const PersonalizedLaunchPlanGenerator = React.lazy(() => import('../components/PersonalizedLaunchPlanGenerator'));
const LifeOSDashboardPreview = React.lazy(() => import('../components/LifeOSDashboardPreview'));
const SocialShare = React.lazy(() => import('../components/tools/SocialShare'));
const WorkflowVisual = React.lazy(() => import('../components/common/WorkflowVisual'));
const YearOneRoadmap = React.lazy(() => import('../components/common/YearOneRoadmap'));

const Part5 = () => {
    const [activeChapter, setActiveChapter] = useState(13);

    const chapters = [
        { id: 13, title: 'Life Operating System', icon: Layers },
        { id: 14, title: 'Smart Home (Optional)', icon: Home },
        { id: 15, title: 'Maintenance & Future', icon: Wrench },
        { id: 16, title: 'Conclusion', icon: Flag }
    ];

    const scrollToChapter = (chapterId) => {
        setActiveChapter(chapterId);
        const element = document.getElementById(`chapter-${chapterId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
        <WebbookLayout>
            <PasswordGate>
                <ProgressBar current={activeChapter - 12} total={4} label="Part 5: The Life Operating System" />
                <div className="min-h-screen bg-[#0f0f1a] text-white">
                    {/* Hero Section */}
                    <section className="relative pt-24 pb-16 px-6 overflow-hidden">
                        <BackgroundEffects blob1Color="bg-purple-900/30" blob2Color="bg-cyan-900/20" />

                        <div className="max-w-4xl mx-auto relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-12"
                            >
                                <div className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4">Part 5: Capstone</div>
                                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                    The Life <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500">Operating System</span>
                                </h1>
                                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                                    From individual agents to a unified system. This is where automation becomes transformation.
                                </p>
                            </motion.div >

                            {/* Chapter Navigation */}
                            < div className="grid md:grid-cols-4 gap-4 mb-12" >
                                {
                                    chapters.map((chapter) => {
                                        const Icon = chapter.icon;
                                        return (
                                            <button
                                                key={chapter.id}
                                                onClick={() => scrollToChapter(chapter.id)}
                                                className={`p-4 rounded-xl border-2 transition-all text-left ${activeChapter === chapter.id
                                                    ? 'border-purple-500 bg-purple-900/20'
                                                    : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                                                    }`}
                                            >
                                                <Icon className={activeChapter === chapter.id ? 'text-purple-400' : 'text-slate-500'} size={24} />
                                                <div className="mt-2 text-xs font-mono text-slate-400">Chapter {chapter.id === 16 ? 'End' : chapter.id}</div>
                                                <div className="font-bold text-white text-sm">{chapter.title}</div>
                                            </button>
                                        );
                                    })
                                }
                            </div >
                        </div >
                    </section >

                    {/* Chapter 13: Life Operating System */}
                    < section id="chapter-13" className="py-16 px-6 bg-[#131320] border-y border-slate-800" >
                        <div className="max-w-4xl mx-auto">
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="celebrating"
                                    message="You just read about Maya. Built 12 agents. Her Morning Agent said 6 AM. Sleep Agent said 8 AM. Calendar had CEO call 7:30 AM. Zero coordination = triple chaos. Here's what happened: Agents optimizing individual domains WITHOUT talking to each other = civil war. Recovery Agent can't tell Calendar Agent to reschedule. Mental Load Agent doesn't know Second Brain Agent's 9 PM session. Life Operating System's job: Make agents COORDINATE. Priority hierarchy. Conflict resolution. One unified plan."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 13: Multi-Agent Systems</h2>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 mb-8">
                                    <h3 className="text-red-400 font-bold mb-3">The Agent Civil War</h3>
                                    <p className="text-white font-bold text-sm mb-3">
                                        Maya Patel, founder, remote startup, Los Angeles
                                    </p>
                                    <p className="text-slate-300 text-sm leading-loose md:leading-relaxed mb-4">
                                        Maya followed the entire book. Built ALL the agents. Email sorted. Calendar defended. Morning routine optimized.
                                    </p>
                                    <p className="text-red-400 font-bold text-lg mb-3">
                                        Tuesday morning: Her agents are fighting each other.
                                    </p>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <p className="text-white text-sm mb-2">The conflicts:</p>
                                        <div className="space-y-1 text-xs text-slate-400">
                                            <div>• <strong>Morning Agent:</strong> "Wake up 6 AM for 90-min routine"</div>
                                            <div>• <strong>Sleep Agent:</strong> "You only slept 5 hours. Stay in bed until 8 AM"</div>
                                            <div>• <strong>Calendar Agent:</strong> "First meeting 7:30 AM (can't move, CEO call)"</div>
                                            <div className="text-red-400 font-bold pt-2">Result: She woke up at 6 AM groggy, skipped routine, joined CEO call unprepared</div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <p className="text-white text-sm mb-2">More chaos this week:</p>
                                        <div className="space-y-2 text-xs text-slate-400">
                                            <div>
                                                <strong>Monday:</strong>
                                                <div className="pl-3 space-y-1 mt-1">
                                                    <div>• Kitchen Agent: "Meal prep takes 2 hours Sunday"</div>
                                                    <div>• Admin Agent: "Sunday 2 PM = bill payment time"</div>
                                                    <div>• Family Agent: "Sunday afternoon = kids' soccer games"</div>
                                                    <div className="text-red-400">Outcome: Skipped meal prep, ordered takeout all week ($180)</div>
                                                </div>
                                            </div>
                                            <div>
                                                <strong>Wednesday:</strong>
                                                <div className="pl-3 space-y-1 mt-1">
                                                    <div>• Mental Load Agent: "9 PM worry dump = offload tasks"</div>
                                                    <div>• Second Brain Agent: "9 PM = knowledge capture session"</div>
                                                    <div>• Sleep Agent: "Start wind-down 9 PM (lights dim, screens off)"</div>
                                                    <div className="text-red-400">Outcome: Tried to do all 3, finished at 10:30 PM, slept poorly</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-red-500/30 text-xs text-slate-400">
                                        <p className="text-white font-bold mb-2">The problem:</p>
                                        <div className="space-y-1">
                                            <div>Each agent is OPTIMIZING ITS OWN DOMAIN</div>
                                            <div>• Morning Agent doesn't know about Sleep Agent's recommendation</div>
                                            <div>• Kitchen Agent doesn't see Admin Agent's schedule</div>
                                            <div>• Mental Load Agent doesn't coordinate with Sleep Agent</div>
                                            <div className="text-red-400 font-bold pt-2">
                                                She built 12 optimized silos. Not a SYSTEM.
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-cyan-400 text-sm mt-4 italic">
                                        Individual agents = productivity. Coordinated agents = TRANSFORMATION.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-6 rounded-xl border border-purple-500/50 my-8">
                                    <h3 className="text-xl font-bold text-purple-400 mb-3">The Architecture</h3>
                                    <ul className="space-y-3 text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-xs font-bold mt-1">L3</span>
                                            <span><strong>Quarterly Architect:</strong> Sets the big vision (Health, Career, Family).</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-xs font-bold mt-1">L2</span>
                                            <span><strong>Weekly Strategist:</strong> Aligns this week's actions with quarterly goals.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-xs font-bold mt-1">L1</span>
                                            <span><strong>Daily Engine:</strong> Your agents (Morning, Kitchen, Calendar) executing the plan.</span>
                                        </li>
                                    </ul>
                                </div>

                                <Suspense fallback={<div className="h-48 animate-pulse bg-slate-800/50 rounded-xl my-8" />}>
                                    <WorkflowVisual
                                        title="System Architecture"
                                        inputs={[
                                            { label: "Quarterly Goals", icon: "flag" },
                                            { label: "Weekly Review", icon: "calendar" }
                                        ]}
                                        agentName="Life OS (Orchestrator)"
                                        outputs={[
                                            { label: "Daily Actions", icon: "list" },
                                            { label: "Agent Instructions", icon: "bot" }
                                        ]}
                                    />
                                </Suspense>

                                <h3 className="text-2xl font-bold text-purple-400 mt-12 mb-4">The 12-Month Roadmap</h3>
                                <p className="text-slate-300 mb-4">
                                    Don't try to build this all in a weekend. Here is the path to full autonomy.
                                </p>
                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <YearOneRoadmap />
                                </Suspense>

                                <h3 className="text-2xl font-bold text-purple-400 mt-12 mb-4">Building Your Goal Hierarchy</h3>
                                <p className="text-slate-300 mb-6">
                                    Your agents need to know what they are optimizing FOR. Let's define the "Commander's Intent."
                                </p>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <GoalHierarchyBuilder />
                                </Suspense>

                                <h3 className="text-2xl font-bold text-purple-400 mt-12 mb-4">The Weekly Review Ritual</h3>
                                <p className="text-slate-300 mb-6">
                                    This is the heartbeat of your system. 30 minutes on Sunday saves 5 hours of chaos during the week.
                                </p>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <WeeklyReviewTemplateGenerator />
                                </Suspense>

                                <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                                    <h4 className="text-green-400 font-bold mb-3">📖 Maya, 3 Months Later</h4>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        <p>Tuesday morning. Sleep Agent detects 5 hours.  <span className="text-white italic">Orchestrator overrides Morning Agent:</span></p>
                                        <div className="bg-slate-900/50 p-4 rounded my-3">
                                            <p className="text-green-400 font-bold text-sm mb-2">ORCHESTRATOR DECISION:</p>
                                            <div className="space-y-1 text-xs">
                                                <div>1. <strong>Calendar Agent:</strong> Reschedule CEO call to 10 AM (Maya emails: "Light sleep night, pushing 90 min")</div>
                                                <div>2. <strong>Sleep Agent:</strong> "Sleep until 8 AM" (recovery priority)</div>
                                                <div>3. <strong>Morning Agent:</strong> "SHORT routine" (20 min: shower, coffee, CEO prep)</div>
                                                <div className="text-green-400 font-bold pt-2">Result: Woke 8 AM rested. CEO call 10 AM = well-prepared. Day productive.</div>
                                            </div>
                                        </div>

                                        <p className="text-white font-bold">Sunday coordination:</p>
                                        <div className="bg-slate-900/50 p-4 rounded my-3">
                                            <p className="text-cyan-400 font-bold text-sm mb-2">WEEKLY ORCHESTRATOR PLAN:</p>
                                            <div className="space-y-1 text-xs">
                                                <div>• 10 AM-12 PM: Meal prep (Kitchen Agent)</div>
                                                <div>• 12-1 PM: Lunch</div>
                                                <div>• 1-3 PM: Kids' soccer (Family Agent blocks calendar)</div>
                                                <div>• 3:30-4 PM: Admin tasks (bills, renewals - Admin Agent queued list)</div>
                                                <div>• 9 PM: COMBINED wind-down (Mental Load worry dump → Second Brain capture → Sleep routine)</div>
                                                <div className="text-green-400 font-bold pt-2">All agents see ONE unified schedule. Zero conflicts.</div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-green-500/30">
                                            <p className="text-white font-bold text-sm mb-2">3-MONTH RESULTS:</p>
                                            <div className="space-y-1 text-xs text-slate-300">
                                                <div>• Agent conflicts: <span className="text-red-400">Daily</span> → <span className="text-green-400 font-bold">Zero (orchestrator resolves)</span></div>
                                                <div>• System override rate: <span className="text-green-400 font-bold">8 times/month</span> (Sleep Agent wins 6x, Calendar 2x)</div>
                                                <div>• Takeout spending: <span className="text-red-400">$180/week</span> → <span className="text-green-400 font-bold">$40/week</span> (meal prep protected)</div>
                                                <div>• Sleep quality: <span className="text-green-400 font-bold">7.2 hrs avg</span> (recovery prioritized over rigid routines)</div>
                                                <div>• Weekly plan execution: <span className="text-green-400 font-bold">92%</span> (agents coordinate, not compete)</div>
                                            </div>
                                            <p className="text-white italic text-sm mt-3">"I don't manage 12 agents anymore. I manage ONE system. It handles the conflicts. I just approve the plan every Sunday." — Maya Patel</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                                    <h4 className="text-yellow-400 font-bold mb-3">💬 Common Objections (And The Truth)</h4>

                                    <div className="space-y-4 text-sm">
                                        <div>
                                            <p className="text-white font-bold mb-2">"This sounds way too complex. Can't I just keep individual agents?"</p>
                                            <p className="text-cyan-400 text-xs">Maya tried that for 2 months. Result: Agent civil war. Orchestrator ISN'T more complex—it's a CONFLICT RESOLVER. You set priority hierarchy once (Health &gt; Family &gt; Work). Orchestrator applies it automatically.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"What if the orchestrator makes the WRONG decision?"</p>
                                            <p className="text-slate-300 text-xs mb-1">Maya's safety net: Weekly review shows all orchestrator overrides.</p>
                                            <p className="text-green-400 text-xs">In 3 months: 24 overrides total. 22 correct (she agreed). 2 incorrect (she adjusted priority rules). System learns.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"Do I need coding skills to build this?"</p>
                                            <p className="text-cyan-400 text-xs">No. Modern no-code tools (Make.com, Zapier Premium, custom GPTs) handle orchestration. Maya's setup: Sunday "Weekly Planning" GPT that queries all agents, resolves conflicts, outputs ONE unified schedule. Zero code.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-500/50">
                                    <h4 className="text-purple-400 font-bold mb-3">📊 Cumulative Impact: Parts 1-5</h4>
                                    <div className="space-y-2 text-sm text-slate-300 mb-4">
                                        <div>• <strong className="text-white">Part 2:</strong> Home systems (30 min/day + $900/month + $6K/year)</div>
                                        <div>• <strong className="text-white">Part 3:</strong> Work systems (Email 7.5 hrs/week + Calendar 9.5 hrs/week + Admin 5.9 work weeks/year)</div>
                                        <div>• <strong className="text-white">Part 4:</strong> Life systems (Recovery 11.4 hrs/week + Mental Load 8.2 hrs/week + Knowledge 5.5 hrs/week)</div>
                                        <div>• <strong className="text-white">Part 5:</strong> System coordination (eliminates 3-5 hrs/week of agent conflicts + missed opportunities)</div>
                                    </div>
                                    <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30 mb-4">
                                        <p className="text-purple-400 font-bold text-lg">TOTAL: ~66 hours/week reclaimed + ~$1,800/month saved</p>
                                        <p className="text-slate-400 text-xs mt-1">(That's 1.6 FULL-TIME JOBS worth of time back in your life)</p>
                                    </div>
                                    <p className="text-white font-bold text-sm mb-2">
                                        The agents have done their job. Now: What will you DO with 66 hours/week?
                                    </p>
                                    <p className="text-cyan-400 text-sm italic">
                                        That's 3,432 hours/year. Use it wisely.
                                    </p>
                                </div>

                                <Suspense fallback={null}>
                                    <CaptainTip type="pro" title="The Compound Effect">
                                        "In Month 1, you'll save 5 hours/week. By Month 6, as agents start coordinating automatically, you'll save 10-12 hours/week. That's an entire extra workday, every single week."
                                    </CaptainTip>
                                </Suspense>
                            </div>
                        </div>
                    </section >

                    {/* Chapter 14: Smart Home (Optional) */}
                    < section id="chapter-14" className="py-16 px-6" >
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-3 mb-6 opacity-70">
                                <Home className="text-slate-500" />
                                <span className="text-slate-500 font-mono uppercase tracking-widest text-sm">Optional Module</span>
                            </div>

                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="pointing"
                                    message="You don't NEED smart home gear. But if you have it, let's make it actually smart. Most people use Alexa as a glorified egg timer. We're going to make your home ANTICIPATE your needs."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 14: Smart Home Integration</h2>

                                <div className="grid md:grid-cols-2 gap-6 my-8">
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h4 className="text-white font-bold mb-3">Dumb Smart Home</h4>
                                        <p className="text-sm text-slate-400 italic">"Hey Google, turn on the lights."</p>
                                        <p className="text-sm text-slate-400 mt-2">Reactive. Manual. Glorified remote control.</p>
                                    </div>
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h4 className="text-cyan-400 font-bold mb-3">Intelligent Home</h4>
                                        <p className="text-sm text-slate-300 italic">Lights fade up 15 min before alarm. Coffee starts. Thermostat adjusts.</p>
                                        <p className="text-sm text-slate-400 mt-2">Proactive. Anticipatory. Magic.</p>
                                    </div>
                                </div>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <SmartHomeReadinessAssessment />
                                </Suspense>

                                <h3 className="text-2xl font-bold text-white mt-12 mb-4">High-Value Automations</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-yellow-500">
                                        <h4 className="font-bold text-white">☀️ Morning Wake-Up</h4>
                                        <p className="text-sm text-slate-400">Lights brighten 15m before alarm. Thermostat warms up. Coffee starts.</p>
                                    </div>
                                    <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-blue-500">
                                        <h4 className="font-bold text-white">🌙 Wind-Down Sequence</h4>
                                        <p className="text-sm text-slate-400">At 9 PM: Lights shift warm (2700K), dim to 40%. Screens dim. Brain gets the signal.</p>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">🛒 What to Actually Buy</h3>
                                <p className="text-slate-300 mb-6">
                                    You don't need everything. Start with Tier 1. Add Tier 2 if you want more integration. Tier 3 is for enthusiasts.
                                </p>

                                <div className="space-y-6">
                                    <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                                        <h4 className="text-green-400 font-bold mb-3">🥉 Tier 1: Starter Pack ($200-400)</h4>
                                        <p className="text-slate-400 text-sm mb-4 italic">High ROI, minimal setup. Start here.</p>
                                        <div className="space-y-3 text-sm">
                                            <div className="bg-slate-900/50 p-3 rounded">
                                                <p className="text-white font-bold mb-1">Voice Assistant Hub (~$50-100)</p>
                                                <div className="pl-3 space-y-1 text-xs text-slate-300">
                                                    <div>• <strong>Amazon Echo Dot (5th Gen)</strong> - $50 (best value, works with most devices)</div>
                                                    <div>• <strong>Google Nest Mini</strong> - $50 (better voice recognition, Google ecosystem)</div>
                                                    <div>• <strong>Why:</strong> Central control hub for all other devices + voice commands</div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-900/50 p-3 rounded">
                                                <p className="text-white font-bold mb-1">Smart Lights (2-pack) (~$40-80)</p>
                                                <div className="pl-3 space-y-1 text-xs text-slate-300">
                                                    <div>• <strong>Philips Hue White Ambiance (2-pack)</strong> - $80 (premium, requires hub ~$60)</div>
                                                    <div>• <strong>LIFX (2-pack)</strong> - $70 (no hub needed, WiFi direct)</div>
                                                    <div>• <strong>Wyze Bulbs (2-pack)</strong> - $20 (budget option, basic features)</div>
                                                    <div>• <strong>Why:</strong> Bedroom + office. Morning fade-up, evening dim-down automation</div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-900/50 p-3 rounded">
                                                <p className="text-white font-bold mb-1">Smart Plug (2-pack) (~$25-40)</p>
                                                <div className="pl-3 space-y-1 text-xs text-slate-300">
                                                    <div>• <strong>TP-Link Kasa Smart Plugs (2-pack)</strong> - $25 (reliable, app control)</div>
                                                    <div>• <strong>Amazon Smart Plug</strong> - $25 (seamless Alexa integration)</div>
                                                    <div>• <strong>Why:</strong> Coffee maker auto-start, lamp scheduling, "dumb" devices → "smart"</div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-green-400 text-xs mt-4 italic">Total: ~$200-300. ROI: Morning/evening automation = 10-15 min/day saved + better sleep quality.</p>
                                    </div>

                                    <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30">
                                        <h4 className="text-blue-400 font-bold mb-3">🥈 Tier 2: Standard Setup ($600-1000)</h4>
                                        <p className="text-slate-400 text-sm mb-4 italic">Adds climate control + security. Noticeable life quality improvement.</p>
                                        <div className="space-y-3 text-sm">
                                            <div className="bg-slate-900/50 p-3 rounded">
                                                <p className="text-white font-bold mb-1">Smart Thermostat (~$130-250)</p>
                                                <div className="pl-3 space-y-1 text-xs text-slate-300">
                                                    <div>• <strong>Google Nest Learning Thermostat</strong> - $250 (learns patterns, premium)</div>
                                                    <div>• <strong>Ecobee SmartThermostat</strong> - $220 (room sensors, better accuracy)</div>
                                                    <div>• <strong>Amazon Smart Thermostat</strong> - $80 (budget, basic scheduling)</div>
                                                    <div>• <strong>Why:</strong> Pre-warm bedroom before wake, auto-adjust based on sleep quality</div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-900/50 p-3 rounded">
                                                <p className="text-white font-bold mb-1">Robot Vacuum (~$200-400)</p>
                                                <div className="pl-3 space-y-1 text-xs text-slate-300">
                                                    <div>• <strong>Roborock Q5+</strong> - $400 (auto-empty, mapping, great value)</div>
                                                    <div>• <strong>iRobot Roomba j7+</strong> - $600 (obstacle avoidance, pet-friendly)</div>
                                                    <div>• <strong>Eufy RoboVac 11S</strong> - $230 (budget, quiet, no mapping)</div>
                                                    <div>• <strong>Why:</strong> Schedule daily 10 AM clean while at work. Agent integration possible.</div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-900/50 p-3 rounded">
                                                <p className="text-white font-bold mb-1">Smart Lock (~$150-280)</p>
                                                <div className="pl-3 space-y-1 text-xs text-slate-300">
                                                    <div>• <strong>August Wi-Fi Smart Lock</strong> - $280 (retrofit existing deadbolt)</div>
                                                    <div>• <strong>Yale Assure Lock 2</strong> - $180 (keypad + app, very reliable)</div>
                                                    <div>• <strong>Why:</strong> Auto-lock when you leave, unlock when you arrive, guest codes</div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-blue-400 text-xs mt-4 italic">Total: ~$600-1000. ROI: Climate comfort + 2-3 hrs/week cleaning saved + security peace of mind.</p>
                                    </div>

                                    <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/30">
                                        <h4 className="text-purple-400 font-bold mb-3">🥇 Tier 3: Enthusiast Setup ($1500+)</h4>
                                        <p className="text-slate-400 text-sm mb-4 italic">Full integration. Your home becomes sentient. Optional but impressive.</p>
                                        <div className="space-y-3 text-sm">
                                            <div className="bg-slate-900/50 p-3 rounded">
                                                <p className="text-white font-bold mb-1">Smart Hub (Advanced Automation) (~$100-300)</p>
                                                <div className="pl-3 space-y-1 text-xs text-slate-300">
                                                    <div>• <strong>Home Assistant (Raspberry Pi setup)</strong> - $100 (open-source, unlimited customization)</div>
                                                    <div>• <strong>Samsung SmartThings Hub</strong> - $70 (consumer-friendly, good ecosystem)</div>
                                                    <div>• <strong>Hubitat Elevation</strong> - $145 (local control, no cloud dependency)</div>
                                                    <div>• <strong>Why:</strong> Complex automations (if X happens, trigger Y + Z across 5 devices)</div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-900/50 p-3 rounded">
                                                <p className="text-white font-bold mb-1">Smart Blinds/Shades (~$300-800 per window)</p>
                                                <div className="pl-3 space-y-1 text-xs text-slate-300">
                                                    <div>• <strong>IKEA FYRTUR</strong> - $150 (budget, blackout)</div>
                                                    <div>• <strong>Lutron Serena</strong> - $400+ (premium, quiet, battery-powered)</div>
                                                    <div>• <strong>Why:</strong> Auto-open at sunrise, close at sunset, coordinate with lights</div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-900/50 p-3 rounded">
                                                <p className="text-white font-bold mb-1">Advanced Sensors (~$200-400)</p>
                                                <div className="pl-3 space-y-1 text-xs text-slate-300">
                                                    <div>• <strong>Aqara motion sensors (4-pack)</strong> - $80 (room occupancy detection)</div>
                                                    <div>• <strong>Ecobee room sensors (2-pack)</strong> - $80 (temperature + occupancy)</div>
                                                    <div>• <strong>Why:</strong> Lights auto-on when you enter, auto-off when you leave (no manual switching)</div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-purple-400 text-xs mt-4 italic">Total: ~$1500+. ROI: "Wow factor" + 5% extra efficiency. Only if you enjoy tinkering.</p>
                                    </div>
                                </div>

                                <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                                    <h4 className="text-yellow-400 font-bold mb-3">⚠️ What NOT to Buy (Yet)</h4>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div>• <strong className="text-red-400">Smart appliances (fridge, oven):</strong> Expensive, low ROI. Your $3K smart fridge does what a $20 magnetic notepad does.</div>
                                        <div>• <strong className="text-red-400">Cheap no-name brands:</strong> TP-Link, Wyze, Eufy are "budget" but RELIABLE. Random Amazon brands break in 6 months.</div>
                                        <div>• <strong className="text-red-400">Proprietary ecosystems:</strong> Avoid devices that ONLY work with one brand. Look for "Works with Alexa/Google/HomeKit."</div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                                    <h4 className="text-green-400 font-bold mb-3">📖 David's Smart Home Evolution (Optional)</h4>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        <p className="text-slate-400 italic">If you don't have smart home devices, skip this. If you do...</p>

                                        <div className="grid md:grid-cols-2 gap-4 my-4">
                                            <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/30">
                                                <p className="text-red-400 font-bold text-sm mb-2">BEFORE (Dumb Smart Home):</p>
                                                <div className="space-y-1 text-xs text-slate-400">
                                                    <div>• 6 AM: Alarm blares. Fumbles for phone in dark.</div>
                                                    <div>• Says "Alexa, turn on lights" (50% of time, wrong room lights)</div>
                                                    <div>• Manually starts coffee. Waits 5 min.</div>
                                                    <div>• 9 PM: Forgets to dim lights. Scrolls phone in bright room until 11 PM.</div>
                                                    <div>• Has $800 in smart devices. Uses 10% of capability.</div>
                                                </div>
                                            </div>

                                            <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/30">
                                                <p className="text-green-400 font-bold text-sm mb-2">AFTER (Intelligent Home):</p>
                                                <div className="space-y-1 text-xs text-slate-400">
                                                    <div>• 5:45 AM: Lights fade up slowly (15 min before alarm)</div>
                                                    <div>• 6 AM: Coffee brewing detected. Alexa reads calendar.</div>
                                                    <div>• Thermostat already warmed bedroom to 68°F.</div>
                                                    <div>• 9 PM: Lights auto-shift warm (2700K), dim to 40%.</div>
                                                    <div>• Sleep Agent detected &lt; 6 hrs? Morning routine delays 1 hour automatically.</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-900/50 p-4 rounded my-3">
                                            <p className="text-white font-bold text-sm mb-2">6-MONTH RESULTS:</p>
                                            <div className="space-y-1 text-xs text-slate-300">
                                                <div>• Morning wake time: <span className="text-red-400">Jarring alarm</span> → <span className="text-green-400 font-bold">Natural light fade (feels like sunrise)</span></div>
                                                <div>• Coffee wait: <span className="text-red-400">5 min manual</span> → <span className="text-green-400 font-bold">Ready when he enters kitchen</span></div>
                                                <div>• Sleep onset: <span className="text-red-400">45 min (bright lights + screens)</span> → <span className="text-green-400 font-bold">20 min (circadian cues work)</span></div>
                                                <div>• Smart home ROI: <span className="text-red-400">10% utilized</span> → <span className="text-green-400 font-bold">85% (coordinated with Life OS)</span></div>
                                            </div>
                                        </div>

                                        <p className="text-cyan-400 text-xs italic">Key insight: Smart home gear is worthless UNTIL it talks to your Life OS. Then it's magic.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >

                    {/* Chapter 15: Maintenance */}
                    < section id="chapter-15" className="py-16 px-6 bg-[#131320] border-y border-slate-800" >
                        <div className="max-w-4xl mx-auto">
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="working"
                                    message="Systems entropy is real. Things break. Life changes. Your system needs a mechanic. That mechanic is you, once a month."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 15: Maintenance & Optimization</h2>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <SystemHealthDiagnostic />
                                </Suspense>

                                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 my-8">
                                    <h3 className="text-xl font-bold text-white mb-4">The Golden Rule of Maintenance</h3>
                                    <p className="text-slate-300 mb-4">
                                        <strong>"Friction Log" everything.</strong>
                                    </p>
                                    <p className="text-sm text-slate-400">
                                        If you have to manually do a task twice, write it down. If an agent gives you bad advice, write it down. Once a month, fix the top 3 friction points. That's how you get to 99% reliability.
                                    </p>
                                </div>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 my-8">
                                    <h3 className="text-red-400 font-bold mb-3">The Slow Decay</h3>
                                    <p className="text-white font-bold text-sm mb-3">
                                        Carlos Rivera, engineer, built perfect system, 6 months later...
                                    </p>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <p className="text-white text-sm mb-2">What broke (slowly):</p>
                                        <div className="space-y-1 text-xs text-slate-400">
                                            <div>• Month 2: Email agent stopped catching vendor spam (filter drifted)</div>
                                            <div>• Month 3: Calendar agent double-booked 2 meetings (sync bug)</div>
                                            <div>• Month 4: Kitchen agent suggested recipes for ingredients he didn't have (database stale)</div>
                                            <div>• Month 5: Sleep agent recommended 6 AM wake-up despite 4 hrs sleep (override rule broke)</div>
                                            <div>• Month 6: Second Brain agent couldn't find article he KNEW he saved (tagging system degraded)</div>
                                        </div>
                                    </div>
                                    <p className="text-red-400 font-bold">
                                        He BUILT the perfect system. Then stopped maintaining it. Entropy won.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                                    <h4 className="text-green-400 font-bold mb-3">📖 Carlos's Maintenance Protocol</h4>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        <p className="text-white font-bold">The turnaround (Month 7):</p>

                                        <div className="bg-slate-900/50 p-4 rounded my-3">
                                            <p className="text-cyan-400 font-bold text-sm mb-2">MONTHLY MAINTENANCE (Last Sunday, 60 min):</p>
                                            <div className="space-y-2 text-xs">
                                                <div>
                                                    <strong>1. Friction Log Review (20 min):</strong>
                                                    <div className="pl-3 space-y-1 mt-1 text-slate-400">
                                                        <div>• "What annoyed me this month?" (writes list)</div>
                                                        <div>• Example: "Email agent missed 3 vendor emails → they filled inbox"</div>
                                                        <div>• Fix: Update spam filter rules (10 min)</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <strong>2. Agent Health Check (15 min):</strong>
                                                    <div className="pl-3 space-y-1 mt-1 text-slate-400">
                                                        <div>• Run diagnostic: "Show all errors logs from past month"</div>
                                                        <div>• Calendar sync bug found → Reconnect Google Calendar API</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <strong>3. Database Refresh (15 min):</strong>
                                                    <div className="pl-3 space-y-1 mt-1 text-slate-400">
                                                        <div>• Kitchen Agent: Update pantry inventory (scan receipts)</div>
                                                        <div>• Second Brain Agent: Re-tag 10 recent captures (improve retrieval)</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <strong>4. Priority Tuning (10 min):</strong>
                                                    <div className="pl-3 space-y-1 mt-1 text-slate-400">
                                                        <div>• Sleep Agent override rule: "NEVER wake before 7 AM if sleep &lt; 6 hrs"</div>
                                                        <div>• Test: Orchestrator simulates scenarios</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-green-500/30">
                                            <p className="text-white font-bold text-sm mb-2">6-MONTH MAINTENANCE RESULTS:</p>
                                            <div className="space-y-1 text-xs text-slate-300">
                                                <div>• System reliability: <span className="text-red-400">72% (Month 6)</span> → <span className="text-green-400 font-bold">96% (Month 12)</span></div>
                                                <div>• Agent errors: <span className="text-red-400">8-10/month</span> → <span className="text-green-400 font-bold">1-2/month</span></div>
                                                <div>• Time spent firefighting: <span className="text-red-400">3 hrs/month</span> → <span className="text-green-400 font-bold">60 min/month (scheduled)</span></div>
                                                <div>• User trust: <span className="text-red-400">"Can't rely on it"</span> → <span className="text-green-400 font-bold">"More reliable than ME"</span></div>
                                            </div>
                                            <p className="text-white italic text-sm mt-3">"60 minutes of maintenance saves 3 hours of crisis management. Best ROI in my entire system." — Carlos Rivera</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                                    <h4 className="text-yellow-400 font-bold mb-3">⚠️ The Maintenance Truth</h4>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        <p className="text-white font-bold">Most people build perfect systems. Then never touch them again.</p>
                                        <p className="text-red-400">6 months later: System is 70% effective. They blame AI. It's not AI. It's ENTROPY.</p>
                                        <p className="text-green-400 font-bold">Carlos's rule: "60 min/month = 99% reliability. 0 min/month = 70% reliability and declining."</p>
                                        <p className="text-cyan-400 text-xs italic">Your system is alive. It needs care. Budget for it.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >

                    {/* Conclusion */}
                    < section id="chapter-16" className="py-16 px-6" >
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <div className="inline-block p-4 rounded-full bg-green-900/30 text-green-400 mb-6 border border-green-500/30">
                                    <Flag size={48} />
                                </div>
                                <h2 className="text-5xl font-bold text-white mb-6">Your Action Plan</h2>
                                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                                    Knowledge isn't power. Action is. Let's build your custom roadmap to launch this system in 30 days.
                                </p>
                            </div>

                            <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                <PersonalizedLaunchPlanGenerator />
                            </Suspense>

                            <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                <LifeOSDashboardPreview />
                            </Suspense>

                            <div className="mt-16 p-8 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-2xl border border-purple-500/50">
                                <h3 className="text-3xl font-bold text-white mb-6 text-center">About the Creator</h3>

                                <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                                    <div className="flex-1">
                                        <h4 className="text-cyan-400 font-bold text-xl mb-3">DDS — Doctor of Digital Systems</h4>
                                        <p className="text-slate-400 text-sm italic mb-4">
                                            (Also: "Dad Deploying Systems")
                                        </p>

                                        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-500/30 my-4">
                                            <p className="text-white font-bold text-sm mb-2">The Reality:</p>
                                            <ul className="space-y-1 text-xs text-slate-300">
                                                <li>• <strong className="text-cyan-400">Endodontic resident</strong> (dental specialist in training)</li>
                                                <li>• <strong className="text-cyan-400">50+ hour clinical weeks</strong> (root canals, emergencies)</li>
                                                <li>• <strong className="text-cyan-400">Father of two children</strong> under three years old</li>
                                                <li>• <strong className="text-cyan-400">Army veteran</strong> (502nd Dental Company, Fort Hood)</li>
                                            </ul>
                                        </div>

                                        <p className="text-white font-bold mb-3 text-sm">
                                            "I didn't build this system for fun. I built it to survive."
                                        </p>

                                        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                                            This isn't a productivity guru with unlimited time. This is an <strong className="text-white">endodontic resident working 50+ hours</strong>, coming home to two toddlers under three, needing to be both a <strong className="text-white">high-performing doctor</strong> and a <strong className="text-white">present dad</strong> without burning out. Residency + toddlers + sanity required systems that work <strong className="text-white">under extreme constraints</strong>.
                                        </p>

                                        <div className="space-y-2 text-sm text-slate-300">
                                            <div className="flex items-start gap-2">
                                                <span className="text-cyan-400">✓</span>
                                                <span><strong className="text-white">No coding required</strong> (I'm a dentist, not a software engineer)</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-cyan-400">✓</span>
                                                <span><strong className="text-white">$0-20/month</strong> to start (residency salary isn't huge)</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-cyan-400">✓</span>
                                                <span><strong className="text-white">Built during chaos</strong> (if it works for me, it'll work for you)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30 mb-6">
                                    <p className="text-white font-bold mb-3">Personal Results (8 Months In):</p>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div>• <strong className="text-green-400">7-8 hours saved weekly</strong> (documented, not guessed)</div>
                                        <div>• <strong className="text-green-400">Daily emails requiring attention:</strong> <span className="text-red-400">44</span> → <span className="text-green-400 font-bold">2-3</span></div>
                                        <div>• <strong className="text-green-400">Missed family moments:</strong> <span className="text-red-400">Weekly</span> → <span className="text-green-400 font-bold">Zero (system reminds me)</span></div>
                                        <div>• <strong className="text-green-400">3 AM anxiety wake-ups:</strong> <span className="text-red-400">3-4x/week</span> → <span className="text-green-400 font-bold">Rare (agents handle it)</span></div>
                                        <div>• <strong className="text-green-400">Mental clarity:</strong> Can be present with my kids instead of mentally reviewing tomorrow's patient schedule</div>
                                    </div>
                                </div>

                                <p className="text-slate-300 text-sm text-center italic">
                                    "I needed a way to be a high-performing doctor and a present human being without burning out. Prompts weren't enough. I needed agents." — DDS
                                </p>
                            </div>

                            <div className="mt-16 p-8 bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 rounded-2xl border-2 border-red-500/50 text-center">
                                <h3 className="text-4xl font-bold text-white mb-6">The Choice</h3>
                                <p className="text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed">
                                    You've read 16 chapters. You've seen the proof. You know what's possible.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 my-8">
                                    <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40">
                                        <h4 className="text-red-400 font-bold mb-3">Path A: Do Nothing</h4>
                                        <div className="space-y-2 text-sm text-slate-400">
                                            <div>• Close this book</div>
                                            <div>• Go back to 47 unread emails</div>
                                            <div>• Keep forgetting the permission slip</div>
                                            <div>• Wake up at 3 AM remembering HOA fees</div>
                                            <div>• Re-Google React hooks for the 7th time</div>
                                        </div>
                                        <p className="text-red-400 font-bold mt-4 text-xs">
                                            1 year from now: Still drowning. Still wishing you'd started.
                                        </p>
                                    </div>

                                    <div className="bg-green-900/30 p-6 rounded-xl border border-green-500/40">
                                        <h4 className="text-green-400 font-bold mb-3">Path B: Build It</h4>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <div>• <strong>TODAY:</strong> Pick ONE agent (Morning, Email, Kitchen)</div>
                                            <div>• <strong>Week 1:</strong> See results (30 min/day saved)</div>
                                            <div>• <strong>Month 1:</strong> 4 agents running (8-12 hrs/week back)</div>
                                            <div>• <strong>Month 3:</strong> Full Life OS (66 hrs/week reclaimed)</div>
                                            <div>• <strong>Month 6:</strong> You're teaching OTHERS your system</div>
                                        </div>
                                        <p className="text-green-400 font-bold mt-4 text-xs">
                                            1 year from now: Teaching your kids how to build their own agent systems.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-900/80 p-6 rounded-xl border border-orange-500/50 my-8">
                                    <h4 className="text-orange-400 font-bold text-xl mb-3">Your Next 20 Minutes</h4>
                                    <div className="space-y-3 text-left max-w-xl mx-auto">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-orange-500/20 text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                                            <p className="text-slate-300 text-sm">Go back to <strong className="text-white">Chapter 2</strong>. Pick your "Brain" (Claude recommended).</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-orange-500/20 text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                                            <p className="text-slate-300 text-sm">Choose <strong className="text-white">ONE agent</strong> from Part 2-4 that solves your biggest pain point RIGHT NOW.</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-orange-500/20 text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                                            <p className="text-slate-300 text-sm">Build it. <strong className="text-white">TODAY</strong>. Use the Quick Win prompt. See results by tomorrow morning.</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-white text-2xl font-bold mb-4">
                                    You've spent years drowning in busywork.
                                </p>
                                <p className="text-cyan-400 text-3xl font-bold mb-6">
                                    Give yourself 30 days to escape it.
                                </p>

                                <div className="mt-8 p-6 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-xl border border-cyan-500/50">
                                    <p className="text-white text-lg font-bold mb-3">
                                        "A year from now, you'll wish you started today."
                                    </p>
                                    <p className="text-slate-400 text-sm">
                                        — DDS, after watching 200 beta testers transform their lives in 30 days
                                    </p>
                                </div>
                            </div>

                            <div className="mt-16 p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 text-center">
                                <h3 className="text-2xl font-bold text-white mb-4">One Final Thought</h3>
                                <p className="text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                                    This isn't about the technology. It's about getting your <strong className="text-white">LIFE</strong> back. The hours you save are for your kids, your partner, your health, your dreams. <br /><br />
                                    AI agents aren't the point. <span className="text-cyan-400 font-bold">A life well-lived is the point.</span> <br /><br />
                                    The system is just the tool that makes it possible.
                                </p>
                                <div className="text-cyan-400 font-bold text-lg mb-6">— Captain Efficiency 🤖</div>

                                <div className="mt-8 pt-6 border-t border-slate-700">
                                    <p className="text-white font-bold mb-2">Ready to build?</p>
                                    <p className="text-slate-400 text-sm mb-4">Your agents are waiting. Start with Chapter 2.</p>
                                </div>
                            </div>

                            <div className="mt-12 text-center">
                                <button
                                    onClick={() => window.location.href = '/dashboard'}
                                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold transition-all border border-slate-700 hover:border-slate-600"
                                >
                                    Return to Dashboard
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </section >

                    {/* Social Share */}
                    < Suspense fallback={null} >
                        <SocialShare
                            title="I've built a complete Life OS with Agentic AI. Check out the system!"
                            hashtags={["AgenticAI", "LifeOS", "Automation"]}
                        />
                    </Suspense >
                </div >
            </PasswordGate >
        </WebbookLayout >
    );
};

export default Part5;
