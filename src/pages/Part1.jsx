import React, { useState } from 'react';
import WebbookLayout from '../components/layout/WebbookLayout';
import CaptainTip from '../components/CaptainTip';
import CaptainHero from '../components/CaptainHero';
import InteractiveDiagram from '../components/InteractiveDiagram';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle } from 'lucide-react';

const Part1 = () => {
    const [scanStatus, setScanStatus] = useState('idle'); // idle, scanning, complete

    const runScan = () => {
        setScanStatus('scanning');
        setTimeout(() => setScanStatus('complete'), 3000);
    };

    return (
        <WebbookLayout>
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Hero Section */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Part 1</div>
                            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Infection</span>
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                You're not disorganized. You're depleted. Let's find the root cause of your time crisis.
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <CaptainHero
                            size="lg"
                            message="I'm Captain Efficiency! I'm here to scan your systems for cognitive leaks. Ready?"
                        />
                    </div>
                </div>

                {/* Interactive Scanner */}
                <section className="mb-24 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16" />

                    <div className="relative z-10 text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">Mental Load Scanner</h2>
                        <p className="text-slate-300 mb-8">
                            Let's run a diagnostic on your current cognitive load.
                        </p>

                        {scanStatus === 'idle' && (
                            <button
                                onClick={runScan}
                                className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2 mx-auto"
                            >
                                <Brain /> Initiate Scan
                            </button>
                        )}

                        {scanStatus === 'scanning' && (
                            <div className="space-y-4">
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-blue-500"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 3 }}
                                    />
                                </div>
                                <p className="text-blue-300 font-mono text-sm animate-pulse">
                                    ANALYZING DECISION FATIGUE... CHECKING MEMORY LEAKS...
                                </p>
                            </div>
                        )}

                        {scanStatus === 'complete' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-500/20 border border-red-500/50 rounded-xl p-6"
                            >
                                <div className="flex items-center justify-center gap-3 mb-4 text-red-400">
                                    <AlertTriangle size={32} />
                                    <h3 className="text-2xl font-bold">CRITICAL LOAD DETECTED</h3>
                                </div>
                                <p className="text-lg mb-4">
                                    Your "RAM" is full. You are carrying 35,000+ daily decisions.
                                </p>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="bg-slate-800 p-3 rounded-lg">
                                        <div className="text-2xl font-bold text-red-400">92%</div>
                                        <div className="text-xs text-slate-400">FATIGUE</div>
                                    </div>
                                    <div className="bg-slate-800 p-3 rounded-lg">
                                        <div className="text-2xl font-bold text-orange-400">14%</div>
                                        <div className="text-xs text-slate-400">EFFICIENCY</div>
                                    </div>
                                    <div className="bg-slate-800 p-3 rounded-lg">
                                        <div className="text-2xl font-bold text-yellow-400">High</div>
                                        <div className="text-xs text-slate-400">STRESS</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Content Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">The Diagnosis</h2>
                    <div className="prose prose-lg text-slate-600 max-w-none">
                        <p>
                            By day, I'm a resident saving teeth. By night, I'm a Dad Deploying Systems.
                            When I come home, I'm buried under permission slips, grocery chaos, and the endless mental gymnastics of keeping a household running.
                        </p>
                        <p>
                            Most people think root canals are torture. They're not. With the right specialist, they're relief.
                            The pain was already there—the infection was causing it. I just remove the source.
                        </p>
                    </div>
                </section>

                <CaptainTip type="info" title="Clinical Note" pose="smart">
                    "Mental Load" is the invisible work of managing a household. Remembering, planning, and coordinating takes more energy than the actual doing.
                </CaptainTip>

                <InteractiveDiagram
                    title="The Path to Recovery"
                    steps={[
                        {
                            label: "Step 1",
                            title: "Diagnosis",
                            description: "Identifying the invisible labor draining your energy.",
                            details: ["Track Decisions", "Identify Leaks", "Measure Fatigue"]
                        },
                        {
                            label: "Step 2",
                            title: "Triage",
                            description: "Stopping the bleeding by delegating urgent tasks.",
                            details: ["Morning Brief", "Meal Planning", "Calendar Sync"]
                        },
                        {
                            label: "Step 3",
                            title: "Systematize",
                            description: "Building permanent agents to handle the load forever.",
                            details: ["Household Agent", "Finance Agent", "Travel Agent"]
                        }
                    ]}
                />

                <div className="mt-16 flex justify-center">
                    <CaptainHero
                        size="md"
                        message="Don't worry! In Part 2, we'll start building your team of agents to fix this."
                        position="center"
                    />
                </div>

            </div>
        </WebbookLayout>
    );
};

export default Part1;
