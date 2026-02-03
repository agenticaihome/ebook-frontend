import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../../components/layout/WebbookLayout';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Crown, Briefcase, Phone, Palette, Users, DollarSign, Server, Zap, Star, Gift, ExternalLink } from 'lucide-react';

const Week7 = () => {
    const yourTeam = [
        { icon: Briefcase, name: 'Chief of Staff', status: 'Active', tasks: 'Morning briefings, email triage, priorities', color: 'amber' },
        { icon: Phone, name: 'AI Receptionist', status: 'Active', tasks: '24/7 phone, lead capture, appointments', color: 'blue' },
        { icon: Palette, name: 'Marketing Manager', status: 'Active', tasks: 'Social content, emails, blog posts', color: 'purple' },
        { icon: Users, name: 'Sales Rep', status: 'Active', tasks: 'Follow-ups, lead scoring, CRM', color: 'green' },
        { icon: DollarSign, name: 'Bookkeeper', status: 'Active', tasks: 'Reports, alerts, expense tracking', color: 'emerald' },
        { icon: Server, name: 'IT Manager', status: 'Active', tasks: 'Uptime monitoring, error alerts', color: 'red' },
    ];

    return (
        <WebbookLayout>
            <Helmet>
                <title>Week 7: AI Operations Manager | AI for Small Business</title>
                <meta name="description" content="Connect your entire AI team into one powerful system. The final piece of your AI-powered business." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/50">
                            <Crown className="text-amber-400" size={16} />
                            <span className="text-slate-300 text-sm font-medium">Week 7 of 7 • Final Chapter</span>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Hire Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-purple-400"> Operations Manager</span>
                        </h1>
                        <p className="text-slate-300 text-lg">Connect everything together. Your AI team, working as one.</p>
                    </motion.div>

                    {/* Celebration */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-purple-900/30 border border-amber-500/30 rounded-2xl p-6 mb-8">
                        <div className="text-center mb-6">
                            <p className="text-4xl mb-3">🎉</p>
                            <h2 className="text-2xl font-black text-white mb-2">Look What You Built</h2>
                            <p className="text-slate-300">Over 7 weeks, you hired an entire AI team. Here they are:</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-3">
                            {yourTeam.map((member, i) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg bg-${member.color}-500/20 flex items-center justify-center`}>
                                            <member.icon className={`text-${member.color}-400`} size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-bold">{member.name}</p>
                                            <p className="text-slate-400 text-xs">{member.tasks}</p>
                                        </div>
                                        <span className="text-green-400 text-xs font-bold bg-green-500/20 px-2 py-1 rounded-full">
                                            {member.status}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* The Operations Layer */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Zap className="text-amber-400" size={20} />
                            The Operations Layer: Make Them Talk to Each Other
                        </h2>
                        
                        <div className="bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50 mb-4">
                            <p className="text-slate-300 mb-4">
                                Right now, each AI employee works independently. The <span className="text-white font-medium">Operations Manager</span> connects them into a system:
                            </p>
                            
                            <div className="space-y-3">
                                <div className="bg-slate-900/50 rounded-xl p-4">
                                    <p className="text-amber-400 font-medium mb-1">📞 → 👋 Phone → Sales</p>
                                    <p className="text-slate-400 text-sm">When AI Receptionist captures a lead → automatically create CRM entry → trigger follow-up sequence</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-xl p-4">
                                    <p className="text-amber-400 font-medium mb-1">💰 → ☀️ Payment → Briefing</p>
                                    <p className="text-slate-400 text-sm">New payment comes in → add to weekly report → mention in tomorrow's morning briefing</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-xl p-4">
                                    <p className="text-amber-400 font-medium mb-1">🔴 → 📧 Error → Alert</p>
                                    <p className="text-slate-400 text-sm">Site goes down → alert IT Manager → pause marketing campaigns → notify you</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4">
                            <p className="text-amber-400 font-bold mb-2">Tools for Orchestration</p>
                            <div className="grid md:grid-cols-2 gap-3">
                                <a href="https://lindy.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white">
                                    <ExternalLink size={14} /> <span className="font-medium">Lindy</span> <span className="text-slate-500">— Multi-agent workflows ($50/mo)</span>
                                </a>
                                <a href="https://make.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white">
                                    <ExternalLink size={14} /> <span className="font-medium">Make</span> <span className="text-slate-500">— Visual automation ($11/mo)</span>
                                </a>
                            </div>
                        </div>
                    </motion.section>

                    {/* Total ROI */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-6 mb-8">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <DollarSign className="text-green-400" size={20} />
                            Your Total ROI (Monthly)
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-slate-300"><span>Chief of Staff (time saved):</span><span className="text-white">$750</span></div>
                            <div className="flex justify-between text-slate-300"><span>AI Receptionist (leads saved):</span><span className="text-white">$1,000</span></div>
                            <div className="flex justify-between text-slate-300"><span>Marketing Manager (content time):</span><span className="text-white">$1,100</span></div>
                            <div className="flex justify-between text-slate-300"><span>Sales Rep (conversion boost):</span><span className="text-white">$1,000</span></div>
                            <div className="flex justify-between text-slate-300"><span>Bookkeeper (clarity + time):</span><span className="text-white">$500</span></div>
                            <div className="flex justify-between text-slate-300"><span>IT Manager (prevented downtime):</span><span className="text-white">$500</span></div>
                            <div className="border-t border-green-500/30 pt-2 mt-2 flex justify-between">
                                <span className="text-white font-bold">Total Value Created:</span>
                                <span className="text-2xl font-black text-green-400">$4,850/mo</span>
                            </div>
                            <div className="flex justify-between text-slate-400"><span>Your AI tool costs:</span><span>-$150/mo</span></div>
                            <div className="border-t border-green-500/30 pt-2 flex justify-between">
                                <span className="text-white font-bold">Net Monthly ROI:</span>
                                <span className="text-2xl font-black text-green-400">$4,700</span>
                            </div>
                        </div>
                        <p className="text-center text-slate-400 text-sm mt-4">
                            That's a <span className="text-green-400 font-bold">3,133% return</span> on your investment.
                        </p>
                    </motion.div>

                    {/* What's Next */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-4">What's Next?</h2>
                        <div className="bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                    <Star className="text-amber-400" size={16} />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Optimize & Iterate</p>
                                    <p className="text-slate-400 text-sm">Your AI team will get better over time. Refine prompts, add new workflows, remove what doesn't work.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                    <Gift className="text-purple-400" size={16} />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Stay Updated</p>
                                    <p className="text-slate-400 text-sm">AI tools evolve fast. We'll add new chapters as better tools emerge. You have lifetime access.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                    <Users className="text-blue-400" size={16} />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Share What You Built</p>
                                    <p className="text-slate-400 text-sm">Found something that works? Tell other small business owners. We're all figuring this out together.</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Final CTA */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-gradient-to-br from-amber-900/30 to-purple-900/30 border border-amber-500/30 rounded-2xl p-8 text-center">
                        <div className="text-5xl mb-4">🏆</div>
                        <h2 className="text-2xl font-black text-white mb-2">Course Complete!</h2>
                        <p className="text-slate-300 mb-6">
                            You just built an AI team that most businesses don't have. You're now operating at 10x efficiency.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link to="/courses" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-[1.02]">
                                Explore More Courses <ArrowRight size={18} />
                            </Link>
                            <Link to="/courses" className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-medium transition-all">
                                Try AI at Home <ArrowRight size={18} />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Sign Off */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 text-center">
                        <div className="inline-flex items-center gap-3 bg-slate-800/30 rounded-full px-6 py-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-lg">
                                ⚡
                            </div>
                            <div className="text-left">
                                <p className="text-white font-medium text-sm">The Efficiency Team</p>
                                <p className="text-slate-400 text-xs">Proud of you. Now go build something.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </WebbookLayout>
    );
};

export default Week7;
