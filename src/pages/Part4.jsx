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
                                    < li >• After 1 night of 4 hours: <strong className="text-red-400">-40% cognitive performance</strong> on complex tasks</li>
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
                    <h3 className="text-xl font-bold text-green-400 mb-3">📌 Quick Win: The Morning Check-In (Enhanced)</h3>
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
                                        <div>• 10:30 AM: KEPT → Team 1-on-1s (moderate load)</div>
                                        <div>• 12:00 PM: ADDED → 30-min walk outside</div>
                                        <div>• 2:00 PM: MOVED → "Client pitch moved to Tuesday 10 AM"</div>
                                        <div>• 4:00 PM: CANCELLED → "Budget review deferred"</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-green-400 font-bold mt-2">Time reclaimed: 5 hours of high-cognitive tasks → recovery time</p>
                            <p className="text-white italic">Result: Sarah sleeps 7.5 hours Monday night, presents confidently Thursday</p>
                        </div>
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

            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                <h4 className="text-green-400 font-bold mb-3">📖 Sarah, 3 Months Later</h4>
                <div className="space-y-3 text-sm text-slate-300">
                    <p>Monday morning, 6:45 AM. Alarm rings. Sarah wakes naturally (no snooze).</p>
                    <p className="text-green-400 font-bold">7 hours, 42 minutes last night.</p>
                    <div className="bg-slate-900/50 p-3 rounded font-mono text-xs space-y-1">
                        <div>Sunday: 7 hours, 28 minutes</div>
                        <div>Saturday: 8 hours, 15 minutes</div>
                        <div>Friday: 7 hours, 05 minutes</div>
                        <div className="text-green-400 font-bold pt-1">7-day average: 7.4 hours/night.</div>
                    </div>

                    <p className="text-white">Opens phone. "Morning Check-In" notification.</p>
                    <p className="font-mono text-xs">Sarah: "Sleep: 7.5 hrs, Quality: 8/10, No disruptions"</p>
                    <p className="font-mono text-xs text-green-400">Agent: "GREEN DAY DETECTED. Full capacity. Front-loading strategy work to 9-11 AM."</p>

                    <div className="mt-4 pt-3 border-t border-green-500/30">
                        <p className="text-white font-bold mb-2">What Changed:</p>
                        <div className="space-y-2 text-xs">
                            <div>
                                <p className="text-red-400 font-bold">WEEK 1-2: Red Days mostly</p>
                                <p>• Agent moved ALL high-stakes work to future</p>
                                <p>• Focus: Sleep 8+ hours, administrative tasks only</p>
                            </div>
                            <div>
                                <p className="text-yellow-400 font-bold">WEEK 3-4: Yellow Days emerging</p>
                                <p>• Sleep averaging 6.5-7 hrs</p>
                                <p>• Agent allowed 1 deep work block/day</p>
                            </div>
                            <div>
                                <p className="text-green-400 font-bold">WEEK 5-6: Green Days appearing</p>
                                <p>• Sleep averaging 7+ hrs</p>
                                <p>• Agent front-loaded hard work to mornings</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-green-500/30">
                        <p className="text-white font-bold text-sm mb-2">3-MONTH RESULTS:</p>
                        <div className="space-y-1 text-xs text-slate-300">
                            <div>• Average sleep: 5.2 hrs/night → 7.4 hrs/night (+2.2 hrs/night)</div>
                            <div>• Sleep debt eliminated: 19.5 hrs/week → 0</div>
                            <div>• Cognitive errors: 8 hrs/week rework → nearly zero</div>
                            <div>• Presentation success: 60% → 95%</div>
                            <div>• Health: Cortisol normalized, immune recovered</div>
                            <div>• Work-life: Made EVERY family event</div>
                        </div>
                        <p className="text-green-400 font-bold mt-2">Annual value: 11.4 hours/week reclaimed (8 hrs rework + 2hrs better sleep + 1.4hrs fewer zombie hours)</p>
                        <p className="text-white italic text-sm mt-3">"I used to think 'powering through' was discipline. It was just denial. Now I work WITH my biology, not against it. I'm more productive on 7 hours than I ever was on 5."</p>
                    </div>
                </div>
            </div>

            <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                <h4 className="text-yellow-400 font-bold mb-3">💬 Common Objections (And The Truth)</h4>

                <div className="space-y-4 text-sm">
                    <div>
                        <p className="text-white font-bold mb-2">"I don't have time to track my sleep."</p>
                        <p className="text-cyan-400 text-xs">You don't track manually. Smartwatch does it (Apple Watch, Fitbit, Oura Ring). Morning Check-In takes 30 seconds. Sarah uses Oura Ring. Auto-syncs. Zero manual input. If no wearable? Estimate: "Slept 5ish hours, quality sucked." Still works. Rough data > no data.</p>
                    </div>

                    <div>
                        <p className="text-white font-bold mb-2">"What if I CAN'T control my sleep schedule?" (shift workers, new parents)</p>
                        <p className="text-slate-300 text-xs mb-1">You can't control WHEN you sleep. You CAN control WHAT you attempt on low sleep.</p>
                        <p className="text-green-400 text-xs">Recovery-Aware doesn't FIX your sleep. It ADAPTS your demands to match reality. New parents: Permanent "Yellow/Red" mode for first 6 months. No guilt for "low productivity"—you're in SURVIVAL mode by design.</p>
                    </div>

                    <div>
                        <p className="text-white font-bold mb-2">"Isn't this just giving up on productivity?"</p>
                        <p className="text-cyan-400 text-xs">No. It's OPTIMIZING productivity across time. Sarah's numbers: Month 1 (force through): 30 hrs "productive" work, 8 hrs fixing mistakes = 18 net hrs. Month 3 (recovery-aware): 28 hrs productive, 0.5 hrs fixes = 27.5 net hrs. <strong>She works LESS and produces MORE.</strong></p>
                    </div>

                    <div>
                        <p className="text-white font-bold mb-2">"My boss won't let me reschedule."</p>
                        <p className="text-slate-300 text-xs mb-1">Option 1: "I had a rough night (4 hrs sleep). I can present today at 60% quality, or Thursday at 95% quality. Which serves the project better?"</p>
                        <p className="text-green-400 text-xs">Most bosses choose quality. Option 2: Don't announce Red Days. Just defer non-urgent tasks. Sarah never told her VP about sleep. Just said: "I'd like to refine the analysis." Same outcome, professional framing.</p>
                    </div>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-green-400 mt-12 mb-4">Shift Worker Recovery: Marcus Rivera</h3>
            <p className="text-slate-300 text-sm mb-4">
                Marcus Rivera, night shift RN (ICU), Phoenix
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                    <h4 className="text-red-400 font-bold mb-3">THE PROBLEM (Year 1)</h4>
                    <div className="space-y-2 text-xs text-slate-300">
                        <div>• Schedule: 11 PM - 7 AM, Tue/Wed/Thu nights</div>
                        <div>• Sleep chaos:</div>
                        <div className="pl-3 space-y-1">
                            <div>- Tuesday: Sleep 9 AM - 2 PM (5 hrs)</div>
                            <div>- Wednesday: 9 AM - 1 PM (4 hrs)</div>
                            <div>- Thursday: 9 AM - 5 PM (8 hrs)</div>
                        </div>
                        <div className="pt-2 text-red-400"><strong>Medication errors: 2 in 6 months</strong></div>
                        <div className="pt-2"><strong>Wed 3:47 AM mistake:</strong></div>
                        <div className="pl-3">Dose calculation error (15mg instead of 1.5mg). Caught by pharmacy. Incident report filed.</div>
                        <div className="text-red-400 mt-2">"I was a zombie. I tried to power through."</div>
                    </div>
                </div>

                <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                    <h4 className="text-green-400 font-bold mb-3">RECOVERY-AWARE (6 Months)</h4>
                    <div className="space-y-2 text-xs text-slate-300">
                        <div><strong>Protocol:</strong></div>
                        <div className="pl-3 space-y-1">
                            <div>• Tuesday night (after 5hr) = YELLOW SHIFT</div>
                            <div>• Wednesday night (after 4hr) = RED SHIFT</div>
                            <div>• Thursday night (after 8hr) = GREEN SHIFT</div>
                        </div>
                        <div className="pt-2"><strong>RED SHIFT (Wed night):</strong></div>
                        <div className="pl-3 space-y-1">
                            <div>• Focus: Patient safety tasks ONLY</div>
                            <div>• Defer: Complex charting, new admits</div>
                            <div>• Agent reminder: "Red shift. Double-check ALL meds."</div>
                        </div>
                        <div className="pt-2 text-green-400"><strong>6-Month Results:</strong></div>
                        <div className="pl-3 space-y-1">
                            <div>• Medication errors: 2 → 0</div>
                            <div>• Charting time: 45 min → 25 min/night</div>
                            <div>• Safety incidents: 0</div>
                        </div>
                        <div className="text-green-400 mt-2">"Match task to capacity = safer patients."</div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 mb-6 text-center">
                <p className="text-white italic text-sm">"I used to think 'tough it out' was professional. Now I know 'match task to capacity' is safer. My patients deserve my Green self, not my Red zombie." — Marcus Rivera, RN</p>
            </div>

            <Suspense fallback={null}>
                <CaptainTip type="pro" title="DDS (Dad Deploying Systems)'s Residency Hack">
                    "During residency with a newborn, I used 'Red Day' protocols constantly. Instead of studying at 5 AM (when I was a zombie), my agent moved study blocks to lunch when I was awake. I passed boards because I stopped fighting my biology."
                </CaptainTip>
            </Suspense>

            <div className="mt-12 p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-500/50">
                <h4 className="text-purple-400 font-bold mb-3">🚀 What's Next?</h4>
                <p className="text-slate-300 text-sm mb-3">
                    You've now mastered Recovery-Aware living:
                </p>
                <div className="space-y-1 text-sm text-slate-300 mb-4">
                    <div>• <strong className="text-white">Chapter 10:</strong> Adapt daily demands to biology (11.4 hrs/week reclaimed)</div>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30 mb-4">
                    <p className="text-cyan-400 font-bold text-lg">Running total (Parts 2-4 so far): ~48 hours/week reclaimed</p>
                </div>
                <p className="text-white font-bold text-sm mb-2">
                    But here's the problem:
                </p>
                <p className="text-red-400 font-bold mb-3">
                    You're sleeping better... and your MIND is still racing.
                </p>
                <div className="bg-red-900/20 p-3 rounded text-xs text-slate-300 space-y-1">
                    <div>The 3 AM thought: "Did I pay that bill?"</div>
                    <div>"What's my daughter's teacher's name?"</div>
                    <div>"When's that dentist appointment?"</div>
                </div>
                <p className="text-orange-400 font-bold mt-4">
                    The Mental Load.
                </p>
                <p className="text-slate-400 text-xs mt-2">
                    It's not tasks (you've automated those). It's the INVISIBLE BURDEN of tracking everything.
                </p>
                <p className="text-purple-400 font-bold mt-4">
                    Chapter 11: Mental Wellbeing & Load Reduction
                </p>
                <p className="text-slate-400 text-xs mt-2">
                    How to offload the cognitive burden so your brain can actually REST during sleep.
                </p>
            </div>
        </div>
                        </div >
                    </section >

    {/* Chapter 11: Mental Wellbeing */ }
    < section id = "chapter-11" className = "py-16 px-6" >
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

    {/* Chapter 12: Second Brain */ }
    < section id = "chapter-12" className = "py-16 px-6 bg-[#131320] border-y border-slate-800" >
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

    {/* Part 4 Complete */ }
    < section className = "py-16 px-6" >
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

    {/* Social Share */ }
    < Suspense fallback = { null} >
        <SocialShare
            title="Using AI to optimize my health and sleep. The data doesn't lie!"
            hashtags={["AgenticAI", "Biohacking", "HealthTech"]}
        />
                    </Suspense >
                </div >
            </PasswordGate >
        </WebbookLayout >
    );
};

export default Part4;
