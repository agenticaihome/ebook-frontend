import React from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import CaptainTip from '../components/interactive/CaptainTip';
import InteractiveDiagram from '../components/interactive/InteractiveDiagram';
import { motion } from 'framer-motion';

const Part1 = () => {
    return (
        <WebbookLayout>
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Chapter Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 border-b border-slate-200 pb-8"
                >
                    <div className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Part 1</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">The Diagnosis</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Before we can treat the chaos, we must understand its source. It's not about being lazy or disorganized.
                        It's about a fundamental mismatch between the modern world's demands and the human brain's capacity.
                    </p>
                </motion.div>

                {/* Section 1: The Mental Load */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">1.1 The Invisible Infection</h2>
                    <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        Imagine your brain is a computer. Every task you have to remember—buying milk, calling the plumber,
                        scheduling the dentist—is an open browser tab. Eventually, the computer slows down. It crashes.
                        This is <strong>Mental Load</strong>.
                    </p>

                    <CaptainTip type="info" title="Cognitive RAM" pose="thinking">
                        Studies show the average parent holds <strong>20-30 active "open loops"</strong> in their mind at any given moment.
                        This constant background processing reduces your IQ by up to 10 points during stressful periods.
                    </CaptainTip>

                    <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        The problem isn't the work itself. Doing the laundry takes 5 minutes.
                        <em>Remembering</em> to do the laundry, checking if you have detergent, and timing it so it doesn't mildew...
                        that's the heavy lifting.
                    </p>
                </section>

                {/* Interactive Diagram: The Cycle of Chaos */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">1.2 The Cycle of Chaos</h2>
                    <InteractiveDiagram
                        title="How the Infection Spreads"
                        steps={[
                            {
                                label: "Trigger",
                                title: "The Initial Spark",
                                description: "A small event occurs. You run out of milk. A bill arrives. A school email pings.",
                                details: ["External Stimuli", "Immediate Urgency", "Disruption"]
                            },
                            {
                                label: "Overload",
                                title: "Cognitive Bottleneck",
                                description: "You try to hold this new task in your memory while juggling 20 others. Your brain enters 'Reactive Mode'.",
                                details: ["Stress Response", "Memory Failure", "Anxiety Spike"]
                            },
                            {
                                label: "Failure",
                                title: "The Drop",
                                description: "Inevitably, something slips. You forget the milk. You pay the late fee. You feel like a failure.",
                                details: ["Guilt", "Financial Cost", "Loss of Confidence"]
                            }
                        ]}
                    />
                </section>

                {/* Section 2: The Solution */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">1.3 The Agentic Cure</h2>
                    <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        The solution is not to "try harder". It's to build a system that remembers <em>for</em> you.
                        In the past, wealthy families had butlers and housekeepers. Today, we have <strong>AI Agents</strong>.
                    </p>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
                        <h3 className="font-bold text-blue-900 text-lg mb-2">Definition: Agentic AI</h3>
                        <p className="text-blue-800">
                            An AI system that can perceive its environment, reason about how to achieve a goal, and take action to achieve it.
                            Unlike a chatbot (which talks), an agent <strong>does</strong>.
                        </p>
                    </div>

                    <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        In Part 2, we will start building your first agents. But first, we need to choose your platform.
                    </p>
                </section>

                {/* Next Chapter CTA */}
                <div className="flex justify-end mt-12">
                    <a href="/part2" className="group flex items-center gap-4 text-right hover:opacity-80 transition-opacity">
                        <div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">Next Chapter</div>
                            <div className="text-2xl font-bold text-blue-600 group-hover:underline">Part 2: Getting Started</div>
                        </div>
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            →
                        </div>
                    </a>
                </div>
            </div>
        </WebbookLayout>
    );
};

export default Part1;
