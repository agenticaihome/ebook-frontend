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
        const element = document.getElementById(`chapter-${chapterId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <WebbookLayout>
            <ProgressBar current={activeChapter} total={3} label="Part 1: Foundations - Understanding AI Agents" />
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
                                message="I'm Captain Efficiency. My job isn't to add to your to-do list. It's to delete half of it. You've used ChatGPT. Maybe asked Siri to set a timer. That's like hiring a genius assistant who only works when you stand over their shoulder, dictating every move. Real agents don't wait for instructions. They anticipate. They monitor. They handle things. They let you finish a coffee while it's still hot. We're not here to 'boost productivity.' We're here to reclaim your attention from the tyranny of micro-decisions. That's what we're building."
                            />
                        </Suspense>

                        <div className="mt-12 prose prose-invert prose-lg max-w-none">
                            <h2 className="text-4xl font-bold text-white mb-6">Chapter 1: The Everything-Manager</h2>
                            <p className="text-xl text-slate-400 italic mb-8">(And Why Your Current Tools Are Just Expensive Notepads)</p>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">The Morning Sarah Broke</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Sarah didn't remember falling asleep. She remembered opening her laptop at 11:47 PM to "just check one thing," and then her alarm was screaming.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                5:47 AM. She had a client presentation in 48 minutes.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                Wait—no. The calendar said <em>tomorrow</em>. She'd set the wrong day. <em>Again</em>.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                While brewing coffee with shaking hands, her phone buzzed. Manager on Slack. <em>"Did you see the budget email?"</em> She hadn't. She clicked over to Gmail—47 unread, the important one buried somewhere between a Target receipt and a LinkedIn endorsement.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                In the scramble to find the email, she forgot she'd started the coffee maker. No filter. Grounds everywhere.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                By 6:32 AM, Sarah was sitting in her car, presentation half-ready, wondering how other people made this look easy.
                            </p>
                            <p className="text-slate-300 leading-relaxed italic">
                                "There has to be a better way," she thought. "Or I'm going to lose my mind."
                            </p>

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">What Changed</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Sarah's mornings now start at 6:15 AM. Not because she's lazy. Because she doesn't need the 30-minute panic sprint anymore.
                            </p>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Here's what happens <strong>before she even wakes up</strong>:
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
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Let me be direct: <strong>This is the most important concept in this entire book.</strong>
                            </p>
                            <p className="text-slate-300 leading-relaxed mb-6">
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

                        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500">Loading quiz...</div>}>
                            <AIExperienceQuiz />
                        </Suspense>
                        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500">Loading calculator...</div>}>
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

                            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 my-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* THE BRAIN */}
                                    <div className="bg-green-900/20 border border-green-500/30 p-5 rounded-xl flex items-start gap-4">
                                        <div className="text-3xl bg-slate-900/50 p-2 rounded-lg">🧠</div>
                                        <div>
                                            <div className="text-green-400 font-bold text-lg">THE BRAIN</div>
                                            <div className="text-slate-400 text-xs font-bold uppercase mb-1">Role: The Manager</div>
                                            <div className="text-slate-300 text-sm">Thinking, planning, drafting emails, making decisions.</div>
                                            <div className="text-slate-500 text-xs mt-2">Tools: Claude, ChatGPT</div>
                                        </div>
                                    </div>

                                    {/* THE MEMORY */}
                                    <div className="bg-orange-900/20 border border-orange-500/30 p-5 rounded-xl flex items-start gap-4">
                                        <div className="text-3xl bg-slate-900/50 p-2 rounded-lg">📚</div>
                                        <div>
                                            <div className="text-orange-400 font-bold text-lg">THE MEMORY</div>
                                            <div className="text-slate-400 text-xs font-bold uppercase mb-1">Role: The Librarian</div>
                                            <div className="text-slate-300 text-sm">Remembering your preferences, files, and past conversations.</div>
                                            <div className="text-slate-500 text-xs mt-2">Tools: Notion, Obsidian, Google Drive</div>
                                        </div>
                                    </div>

                                    {/* THE HANDS */}
                                    <div className="bg-cyan-900/20 border border-cyan-500/30 p-5 rounded-xl flex items-start gap-4">
                                        <div className="text-3xl bg-slate-900/50 p-2 rounded-lg">✋</div>
                                        <div>
                                            <div className="text-cyan-400 font-bold text-lg">THE HANDS</div>
                                            <div className="text-slate-400 text-xs font-bold uppercase mb-1">Role: The Specialists</div>
                                            <div className="text-slate-300 text-sm">Doing the actual work (sending invites, paying bills).</div>
                                            <div className="text-slate-500 text-xs mt-2">Tools: Calendar, Gmail, YNAB</div>
                                        </div>
                                    </div>

                                    {/* THE NERVES */}
                                    <div className="bg-purple-900/20 border border-purple-500/30 p-5 rounded-xl flex items-start gap-4">
                                        <div className="text-3xl bg-slate-900/50 p-2 rounded-lg">⚡</div>
                                        <div>
                                            <div className="text-purple-400 font-bold text-lg">THE NERVES</div>
                                            <div className="text-slate-400 text-xs font-bold uppercase mb-1">Role: The Messenger</div>
                                            <div className="text-slate-300 text-sm">Connecting the Brain to the Hands automatically.</div>
                                            <div className="text-slate-500 text-xs mt-2">Tools: Zapier, Make</div>
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
                                <p className="text-cyan-400 font-bold mt-6 text-center">
                                    This is your starting lineup. Everything else is optional until Chapter 13.
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
                                message="Okay, real talk time. I'm about to ask you to give AI access to your email, calendar, finances, and home. That's... a lot of trust. And you SHOULD be cautious. Data breaches happen. Companies get hacked. Privacy policies change. But here's the thing: you can get 80% of the benefits with smart boundaries. We're not going to open the floodgates. We're going to build a fortress with a very specific, guarded drawbridge. You stay safe, but you still get the superpowers."
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

                            <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Mission 1: Know Your Risk Profile</h3>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                Not all data is equal. Use this tool to find your comfort zone:
                            </p>

                            <div className="my-8">
                                <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500">Loading assessment...</div>}>
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


                        <h3 className="text-2xl font-bold text-cyan-400 mt-12 mb-4">Mission 3: Write Your Laws</h3>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Every agent needs a constitution. Define yours now:
                        </p>

                        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500">Loading builder...</div>}>
                            <AgentConstitutionBuilder />
                        </Suspense>

                        <div className="mt-12 p-8 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-2xl border border-cyan-500/50 text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Part 1 Complete! 🎉</h3>
                            <p className="text-slate-300 mb-6">
                                You now understand what AI agents are, which tools to use, and how to protect your privacy. You're ready to build your first agent!
                            </p>

                            {/* Payment Guide CTA */}
                            <div className="bg-slate-900/80 p-6 rounded-xl border border-yellow-500/30 mb-8 max-w-2xl mx-auto">
                                <div className="text-yellow-400 font-bold mb-2 uppercase tracking-wider text-sm">Next Step: Implementation</div>
                                <h4 className="text-xl font-bold text-white mb-3">Ready to Deploy Your "Morning Agent"?</h4>
                                <p className="text-slate-400 text-sm mb-4">
                                    In Part 2, we stop talking theory and start building. You'll copy-paste the exact prompts to automate your morning briefing, meal planning, and household chores.
                                </p>
                                <button
                                    onClick={() => navigate('/payment-guide')}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-green-900/30"
                                >
                                    View Payment Options
                                    <ArrowRight size={20} />
                                </button>
                                <div className="text-xs text-slate-500 mt-4">
                                    Choose between Card ($39.99) or Crypto ($19.99) • Instant access to all 5 parts
                                </div>
                            </div>
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
            </div>
        </WebbookLayout>
    );
};

export default Part1;
