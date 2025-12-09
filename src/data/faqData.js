import React from 'react';
import {
    BookOpen, CreditCard, User, HelpCircle, FileText,
    Cpu, Zap, MessageCircle, CheckCircle, AlertTriangle, Mail, Shield,
    Rocket, Bot, Gamepad2, Users, Wrench, Lightbulb, PenTool
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: <Rocket size={18} /> },
    { id: 'understanding', name: 'Understanding the Webbook', icon: <BookOpen size={18} /> },
    { id: 'payment', name: 'Payment & Pricing', icon: <CreditCard size={18} /> },
    { id: 'account', name: 'Account & Login', icon: <User size={18} /> },
    { id: 'agents', name: 'The AI Agents', icon: <Bot size={18} /> },
    { id: 'games', name: 'Games & Fun', icon: <Gamepad2 size={18} /> },
    { id: 'privacy', name: 'Privacy & Safety', icon: <Shield size={18} /> },
    { id: 'all-ages', name: 'For All Ages', icon: <Users size={18} /> },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: <Wrench size={18} /> },
    { id: 'founder', name: 'Founder Story', icon: <PenTool size={18} /> },
    { id: 'beginner', name: 'Beginner Reassurance', icon: <Lightbulb size={18} /> },
];

export const faqData = [
    // ===== A. GETTING STARTED =====
    {
        id: 'how-to-start',
        category: 'getting-started',
        question: 'How do I start?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Click "Start Free" and begin with Chapter 1 — it's free, no payment needed.</p>
                <p className="mb-4">The first chapter is completely free. You'll meet Captain Efficiency, learn what AI agents are, and decide if this is for you. No credit card. No commitment. Just click and start reading.</p>
            </>
        )
    },
    {
        id: 'what-device',
        category: 'getting-started',
        question: 'What device do I need?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Any device with a web browser — phone, tablet, or computer.</p>
                <p className="mb-4">This is a website, not an app. If you can check your email, you can use this. Works on iPhone, Android, iPad, Mac, Windows, Linux — anything with Chrome, Safari, Firefox, or Edge.</p>
            </>
        )
    },
    {
        id: 'access-chapter-1',
        category: 'getting-started',
        question: 'How do I access Chapter 1 for free?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Visit the homepage and click "Start Free" — no account needed.</p>
                <p className="mb-4">Chapter 1 is unlocked for everyone. You'll get a taste of the webbook before deciding if you want the full course.</p>
                <ol className="list-decimal pl-5 space-y-1 mb-4">
                    <li>Click "Start Free" on the welcome page</li>
                    <li>Chapter 1 opens immediately</li>
                    <li>Read at your own pace</li>
                </ol>
            </>
        )
    },
    {
        id: 'account-for-preview',
        category: 'getting-started',
        question: 'Do I need to create an account to preview?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No — the free preview requires no account.</p>
                <p className="mb-4">Browse Chapter 1 freely. You only create an account when you decide to purchase full access. We don't collect your email until you choose to buy.</p>
            </>
        )
    },
    {
        id: 'after-purchase',
        category: 'getting-started',
        question: 'What happens after I purchase?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">You create an account and get instant access to all 10 chapters.</p>
                <p className="mb-4">After payment (Stripe or Ergo), you'll set a password, then all chapters unlock immediately. Your progress is saved, and you can log in from any device using your email.</p>
            </>
        )
    },
    {
        id: 'where-login',
        category: 'getting-started',
        question: 'Where do I log in if I already purchased?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Click "Login" at the top of any page or go to /login.</p>
                <p className="mb-4">Use the email you purchased with and the password you created. Forgot your password? Click "Claim Your Purchase" on the login page and enter your transaction ID.</p>
            </>
        )
    },

    // ===== B. UNDERSTANDING THE WEBBOOK =====
    {
        id: 'what-is-it',
        category: 'understanding',
        question: 'What exactly is "Agentic AI at Home"?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">An interactive webbook that teaches you to use AI helpers for everyday life.</p>
                <p className="mb-4">Unlike chatbots that just answer questions, AI "agents" take ACTION on your behalf. They don't just tell you what's for dinner — they plan your meals, generate grocery lists, and track your pantry.</p>
                <p className="mb-2 font-bold">You'll learn to build 10 different agents across 10 chapters:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li><strong>Part 1:</strong> Foundations (understanding AI, choosing tools, privacy)</li>
                    <li><strong>Part 2:</strong> Daily Operations (morning routines, kitchen, household)</li>
                    <li><strong>Part 3:</strong> Digital Life (email, calendar, personal finance)</li>
                    <li><strong>Part 4:</strong> Health & Learning (recovery, wellbeing, knowledge)</li>
                    <li><strong>Part 5:</strong> Advanced Systems (multi-agent coordination, Life OS)</li>
                </ul>
            </>
        )
    },
    {
        id: 'who-is-it-for',
        category: 'understanding',
        question: 'Who is this for?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Anyone overwhelmed by the logistics of modern life.</p>
                <ul className="list-none space-y-2 mb-6">
                    <li className="flex items-start gap-2"><CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" /> <strong>Overwhelmed Professionals</strong> drowning in email and meetings</li>
                    <li className="flex items-start gap-2"><CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" /> <strong>Busy Parents</strong> managing household logistics</li>
                    <li className="flex items-start gap-2"><CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" /> <strong>Students</strong> juggling classes and life admin</li>
                    <li className="flex items-start gap-2"><CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" /> <strong>Retirees</strong> who want less paperwork, more living</li>
                    <li className="flex items-start gap-2"><CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" /> <strong>Entrepreneurs</strong> who can't afford a human assistant yet</li>
                </ul>
                <p className="mb-4"><strong>NOT for:</strong> Enterprise AI solutions, learning to code AI, or people unwilling to spend 30 min/week on setup.</p>
            </>
        )
    },
    {
        id: 'not-a-parent',
        category: 'understanding',
        question: "I'm not a parent. Is this still for me?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes! The core problem is universal: Life Admin Fatigue.</p>
                <p className="mb-4">While originally tested by a parent, every template works for anyone:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li><strong>Students:</strong> Use the "Second Brain" for exams</li>
                    <li><strong>Entrepreneurs:</strong> Use the "Email Agent" for clients</li>
                    <li><strong>Retirees:</strong> Use the "Health Agent" for appointments</li>
                </ul>
                <p>Any "family" reference can be swapped for "clients," "pets," or "projects."</p>
            </>
        )
    },
    {
        id: 'technical-skills',
        category: 'understanding',
        question: 'Do I need tech skills?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No coding. If you can send an email, you can do this.</p>
                <p className="mb-4">You need to:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Send an email ✅</li>
                    <li>Use a smartphone app ✅</li>
                    <li>Follow step-by-step instructions ✅</li>
                    <li>Copy and paste text ✅</li>
                </ul>
                <p>That's it. You're not writing code — you're having structured conversations with AI. We provide templates for everything.</p>
            </>
        )
    },
    {
        id: 'ai-tools-needed',
        category: 'understanding',
        question: 'What AI tools do I need?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Any major AI assistant (Claude, ChatGPT, Gemini, or Copilot) — free tiers work.</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li><strong>Claude (Anthropic)</strong> — Recommended, especially for privacy</li>
                    <li><strong>ChatGPT (OpenAI)</strong> — Most popular, lots of integrations</li>
                    <li><strong>Gemini (Google)</strong> — Good if you're in the Google ecosystem</li>
                    <li><strong>Microsoft Copilot</strong> — Good for Microsoft 365 users</li>
                </ul>
                <p className="mb-2"><strong>Minimum cost:</strong> $0/month (free tiers exist)</p>
                <p><strong>Recommended:</strong> $20/month for premium access</p>
            </>
        )
    },
    {
        id: 'time-to-complete',
        category: 'understanding',
        question: 'How long does it take to complete?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">4-6 hours to read, 2-3 months to fully implement.</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li><strong>Week 1-2:</strong> Foundations + Morning/Kitchen agents (2-3 hours)</li>
                    <li><strong>Week 3-4:</strong> Household + Email agents (2-3 hours)</li>
                    <li><strong>Month 2:</strong> Calendar + Finance + Health (3-4 hours)</li>
                    <li><strong>Month 3:</strong> Integration + Life OS (2-3 hours)</li>
                </ul>
                <p className="mb-4"><strong>Total:</strong> 10-15 hours spread over months. After setup, maintenance is 30 min/week.</p>
                <p>You have lifetime access — go at your pace.</p>
            </>
        )
    },
    {
        id: 'results-expect',
        category: 'understanding',
        question: 'What results can I expect?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Most users save 5-10 hours per week once fully implemented.</p>
                <div className="mb-4">
                    <strong className="block text-green-400 mb-1">TIME SAVINGS:</strong>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Conservative: 5-7 hours/week</li>
                        <li>Typical: 7-10 hours/week</li>
                        <li>Full implementation: 10-15 hours/week</li>
                    </ul>
                </div>
                <div className="mb-4">
                    <strong className="block text-green-400 mb-1">SPECIFIC WINS:</strong>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Email: From 2+ hours daily → 30 minutes</li>
                        <li>Meal planning: From 3+ hours weekly → 30 minutes</li>
                        <li>Forgotten bills/appointments: Zero</li>
                    </ul>
                </div>
            </>
        )
    },
    {
        id: 'different-from-others',
        category: 'understanding',
        question: 'How is this different from other AI courses?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">We build a recovery-aware Life Operating System, not just individual hacks.</p>
                <ol className="list-decimal pl-5 space-y-3 mb-4">
                    <li><strong>Recovery-Aware:</strong> Schedules adapt to your actual energy levels (bad sleep = lighter day)</li>
                    <li><strong>Second Brain Integration:</strong> All your knowledge becomes searchable</li>
                    <li><strong>Life Operating System:</strong> All agents work together toward your goals</li>
                </ol>
                <p>Built by someone with 50+ hour clinical weeks and two toddlers — not a guru with unlimited time.</p>
            </>
        )
    },
    {
        id: 'format',
        category: 'understanding',
        question: 'What format is the course in?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">An interactive website with chapters, templates, quizzes, games, and a friendly AI guide.</p>
                <div className="mb-4">
                    <strong className="block text-green-400 mb-1">INCLUDES:</strong>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>16 written chapters</li>
                        <li>Interactive quizzes and calculators</li>
                        <li>Copy-ready templates and prompts</li>
                        <li>Captain Efficiency (your AI mascot guide)</li>
                        <li>30-day action plan</li>
                        <li>Games Hub for fun learning</li>
                    </ul>
                </div>
                <p>NOT a static PDF or video course — it's designed for active implementation.</p>
            </>
        )
    },
    {
        id: 'updates',
        category: 'understanding',
        question: 'Is the content updated?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes — lifetime access includes all future updates.</p>
                <p className="mb-4">AI evolves rapidly, and the course evolves with it. When you purchase:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>All updates included</li>
                    <li>Major tool changes reflected</li>
                    <li>New capabilities added</li>
                    <li>You'll be notified of significant updates</li>
                </ul>
                <p>The principles remain stable even as specific tools change.</p>
            </>
        )
    },

    // ===== C. PAYMENT & PRICING =====
    {
        id: 'cost',
        category: 'payment',
        question: 'How much does it cost?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">$39.99 with card, or $19.99 with Ergo cryptocurrency (50% off).</p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
                        <h4 className="font-bold text-white mb-2">STANDARD: $39.99</h4>
                        <ul className="text-sm text-slate-400 space-y-1">
                            <li>Pay with Credit/Debit Card</li>
                            <li>Instant access</li>
                            <li>Processed securely via Stripe</li>
                        </ul>
                    </div>
                    <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                        <h4 className="font-bold text-green-400 mb-2">CRYPTO: $19.99 (50% OFF)</h4>
                        <ul className="text-sm text-green-200/70 space-y-1">
                            <li>Pay with Ergo (ERG)</li>
                            <li>Same instant access</li>
                            <li>Supports decentralized tech</li>
                        </ul>
                    </div>
                </div>
                <p>Both include full access, all chapters, games, and lifetime updates.</p>
            </>
        )
    },
    {
        id: 'pay-with-card',
        category: 'payment',
        question: 'How do I pay with a credit/debit card?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Click "Get Full Access," enter your email and card details, and you're in.</p>
                <p className="mb-4">We use Stripe — the same secure payment processor used by Amazon, Shopify, and millions of businesses. Your card info goes directly to Stripe; we never see your full card number.</p>
            </>
        )
    },
    {
        id: 'crypto-discount',
        category: 'payment',
        question: 'Why is there a 50% crypto discount?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Lower processing fees + supporting decentralized technology.</p>
                <p className="mb-2"><strong>Economics:</strong> Card processing costs ~$1.50+ per transaction. Ergo costs ~$0.001. We pass savings to you.</p>
                <p className="mb-2"><strong>Philosophy:</strong></p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Every card transaction feeds surveillance economy</li>
                    <li>Every ERG transaction supports decentralization</li>
                    <li>We want to encourage crypto adoption for everyday use</li>
                </ul>
            </>
        )
    },
    {
        id: 'how-to-pay-crypto',
        category: 'payment',
        question: "I've never used crypto. Is it hard?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">About 15-20 minutes to set up the first time — we guide you step-by-step.</p>
                <p className="mb-4">Our Ergo Guide walks you through:</p>
                <ol className="list-decimal pl-5 space-y-1 mb-4">
                    <li>Getting a wallet (Nautilus for Desktop, Terminus for Mobile)</li>
                    <li>Buying ERG (via Banxa or CoinEx)</li>
                    <li>Sending payment (2 minutes)</li>
                </ol>
                <p className="mb-4">Every click is documented with screenshots. Is it worth 15-20 minutes to save $20? That's $60+/hour for your time.</p>
                <Link to="/ergo-guide" className="text-green-400 hover:underline font-bold">Check out the Complete Ergo Guide →</Link>
            </>
        )
    },
    {
        id: 'what-is-ergo',
        category: 'payment',
        question: 'What is Ergo? Is it safe?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Ergo is a legitimate cryptocurrency launched in 2019 — blockchain has never been hacked.</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Built by academic researchers</li>
                    <li>Fair launched (no VC backing)</li>
                    <li>Proof-of-work secured (like Bitcoin)</li>
                    <li>Operating securely for 5+ years</li>
                </ul>
                <Link to="/why-ergo" className="text-green-400 hover:underline font-bold">Read the full 'Why Ergo' explanation →</Link>
            </>
        )
    },
    {
        id: 'other-crypto',
        category: 'payment',
        question: 'Can I pay with Bitcoin or other crypto?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Currently only ERG (Ergo) — Bitcoin fees would eat the discount.</p>
                <p className="mb-4">Bitcoin fees can exceed $5-20 per transaction. We specifically support Ergo adoption. If you have Bitcoin, you can swap for ERG on exchanges like CoinEx.</p>
            </>
        )
    },
    {
        id: 'payment-issues',
        category: 'payment',
        question: 'What if my crypto payment has issues?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Contact us with your Transaction ID — we'll fix it.</p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li><strong>Not Detected:</strong> Wait 5-10 minutes (blockchains take time), check explorer, contact us with TX ID</li>
                    <li><strong>Sent Wrong Amount:</strong> Too much = refund. Too little = send the rest</li>
                    <li><strong>Wrong Address:</strong> Can't reverse, but contact us anyway</li>
                </ul>
                <p>We're not trying to keep your money. We want happy customers.</p>
            </>
        )
    },
    {
        id: 'refund-policy',
        category: 'payment',
        question: 'Is there a refund policy?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes — 30-day satisfaction guarantee, no questions asked.</p>
                <p className="mb-4">If you're not satisfied within 30 days, contact us for a full refund. We ask that you:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Actually try the course (not just skim)</li>
                    <li>Tell us what didn't work (helps us improve)</li>
                    <li>Request within 30 days</li>
                </ul>
                <p>Card refunds go to card; ERG refunds go in ERG. No hassle, no guilt trips.</p>
            </>
        )
    },
    {
        id: 'subscription',
        category: 'payment',
        question: 'Will I be charged monthly?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No — this is a one-time purchase with lifetime access.</p>
                <p>No subscriptions. No recurring fees. No hidden charges. Pay once, access forever, including all future updates.</p>
            </>
        )
    },

    // ===== D. ACCOUNT & LOGIN =====
    {
        id: 'create-account',
        category: 'account',
        question: 'How do I create an account?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Complete your purchase, then set a password — that's your account.</p>
                <ol className="list-decimal pl-5 space-y-1 mb-4">
                    <li>Complete payment (Stripe or Ergo)</li>
                    <li>You'll see a "Create Your Account" screen</li>
                    <li>Choose a password</li>
                    <li>You're logged in immediately</li>
                </ol>
                <p>Confirmation email sent for future logins.</p>
            </>
        )
    },
    {
        id: 'forgot-password',
        category: 'account',
        question: 'I forgot my password. Help!',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Go to the Login page and click "Claim Your Purchase" to recover access.</p>
                <p className="mb-4">Enter your transaction ID (from your payment email) or Ergo transaction ID. This verifies your purchase and lets you reset your password.</p>
                <Link to="/claim-access" className="text-teal-400 hover:underline font-bold">Go to Claim Access →</Link>
            </>
        )
    },
    {
        id: 'paid-no-access',
        category: 'account',
        question: "I paid but can't log in. What happened?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Visit /claim-access and enter your transaction ID to find your account.</p>
                <p className="mb-2">Common causes:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Closed browser before account creation</li>
                    <li>Typo in email address</li>
                    <li>Payment still processing (wait 5-10 minutes)</li>
                </ul>
                <p>The Claim Access page finds your payment and lets you set up your account.</p>
            </>
        )
    },
    {
        id: 'multiple-devices',
        category: 'account',
        question: 'Can I use the same account on multiple devices?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes — log in from any device with your email and password.</p>
                <p>Your progress syncs automatically. Read on your phone, continue on your computer. No limits on devices.</p>
            </>
        )
    },
    {
        id: 'lifetime-access',
        category: 'account',
        question: 'How long do I have access?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Lifetime access — no subscription, no expiration.</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>No subscription fees</li>
                    <li>No expiration date</li>
                    <li>Includes all future updates</li>
                </ul>
                <p>We have no plans to shut down. But if circumstances ever required it, we'd give plenty of notice and downloadable copies.</p>
            </>
        )
    },

    // ===== E. THE AI AGENTS =====
    {
        id: 'what-are-agents',
        category: 'agents',
        question: 'What exactly are "AI agents"?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">AI helpers that take ACTION on your behalf, not just answer questions.</p>
                <p className="mb-4">A regular chatbot says: "Here's a recipe idea."</p>
                <p className="mb-4">An AI agent says: "Based on what's in your pantry, here's this week's meal plan, grocery list, and I've scheduled reminders for prep time."</p>
                <p>Agents work <em>for</em> you, not just <em>with</em> you.</p>
            </>
        )
    },
    {
        id: 'which-agents',
        category: 'agents',
        question: 'What agents will I learn to build?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">10 agents covering every area of daily life:</p>
                <ol className="list-decimal pl-5 space-y-1 mb-4">
                    <li><strong>Morning Agent</strong> — Daily briefings and priority setting</li>
                    <li><strong>Kitchen Agent</strong> — Meal planning, grocery lists, pantry</li>
                    <li><strong>Household Agent</strong> — Maintenance schedules, seasonal tasks</li>
                    <li><strong>Email Agent</strong> — Inbox triage, response drafts</li>
                    <li><strong>Calendar Agent</strong> — Schedule optimization</li>
                    <li><strong>Finance Agent</strong> — Bill tracking, budget monitoring</li>
                    <li><strong>Health Agent</strong> — Appointments, medication tracking</li>
                    <li><strong>Recovery Agent</strong> — Energy-aware scheduling</li>
                    <li><strong>Second Brain Agent</strong> — Knowledge management</li>
                    <li><strong>Life OS Agent</strong> — Coordination between all agents</li>
                </ol>
            </>
        )
    },
    {
        id: 'agents-replace-job',
        category: 'agents',
        question: 'Will AI agents replace my job?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No — these agents help with personal life admin, not job replacement.</p>
                <p className="mb-4">This course teaches personal automation: managing your home, health, and time. It's about reclaiming hours lost to logistics — not replacing human work.</p>
                <p>Think of it as a personal assistant, not a colleague replacement.</p>
            </>
        )
    },
    {
        id: 'agents-safe',
        category: 'agents',
        question: 'Are AI agents safe to use?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes, if you use them thoughtfully — and we teach you exactly how.</p>
                <p className="mb-4">Chapter 3 is entirely about privacy and control. You'll learn:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>What to share vs. protect</li>
                    <li>Privacy tiers framework</li>
                    <li>How to create an "Agent Constitution" (rules for your AI)</li>
                    <li>Which tools are more privacy-respecting</li>
                </ul>
            </>
        )
    },
    {
        id: 'agents-access',
        category: 'agents',
        question: 'Do agents have access to my bank/email automatically?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No — you control exactly what they see.</p>
                <p className="mb-4">Agents only know what you tell them. You can:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Give summary info ("My budget is $500/week") without sharing accounts</li>
                    <li>Use read-only access for some tools</li>
                    <li>Keep sensitive data fully private</li>
                </ul>
                <p>The course teaches "80/20 privacy" — most benefits, minimal exposure.</p>
            </>
        )
    },
    {
        id: 'customize-agents',
        category: 'agents',
        question: 'Can I customize the agents for my situation?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Absolutely — every template is designed for customization.</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Single, no kids? Remove family references</li>
                    <li>Vegan? Tell the Kitchen Agent</li>
                    <li>Night shift? Morning Agent becomes "Pre-Shift Agent"</li>
                </ul>
                <p>The frameworks adapt to YOU, not vice versa.</p>
            </>
        )
    },

    // ===== F. GAMES & FUN =====
    {
        id: 'why-games',
        category: 'games',
        question: 'Why are there games in a learning course?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Games reinforce concepts through play — and they make learning fun!</p>
                <p className="mb-4">Studies show we remember 10% of what we read but 90% of what we do. Games let you practice AI concepts in a low-stakes, enjoyable way.</p>
                <p>Plus, they're just fun! Captain Efficiency believes learning should never be boring.</p>
            </>
        )
    },
    {
        id: 'what-games',
        category: 'games',
        question: 'What games are included?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">A growing collection including clicking challenges, focus games, and AI-themed mini-games.</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li><strong>Captain Click Challenge</strong> — Test your speed and precision</li>
                    <li><strong>Deep Work Dive</strong> — Practice focus and flow</li>
                    <li>More games added over time</li>
                </ul>
                <p>Each game relates to productivity and AI concepts from the course.</p>
            </>
        )
    },
    {
        id: 'games-required',
        category: 'games',
        question: 'Are the games required to complete the course?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No — games are optional fun, not required curriculum.</p>
                <p>You can complete all 10 chapters without touching the Games Hub. Games are there for people who enjoy gamified learning. Skip them if that's not your style.</p>
            </>
        )
    },
    {
        id: 'leaderboard',
        category: 'games',
        question: 'Is there a leaderboard?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes! Compete with other learners for high scores.</p>
                <p className="mb-4">Each game has a leaderboard showing top performers. This is optional — you can play without comparing scores.</p>
                <p>Some people love competition; others prefer solo play. Both are welcome.</p>
            </>
        )
    },
    {
        id: 'games-kids',
        category: 'games',
        question: 'Can kids play the games?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes — games are family-friendly and safe.</p>
                <p>All games are appropriate for all ages. No violence, no inappropriate content, no in-game purchases. Great for families learning together!</p>
            </>
        )
    },

    // ===== G. PRIVACY & SAFETY =====
    {
        id: 'info-safe',
        category: 'privacy',
        question: 'Is my information safe on this site?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes — we use industry-standard encryption and secure payment processing.</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>HTTPS encryption on all pages</li>
                    <li>Stripe handles all card payments (PCI compliant)</li>
                    <li>Ergo payments are blockchain-verified</li>
                    <li>We don't store payment card details</li>
                    <li>Your password is encrypted (we can't see it)</li>
                </ul>
            </>
        )
    },
    {
        id: 'what-data',
        category: 'privacy',
        question: 'What data do you collect about me?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Only what's needed: email, password, purchase history, and course progress.</p>
                <p className="mb-2">We collect:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>✅ Email (to log you in)</li>
                    <li>✅ Password (encrypted)</li>
                    <li>✅ Purchase info (to verify access)</li>
                    <li>✅ Progress (to save your place)</li>
                </ul>
                <p>We DON'T collect or sell personal data for advertising.</p>
            </>
        )
    },
    {
        id: 'ai-access-safe',
        category: 'privacy',
        question: 'Is it safe to give AI access to my personal info?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes, if you do it thoughtfully — and Chapter 3 teaches you exactly how.</p>
                <p className="mb-4">The course includes a complete privacy framework:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Privacy Tiers (what to share, what to protect)</li>
                    <li>Agent Constitution (rules for your AI)</li>
                    <li>Tool comparison (Claude is more private than ChatGPT)</li>
                    <li>80/20 approach (most benefits, minimal exposure)</li>
                </ul>
            </>
        )
    },
    {
        id: 'kids-privacy',
        category: 'privacy',
        question: "What about my kids' privacy?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Never share full names with photos, school names, locations, or medical info about minors.</p>
                <p className="mb-2">Family Privacy Rules from the course:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>❌ Never: Kids' full names + photos</li>
                    <li>❌ Never: School names or addresses</li>
                    <li>❌ Never: Children's medical info</li>
                    <li>✅ Safe: "I have two dependents"</li>
                    <li>✅ Safe: "Pickup at 3pm"</li>
                </ul>
                <p>Your AI doesn't need names to help you plan activities.</p>
            </>
        )
    },
    {
        id: 'sell-data',
        category: 'privacy',
        question: 'Do you sell my data?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No. Never. Period.</p>
                <p>We don't sell, trade, or give your information to third parties. We don't run ads. We don't have marketing partnerships that use your data. Your information stays private.</p>
            </>
        )
    },
    {
        id: 'simple-privacy',
        category: 'privacy',
        question: "What's your privacy policy in simple English?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">We collect only what we need, we don't sell it, and we protect it.</p>
                <ol className="list-decimal pl-5 space-y-1 mb-4">
                    <li>We need your email to log you in</li>
                    <li>We need payment info to sell you the course (handled by Stripe)</li>
                    <li>We save your progress so you can continue later</li>
                    <li>We never sell or share your personal data</li>
                    <li>You can request deletion of your account anytime</li>
                </ol>
            </>
        )
    },

    // ===== H. FOR ALL AGES =====
    {
        id: 'kid-friendly',
        category: 'all-ages',
        question: 'Is this kid-friendly?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes for teens (13+). Younger kids may need parent help.</p>
                <p className="mb-4">The content is written for adults but is clean and appropriate:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Teens can follow independently</li>
                    <li>Kids 10-12 can participate with parent guidance</li>
                    <li>Younger children can enjoy the games</li>
                </ul>
            </>
        )
    },
    {
        id: 'seniors',
        category: 'all-ages',
        question: 'Can seniors use this?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Absolutely — the course moves at your pace and starts from the basics.</p>
                <p className="mb-4">Designed with beginners in mind:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>No assumed tech knowledge</li>
                    <li>Step-by-step instructions</li>
                    <li>Plenty of screenshots</li>
                    <li>Lifetime access (no rush)</li>
                    <li>Email support available</li>
                </ul>
            </>
        )
    },
    {
        id: 'families',
        category: 'all-ages',
        question: 'Is this good for families to learn together?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Great for families — especially parent + teen learning together.</p>
                <p className="mb-4">Many families use this as a bonding activity. Parents bring life experience; teens bring tech comfort. Together, you can build household systems that benefit everyone.</p>
                <p>The Games Hub adds fun family competition!</p>
            </>
        )
    },
    {
        id: 'non-english',
        category: 'all-ages',
        question: "My English isn't perfect. Will I understand?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">We use simple, clear language — no technical jargon.</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Short sentences</li>
                    <li>Common words</li>
                    <li>Explanations for any technical terms</li>
                    <li>Visual aids and examples</li>
                </ul>
                <p>If you face difficulty, email support — we're happy to clarify anything.</p>
            </>
        )
    },
    {
        id: 'inappropriate',
        category: 'all-ages',
        question: 'Is there inappropriate content?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No — everything is safe for all ages.</p>
                <p>No profanity, violence, sexual content, or anything inappropriate. This is a family-safe learning environment. Games are wholesome. Content is professional and friendly.</p>
            </>
        )
    },

    // ===== I. TROUBLESHOOTING =====
    {
        id: 'didnt-unlock',
        category: 'troubleshooting',
        question: "Something didn't unlock after I paid. Help!",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Visit /claim-access and enter your transaction ID.</p>
                <p className="mb-2">Possible causes:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Browser closed before account creation</li>
                    <li>Ergo payment still confirming (wait 5-10 minutes)</li>
                    <li>Session expired</li>
                </ul>
                <p className="mb-4"><strong>Solution:</strong> Go to /claim-access, enter your Stripe payment ID (starts with "pi_") or Ergo transaction ID. This finds your payment and unlocks your account.</p>
                <Link to="/claim-access" className="text-teal-400 hover:underline font-bold">Go to Claim Access →</Link>
            </>
        )
    },
    {
        id: 'page-not-loading',
        category: 'troubleshooting',
        question: "A page isn't loading properly.",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Refresh the page, or try a different browser.</p>
                <p className="mb-2">Quick fixes:</p>
                <ol className="list-decimal pl-5 space-y-1 mb-4">
                    <li>Refresh (Ctrl+R or Cmd+R)</li>
                    <li>Clear browser cache</li>
                    <li>Try another browser (Chrome, Safari, Firefox)</li>
                    <li>Check your internet connection</li>
                </ol>
                <p>If still broken, email support with a screenshot.</p>
            </>
        )
    },
    {
        id: 'game-not-working',
        category: 'troubleshooting',
        question: "A game isn't working.",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Refresh the Games Hub page and try again.</p>
                <p className="mb-4">Games require JavaScript enabled. If issues persist:</p>
                <ol className="list-decimal pl-5 space-y-1 mb-4">
                    <li>Refresh the page</li>
                    <li>Make sure JavaScript is enabled</li>
                    <li>Try Chrome or Firefox</li>
                    <li>Report the issue via email with your device type and browser</li>
                </ol>
            </>
        )
    },
    {
        id: 'progress-not-saving',
        category: 'troubleshooting',
        question: "My progress isn't saving.",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Make sure you're logged in — progress only saves for authenticated users.</p>
                <p className="mb-4">Check the top of the page — do you see your email? If not, you're not logged in.</p>
                <p>Log in, and your progress will save going forward. If already logged in and progress still not saving, refresh and contact support.</p>
            </>
        )
    },
    {
        id: 'ergo-disconnect',
        category: 'troubleshooting',
        question: 'I got disconnected during Ergo payment. What now?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">If your wallet shows the transaction completed, visit /claim-access with your TX ID.</p>
                <p className="mb-2">Check your Ergo wallet history:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li><strong>Transaction shows?</strong> → Go to /claim-access, paste your TX ID</li>
                    <li><strong>No transaction?</strong> → Your ERG is still in your wallet. Try again</li>
                    <li><strong>Transaction pending?</strong> → Wait 5-10 minutes for confirmation</li>
                </ul>
                <Link to="/claim-access" className="text-teal-400 hover:underline font-bold">Go to Claim Access →</Link>
            </>
        )
    },
    {
        id: 'report-bug',
        category: 'troubleshooting',
        question: 'How do I report a bug?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Email support@agenticaihome.com with details and a screenshot.</p>
                <p className="mb-2">Please include:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>What happened</li>
                    <li>What you expected to happen</li>
                    <li>Screenshot if possible</li>
                    <li>Your device (phone/tablet/computer)</li>
                    <li>Your browser (Chrome/Safari/Firefox/etc.)</li>
                </ul>
                <p>We take bugs seriously and fix them quickly.</p>
            </>
        )
    },

    // ===== J. FOUNDER STORY =====
    {
        id: 'who-created',
        category: 'founder',
        question: 'Who is DDS?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">A dentist, father of two toddlers, and Army veteran who built this to survive residency.</p>
                <p className="mb-2">DDS = "Dad Deploying Systems" (and Doctor of Dental Surgery)</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Endodontic resident (50+ hour clinical weeks)</li>
                    <li>Father of two kids under two years old</li>
                    <li>Army veteran (502nd Dental Company, Fort Hood)</li>
                    <li>Systems thinker who applies clinical precision to productivity</li>
                </ul>
                <p>This wasn't created by a productivity guru with unlimited time. It was built by someone who HAD to automate to survive.</p>
            </>
        )
    },
    {
        id: 'what-inspired',
        category: 'founder',
        question: 'What inspired Agentic AI at Home?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Desperation — juggling residency, two toddlers, and staying sane required automation.</p>
                <p className="mb-4">DDS was drowning in life admin: meal planning, appointments, bills, household tasks, email, studying for board exams.</p>
                <p>AI agents became the solution. The results (7-8 hours saved/week) were so transformative that sharing the system became a mission.</p>
            </>
        )
    },
    {
        id: 'who-is-captain',
        category: 'founder',
        question: 'Who is Captain Efficiency?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Your friendly AI guide and mascot throughout the webbook.</p>
                <p className="mb-4">Captain Efficiency:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Explains concepts in friendly language</li>
                    <li>Cheers your progress</li>
                    <li>Appears in games</li>
                    <li>Makes learning feel less alone</li>
                </ul>
                <p>Think of Captain E as your productivity co-pilot — encouraging but never annoying.</p>
            </>
        )
    },
    {
        id: 'why-adventure',
        category: 'founder',
        question: 'Why the "adventure" theme?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Learning should be fun, not feel like homework.</p>
                <p className="mb-4">We've all taken boring online courses. Here:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>"Chapters" become "Discoveries"</li>
                    <li>"Homework" becomes "Missions"</li>
                    <li>Progress feels like exploration, not obligation</li>
                </ul>
                <p>The adventure theme makes the experience enjoyable while teaching real skills.</p>
            </>
        )
    },
    {
        id: 'mission',
        category: 'founder',
        question: "What's the mission behind this project?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">To help regular people reclaim time lost to life's bureaucracy.</p>
                <p className="mb-4">Modern life is full of logistics that drain energy and time. AI can handle much of this, but most people don't know how to use it.</p>
                <p>Our mission: Make AI helpers accessible to everyone — not just tech experts. Give people their time back.</p>
            </>
        )
    },

    // ===== K. BEGINNER REASSURANCE =====
    {
        id: 'too-advanced',
        category: 'beginner',
        question: 'Is this too advanced for me?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No — we start from absolute zero and explain everything.</p>
                <p className="mb-2">You don't need:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>❌ Coding skills</li>
                    <li>❌ Tech background</li>
                    <li>❌ Prior AI experience</li>
                    <li>❌ A fancy computer</li>
                </ul>
                <p className="mb-2">You do need:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>✅ Ability to follow instructions</li>
                    <li>✅ Willingness to try something new</li>
                    <li>✅ 30-60 minutes per week</li>
                </ul>
            </>
        )
    },
    {
        id: 'dont-understand',
        category: 'beginner',
        question: "What if I don't understand something?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Re-read, check the FAQ, or email us for help.</p>
                <p className="mb-4">Every chapter is designed for clarity. But if something confuses you:</p>
                <ol className="list-decimal pl-5 space-y-1 mb-4">
                    <li>Read it again slowly</li>
                    <li>Check the "Common Questions" in each chapter</li>
                    <li>Search the FAQ</li>
                    <li>Email support — we genuinely want you to succeed</li>
                </ol>
            </>
        )
    },
    {
        id: 'own-pace',
        category: 'beginner',
        question: 'Can I go at my own pace?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes — lifetime access means no rushing.</p>
                <p>There are no deadlines. No expiration dates. No "access ends in 30 days." Take a week per chapter, or binge it in a weekend. Pause for months and return. The course waits for you.</p>
            </>
        )
    },
    {
        id: 'scared-of-ai',
        category: 'beginner',
        question: "I'm scared of AI. Should I still try this?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">This course might actually help with that fear — we explain AI in friendly, clear terms.</p>
                <p className="mb-4">Many people fear AI because they don't understand it. This course demystifies AI:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>What it actually is (and isn't)</li>
                    <li>What it can do (and can't)</li>
                    <li>How to use it safely</li>
                    <li>How to stay in control</li>
                </ul>
                <p>Understanding often replaces fear.</p>
            </>
        )
    },
    {
        id: 'mess-up',
        category: 'beginner',
        question: 'What if I mess something up?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Nothing you do in this course can break anything important.</p>
                <p className="mb-4">You're learning with AI tools that:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Can't access your bank without permission</li>
                    <li>Can't send emails without you clicking send</li>
                    <li>Store conversations in your account (deletable)</li>
                    <li>Have no permanent consequences if you make mistakes</li>
                </ul>
                <p>Experiment freely. You can't break anything.</p>
            </>
        )
    },
    {
        id: 'not-for-me',
        category: 'beginner',
        question: 'What if AI isn\'t for me?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">30-day refund policy — try it risk-free.</p>
                <p>We believe this course benefits almost everyone. But if after honestly trying it, you realize AI helpers aren't for you, just request a refund within 30 days. No hard feelings.</p>
            </>
        )
    },
    {
        id: 'too-old-young',
        category: 'beginner',
        question: "I'm worried I'm too old/young for this.",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">If you can use email and follow instructions, age doesn't matter.</p>
                <p className="mb-4">We've designed this for:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>College students ✅</li>
                    <li>Working adults ✅</li>
                    <li>Parents of any age ✅</li>
                    <li>Retirees ✅</li>
                    <li>Teens (13+) ✅</li>
                </ul>
                <p>The only barrier is willingness to learn — not age.</p>
            </>
        )
    },

    // ===== SUPPORT =====
    {
        id: 'get-stuck',
        category: 'troubleshooting',
        question: 'What if I get stuck on something?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Multiple support options available:</p>
                <ol className="list-decimal pl-5 space-y-1 mb-4">
                    <li><strong>FAQ & Troubleshooting:</strong> Check the guides first</li>
                    <li><strong>Email Support:</strong> We respond within 24 hours (usually faster)</li>
                    <li><strong>Course Content:</strong> Each chapter has "Common Mistakes" sections</li>
                </ol>
                <p>We want you to succeed. Don't struggle silently — reach out at <a href="mailto:support@agenticaihome.com" className="text-teal-400 hover:underline">support@agenticaihome.com</a></p>
            </>
        )
    },
];
