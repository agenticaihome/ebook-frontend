import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WebbookLayout from '../components/layout/WebbookLayout';
import PasswordGate from '../components/common/PasswordGate';
import CaptainHero from '../components/CaptainHero';
import CaptainTip from '../components/CaptainTip';
import EmailChaosCalculator from '../components/EmailChaosCalculator';
import CalendarHealthScore from '../components/CalendarHealthScore';
import SubscriptionAuditTool from '../components/SubscriptionAuditTool';
import FinancialHealthScore from '../components/FinancialHealthScore';
import { motion } from 'framer-motion';
import { Mail, Calendar, DollarSign, ArrowRight, CheckCircle, Clock, Shield, AlertTriangle } from 'lucide-react';

const Part3 = () => {
    const navigate = useNavigate();
    const [activeChapter, setActiveChapter] = useState(7);

    const chapters = [
        { id: 7, title: 'Email & Communication', icon: Mail },
        { id: 8, title: 'Calendar Intelligence', icon: Calendar },
        { id: 9, title: 'Personal Finance', icon: DollarSign }
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
            <PasswordGate partName="Part 3">
                <div className="min-h-screen bg-[#0f0f1a] text-white">
                    {/* Hero Section */}
                    <section className="relative pt-24 pb-16 px-6 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute top-20 right-10 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute bottom-0 left-10 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl" />
                        </div>

                        <div className="max-w-4xl mx-auto relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-12"
                            >
                                <div className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">Part 3</div>
                                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                    Digital Life: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Email, Calendar, Finance</span>
                                </h1>
                                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                                    Take back your time, attention, and money. Build agents to manage your digital chaos.
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

                    {/* Chapter 7: Email */}
                    <section id="chapter-7" className="py-16 px-6 bg-[#131320] border-y border-slate-800">
                        <div className="max-w-4xl mx-auto">
                            <CaptainHero
                                size="md"
                                pose="working"
                                message="HELP! I'm drowning in— wait, these aren't even my emails! The average professional receives 121 emails per day. That's 44,000 per year. Most are garbage. Some are important. A few are URGENT. Your job isn't to read all of them. Your job is to find the ones that matter and handle them fast. Let's build your Email Agent!"
                            />

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 7: Email and Communication Management</h2>

                                {/* Quick Win Box */}
                                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-6 rounded-xl border border-blue-500/50 my-8">
                                    <h3 className="text-xl font-bold text-cyan-400 mb-3">📌 Quick Win: The Triage Prompt</h3>
                                    <p className="text-white mb-4">Copy this prompt to your AI right now:</p>
                                    <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                                        "When I paste a batch of emails, categorize them:<br />
                                        🔴 ACTION REQUIRED (Needs response &lt; 24h)<br />
                                        🟡 WAITING ON (I'm expecting something)<br />
                                        🟢 FYI (Informational, summarize in 1 sentence)<br />
                                        🗑️ NOISE (Safe to archive)<br /><br />
                                        For ACTION items, draft a 1-sentence response plan."
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Email Problem</h3>
                                <div className="grid md:grid-cols-2 gap-6 my-8">
                                    <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                                        <h4 className="text-white font-bold mb-3">The Daily Grind</h4>
                                        <ul className="space-y-2 text-sm text-slate-300">
                                            <li>• Wake up to 40+ new messages</li>
                                            <li>• Scan subjects for urgent items</li>
                                            <li>• Get distracted by newsletters</li>
                                            <li>• Spend 20 mins on one reply</li>
                                            <li>• <strong>Cost:</strong> 2.5 hours/day</li>
                                        </ul>
                                    </div>
                                    <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                                        <h4 className="text-white font-bold mb-3">With Email Agent</h4>
                                        <ul className="space-y-2 text-sm text-slate-300">
                                            <li>• Morning brief summarizes inbox</li>
                                            <li>• Newsletters auto-filtered</li>
                                            <li>• Drafts ready for review</li>
                                            <li>• Follow-ups tracked automatically</li>
                                            <li>• <strong>Cost:</strong> 45 mins/day</li>
                                        </ul>
                                    </div>
                                </div>

                                <EmailChaosCalculator />

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The 5-Bucket System</h3>
                                <p className="text-slate-300 mb-4">Before automation, you need structure. Every email fits into one of these:</p>

                                <div className="space-y-3">
                                    {[
                                        { icon: '🔴', title: 'ACTION REQUIRED', desc: 'Needs your decision or work' },
                                        { icon: '🟡', title: 'WAITING ON', desc: 'Track for follow-up' },
                                        { icon: '🟢', title: 'FYI', desc: 'Read once, no action' },
                                        { icon: '📁', title: 'REFERENCE', desc: 'File for later search' },
                                        { icon: '🗑️', title: 'NOISE', desc: 'Delete/Archive immediately' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                            <span className="text-2xl">{item.icon}</span>
                                            <div>
                                                <div className="font-bold text-white">{item.title}</div>
                                                <div className="text-sm text-slate-400">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <CaptainTip type="tip" title="Unsubscribe Ruthlessly">
                                    Every newsletter you don't read costs you time EVERY DAY. If you haven't opened it in a month, unsubscribe. Your agent can help identify these!
                                </CaptainTip>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 8: Calendar */}
                    <section id="chapter-8" className="py-16 px-6">
                        <div className="max-w-4xl mx-auto">
                            <CaptainHero
                                size="md"
                                pose="pointing"
                                message="Let me guess: You've got back-to-back meetings, no time to actually DO the work, and somehow you're still behind. Meetings aren't work. They're talking about work. Your Calendar Agent doesn't just manage your schedule — it PROTECTS your time. Let's take back your calendar!"
                            />

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 8: Calendar Intelligence</h2>

                                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8">
                                    <h3 className="text-xl font-bold text-cyan-400 mb-4">The Time Architecture Framework</h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 font-bold">1</div>
                                            <div>
                                                <h4 className="text-white font-bold">Non-Negotiables</h4>
                                                <p className="text-sm text-slate-400">Sleep, Family Dinner, Exercise. Protect these at all costs.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">2</div>
                                            <div>
                                                <h4 className="text-white font-bold">Deep Work</h4>
                                                <p className="text-sm text-slate-400">2-hour blocks for your hardest work. No meetings allowed.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 font-bold">3</div>
                                            <div>
                                                <h4 className="text-white font-bold">Collaboration</h4>
                                                <p className="text-sm text-slate-400">Batched meeting windows. Tuesday/Thursday afternoons.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <CalendarHealthScore />

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Meeting Optimization Agent</h3>
                                <p className="text-slate-300 mb-4">Train your agent to handle invites:</p>

                                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 font-mono text-sm text-slate-300">
                                    <div className="text-purple-400 mb-2">AUTO-DECLINE IF:</div>
                                    <ul className="list-disc pl-4 space-y-1 mb-4">
                                        <li>No agenda provided</li>
                                        <li>I'm marked "optional"</li>
                                        <li>Conflicts with Deep Work block</li>
                                    </ul>
                                    <div className="text-green-400 mb-2">AUTO-NEGOTIATE:</div>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>If &gt;60 mins → suggest 45 mins</li>
                                        <li>If travel needed → suggest video</li>
                                        <li>If 3rd meeting in a row → suggest async</li>
                                    </ul>
                                </div>

                                <CaptainTip type="pro" title="The Buffer Rule">
                                    Always add a 15-minute buffer after any meeting longer than 30 minutes. Use this for bio breaks and processing notes. Your agent can enforce this automatically!
                                </CaptainTip>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 9: Finance */}
                    <section id="chapter-9" className="py-16 px-6 bg-[#131320] border-y border-slate-800">
                        <div className="max-w-4xl mx-auto">
                            <CaptainHero
                                size="md"
                                pose="thinking"
                                message="Pop quiz: What did you spend on subscriptions last month? If you're like most people, you have NO IDEA. Money just... disappears. Your Finance Agent won't judge your spending. It will make it VISIBLE. Let's build your personal AI CFO!"
                            />

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 9: Personal Finance on Autopilot</h2>

                                <div className="grid md:grid-cols-2 gap-6 my-8">
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h4 className="text-cyan-400 font-bold mb-3">The Visibility Problem</h4>
                                        <p className="text-sm text-slate-300 mb-4">
                                            "Where did all our money go?" is the most common stressor. Small leaks sink great ships.
                                        </p>
                                        <div className="flex items-center gap-2 text-red-400 text-sm font-bold">
                                            <AlertTriangle size={16} />
                                            <span>Avg household wastes $300+/mo</span>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h4 className="text-green-400 font-bold mb-3">The Agent Solution</h4>
                                        <p className="text-sm text-slate-300 mb-4">
                                            Visibility without obsession. Weekly reports, anomaly alerts, and automated savings.
                                        </p>
                                        <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
                                            <CheckCircle size={16} />
                                            <span>Financial peace of mind</span>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Subscription Audit</h3>
                                <p className="text-slate-300 mb-6">The silent budget killer. Let's check yours right now.</p>

                                <SubscriptionAuditTool />

                                <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Financial Health Check</h3>
                                <p className="text-slate-300 mb-6">Where do you stand? Let's look at the big picture.</p>

                                <FinancialHealthScore />

                                <CaptainTip type="warning" title="The Smith Family Result">
                                    "We found $400/month in unused subscriptions and dining out we didn't enjoy. That's $4,800/year we put into our emergency fund instead. We didn't even feel the cut."
                                </CaptainTip>
                            </div>
                        </div>
                    </section>

                    {/* Part 3 Complete */}
                    <section className="py-16 px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="p-8 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-2xl border border-cyan-500/50 text-center">
                                <h3 className="text-3xl font-bold text-white mb-4">Part 3 Complete! 🚀</h3>
                                <p className="text-slate-300 mb-6">
                                    You've tamed the digital chaos. Your email is triaged, your calendar is protected, and your finances are visible.
                                </p>
                                <div className="grid md:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-slate-900/50 p-4 rounded-xl">
                                        <div className="text-cyan-400 font-bold text-2xl">Inbox Zero</div>
                                        <div className="text-slate-400 text-sm">is actually possible</div>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-xl">
                                        <div className="text-green-400 font-bold text-2xl">Deep Work</div>
                                        <div className="text-slate-400 text-sm">protected daily</div>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-xl">
                                        <div className="text-blue-400 font-bold text-2xl">Money</div>
                                        <div className="text-slate-400 text-sm">on autopilot</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/part4')}
                                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
                                >
                                    Continue to Part 4 <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </PasswordGate>
        </WebbookLayout>
    );
};

export default Part3;
