import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WebbookLayout from '../components/layout/WebbookLayout';
import PurchaseGate from '../components/common/PurchaseGate';
import CaptainHero from '../components/CaptainHero';
import CaptainTip from '../components/CaptainTip';
import SleepProtocolConfig from '../components/SleepProtocolConfig';
import MentalLoadAssessment from '../components/MentalLoadAssessment';
import KnowledgeChaosAssessment from '../components/KnowledgeChaosAssessment';
import StudySystemGenerator from '../components/StudySystemGenerator';
import SocialShare from '../components/tools/SocialShare';
import { motion } from 'framer-motion';
import { Activity, Brain, BookOpen, ArrowRight, Heart, Moon, Database, Coffee } from 'lucide-react';

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
            <PurchaseGate>
                <div className="min-h-screen bg-[#0f0f1a] text-white">
                    {/* Hero Section */}
                    <section className="relative pt-24 pb-16 px-6 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute top-20 right-10 w-96 h-96 bg-green-900/30 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute bottom-0 left-10 w-64 h-64 bg-cyan-900/20 rounded-full blur-3xl" />
                        </div>

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
                                                ? 'border-green-500 bg-green-900/20'
                                                : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                                                }`}
                                        >
                                            <Icon className={activeChapter === chapter.id ? 'text-green-400' : 'text-slate-500'} size={24} />
                                            <div className="mt-3 text-sm font-mono text-slate-400">Chapter {chapter.id}</div>
                                            <div className="font-bold text-white">{chapter.title}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Chapter 10: Health & Recovery */}
                    <section id="chapter-10" className="py-16 px-6 bg-[#131320] border-y border-slate-800">
                        <div className="max-w-4xl mx-auto">
                            <CaptainHero
                                size="md"
                                pose="thinking"
                                message="Real talk: Most productivity systems assume you got 8 hours of perfect sleep. *laughs in parent of toddlers* You know what happens when you follow a rigid schedule on 4 hours of broken sleep? You fail. Your Recovery-Aware Agent doesn't just track your health — it ADAPTS your entire day based on your actual capacity."
                            />

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 10: The Recovery-Aware Agent</h2>

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

                                <SleepProtocolConfig />

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

                                <CaptainTip type="pro" title="DDS (Dad Deploying Systems)'s Residency Hack">
                                    "During residency with a newborn, I used 'Red Day' protocols constantly. Instead of studying at 5 AM (when I was a zombie), my agent moved study blocks to lunch when I was awake. I passed boards because I stopped fighting my biology."
                                </CaptainTip>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 11: Mental Wellbeing */}
                    <section id="chapter-11" className="py-16 px-6">
                        <div className="max-w-4xl mx-auto">
                            <CaptainHero
                                size="md"
                                pose="working"
                                message="I'm a productivity robot, not a therapist. If you're struggling, please talk to a professional. But I CAN help with the 'Mental Load'—the invisible work of tracking everything. Less cognitive chaos = more mental peace."
                            />

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 11: Mental Health & Wellbeing Support</h2>

                                <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30 my-8">
                                    <h3 className="text-xl font-bold text-blue-400 mb-3">The Invisible Burden</h3>
                                    <p className="text-white mb-4">"Did I pay that bill? What's for dinner? Did I sign the permission slip?"</p>
                                    <p className="text-slate-300 text-sm">
                                        The stress of tracking everything makes you worse at tracking everything. Your Wellbeing Agent's job is to offload this burden so your brain can actually relax.
                                    </p>
                                </div>

                                <MentalLoadAssessment />

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

                                <CaptainTip type="tip" title="The Brain Dump">
                                    Before bed, write down every open loop or worry. Tell your agent: "Remind me of these tomorrow at 9 AM." Your brain can't let go if it thinks it needs to remember.
                                </CaptainTip>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 12: Second Brain */}
                    <section id="chapter-12" className="py-16 px-6 bg-[#131320] border-y border-slate-800">
                        <div className="max-w-4xl mx-auto">
                            <CaptainHero
                                size="md"
                                pose="pointing"
                                message="Where is that article you read last month? The one with the great insight? Your brain is amazing at creativity but terrible at storage. Let's build a Second Brain that remembers everything for you."
                            />

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

                                <KnowledgeChaosAssessment />

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Study System (Board Prep Example)</h3>
                                <p className="text-slate-300 mb-6">
                                    For professionals in training (medical, legal, technical), this is a superpower. Turn PDFs into an active learning engine.
                                </p>

                                <StudySystemGenerator />

                                <CaptainTip type="pro" title="Active Recall Agent">
                                    "Don't just re-read notes. Ask your agent: 'Quiz me on the weak areas from yesterday's reading.' It will generate fresh questions every time. That's how you make knowledge stick."
                                </CaptainTip>
                            </div>
                        </div>
                    </section>

                    {/* Part 4 Complete */}
                    <section className="py-16 px-6">
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
                    </section>

                    {/* Social Share */}
                    <SocialShare
                        title="Using AI to optimize my health and sleep. The data doesn't lie!"
                        hashtags={["AgenticAI", "Biohacking", "HealthTech"]}
                    />
                </div>
            </PurchaseGate>
        </WebbookLayout>
    );
};

export default Part4;
