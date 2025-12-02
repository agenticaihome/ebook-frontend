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
                                    <p className="text-slate-300 text-sm mb-3">
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
                                            <p className="text-cyan-400 text-xs">Maya tried that for 2 months. Result: Agent civil war. Orchestrator ISN'T more complex—it's a CONFLICT RESOLVER. You set priority hierarchy once (Health > Family > Work). Orchestrator applies it automatically.</p>
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

                            <div className="mt-16 p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 text-center">
                                <h3 className="text-2xl font-bold text-white mb-4">One Final Thought</h3>
                                <p className="text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                                    "This isn't about the technology. It's about getting your LIFE back. The hours you save are for your kids, your partner, your health, your dreams. <br /><br />
                                    AI agents aren't the point. A life well-lived is the point. <br /><br />
                                    Now go build something."
                                </p>
                                <div className="text-cyan-400 font-bold text-lg">— Captain Efficiency 🤖</div>
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
