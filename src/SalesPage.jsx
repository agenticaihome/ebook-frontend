import React, { useState, Suspense } from 'react';
import SEO from './components/SEO';
import { Check, CreditCard, Coins, Lock, Zap, Shield, Activity, Database, Terminal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import WebbookLayout from './components/layout/WebbookLayout';
import CaptainHero from './components/CaptainHero';
import { usePerformanceMode } from './hooks/usePerformanceMode';
import { useScrollTracking } from './hooks/useScrollTracking';
import ReactGA from 'react-ga4';
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
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const navigate = useNavigate();
  const isPerformanceMode = usePerformanceMode();

  // Track scroll depth for engagement insights
  useScrollTracking();

  // Show sticky CTA after scrolling 50% of page
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setShowStickyCTA(scrollPercent > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePaymentClick = () => {
    navigate('/payment-guide');
  };

  return (
    <WebbookLayout>
      <SEO
        title="Agentic AI Home - Build Your AI Team to Reclaim 10+ Hours/Week"
        description="Agentic AI Home teaches you to build AI agents that handle email, calendar, meal planning, and daily tasks. No coding required. Stop drowning in to-do lists."
        canonical="/"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Agentic AI Home - The Agentic AI Adventure",
            "description": "A fun, interactive experience that teaches you to build AI agents for daily life automation. No coding required.",
            "image": "https://agenticaihome.com/assets/logo-new.png",
            "brand": {
              "@type": "Brand",
              "name": "Agentic AI Home"
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
            "name": "Agentic AI Home",
            "url": "https://agenticaihome.com",
            "logo": "https://agenticaihome.com/assets/logo-new.png"
          }
        ]}
      />
      <div className="min-h-screen bg-[#0f0f1a] text-white font-sans selection:bg-teal-500/30">

        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          {/* Background Glows */}
          {!isPerformanceMode && (
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-grid-pattern opacity-40">
              <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#0f0f1a] to-transparent"></div>
              <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0f0f1a] to-transparent"></div>
              <div className="absolute top-20 right-10 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl animate-pulse mix-blend-screen"></div>
              <div className="absolute bottom-0 left-10 w-64 h-64 bg-teal-900/10 rounded-full blur-3xl mix-blend-screen"></div>
            </div>
          )}

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left: Captain Efficiency */}
            <div className="flex justify-center md:justify-end order-2 md:order-1">
              <CaptainHero
                size="lg"
                className="scale-100 md:scale-110"
                message="Hey! Curious about AI but not sure where to start? I've mapped out 15 easy discoveries that'll save you hours every week. Ready to explore?"
                videoSrc="/assets/captain-waving-cyan.mp4?v=cyan"
              />
            </div>

            {/* Right: Copy */}
            <div className="order-1 md:order-2 text-center md:text-left">
              {/* Brand Logo */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-4 justify-center md:justify-start"
              >
                <img
                  src="/assets/logo-new.webp"
                  alt="Agentic AI Home"
                  width="56"
                  height="56"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl"
                />
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                  Agentic AI Home
                </span>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs font-bold tracking-wide mb-6 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                🧭 THE AGENTIC AI ADVENTURE
              </m.div>

              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 block">Reclaim 10+ Hours</span>
                <span className="block text-white">Every Single Week</span>
              </m.h1>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 font-medium"
              >
                <span className="block sm:inline">🤖 Meet Your AI Helpers</span>
                <span className="hidden sm:inline"> • </span>
                <span className="block sm:inline">🎮 Learn by Exploring</span>
                <span className="hidden sm:inline"> • </span>
                <span className="block sm:inline">💻 No Tech Skills Needed</span>
              </m.div>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-400 mb-8 leading-relaxed max-w-md mx-auto md:mx-0"
              >
                15 bite-sized discoveries. No tech jargon. Just practical AI skills that give you back your time.
              </m.p>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link
                  to="/part1"
                  className="btn-shine press-scale bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 flex items-center justify-center gap-3 ring-2 ring-amber-400/20 hover:ring-amber-400/50"
                >
                  <span className="text-2xl">🧭</span>
                  Start Free Adventure
                </Link>
                <div className="text-center sm:text-left text-sm text-slate-400 flex items-center justify-center gap-2">
                  <span className="text-green-400">✓</span> No credit card required
                </div>
              </m.div>

              {/* Social Proof Banner */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 mt-6 text-sm text-slate-400"
              >
                <div className="flex -space-x-2">
                  {['🧑‍💻', '👩‍💼', '👨‍🔬', '👩‍🏫'].map((emoji, i) => (
                    <span key={i} className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm border-2 border-slate-900">
                      {emoji}
                    </span>
                  ))}
                </div>
                <span>
                  <span className="text-amber-400 font-bold">Join 500+ busy professionals</span> reclaiming their time
                </span>
              </m.div>
            </div>
          </div>
        </section>

        {/* WHAT IS AGENTIC AI SECTION */}
        <section className="py-16 px-6 bg-gradient-to-b from-slate-900/50 to-[#0f0f1a]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-900/20 border border-teal-500/30 text-teal-400 text-sm font-bold mb-6">
                🤖 NEW TO AI?
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">What is "Agentic AI"?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                You've heard of ChatGPT. But there's a difference between AI that <span className="text-slate-300">answers questions</span> and AI that <span className="text-teal-400 font-bold">takes action</span>.
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Chatbot */}
              <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">Regular Chatbot</h3>
                <p className="text-slate-400 text-sm mb-4">Answers when you ask</p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="text-slate-500">•</span> You ask a question
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-slate-500">•</span> It gives an answer
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-slate-500">•</span> You do the work
                  </li>
                </ul>
              </div>

              {/* Agent */}
              <div className="bg-gradient-to-br from-teal-900/30 to-orange-900/20 rounded-2xl p-6 border border-teal-500/40">
                <div className="text-3xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-teal-400 mb-2">Agentic AI</h3>
                <p className="text-teal-400/80 text-sm mb-4">Works on your behalf</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="text-teal-400">✓</span> Knows your preferences
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-teal-400">✓</span> Takes action proactively
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-teal-400">✓</span> Works while you sleep
                  </li>
                </ul>
              </div>
            </div>

            {/* One-liner definition */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 text-center">
              <p className="text-lg text-white">
                <span className="text-teal-400 font-bold">"Agentic"</span> = AI that <span className="text-orange-400 font-bold">DOES things</span>, not just <span className="text-slate-400">says things</span>.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                Think personal assistant, not search engine.
              </p>
            </div>
          </div>
        </section>

        {/* SOUND FAMILIAR SECTION */}
        <section className="py-16 px-6 bg-gradient-to-b from-[#0f0f1a] to-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Sound Familiar?</h2>
              <p className="text-slate-400">The daily chaos that drains your energy</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { emoji: '📧', text: "You spend Sunday nights dreading Monday's inbox" },
                { emoji: '📅', text: "Your calendar is full of meetings you didn't choose" },
                { emoji: '📋', text: "You've tried productivity systems that lasted 3 days" },
                { emoji: '🧠', text: "You're the family admin AND work harder than everyone" },
                { emoji: '🔄', text: "Same tasks, every week, forever" },
                { emoji: '😴', text: "Too exhausted to enjoy the time you do have" },
              ].map((item, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-slate-800/40 rounded-xl border border-slate-700/50"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-slate-300">{item.text}</span>
                </m.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="text-xl text-slate-200 font-medium">
                What if friendly AI could handle this for you... <span className="text-yellow-400">so you can focus on what matters?</span>
              </p>
            </div>
          </div>
        </section>

        {/* WHO THIS IS FOR SECTION */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-[#0f0f1a]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-400 text-sm font-bold mb-6">
                🌍 THIS IS FOR EVERYONE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Whether You're <span className="text-purple-400">Curious, Skeptical, or Already Using AI</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                AI isn't just for tech people. It's for anyone who wants to do less busywork and more living.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { emoji: '🤔', title: 'AI Curious', desc: 'Heard the hype but unsure where to start? This is your friendly, zero-jargon introduction to practical AI.', color: 'teal' },
                { emoji: '😰', title: 'AI Skeptics', desc: 'Worried about AI or overwhelmed by the noise? Learn to use it responsibly, respecting its power.', color: 'amber' },
                { emoji: '🚀', title: 'AI Enthusiasts', desc: 'Already using ChatGPT? Go deeper. Build actual systems that work while you sleep.', color: 'cyan' },
                { emoji: '👶', title: 'Complete Beginners', desc: 'Never touched AI? Perfect. We start from zero with Captain Efficiency guiding every step.', color: 'green' },
                { emoji: '👨‍👩‍👧‍👦', title: 'Busy Humans', desc: 'Parents, students, professionals—anyone drowning in tasks. AI gives you back your time.', color: 'purple' },
                { emoji: '🔮', title: 'Future-Proofers', desc: 'AI is changing everything. Learn it now, or get left behind. Your choice.', color: 'orange' },
              ].map((item, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all"
                >
                  <span className="text-3xl mb-4 block">{item.emoji}</span>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </m.div>
              ))}
            </div>

            {/* Universal Message */}
            <div className="mt-10 p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-500/20 text-center">
              <p className="text-xl text-white font-medium">
                <span className="text-purple-400">Bottom line:</span> If you're human and have tasks... this is for you.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
              <Link
                to="/part1"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-purple-500/20"
              >
                <span>🧭</span> Start Your Free Adventure
              </Link>
            </div>
          </div>
        </section>

        {/* WHY AI IS MAGICAL SECTION */}
        <section className="py-20 px-6 bg-[#0f0f1a]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 text-sm font-bold mb-6">
                ✨ THE MAGIC MOMENT
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why AI Feels Like <span className="text-cyan-400">Having Superpowers</span></h2>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-cyan-500/20">
              <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                <p>
                  <span className="text-cyan-400 font-bold">That first time your AI handles a full task for you...</span>
                  <span className="text-slate-400"> it changes something.</span>
                </p>
                <p>
                  You wake up to a <span className="text-white font-medium">perfectly organized inbox</span>.
                  Your grocery list appears <span className="text-white font-medium">before you think about it</span>.
                  Your schedule adjusts itself <span className="text-white font-medium">when life happens</span>.
                </p>
                <p>
                  This isn't sci-fi. This is <span className="text-amber-400 font-bold">what AI can do for you right now</span>—
                  if you know how to set it up.
                </p>
              </div>

              {/* Emotional Journey */}
              <div className="grid md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-700/50">
                <div className="text-center">
                  <div className="text-4xl mb-3">😰</div>
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">Before</div>
                  <div className="text-slate-300">Overwhelmed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">😌</div>
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">After Setup</div>
                  <div className="text-slate-300">Calm</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🚀</div>
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">Long-term</div>
                  <div className="text-slate-300">In Control</div>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-8 p-4 bg-cyan-900/20 rounded-xl border border-cyan-500/20 text-center">
                <p className="text-cyan-400 italic">
                  "Watching tasks happen without you is like discovering you have an invisible team working 24/7."
                </p>
                <p className="text-slate-500 text-sm mt-2">— Every single person who sets up their first AI agent</p>
              </div>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-400 text-sm font-bold mb-6">
                🗺️ YOUR DISCOVERY MAP
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">5 AREAS TO EXPLORE</h2>
              <p className="text-slate-400 max-w-2xl mx-auto mb-4">
                Each area teaches you something valuable. Track your progress, unlock new skills, and learn at your own pace.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm">
                <span className="text-green-400 font-bold text-sm">✓ Start here — it's completely free!</span>
                <span className="text-slate-400 text-xs">• No signup required</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { id: '01', title: 'BASE CAMP', desc: '3 Starter Expeditions', icon: <Terminal />, status: 'FREE', link: '/part1', emoji: '🏕️' },
                { id: '02', title: 'HOMESTEAD VALLEY', desc: '3 Domestic Expeditions', icon: <Zap />, status: 'LOCKED', emoji: '🏠' },
                { id: '03', title: 'DIGITAL FRONTIER', desc: '3 Tech Expeditions', icon: <Activity />, status: 'LOCKED', emoji: '💻' },
                { id: '04', title: 'WELLNESS MOUNTAINS', desc: '3 Health Expeditions', icon: <Shield />, status: 'LOCKED', emoji: '💪' },
                { id: '05', title: 'GRAND COMMAND', desc: '4 Master Expeditions', icon: <Database />, status: 'LOCKED', emoji: '🚀' }
              ].map((part, index) => (
                <Link
                  to={part.link || '#pricing'}
                  key={index}
                  className={`
                    tactical-card p-6 rounded-lg transition-all group hover:-translate-y-1
                    ${part.status === 'FREE'
                      ? 'border-green-500/50 hover:border-green-400 animate-pulse-subtle'
                      : part.status === 'OPEN'
                        ? 'border-teal-500/30 hover:border-teal-400'
                        : 'opacity-90 hover:opacity-100'}
                  `}
                >
                  <div className="text-xs font-mono text-amber-500/80 mb-2">TERRITORY {part.id}</div>
                  <div className={`mb-4 ${part.status === 'FREE' ? 'text-green-400' : part.status === 'OPEN' ? 'text-teal-400' : 'text-slate-500'}`}>
                    {part.icon}
                  </div>
                  <div className="font-bold text-sm mb-1 text-slate-200 group-hover:text-amber-400 transition-colors">{part.title}</div>
                  <div className="text-xs text-slate-400">{part.desc}</div>
                  <div className="absolute top-4 right-4">
                    {part.status === 'FREE' && <span className="text-xs font-mono font-bold text-green-400 bg-green-500/20 px-2 py-1 rounded border border-green-500/30">FREE</span>}
                    {part.status === 'LOCKED' && <Lock size={14} className="text-amber-500/50" />}
                  </div>
                </Link>
              ))}
            </div>

            {/* Progress Teaser */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30">
                <span className="text-2xl">🏅</span>
                <span className="text-amber-400">
                  Reach <span className="font-bold">Pioneer rank</span> to unlock exclusive bonus expeditions
                </span>
              </div>
            </m.div>

            {/* Your Companion Squad */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">🤖 Meet Your AI Helpers</h3>
                <p className="text-slate-400 text-sm">The friendly AI tools you'll discover along the way</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { emoji: '🧠', name: 'Brain', desc: 'Thinks & plans', color: 'purple' },
                  { emoji: '💾', name: 'Memory', desc: 'Never forgets', color: 'cyan' },
                  { emoji: '🤲', name: 'Hands', desc: 'Takes action', color: 'green' },
                  { emoji: '⚡', name: 'Nerves', desc: 'Connects all', color: 'amber' },
                  { emoji: '🛡️', name: 'Guard', desc: 'Protects you', color: 'red' },
                ].map((companion, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-xl border text-center bg-${companion.color}-900/10 border-${companion.color}-500/30 hover:border-${companion.color}-400/50 transition-all backdrop-blur-sm`}
                    style={{
                      background: `rgba(var(--${companion.color}-900), 0.1)`,
                      borderColor: `rgba(var(--${companion.color}-500), 0.3)`
                    }}
                  >
                    <div className="text-3xl mb-2">{companion.emoji}</div>
                    <div className="font-bold text-white text-sm">{companion.name}</div>
                    <div className="text-slate-400 text-xs">{companion.desc}</div>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* DIFFERENTIATORS SECTION */}
        <section className="py-24 px-6 bg-[#0f0f1a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/20 border border-amber-500/30 text-amber-400 text-sm font-mono font-bold mb-6">
                ⚡ WHAT YOU'LL LEARN
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono">YOUR NEW SUPERPOWERS</h2>
              <p className="text-slate-400">Most courses give you information. We give you skills that actually save time.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="tactical-card p-8 rounded-xl hover:border-teal-500/50 transition-all group">
                <div className="bg-teal-900/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-teal-400 border border-teal-500/30">
                  <Activity size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-teal-400 font-mono">Smart Scheduling</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  "When life gets chaotic, your AI helps you instantly reorganize and find time for what matters."
                </p>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex gap-2"><Check size={16} className="text-teal-400" /> Sleep/Energy tracking</li>
                  <li className="flex gap-2"><Check size={16} className="text-teal-400" /> Red/Yellow/Green protocols</li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="tactical-card p-8 rounded-xl hover:border-amber-500/50 transition-all group">
                <div className="bg-amber-900/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-amber-400 border border-amber-500/30">
                  <Database size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-amber-400 font-mono">Personal Memory Bank</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  "Never lose track of important info again. Your AI remembers everything so you don't have to."
                </p>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex gap-2"><Check size={16} className="text-amber-400" /> Instant document retrieval</li>
                  <li className="flex gap-2"><Check size={16} className="text-amber-400" /> Study systems for learning</li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="tactical-card p-8 rounded-xl hover:border-green-500/50 transition-all group">
                <div className="bg-green-900/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-green-400 border border-green-500/30">
                  <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-green-400 font-mono">Task Automation</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  "Set up AI workflows that handle repetitive tasks automatically — emails, reminders, reports, and more."
                </p>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex gap-2"><Check size={16} className="text-green-400" /> Multi-companion workflows</li>
                  <li className="flex gap-2"><Check size={16} className="text-green-400" /> Goal Hierarchy alignment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHY EXPEDITION FORMAT SECTION */}
        <section className="py-20 px-6 bg-[#0f0f1a] bg-grid-pattern">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/20 border border-amber-500/30 text-amber-400 text-sm font-mono font-bold mb-6">
                🎮 WHY MAKE LEARNING AN ADVENTURE?
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-mono">Because Learning Should Feel Rewarding</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Most courses are boring, and boring courses don't get finished. We designed this as an adventure because...
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  emoji: '🧠',
                  title: 'Curiosity Keeps You Going',
                  desc: 'Discovery-based learning makes you want to keep exploring'
                },
                {
                  emoji: '📊',
                  title: 'See Your Real Progress',
                  desc: 'Not just pages read — actual skills you\'ve learned and can use today'
                },
                {
                  emoji: '🎯',
                  title: 'Clear, Achievable Goals',
                  desc: 'Each section has a specific outcome — no vague "best practices"'
                },
                {
                  emoji: '🏆',
                  title: 'You Actually Finish',
                  desc: 'Small wins along the way keep you motivated to the end'
                },
              ].map((item, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="tactical-card p-6 rounded-lg"
                >
                  <span className="text-3xl mb-3 block">{item.emoji}</span>
                  <h3 className="font-bold text-amber-400 mb-2 font-mono">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </m.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="text-slate-300 italic">
                "We don't make it fun because learning should be easy. We make it fun so you actually <span className="text-yellow-400 font-bold">do</span> it."
              </p>
              <p className="text-sm text-slate-500 mt-2">— Captain Efficiency</p>
            </div>

            {/* Frontier Testimonial */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-r from-amber-900/20 to-orange-900/10 rounded-2xl p-8 border border-amber-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🏕️</div>
                <div>
                  <p className="text-lg text-slate-200 italic mb-3">
                    "I went from <span className="text-amber-400 font-bold">Newcomer to Pioneer</span> in 3 weeks.
                    The gamification isn't just fun—it made me actually <span className="text-white font-bold">finish</span> something
                    for once. My morning routine now runs on autopilot."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-lg">👨‍💻</div>
                    <div>
                      <div className="font-bold text-white">Marcus T.</div>
                      <div className="text-sm text-slate-400">Software Engineer, Dad of 2</div>
                    </div>
                    <div className="ml-auto px-3 py-1 bg-amber-500/20 rounded-full text-amber-400 text-xs font-bold">
                      🏅 Pioneer Rank
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* EXPLORER'S GUARANTEE SECTION */}
        <section className="py-20 px-6 bg-[#0f0f1a] border-y border-green-500/30 bg-grid-pattern">
          <div className="max-w-4xl mx-auto">
            <div className="tactical-card rounded-xl p-8 md:p-12 border-green-500/40 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Left: Shield Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-green-900/30 rounded-lg flex items-center justify-center border-2 border-green-500/50">
                      <Shield size={48} className="text-green-400" />
                    </div>
                  </div>

                  {/* Right: Copy */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
                      Our Promise to You
                    </h2>
                    <p className="text-lg text-slate-200 leading-relaxed mb-6">
                      We want you to succeed. Try <span className="font-bold text-green-400">everything</span> for 30 days.
                      If you don't save at least <span className="font-bold text-amber-400">5 hours in Week 1</span>,
                      email us for a <span className="font-bold text-white">full refund</span>.
                      No hoops. No fine print. No questions asked.
                    </p>

                    <div className="tactical-card p-4 mb-4 border-green-500/30 rounded-lg">
                      <p className="text-green-400 font-bold text-center font-mono">
                        "We believe in this so much, the risk is on us — not you."
                      </p>
                      <p className="text-slate-400 text-sm text-center mt-1">— Captain E</p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-400" />
                        <span>Full refund within 30 days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-400" />
                        <span>Keep everything you learned</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-400" />
                        <span>Zero risk to try</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE SECTION */}
        <section className="py-24 px-6 bg-[#0f0f1a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/20 border border-amber-500/30 text-amber-400 text-sm font-mono font-bold mb-6">
                📊 SEE THE DIFFERENCE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">WHY CHOOSE THIS ADVENTURE</h2>
              <p className="text-slate-400">Most courses teach prompts. We help you build real, time-saving skills.</p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto tactical-card rounded-xl p-1">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-teal-500/30">
                    <th className="text-left py-4 px-6 text-slate-400 font-mono font-normal text-sm uppercase tracking-wide">Feature</th>
                    <th className="text-center py-4 px-6 text-slate-400 font-mono font-normal text-sm uppercase tracking-wide">Other Courses</th>
                    <th className="text-center py-4 px-6 bg-amber-900/10 border-l border-r border-amber-500/30">
                      <div className="text-amber-400 font-bold text-base font-mono">The Agentic AI Adventure</div>
                      <div className="text-xs text-slate-400 mt-1">This Expedition</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'No coding required', others: '❌', ours: '✅' },
                    { feature: 'Recovery Companion', others: '❌', ours: '✅' },
                    { feature: 'Second Brain Integration', others: '❌', ours: '✅' },
                    { feature: 'Real-world tested (50+ hr weeks)', others: '❌', ours: '✅' },
                    { feature: 'Multi-Companion workflows', others: '❌', ours: '✅' },
                    { feature: 'Privacy-first approach', others: '⚠️', ours: '✅' },
                    { feature: 'Interactive tools & challenges', others: '❌', ours: '✅' },
                    { feature: 'Price', others: '$199-499', ours: '$40', highlight: true }
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${row.highlight ? 'bg-green-900/10' : ''}`}>
                      <td className="py-4 px-6 text-slate-200 font-medium font-mono text-sm">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-2xl">
                        {row.others === '❌' && <span className="text-red-400">❌</span>}
                        {row.others === '⚠️' && <span className="text-yellow-400">⚠️</span>}
                        {row.others.startsWith('$') && <span className="text-red-400 line-through text-lg">{row.others}</span>}
                      </td>
                      <td className="py-4 px-6 text-center bg-amber-900/5 border-l border-r border-amber-500/20">
                        {row.ours === '✅' && <span className="text-green-400 text-2xl">✓</span>}
                        {row.ours.startsWith('$') && <span className="text-green-400 font-bold text-lg font-mono">{row.ours}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {[
                { feature: 'No coding required', others: false, ours: true },
                { feature: 'Recovery-aware scheduling', others: false, ours: true },
                { feature: 'Second Brain integration', others: false, ours: true },
                { feature: 'Real-world tested (50+ hr weeks)', others: false, ours: true },
                { feature: 'Multi-agent coordination', others: false, ours: true },
                { feature: 'Privacy-first approach', others: 'partial', ours: true },
                { feature: 'Interactive tools & calculators', others: false, ours: true },
                { feature: 'Price', others: '$199-499', ours: '$40' }
              ].map((row, i) => (
                <div key={i} className="bg-slate-800/30 rounded-xl p-4 border border-slate-700">
                  <div className="font-bold text-white mb-3">{row.feature}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xs text-slate-400 mb-2">Other Courses</div>
                      <div className="text-xl">
                        {row.others === false && <span className="text-red-400">❌</span>}
                        {row.others === 'partial' && <span className="text-yellow-400">⚠️</span>}
                        {typeof row.others === 'string' && row.others.startsWith('$') && (
                          <span className="text-red-400 line-through">{row.others}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-center bg-teal-900/20 rounded-lg py-2 border border-teal-500/30">
                      <div className="text-xs text-teal-400 mb-2 font-bold">This System</div>
                      <div className="text-xl">
                        {row.ours === true && <span className="text-green-400">✓</span>}
                        {typeof row.ours === 'string' && row.ours.startsWith('$') && (
                          <span className="text-green-400 font-bold">{row.ours}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <p className="text-slate-300 text-lg mb-6">
                The choice is clear. Get more value for <span className="text-green-400 font-bold">1/5th the price</span>.
              </p>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
              >
                See Pricing Options
              </a>
            </div>
          </div>
        </section>

        {/* WHY NOT JUST USE CHATGPT SECTION */}
        <section className="py-20 px-6 bg-slate-900/50 border-y border-slate-800/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-400 text-sm font-bold mb-6">
                🤖 THE REAL QUESTION
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">"Can't I Just Use ChatGPT for Free?"</h2>
              <p className="text-slate-400">You could. Here's why most people don't get results that way.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* ChatGPT Column */}
              <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                    <span className="text-xl">💬</span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-300">You + ChatGPT</div>
                    <div className="text-xs text-slate-500">Raw potential, no structure</div>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    '"Write me a prompt"',
                    'Forgets everything daily',
                    'One conversation at a time',
                    'You drive every interaction',
                    'Trial and error learning',
                    'Endless YouTube rabbit holes',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                      <span className="text-red-400">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* This System Column */}
              <div className="bg-gradient-to-br from-teal-900/20 to-purple-900/20 rounded-2xl p-6 border border-teal-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xl">⚔️</span>
                  </div>
                  <div>
                    <div className="font-bold text-white">You + This System</div>
                    <div className="text-xs text-teal-400">Structured path to results</div>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    'Pre-built agents ready to deploy',
                    'Memory that persists forever',
                    'Multiple agents working in parallel',
                    'Agents that reach out TO you',
                    'Proven blueprints, not guesswork',
                    '16 focused expeditions, no fluff',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-200 text-sm">
                      <span className="text-green-400">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-10">
              <p className="text-slate-400 text-sm mb-4">
                ChatGPT is a tool. <span className="text-white font-medium">This is the blueprint for using it.</span>
              </p>
              <Link
                to="/part1"
                className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium"
              >
                Try Expedition 1 free and see the difference →
              </Link>
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
        <section id="calculator" className="py-24 px-6 bg-[#0f0f1a]">
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
                  "Go to Territory 1 (100% free, no email required)",
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
                  <Activity className="text-green-400" /> 📊 HERO STATS UNLOCKED
                </h2>
                <ul className="space-y-4">
                  {[
                    "7-8 hours/week recovered (Minimum)",
                    "Inbox Zero made achievable daily",
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
                  <div className="mt-2 text-teal-400 font-bold text-sm">— Captain Efficiency</div>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-900/20 border border-yellow-500/30 text-yellow-400 text-sm font-bold mb-6">
                ⭐ HALL OF HEROES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">FELLOW ADVENTURERS SPEAK</h2>
              <p className="text-slate-400">Real results from people who completed the quest</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-600/50 hover:border-teal-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                  <div className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                    +8 hrs/week
                  </div>
                </div>
                <p className="text-slate-300 mb-4">
                  "The Morning + Kitchen agents <span className="text-teal-400 font-medium">saved me 8 hours in the first week</span>.
                  I meal prep on autopilot now. ROI was instant."
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold">S</div>
                  <div className="text-sm">
                    <div className="font-bold text-white">Sarah T.</div>
                    <div className="text-slate-400">Product Manager • Completed Part 3</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-600/50 hover:border-purple-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                  <div className="bg-purple-500/20 text-purple-400 text-xs font-bold px-3 py-1 rounded-full">
                    Inbox Zero Daily
                  </div>
                </div>
                <p className="text-slate-300 mb-4">
                  "Finally, a course that doesn't just teach prompts. <span className="text-purple-400 font-medium">I hit inbox zero every day now</span> —
                  something I haven't done in 5 years."
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">M</div>
                  <div className="text-sm">
                    <div className="font-bold text-white">Marcus L.</div>
                    <div className="text-slate-400">Software Engineer • Completed All 16</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-600/50 hover:border-green-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                  <div className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                    +2 hrs sleep
                  </div>
                </div>
                <p className="text-slate-300 mb-4">
                  "The Recovery Agent changed everything. <span className="text-green-400 font-medium">I'm sleeping 2 more hours</span> and
                  somehow getting more done. The paradox is real."
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">C</div>
                  <div className="text-sm">
                    <div className="font-bold text-white">Dr. Chen</div>
                    <div className="text-slate-400">Medical Resident • Completed Part 4</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CREATOR SECTION */}
        <section className="py-20 px-6 bg-[#0f0f1a] border-y border-slate-800/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/20 border border-amber-500/30 text-amber-400 text-sm font-bold mb-6">
                👤 WHY I BUILT THIS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">From Overwhelmed to Optimized</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">This isn't a side project. It's the system that saved my sanity.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 rounded-2xl p-8 md:p-10 border border-slate-700/50">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center text-5xl shadow-xl shadow-teal-500/20">
                    🦷
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 justify-center">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">🎖️ Army Vet</span>
                    <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs rounded-full">🦷 Endo Resident</span>
                  </div>
                </div>

                {/* Story */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">Hey, I'm <span className="text-amber-400 font-mono">The DDS</span></h3>
                  <p className="text-teal-400 text-sm mb-6">Army veteran • Endodontic resident • Husband • Dad of 2 under 3</p>

                  <div className="space-y-4 text-slate-300 leading-relaxed">
                    <p>
                      Picture this: <span className="text-white font-medium">50+ hour weeks</span> in residency.
                      Two toddlers at home who don't care about your schedule.
                      A wife who deserves more than a zombie husband.
                      <span className="text-slate-400"> Sound familiar?</span>
                    </p>
                    <p>
                      I tried every productivity app. Every system. Every hack.
                      <span className="text-red-400"> Nothing stuck.</span> Then I discovered what AI could <em>really</em> do—not just answer questions,
                      but <span className="text-teal-400 font-bold">take action on my behalf</span>.
                    </p>
                    <p className="text-lg">
                      <span className="text-amber-400 font-bold">AI is the greatest tool humanity has ever created.</span>
                      <span className="text-slate-400"> But most people use it like a search engine.
                        I built this course to show you how to use it as a </span>
                      <span className="text-white font-medium">personal operations team</span>.
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border-l-4 border-amber-500">
                    <p className="text-white italic">
                      "If I can make this work with 2 kids under 3 and 60-hour weeks...
                      <span className="text-amber-400 font-bold">you can too.</span>"
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-700/50">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">16</div>
                  <div className="text-xs text-slate-400">Chapters Written</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-400">10+</div>
                  <div className="text-xs text-slate-400">Hrs/Week Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">0</div>
                  <div className="text-xs text-slate-400">Coding Required</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">∞</div>
                  <div className="text-xs text-slate-400">Potential Unlocked</div>
                </div>
              </div>
            </div>
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

          <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/20 border border-green-500/30 text-green-400 text-sm font-bold mb-6">
              💰 WHY THIS IS A STEAL
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Less Than a Dinner Out</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Similar courses cost 10-20x more. And they're not nearly as fun or practical.
            </p>

            {/* Value Comparison */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-red-400 line-through text-lg font-bold">$300/mo</div>
                <div className="text-xs text-slate-500">AI Coaching</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-red-400 line-through text-lg font-bold">$500+</div>
                <div className="text-xs text-slate-500">Productivity Courses</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-red-400 line-through text-lg font-bold">$1,000+</div>
                <div className="text-xs text-slate-500">Automation Workshops</div>
              </div>
              <div className="bg-green-900/30 rounded-xl p-4 border border-green-500/40">
                <div className="text-green-400 text-lg font-bold">$39.99</div>
                <div className="text-xs text-green-400/80">This Adventure</div>
              </div>
            </div>

            {/* What You Get */}
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700 max-w-2xl mx-auto mb-8">
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2"><Check size={16} className="text-green-400" /> No subscription</div>
                <div className="flex items-center gap-2"><Check size={16} className="text-green-400" /> No hidden fees</div>
                <div className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Lifetime access</div>
                <div className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Free updates</div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
            {/* Standard Access */}
            <div className="tactical-card rounded-xl p-8 flex flex-col relative overflow-hidden hover:-translate-y-2 transition-all duration-300 group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <CreditCard size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white font-mono">Standard Access</h3>
              <div className="text-4xl font-bold text-amber-400 mb-6">$39.99 <span className="text-sm text-slate-400 font-normal">USD</span></div>
              <ul className="space-y-4 mb-8 text-slate-300 flex-1">
                <li className="flex gap-3"><Check size={18} className="text-teal-400 flex-shrink-0" /> <span>Full access to all 5 Territories</span></li>
                <li className="flex gap-3"><Check size={18} className="text-teal-400 flex-shrink-0" /> <span>5 Pre-made Companion Prompts</span></li>
                <li className="flex gap-3"><Check size={18} className="text-teal-400 flex-shrink-0" /> <span>Kitchen Optimization Template</span></li>
                <li className="flex gap-3"><Check size={18} className="text-teal-400 flex-shrink-0" /> <span>Household Maintenance Schedule</span></li>
              </ul>

              <div className="space-y-4">
                <div className="bg-amber-900/20 border border-amber-500/30 p-3 rounded-lg text-amber-400 text-sm text-center mb-2">
                  <strong className="block mb-1">🚧 Pre-Launch Mode: Live-Beta Testing</strong>
                  Returning users: clear cache for newest updates.
                  <br /><span className="text-xs opacity-80">The New Frontier Is Coming Soon.</span>
                </div>
                <button
                  disabled
                  title="Sales resume soon."
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
            <div className="tactical-card rounded-xl p-8 flex flex-col relative overflow-hidden hover:-translate-y-2 transition-all duration-300 group border-green-500/40">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-400 text-black text-xs font-mono font-bold px-4 py-1.5 rounded-bl-xl shadow-lg">
                50% OFF
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Coins size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-green-400 font-mono">Crypto Access</h3>
              <div className="text-4xl font-bold text-white mb-6">$19.99 <span className="text-sm text-slate-400 font-normal">in ERG</span></div>
              <ul className="space-y-4 mb-8 text-slate-300 flex-1">
                <li className="flex gap-3"><Check size={18} className="text-green-400 flex-shrink-0" /> <span>Everything in Standard Access</span></li>
                <li className="flex gap-3"><Check size={18} className="text-green-400 flex-shrink-0" /> <span>50% Tech Pioneer Discount</span></li>
                <li className="flex gap-3"><Check size={18} className="text-green-400 flex-shrink-0" /> <span>"Early Explorer" Badge</span></li>
                <li className="flex gap-3"><Check size={18} className="text-green-400 flex-shrink-0" /> <span>Support decentralized frontier</span></li>
                <li className="flex gap-3"><Check size={18} className="text-green-400 flex-shrink-0" /> <span>Private & Secure</span></li>
              </ul>
              <div className="mt-auto">
                <div className="bg-amber-900/20 border border-amber-500/30 p-3 rounded-lg text-amber-400 text-sm text-center mb-4">
                  <strong className="block mb-1">🚧 Pre-Launch Mode: Live-Beta Testing</strong>
                  Please do not make purchases yet. Returning users: clear cache for newest updates.
                  <br /><span className="text-xs opacity-80">The New Frontier Is Coming Soon.</span>
                </div>
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
        <section className="py-24 px-6 bg-[#0f0f1a] border-t border-slate-800/50 bg-grid-pattern">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-900/20 border border-teal-500/30 text-teal-400 text-sm font-mono font-bold mb-6 mx-auto flex justify-center">
              🧭 EXPEDITION GUIDE
            </div>
            <h2 className="text-3xl font-bold mb-12 text-center font-mono">COMMON QUESTIONS</h2>
            <div className="space-y-4">
              {[
                { q: "Do I need to know how to code?", a: "No. All expeditions use no-code tools and natural language. If you can type a message, you can build a Companion." },
                { q: "Is my data secure?", a: "Absolutely. Territory 1 is entirely dedicated to privacy, security, and choosing local-first tools. Your data stays yours." },
                { q: "What if I use Android/Windows?", a: "The system is platform-agnostic. All tools work on Mac, Windows, Linux, iOS, and Android." },
                { q: "How much time does it take?", a: "Your first Companion (Morning Agent) takes about 30 minutes. The full expedition unfolds over 30 days at your own pace." },
                { q: "What AI tools do I need?", a: "We cover free and paid options. You can start with just ChatGPT (free tier), but we also teach Claude, Gemini, and local models for privacy." },
                { q: "What are 'Companions' exactly?", a: "Companions are AI agents you build to handle specific life tasks—like a Morning Companion for routines, or a Kitchen Companion for meal planning. Think of them as your digital staff." },
                { q: "Can I track my progress?", a: "Yes! You earn Discovery Points (DP) for completing expeditions, unlock ranks from Newcomer to Commander, and can see your progress on the Territory Map." },
                { q: "Is there a community?", a: "We're building a Discord for explorers to share setups, troubleshoot, and celebrate wins. Early access for purchasers coming soon." }
              ].map((faq, i) => (
                <div key={i} className="tactical-card p-6 rounded-lg hover:border-amber-500/30 transition-all">
                  <h3 className="font-bold text-lg mb-2 text-amber-400 font-mono">{faq.q}</h3>
                  <p className="text-slate-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 border-t border-teal-500/20 bg-[#0f0f1a] bg-grid-pattern">
          <div className="max-w-6xl mx-auto px-6">

            {/* Top Row - Captain + Newsletter */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-4">
                <CaptainHero
                  size="sm"
                  message="Stay curious! Join the adventure. 🧭"
                  loading="lazy"
                />
              </div>

              {/* Newsletter Signup */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email for AI tips..."
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-amber-500/20 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Middle Row - Links + Socials */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 pb-8 border-b border-slate-700/50">

              {/* Quick Links */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                <Link to="/faq" className="hover:text-amber-400 transition-colors">FAQ</Link>
                <Link to="/payment-guide" className="hover:text-amber-400 transition-colors">Payment Guide</Link>
                <Link to="/dashboard" className="hover:text-amber-400 transition-colors">Dashboard</Link>
                <Link to="/games" className="hover:text-amber-400 transition-colors">Games Hub</Link>
                <a href="mailto:support@agenticaihome.com" className="hover:text-amber-400 transition-colors">Contact</a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="https://x.com/agenticaihome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-amber-500/50 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                  aria-label="Follow on X (Twitter)"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a
                  href="https://www.tiktok.com/@agentic_ai_home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-amber-500/50 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                  aria-label="Follow on TikTok"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61584386536838"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-amber-500/50 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                  aria-label="Follow on Facebook"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a
                  href="https://www.reddit.com/user/Captain_Efficiency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-amber-500/50 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                  aria-label="Follow on Reddit"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>
                </a>
              </div>
            </div>

            {/* Trust Badges Row */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                <Shield size={16} className="text-teal-400" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                <Check size={16} className="text-green-400" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                <CreditCard size={16} className="text-amber-400" />
                <span>Stripe Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                <Coins size={16} className="text-green-400" />
                <span>ERG Accepted</span>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-slate-500 text-sm font-mono text-center">
              © 2025 The Agentic AI Adventure. Made for curious minds.
            </p>
          </div>
        </footer>

      </div >

      <Suspense fallback={null}>
        <CryptoExplainerModal isOpen={showCryptoModal} onClose={() => setShowCryptoModal(false)} />
        <RecentPurchases />
      </Suspense>

      {/* Sticky Floating CTA */}
      <m.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showStickyCTA ? 0 : 100, opacity: showStickyCTA ? 1 : 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <Link
          to="/part1"
          className="flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg shadow-orange-900/50 transition-all hover:scale-105"
        >
          <span className="text-lg">🧭</span>
          <span>Start Free</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">Discovery 1</span>
        </Link>
      </m.div>
    </WebbookLayout >
  );
}
