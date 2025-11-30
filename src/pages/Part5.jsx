import React, { useState, Suspense } from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import PurchaseGate from '../components/common/PurchaseGate';
import BackgroundEffects from '../components/common/BackgroundEffects';
import { motion } from 'framer-motion';
import { Layers, Home, Wrench, Flag, ArrowRight } from 'lucide-react';

const CaptainHero = React.lazy(() => import('../components/CaptainHero'));
const CaptainTip = React.lazy(() => import('../components/CaptainTip'));
const GoalHierarchyBuilder = React.lazy(() => import('../components/GoalHierarchyBuilder'));
const WeeklyReviewTemplateGenerator = React.lazy(() => import('../components/WeeklyReviewTemplateGenerator'));
const SmartHomeReadinessAssessment = React.lazy(() => import('../components/SmartHomeReadinessAssessment'));
const SystemHealthDiagnostic = React.lazy(() => import('../components/SystemHealthDiagnostic'));
const PersonalizedLaunchPlanGenerator = React.lazy(() => import('../components/PersonalizedLaunchPlanGenerator'));
const LifeOSDashboardPreview = React.lazy(() => import('../components/LifeOSDashboardPreview'));
const SocialShare = React.lazy(() => import('../components/tools/SocialShare'));

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
            <PurchaseGate>
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
                                    message="Congratulations. You've built an army of agents. But right now, they're working in silos. What if your Recovery Agent could tell your Calendar Agent to cancel meetings? That's not just automation. That's a Life Operating System."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 13: Multi-Agent Systems</h2>

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
            </PurchaseGate >
        </WebbookLayout >
    );
};

export default Part5;
