import React from 'react';
import {
    BookOpen, CreditCard, User, HelpCircle, FileText,
    Sparkles, Heart, Shield, Rocket, Bot, Gamepad2, Users, Wrench, PenTool
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const categories = [
    { id: 'what-is-this', name: 'A. What This Is', icon: <BookOpen size={18} /> },
    { id: 'founder-story', name: 'B. Why It Exists', icon: <Heart size={18} /> },
    { id: 'who-its-for', name: 'C. Who It\'s For', icon: <Users size={18} /> },
    { id: 'getting-started', name: 'D. Getting Started', icon: <Rocket size={18} /> },
    { id: 'chapters-missions', name: 'E. Chapters & Missions', icon: <FileText size={18} /> },
    { id: 'ai-agents', name: 'F. AI Agents', icon: <Bot size={18} /> },
    { id: 'games', name: 'G. Games', icon: <Gamepad2 size={18} /> },
    { id: 'pricing', name: 'H. Pricing & Payments', icon: <CreditCard size={18} /> },
    { id: 'account', name: 'I. Account Questions', icon: <User size={18} /> },
    { id: 'troubleshooting', name: 'J. Troubleshooting', icon: <Wrench size={18} /> },
    { id: 'privacy', name: 'K. Privacy & Safety', icon: <Shield size={18} /> },
    { id: 'future-updates', name: 'L. Future Updates', icon: <Sparkles size={18} /> },
    { id: 'heart', name: 'M. The Heart', icon: <PenTool size={18} /> },
];

export const faqData = [
    // ===== A. WHAT THIS IS (The Webbook & Mission) =====
    {
        id: 'what-is-agentic-ai',
        category: 'what-is-this',
        question: 'What exactly is "Agentic AI at Home"?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">An interactive webbook that teaches you to use AI helpers for everyday life.</p>
                <p className="mb-4">Unlike chatbots that just answer questions, AI "agents" take ACTION on your behalf. They don't just tell you what's for dinner — they plan your meals, generate grocery lists, and track your pantry.</p>
                <p className="mb-2 font-bold">You'll learn to build 10 different agents across 3 parts:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li><strong>Part 1:</strong> Foundations (Morning Agent, Meal Planning, Dates)</li>
                    <li><strong>Part 2:</strong> Daily Systems (Email Triage, Money Check-in, Fitness, Work Tasks)</li>
                    <li><strong>Part 3:</strong> Mastery (Custom Builder, Multi-Agent Coordination, Full Army)</li>
                </ul>
            </>
        )
    },
    {
        id: 'why-webbook',
        category: 'what-is-this',
        question: 'Why a "webbook" instead of a regular course?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Because reading a PDF or watching videos isn't the same as DOING.</p>
                <p className="mb-4">This isn't passive learning. It's an interactive experience with:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>10 chapters you can read at your own pace</li>
                    <li>Copy-ready templates you can use immediately</li>
                    <li>Interactive quizzes and calculators</li>
                    <li>Games that make learning fun</li>
                    <li>Captain Efficiency — your friendly AI guide</li>
                </ul>
                <p>It's designed for active implementation, not passive consumption.</p>
            </>
        )
    },
    {
        id: 'what-will-i-learn',
        category: 'what-is-this',
        question: 'What will I actually learn?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">How to build your own "Life Operating System" using AI agents.</p>
                <p className="mb-4">By the end, you'll have:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>A Morning Agent that briefs you on your day</li>
                    <li>A Meal Planning Agent that handles weekly menus</li>
                    <li>An Email Triage Agent that sorts your inbox</li>
                    <li>A Money Check-In Agent that tracks spending</li>
                    <li>Custom agents for YOUR specific needs</li>
                </ul>
                <p>Most users save 5-10 hours per week once fully implemented.</p>
            </>
        )
    },
    {
        id: 'what-makes-different',
        category: 'what-is-this',
        question: 'How is this different from other AI courses?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">We build a complete Life Operating System, not random hacks.</p>
                <ol className="list-decimal pl-5 space-y-3 mb-4">
                    <li><strong>Recovery-Aware:</strong> Schedules adapt to your actual energy levels</li>
                    <li><strong>Second Brain Integration:</strong> All your knowledge becomes searchable</li>
                    <li><strong>Life Operating System:</strong> All agents work together toward your goals</li>
                </ol>
                <p>Built by someone with 50+ hour clinical weeks and two kids under 3 — not a guru with unlimited time.</p>
            </>
        )
    },

    // ===== B. WHY IT EXISTS (The Real Founder Story) — CRITICAL =====
    {
        id: 'who-created-this',
        category: 'founder-story',
        question: 'Who made this? Is this a real person?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">I didn't set out to build this.</p>
                <p className="mb-4">Like most people, I started using AI a couple years ago — summarizing research articles, studying for exams, sorting through mountains of data. It was helpful. But it was still just a tool.</p>
                <p className="mb-4">Then I discovered <em>agents</em>.</p>
                <p className="mb-4">Not chatbots. Not assistants you have to keep asking. <strong>Agents</strong> — AI that works <em>for</em> you while you live your life. Meal plans generated while you sleep. Emails sorted before you wake up. Calendars that manage themselves.</p>
                <p className="mb-4">I started tinkering. Building. Testing. Breaking things. Rebuilding them. It took time. A lot of late nights. But piece by piece, I assembled an army of agents that now handle the invisible logistics that used to drain me.</p>

                <hr className="border-slate-700 my-6" />

                <p className="mb-4">And then something unexpected happened.</p>
                <p className="mb-4">My life got... <strong className="text-teal-400">quieter</strong>.</p>
                <p className="mb-4">Not boring — <em>peaceful</em>. The mental noise dimmed. I stopped thinking about grocery lists during dinner. I stopped waking up rehearsing my to-do list. I was finally present with my family — not just physically, but <em>mentally</em>.</p>
                <p className="mb-6">That feeling is worth more than any productivity hack.</p>

                <hr className="border-slate-700 my-6" />

                <p className="mb-4">Here's my confession: <strong className="text-teal-400">I have zero coding experience.</strong></p>
                <p className="mb-4">This entire website — every page, every feature — was built with the help of Claude, ChatGPT, Grok, and Gemini. I'm a dental resident and Army vet with two kids under 3. I'm not a developer. I just refused to quit.</p>
                <p className="mb-4">I'm sharing this because if I can do it, <em>you</em> can use these agents. You don't need to build them from scratch — I already did that part.</p>
                <p className="mb-4 font-bold text-xl text-teal-400">If this helps even one person reclaim their peace, it was worth it.</p>
                <p className="text-slate-400 italic">— DDS<br />Still in residency. Still learning. Still building. But finally at peace.</p>
            </>
        )
    },
    {
        id: 'why-create-this',
        category: 'founder-story',
        question: 'Why did you create this?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Because I wanted to prove something to myself.</p>
                <p className="mb-4">I'd been using AI for years — research, studying, data sorting. But I wondered: could I actually <em>build</em> something real with it? Something that could help others?</p>
                <p className="mb-4">So I started small. One agent. Then another. Then a whole army of them. And when my own life started getting peaceful — when I could finally be <em>present</em> with my family — I knew I had to share it.</p>
                <p className="mb-4">The craziest part? <strong>I have zero coding experience.</strong> This entire website was built with AI tools (Claude, ChatGPT, Grok, Gemini). If I can do that, you can definitely use the agents I've already built for you.</p>
                <p>I'm sharing this to help at least one person reclaim their peace. That would make it all worth it.</p>
            </>
        )
    },
    {
        id: 'why-charge-money',
        category: 'founder-story',
        question: 'Why do you charge for this? Why not free?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Because my wife would actually kill me if I gave away months of late nights for free. 😂</p>
                <p className="mb-4">Real talk:</p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li><strong>Countless late nights</strong> after the kids went to bed</li>
                    <li><strong>Weekends spent building</strong> instead of resting</li>
                    <li><strong>Learning to code from scratch</strong> (with AI help!)</li>
                    <li><strong>Server costs, domain, hosting</strong> — it adds up</li>
                </ul>
                <p className="mb-4">I made this for fun, out of genuine passion. But I also believe value deserves value.</p>
                <p className="mb-4">At $39.99 (or $19.99 with crypto) — early adopter pricing until Feb 1st — if you save even 2 hours a week, you've made back your investment in the first month. That's math even I can do. 🦷</p>
                <p className="text-slate-400 text-sm italic">Plus there's a 30-day money-back guarantee. So you're not risking anything.</p>
            </>
        )
    },
    {
        id: 'is-this-your-job',
        category: 'founder-story',
        question: 'Is this your full-time job?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Nope! I'm still a practicing dentist and dental resident.</p>
                <p className="mb-4">This is a passion project built during:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Nap times</li>
                    <li>After bedtime (both kids AND mine)</li>
                    <li>Early mornings before clinic</li>
                    <li>Weekends when I probably should've been resting</li>
                </ul>
                <p>It's a labor of love, not my main income. Which means everything here exists because I genuinely believe in it.</p>
            </>
        )
    },
    {
        id: 'who-is-captain-efficiency',
        category: 'founder-story',
        question: 'Who is Captain Efficiency?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Your friendly AI guide and mascot throughout the webbook!</p>
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

    // ===== C. WHO IT'S FOR (Everyone) =====
    {
        id: 'who-is-this-for',
        category: 'who-its-for',
        question: 'Who is this for?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Anyone overwhelmed by the logistics of modern life.</p>
                <ul className="list-none space-y-2 mb-6">
                    <li className="flex items-start gap-2">✅ <strong>Overwhelmed Professionals</strong> drowning in email and meetings</li>
                    <li className="flex items-start gap-2">✅ <strong>Busy Parents</strong> managing household logistics</li>
                    <li className="flex items-start gap-2">✅ <strong>Students</strong> juggling classes and life admin</li>
                    <li className="flex items-start gap-2">✅ <strong>Retirees</strong> who want less paperwork, more living</li>
                    <li className="flex items-start gap-2">✅ <strong>Entrepreneurs</strong> who can't afford a human assistant yet</li>
                </ul>
                <p><strong>NOT for:</strong> Enterprise AI solutions, learning to code AI, or people unwilling to spend 30 min/week on setup.</p>
            </>
        )
    },
    {
        id: 'not-tech-savvy',
        category: 'who-its-for',
        question: "I'm not tech-savvy. Can I still do this?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes! If you can send an email, you can do this.</p>
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
        id: 'not-a-parent',
        category: 'who-its-for',
        question: "I'm not a parent. Is this still for me?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Absolutely! The core problem is universal: Life Admin Fatigue.</p>
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
        id: 'seniors-ok',
        category: 'who-its-for',
        question: "I'm retired / a senior. Can I use this?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Absolutely! The course moves at your pace and starts from the basics.</p>
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
        id: 'kids-teens',
        category: 'who-its-for',
        question: "Can kids or teenagers use this?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes for teens (13+). Younger kids may need parent help.</p>
                <p className="mb-4">The content is written for adults but is clean and appropriate:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Teens can follow independently</li>
                    <li>Kids 10-12 can participate with parent guidance</li>
                    <li>Younger children can enjoy the games</li>
                </ul>
                <p>Great for families to learn together!</p>
            </>
        )
    },
    {
        id: 'scared-of-ai',
        category: 'who-its-for',
        question: "I'm scared of AI. Should I still try this?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">This course might actually help with that fear!</p>
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

    // ===== D. GETTING STARTED =====
    {
        id: 'how-to-start',
        category: 'getting-started',
        question: 'How do I start?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Click "Start Free" and begin with Chapter 1 — no payment needed.</p>
                <p className="mb-4">The first chapters are completely free. You'll meet Captain Efficiency, learn what AI agents are, and decide if this is for you.</p>
                <ol className="list-decimal pl-5 space-y-1 mb-4">
                    <li>Click "Start Free" on the welcome page</li>
                    <li>Chapter 1 opens immediately</li>
                    <li>Read at your own pace</li>
                    <li>Decide if you want full access</li>
                </ol>
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
                <p className="mb-4">This is a website, not an app. If you can check your email, you can use this.</p>
                <p>Works on iPhone, Android, iPad, Mac, Windows, Linux — anything with Chrome, Safari, Firefox, or Edge.</p>
            </>
        )
    },
    {
        id: 'what-ai-tools',
        category: 'getting-started',
        question: 'What AI tools do I need?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Any major AI assistant — Claude, ChatGPT, Gemini, or Copilot. Free tiers work.</p>
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
        id: 'how-long-complete',
        category: 'getting-started',
        question: 'How long does it take to complete?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">4-6 hours total. Most people finish in a weekend or 2-3 evenings.</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li><strong>Free Chapters:</strong> ~30 minutes</li>
                    <li><strong>Part 1 (Foundations):</strong> ~1 hour</li>
                    <li><strong>Part 2 (Daily Systems):</strong> ~2 hours</li>
                    <li><strong>Part 3 (Mastery):</strong> ~2-3 hours</li>
                </ul>
                <p>You have lifetime access — go at your pace.</p>
            </>
        )
    },
    {
        id: 'account-needed',
        category: 'getting-started',
        question: 'Do I need an account to preview?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No — the free preview requires no account.</p>
                <p className="mb-4">Browse the free chapters freely. You only create an account when you decide to purchase full access.</p>
                <p>We don't collect your email until you choose to buy.</p>
            </>
        )
    },

    // ===== E. CHAPTERS & MISSIONS =====
    {
        id: 'how-many-chapters',
        category: 'chapters-missions',
        question: 'How many chapters are there?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">10 chapters organized into 3 Parts.</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li><strong>Part 1:</strong> Foundations — Getting started with your first agents</li>
                    <li><strong>Part 2:</strong> Daily Systems — Email, finance, fitness, and work automation</li>
                    <li><strong>Part 3:</strong> Mastery — Custom builders and multi-agent coordination</li>
                </ul>
                <p>Each chapter includes reading, actionable templates, and missions to complete.</p>
            </>
        )
    },
    {
        id: 'what-are-missions',
        category: 'chapters-missions',
        question: 'What are "missions"?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Hands-on tasks that turn knowledge into action.</p>
                <p className="mb-4">Instead of just reading about AI, missions have you actually DO things:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Build your first AI agent</li>
                    <li>Set up a meal planning system</li>
                    <li>Create email templates</li>
                    <li>Design your personal "Agent Army"</li>
                </ul>
                <p>Missions are where the real time savings happen.</p>
            </>
        )
    },
    {
        id: 'which-chapters-free',
        category: 'chapters-missions',
        question: 'Which chapters are free?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">The first three chapters are completely free.</p>
                <p className="mb-4">This gives you enough to:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Meet Captain Efficiency</li>
                    <li>Understand what AI agents are</li>
                    <li>Build your first simple agent</li>
                    <li>Decide if the full course is for you</li>
                </ul>
            </>
        )
    },
    {
        id: 'skip-chapters',
        category: 'chapters-missions',
        question: 'Can I skip chapters?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes! Once you have full access, you can jump to any chapter.</p>
                <p className="mb-4">However, we recommend going in order the first time. Later chapters build on earlier concepts.</p>
                <p>Think of it like a TV season — you CAN skip ahead, but you'll enjoy it more in order.</p>
            </>
        )
    },

    // ===== F. AI AGENTS =====
    {
        id: 'what-are-agents',
        category: 'ai-agents',
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
        id: 'which-agents-learn',
        category: 'ai-agents',
        question: 'What agents will I learn to build?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">10 agents covering every area of daily life:</p>
                <ol className="list-decimal pl-5 space-y-1 mb-4">
                    <li><strong>Morning Agent</strong> — Daily briefings and priority setting</li>
                    <li><strong>Meal Planning Agent</strong> — Weekly menus and grocery lists</li>
                    <li><strong>Important Dates Agent</strong> — Never forget a birthday</li>
                    <li><strong>Email Triage Agent</strong> — Sort inbox and draft responses</li>
                    <li><strong>Money Check-In Agent</strong> — Weekly financial clarity</li>
                    <li><strong>Fitness Agent</strong> — Custom workout plans</li>
                    <li><strong>Work Task Agent</strong> — Prioritize your to-do list</li>
                    <li><strong>Custom Agent Builder</strong> — Learn to build ANY agent</li>
                    <li><strong>Multi-Agent Coordination</strong> — Make agents talk to each other</li>
                    <li><strong>Your Agent Army</strong> — Your complete automated system</li>
                </ol>
            </>
        )
    },
    {
        id: 'agents-safe',
        category: 'ai-agents',
        question: 'Are AI agents safe to use?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes, if you use them thoughtfully — and we teach you exactly how.</p>
                <p className="mb-4">Throughout the course, we teach a "Privacy First" approach:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>What to share vs. protect</li>
                    <li>Privacy tiers framework</li>
                    <li>How to create an "Agent Constitution"</li>
                    <li>Which tools are more privacy-respecting</li>
                </ul>
            </>
        )
    },
    {
        id: 'agents-access-data',
        category: 'ai-agents',
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

    // ===== G. THE GAMES =====
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
                <p className="mb-4 font-bold text-lg text-teal-400">A growing collection of fun mini-games:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li><strong>Captain Click Challenge</strong> — Test your speed and precision</li>
                    <li><strong>Deep Work Dive</strong> — Practice focus and flow</li>
                    <li>More games added over time!</li>
                </ul>
                <p>Each game relates to productivity and AI concepts from the course.</p>
            </>
        )
    },
    {
        id: 'games-required',
        category: 'games',
        question: 'Are games required to complete the course?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No — games are optional fun, not required.</p>
                <p>You can complete all 10 chapters without touching the Games Hub. Games are there for people who enjoy gamified learning. Skip them if that's not your style.</p>
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

    // ===== H. PRICING & PAYMENTS =====
    {
        id: 'how-much-cost',
        category: 'pricing',
        question: 'How much does it cost?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Early adopter pricing (until Feb 1st): $39.99 with card, or $19.99 with Ergo cryptocurrency (50% off!).</p>
                <p className="mb-4 text-sm text-amber-400">⏰ After Feb 1st: $49.99 (card) / $24.99 (crypto)</p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
                        <h4 className="font-bold text-white mb-2">STANDARD: $39.99 <span className="text-xs text-amber-400">→ $49.99 Feb 1</span></h4>
                        <ul className="text-sm text-slate-400 space-y-1">
                            <li>Pay with Credit/Debit Card</li>
                            <li>Instant access</li>
                            <li>Processed via Stripe</li>
                        </ul>
                    </div>
                    <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                        <h4 className="font-bold text-green-400 mb-2">CRYPTO: $19.99 (50% OFF) <span className="text-xs text-amber-400">→ $24.99 Feb 1</span></h4>
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
        id: 'why-crypto-discount',
        category: 'pricing',
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
        id: 'never-used-crypto',
        category: 'pricing',
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
                <p className="mb-4">Is it worth 15-20 minutes to save $20? That's $60+/hour for your time.</p>
                <Link to="/ergo-guide" className="text-green-400 hover:underline font-bold">Check out the Complete Ergo Guide →</Link>
            </>
        )
    },
    {
        id: 'refund-policy',
        category: 'pricing',
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
        category: 'pricing',
        question: 'Will I be charged monthly?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No — this is a one-time purchase with lifetime access.</p>
                <p>No subscriptions. No recurring fees. No hidden charges. Pay once, access forever, including all future updates.</p>
            </>
        )
    },

    // ===== I. ACCOUNT QUESTIONS =====
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
        id: 'multiple-devices',
        category: 'account',
        question: 'Can I use the same account on multiple devices?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes — log in from any device with your email and password.</p>
                <p>Your progress syncs automatically. Read on your phone, continue on your computer.</p>
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

    // ===== J. TROUBLESHOOTING =====
    {
        id: 'paid-no-access',
        category: 'troubleshooting',
        question: "I paid but can't log in. What happened?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Visit /claim-access and enter your transaction ID.</p>
                <p className="mb-2">Common causes:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Closed browser before account creation</li>
                    <li>Typo in email address</li>
                    <li>Payment still processing (wait 5-10 minutes)</li>
                </ul>
                <p className="mb-4">The Claim Access page finds your payment and lets you set up your account.</p>
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
        id: 'progress-not-saving',
        category: 'troubleshooting',
        question: "My progress isn't saving.",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Make sure you're logged in — progress only saves for authenticated users.</p>
                <p className="mb-4">Check the top of the page — do you see your email? If not, you're not logged in.</p>
                <p>Log in, and your progress will save going forward.</p>
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
                    <li>Your device and browser</li>
                </ul>
                <p>We take bugs seriously and fix them quickly.</p>
            </>
        )
    },

    // ===== K. PRIVACY & SAFETY =====
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
        id: 'what-data-collect',
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
        id: 'sell-data',
        category: 'privacy',
        question: 'Do you sell my data?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No. Never. Period.</p>
                <p>We don't sell, trade, or give your information to third parties. We don't run ads. We don't have marketing partnerships that use your data.</p>
            </>
        )
    },
    {
        id: 'ai-privacy-safe',
        category: 'privacy',
        question: 'Is it safe to give AI access to my personal info?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes, if you do it thoughtfully — and we teach you exactly how.</p>
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

    // ===== L. FUTURE UPDATES =====
    {
        id: 'content-updated',
        category: 'future-updates',
        question: 'Is the content updated over time?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Yes — lifetime access includes all future updates!</p>
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
    {
        id: 'whats-coming',
        category: 'future-updates',
        question: "What's coming next?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">More chapters, more games, more agent templates!</p>
                <p className="mb-4">On the roadmap:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>New agent templates as AI tools evolve</li>
                    <li>Additional games in the Games Hub</li>
                    <li>Community features (coming soon)</li>
                    <li>Video walkthroughs (based on demand)</li>
                </ul>
                <p>Existing customers get all updates free.</p>
            </>
        )
    },
    {
        id: 'pay-for-updates',
        category: 'future-updates',
        question: 'Will I have to pay for updates?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No — all updates are included in your one-time purchase.</p>
                <p>This isn't a subscription model. When we add new chapters, games, or features, you get them automatically. No extra fees.</p>
            </>
        )
    },

    // ===== M. THE HEART OF THE PROJECT =====
    {
        id: 'why-really-doing-this',
        category: 'heart',
        question: 'Why are you really doing this?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Because time is the only thing we can't get back.</p>
                <p className="mb-4">We get one short life. I don't want to spend mine drowning in meal planning, email, and appointment scheduling. I want to spend it with my kids, my wife, doing work that matters.</p>
                <p className="mb-4">AI agents gave me that time back. If I can help even one other overwhelmed person reclaim their hours — hours they can spend with the people they love — then this whole project is worth it.</p>
                <p className="italic text-slate-400">That's it. That's the whole reason.</p>
            </>
        )
    },
    {
        id: 'not-just-money',
        category: 'heart',
        question: "Is this just about making money?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">No — if it was, I'd be doing something else. 😅</p>
                <p className="mb-4">Honest truth:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>I'm a dentist. I already have income.</li>
                    <li>I spent months building this during nights and weekends.</li>
                    <li>I learned to code from scratch with AI's help.</li>
                    <li>There are easier ways to make money.</li>
                </ul>
                <p className="mb-4">I charge because value deserves value, and I need to cover costs. But money isn't the driving force.</p>
                <p>The driving force is watching someone go from "I'm drowning" to "I finally have time for what matters."</p>
            </>
        )
    },
    {
        id: 'what-success-looks-like',
        category: 'heart',
        question: "What does success look like to you?",
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">You getting your time back. That's it.</p>
                <p className="mb-4">Success is:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>You finishing dinner prep 30 minutes faster</li>
                    <li>You reaching inbox zero for the first time</li>
                    <li>You spending that extra hour with your family</li>
                    <li>You feeling less overwhelmed, more in control</li>
                </ul>
                <p>Every person who uses this and wins back time is a success story. That's what matters to me.</p>
            </>
        )
    },
    {
        id: 'thank-you',
        category: 'heart',
        question: 'Any final message?',
        answer: (
            <>
                <p className="mb-4 font-bold text-lg text-teal-400">Thank you for being here. Seriously.</p>
                <p className="mb-4">Whether you buy the course or not, the fact that you're exploring ways to use AI thoughtfully means you're ahead of most people.</p>
                <p className="mb-4">AI is changing everything. Those who learn to work WITH it will thrive. Those who ignore it will struggle.</p>
                <p className="mb-4">You're choosing to learn. That's already a win.</p>
                <p className="font-bold text-teal-400">Now go reclaim your time. Captain Efficiency and I are cheering for you! 🚀</p>
            </>
        )
    },
];
