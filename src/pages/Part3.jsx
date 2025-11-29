import React, { useState, Suspense } from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import PurchaseGate from '../components/common/PurchaseGate';
import BackgroundEffects from '../components/common/BackgroundEffects';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Calendar, FileText, ArrowRight, Inbox, Clock, Shield, CheckCircle } from 'lucide-react';

const CaptainHero = React.lazy(() => import('../components/CaptainHero'));
const CaptainTip = React.lazy(() => import('../components/CaptainTip'));
const EmailChaosCalculator = React.lazy(() => import('../components/EmailChaosCalculator'));
const CalendarAuditTool = React.lazy(() => import('../components/CalendarAuditTool'));
const AdminDayPlanner = React.lazy(() => import('../components/AdminDayPlanner'));
const DigitalDetoxChallenge = React.lazy(() => import('../components/DigitalDetoxChallenge'));
const SocialShare = React.lazy(() => import('../components/tools/SocialShare'));

const Part3 = () => {
    const navigate = useNavigate();
    const [activeChapter, setActiveChapter] = useState(7);

    const chapters = [
        { id: 7, title: 'Email & Communications', icon: Mail },
        { id: 8, title: 'Calendar Defense', icon: Calendar },
        { id: 9, title: 'Admin & Paperwork', icon: FileText }
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
                        <BackgroundEffects blob1Color="bg-blue-900/30" blob2Color="bg-indigo-900/20" />

                        <div className="max-w-4xl mx-auto relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-12"
                            >
                                <div className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4">Part 3</div>
                                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                    Digital Operations: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Email, Calendar, Admin</span>
                                </h1>
                                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                                    Reclaim your attention. Build agents to filter noise, protect your time, and handle the paperwork.
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
                                                    ? 'border-blue-500 bg-blue-900/20'
                                                    : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                                                    }`}
                                            >
                                                <Icon className={activeChapter === chapter.id ? 'text-blue-400' : 'text-slate-500'} size={24} />
                                                <div className="mt-3 text-sm font-mono text-slate-400">Chapter {chapter.id}</div>
                                                <div className="font-bold text-white">{chapter.title}</div>
                                            </button>
                                        );
                                    })
                                }
                            </div >
                        </div >
                    </section >

                    {/* Chapter 7: Email */}
                    < section id="chapter-7" className="py-16 px-6 bg-[#131320] border-y border-slate-800" >
                        <div className="max-w-4xl mx-auto">
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="pointing"
                                    message="Your inbox is a to-do list created by OTHER people. If you don't defend it, you'll spend your life reacting to their demands. But here's the secret: 80% of email is noise. 15% is FYI. Only 5% actually needs YOU. Let's build a Gatekeeper Agent to handle the 95%."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 7: The Gatekeeper Agent (Email)</h2>

                                {/* Quick Win Box */}
                                <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border border-blue-500/50 my-8">
                                    <h3 className="text-xl font-bold text-blue-400 mb-3">📌 Quick Win: The 'Triage' Prompt</h3>
                                    <p className="text-white mb-4">Paste unread emails into your AI and ask:</p>
                                    <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                                        "Scan these emails. List ONLY the ones that require a reply from me today. For each, draft a 1-sentence response. Ignore newsletters, receipts, and FYIs."
                                    </div>
                                    <p className="text-blue-400 font-bold">Clear 50 emails in 2 minutes.</p>
                                </div>

                                <h3 className="text-2xl font-bold text-blue-400 mt-12 mb-4">The Inbox Zero Myth</h3>
                                <p className="text-slate-300 mb-4">
                                    Inbox Zero is a waste of time if you're just moving emails around. The goal is <strong>Inbox Irrelevant</strong>.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 my-8">
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h4 className="text-white font-bold mb-3">Manual Processing</h4>
                                        <ul className="space-y-2 text-sm text-slate-300">
                                            <li className="flex items-center gap-2"><Clock size={14} className="text-red-400" /> Read every subject line</li>
                                            <li className="flex items-center gap-2"><Clock size={14} className="text-red-400" /> Open spam/newsletters</li>
                                            <li className="flex items-center gap-2"><Clock size={14} className="text-red-400" /> Archive manually</li>
                                            <li className="flex items-center gap-2"><Clock size={14} className="text-red-400" /> Reply to everything</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h4 className="text-blue-400 font-bold mb-3">Agent Processing</h4>
                                        <ul className="space-y-2 text-sm text-slate-300">
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Filters noise automatically</li>
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Summarizes long threads</li>
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Drafts replies for review</li>
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Highlights urgent items</li>
                                        </ul>
                                    </div>
                                </div>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <EmailChaosCalculator />
                                </Suspense>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <DigitalDetoxChallenge />
                                </Suspense>

                                <Suspense fallback={null}>
                                    <CaptainTip type="pro" title="The 'VIP Only' Notification Rule">
                                        "Turn off ALL email notifications on your phone. Exception: Create a 'VIP' list (spouse, boss, key client). Only THEIR emails buzz your phone. Everything else waits for your designated email time."
                                    </CaptainTip>
                                </Suspense>
                            </div>
                        </div>
                    </section >

                    {/* Chapter 8: Calendar */}
                    < section id="chapter-8" className="py-16 px-6" >
                        <div className="max-w-4xl mx-auto">
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="working"
                                    message="Show me your calendar, and I'll show you your priorities. If it's full of 'Quick Syncs' and 'Touch Bases', your priority is... other people's comfort. We need to build a Fortress around your Deep Work time."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 8: The Calendar Defense Agent</h2>

                                <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/30 my-8">
                                    <h3 className="text-xl font-bold text-purple-400 mb-3">The Swiss Cheese Calendar</h3>
                                    <p className="text-white mb-4">You know those days where you have a meeting at 9:00, 10:30, 1:00, and 3:30?</p>
                                    <p className="text-slate-300 text-sm">
                                        You have "free time" in between, but it's useless. It's too short to start deep work, so you just answer emails. That's a Swiss Cheese day. It feels busy, but achieves nothing.
                                    </p>
                                </div>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <CalendarAuditTool />
                                </Suspense>

                                <h3 className="text-2xl font-bold text-purple-400 mt-12 mb-4">Ideal Week Architecture</h3>
                                <p className="text-slate-300 mb-4">Design your week BEFORE other people fill it.</p>

                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-green-500">
                                        <h4 className="font-bold text-white">Focus Blocks (Deep Work)</h4>
                                        <p className="text-sm text-slate-400">90-120 min blocks. No meetings. No slack. Pure output.</p>
                                    </div>
                                    <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-yellow-500">
                                        <h4 className="font-bold text-white">Admin Blocks (Shallow Work)</h4>
                                        <p className="text-sm text-slate-400">Batch all emails, calls, and quick tasks here. 30-60 min.</p>
                                    </div>
                                    <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-blue-500">
                                        <h4 className="font-bold text-white">Meeting Blocks</h4>
                                        <p className="text-sm text-slate-400">Back-to-back meetings. Get them all done in one afternoon.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >

                    {/* Chapter 9: Admin */}
                    < section id="chapter-9" className="py-16 px-6 bg-[#131320] border-y border-slate-800" >
                        <div className="max-w-4xl mx-auto">
                            <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                <CaptainHero
                                    size="md"
                                    pose="celebrating"
                                    message="Nobody likes paperwork. Not even accountants. (Okay, maybe some accountants). But for the rest of us, forms, bills, and scheduling are soul-sucking. Good news: Robots LOVE paperwork. They don't get bored. They don't make typos. Let's hand it over."
                                />
                            </Suspense>

                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 9: The Admin Agent</h2>

                                <div className="grid md:grid-cols-2 gap-6 my-8">
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h4 className="text-indigo-400 font-bold mb-3">The "Admin Day" Strategy</h4>
                                        <p className="text-sm text-slate-300">
                                            Instead of doing admin bits every day, batch them all into one "Power Hour" or half-day per week.
                                        </p>
                                    </div>
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                        <h4 className="text-indigo-400 font-bold mb-3">What to Outsource</h4>
                                        <ul className="space-y-1 text-sm text-slate-300">
                                            <li>• Scheduling appointments</li>
                                            <li>• Filling out forms</li>
                                            <li>• Paying bills</li>
                                            <li>• Organizing files</li>
                                        </ul>
                                    </div>
                                </div>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <AdminDayPlanner />
                                </Suspense>

                                <Suspense fallback={null}>
                                    <CaptainTip type="warning" title="Security Warning">
                                        "Never give an AI your actual banking passwords or social security number. Use it to DRAFT emails or ORGANIZE files, but you should be the one to hit 'Submit' on sensitive data."
                                    </CaptainTip>
                                </Suspense>

                                <div className="mt-12 p-8 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-2xl border border-blue-500/50 text-center">
                                    <h3 className="text-2xl font-bold text-white mb-4">Part 3 Complete! 🚀</h3>
                                    <p className="text-slate-300 mb-6">
                                        You've now automated your digital life. Your email, calendar, and admin tasks are under control. Next up: The Physical World.
                                    </p>
                                    <button
                                        onClick={() => navigate('/part4')}
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all"
                                    >
                                        Continue to Part 4: Physical World Agents
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section >
                    {/* Social Share */}
                    < Suspense fallback={null} >
                        <SocialShare
                            title="I'm building a 'Calendar Defense System' with AI. No more useless meetings!"
                            hashtags={["AgenticAI", "DeepWork", "Productivity"]}
                        />
                    </Suspense >
                </div >
            </PurchaseGate >
        </WebbookLayout >
    );
};

export default Part3;
