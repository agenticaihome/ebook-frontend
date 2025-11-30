import React, { useState, Suspense } from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import BackgroundEffects from '../components/common/BackgroundEffects';

import CaptainTip from '../components/CaptainTip';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AIExperienceQuiz = React.lazy(() => import('../components/AIExperienceQuiz'));
const MentalLoadCalculator = React.lazy(() => import('../components/MentalLoadCalculator'));
const ToolRecommendationQuiz = React.lazy(() => import('../components/ToolRecommendationQuiz'));
const PrivacyAssessment = React.lazy(() => import('../components/PrivacyAssessment'));
const AgentConstitutionBuilder = React.lazy(() => import('../components/AgentConstitutionBuilder'));
const SocialShare = React.lazy(() => import('../components/tools/SocialShare'));
const CaptainHero = React.lazy(() => import('../components/CaptainHero'));

const Part1 = () => {
    const navigate = useNavigate();
    const [activeChapter, setActiveChapter] = useState(1);
    const { userState } = useUser();
    const persona = userState?.persona || 'general';

    const getPersonaContent = () => {
        if (persona === 'professional') {
            return {
                role: "Senior Project Manager",
                chaos: "drowning in Jira tickets, Slack pings, and stakeholder emails",
                tasks: [
                    "Sorted emails into 'Urgent Stakeholder', 'Team Updates', and 'FYI'",
                    "Drafted responses to 3 blockers before she even logged in",
                    "Flagged a budget discrepancy in the Q4 report",
                    "Rescheduled a conflicting standup meeting"
                ]
            };
        } else if (persona === 'student') {
            return {
                role: "Grad Student",
                chaos: "juggling thesis research, TA duties, and exam prep",
                tasks: [
                    "Summarized 5 new papers relevant to her thesis",
                    "Drafted email replies to her students' questions",
                    "Organized her citation library by topic",
                    "Scheduled study blocks around her most productive hours"
                ]
            };
        } else {
            // Default / Parent / General
            return {
                role: "freelance graphic designer juggling multiple clients and a busy personal life",
                chaos: "30 minutes of digital chaos",
                tasks: [
                    "Sorted her emails into 'urgent client work,' 'invoices to review,' and 'ignorable newsletters'",
                    "Noticed a conflict between a client call and a personal appointment",
                    "Seen the electricity bill in her email and scheduled payment",
                    "Cross-referenced her calendar and dietary preferences to suggest dinner"
                ]
            };
        }
    };

    const story = getPersonaContent();

    const chapters = [
        { id: 1, title: 'What Are AI Agents?', icon: Bot },
        { id: 2, title: 'The Home AI Stack', icon: Zap },
        { id: 3, title: 'Privacy & Security', icon: Shield }
    ];

    const scrollToChapter = (chapterId) => {
        setActiveChapter(chapterId);
        const element = document.getElementById(`chapter-${chapterId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <WebbookLayout>
            <div className="min-h-screen bg-[#0f0f1a] text-white">
                {/* Hero Section */}
                <section className="relative pt-24 pb-16 px-6 overflow-hidden">
                    <BackgroundEffects blob1Color="bg-purple-900/30" blob2Color="bg-teal-900/20" />

                    <div className="max-w-4xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <div className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">Part 1</div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Foundations: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Understanding AI Agents</span>
                            </h1>
                            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                                Learn the difference between chatbots and agents, choose your tools, and set up privacy boundaries.
                            </p>
                        </motion.div>

                        {/* Chapter Navigation */}
                        <div className="grid md:grid-cols-3 gap-4 mb-12">
                            {chapters.map((chapter) => {
                                const Icon = chapter.icon;
                                return (
                                    <button
                                        key={chapter.id}
                                        onClick={() => scrollToChapter(chapter.id)}
                                        className={`p-6 rounded-xl border-2 transition-all text-left ${activeChapter === chapter.id
                                            ? 'border-cyan-500 bg-cyan-900/20'
                                            : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                                            }`}
                                    >
                                        <Icon className={activeChapter === chapter.id ? 'text-cyan-400' : 'text-slate-500'} size={24} />
                                        <div className="mt-3 text-sm font-mono text-slate-400">Chapter {chapter.id}</div>
                                        <div className="font-bold text-white">{chapter.title}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Chapter 1: What Are AI Agents? */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    id="chapter-1"
                    className="py-16 px-6 bg-[#131320] border-y border-slate-800"
                >
                    <div className="max-w-4xl mx-auto">
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="pointing"
                                message="I'm Captain Efficiency. I'm not here to add to your to-do list. I'm here to delete half of it. You've probably used ChatGPT. Maybe asked Siri to set a timer. That's like having a genius assistant who only works when you stand over their shoulder. Real agents don't wait for instructions. They anticipate. They handle things. They let you finish a coffee while it's still hot. That's what we're building."
                            />
                        </Suspense>

                        <div className="mt-12 prose prose-invert prose-lg max-w-none">
                            <h2 className="text-4xl font-bold text-white mb-6">Chapter 1: What Are AI Agents and Why Should You Care?</h2>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">Let's Start With a Story</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Sarah is a {story.role}. Every morning used to start the same way: {story.chaos}.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                Check emails. Respond to urgent requests. Check the calendar. Did she pay the bill? What's for dinner? Did she remember the deadline?
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                One day, a tech-savvy friend set her up with what he called an "AI agent." Sarah was skeptical — she'd tried ChatGPT and found it helpful but limited.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                This was different.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                Now, her mornings look like this: She wakes up to a single notification summarizing what needs her attention, what's already handled, and what decisions need her input.
                            </p>

                            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 my-6">
                                <h4 className="text-white font-bold mb-3">The agent has:</h4>
                                <ul className="space-y-2 text-slate-300">
                                    {story.tasks.map((task, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="text-cyan-400 flex-shrink-0 mt-1" size={18} />
                                            <span>{task}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-cyan-400 font-bold mt-4">
                                    The key difference? Sarah didn't ask it to do any of this. The agent observed, planned, and acted autonomously within boundaries she set.
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Chatbot vs. Agent: The Critical Distinction</h3>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                This is the most important concept in this entire course:
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 my-8">
                                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                    <h4 className="text-white font-bold mb-3">CHATBOT (What you've probably used)</h4>
                                    <div className="space-y-2 text-sm text-slate-300 font-mono">
                                        <div><span className="text-cyan-400">You:</span> "What's the weather tomorrow?"</div>
                                        <div><span className="text-purple-400">AI:</span> "Tomorrow will be 72°F and sunny."</div>
                                        <div><span className="text-cyan-400">You:</span> "Should I bring an umbrella?"</div>
                                        <div><span className="text-purple-400">AI:</span> "No, there's only a 5% chance of rain."</div>
                                        <div className="text-slate-500 italic pt-2">[END — You have information. You decide what to do with it.]</div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 p-6 rounded-xl border border-cyan-500/50">
                                    <h4 className="text-white font-bold mb-3">AGENT (What this course teaches)</h4>
                                    <div className="space-y-2 text-sm text-slate-300 font-mono">
                                        <div><span className="text-cyan-400">You:</span> [Set up once] "Manage my mornings."</div>
                                        <div><span className="text-purple-400">Agent:</span> [Every day, automatically]</div>
                                        <div className="pl-4">→ Checks weather</div>
                                        <div className="pl-4">→ Notices outdoor event at 4 PM</div>
                                        <div className="pl-4">→ Sees 80% rain chance at that time</div>
                                        <div className="pl-4">→ Texts you: "Event might be rained out. I checked — indoor venue available. Want me to message the organizer?"</div>
                                        <div className="text-slate-500 italic pt-2">[END — Agent took action. You made one decision.]</div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Mental Load Problem</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Modern life requires managing an overwhelming amount of information. This "mental load" is exhausting. Not because individual tasks are hard, but because <strong>tracking everything is cognitively draining</strong>.
                            </p>

                            <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30 my-6">
                                <h4 className="text-white font-bold mb-3">Research shows:</h4>
                                <ul className="space-y-2 text-slate-300">
                                    <li>• Decision fatigue is real — quality of decisions degrades throughout the day</li>
                                    <li>• Context switching costs 23 minutes to recover focus</li>
                                    <li>• The average person spends 2.5 hours daily on "life admin"</li>
                                    <li>• People report the mental load of tracking life logistics as a top stressor</li>
                                </ul>
                            </div>

                            <p className="text-slate-300 leading-relaxed">
                                Agents reduce mental load by remembering everything, noticing things you'd miss, deciding routine matters, acting on your behalf, and reporting only what needs your attention.
                            </p>
                            <p className="text-cyan-400 font-bold text-xl my-6">
                                You go from managing 100 things to approving 5 things.
                            </p>
                        </div>

                        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500">Loading quiz...</div>}>
                            <AIExperienceQuiz />
                        </Suspense>
                        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500">Loading calculator...</div>}>
                            <MentalLoadCalculator />
                        </Suspense>

                        <CaptainTip type="tip" title="Your First Step">
                            You now understand the difference between chatbots and agents. That's the foundation for everything. Next up: we'll look at the actual tools you can use. Onward!
                        </CaptainTip>
                    </div>
                </motion.section>

                {/* Chapter 2: The Home AI Stack */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    id="chapter-2"
                    className="py-16 px-6"
                >
                    <div className="max-w-4xl mx-auto">
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="thinking"
                                message="Okay, so you're sold on agents. Now what? There are approximately one billion AI tools out there. Okay, not a billion. But it FEELS like a billion. ChatGPT. Claude. Gemini. Copilot. Siri. Alexa. Zapier. Make. n8n. STOP. Deep breath. You don't need all of them. You probably need TWO or THREE, tops. Let me help you pick the right ones for YOUR situation — without the tech jargon headache."
                            />
                        </Suspense>

                        <div className="mt-12 prose prose-invert prose-lg max-w-none">
                            <h2 className="text-4xl font-bold text-white mb-6">Chapter 2: The Home AI Stack</h2>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">The Only Framework You Need</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Every AI tool falls into one of three categories:
                            </p>

                            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 my-8">
                                <div className="text-center font-mono text-sm">
                                    <div className="bg-purple-900/30 border border-purple-500/50 p-4 rounded-lg mb-2">
                                        <div className="text-purple-400 font-bold mb-1">ORCHESTRATION</div>
                                        <div className="text-slate-400 text-xs">Connects everything (Advanced)</div>
                                        <div className="text-slate-500 text-xs mt-1">Zapier, Make, n8n, custom code</div>
                                    </div>
                                    <div className="bg-cyan-900/30 border border-cyan-500/50 p-4 rounded-lg mb-2">
                                        <div className="text-cyan-400 font-bold mb-1">SPECIALIZED AGENTS</div>
                                        <div className="text-slate-400 text-xs">Does specific jobs (Intermediate)</div>
                                        <div className="text-slate-500 text-xs mt-1">Email tools, calendar tools, finance apps</div>
                                    </div>
                                    <div className="bg-green-900/30 border border-green-500/50 p-4 rounded-lg">
                                        <div className="text-green-400 font-bold mb-1">FOUNDATION AI</div>
                                        <div className="text-slate-400 text-xs">The "brain" (Start here)</div>
                                        <div className="text-slate-500 text-xs mt-1">ChatGPT, Claude, Gemini</div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Level 1: Foundation AI (Pick ONE to Start)</h3>

                            <div className="grid md:grid-cols-2 gap-6 my-8">
                                <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 p-6 rounded-xl border border-cyan-500/30">
                                    <h4 className="text-white font-bold text-xl mb-2">Claude (Anthropic) ⭐</h4>
                                    <div className="text-sm text-slate-400 mb-3">Recommended Starting Point</div>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div><strong>Best for:</strong> Thoughtful responses, long documents, privacy-conscious users</div>
                                        <div><strong>Cost:</strong> Free tier available, Pro is $20/month</div>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                    <h4 className="text-white font-bold text-xl mb-2">ChatGPT (OpenAI)</h4>
                                    <div className="text-sm text-slate-400 mb-3">Most Integrations</div>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div><strong>Best for:</strong> Wide range of integrations, Custom GPTs, image generation</div>
                                        <div><strong>Cost:</strong> Free tier available, Plus is $20/month</div>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                    <h4 className="text-white font-bold text-xl mb-2">Gemini (Google)</h4>
                                    <div className="text-sm text-slate-400 mb-3">Google Ecosystem</div>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div><strong>Best for:</strong> Deep Google integration (Gmail, Calendar, Docs)</div>
                                        <div><strong>Cost:</strong> Free with Google account, Advanced is $20/month</div>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                    <h4 className="text-white font-bold text-xl mb-2">Microsoft Copilot</h4>
                                    <div className="text-sm text-slate-400 mb-3">Microsoft Ecosystem</div>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div><strong>Best for:</strong> Microsoft 365 users (Outlook, Word, Excel)</div>
                                        <div><strong>Cost:</strong> Included with some M365 plans, or $20/month</div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Minimum Viable Stack</h3>
                            <p className="text-slate-300 leading-relaxed">
                                If you want the simplest possible setup that still works:
                            </p>

                            <div className="bg-gradient-to-r from-green-900/20 to-cyan-900/20 p-6 rounded-xl border border-green-500/30 my-6">
                                <h4 className="text-white font-bold mb-4">MINIMUM VIABLE AI STACK</h4>
                                <ul className="space-y-2 text-slate-300">
                                    <li><strong className="text-cyan-400">FOUNDATION:</strong> Claude or ChatGPT ($0-20/month)</li>
                                    <li><strong className="text-cyan-400">CALENDAR:</strong> Google Calendar or Apple Calendar (Free)</li>
                                    <li><strong className="text-cyan-400">NOTES:</strong> Apple Notes, Google Keep, or Notion (Free)</li>
                                    <li><strong className="text-cyan-400">REMINDERS:</strong> Built-in phone reminders (Free)</li>
                                </ul>
                                <div className="mt-4 pt-4 border-t border-slate-700">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-green-400">$0-20</div>
                                            <div className="text-xs text-slate-400">per month</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-cyan-400">30 min</div>
                                            <div className="text-xs text-slate-400">setup time</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-purple-400">70%</div>
                                            <div className="text-xs text-slate-400">capability</div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-cyan-400 font-bold mt-4 text-center">
                                    This is all you need for Parts 2-4 of this course.
                                </p>
                            </div>
                        </div>

                        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500">Loading recommendations...</div>}>
                            <ToolRecommendationQuiz />
                        </Suspense>

                        <CaptainTip type="info" title="Don't Overthink It">
                            The only wrong choice is no choice. Pick something and start. You can always add or change tools later.
                        </CaptainTip>
                    </div>
                </motion.section>

                {/* Chapter 3: Privacy, Security, and Control */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    id="chapter-3"
                    className="py-16 px-6 bg-[#131320] border-y border-slate-800"
                >
                    <div className="max-w-4xl mx-auto">
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="working"
                                message="Okay, real talk time. I'm about to ask you to give AI access to your email, calendar, finances, and home. That's... a lot of trust. And you SHOULD be cautious. Data breaches happen. Companies get hacked. Privacy policies change. But here's the thing: you can get 80% of the benefits with smart boundaries. You don't need all of them. You probably need TWO or THREE, tops. Let me help you pick the right ones for YOUR situation — without the tech jargon headache."
                            />
                        </Suspense>

                        <div className="mt-12 prose prose-invert prose-lg max-w-none">
                            <h2 className="text-4xl font-bold text-white mb-6">Chapter 3: Privacy, Security, and Control</h2>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">The Trust Equation</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Using AI agents requires sharing data. There's no way around this.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                <strong>The question isn't:</strong> "Should I share anything?"<br />
                                <strong>The question is:</strong> "What's the right trade-off for ME?"
                            </p>

                            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 my-8 text-center">
                                <div className="text-2xl font-mono text-white mb-4">
                                    Trust = <span className="text-cyan-400">(Convenience + Time Saved)</span> / <span className="text-red-400">(Data Shared + Risk Exposure)</span>
                                </div>
                                <p className="text-slate-400 text-sm">
                                    You want to MAXIMIZE the top (benefits) while MINIMIZING the bottom (costs)
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Privacy Tiers Framework</h3>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                Not all data is equal. Here's how to think about it:
                            </p>

                            <div className="space-y-4 my-8">
                                <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                                    <h4 className="text-green-400 font-bold mb-2">TIER 1: FREELY SHAREABLE</h4>
                                    <p className="text-slate-300 text-sm mb-2">General preferences, public information, non-sensitive content</p>
                                    <p className="text-slate-400 text-xs">→ Share freely with any AI</p>
                                </div>

                                <div className="bg-cyan-900/20 p-6 rounded-xl border border-cyan-500/30">
                                    <h4 className="text-cyan-400 font-bold mb-2">TIER 2: SHARE WITH TRUSTED PROVIDERS</h4>
                                    <p className="text-slate-300 text-sm mb-2">Calendar events, email (non-sensitive), household information</p>
                                    <p className="text-slate-400 text-xs">→ Share with established AI providers with good privacy policies</p>
                                </div>

                                <div className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-500/30">
                                    <h4 className="text-yellow-400 font-bold mb-2">TIER 3: SHARE CAREFULLY</h4>
                                    <p className="text-slate-300 text-sm mb-2">Financial details, health information, location data, work-sensitive info</p>
                                    <p className="text-slate-400 text-xs">→ Share only with strong privacy controls, review policies first</p>
                                </div>

                                <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                                    <h4 className="text-red-400 font-bold mb-2">TIER 4: RARELY OR NEVER SHARE</h4>
                                    <p className="text-slate-300 text-sm mb-2">Passwords, SSN/ID numbers, detailed medical records, legal matters</p>
                                    <p className="text-slate-400 text-xs">→ Don't put this in AI systems</p>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Trust Timeline</h3>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                Don't give full access immediately. Build trust gradually:
                            </p>

                            <div className="space-y-3 my-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                                    <div>
                                        <div className="text-white font-bold">WEEK 1-2: OBSERVER MODE</div>
                                        <div className="text-slate-400 text-sm">AI reads but doesn't act. You see what it would suggest.</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                                    <div>
                                        <div className="text-white font-bold">WEEK 3-4: SUPERVISED ACTIONS</div>
                                        <div className="text-slate-400 text-sm">AI can act, but you approve everything first.</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                                    <div>
                                        <div className="text-white font-bold">MONTH 2-3: SEMI-AUTONOMOUS</div>
                                        <div className="text-slate-400 text-sm">AI handles routine tasks unsupervised. You review weekly.</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                                    <div>
                                        <div className="text-white font-bold">MONTH 4+: TRUSTED PARTNER</div>
                                        <div className="text-slate-400 text-sm">AI operates within established boundaries. You spot-check monthly.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500">Loading assessment...</div>}>
                            <PrivacyAssessment />
                        </Suspense>
                        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500">Loading builder...</div>}>
                            <AgentConstitutionBuilder />
                        </Suspense>

                        <div className="mt-12 p-8 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-2xl border border-cyan-500/50 text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Part 1 Complete! 🎉</h3>
                            <p className="text-slate-300 mb-6">
                                You now understand what AI agents are, which tools to use, and how to protect your privacy. You're ready to build your first agent!
                            </p>

                            {/* Upsell CTA */}
                            <div className="bg-slate-900/80 p-6 rounded-xl border border-yellow-500/30 mb-8 max-w-2xl mx-auto">
                                <div className="text-yellow-400 font-bold mb-2 uppercase tracking-wider text-sm">Next Step: Implementation</div>
                                <h4 className="text-xl font-bold text-white mb-3">Ready to Deploy Your "Morning Agent"?</h4>
                                <p className="text-slate-400 text-sm mb-4">
                                    In Part 2, we stop talking theory and start building. You'll copy-paste the exact prompts to automate your morning briefing, meal planning, and household chores.
                                </p>
                                <a
                                    href="/#pricing"
                                    className="inline-block w-full md:w-auto bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-lg transition-colors mb-2"
                                >
                                    Unlock Full System ($39.99)
                                </a>
                                <div className="text-xs text-slate-500 mt-2">
                                    Includes all 5 parts + 30-day money-back guarantee
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/part2')}
                                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold transition-all"
                            >
                                Continue to Part 2 (Preview)
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </motion.section>

                {/* Social Share */}
                <Suspense fallback={null}>
                    <SocialShare
                        title="I'm diagnosing my 'Time Infection' with Agentic AI. It's time to reclaim my schedule!"
                        hashtags={["AgenticAI", "TimeManagement", "Productivity"]}
                    />
                </Suspense>
            </div >
        </WebbookLayout >
    );
};

export default Part1;
