import React from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import PaywallGate from '../components/common/PaywallGate';
import CaptainTip from '../components/interactive/CaptainTip';
import { motion } from 'framer-motion';

const Part2 = () => {
    // In a real app, we would check for a valid JWT token or purchase status here.
    // For this demo, we'll assume the user is NOT authenticated/purchased to show the gate.
    const hasAccess = false;

    return (
        <WebbookLayout>
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Chapter Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 border-b border-slate-200 pb-8"
                >
                    <div className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-2">Part 2</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Getting Started</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Now that we've diagnosed the problem, it's time to build your instrument tray.
                        We'll select the right platforms and tools to host your AI agents.
                    </p>
                </motion.div>

                {/* Free Preview Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">2.1 Choosing Your Ecosystem</h2>
                    <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        The first decision you need to make is where your agents will live.
                        This depends largely on your current digital habitat. Are you an Apple family? A Google workspace user?
                        Or a Microsoft enterprise power user?
                    </p>

                    <CaptainTip type="tip" title="Ecosystem Gravity" pose="pointing">
                        Don't fight gravity. If you use an iPhone, build agents that can talk to iMessage.
                        If you use Android, leverage Google Assistant. Friction is the enemy of adoption.
                    </CaptainTip>
                </section>

                {/* Gated Content */}
                {hasAccess ? (
                    <div className="p-12 bg-green-50 rounded-xl text-center">
                        <h2 className="text-2xl font-bold text-green-800">Access Granted!</h2>
                        <p className="text-green-700">You have unlocked the full content.</p>
                        {/* Full content would go here */}
                    </div>
                ) : (
                    <PaywallGate />
                )}
            </div>
        </WebbookLayout>
    );
};

export default Part2;
