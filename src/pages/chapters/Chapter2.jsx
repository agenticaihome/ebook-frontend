import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, Sparkles, ExternalLink, ShoppingCart, UtensilsCrossed, HelpCircle, MessageSquare } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 2 - MEAL PLANNING AGENT
// Simple, effective, actually helpful
// ============================================

// Import shared AI platforms data (centralized to avoid duplication)
import { AI_PLATFORMS } from '../../data/aiPlatforms';

const Chapter2 = () => {
    const [copied, setCopied] = useState(false);
    const [showTroubleshooting, setShowTroubleshooting] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `Be my Meal Planning Agent.

Every Sunday at 10am, ask me what's in my fridge and my budget.
Then give me 5 easy dinners + a shopping list I can screenshot.

Real food, not fancy stuff. Set this up now.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        triggerDelight('copy');
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 2: Meal Planning Agent | Agentic AI Home</title>
                <meta name="description" content="Create an AI that plans your meals and shopping list every week. Step-by-step guide." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* BADGE */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30">
                            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 2 of 10 • Premium</span>
                        </div>
                    </motion.div>

                    {/* WHY THIS MATTERS */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-4">
                        <p className="text-slate-500 text-sm italic">
                            "You didn't become a parent to stress about dinners every night."
                        </p>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400"> Meal Planning Agent</span>
                        </h1>
                        <p className="text-slate-300 text-lg">
                            Never stare into the fridge wondering "what's for dinner?" again.
                        </p>
                    </motion.div>


                    {/* CAPTAIN */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="'What's for dinner?' The question that ruins 6pm every single day. Your AI will answer it once a week so you never have to think about it again."
                            />
                        </Suspense>
                    </motion.div>

                    {/* WHAT YOU'LL GET */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <ShoppingCart className="text-orange-400" size={18} />
                                What you'll get every Sunday:
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <UtensilsCrossed className="text-orange-400 mt-1" size={18} />
                                    <div>
                                        <span className="text-white font-medium">5 dinner ideas for the week</span>
                                        <p className="text-slate-300 text-sm">Simple meals, 30 min or less, using what you already have</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <ShoppingCart className="text-green-400 mt-1" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Complete shopping list</span>
                                        <p className="text-slate-300 text-sm">Ready to screenshot and take to the store</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* STEP 1 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                            <h3 className="text-white font-bold">Open your AI</h3>
                            <span className="text-slate-500 text-sm">(same one from Chapter 1)</span>
                        </div>

                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 mb-3">
                            <p className="text-slate-300 text-sm mb-3">
                                Use the same AI you set up your morning agent with. This keeps everything in one place.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {AI_PLATFORMS.map((platform) => (
                                    <a
                                        key={platform.name}
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:scale-[1.02] transition-all`}
                                    >
                                        {platform.recommended && (
                                            <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">POPULAR</span>
                                        )}
                                        {platform.logo}
                                        <span>{platform.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* STEP 2 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                            <h3 className="text-white font-bold">Copy These Instructions and paste it</h3>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-orange-500/30">
                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>

                            <button
                                onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white'
                                    }`}
                            >
                                {copied ? (
                                    <><CheckCircle size={22} /> Copied! Now paste it in your AI</>
                                ) : (
                                    <><Copy size={22} /> Copy These Instructions</>
                                )}
                            </button>
                        </div>
                    </motion.section>

                    {/* STEP 3 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                            <h3 className="text-white font-bold">Tell it about your household</h3>
                        </div>

                        <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                            <p className="text-slate-300 text-sm mb-4">The AI will ask you about:</p>
                            <ul className="space-y-2 text-sm mb-4">
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-orange-400 font-bold">•</span>
                                    <span><strong className="text-white">How many people</strong> you're cooking for</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-orange-400 font-bold">•</span>
                                    <span><strong className="text-white">Any dietary restrictions</strong> - vegetarian, allergies, picky kids, etc.</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-orange-400 font-bold">•</span>
                                    <span><strong className="text-white">How much effort</strong> you want to put in (quick meals vs. real cooking)</span>
                                </li>
                            </ul>
                            <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/30">
                                <p className="text-green-400 text-sm flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                                    <span><strong>Next Sunday</strong> it'll check in automatically with your first meal plan.</span>
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* REAL EXAMPLES */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mb-6">
                        <button
                            onClick={() => setShowTips(!showTips)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-slate-800/30 rounded-xl border border-slate-700/50 text-left hover:bg-slate-800/50 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                                <MessageSquare size={16} className="text-orange-400" />
                                Things you can say to make it better
                            </span>
                            <ChevronDown size={16} className={`text-slate-300 transition-transform ${showTips ? 'rotate-180' : ''}`} />
                        </button>

                        {showTips && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 space-y-3"
                            >
                                <p className="text-slate-300 text-sm">Try saying these things to get better results:</p>
                                <div className="space-y-2">
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-orange-400 text-sm font-mono">"My kid won't eat vegetables unless they're hidden"</p>
                                        <p className="text-slate-500 text-xs mt-1">→ It'll suggest sneaky ways to include veggies</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-orange-400 text-sm font-mono">"I have chicken in the freezer I need to use"</p>
                                        <p className="text-slate-500 text-xs mt-1">→ It'll build meals around that chicken</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-orange-400 text-sm font-mono">"We're trying to eat healthier but not diet food"</p>
                                        <p className="text-slate-500 text-xs mt-1">→ It'll balance nutrition with taste</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* TROUBLESHOOTING */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mb-8">
                        <button
                            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-slate-800/30 rounded-xl border border-slate-700/50 text-left hover:bg-slate-800/50 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                                <HelpCircle size={16} className="text-slate-300" />
                                Not working? Common questions
                            </span>
                            <ChevronDown size={16} className={`text-slate-300 transition-transform ${showTroubleshooting ? 'rotate-180' : ''}`} />
                        </button>

                        {showTroubleshooting && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 space-y-4"
                            >
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">"The meals are too complicated"</p>
                                    <p className="text-slate-300 text-sm">Say: <span className="text-orange-400">"Simpler please. Max 5 ingredients per meal."</span></p>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">"The shopping list is too long"</p>
                                    <p className="text-slate-300 text-sm">Say: <span className="text-orange-400">"Use overlapping ingredients so I buy less."</span></p>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">"I want different meal suggestions"</p>
                                    <p className="text-slate-300 text-sm">Say: <span className="text-orange-400">"Give me 5 more options, different style."</span></p>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* AGENT COUNT */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="mb-6">
                        <div className="bg-gradient-to-r from-teal-900/30 to-orange-900/30 rounded-xl p-4 border border-teal-500/30">
                            <p className="text-white font-bold text-sm mb-1">🎯 Your Agent Squad: 2</p>
                            <p className="text-slate-300 text-sm">Morning Agent + Meal Planning Agent</p>
                        </div>
                    </motion.section>

                    {/* SHARE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.88 }} className="mb-6">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/30 rounded-xl" />}>
                            <ShareToX chapterNumber={2} />
                        </Suspense>
                    </motion.section>

                    {/* NEXT */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mb-10">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <Link to="/part1/chapter1" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">
                                ← Back to Chapter 1
                            </Link>
                            <Link
                                to="/part1/chapter3"
                                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white py-5 px-8 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-orange-500/20"
                            >
                                🎉 Great! On to Chapter 3
                                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <p className="text-center text-slate-500 text-sm mt-3">
                            Next: Never forget important dates again
                        </p>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter2;
