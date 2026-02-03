import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../../components/layout/WebbookLayout';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, ChevronUp, Palette, Mail, FileText, Instagram, Zap, ExternalLink, Calendar, Image, PenTool, Sparkles, Clock } from 'lucide-react';

// ============================================
// WEEK 3 - AI MARKETING MANAGER
// Social media, email campaigns, blog content
// ============================================

const Week3 = () => {
    const [copiedPrompt, setCopiedPrompt] = useState(null);
    const [showEmailPrompts, setShowEmailPrompts] = useState(false);
    const [showBlogPrompts, setShowBlogPrompts] = useState(false);

    const socialContentPrompt = `You are my AI Marketing Manager. Help me create a week of social media content.

**My Business:**
[DESCRIBE YOUR BUSINESS IN 1-2 SENTENCES]

**My Target Audience:**
[WHO ARE YOUR IDEAL CUSTOMERS?]

**My Brand Voice:**
[Professional/Casual/Friendly/Expert/etc.]

**Task: Create 7 days of social media posts**

For each day, give me:
1. **Hook** (first line that stops the scroll)
2. **Body** (2-3 sentences of value)
3. **CTA** (what you want them to do)
4. **Hashtags** (5-7 relevant ones)

**Content Mix:**
- Day 1: Educational tip
- Day 2: Behind-the-scenes / personal
- Day 3: Customer success story or testimonial
- Day 4: Industry insight or trend
- Day 5: Problem/Solution post
- Day 6: Engagement question
- Day 7: Promotional (soft sell)

Keep each post under 150 words. Make them sound human, not corporate.`;

    const emailCampaignPrompt = `Write a 3-email welcome sequence for new subscribers to my [BUSINESS TYPE] email list.

**Goal:** Turn new subscribers into customers

**Email 1: Welcome (sent immediately)**
- Thank them for subscribing
- Deliver any promised freebie/value
- Set expectations for future emails
- Share one quick win they can implement today

**Email 2: Value (sent day 3)**
- Share your best advice/tip
- Tell a quick story that builds credibility
- No hard selling yet

**Email 3: Soft Pitch (sent day 7)**
- Address the main problem you solve
- Introduce your product/service as the solution
- Include social proof
- Clear CTA with low-pressure option

**Tone:** Conversational, helpful, not salesy
**Length:** 200-300 words each
**Subject lines:** Include 2 options per email (A/B test)`;

    const blogOutlinePrompt = `Help me create a blog post outline for: [YOUR TOPIC]

**Target Audience:** [WHO WILL READ THIS?]
**Goal:** [Traffic/Leads/Authority/Education]
**Keywords to include:** [LIST 3-5 KEYWORDS]

Create an outline with:
1. **Headline Options** (3 variations, use numbers and power words)
2. **Hook** (opening paragraph that pulls readers in)
3. **Main Sections** (5-7 H2 headings with bullet points of what to cover)
4. **Key Takeaways** (3 main points readers should remember)
5. **CTA** (what should readers do next?)

Make this SEO-friendly but readable for humans. Include opportunities for internal links to [OTHER PAGES ON YOUR SITE].`;

    const handleCopy = (prompt, id) => {
        navigator.clipboard.writeText(prompt);
        setCopiedPrompt(id);
        setTimeout(() => setCopiedPrompt(null), 3000);
    };

    const PromptCard = ({ id, title, description, prompt, icon: Icon, color = 'amber' }) => (
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${color}-500 to-orange-500 flex items-center justify-center`}>
                        <Icon className="text-white" size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold">{title}</h4>
                        <p className="text-slate-400 text-sm">{description}</p>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-slate-950/50">
                <pre className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto mb-4 font-mono">
                    {prompt}
                </pre>
                <button
                    onClick={() => handleCopy(prompt, id)}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                        copiedPrompt === id
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white'
                    }`}
                >
                    {copiedPrompt === id ? <><CheckCircle size={18} /> Copied!</> : <><Copy size={18} /> Copy Prompt</>}
                </button>
            </div>
        </div>
    );

    return (
        <WebbookLayout>
            <Helmet>
                <title>Week 3: AI Marketing Manager | AI for Small Business</title>
                <meta name="description" content="Create a week of social media content, email campaigns, and blog posts in minutes with AI." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">
                    {/* BADGE */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Week 3 of 7 • ~30 min</span>
                        </div>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Hire Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"> Marketing Manager</span>
                        </h1>
                        <p className="text-slate-300 text-lg">
                            Create a week of social content, email campaigns, and blog posts — in under an hour.
                        </p>
                    </motion.div>

                    {/* THE PROBLEM */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 mb-8">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Clock className="text-red-400" size={20} />
                            The Content Treadmill
                        </h3>
                        <p className="text-slate-300 mb-4">
                            You know you should be posting on social media. Sending emails. Writing blog posts. But when?
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-2xl font-black text-white">4+ hrs</p>
                                <p className="text-slate-400 text-sm">to write one blog post</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-2xl font-black text-white">2+ hrs</p>
                                <p className="text-slate-400 text-sm">to plan a week of social</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-2xl font-black text-white">1+ hr</p>
                                <p className="text-slate-400 text-sm">per email campaign</p>
                            </div>
                        </div>
                        <p className="text-amber-400 text-center mt-4 font-medium">
                            Your AI Marketing Manager cuts this by 80%.
                        </p>
                    </motion.div>

                    {/* OUTCOME */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-5 mb-8">
                        <p className="text-white text-center">
                            ✅ <span className="font-medium">By the end</span>: You'll have systems to create a week of social content in 15 min, email sequences in 20 min, and blog outlines in 10 min.
                        </p>
                    </motion.div>

                    {/* TOOLS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-4">Your Marketing Stack</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <a href="https://canva.com" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-4 hover:border-purple-500/60 transition-all">
                                <div className="flex items-center gap-3 mb-2">
                                    <Image className="text-purple-400" size={24} />
                                    <span className="text-white font-bold">Canva AI</span>
                                </div>
                                <p className="text-slate-400 text-sm">Design graphics with Magic Design. $15/mo</p>
                            </a>
                            <a href="https://copy.ai" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-4 hover:border-blue-500/60 transition-all">
                                <div className="flex items-center gap-3 mb-2">
                                    <PenTool className="text-blue-400" size={24} />
                                    <span className="text-white font-bold">Copy.ai</span>
                                </div>
                                <p className="text-slate-400 text-sm">AI copywriting for any channel. $29/mo</p>
                            </a>
                            <a href="https://buffer.com" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 border border-orange-500/30 rounded-xl p-4 hover:border-orange-500/60 transition-all">
                                <div className="flex items-center gap-3 mb-2">
                                    <Calendar className="text-orange-400" size={24} />
                                    <span className="text-white font-bold">Buffer</span>
                                </div>
                                <p className="text-slate-400 text-sm">Schedule & publish posts. Free-$15/mo</p>
                            </a>
                        </div>
                    </motion.section>

                    {/* SOCIAL CONTENT */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">1</div>
                            <h3 className="text-xl font-bold text-white">Social Media Content (15 min/week)</h3>
                        </div>
                        <PromptCard
                            id="social"
                            title="Weekly Social Content"
                            description="Generate 7 days of posts in one prompt"
                            prompt={socialContentPrompt}
                            icon={Instagram}
                        />
                        <div className="mt-4 bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                            <p className="text-amber-400 text-sm font-bold mb-2">💡 Pro Workflow</p>
                            <ol className="text-slate-300 text-sm space-y-1">
                                <li>1. Run this prompt on Sunday → get 7 posts</li>
                                <li>2. Design graphics in Canva using "Magic Design"</li>
                                <li>3. Schedule everything in Buffer</li>
                                <li>4. Done for the week — 15 minutes total</li>
                            </ol>
                        </div>
                    </motion.section>

                    {/* EMAIL CAMPAIGNS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">2</div>
                            <h3 className="text-xl font-bold text-white">Email Campaigns (20 min each)</h3>
                        </div>
                        <PromptCard
                            id="email"
                            title="Welcome Email Sequence"
                            description="3-email sequence that converts subscribers"
                            prompt={emailCampaignPrompt}
                            icon={Mail}
                        />
                    </motion.section>

                    {/* BLOG CONTENT */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">3</div>
                            <h3 className="text-xl font-bold text-white">Blog Content (10 min outline + 30 min write)</h3>
                        </div>
                        <PromptCard
                            id="blog"
                            title="SEO Blog Outline"
                            description="Structure that ranks and converts"
                            prompt={blogOutlinePrompt}
                            icon={FileText}
                        />
                    </motion.section>

                    {/* ROI */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6 mb-8">
                        <p className="text-green-400 font-bold mb-3 flex items-center gap-2"><Zap size={18} />Time Saved Per Month</p>
                        <div className="grid grid-cols-3 gap-4 text-center mb-4">
                            <div>
                                <p className="text-2xl font-black text-white">6 hrs</p>
                                <p className="text-slate-400 text-xs">social content</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-white">4 hrs</p>
                                <p className="text-slate-400 text-xs">email campaigns</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-white">12 hrs</p>
                                <p className="text-slate-400 text-xs">blog posts</p>
                            </div>
                        </div>
                        <p className="text-center text-white font-bold">22 hours/month saved = <span className="text-green-400">$1,100</span> at $50/hr</p>
                    </motion.div>

                    {/* WHAT YOU BUILT */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-6 mb-8">
                        <p className="text-green-400 font-bold mb-4 flex items-center gap-2"><CheckCircle size={20} />What You Just Built</p>
                        <ul className="space-y-2 text-slate-300">
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />Weekly social content system (15 min/week)</li>
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />Email campaign generator (20 min each)</li>
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />Blog outline creator (10 min + write time)</li>
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />Design workflow with Canva AI</li>
                        </ul>
                    </motion.div>

                    {/* NEXT WEEK */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 mb-8">
                        <p className="text-slate-400 text-sm mb-2">Coming in Week 4</p>
                        <h3 className="text-xl font-bold text-white mb-2">AI Sales Rep</h3>
                        <p className="text-slate-300 mb-4">Automate lead follow-ups, CRM updates, and pipeline tracking — so no lead falls through the cracks.</p>
                        <div className="flex items-center gap-2 text-amber-400 text-sm"><span>Tools: HubSpot AI, Lindy, Apollo</span></div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-center">
                        <Link to="/courses/business/week4" className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:scale-[1.02]">
                            Continue to Week 4 <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </WebbookLayout>
    );
};

export default Week3;
