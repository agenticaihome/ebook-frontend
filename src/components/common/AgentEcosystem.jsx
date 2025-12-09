import React from 'react';
import { motion } from 'framer-motion';
import {
    UtensilsCrossed, Calendar, Mail, DollarSign, Dumbbell,
    Briefcase, Settings, Users, Crown, Sparkles, User
} from 'lucide-react';

const AgentEcosystem = () => {
    const agents = [
        { id: 1, name: 'Meals', icon: <UtensilsCrossed size={20} />, color: 'bg-orange-500', x: 0, y: -120 },
        { id: 2, name: 'Dates', icon: <Calendar size={20} />, color: 'bg-pink-500', x: 85, y: -85 },
        { id: 3, name: 'Email', icon: <Mail size={20} />, color: 'bg-blue-500', x: 120, y: 0 },
        { id: 4, name: 'Money', icon: <DollarSign size={20} />, color: 'bg-green-500', x: 85, y: 85 },
        { id: 5, name: 'Fitness', icon: <Dumbbell size={20} />, color: 'bg-red-500', x: 0, y: 120 },
        { id: 6, name: 'Work', icon: <Briefcase size={20} />, color: 'bg-amber-500', x: -85, y: 85 },
        { id: 7, name: 'Custom', icon: <Settings size={20} />, color: 'bg-purple-500', x: -120, y: 0 },
        { id: 8, name: 'Team', icon: <Users size={20} />, color: 'bg-cyan-500', x: -85, y: -85 },
    ];

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden my-10">
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(20, 184, 166, 0.1)" />
                        <stop offset="100%" stopColor="rgba(20, 184, 166, 0.4)" />
                    </linearGradient>
                </defs>
                {agents.map((agent, i) => (
                    <motion.line
                        key={i}
                        x1="50%"
                        y1="50%"
                        x2={`calc(50% + ${agent.x}px)`}
                        y2={`calc(50% + ${agent.y}px)`}
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                    />
                ))}
            </svg>

            {/* Central Node (YOU) */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative z-20 flex flex-col items-center justify-center"
            >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-xl shadow-teal-500/30 z-20">
                    <User size={32} />
                </div>
                <div className="absolute -bottom-8 bg-slate-800/80 px-3 py-1 rounded-full text-xs font-bold text-teal-400 border border-teal-500/30">
                    YOU (CEO)
                </div>

                {/* Pulsing rings */}
                {[1, 2, 3].map((ring) => (
                    <motion.div
                        key={ring}
                        className="absolute inset-0 rounded-full border border-teal-500/20 z-10"
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: ring * 0.4
                        }}
                    />
                ))}
            </motion.div>

            {/* Satellite Nodes (AGENTS) */}
            {agents.map((agent, i) => (
                <motion.div
                    key={agent.id}
                    className="absolute z-20"
                    style={{ x: agent.x, y: agent.y }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2 + (i * 0.1)
                    }}
                >
                    <motion.div
                        className={`w-12 h-12 rounded-xl ${agent.color} flex items-center justify-center text-white shadow-lg cursor-pointer relative group`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                        {agent.icon}

                        {/* Tooltip */}
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700">
                            {agent.name}
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

export default AgentEcosystem;
