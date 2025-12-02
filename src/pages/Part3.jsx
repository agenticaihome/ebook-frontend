import React, { useState, Suspense } from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import PasswordGate from '../components/common/PasswordGate';
import BackgroundEffects from '../components/common/BackgroundEffects';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Calendar, FileText, ArrowRight, Clock, CheckCircle } from 'lucide-react';

const CaptainHero = React.lazy(() => import('../components/CaptainHero'));
const CaptainTip = React.lazy(() => import('../components/CaptainTip'));
const ProgressBar = React.lazy(() => import('../components/common/ProgressBar'));
const TryThisNow = React.lazy(() => import('../components/common/TryThisNow'));
const EmailChaosCalculator = React.lazy(() => import('../components/EmailChaosCalculator'));
const CalendarAuditTool = React.lazy(() => import('../components/CalendarAuditTool'));
const AdminDayPlanner = React.lazy(() => import('../components/AdminDayPlanner'));
const DigitalDetoxChallenge = React.lazy(() => import('../components/DigitalDetoxChallenge'));
const SocialShare = React.lazy(() => import('../components/tools/SocialShare'));
const WorkflowVisual = React.lazy(() => import('../components/common/WorkflowVisual'));
const TroubleshootingAccordion = React.lazy(() => import('../components/common/TroubleshootingAccordion'));
const CopyPrompt = React.lazy(() => import('../components/common/CopyPrompt'));

