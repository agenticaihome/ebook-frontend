import React from 'react';
import { MessageSquare, Zap, Eye, Brain, ArrowRight, CheckCircle, User, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const AgentLoopVisual = () => {
    return (
        <div className="grid md:grid-cols-2 gap-8 my-12">
            {/* CHATBOT MODEL */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-slate-700 text-xs font-bold px-3 py-1 rounded-bl-xl text-slate-300">
                    OLD WAY
                </div>
                <h3 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-2">
                    <MessageSquare size={20} /> The Chatbot Loop
                </h3>

                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-cyan-900/30 p-3 rounded-full border border-cyan-500/30">
                            <User size={20} className="text-cyan-400" />
                        </div>
                        <div className="bg-slate-700/50 p-3 rounded-lg text-sm text-slate-300 flex-1">
                            "What's the weather?"
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <ArrowRight className="text-slate-600 rotate-90 md:rotate-0" />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-purple-900/30 p-3 rounded-full border border-purple-500/30">
                            <Bot size={20} className="text-purple-400" />
                        </div>
                        <div className="bg-slate-700/50 p-3 rounded-lg text-sm text-slate-300 flex-1">
                            "It's 72°F and sunny."
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700 text-center">
                    <div className="inline-flex items-center gap-2 text-red-400 bg-red-900/20 px-4 py-2 rounded-full text-sm font-bold">
                        🛑 STOPS HERE
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        Waiting for your next command.
                    </p>
                </div>
            </div>

            {/* AGENT MODEL */}
            <div className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-2xl p-6 border border-cyan-500/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-cyan-600 text-xs font-bold px-3 py-1 rounded-bl-xl text-white">
                    NEW WAY
                </div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Zap size={20} className="text-cyan-400" /> The Agent Loop
                </h3>

                <div className="space-y-6 relative z-10">
                    {/* Goal */}
                    <div className="flex items-center gap-3">
                        <div className="bg-cyan-500/20 p-2 rounded-full">
                            <User size={16} className="text-cyan-400" />
                        </div>
                        <div className="text-sm font-bold text-white">
                            Goal: "Manage my morning"
                        </div>
                    </div>

                    {/* The Loop */}
                    <div className="ml-4 pl-4 border-l-2 border-dashed border-cyan-500/30 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-3"
                        >
                            <Eye size={16} className="text-purple-400" />
                            <span className="text-sm text-slate-300"><strong>Observes:</strong> Raining at 4 PM</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-3"
                        >
                            <Brain size={16} className="text-purple-400" />
                            <span className="text-sm text-slate-300"><strong>Thinks:</strong> "Outdoor event needs moving."</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-3"
                        >
                            <Zap size={16} className="text-purple-400" />
                            <span className="text-sm text-slate-300"><strong>Acts:</strong> Checks indoor venue availability</span>
                        </motion.div>
                    </div>

                    {/* Result */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-green-900/20 border border-green-500/30 p-3 rounded-lg flex items-start gap-3"
                    >
                        <CheckCircle size={18} className="text-green-400 mt-0.5" />
                        <div className="text-sm text-slate-200">
                            "I found an indoor venue for your 4 PM event. Want me to book it?"
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AgentLoopVisual;
