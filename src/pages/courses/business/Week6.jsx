import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../../components/layout/WebbookLayout';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Server, AlertTriangle, Activity, Bell, Zap, ExternalLink, Shield, Clock } from 'lucide-react';

const Week6 = () => {
    return (
        <WebbookLayout>
            <Helmet>
                <title>Week 6: AI IT Manager | AI for Small Business</title>
                <meta name="description" content="Site monitoring, uptime alerts, and error detection — know when something breaks before your customers do." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Week 6 of 7 • ~25 min</span>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Hire Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"> IT Manager</span>
                        </h1>
                        <p className="text-slate-300 text-lg">Know when your site goes down before your customers do. 24/7 monitoring, instant alerts.</p>
                    </motion.div>

                    {/* The Problem */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 mb-8">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-red-400" size={20} />
                            The Cost of Downtime
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-3xl font-black text-red-400">$5,600</p>
                                <p className="text-slate-400 text-sm">avg cost per minute of downtime</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-3xl font-black text-red-400">30 min</p>
                                <p className="text-slate-400 text-sm">avg time to notice without monitoring</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-3xl font-black text-red-400">60%</p>
                                <p className="text-slate-400 text-sm">of customers leave after bad experience</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tools */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-4">Your Monitoring Stack</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a href="https://uptimerobot.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-2 border-green-500/50 rounded-xl p-4 hover:border-green-500/80 transition-all relative">
                                <div className="absolute -top-2 right-4 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">FREE</div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Activity className="text-green-400" size={24} />
                                    <span className="text-white font-bold">UptimeRobot</span>
                                </div>
                                <p className="text-slate-400 text-sm">50 monitors free. 5-min checks. Email/SMS alerts.</p>
                            </a>
                            <a href="https://zapier.com" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 border border-orange-500/30 rounded-xl p-4 hover:border-orange-500/60 transition-all">
                                <div className="flex items-center gap-3 mb-2">
                                    <Zap className="text-orange-400" size={24} />
                                    <span className="text-white font-bold">Zapier</span>
                                </div>
                                <p className="text-slate-400 text-sm">Connect alerts to Slack, SMS, or anywhere.</p>
                            </a>
                        </div>
                    </motion.section>

                    {/* Setup Steps */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">1</div>
                            <h3 className="text-xl font-bold text-white">Set Up UptimeRobot (10 min)</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50">
                            <ol className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                                    <div>
                                        <p className="text-white font-medium">Create free account</p>
                                        <p className="text-slate-400 text-sm">Go to uptimerobot.com — no credit card needed</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                                    <div>
                                        <p className="text-white font-medium">Add your website</p>
                                        <p className="text-slate-400 text-sm">Click "Add New Monitor" → HTTP(s) → Enter your URL</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                                    <div>
                                        <p className="text-white font-medium">Set up alerts</p>
                                        <p className="text-slate-400 text-sm">Add your email and phone for SMS alerts</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</span>
                                    <div>
                                        <p className="text-white font-medium">Add more monitors</p>
                                        <p className="text-slate-400 text-sm">Monitor your API endpoints, login pages, payment pages — anything critical</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </motion.section>

                    {/* What to Monitor */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">2</div>
                            <h3 className="text-xl font-bold text-white">What to Monitor</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-slate-900/50 rounded-xl p-4">
                                    <p className="text-green-400 font-bold mb-2">✅ Essential (Free tier)</p>
                                    <ul className="text-slate-300 text-sm space-y-1">
                                        <li>• Homepage</li>
                                        <li>• Login/signup page</li>
                                        <li>• Checkout/payment page</li>
                                        <li>• API health endpoint</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900/50 rounded-xl p-4">
                                    <p className="text-amber-400 font-bold mb-2">⭐ Advanced (Paid)</p>
                                    <ul className="text-slate-300 text-sm space-y-1">
                                        <li>• Keyword monitoring (check for errors)</li>
                                        <li>• SSL certificate expiry</li>
                                        <li>• Performance monitoring</li>
                                        <li>• Multi-location checks</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Zapier Integration */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-amber-900/20 border border-amber-500/30 rounded-2xl p-5 mb-8">
                        <p className="text-amber-400 font-bold mb-3">💡 Pro Tip: Smart Escalation</p>
                        <p className="text-slate-300 text-sm mb-3">Use Zapier to create smart alert routing:</p>
                        <ul className="text-slate-300 text-sm space-y-2">
                            <li>• First 5 min down → Email alert</li>
                            <li>• 10+ min down → SMS + Slack message</li>
                            <li>• 30+ min down → Call your phone</li>
                        </ul>
                        <p className="text-slate-400 text-sm mt-3">This prevents alert fatigue while ensuring real issues get attention.</p>
                    </motion.div>

                    {/* What you built */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-6 mb-8">
                        <p className="text-green-400 font-bold mb-4 flex items-center gap-2"><CheckCircle size={20} />What You Just Built</p>
                        <ul className="space-y-2 text-slate-300">
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />24/7 uptime monitoring for your site</li>
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />Instant email/SMS alerts when something breaks</li>
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />Multi-point monitoring (homepage, API, checkout)</li>
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />Smart escalation so you're never caught off guard</li>
                        </ul>
                    </motion.div>

                    {/* Next */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 mb-8">
                        <p className="text-slate-400 text-sm mb-2">Final Week</p>
                        <h3 className="text-xl font-bold text-white mb-2">AI Operations Manager</h3>
                        <p className="text-slate-300">Connect everything together. Build your AI team that works as a system, not just individual tools.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-center">
                        <Link to="/courses/business/week7" className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:scale-[1.02]">
                            Continue to Week 7 <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </WebbookLayout>
    );
};

export default Week6;
