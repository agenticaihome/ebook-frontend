import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../../components/layout/WebbookLayout';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Briefcase, Clock, DollarSign, Users, TrendingUp, Zap, Target, AlertTriangle, Building2, Bot } from 'lucide-react';

// ============================================
// BUSINESS COURSE - INTRO
// Your AI Hiring Strategy
// ============================================

const BusinessIntro = () => {
    return (
        <WebbookLayout>
            <Helmet>
                <title>Your AI Hiring Strategy | AI for Small Business</title>
                <meta name="description" content="Learn to build an AI team that handles customer service, sales, marketing, and operations — for less than $100/month." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                {/* Background glow */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* BADGE */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                            <Briefcase className="text-amber-400" size={16} />
                            <span className="text-slate-300 text-sm font-medium">AI for Small Business • Introduction • Free</span>
                        </div>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"> AI Hiring Strategy</span>
                        </h1>
                        <p className="text-slate-300 text-lg mb-2">
                            How to build a team of AI employees that work 24/7 — for less than one lunch per month.
                        </p>
                    </motion.div>

                    {/* THE REAL TALK */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 mb-8"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl flex-shrink-0">
                                👨‍⚕️
                            </div>
                            <div>
                                <p className="text-white font-bold">From Dr. Nate Hubert</p>
                                <p className="text-slate-400 text-sm">Endodontic Resident • Founder of 4 Businesses</p>
                            </div>
                        </div>
                        <div className="text-slate-300 space-y-4 leading-relaxed">
                            <p>
                                I'm going to be honest with you: <span className="text-white font-medium">I don't have time.</span>
                            </p>
                            <p>
                                I'm in the middle of a 2-year dental residency. I have two toddlers. And somehow, I'm running four online businesses:
                            </p>
                            <div className="grid grid-cols-2 gap-3 my-4">
                                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                                    <p className="text-amber-400 font-bold">DentDx</p>
                                    <p className="text-slate-400 text-xs">Dental education</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                                    <p className="text-amber-400 font-bold">HoopLog</p>
                                    <p className="text-slate-400 text-xs">Basketball stats</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                                    <p className="text-amber-400 font-bold">FitRate</p>
                                    <p className="text-slate-400 text-xs">AI fashion app</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                                    <p className="text-amber-400 font-bold">This Site</p>
                                    <p className="text-slate-400 text-xs">Agentic AI Home</p>
                                </div>
                            </div>
                            <p>
                                How? <span className="text-amber-400 font-bold">I have an AI assistant.</span>
                            </p>
                            <p>
                                Not a chatbot I talk to sometimes. An actual AI that monitors my sites, handles customer emails, tracks payments, sends me alerts when something's wrong, and gives me a briefing every morning.
                            </p>
                            <p className="text-white font-medium">
                                This course teaches you exactly how to build the same thing for your business.
                            </p>
                        </div>
                    </motion.div>

                    {/* THE PROBLEM */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <AlertTriangle className="text-red-400" size={24} />
                            The Small Business Problem
                        </h2>
                        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6">
                            <div className="space-y-4 text-slate-300">
                                <div className="flex items-start gap-3">
                                    <span className="text-red-400 font-bold text-lg">62%</span>
                                    <p>of small business calls go unanswered — and 85% of those callers never call back.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-red-400 font-bold text-lg">70%</span>
                                    <p>of leads are never followed up on within 24 hours.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-red-400 font-bold text-lg">$3K+</span>
                                    <p>per month to hire even a part-time assistant or VA.</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-red-500/30">
                                <p className="text-white font-medium">
                                    You're losing customers because you can't be everywhere at once.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* THE SOLUTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Bot className="text-amber-400" size={24} />
                            The Solution: Your AI Team
                        </h2>
                        <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-2xl p-6">
                            <p className="text-slate-300 mb-6">
                                Over the next 7 weeks, you'll "hire" an AI team that handles the work you don't have time for:
                            </p>
                            <div className="space-y-3">
                                {[
                                    { week: 1, role: 'Chief of Staff', desc: 'Morning briefings, email triage, calendar management', tools: 'ChatGPT, Zapier' },
                                    { week: 2, role: 'AI Receptionist', desc: '24/7 phone answering, lead qualification', tools: 'Upfirst, Intercom' },
                                    { week: 3, role: 'Marketing Manager', desc: 'Social content, email campaigns, blog drafts', tools: 'Canva AI, Copy.ai' },
                                    { week: 4, role: 'Sales Rep', desc: 'Lead follow-ups, CRM updates, pipeline tracking', tools: 'HubSpot AI, Lindy' },
                                    { week: 5, role: 'Bookkeeper', desc: 'Revenue reports, expense tracking, alerts', tools: 'QuickBooks AI, Zapier' },
                                    { week: 6, role: 'IT Manager', desc: 'Site monitoring, uptime alerts, error detection', tools: 'UptimeRobot, Zapier' },
                                    { week: 7, role: 'Operations Manager', desc: 'Connect everything, multi-agent orchestration', tools: 'Lindy, Make' },
                                ].map((item) => (
                                    <div key={item.week} className="flex items-start gap-4 bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            W{item.week}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-bold">{item.role}</p>
                                            <p className="text-slate-400 text-sm">{item.desc}</p>
                                            <p className="text-amber-400/70 text-xs mt-1">Tools: {item.tools}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* THE ROI */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <DollarSign className="text-green-400" size={24} />
                            The Math
                        </h2>
                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
                                <div className="p-6">
                                    <p className="text-slate-400 text-sm mb-2">Traditional Approach</p>
                                    <p className="text-3xl font-black text-red-400">$3,000+<span className="text-lg text-slate-500">/mo</span></p>
                                    <ul className="mt-4 space-y-2 text-sm text-slate-400">
                                        <li>• Part-time VA: $1,500-2,500</li>
                                        <li>• Answering service: $300-500</li>
                                        <li>• Marketing freelancer: $500+</li>
                                        <li>• Bookkeeper: $500+</li>
                                    </ul>
                                </div>
                                <div className="p-6 bg-green-900/10">
                                    <p className="text-slate-400 text-sm mb-2">Your AI Team</p>
                                    <p className="text-3xl font-black text-green-400">~$100<span className="text-lg text-slate-500">/mo</span></p>
                                    <ul className="mt-4 space-y-2 text-sm text-slate-400">
                                        <li>• ChatGPT Plus: $20</li>
                                        <li>• Zapier: $20</li>
                                        <li>• Upfirst: $25</li>
                                        <li>• Canva Pro: $15</li>
                                        <li className="text-green-400 font-medium pt-2">Works 24/7, never sick</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* WHAT YOU'LL NEED */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">What You'll Need</h2>
                        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-slate-300">
                                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                                    <span><strong className="text-white">30 minutes per week</strong> — Each chapter takes ~30 min to complete</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-300">
                                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                                    <span><strong className="text-white">No coding skills</strong> — Everything is copy-paste and click-to-connect</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-300">
                                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                                    <span><strong className="text-white">Basic computer skills</strong> — If you can use email, you can do this</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-300">
                                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                                    <span><strong className="text-white">$50-100/month budget</strong> — For AI tools (most have free tiers to start)</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center"
                    >
                        <Link
                            to="/courses/business/week1"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02]"
                        >
                            Start Week 1: Chief of Staff
                            <ArrowRight size={20} />
                        </Link>
                        <p className="text-slate-500 text-sm mt-4">
                            Free preview • No credit card required
                        </p>
                    </motion.div>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default BusinessIntro;
