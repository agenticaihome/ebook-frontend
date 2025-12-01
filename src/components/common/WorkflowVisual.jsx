import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Bot, FileText, CheckCircle } from 'lucide-react';

const WorkflowVisual = ({
    title = "Agent Workflow",
    inputs = [
        { label: "Weather API", icon: "cloud" },
        { label: "Calendar", icon: "calendar" },
        { label: "Todo List", icon: "list" }
    ],
    agentName = "Morning Agent",
    outputs = [
        { label: "Daily Briefing", icon: "file" }
    ]
}) => {
    return (
        <div className="w-full max-w-3xl mx-auto my-12 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
            <h4 className="text-center text-slate-400 text-sm font-bold uppercase tracking-wider mb-8">{title}</h4>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">

                {/* INPUTS */}
                <div className="flex flex-col gap-4 w-full md:w-1/3">
                    {inputs.map((input, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg border border-slate-700 shadow-sm"
                        >
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                                <Database size={14} />
                            </div>
                            <span className="text-sm text-slate-300 font-medium">{input.label}</span>

                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute left-[30%] top-1/2 w-[20%] h-[2px] bg-gradient-to-r from-slate-700 to-cyan-900/0 -z-10" />
                        </motion.div>
                    ))}
                </div>

                {/* AGENT (CENTER) */}
                <div className="relative z-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="w-32 h-32 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl flex flex-col items-center justify-center shadow-xl shadow-cyan-900/30 border border-cyan-400/30"
                    >
                        <Bot size={40} className="text-white mb-2" />
                        <div className="text-white font-bold text-sm text-center px-2">{agentName}</div>
                    </motion.div>

                    {/* Pulsing Ring */}
                    <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-xl -z-10 animate-pulse" />
                </div>

                {/* OUTPUTS */}
                <div className="flex flex-col gap-4 w-full md:w-1/3">
                    {outputs.map((output, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + (idx * 0.1) }}
                            className="flex items-center gap-3 bg-green-900/20 p-4 rounded-lg border border-green-500/30 shadow-sm"
                        >
                            <div className="w-10 h-10 rounded-full bg-green-900/40 flex items-center justify-center text-green-400">
                                <FileText size={18} />
                            </div>
                            <div className="flex-1">
                                <span className="text-sm text-green-100 font-bold block">{output.label}</span>
                                <span className="text-xs text-green-400/70">Ready to read</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Arrows (Mobile/Desktop) */}
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 text-slate-600 hidden md:block">
                    <ArrowRight size={24} className="animate-pulse" />
                </div>
                <div className="absolute top-1/2 right-1/3 -translate-y-1/2 text-slate-600 hidden md:block">
                    <ArrowRight size={24} className="animate-pulse" />
                </div>
            </div>
        </div>
    );
};

export default WorkflowVisual;
