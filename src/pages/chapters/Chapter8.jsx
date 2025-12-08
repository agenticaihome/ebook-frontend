import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, Sparkles, Settings, Wrench, Lightbulb, HelpCircle, Zap } from 'lucide-react';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// CHAPTER 8 - CUSTOM AGENT BUILDER
// Build ANY agent you can imagine
// ============================================

const AI_PLATFORMS = [
    { name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'from-[#10a37f] to-[#1a7f5a]', recommended: true, logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" /></svg> },
    { name: 'Claude', url: 'https://claude.ai/', color: 'from-[#d97706] to-[#b45309]', logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg> },
    { name: 'Gemini', url: 'https://gemini.google.com/', color: 'from-[#4285f4] to-[#1a73e8]', logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg> },
    { name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'from-[#00bcf2] to-[#0078d4]', logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg> },
    { name: 'Meta AI', url: 'https://www.meta.ai/', color: 'from-[#0668E1] to-[#7B35F5]', logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.77-3.92 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" /></svg> },
];

const Chapter8 = () => {
    const [copied, setCopied] = useState(false);
    const [showExamples, setShowExamples] = useState(false);
    const [showTips, setShowTips] = useState(false);

    const goldPrompt = `Help me create a custom AI agent.

Ask me:
1. What problem am I trying to solve?
2. How often do I need this help? (daily, weekly, when triggered)
3. What does success look like?

Then design a simple agent prompt I can use.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 8: Custom Agent Builder | Agentic AI Home</title>
                <meta name="description" content="Learn the framework to design any AI agent for any problem you have." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 8 of 10 • Advanced</span>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Custom Agent Builder</span>
                        </h1>
                        <p className="text-slate-400 text-lg">Build ANY agent you can imagine.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero size="md" pose="default" message="You've learned specific agents. Now you learn the FRAMEWORK. With this, you can solve any problem by designing your own agent from scratch." />
                        </Suspense>
                    </motion.div>

                    {/* THE FRAMEWORK */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Settings className="text-purple-400" size={20} />
                                The Agent Design Framework
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                                    <div><span className="text-white font-medium">Problem</span><p className="text-slate-400 text-sm">What specific pain point are you solving?</p></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                                    <div><span className="text-white font-medium">Trigger</span><p className="text-slate-400 text-sm">When should this agent activate? (time, event, request)</p></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                                    <div><span className="text-white font-medium">Output</span><p className="text-slate-400 text-sm">What specific result should you get?</p></div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">→</div>
                            <h3 className="text-white font-bold">Use this meta-prompt to design agents</h3>
                        </div>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-purple-500/30">
                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>
                            <button onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white'}`}>
                                {copied ? <><CheckCircle size={22} /> Copied!</> : <><Copy size={22} /> Copy These Instructions</>}
                            </button>
                        </div>
                    </motion.section>

                    {/* EXAMPLE AGENTS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
                        <button onClick={() => setShowExamples(!showExamples)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Lightbulb className="text-yellow-400" size={18} />Example agents you could build</span>
                            <ChevronDown className={`text-slate-400 transition-transform ${showExamples ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showExamples && (
                            <div className="mt-3 grid gap-3">
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">📚 Reading List Agent</p>
                                    <p className="text-slate-400 text-sm">"Track books I want to read, remind me weekly, and give me a summary of my progress."</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">🏠 Chore Agent</p>
                                    <p className="text-slate-400 text-sm">"Remind me and my spouse about household tasks. Keep score of who did what."</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">💡 Idea Capture Agent</p>
                                    <p className="text-slate-400 text-sm">"When I say 'capture this idea,' store it and give me a weekly summary of all ideas."</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">🎁 Gift Agent</p>
                                    <p className="text-slate-400 text-sm">"Track gift ideas for people when I mention them. Remind me 2 weeks before their birthday."</p>
                                </div>
                            </div>
                        )}
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
                        <button onClick={() => setShowTips(!showTips)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Zap className="text-amber-400" size={18} />Pro tips for agent design</span>
                            <ChevronDown className={`text-slate-400 transition-transform ${showTips ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTips && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">1</div><p className="text-slate-300 text-sm"><strong>Start specific:</strong> "Remind me to drink water" beats "Be my health agent."</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">2</div><p className="text-slate-300 text-sm"><strong>Define format:</strong> "Give me bullet points" or "One sentence max."</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">3</div><p className="text-slate-300 text-sm"><strong>Iterate fast:</strong> Test, tweak, repeat. Your first version won't be perfect.</p></div>
                            </div>
                        )}
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/30 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm mb-4"><CheckCircle size={16} />Chapter 8 Complete!</div>
                            <h3 className="text-white font-bold text-xl mb-2">Ready to make agents work together?</h3>
                            <p className="text-slate-400 text-sm mb-4">Learn multi-agent coordination.</p>
                            <Link to="/part3/chapter9" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-xl transition-all">Continue to Chapter 9<ArrowRight size={18} /></Link>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter8;