const Part3 = () => {
    const navigate = useNavigate();
    const [activeChapter, setActiveChapter] = useState(7);

    const chapters = [
        { id: 7, title: 'Email & Communications', icon: Mail },
        { id: 8, title: 'Calendar Defense', icon: Calendar },
        { id: 9, title: 'Admin & Paperwork', icon: FileText }
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
            <PasswordGate>
                <ProgressBar current={activeChapter - 6} total={3} label="Part 3: Digital Operations" />
                <div className="min-h-screen bg-[#0f0f1a] text-white">
                    {/* Hero Section */}
                    <section className="relative pt-24 pb-16 px-6 overflow-hidden">
                        <BackgroundEffects blob1Color="bg-blue-900/30" blob2Color="bg-indigo-900/20" />

                        <div className="max-w-4xl mx-auto relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-12"
                            >
                                <div className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4">Part 3</div>
                                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                    Digital Operations: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Email, Calendar, Admin</span>
                                </h1>
                                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                                    Reclaim your attention. Build agents to filter noise, protect your time, and handle the paperwork.
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
                                                ? 'border-blue-500 bg-blue-900/20'
                                                : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                                                }`}
                                        >
                                            <Icon className={activeChapter === chapter.id ? 'text-blue-400' : 'text-slate-500'} size={24} />
                                            <div className="mt-3 text-sm font-mono text-slate-400">Chapter {chapter.id}</div>
                                            <div className="font-bold text-white">{chapter.title}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Chapter 7: Email */}
                    <section id="chapter-7" className="py-16 px-6 bg-[#131320] border-y border-slate-800">
                        <div className="max-w-4xl mx-auto">
                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 7: The Gatekeeper Agent (Email)</h2>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 mb-8">
                                    <h3 className="text-red-400 font-bold mb-3">The 472 Unread Emails</h3>
                                    <p className="text-white font-bold text-sm mb-3">
                                        Alex Chen, marketing manager, Chicago
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Monday morning, 7:42 AM. Alex opens Gmail.
                                    </p>
                                    <p className="text-red-400 font-bold text-lg mb-3">
                                        472 unread emails.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        She stares at the number. When did this happen?
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Last checked Friday at 5 PM. That was 87 hours ago.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        472 ÷ 87 = 5.4 emails per hour. Even while sleeping.
                                    </p>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <p className="text-white text-sm mb-2">She starts scrolling:</p>
                                        <div className="space-y-1 text-xs text-slate-400">
                                            <div>• Newsletter (archive)</div>
                                            <div>• Receipt (archive)</div>
                                            <div>• "Quick question" from vendor (ugh, reply)</div>
                                            <div>• Team update (read... maybe later)</div>
                                            <div>• Another newsletter (unsubscribe)</div>
                                            <div className="text-red-400">• Boss: "Thoughts on Q4?" (URGENT)</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-3">
                                        8:15 AM. She's cleared 23 emails.
                                    </p>
                                    <p className="text-red-400 font-bold mb-3">
                                        449 to go.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Meeting in 15 minutes. She hasn't even looked at the actual work yet.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Anxiety rising. Chest tight.
                                    </p>
                                    <p className="text-cyan-400 italic text-sm">
                                        "I'm drowning in other people's priorities."
                                    </p>
                                    <div className="mt-4 pt-3 border-t border-red-500/30 text-xs text-slate-400">
                                        <div>By Wednesday: 511 unread</div>
                                        <div>By Friday: 628</div>
                                    </div>
                                </div>

                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="pointing"
                                        message="You just read about Alex. 472 unread emails. Monday morning. Drowning. Here's what happened: Her inbox became a to-do list created by OTHER people. Every email is someone else saying 'Think about this.' 'Do this.' 'Respond to me.' But here's the secret Alex didn't know: 80% of email is noise. 15% is FYI. Only 5% actually needs YOU. What if you could build a Gatekeeper Agent to handle the 95%? Alex is about to find out."
                                    />
                                </Suspense>

                                <div className="mt-12 prose prose-invert prose-lg max-w-none">

                                    {/* Quick Win Box */}
                                    <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border border-blue-500/50 my-8">
                                        <h3 className="text-xl font-bold text-blue-400 mb-3">📌 Quick Win: The 'Triage' Prompt</h3>
                                        <p className="text-white mb-4">Paste unread emails into your AI and ask:</p>
                                        <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                                            "Scan these emails. List ONLY the ones that require a reply from me today. For each, draft a 1-sentence response. Ignore newsletters, receipts, and FYIs."
                                        </div>
                                        <p className="text-blue-400 font-bold">Clear 50 emails in 2 minutes.</p>
                                    </div>

                                    <h3 className="text-2xl font-bold text-blue-400 mt-12 mb-4">The Science of Email Stress</h3>

                                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 mb-6">
                                        <p className="text-white font-bold text-sm mb-3">UC Irvine Research (Gloria Mark, 2012):</p>
                                        <ul className="space-y-2 text-sm text-slate-300 mb-4">
                                            <li>• Average worker checks email <strong className="text-red-400">74 times per day</strong></li>
                                            <li>• Each email check triggers <strong className="text-red-400">cortisol spike</strong> (stress hormone)</li>
                                            <li>• Takes <strong className="text-red-400">23 minutes</strong> to fully refocus after email interruption</li>
                                        </ul>

                                        <div className="bg-red-900/20 p-4 rounded mb-4">
                                            <p className="text-white font-bold text-sm mb-2">The Compound Effect:</p>
                                            <p className="text-slate-300 text-sm">74 interruptions × 23 min = <span className="text-red-400 font-bold">1,702 minutes of lost focus per day</span></p>
                                            <p className="text-slate-400 text-xs mt-2">That's 28 hours. In an 8-hour workday. How? Interruptions OVERLAP. You never fully recover.</p>
                                        </div>

                                        <p className="text-white font-bold text-sm mb-2">McKinsey 2012:</p>
                                        <ul className="space-y-1 text-xs text-slate-300">
                                            <li>• Employees spend <strong>28% of workday</strong> on email</li>
                                            <li>• Only <strong>15% of emails</strong> require immediate action</li>
                                            <li>• <strong>56% of email time</strong> wasted on low-value sorting</li>
                                        </ul>

                                        <div className="mt-4 p-4 bg-cyan-900/30 rounded border border-cyan-500/40">
                                            <p className="text-cyan-400 font-bold text-sm mb-2">Gatekeeper Agent breaks the cycle:</p>
                                            <ul className="space-y-1 text-xs text-slate-300">
                                                <li>• Pre-filters 95% BEFORE you see it</li>
                                                <li>• You check once or twice per day (your schedule)</li>
                                                <li>• Only see the 5% that actually needs you</li>
                                                <li>• Cortisol spikes: 74x → 2x per day</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-blue-400 mt-12 mb-4">The Inbox Zero Myth</h3>
                                    <p className="text-slate-300 mb-4">
                                        Inbox Zero worked in 2005 when you got 12 emails/day. In 2024, you get 100+/day. Inbox Zero = Sisyphean torture. The new goal: <strong>Inbox Irrelevant</strong>.
                                    </p>

                                    <Suspense fallback={<div className="h-48 animate-pulse bg-slate-800/50 rounded-xl my-8" />}>
                                        <WorkflowVisual
                                            title="The Gatekeeper Workflow"
                                            inputs={[
                                                { label: "Incoming Emails", icon: "mail" },
                                                { label: "Triage Rules", icon: "list" },
                                                { label: "Calendar", icon: "calendar" }
                                            ]}
                                            agentName="Gatekeeper Agent"
                                            outputs={[
                                                { label: "Draft Replies", icon: "file" },
                                                { label: "Calendar Events", icon: "calendar" },
                                                { label: "Archive/Delete", icon: "check" }
                                            ]}
                                        />
                                    </Suspense>

                                    <Suspense fallback={<div className="h-24 animate-pulse bg-yellow-900/20 rounded-xl my-8" />}>
                                        <TroubleshootingAccordion
                                            title="Gatekeeper Agent Troubleshooting"
                                            issues={[
                                                {
                                                    problem: "I missed an important email.",
                                                    solution: "Add a 'VIP List' rule. Tell the agent: 'ALWAYS flag emails from [spouse@email.com] or [boss@email.com]'. You can also ask it to 'List all emails from [Domain] separately'."
                                                },
                                                {
                                                    problem: "It's drafting robot-sounding replies.",
                                                    solution: "Give it 3 examples of your actual emails. Say: 'Mimic this tone: [paste examples]'. Tell it to be 'brief, casual, and lower-case'."
                                                },
                                                {
                                                    problem: "It's flagging everything as urgent.",
                                                    solution: "Refine your definition of urgent. Tell it: 'Urgent means it requires a reply TODAY or I lose money/trust. Everything else is not urgent'."
                                                }
                                            ]}
                                        />
                                    </Suspense>

                                    <div className="grid md:grid-cols-2 gap-6 my-8">
                                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                            <h4 className="text-white font-bold mb-3">Manual Processing</h4>
                                            <ul className="space-y-2 text-sm text-slate-300">
                                                <li className="flex items-center gap-2"><Clock size={14} className="text-red-400" /> Read every subject line</li>
                                                <li className="flex items-center gap-2"><Clock size={14} className="text-red-400" /> Open spam/newsletters</li>
                                                <li className="flex items-center gap-2"><Clock size={14} className="text-red-400" /> Archive manually</li>
                                                <li className="flex items-center gap-2"><Clock size={14} className="text-red-400" /> Reply to everything</li>
                                            </ul>
                                        </div>
                                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                            <h4 className="text-blue-400 font-bold mb-3">Agent Processing</h4>
                                            <ul className="space-y-2 text-sm text-slate-300">
                                                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Filters noise automatically</li>
                                                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Summarizes long threads</li>
                                                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Drafts replies for review</li>
                                                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Highlights urgent items</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                        <EmailChaosCalculator />
                                    </Suspense>

                                    <div className="my-8 border-l-4 border-red-500 pl-6 py-2">
                                        <h4 className="text-xl font-bold text-red-400 mb-2">☢️ The Nuclear Option: Email Bankruptcy</h4>
                                        <p className="text-slate-300 mb-4">
                                            If you have 5,000+ unread emails, you are already bankrupt. Stop paying interest on debt you'll never clear. Declare it.
                                        </p>
                                        <Suspense fallback={<div />}>
                                            <CopyPrompt
                                                title="The Bankruptcy Protocol"
                                                prompt={`I am declaring email bankruptcy.
1. Archive ALL emails older than 30 days.
2. Draft a 'Fresh Start' email to my VIP list (spouse, boss, key clients):
"I'm resetting my inbox to zero today. If you sent me something critical in the last month that I haven't replied to, please re-send it. Starting fresh."`}
                                                whatItDoes="Gives you a clean slate instantly. It's scary but liberating. Most 'urgent' emails from 3 weeks ago are already irrelevant."
                                                variables={[]}
                                            />
                                        </Suspense>
                                    </div>

                                    <div className="my-8 p-6 bg-purple-900/30 rounded-xl border border-purple-500/40">
                                        <h4 className="text-purple-400 font-bold mb-3">Not Bankruptcy-Level? The "Quick Reset" Protocol</h4>
                                        <p className="text-white text-sm mb-3">Email count: 50-200 unread</p>

                                        <div className="space-y-3 text-sm">
                                            <div className="bg-slate-900/50 p-3 rounded">
                                                <p className="text-cyan-400 font-bold mb-2">STEP 1: The 2-Week Cutoff</p>
                                                <p className="text-slate-300 text-xs">Ask agent: "Archive all emails older than 2 weeks. For the rest, create 3 lists: URGENT (needs reply this week), FYI (worth reading, no action), JUNK (newsletters/receipts/spam)"</p>
                                            </div>

                                            <div className="bg-slate-900/50 p-3 rounded">
                                                <p className="text-cyan-400 font-bold mb-2">STEP 2: Process the Lists</p>
                                                <div className="text-xs text-slate-300 space-y-1">
                                                    <div>• URGENT list: Handle today (likely 5-10 emails)</div>
                                                    <div>• FYI list: Read on Friday afternoon (optional)</div>
                                                    <div>• JUNK list: Archive, unsubscribe from patterns</div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-green-400 font-bold text-sm mt-4">Total time: 20 minutes. Monthly maintenance: Archive 30+ days every Friday.</p>
                                    </div>

                                    <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                                        <h4 className="text-green-400 font-bold mb-3">📖 Alex, 2 Months Later</h4>
                                        <div className="space-y-3 text-sm text-slate-300">
                                            <p>Monday morning, 7:30 AM.</p>
                                            <p>Alex opens her "Email Triage" conversation with ChatGPT.</p>
                                            <p>Pastes her 47 unread weekend emails. <span className="text-green-400">(Down from 472!)</span></p>
                                            <p className="text-white">AI responds in 6 seconds:</p>

                                            <div className="bg-slate-900/50 p-4 rounded font-mono text-xs space-y-2">
                                                <div className="text-red-400">URGENT (needs reply today):</div>
                                                <div className="pl-3 space-y-1">
                                                    <div>1. Boss Q4 question → DRAFT: "Happy to discuss. Proposing Thursday 2 PM call?"</div>
                                                    <div>2. Client billing issue → DRAFT: "Forwarding to accounting, will update by EOD."</div>
                                                </div>
                                                <div className="text-cyan-400 mt-2">FYI (no action needed):</div>
                                                <div className="pl-3 space-y-1">
                                                    <div>• 3 team updates (AI summary: "Project on track")</div>
                                                    <div>• 2 vendor updates (AI summary: "Routine maintenance")</div>
                                                </div>
                                                <div className="text-slate-500 mt-2">ARCHIVE: 42 newsletters, receipts, spam</div>
                                            </div>

                                            <p className="text-white italic">Total time: 4 minutes to review, edit drafts, send.</p>
                                            <p>8:00 AM: Inbox clear. Work begins.</p>

                                            <div className="mt-4 pt-3 border-t border-green-500/30">
                                                <p className="text-white font-bold text-sm mb-2">2-MONTH RESULTS:</p>
                                                <div className="space-y-1 text-xs text-slate-300">
                                                    <div>• Email checks: 74x/day → 2x/day (morning + 3 PM)</div>
                                                    <div>• Avg inbox: 628 → 12</div>
                                                    <div>• Stress: "Constantly" → "Tuesday mornings only"</div>
                                                    <div>• Time on email: 28% of day (2.2 hrs) → 8% (40 min)</div>
                                                </div>
                                                <p className="text-green-400 font-bold mt-2">Reclaimed: 90 min/day = 7.5 hours/week = 390 hours/year</p>
                                                <p className="text-white italic text-sm mt-3">"I used to work FOR my inbox. Now my inbox works for me."</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                                        <h4 className="text-yellow-400 font-bold mb-3">💬 Common Objections (And The Truth)</h4>

                                        <div className="space-y-4 text-sm">
                                            <div>
                                                <p className="text-white font-bold mb-2">"But I like Inbox Zero. This sounds chaotic."</p>
                                                <p className="text-slate-300 text-xs mb-2">Inbox Zero worked in 2005 (12 emails/day). In 2024 (100+/day), it's torture.</p>
                                                <p className="text-cyan-400 text-xs">New goal: <strong>Inbox Irrelevant</strong>. You've triaged the 5% that matters. The other 95% can sit there forever.</p>
                                            </div>

                                            <div>
                                                <p className="text-white font-bold mb-2">"What if I miss something important?"</p>
                                                <p className="text-green-400 text-xs mb-1">VIP Bypass Rule:</p>
                                                <p className="text-slate-300 text-xs">Tell agent: "ALWAYS flag emails from [boss@company.com] and [spouse@email.com]"</p>
                                                <p className="text-slate-400 text-xs mt-1">(Alex has 4 VIPs. Zero missed messages in 2 months.)</p>
                                            </div>

                                            <div>
                                                <p className="text-white font-bold mb-2">"My boss expects immediate replies."</p>
                                                <p className="text-slate-300 text-xs mb-1">Research shows: "Immediate" to your boss = within 4 hours. "Immediate" to you = 4 minutes.</p>
                                                <p className="text-cyan-400 text-xs">You CAN check email twice/day (9 AM, 3 PM) and still hit all real deadlines. Test it next week.</p>
                                            </div>

                                            <div>
                                                <p className="text-white font-bold mb-2">"I have 200 emails, not 5,000. Is bankruptcy overkill?"</p>
                                                <p className="text-green-400 text-xs">Yes. Try the "Quick Reset" protocol above instead. Clean slate in 20 minutes. No drama.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-blue-400 mt-12 mb-4">The Robinson Family: Shared Inbox Nightmare → Peace</h3>
                                    <p className="text-slate-300 text-sm mb-4">
                                        Sarah & Tom Robinson, married 12 years, 2 kids, Boston
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                        <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                                            <h4 className="text-red-400 font-bold mb-3">THE PROBLEM</h4>
                                            <div className="space-y-2 text-xs text-slate-300">
                                                <div><strong>Shared email:</strong> therobinsons2012@gmail.com</div>
                                                <div className="pt-2"><strong>Used for:</strong></div>
                                                <div className="pl-3 space-y-1">
                                                    <div>• Kids' school updates (daily)</div>
                                                    <div>• Medical appointments</div>
                                                    <div>• Bills & receipts</div>
                                                    <div>• Tom's side gig clients</div>
                                                    <div>• Sarah's volunteer committee</div>
                                                </div>
                                                <div className="pt-2 text-red-400"><strong>472 unread by June</strong></div>
                                                <div className="pt-2"><strong>Chaos cost (Year 1):</strong></div>
                                                <div className="pl-3 space-y-1">
                                                    <div>• Missed appointments: $180 fees</div>
                                                    <div>• Late bill penalties: $95</div>
                                                    <div>• Duplicate orders: $67</div>
                                                    <div>• Marriage counseling: $400</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                                            <h4 className="text-green-400 font-bold mb-3">6-MONTH RESULTS</h4>
                                            <div className="space-y-2 text-xs text-slate-300">
                                                <div><strong>Monday routine:</strong> Sarah 5 min</div>
                                                <div className="pl-3 space-y-1">
                                                    <div>• Paste weekend emails to Agent</div>
                                                    <div>• Agent sorts: Sarah actions, Tom actions, Calendar, Receipts, Archive</div>
                                                </div>
                                                <div className="pt-2"><strong>Results:</strong></div>
                                                <div className="pl-3 space-y-1">
                                                    <div>• Inbox: 472 → Under 20 (always)</div>
                                                    <div>• Missed items: 0</div>
                                                    <div>• Email arguments: 6x/week → 0</div>
                                                    <div>• Time saved: 6 hours/week family time</div>
                                                </div>
                                                <div className="pt-2 text-green-400"><strong>Annual value: 312 hours = Family movie nights back</strong></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 rounded-xl border border-cyan-500/50 mb-6 text-center">
                                        <p className="text-white italic text-sm">"We're not fighting about who saw what email anymore. I actually look forward to planning now. It's organized." — Tom Robinson</p>
                                    </div>

                                    <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                        <DigitalDetoxChallenge />
                                    </Suspense>

                                    <Suspense fallback={null}>
                                        <CaptainTip type="pro" title="The 'VIP Only' Notification Rule">
                                            "Turn off ALL email notifications on your phone. Exception: Create a 'VIP' list (spouse, boss, key client). Only THEIR emails buzz your phone. Everything else waits for your designated email time."
                                        </CaptainTip>
                                    </Suspense>

                                    <div className="mt-12 p-6 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-xl border border-cyan-500/50">
                                        <h4 className="text-cyan-400 font-bold mb-3">🚀 What's Next?</h4>
                                        <p className="text-slate-300 text-sm mb-3">
                                            You've reclaimed:
                                        </p>
                                        <div className="space-y-1 text-sm text-slate-300 mb-4">
                                            <div>• <strong className="text-white">Part 2:</strong> Mornings (30 min/day) + Food ($900/month) + Home ($6K/year)</div>
                                            <div>• <strong className="text-white">Chapter 7:</strong> Email (90 min/day = 7.5 hours/week)</div>
                                        </div>
                                        <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30 mb-4">
                                            <p className="text-cyan-400 font-bold text-lg">Running total: ~22.5 hours/week reclaimed</p>
                                        </div>
                                        <p className="text-white font-bold text-sm mb-2">
                                            But here's the problem:
                                        </p>
                                        <p className="text-red-400 font-bold mb-3">
                                            You're winning back time from email... only to lose it to MEETINGS.
                                        </p>
                                        <div className="bg-red-900/20 p-3 rounded text-xs text-slate-300 space-y-1">
                                            <div>• 37 meetings this week (Rachel's story - next)</div>
                                            <div>• The "Swiss Cheese Calendar"</div>
                                            <div>• The "Quick Sync" epidemic</div>
                                            <div>• The "Can we jump on a call?" tax</div>
                                        </div>
                                        <p className="text-orange-400 font-bold mt-4">
                                            Chapter 8: The Calendar Defense Agent
                                        </p>
                                        <p className="text-slate-400 text-xs mt-2">
                                            How to protect your Deep Work time like a fortress.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 8: Calendar */}
                    <section id="chapter-8" className="py-16 px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 8: The Calendar Defense Agent</h2>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 mb-8">
                                    <h3 className="text-red-400 font-bold mb-3">The 37-Meeting Week</h3>
                                    <p className="text-white font-bold text-sm mb-3">
                                        Rachel Park, product manager, San Francisco
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Monday morning, Rachel opens Google Calendar.
                                    </p>
                                    <p className="text-red-400 font-bold text-lg mb-3">
                                        37 meetings this week.
                                    </p>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>Monday: 9 meetings (9 AM - 5:30 PM)</div>
                                            <div>Tuesday: 8 meetings</div>
                                            <div>Wednesday: 7 meetings</div>
                                            <div>Thursday: 6 meetings</div>
                                            <div>Friday: 7 meetings</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-3">
                                        She stares at the schedule. "When do I actually... work?"
                                    </p>
                                    <p className="text-red-400 font-bold mb-3">
                                        Longest uninterrupted block all week: 47 minutes (Wednesday 2:13-3:00 PM)
                                    </p>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <p className="text-white text-sm mb-2">The meetings:</p>
                                        <div className="space-y-1 text-xs text-slate-400">
                                            <div>• "Quick Sync" (15 min that became 30)</div>
                                            <div>• "Touch Base" (no agenda)</div>
                                            <div>• "Can we jump on a call?" (could've been email)</div>
                                            <div>• "Weekly standup" (for a project she's not on)</div>
                                            <div>• "Brainstorm session" (8 people, 2 talking)</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-3">
                                        By Wednesday 4 PM: She hasn't written a single line of actual work.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        47 emails unanswered. 3 deliverables due Friday. Panic mode.
                                    </p>
                                    <p className="text-red-400 italic text-sm mb-3">
                                        Thursday 11 PM: Still working. Exhausted. "This is unsustainable."
                                    </p>
                                    <div className="mt-4 pt-3 border-t border-red-500/30 text-xs text-slate-400">
                                        <p className="text-white font-bold mb-2">Annual cost:</p>
                                        <p>15 hours/week in useless meetings × 52 weeks = <span className="text-red-400 font-bold">780 hours wasted</span></p>
                                        <p className="text-red-400">That's 19.5 work weeks spent in meetings that could've been emails.</p>
                                    </div>
                                </div>

                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="working"
                                        message="You just read about Rachel. 37 meetings. 47-minute longest block all week. Here's what happened: Her calendar became a to-do list for OTHER PEOPLE'S agendas. Every meeting is someone saying 'I need 30 minutes of your brain.' But here's the secret: Most meetings are interruptible shallow work disguised as collaboration. Show me your calendar, and I'll show you your priorities. If it's full of 'Quick Syncs' and 'Touch Bases', your priority is other people's comfort, not your output. We need to build a Fortress around your Deep Work time. Rachel's about to learn how."
                                    />
                                </Suspense>

                                <div className="mt-12 prose prose-invert prose-lg max-w-none">

                                    <h3 className="text-2xl font-bold text-purple-400 mt-12 mb-4">The Science of Meeting Fragmentation</h3>

                                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 mb-6">
                                        <p className="text-white font-bold text-sm mb-3">UC Irvine (Gloria Mark, 2008):</p>
                                        <ul className="space-y-2 text-sm text-slate-300 mb-4">
                                            <li>• Average knowledge worker switches tasks <strong className="text-red-400">every 3 minutes</strong></li>
                                            <li>• Takes <strong className="text-red-400">23 minutes</strong> to fully refocus after interruption</li>
                                            <li>• Meetings are the <strong className="text-red-400">#1 cause</strong> of task switching</li>
                                        </ul>

                                        <p className="text-white font-bold text-sm mb-2">Cal Newport (Deep Work, 2016):</p>
                                        <ul className="space-y-2 text-sm text-slate-300 mb-4">
                                            <li>• Deep Work requires <strong className="text-purple-400">minimum 90 minutes uninterrupted</strong></li>
                                            <li>• "Swiss Cheese Calendar" = <strong className="text-red-400">zero deep work capacity</strong></li>
                                        </ul>

                                        <div className="bg-red-900/20 p-4 rounded mb-4">
                                            <p className="text-white font-bold text-sm mb-2">The Math of Rachel's Week:</p>
                                            <div className="space-y-1 text-xs text-slate-300">
                                                <div>37 meetings × 30 min avg = 18.5 hours in meetings</div>
                                                <div>Context switches: 74 (every meeting entry/exit)</div>
                                                <div>Recovery time: 74 × 23 min = <span className="text-red-400 font-bold">1,702 minutes = 28 hours</span></div>
                                                <div className="pt-2 border-t border-red-500/30 mt-2">
                                                    <strong>Total cost:</strong> 18.5 hrs + 28 hrs = <span className="text-red-400 font-bold">46.5 hours</span>
                                                </div>
                                                <div className="text-red-400 font-bold">In a 40-hour work week.</div>
                                                <div className="text-red-400 font-bold">Actual deep work time: 0 hours.</div>
                                            </div>
                                        </div>

                                        <p className="text-white font-bold text-sm mb-2">Paul Graham (Maker vs Manager Schedule, 2009):</p>
                                        <ul className="space-y-1 text-xs text-slate-300">
                                            <li>• Makers (engineers, writers, designers) need <strong>4-hour blocks</strong></li>
                                            <li>• Managers can handle <strong>1-hour blocks</strong></li>
                                            <li>• Single 30-min meeting = destroys entire morning for maker</li>
                                        </ul>

                                        <div className="mt-4 p-4 bg-purple-900/30 rounded border border-purple-500/40">
                                            <p className="text-purple-400 font-bold text-sm mb-2">Calendar Fortress breaks the cycle:</p>
                                            <ul className="space-y-1 text-xs text-slate-300">
                                                <li>• Block "Deep Work Hours" (non-negotiable 9 AM - 12 PM Mon/Wed/Fri)</li>
                                                <li>• Batch meetings into "Meeting Hours" (2-5 PM Tue/Thu)</li>
                                                <li>• Context switches: 74x → 8x per week</li>
                                                <li>• Deep work capacity: 0 hrs → 9 hrs/week</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-6 rounded-xl border border-purple-500/50 my-8">
                                        <h3 className="text-xl font-bold text-purple-400 mb-3">📌 Quick Win: The Calendar Audit Prompt</h3>
                                        <p className="text-white mb-4">Paste your next week's calendar into your AI:</p>
                                        <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                                            "Analyze this week's calendar. For each meeting, answer:<br />
                                            1. Purpose: What is this meeting FOR?<br />
                                            2. Could this be async? (email, Slack, Loom video)<br />
                                            3. Do I NEED to attend, or just get the summary?<br />
                                            4. Suggested action: KEEP / DECLINE / DELEGATE / SHORTEN<br /><br />
                                            Then design my Ideal Week:<br />
                                            - Mark 3x 90-min 'Deep Work' blocks (non-negotiable)<br />
                                            - Batch remaining meetings into 2 afternoons<br />
                                            - Show me what I can decline without consequences."
                                        </div>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <p className="text-white font-bold">What you'll discover:</p>
                                            <ul className="space-y-1 text-xs">
                                                <li>• 40-60% of meetings can be async</li>
                                                <li>• 20% you don't need to attend (someone can summarize)</li>
                                                <li>• 15% can be 15 min instead of 30 min</li>
                                            </ul>
                                            <p className="text-purple-400 font-bold mt-3">Time reclaimed: 8-12 hours/week</p>
                                        </div>
                                    </div>

                                    <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/30 my-8">
                                        <h3 className="text-xl font-bold text-purple-400 mb-3">The Swiss Cheese Calendar</h3>
                                        <p className="text-white mb-4">You know those days where you have a meeting at 9:00, 10:30, 1:00, and 3:30?</p>
                                        <p className="text-slate-300 text-sm">
                                            You have "free time" in between, but it's useless. It's too short to start deep work, so you just answer emails. That's a Swiss Cheese day. It feels busy, but achieves nothing.
                                        </p>
                                    </div>

                                    <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                        <CalendarAuditTool />
                                    </Suspense>

                                    <h3 className="text-2xl font-bold text-purple-400 mt-12 mb-4">Ideal Week Architecture</h3>
                                    <p className="text-slate-300 mb-4">Design your week BEFORE other people fill it.</p>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-green-500">
                                            <h4 className="font-bold text-white">Focus Blocks (Deep Work)</h4>
                                            <p className="text-sm text-slate-400">90-120 min blocks. No meetings. No slack. Pure output.</p>
                                        </div>
                                        <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-yellow-500">
                                            <h4 className="font-bold text-white">Admin Blocks (Shallow Work)</h4>
                                            <p className="text-sm text-slate-400">Batch all emails, calls, and quick tasks here. 30-60 min.</p>
                                        </div>
                                        <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-blue-500">
                                            <h4 className="font-bold text-white">Meeting Blocks</h4>
                                            <p className="text-sm text-slate-400">Back-to-back meetings. Get them all done in one afternoon.</p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-green-900/30 to-purple-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                                        <h4 className="text-green-400 font-bold mb-3">📖 Rachel, 3 Months Later</h4>
                                        <div className="space-y-3 text-sm text-slate-300">
                                            <p>Monday morning, Rachel opens calendar.</p>
                                            <p><span className="text-green-400 font-bold">18 meetings this week.</span> (Down from 37!)</p>
                                            <p className="text-white">But here's the difference:</p>

                                            <div className="bg-slate-900/50 p-4 rounded">
                                                <p className="text-green-400 font-bold text-xs mb-2">DEEP WORK BLOCKS (Protected):</p>
                                                <div className="space-y-1 text-xs">
                                                    <div>• Mon/Wed/Fri: 9 AM - 12 PM (marked "FOCUS - Do Not Book")</div>
                                                    <div>• Calendar shows "Busy" (not details)</div>
                                                    <div>• 9 hours/week guaranteed deep work</div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-900/50 p-4 rounded">
                                                <p className="text-purple-400 font-bold text-xs mb-2">MEETING HOURS (Batched):</p>
                                                <div className="space-y-1 text-xs">
                                                    <div>• Tue/Thu: 2-5 PM (back-to-back, no gaps)</div>
                                                    <div>• All meetings happen in these 6 hours</div>
                                                    <div>• No more Swiss Cheese</div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-900/50 p-4 rounded">
                                                <p className="text-white font-bold text-xs mb-2">What Rachel Declined:</p>
                                                <div className="space-y-1 text-xs">
                                                    <div>• "Quick Sync" → "Can you send async update instead?"</div>
                                                    <div>• "Brainstorm" (not her project) → "Can someone share notes?"</div>
                                                    <div>• "Touch Base" (no agenda) → "What's the specific question?"</div>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-3 border-t border-green-500/30">
                                                <p className="text-white font-bold text-sm mb-2">3-MONTH RESULTS:</p>
                                                <div className="space-y-1 text-xs text-slate-300">
                                                    <div>• Meetings: 37/week → 18/week (saved 9.5 hrs/week)</div>
                                                    <div>• Deep work: 0 hrs/week → 9 hrs/week</div>
                                                    <div>• Context switches: 74/week → 16/week</div>
                                                    <div>• Deliverables: Always late → Ahead of schedule</div>
                                                    <div>• Promotion: Received (productivity noticed)</div>
                                                </div>
                                                <p className="text-green-400 font-bold mt-2">Annual value: 494 hours reclaimed = 12.4 work weeks</p>
                                                <p className="text-white italic text-sm mt-3">"I went from reactive to scheduled. My calendar works FOR me now, not against me."</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                                        <h4 className="text-yellow-400 font-bold mb-3">💬 Common Objections (And The Truth)</h4>

                                        <div className="space-y-4 text-sm">
                                            <div>
                                                <p className="text-white font-bold mb-2">"But meetings ARE my job. I'm a manager."</p>
                                                <p className="text-slate-300 text-xs mb-2">Paul Graham: Managers can work on 1-hour blocks. Makers need 4-hour blocks.</p>
                                                <p className="text-cyan-400 text-xs">If you're a manager: Batch 1-on-1s into Tue afternoon (6 × 30-min slots). If you're a maker: Protect AM for deep work, meetings PM only. Rachel is a hybrid. It still works.</p>
                                            </div>

                                            <div>
                                                <p className="text-white font-bold mb-2">"My boss will think I'm unavailable."</p>
                                                <p className="text-slate-300 text-xs mb-1">Test: Block Mon/Wed/Fri 9 AM - 12 PM for 2 weeks. Mark it "Focus Time" or "Project Work."</p>
                                                <p className="text-green-400 text-xs">Track: Did anyone complain? Did you miss anything urgent? Spoiler: No. Urgent things still got handled in afternoon meeting hours.</p>
                                            </div>

                                            <div>
                                                <p className="text-white font-bold mb-2">"How do I say NO without being rude?"</p>
                                                <div className="text-xs text-slate-300 space-y-1">
                                                    <p className="text-purple-400">Templates:</p>
                                                    <div className="pl-3 space-y-1">
                                                        <div>• "I have a conflict. Can we do [alternative time in your meeting hours]?"</div>
                                                        <div>• "Would an async update work? Happy to review via email."</div>
                                                        <div>• "Can I get the summary afterward? I trust your judgment."</div>
                                                    </div>
                                                    <p className="text-slate-400 mt-2">Rachel declined 19 meetings/week with these. Zero complaints.</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-white font-bold mb-2">"What if I LIKE meetings? They're social for me."</p>
                                                <p className="text-cyan-400 text-xs">That's fine. This isn't anti-meeting. It's anti-CHAOTIC meetings. If you want 30 meetings/week, batch them. Don't scatter them. Swiss Cheese = reactive chaos. Batched = intentional collaboration.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-purple-400 mt-12 mb-4">VP-Level Calendar Defense: David Thompson</h3>
                                    <p className="text-slate-300 text-sm mb-4">
                                        David Thompson, VP Engineering, 120-person team, NYC
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                        <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                                            <h4 className="text-red-400 font-bold mb-3">THE PROBLEM (Year 1)</h4>
                                            <div className="space-y-2 text-xs text-slate-300">
                                                <div>• 42 meetings/week average</div>
                                                <div>• Back-to-back 8 AM - 6 PM most days</div>
                                                <div>• "Office hours" = anyone could book anytime</div>
                                                <div>• Strategic work: 9 PM - midnight at home</div>
                                                <div className="pt-2 text-red-400"><strong>Burnout imminent</strong></div>
                                                <div className="pt-2"><strong>Year 1 Chaos:</strong></div>
                                                <div className="pl-3 space-y-1">
                                                    <div>• Delivered 0 of 3 strategic initiatives</div>
                                                    <div>• Team morale declining</div>
                                                    <div>• CEO feedback: "You're in too many weeds"</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                                            <h4 className="text-green-400 font-bold mb-3">THE FORTRESS (6 Months)</h4>
                                            <div className="space-y-2 text-xs text-slate-300">
                                                <div><strong>Mon/Wed: Deep Work Days</strong></div>
                                                <div className="pl-3 space-y-1">
                                                    <div>• 8 AM - 12 PM: Strategic planning (blocked)</div>
                                                    <div>• 2-5 PM: Meetings (max 6 slots)</div>
                                                </div>
                                                <div className="pt-2"><strong>Tue/Thu: Meeting Days</strong></div>
                                                <div className="pl-3">• 9 AM - 5:30 PM: Back-to-back (all moved here)</div>
                                                <div className="pt-2"><strong>Rules:</strong></div>
                                                <div className="pl-3 space-y-1">
                                                    <div>• No meetings before 2 PM Mon/Wed</div>
                                                    <div>• All 1-on-1s on Tue/Thu 2-5 PM</div>
                                                    <div>• Office hours: Tue/Thu 4-5 PM only</div>
                                                </div>
                                                <div className="pt-2 text-green-400"><strong>6-Month Results:</strong></div>
                                                <div className="pl-3 space-y-1">
                                                    <div>• Meetings: 42 → 24/week (9 hrs saved)</div>
                                                    <div>• Deep work: 2 hrs → 16 hrs/week</div>
                                                    <div>• 3/3 strategic initiatives delivered</div>
                                                    <div>• CEO: "Best quarter in 2 years"</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 p-6 rounded-xl border border-purple-500/50 mb-6 text-center">
                                        <p className="text-white italic text-sm">"Protecting deep work time wasn't about working less. It was about working on what actually matters." — David Thompson, VP Engineering</p>
                                    </div>

                                    <div className="mt-12 p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-500/50">
                                        <h4 className="text-purple-400 font-bold mb-3">🚀 What's Next?</h4>
                                        <p className="text-slate-300 text-sm mb-3">
                                            You've reclaimed:
                                        </p>
                                        <div className="space-y-1 text-sm text-slate-300 mb-4">
                                            <div>• <strong className="text-white">Part 2:</strong> Mornings (30 min/day) + Food ($900/month) + Home ($6K/year)</div>
                                            <div>• <strong className="text-white">Chapter 7:</strong> Email (90 min/day = 7.5 hours/week)</div>
                                            <div>• <strong className="text-white">Chapter 8:</strong> Calendar (90 min/day = 9.5 hours/week)</div>
                                        </div>
                                        <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30 mb-4">
                                            <p className="text-purple-400 font-bold text-lg">Running total: ~32 hours/week reclaimed</p>
                                        </div>
                                        <p className="text-white font-bold text-sm mb-2">
                                            But here's the problem:
                                        </p>
                                        <p className="text-red-400 font-bold mb-3">
                                            You have free time now... and it fills with ADMIN CHAOS.
                                        </p>
                                        <div className="bg-red-900/20 p-3 rounded text-xs text-slate-300 space-y-1">
                                            <div>• Forms that sit for weeks</div>
                                            <div>• Bills you forgot to pay</div>
                                            <div>• Scheduling appointments (6 hours/week)</div>
                                            <div>• The "death by 1,000 paper cuts"</div>
                                        </div>
                                        <p className="text-orange-400 font-bold mt-4">
                                            Chapter 9: The Admin Agent
                                        </p>
                                        <p className="text-slate-400 text-xs mt-2">
                                            How to batch all life admin into a 90-minute Sunday power hour.
                                        </p>
                                    </div>
                                </div>
                            </div>
                    </section>

                    {/* Chapter 9: Admin */}
                    <section id="chapter-9" className="py-16 px-6 bg-[#131320] border-y border-slate-800">
                        <div className="max-w-4xl mx-auto">
                            <div className="mt-12 prose prose-invert prose-lg max-w-none">
                                <h2 className="text-4xl font-bold text-white mb-6">Chapter 9: The Admin Agent</h2>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/40 mb-8">
                                    <h3 className="text-red-400 font-bold mb-3">The Forgotten Renewal</h3>
                                    <p className="text-white font-bold text-sm mb-3">
                                        Mike Torres, software engineer, Austin
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Tuesday afternoon, 3:47 PM. Email notification.
                                    </p>
                                    <p className="text-red-400 font-bold text-lg mb-3">
                                        "FINAL NOTICE: Car insurance expires in 3 days. Policy will cancel."
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Wait. What?
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3">
                                        Mike opens email. Original notice sent 45 days ago. Read, marked "deal with later," buried under 247 other emails.
                                    </p>
                                    <div className="bg-slate-900/50 p-4 rounded my-3">
                                        <p className="text-white text-sm mb-2">Panic spread through task backlog:</p>
                                        <div className="space-y-1 text-xs text-slate-400">
                                            <div>• DMV registration renewal (overdue 2 weeks, $75 late fee pending)</div>
                                            <div>• Dentist appointment (forgot to schedule, now 9-month wait)</div>
                                            <div>• HOA violation notice (trash bins visible from street, $50 fine)</div>
                                            <div>• Health insurance form (sitting on desk, 2 months, needs signature)</div>
                                            <div>• Dad's birthday card (last week, still not mailed)</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-3">
                                        All "quick 5-minute tasks." None done.
                                    </p>
                                    <div className="bg-red-900/20 p-4 rounded my-3">
                                        <p className="text-white font-bold text-sm mb-2">Mike calculates:</p>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• Insurance lapse: $200 penalty to reinstate</div>
                                            <div>• DMV late fee: $75</div>
                                            <div>• HOA fine: $50</div>
                                            <div>• Dentist delay: 9-month toothache wait</div>
                                            <div>• Dad guilt: Immeasurable</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-red-500/30 text-xs text-slate-400">
                                        <p className="text-white font-bold mb-2">Annual "admin tax":</p>
                                        <div className="space-y-1">
                                            <div>• 6 hours/week scrambling (bills, forms, scheduling)</div>
                                            <div>• $800/year in late fees, penalties, rushed shipping</div>
                                            <div>• Endless low-level anxiety ("Did I forget something?")</div>
                                        </div>
                                        <p className="text-red-400 mt-3">Thursday 11 PM: Finally renewed insurance. Mental note: "I need to get organized."</p>
                                        <p className="text-slate-500 text-xs mt-2">(Narrator: He will not get organized. This will happen again next quarter.)</p>
                                    </div>
                                </div>

                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="celebrating"
                                        message="You just read about Mike. Insurance lapsed. DMV overdue. Dentist wait now 9 months. Here's what happened: Admin tasks are BORING. Your brain hates boring. So it procrastinates. Every 'quick 5-minute task' gets delayed until it becomes a $75 late fee. But here's the secret: Robots don't get bored. They LOVE filling out forms. They don't procrastinate. They don't forget. Let's hand over the soul-sucking tasks to something that doesn't have a soul. Mike's about to learn the Sunday Power Hour."
                                    />
                                </Suspense>

                                <div className="mt-12 prose prose-invert prose-lg max-w-none">

                                    <h3 className="text-2xl font-bold text-indigo-400 mt-12 mb-4">The Science of Admin Avoidance</h3>

                                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 mb-6">
                                        <p className="text-white font-bold text-sm mb-3">Roy Baumeister (Decision Fatigue, 2011):</p>
                                        <ul className="space-y-2 text-sm text-slate-300 mb-4">
                                            <li>• Every decision depletes mental energy</li>
                                            <li>• Low-value decisions (schedule appointment, pay bill) feel <strong className="text-red-400">WORSE</strong> than high-value</li>
                                            <li>• Why? <strong className="text-red-400">Effort feels disproportionate to importance</strong></li>
                                            <li>• Brain rebels: "This is boring, do later"</li>
                                        </ul>

                                        <div className="bg-indigo-900/20 p-4 rounded mb-4">
                                            <p className="text-white font-bold text-sm mb-2">The Admin Procrastination Loop:</p>
                                            <div className="space-y-1 text-xs text-slate-300">
                                                <div>1. See admin task (renew insurance)</div>
                                                <div>2. Brain calculates: 5 min effort, low immediate reward</div>
                                                <div>3. Decision: "Later"</div>
                                                <div>4. Repeat 40x over 45 days</div>
                                                <div>5. Task becomes URGENT (3-day deadline)</div>
                                                <div>6. Now requires 30 min + penalty fees</div>
                                                <div>7. Stress spikes, handle frantically</div>
                                            </div>
                                            <p className="text-red-400 text-xs mt-3">Ironically, procrastinating INCREASES total effort.</p>
                                        </div>

                                        <div className="bg-red-900/20 p-4 rounded mb-4">
                                            <p className="text-white font-bold text-sm mb-2">Mike's Admin Chaos Math:</p>
                                            <div className="space-y-1 text-xs text-slate-300">
                                                <div>Weekly admin tasks: 12 (avg)</div>
                                                <div className="pl-3 space-y-1 mt-1">
                                                    <div>• Bills to pay: 3</div>
                                                    <div>• Appointments to schedule: 2</div>
                                                    <div>• Forms to fill: 2</div>
                                                    <div>• Emails to file: 3</div>
                                                    <div>• Renewals to handle: 2</div>
                                                </div>
                                                <div className="pt-2">If each takes 5 min: 12 × 5 = 60 min/week</div>
                                                <div className="pt-2 border-t border-red-500/30 mt-2">
                                                    <strong>But scattered across 7 days:</strong>
                                                </div>
                                                <div>• Context switching cost: 23 min per task (Gloria Mark)</div>
                                                <div>• 12 tasks × 23 min = <span className="text-red-400 font-bold">276 minutes = 4.6 hours</span></div>
                                                <div className="text-red-400 font-bold pt-2">Actual time cost: 4.6 hours/week for 1 hour of work.</div>
                                            </div>
                                        </div>

                                        <div className="mt-4 p-4 bg-indigo-900/30 rounded border border-indigo-500/40">
                                            <p className="text-indigo-400 font-bold text-sm mb-2">Sunday Power Hour breaks the cycle:</p>
                                            <ul className="space-y-1 text-xs text-slate-300">
                                                <li>• Batch all 12 tasks into 90-min block</li>
                                                <li>• AI pre-sorts: PAY NOW / SCHEDULE / FILE / DELETE</li>
                                                <li>• Context switches: 12x → 1x</li>
                                                <li>• Time cost: 4.6 hrs → 1.5 hrs (saved 3.1 hrs/week)</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-6 rounded-xl border border-indigo-500/50 my-8">
                                        <h3 className="text-xl font-bold text-indigo-400 mb-3">📌 Quick Win: The Weekly Admin Triage Prompt</h3>
                                        <p className="text-white mb-4">Every Sunday 10 AM, paste this week's admin tasks into your AI:</p>
                                        <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                                            "Here's my admin inbox for this week:<br />
                                            [Paste bills, appointment reminders, forms, renewals, etc.]<br /><br />
                                            Triage these into 4 categories:<br /><br />
                                            1. PAY NOW (bills due this week)<br />
                                            &nbsp;&nbsp;&nbsp;- Draft payment confirmation emails<br />
                                            &nbsp;&nbsp;&nbsp;- List due dates<br /><br />
                                            2. SCHEDULE (appointments, calls)<br />
                                            &nbsp;&nbsp;&nbsp;- Suggest 3 time slots for each<br />
                                            &nbsp;&nbsp;&nbsp;- Draft booking emails/texts<br /><br />
                                            3. FILE (receipts, confirmations, documents)<br />
                                            &nbsp;&nbsp;&nbsp;- Suggest folder names<br />
                                            &nbsp;&nbsp;&nbsp;- Create file naming convention<br /><br />
                                            4. DELETE (spam, expired offers)<br />
                                            &nbsp;&nbsp;&nbsp;- List to archive<br /><br />
                                            Then create my 90-min Sunday Admin Routine:<br />
                                            - 10:00-10:30: Process PAY NOW (with your drafted emails)<br />
                                            - 10:30-11:00: Process SCHEDULE (book appointments)<br />
                                            - 11:00-11:30: Process FILE + review next week's calendar<br /><br />
                                            Show me what I can automate vs what needs my signature/click."
                                        </div>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <p className="text-white font-bold">What you'll discover:</p>
                                            <ul className="space-y-1 text-xs">
                                                <li>• 60-70% can be drafted by AI (you just click Send)</li>
                                                <li>• 20% can be fully automated (recurring bills)</li>
                                                <li>• 10% needs your manual action (signatures)</li>
                                            </ul>
                                            <p className="text-indigo-400 font-bold mt-3">Time reclaimed: 3-4 hours/week</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 my-8">
                                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                            <h4 className="text-indigo-400 font-bold mb-3">The "Admin Day" Strategy</h4>
                                            <p className="text-sm text-slate-300">
                                                Instead of doing admin bits every day, batch them all into one "Power Hour" or half-day per week.
                                            </p>
                                        </div>
                                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                            <h4 className="text-indigo-400 font-bold mb-3">What to Outsource</h4>
                                            <ul className="space-y-1 text-sm text-slate-300">
                                                <li>• Scheduling appointments</li>
                                                <li>• Filling out forms</li>
                                                <li>• Paying bills</li>
                                                <li>• Organizing files</li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>

                                <div className="bg-gradient-to-r from-green-900/30 to-indigo-900/30 p-6 rounded-xl border border-green-500/50 my-8">
                                    <h4 className="text-green-400 font-bold mb-3">📖 Mike, 2 Months Later</h4>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        <p>Sunday morning, 10:00 AM. Coffee brewing. Mike opens "Sunday Admin" conversation with ChatGPT.</p>
                                        <p className="text-white">Pastes this week's tasks:</p>

                                        <div className="bg-slate-900/50 p-4 rounded font-mono text-xs space-y-1">
                                            <div>• 3 bills (electric, internet, credit card)</div>
                                            <div>• 2 appointment reminders (oil change, annual physical)</div>
                                            <div>• 1 insurance renewal (the dreaded one)</div>
                                            <div>• 1 HOA email (pool maintenance schedule)</div>
                                            <div>• 4 receipts to file</div>
                                        </div>

                                        <p className="text-white italic">AI responds in 8 seconds:</p>

                                        <div className="bg-slate-900/50 p-4 rounded font-mono text-xs space-y-2">
                                            <div className="text-red-400">PAY NOW:</div>
                                            <div className="pl-3 space-y-1">
                                                <div>1. Electric ($127, due Wed) → DRAFT: "Autopay confirmed"</div>
                                                <div>2. Internet ($89, due Thu) → DRAFT: "Payment submitted"</div>
                                                <div>3. Credit card ($1,847, due Fri) → DRAFT: "Paid in full"</div>
                                            </div>
                                            <div className="text-cyan-400 mt-2">SCHEDULE:</div>
                                            <div className="pl-3 space-y-1">
                                                <div>1. Oil change → SUGGESTION: "Tuesday 2 PM at Jiffy Lube"</div>
                                                <div>2. Annual physical → SUGGESTION: "Jan 12, 9 AM with Dr. Chen"</div>
                                            </div>
                                            <div className="text-green-400 mt-2">FILE:</div>
                                            <div className="pl-3 space-y-1">
                                                <div>• Insurance renewal → "Insurance_Auto_2024_Renewal.pdf"</div>
                                                <div>• HOA email → "HOA_Pool_Schedule_Nov2024.pdf"</div>
                                            </div>
                                            <div className="text-slate-500 mt-2">DELETE: 3 promotional emails, 1 expired offer</div>
                                        </div>

                                        <p className="text-white italic">Total time: 11:27 AM. 87 minutes. Admin complete for the week.</p>

                                        <div className="mt-4 pt-3 border-t border-green-500/30">
                                            <p className="text-white font-bold text-sm mb-2">2-MONTH RESULTS:</p>
                                            <div className="space-y-1 text-xs text-slate-300">
                                                <div>• Admin time: 6 hrs/week (scattered) → 1.5 hrs/week (batched Sunday)</div>
                                                <div>• Late fees/penalties: $800/year → $0</div>
                                                <div>• Forgotten tasks: 3-4/month → 0</div>
                                                <div>• "Did I forget something?" anxiety: Daily → Never</div>
                                                <div>• Insurance lapses: 0 (renewal in calendar with 30-day advance)</div>
                                            </div>
                                            <p className="text-green-400 font-bold mt-2">Annual value: 234 hours reclaimed (4.5 hrs/week × 52) + $800 saved = 5.9 work weeks</p>
                                            <p className="text-white italic text-sm mt-3">"I used to dread Sundays because of the admin backlog. Now I knock it out in 90 minutes and have the rest of the day free."</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-500/40">
                                    <h4 className="text-yellow-400 font-bold mb-3">💬 Common Objections (And The Truth)</h4>

                                    <div className="space-y-4 text-sm">
                                        <div>
                                            <p className="text-white font-bold mb-2">"I can't trust AI with my bills. What if it pays the wrong amount?"</p>
                                            <p className="text-slate-300 text-xs mb-2">You're not handing over your bank account.</p>
                                            <p className="text-cyan-400 text-xs"><strong>What AI does:</strong> Drafts payment confirmation ("Paid $127 to [company]"). <strong>What YOU do:</strong> Review, click Send (or pay manually). Mike reviews every AI-drafted payment. Takes 30 seconds. Zero errors in 2 months.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"What if it makes a mistake? Schedules wrong appointment?"</p>
                                            <p className="text-green-400 text-xs mb-1">AI suggests times. YOU book.</p>
                                            <p className="text-slate-300 text-xs">Example: AI says "Book Tuesday 2 PM oil change at Jiffy Lube." You: Click link, confirm, done. Mike has caught 2 AI mistakes (wrong date format, wrong doctor name). Fixed in 10 seconds. Still faster than manual.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"I only have 15 min/week of admin. Is this overkill?"</p>
                                            <p className="text-slate-300 text-xs mb-1">Lucky you. Most people have 3-6 hours/week.</p>
                                            <p className="text-cyan-400 text-xs">But even 15 min scattered = wasted context switches. Try: Batch your 15 min into Sunday 10 AM slot for 1 month. Track if you feel more organized.</p>
                                        </div>

                                        <div>
                                            <p className="text-white font-bold mb-2">"What about sensitive data? Insurance numbers, SSN?"</p>
                                            <div className="text-xs text-slate-300 space-y-1">
                                                <p className="text-red-400">Never give AI your:</p>
                                                <div className="pl-3 space-y-1">
                                                    <div>• Banking passwords</div>
                                                    <div>• Social Security Number</div>
                                                    <div>• Credit card CVVs</div>
                                                </div>
                                                <p className="text-green-400 mt-2">AI helps with:</p>
                                                <div className="pl-3 space-y-1">
                                                    <div>• Drafting emails ("Please renew policy #ABC123")</div>
                                                    <div>• Organizing files ("Save as Insurance_2024_Renewal.pdf")</div>
                                                    <div>• Reminding you ("Insurance due in 10 days")</div>
                                                </div>
                                                <p className="text-white mt-2">YOU handle the final submit/payment.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-indigo-400 mt-12 mb-4">Family Admin Batching: The Chen Family</h3>
                                <p className="text-slate-300 text-sm mb-4">
                                    Linda & Kevin Chen, 2 kids (8 & 11), Seattle
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                                        <h4 className="text-red-400 font-bold mb-3">THE PROBLEM (Year 1)</h4>
                                        <div className="space-y-2 text-xs text-slate-300">
                                            <div>• 4 people = 4× admin chaos</div>
                                            <div>• Kids' school forms (monthly, last-minute)</div>
                                            <div>• Medical appointments (4 people × 2/year = scramble)</div>
                                            <div>• Bills scattered (who paid what?)</div>
                                            <div>• Car maintenance (2 vehicles)</div>
                                            <div>• "Honey, did you...?" arguments (daily)</div>
                                            <div className="pt-2 text-red-400"><strong>Tipping Point:</strong></div>
                                            <div className="pl-3">Missed daughter's sports registration (wrong form, lost $150 deposit)</div>
                                            <div className="pt-2"><strong>Year 1 Chaos Cost:</strong></div>
                                            <div className="pl-3 space-y-1">
                                                <div>• Late fees/missed deadlines: $420</div>
                                                <div>• Rushed shipping: $85</div>
                                                <div>• Reschedule fees: $120</div>
                                                <div>• Arguments: Priceless</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                                        <h4 className="text-green-400 font-bold mb-3">FAMILY ADMIN HOUR (6 Months)</h4>
                                        <div className="space-y-2 text-xs text-slate-300">
                                            <div><strong>Sunday 9 AM routine:</strong></div>
                                            <div className="pl-3 space-y-1">
                                                <div>1. Both paste week's tasks to shared ChatGPT</div>
                                                <div>2. AI sorts: Kevin tasks, Linda tasks, Shared calendar</div>
                                            </div>
                                            <div className="pt-2"><strong>Division:</strong></div>
                                            <div className="pl-3 space-y-1">
                                                <div>• KEVIN: Car stuff, utilities, repairs</div>
                                                <div>• LINDA: Kids' school, medical, activities</div>
                                                <div>• SHARED: Family calendar updates</div>
                                            </div>
                                            <div className="pt-2"><strong>Execution:</strong></div>
                                            <div className="pl-3 space-y-1">
                                                <div>• 9:00-9:30: Kevin handles list</div>
                                                <div>• 9:00-9:30: Linda handles list</div>
                                                <div>• 9:30-10:00: Together review calendar</div>
                                            </div>
                                            <div className="pt-2 text-green-400"><strong>6-Month Results:</strong></div>
                                            <div className="pl-3 space-y-1">
                                                <div>• Admin: 8 hrs/week → 2 hrs/week</div>
                                                <div>• Late fees: $420/year → $0</div>
                                                <div>• Missed deadlines: 4/year → 0</div>
                                                <div>• Arguments: 6x/week → 0</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-indigo-900/30 to-cyan-900/30 p-6 rounded-xl border border-indigo-500/50 mb-6 text-center">
                                    <p className="text-white italic text-sm">"We used to fight about admin every week. Now Sunday morning is our 'get shit done' hour, and the rest of the week is free." — Linda Chen</p>
                                </div>

                                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-800/50 rounded-xl" />}>
                                    <AdminDayPlanner />
                                </Suspense>

                                <Suspense fallback={null}>
                                    <CaptainTip type="warning" title="Security Warning">
                                        "Never give an AI your actual banking passwords or social security number. Use it to DRAFT emails or ORGANIZE files, but you should be the one to hit 'Submit' on sensitive data."
                                    </CaptainTip>
                                </Suspense>

                                <div className="mt-12 p-8 bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 rounded-2xl border-2 border-blue-500/50 text-center">
                                    <h3 className="text-3xl font-bold text-white mb-6">🚀 Part 3 Complete! Digital Life Automated</h3>

                                    <div className="bg-slate-900/80 p-6 rounded-xl border border-cyan-500/30 mb-6">
                                        <h4 className="text-cyan-400 font-bold mb-4">You've Reclaimed:</h4>
                                        <div className="space-y-2 text-sm text-slate-300 mb-4">
                                            <div>• <strong className="text-white">Chapter 7 (Email):</strong> 7.5 hours/week</div>
                                            <div>• <strong className="text-white">Chapter 8 (Calendar):</strong> 9.5 hours/week</div>
                                            <div>• <strong className="text-white">Chapter 9 (Admin):</strong> 4.5 hours/week</div>
                                        </div>
                                        <div className="p-4 bg-cyan-900/30 rounded border border-cyan-500/40">
                                            <p className="text-cyan-400 font-bold text-xl">Part 3 Total: ~21.5 hours/week reclaimed from digital chaos</p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/50 mb-6">
                                        <p className="text-white font-bold text-lg mb-2">Running Total (Part 2 + Part 3):</p>
                                        <p className="text-green-400 font-bold text-3xl">~36.5 hours/week</p>
                                        <p className="text-slate-300 text-sm mt-2">That's nearly <strong className="text-white">A FULL WORK WEEK</strong> per week.</p>
                                    </div>

                                    <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30 mb-6">
                                        <p className="text-white font-bold mb-3">But here's the problem:</p>
                                        <p className="text-red-400 font-bold text-lg mb-3">You have more time now... and your BODY is falling apart.</p>
                                        <div className="space-y-1 text-xs text-slate-300">
                                            <div>• Skipped workouts (no time... wait, you have time now)</div>
                                            <div>• Meal prep chaos (eating whatever's fast)</div>
                                            <div>• Sleep schedule wrecked (emails at midnight)</div>
                                            <div>• Doctor appointments delayed (6 months overdue)</div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-xl border border-purple-500/50">
                                        <p className="text-purple-400 font-bold text-2xl mb-3">Part 4: The Physical World</p>
                                        <p className="text-white mb-4">Your digital life is automated. Your home is automated. Your calendar is clear.</p>
                                        <p className="text-orange-400 font-bold text-lg mb-4">Now let's fix your health.</p>
                                        <div className="text-left space-y-2 text-sm text-slate-300 mb-4">
                                            <div><strong className="text-white">Chapter 10: Health & Recovery Agent</strong></div>
                                            <div className="pl-3 space-y-1 text-xs">
                                                <div>• Workout consistency without willpower</div>
                                                <div>• Meal prep on autopilot</div>
                                                <div>• Sleep tracking & optimization</div>
                                                <div>• Medical appointment automation</div>
                                            </div>
                                        </div>
                                        <p className="text-cyan-400 italic text-sm">The final frontier: Your body works FOR you, not against you.</p>
                                    </div>

                                    <button
                                        onClick={() => navigate('/part4')}
                                        className="mt-6 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold transition-all"
                                    >
                                        Continue to Part 4: Physical World Agents
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Social Share */}
                    <Suspense fallback={null}>
                        <SocialShare
                            title="I'm building a 'Calendar Defense System' with AI. No more useless meetings!"
                            hashtags={["AgenticAI", "DeepWork", "Productivity"]}
                        />
                    </Suspense>
                </div>
            </PasswordGate>
        </WebbookLayout>
    );
};

export default Part3;
