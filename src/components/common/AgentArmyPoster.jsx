import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, Sparkles } from 'lucide-react';

/**
 * AgentArmyPoster - Visual representation of all 10 deployed agents
 * Shows which agents are "active" based on completed chapters
 */

const AGENTS = [
    { id: 1, name: "Morning Briefer", emoji: "🌅", description: "Wakes you up with clarity" },
    { id: 2, name: "Meal Planner", emoji: "🍽️", description: "No more 'what's for dinner?'" },
    { id: 3, name: "Date Tracker", emoji: "🎂", description: "Never forget birthdays" },
    { id: 4, name: "Email Sorter", emoji: "📧", description: "Inbox on autopilot" },
    { id: 5, name: "Money Monitor", emoji: "💰", description: "Financial awareness" },
    { id: 6, name: "Fitness Coach", emoji: "💪", description: "Health made simple" },
    { id: 7, name: "Work Optimizer", emoji: "💼", description: "Focus on what matters" },
    { id: 8, name: "Custom Builder", emoji: "🔧", description: "Create your own agents" },
    { id: 9, name: "Team Coordinator", emoji: "🤝", description: "Agents working together" },
    { id: 10, name: "Life Orchestrator", emoji: "🎯", description: "Your complete system" },
];

const AgentArmyPoster = ({ completedChapters = [] }) => {
    const completedCount = completedChapters.length;
    const allComplete = completedCount >= 10;

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="text-amber-400" size={24} />
                    Your Agent Army
                </h2>
                <p className="text-slate-400">
                    {allComplete
                        ? "All 10 agents deployed! Your life is on autopilot. 🎉"
                        : `${completedCount} of 10 agents deployed`
                    }
                </p>
            </div>

            {/* Agent Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {AGENTS.map((agent, index) => {
                    const isDeployed = completedChapters.includes(agent.id);

                    return (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className={`relative p-4 rounded-xl text-center transition-all ${isDeployed
                                    ? 'bg-gradient-to-br from-teal-900/40 to-cyan-900/40 border border-teal-500/40'
                                    : 'bg-slate-800/30 border border-slate-700/30 opacity-60'
                                }`}
                        >
                            {/* Status indicator */}
                            <div className={`absolute top-2 right-2 ${isDeployed ? 'text-teal-400' : 'text-slate-600'}`}>
                                {isDeployed ? <CheckCircle size={14} /> : <Lock size={14} />}
                            </div>

                            {/* Emoji */}
                            <div className={`text-3xl mb-2 ${isDeployed ? '' : 'grayscale'}`}>
                                {agent.emoji}
                            </div>

                            {/* Name */}
                            <div className={`text-xs font-bold ${isDeployed ? 'text-white' : 'text-slate-500'}`}>
                                {agent.name}
                            </div>

                            {/* Deployed badge */}
                            {isDeployed && (
                                <div className="mt-2 text-[10px] text-teal-400 font-bold uppercase tracking-wider">
                                    ✓ Active
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Call to action if not all complete */}
            {!allComplete && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-center"
                >
                    <p className="text-slate-500 text-sm">
                        Complete more chapters to deploy more agents!
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default AgentArmyPoster;
