import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { Play, RotateCcw, Terminal, Check } from 'lucide-react';

const AgentSimulation = ({ agentName, task, steps }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);

    const runSimulation = () => {
        if (isRunning) return;
        setIsRunning(true);
        setIsComplete(false);
        setLogs([]);
        setProgress(0);

        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep >= steps.length) {
                clearInterval(interval);
                setIsRunning(false);
                setIsComplete(true);
                return;
            }

            const step = steps[currentStep];
            setLogs(prev => [...prev, step]);
            setProgress(((currentStep + 1) / steps.length) * 100);
            currentStep++;
        }, 1500); // 1.5s per step
    };

    const reset = () => {
        setIsRunning(false);
        setIsComplete(false);
        setLogs([]);
        setProgress(0);
    };

    return (
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl my-12 border border-slate-600 font-mono text-sm">
            {/* Header */}
            <div className="bg-slate-800 p-4 flex items-center justify-between border-b border-slate-600">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-slate-400 font-semibold ml-2">agent@{agentName}:~</span>
                </div>
                <div className="text-xs text-slate-400">v1.0.4</div>
            </div>

            {/* Task Description */}
            <div className="bg-slate-800/50 p-4 border-b border-slate-600 flex items-center justify-between">
                <div className="text-slate-300">
                    <span className="text-blue-400 font-bold">TASK:</span> {task}
                </div>
                {!isRunning && !isComplete && (
                    <button
                        onClick={runSimulation}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors"
                    >
                        <Play size={14} /> RUN AGENT
                    </button>
                )}
                {isComplete && (
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors"
                    >
                        <RotateCcw size={14} /> RESET
                    </button>
                )}
            </div>

            {/* Terminal Output */}
            <div className="p-6 h-64 overflow-y-auto space-y-3 bg-slate-900">
                {!isRunning && !isComplete && logs.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600">
                        <Terminal size={48} className="mb-4 opacity-50" />
                        <p>Ready to initialize agent sequence...</p>
                    </div>
                )}

                {logs.map((log, index) => (
                    <m.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-3"
                    >
                        <span className="text-green-500 mt-0.5">➜</span>
                        <div>
                            <span className="text-blue-400 font-bold">[{log.action}]</span>{' '}
                            <span className="text-slate-300">{log.detail}</span>
                        </div>
                    </m.div>
                ))}

                {isRunning && (
                    <m.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="w-2 h-4 bg-green-500"
                    />
                )}

                {isComplete && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 p-3 bg-green-900/20 border border-green-900/50 rounded text-green-400 flex items-center gap-2"
                    >
                        <Check size={16} />
                        Task Completed Successfully.
                    </m.div>
                )}
            </div>

            {/* Progress Bar */}
            {isRunning && (
                <div className="h-1 bg-slate-800 w-full">
                    <m.div
                        className="h-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
};

export default AgentSimulation;
