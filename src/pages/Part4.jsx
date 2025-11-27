import React from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import PaywallGate from '../components/common/PaywallGate';
import CaptainTip from '../components/interactive/CaptainTip';
import { motion } from 'framer-motion';
import { Activity, Heart, Calendar } from 'lucide-react';

const Part4 = () => {
    const hasAccess = false;

    return (
        <WebbookLayout>
            <div className="max-w-4xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 border-b border-slate-200 pb-8"
                >
                    <div className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-2">Part 4</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Health & Wellness</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Your health is your most important asset, yet it's often the first thing to suffer when life gets busy.
                        Let's build an agentic system to protect it.
                    </p>
                </motion.div>

                {/* Free Preview */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">4.1 The Medical Admin Agent</h2>
                    <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        Scheduling doctor's appointments, tracking vaccinations, and refilling prescriptions is a full-time job.
                        Your Medical Admin Agent handles the logistics so you can focus on the care.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <Calendar className="text-teal-500 mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2">Scheduling</h3>
                            <p className="text-sm text-slate-600">Auto-books annual checkups and dental cleanings.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <Activity className="text-teal-500 mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2">Tracking</h3>
                            <p className="text-sm text-slate-600">Monitors symptoms and compiles reports for your doctor.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <Heart className="text-teal-500 mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2">Habits</h3>
                            <p className="text-sm text-slate-600">Gentle nudges for water, sleep, and movement.</p>
                        </div>
                    </div>
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

export default Part4;
