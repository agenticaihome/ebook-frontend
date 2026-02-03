import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../../components/layout/WebbookLayout';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, ChevronUp, Users, Mail, Target, TrendingUp, Zap, ExternalLink, Clock, DollarSign, MessageSquare, Calendar } from 'lucide-react';

// ============================================
// WEEK 4 - AI SALES REP
// Lead follow-ups, CRM, pipeline tracking
// ============================================

const Week4 = () => {
    const [copiedPrompt, setCopiedPrompt] = useState(null);

    const followUpPrompt = `You are my AI Sales Rep. Help me follow up with leads effectively.

**Lead Info:**
Name: [NAME]
Company: [COMPANY] 
How they found us: [SOURCE]
What they're interested in: [INTEREST]
Last contact: [DATE]

**Task:** Write a follow-up email that:
1. References our previous conversation naturally
2. Provides ONE piece of value (tip, resource, insight)
3. Has a clear but low-pressure CTA
4. Is under 100 words
5. Sounds human, not templated

**Tone:** Professional but warm. Like a helpful friend, not a pushy salesperson.`;

    const leadQualPrompt = `Help me qualify this lead on a scale of 1-10.

**Lead Details:**
- Company size: [SIZE]
- Industry: [INDUSTRY]
- Budget mentioned: [YES/NO/AMOUNT]
- Timeline: [URGENT/THIS QUARTER/EXPLORING]
- Decision maker: [YES/NO/UNSURE]
- Pain point: [THEIR MAIN PROBLEM]

**Score them on:**
1. Budget fit (do they have money?)
2. Authority (can they decide?)
3. Need (how urgent is their problem?)
4. Timeline (when do they want to buy?)

Give me:
- Score (1-10)
- Priority (Hot/Warm/Nurture)
- Recommended next step
- One question I should ask them`;

    const handleCopy = (prompt, id) => {
        navigator.clipboard.writeText(prompt);
        setCopiedPrompt(id);
        setTimeout(() => setCopiedPrompt(null), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Week 4: AI Sales Rep | AI for Small Business</title>
                <meta name="description" content="Never let a lead go cold. Automate follow-ups, qualify leads, and track your pipeline with AI." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Week 4 of 7 • ~30 min</span>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Hire Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"> Sales Rep</span>
                        </h1>
                        <p className="text-slate-300 text-lg">Never let a lead go cold again. AI-powered follow-ups, qualification, and pipeline tracking.</p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 mb-8">
                        <h3 className="text-white font-bold mb-4">The Lead Leak Problem</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-3xl font-black text-red-400">70%</p>
                                <p className="text-slate-400 text-sm">of leads never get a follow-up</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-3xl font-black text-red-400">5 min</p>
                                <p className="text-slate-400 text-sm">is the ideal response time</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-3xl font-black text-red-400">80%</p>
                                <p className="text-slate-400 text-sm">of sales need 5+ follow-ups</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tools */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-4">Your Sales Stack</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a href="https://hubspot.com" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 border border-orange-500/30 rounded-xl p-4 hover:border-orange-500/60 transition-all">
                                <div className="flex items-center gap-3 mb-2">
                                    <Target className="text-orange-400" size={24} />
                                    <span className="text-white font-bold">HubSpot CRM</span>
                                </div>
                                <p className="text-slate-400 text-sm">Free CRM with AI-powered insights. Best for most businesses.</p>
                            </a>
                            <a href="https://lindy.ai" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-4 hover:border-purple-500/60 transition-all">
                                <div className="flex items-center gap-3 mb-2">
                                    <MessageSquare className="text-purple-400" size={24} />
                                    <span className="text-white font-bold">Lindy</span>
                                </div>
                                <p className="text-slate-400 text-sm">AI agents for automated follow-ups. $50/mo for serious automation.</p>
                            </a>
                        </div>
                    </motion.section>

                    {/* Prompts */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">1</div>
                            <h3 className="text-xl font-bold text-white">Follow-Up System</h3>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden mb-4">
                            <div className="p-5 border-b border-slate-700/50">
                                <h4 className="text-white font-bold">Personalized Follow-Up Email</h4>
                                <p className="text-slate-400 text-sm">Never send a generic "just checking in" again</p>
                            </div>
                            <div className="p-4 bg-slate-950/50">
                                <pre className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto mb-4 font-mono">{followUpPrompt}</pre>
                                <button onClick={() => handleCopy(followUpPrompt, 'followup')} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${copiedPrompt === 'followup' ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'}`}>
                                    {copiedPrompt === 'followup' ? <><CheckCircle size={18} /> Copied!</> : <><Copy size={18} /> Copy Prompt</>}
                                </button>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">2</div>
                            <h3 className="text-xl font-bold text-white">Lead Qualification</h3>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                            <div className="p-5 border-b border-slate-700/50">
                                <h4 className="text-white font-bold">BANT Lead Scorer</h4>
                                <p className="text-slate-400 text-sm">Know which leads to prioritize instantly</p>
                            </div>
                            <div className="p-4 bg-slate-950/50">
                                <pre className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto mb-4 font-mono">{leadQualPrompt}</pre>
                                <button onClick={() => handleCopy(leadQualPrompt, 'qual')} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${copiedPrompt === 'qual' ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'}`}>
                                    {copiedPrompt === 'qual' ? <><CheckCircle size={18} /> Copied!</> : <><Copy size={18} /> Copy Prompt</>}
                                </button>
                            </div>
                        </div>
                    </motion.section>

                    {/* ROI */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6 mb-8">
                        <p className="text-green-400 font-bold mb-3 flex items-center gap-2"><DollarSign size={18} />ROI Example</p>
                        <div className="space-y-2 text-slate-300">
                            <div className="flex justify-between"><span>Extra leads saved from going cold:</span><span className="text-white font-bold">5/month</span></div>
                            <div className="flex justify-between"><span>Conversion rate:</span><span className="text-white font-bold">20%</span></div>
                            <div className="flex justify-between"><span>Avg deal size:</span><span className="text-white font-bold">$1,000</span></div>
                            <div className="border-t border-green-500/30 pt-2 flex justify-between"><span className="font-bold">Extra revenue:</span><span className="text-2xl font-black text-green-400">$1,000/mo</span></div>
                        </div>
                    </motion.div>

                    {/* What you built */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-6 mb-8">
                        <p className="text-green-400 font-bold mb-4 flex items-center gap-2"><CheckCircle size={20} />What You Just Built</p>
                        <ul className="space-y-2 text-slate-300">
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />Personalized follow-up email system</li>
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />Lead qualification framework (BANT)</li>
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />CRM workflow with HubSpot/Lindy</li>
                        </ul>
                    </motion.div>

                    {/* Next */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 mb-8">
                        <p className="text-slate-400 text-sm mb-2">Coming in Week 5</p>
                        <h3 className="text-xl font-bold text-white mb-2">AI Bookkeeper</h3>
                        <p className="text-slate-300">Automated revenue reports, expense tracking, and financial alerts.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-center">
                        <Link to="/courses/business/week5" className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:scale-[1.02]">
                            Continue to Week 5 <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </WebbookLayout>
    );
};

export default Week4;
