import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import WebbookLayout from '../components/layout/WebbookLayout';
import PasswordGate from '../components/common/PasswordGate';
import BackgroundEffects from '../components/common/BackgroundEffects';
import { motion } from 'framer-motion';
import { Activity, BookOpen, ArrowRight, Heart } from 'lucide-react';

const CaptainHero = React.lazy(() => import('../components/CaptainHero'));
const CaptainTip = React.lazy(() => import('../components/CaptainTip'));
const ProgressBar = React.lazy(() => import('../components/common/ProgressBar'));
const TryThisNow = React.lazy(() => import('../components/common/TryThisNow'));
const SleepProtocolConfig = React.lazy(() => import('../components/SleepProtocolConfig'));
const MentalLoadAssessment = React.lazy(() => import('../components/MentalLoadAssessment'));
const KnowledgeChaosAssessment = React.lazy(() => import('../components/KnowledgeChaosAssessment'));
const StudySystemGenerator = React.lazy(() => import('../components/StudySystemGenerator'));
const SocialShare = React.lazy(() => import('../components/tools/SocialShare'));
const WorkflowVisual = React.lazy(() => import('../components/common/WorkflowVisual'));
const CopyPrompt = React.lazy(() => import('../components/common/CopyPrompt'));

const Part4 = () => {
    const navigate = useNavigate();
    const [activeChapter, setActiveChapter] = useState(10);

    const chapters = [
        { id: 10, title: 'Health & Recovery', icon: Activity },
        { id: 11, title: 'Mental Wellbeing', icon: Heart },
        { id: 12, title: 'Second Brain', icon: BookOpen }
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
                <ProgressBar current={activeChapter - 9} total={3} label="Part 4: Health, Wellness, & Learning" />
                <div className="min-h-screen bg-[#0f0f1a] text-white">
                    {/* Hero Section */}
                    <section className="relative pt-24 pb-16 px-6 overflow-hidden">
                        <BackgroundEffects blob1Color="bg-green-900/30" blob2Color="bg-cyan-900/20" />

                        <div className="max-w-4xl mx-auto relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-12"
                            >
                                <div className="text-sm font-bold text-green-400 uppercase tracking-wider mb-4">Part 4</div>
                                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                    Health, Wellness, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">& Learning</span>
                                </h1>
                                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                                    Optimize your biology, reduce mental load, and build a Second Brain that never forgets.
                                </p>
                            </motion.div >

                            {/* Chapter Navigation */}
                            < div className="grid md:grid-cols-3 gap-4 mb-12" >
                                {
                                    chapters.map((chapter) => {
                                        const Icon = chapter.icon;
                                        return (
                                            <button
                                                key={chapter.id}
                                                onClick={() => scrollToChapter(chapter.id)}
                                                className={`p-6 rounded-xl border-2 transition-all text-left ${activeChapter === chapter.id
                                                    ? 'border-green-500 bg-green-900/20'
                                                    : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                                                    }`}
                                            >
                                                <Icon className={activeChapter === chapter.id ? 'text-green-400' : 'text-slate-500'} size={24} />
                                                <div className="mt-3 text-sm font-mono text-slate-400">Chapter {chapter.id}</div>
                                                <div className="font-bold text-white">{chapter.title}</div>
                                            </button>
                                        );
                                    })
                                }
                            </div >
                        </div >
                    </section >

                    {/* Chapter 10: Health & Recovery */}
                    < section id="chapter-10" className="py-16 px-6 bg-[#131320] border-y border-slate-800" >
                        <div className="max-w-4xl mx-auto">
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="thinking"
                                    message="You just read about Sarah. 5.2 hours average sleep. 4-hour night before a high-stakes presentation. Her brain blanked. $12K mistake. Missed her daughter's recital. Here's what happened: She kept 'powering through' despite running on fumes. Traditional productivity says: discipline, grit, push harder. Biology says: YOU CAN'T FOCUS WHEN YOUR BRAIN IS OFFLINE. Recovery-Aware doesn't just track health—it ADAPTS your entire day based on ACTUAL capacity. Sarah's about to learn how."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 10: The Recovery-Aware Agent</h2>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 mb-8">
                                    <h3 className="text-red-400 font-bold mb-3">The Chronic Fatigue Spiral</h3>
                                    <p className="text-white font-bold text-sm mb-3">
                                        Sarah Chen, marketing director, Denver
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Monday morning, 6:47 AM. Sarah wakes to her alarm. Body feels like concrete.
                                    </p>
                                    <p className="text-red-400 font-bold text-lg mb-3">
                                        4 hours, 23 minutes of sleep last night.
                                    </p>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>Sunday: 5 hours, 12 minutes</div>
                                            <div>Saturday: 4 hours, 58 minutes</div>
                                            <div>Friday: 6 hours, 02 minutes</div>
                                            <div className="text-red-400 font-bold pt-1">7-day average: 5.2 hours/night</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-3">
                                        The fog is thick. Coffee isn't cutting through. Brain won't boot up.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        But the calendar doesn't care about sleep:
                                    </p>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <div className="space-y-1 text-xs text-slate-400">
                                            <div>• 9:00 AM: Q4 strategy presentation to VP (she stayed up till 2 AM prepping)</div>
                                            <div>• 10:30 AM: Three 1-on-1s back-to-back</div>
                                            <div>• 2:00 PM: Client pitch (high stakes)</div>
                                            <div>• 4:00 PM: Budget review (detail work)</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-3">
                                        9:15 AM: She's 15 minutes into the presentation. Slide 2 has three typos she didn't catch.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        VP asks: "What were the Q4 numbers again?"
                                    </p>
                                    <p className="text-red-400 font-bold mb-3">
                                        Her brain... blanks. Complete white noise.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        She fumbles through her notes. "I'll... need to get back to you on that."
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        The presentation gets rescheduled. Professional embarrassment.
                                    </p>
                                    <div className="mt-4 pt-3 border-t border-red-500/30 text-xs text-slate-400">
                                        <p className="text-white font-bold mb-2">The Breaking Point (Week 6):</p>
                                        <div className="space-y-1">
                                            <div>• Missed her daughter's recital (fell asleep at 7 PM, alarm didn't wake her)</div>
                                            <div>• Made a <span className="text-red-400 font-bold">$12,000 budgeting error</span> (decimal place mistake - exhaustion-induced)</div>
                                            <div>• Doctor visit: "You're showing signs of chronic stress. Cortisol is through the roof."</div>
                                        </div>
                                        <p className="text-red-400 mt-3">Doctor: "You need to sleep." Sarah: "I KNOW. But I have deadlines."</p>
                                        <p className="text-cyan-400 mt-2 italic">Doctor: "Then you need to adapt your deadlines to match your capacity."</p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-red-500/30 text-xs text-slate-400">
                                        <p className="text-white font-bold mb-2">Annual cost:</p>
                                        <div className="space-y-1">
                                            <div>Sleep debt: 450 hours/year below optimal</div>
                                            <div>Cognitive performance: -30% on complex tasks</div>
                                            <div>Mistakes/rework: ~8 hours/week fixing exhaustion-induced errors</div>
                                            <div>Health: Cortisol dysregulation, immune suppression</div>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-purple-400 mt-12 mb-4">The Science of Sleep Debt</h3>

                                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 mb-6">
                                    <p className="text-white font-bold text-sm mb-3">Matthew Walker (Why We Sleep, UC Berkeley, 2017):</p>
                                    <ul className="space-y-2 text-sm text-slate-300 mb-4">
                                        <li>• After 1 night of 4 hours: <strong className="text-red-400">-40% cognitive performance</strong> on complex tasks</li>
                                        <li>• After 10 days of 6 hours/night: Cognitive equivalent of <strong className="text-red-400">24 hours awake</strong></li>
                                        <li>• <strong className="text-red-400">Sleep debt is CUMULATIVE</strong> — can't "catch up" on weekends</li>
                                        <li>• Impact on decision-making, emotional regulation, immune function</li>
                                    </ul>

                                    <div className="bg-red-900/20 p-4 rounded mb-4">
                                        <p className="text-white font-bold text-sm mb-2">The Math of Sarah's Week:</p>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>7-day sleep total: 36.5 hours (average 5.2 hrs/night)</div>
                                            <div>Recommended: 56 hours (8 hrs/night)</div>
                                            <div className="pt-2 border-t border-red-500/30 mt-2">
                                                <strong>Sleep debt: 19.5 hours in ONE WEEK</strong>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-red-900/20 p-4 rounded mb-4">
                                        <p className="text-white font-bold text-sm mb-2">Cognitive Impact:</p>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• Monday (after 4hr night): Operating at <span className="text-red-400 font-bold">-40% capacity</span></div>
                                            <div>• By Friday: Equivalent to being awake for <span className="text-red-400 font-bold">18+ hours</span> (legally drunk-level impairment)</div>
                                        </div>
                                        <p className="text-red-400 text-xs mt-3">Sarah's $12K mistake: Not a "careless error." Predictable outcome of compounded sleep deprivation.</p>
                                    </div>

                                    <div className="mt-4 p-4 bg-green-900/30 rounded border border-green-500/40">
                                        <p className="text-slate-400 text-xs mb-2">Traditional productivity response: "Work harder. Focus more."</p>
                                        <p className="text-red-400 text-sm mb-3"><strong>Biological reality: YOU CAN'T FOCUS WHEN YOUR BRAIN IS OFFLINE.</strong></p>
                                        <p className="text-green-400 font-bold text-sm mb-2">Recovery-Aware approach:</p>
                                        <ul className="space-y-1 text-xs text-slate-300">
                                            <li>• Monday 9 AM presentation? DETECTED: 4hr sleep last night</li>
                                            <li>• Agent suggests: "Move presentation to Thursday 2 PM (after 3 nights of recovery)"</li>
                                            <li>• Result: Sarah presents at 80% capacity instead of 40%</li>
                                            <li>• Outcome: No mistakes, confident delivery, project approved</li>
                                        </ul>
                                    </div>

                                    <p className="text-cyan-400 text-sm mt-4 italic">The compound effect works BOTH WAYS: Sleep debt compounds into burnout. Sleep recovery compounds into sustainable performance.</p>
                                </div>

                                {/* Quick Win Box */}
                                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                                    <h3 className="text-xl font-bold text-green-400 mb-3">📌 Quick Win: The Morning Check-In</h3>
                                    <p className="text-white mb-4">Tell your AI to ask you this every morning:</p>
                                    <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                                        "1. How many hours did I sleep?<br />
                                        2. Rate sleep quality 1-10<br />
                                        3. Any disruptions?<br /><br />
                                        If sleep &lt; 6h: Suggest 'Survival Mode' (3 essential tasks only).<br />
                                        If sleep &gt; 7h + good quality: Front-load hard work."
                                    </div>

                                    <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30 my-4">
                                        <p className="text-cyan-400 font-bold text-sm mb-3">What Agent Does Next (Example):</p>
                                        <div className="space-y-3 text-xs text-slate-300">
                                            <div>
                                                <p className="text-white font-bold mb-1">STEP 1: You answer (30 seconds):</p>
                                                <p className="font-mono">"Sleep: 4 hours, 23 minutes<br />Quality: 4/10 (woke up 3x)<br />Disruptions: Neighbor's dog, stress about presentation"</p>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold mb-1">STEP 2: Agent analyzes (instant):</p>
                                                <ul className="space-y-1">
                                                    <li>• Sleep &lt; 6h → <span className="text-red-400 font-bold">RED DAY PROTOCOL</span></li>
                                                    <li>• Quality &lt; 5/10 → Cognitive impairment likely</li>
                                                    <li>• Disruptions noted → Stress management needed</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold mb-2">STEP 3: Agent adapts your calendar (you approve):</p>
                                                <div className="bg-red-900/20 p-3 rounded mb-2">
                                                    <p className="text-red-400 font-bold mb-1">ORIGINAL Monday:</p>
                                                    <div className="space-y-1 text-xs">
                                                        <div>• 9:00 AM: Strategy presentation (high cognitive load)</div>
                                                        <div>• 2:00 PM: Client pitch (high cognitive load)</div>
                                                        <div>• 4:00 PM: Budget review (detail work)</div>
                                                    </div>
                                                </div>
                                                <div className="bg-green-900/20 p-3 rounded">
                                                    <p className="text-green-400 font-bold mb-1">ADAPTED Monday (Red Day):</p>
                                                    <div className="space-y-1 text-xs">
                                                        <div>• 9:00 AM: MOVED → "Presentation rescheduled to Thursday 2 PM"</div>
                                                        <div>• 10:30 AM: KEPT → Team 1-on-1s (moderate load, manageable)</div>
                                                        <div>• 12:00 PM: ADDED → 30-min walk outside (stress management)</div>
                                                        <div>• 2:00 PM: MOVED → "Client pitch moved to Tuesday 10 AM"</div>
                                                        <div>• 4:00 PM: CANCELLED → "Budget review deferred"</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-cyan-400 text-xs mt-3">Time reclaimed: 5 hours of high-cognitive tasks → recovery time. Result: Sarah sleeps 7.5 hours Monday night, presents confidently Thursday.</p>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-green-400 mt-12 mb-4">The Sleep Debt Compound Effect</h3>
                                <div className="grid md:grid-cols-2 gap-6 my-8">
                                    <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                                        <h4 className="text-white font-bold mb-3">Ignoring Biology</h4>
                                        <ul className="space-y-2 text-sm text-slate-300">
                                            <li>• Force deep work on 4h sleep</li>
                                            <li>• Produce garbage work</li>
                                            <li>• Crash harder tomorrow</li>
                                            <li>• Burnout cycle begins</li>
                                        </ul>
                                    </div>
                                    <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                                        <h4 className="text-white font-bold mb-3">Recovery-Aware</h4>
                                        <ul className="space-y-2 text-sm text-slate-300">
                                            <li>• Detect low recovery</li>
                                            <li>• Adjust schedule automatically</li>
                                            <li>• Move hard tasks to afternoon</li>
                                            <li>• Protect recovery tonight</li>
                                        </ul>
                                    </div>
                                </div>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <SleepProtocolConfig />
                                </Suspense>

                                <h3 className="text-2xl font-bold text-green-400 mt-12 mb-4">The 3-Level Protocol</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold flex-shrink-0">G</div>
                                        <div>
                                            <h4 className="text-white font-bold">Green Day (Full Capacity)</h4>
                                            <p className="text-sm text-slate-400">Front-load hardest tasks. High intensity workout. Push projects forward.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold flex-shrink-0">Y</div>
                                        <div>
                                            <h4 className="text-white font-bold">Yellow Day (Moderate)</h4>
                                            <p className="text-sm text-slate-400">Standard load. 1 deep work block max. Protect sleep tonight.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold flex-shrink-0">R</div>
                                        <div>
                                            <h4 className="text-white font-bold">Red Day (Survival)</h4>
                                            <p className="text-sm text-slate-400">3 essential tasks only. No intense decisions. Active recovery focus.</p>
                                        </div>
                                    </div>
                                </div>

                                <Suspense fallback={null}>
                                    <CaptainTip type="pro" title="DDS (Dad Deploying Systems)'s Residency Hack">
                                        "During residency with a newborn, I used 'Red Day' protocols constantly. Instead of studying at 5 AM (when I was a zombie), my agent moved study blocks to lunch when I was awake. I passed boards because I stopped fighting my biology."
                                    </CaptainTip>
                                </Suspense>
                            </div>
                        </div>
                    </section >

                    {/* Chapter 11: Mental Wellbeing */}
                    < section id="chapter-11" className="py-16 px-6" >
                        <div className="max-w-4xl mx-auto">
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="working"
                                    message="I'm a productivity robot, not a therapist. If you're struggling, please talk to a professional. But I CAN help with the 'Mental Load'—the invisible work of tracking everything. Less cognitive chaos = more mental peace."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 11: Mental Health & Wellbeing Support</h2>

                                <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30 my-8">
                                    <h3 className="text-xl font-bold text-blue-400 mb-3">The Invisible Burden</h3>
                                    <p className="text-white mb-4">"Did I pay that bill? What's for dinner? Did I sign the permission slip?"</p>
                                    <p className="text-slate-300 text-sm">
                                        The stress of tracking everything makes you worse at tracking everything. Your Wellbeing Agent's job is to offload this burden so your brain can actually relax.
                                    </p>
                                </div>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <MentalLoadAssessment />
                                </Suspense>

                                <h3 className="text-2xl font-bold text-blue-400 mt-12 mb-4">The Wind-Down Routine</h3>
                                <p className="text-slate-300 mb-4">Protect the transition from "on" to "off".</p>

                                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 font-mono text-sm text-slate-300">
                                    <div className="text-purple-400 mb-2">9:00 PM SEQUENCE:</div>
                                    <ul className="list-disc pl-4 space-y-2 mb-4">
                                        <li>Devices dim / Night mode activates</li>
                                        <li><strong>Quick Capture:</strong> Dump worries into system</li>
                                        <li><strong>Tomorrow Preview:</strong> Check first meeting only</li>
                                        <li><strong>Disconnect:</strong> Phone goes to charger (away from bed)</li>
                                    </ul>
                                </div>

                                <Suspense fallback={null}>
                                    <CaptainTip type="tip" title="The Brain Dump">
                                        Before bed, write down every open loop or worry. Tell your agent: "Remind me of these tomorrow at 9 AM." Your brain can't let go if it thinks it needs to remember.
                                    </CaptainTip>
                                </Suspense>
                            </div>
                        </div>
                    </section >

                    {/* Chapter 12: Second Brain */}
                    < section id="chapter-12" className="py-16 px-6 bg-[#131320] border-y border-slate-800" >
                        <div className="max-w-4xl mx-auto">
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="pointing"
                                    message="Where is that article you read last month? The one with the great insight? Your brain is amazing at creativity but terrible at storage. Let's build a Second Brain that remembers everything for you."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 12: The Second Brain Agent</h2>

                                <div className="grid md:grid-cols-2 gap-6 my-8">
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h4 className="text-cyan-400 font-bold mb-3">Capture</h4>
                                        <p className="text-sm text-slate-300">
                                            Save articles, notes, and ideas instantly. No organizing yet—just get it into the "Knowledge Inbox".
                                        </p>
                                    </div>
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h4 className="text-green-400 font-bold mb-3">Retrieve</h4>
                                        <p className="text-sm text-slate-300">
                                            "What did I read about X?" Your agent searches every document and summarizes the answer.
                                        </p>
                                    </div>
                                </div>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <KnowledgeChaosAssessment />
                                </Suspense>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Study System (Board Prep Example)</h3>
                                <p className="text-slate-300 mb-6">
                                    For professionals in training (medical, legal, technical), this is a superpower. Turn PDFs into an active learning engine.
                                </p>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <StudySystemGenerator />
                                </Suspense>

                                <div className="my-8 border-l-4 border-cyan-500 pl-6 py-2">
                                    <h4 className="text-xl font-bold text-cyan-400 mb-2">🎓 Student Edition: The 'Exam Cram' Protocol</h4>
                                    <p className="text-slate-300 mb-4">
                                        Cramming is bad. Strategic rapid learning is good. Use this prompt 3 days before any major test.
                                    </p>
                                    <Suspense fallback={<div />}>
                                        <CopyPrompt
                                            title="The Exam Cram Agent"
                                            prompt={`I have an exam on [TOPIC] in 3 days. Here are my raw notes:
[PASTE NOTES]

Act as my tutor.
1. Create a 3-day study schedule (hour by hour).
2. Identify the 3 most complex concepts and explain them like I'm 5.
3. Generate 20 "Active Recall" questions that test deep understanding, not just definitions.`}
                                            whatItDoes="Turns a pile of messy notes into a structured, high-intensity study plan. It forces you to focus on weak points rather than passively re-reading."
                                            variables={[
                                                { name: "[TOPIC]", description: "e.g., 'Organic Chemistry' or 'Macroeconomics'" },
                                                { name: "[PASTE NOTES]", description: "Paste your entire semester's notes here" }
                                            ]}
                                        />
                                    </Suspense>
                                </div>

                                <Suspense fallback={null}>
                                    <CaptainTip type="pro" title="Active Recall Agent">
                                        "Don't just re-read notes. Ask your agent: 'Quiz me on the weak areas from yesterday's reading.' It will generate fresh questions every time. That's how you make knowledge stick."
                                    </CaptainTip>
                                </Suspense>
                            </div>
                        </div>
                    </section >

                    {/* Part 4 Complete */}
                    < section className="py-16 px-6" >
                        <div className="max-w-4xl mx-auto">
                            <div className="p-8 bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-2xl border border-green-500/50 text-center">
                                <h3 className="text-3xl font-bold text-white mb-4">Part 4 Complete! 🚀</h3>
                                <p className="text-slate-300 mb-6">
                                    You've optimized your biology, cleared your mind, and supercharged your learning.
                                </p>
                                <div className="grid md:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-slate-900/50 p-4 rounded-xl">
                                        <div className="text-green-400 font-bold text-2xl">Recovery</div>
                                        <div className="text-slate-400 text-sm">Aware & Adaptive</div>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-xl">
                                        <div className="text-blue-400 font-bold text-2xl">Mental Load</div>
                                        <div className="text-slate-400 text-sm">Offloaded</div>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-xl">
                                        <div className="text-cyan-400 font-bold text-2xl">Knowledge</div>
                                        <div className="text-slate-400 text-sm">Indexed & Active</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/part5')}
                                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold transition-all"
                                >
                                    Continue to Part 5: The Life OS
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </section >

                    {/* Social Share */}
                    < Suspense fallback={null} >
                        <SocialShare
                            title="Using AI to optimize my health and sleep. The data doesn't lie!"
                            hashtags={["AgenticAI", "Biohacking", "HealthTech"]}
                        />
                    </Suspense >
                </div >
            </PasswordGate>
        </WebbookLayout >
    );
};

export default Part4;
