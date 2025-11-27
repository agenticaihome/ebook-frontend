import React, { useState } from 'react';
import { Check, CreditCard, Coins, Lock, Zap, Shield, Activity, Database, Terminal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import WebbookLayout from './components/layout/WebbookLayout';
import CaptainHero from './components/CaptainHero';

export default function SalesPage() {
  const [email, setEmail] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('initial');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleErgoPayment = () => {
    navigate('/pay-ergo');
  };

  const handleStripePayment = () => {
    // Placeholder for Stripe logic
    alert("Stripe integration coming soon!");
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
                className="scale-125 md:scale-150 transform translate-y-10"
                message="SYSTEM ONLINE. Efficiency protocols engaged."
                imageSrc="/assets/captain-efficiency-dark.png"
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
                Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">human.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0"
              >
                I'm <strong>Captain Efficiency</strong>. I was deployed by the DDS after he hit critical failure.
                Now I'm here to help you build your own team of AI agents.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <button
                  onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-cyan-900/50 flex items-center justify-center gap-2"
                >
                  <Lock size={20} /> UNLOCK ACCESS — $40
                </button>
                <button
                  onClick={handleErgoPayment}
                  className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-900/50 flex items-center justify-center gap-2"
                >
                  <Coins size={20} /> PAY WITH ERGO — $20
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MISSION BRIEFING SECTION */}
        <section className="py-24 bg-[#131320] border-y border-slate-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">YOUR MISSION: 5 PARTS TO FULL EFFICIENCY</h2>
              <p className="text-slate-400">Unlock all 5 parts. I'll guide you through each one.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { id: '01', title: 'DIAGNOSIS', icon: <Activity />, status: 'OPEN', link: '/part1' },
                { id: '02', title: 'TREATMENT', icon: <Zap />, status: 'LOCKED' },
                { id: '03', title: 'PRODUCTIVITY', icon: <Terminal />, status: 'LOCKED' },
                { id: '04', title: 'WELLNESS', icon: <Shield />, status: 'LOCKED' },
                { id: '05', title: 'ADVANCED', icon: <Database />, status: 'LOCKED' }
              ].map((part, index) => (
                <Link
                  to={part.link || '#pricing'}
                  key={index}
                  className={`
                    relative p-6 rounded-2xl border transition-all group
                    ${part.status === 'OPEN'
                      ? 'bg-cyan-900/20 border-cyan-500/50 hover:bg-cyan-900/30 cursor-pointer'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 cursor-not-allowed opacity-75'}
                  `}
                >
                  <div className="text-xs font-mono text-slate-500 mb-2">PART {part.id}</div>
                  <div className={`mb-4 ${part.status === 'OPEN' ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {part.icon}
                  </div>
                  <div className="font-bold text-sm mb-2">{part.title}</div>
                  <div className="absolute top-4 right-4">
                    {part.status === 'LOCKED' && <Lock size={14} className="text-slate-600" />}
                  </div>
                </Link>
              ))}
            </div>
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
                    "7-8 hours/week recovered",
                    "44 emails → 2-3 emails daily",
                    "$30-40/week grocery savings",
                    "'What's for dinner?' eliminated"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="text-green-400 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <p className="text-slate-400 italic text-sm">
                    "These are real results from my creator's household. Your results begin when you unlock the system."
                  </p>
                  <div className="mt-2 text-cyan-400 font-bold text-sm">— Captain E</div>
                </div>
              </div>
              <div className="flex justify-center">
                <CaptainHero
                  size="md"
                  message="Efficiency is not optional. It's the objective."
                  imageSrc="/assets/captain-efficiency-dark.png"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CREATOR SECTION */}
        <section className="py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">WHO DEPLOYED ME?</h3>
            <h2 className="text-3xl font-bold mb-6">The Dad Deploying Systems (DDS)</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Army veteran. Father of two under two. He built me at midnight between feedings when chaos hit critical.
              He built the system. I deliver it. You benefit.
            </p>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-24 px-6 bg-[#131320]">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Access Method</h2>
            <p className="text-slate-400">I don't judge your payment method. I only judge inefficiency.</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Standard Access */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <CreditCard size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Standard Access</h3>
              <div className="text-4xl font-bold text-white mb-6">$40 <span className="text-sm text-slate-400 font-normal">USD</span></div>
              <ul className="space-y-4 mb-8 text-slate-300">
                <li className="flex gap-3"><Check size={18} className="text-purple-400" /> Full access to all 5 parts</li>
                <li className="flex gap-3"><Check size={18} className="text-purple-400" /> Immediate unlock</li>
                <li className="flex gap-3"><Check size={18} className="text-purple-400" /> Secure Stripe Checkout</li>
              </ul>
              <button
                onClick={handleStripePayment}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white py-4 rounded-xl font-bold transition-colors"
              >
                Pay with Card
              </button>
            </div>

            {/* Crypto Access */}
            <div className="bg-slate-800 rounded-2xl p-8 border-2 border-green-500/50 hover:border-green-400 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                50% OFF
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Coins size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-green-400">Crypto Access</h3>
              <div className="text-4xl font-bold text-white mb-6">$20 <span className="text-sm text-slate-400 font-normal">in ERG</span></div>
              <ul className="space-y-4 mb-8 text-slate-300">
                <li className="flex gap-3"><Check size={18} className="text-green-400" /> 50% Discount applied</li>
                <li className="flex gap-3"><Check size={18} className="text-green-400" /> Support decentralized commerce</li>
                <li className="flex gap-3"><Check size={18} className="text-green-400" /> Private & Secure</li>
              </ul>
              <button
                onClick={handleErgoPayment}
                className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-green-900/20"
              >
                Pay with ERG
              </button>
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
