import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, Sparkles, ExternalLink, ShoppingCart, UtensilsCrossed, DollarSign, Clock, ListChecks } from 'lucide-react';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// CHAPTER 2 - GROCERY/MEAL PLANNING AGENT
// Universal: Everyone eats. Everyone forgets groceries.
// ============================================

const AI_PLATFORMS = [
    { name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'from-[#10a37f] to-[#1a7f5a]', recommended: true },
    { name: 'Claude', url: 'https://claude.ai/', color: 'from-[#d97706] to-[#b45309]' },
    { name: 'Gemini', url: 'https://gemini.google.com/', color: 'from-[#4285f4] to-[#1a73e8]' },
    { name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'from-[#00bcf2] to-[#0078d4]' },
    { name: 'Meta AI', url: 'https://www.meta.ai/', color: 'from-[#0668E1] to-[#7B35F5]' },
];

const Chapter2 = () => {
    const [copied, setCopied] = useState(false);
    const [showMore, setShowMore] = useState(false);

    // THE GOLD PROMPT for Chapter 2
    const goldPrompt = `Be my Meal Planning Agent.

Every Sunday at 10am, ask me:
- What's already in my fridge/pantry?
- Any meals I'm craving this week?
- Budget for groceries?

Then give me:
- 5 dinner ideas for the week
- A complete shopping list I can screenshot

Keep it simple. Real meals, not fancy chef stuff.

Let's set this up now.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 2: Your Meal Planning Agent | Agentic AI Home</title>
                <meta name="description" content="Never say 'what's for dinner?' again. Create an AI agent that plans your meals and shopping list." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                {/* Animated Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* BADGE */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500/10 to-green-500/10 border border-orange-500/30 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Free</span>
                            </div>
                            <span className="text-slate-500">|</span>
                            <span className="text-slate-300 text-sm font-medium">Chapter 2 of 16</span>
                        </div>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                            Never Ask<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400">"What's For Dinner?"</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">
                            Create an AI that plans your meals and shopping list every week. Automatically.
                        </p>
                    </motion.div>

                    {/* CAPTAIN */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="You've got your morning agent. Now let's tackle the question every human dreads: 'What should we eat?' This agent checks in every Sunday and does the planning for you."
                            />
                        </Suspense>
                    </motion.div>

                    {/* VALUE PROPS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="grid grid-cols-3 gap-3 mb-8"
                    >
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
                            <DollarSign className="text-green-400 mx-auto mb-2" size={24} />
                            <div className="text-white font-bold">$200+</div>
                            <div className="text-slate-400 text-xs">saved per month</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
                            <Clock className="text-orange-400 mx-auto mb-2" size={24} />
                            <div className="text-white font-bold">2 hours</div>
                            <div className="text-slate-400 text-xs">saved weekly</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
                            <UtensilsCrossed className="text-teal-400 mx-auto mb-2" size={24} />
                            <div className="text-white font-bold">0 stress</div>
                            <div className="text-slate-400 text-xs">at 6pm daily</div>
                        </div>
                    </motion.div>

                    {/* PREVIEW */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-5 border border-slate-700/50 backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <ShoppingCart className="text-orange-400" size={18} />
                                <span className="text-slate-400 text-sm font-medium">Preview: Your Sunday notification</span>
                            </div>
                            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <div className="text-orange-400 font-bold text-xs uppercase mb-2">This Week's Dinners</div>
                                        <div className="text-slate-300 space-y-1">
                                            <div>Mon: Tacos (use leftover chicken)</div>
                                            <div>Tue: Pasta with garlic bread</div>
                                            <div>Wed: Stir fry with rice</div>
                                            <div>Thu: Soup & sandwiches</div>
                                            <div>Fri: Homemade pizza night 🍕</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-green-400 font-bold text-xs uppercase mb-2">Shopping List</div>
                                        <div className="text-slate-300 grid grid-cols-2 gap-1">
                                            <div>□ Ground beef</div>
                                            <div>□ Tortillas</div>
                                            <div>□ Pasta</div>
                                            <div>□ Vegetables</div>
                                            <div>□ Pizza dough</div>
                                            <div>□ Cheese (lots)</div>
                                        </div>
                                    </div>
                                    <div className="text-slate-500 text-xs italic">
                                        Estimated total: ~$85 | Feeds family of 4
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* STEP 1 */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                            <h3 className="text-white font-bold">Open your AI</h3>
                            <span className="text-slate-500 text-sm">(same one from Chapter 1)</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {AI_PLATFORMS.map((platform) => (
                                <a
                                    key={platform.name}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`relative flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:scale-105 transition-all shadow-lg`}
                                >
                                    {platform.recommended && (
                                        <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold shadow-md">
                                            BEST
                                        </span>
                                    )}
                                    {platform.name}
                                    <ExternalLink size={11} className="opacity-70" />
                                </a>
                            ))}
                        </div>
                    </motion.section>

                    {/* STEP 2: THE PROMPT */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                            <h3 className="text-white font-bold">Copy & paste this prompt</h3>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />

                            <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border border-orange-500/30">
                                <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                    <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">
                                        {goldPrompt}
                                    </pre>
                                </div>

                                <button
                                    onClick={handleCopy}
                                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied
                                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                            : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50'
                                        }`}
                                >
                                    {copied ? (
                                        <>
                                            <CheckCircle size={22} />
                                            Copied! Now paste it
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={22} />
                                            Copy Prompt
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.section>

                    {/* STEP 3 */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                            <h3 className="text-white font-bold">Answer its questions, then screenshot your list</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                            <p className="text-slate-300 text-sm mb-4">
                                The AI will ask about your eating preferences, family size, and budget. Then it generates your weekly plan.
                            </p>
                            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                                <CheckCircle size={16} />
                                <span>Next Sunday, it checks in automatically</span>
                            </div>
                        </div>
                    </motion.section>

                    {/* AGENT COUNT */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mb-8"
                    >
                        <div className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-xl p-5 border border-teal-500/30">
                            <div className="flex items-center gap-3">
                                <ListChecks className="text-teal-400" size={24} />
                                <div>
                                    <p className="text-teal-400 font-bold">Your Agent Squad: 2</p>
                                    <p className="text-slate-400 text-sm">Morning Agent + Meal Planning Agent</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* CTA */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mb-10"
                    >
                        <Link
                            to="/part1/chapter3"
                            className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white py-5 rounded-2xl font-bold text-xl transition-all border border-slate-700 hover:border-slate-600"
                        >
                            Continue to Chapter 3
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-center text-slate-500 text-sm mt-3">
                            Next: Never forget important dates again
                        </p>
                    </motion.section>

                    {/* TIPS */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="w-full flex items-center justify-center gap-2 py-3 text-slate-400 hover:text-white transition-colors text-sm"
                        >
                            <ChevronDown size={16} className={`transition-transform ${showMore ? 'rotate-180' : ''}`} />
                            {showMore ? 'Show less' : 'Pro tips for better meal plans'}
                        </button>

                        {showMore && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700/50"
                            >
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <span className="text-orange-400 font-bold">1.</span>
                                        <span className="text-slate-300">Tell it your family's picky eaters - it remembers</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-orange-400 font-bold">2.</span>
                                        <span className="text-slate-300">Say "reuse leftovers" and it gets creative</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-orange-400 font-bold">3.</span>
                                        <span className="text-slate-300">Share your shopping list with your partner - they can add to it</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter2;
