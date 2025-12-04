import React, { useState, Suspense } from 'react';
import SEO from './components/SEO';
import { Check, CreditCard, Coins, Lock, Zap, Shield, Activity, Database, Terminal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import WebbookLayout from './components/layout/WebbookLayout';
import CaptainHero from './components/CaptainHero';
import { usePerformanceMode } from './hooks/usePerformanceMode';
const TimeBackCalculator = React.lazy(() => import('./components/landing/TimeBackCalculator'));
const BeforeAfterComparison = React.lazy(() => import('./components/landing/BeforeAfterComparison'));
const TryThisNow = React.lazy(() => import('./components/common/TryThisNow'));
const SneakPeek = React.lazy(() => import('./components/landing/SneakPeek'));
const ProductWalkthrough = React.lazy(() => import('./components/landing/ProductWalkthrough'));
const CryptoExplainerModal = React.lazy(() => import('./components/landing/CryptoExplainerModal'));
const RecentPurchases = React.lazy(() => import('./components/landing/RecentPurchases'));
const CountdownTimer = React.lazy(() => import('./components/CountdownTimer'));



export default function SalesPage() {
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const navigate = useNavigate();
  const isPerformanceMode = usePerformanceMode();

  const handlePaymentClick = () => {
    navigate('/payment-guide');
  };

  return (
    <WebbookLayout>
      <SEO
        title="Agentic AI at Home - Reclaim 10 Hours/Week"
        description="Build a 'Household Staff' of autonomous AI agents that handle email, calendar, meal planning, and home tasks. Stop drowning in to-do lists."
        canonical="/"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Agentic AI at Home",
            "description": "A comprehensive guide to building autonomous AI agents for household management.",
            "image": "https://agenticaihome.com/assets/captain-efficiency-flying.png",
            "brand": {
              "@type": "Brand",
              "name": "Agentic AI at Home"
            },
            "offers": {
              "@type": "Offer",
              "price": "39.99",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Agentic AI at Home",
            "url": "https://agenticaihome.com",
            "logo": "https://agenticaihome.com/assets/logo.png"
          }
        ]}
      />
      <div className="min-h-screen bg-[#0f0f1a] text-white font-sans selection:bg-cyan-500/30">

        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          {/* Background Glows */}
          {!isPerformanceMode && (
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-20 right-10 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl animate-pulse mix-blend-screen"></div>
              <div className="absolute bottom-0 left-10 w-64 h-64 bg-teal-900/20 rounded-full blur-3xl mix-blend-screen"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>
          )}

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left: Captain Efficiency */}
            <div className="flex justify-center md:justify-end order-2 md:order-1">
              <CaptainHero
                size="lg"
                className="scale-100 md:scale-110"
                message="You're running on 4 hours of sleep and 3 deadlines. Let's work with what we've got."
                videoSrc="/assets/captain-waving-cyan.mp4?v=cyan"
              />
            </div>

            {/* Right: Copy */}
            <div className="order-1 md:order-2 text-center md:text-left">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/50 text-cyan-400 text-xs font-mono mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                SYSTEM ONLINE
              </m.div>

              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight"
              >
                <span className="block text-white mb-2">Reclaim 10+ Hours</span>
                <span className="block text-white mb-2">Every Week With Your</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 block mb-3">AI Personal Staff</span>
              </m.h1>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 font-medium"
              >
                <span className="block sm:inline">(No Coding Required</span>
                <span className="hidden sm:inline"> • </span>
                <span className="block sm:inline">Built in 30 Minutes)</span>
              </m.div>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0"
              >
                The interactive webbook that teaches anyone how to build a "Personal Staff" of autonomous AI agents. No coding required.
                <br /><br />
                Stop drowning in admin. Start deploying agents.
              </m.p>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link
                  to="/part1"
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-900/50 flex items-center justify-center gap-2"
                >
                  <Zap size={20} /> Start Reclaiming Your Time (Free • 15 min)
                </Link>
                <button
                  disabled
                  title="Sales resume on December 4th"
                  className="bg-slate-700/50 text-slate-400 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  Sales Paused
                </button>
              </m.div>
            </div>
          </div>
        </section>

        {/* COURSE OVERVIEW SECTION */}
        <section id="course-overview" className="py-24 bg-[#0f0f1a] relative">
          {/* Ambient Background */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">YOUR MISSION: 5 PARTS TO FULL EFFICIENCY</h2>
              <p className="text-slate-400 max-w-2xl mx-auto mb-4">
                A systematic progression from basic tools to a fully autonomous Life Operating System.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm">
                <span className="text-green-400 font-bold text-sm">✓ Part 1 is FREE</span>
                <span className="text-slate-400 text-xs">• Parts 2-5 unlock with purchase</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { id: '01', title: 'FOUNDATIONS', desc: 'AI Stack & Privacy', icon: <Terminal />, status: 'FREE', link: '/part1' },
                { id: '02', title: 'DAILY OPS', desc: 'Morning, Kitchen, Logistics', icon: <Zap />, status: 'LOCKED' },
                { id: '03', title: 'DIGITAL LIFE', desc: 'Email, Calendar, Finance', icon: <Activity />, status: 'LOCKED' },
                { id: '04', title: 'HEALTH', desc: 'Recovery & Second Brain', icon: <Shield />, status: 'LOCKED' },
                { id: '05', title: 'LIFE OS', desc: 'Multi-Agent Systems', icon: <Database />, status: 'LOCKED' }
              ].map((part, index) => (
                <Link
                  to={part.link || '#pricing'}
                  key={index}
                  className={`
                    relative p-6 rounded-2xl border transition-all group hover:-translate-y-1 backdrop-blur-md
                    ${part.status === 'FREE'
                      ? 'bg-green-900/10 border-green-500/30 hover:bg-green-900/20 cursor-pointer hover:shadow-lg hover:shadow-green-900/20'
                      : part.status === 'OPEN'
                        ? 'bg-cyan-900/10 border-cyan-500/30 hover:bg-cyan-900/20 cursor-pointer'
                        : 'bg-slate-800/40 border-slate-600/50 hover:border-slate-600 cursor-not-allowed opacity-75'}
                  `}
                >
                  <div className="text-xs font-mono text-slate-400 mb-2">PART {part.id}</div>
                  <div className={`mb-4 ${part.status === 'FREE' ? 'text-green-400' : part.status === 'OPEN' ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {part.icon}
                  </div>
                  <div className="font-bold text-sm mb-1 text-slate-200 group-hover:text-white transition-colors">{part.title}</div>
                  <div className="text-xs text-slate-400">{part.desc}</div>
                  <div className="absolute top-4 right-4">
                    {part.status === 'FREE' && <span className="text-xs font-bold text-green-400 bg-green-500/20 px-2 py-1 rounded">FREE</span>}
                    {part.status === 'LOCKED' && <Lock size={14} className="text-slate-600" />}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* DIFFERENTIATORS SECTION */}
        <section className="py-24 px-6 bg-[#0f0f1a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">WHY THIS SYSTEM IS DIFFERENT</h2>
              <p className="text-slate-400">Most courses teach you prompts. We build you a staff.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-slate-800/30 backdrop-blur-md p-8 rounded-2xl border border-slate-600/50 hover:border-cyan-500/50 transition-all hover:bg-slate-800/50">
                <div className="bg-cyan-900/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-cyan-400 border border-cyan-500/20">
                  <Activity size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-100">Recovery-Aware Agent</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  "When your schedule implodes, your AI automatically adjusts your calendar and recovery plan."
                </p>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex gap-2"><Check size={16} className="text-cyan-500" /> Sleep/Energy tracking</li>
                  <li className="flex gap-2"><Check size={16} className="text-cyan-500" /> Red/Yellow/Green day protocols</li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-800/30 backdrop-blur-md p-8 rounded-2xl border border-slate-600/50 hover:border-purple-500/50 transition-all hover:bg-slate-800/50">
                <div className="bg-purple-900/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-purple-400 border border-purple-500/20">
                  <Database size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-100">Second Brain Agent</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  "Upload 50 case files → searchable database indexed by diagnosis, treatment, and outcome."
                </p>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex gap-2"><Check size={16} className="text-purple-500" /> Instant document retrieval</li>
                  <li className="flex gap-2"><Check size={16} className="text-purple-500" /> Study systems for exams</li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-800/30 backdrop-blur-md p-8 rounded-2xl border border-slate-600/50 hover:border-green-500/50 transition-all hover:bg-slate-800/50">
                <div className="bg-green-900/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-green-400 border border-green-500/20">
                  <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-100">Life Autopilot</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  "Not just automation — a strategic brain that coordinates everything toward your goals."
                </p>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex gap-2"><Check size={16} className="text-green-500" /> Multi-agent coordination</li>
                  <li className="flex gap-2"><Check size={16} className="text-green-500" /> Goal Hierarchy alignment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TRANSFORMATION SECTION */}
        <section className="py-24 px-6 bg-[#0f0f1a] border-y border-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">FROM CHAOS TO SYSTEM</h2>
              <p className="text-slate-400">Stop fighting entropy. Start managing it.</p>
            </div>
            <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading comparison...</div>}>
              <BeforeAfterComparison />
            </Suspense>
          </div>
        </section>

        {/* CALCULATOR SECTION */}
        <section className="py-24 px-6 bg-[#0f0f1a]">
          <div className="max-w-4xl mx-auto">
            <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading calculator...</div>}>
              <TimeBackCalculator />
            </Suspense>
          </div>

          {/* Try This Now Challenge */}
          <div className="max-w-4xl mx-auto mt-8">
            <Suspense fallback={null}>
              <TryThisNow
                challenge="Test Drive Your First AI Agent (Free)"
                estimatedTime="5 min"
                steps={[
                  "Go to Part 1 (100% free, no email required)",
                  "Take the AI Experience Quiz to see where you are",
                  "Use the Mental Load Calculator to quantify your chaos",
                  "See Captain Efficiency's recommendations",
                  "Decide if this system is for you"
                ]}
              />
            </Suspense>
          </div>
        </section>

        {/* RESULTS SECTION */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-5xl mx-auto bg-slate-800/40 rounded-3xl p-8 md:p-12 border border-slate-600/50 backdrop-blur-md relative shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                  <Activity className="text-green-400" /> SYSTEM PERFORMANCE REPORT
                </h2>
                <ul className="space-y-4">
                  {[
                    "7-8 hours/week recovered (Minimum)",
                    "Inbox Zero maintained daily",
                    "Mental Load offloaded to 'Second Brain'",
                    "Sleep & Energy protected by 'Recovery Agent'"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="text-green-400 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-600/50">
                  <p className="text-slate-400 italic text-sm">
                    "These are real results from the DDS system. Your results begin when you unlock the system."
                  </p>
                  <div className="mt-2 text-cyan-400 font-bold text-sm">— Captain Efficiency</div>
                </div>
              </div>
              <div className="flex justify-center">
                <CaptainHero
                  size="md"
                  pose="celebrating"
                  message="You don't need more willpower. You need fewer decisions."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF / TESTIMONIALS */}
        <section className="py-24 px-6 bg-[#0f0f1a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">REAL RESULTS FROM REAL USERS</h2>
              <p className="text-slate-400">Not hype. Just people who deployed the system.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-600/50 hover:border-cyan-500/30 transition-all">
                <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-slate-300 mb-4 italic">
                  "I'm saving 8 hours a week with the Morning + Kitchen agents alone. This paid for itself in week 1."
                </p>
                <div className="text-sm text-slate-400">
                  <div className="font-bold text-slate-400">Sarah T.</div>
                  <div>Product Manager</div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-600/50 hover:border-purple-500/30 transition-all">
                <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-slate-300 mb-4 italic">
                  "Finally, a course that doesn't just teach prompts. This is a complete operating system for life."
                </p>
                <div className="text-sm text-slate-400">
                  <div className="font-bold text-slate-400">Marcus L.</div>
                  <div>Software Engineer</div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-600/50 hover:border-green-500/30 transition-all">
                <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-slate-300 mb-4 italic">
                  "The Recovery Agent alone changed my life. I'm sleeping better and getting more done. Paradox solved."
                </p>
                <div className="text-sm text-slate-400">
                  <div className="font-bold text-slate-400">Dr. Chen</div>
                  <div>Medical Resident</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CREATOR SECTION */}
        <section className="py-16 px-6 text-center bg-[#0f0f1a] border-y border-slate-800/50">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">WHO DEPLOYED ME?</h3>
            <h2 className="text-3xl font-bold mb-6">The Doctor of Digital Systems (DDS)</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Endodontic resident working 50+ hour weeks.
              He didn't build this system for fun. He built it to survive.
              <br /><br />
              "I needed a way to be a high-performing doctor and a present human being without burning out.
              Prompts weren't enough. I needed agents."
            </p>
          </div>
        </section>

        {/* SNEAK PEEK SECTION */}
        <section className="py-16 px-6 bg-[#0f0f1a]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">WHAT YOU'RE ACTUALLY BUYING</h2>
            <p className="text-slate-400">This isn't just theory. You get the raw code to run your life.</p>
            <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl mt-8" />}>
              <SneakPeek />
            </Suspense>
          </div>
        </section>

        {/* PRODUCT WALKTHROUGH */}
        <Suspense fallback={<div className="h-96 animate-pulse bg-slate-800/50" />}>
          <ProductWalkthrough />
        </Suspense>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-24 px-6 bg-[#0f0f1a] relative">
          {/* Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Access Method</h2>
            <p className="text-slate-400 mb-8">Cheaper than one month of that meal kit service you forgot to pause.</p>

            {/* Urgency Timer */}
            <Suspense fallback={null}>
              <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6 mb-8 text-center max-w-2xl mx-auto">
                <div className="text-red-400 font-bold text-lg mb-3">
                  ⏰ Early Bird Pricing Ends In:
                </div>
                <CountdownTimer targetDate="2025-12-15T23:59:59" />
                <p className="text-sm text-slate-300 mt-4">
                  Price increases to <span className="font-bold text-white">$59</span> after December 15th
                </p>
              </div>
            </Suspense>

            {/* Value Anchor */}
            <div className="inline-flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-600 mb-8">
              <div className="text-right border-r border-slate-600 pr-4">
                <div className="text-xs text-slate-400 uppercase font-bold">Human Assistant</div>
                <div className="text-red-400 font-mono line-through">$30/hour</div>
              </div>
              <div className="text-left pl-2">
                <div className="text-xs text-slate-400 uppercase font-bold">AI Agent System</div>
                <div className="text-green-400 font-mono font-bold">$39 (One-time)</div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
            {/* Standard Access */}
            <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-purple-900/20 hover:-translate-y-2">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <CreditCard size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Standard Access</h3>
              <div className="text-4xl font-bold text-white mb-6">$39.99 <span className="text-sm text-slate-400 font-normal">USD</span></div>
              <ul className="space-y-4 mb-8 text-slate-300 flex-1">
                <li className="flex gap-3"><Check size={18} className="text-purple-400 flex-shrink-0" /> <span>Full access to all 5 parts</span></li>
                <li className="flex gap-3"><Check size={18} className="text-purple-400 flex-shrink-0" /> <span>5 Pre-made Agent Prompts</span></li>
                <li className="flex gap-3"><Check size={18} className="text-purple-400 flex-shrink-0" /> <span>Kitchen Optimization Template</span></li>
                <li className="flex gap-3"><Check size={18} className="text-purple-400 flex-shrink-0" /> <span>Household Maintenance Schedule</span></li>
              </ul>

              <div className="space-y-4">
                <button
                  disabled
                  title="Sales resume on December 4th"
                  className="w-full bg-slate-700/50 text-slate-400 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <Lock size={18} />
                  <span>Sales Paused</span>
                </button>
                <div className="flex items-center justify-center gap-4 mt-4 text-slate-400 text-xs">
                  <div className="flex items-center gap-1"><Shield size={12} /> 256-bit SSL Secure</div>
                  <div className="flex items-center gap-1"><CreditCard size={12} /> Stripe Encrypted</div>
                </div>
                <p className="text-xs text-slate-400 text-center mt-2">30-day money-back guarantee. No questions asked.</p>
              </div>
            </div>

            {/* Crypto Access */}
            <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group relative overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-green-900/20 hover:-translate-y-2">
              <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-4 py-1.5 rounded-bl-2xl shadow-lg">
                50% OFF
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Coins size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-green-400">Crypto Access</h3>
              <div className="text-4xl font-bold text-white mb-6">$19.99 <span className="text-sm text-slate-400 font-normal">in ERG</span></div>
              <ul className="space-y-4 mb-8 text-slate-300 flex-1">
                <li className="flex gap-3"><Check size={18} className="text-green-400 flex-shrink-0" /> <span>Everything in Standard Access</span></li>
                <li className="flex gap-3"><Check size={18} className="text-green-400 flex-shrink-0" /> <span>50% Tech Literacy Discount</span></li>
                <li className="flex gap-3"><Check size={18} className="text-green-400 flex-shrink-0" /> <span>"Early Adopter" Badge</span></li>
                <li className="flex gap-3"><Check size={18} className="text-green-400 flex-shrink-0" /> <span>Support decentralized commerce</span></li>
                <li className="flex gap-3"><Check size={18} className="text-green-400 flex-shrink-0" /> <span>Private & Secure</span></li>
              </ul>
              <div className="mt-auto">
                <button
                  disabled
                  title="Sales resume on December 4th"
                  className="w-full bg-slate-700/50 text-slate-400 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  Sales Paused
                </button>
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowCryptoModal(true)}
                    className="text-sm text-green-400 hover:text-green-300 underline decoration-dotted bg-transparent border-none cursor-pointer"
                  >
                    Why pay with Ergo?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 px-6 bg-[#0f0f1a] border-t border-slate-800/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="space-y-8">
              {[
                { q: "Do I need to know how to code?", a: "No. The course teaches you how to use no-code tools and natural language to build your agents." },
                { q: "Is my data secure?", a: "Yes. Part 1 is entirely dedicated to privacy, security, and choosing local-first tools where possible." },
                { q: "What if I use Android/Windows?", a: "The system is platform-agnostic. We use tools that work on all major operating systems." },
                { q: "How much time does it take to set up?", a: "You can build your first agent (Morning Agent) in about 30 minutes. The full system is built progressively over 30 days." }
              ].map((faq, i) => (
                <div key={i} className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-slate-600/50 hover:bg-slate-800/50 transition-colors">
                  <h3 className="font-bold text-lg mb-2 text-slate-200">{faq.q}</h3>
                  <p className="text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 text-center border-t border-slate-800/50 bg-[#0f0f1a]">
          {/* Trust Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 px-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Shield size={16} className="text-green-400" />
              <span>256-bit SSL Secure</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Check size={16} className="text-green-400" />
              <span>30-Day Money-Back</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <CreditCard size={16} className="text-purple-400" />
              <span>Stripe Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Coins size={16} className="text-green-400" />
              <span>Crypto Accepted</span>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <CaptainHero
              size="sm"
              message="I'll be waiting on the other side."
              loading="lazy"
            />
          </div>
          <p className="text-slate-400 text-sm">
            © 2025 Agentic AI at Home. All systems nominal.
          </p>
        </footer>

      </div>

      <Suspense fallback={null}>
        <CryptoExplainerModal isOpen={showCryptoModal} onClose={() => setShowCryptoModal(false)} />
        <RecentPurchases />
      </Suspense>
    </WebbookLayout>
  );
}
