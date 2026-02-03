import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../../components/layout/WebbookLayout';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown, ChevronUp, Phone, PhoneOff, MessageSquare, Clock, Users, Zap, AlertCircle, ExternalLink, Settings, Star, DollarSign } from 'lucide-react';

// ============================================
// WEEK 2 - AI RECEPTIONIST
// 24/7 Phone answering, lead qualification
// ============================================

const Week2 = () => {
    const [showSetup, setShowSetup] = useState(false);
    const [showScript, setShowScript] = useState(false);
    const [showTroubleshooting, setShowTroubleshooting] = useState(false);

    const receptionistScript = `**Greeting:**
"Hi, thanks for calling [YOUR BUSINESS NAME]! I'm the AI assistant. How can I help you today?"

**If asking about services:**
"Great question! We offer [LIST YOUR MAIN SERVICES]. Would you like me to schedule a call with [YOUR NAME] to discuss your specific needs?"

**If asking about pricing:**
"Our pricing depends on your specific situation. I'd love to have [YOUR NAME] give you a personalized quote. What's a good time for a quick call?"

**If it's an existing customer:**
"Thanks for being a customer! Let me take down your question and I'll make sure [YOUR NAME] gets back to you within [TIMEFRAME]. What's your name and the best number to reach you?"

**If it's urgent:**
"I understand this is urgent. Let me text [YOUR NAME] right now and mark this as priority. Can you give me a quick summary of the issue?"

**Closing:**
"Perfect, I've got all the details. [YOUR NAME] will be in touch soon. Is there anything else I can help with today?"

**Key info to always capture:**
- Caller's name
- Phone number
- Email (if they'll share)
- What they're calling about
- Urgency level (routine/soon/urgent)`;

    return (
        <WebbookLayout>
            <Helmet>
                <title>Week 2: AI Receptionist | AI for Small Business</title>
                <meta name="description" content="Never miss a call again. Set up 24/7 AI phone answering that qualifies leads and books appointments." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                {/* Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* BADGE */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Week 2 of 7 • ~30 min</span>
                        </div>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Hire Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"> AI Receptionist</span>
                        </h1>
                        <p className="text-slate-300 text-lg">
                            Never miss a call again. Your AI answers 24/7, qualifies leads, and books appointments while you sleep.
                        </p>
                    </motion.div>

                    {/* THE PROBLEM */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 mb-8"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <PhoneOff className="text-red-400 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="text-white font-bold text-lg">The Missed Call Problem</h3>
                                <p className="text-slate-400 text-sm">This is costing you money every day</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                                <p className="text-3xl font-black text-red-400">62%</p>
                                <p className="text-slate-400 text-sm">of small business calls go unanswered</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                                <p className="text-3xl font-black text-red-400">85%</p>
                                <p className="text-slate-400 text-sm">of callers won't leave a voicemail</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                                <p className="text-3xl font-black text-red-400">$1,200+</p>
                                <p className="text-slate-400 text-sm">avg. lost per missed lead</p>
                            </div>
                        </div>
                        <p className="text-white mt-4 text-center font-medium">
                            If you miss 5 calls a week, that's potentially <span className="text-red-400">$6,000/week</span> in lost business.
                        </p>
                    </motion.div>

                    {/* OUTCOME BOX */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-5 mb-8"
                    >
                        <p className="text-white text-center">
                            ✅ <span className="font-medium">By the end of this chapter</span>, you'll have an AI that answers your phone 24/7, captures leads, and sends you instant notifications — for about $25/month.
                        </p>
                    </motion.div>

                    {/* TOOL OPTIONS */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Choose Your AI Phone Tool</h2>
                        <p className="text-slate-300 mb-4">
                            All three options work great. Pick based on your needs:
                        </p>

                        <div className="space-y-4">
                            {/* Upfirst - Recommended */}
                            <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border-2 border-amber-500/50 rounded-2xl p-5 relative">
                                <div className="absolute -top-3 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    RECOMMENDED
                                </div>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                            <Phone className="text-amber-400" size={20} />
                                            Upfirst
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-3">Best for: Service businesses, contractors, healthcare</p>
                                        <ul className="space-y-1 text-sm text-slate-300">
                                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={14} /> 24/7 AI phone answering</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={14} /> Qualifies leads automatically</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={14} /> Books appointments</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={14} /> Sends text/email summaries</li>
                                        </ul>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-amber-400">$25</p>
                                        <p className="text-slate-400 text-xs">/month (30 calls)</p>
                                        <a
                                            href="https://upfirst.ai"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 mt-2 text-amber-400 text-sm hover:underline"
                                        >
                                            Try Free <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Intercom */}
                            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                            <MessageSquare className="text-blue-400" size={20} />
                                            Intercom
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-3">Best for: Online businesses, SaaS, e-commerce</p>
                                        <ul className="space-y-1 text-sm text-slate-300">
                                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={14} /> AI web chat + chatbot</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={14} /> Email support automation</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={14} /> Knowledge base integration</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={14} /> Customer data tracking</li>
                                        </ul>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-blue-400">$29</p>
                                        <p className="text-slate-400 text-xs">/seat/month</p>
                                        <a
                                            href="https://intercom.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 mt-2 text-blue-400 text-sm hover:underline"
                                        >
                                            View Plans <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Tidio */}
                            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                            <MessageSquare className="text-purple-400" size={20} />
                                            Tidio
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-3">Best for: Small websites, budget-conscious</p>
                                        <ul className="space-y-1 text-sm text-slate-300">
                                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={14} /> AI chatbot builder</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={14} /> Live chat fallback</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={14} /> Easy website embed</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={14} /> Free tier available</li>
                                        </ul>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-purple-400">$29</p>
                                        <p className="text-slate-400 text-xs">/month (or free tier)</p>
                                        <a
                                            href="https://tidio.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 mt-2 text-purple-400 text-sm hover:underline"
                                        >
                                            Try Free <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* SETUP GUIDE */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">1</div>
                            <h3 className="text-xl font-bold text-white">Set Up Upfirst (Recommended)</h3>
                        </div>

                        <div className="bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50">
                            <button
                                onClick={() => setShowSetup(!showSetup)}
                                className="flex items-center justify-between w-full text-left"
                            >
                                <span className="text-white font-medium">Step-by-step setup guide</span>
                                {showSetup ? <ChevronUp className="text-slate-400" size={20} /> : <ChevronDown className="text-slate-400" size={20} />}
                            </button>

                            {showSetup && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-4 space-y-4"
                                >
                                    <ol className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <span className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                                            <div>
                                                <p className="text-white font-medium">Create your account</p>
                                                <p className="text-slate-400 text-sm">Go to upfirst.ai and sign up for the free trial (14 days, no credit card)</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                                            <div>
                                                <p className="text-white font-medium">Get your AI phone number</p>
                                                <p className="text-slate-400 text-sm">Upfirst gives you a dedicated number. You can forward your business line here.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                                            <div>
                                                <p className="text-white font-medium">Customize your greeting</p>
                                                <p className="text-slate-400 text-sm">Tell the AI your business name, services, and how to handle different types of calls.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</span>
                                            <div>
                                                <p className="text-white font-medium">Set up call forwarding</p>
                                                <p className="text-slate-400 text-sm">Forward your business line to the Upfirst number when you can't answer.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">5</span>
                                            <div>
                                                <p className="text-white font-medium">Configure notifications</p>
                                                <p className="text-slate-400 text-sm">Get text or email alerts after each call with a summary and lead info.</p>
                                            </div>
                                        </li>
                                    </ol>

                                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                                        <p className="text-green-400 text-sm flex items-center gap-2">
                                            <CheckCircle size={16} />
                                            That's it! Test it by calling your business number when you're "busy."
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.section>

                    {/* THE SCRIPT */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">2</div>
                            <h3 className="text-xl font-bold text-white">Your AI Receptionist Script</h3>
                        </div>

                        <div className="bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50">
                            <p className="text-slate-300 mb-4">
                                Copy this script template and customize it for your business:
                            </p>

                            <button
                                onClick={() => setShowScript(!showScript)}
                                className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-white font-medium transition-all mb-4"
                            >
                                <span>View full script template</span>
                                {showScript ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>

                            {showScript && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-4"
                                >
                                    <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                                        {receptionistScript}
                                    </pre>
                                </motion.div>
                            )}

                            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3">
                                <p className="text-amber-400 text-sm font-bold mb-1">💡 Customization Tips</p>
                                <ul className="text-slate-300 text-sm space-y-1">
                                    <li>• Replace [YOUR BUSINESS NAME] with your actual business name</li>
                                    <li>• Add your specific services in the services section</li>
                                    <li>• Set a realistic callback timeframe (1 hour, same day, etc.)</li>
                                    <li>• Add FAQs about your most common caller questions</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* ROI CALCULATOR */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6 mb-8"
                    >
                        <p className="text-green-400 font-bold mb-4 flex items-center gap-2">
                            <DollarSign size={20} />
                            ROI Calculator
                        </p>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-300">Missed calls saved/month:</span>
                                <span className="text-white font-bold">20 calls</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-300">Conversion rate to customer:</span>
                                <span className="text-white font-bold">10%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-300">Average customer value:</span>
                                <span className="text-white font-bold">$500</span>
                            </div>
                            <div className="border-t border-green-500/30 pt-3 flex justify-between items-center">
                                <span className="text-white font-bold">Monthly revenue saved:</span>
                                <span className="text-2xl font-black text-green-400">$1,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-300">Cost of Upfirst:</span>
                                <span className="text-white">-$25</span>
                            </div>
                            <div className="border-t border-green-500/30 pt-3 flex justify-between items-center">
                                <span className="text-white font-bold">Net ROI:</span>
                                <span className="text-2xl font-black text-green-400">$975/month</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mt-4 text-center">
                            That's a <span className="text-green-400 font-bold">3,900% return</span> on your $25 investment.
                        </p>
                    </motion.div>

                    {/* TROUBLESHOOTING */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-8"
                    >
                        <button
                            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                            className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-slate-800/30 border border-slate-700/50 text-white font-medium transition-all hover:bg-slate-800/50"
                        >
                            <span className="flex items-center gap-2">
                                <AlertCircle size={18} className="text-amber-400" />
                                Common Questions
                            </span>
                            {showTroubleshooting ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>

                        {showTroubleshooting && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4 bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50 space-y-4"
                            >
                                <div>
                                    <p className="text-white font-medium mb-1">"Will callers know it's an AI?"</p>
                                    <p className="text-slate-400 text-sm">Modern AI voices are very natural. Most callers can't tell. And honestly, they care more about getting help than who's helping.</p>
                                </div>
                                <div>
                                    <p className="text-white font-medium mb-1">"What if the AI can't answer a question?"</p>
                                    <p className="text-slate-400 text-sm">Configure it to say "Let me have [your name] follow up on that specific question" and capture the question for you.</p>
                                </div>
                                <div>
                                    <p className="text-white font-medium mb-1">"Can it book appointments?"</p>
                                    <p className="text-slate-400 text-sm">Yes! Connect your calendar (Google, Calendly, etc.) and it can book directly into available slots.</p>
                                </div>
                                <div>
                                    <p className="text-white font-medium mb-1">"What about existing customers?"</p>
                                    <p className="text-slate-400 text-sm">The AI can recognize returning callers and handle them differently — or escalate to you immediately.</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* WHAT YOU BUILT */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-6 mb-8"
                    >
                        <p className="text-green-400 font-bold mb-4 flex items-center gap-2">
                            <CheckCircle size={20} />
                            What You Just Built
                        </p>
                        <ul className="space-y-2 text-slate-300">
                            <li className="flex items-center gap-2">
                                <CheckCircle className="text-green-400" size={16} />
                                24/7 AI phone answering that never misses a call
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="text-green-400" size={16} />
                                Automatic lead qualification and capture
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="text-green-400" size={16} />
                                Instant notifications when leads call
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="text-green-400" size={16} />
                                Professional customer experience at any hour
                            </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-green-500/30">
                            <p className="text-white font-medium">
                                🎉 Your AI Receptionist is live. You'll never miss another opportunity.
                            </p>
                        </div>
                    </motion.div>

                    {/* NEXT WEEK */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 mb-8"
                    >
                        <p className="text-slate-400 text-sm mb-2">Coming in Week 3</p>
                        <h3 className="text-xl font-bold text-white mb-2">AI Marketing Manager</h3>
                        <p className="text-slate-300 mb-4">
                            Create social media content, email campaigns, and blog posts in minutes — not hours.
                        </p>
                        <div className="flex items-center gap-2 text-amber-400 text-sm">
                            <span>Tools: Canva AI, Copy.ai, Buffer</span>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="text-center"
                    >
                        <Link
                            to="/courses/business/week3"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
                        >
                            Continue to Week 3
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Week2;
