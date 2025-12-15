import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, ChevronUp, Sparkles, Dumbbell, Heart, Activity, HelpCircle, Zap, Eye, Pill, Stethoscope, Calendar, ClipboardList } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 6 - WELLNESS AGENT
// Fitness + Health Management in one powerful agent
// ============================================

import { AI_PLATFORMS } from '../../data/aiPlatforms';

const Chapter6 = () => {
    const [copied, setCopied] = useState(false);
    const [copiedHealth, setCopiedHealth] = useState(false);
    const [showTroubleshooting, setShowTroubleshooting] = useState(false);
    const [showHealthTroubleshooting, setShowHealthTroubleshooting] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [showExampleOutput, setShowExampleOutput] = useState(false);
    const [showHealthExample, setShowHealthExample] = useState(false);
    const [showFillInHelpers, setShowFillInHelpers] = useState(false);
    const [showHealthHelpers, setShowHealthHelpers] = useState(false);
    const [activeMode, setActiveMode] = useState('fitness'); // 'fitness' or 'health'
    const { triggerDelight } = useImmersion();

    const fitnessPrompt = `Be my Fitness Agent.

Your job is to help me stay active with workouts that fit my real life.

MY FITNESS SITUATION:
- Current activity level: [SEDENTARY / SOMEWHAT ACTIVE / PRETTY ACTIVE]
- Fitness goal: [LOSE WEIGHT / BUILD MUSCLE / GET STRONGER / IMPROVE STAMINA / JUST STAY ACTIVE]
- Any injuries or limitations: [BAD KNEE / BACK ISSUES / NONE / OTHER]

MY WORKOUT SETUP:
- Equipment I have: [DUMBBELLS / RESISTANCE BANDS / NOTHING / GYM MEMBERSHIP / OTHER]
- Where I workout: [HOME / GYM / OUTDOORS]
- Days I can exercise: [NUMBER] days per week
- Time per workout: [15 MIN / 30 MIN / 45 MIN / 1 HOUR]

MY PREFERENCES:
- I enjoy: [STRENGTH / CARDIO / YOGA / HIIT / WALKING / MIX]
- I hate: [RUNNING / JUMPING / SPECIFIC EXERCISES]

Rules:
- Keep workouts simple with clear instructions — no gym jargon
- Respect my time and equipment constraints
- If I mention an injury, avoid exercises that could aggravate it
- Tell me how to modify if something is too hard

Every week, give me a workout plan that fits my schedule.

Start by helping me fill in my fitness profile above.`;

    const healthPrompt = `Be my Health Management Agent.

Your job is to help me stay on top of my health — medications, appointments, and doctor visits.

MY MEDICATIONS (if any):
- [MEDICATION 1]: [DOSE] at [TIME]
- [MEDICATION 2]: [DOSE] at [TIME]
- Vitamins/supplements: [LIST ANY]

MY HEALTHCARE SCHEDULE:
- Primary care checkup: Last visit [DATE], next due [WHEN]
- Dentist: Last visit [DATE]
- Eye doctor: Last visit [DATE]
- Specialists I see: [LIST ANY]
- Annual screenings I need: [MAMMOGRAM / COLONOSCOPY / BLOOD WORK / NONE / OTHER]

YOUR RESPONSIBILITIES:

1. DAILY: Remind me what medications to take each morning.

2. BEFORE DOCTOR VISITS: Help me prepare by:
   - Listing any symptoms I've mentioned
   - Drafting questions I should ask
   - Reviewing what happened at my last visit

3. AFTER DOCTOR VISITS: Help me summarize:
   - What the doctor said
   - Any new medications or dosage changes
   - Follow-up appointments I need to schedule

4. PREVENTIVE CARE: Remind me when screenings are due based on my age and sex.

Rules:
- You are NOT a doctor — never diagnose or recommend treatments
- Your job is to help me REMEMBER and PREPARE, not give medical advice
- Be direct and organized
- If I describe symptoms, suggest I discuss them with my doctor

Start by helping me fill in my health profile above.`;

    const handleCopyFitness = () => {
        navigator.clipboard.writeText(fitnessPrompt);
        setCopied(true);
        triggerDelight('copy');
        setTimeout(() => setCopied(false), 3000);
    };

    const handleCopyHealth = () => {
        navigator.clipboard.writeText(healthPrompt);
        setCopiedHealth(true);
        triggerDelight('copy');
        setTimeout(() => setCopiedHealth(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 6: Wellness Agent | Agentic AI Home</title>
                <meta name="description" content="Get personalized workout plans AND manage your health — medications, doctor visits, and preventive care all in one agent." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 sm:left-1/3 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-red-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-teal-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500/10 to-teal-500/10 border border-red-500/30">
                            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 6 of 10 • Premium</span>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-4">
                        <p className="text-slate-500 text-sm italic">
                            "Your body is how you show up for the people who need you."
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-teal-400">Wellness Agent</span>
                        </h1>
                        <p className="text-slate-300 text-lg">Fitness + Health Management in one powerful agent.</p>
                        <p className="text-slate-500 text-sm mt-2">Two modes. One agent. Complete wellness.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero size="md" pose="default" message="This agent handles TWO things most people mess up: staying active AND staying on top of doctor stuff. Pick your mode below — or use both!" />
                        </Suspense>
                    </motion.div>

                    {/* MODE TOGGLE */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="bg-slate-800/50 rounded-2xl p-2 border border-slate-700/50">
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setActiveMode('fitness')}
                                    className={`flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-bold text-sm transition-all ${activeMode === 'fitness'
                                            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                                            : 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800'
                                        }`}
                                >
                                    <Dumbbell size={18} />
                                    <span>Fitness Mode</span>
                                </button>
                                <button
                                    onClick={() => setActiveMode('health')}
                                    className={`flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-bold text-sm transition-all ${activeMode === 'health'
                                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                                            : 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800'
                                        }`}
                                >
                                    <Stethoscope size={18} />
                                    <span>Health Mode</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* ==================== FITNESS MODE ==================== */}
                    {activeMode === 'fitness' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key="fitness"
                        >
                            {/* What you get - Fitness */}
                            <motion.section className="mb-6">
                                <div className="bg-gradient-to-r from-red-500/5 to-orange-500/5 rounded-2xl p-5 border border-red-500/20">
                                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                        <Dumbbell className="text-red-400" size={18} />
                                        What Fitness Mode gives you:
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="flex items-start gap-2 bg-slate-900/50 rounded-lg p-3">
                                            <CheckCircle className="text-green-400 mt-0.5" size={16} />
                                            <span className="text-slate-300 text-sm">Weekly workout plans</span>
                                        </div>
                                        <div className="flex items-start gap-2 bg-slate-900/50 rounded-lg p-3">
                                            <CheckCircle className="text-green-400 mt-0.5" size={16} />
                                            <span className="text-slate-300 text-sm">Home or gym options</span>
                                        </div>
                                        <div className="flex items-start gap-2 bg-slate-900/50 rounded-lg p-3">
                                            <CheckCircle className="text-green-400 mt-0.5" size={16} />
                                            <span className="text-slate-300 text-sm">Injury-aware exercises</span>
                                        </div>
                                        <div className="flex items-start gap-2 bg-slate-900/50 rounded-lg p-3">
                                            <CheckCircle className="text-green-400 mt-0.5" size={16} />
                                            <span className="text-slate-300 text-sm">Form explanations</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Step 1 */}
                            <motion.section className="mb-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                                    <h3 className="text-white font-bold">Open your AI</h3>
                                </div>
                                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 mb-3">
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                        {AI_PLATFORMS.map((platform) => (
                                            <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer"
                                                className={`relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:scale-[1.02] transition-all`}>
                                                {platform.recommended && <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">POPULAR</span>}
                                                {platform.logo}
                                                <span>{platform.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </motion.section>

                            {/* Step 2 - Fitness Prompt */}
                            <motion.section className="mb-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                                    <h3 className="text-white font-bold">Copy the Fitness Instructions</h3>
                                </div>
                                <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-red-500/30">
                                    <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono max-h-64 overflow-y-auto">
                                        <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{fitnessPrompt}</pre>
                                    </div>
                                    <button onClick={handleCopyFitness}
                                        className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white'}`}>
                                        {copied ? <><CheckCircle size={22} /> Copied!</> : <><Copy size={22} /> Copy Fitness Instructions</>}
                                    </button>

                                    <button onClick={() => setShowExampleOutput(!showExampleOutput)}
                                        className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                                        <Eye size={16} />
                                        {showExampleOutput ? 'Hide Example' : 'See Example Workout Plan'}
                                        {showExampleOutput ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    {showExampleOutput && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 bg-slate-900/80 rounded-xl p-4 border border-red-500/20">
                                            <p className="text-red-400 text-xs font-bold mb-2">🏋️ EXAMPLE WORKOUT PLAN:</p>
                                            <div className="bg-black/40 rounded-lg p-3 text-sm text-slate-300 space-y-3">
                                                <p>🗓️ <strong className="text-white">Your 3-Day Plan:</strong></p>
                                                <p><strong className="text-red-300">Monday (20 min):</strong><br />• Bodyweight squats - 3x12<br />• Push-ups (or knee push-ups) - 3x10<br />• Plank - 3x30 seconds</p>
                                                <p><strong className="text-red-300">Wednesday (25 min):</strong><br />• Dumbbell rows - 3x10 each arm<br />• Lunges - 3x10 each leg<br />• Shoulder press - 3x10</p>
                                                <p><strong className="text-red-300">Friday (20 min):</strong><br />• Glute bridges - 3x15<br />• Dumbbell curls - 3x12<br />• Dead bugs - 3x10 each side</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.section>

                            {/* Troubleshooting - Fitness */}
                            <motion.section className="mb-8">
                                <button onClick={() => setShowTroubleshooting(!showTroubleshooting)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-red-500/30 transition-colors">
                                    <span className="text-white font-bold flex items-center gap-2"><HelpCircle className="text-slate-300" size={18} />Troubleshooting</span>
                                    <ChevronDown className={`text-slate-300 transition-transform ${showTroubleshooting ? 'rotate-180' : ''}`} size={20} />
                                </button>
                                {showTroubleshooting && (
                                    <div className="mt-3 space-y-3">
                                        <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                            <p className="text-white font-medium text-sm mb-1">"The workouts are too hard"</p>
                                            <p className="text-slate-300 text-sm">Tell your AI: "These are too intense. Give me a beginner version."</p>
                                        </div>
                                        <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                            <p className="text-white font-medium text-sm mb-1">"I don't know how to do an exercise"</p>
                                            <p className="text-slate-300 text-sm">Just ask: "Show me step-by-step how to do [exercise]."</p>
                                        </div>
                                    </div>
                                )}
                            </motion.section>
                        </motion.div>
                    )}

                    {/* ==================== HEALTH MODE ==================== */}
                    {activeMode === 'health' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key="health"
                        >
                            {/* What you get - Health */}
                            <motion.section className="mb-6">
                                <div className="bg-gradient-to-r from-teal-500/5 to-cyan-500/5 rounded-2xl p-5 border border-teal-500/20">
                                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                        <Stethoscope className="text-teal-400" size={18} />
                                        What Health Mode gives you:
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="flex items-start gap-2 bg-slate-900/50 rounded-lg p-3">
                                            <Pill className="text-teal-400 mt-0.5" size={16} />
                                            <span className="text-slate-300 text-sm">Daily medication reminders</span>
                                        </div>
                                        <div className="flex items-start gap-2 bg-slate-900/50 rounded-lg p-3">
                                            <ClipboardList className="text-teal-400 mt-0.5" size={16} />
                                            <span className="text-slate-300 text-sm">Doctor visit prep lists</span>
                                        </div>
                                        <div className="flex items-start gap-2 bg-slate-900/50 rounded-lg p-3">
                                            <Calendar className="text-teal-400 mt-0.5" size={16} />
                                            <span className="text-slate-300 text-sm">Preventive care reminders</span>
                                        </div>
                                        <div className="flex items-start gap-2 bg-slate-900/50 rounded-lg p-3">
                                            <Heart className="text-teal-400 mt-0.5" size={16} />
                                            <span className="text-slate-300 text-sm">Post-visit summaries</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Privacy Notice */}
                            <motion.section className="mb-6">
                                <div className="bg-amber-900/20 rounded-xl p-4 border border-amber-500/30">
                                    <p className="text-amber-400 text-sm flex items-start gap-2">
                                        <span className="text-lg">⚠️</span>
                                        <span><strong>Privacy note:</strong> Your AI remembers what you tell it. Only share health info you're comfortable with. For maximum privacy, create a separate chat just for health topics.</span>
                                    </p>
                                </div>
                            </motion.section>

                            {/* Step 1 */}
                            <motion.section className="mb-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                                    <h3 className="text-white font-bold">Open your AI</h3>
                                </div>
                                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 mb-3">
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                        {AI_PLATFORMS.map((platform) => (
                                            <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer"
                                                className={`relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:scale-[1.02] transition-all`}>
                                                {platform.recommended && <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">POPULAR</span>}
                                                {platform.logo}
                                                <span>{platform.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </motion.section>

                            {/* Step 2 - Health Prompt */}
                            <motion.section className="mb-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                                    <h3 className="text-white font-bold">Copy the Health Instructions</h3>
                                </div>
                                <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-teal-500/30">
                                    <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono max-h-64 overflow-y-auto">
                                        <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{healthPrompt}</pre>
                                    </div>
                                    <button onClick={handleCopyHealth}
                                        className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copiedHealth ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white'}`}>
                                        {copiedHealth ? <><CheckCircle size={22} /> Copied!</> : <><Copy size={22} /> Copy Health Instructions</>}
                                    </button>

                                    <button onClick={() => setShowHealthExample(!showHealthExample)}
                                        className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                                        <Eye size={16} />
                                        {showHealthExample ? 'Hide Example' : 'See What This Looks Like'}
                                        {showHealthExample ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    {showHealthExample && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 bg-slate-900/80 rounded-xl p-4 border border-teal-500/20">
                                            <p className="text-teal-400 text-xs font-bold mb-2">💊 EXAMPLE DAILY CHECK-IN:</p>
                                            <div className="bg-black/40 rounded-lg p-3 text-sm text-slate-300 space-y-3">
                                                <p>☀️ <strong className="text-white">Good morning! Here's your health check-in:</strong></p>
                                                <p><strong className="text-teal-300">Medications today:</strong><br />✓ Lisinopril 10mg — take with breakfast<br />✓ Vitamin D — take anytime with food</p>
                                                <p><strong className="text-teal-300">Upcoming:</strong><br />📅 Dentist appointment in 3 days (Thursday 2pm)<br />🩺 Annual physical due next month</p>
                                                <p className="text-slate-500">Reply "took my meds" when done, or ask me to help you prep for Thursday's dentist visit!</p>
                                            </div>

                                            <p className="text-teal-400 text-xs font-bold mb-2 mt-4">🏥 EXAMPLE PRE-APPOINTMENT PREP:</p>
                                            <div className="bg-black/40 rounded-lg p-3 text-sm text-slate-300 space-y-2">
                                                <p>📋 <strong className="text-white">Your Doctor Visit Prep:</strong></p>
                                                <p><strong className="text-teal-300">Symptoms to mention:</strong><br />• Headaches (3x this week, you mentioned)<br />• Trouble sleeping (ongoing)</p>
                                                <p><strong className="text-teal-300">Questions to ask:</strong><br />• Is my blood pressure medication still the right dose?<br />• Should I get my cholesterol checked?</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.section>

                            {/* How to use it */}
                            <motion.section className="mb-6">
                                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-5 border border-slate-700/50">
                                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                        🗓️ How to Use Health Mode
                                    </h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                            <span className="text-teal-400 font-bold mt-0.5">1</span>
                                            <div>
                                                <span className="text-white font-medium">Every morning:</span>
                                                <p className="text-slate-300">Say <span className="text-teal-400 font-mono">"What medications do I take today?"</span></p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                            <span className="text-teal-400 font-bold mt-0.5">2</span>
                                            <div>
                                                <span className="text-white font-medium">Before appointments:</span>
                                                <p className="text-slate-300">Say <span className="text-teal-400 font-mono">"Help me prepare for my doctor visit tomorrow"</span></p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                            <span className="text-teal-400 font-bold mt-0.5">3</span>
                                            <div>
                                                <span className="text-white font-medium">After appointments:</span>
                                                <p className="text-slate-300">Say <span className="text-teal-400 font-mono">"Here's what the doctor said..."</span> and it'll summarize</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                            <span className="text-teal-400 font-bold mt-0.5">4</span>
                                            <div>
                                                <span className="text-white font-medium">Track symptoms:</span>
                                                <p className="text-slate-300">Say <span className="text-teal-400 font-mono">"I had a headache again today"</span> — it'll remember for your doctor</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Troubleshooting - Health */}
                            <motion.section className="mb-8">
                                <button onClick={() => setShowHealthTroubleshooting(!showHealthTroubleshooting)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-teal-500/30 transition-colors">
                                    <span className="text-white font-bold flex items-center gap-2"><HelpCircle className="text-slate-300" size={18} />Troubleshooting</span>
                                    <ChevronDown className={`text-slate-300 transition-transform ${showHealthTroubleshooting ? 'rotate-180' : ''}`} size={20} />
                                </button>
                                {showHealthTroubleshooting && (
                                    <div className="mt-3 space-y-3">
                                        <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                            <p className="text-white font-medium text-sm mb-1">"I don't want to share my medications"</p>
                                            <p className="text-slate-300 text-sm">That's fine! Use just the doctor visit prep and preventive care features. Skip the medication section.</p>
                                        </div>
                                        <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                            <p className="text-white font-medium text-sm mb-1">"It's giving me medical advice"</p>
                                            <p className="text-slate-300 text-sm">Remind it: "You're here to help me remember and prepare, not diagnose. Just help me organize."</p>
                                        </div>
                                    </div>
                                )}
                            </motion.section>
                        </motion.div>
                    )}

                    {/* AGENT COUNT */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.93 }} className="mb-6">
                        <div className="bg-gradient-to-r from-red-900/30 via-teal-900/20 to-orange-900/30 rounded-xl p-4 border border-red-500/30">
                            <p className="text-white font-bold text-sm mb-1">🎯 Your Agent Squad: 6 <span className="text-slate-400 font-normal">down. 4 to go.</span></p>
                            <p className="text-slate-300 text-sm">Morning + Meal + Dates + Email + Money + <span className="text-teal-400">Wellness</span></p>
                        </div>
                    </motion.section>

                    {/* SHARE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }} className="mb-6">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/30 rounded-xl" />}>
                            <ShareToX chapterNumber={6} />
                        </Suspense>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
                        <div className="bg-gradient-to-r from-red-900/20 via-teal-900/20 to-orange-900/20 rounded-2xl p-6 border border-red-500/30 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm mb-4"><CheckCircle size={16} />Chapter 6 Complete!</div>
                            <h3 className="text-white font-bold text-xl mb-2">Ready for your Work Task Agent?</h3>
                            <p className="text-slate-300 text-sm mb-4">Learn to prioritize what actually matters at work.</p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                <Link to="/part2/chapter2" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">
                                    ← Back to Chapter 5
                                </Link>
                                <Link to="/part3/chapter1" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white font-bold rounded-xl transition-all">🎉 Keep going! On to Chapter 7<ArrowRight size={18} /></Link>
                            </div>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter6;
