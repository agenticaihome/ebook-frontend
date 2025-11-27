import React, { useState } from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import CaptainHero from '../components/CaptainHero';
import CaptainTip from '../components/CaptainTip';
import MorningChaosCalculator from '../components/MorningChaosCalculator';
import MorningBriefBuilder from '../components/MorningBriefBuilder';
import FoodChaosCalculator from '../components/FoodChaosCalculator';
import HouseholdChaosCalculator from '../components/HouseholdChaosCalculator';
import { motion } from 'framer-motion';
import { Coffee, UtensilsCrossed, Home, ArrowRight, CheckCircle, Clock, DollarSign } from 'lucide-react';

const Part2 = () => {
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
            <div className="min-h-screen bg-[#0f0f1a] text-white">
                {/* Hero Section */}
                <section className="relative pt-24 pb-16 px-6 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-0 left-10 w-64 h-64 bg-teal-900/20 rounded-full blur-3xl" />
                    </div>

                    <div className="max-w-4xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <div className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">Part 2</div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Daily Operations: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Morning, Kitchen, Household</span>
                            </h1>
                            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                                Build your first agents to automate mornings, meals, and home maintenance. Start saving time and money today.
                            </p>
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
                        <CaptainHero
                            size="md"
                            message="Rise and shine! Or... is it more like 'stumble out of bed in a panic'? Here's the thing about mornings: they set the tone for your ENTIRE day. Start chaotic, stay chaotic. But mornings are also PERFECT for your first agent because they're repetitive, low-stakes, and results are immediate. Tonight, you're going to set up ONE simple thing. Tomorrow morning, you'll feel the difference. Let's build your Morning Agent!"
                        />

                        <div className="mt-12 prose prose-invert prose-lg max-w-none">
                            <h2 className="text-4xl font-bold text-white mb-6">Chapter 4: Morning Routines That Run Themselves</h2>

                            {/* Quick Win Box */}
                            <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 rounded-xl border border-cyan-500/50 my-8">
                                <h3 className="text-xl font-bold text-cyan-400 mb-3">📌 Can't Read Everything? Do This Tonight (10 Minutes)</h3>
                                <p className="text-white mb-4">Tell your AI (Claude, ChatGPT, etc.):</p>
                                <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                                    "Every morning at [your wake time], I want a brief with:<br />
                                    1. Weather today (high/low, what to wear)<br />
                                    2. My calendar overview<br />
                                    3. One priority to focus on today<br /><br />
                                    Keep it under 3 minutes to read."
                                </div>
                                <p className="text-cyan-400 font-bold">Save as a custom instruction or prompt. Run it tomorrow morning. THAT'S IT. You've started.</p>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Why Start With Mornings?</h3>
                            <p className="text-slate-300 leading-relaxed">
                                The average person makes 35,000 decisions per day. Hundreds happen before 9 AM.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 my-8">
                                <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                                    <h4 className="text-white font-bold mb-3">A Typical Chaotic Morning</h4>
                                    <div className="space-y-2 text-sm text-slate-300 font-mono">
                                        <div>6:30 — Alarm. Snooze.</div>
                                        <div>6:39 — Alarm. Snooze.</div>
                                        <div>6:48 — PANIC. Jump up.</div>
                                        <div>6:50 — Check phone. 23 emails.</div>
                                        <div>7:20 — What to wear? Check weather.</div>
                                        <div>7:30 — What's for breakfast?</div>
                                        <div>7:55 — Where are my keys?</div>
                                        <div>8:45 — Arrive stressed. Day starts behind.</div>
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

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Morning Brief Template</h3>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Here's what a great Morning Brief looks like:
                            </p>

                            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-sm text-slate-300 my-6">
                                <div className="text-cyan-400 mb-4">════════════════════════════════════</div>
                                <div className="text-white font-bold mb-2">☀️ MORNING BRIEF — Tuesday, March 18</div>
                                <div className="text-cyan-400 mb-4">════════════════════════════════════</div>

                                <div className="mb-4">
                                    <div className="text-yellow-400 mb-1">🌤️ WEATHER: 68°F → 74°F, partly cloudy</div>
                                    <div className="pl-4">Wear: Light layers, no umbrella needed</div>
                                </div>

                                <div className="mb-4">
                                    <div className="text-purple-400 mb-1">📅 TODAY (4 events):</div>
                                    <div className="pl-4">• 9:00 AM — Team standup (30 min)</div>
                                    <div className="pl-4">• 11:30 AM — Client call: Johnson project</div>
                                    <div className="pl-6 text-cyan-400">→ PREP: Review proposal draft before</div>
                                    <div className="pl-4">• 2:00 PM — Dentist appointment</div>
                                    <div className="pl-6 text-cyan-400">→ Leave office by 1:30</div>
                                </div>

                                <div className="mb-4">
                                    <div className="text-green-400 mb-1">🎯 TODAY'S PRIORITY:</div>
                                    <div className="pl-4">Finalize Johnson proposal before client call.</div>
                                    <div className="pl-4">Block 10-11:30 for focus.</div>
                                </div>

                                <div className="text-cyan-400">════════════════════════════════════</div>
                                <div className="mt-2 text-slate-500 text-xs">Time to read: 2 minutes | Decisions made for you: 5+</div>
                            </div>
                        </div>

                        <MorningChaosCalculator />
                        <MorningBriefBuilder />

                        <CaptainTip type="tip" title="Start Tonight">
                            Set up your Morning Brief prompt tonight. Tomorrow morning, just read it instead of checking 6 different apps. One source of truth. Radical simplicity!
                        </CaptainTip>
                    </div>
                </section>

                {/* Chapter 5: Kitchen and Grocery */}
                <section id="chapter-5" className="py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        <CaptainHero
                            size="md"
                            message="Pop quiz: How many hours per week do you spend on food? Thinking about food. Planning food. Shopping for food. Preparing food. Arguing about food. For most families, it's 10-15 hours. And most of that mental energy is wasted on the SAME questions every week: 'What should we have for dinner?' 'Do we have any chicken?' 'Who's going to the store?' Your Kitchen Agent handles the boring stuff so you can enjoy the eating stuff. Let's end the dinner dilemma!"
                        />

                        <div className="mt-12 prose prose-invert prose-lg max-w-none">
                            <h2 className="text-4xl font-bold text-white mb-6">Chapter 5: Kitchen and Grocery Automation</h2>

                            {/* Quick Win Box */}
                            <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 rounded-xl border border-cyan-500/50 my-8">
                                <h3 className="text-xl font-bold text-cyan-400 mb-3">📌 Can't Read Everything? Do This Tonight (15 Minutes)</h3>
                                <p className="text-white mb-4">Tell your AI:</p>
                                <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                                    "Based on these preferences, create a dinner plan for the next 5 weeknights:<br />
                                    - Adults: 2, Kids: [X]<br />
                                    - Dietary restrictions: [any]<br />
                                    - Cuisines we like: [Italian, Mexican, etc.]<br />
                                    - Max cooking time: 30 minutes on weeknights<br />
                                    - Budget: ~$20 per meal<br /><br />
                                    For each meal, list the ingredients I'd need to buy."
                                </div>
                                <p className="text-cyan-400 font-bold">Screenshot the result. Shop once. Eat for a week.</p>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Food Problem</h3>

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
                        </div>

                        <FoodChaosCalculator />

                        <CaptainTip type="pro" title="The Martinez Family Results">
                            After 8 weeks with Kitchen Agent: Spending dropped from $460/week to $235/week. That's $900/month saved. Food waste down from 35% to 10%. Time spent on food chaos: from 6 hours to 1 hour per week. The system works!
                        </CaptainTip>
                    </div>
                </section>

                {/* Chapter 6: Household Management */}
                <section id="chapter-6" className="py-16 px-6 bg-[#131320] border-y border-slate-800">
                    <div className="max-w-4xl mx-auto">
                        <CaptainHero
                            size="md"
                            message="Quick question: When was the last time you changed your HVAC filter? What about your car oil? Checked your smoke detector batteries? I'm not trying to make you feel bad. I'm making a point: household maintenance is BORING, and boring things get forgotten. Until they become EXPENSIVE. The good news? Boring and repetitive is where AI SHINES. Your Household Agent handles the stuff you'd forget anyway — before it becomes a crisis."
                        />

                        <div className="mt-12 prose prose-invert prose-lg max-w-none">
                            <h2 className="text-4xl font-bold text-white mb-6">Chapter 6: Household Management and Maintenance</h2>

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

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Forgetting Tax</h3>

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

                            <div className="grid md:grid-cols-2 gap-4 my-8">
                                {[
                                    { name: 'HVAC Filter', freq: 'Every 90 days', icon: '🌡️' },
                                    { name: 'Smoke Detectors', freq: 'Every 6 months', icon: '🔥' },
                                    { name: 'Car Registration', freq: 'Annually', icon: '🚗' },
                                    { name: 'Water Heater', freq: 'Annually', icon: '💧' },
                                    { name: 'Gutters', freq: 'Twice yearly', icon: '🏠' }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">{item.icon}</span>
                                            <div>
                                                <div className="text-white font-bold">{item.name}</div>
                                                <div className="text-cyan-400 text-sm">{item.freq}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

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

                        <HouseholdChaosCalculator />

                        <CaptainTip type="warning" title="The Johnson Family Story">
                            BEFORE: Forgotten HVAC filter → $2,800 AC repair. Missed car registration → $175 fine. Annual cost of forgetting: ~$3,500+. AFTER (6 months with Household Agent): Zero emergency repairs. Zero late fees. All maintenance on schedule. Annual savings: ~$3,500+ avoided costs.
                        </CaptainTip>
                    </div>
                </section>

                {/* Part 2 Complete */}
                <section className="py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="p-8 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-2xl border border-cyan-500/50 text-center">
                            <h3 className="text-3xl font-bold text-white mb-4">Part 2 Complete! 🎉</h3>
                            <p className="text-slate-300 mb-6">
                                You now have agents for your mornings, kitchen, and household. You're saving hours every week and hundreds of dollars every month. Ready for Part 3?
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-slate-900/50 p-4 rounded-xl">
                                    <div className="text-cyan-400 font-bold text-2xl">30 min</div>
                                    <div className="text-slate-400 text-sm">saved daily</div>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-xl">
                                    <div className="text-green-400 font-bold text-2xl">$300+</div>
                                    <div className="text-slate-400 text-sm">saved monthly</div>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-xl">
                                    <div className="text-purple-400 font-bold text-2xl">3 Agents</div>
                                    <div className="text-slate-400 text-sm">working for you</div>
                                </div>
                            </div>
                            <button
                                onClick={() => window.location.href = '/part3'}
                                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-bold transition-all"
                            >
                                Continue to Part 3: Digital Life Automation
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </WebbookLayout>
    );
};

export default Part2;
