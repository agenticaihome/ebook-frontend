import React, { useState } from 'react';
import { Check, Shield, Zap, Book, Lock, AlertCircle, Download, Coins, CreditCard, ArrowRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SalesPage() {
  const [currentPage, setCurrentPage] = useState('home');
  const [email, setEmail] = useState('');
  const [ergoPriceInfo, setErgoPriceInfo] = useState(null);
  const [ergoRequestId, setErgoRequestId] = useState(null);
  const [ergoPayUrl, setErgoPayUrl] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('initial'); // initial, processing, awaiting, confirmed, failed
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND_URL = 'https://ebook-backend-production-8f68.up.railway.app';

  const handleGetFree = () => {
    window.open('/part1.pdf', '_blank');
  };

  // Stripe Payment Flow
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
        // Redirect to Stripe Checkout
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

  // Ergo Payment Flow - Start
  const handleErgoPayment = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setShowModal(true);
    setPaymentStatus('processing');
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/payment/ergo/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        setErgoRequestId(data.requestId);
        setErgoPayUrl(data.ergoPayUrl);  // ErgoPay URL from TokenJay
        setErgoPriceInfo({
          ergAmount: data.ergAmount,
          ergPriceUsd: data.ergPriceUsd,
          totalUsd: data.totalUsd,
          walletAddress: data.walletAddress
        });
        setPaymentStatus('awaiting');

        // Start polling for payment confirmation
        startPaymentPolling(data.requestId);
      } else {
        setError(data.error || 'Failed to create Ergo payment request');
        setPaymentStatus('initial');
        setShowModal(false);
      }
    } catch (err) {
      console.error('Ergo payment error:', err);
      setError('Network error. Please try again.');
      setPaymentStatus('initial');
      setShowModal(false);
    }
  };

  // Poll payment status
  const startPaymentPolling = (requestId) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/payment/ergo/status/${requestId}`);
        const data = await response.json();

        if (data.success && data.state === 'EXECUTED') {
          clearInterval(interval);
          setPaymentStatus('confirmed');
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 3000); // Poll every 3 seconds

    // Stop polling after 15 minutes
    setTimeout(() => clearInterval(interval), 15 * 60 * 1000);
  };

  const closeModal = () => {
    setShowModal(false);
    setPaymentStatus('initial');
    setErgoRequestId(null);
    setErgoPayUrl(null);
    setError(null);
  };

  // Render Why Ergo page
  if (currentPage === 'why-ergo') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <button
            onClick={() => setCurrentPage('home')}
            className="mb-8 flex items-center text-purple-600 hover:text-purple-700 font-semibold"
          >
            <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
            Back to Home
          </button>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
              Why Pay with <span className="text-green-600">Ergo</span>?
            </h1>

            <div className="prose prose-lg max-w-none">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-green-800 mb-4">💰 50% Discount for Crypto Users!</h2>
                <p className="text-green-900 text-xl">
                  Pay <strong>$20 USD</strong> in ERG instead of $40 via credit card. We reward tech-savvy early adopters who value privacy and decentralization.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">🔒 Why Ergo is Better Than Credit Cards:</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <Shield className="w-8 h-8 text-green-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy Protection</h3>
                    <p className="text-gray-700">
                      No credit card numbers, no personal data shared with payment processors. Your purchase is pseudonymous - only you and the blockchain know.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Coins className="w-8 h-8 text-green-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Lower Fees = Lower Price</h3>
                    <p className="text-gray-700">
                      Credit card processors take 3-5% + fees. Ergo transactions cost pennies. We pass the savings directly to you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Lock className="w-8 h-8 text-green-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Chargebacks or Fraud</h3>
                    <p className="text-gray-700">
                      Blockchain payments are final and secure. No risk of stolen credit cards or fraudulent disputes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Zap className="w-8 h-8 text-green-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Direct & Immediate</h3>
                    <p className="text-gray-700">
                      Payment goes directly from your wallet to mine. No middlemen, no delays, no banks involved.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">🌍 What is Ergo?</h2>
              <p className="text-gray-700 mb-4">
                Ergo (ERG) is a proof-of-work cryptocurrency focused on privacy, security, and efficiency. It's designed for real-world financial applications with:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>True decentralization</strong> - No pre-mine, no ICO, fair launch</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Privacy features</strong> - Optional privacy for transactions</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Efficient</strong> - Low fees, fast confirmations (~2 minutes)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Sustainable</strong> - Energy-efficient mining</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">📱 How to Get ERG:</h2>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <ol className="space-y-3 text-gray-700">
                  <li><strong>1. Get a wallet:</strong> Download <a href="https://nautilus.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Nautilus Wallet</a> (Chrome extension) or <a href="https://ergoplatform.org/en/get-erg/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">SAFEW</a></li>
                  <li><strong>2. Buy ERG:</strong> Use exchanges like <a href="https://www.gate.io" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Gate.io</a>, <a href="https://www.coinex.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">CoinEx</a>, or decentralized options</li>
                  <li><strong>3. Send to your wallet:</strong> Withdraw ERG from exchange to your wallet address</li>
                  <li><strong>4. Pay here:</strong> Scan QR code when purchasing - it's that easy!</li>
                </ol>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-3">🎁 Special Offer for ERG Users</h3>
                <p className="text-purple-900 mb-4">
                  As a thank you for supporting decentralized payments, you get <strong>50% off the regular price</strong>. That's $20 instead of $40!
                </p>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="bg-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-700 transition transform hover:scale-105"
                >
                  Get Started with ERG Payment →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🚀 2026's Most Important Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Stop Managing Your Life.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Start Living It.
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover how autonomous AI agents can save you 15+ hours per week, reduce stress,
            and handle the mental load of modern life—while protecting your privacy.
          </p>


        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-8 text-white shadow-xl relative z-10">
                <div className="text-center">
                  <Book className="w-20 h-20 mx-auto mb-4 opacity-90" />
                  <h2 className="text-3xl font-bold mb-2">AGENTIC AI AT HOME</h2>
                  <p className="text-purple-100 mb-4">By Data-Driven Dad</p>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                    <p className="text-sm">250+ Pages • 5 Parts • 15 Chapters • 2026 Edition</p>
                  </div>
                </div>
              </div>
              {/* Floating Captain Efficiency */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 z-20 hidden md:block animate-bounce-slow">
                <img src="/captain_hero.png" alt="Captain Efficiency" className="w-full h-full object-contain drop-shadow-2xl" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn:</h3>
            <ul className="space-y-3">
              {[
                'Set up your first AI agent in under 30 minutes',
                'Automate morning routines, meals, and household tasks',
                'Protect your privacy while using powerful AI tools',
                'Build multi-agent systems that work together',
                'Save $500+/month on groceries, subscriptions, utilities',
                'Reduce decision fatigue and mental overwhelm',
                'Prepare for the AI-powered home of 2026 and beyond'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Captain Efficiency */}
      <div className="max-w-4xl mx-auto mb-12 px-4">
        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-100 rounded-full opacity-50 blur-xl"></div>

          <div className="flex items-start mb-4 relative z-10">
            <div className="mr-6 flex-shrink-0">
              {/* Custom Captain Efficiency SVG */}
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Head */}
                <rect x="20" y="30" width="60" height="50" rx="10" fill="white" stroke="#7C3AED" strokeWidth="3" />
                {/* Eyes */}
                <circle cx="35" cy="50" r="6" fill="#10B981" />
                <circle cx="65" cy="50" r="6" fill="#10B981" />
                {/* Mouth */}
                <path d="M40 70 Q50 75 60 70" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
                {/* Antenna */}
                <line x1="50" y1="30" x2="50" y2="15" stroke="#7C3AED" strokeWidth="3" />
                <circle cx="50" cy="10" r="5" fill="#10B981" />
                {/* Ears/Bolts */}
                <rect x="15" y="45" width="5" height="20" rx="2" fill="#C4B5FD" />
                <rect x="80" y="45" width="5" height="20" rx="2" fill="#C4B5FD" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-900 mb-1">Meet Your AI Sidekick</h3>
              <p className="text-sm text-purple-600 font-semibold mb-2">Captain Efficiency</p>
            </div>
          </div>
          <p className="text-purple-800 italic relative z-10">
            "Beep boop! Captain Efficiency here! I'm your friendly neighborhood robot. I handle the boring stuff—reminders, lists, and math—so you can handle the human stuff."
          </p>
        </div>
      </div>



      {/* Value Proposition: Time & Money Savings */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 md:p-12 text-white mb-12 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">The Real ROI of AI Automation</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">10+</div>
            <div className="text-xl mb-2">Hours Saved Per Week</div>
            <div className="text-purple-200 text-sm">Reclaim 500+ hours/year for what matters</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">$10k+</div>
            <div className="text-xl mb-2">Annual Value</div>
            <div className="text-purple-200 text-sm">From savings, efficiency, and reclaimed time</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">300x</div>
            <div className="text-xl mb-2">Return on Investment</div>
            <div className="text-purple-200 text-sm">$20 investment → Life-changing results</div>
          </div>
        </div>
      </div>

      {/* Inside the Book: Detailed Parts Preview */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">What's Inside the Book</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          A complete system. 15 Chapters. 5 Parts. Zero fluff.
        </p>

        <div className="space-y-8">
          {/* Part 1 */}
          <div className="border-l-4 border-teal-500 pl-6 relative">
            <div className="absolute -left-[1.65rem] top-0 bg-teal-500 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wide transform -translate-y-1/2 shadow-sm">
              Free
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">🚀 Part 1: Introduction & Understanding</h3>
            <p className="text-gray-700 mb-4">
              The foundation. Understand what agents are, how they work, and how to control them safely.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
              <div className="bg-teal-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">🧠 Understanding Agents</p>
                <p className="text-gray-700">The 5 Powers (Perceive, Reason, Plan, Act, Learn). Why 2024-25 changed everything.</p>
              </div>
              <div className="bg-teal-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">🔒 Privacy & Security</p>
                <p className="text-gray-700">The 3 Types of Agents (Cloud vs. Local vs. Sovereign). The 10-Point Security Checklist.</p>
              </div>
            </div>
            <button
              onClick={handleGetFree}
              className="inline-flex items-center text-teal-600 font-bold hover:text-teal-700 hover:underline transition"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Part 1 Now (Free, No Strings Attached)
            </button>
          </div>

          {/* Part 2 */}
          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">📚 Part 2: Getting Started - Your First Agents</h3>
            <p className="text-gray-700 mb-4">
              Build your foundation with three essential agents that handle the chaos of daily life.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">☀️ Morning Agent</p>
                <p className="text-gray-700">Wake up to a 3-minute brief: weather, priorities, and schedule. Start calm, not reactive.</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">🍳 Kitchen Agent</p>
                <p className="text-gray-700">Automated meal planning, smart shopping lists, and grocery coordination. Save ~$530/month.</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">🏠 Home Agent</p>
                <p className="text-gray-700">The "Essential 5" reminders: HVAC, warranties, bills, and supplies. Never miss a due date.</p>
              </div>
            </div>
          </div>

          {/* Part 3 */}
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">💼 Part 3: Work & Productivity</h3>
            <p className="text-gray-700 mb-4">
              Reclaim your workday. Move from "firefighting" to focused, high-impact work.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">📧 Email Agent</p>
                <p className="text-gray-700">Smart triage (Urgent vs. Low), auto-draft responses, and follow-up tracking. Inbox Zero on autopilot.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">📅 Calendar Agent</p>
                <p className="text-gray-700">Defend deep work blocks, optimize meeting times, and auto-prep briefings for every call.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">🚀 Work Agent</p>
                <p className="text-gray-700">"Daily Top 3" prioritization, smart scheduling based on energy levels, and project tracking.</p>
              </div>
            </div>
          </div>

          {/* Part 4 */}
          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">❤️ Part 4: Health, Wellness & Learning</h3>
            <p className="text-gray-700 mb-4">
              Use AI to support your physical and mental wellbeing, not just your productivity.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Health & Mental Wellness:</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li className="flex items-start"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" /><strong>Health Agent:</strong> Track meds, symptoms, and appointments</li>
                  <li className="flex items-start"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" /><strong>Mental Health:</strong> Daily check-ins, pattern recognition, and coping strategies</li>
                  <li className="flex items-start"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" /><strong>Privacy First:</strong> Your sensitive data stays secure</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">🎓 Learning Agent:</p>
                <p className="text-gray-700 text-sm mb-2">Turn AI into your personal tutor.</p>
                <p className="text-gray-700 text-sm">Personalized curriculums, adaptive practice schedules, and resource curation for any skill (languages, music, cooking).</p>
              </div>
            </div>
          </div>

          {/* Part 5 */}
          <div className="border-l-4 border-indigo-500 pl-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">🔮 Part 5: Advanced Systems & Future</h3>
            <p className="text-gray-700 mb-4">
              The cutting edge. Coordinate multiple agents into a seamless ecosystem.
            </p>
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">Multi-Agent Coordination:</p>
              <p className="text-gray-700 text-sm mb-2">What happens when your Health Agent tells your Calendar Agent you slept poorly? (Hint: It clears your morning schedule).</p>
              <p className="text-gray-700 text-sm">Plus: Smart Home Revolution and the future of Embodied AI.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Who This Is For */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-8 md:p-12 text-white mb-12 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-8">Is This Book Right for You?</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center"><Check className="w-6 h-6 mr-2" />Perfect For:</h3>
            <ul className="space-y-3">
              <li>✅ Busy professionals drowning in email & meetings</li>
              <li>✅ Parents managing complex family logistics</li>
              <li>✅ Freelancers balancing multiple clients</li>
              <li>✅ Anyone feeling "decision fatigue" by 10 AM</li>
              <li>✅ Privacy-conscious users (sovereign/local options included)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center"><AlertCircle className="w-6 h-6 mr-2" />NOT For:</h3>
            <ul className="space-y-3 text-teal-100">
              <li>❌ People expecting a magic "do everything" button</li>
              <li>❌ Those unwilling to spend 2-3 hours on initial setup</li>
              <li>❌ Enterprise/corporate deployment (this is for personal use)</li>
            </ul>
            <p className="mt-4 text-sm italic">"The gap between understanding and implementation is where most people get stuck. This book bridges that gap."</p>
          </div>
        </div>

        {/* Motivational Graphic */}
        <div className="mt-12 flex justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg transform rotate-1 hover:rotate-0 transition duration-300 max-w-md">
            <img src="/wait_vs_work_graphic.png" alt="Good things happen to those who work" className="w-full object-contain" />
            <p className="text-center text-gray-500 text-sm mt-3 font-medium">Action &gt; Waiting</p>
          </div>
        </div>
      </div>

      {/* Free Part 1 Offer */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white mb-12 shadow-2xl">
        <div className="max-w-3xl mx-auto text-center">
          <Download className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Get Part 1 FREE!</h3>
          <p className="text-xl mb-6 text-green-50">
            Download the introduction and Understanding AI Agents chapters completely free.
            See if this book is right for you!
          </p>
          <button
            onClick={handleGetFree}
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-50 transition transform hover:scale-105 shadow-lg"
          >
            Download Part 1 Free →
          </button>
        </div>
      </div>

      {/* Dual Pricing Section */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get the Complete Ebook</h2>
          <p className="text-xl text-gray-600">Choose your payment method</p>
        </div>

        {/* Email Input with Explanation */}
        <div className="max-w-md mx-auto mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-lg"
            required
          />
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Why email?</strong> We deliver your ebook instantly to your inbox. No spam, no marketing emails—just your purchase.
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* Stripe Option */}
          <div className="border-4 border-gray-200 rounded-2xl p-8 hover:border-purple-400 transition cursor-pointer"
            onClick={handleStripePayment}>
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pay with Card</h3>
              <div className="text-5xl font-bold text-purple-600 mb-2">$40</div>
              <p className="text-gray-600 mb-6">Standard Price</p>
              <div className="space-y-2 text-left mb-6">
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Credit/Debit Card
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Instant Access
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Secure Checkout
                </div>
              </div>
              <button
                className="w-full bg-purple-600 text-white py-4 rounded-lg font-bold hover:bg-purple-700 transition transform hover:scale-105 disabled:opacity-50"
                disabled={paymentStatus === 'processing'}
              >
                {paymentStatus === 'processing' ? 'Processing...' : 'Pay with Card →'}
              </button>
            </div>
          </div>

          {/* Ergo Option */}
          <div className="border-4 border-green-400 rounded-2xl p-8 hover:border-green-600 transition cursor-pointer relative"
            onClick={handleErgoPayment}>
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              50% OFF
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pay with Ergo</h3>
              <div className="text-5xl font-bold text-green-600 mb-2">$20</div>
              <p className="text-gray-600 mb-6">Tech-Literacy Discount</p>
              <div className="space-y-2 text-left mb-6">
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  ERG Cryptocurrency
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Privacy-Focused
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Lower Fees
                </div>
              </div>
              <button
                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition transform hover:scale-105 disabled:opacity-50"
                disabled={paymentStatus === 'processing'}
              >
                {paymentStatus === 'processing' ? 'Processing...' : 'Pay with ERG →'}
              </button>
              <Link
                to="/how-to-buy-ergo"
                className="block w-full mt-3 text-green-600 hover:text-green-700 font-semibold text-sm underline"
              >
                How to Buy Ergo? Step-by-Step Guide →
              </Link>
              <Link
                to="/why-ergo"
                className="block w-full mt-3 text-green-600 hover:text-green-700 font-semibold text-sm underline"
              >
                Why Ergo? Learn more →
              </Link>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 max-w-2xl mx-auto bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Social Proof, Features, etc. - Keep your existing sections */}



      {/* Ergo Payment Modal */}
      {
        showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-8">
              {paymentStatus === 'processing' && (
                <div className="text-center">
                  <Loader className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Calculating Price...</h3>
                  <p className="text-gray-600">Getting live ERG price from CoinGecko</p>
                </div>
              )}

              {paymentStatus === 'awaiting' && ergoPayUrl && (
                <div className="text-center">
                  <Coins className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Pay with Ergo Wallet</h3>

                  {ergoPriceInfo && (
                    <div className="bg-green-50 rounded-lg p-4 mb-6 text-left">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Amount:</span>
                        <span className="font-bold text-xl text-green-700">{ergoPriceInfo.ergAmount.toFixed(4)} ERG</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">ERG Price:</span>
                        <span className="font-bold">${ergoPriceInfo.ergPriceUsd.toFixed(2)} USD</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t-2 border-green-200 pt-2 mt-2">
                        <span>Total:</span>
                        <span className="text-green-600">${ergoPriceInfo.totalUsd.toFixed(2)} USD</span>
                      </div>
                    </div>
                  )}

                  {/* Desktop: Click to open wallet */}
                  <div className="mb-6">
                    <a
                      href={ergoPayUrl}
                      className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition shadow-lg"
                    >
                      <Coins className="w-6 h-6 mr-2" />
                      Open Nautilus Wallet
                    </a>
                    <p className="text-sm text-gray-600 mt-2">
                      ✅ If you have Nautilus/SAFEW installed
                    </p>
                  </div>

                  <div className="my-4 flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  {/* Mobile: Scan QR code */}
                  <div className="bg-white border-4 border-gray-200 rounded-lg p-4 mb-4 inline-block">
                    <p className="text-sm text-gray-600 mb-2">Scan with mobile wallet:</p>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(ergoPayUrl)}`}
                      alt="ErgoPay QR Code"
                      className="w-full max-w-xs mx-auto"
                    />
                  </div>

                  {/* Instructions */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                    <p className="font-semibold text-gray-900 mb-2">📱 How to Pay:</p>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>Desktop:</strong> Click the green button above</p>
                      <p><strong>Mobile:</strong> Scan QR code with your Ergo wallet</p>
                      <p className="pt-2 border-t mt-2 text-xs text-gray-600">Your ebook will be sent automatically after payment!</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center text-purple-600 mb-4">
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    <span className="font-semibold">Waiting for payment...</span>
                  </div>

                  <button
                    onClick={closeModal}
                    className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {paymentStatus === 'confirmed' && (
                <div className="text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-4">Payment Received!</h3>
                  <p className="text-gray-700 mb-6">
                    Check your inbox at <strong>{email}</strong> for your complete ebook (Parts 2-5).
                  </p>
                  <button
                    onClick={closeModal}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      }
    </div >
  );
}
