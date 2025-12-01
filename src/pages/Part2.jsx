import React, { useState, Suspense } from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import PasswordGate from '../components/common/PasswordGate';
import BackgroundEffects from '../components/common/BackgroundEffects';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, UtensilsCrossed, Home, ArrowRight, CheckCircle, Clock, DollarSign } from 'lucide-react';

const CaptainHero = React.lazy(() => import('../components/CaptainHero'));
const CaptainTip = React.lazy(() => import('../components/CaptainTip'));
const CopyPrompt = React.lazy(() => import('../components/common/CopyPrompt'));
const TryThisNow = React.lazy(() => import('../components/common/TryThisNow'));
const BeforeAfterComparison = React.lazy(() => import('../components/common/BeforeAfterComparison'));
const ProgressBar = React.lazy(() => import('../components/common/ProgressBar'));
const MorningChaosCalculator = React.lazy(() => import('../components/MorningChaosCalculator'));
const MorningBriefBuilder = React.lazy(() => import('../components/MorningBriefBuilder'));
const FoodChaosCalculator = React.lazy(() => import('../components/FoodChaosCalculator'));
const HouseholdChaosCalculator = React.lazy(() => import('../components/HouseholdChaosCalculator'));
const EssentialFiveChecklist = React.lazy(() => import('../components/EssentialFiveChecklist'));
const PersonalizedMorningBrief = React.lazy(() => import('../components/PersonalizedMorningBrief'));
const SocialShare = React.lazy(() => import('../components/tools/SocialShare'));
const WorkflowVisual = React.lazy(() => import('../components/common/WorkflowVisual'));
const TroubleshootingAccordion = React.lazy(() => import('../components/common/TroubleshootingAccordion'));

