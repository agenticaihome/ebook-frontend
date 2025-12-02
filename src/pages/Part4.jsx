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
                                    <p className="text-slate-300 text-sm leading-loose md:leading-relaxed mb-4">
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
                                    <p className="text-slate-300 text-sm leading-loose md:leading-relaxed mb-4">
                                        The fog is thick. Coffee isn't cutting through. Brain won't boot up.
                                    </p>
                                    <p className="text-slate-300 text-sm leading-loose md:leading-relaxed mb-4">
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
                                    <p className="text-slate-300 text-sm leading-loose md:leading-relaxed mb-4">
                                        9:15 AM: She's 15 minutes into the presentation. Slide 2 has three typos she didn't catch.
                                    </p>
                                    <p className="text-slate-300 text-sm leading-loose md:leading-relaxed mb-4">
                                        VP asks: "What were the Q4 numbers again?"
                                    </p>
                                    <p className="text-red-400 font-bold mb-3">
                                        Her brain... blanks. Complete white noise.
                                    </p>
                                    <p className="text-slate-300 text-sm leading-loose md:leading-relaxed mb-4">
                                        She fumbles through her notes. "I'll... need to get back to you on that."
                                    </p>
                                    <p className="text-slate-300 text-sm leading-loose md:leading-relaxed mb-4">
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

                                <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                                    <h4 className="text-green-400 font-bold mb-3">📖 Sarah, 3 Months Later</h4>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        <p>Monday morning, 6:50 AM. Sarah wakes naturally.</p>
                                        <p className="text-green-400 font-bold">7 hours, 24 minutes of sleep. Quality: 8/10.</p>
                                        <div className="bg-slate-900/50 p-4 rounded my-3">
                                            <div className="space-y-1 text-xs text-slate-300">
                                                <div>30-day average: <span className="text-green-400 font-bold">7.4 hours/night</span></div>
                                                <div>Best week: 8.1 hours/night</div>
                                                <div>Worst week: 6.8 hours/night (still functional)</div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-900/80 p-4 rounded-xl border border-green-500/30 my-4">
                                            <p className="text-white font-bold text-sm mb-2">What Changed:</p>
                                            <div className="space-y-2 text-xs">
                                                <p><strong className="text-green-400">1. Morning Check-In (30 sec/day):</strong> Agent adapts schedule based on sleep data</p>
                                                <p><strong className="text-green-400">2. Protected 10 PM bedtime:</strong> Calendar blocks "Wind Down" 9:30-10 PM (non-negotiable)</p>
                                                <p><strong className="text-green-400">3. Calendar adaptation:</strong> High-stakes work only on Green days (7+ hrs sleep)</p>
                                                <p><strong className="text-green-400">4. Recovery tracking:</strong> Agent monitors trends, suggests adjustments</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-green-500/30">
                                            <p className="text-white font-bold text-sm mb-2">3-MONTH RESULTS:</p>
                                            <div className="space-y-1 text-xs text-slate-300">
                                                <div>• Time reclaimed: <span className="text-green-400 font-bold">11.4 hours/week</span> (from better sleep efficiency + no rework from errors)</div>
                                                <div>• Mistakes: $12K error → <span className="text-green-400 font-bold">$0 errors in 90 days</span></div>
                                                <div>• Performance reviews: "Most improved quarter" — VP</div>
                                                <div>• Health: Cortisol normalized, immune function restored</div>
                                                <div>• Family: Attended <span className="text-green-400 font-bold">every recital/event</span> in 3 months</div>
                                            </div>
                                            <p className="text-white italic text-sm mt-3">"I'm not 'powering through' anymore. I'm performing at capacity that matches my recovery. Turns out, that's way more productive." — Sarah Chen</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                                    <h4 className="text-yellow-400 font-bold mb-3">💬 Common Objections (And The Truth)</h4>

                                    <div className="space-y-4 text-sm">
                                        <div>
                                            <p className="text-white font-bold mb-2">"I don't have TIME to track my sleep."</p>
                                            <p className="text-slate-300 text-xs mb-1">Morning check-in: 30 seconds. Wearable tracking: automatic (Oura, Whoop, Apple Watch).</p>
                                            <p className="text-green-400 text-xs">ROI: Sarah's 30 sec/day check-in prevented a $12K mistake. That's $400/second.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"What if I can't CONTROL my sleep? (Shift workers, parents, insomnia)"</p>
                                            <p className="text-slate-300 text-xs mb-1">Recovery-Aware isn't about perfect sleep. It's about ADAPTING to reality.</p>
                                            <div className="text-xs text-slate-300 space-y-1 mt-2">
                                                <p className="text-cyan-400">Examples:</p>
                                                <div className="pl-3 space-y-1">
                                                    <div>• Night shift nurse: Agent schedules critical tasks after 3+ recovery days</div>
                                                    <div>• New parent: Red Day protocol 80% of time, Green Day work batched strategically</div>
                                                    <div>• Insomnia patient: Agent tracks patterns, suggests "good enough" task scheduling</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"Isn't this just GIVING UP on productivity?"</p>
                                            <p className="text-cyan-400 text-xs">Opposite. Sarah's output INCREASED 40% in 3 months. Why? Zero time wasted on mistake correction. Strategic work done at peak capacity instead of zombie mode.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"My boss won't let me reschedule meetings based on sleep."</p>
                                            <p className="text-slate-300 text-xs mb-1">Test: Try it once. "I need to move this to Thursday for optimal prep." (Don't mention sleep.)</p>
                                            <p className="text-green-400 text-xs">Reality: Bosses care about PERFORMANCE. Delivering high-quality work on Thursday beats a disaster on Monday. Sarah's VP noticed the difference immediately.</p>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-purple-400 mt-12 mb-4">Case Study: Marcus Rivera, ICU RN (Night Shift)</h3>
                                <p className="text-slate-300 text-sm mb-4">
                                    Marcus Rivera, registered nurse, ICU night shift (7 PM - 7 AM), Phoenix
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                                        <h4 className="text-red-400 font-bold mb-3">THE PROBLEM (Year 1)</h4>
                                        <div className="space-y-2 text-xs text-slate-300">
                                            <div><strong>Rotating nights:</strong> 3 nights on, 2 days off (circadian chaos)</div>
                                            <div><strong>Sleep:</strong> 4-6 hrs/day during recovery (fragmented)</div>
                                            <div><strong>Critical errors:</strong> 2 near-misses with medication dosing</div>
                                            <div className="pt-2 text-red-400"><strong>Danger zone:</strong> Night 3 of rotation = cognitive impairment</div>
                                            <div className="pt-2"><strong>Problem:</strong></div>
                                            <div className="pl-3 space-y-1">
                                                <div>• ICU work requires 100% attention (lives on the line)</div>
                                                <div>• Traditional approach: "Just focus harder"</div>
                                                <div>• Reality: Can't focus when brain is offline</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                                        <h4 className="text-green-400 font-bold mb-3">THE ADAPTATION (6 Months)</h4>
                                        <div className="space-y-2 text-xs text-slate-300">
                                            <div><strong>Recovery-Aware Protocol:</strong></div>
                                            <div className="pl-3 space-y-1">
                                                <div><strong className="text-red-400">RED shifts</strong> (Night 3, &lt;5hrs recovery): Pair with senior RN, avoid solo critical decisions</div>
                                                <div><strong className="text-yellow-400">YELLOW shifts</strong> (Night 2, 5-6hrs recovery): Standard protocols, double-check meds</div>
                                                <div><strong className="text-green-400">GREEN shifts</strong> (Night 1, 7+hrs recovery): Full capacity, train new nurses</div>
                                            </div>
                                            <div className="pt-2 text-green-400"><strong>6-Month Results:</strong></div>
                                            <div className="pl-3 space-y-1">
                                                <div>• Medication errors: 2 near-misses → <span className="text-green-400 font-bold">0 errors in 6 months</span></div>
                                                <div>• Supervisor noticed: "Marcus, you're sharper on nights now?"</div>
                                                <div>• Strategy: Self-awareness of capacity = better decisions</div>
                                                <div>• Patient outcomes: No incidents on his watch</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 p-6 rounded-xl border border-purple-500/50 mb-6 text-center">
                                    <p className="text-white italic text-sm">"I can't control my sleep schedule. But I CAN control what tasks I take on when I'm running on 4 hours. That awareness saves lives." — Marcus Rivera, ICU RN</p>
                                </div>

                                <div className="mt-12 p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-500/50">
                                    <h4 className="text-purple-400 font-bold mb-3">🚀 What's Next?</h4>
                                    <p className="text-slate-300 text-sm mb-3">
                                        You've reclaimed:
                                    </p>
                                    <div className="space-y-1 text-sm text-slate-300 mb-4">
                                        <div>• <strong className="text-white">Part 2:</strong> Mornings (30 min/day) + Food ($900/month) + Home ($6K/year)</div>
                                        <div>• <strong className="text-white">Chapter 7:</strong> Email (90 min/day = 7.5 hours/week)</div>
                                        <div>• <strong className="text-white">Chapter 8:</strong> Calendar (90 min/day = 9.5 hours/week)</div>
                                        <div>• <strong className="text-white">Chapter 9:</strong> Admin (90 min/week = 5.9 work weeks/year)</div>
                                        <div>• <strong className="text-white">Chapter 10:</strong> Recovery (11.4 hours/week from sleep efficiency + error elimination)</div>
                                    </div>
                                    <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30 mb-4">
                                        <p className="text-purple-400 font-bold text-lg">Running total: ~48 hours/week reclaimed</p>
                                        <p className="text-slate-400 text-xs mt-1">(That's more than a full-time job worth of time back.)</p>
                                    </div>
                                    <p className="text-white font-bold text-sm mb-2">
                                        But here's the invisible thief:
                                    </p>
                                    <p className="text-red-400 font-bold mb-3">
                                        You have all this reclaimed time... and it's EATEN by MENTAL LOAD.
                                    </p>
                                    <div className="bg-red-900/20 p-3 rounded text-xs text-slate-300 space-y-1">
                                        <div>• The 6,200 thoughts/day bouncing in your head</div>
                                        <div>• The "Did I remember to..." 3 AM panic</div>
                                        <div>• The invisible labor of remembering EVERYTHING</div>
                                        <div>• The cognitive tax of 30 open browser tabs in your brain</div>
                                    </div>
                                    <p className="text-orange-400 font-bold mt-4">
                                        Chapter 11: Mental Wellbeing & Load Reduction
                                    </p>
                                    <p className="text-slate-400 text-xs mt-2">
                                        How to close the 30 cognitive tabs you're running and reclaim your mental bandwidth.
                                    </p>
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

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 mb-8">
                                    <h3 className="text-red-400 font-bold mb-3">The 3 AM Spiral</h3>
                                    <p className="text-white font-bold text-sm mb-3">
                                        Jennifer Martinez, operations manager, Chicago
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        3:12 AM. Jennifer bolts awake. Heart racing.
                                    </p>
                                    <p className="text-red-400 font-bold text-lg mb-3">
                                        "Did I pay the electricity bill?"
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        She grabs her phone. Opens banking app. Checks. Yes, paid.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        But now she's awake. And the thoughts start flooding:
                                    </p>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <div className="space-y-1 text-xs text-slate-400">
                                            <div>• "Did I remember to send that work email?"</div>
                                            <div>• "Is tomorrow trash day?"</div>
                                            <div>• "What's for dinner tomorrow?"</div>
                                            <div>• "Did I schedule the dentist appointment?"</div>
                                            <div>• "Is the car registration due this month?"</div>
                                            <div>• "Did I sign my daughter's field trip form?"</div>
                                            <div>• "Do we have milk?"</div>
                                            <div>• "When was the last time I changed the air filter?"</div>
                                            <div>• "Is my mom's birthday this week or next week?"</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-3">
                                        4:08 AM. Still awake. Brain won't turn off.
                                    </p>
                                    <p className="text-red-400 font-bold mb-3">
                                        It's like having 30 browser tabs open in her head. All the time.
                                    </p>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <p className="text-white text-sm mb-2">This week alone:</p>
                                        <div className="space-y-1 text-xs text-slate-400">
                                            <div>• Monday: Forgot daughter's lunch (she had to eat school pizza)</div>
                                            <div>• Tuesday: Missed credit card payment (first time ever → $35 late fee)</div>
                                            <div>• Wednesday: Forgot to follow up with client (VP asked: "What happened?")</div>
                                            <div>• Thursday: Double-booked herself (dentist AND work meeting at 2 PM)</div>
                                            <div>• Friday: Realized she never RSVPd to her sister's birthday party</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Her husband asks: "Why don't you just write it down?"
                                    </p>
                                    <p className="text-red-400 italic text-sm mb-3">
                                        She HAS lists. 4 different to-do apps. Sticky notes everywhere. A planner. Nothing works.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Because the problem isn't remembering WHAT to do. It's the CONSTANT MENTAL LOAD of:
                                    </p>
                                    <div className="bg-red-900/20 p-3 rounded text-xs text-slate-300 space-y-1">
                                        <div>• Tracking deadlines across 15 different systems</div>
                                        <div>• Remembering who needs what, when</div>
                                        <div>• Mental triaging: "Is this urgent? Can it wait? Who's depending on this?"</div>
                                        <div>• The invisible labor of being the "household project manager"</div>
                                        <div>• The 3 AM anxiety spiral of "Did I forget something critical?"</div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-red-500/30 text-xs text-slate-400">
                                        <p className="text-white font-bold mb-2">Annual cost:</p>
                                        <div className="space-y-1">
                                            <div>Late fees (credit card, utilities, subscriptions): <span className="text-red-400 font-bold">~$400/year</span></div>
                                            <div>Missed opportunities: Client follow-ups, networking events, kids' activities</div>
                                            <div>Sleep quality: 2-3 nights/week of 3 AM spirals (cognitive impairment)</div>
                                            <div>Relationship strain: "Why can't you just keep track?" arguments</div>
                                            <div className="text-red-400 font-bold pt-2">Mental health: Chronic low-level anxiety ("I'm forgetting something important")</div>
                                        </div>
                                    </div>
                                    <p className="text-cyan-400 text-sm mt-4 italic">
                                        The worst part? She's not disorganized. She's OVER-organized. 30 systems. Zero peace of mind.
                                    </p>
                                </div>

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

                                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-xl border border-blue-500/50 my-8">
                                    <h3 className="text-xl font-bold text-blue-400 mb-3">📌 Quick Win: The 9 PM Worry Dump</h3>
                                    <p className="text-white mb-4">Tell your AI:</p>
                                    <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                                        "Here's everything I'm worried about forgetting:<br />
                                        [brain dump - no formatting needed]<br /><br />
                                        Triage this into:<br />
                                        1. DO TOMORROW (specific action item)<br />
                                        2. SCHEDULED (date/time reminder)<br />
                                        3. TRACKED (you monitor, ping me when needed)<br />
                                        4. NOT MY PROBLEM (delete)"
                                    </div>

                                    <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30 my-4">
                                        <p className="text-cyan-400 font-bold text-sm mb-3">Jennifer's 9 PM Worry Dump (Example):</p>
                                        <div className="space-y-3 text-xs text-slate-300">
                                            <div>
                                                <p className="text-white font-bold mb-1">Jennifer types (90 seconds):</p>
                                                <p className="font-mono bg-slate-900/50 p-2 rounded">"electricity bill, dentist appointment for Emma, follow up with Sarah from Tuesday meeting, mom's birthday present, car registration, permission slip for field trip, grocery list milk eggs bread, that expense report, did I email the client back?"</p>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold mb-2">Agent triages (instant):</p>
                                                <div className="space-y-2">
                                                    <div className="bg-green-900/20 p-2 rounded">
                                                        <p className="text-green-400 font-bold mb-1">DO TOMORROW:</p>
                                                        <ul className="space-y-1 text-xs pl-3">
                                                            <li>• 9 AM: Sign field trip permission slip (on kitchen counter)</li>
                                                            <li>• 2 PM: Submit expense report (deadline Friday)</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-blue-900/20 p-2 rounded">
                                                        <p className="text-blue-400 font-bold mb-1">SCHEDULED:</p>
                                                        <ul className="space-y-1 text-xs pl-3">
                                                            <li>• Dentist: I'll send 3 appointment options for Emma (Thu/Fri next week)</li>
                                                            <li>• Mom's birthday: Reminder set for 10 days before (order gift)</li>
                                                            <li>• Follow-up Sarah: Reminder tomorrow 10 AM</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-purple-900/20 p-2 rounded">
                                                        <p className="text-purple-400 font-bold mb-1">TRACKED (I'm watching):</p>
                                                        <ul className="space-y-1 text-xs pl-3">
                                                            <li>• Electricity bill: Paid auto-pay 12/5 ($142 - normal)</li>
                                                            <li>• Car registration: Due 12/28 - I'll remind you 12/20</li>
                                                            <li>• Client email: Sent Tuesday 3:47 PM (awaiting response)</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-slate-800 p-2 rounded">
                                                        <p className="text-slate-400 font-bold mb-1">NOT YOUR PROBLEM:</p>
                                                        <p className="text-xs">Grocery list → Added to shared shopping list (partner can grab)</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-cyan-400 text-xs mt-3">Result: 9 "open tabs" in Jennifer's head → CLOSED. Brain can sleep. No 3 AM spiral.</p>
                                    </div>
                                </div>

                                <Suspense fallback={null}>
                                    <CaptainTip type="tip" title="The Brain Dump">
                                        Before bed, write down every open loop or worry. Tell your agent: "Remind me of these tomorrow at 9 AM." Your brain can't let go if it thinks it needs to remember.
                                    </CaptainTip>
                                </Suspense>

                                <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                                    <h4 className="text-green-400 font-bold mb-3">📖 Jennifer, 2 Months Later</h4>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        <p>Tuesday, 10:47 PM. Jennifer's brain starts: "Did I—"</p>
                                        <p className="text-white italic">She stops herself. "Agent has it."</p>
                                        <p className="text-slate-300">Opens phone. Agent recap:</p>

                                        <div className="bg-slate-900/50 p-4 rounded my-3">
                                            <p className="text-green-400 font-bold text-sm mb-2">✅ TODAY COMPLETED:</p>
                                            <div className="space-y-1 text-xs">
                                                <div>• HOA fee paid (auto-reminder 9 AM)</div>
                                                <div>• Car registration renewed (agent sent DMV link Monday)</div>
                                                <div>• Dentist reschedule confirmed (agent drafted apology email)</div>
                                                <div>• Groceries ordered (agent maintains shared family list)</div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-900/50 p-4 rounded my-3">
                                            <p className="text-blue-400 font-bold text-sm mb-2">📅 UPCOMING (Agent will remind):</p>
                                            <div className="space-y-1 text-xs">
                                                <div>• Mom birthday gift arrives Friday (ordered Monday, agent suggested 3 options)</div>
                                                <div>• Permission slip signed (agent reminded last night)</div>
                                            </div>
                                        </div>

                                        <p className="text-white font-bold">Brain: <span className="text-cyan-400 italic">*silence*</span></p>
                                        <p>Jennifer: Closes phone. <strong className="text-green-400">Asleep by 11:08 PM.</strong></p>

                                        <div className="mt-4 pt-3 border-t border-green-500/30">
                                            <p className="text-white font-bold text-sm mb-2">2-MONTH RESULTS:</p>
                                            <div className="space-y-1 text-xs text-slate-300">
                                                <div>• 3 AM wake-ups: <span className="text-red-400">4-5 nights/week</span> → <span className="text-green-400 font-bold">0-1/week</span></div>
                                                <div>• Missed commitments: <span className="text-red-400">12-15/year</span> → <span className="text-green-400 font-bold">1 (unavoidable conflict)</span></div>
                                                <div>• Late fees/apology gifts: <span className="text-red-400">$400/year</span> → <span className="text-green-400 font-bold">$0</span></div>
                                                <div>• Chronic anxiety: <span className="text-red-400">Constant</span> → <span className="text-green-400 font-bold">Rare</span> ("Agent has it" mantra works)</div>
                                                <div>• Cognitive bandwidth freed: <span className="text-green-400 font-bold">~30% → ~5%</span> (3 items today vs 30)</div>
                                            </div>
                                            <p className="text-white italic text-sm mt-3">"I used to think being a 'good mom/partner/employee' meant REMEMBERING everything. Now I know it means building a SYSTEM that remembers FOR me. My brain is for creativity, not tracking trash day." — Jennifer Martinez</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                                    <h4 className="text-yellow-400 font-bold mb-3">💬 Common Objections (And The Truth)</h4>

                                    <div className="space-y-4 text-sm">
                                        <div>
                                            <p className="text-white font-bold mb-2">"I already use a to-do list. How is this different?"</p>
                                            <p className="text-slate-300 text-xs mb-1">To-do lists are PASSIVE. They don't REMIND you.</p>
                                            <p className="text-cyan-400 text-xs">Agent system: Context-aware timing. Agent knows WHEN you need to act, not just WHAT to do. Jennifer got reminded "HOA due tomorrow" at the right moment, not buried in a list.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"My partner should just help more. Why do I need AI?"</p>
                                            <p className="text-slate-300 text-xs mb-1">You're right. AND you still need a system.</p>
                                            <p className="text-cyan-400 text-xs">This isn't about replacing your partner. It's about replacing the INVISIBLE PROJECT MANAGER role that one person (usually women) defaults to. Agent divides reminders equally. Nobody is "in charge" of remembering.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"Isn't offloading to AI just avoiding responsibility?"</p>
                                            <p className="text-cyan-400 text-xs">No. It's SYSTEMATIZING responsibility. Jennifer's freed mental bandwidth now goes to: Strategic work projects (promotion earned Month 3), daughter's emotional needs (noticed anxiety, got her therapy), HER OWN mental health. She's more responsible NOW than when drowning in trivial tracking.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"What if agent forgets something?"</p>
                                            <p className="text-slate-300 text-xs mb-1">Agents don't "forget." They execute exactly what you program.</p>
                                            <p className="text-green-400 text-xs">Jennifer's 2-month track record: 0 items missed by agent. 1 item Jennifer forgot to tell agent initially (caught in weekly review). Human error: Forgetting to capture. Agent error: Never happened.</p>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-purple-400 mt-12 mb-4">Couples Mental Load Balancing: Taylor & Jordan Chen</h3>
                                <p className="text-slate-300 text-sm mb-4">
                                    Taylor (marketing director) & Jordan (software engineer), 2 kids (6 & 9), Boston
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                                        <h4 className="text-red-400 font-bold mb-3">THE PROBLEM (Year 1)</h4>
                                        <div className="space-y-2 text-xs text-slate-300">
                                            <div>• Both work full-time (40+ hrs/week)</div>
                                            <div>• Taylor handled <strong className="text-red-400">80% of household mental load</strong></div>
                                            <div>• Jordan: "I help! Just tell me what to do!"</div>
                                            <div>• Taylor: "That's still ME remembering + delegating = MORE mental load!"</div>
                                            <div className="pt-2 text-red-400"><strong>Tipping point:</strong> Taylor missed her own work deadline (distracted by kid dentist scheduling)</div>
                                            <div className="pt-2"><strong>Friday night argument (typical):</strong></div>
                                            <div className="pl-3 space-y-1">
                                                <div>Jordan: "Why didn't you tell me Emma needed new cleats?"</div>
                                                <div>Taylor: "WHY DO I HAVE TO TELL YOU? YOU'RE HER PARENT TOO!"</div>
                                                <div className="text-red-400 italic">Taylor cries (mental load overflow)</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                                        <h4 className="text-green-400 font-bold mb-3">THE SOLUTION (6 Months)</h4>
                                        <div className="space-y-2 text-xs text-slate-300">
                                            <div><strong>Fair Play + Agent System:</strong></div>
                                            <div className="pl-3 space-y-1">
                                                <div><strong className="text-green-400">Divide domains (not tasks):</strong></div>
                                                <div>• Taylor owns: Kids' school/activities, family social calendar</div>
                                                <div>• Jordan owns: Kids' health/medical, household admin (bills/insurance)</div>
                                                <div>• SHARED: Grocery/meal planning (alternate weeks)</div>
                                            </div>
                                            <div className="pt-2"><strong className="text-green-400">Agent assigns reminders:</strong></div>
                                            <div className="pl-3 space-y-1">
                                                <div>• Monday AM (Jordan's phone): "Pediatrician checkup for Emma in 2 weeks - schedule today"</div>
                                                <div>• Tuesday AM (Taylor's phone): "School volunteer signup closes Friday"</div>
                                            </div>
                                            <div className="pt-2 text-green-400"><strong>6-Month Results:</strong></div>
                                            <div className="pl-3 space-y-1">
                                                <div>• Mental load: <span className="text-green-400 font-bold">80/20 → 50/50</span></div>
                                                <div>• Friday night arguments: 3-4x/month → 0</div>
                                                <div>• Taylor: Promotion Month 5 (bandwidth freed)</div>
                                                <div>• Jordan: "I got this" (owns his domains)</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 p-6 rounded-xl border border-purple-500/50 mb-6 text-center">
                                    <p className="text-white italic text-sm">"I used to resent Jordan. Now I realize the SYSTEM was broken. Fair Play gave us the framework. Agent made it executable. I'm not his project manager anymore. We're CO-MANAGERS with separate domains." — Taylor Chen</p>
                                </div>

                                <div className="mt-12 p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-500/50">
                                    <h4 className="text-purple-400 font-bold mb-3">🚀 What's Next?</h4>
                                    <p className="text-slate-300 text-sm mb-3">
                                        You've reclaimed:
                                    </p>
                                    <div className="space-y-1 text-sm text-slate-300 mb-4">
                                        <div>• <strong className="text-white">Part 2:</strong> Mornings (30 min/day) + Food ($900/month) + Home ($6K/year)</div>
                                        <div>• <strong className="text-white">Chapter 7:</strong> Email (90 min/day = 7.5 hours/week)</div>
                                        <div>• <strong className="text-white">Chapter 8:</strong> Calendar (90 min/day = 9.5 hours/week)</div>
                                        <div>• <strong className="text-white">Chapter 9:</strong> Admin (90 min/week = 5.9 work weeks/year)</div>
                                        <div>• <strong className="text-white">Chapter 10:</strong> Recovery (11.4 hours/week from sleep efficiency + error elimination)</div>
                                        <div>• <strong className="text-white">Chapter 11:</strong> Mental Load (8.2 hours/week from 3 AM spirals eliminated + cognitive bandwidth)</div>
                                    </div>
                                    <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30 mb-4">
                                        <p className="text-purple-400 font-bold text-lg">Running total: ~56 hours/week reclaimed</p>
                                        <p className="text-slate-400 text-xs mt-1">(That's more than a full-time job + overtime.)</p>
                                    </div>
                                    <p className="text-white font-bold text-sm mb-2">
                                        But here's the next problem:
                                    </p>
                                    <p className="text-red-400 font-bold mb-3">
                                        You've cleared mental space... and you're STILL forgetting important insights.
                                    </p>
                                    <div className="bg-red-900/20 p-3 rounded text-xs text-slate-300 space-y-1">
                                        <div>• "Where's that article I read about X?" (Can't find it.)</div>
                                        <div>• "What was that great idea from the podcast?" (Lost.)</div>
                                        <div>• "I learned this before. Why am I relearning?" (No retention system.)</div>
                                    </div>
                                    <p className="text-orange-400 font-bold mt-4">
                                        Chapter 12: The Second Brain Agent
                                    </p>
                                    <p className="text-slate-400 text-xs mt-2">
                                        How to capture every insight instantly, retrieve it when needed, and connect ideas you didn't know were related.
                                    </p>
                                </div>
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
                                    message="You just read about Alex. 90 minutes searching for an insight he ALREADY learned. $3,200 in courses (remembers 5%). Re-Googling 'React hooks' for the 6th time this year. Here's what happened: Your brain is AMAZING at making connections, terrible at long-term storage. Alex isn't forgetting to learn. He's learning without a RETRIEVAL SYSTEM. Second Brain Agent's job: Capture EVERYTHING instantly. Retrieve it when needed. Connect ideas you didn't know were related. Your creativity without the amnesia."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 12: The Second Brain Agent</h2>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 mb-8">
                                    <h3 className="text-red-400 font-bold mb-3">The Relearning Loop</h3>
                                    <p className="text-white font-bold text-sm mb-3">
                                        Alex Rodriguez, product manager, San Francisco
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Monday morning. Slack message from CEO: "What's our strategy for AI integration?"
                                    </p>
                                    <p className="text-red-400 font-bold text-lg mb-3">
                                        Alex KNOWS he read something brilliant about this. Where was it?
                                    </p>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <p className="text-white text-sm mb-2">The search begins:</p>
                                        <div className="space-y-1 text-xs text-slate-400">
                                            <div>• Checks Notion: 47 pages. "AI" mentioned 23 times. Nothing useful.</div>
                                            <div>• Opens Evernote: 128 notes. Half are duplicates. Can't find it.</div>
                                            <div>• Browser bookmarks: 312 saved articles. "Read later" from 2021.</div>
                                            <div>• Kindle highlights: 8 books on AI. Which one had that insight?</div>
                                            <div>• Podcast app: Listened to 40 episodes. Can't remember which.</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-3">
                                        90 minutes later: Gives up. Googles "AI integration strategy" and starts from scratch.
                                    </p>
                                    <p className="text-red-400 font-bold mb-3">
                                        He's relearning something he ALREADY learned. Again.
                                    </p>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <p className="text-white text-sm mb-2">This month alone:</p>
                                        <div className="space-y-1 text-xs text-slate-400">
                                            <div>• Re-Googled "React hooks best practices" (6th time this year)</div>
                                            <div>• Re-watched YouTube tutorial on Figma shortcuts (3rd time — still forgets)</div>
                                            <div>• Re-bought book on pricing strategy (already owns it, never found it)</div>
                                            <div>• Asked coworker question he KNOWS he researched before (embarrassing)</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-red-500/30 text-xs text-slate-400">
                                        <p className="text-white font-bold mb-2">Annual "knowledge leakage" cost:</p>
                                        <div className="space-y-1">
                                            <div>Online courses purchased: <span className="text-red-400 font-bold">$3,200</span> (completed 30%, remember 5%)</div>
                                            <div>Time spent relearning: <span className="text-red-400 font-bold">~6 hours/week</span> (312 hours/year)</div>
                                            <div>Books bought/highlighted: <span className="text-red-400">23 books</span> (can't retrieve insights when needed)</div>
                                            <div>Meetings notes taken: <span className="text-red-400">~200 pages/year</span> (never revisited)</div>
                                            <div className="text-red-400 font-bold pt-2">Mental burden: "I know I learned this. WHERE IS IT?"</div>
                                        </div>
                                    </div>
                                    <p className="text-cyan-400 text-sm mt-4 italic">
                                        The problem isn't learning. It's RETAINING and RETRIEVING what he already learned.
                                    </p>
                                </div>

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

                                <h3 className="text-2xl font-bold text-purple-400 mt-12 mb-4">The Science of Knowledge Retention</h3>

                                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 mb-6">
                                    <p className="text-white font-bold text-sm mb-3">Hermann Ebbinghaus (1885) - The Forgetting Curve:</p>
                                    <ul className="space-y-2 text-sm text-slate-300 mb-4">
                                        <li>• <strong className="text-red-400">24 hours:</strong> Forget 50% of new information</li>
                                        <li>• <strong className="text-red-400">7 days:</strong> Forget 90% without reinforcement</li>
                                        <li>• <strong className="text-red-400">30 days:</strong> Essentially back to zero</li>
                                        <li>• <strong className="text-green-400">Solution:</strong> Active recall + spaced repetition = 80% retention long-term</li>
                                    </ul>

                                    <div className="bg-red-900/20 p-4 rounded mb-4">
                                        <p className="text-white font-bold text-sm mb-2">Alex's Knowledge Leakage (WHY it happens):</p>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• Reads article → Highlights → Never revisits = <span className="text-red-400 font-bold">90% forgotten in 7 days</span></div>
                                            <div>• Takes course → Completes 30% → Moves to next = <span className="text-red-400 font-bold">95% retention loss</span></div>
                                            <div>• Saves bookmark → "Read later" pile grows → <span className="text-red-400 font-bold">Never retrieved</span></div>
                                            <div>• Result: <span className="text-red-400 font-bold">Learning without retention = perpetual relearning</span></div>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 bg-green-900/30 rounded border border-green-500/40">
                                        <p className="text-slate-400 text-xs mb-2">Traditional solution: "Take better notes."</p>
                                        <p className="text-red-400 text-sm mb-3"><strong>Problem: Notes without RETRIEVAL = digital graveyard.</strong></p>
                                        <p className="text-green-400 font-bold text-sm mb-2">Second Brain Agent approach:</p>
                                        <ul className="space-y-1 text-xs text-slate-300">
                                            <li>• Agent captures EVERYTHING (articles, videos, podcasts, meetings)</li>
                                            <li>• Agent SUMMARIZES key insights (not just storing links)</li>
                                            <li>• Agent connects RELATED ideas ("You learned this about X, here's Y connection")</li>
                                            <li>• Agent RESURFACES insights when relevant ("CEO asked about AI? Here's what you learned 3 months ago")</li>
                                        </ul>
                                    </div>

                                    <p className="text-cyan-400 text-sm mt-4 italic">The goal isn't to remember everything. It's to RETRIEVE anything.</p>
                                </div>

                                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-xl border border-blue-500/50 my-8">
                                    <h3 className="text-xl font-bold text-blue-400 mb-3">📌 Quick Win: The Instant Capture Workflow</h3>
                                    <p className="text-white mb-4">Train your agent to capture insights instantly:</p>
                                    <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                                        "When I share an article/video/podcast link:<br />
                                        1. Read/watch/listen to it<br />
                                        2. Extract 3 KEY insights (not summaries, INSIGHTS)<br />
                                        3. Tag by topic + context (when might I need this?)<br />
                                        4. Suggest 2 connections to past learnings<br />
                                        5. Store in searchable knowledge base"
                                    </div>

                                    <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30 my-4">
                                        <p className="text-cyan-400 font-bold text-sm mb-3">Alex's Instant Capture (Example):</p>
                                        <div className="space-y-3 text-xs text-slate-300">
                                            <div>
                                                <p className="text-white font-bold mb-1">Alex pastes article link (10 seconds):</p>
                                                <p className="font-mono bg-slate-900/50 p-2 rounded">"https://example.com/ai-integration-strategy"</p>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold mb-2">Agent processes (30 seconds):</p>
                                                <div className="bg-green-900/20 p-2 rounded">
                                                    <p className="text-green-400 font-bold mb-1">3 KEY INSIGHTS:</p>
                                                    <ul className="space-y-1 text-xs pl-3">
                                                        <li>1. AI works best as "copilot" not replacement (augment humans)</li>
                                                        <li>2. Start with HIGH-VOLUME, LOW-STAKES tasks (customer support triage)</li>
                                                        <li>3. Measure adoption by TIME SAVED, not features shipped</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-blue-900/20 p-2 rounded mt-2">
                                                    <p className="text-blue-400 font-bold mb-1">CONNECTIONS:</p>
                                                    <ul className="space-y-1 text-xs pl-3">
                                                        <li>• Related to: "Jobs to be Done" framework (you studied 2 months ago)</li>
                                                        <li>• Similar to: Atlassian's AI rollout case study (saved last year)</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-purple-900/20 p-2 rounded mt-2">
                                                    <p className="text-purple-400 font-bold mb-1">TAGS:</p>
                                                    <p className="text-xs">#AI #ProductStrategy #Implementation #Q4-Planning</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-cyan-400 text-xs mt-3">Result: When CEO asks "AI integration strategy?" → Agent instantly retrieves this + related insights. No 90-minute search.</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                                    <h4 className="text-green-400 font-bold mb-3">📖 Alex, 4 Months Later</h4>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        <p>Slack message from CEO: "What's our strategy for AI integration?"</p>
                                        <p className="text-white italic">Alex: "Agent, retrieve AI integration insights."</p>
                                        <p className="text-slate-300">Agent (5 seconds later):</p>

                                        <div className="bg-slate-900/50 p-4 rounded my-3">
                                            <p className="text-green-400 font-bold text-sm mb-2">RETRIEVED (3 sources):</p>
                                            <div className="space-y-2 text-xs">
                                                <div>1. <strong>Article</strong> (captured 3 months ago): "AI as copilot, start with high-volume low-stakes"</div>
                                                <div>2. <strong>Podcast</strong> (captured 6 weeks ago): Atlassian case study (saved 40% support time)</div>
                                                <div>3. <strong>Meeting notes</strong> (captured last week): CTO mentioned customer support backlog</div>
                                            </div>
                                            <p className="text-cyan-400 font-bold mt-2 text-sm">SYNTHESIS:</p>
                                            <p className="text-xs">"Recommend: AI customer support triage. Pilot with 100 tickets/week. Measure time-to-resolution reduction. Similar to Atlassian approach."</p>
                                        </div>

                                        <p className="text-white font-bold">Alex copies synthesis. Sends to CEO. <span className="text-green-400">3 minutes total.</span></p>
                                        <p className="text-slate-400 text-xs italic">(vs 90 minutes searching + relearning)</p>

                                        <div className="mt-4 pt-3 border-t border-green-500/30">
                                            <p className="text-white font-bold text-sm mb-2">4-MONTH RESULTS:</p>
                                            <div className="space-y-1 text-xs text-slate-300">
                                                <div>• Time spent relearning: <span className="text-red-400">6 hrs/week</span> → <span className="text-green-400 font-bold">30 min/week</span></div>
                                                <div>• Knowledge retrieval speed: <span className="text-red-400">90 min search</span> → <span className="text-green-400 font-bold">5 sec agent query</span></div>
                                                <div>• Course completion: <span className="text-red-400">30%</span> → <span className="text-green-400 font-bold">85%</span> (agent quizzes him weekly)</div>
                                                <div>• Retained insights: <span className="text-red-400">5%</span> → <span className="text-green-400 font-bold">75%</span> (agent resurfaces connections)</div>
                                                <div>• Duplicate purchases: <span className="text-red-400">$3,200/year</span> → <span className="text-green-400 font-bold">$0</span> (agent checks library first)</div>
                                            </div>
                                            <p className="text-white italic text-sm mt-3">"I'm not smarter. I just have INSTANT ACCESS to everything I've ever learned. That's a superpower." — Alex Rodriguez</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                                    <h4 className="text-yellow-400 font-bold mb-3">💬 Common Objections (And The Truth)</h4>

                                    <div className="space-y-4 text-sm">
                                        <div>
                                            <p className="text-white font-bold mb-2">"I already use Notion/Evernote/Obsidian. How is this different?"</p>
                                            <p className="text-slate-300 text-xs mb-1">Those are STORAGE tools. Agent is RETRIEVAL + CONNECTION tool.</p>
                                            <p className="text-cyan-400 text-xs">Your Notion has 47 pages. Agent SEARCHES + SYNTHESIZES + CONNECTS ideas across all 47. You don't dig through folders. Agent brings insights TO you when needed.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"Won't this make me lazy? I should just REMEMBER things."</p>
                                            <p className="text-cyan-400 text-xs">Ebbinghaus proved you WILL forget 90% in 7 days. That's biology, not laziness. Alex isn't lazy—he's STRATEGIC. His brain is for THINKING, not STORING. Agent handles storage.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"This sounds overwhelming. I don't have time to capture everything."</p>
                                            <p className="text-slate-300 text-xs mb-1">Alex's capture time: 10 sec to paste link. Agent does the rest.</p>
                                            <p className="text-green-400 text-xs">ROI: 10 sec/article × 5 articles/week = 50 sec/week invested. 6 hrs/week relearning ELIMINATED. That's 720:1 ROI.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"What if I capture the WRONG things?"</p>
                                            <p className="text-cyan-400 text-xs">Alex's rule: "If I spent 5+ minutes reading it, capture it." Agent filters signal from noise over time (resurfaces what's ACTUALLY useful, archives what's not).</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-500/50">
                                    <h4 className="text-purple-400 font-bold mb-3">🚀 Part 4 Complete!</h4>
                                    <p className="text-slate-300 text-sm mb-3">
                                        You've reclaimed:
                                    </p>
                                    <div className="space-y-1 text-sm text-slate-300 mb-4">
                                        <div>• <strong className="text-white">Part 2:</strong> Mornings (30 min/day) + Food ($900/month) + Home ($6K/year)</div>
                                        <div>• <strong className="text-white">Chapter 7:</strong> Email (90 min/day = 7.5 hours/week)</div>
                                        <div>• <strong className="text-white">Chapter 8:</strong> Calendar (90 min/day = 9.5 hours/week)</div>
                                        <div>• <strong className="text-white">Chapter 9:</strong> Admin (90 min/week = 5.9 work weeks/year)</div>
                                        <div>• <strong className="text-white">Chapter 10:</strong> Recovery (11.4 hours/week from sleep efficiency)</div>
                                        <div>• <strong className="text-white">Chapter 11:</strong> Mental Load (8.2 hours/week from 3 AM spirals eliminated)</div>
                                        <div>• <strong className="text-white">Chapter 12:</strong> Knowledge Retention (5.5 hours/week from relearning eliminated)</div>
                                    </div>
                                    <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30 mb-4">
                                        <p className="text-purple-400 font-bold text-lg">Part 4 Total: ~61 hours/week reclaimed</p>
                                        <p className="text-slate-400 text-xs mt-1">(Plus $3,200/year in duplicate courses avoided)</p>
                                    </div>
                                    <p className="text-white font-bold text-sm mb-2">
                                        You've optimized: Biology (sleep), Mind (mental load), Knowledge (retention).
                                    </p>
                                    <p className="text-red-400 font-bold mb-3">
                                        What's left? THE BIG PICTURE.
                                    </p>
                                    <div className="bg-red-900/20 p-3 rounded text-xs text-slate-300 space-y-1">
                                        <div>• All these micro-optimizations... but what's the STRATEGY?</div>
                                        <div>• You're efficient... but are you working on the RIGHT things?</div>
                                        <div>• You've saved 61 hours/week... but WHAT FOR?</div>
                                    </div>
                                    <p className="text-orange-400 font-bold mt-4">
                                        Part 5: The Life OS
                                    </p>
                                    <p className="text-slate-400 text-xs mt-2">
                                        How to tie it all together into a coherent system that aligns daily actions with long-term goals. The meta-layer above all agents.
                                    </p>
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
