import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Bell, FolderOpen, Mail, CheckCircle, Sparkles } from 'lucide-react';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// INTRO - AI IN 2026
// What's changed and why this book matters now
// ============================================

const Intro = () => {
    return (
        <WebbookLayout>
            <Helmet>
                <title>Before You Begin: AI in 2026 | Agentic AI Home</title>
                <meta name="description" content="The AI landscape has changed. Here's what's possible now and how to make the most of this book." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-indigo-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* BADGE */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
                            <Sparkles className="text-indigo-400" size={16} />
                            <span className="text-slate-300 text-sm font-medium">Start Here • 3 min read • Free</span>
                        </div>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Before You Begin:<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI in 2026</span>
                        </h1>
                        <p className="text-slate-300 text-lg">
                            The landscape has changed. Here's what you need to know.
                        </p>
                    </motion.div>

                    {/* CAPTAIN */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24" />}>
                            <CaptainHero
                                size="md"
                                pose="thinking"
                                message="When this book was first written, AI assistants forgot you the moment you closed the app. That's not true anymore. Let me catch you up."
                            />
                        </Suspense>
                    </motion.div>

                    {/* WHAT'S CHANGED */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">What's Changed</h2>

                        {/* MEMORY */}
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 mb-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                                    <Brain className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-2">1. AI Remembers You</h3>
                                    <p className="text-slate-300 text-sm mb-3">
                                        <strong className="text-white">ChatGPT Memory</strong> stores your preferences across every conversation. Tell it once that you're vegetarian, have two kids, or prefer brief responses — it remembers forever.
                                    </p>
                                    <div className="bg-slate-900/50 rounded-lg p-3 text-sm">
                                        <p className="text-slate-400 mb-1">How to enable:</p>
                                        <p className="text-teal-400">Settings → Personalization → Memory → On</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TASKS */}
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 mb-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                    <Bell className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-2">2. AI Reaches Out to You</h3>
                                    <p className="text-slate-300 text-sm mb-3">
                                        <strong className="text-white">ChatGPT Tasks</strong> lets you schedule prompts that run automatically. You're not opening the app — it runs in the background and notifies you when done.
                                    </p>
                                    <div className="bg-slate-900/50 rounded-lg p-3 text-sm mb-3">
                                        <p className="text-slate-400 mb-2">Examples:</p>
                                        <ul className="text-slate-300 space-y-1">
                                            <li>• "Give me a news briefing every weekday at 5pm"</li>
                                            <li>• "Remind me about mom's birthday on March 13"</li>
                                            <li>• "Check my goals every Sunday night"</li>
                                        </ul>
                                    </div>
                                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm">
                                        <p className="text-amber-400">
                                            <strong>Requires:</strong> ChatGPT Plus or Pro ($20+/month) • Limit: 10 active tasks
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PROJECTS */}
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 mb-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                                    <FolderOpen className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-2">3. Persistent Workspaces Exist</h3>
                                    <p className="text-slate-300 text-sm mb-3">
                                        <strong className="text-white">Claude Projects</strong> gives you dedicated workspaces with custom instructions, uploaded documents, and conversation history that stays.
                                    </p>
                                    <p className="text-slate-300 text-sm">
                                        Create a "Meal Planning" project with your recipes. A "Work" project with your ongoing tasks. Each agent lives in its own space.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* GEMINI */}
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-2">4. AI Lives in Your Apps</h3>
                                    <p className="text-slate-300 text-sm mb-3">
                                        <strong className="text-white">Google Gemini</strong> is now built into Gmail, Docs, and Workspace with email summaries, draft assistance, and suggested replies — no copy-paste needed.
                                    </p>
                                    <p className="text-slate-400 text-sm italic">
                                        Some features available free for personal Gmail accounts.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* TWO MODES */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">How to Use This Book</h2>
                        <p className="text-slate-300 mb-6">
                            The agents in this book work in two modes. Start with what's comfortable.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-5 border border-slate-700/50">
                                <div className="text-2xl mb-2">🟢</div>
                                <h3 className="text-white font-bold mb-2">Mode 1: On-Demand</h3>
                                <p className="text-slate-400 text-sm mb-3">Copy the prompt, paste it when you need it. Simple and effective.</p>
                                <p className="text-slate-500 text-xs">Best for: Getting started, testing what works</p>
                            </div>

                            <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl p-5 border border-teal-500/30">
                                <div className="text-2xl mb-2">⚡</div>
                                <h3 className="text-white font-bold mb-2">Mode 2: Always-On</h3>
                                <p className="text-slate-300 text-sm mb-3">Set up ChatGPT Tasks or Clawdbot for automation that runs without you.</p>
                                <p className="text-teal-400 text-xs">Best for: Power users ready to automate</p>
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm mt-4 text-center">
                            Each chapter includes a "Make It Stick" box showing how to automate that agent.
                        </p>
                    </motion.section>

                    {/* CHECKLIST */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-10"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Quick Setup Checklist</h2>

                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
                            <div className="space-y-3">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-slate-600 group-hover:border-teal-500 flex items-center justify-center mt-0.5">
                                        <CheckCircle className="text-teal-500 opacity-0 group-hover:opacity-50" size={14} />
                                    </div>
                                    <div>
                                        <span className="text-white">ChatGPT account</span>
                                        <span className="text-slate-400 text-sm ml-2">(Plus recommended, $20/month)</span>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-slate-600 group-hover:border-teal-500 flex items-center justify-center mt-0.5">
                                        <CheckCircle className="text-teal-500 opacity-0 group-hover:opacity-50" size={14} />
                                    </div>
                                    <div>
                                        <span className="text-white">Enable Memory</span>
                                        <span className="text-slate-400 text-sm ml-2">Settings → Personalization → On</span>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-slate-600 group-hover:border-teal-500 flex items-center justify-center mt-0.5">
                                        <CheckCircle className="text-teal-500 opacity-0 group-hover:opacity-50" size={14} />
                                    </div>
                                    <div>
                                        <span className="text-white">Enable notifications</span>
                                        <span className="text-slate-400 text-sm ml-2">So Tasks can reach you</span>
                                    </div>
                                </label>

                                <div className="border-t border-slate-700 pt-3 mt-3">
                                    <p className="text-slate-500 text-sm mb-2">Optional:</p>
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="w-5 h-5 rounded border border-slate-600 group-hover:border-slate-500 flex items-center justify-center mt-0.5" />
                                        <span className="text-slate-400">Claude account for Projects feature</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer group mt-2">
                                        <div className="w-5 h-5 rounded border border-slate-600 group-hover:border-slate-500 flex items-center justify-center mt-0.5" />
                                        <span className="text-slate-400">Google Workspace for Gemini features</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* CTA */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-2xl p-6 border border-teal-500/30 text-center mb-6">
                            <p className="text-white font-medium mb-2">You're ready.</p>
                            <p className="text-slate-300 text-sm">Let's build your first agent.</p>
                        </div>

                        <Link
                            to="/part1/chapter1"
                            className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Start Chapter 1
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Intro;
