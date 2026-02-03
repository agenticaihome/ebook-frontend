import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../../components/layout/WebbookLayout';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, DollarSign, TrendingUp, AlertTriangle, PieChart, FileText, Zap, ExternalLink, Calculator } from 'lucide-react';

const Week5 = () => {
    const [copiedPrompt, setCopiedPrompt] = useState(null);

    const weeklyReportPrompt = `Create a weekly financial summary for my business.

**This Week's Numbers:**
- Revenue: $[AMOUNT]
- New customers: [NUMBER]
- Expenses: $[AMOUNT]
- Notable transactions: [LIST ANY BIG ONES]

**Generate a report with:**
1. **Revenue Snapshot** - Total, vs. last week, vs. same week last month
2. **Top Revenue Sources** - Where the money came from
3. **Expense Breakdown** - Categories and any concerns
4. **Cash Flow Alert** - Any upcoming payments or concerns
5. **Key Metrics** - Average order value, customer count trend
6. **Action Items** - 2-3 things I should do based on these numbers

Keep it under 200 words. Use bullet points. Flag anything unusual with ⚠️`;

    const expenseAlertPrompt = `You are my expense monitoring AI. Alert me when:
- Any single transaction over $500
- Subscription renewals coming up
- Spending in any category exceeds [LIMIT]
- Cash balance drops below [MINIMUM]

For each alert, tell me:
1. What happened
2. Why it matters
3. What I should do (if anything)

Keep alerts short — under 50 words each.`;

    const handleCopy = (prompt, id) => {
        navigator.clipboard.writeText(prompt);
        setCopiedPrompt(id);
        setTimeout(() => setCopiedPrompt(null), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Week 5: AI Bookkeeper | AI for Small Business</title>
                <meta name="description" content="Automate financial reports, expense tracking, and cash flow alerts with AI." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Week 5 of 7 • ~30 min</span>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Hire Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"> Bookkeeper</span>
                        </h1>
                        <p className="text-slate-300 text-lg">Automated financial reports, expense tracking, and cash flow alerts — no spreadsheets required.</p>
                    </motion.div>

                    {/* The Problem */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 mb-8">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-amber-400" size={20} />
                            Why Most Small Businesses Fly Blind
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-3xl font-black text-amber-400">40%</p>
                                <p className="text-slate-400 text-sm">of owners check finances monthly or less</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-3xl font-black text-amber-400">$500+</p>
                                <p className="text-slate-400 text-sm">/month for a part-time bookkeeper</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-3xl font-black text-amber-400">82%</p>
                                <p className="text-slate-400 text-sm">of failures cite cash flow issues</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tools */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-4">Your Finance Stack</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a href="https://quickbooks.com" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 border border-green-500/30 rounded-xl p-4 hover:border-green-500/60 transition-all">
                                <div className="flex items-center gap-3 mb-2">
                                    <Calculator className="text-green-400" size={24} />
                                    <span className="text-white font-bold">QuickBooks</span>
                                </div>
                                <p className="text-slate-400 text-sm">Industry standard. AI features included. $30/mo</p>
                            </a>
                            <a href="https://zapier.com" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 border border-orange-500/30 rounded-xl p-4 hover:border-orange-500/60 transition-all">
                                <div className="flex items-center gap-3 mb-2">
                                    <Zap className="text-orange-400" size={24} />
                                    <span className="text-white font-bold">Zapier</span>
                                </div>
                                <p className="text-slate-400 text-sm">Connect everything. Auto-send weekly reports. $20/mo</p>
                            </a>
                        </div>
                    </motion.section>

                    {/* Weekly Report Prompt */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">1</div>
                            <h3 className="text-xl font-bold text-white">Weekly Financial Report</h3>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                            <div className="p-5 border-b border-slate-700/50">
                                <h4 className="text-white font-bold">Know Your Numbers in 60 Seconds</h4>
                                <p className="text-slate-400 text-sm">Paste your numbers, get insights</p>
                            </div>
                            <div className="p-4 bg-slate-950/50">
                                <pre className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto mb-4 font-mono">{weeklyReportPrompt}</pre>
                                <button onClick={() => handleCopy(weeklyReportPrompt, 'report')} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${copiedPrompt === 'report' ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'}`}>
                                    {copiedPrompt === 'report' ? <><CheckCircle size={18} /> Copied!</> : <><Copy size={18} /> Copy Prompt</>}
                                </button>
                            </div>
                        </div>
                    </motion.section>

                    {/* Expense Alert Prompt */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">2</div>
                            <h3 className="text-xl font-bold text-white">Expense Alerts</h3>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                            <div className="p-5 border-b border-slate-700/50">
                                <h4 className="text-white font-bold">Never Be Surprised by a Bill</h4>
                                <p className="text-slate-400 text-sm">Proactive alerts for spending</p>
                            </div>
                            <div className="p-4 bg-slate-950/50">
                                <pre className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto mb-4 font-mono">{expenseAlertPrompt}</pre>
                                <button onClick={() => handleCopy(expenseAlertPrompt, 'expense')} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${copiedPrompt === 'expense' ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'}`}>
                                    {copiedPrompt === 'expense' ? <><CheckCircle size={18} /> Copied!</> : <><Copy size={18} /> Copy Prompt</>}
                                </button>
                            </div>
                        </div>
                    </motion.section>

                    {/* Automation */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-amber-900/20 border border-amber-500/30 rounded-2xl p-5 mb-8">
                        <p className="text-amber-400 font-bold mb-3">💡 Automation Setup</p>
                        <p className="text-slate-300 text-sm mb-3">Connect QuickBooks + Zapier + ChatGPT, Claude, or Gemini:</p>
                        <ol className="text-slate-300 text-sm space-y-2">
                            <li>1. Zapier pulls weekly numbers from QuickBooks every Monday</li>
                            <li>2. Sends data to ChatGPT, Claude, or Gemini with your report prompt</li>
                            <li>3. Emails you the formatted report automatically</li>
                        </ol>
                        <p className="text-amber-400 text-sm mt-3">Total setup time: ~20 minutes. Then it runs forever.</p>
                    </motion.div>

                    {/* What you built */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-6 mb-8">
                        <p className="text-green-400 font-bold mb-4 flex items-center gap-2"><CheckCircle size={20} />What You Just Built</p>
                        <ul className="space-y-2 text-slate-300">
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />Weekly financial report generator</li>
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />Expense monitoring alerts</li>
                            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={16} />Automated reporting pipeline</li>
                        </ul>
                    </motion.div>

                    {/* Next */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 mb-8">
                        <p className="text-slate-400 text-sm mb-2">Coming in Week 6</p>
                        <h3 className="text-xl font-bold text-white mb-2">AI IT Manager</h3>
                        <p className="text-slate-300">Site monitoring, uptime alerts, and error detection — know when something breaks before your customers do.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-center">
                        <Link to="/courses/business/week6" className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:scale-[1.02]">
                            Continue to Week 6 <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </WebbookLayout>
    );
};

export default Week5;
