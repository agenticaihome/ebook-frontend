import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, Sparkles, ExternalLink, Calendar, Gift, CreditCard, Heart, HelpCircle, MessageSquare, Bell, Lock, Share2, Twitter } from 'lucide-react';

import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 3 - IMPORTANT DATES AGENT
// Never forget a birthday, anniversary, or bill again
// ============================================

// Import shared AI platforms data (centralized to avoid duplication)
import { AI_PLATFORMS } from '../../data/aiPlatforms';

const Chapter3 = () => {
    const [copied, setCopied] = useState(false);
    const [showTroubleshooting, setShowTroubleshooting] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [showSampleOutput, setShowSampleOutput] = useState(false);
    const [showFillInHelpers, setShowFillInHelpers] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `Be my Important Dates Agent.

BIRTHDAYS:
- [NAME]: [DATE] - likes [INTERESTS/GIFT IDEAS]
- [NAME]: [DATE] - likes [INTERESTS/GIFT IDEAS]
(add more as needed)

ANNIVERSARIES:
- [EVENT]: [DATE]
(wedding, dating anniversary, work anniversary, etc.)

BILLS & PAYMENTS:
- [BILL NAME]: [DUE DATE] - $[AMOUNT] - [MONTHLY/YEARLY]
(rent, utilities, subscriptions, insurance, etc.)

OTHER IMPORTANT DATES:
- [EVENT]: [DATE]
(license renewal, pet vet visits, car registration, etc.)

For each date:
1. Remind me [NUMBER] days before (default: 3 days)
2. For birthdays, suggest a gift idea based on their interests
3. For bills, include the amount in the reminder

Right now, help me fill in each section above.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        triggerDelight('copy');
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 3: Important Dates Agent | Agentic AI Home</title>
                <meta name="description" content="Never forget a birthday, anniversary, or bill again. Create an AI that remembers for you." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* BADGE */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30">
                            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 3 of 10 • Premium</span>
                        </div>
                    </motion.div>

                    {/* WHY THIS MATTERS */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-4">
                        <p className="text-slate-500 text-sm italic">
                            "The people you love deserve someone who remembers."
                        </p>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"> Important Dates Agent</span>
                        </h1>
                        <p className="text-slate-300 text-lg">
                            Never forget a birthday, anniversary, or bill again.
                        </p>
                    </motion.div>

                    {/* CAPTAIN */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="Don't be THAT person who texts 'happy belated.' Dump all your important dates into your AI once, and never embarrass yourself again."
                            />
                        </Suspense>
                    </motion.div>

                    {/* WHAT YOU'LL GET */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Calendar className="text-pink-400" size={18} />
                                What this agent does:
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <Gift className="text-pink-400 mt-1" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Birthdays</span>
                                        <p className="text-slate-300 text-sm">Reminds you 3 days before + suggests a gift based on what you've told it about the person</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <Heart className="text-red-400 mt-1" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Anniversaries</span>
                                        <p className="text-slate-300 text-sm">Wedding, dating, work anniversary—whatever matters to you</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <CreditCard className="text-green-400 mt-1" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Bills & Payments</span>
                                        <p className="text-slate-300 text-sm">Rent, utilities, subscriptions—never pay a late fee again</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* STEP 1 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                            <h3 className="text-white font-bold">Open your AI</h3>
                            <span className="text-slate-500 text-sm">(same one you've been using)</span>
                        </div>

                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 mb-3">
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
                            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                            <h3 className="text-white font-bold">Copy These Instructions and paste it</h3>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-pink-500/30">
                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>

                            <button
                                onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white'
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
                            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                            <h3 className="text-white font-bold">Dump ALL your important dates</h3>
                        </div>

                        <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                            <p className="text-slate-300 text-sm mb-4">Start telling it everything you need to remember:</p>
                            <div className="bg-slate-900/50 rounded-lg p-4 text-sm text-slate-300 font-mono mb-4">
                                <div className="mb-2">"Mom's birthday is March 15"</div>
                                <div className="mb-2">"Wedding anniversary is June 22"</div>
                                <div className="mb-2">"Rent is due on the 1st of every month"</div>
                                <div className="mb-2">"Car insurance renews September 10"</div>
                                <div>"Best friend Jake's birthday is November 3 - he loves golf"</div>
                            </div>
                            <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/30">
                                <p className="text-green-400 text-sm flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                                    <span><strong>Enable notifications:</strong> In ChatGPT, use "Scheduled Tasks" to get automatic reminders. Or just ask "What's coming up this week?" anytime!</span>
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* FILL-IN HELPERS */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mb-6">
                        <button
                            onClick={() => setShowFillInHelpers(!showFillInHelpers)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-xl border border-pink-500/30 text-left hover:from-pink-900/30 hover:to-purple-900/30 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-white text-sm font-medium">
                                <Sparkles size={16} className="text-pink-400" />
                                📝 Not sure what dates to add? See examples
                            </span>
                            <ChevronDown size={16} className={`text-pink-400 transition-transform ${showFillInHelpers ? 'rotate-180' : ''}`} />
                        </button>

                        {showFillInHelpers && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 space-y-4"
                            >
                                <p className="text-slate-300 text-sm mb-3">Here are examples for each category:</p>

                                <div className="space-y-3">
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-pink-400 text-xs font-bold mb-2 flex items-center gap-1"><Gift size={14} /> BIRTHDAYS</p>
                                        <p className="text-slate-300 text-sm font-mono">"Mom: March 15 - loves gardening and mystery novels"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Best friend Sam: July 4 - into tech gadgets, budget $50"</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-red-400 text-xs font-bold mb-2 flex items-center gap-1"><Heart size={14} /> ANNIVERSARIES</p>
                                        <p className="text-slate-300 text-sm font-mono">"Wedding anniversary: June 22"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Started dating: February 14"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Work anniversary: August 1"</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-green-400 text-xs font-bold mb-2 flex items-center gap-1"><CreditCard size={14} /> BILLS</p>
                                        <p className="text-slate-300 text-sm font-mono">"Rent: 1st of every month - $1,500"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Car insurance: Sept 10 yearly - $800"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Netflix: 15th monthly - $15.99"</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-purple-400 text-xs font-bold mb-2 flex items-center gap-1"><Calendar size={14} /> OTHER</p>
                                        <p className="text-slate-300 text-sm font-mono">"Driver's license renewal: December 2025"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Dog's vet checkup: every 6 months"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Car registration: March yearly"</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* VISUAL EXAMPLE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68 }} className="mb-6">
                        <button
                            onClick={() => setShowSampleOutput(!showSampleOutput)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl border border-green-500/30 text-left hover:from-green-900/30 hover:to-emerald-900/30 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-white text-sm font-medium">
                                <Bell size={16} className="text-green-400" />
                                👀 See what a reminder looks like
                            </span>
                            <ChevronDown size={16} className={`text-green-400 transition-transform ${showSampleOutput ? 'rotate-180' : ''}`} />
                        </button>

                        {showSampleOutput && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-900/80 rounded-xl p-5 border border-green-500/30 space-y-4"
                            >
                                <p className="text-green-400 text-sm font-medium mb-3">✨ Example AI Reminder:</p>

                                <div className="bg-slate-950 rounded-lg p-4 border border-slate-700 font-mono text-sm text-slate-300 space-y-4">
                                    <div className="border-l-2 border-pink-500 pl-3">
                                        <p className="text-pink-400 font-bold">🎂 Birthday Alert!</p>
                                        <p className="mt-1">Mom's birthday is in <strong className="text-white">3 days</strong> (March 15)</p>
                                        <p className="mt-2 text-slate-400">💡 Gift ideas based on her interests:</p>
                                        <ul className="mt-1 ml-4 text-sm space-y-1">
                                            <li>• Raised garden bed kit (~$45)</li>
                                            <li>• "The Thursday Murder Club" mystery novel ($15)</li>
                                            <li>• Personalized garden markers ($25)</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-green-500 pl-3">
                                        <p className="text-green-400 font-bold">💳 Bill Reminder</p>
                                        <p className="mt-1">Rent is due in <strong className="text-white">3 days</strong> (April 1st)</p>
                                        <p className="mt-1 text-amber-400">Amount: $1,500</p>
                                    </div>

                                    <div className="border-l-2 border-red-500 pl-3">
                                        <p className="text-red-400 font-bold">❤️ Anniversary Coming Up</p>
                                        <p className="mt-1">Wedding anniversary is in <strong className="text-white">5 days</strong> (June 22)</p>
                                        <p className="mt-1 text-slate-400">This is your 8th anniversary! 🎉</p>
                                    </div>
                                </div>

                                <p className="text-slate-400 text-xs mt-2">Your reminders will be personalized based on your dates and preferences!</p>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* ONGOING USAGE GUIDE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.69 }} className="mb-6">
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-5 border border-slate-700/50">
                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                📅 How to Use It Going Forward
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <span className="text-pink-400 font-bold mt-0.5">1</span>
                                    <div>
                                        <span className="text-white font-medium">Check what's coming up:</span>
                                        <p className="text-slate-300">Say <span className="text-pink-400 font-mono">"What important dates are coming up this week?"</span></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <span className="text-pink-400 font-bold mt-0.5">2</span>
                                    <div>
                                        <span className="text-white font-medium">Add new dates anytime:</span>
                                        <p className="text-slate-300">Say <span className="text-pink-400 font-mono">"Add my coworker Lisa's birthday: October 8"</span></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <span className="text-pink-400 font-bold mt-0.5">3</span>
                                    <div>
                                        <span className="text-white font-medium">Update or remove dates:</span>
                                        <p className="text-slate-300">Say <span className="text-pink-400 font-mono">"Remove Jake's birthday"</span> or <span className="text-pink-400 font-mono">"Change rent to the 5th instead"</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* TIPS */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mb-6">
                        <button
                            onClick={() => setShowTips(!showTips)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-slate-800/30 rounded-xl border border-slate-700/50 text-left hover:bg-slate-800/50 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                                <MessageSquare size={16} className="text-pink-400" />
                                Make it even better
                            </span>
                            <ChevronDown size={16} className={`text-slate-300 transition-transform ${showTips ? 'rotate-180' : ''}`} />
                        </button>

                        {showTips && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 space-y-3"
                            >
                                <p className="text-slate-300 text-sm">Say these things to get better results:</p>
                                <div className="space-y-2">
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-pink-400 text-sm font-mono">"For my wife's birthday, she loves spa stuff and hates jewelry"</p>
                                        <p className="text-slate-500 text-xs mt-1">→ Gift suggestions will be personalized</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-pink-400 text-sm font-mono">"Remind me a week before rent, not 3 days"</p>
                                        <p className="text-slate-500 text-xs mt-1">→ Customize timing for each date</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-pink-400 text-sm font-mono">"My budget for gifts is usually $50-100"</p>
                                        <p className="text-slate-500 text-xs mt-1">→ Suggestions will match your budget</p>
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
                                    <p className="text-white font-bold text-sm mb-1">"Will it actually remind me on the date?"</p>
                                    <p className="text-slate-300 text-sm">Yes, ChatGPT can send scheduled notifications. Make sure notifications are enabled on your phone.</p>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">"I have too many dates to type"</p>
                                    <p className="text-slate-300 text-sm">Say: <span className="text-pink-400">"Let me give you dates in a list format"</span> - then paste them all at once.</p>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">"What about recurring bills?"</p>
                                    <p className="text-slate-300 text-sm">Say: <span className="text-pink-400">"Remind me on the 1st of EVERY month for rent"</span> - it understands recurring dates.</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* AGENT COUNT */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="mb-6">
                        <div className="bg-gradient-to-r from-teal-900/30 via-pink-900/20 to-orange-900/30 rounded-xl p-4 border border-teal-500/30">
                            <p className="text-white font-bold text-sm mb-1">🎯 Your Agent Squad: 3</p>
                            <p className="text-slate-300 text-sm">Morning Agent + Meal Planning Agent + Important Dates Agent</p>
                        </div>
                    </motion.section>

                    {/* SHARE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.88 }} className="mb-6">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/30 rounded-xl" />}>
                            <ShareToX chapterNumber={3} />
                        </Suspense>
                    </motion.section>

                    {/* PART 1 COMPLETE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mb-6">
                        <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-xl p-5 border border-green-500/30">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={24} />
                                <div>
                                    <p className="text-green-400 font-bold mb-1">Part 1 Complete! 🎉</p>
                                    <p className="text-slate-300 text-sm">
                                        You now have 3 agents working for you. That's more than 90% of people who "use AI."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>



                    {/* CTA - UPGRADE */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="mb-10">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <Link to="/part1/chapter2" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">
                                ← Back to Chapter 2
                            </Link>
                            <Link
                                to="/part2/chapter1"
                                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white py-5 px-8 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-pink-500/20"
                            >
                                See What's Next
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <p className="text-center text-slate-500 text-sm mt-3">
                            7 more agents waiting for you
                        </p>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter3;
