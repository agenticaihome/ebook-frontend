import React, { useState } from 'react';
import { m } from 'framer-motion';
import { ClipboardList, CheckSquare, Clock } from 'lucide-react';

const WeeklyReviewTemplateGenerator = () => {
    const [agents, setAgents] = useState({
        morning: true,
        kitchen: false,
        household: false,
        email: false,
        calendar: false,
        finance: false,
        recovery: false,
        secondBrain: false
    });
    const [showTemplate, setShowTemplate] = useState(false);

    const toggleAgent = (key) => {
        setAgents({ ...agents, [key]: !agents[key] });
    };

    const generateChecklist = () => {
        const checklist = [
            { category: "Look Back", items: ["Review last week's top 3 priorities", "Check calendar for missed commitments"] },
        ];

        if (agents.recovery) {
            checklist[0].items.push("Review average energy levels (Green/Yellow/Red days)");
        }

        const agentChecks = [];
        if (agents.morning) agentChecks.push("Update Morning Brief prompts");
        if (agents.kitchen) agentChecks.push("Review meal plan & grocery list");
        if (agents.household) agentChecks.push("Check 'Essential 5' maintenance status");
        if (agents.email) agentChecks.push("Process 'Review Later' folder");
        if (agents.calendar) agentChecks.push("Review next week's schedule for conflicts");
        if (agents.finance) agentChecks.push("Review recent transactions & upcoming bills");
        if (agents.secondBrain) agentChecks.push("Process Knowledge Inbox (tag & file)");

        if (agentChecks.length > 0) {
            checklist.push({ category: "Agent Tune-Up", items: agentChecks });
        }

        checklist.push({
            category: "Look Ahead", items: [
                "Set top 3 priorities for next week",
                "Block time for deep work",
                "Schedule next Weekly Review"
            ]
        });

        return checklist;
    };

    const checklist = showTemplate ? generateChecklist() : [];

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600 my-8">
            <div className="flex items-center gap-3 mb-6">
                <ClipboardList className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Weekly Review Generator</h3>
            </div>

            {!showTemplate ? (
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-slate-300 mb-6">Select the agents you currently have running. We'll build a custom review checklist for you.</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        {Object.entries(agents).map(([key, value]) => (
                            <button
                                key={key}
                                onClick={() => toggleAgent(key)}
                                className={`p-3 rounded-xl border transition-all text-sm font-medium capitalize ${value
                                    ? 'bg-cyan-900/50 border-cyan-500 text-white'
                                    : 'bg-slate-900/50 border-slate-600 text-slate-400 hover:border-slate-500'
                                    }`}
                            >
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowTemplate(true)}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all"
                    >
                        Generate Template
                    </button>
                </m.div>
            ) : (
                <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="bg-white text-slate-900 p-6 rounded-xl shadow-2xl mb-6 font-mono text-sm">
                        <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4 mb-4">
                            <h4 className="text-xl font-bold uppercase">Weekly Review Protocol</h4>
                            <div className="flex items-center gap-2 text-slate-600">
                                <Clock size={16} />
                                <span>30 Min</span>
                            </div>
                        </div>

                        {checklist.map((section, i) => (
                            <div key={i} className="mb-6">
                                <h5 className="font-bold text-slate-700 mb-2 uppercase tracking-wider">{section.category}</h5>
                                <ul className="space-y-2">
                                    {section.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-3">
                                            <div className="w-5 h-5 border-2 border-slate-400 rounded flex-shrink-0 mt-0.5"></div>
                                            <span className="leading-tight">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div className="mt-8 pt-4 border-t border-slate-300 text-center text-slate-400 text-xs">
                            Generated by Agentic AI at Home
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowTemplate(false)}
                            className="flex-1 py-3 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 transition-all"
                        >
                            Edit Agents
                        </button>
                        <button
                            onClick={() => window.print()} // Simple print trigger
                            className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                            <CheckSquare size={18} />
                            Save / Print
                        </button>
                    </div>
                </m.div>
            )}
        </div>
    );
};

export default WeeklyReviewTemplateGenerator;
