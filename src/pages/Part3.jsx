import React from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import PaywallGate from '../components/common/PaywallGate';
import CaptainTip from '../components/interactive/CaptainTip';
import AgentSimulation from '../components/interactive/AgentSimulation';
import { motion } from 'framer-motion';

const Part3 = () => {
    // Mock access check
    const hasAccess = false;

    return (
        <WebbookLayout>
            <div className="max-w-4xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 border-b border-slate-200 pb-8"
                >
                    <div className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Part 3</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Work & Productivity</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        We've stabilized the home. Now we take the fight to the office.
                        Learn how to use agents to reclaim 15+ hours a week from email, meetings, and busywork.
                    </p>
                </motion.div>

                {/* Free Preview */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">3.1 The Inbox Zero Agent</h2>
                    <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        Email is the "to-do list that other people create for you."
                        Your Inbox Agent doesn't just read email; it triages it. It deletes spam, drafts replies to routine questions, and highlights the 3 things that actually matter.
                    </p>

                    <AgentSimulation
                        agentName="inbox-sentinel"
                        task="Triage Unread Emails (47)"
                        steps={[
                            { action: "SCAN", detail: "Analyzing 47 unread messages..." },
                            { action: "FILTER", detail: "Archived 12 newsletters, Deleted 8 spam" },
                            { action: "DRAFT", detail: "Drafted replies for 3 scheduling requests" },
                            { action: "FLAG", detail: "Flagged 2 urgent client emails for review" },
                            { action: "REPORT", detail: "Inbox Zero achieved. 5 items for human review." }
                        ]}
                    />
                </section>

                {/* Gated Content */}
                {hasAccess ? (
                    <div>Full content...</div>
                ) : (
                    <PaywallGate />
                )}
            </div>
        </WebbookLayout>
    );
};

export default Part3;
