import React from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import PaywallGate from '../components/common/PaywallGate';
import CaptainTip from '../components/interactive/CaptainTip';
import { motion } from 'framer-motion';
import { Network, Cpu, Globe } from 'lucide-react';

const Part5 = () => {
    const hasAccess = false;

    return (
        <WebbookLayout>
            <div className="max-w-4xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 border-b border-slate-200 pb-8"
                >
                    <div className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-2">Part 5</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Advanced Systems</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        You've mastered the basics. Now we enter the lab.
                        This section covers local LLMs, home server automation, and building "The 100-Year Plan" for your family's digital legacy.
                    </p>
                </motion.div>

                {/* Free Preview */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">5.1 The Sovereign Cloud</h2>
                    <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        True agency means owning your intelligence. We'll show you how to run open-source models (like Llama 3) on your own hardware,
                        ensuring total privacy and zero subscription fees.
                    </p>

                    <CaptainTip type="pro" title="Local Intelligence" pose="smart">
                        Running a local LLM isn't just for coders anymore. Tools like Ollama and LM Studio make it as easy as installing an app.
                        Your data never leaves your house.
                    </CaptainTip>
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

export default Part5;
