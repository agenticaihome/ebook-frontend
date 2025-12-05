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
        title="Agentic AI at Home - Reclaim 10 Hours/Week"
        description="Build a 'Household Staff' of AI agents and workflows that handle email, calendar, meal planning, and home tasks. Stop drowning in to-do lists."
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
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-grid-pattern opacity-40">
              <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#0f0f1a] to-transparent"></div>
              <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0f0f1a] to-transparent"></div>
              <div className="absolute top-20 right-10 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl animate-pulse mix-blend-screen"></div>
              <div className="absolute bottom-0 left-10 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl mix-blend-screen"></div>
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
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-6 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                🧭 YOUR EXPEDITION AWAITS
              </m.div>

              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight"
              >
                <span className="block text-white mb-2">Your Journey:</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 block mb-2">Reclaim 10 Hours/Week</span>
                <span className="block text-slate-300 text-2xl sm:text-3xl md:text-4xl font-medium font-mono">In 16 Frontier Expeditions</span>
              </m.h1>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 font-medium"
              >
                <span className="block sm:inline">🤖 Build Your AI Personal Staff</span>
                <span className="hidden sm:inline"> • </span>
                <span className="block sm:inline">🎮 Gamified Learning</span>
                <span className="hidden sm:inline"> • </span>
                <span className="block sm:inline">💻 No Coding Required</span>
              </m.div>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0"
              >
                Your first companion is already here. Meet Captain Efficiency, your scout guide
                who'll show you how to recruit a whole team of AI helpers.
                No coding. Just exploration and discovery.
              </m.p>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link
                  to="/part1"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2 group"
                >
                  <span className="text-xl">🧭</span>
                  Begin First Expedition Free
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
                  <span className="text-amber-400 font-bold">50+ explorers</span> already charting the frontier
                </span>
              </m.div>
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
                What if AI could handle most of this... <span className="text-yellow-400">automatically?</span>
              </p>
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
                🗺️ THE FRONTIER MAP
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">5 TERRITORIES TO EXPLORE</h2>
              <p className="text-slate-400 max-w-2xl mx-auto mb-4">
                Each territory unlocks new abilities. Complete expeditions, earn Discovery Points, and rank up.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm">
                <span className="text-green-400 font-bold text-sm">✓ Base Camp (Territory 1) is FREE</span>
                <span className="text-slate-400 text-xs">• Territories 2-5 unlock with full access</span>
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
                        ? 'border-cyan-500/30 hover:border-cyan-400'
                        : 'opacity-90 hover:opacity-100'}
                  `}
                >
                  <div className="text-xs font-mono text-amber-500/80 mb-2">TERRITORY {part.id}</div>
                  <div className={`mb-4 ${part.status === 'FREE' ? 'text-green-400' : part.status === 'OPEN' ? 'text-cyan-400' : 'text-slate-500'}`}>
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
                <h3 className="text-xl font-bold text-white mb-2">🤖 Your Companion Squad</h3>
                <p className="text-slate-400 text-sm">The AI team you'll recruit on your expedition</p>
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
                ⚡ COMPANION ABILITIES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono">YOUR LEGENDARY TOOLKIT</h2>
              <p className="text-slate-400">Most courses give you a sword. We give you an entire expedition crew.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="tactical-card p-8 rounded-xl hover:border-cyan-500/50 transition-all group">
                <div className="bg-cyan-900/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-cyan-400 border border-cyan-500/30">
                  <Activity size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-cyan-400 font-mono">Recovery Companion</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  "When your schedule implodes, your AI helps you instantly replan your calendar and recovery."
                </p>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex gap-2"><Check size={16} className="text-cyan-400" /> Sleep/Energy tracking</li>
                  <li className="flex gap-2"><Check size={16} className="text-cyan-400" /> Red/Yellow/Green protocols</li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="tactical-card p-8 rounded-xl hover:border-amber-500/50 transition-all group">
                <div className="bg-amber-900/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-amber-400 border border-amber-500/30">
                  <Database size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-amber-400 font-mono">Second Brain Companion</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  "Upload 50 documents → searchable database indexed by topic, date, and relevance."
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
                <h3 className="text-xl font-bold mb-4 text-green-400 font-mono">Strategy Companion</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  "Not just automation — a strategic brain that coordinates everything toward your goals."
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
                🎮 WHY THE EXPEDITION FORMAT?
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-mono">This Isn't a Gimmick. It's Strategy.</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Most courses are boring, and boring courses don't get finished. We designed this as an expedition because...
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  emoji: '🧠',
                  title: 'Exploration Is Addictive',
                  desc: 'We use discovery psychology for your benefit, not against you'
                },
                {
                  emoji: '📊',
                  title: 'Discovery Points Show REAL Progress',
                  desc: 'Not just pages read — actual territories you\'ve conquered'
                },
                {
                  emoji: '🎯',
                  title: 'Expeditions = Clear Goals',
                  desc: 'Specific, completable journeys — not endless "best practices"'
                },
                {
                  emoji: '🏆',
                  title: 'You Actually Finish',
                  desc: 'Frontier challenges at each territory keep you engaged until real results'
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
              <p className="text-sm text-slate-500 mt-2">— Cpt. E</p>
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
                      Explorer's 30-Day Guarantee
                    </h2>
                    <p className="text-lg text-slate-200 leading-relaxed mb-6">
                      Try the <span className="font-bold text-green-400">complete expedition</span> for 30 days.
                      If you don't save at least <span className="font-bold text-amber-400">5 hours in Week 1</span>,
                      email us and we'll refund <span className="font-bold text-white">100%</span>.
                      No hoops. No fine print. No questions asked.
                    </p>

                    <div className="tactical-card p-4 mb-4 border-green-500/30 rounded-lg">
                      <p className="text-green-400 font-bold text-center font-mono">
                        "That's how confident we are this works."
                      </p>
                      <p className="text-slate-400 text-sm text-center mt-1">— Cpt. E</p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-400" />
                        <span>Full refund within 30 days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-400" />
                        <span>Keep all Companions either way</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-400" />
                        <span>Zero risk to you</span>
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
                📊 TACTICAL COMPARISON
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">HOW WE STACK UP</h2>
              <p className="text-slate-400">Most courses teach prompts. We build you an expedition crew.</p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto tactical-card rounded-xl p-1">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-teal-500/30">
                    <th className="text-left py-4 px-6 text-slate-400 font-mono font-normal text-sm uppercase tracking-wide">Feature</th>
                    <th className="text-center py-4 px-6 text-slate-400 font-mono font-normal text-sm uppercase tracking-wide">Other Courses</th>
                    <th className="text-center py-4 px-6 bg-amber-900/10 border-l border-r border-amber-500/30">
                      <div className="text-amber-400 font-bold text-base font-mono">Frontier Command</div>
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
                    <div className="text-center bg-cyan-900/20 rounded-lg py-2 border border-cyan-500/30">
                      <div className="text-xs text-cyan-400 mb-2 font-bold">This System</div>
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
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
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
              <div className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-2xl p-6 border border-cyan-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xl">⚔️</span>
                  </div>
                  <div>
                    <div className="font-bold text-white">You + This System</div>
                    <div className="text-xs text-cyan-400">Structured path to results</div>
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
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
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
                  "Go to Territory 1 (100% free, no email required)",
                  "Take the AI Experience Quiz to see where you are",
                  "Use the Mental Load Calculator to quantify your chaos",
                  "See Cpt. E's recommendations",
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
                  <div className="mt-2 text-cyan-400 font-bold text-sm">— Cpt. E</div>
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
              <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-600/50 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                  <div className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                    +8 hrs/week
                  </div>
                </div>
                <p className="text-slate-300 mb-4">
                  "The Morning + Kitchen agents <span className="text-cyan-400 font-medium">saved me 8 hours in the first week</span>.
                  I meal prep on autopilot now. ROI was instant."
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">S</div>
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
        <section className="py-16 px-6 bg-[#0f0f1a] border-y border-slate-800/50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-600 text-slate-300 text-sm font-bold mb-6">
                👤 MEET YOUR GUIDE
              </div>
              <h2 className="text-3xl font-bold mb-2">Built by Someone Who Needed It</h2>
            </div>
            <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-4xl flex-shrink-0">
                  🦷
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-white mb-1">The DDS (Doctor of Digital Systems)</h3>
                  <p className="text-cyan-400 text-sm mb-4">Endodontist • 50+ hour weeks • AI automation nerd</p>
                  <p className="text-slate-300 leading-relaxed">
                    "I didn't build this for fun. I built it to survive residency while still being present for my family.
                    <span className="text-slate-400"> Productivity apps failed me. ChatGPT prompts weren't enough.</span>
                    <span className="text-yellow-400 font-medium"> I needed agents that work while I sleep.</span>"
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-700/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">16</div>
                  <div className="text-xs text-slate-400">Chapters Written</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10+</div>
                  <div className="text-xs text-slate-400">Hours/Week Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-xs text-slate-400">Coding Required</div>
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

          <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-400 text-sm font-bold mb-6">
              🏪 THE ADVENTURER'S GUILD
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path</h2>
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
            <div className="tactical-card rounded-xl p-8 flex flex-col relative overflow-hidden hover:-translate-y-2 transition-all duration-300 group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <CreditCard size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white font-mono">Standard Access</h3>
              <div className="text-4xl font-bold text-amber-400 mb-6">$39.99 <span className="text-sm text-slate-400 font-normal">USD</span></div>
              <ul className="space-y-4 mb-8 text-slate-300 flex-1">
                <li className="flex gap-3"><Check size={18} className="text-cyan-400 flex-shrink-0" /> <span>Full access to all 5 Territories</span></li>
                <li className="flex gap-3"><Check size={18} className="text-cyan-400 flex-shrink-0" /> <span>5 Pre-made Companion Prompts</span></li>
                <li className="flex gap-3"><Check size={18} className="text-cyan-400 flex-shrink-0" /> <span>Kitchen Optimization Template</span></li>
                <li className="flex gap-3"><Check size={18} className="text-cyan-400 flex-shrink-0" /> <span>Household Maintenance Schedule</span></li>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 text-sm font-mono font-bold mb-6 mx-auto flex justify-center">
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
        <footer className="py-12 text-center border-t border-cyan-500/20 bg-[#0f0f1a] bg-grid-pattern">
          {/* Trust Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 px-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
              <Shield size={16} className="text-cyan-400" />
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

          <div className="flex justify-center mb-6">
            <CaptainHero
              size="sm"
              message="I'll be waiting on the other side of the frontier."
              loading="lazy"
            />
          </div>
          <p className="text-slate-400 text-sm font-mono">
            © 2025 Frontier Command. All systems nominal.
          </p>
        </footer>

      </div>

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
          <span className="text-lg">⚔️</span>
          <span>Start Free</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">Chapter 1</span>
        </Link>
      </m.div>
    </WebbookLayout>
  );
}
