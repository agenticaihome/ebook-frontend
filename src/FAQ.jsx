import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, Search, MessageCircle, Shield, Zap,
    BookOpen, CreditCard, User, HelpCircle, FileText,
    Cpu, AlertTriangle, CheckCircle, Mail
} from 'lucide-react';
import WebbookLayout from './components/layout/WebbookLayout';
import { Link } from 'react-router-dom';

export default function FAQ() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedId, setExpandedId] = useState(null);

    const toggleQuestion = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const categories = [
        { id: 'about', name: 'About the Course', icon: <BookOpen size={18} /> },
        { id: 'payment', name: 'Payment & Pricing', icon: <CreditCard size={18} /> },
        { id: 'access', name: 'Access & Technical', icon: <Cpu size={18} /> },
        { id: 'author', name: 'Author & Credibility', icon: <User size={18} /> },
        { id: 'privacy', name: 'Privacy & AI', icon: <Shield size={18} /> },
        { id: 'content', name: 'Specific Content', icon: <FileText size={18} /> },
        { id: 'results', name: 'Results', icon: <Zap size={18} /> },
        { id: 'support', name: 'Support', icon: <HelpCircle size={18} /> },
        { id: 'misc', name: 'Miscellaneous', icon: <MessageCircle size={18} /> },
    ];

    const faqData = [
        // SECTION 1: ABOUT THE COURSE
        {
            id: 'what-is-it',
            category: 'about',
            question: 'What exactly is "Agentic AI at Home"?',
            answer: (
                <>
                    <p className="mb-4">"Agentic AI at Home is a comprehensive course that teaches you how to build AI-powered systems that automate your daily life — morning routines, meal planning, email management, calendar optimization, household maintenance, finances, health tracking, and more.</p>
                    <p className="mb-4">Unlike chatbots that just answer questions, AI 'agents' take ACTION on your behalf. They don't just tell you what's for dinner — they plan your meals, generate grocery lists, and track your pantry.</p>
                    <p className="mb-2 font-bold">The course is organized into 5 parts (15 chapters):</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li><strong>Part 1: Foundations</strong> (understanding AI agents, choosing tools, privacy)</li>
                        <li><strong>Part 2: Daily Operations</strong> (morning routines, kitchen, household)</li>
                        <li><strong>Part 3: Digital Life</strong> (email, calendar, personal finance)</li>
                        <li><strong>Part 4: Health & Learning</strong> (recovery tracking, wellbeing, knowledge management)</li>
                        <li><strong>Part 5: Advanced Systems</strong> (multi-agent coordination, Life Operating System)</li>
                    </ul>
                    <p>By the end, you'll have a complete system — a 'Life Operating System' — where all your agents work together toward your goals."</p>
                </>
            )
        },
        {
            id: 'who-is-it-for',
            category: 'about',
            question: 'Who is this course for?',
            answer: (
                <>
                    <p className="mb-4">This course is designed for:</p>
                    <ul className="list-none space-y-2 mb-6">
                        <li className="flex items-start gap-2"><CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" /> <strong>Overwhelmed Professionals</strong> drowning in email and meetings</li>
                        <li className="flex items-start gap-2"><CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" /> <strong>Entrepreneurs & Solopreneurs</strong> who can't afford a human assistant yet</li>
                        <li className="flex items-start gap-2"><CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" /> <strong>Students</strong> juggling classes, jobs, and life admin</li>
                        <li className="flex items-start gap-2"><CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" /> <strong>Busy Parents</strong> managing household logistics and mental load</li>
                        <li className="flex items-start gap-2"><CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" /> <strong>Retirees</strong> who want to spend time on life, not paperwork</li>
                        <li className="flex items-start gap-2"><CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" /> Anyone who feels overwhelmed by the logistics of modern life</li>
                    </ul>
                    <p className="mb-4">This course is probably <strong>NOT</strong> for you if:</p>
                    <ul className="list-none space-y-2">
                        <li className="flex items-start gap-2"><AlertTriangle className="text-red-400 w-5 h-5 flex-shrink-0" /> You're looking for business/enterprise AI solutions (this is personal/home focused)</li>
                        <li className="flex items-start gap-2"><AlertTriangle className="text-red-400 w-5 h-5 flex-shrink-0" /> You want to learn AI programming or machine learning (this is about USING AI, not building it)</li>
                        <li className="flex items-start gap-2"><AlertTriangle className="text-red-400 w-5 h-5 flex-shrink-0" /> You're not willing to spend 30-60 minutes per week maintaining your systems</li>
                        <li className="flex items-start gap-2"><AlertTriangle className="text-red-400 w-5 h-5 flex-shrink-0" /> You expect magic — this takes real implementation effort</li>
                    </ul>
                </>

            )
        },
        {
            id: 'not-a-parent',
            category: 'about',
            question: 'I\'m not a parent. Is this still for me?',
            answer: (
                <>
                    <p className="mb-4 font-bold text-lg">YES. Absolutely.</p>
                    <p className="mb-4">While the system was originally battle-tested by a busy parent, the core problem is universal: <strong>Life Admin Fatigue.</strong></p>
                    <p className="mb-2">The systems work for everyone:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li><strong>Students:</strong> Use the "Second Brain" for exams and "Morning Agent" for class schedules.</li>
                        <li><strong>Entrepreneurs:</strong> Use the "Email Agent" to handle client comms and "Finance Agent" for invoices.</li>
                        <li><strong>Retirees:</strong> Use the "Health Agent" for appointments and "Travel Agent" for planning trips.</li>
                    </ul>
                    <p>Any reference to "family" or "kids" in the templates can be deleted or replaced with "clients," "pets," or "projects" in seconds.</p>
                </>
            )
        },
        {
            id: 'technical-skills',
            category: 'about',
            question: 'Do I need technical skills or coding knowledge?',
            answer: (
                <>
                    <p className="mb-4 font-bold text-lg">No coding required. Seriously.</p>
                    <p className="mb-4">If you can:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Send an email</li>
                        <li>Use a smartphone app</li>
                        <li>Follow step-by-step instructions</li>
                        <li>Copy and paste text</li>
                    </ul>
                    <p className="mb-4">...you can do this.</p>
                    <p className="mb-4">The course uses plain English 'prompts' that you give to AI tools. You're not writing code — you're having structured conversations with AI and setting up automations using user-friendly tools.</p>
                    <p>We provide copy-ready templates for everything. You'll customize them to your situation, but you won't be starting from scratch or writing anything technical.</p>
                </>
            )
        },
        {
            id: 'ai-tools-needed',
            category: 'about',
            question: 'What AI tools do I need? Is this for ChatGPT, Claude, or something else?',
            answer: (
                <>
                    <p className="mb-4">The course is tool-agnostic — the principles work with any major AI assistant:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li><strong>Claude (Anthropic)</strong> — Recommended, especially for privacy</li>
                        <li><strong>ChatGPT (OpenAI)</strong> — Most popular, lots of integrations</li>
                        <li><strong>Gemini (Google)</strong> — Good if you're in the Google ecosystem</li>
                        <li><strong>Microsoft Copilot</strong> — Good for Microsoft 365 users</li>
                    </ul>
                    <p className="mb-4">We recommend Claude as our primary choice (and explain why in Chapter 2), but all templates can be adapted to any platform.</p>
                    <p className="mb-2"><strong>Minimum cost:</strong> $0-20/month (free tiers exist for all major AI tools)</p>
                    <p className="mb-4"><strong>Recommended setup:</strong> $20-40/month for premium AI access</p>
                    <p>The course teaches you how to evaluate tools and build a 'stack' that fits your needs and budget.</p>
                </>
            )
        },
        {
            id: 'time-to-complete',
            category: 'about',
            question: 'How long does it take to complete the course?',
            answer: (
                <>
                    <p className="mb-4">The course content takes about 4-6 hours to read/watch through.</p>
                    <p className="mb-4 font-bold">BUT — this isn't a course you just consume. It's a course you IMPLEMENT.</p>
                    <p className="mb-2">Realistic implementation timeline:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li><strong>Week 1-2:</strong> Foundations + Morning/Kitchen agents (2-3 hours setup)</li>
                        <li><strong>Week 3-4:</strong> Household + Email agents (2-3 hours setup)</li>
                        <li><strong>Month 2:</strong> Calendar + Finance + Health agents (3-4 hours setup)</li>
                        <li><strong>Month 3:</strong> Integration + Life Operating System (2-3 hours setup)</li>
                    </ul>
                    <p className="mb-4"><strong>Total implementation:</strong> 10-15 hours spread over 2-3 months</p>
                    <p className="mb-4">After setup, maintenance is about 30 minutes per week (your Weekly Review ritual).</p>
                    <p>You have lifetime access, so go at whatever pace works for your life.</p>
                </>
            )
        },
        {
            id: 'results-expect',
            category: 'about',
            question: 'What results can I realistically expect?',
            answer: (
                <>
                    <p className="mb-4">Based on the systems taught in this course, realistic expectations:</p>
                    <div className="mb-4">
                        <strong className="block text-green-400 mb-1">TIME SAVINGS:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Conservative: 5-7 hours per week</li>
                            <li>Typical: 7-10 hours per week</li>
                            <li>Optimized (full implementation): 10-15 hours per week</li>
                        </ul>
                        <p className="text-sm text-slate-400 mt-1">That's 350-500+ hours per year — equivalent to 2-3 extra months of work time.</p>
                    </div>
                    <div className="mb-4">
                        <strong className="block text-green-400 mb-1">SPECIFIC IMPROVEMENTS:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Email: From 2+ hours daily to 30-45 minutes</li>
                            <li>Meal planning: From 3+ hours weekly to 30 minutes</li>
                            <li>'What am I forgetting?' anxiety: Dramatically reduced</li>
                            <li>Decision fatigue: Eliminated for routine decisions</li>
                            <li>Forgotten bills/maintenance: Zero (systems catch everything)</li>
                        </ul>
                    </div>
                    <div className="mb-4">
                        <strong className="block text-red-400 mb-1">WHAT WE CAN'T PROMISE:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Overnight transformation (this takes weeks to build)</li>
                            <li>Results without implementation (you have to do the work)</li>
                            <li>Perfect systems immediately (expect iteration and refinement)</li>
                        </ul>
                    </div>
                    <p>The author (DDS) personally tracks 7-8 hours saved weekly, and went from 44 daily emails requiring attention to 2-3.</p>
                </>
            )
        },
        {
            id: 'different-from-others',
            category: 'about',
            question: 'How is this different from other AI or productivity courses?',
            answer: (
                <>
                    <p className="mb-4">Three things make this course unique:</p>
                    <ol className="list-decimal pl-5 space-y-4 mb-4">
                        <li>
                            <strong>RECOVERY-AWARE SYSTEMS</strong>
                            <p className="text-sm text-slate-400 mt-1">Most productivity systems assume you're at 100% every day. This course builds systems that ADAPT to your actual energy. Bad night's sleep? Your schedule automatically adjusts. This is the 'life happens' feature that everyone needs.</p>
                        </li>
                        <li>
                            <strong>SECOND BRAIN INTEGRATION</strong>
                            <p className="text-sm text-slate-400 mt-1">Not just task management — knowledge management. Upload documents, meeting notes, study materials and make them instantly searchable. For professionals (like the author studying for board exams), this is game-changing.</p>
                        </li>
                        <li>
                            <strong>LIFE OPERATING SYSTEM APPROACH</strong>
                            <p className="text-sm text-slate-400 mt-1">Most courses teach individual hacks. This course builds a COORDINATED SYSTEM where all your agents work together toward your actual life goals. It's strategic, not just tactical.</p>
                        </li>
                    </ol>
                    <p>Also: This was built by someone who HAD to make it work — an endodontic resident with 50+ hour weeks and two kids under two. This isn't theory from someone with unlimited time. It's battle-tested methodology from the trenches.</p>
                </>
            )
        },
        {
            id: 'updates',
            category: 'about',
            question: 'Is the content updated as AI tools evolve?',
            answer: (
                <>
                    <p className="mb-4">Yes. AI is evolving rapidly, and the course will evolve with it.</p>
                    <p className="mb-2">When you purchase:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>You get lifetime access to all updates</li>
                        <li>Major tool changes will be reflected in the content</li>
                        <li>New capabilities will be added as they become available</li>
                        <li>You'll be notified of significant updates</li>
                    </ul>
                    <p>The course is designed around PRINCIPLES that remain stable even as specific tools change. The fundamentals of agent design, prompt engineering, and system architecture won't become obsolete.</p>
                </>
            )
        },
        {
            id: 'format',
            category: 'about',
            question: 'What format is the course in?',
            answer: (
                <>
                    <p className="mb-4">The course is delivered as an interactive website experience:</p>
                    <div className="mb-4">
                        <strong className="block text-green-400 mb-1">INCLUDES:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Written content (all 15 chapters)</li>
                            <li>Interactive elements (quizzes, calculators, template builders)</li>
                            <li>Copy-ready templates and prompts</li>
                            <li>Personalization based on your situation (parent, professional, etc.)</li>
                            <li>Captain Efficiency — your AI guide character who walks you through everything</li>
                            <li>30-day action plan with daily checkpoints</li>
                        </ul>
                    </div>
                    <p className="mb-4"><strong>FORMAT BENEFITS:</strong> Access from any device, interactive tools, easy search, automatic updates.</p>
                    <p>This is NOT a static PDF or video course. It's designed for active implementation.</p>
                </>
            )
        },
        {
            id: 'community',
            category: 'about',
            question: 'Is there a community or support?',
            answer: (
                <>
                    <p className="mb-2">Currently:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Email support for questions</li>
                        <li>FAQ and troubleshooting guides</li>
                        <li>Course updates and improvements</li>
                    </ul>
                    <p className="mb-2">COMING SOON:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Community forum for students</li>
                        <li>Live Q&A sessions</li>
                        <li>Template sharing between users</li>
                    </ul>
                    <p>For now, email support is responsive and personal. As the community grows, we'll add more collaboration features.</p>
                </>
            )
        },

        // SECTION 2: PAYMENT & PRICING
        {
            id: 'cost',
            category: 'payment',
            question: 'How much does the course cost?',
            answer: (
                <>
                    <p className="mb-4">Two pricing options:</p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
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
                    <p>Both options include full course access, all tools, and lifetime updates.</p>
                </>
            )
        },
        {
            id: 'crypto-discount',
            category: 'payment',
            question: 'Why is there a 50% discount for crypto?',
            answer: (
                <>
                    <p className="mb-4">Simple economics + philosophy:</p>
                    <p className="mb-2"><strong>THE ECONOMICS:</strong> Credit card processing costs ~$1.50+ per transaction. Crypto processing costs ~$0.001. We pass those savings to you.</p>
                    <p className="mb-2"><strong>THE PHILOSOPHY:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Every card transaction feeds the surveillance economy</li>
                        <li>Every ERG transaction supports decentralized commerce</li>
                        <li>We want to encourage crypto adoption for everyday purchases</li>
                        <li>We believe in Ergo's technology and want to demonstrate real-world use</li>
                    </ul>
                    <p>It's not a gimmick — it's alignment between our values and our pricing.</p>
                </>
            )
        },
        {
            id: 'how-to-pay-crypto',
            category: 'payment',
            question: 'I\'ve never used crypto. Is it hard to pay with ERG?',
            answer: (
                <>
                    <p className="mb-4">If you've never used crypto, it takes about 15-20 minutes to set up the first time.</p>
                    <p className="mb-4">We have a complete beginner's guide that walks you through:</p>
                    <ol className="list-decimal pl-5 space-y-1 mb-4">
                        <li>Getting a wallet (Nautilus for Desktop, Terminus for Mobile)</li>
                        <li>Buying ERG (Directly via Banxa or on exchanges like CoinEx)</li>
                        <li>Sending payment (2 minutes)</li>
                    </ol>
                    <p className="mb-4">Every single click is documented with screenshots. If you can follow instructions for setting up a new app, you can do this.</p>
                    <p className="mb-4">Is it worth 15-20 minutes to save $20? That's $60+/hour for your time. Plus you'll learn a valuable skill.</p>
                    <Link to="/ergo-guide" className="text-green-400 hover:underline font-bold">Check out the Complete Ergo Guide →</Link>
                </>
            )
        },
        {
            id: 'what-is-ergo',
            category: 'payment',
            question: 'What is Ergo/ERG? Is it safe?',
            answer: (
                <>
                    <p className="mb-4">Ergo is a cryptocurrency launched in 2019. It's built by academic researchers, fair launched (no VC backing), and proof-of-work secured (like Bitcoin).</p>
                    <p className="mb-2"><strong>Is it safe for payments? Yes:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>The Ergo blockchain has never been hacked</li>
                        <li>Transactions are irreversible and verifiable</li>
                        <li>You can confirm your payment on the public blockchain</li>
                        <li>It's been operating securely for 5+ years</li>
                    </ul>
                    <Link to="/why-ergo" className="text-green-400 hover:underline font-bold">Read the full 'Why Ergo' explanation →</Link>
                </>
            )
        },
        {
            id: 'other-crypto',
            category: 'payment',
            question: 'Can I pay with Bitcoin or other cryptocurrencies?',
            answer: (
                <>
                    <p className="mb-4">Currently we only accept ERG (Ergo).</p>
                    <p className="mb-2"><strong>Why not Bitcoin/Ethereum?</strong></p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Higher transaction fees (Bitcoin fees can exceed $5-20)</li>
                        <li>Slower confirmation times</li>
                        <li>We specifically want to support Ergo adoption</li>
                    </ul>
                    <p>If you have Bitcoin or Ethereum, you can swap for ERG on exchanges like CoinEx or through services like NonKYC.io. It adds a step but still saves you money overall.</p>
                </>
            )
        },
        {
            id: 'payment-issues',
            category: 'payment',
            question: 'What if I pay with ERG and something goes wrong?',
            answer: (
                <>
                    <p className="mb-4">We've got you covered:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li><strong>Payment Not Detected:</strong> Wait 5-10 minutes (blockchains take time). Check the explorer. Contact us with your Transaction ID.</li>
                        <li><strong>Sent Wrong Amount:</strong> Too much? We'll refund. Too little? Send the rest.</li>
                        <li><strong>Sent to Wrong Address:</strong> Crypto can't be reversed, but contact us anyway — we'll see if there's anything we can do.</li>
                    </ul>
                    <p>We're not trying to keep your money if something goes wrong. We want happy customers. Email us and we'll fix it.</p>
                </>
            )
        },
        {
            id: 'refund-policy',
            category: 'payment',
            question: 'Is there a refund policy?',
            answer: (
                <>
                    <p className="mb-4">Yes, <strong>30-day satisfaction guarantee</strong>.</p>
                    <p className="mb-4">If you're not satisfied within 30 days of purchase, contact us for a full refund.</p>
                    <p className="mb-2">We ask that you:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Actually try the course (not just skim it)</li>
                        <li>Tell us what didn't work for you (helps us improve)</li>
                        <li>Request within 30 days</li>
                    </ul>
                    <p>Card payments are refunded to the card. ERG payments are refunded in ERG. No hassle, no guilt trips.</p>
                </>
            )
        },

        // SECTION 3: ACCESS & TECHNICAL
        {
            id: 'access-how',
            category: 'access',
            question: 'How do I access the course after purchase?',
            answer: (
                <>
                    <p className="mb-4">Instant access:</p>
                    <ol className="list-decimal pl-5 space-y-1 mb-4">
                        <li>Complete your purchase (card or ERG)</li>
                        <li>You'll see an 'Access Your Course' button immediately</li>
                        <li>You'll also receive an email with your login credentials</li>
                        <li>Log in anytime at the course URL</li>
                    </ol>
                    <p>Your access is tied to your email address. Use the same email to log in from any device.</p>
                </>
            )
        },
        {
            id: 'mobile-access',
            category: 'access',
            question: 'Can I access the course on mobile?',
            answer: (
                <>
                    <p className="mb-4">Yes! The course is fully responsive:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Works on any smartphone or tablet</li>
                        <li>Same content and interactive features</li>
                        <li>Optimized for smaller screens</li>
                        <li>No app download required — it's a website</li>
                    </ul>
                    <p>You can read on your phone, then implement on your computer, or vice versa.</p>
                </>
            )
        },
        {
            id: 'lifetime-access',
            category: 'access',
            question: 'How long do I have access?',
            answer: (
                <>
                    <p className="mb-4 font-bold">Lifetime access.</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>No subscription</li>
                        <li>No expiration</li>
                        <li>Includes all future updates</li>
                    </ul>
                    <p>We have no plans to shut this down. But even if we did, we'd give you plenty of notice and downloadable copies.</p>
                </>
            )
        },

        // SECTION 4: AUTHOR
        {
            id: 'who-created',
            category: 'author',
            question: 'Who created this course?',
            answer: (
                <>
                    <p className="mb-4"><strong>DDS</strong> — which stands for both 'Dad Deploying Systems' and 'Doctor of Digital Systems.'</p>
                    <p className="mb-2">Background:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Endodontic resident (dental specialist in training)</li>
                        <li>50+ hour clinical weeks</li>
                        <li>Father of two children under two years old</li>
                        <li>Army veteran (502nd Dental Company, Fort Hood)</li>
                        <li>Systems thinker who applies clinical precision to productivity</li>
                    </ul>
                    <p>This course wasn't created by a productivity guru with unlimited time. It was built by someone who HAD to automate to survive. Residency + two toddlers + maintaining sanity required systems that actually work under extreme constraints.</p>
                </>
            )
        },
        {
            id: 'proof',
            category: 'author',
            question: 'How do I know this actually works?',
            answer: (
                <>
                    <p className="mb-4">Fair question. Here's the evidence:</p>
                    <div className="mb-4">
                        <strong className="block text-green-400 mb-1">PERSONAL RESULTS:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>7-8 hours saved per week</li>
                            <li>Email reduced from 44 daily messages to 2-3</li>
                            <li>Zero forgotten bills or maintenance items in over a year</li>
                            <li>Passed board exams while managing residency + family</li>
                        </ul>
                    </div>
                    <p className="mb-4">The course content was tested with virtual reader simulations and refined through hundreds of iterations. We don't promise magic — we promise systems that work if you implement them.</p>
                    <p>We also have a 30-day refund policy. Try it. If it doesn't work for you, get your money back.</p>
                </>
            )
        },

        // SECTION 5: PRIVACY
        {
            id: 'privacy-safe',
            category: 'privacy',
            question: 'Is it safe to give AI access to my personal information?',
            answer: (
                <>
                    <p className="mb-4">This is the most important question, and we take it seriously.</p>
                    <p className="mb-4"><strong>SHORT ANSWER:</strong> Yes, if you do it thoughtfully. The course teaches you exactly how.</p>
                    <p className="mb-4">CHAPTER 3 is entirely dedicated to privacy, security, and control. You'll learn:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>The Privacy Tiers framework (what to share, what to protect)</li>
                        <li>How to create an 'Agent Constitution' (rules for your AI)</li>
                        <li>Which AI tools are more privacy-respecting (Claude &gt; ChatGPT for privacy)</li>
                        <li>How to get 80% of the benefit while sharing minimal data</li>
                    </ul>
                    <p>We don't hand-wave privacy concerns. We address them directly and give you frameworks to make informed decisions.</p>
                </>
            )
        },
        {
            id: 'kids-privacy',
            category: 'privacy',
            question: 'What about my kids\' privacy?',
            answer: (
                <>
                    <p className="mb-4">Excellent question. The course addresses this specifically with <strong>Family Privacy Rules</strong>:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Never share children's full names combined with photos</li>
                        <li>Never share school names or locations</li>
                        <li>Never share medical information about minors</li>
                    </ul>
                    <p className="mb-4"><strong>WHAT'S SAFE:</strong> Generic info ('I have two dependents'), scheduling needs ('Pickup at 3pm'), general preferences.</p>
                    <p>Your AI doesn't need to know names to help you plan activities. The course teaches you to get the benefits without the exposure.</p>
                </>
            )
        },

        // SECTION 6: CONTENT
        {
            id: 'recovery-agent',
            category: 'content',
            question: 'What is the \'Recovery-Aware Agent\'?',
            answer: (
                <>
                    <p className="mb-4">The Recovery-Aware Agent is a system that adapts your schedule based on your actual energy levels.</p>
                    <p className="mb-2"><strong>HOW IT WORKS:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Tracks your sleep (manually or via wearable)</li>
                        <li>Classifies your day as Green (full capacity), Yellow (moderate), or Red (survival mode)</li>
                        <li>Automatically adjusts recommendations (e.g., Red day = only 3 essential tasks, protect sleep)</li>
                    </ul>
                    <p>This is the 'life happens' feature. Your schedule adapts to your biology instead of fighting it.</p>
                </>
            )
        },
        {
            id: 'second-brain',
            category: 'content',
            question: 'What is the \'Second Brain Agent\'?',
            answer: (
                <>
                    <p className="mb-4">The Second Brain Agent turns your scattered notes, documents, and knowledge into a searchable, organized system.</p>
                    <p className="mb-4">It processes documents, extracts key info, auto-tags content, and makes everything searchable with natural language.</p>
                    <p className="mb-4"><strong>EXAMPLE:</strong> Upload 50 PDFs from work. Later ask: 'What did the Q3 report say about customer retention?' Instant answer with source.</p>
                    <p>Your brain is great at creativity and insight. It's terrible at storage and retrieval. Let AI handle the library while you do the thinking.</p>
                </>
            )
        },

        // SECTION 7: RESULTS
        {
            id: 'timeline',
            category: 'results',
            question: 'How long until I see results?',
            answer: (
                <>
                    <p className="mb-2"><strong>WEEK 1:</strong> Morning Brief running (save 10-15 min/day), first meal plan generated.</p>
                    <p className="mb-2"><strong>WEEK 2-4:</strong> Multiple agents operational, noticeable reduction in anxiety, 3-5 hours/week saved.</p>
                    <p className="mb-2"><strong>MONTH 2:</strong> System feeling smooth, 5-7 hours/week saved, mental load reduced.</p>
                    <p className="mb-4"><strong>MONTH 3+:</strong> Life Operating System integrated, 7-10+ hours/week saved.</p>
                    <p>IMPORTANT: Results require implementation. Plan to spend 30-60 minutes per week on setup and refinement.</p>
                </>
            )
        },
        {
            id: 'robot-feeling',
            category: 'results',
            question: 'Will this make me feel like a robot / lose spontaneity?',
            answer: (
                <>
                    <p className="mb-4">No. The opposite.</p>
                    <p className="mb-4">We automate the tedious (scheduling, tracking), the repetitive (meal planning, bills), and the draining (email sorting). We DO NOT automate creativity, relationships, or meaningful decisions.</p>
                    <p className="mb-4">The systems handle the bureaucracy of life. That <strong>FREES</strong> you for spontaneity.</p>
                    <p>Think about it: Are you more likely to be spontaneous when you're stressed about forgotten tasks, or when you know everything is handled?</p>
                </>
            )
        },

        // SECTION 8: SUPPORT
        {
            id: 'get-stuck',
            category: 'support',
            question: 'What if I get stuck on something?',
            answer: (
                <>
                    <p className="mb-4">Multiple support options:</p>
                    <ol className="list-decimal pl-5 space-y-1 mb-4">
                        <li><strong>FAQ & Troubleshooting:</strong> Check the guides first.</li>
                        <li><strong>Email Support:</strong> We respond within 24 hours (usually faster).</li>
                        <li><strong>Course Content:</strong> Each chapter has 'Common Mistakes' sections.</li>
                    </ol>
                    <p>We want you to succeed. Don't struggle silently — reach out.</p>
                </>
            )
        },
    ];

    const filteredFaq = activeCategory === 'all'
        ? faqData
        : faqData.filter(item => item.category === activeCategory);

    const searchedFaq = searchQuery
        ? faqData.filter(item =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : filteredFaq;

    return (
        <WebbookLayout>
            <div className="min-h-screen bg-[#0f0f1a] text-slate-300 font-sans selection:bg-green-500/30 pb-20">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Questions</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Honest answers to your real questions. No marketing fluff.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative max-w-2xl mx-auto mb-12">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-lg"
                        />
                    </div>

                    {/* Categories */}
                    {!searchQuery && (
                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'all' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                            >
                                All
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat.id ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                >
                                    {cat.icon}
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* FAQ List */}
                    <div className="space-y-4">
                        {searchedFaq.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-slate-500 text-lg">No questions found matching your search.</p>
                                <button onClick={() => setSearchQuery('')} className="mt-4 text-cyan-400 hover:underline">Clear search</button>
                            </div>
                        ) : (
                            searchedFaq.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`border rounded-2xl overflow-hidden transition-all ${expandedId === item.id ? 'bg-slate-800/80 border-cyan-500/50 shadow-lg shadow-cyan-900/20' : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'}`}
                                >
                                    <button
                                        onClick={() => toggleQuestion(item.id)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                    >
                                        <span className={`font-bold text-lg ${expandedId === item.id ? 'text-cyan-400' : 'text-white'}`}>
                                            {item.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform duration-300 ${expandedId === item.id ? 'transform rotate-180 text-cyan-400' : 'text-slate-500'}`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {expandedId === item.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-slate-700/50 pt-4">
                                                    {item.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Still have questions? */}
                    <div className="mt-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
                            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                                If you're on the fence, remember the <strong>30-day refund policy</strong>. It's low risk.
                                <br />
                                Is saving 5-10 hours per week worth $39.99 (or $19.99)? The math is pretty clear.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/payment-guide"
                                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/20"
                                >
                                    Get the System ($19.99 with ERG)
                                </Link>
                                <a
                                    href="mailto:agenticaiathome@gmail.com"
                                    className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-xl font-bold transition-all border border-slate-600"
                                >
                                    Email Support
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </WebbookLayout>
    );
}
