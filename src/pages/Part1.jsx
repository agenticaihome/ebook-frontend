import React, { useState, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../components/layout/WebbookLayout';
import BackgroundEffects from '../components/common/BackgroundEffects';

import CaptainTip from '../components/CaptainTip';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { Bot, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { logEvent } from '../utils/analytics';

const AIExperienceQuiz = React.lazy(() => import('../components/AIExperienceQuiz'));
const MentalLoadCalculator = React.lazy(() => import('../components/MentalLoadCalculator'));
const ToolRecommendationQuiz = React.lazy(() => import('../components/ToolRecommendationQuiz'));
const PrivacyAssessment = React.lazy(() => import('../components/PrivacyAssessment'));
const AgentConstitutionBuilder = React.lazy(() => import('../components/AgentConstitutionBuilder'));
const SocialShare = React.lazy(() => import('../components/tools/SocialShare'));
const CaptainHero = React.lazy(() => import('../components/CaptainHero'));
const TryThisNow = React.lazy(() => import('../components/common/TryThisNow'));
const BeforeAfterComparison = React.lazy(() => import('../components/common/BeforeAfterComparison'));
const ProgressBar = React.lazy(() => import('../components/common/ProgressBar'));
const AgentLoopVisual = React.lazy(() => import('../components/common/AgentLoopVisual'));



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
        logEvent('Webbook', 'Chapter View', `Part 1 - Chapter ${chapterId}`);
        const element = document.getElementById(`chapter-${chapterId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    React.useEffect(() => {
        logEvent('Webbook', 'Access', 'Part 1');
    }, []);

    return (
        <WebbookLayout>
            <Helmet>
                <title>Part 1: Foundations - Agentic AI at Home</title>
                <meta name="description" content="Start your journey to efficiency. Learn the core principles of Agentic AI and assess your current chaos level." />
            </Helmet>
            <ProgressBar current={activeChapter} total={3} label="Part 1: Foundations - Understanding AI Agents" />
            <div className="min-h-screen bg-[#0f0f1a] text-white">
                {/* Hero Section */}
                <section className="relative pt-24 pb-16 px-6 overflow-hidden">
                    <BackgroundEffects blob1Color="bg-purple-900/30" blob2Color="bg-teal-900/20" />

                    <div className="max-w-4xl mx-auto relative z-10">
                        <m.div
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
                        </m.div>

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
                                            : 'border-slate-600 hover:border-slate-600 bg-slate-800/50'
                                            }`}
                                    >
                                        <Icon className={activeChapter === chapter.id ? 'text-cyan-400' : 'text-slate-400'} size={24} />
                                        <div className="mt-3 text-sm font-mono text-slate-400">Chapter {chapter.id}</div>
                                        <div className="font-bold text-white">{chapter.title}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Chapter 1: What Are AI Agents? */}
                <m.section
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
                                message="I'm Captain Efficiency. My job isn't to add to your to-do list. It's to delete half of it. You've used ChatGPT. Maybe asked Siri to set a timer. That's like hiring a genius assistant who only works when you stand over their shoulder, dictating every move. Real agents don't wait for instructions. They anticipate. They monitor. They handle things. They let you finish a coffee while it's still hot. We're not here to 'boost productivity.' We're here to reclaim your attention from the tyranny of micro-decisions. That's what we're building."
                            />
                        </Suspense>

                        <div className="mt-12 prose prose-invert prose-lg max-w-none">
                            <h2 className="text-4xl font-bold text-white mb-6">Chapter 1: The Everything-Manager</h2>
                            <p className="text-xl text-slate-400 italic mb-8">(And Why Your Current Tools Are Just Expensive Notepads)</p>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">The Morning Sarah Broke</h3>
                            <p className="text-slate-300 leading-loose md:leading-relaxed mb-6">
                                Sarah didn't remember falling asleep. She remembered opening her laptop at 11:47 PM to "just check one thing," and then her alarm was screaming.
                            </p>
                            <p className="text-slate-300 leading-loose md:leading-relaxed mb-6">
                                5:47 AM. She had a client presentation in 48 minutes.
                            </p>
                            <p className="text-slate-300 leading-loose md:leading-relaxed mb-6">
                                Wait—no. The calendar said <em>tomorrow</em>. She'd set the wrong day. <em>Again</em>.
                            </p>
                            <p className="text-slate-300 leading-loose md:leading-relaxed mb-6">
                                While brewing coffee with shaking hands, her phone buzzed. Manager on Slack. <em>"Did you see the budget email?"</em> She hadn't. She clicked over to Gmail—47 unread, the important one buried somewhere between a Target receipt and a LinkedIn endorsement.
                            </p>
                            <p className="text-slate-300 leading-loose md:leading-relaxed mb-6">
                                In the scramble to find the email, she forgot she'd started the coffee maker. No filter. Grounds everywhere.
                            </p>
                            <p className="text-slate-300 leading-loose md:leading-relaxed mb-6">
                                By 6:32 AM, Sarah was sitting in her car, presentation half-ready, wondering how other people made this look easy.
                            </p>
                            <p className="text-slate-300 leading-loose md:leading-relaxed italic mb-8">
                                "There has to be a better way," she thought. "Or I'm going to lose my mind."
                            </p>

                            <div className="my-12 flex justify-center">
                                <CaptainHero
                                    pose="thinking"
                                    size="md"
                                    message="We've all been Sarah. The problem isn't you. It's that you're trying to be the CEO and the Intern at the same time."
                                    position="center"
                                />
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">What Changed</h3>
                            <p className="text-slate-300 leading-loose md:leading-relaxed mb-6">
                                Sarah's mornings now start at 6:15 AM. Not because she's lazy. Because she doesn't need the 30-minute panic sprint anymore.
                            </p>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Here's what happens <strong>before she even wakes up</strong>:
                            </p>

                            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-600 my-6">
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
                                    The key difference? Sarah didn't <em>ask</em> it to do any of this. The agent <strong>observed</strong> her patterns, <strong>planned</strong> based on her rules, and <strong>acted</strong> within the boundaries she set.
                                </p>
                                <p className="text-white font-bold text-lg  mt-4">
                                    She goes from managing 100 things to approving 5.
                                </p>
                            </div>

                            <Suspense fallback={null}>
                                <BeforeAfterComparison
                                    before={[
                                        "Check 6 different apps for morning info",
                                        "30 minutes of digital chaos",
                                        "Start day reactive and stressed",
                                        "Forget important tasks",
                                        "Manually track everything"
                                    ]}
                                    after={[
                                        "Read 1 notification with everything",
                                        "5 minutes to get oriented",
                                        "Start day proactive and calm",
                                        "Never miss critical items",
                                        "Agent handles tracking automatically"
                                    ]}
                                    metric={{
                                        before: "30 min",
                                        after: "5 min",
                                        label: "morning routine"
                                    }}
                                />
                            </Suspense>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Chatbot vs. Agent: The Line That Changes Everything</h3>
                            <p className="text-slate-300 leading-loose md:leading-relaxed mb-6">
                                Let me be direct: <strong>This is the most important concept in this entire book.</strong>
                            </p>
                            <p className="text-slate-300 leading-loose md:leading-relaxed mb-8">
                                If you understand this distinction, the next 14 chapters will feel like a toolkit. If you don't, they'll feel like random "tips."
                            </p>

                            <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                <AgentLoopVisual />
                            </Suspense>

                            <div className="my-8 p-6 bg-slate-900/50 rounded-xl border border-cyan-500/30">
                                <h4 className="text-white font-bold mb-3">Think of it this way:</h4>
                                <p className="text-slate-300 text-sm mb-2">
                                    <strong className="text-cyan-400">A chatbot</strong> is a brilliant coworker who needs constant supervision.
                                </p>
                                <p className="text-slate-300 text-sm">
                                    <strong className="text-cyan-400">An agent</strong> is a team member who knows your playbook and runs it without you.
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Mental Load Problem</h3>
                            <p className="text-slate-300 leading-loose md:leading-relaxed mb-6">
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

                            <p className="text-slate-300 leading-relaxed mb-4">
                                Agents reduce mental load by:
                            </p>
                            <ul className="list-none space-y-2 my-6 text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-bold">①</span>
                                    <span><strong>Remembering</strong> everything (not just on a calendar, but in context)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-bold">②</span>
                                    <span><strong>Noticing</strong> things you'd miss (conflicts, patterns, anomalies)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-bold">③</span>
                                    <span><strong>Deciding</strong> routine matters based on rules you define once</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-bold">④</span>
                                    <span><strong>Acting</strong> on your behalf (within permissions you control)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-bold">⑤</span>
                                    <span><strong>Reporting</strong> only what truly needs your attention</span>
                                </li>
                            </ul>
                            <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 rounded-xl border border-cyan-500/50 my-8 text-center">
                                <p className="text-white font-bold text-2xl mb-2">
                                    You go from managing 100 things to approving 5.
                                </p>
                                <p className="text-slate-400 text-sm">That's the transformation.</p>
                            </div>
                        </div>

                        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading quiz...</div>}>
                            <AIExperienceQuiz />
                        </Suspense>
                        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading calculator...</div>}>
                            <MentalLoadCalculator />
                        </Suspense>

                        <Suspense fallback={null}>
                            <TryThisNow
                                challenge="Have a Conversation with an AI Agent"
                                estimatedTime="10 min"
                                steps={[
                                    "Open ChatGPT, Claude, or your preferred AI tool",
                                    "Tell it: 'I want you to act as my morning briefing agent. Ask me about my preferences.'",
                                    "Answer its questions (wake time, what info you need, etc.)",
                                    "Ask it: 'Show me what tomorrow's brief would look like'",
                                    "Save this conversation as 'Morning Agent' to refine it over time"
                                ]}
                            />
                        </Suspense>

                        <div className="my-12 p-8 bg-gradient-to-br from-yellow-900/30 to-orange-900/20 rounded-2xl border-2 border-yellow-500/50">
                            <h3 className="text-2xl font-bold text-white mb-4">⚡ Your First Real Test</h3>
                            <p className="text-slate-300 mb-4">
                                Before you move to Chapter 2, I want you to do something:
                            </p>
                            <p className="text-white font-bold mb-4">
                                Write down ONE task you're most tired of remembering.
                            </p>
                            <p className="text-slate-300 text-sm mb-4">
                                The thing that slips through the cracks. The recurring "I forgot to..." moment. The mental Post-It note that's been stuck to your brain for months.
                            </p>
                            <p className="text-slate-300 text-sm mb-6">
                                Screenshot it. Tweet it with #AgenticAI. Text it to a friend. Make it real.
                            </p>
                            <div className="bg-slate-900/80 p-4 rounded-lg border border-yellow-500/30">
                                <p className="text-cyan-400 font-bold text-center">
                                    Because in Chapter 2? We're going to delete it from your brain permanently.
                                </p>
                            </div>
                        </div>

                        <CaptainTip type="tip" title="Chapter 1 Complete">
                            You named your task. Now let's kill it. Chapter 2 is where we build the team that makes it happen.
                        </CaptainTip>
                    </div>
                </m.section>

                {/* Chapter 2: The Home AI Stack */}
                <m.section
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
                            <h2 className="text-4xl font-bold text-white mb-6">Chapter 2: Building Your AI Team</h2>
                            <p className="text-xl text-slate-400 italic mb-8">(The 4 Roles That Delete That Task You Named)</p>

                            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/10 p-6 rounded-xl border border-yellow-500/30 mb-8">
                                <h3 className="text-white font-bold mb-3">Remember Your Task from Chapter 1?</h3>
                                <p className="text-slate-300 text-sm mb-2">
                                    That one recurring thing you're tired of remembering? The thing slipping through the cracks?
                                </p>
                                <p className="text-cyan-400 font-bold text-sm">
                                    Good. By the end of this chapter, you'll know exactly which role on your AI team handles it.
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">The 4-Role Framework</h3>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Okay. You named the task. Now let's build the team that deletes it from your brain forever.
                            </p>
                            <p className="text-white font-bold mb-4">
                                But here's the thing: You don't need 47 apps. You don't need a computer science degree. You don't even need to spend money yet.
                            </p>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                You need <strong>4 roles filled</strong>. That's it.
                            </p>

                            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-600 my-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* THE BRAIN */}
                                    <div className="bg-green-900/20 border border-green-500/30 p-5 rounded-xl flex items-start gap-4">
                                        <div className="text-3xl bg-slate-900/50 p-2 rounded-lg">🧠</div>
                                        <div>
                                            <div className="text-green-400 font-bold text-lg">THE BRAIN</div>
                                            <div className="text-slate-400 text-xs font-bold uppercase mb-1">Role: The Manager</div>
                                            <div className="text-slate-300 text-sm">Thinking, planning, drafting emails, making decisions.</div>
                                            <div className="text-slate-400 text-xs mt-2">Tools: Claude, ChatGPT</div>
                                        </div>
                                    </div>

                                    {/* THE MEMORY */}
                                    <div className="bg-orange-900/20 border border-orange-500/30 p-5 rounded-xl flex items-start gap-4">
                                        <div className="text-3xl bg-slate-900/50 p-2 rounded-lg">📚</div>
                                        <div>
                                            <div className="text-orange-400 font-bold text-lg">THE MEMORY</div>
                                            <div className="text-slate-400 text-xs font-bold uppercase mb-1">Role: The Librarian</div>
                                            <div className="text-slate-300 text-sm">Remembering your preferences, files, and past conversations.</div>
                                            <div className="text-slate-400 text-xs mt-2">Tools: Notion, Obsidian, Google Drive</div>
                                        </div>
                                    </div>

                                    {/* THE HANDS */}
                                    <div className="bg-cyan-900/20 border border-cyan-500/30 p-5 rounded-xl flex items-start gap-4">
                                        <div className="text-3xl bg-slate-900/50 p-2 rounded-lg">✋</div>
                                        <div>
                                            <div className="text-cyan-400 font-bold text-lg">THE HANDS</div>
                                            <div className="text-slate-400 text-xs font-bold uppercase mb-1">Role: The Specialists</div>
                                            <div className="text-slate-300 text-sm">Doing the actual work (sending invites, paying bills).</div>
                                            <div className="text-slate-400 text-xs mt-2">Tools: Calendar, Gmail, YNAB</div>
                                        </div>
                                    </div>

                                    {/* THE NERVES */}
                                    <div className="bg-purple-900/20 border border-purple-500/30 p-5 rounded-xl flex items-start gap-4">
                                        <div className="text-3xl bg-slate-900/50 p-2 rounded-lg">⚡</div>
                                        <div>
                                            <div className="text-purple-400 font-bold text-lg">THE NERVES</div>
                                            <div className="text-slate-400 text-xs font-bold uppercase mb-1">Role: The Messenger</div>
                                            <div className="text-slate-300 text-sm">Connecting the Brain to the Hands automatically.</div>
                                            <div className="text-slate-400 text-xs mt-2">Tools: Zapier, Make</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="my-8 p-6 bg-slate-900/80 rounded-xl border border-cyan-500/30">
                                <h4 className="text-white font-bold mb-4">🎯 Task-to-Team Mapping</h4>
                                <p className="text-slate-300 text-sm mb-4">Remember your recurring task? Here's which role handles it:</p>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-400 font-bold min-w-[80px]">BRAIN →</span>
                                        <span className="text-slate-300">Morning briefings, email summaries, decision recommendations, draft responses</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-orange-400 font-bold min-w-[80px]">MEMORY →</span>
                                        <span className="text-slate-300">Recipes, past conversations, your preferences, family birthdays, gift ideas</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-400 font-bold min-w-[80px]">HANDS →</span>
                                        <span className="text-slate-300">Scheduling meetings, paying bills, sending invites, booking appointments</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-purple-400 font-bold min-w-[80px]">NERVES →</span>
                                        <span className="text-slate-300">"When this happens, do that" automations (later chapters)</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Your First Hire: The Brain</h3>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                This is your foundation. Pick <strong>ONE</strong> to start. You can always switch later.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 my-8">
                                <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 p-6 rounded-xl border border-cyan-500/30">
                                    <h4 className="text-white font-bold text-xl mb-2">Claude (Anthropic) ⭐</h4>
                                    <div className="text-sm text-slate-400 mb-3">Recommended Starting Point</div>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div><strong>Best for:</strong> Thoughtful responses, long documents, privacy-conscious users</div>
                                        <div><strong>Cost:</strong> Free tier available, Pro is $20/month</div>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-600">
                                    <h4 className="text-white font-bold text-xl mb-2">ChatGPT (OpenAI)</h4>
                                    <div className="text-sm text-slate-400 mb-3">Most Integrations</div>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div><strong>Best for:</strong> Wide range of integrations, Custom GPTs, image generation</div>
                                        <div><strong>Cost:</strong> Free tier available, Plus is $20/month</div>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-600">
                                    <h4 className="text-white font-bold text-xl mb-2">Gemini (Google)</h4>
                                    <div className="text-sm text-slate-400 mb-3">Google Ecosystem</div>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div><strong>Best for:</strong> Deep Google integration (Gmail, Calendar, Docs)</div>
                                        <div><strong>Cost:</strong> Free with Google account, Advanced is $20/month</div>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-600">
                                    <h4 className="text-white font-bold text-xl mb-2">Microsoft Copilot</h4>
                                    <div className="text-sm text-slate-400 mb-3">Microsoft Ecosystem</div>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div><strong>Best for:</strong> Microsoft 365 users (Outlook, Word, Excel)</div>
                                        <div><strong>Cost:</strong> Included with some M365 plans, or $20/month</div>
                                    </div>
                                </div>
                            </div>

                            <div className="my-8 p-6 bg-cyan-900/30 rounded-xl border border-cyan-500/50">
                                <h4 className="text-white font-bold mb-3">🤔 Which One Should I Pick?</h4>
                                <div className="space-y-3 text-sm text-slate-300">
                                    <div>
                                        <strong className="text-cyan-400">If in doubt →</strong> Claude. Best balance of capability and privacy.
                                    </div>
                                    <div>
                                        <strong className="text-cyan-400">If you use Google everything →</strong> Gemini. Deepest Google Workspace integration.
                                    </div>
                                    <div>
                                        <strong className="text-cyan-400">If you use Microsoft 365 →</strong> Copilot. Already in your workflow.
                                    </div>
                                    <div>
                                        <strong className="text-cyan-400">If you want max plugins →</strong> ChatGPT. Largest ecosystem.
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Complete Minimum Viable Stack</h3>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                This is all you need for Chapters 3-12 of this book. Start here:
                            </p>

                            <div className="bg-gradient-to-r from-green-900/20 to-cyan-900/20 p-6 rounded-xl border border-green-500/30 my-6">
                                <h4 className="text-white font-bold mb-4">MINIMUM VIABLE AI STACK</h4>
                                <ul className="space-y-2 text-slate-300">
                                    <li><strong className="text-cyan-400">FOUNDATION:</strong> Claude or ChatGPT ($0-20/month)</li>
                                    <li><strong className="text-cyan-400">CALENDAR:</strong> Google Calendar or Apple Calendar (Free)</li>
                                    <li><strong className="text-cyan-400">NOTES:</strong> Apple Notes, Google Keep, or Notion (Free)</li>
                                    <li><strong className="text-cyan-400">REMINDERS:</strong> Built-in phone reminders (Free)</li>
                                </ul>
                                <div className="mt-4 pt-4 border-t border-slate-600">
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
                                <p className="text-cyan-400 font-bold mt-6 text-center">
                                    This is your starting lineup. Everything else is optional until Chapter 13.
                                </p>
                            </div>
                        </div>

                        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading recommendations...</div>}>
                            <ToolRecommendationQuiz />
                        </Suspense>

                        <div className="my-12 p-8 bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 rounded-2xl border-2 border-red-500/50">
                            <h3 className="text-3xl font-bold text-white mb-4">⚡ Your Task, Killed (Right Now)</h3>
                            <p className="text-slate-300 mb-6">
                                Remember that task you wrote down in Chapter 1? The one you're tired of remembering? Let's delete it from your brain in the next 20 minutes.
                            </p>

                            <div className="bg-slate-900/80 p-6 rounded-xl border border-yellow-500/30 mb-6">
                                <h4 className="text-cyan-400 font-bold mb-4">The 20-Minute Task Killer Protocol</h4>

                                <div className="space-y-4 text-sm text-slate-300">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-red-500/20 text-red-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                                        <div>
                                            <strong className="text-white">Open your chosen Brain</strong> (Claude, ChatGPT, Gemini, or Copilot)
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-orange-500/20 text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                                        <div>
                                            <strong className="text-white">Tell it your recurring task:</strong>
                                            <div className="mt-2 bg-slate-800/50 p-3 rounded font-mono text-xs">
                                                "I have a recurring task I always forget: [YOUR TASK]. I want you to act as my agent for this. Ask me questions about when, how, and what info you need to handle this for me."
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-yellow-500/20 text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                                        <div>
                                            <strong className="text-white">Answer its questions honestly</strong>
                                            <p className="text-xs text-slate-400 mt-1">When does this happen? What do you need to remember? What's the outcome you want?</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-green-500/20 text-green-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                                        <div>
                                            <strong className="text-white">Ask it to create a monitoring system:</strong>
                                            <div className="mt-2 bg-slate-800/50 p-3 rounded font-mono text-xs">
                                                "Based on what I told you, create a daily/weekly check-in format where you remind me and help me track this. Save this as 'Agent: [Task Name]'."
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-cyan-500/20 text-cyan-400 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</div>
                                        <div>
                                            <strong className="text-white">Set a daily reminder</strong> to check this agent conversation
                                            <p className="text-xs text-slate-400 mt-1">Phone reminder, calendar alert, whatever you actually check</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-6 rounded-xl border border-green-500/40">
                                <h4 className="text-white font-bold mb-3">🎯 Examples of Task Killed</h4>
                                <div className="space-y-3 text-sm text-slate-300">
                                    <div>
                                        <strong className="text-green-400">"Water plants every week"</strong> → Agent sends weekly reminder with which plants, checks in on Sunday
                                    </div>
                                    <div>
                                        <strong className="text-green-400">"Remember family birthdays"</strong> → Agent creates gift suggestion list 2 weeks before each birthday
                                    </div>
                                    <div>
                                        <strong className="text-green-400">"Check if I paid the electricity bill"</strong> → Agent reminds 3 days before due date, confirms when done
                                    </div>
                                    <div>
                                        <strong className="text-green-400">"Meal planning on Sundays"</strong> → Agent suggests recipes based on what you have, dietary needs, creates grocery list
                                    </div>
                                </div>
                            </div>

                            <p className="text-cyan-400 font-bold text-center mt-6">
                                Do this NOW. Not later. Right now. That task? Consider it deleted. ✅
                            </p>
                        </div>

                        <CaptainTip type="info" title="Don't Overthink It">
                            The only wrong choice is no choice. Pick something and start. You can always add or change tools later.
                        </CaptainTip>

                        <div className="my-12 p-6 bg-gradient-to-r from-yellow-900/20 to-red-900/20 rounded-xl border border-yellow-500/30">
                            <h3 className="text-white font-bold mb-3">⚠️ But Wait—What About Privacy?</h3>
                            <p className="text-slate-300 text-sm mb-3">
                                You just set up an agent that reads your tasks. Maybe your emails. Your calendar. That's... a lot of access.
                            </p>
                            <p className="text-cyan-400 font-bold text-sm">
                                Before you go further, Chapter 3 shows you how to stay safe while getting all the benefits. Don't skip it.
                            </p>
                        </div>
                    </div>
                </m.section>

                {/* Chapter 3: Privacy, Security, and Control */}
                <m.section
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
                                message="Okay, real talk time. You just gave an AI agent access to your tasks. Maybe your calendar. Maybe more. That's... a lot of trust. And you SHOULD be cautious. Data breaches happen. Companies sell data. Privacy policies change overnight. But here's the thing: you can get 80% of the benefits with smart boundaries. We're not going to open the floodgates. We're going to build a fortress with a very specific, guarded drawbridge. You stay in control. You stay safe. But you still get the superpowers. This is non-negotiable."
                            />
                        </Suspense>

                        <div className="mt-12 prose prose-invert prose-lg max-w-none">
                            <h2 className="text-4xl font-bold text-white mb-6">Chapter 3: Building Trust (Without Getting Burned)</h2>
                            <p className="text-xl text-slate-400 italic mb-8">(How to Stay in Control When You're Sharing Everything)</p>

                            <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 mb-8">
                                <h3 className="text-red-400 font-bold mb-3">⚠️ The Privacy Question Everyone's Thinking</h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    <em>"Wait. I just gave an AI access to my calendar, my emails, my recurring tasks. What if it gets hacked? What if the company sells my data? What if I lose control?"</em>
                                </p>
                                <p className="text-white font-bold text-sm">
                                    These are the RIGHT questions. Let's answer them.
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">The Real Privacy Risk (It's Not What You Think)</h3>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Here's what most people fear: <em>"The AI company will read all my private stuff."</em>
                            </p>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                Here's the actual risk: <strong>You already gave your data to 47 companies with worse security than Claude or ChatGPT.</strong>
                            </p>

                            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-600 mb-8">
                                <h4 className="text-white font-bold mb-4">Companies That Already Have Your Data:</h4>
                                <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-300">
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-400">📧</span> Gmail (reads every email to show you ads)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-400">📱</span> Your phone carrier (knows where you are 24/7)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-400">💳</span> Your bank app (every transaction, categorized)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-400">🛒</span> Amazon (purchase history, browsing, wishlists)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-400">🗓️</span> Google Calendar (every meeting, where, with who)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-400">🏥</span> Your health app (steps, sleep, heart rate)
                                    </div>
                                </div>
                                <p className="text-yellow-400 font-bold text-sm mt-4">
                                    The question isn't "Should I share data?" You already are. The question is: "Who gets access, and do I get value back?"
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">The Trust Equation (Reframed)</h3>
                            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-600 my-8">
                                <div className="text-xl font-mono text-white mb-4 text-center">
                                    Smart Privacy = <span className="text-cyan-400">(Max Value)</span> + <span className="text-green-400">(Clear Boundaries)</span> + <span className="text-purple-400">(Regular Audits)</span>
                                </div>
                                <div className="space-y-3 text-sm text-slate-300 mt-6">
                                    <div>
                                        <strong className="text-cyan-400">Max Value:</strong> Only share data that gives you tangible time back
                                    </div>
                                    <div>
                                        <strong className="text-green-400">Clear Boundaries:</strong> Define what AI can/can't do (you'll do this in Mission 3)
                                    </div>
                                    <div>
                                        <strong className="text-purple-400">Regular Audits:</strong> Review what's being tracked monthly
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Mission 1: Know Your Risk Profile</h3>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                Not all data is equal. Use this tool to find your comfort zone:
                            </p>

                            <div className="my-8">
                                <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading assessment...</div>}>
                                    <PrivacyAssessment />
                                </Suspense>
                            </div>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Mission 2: Build Trust Gradually</h3>
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

                        <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Mission 3: Write Your Laws (The Agent Constitution)</h3>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            This is the most important thing you'll do in this chapter. Your Agent Constitution defines:
                        </p>
                        <ul className="list-none space-y-2 mb-6 text-slate-300">
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span> What your agents are <strong>always</strong> allowed to do
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-400">?</span> What they <strong>must ask</strong> before doing
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-400">✗</span> What they are <strong>never</strong> allowed to do
                            </li>
                        </ul>

                        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading builder...</div>}>
                            <AgentConstitutionBuilder />
                        </Suspense>

                        <div className="my-8 p-6 bg-cyan-900/30 rounded-xl border border-cyan-500/50">
                            <h4 className="text-white font-bold mb-3">💡 Pro Tip: Start Restrictive</h4>
                            <p className="text-slate-300 text-sm mb-3">
                                It's easier to <strong>add</strong> permissions later than to take them away. Start with "Must Ask First" for most things.
                            </p>
                            <p className="text-slate-400 text-xs">
                                After a month, you'll know what's safe to move to "Always Allowed."
                            </p>
                        </div>

                        <div className="mt-12 p-8 bg-gradient-to-r from-green-900/30 via-cyan-900/30 to-purple-900/30 rounded-2xl border-2 border-cyan-500/50">
                            <h3 className="text-3xl font-bold text-white mb-6 text-center">🎉 Part 1 Complete: Foundation Laid</h3>

                            <div className="bg-slate-900/80 p-6 rounded-xl border border-green-500/30 mb-6">
                                <h4 className="text-green-400 font-bold mb-4">✅ What You've Accomplished:</h4>
                                <div className="space-y-3 text-sm text-slate-300">
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-400">✓</span>
                                        <div>
                                            <strong className="text-white">Named your recurring task</strong> — The one thing you're tired of remembering
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-400">✓</span>
                                        <div>
                                            <strong className="text-white">Killed that task in 20 minutes</strong> — Set up your first AI agent
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-400">✓</span>
                                        <div>
                                            <strong className="text-white">Built your AI team</strong> — Know exactly which role (Brain/Memory/Hands/Nerves) handles what
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-400">✓</span>
                                        <div>
                                            <strong className="text-white">Wrote your Agent Constitution</strong> — Defined clear boundaries for safety
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 p-6 rounded-xl border border-yellow-500/40 mb-6">
                                <h4 className="text-yellow-400 font-bold mb-3">🚀 What's Next in Parts 2-5:</h4>
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                                    <div>
                                        <strong className="text-cyan-400">Part 2: The Three Core Agents</strong>
                                        <p className="text-xs text-slate-400 mt-1">Morning briefing, meal planning, household management — copy-paste prompts</p>
                                    </div>
                                    <div>
                                        <strong className="text-cyan-400">Part 3: Email & Communication</strong>
                                        <p className="text-xs text-slate-400 mt-1">Inbox zero, meeting scheduling, the "Gatekeeper Agent"</p>
                                    </div>
                                    <div>
                                        <strong className="text-cyan-400">Part 4: Health & Second Brain</strong>
                                        <p className="text-xs text-slate-400 mt-1">Fitness tracking, mental wellbeing, knowledge management</p>
                                    </div>
                                    <div>
                                        <strong className="text-cyan-400">Part 5: Full Autonomy</strong>
                                        <p className="text-xs text-slate-400 mt-1">Advanced integrations, the 12-month roadmap to total delegation</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-white font-bold text-lg mb-2">
                                    You've learned the "what" and "why."
                                </p>
                                <p className="text-cyan-400 font-bold text-xl">
                                    Now let's build the "how."
                                </p>
                            </div>

                            {/* Payment Guide CTA */}
                            <div className="bg-slate-900/80 p-8 rounded-xl border border-yellow-500/30 mt-8 max-w-2xl mx-auto">
                                <div className="text-yellow-400 font-bold mb-2 uppercase tracking-wider text-sm">Ready to Deploy?</div>
                                <h4 className="text-xl font-bold text-white mb-3">Get Parts 2-5: The Complete Implementation</h4>
                                <p className="text-slate-400 text-sm mb-4">
                                    Stop theorizing. Start building. Get the exact prompts, workflows, and automation recipes used by 1,000+ early adopters.
                                </p>
                                <button
                                    onClick={() => navigate('/payment-guide')}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-green-900/30"
                                >
                                    View Payment Options
                                    <ArrowRight size={20} />
                                </button>
                                <div className="text-xs text-slate-400 mt-4">
                                    Choose between Card ($39.99) or Crypto ($19.99) • Instant access to all 5 parts
                                </div>
                            </div>
                        </div>
                    </div>
                </m.section>

                {/* Social Share */}
                <Suspense fallback={null}>
                    <SocialShare
                        title="I'm diagnosing my 'Time Infection' with Agentic AI. It's time to reclaim my schedule!"
                        hashtags={["AgenticAI", "TimeManagement", "Productivity"]}
                    />
                </Suspense>
            </div>
        </WebbookLayout>
    );
};

export default Part1;
