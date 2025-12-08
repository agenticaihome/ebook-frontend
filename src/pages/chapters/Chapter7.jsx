import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, Sparkles, Briefcase, Target, ListTodo, HelpCircle, Zap } from 'lucide-react';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// CHAPTER 7 - WORK TASK AGENT
// Prioritize what actually matters
// ============================================

const AI_PLATFORMS = [
    { name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'from-[#10a37f] to-[#1a7f5a]', recommended: true, logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" /></svg> },
    { name: 'Claude', url: 'https://claude.ai/', color: 'from-[#d97706] to-[#b45309]', logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg> },
    { name: 'Gemini', url: 'https://gemini.google.com/', color: 'from-[#4285f4] to-[#1a73e8]', logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg> },
    { name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'from-[#00bcf2] to-[#0078d4]', logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg> },
    { name: 'Meta AI', url: 'https://www.meta.ai/', color: 'from-[#0668E1] to-[#7B35F5]', logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.77-3.92 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" /></svg> },
];

const Chapter7 = () => {
    const [copied, setCopied] = useState(false);
    const [showTroubleshooting, setShowTroubleshooting] = useState(false);
    const [showTips, setShowTips] = useState(false);

    const goldPrompt = `Be my Work Task Agent.

Every morning, help me plan my workday:
1. Ask what's on my plate today
2. Help me pick the ONE thing that matters most
3. Block out distractions and nice-to-haves

Be ruthless about priorities. Less is more.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 7: Work Task Agent | Agentic AI Home</title>
                <meta name="description" content="An AI that helps you ruthlessly prioritize work tasks and focus on what matters." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 7 of 10 • Premium</span>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Work Task Agent</span>
                        </h1>
                        <p className="text-slate-400 text-lg">Stop doing everything. Start doing what matters.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero size="md" pose="default" message="Most people have 47 things on their to-do list and finish 3. This agent forces you to pick ONE thing that actually moves the needle." />
                        </Suspense>
                    </motion.div>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                            <h3 className="text-white font-bold">Open your AI</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {AI_PLATFORMS.map((platform) => (
                                    <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer"
                                        className={`relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:scale-105 transition-all`}>
                                        {platform.recommended && <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">BEST</span>}
                                        {platform.logo}<span>{platform.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                            <h3 className="text-white font-bold">Copy These Instructions</h3>
                        </div>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-amber-500/30">
                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>
                            <button onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white'}`}>
                                {copied ? <><CheckCircle size={22} /> Copied!</> : <><Copy size={22} /> Copy These Instructions</>}
                            </button>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                            <h3 className="text-white font-bold">Do your daily brain dump</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                            <p className="text-slate-300 text-sm">Every morning, dump everything in your head: meetings, emails to send, projects, random tasks. Let your AI sort the chaos.</p>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-8">
                        <div className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-2xl p-6 border border-amber-500/20">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Sparkles className="text-amber-400" size={20} />What you'll get</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3"><CheckCircle className="text-green-400 mt-0.5" size={18} /><div><span className="text-white font-medium">Your ONE thing</span><p className="text-slate-400 text-sm">The single task that matters most today</p></div></div>
                                <div className="flex items-start gap-3"><CheckCircle className="text-green-400 mt-0.5" size={18} /><div><span className="text-white font-medium">Distraction filter</span><p className="text-slate-400 text-sm">Your AI will push back on time-wasters</p></div></div>
                                <div className="flex items-start gap-3"><CheckCircle className="text-green-400 mt-0.5" size={18} /><div><span className="text-white font-medium">End-of-day review</span><p className="text-slate-400 text-sm">Did you do the thing? What blocked you?</p></div></div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mb-8">
                        <button onClick={() => setShowTips(!showTips)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Zap className="text-amber-400" size={18} />Make it even better</span>
                            <ChevronDown className={`text-slate-400 transition-transform ${showTips ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTips && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">1</div><p className="text-slate-300 text-sm"><strong>Set your big goal:</strong> "I'm trying to launch my project by Friday. Filter tasks through that lens."</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">2</div><p className="text-slate-300 text-sm"><strong>Time block:</strong> "I have 4 hours of deep work time today. What fits?"</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">3</div><p className="text-slate-300 text-sm"><strong>Challenge yourself:</strong> Ask "What would happen if I didn't do this task at all?"</p></div>
                            </div>
                        )}
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mb-8">
                        <button onClick={() => setShowTroubleshooting(!showTroubleshooting)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><HelpCircle className="text-slate-400" size={18} />Troubleshooting</span>
                            <ChevronDown className={`text-slate-400 transition-transform ${showTroubleshooting ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTroubleshooting && (
                            <div className="mt-3 space-y-3">
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">"Everything feels urgent"</p>
                                    <p className="text-slate-400 text-sm">Tell your AI: "If I could only do ONE thing today and nothing else, which task would have the biggest impact in a week?"</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">"I have too many meetings"</p>
                                    <p className="text-slate-400 text-sm">Ask: "Which of these meetings could be an email? Draft a message declining the non-essential ones."</p>
                                </div>
                            </div>
                        )}
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
                        <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-2xl p-6 border border-amber-500/30 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm mb-4"><CheckCircle size={16} />Chapter 7 Complete!</div>
                            <h3 className="text-white font-bold text-xl mb-2">Ready to build ANY agent you want?</h3>
                            <p className="text-slate-400 text-sm mb-4">Learn the Custom Agent Builder framework.</p>
                            <Link to="/part3/chapter8" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold rounded-xl transition-all">?? Amazing! On to Chapter 8<ArrowRight size={18} /></Link>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter7;
