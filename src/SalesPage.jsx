import React, { useState } from 'react';
import { Book, Check, Download, AlertCircle, Coins, Shield, Zap, Lock, CreditCard, ArrowRight, LogIn, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import WebbookLayout from './components/layout/WebbookLayout';
import CaptainTip from './components/interactive/CaptainTip';
import InteractiveDiagram from './components/interactive/InteractiveDiagram';
import AgentSimulation from './components/interactive/AgentSimulation';
import ChaosCalculator from './components/ChaosCalculator';
import InfectionDiagnostic from './components/InfectionDiagnostic';

export default function SalesPage() {
  const [email, setEmail] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('initial');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const BACKEND_URL = 'http://localhost:8080';

  const handleStripePayment = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    setPaymentStatus('processing');
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/payment/stripe/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError(data.error || 'Failed to create checkout session');
        setPaymentStatus('initial');
      }
    } catch (err) {
      console.error('Stripe payment error:', err);
      setError('Network error. Please try again.');
      setPaymentStatus('initial');
    }
  };

  const handleErgoPayment = () => {
    navigate('/pay-ergo');
  };

  return (
    <WebbookLayout>
      <div className="min-h-screen sterile-bg relative pb-24">

        {/* Hero Section */}
        <section className="relative pt-20 pb-32 px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block diagnostic-badge px-4 py-2 rounded-full text-sm mb-6"
            >
              🦷 Root Cause Efficiency for the Modern Family
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 medical-heading leading-tight"
            >
              Stop Managing Your Life.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                Start Living It.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              The world's first <strong>Interactive Agentic Webbook</strong>. Discover how a Doctor of Digital Systems uses AI agents to treat the root cause of your time crisis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <Link
                to="/part1"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
              >
                <BookOpen size={20} /> Start Reading Free
              </Link>
              <button
                onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <Zap size={20} className="text-yellow-500" /> Get Full Access
              </button>
            </motion.div>
          </div>

          {/* Abstract Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-20 right-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/2 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
        </section>

        {/* Interactive Problem Statement */}
        <section className="max-w-4xl mx-auto px-4 mb-24">
          <CaptainTip type="warning" title="The Diagnosis" pose="alert">
            Most people think they have a "time management" problem. They don't. They have a <strong>Mental Load Infection</strong>.
            Trying to fix it with a calendar app is like putting a band-aid on a cavity.
          </CaptainTip>

          <InteractiveDiagram
            title="The Root Cause of Chaos"
            steps={[
              {
                label: "Symptoms",
                title: "Surface Level Chaos",
                description: "Missed appointments, rotting groceries, late fees, and constant exhaustion.",
                details: ["Decision Fatigue", "Reactive Mode", "Anxiety"]
              },
              {
                label: "Diagnosis",
                title: "Mental Load Infection",
                description: "The invisible work of managing a household. Remembering, planning, and coordinating takes more energy than doing.",
                details: ["Cognitive Overload", "Context Switching", "Memory Leaks"]
              },
              {
                label: "Treatment",
                title: "Agentic Delegation",
                description: "Offloading the 'management' layer to AI agents. You become the CEO, not the secretary.",
                details: ["Automated Planning", "Proactive Reminders", "Systematic Execution"]
              }
            ]}
          />
        </section>

        {/* Agent Simulation Demo */}
        <section className="bg-slate-900 py-24 text-white mb-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-green-900/50 text-green-400 text-xs font-bold mb-4 border border-green-800">
                  LIVE DEMO
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Your New Staff</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  Imagine waking up and your day is already planned. Your groceries are ordered. Your emails are drafted.
                  This isn't sci-fi. It's <strong>Agentic AI</strong>.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <Zap className="text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">Morning Agent</h3>
                      <p className="text-slate-400 text-sm">Briefs you on weather, schedule, and priorities before you leave bed.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <Shield className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">Home Agent</h3>
                      <p className="text-slate-400 text-sm">Monitors bills, maintenance, and supplies so you never run out.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <AgentSimulation
                  agentName="morning-brief"
                  task="Generate Daily Briefing"
                  steps={[
                    { action: "FETCH", detail: "Weather data for New York: 72°F, Clear" },
                    { action: "SCAN", detail: "Calendar: 3 meetings found" },
                    { action: "PRIORITIZE", detail: "Top Priority: Project Deadline at 5PM" },
                    { action: "COMPILE", detail: "Drafting briefing summary..." },
                    { action: "SEND", detail: "Briefing sent to user's phone" }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Diagnostic Tools */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Assess Your Situation</h2>
            <p className="text-slate-600">Use our clinical tools to measure your household efficiency.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ChaosCalculator />
            <InfectionDiagnostic />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="max-w-5xl mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Choose Your Treatment Plan</h2>
            <p className="text-slate-600 text-lg">One-time payment. Lifetime access to the interactive webbook.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Stripe Card */}
            <div className="glass-card-lg p-8 hover:border-blue-300 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Standard Access</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-900">$40</span>
                  <span className="text-slate-500">USD</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-green-500" /> Instant Access
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-green-500" /> Secure Stripe Checkout
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-green-500" /> All 5 Parts Included
                  </li>
                </ul>

                <div className="mb-6">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 mb-3"
                  />
                  <button
                    onClick={handleStripePayment}
                    disabled={paymentStatus === 'processing'}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {paymentStatus === 'processing' ? 'Processing...' : 'Pay with Card'}
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              </div>
            </div>

            {/* Ergo Card */}
            <div className="glass-card-lg p-8 border-green-200 hover:border-green-400 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                50% OFF
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                  <Coins className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Crypto Access</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-green-600">$20</span>
                  <span className="text-slate-500">USD (in ERG)</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-green-500" /> Privacy Focused
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-green-500" /> No Middlemen
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-green-500" /> Tech-Savvy Discount
                  </li>
                </ul>

                <button
                  onClick={handleErgoPayment}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                >
                  Pay with Ergo
                </button>

                <div className="mt-4 text-center">
                  <Link to="/how-to-buy-ergo" className="text-sm text-green-600 font-medium hover:underline">
                    How to buy Ergo?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </WebbookLayout>
  );
}

function BookOpen({ size, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );
}
