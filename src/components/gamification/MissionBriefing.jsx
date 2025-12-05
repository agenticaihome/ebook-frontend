import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Shield, Clock, AlertTriangle, ChevronRight,
    Radio, Target, Zap, Lock, Unlock
} from 'lucide-react';

/**
 * MissionBriefing - Explorer-style expedition header
 * Sets the stage for each expedition with dramatic styling
 */

const MissionBriefing = ({
    title,
    missionNumber = 1,
    totalMissions = 16,
    duration = "10 min",
    briefing,
    classification = "LEVEL 1",
    status = "NOT STARTED", // "NOT STARTED", "IN PROGRESS", "COMPLETE"
    objectives = [],
}) => {
    const [isTyping, setIsTyping] = useState(true);
    const [displayedText, setDisplayedText] = useState('');

    // Typewriter effect for briefing
    useEffect(() => {
        if (!briefing) return;

        let index = 0;
        const speed = 20; // ms per character

        const timer = setInterval(() => {
            if (index < briefing.length) {
                setDisplayedText(briefing.slice(0, index + 1));
                index++;
            } else {
                setIsTyping(false);
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [briefing]);

    const statusConfig = {
        "NOT STARTED": { color: 'red', icon: Lock, pulse: true },
        "IN PROGRESS": { color: 'yellow', icon: Radio, pulse: true },
        "COMPLETE": { color: 'green', icon: Unlock, pulse: false },
    };

    const currentStatus = statusConfig[status] || statusConfig["NOT STARTED"];
    const StatusIcon = currentStatus.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-8"
        >
            {/* Top territory banner */}
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                <div className="flex items-center gap-2 bg-slate-900 px-4 py-1 rounded-full border border-amber-500/30">
                    <Shield className="text-amber-400" size={14} />
                    <span className="text-amber-400 font-mono text-xs tracking-wider">
                        TERRITORY: {classification}
                    </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            </div>

            {/* Main briefing container */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800/95 to-slate-900 rounded-2xl border-2 border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/10">

                {/* Header bar */}
                <div className="bg-gradient-to-r from-cyan-900/50 via-slate-800 to-purple-900/50 px-6 py-4 border-b border-cyan-500/20">
                    <div className="flex items-center justify-between">
                        {/* Mission number and title */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <motion.div
                                    animate={currentStatus.pulse ? {
                                        boxShadow: [
                                            '0 0 0 0 rgba(34, 211, 238, 0.4)',
                                            '0 0 0 10px rgba(34, 211, 238, 0)',
                                        ],
                                    } : {}}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className={`
                                        w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-xl
                                        ${currentStatus.color === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : ''}
                                        ${currentStatus.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : ''}
                                        ${currentStatus.color === 'green' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : ''}
                                    `}
                                >
                                    {String(missionNumber).padStart(2, '0')}
                                </motion.div>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">
                                    Expedition {missionNumber} of {totalMissions}
                                </p>
                                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                                    {title}
                                </h1>
                            </div>
                        </div>

                        {/* Status and duration */}
                        <div className="hidden md:flex flex-col items-end gap-2">
                            <div className={`
                                flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold
                                ${currentStatus.color === 'red' ? 'bg-red-500/20 text-red-400' : ''}
                                ${currentStatus.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                                ${currentStatus.color === 'green' ? 'bg-green-500/20 text-green-400' : ''}
                            `}>
                                <StatusIcon size={12} />
                                {status}
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Clock size={14} />
                                <span>Expedition Duration: {duration}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Briefing content */}
                <div className="p-6 md:p-8">
                    {/* Alert header */}
                    <div className="flex items-center gap-3 mb-4">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <AlertTriangle className="text-yellow-400" size={20} />
                        </motion.div>
                        <span className="text-amber-400 font-bold font-mono text-sm tracking-wider">
                            EXPEDITION BRIEFING
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/50 to-transparent" />
                    </div>

                    {/* Briefing text with typewriter effect */}
                    <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-700/50 mb-6">
                        <p className="text-slate-200 leading-relaxed font-mono text-sm md:text-base">
                            {displayedText}
                            {isTyping && (
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="inline-block w-2 h-4 bg-cyan-400 ml-1"
                                />
                            )}
                        </p>
                    </div>

                    {/* Quick objectives preview */}
                    {objectives.length > 0 && (
                        <div className="grid md:grid-cols-3 gap-3">
                            {objectives.slice(0, 3).map((obj, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50"
                                >
                                    <Target className="text-cyan-400 flex-shrink-0" size={14} />
                                    <span className="text-slate-300 text-sm">{obj}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Bottom action hint */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-sm">
                        <Zap className="text-cyan-400" size={14} />
                        <span>Scroll down to begin expedition</span>
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ChevronRight className="text-cyan-400 rotate-90" size={16} />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom progress bar */}
                <div className="h-1 bg-slate-800">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(missionNumber / totalMissions) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    />
                </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />
        </motion.div>
    );
};

export default MissionBriefing;