const Part2 = () => {
    const navigate = useNavigate();
    const [activeChapter, setActiveChapter] = useState(4);

    const chapters = [
        { id: 4, title: 'Morning Routines', icon: Coffee },
        { id: 5, title: 'Kitchen & Grocery', icon: UtensilsCrossed },
        { id: 6, title: 'Household Management', icon: Home }
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
            <PasswordGate partNumber={2}>
                <ProgressBar current={activeChapter - 3} total={3} label="Part 2: Daily Operations" />
                <div className="min-h-screen bg-[#0f0f1a] text-white">
                    {/* Hero Section */}
                    <section className="relative pt-24 pb-16 px-6 overflow-hidden">
                        <BackgroundEffects blob1Color="bg-purple-900/30" blob2Color="bg-teal-900/20" />

                        <div className="max-w-4xl mx-auto relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-12"
                            >
                                <div className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">Part 2</div>
                                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                    The Daily Liberation
                                </h1>
                                <p className="text-2xl text-slate-400 italic mb-6">
                                    (The 3 Agents That Bought Sarah 12 Hours/Week Back)
                                </p>
                                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
                                    Remember that task you killed in Part 1? That was step one. Now we're going to free up HOURS every week with three core agents.
                                </p>

                                <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/40 max-w-2xl mx-auto">
                                    <h3 className="text-white font-bold mb-4">By the end of Part 2, you'll have built:</h3>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span><strong className="text-white">Morning Agent</strong> — Save 30 min/day</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span><strong className="text-white">Kitchen Agent</strong> — Save $150-250/month + 3-4 hours/week</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span><strong className="text-white">Household Agent</strong> — Prevent $3,500/year in forgotten costs</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Chapter Navigation */}
                            <div className="grid md:grid-cols-3 gap-4 mb-12">
                                {chapters.map((chapter) => {
                                    const Icon = chapter.icon;
                                    return (
                                        <button
                                            key={chapter.id}
                                            onClick={() => scrollToChapter(chapter.id)}
                                            className={`p-6 rounded-xl border-2 transition-all text-left ${activeChapter === chapter.id
                                                ? 'border-cyan-500 bg-cyan-900/20'
                                                : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                                                }`}
                                        >
                                            <Icon className={activeChapter === chapter.id ? 'text-cyan-400' : 'text-slate-500'} size={24} />
                                            <div className="mt-3 text-sm font-mono text-slate-400">Chapter {chapter.id}</div>
                                            <div className="font-bold text-white">{chapter.title}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Chapter 4: Morning Routines */}
                    <section id="chapter-4" className="py-16 px-6 bg-[#131320] border-y border-slate-800">
                        <div className="max-w-4xl mx-auto">
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="celebrating"
                                    message="You just read about Marcus. Late to school drop-off. Third time this month. The guilt from the teacher. The disappointed kid. Here's the truth: Mornings aren't MORALLY hard. They're STRUCTURALLY hard. You're making 100+ micro-decisions in peak-cortisol mode. Your brain is fried before work starts. But mornings are also the PERFECT place to start because: 1) The pattern is identical every day. 2) Results are immediate (tomorrow morning). 3) Low stakes (if it fails, just check your apps like normal). Tonight, you're setting up ONE automated brief. Tomorrow, you wake up to clarity instead of chaos. Let's build your Morning Agent."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 4: Morning Routines That Run Themselves</h2>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 mb-8">
                                    <h3 className="text-red-400 font-bold mb-3">The Morning That Changed Everything</h3>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Marcus set 3 alarms. Hit snooze on all 3.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Woke up to his 7-year-old standing by the bed: "Dad, we're late again."
                                    </p>
                                    <p className="text-white font-bold text-sm mb-3">
                                        6:52 AM. School starts at 7:15. 15-minute drive.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        No clean uniforms. No breakfast prep. No idea if there's traffic.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        He showed up to drop-off at 7:31 AM. The guilt look from the teacher. The disappointed face from his kid. Third time this month.
                                    </p>
                                    <p className="text-cyan-400 italic text-sm">
                                        "I'm a successful professional. Why can't I get mornings right?"
                                    </p>
                                </div>

                                {/* Quick Win Box */}
                                <Suspense fallback={<div />}>
                                    <CopyPrompt
                                        title="Morning Brief Prompt"
                                        prompt={`Every morning at [YOUR WAKE TIME], I want a brief with:
1. Weather today (high/low, what to wear)
2. My calendar overview
3. One priority to focus on today

Keep it under 3 minutes to read.`}
                                        whatItDoes="Creates a personalized morning briefing that summarizes weather, schedule, and priorities in under 3 minutes of reading. This becomes your single source of truth each morning instead of checking multiple apps."
                                        howToCustomize="Add sections that matter to you: news headlines, stock prices, family birthdays, workout suggestions, etc. Remove sections you don't need. Adjust the time estimate based on your reading speed."
                                        variables={[
                                            { name: "[YOUR WAKE TIME]", description: "e.g., '7:00 AM' or '6:30 AM' - when you want the brief ready" }
                                        ]}
                                    />
                                </Suspense>

                                <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                                    <h4 className="text-yellow-400 font-bold mb-3">💬 "But I'm not a morning person..."</h4>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Neither is Marcus. That's exactly why this works.
                                    </p>
                                    <p className="text-white font-bold text-sm mb-3">
                                        Morning Agent doesn't make you a "morning person." It makes mornings require LESS of you.
                                    </p>
                                    <p className="text-slate-300 text-sm">
                                        Less decisions = Less energy needed = Easier mornings
                                    </p>
                                    <p className="text-cyan-400 text-sm mt-3">
                                        You're not changing your personality. You're removing friction.
                                    </p>
                                </div>

                                <Suspense fallback={<div className="h-48 animate-pulse bg-slate-800/50 rounded-xl my-8" />}>
                                    <WorkflowVisual
                                        title="How The Morning Agent Works"
                                        inputs={[
                                            { label: "Weather API", icon: "cloud" },
                                            { label: "Calendar", icon: "calendar" },
                                            { label: "Priorities", icon: "list" }
                                        ]}
                                        agentName="Morning Agent"
                                        outputs={[
                                            { label: "3-Minute Brief", icon: "file" }
                                        ]}
                                    />
                                </Suspense>

                                <Suspense fallback={<div className="h-24 animate-pulse bg-yellow-900/20 rounded-xl my-8" />}>
                                    <TroubleshootingAccordion
                                        title="Morning Agent Troubleshooting"
                                        issues={[
                                            {
                                                problem: "My agent hallucinated the weather.",
                                                solution: "Check if you pasted the API key correctly. If it persists, switch to a simpler 'copy-paste' weather prompt where you paste the forecast manually."
                                            },
                                            {
                                                problem: "The brief is too generic.",
                                                solution: "Add your specific goals to the 'Context' section of the prompt. The more specific details you give (e.g., 'I am training for a marathon'), the better the advice."
                                            },
                                            {
                                                problem: "It's too long to read.",
                                                solution: "Add a constraint: 'Strictly under 150 words' or 'Bullet points only'. AI tends to be verbose unless constrained."
                                            }
                                        ]}
                                    />
                                </Suspense>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Science: Why Mornings Matter</h3>

                                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 mb-6">
                                    <p className="text-slate-300 text-sm mb-3">
                                        <strong className="text-white">Research from Stanford (2016):</strong> Peak cortisol (stress hormone) is 6-9 AM.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-4">
                                        Every decision you make during peak cortisol uses <strong className="text-red-400">2x the mental energy</strong>.
                                    </p>

                                    <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30 mb-4">
                                        <div className="text-white font-bold text-sm mb-2">The Decision Fatigue Cascade:</div>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>Checking your phone → Cortisol spike → Decision cascade:</div>
                                            <div className="pl-4">• Which email to read first? (Decision 1)</div>
                                            <div className="pl-4">• Respond now or later? (Decision 2)</div>
                                            <div className="pl-4">• What's the weather? (Decision 3)</div>
                                            <div className="pl-4">• What to wear based on weather? (Decision 4)</div>
                                            <div className="pl-4">• Is there traffic? (Decision 5)</div>
                                        </div>
                                    </div>

                                    <p className="text-red-400 font-bold text-sm mb-3">
                                        By 7:30 AM, you've burned 50+ micro-decisions.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-4">
                                        By 9:00 AM, you're mentally exhausted before work even starts.
                                    </p>

                                    <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-500/40">
                                        <div className="text-cyan-400 font-bold text-sm mb-2">The Morning Agent Insight:</div>
                                        <p className="text-white text-sm mb-2">
                                            Automate the first 50 decisions → Preserve peak cortisol energy for actual work.
                                        </p>
                                        <p className="text-green-400 font-bold text-sm">
                                            ROI: 20 minutes/day = 121 hours/year = 3 full work weeks reclaimed.
                                        </p>
                                    </div>
                                </div>

                                <p className="text-slate-300 leading-relaxed mb-4">
                                    This isn't about productivity hacks. It's about preserving your decision-making capacity for things that actually matter.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 my-8">
                                    <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                                        <h4 className="text-white font-bold mb-3">Remember Marcus's Pattern?</h4>
                                        <div className="space-y-2 text-sm text-slate-300 font-mono">
                                            <div>6:30 — Alarm. Snooze.</div>
                                            <div>6:39 — Alarm. Snooze.</div>
                                            <div>6:48 — PANIC. Jump up.</div>
                                            <div>6:50 — Check phone. 23 emails.</div>
                                            <div>7:20 — What to wear? Check weather.</div>
                                            <div>7:30 — What's for breakfast?</div>
                                            <div>7:55 — Where are my keys?</div>
                                            <div className="text-red-400">8:45 — Arrive stressed. Day starts behind.</div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50">
                                        <h4 className="text-white font-bold mb-3">With Morning Agent</h4>
                                        <div className="space-y-3 text-sm text-slate-300">
                                            <div className="flex items-start gap-2">
                                                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={16} />
                                                <span>Wake to single notification with everything you need</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={16} />
                                                <span>No apps to check, no decisions to make</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={16} />
                                                <span>15-30 minutes saved</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={16} />
                                                <span>Day starts proactively, not reactively</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                                    <h4 className="text-green-400 font-bold mb-3">📖 Marcus, 3 Months Later</h4>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        <p>
                                            6:30 AM. Marcus's phone buzzes once.
                                        </p>
                                        <p className="text-white">
                                            He reads the brief while his coffee brews:
                                        </p>
                                        <div className="bg-slate-900/50 p-3 rounded font-mono text-xs space-y-1">
                                            <div>• Weather: 52°F, grab a jacket</div>
                                            <div>• Calendar: 3 meetings, first at 10 AM</div>
                                            <div>• Priority today: Finish Q3 report draft</div>
                                            <div>• Kid's lunchbox: Already packed (yesterday)</div>
                                            <div>• Traffic: 17 minutes via I-95</div>
                                        </div>
                                        <p className="text-cyan-400">
                                            Total reading time: 2 minutes 14 seconds.
                                        </p>
                                        <p>
                                            He's out the door by 7:05 AM. Arrives at school at 7:12 AM.
                                        </p>
                                        <p className="text-white italic">
                                            His kid: "We're early!"<br />
                                            Marcus: "We sure are, buddy."
                                        </p>
                                        <p className="text-green-400 font-bold">
                                            Third month in a row, zero late arrivals.
                                        </p>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Morning Agent Variations</h3>
                                <p className="text-slate-300 leading-relaxed mb-6">
                                    One size doesn't fit all. Here's how different people customize their Morning Agent:
                                </p>

                                <div className="grid md:grid-cols-2 gap-4 my-8">
                                    <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                                        <div className="text-lg mb-2">🏃 <strong className="text-cyan-400">Athletic Edition</strong></div>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• Weather + UV index</div>
                                            <div>• Workout recommendation (based on recovery)</div>
                                            <div>• Hydration reminder</div>
                                            <div>• Nutrition target for the day</div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                                        <div className="text-lg mb-2">👔 <strong className="text-purple-400">Executive Edition</strong></div>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• Pre-meeting brief for each calendar item</div>
                                            <div>• Industry news (3 headlines max)</div>
                                            <div>• Stock/market snapshot</div>
                                            <div>• Priority ranking algorithm</div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                                        <div className="text-lg mb-2">👨‍👩‍👧 <strong className="text-green-400">Parent Edition</strong></div>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• Kid's schedule + lunch reminders</div>
                                            <div>• School events today</div>
                                            <div>• After-school pickup logistics</div>
                                            <div>• Dinner suggestion based on calendar</div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                                        <div className="text-lg mb-2">📚 <strong className="text-orange-400">Student Edition</strong></div>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• Assignment deadlines (sorted by urgency)</div>
                                            <div>• Class schedule + room numbers</div>
                                            <div>• Study block recommendations</div>
                                            <div>• Campus events you care about</div>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Morning Brief Template</h3>
                                <p className="text-slate-300 leading-relaxed mb-4">
                                    Here's what a great Morning Brief looks like:
                                </p>

                                <Suspense fallback={<div className="h-48 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <PersonalizedMorningBrief />
                                </Suspense>
                            </div>

                            <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                <MorningChaosCalculator />
                            </Suspense>
                            <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                <MorningBriefBuilder />
                            </Suspense>

                            <Suspense fallback={null}>
                                <div className="my-12 p-8 bg-gradient-to-br from-orange-900/30 to-yellow-900/20 rounded-2xl border-2 border-orange-500/50">
                                    <h3 className="text-2xl font-bold text-white mb-4">⚡ Tonight's 15-Minute Mission (Do This Before Bed)</h3>
                                    <p className="text-slate-300 mb-6">
                                        Don't wait. Your tomorrow-morning-self will thank you.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-orange-500/20 text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                                            <div>
                                                <div className="text-white font-bold text-sm">Copy the Morning Brief Prompt above</div>
                                                <div className="text-slate-400 text-xs">2 minutes</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="bg-orange-500/20 text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                                            <div>
                                                <div className="text-white font-bold text-sm">Open ChatGPT or Claude, paste it</div>
                                                <div className="text-slate-400 text-xs">3 minutes</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="bg-orange-500/20 text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                                            <div>
                                                <div className="text-white font-bold text-sm">Answer its questions about your preferences</div>
                                                <div className="text-slate-400 text-xs">5 minutes</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="bg-orange-500/20 text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">4</div>
                                            <div>
                                                <div className="text-white font-bold text-sm">Ask it: "Show me what tomorrow's brief would look like"</div>
                                                <div className="text-slate-400 text-xs">3 minutes</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="bg-orange-500/20 text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">5</div>
                                            <div>
                                                <div className="text-white font-bold text-sm">Set a phone reminder for 6:30 AM: "Check Morning Agent"</div>
                                                <div className="text-slate-400 text-xs">2 minutes</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 bg-slate-900/80 p-4 rounded-xl border border-yellow-500/30">
                                        <div className="text-cyan-400 font-bold text-sm mb-2">TOMORROW:</div>
                                        <p className="text-slate-300 text-sm">
                                            Wake up → Open the conversation → Read the brief (3 min) → Start your day
                                        </p>
                                    </div>

                                    <div className="mt-4 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                                        <div className="text-white font-bold text-sm mb-2">What to expect:</div>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• First brief: 70% helpful</div>
                                            <div>• After 1 week of tweaks: 95% helpful</div>
                                            <div>• After 1 month: You'll wonder how you survived without it</div>
                                        </div>
                                    </div>
                                </div>
                            </Suspense>

                            <Suspense fallback={null}>
                                <TryThisNow
                                    challenge="Build Your First Morning Agent Tonight"
                                    estimatedTime="15 min"
                                    steps={[
                                        "Copy the Morning Brief Prompt from above",
                                        "Paste it into ChatGPT or Claude",
                                        "Replace [YOUR WAKE TIME] with your actual wake time",
                                        "Add or remove sections based on what you need",
                                        "Save it as 'Morning Agent' and run it tomorrow",
                                        "Adjust based on what was helpful or missing"
                                    ]}
                                />
                            </Suspense>

                            <Suspense fallback={null}>
                                <CaptainTip type="tip" title="Start Tonight">
                                    Set up your Morning Brief prompt tonight. Tomorrow morning, just read it instead of checking 6 different apps. One source of truth. Radical simplicity!
                                </CaptainTip>
                            </Suspense>

                            <div className="mt-12 p-6 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-xl border border-cyan-500/50">
                                <h4 className="text-cyan-400 font-bold mb-3">🚀 What's Next?</h4>
                                <p className="text-slate-300 text-sm mb-3">
                                    You just reclaimed your mornings (30 min/day saved).
                                </p>
                                <p className="text-white font-bold text-sm">
                                    Now let's tackle the next time-sink: <strong className="text-orange-400">Food chaos</strong>.
                                </p>
                                <p className="text-slate-400 text-xs mt-2">
                                    Chapter 5: The Kitchen Agent — How to never ask "What's for dinner?" again + Save $150-250/month on food panic
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 5: Kitchen and Grocery */}
                    <section id="chapter-5" className="py-16 px-6">
                        <div className="max-w-4xl mx-auto">
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="thinking"
                                    message="You just read about Lisa. $47 for mediocre Chinese food. Third time that week. $600/month on 'not having a plan.' Here's what most people don't realize: Food chaos ISN'T about cooking skills. It's about DECISION FATIGUE. By 5 PM, you've already made 200+ decisions today. Your brain is DONE. So when someone asks 'What's for dinner?' your exhausted brain screams 'Just order something!' $50 later, you feel guilty. Tomorrow, repeat. Your Kitchen Agent doesn't make you a chef. It removes the 30 daily micro-decisions around food BEFORE you're exhausted. Let's end the dinner dilemma."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 5: Kitchen and Grocery Automation</h2>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 mb-8">
                                    <h3 className="text-red-400 font-bold mb-3">The $47 Tuesday Night</h3>
                                    <p className="text-slate-300 text-sm mb-3">
                                        5:30 PM. Lisa stared at the empty fridge.
                                    </p>
                                    <p className="text-white font-bold text-sm mb-3">
                                        "What's for dinner?" her husband asked.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        She had NO idea. Chicken went bad yesterday. Grocery run was "tomorrow." Kids were melting down. She pulled out her phone.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Uber Eats: $47 for mediocre Chinese food.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        This was the THIRD time this week. She did the math in her head:<br />
                                        Monday: $52 (pizza)<br />
                                        Tuesday: $47 (Chinese)<br />
                                        Thursday: probably another $50
                                    </p>
                                    <p className="text-cyan-400 italic text-sm">
                                        "We're spending $600/month on not having a plan."
                                    </p>
                                </div>

                                {/* Quick Win Box */}
                                <Suspense fallback={<div />}>
                                    <CopyPrompt
                                        title="Weekly Meal Planning Prompt"
                                        prompt={`Based on these preferences, create a dinner plan for the next 5 weeknights:
- Adults: [NUMBER], Kids: [NUMBER]
- Dietary restrictions: [LIST ANY RESTRICTIONS]
- Cuisines we like: [Italian, Mexican, Asian, etc.]
- Max cooking time: 30 minutes on weeknights
- Budget: ~$20 per meal

For each meal, list the ingredients I'd need to buy.`}
                                        whatItDoes="Generates a complete 5-day dinner plan customized to your family's needs, preferences, and schedule. Includes shopping list so you can buy everything in one trip."
                                        howToCustomize="Adjust the number of meals (3-7 days), change budget per meal, add specific dietary needs (keto, vegetarian, gluten-free), specify favorite proteins or recipes, adjust cooking time based on your schedule."
                                        variables={[
                                            { name: "[NUMBER]", description: "How many adults and kids in your household" },
                                            { name: "[LIST ANY RESTRICTIONS]", description: "allergies, preferences, diet type - e.g., 'dairy-free, no shellfish'" },
                                            { name: "[Italian, Mexican, etc.]", description: "Your favorite cuisines to get variety in the plan" }
                                        ]}
                                    />
                                </Suspense>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Why "What's for Dinner?" Drains You</h3>

                                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 mb-6">
                                    <p className="text-slate-300 text-sm mb-3">
                                        <strong className="text-white">Research (Cornell, 2006):</strong> Average person makes <strong className="text-red-400">200+ food decisions per day</strong>.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-4">
                                        Not just what to eat. But:
                                    </p>

                                    <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30 mb-4">
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• Is there enough time to cook?</div>
                                            <div>• Do I have ingredients?</div>
                                            <div>• Will everyone eat it?</div>
                                            <div>• Is this healthy enough?</div>
                                            <div>• Can I afford delivery again?</div>
                                        </div>
                                    </div>

                                    <p className="text-white font-bold text-sm mb-2">
                                        By 5 PM: Worked 8 hours. Made 150 decisions. Dealt with stress.
                                    </p>
                                    <p className="text-red-400 text-sm mb-3">
                                        Your prefrontal cortex (decision-making brain) is DEPLETED.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-4">
                                        Someone asks: "What's for dinner?"
                                    </p>

                                    <div className="bg-slate-800/50 p-3 rounded text-xs text-slate-300 space-y-1 mb-4">
                                        <div>Your exhausted brain scans options:</div>
                                        <div className="pl-3">1. Cook (requires energy you don't have)</div>
                                        <div className="pl-3">2. Order delivery (easy, but expensive, guilt later)</div>
                                        <div className="pl-3">3. Figure it out later (anxiety builds)</div>
                                    </div>

                                    <p className="text-red-400 font-bold text-sm mb-3">
                                        You choose #2. $50. Repeat cycle.
                                    </p>

                                    <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-500/40">
                                        <div className="text-cyan-400 font-bold text-sm mb-2">Kitchen Agent breaks the cycle:</div>
                                        <p className="text-white text-sm mb-2">
                                            Decision made Sunday (when you're rested).
                                        </p>
                                        <p className="text-green-400 font-bold text-sm">
                                            5 PM becomes: "Check what's planned" (zero decisions).
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30 my-6">
                                    <h4 className="text-white font-bold mb-4">The Weekly Food Disaster</h4>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        <div><strong>MONDAY:</strong> 5:30 PM — "What's for dinner?" → Order Uber Eats. $47.</div>
                                        <div><strong>TUESDAY:</strong> 6:15 PM — Missing key ingredient → Emergency grocery run</div>
                                        <div><strong>WEDNESDAY:</strong> 5:16 PM — Chicken expired yesterday → Pizza delivery. $38.</div>
                                        <div><strong>FRIDAY:</strong> 5:00 PM — "Screw it, takeout" → $55</div>
                                        <div><strong>SATURDAY:</strong> $220 cart, forgot milk. 30% will spoil unused.</div>
                                        <div className="pt-3 border-t border-red-500/30 mt-3">
                                            <strong className="text-red-400">WEEKLY TOTAL:</strong> $320+ on food chaos
                                        </div>
                                    </div>
                                </div>

                                <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                                    <h4 className="text-yellow-400 font-bold mb-3">💬 Common Objections (And The Truth)</h4>

                                    <div className="space-y-4 text-sm">
                                        <div>
                                            <p className="text-white font-bold mb-2">"My family is SO picky. This won't work for us."</p>
                                            <p className="text-slate-300 mb-1">Actually, picky eaters are PERFECT for this.</p>
                                            <p className="text-slate-300 mb-2">Why? Because Kitchen Agent can store "never serve" lists.</p>
                                            <p className="text-cyan-400 text-xs">Martinez family had: "No mushrooms (daughter), no fish (dad), nothing 'green' (6-year-old)" — Agent works AROUND constraints.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"I don't like planning. This sounds like MORE work."</p>
                                            <p className="text-slate-300 mb-2">You're not planning. You're ANSWERING QUESTIONS.</p>
                                            <div className="bg-slate-900/50 p-3 rounded text-xs text-slate-300 space-y-1">
                                                <div>Agent: "Busy this week?"</div>
                                                <div>You: "Yeah, late meeting Tuesday."</div>
                                                <div className="pt-2">Agent: "Here's 5 dinners. $80 shopping list."</div>
                                            </div>
                                            <p className="text-green-400 text-xs mt-2">Total time: 10 minutes. Saves: 4 hours of decision paralysis.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"What about HelloFresh or similar meal kits?"</p>
                                            <p className="text-slate-300 text-xs mb-1">Meal kits: $10-12/serving = $60 for family of 4</p>
                                            <p className="text-green-400 text-xs mb-2">Kitchen Agent: $4-5/serving = $25 for family of 4</p>
                                            <p className="text-cyan-400 text-xs">Meal kits save decision time. Kitchen Agent saves decision time AND money. Plus: You build your own rotation of family favorites.</p>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Kitchen Agent Solution</h3>

                                <div className="grid md:grid-cols-2 gap-6 my-8">
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h4 className="text-cyan-400 font-bold mb-3">PLANNING</h4>
                                        <ul className="space-y-2 text-sm text-slate-300">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="text-cyan-400 flex-shrink-0 mt-1" size={16} />
                                                <span>Weekly meal plans based on your preferences</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="text-cyan-400 flex-shrink-0 mt-1" size={16} />
                                                <span>Adjusts for schedule (easy meals on busy nights)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="text-cyan-400 flex-shrink-0 mt-1" size={16} />
                                                <span>Balances nutrition without being annoying</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h4 className="text-green-400 font-bold mb-3">RESULTS</h4>
                                        <ul className="space-y-2 text-sm text-slate-300">
                                            <li className="flex items-start gap-2">
                                                <DollarSign className="text-green-400 flex-shrink-0 mt-1" size={16} />
                                                <span>$150-250/month savings</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Clock className="text-green-400 flex-shrink-0 mt-1" size={16} />
                                                <span>3-4 hours/week saved</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={16} />
                                                <span>90% less food waste</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={16} />
                                                <span>Zero "what's for dinner" stress</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Sample Meal Plan</h3>

                                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-6">
                                    <div className="text-cyan-400 font-bold mb-4">🍽️ MEAL PLAN — Week of March 18-24</div>
                                    <div className="space-y-4 text-sm text-slate-300">
                                        <div className="border-l-4 border-cyan-500 pl-4">
                                            <div className="text-white font-bold">MONDAY (Busy: soccer practice)</div>
                                            <div className="text-cyan-400">Sheet Pan Chicken Fajitas</div>
                                            <div className="text-slate-400">⏱️ 10 min prep / 25 min cook | Easy</div>
                                            <div className="text-slate-500 text-xs">Quick cleanup, feeds everyone</div>
                                        </div>
                                        <div className="border-l-4 border-purple-500 pl-4">
                                            <div className="text-white font-bold">TUESDAY (Normal evening)</div>
                                            <div className="text-purple-400">One-Pot Pasta Primavera</div>
                                            <div className="text-slate-400">⏱️ 10 min prep / 20 min cook | Easy</div>
                                            <div className="text-slate-500 text-xs">Uses veggies before they go bad</div>
                                        </div>
                                        <div className="border-l-4 border-green-500 pl-4">
                                            <div className="text-white font-bold">FRIDAY (Everyone's tired)</div>
                                            <div className="text-green-400">Homemade Pizza Night</div>
                                            <div className="text-slate-400">⏱️ 20 min prep / 15 min cook | Easy-Fun</div>
                                            <div className="text-slate-500 text-xs">Kids help make it, cheaper than delivery</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-700 text-green-400 font-bold">
                                        SHOPPING LIST: $142 estimated (under budget ✓)
                                    </div>
                                </div>

                                <div className="my-8 p-6 bg-purple-900/30 rounded-xl border border-purple-500/40">
                                    <h4 className="text-purple-400 font-bold mb-3">📅 When Plans Change (And They Always Do)</h4>
                                    <p className="text-slate-300 text-sm mb-3">
                                        <strong className="text-white">PLANNED for Wednesday:</strong> One-Pot Pasta Primavera
                                    </p>
                                    <div className="space-y-3 text-sm">
                                        <div className="bg-slate-900/50 p-3 rounded">
                                            <p className="text-slate-300 mb-2"><strong className="text-white">Tuesday night, 8 PM:</strong> Kid gets sick. Needs comfort food.</p>
                                            <p className="text-cyan-400 text-xs mb-2">You ask Kitchen Agent: "Swap Wednesday for soup. Use chicken I have."</p>
                                            <div className="bg-slate-800/70 p-2 rounded text-xs text-slate-300">
                                                <div>Agent responds: "Updated plan:</div>
                                                <div className="pl-3">• WED: Chicken Noodle Soup (what you have + egg noodles + carrots)</div>
                                                <div className="pl-3">• Shopping list updated: Remove pasta, add carrots"</div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-900/50 p-3 rounded">
                                            <p className="text-slate-300 mb-2"><strong className="text-white">Thursday morning:</strong> Unexpected work dinner</p>
                                            <p className="text-cyan-400 text-xs mb-2">You: "Skip Thursday. Need Friday lunch idea instead."</p>
                                            <div className="bg-slate-800/70 p-2 rounded text-xs text-slate-300">
                                                <div>Agent: "Lunch Friday: Leftover Wednesday soup + grilled cheese. Shopping list updated."</div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-green-400 font-bold text-sm mt-3">
                                        The plan isn't a prison. It's a FLEXIBLE FRAMEWORK.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                                    <h4 className="text-green-400 font-bold mb-3">📖 Lisa, 2 Months Later</h4>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        <p>Sunday, 6:45 PM. Lisa opens the Kitchen Agent conversation.</p>
                                        <p className="text-cyan-400">"This week: busy Tuesday (late meeting), Emma has play practice Thursday, normal Friday."</p>
                                        <p className="text-white">AI responds in 8 seconds:</p>
                                        <div className="bg-slate-900/50 p-3 rounded font-mono text-xs space-y-1">
                                            <div>• MONDAY: Sheet Pan Chicken Fajitas (10 min prep)</div>
                                            <div>• TUESDAY: Slow Cooker Chili (5 min morning, ready 6 PM)</div>
                                            <div>• WEDNESDAY: One-Pot Pasta Primavera (20 min)</div>
                                            <div>• THURSDAY: Grilled Cheese + Tomato Soup (Emma can help)</div>
                                            <div>• FRIDAY: Homemade Pizza Night (fun, under $15)</div>
                                            <div className="pt-2 border-t border-slate-700 text-green-400">Shopping list: $128 for all 5 dinners</div>
                                        </div>
                                        <p>She screenshots it. Sends to husband: "Groceries tomorrow?"</p>
                                        <p className="text-white italic mt-3">Tuesday, 5:47 PM. The meeting ran late. She's in traffic.</p>
                                        <p className="text-cyan-400">Text from husband: "Chili smells amazing. Made fresh lime crema like the AI suggested."</p>
                                        <p>She arrives home 6:22 PM. Dinner is plated. Kids are eating.</p>
                                        <p className="text-green-400 font-bold">Zero stress. Zero Uber Eats. Zero guilt.</p>
                                        <div className="mt-4 pt-3 border-t border-green-500/30">
                                            <p className="text-white text-xs mb-1">Month 2 spending: $210/week (including lunches)</p>
                                            <p className="text-slate-400 text-xs mb-1">Previous average: $460/week</p>
                                            <p className="text-green-400 font-bold">Monthly savings: $1,000 | Annual: $12,000</p>
                                            <p className="text-cyan-400 italic text-xs mt-2">"We're using it to pay off the credit card early."</p>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Martinez Family: 8-Week Deep Dive</h3>
                                <p className="text-slate-300 text-sm mb-4">
                                    Maria Martinez, 2 adults + 3 kids (ages 6, 9, 12), Phoenix, AZ
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                                        <h4 className="text-red-400 font-bold mb-3">BEFORE Kitchen Agent</h4>
                                        <div className="space-y-2 text-xs text-slate-300">
                                            <div><strong>Weekly spending:</strong> $460 average</div>
                                            <div className="pl-3">• Groceries: $220 (30% went bad)</div>
                                            <div className="pl-3">• Delivery/takeout: $240 (4-5x/week)</div>
                                            <div className="pt-2"><strong>Food waste:</strong> 35% thrown out</div>
                                            <div><strong>"What's for dinner?":</strong> Daily panic at 5:30 PM</div>
                                            <div><strong>Emergency runs:</strong> 3-4 per week</div>
                                            <div><strong>Time on food chaos:</strong> 6 hours/week</div>
                                        </div>
                                    </div>

                                    <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                                        <h4 className="text-green-400 font-bold mb-3">8-WEEK RESULTS</h4>
                                        <div className="space-y-2 text-xs text-slate-300">
                                            <div><strong>Weekly spending:</strong> $235 average</div>
                                            <div className="pl-3">• Groceries: $185 (planned, zero waste)</div>
                                            <div className="pl-3">• Delivery: $50 (Friday treat only)</div>
                                            <div className="pt-2"><strong>Food waste:</strong> 10% (mostly unavoidable)</div>
                                            <div><strong>"What's for dinner?":</strong> Zero (decided Sunday)</div>
                                            <div><strong>Emergency runs:</strong> 0-1 per month</div>
                                            <div><strong>Time on food:</strong> 1 hour/week</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 rounded-xl border border-cyan-500/50 mb-6">
                                    <div className="grid md:grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-green-400 font-bold text-3xl mb-1">$225/week</div>
                                            <div className="text-slate-400 text-xs">Weekly Savings</div>
                                        </div>
                                        <div>
                                            <div className="text-green-400 font-bold text-3xl mb-1">$900/month</div>
                                            <div className="text-slate-400 text-xs">Monthly Savings</div>
                                        </div>
                                        <div>
                                            <div className="text-green-400 font-bold text-3xl mb-1">$10,800/year</div>
                                            <div className="text-slate-400 text-xs">Annual Savings</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-cyan-500/30 text-center">
                                        <p className="text-white font-bold text-sm mb-2">WHERE THE SAVINGS WENT:</p>
                                        <p className="text-cyan-400 text-sm">$10,800/year = Credit card paid off in 18 months instead of 5 years</p>
                                        <p className="text-slate-300 italic text-sm mt-3">"We went from food chaos to food peace. The mental relief is worth more than the money." — Maria Martinez</p>
                                    </div>
                                </div>
                            </div>

                            <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                <FoodChaosCalculator />
                            </Suspense>

                            <div className="mt-12 p-6 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-xl border border-cyan-500/50">
                                <h4 className="text-cyan-400 font-bold mb-3">🚀 What's Next?</h4>
                                <p className="text-slate-300 text-sm mb-3">
                                    You've reclaimed:
                                </p>
                                <div className="space-y-1 text-sm text-slate-300 mb-4">
                                    <div>• <strong className="text-white">Mornings:</strong> 30 min/day (Chapter 4)</div>
                                    <div>• <strong className="text-white">Food:</strong> 3-4 hours/week + $200-900/month (Chapter 5)</div>
                                </div>
                                <p className="text-white font-bold text-sm mb-2">
                                    Now let's prevent the EXPENSIVE emergencies:
                                </p>
                                <p className="text-orange-400 font-bold">
                                    Chapter 6: The Household Agent
                                </p>
                                <p className="text-slate-400 text-xs mt-2">
                                    How to never pay $2,800 for a forgotten $15 filter again + The 5 reminders that prevent 80% of costly surprises
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 6: Household Management */}
                    <section id="chapter-6" className="py-16 px-6 bg-[#131320] border-y border-slate-800">
                        <div className="max-w-4xl mx-auto">
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="working"
                                    message="You just read about James. $2,800 for a forgotten $15 filter. Here's the brutal truth: Household maintenance isn't HARD. It's BORING. And boring things get forgotten. Your brain literally deprioritizes low-urgency tasks until they become high urgency (and expensive). You don't forget to eat. You don't forget to sleep. But HVAC filters? Car registration? Smoke detectors? Your brain files these under 'deal with later.' Then later becomes never. Then never becomes $2,800. Your Household Agent doesn't make you better at remembering. It remembers FOR you. Let's end the forgetting tax."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 6: Household Management and Maintenance</h2>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 mb-8">
                                    <h3 className="text-red-400 font-bold mb-3">The Saturday That Cost $2,800</h3>
                                    <p className="text-white font-bold text-sm mb-3">
                                        "Why is it so hot in here?"
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        James checked the thermostat. 78°F. AC was running full blast.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        When was the last time he changed the HVAC filter?
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        He couldn't remember. 3 months? 6 months? Maybe... longer?
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Called the repair guy. Diagnosis: "Dirty filter burned out the compressor."
                                    </p>
                                    <p className="text-red-400 font-bold text-lg mb-3">
                                        Repair cost: $2,800.
                                    </p>
                                    <p className="text-cyan-400 italic text-sm">
                                        "$2,800 for forgetting a $15 filter change. How many other things am I forgetting?"
                                    </p>
                                </div>

                                {/* Quick Win Box */}
                                <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 rounded-xl border border-cyan-500/50 my-8">
                                    <h3 className="text-xl font-bold text-cyan-400 mb-3">📌 Can't Read Everything? Do This Tonight (15 Minutes)</h3>
                                    <p className="text-white mb-4">The Essential 5 — Set these reminders right now:</p>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div>1. <strong>HVAC filter:</strong> Every 90 days (set recurring reminder)</div>
                                        <div>2. <strong>Smoke detector batteries:</strong> Every 6 months (Jan 1, July 1)</div>
                                        <div>3. <strong>Car registration:</strong> [Your renewal month] (30 days before)</div>
                                        <div>4. <strong>Water heater flush:</strong> Once per year (pick a date)</div>
                                        <div>5. <strong>Gutter cleaning:</strong> Twice per year (spring and fall)</div>
                                    </div>
                                    <p className="text-cyan-400 font-bold mt-4">Five reminders = most expensive emergencies prevented.</p>
                                </div>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Why You Forget (And Why That's Normal)</h3>

                                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 mb-6">
                                    <p className="text-slate-300 text-sm mb-3">
                                        <strong className="text-white">Research (Zeigarnik Effect, 1927):</strong> Your brain ONLY remembers <strong className="text-red-400">incomplete urgent tasks</strong>.
                                    </p>

                                    <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                                        <p className="text-white font-bold text-sm mb-2">HVAC filter change?</p>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• Not urgent (until it breaks)</div>
                                            <div>• Not visible (out of sight = out of mind)</div>
                                            <div>• Not immediately rewarding</div>
                                        </div>
                                    </div>

                                    <p className="text-white font-bold text-sm mb-2">Your brain's priority system:</p>
                                    <div className="bg-red-900/20 p-3 rounded text-xs text-slate-300 space-y-1 mb-4">
                                        <div>1. URGENT + IMPORTANT = Do now (kids crying, deadline today)</div>
                                        <div>2. NOT URGENT + IMPORTANT = <strong className="text-red-400">"I'll remember to do that"</strong> ← This is the trap</div>
                                        <div>3. URGENT + NOT IMPORTANT = Interruptions steal your attention</div>
                                    </div>

                                    <p className="text-slate-300 text-sm mb-3">
                                        Household maintenance lives in Category #2.
                                    </p>
                                    <p className="text-red-400 font-bold text-sm mb-4">
                                        Result: You INTEND to remember. You FAIL to remember. You PAY for forgetting.
                                    </p>

                                    <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-500/40">
                                        <div className="text-cyan-400 font-bold text-sm mb-2">Household Agent breaks the cycle:</div>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• Moves tasks from YOUR brain (unreliable for non-urgent) to AI brain (perfect memory)</div>
                                            <div>• Surfaces them when they become due (not when you randomly remember at 2 AM)</div>
                                            <div>• Tracks completion (so you're not guessing "did I do that already?")</div>
                                        </div>
                                        <p className="text-green-400 text-xs mt-2">
                                            Psychology term: <strong>Cognitive Offloading</strong> (letting external systems remember so your brain can focus on what matters)
                                        </p>
                                    </div>
                                </div>

                                <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                                    <h4 className="text-yellow-400 font-bold mb-3">💬 Common Objections (And The Truth)</h4>

                                    <div className="space-y-4 text-sm">
                                        <div>
                                            <p className="text-white font-bold mb-2">"I hate being nagged by reminders. This sounds annoying."</p>
                                            <p className="text-slate-300 mb-2">You're right to hate nagging. But Household Agent doesn't nag. It SURFACES.</p>
                                            <div className="bg-slate-900/50 p-3 rounded text-xs space-y-1">
                                                <div><strong className="text-red-400">Nagging:</strong> "Did you change the filter? Did you? Did you?" (daily pestering)</div>
                                                <div><strong className="text-green-400">Surfacing:</strong> "HVAC filter due this week" (once, when due, with context)</div>
                                            </div>
                                            <p className="text-cyan-400 text-xs mt-2">You check Sunday brief. You see what's due. You handle it or don't. No guilt. No repeated pings.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"What if I forget to check the agent?"</p>
                                            <p className="text-slate-300 text-xs mb-2">That's why it's part of your Weekly Household Brief (same conversation, Sunday evening).</p>
                                            <p className="text-green-400 text-xs">You're already asking: "What's for dinner this week?" (Kitchen Agent)<br />Add one question: "What's due around the house?" — Same conversation. Zero extra habit.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"There are 1,000 household things. Why only 5?"</p>
                                            <p className="text-slate-300 text-xs mb-1">The 80/20 rule.</p>
                                            <p className="text-cyan-400 font-bold text-sm mb-2">The Essential 5 prevent 80% of expensive emergencies.</p>
                                            <p className="text-slate-300 text-xs">Everything else (roof, chimney, landscaping) is either:<br />
                                                • Less frequent (every 5-10 years)<br />
                                                • Less catastrophic (won't cause $5K damage)<br />
                                                • More visible (you notice when grass needs cutting)</p>
                                            <p className="text-green-400 text-xs mt-2">We're targeting: High cost + High frequency + Low visibility = Forgetting Tax items.</p>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Forgetting Tax</h3>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 my-6">
                                    <h4 className="text-red-400 font-bold mb-3">The Real Cost: Cascade Failures</h4>
                                    <p className="text-slate-300 text-sm mb-3">
                                        <strong className="text-white">Sarah K., Portland, OR</strong>
                                    </p>

                                    <div className="bg-slate-900/50 p-4 rounded mb-3">
                                        <p className="text-white font-bold text-sm mb-2">The Forgotten Gutter</p>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>October: Gutters clogged (forgot fall cleaning)</div>
                                            <div className="pl-3">↓</div>
                                            <div>November: First rain → water overflow</div>
                                            <div className="pl-3">↓</div>
                                            <div>December: Water seeps into wall cavity</div>
                                            <div className="pl-3">↓</div>
                                            <div>January: Wall starts showing moisture stains</div>
                                            <div className="pl-3">↓</div>
                                            <div className="text-red-400">February: Discovers black mold behind drywall</div>
                                        </div>
                                    </div>

                                    <div className="bg-red-900/40 p-4 rounded">
                                        <div className="text-white font-bold text-sm mb-2">TOTAL DAMAGE:</div>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• Gutter cleaning (if done): <span className="text-green-400">$150</span></div>
                                            <div>• Water damage repair: <span className="text-red-400">$3,200</span></div>
                                            <div>• Mold remediation: <span className="text-red-400">$4,800</span></div>
                                            <div>• Lost work days (mold sensitivity): <span className="text-red-400">$1,600</span></div>
                                            <div className="border-t border-red-500/30 mt-2 pt-2">
                                                <strong className="text-red-400 text-lg">TOTAL: $9,600</strong>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-cyan-400 italic text-sm mt-3">
                                        FOR A $150 GUTTER CLEANING SHE FORGOT
                                    </p>
                                    <p className="text-white font-bold text-sm mt-2">
                                        This is the real forgetting tax. One missed task → cascade of expensive consequences.
                                    </p>
                                </div>

                                <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30 my-6">
                                    <h4 className="text-white font-bold mb-4">What Forgetting Costs You</h4>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div className="flex justify-between">
                                            <span>HVAC filter not changed</span>
                                            <span className="text-red-400 font-bold">→ $300+ repair bill</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Smoke detector batteries dead</span>
                                            <span className="text-red-400 font-bold">→ Safety risk</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Car registration lapsed</span>
                                            <span className="text-red-400 font-bold">→ $200 fine</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Water heater neglected</span>
                                            <span className="text-red-400 font-bold">→ $1,500 replacement</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Gutters clogged</span>
                                            <span className="text-red-400 font-bold">→ $5,000+ water damage</span>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Essential 5 Tracker</h3>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <EssentialFiveChecklist />
                                </Suspense>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Weekly Household Brief</h3>

                                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-sm text-slate-300 my-6">
                                    <div className="text-cyan-400 mb-4">📋 WEEKLY HOUSEHOLD BRIEF (Sunday evening)</div>

                                    <div className="mb-4">
                                        <div className="text-yellow-400 mb-2">THIS WEEK'S TASKS:</div>
                                        <div className="pl-4">- [ ] HVAC filter due in 5 days</div>
                                        <div className="pl-4">- [ ] Check: Running low on paper towels?</div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="text-purple-400 mb-2">💰 BILLS THIS WEEK:</div>
                                        <div className="pl-4">- Electric bill due Wed ($148 — normal range)</div>
                                        <div className="pl-4">- Water bill due Fri ($58 — auto-pay set)</div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="text-green-400 mb-2">⚠️ COMING UP (next 30 days):</div>
                                        <div className="pl-4">- Car registration due March 28</div>
                                        <div className="pl-4">- Smoke detector battery change April 1</div>
                                    </div>

                                    <div className="text-cyan-400 mb-2">✅ COMPLETED LAST WEEK:</div>
                                    <div className="pl-4">- Paid credit card ✓</div>
                                    <div className="pl-4">- Ordered supplies ✓</div>
                                </div>
                            </div>

                            <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                <HouseholdChaosCalculator />
                            </Suspense>

                        </Suspense>

                        <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                            <h4 className="text-green-400 font-bold mb-3">📖 James, 6 Months Later</h4>
                            <div className="space-y-3 text-sm text-slate-300">
                                <p>It's Saturday morning. James is drinking coffee when his phone buzzes.</p>
                                <p className="text-cyan-400">"Household Agent: HVAC filter change due this week. You ordered 6-pack on Amazon last time (2 left in garage)."</p>
                                <p>He walks to the garage. Finds the filters. Changes it. <strong className="text-white">8 minutes total.</strong></p>
                                <div className="bg-slate-900/50 p-3 rounded font-mono text-xs space-y-1">
                                    <div>Cost: $0 (already owned)</div>
                                    <div>Stress: 0/10</div>
                                    <div className="text-green-400">AC Health: Optimal</div>
                                </div>
                                <p>He texts: "Filter changed ✓"</p>
                                <p className="text-cyan-400">Agent responds: "Logged. Next due: June 15. Reminder set."</p>
                                <div className="mt-4 pt-3 border-t border-green-500/30">
                                    <p className="text-white font-bold text-sm mb-2">6-MONTH AVOIDED COSTS:</p>
                                    <div className="space-y-1 text-xs text-slate-300">
                                        <div>• AC repairs: $0 (vs. potential $2,800)</div>
                                        <div>• Car registration fine: $0 (reminder 30 days early)</div>
                                        <div>• Water heater: Flushed on schedule ($0 emergency call)</div>
                                        <div>• Smoke detectors: Batteries changed (kids safe)</div>
                                        <div>• Gutters: Cleaned twice (zero water damage)</div>
                                    </div>
                                    <p className="text-green-400 font-bold mt-2">Total Avoided: $3,200+ in preventable emergencies</p>
                                    <p className="text-cyan-400 text-xs">Annual run-rate: $6,400+ avoided costs</p>
                                    <p className="text-white italic text-sm mt-3">"I'm not spending less. I'm just not getting punished for forgetting anymore."</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Johnson Family: Reactive to Proactive</h3>
                        <p className="text-slate-300 text-sm mb-4">
                            Tom Johnson, homeowner, 2 kids, Seattle, WA
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                                <h4 className="text-red-400 font-bold mb-3">YEAR 1 (Before): The Forgetting Tax</h4>
                                <div className="space-y-2 text-xs text-slate-300">
                                    <div>• Jan: Forgot HVAC filter → July AC breakdown → <strong>$2,800</strong></div>
                                    <div>• Mar: Car registration lapsed → <strong>$175 fine</strong> + $50 late renewal</div>
                                    <div>• Jun: Water heater ignored → Emergency replacement <strong>$1,850</strong></div>
                                    <div>• Sep: Gutters clogged → Basement leak → <strong>$1,200</strong> water damage</div>
                                    <div className="pt-2 border-t border-red-500/30">
                                        <strong>ANNUAL COST: $6,075</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                                <h4 className="text-green-400 font-bold mb-3">YEAR 2 (With Agent): Zero Surprises</h4>
                                <div className="space-y-2 text-xs text-slate-300">
                                    <div><strong>Weekly Sunday Brief includes:</strong></div>
                                    <div className="pl-3">• This week: Nothing due</div>
                                    <div className="pl-3">• Next 30 days: Car reg Mar 28, Smoke detectors Apr 1</div>
                                    <div className="pl-3">• Completed: HVAC filter (Feb 15)</div>
                                    <div className="pt-2"><strong>Tom's routine:</strong></div>
                                    <div className="pl-3">Sunday 7 PM: "What's due?"</div>
                                    <div className="pl-3">Total time: 15-20 min/week</div>
                                    <div className="pt-2 border-t border-green-500/30">
                                        <strong>AVOIDED COSTS: $6,000+</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 rounded-xl border border-cyan-500/50 mb-6 text-center">
                            <p className="text-white font-bold text-sm mb-2">THE REAL MATH:</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-red-400 font-bold text-2xl">$6,075/year</div>
                                    <div className="text-slate-400 text-xs">Reactive (fixing what breaks)</div>
                                </div>
                                <div>
                                    <div className="text-green-400 font-bold text-2xl">$200/year</div>
                                    <div className="text-slate-400 text-xs">Proactive (preventive maintenance)</div>
                                </div>
                            </div>
                            <p className="text-slate-300 italic text-sm mt-4">"Before, I was spending thousands to fix things I broke by forgetting. Now I spend $200/year on preventive maintenance. $200 vs $6,000. That's the real math." — Tom Johnson</p>
                        </div>

                        <div className="mt-12 p-6 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-xl border border-cyan-500/50">
                            <h4 className="text-cyan-400 font-bold mb-3">🚀 What's Next?</h4>
                            <p className="text-slate-300 text-sm mb-3">
                                You've reclaimed:
                            </p>
                            <div className="space-y-1 text-sm text-slate-300 mb-4">
                                <div>• <strong className="text-white">Mornings:</strong> 30 min/day (Chapter 4)</div>
                                <div>• <strong className="text-white">Food:</strong> 3-4 hours/week + $900/month (Chapter 5)</div>
                                <div>• <strong className="text-white">Home:</strong> $3,500+/year in prevented emergencies (Chapter 6)</div>
                            </div>
                            <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30 mb-4">
                                <p className="text-cyan-400 font-bold text-lg">Total reclaimed: ~15 hours/week + $1,500+/month</p>
                            </div>
                            <p className="text-white font-bold text-sm mb-2">
                                Your PHYSICAL daily life is automated.
                            </p>
                            <p className="text-orange-400 font-bold">
                                Now let's tackle your DIGITAL life:
                            </p>
                            <p className="text-slate-400 text-xs mt-2">
                                Part 3: Email & Communication Automation — Inbox Zero without guilt, Meeting scheduling on autopilot, The "Gatekeeper Agent" that protects your time
                            </p>
                        </div>
                </div>
            </section>

            {/* Part 2 Complete */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="p-8 bg-gradient-to-r from-green-900/30 via-cyan-900/30 to-purple-900/30 rounded-2xl border-2 border-cyan-500/50">
                        <h3 className="text-3xl font-bold text-white mb-6 text-center">🎉 Part 2 Complete: You Just Bought 12 Hours/Week Back</h3>

                        <div className="bg-slate-900/80 p-6 rounded-xl border border-green-500/30 mb-6">
                            <h4 className="text-green-400 font-bold mb-4">✅ What You've Built:</h4>
                            <div className="space-y-3 text-sm text-slate-300">
                                <div className="flex items-start gap-3">
                                    <span className="text-green-400">✓</span>
                                    <div>
                                        <strong className="text-white">Morning Agent</strong> — Wake up to clarity instead of chaos
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-green-400">✓</span>
                                    <div>
                                        <strong className="text-white">Kitchen Agent</strong> — $150-250/month saved, zero "what's for dinner" stress
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-green-400">✓</span>
                                    <div>
                                        <strong className="text-white">Household Agent</strong> — $3,500/year in prevented emergencies
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/30">
                                <div className="text-red-400 font-bold mb-2">BEFORE Part 2:</div>
                                <div className="space-y-1 text-xs text-slate-300">
                                    <div>Mornings: 30-45 min chaos sprint</div>
                                    <div>Meals: $320/week on food panic</div>
                                    <div>Home: Forgetting tax costing thousands</div>
                                </div>
                            </div>
                            <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/30">
                                <div className="text-green-400 font-bold mb-2">AFTER Part 2:</div>
                                <div className="space-y-1 text-xs text-slate-300">
                                    <div>Mornings: Single 3-minute brief</div>
                                    <div>Meals: Planned, budgeted, executed</div>
                                    <div>Home: Proactive maintenance, zero surprises</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 rounded-xl border border-cyan-500/50 text-center mb-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-cyan-400 font-bold text-3xl mb-1">~12 hours/week</div>
                                    <div className="text-slate-400 text-sm">Total Time Reclaimed</div>
                                </div>
                                <div>
                                    <div className="text-green-400 font-bold text-3xl mb-1">$400-500/month</div>
                                    <div className="text-slate-400 text-sm">Total Money Saved</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 p-6 rounded-xl border border-yellow-500/40 mb-6">
                            <h4 className="text-yellow-400 font-bold mb-3">🚀 What's Next in Part 3:</h4>
                            <p className="text-slate-300 text-sm mb-3">
                                <strong className="text-cyan-400">Email & Communication Automation</strong> — Inbox zero, meeting scheduling, the "Gatekeeper Agent"
                            </p>
                            <p className="text-white font-bold text-center">
                                You've automated your PHYSICAL daily operations.<br />
                                Now let's automate your DIGITAL life.
                            </p>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => navigate('/part3')}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/30"
                            >
                                Continue to Part 3: Digital Life Automation
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Share */}
            <Suspense fallback={null}>
                <SocialShare
                    title="Just set up my first AI Agent for daily ops! The future of home management is here."
                    hashtags={["AgenticAI", "SmartHome", "AI"]}
                />
            </Suspense>
        </div>
            </PasswordGate >
        </WebbookLayout >
    );
};

export default Part2;
