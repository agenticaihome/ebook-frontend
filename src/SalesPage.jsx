import React, { useState } from 'react';
import { Check, CreditCard, Coins, Lock, Zap, Shield, Activity, Database, Terminal, Loader2, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import WebbookLayout from './components/layout/WebbookLayout';
import CaptainHero from './components/CaptainHero';
import TimeBackCalculator from './components/landing/TimeBackCalculator';
import BeforeAfterComparison from './components/landing/BeforeAfterComparison';
import { api } from './services/api';

export default function SalesPage() {
  const [email, setEmail] = useState('');
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  const navigate = useNavigate();

  const handleErgoPayment = () => {
    navigate('/pay-ergo');
  };

  const handleStripePayment = async () => {
    if (!email || !email.includes('@')) {
      setStripeError("Please enter a valid email address.");
      return;
    }

    setIsStripeLoading(true);
    setStripeError(null);

    try {
      const result = await api.createStripeCheckout(email);
      if (result.success && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        setStripeError("Failed to initialize checkout. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStripeError(err.message || "Connection error. Please try again.");
    } finally {
      setIsStripeLoading(false);
    }
  };

  return (
    <WebbookLayout>
      <div className="min-h-screen bg-[#0f0f1a] text-white font-sans selection:bg-cyan-500/30">

        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-10 w-64 h-64 bg-teal-900/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left: Captain E */}
            <div className="flex justify-center md:justify-end order-2 md:order-1">
              <CaptainHero
                size="lg"
                className="scale-100 md:scale-110"
                message="You're running on 4 hours of sleep and cold coffee. Let's work with what we've got."
                videoSrc="/assets/captain-waving.mp4?v=new"
                imageSrc="/assets/captain-efficiency-dark.png" // Fallback
              />
            </div>

            {/* Right: Copy */}
            <div className="order-1 md:order-2 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/50 text-cyan-400 text-xs font-mono mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                SYSTEM ONLINE
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                Reclaim 10 Hours/Week with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">AI Agents.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0"
              >
                The interactive webbook that teaches busy parents how to build a "Household Staff" of autonomous AI agents.
                <br /><br />
                Stop drowning in tasks. Start deploying agents.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link
                  to="/part1"
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-900/50 flex items-center justify-center gap-2"
                >
                  <Zap size={20} /> Read Part 1 for Free
                </Link>
                <button
                  onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Get Full Access
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* COURSE OVERVIEW SECTION */}
        <section id="course-overview" className="py-24 bg-[#131320] border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">YOUR MISSION: 5 PARTS TO FULL EFFICIENCY</h2>
              <p className="text-slate-400 max-w-2xl mx-auto mb-4">
                A systematic progression from basic tools to a fully autonomous Household Autopilot.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                <span className="text-green-400 font-bold text-sm">✓ Part 1 is FREE</span>
                <span className="text-slate-500 text-xs">• Parts 2-5 unlock with purchase</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { id: '01', title: 'FOUNDATIONS', desc: 'AI Stack & Privacy', icon: <Terminal />, status: 'FREE', link: '/part1' },
                { id: '02', title: 'DAILY OPS', desc: 'Morning, Kitchen, Home', icon: <Zap />, status: 'LOCKED' },
                { id: '03', title: 'DIGITAL LIFE', desc: 'Email, Calendar, Finance', icon: <Activity />, status: 'LOCKED' },
                { id: '04', title: 'HEALTH', desc: 'Recovery & Second Brain', icon: <Shield />, status: 'LOCKED' },
                { id: '05', title: 'LIFE OS', desc: 'Multi-Agent Systems', icon: <Database />, status: 'LOCKED' }
              ].map((part, index) => (
                <Link
                  to={part.link || '#pricing'}
                  key={index}
                  className={`
                    relative p-6 rounded-2xl border transition-all group hover:-translate-y-1
                    ${part.status === 'FREE'
                      ? 'bg-green-900/20 border-green-500/50 hover:bg-green-900/30 cursor-pointer'
                      : part.status === 'OPEN'
                        ? 'bg-cyan-900/20 border-cyan-500/50 hover:bg-cyan-900/30 cursor-pointer'
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 cursor-not-allowed opacity-75'}
                  `}
                >
                  <div className="text-xs font-mono text-slate-500 mb-2">PART {part.id}</div>
                  <div className={`mb-4 ${part.status === 'FREE' ? 'text-green-400' : part.status === 'OPEN' ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {part.icon}
                  </div>
                  <div className="font-bold text-sm mb-1">{part.title}</div>
                  <div className="text-xs text-slate-500">{part.desc}</div>
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
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <div className="bg-cyan-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-cyan-400">
                  <Activity size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Recovery-Aware Agent</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  "When your toddler keeps you up all night, your AI automatically adjusts your schedule."
                </p>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li className="flex gap-2"><Check size={16} className="text-cyan-500" /> Sleep/Energy tracking</li>
                  <li className="flex gap-2"><Check size={16} className="text-cyan-500" /> Red/Yellow/Green day protocols</li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-colors">
                <div className="bg-purple-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-purple-400">
                  <Database size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Second Brain Agent</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  "Upload 50 case files → searchable database indexed by diagnosis, treatment, and outcome."
                </p>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li className="flex gap-2"><Check size={16} className="text-purple-500" /> Instant document retrieval</li>
                  <li className="flex gap-2"><Check size={16} className="text-purple-500" /> Study systems for exams</li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-colors">
                <div className="bg-green-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-green-400">
                  <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Household Autopilot</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  "Not just automation — a strategic brain that coordinates everything toward your goals."
                </p>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li className="flex gap-2"><Check size={16} className="text-green-500" /> Multi-agent coordination</li>
                  <li className="flex gap-2"><Check size={16} className="text-green-500" /> Goal Hierarchy alignment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TRANSFORMATION SECTION */}
        <section className="py-24 px-6 bg-[#131320] border-y border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">FROM CHAOS TO SYSTEM</h2>
              <p className="text-slate-400">Stop fighting entropy. Start managing it.</p>
            </div>
            <BeforeAfterComparison />
          </div>
        </section>

        {/* CALCULATOR SECTION */}
        <section className="py-24 px-6 bg-[#0f0f1a]">
          <div className="max-w-4xl mx-auto">
            <TimeBackCalculator />
          </div>
        </section>

        {/* RESULTS SECTION */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-5xl mx-auto bg-slate-800/50 rounded-3xl p-8 md:p-12 border border-slate-700 backdrop-blur-sm relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
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
                <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <p className="text-slate-400 italic text-sm">
                    "These are real results from the DDS household. Your results begin when you unlock the system."
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

        {/* CREATOR SECTION */}
        <section className="py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">WHO DEPLOYED ME?</h3>
            <h2 className="text-3xl font-bold mb-6">The Doctor of Digital Systems (DDS)</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Endodontic resident working 50+ hour weeks. Father of two under two.
              He didn't build this system for fun. He built it to survive.
              <br /><br />
              "I needed a way to be a present father and a high-performing doctor without burning out.
              Prompts weren't enough. I needed agents."
            </p>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-24 px-6 bg-[#131320]">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Access Method</h2>
            <p className="text-slate-400">Cheaper than one month of that meal kit service you forgot to pause.</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Standard Access */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <CreditCard size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Standard Access</h3>
              <div className="text-4xl font-bold text-white mb-6">$40 <span className="text-sm text-slate-400 font-normal">USD</span></div>
              <ul className="space-y-4 mb-8 text-slate-300 flex-1">
                <li className="flex gap-3"><Check size={18} className="text-purple-400" /> Full access to all 5 parts</li>
                <li className="flex gap-3"><Check size={18} className="text-purple-400" /> Immediate unlock</li>
                <li className="flex gap-3"><Check size={18} className="text-purple-400" /> Secure Stripe Checkout</li>
              </ul>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2 text-left">Your Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                {stripeError && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg">
                    <AlertCircle size={16} />
                    {stripeError}
                  </div>
                )}

                <button
                  onClick={handleStripePayment}
                  disabled={isStripeLoading}
                  className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  {isStripeLoading ? <Loader2 className="animate-spin" /> : 'Get Instant Access'}
                </button>
                <p className="text-xs text-slate-500">Secure payment via Stripe. 30-day money-back guarantee.</p>
              </div>
            </div>

            {/* Crypto Access */}
            <div className="bg-slate-800 rounded-2xl p-8 border-2 border-green-500/50 hover:border-green-400 transition-all group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                50% OFF
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Coins size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-green-400">Crypto Access</h3>
              <div className="text-4xl font-bold text-white mb-6">$20 <span className="text-sm text-slate-400 font-normal">in ERG</span></div>
              <ul className="space-y-4 mb-8 text-slate-300 flex-1">
                <li className="flex gap-3"><Check size={18} className="text-green-400" /> 50% Tech Literacy Discount</li>
                <li className="flex gap-3"><Check size={18} className="text-green-400" /> Support decentralized commerce</li>
                <li className="flex gap-3"><Check size={18} className="text-green-400" /> Private & Secure</li>
              </ul>
              <div className="mt-auto">
                <button
                  onClick={handleErgoPayment}
                  className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-green-900/20"
                >
                  Pay with ERG
                </button>
                <div className="mt-4 text-center">
                  <Link to="/why-ergo" className="text-sm text-green-400 hover:text-green-300 underline decoration-dotted">
                    Why pay with Ergo?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 px-6 bg-[#0f0f1a] border-t border-slate-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="space-y-8">
              {[
                { q: "Do I need to know how to code?", a: "No. The course teaches you how to use no-code tools and natural language to build your agents." },
                { q: "Is my data secure?", a: "Yes. Part 1 is entirely dedicated to privacy, security, and choosing local-first tools where possible." },
                { q: "What if I use Android/Windows?", a: "The system is platform-agnostic. We use tools that work on all major operating systems." },
                { q: "How much time does it take to set up?", a: "You can build your first agent (Morning Agent) in about 30 minutes. The full system is built progressively over 30 days." }
              ].map((faq, i) => (
                <div key={i} className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
                  <h3 className="font-bold text-lg mb-2 text-slate-200">{faq.q}</h3>
                  <p className="text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 text-center border-t border-slate-800">
          <div className="flex justify-center mb-6">
            <CaptainHero
              size="sm"
              message="I'll be waiting on the other side."
              imageSrc="/assets/captain-efficiency-dark.png"
            />
          </div>
          <p className="text-slate-500 text-sm">
            © 2025 Agentic AI at Home. All systems nominal.
          </p>
        </footer>

      </div>
    </WebbookLayout>
  );
}
