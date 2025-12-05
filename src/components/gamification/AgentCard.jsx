import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AGENT_RARITY } from '../../data/agentData';

const AgentCard = ({ agent, isLocked = false, isNew = false }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [copied, setCopied] = useState(false);

    const rarity = AGENT_RARITY[agent.rarity] || AGENT_RARITY.COMMON;

    const handleFlip = () => {
        if (!isLocked) {
            setIsFlipped(!isFlipped);
        }
    };

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(agent.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const cardVariants = {
        hidden: { rotateY: 0 },
        visible: { rotateY: 180 },
    };

    // Border glow based on rarity
    const glowStyle = {
        boxShadow: `0 0 15px ${rarity.hex}40`,
        borderColor: rarity.hex,
    };

    if (isLocked) {
        return (
            <div className="relative w-72 h-96 rounded-xl bg-gray-900 border-2 border-gray-700 flex flex-col items-center justify-center p-6 opacity-75 grayscale transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4 opacity-20">🔒</div>
                <h3 className="text-xl font-bold text-gray-500 text-center">CLASSIFIED</h3>
                <p className="text-sm text-gray-600 text-center mt-2">
                    Complete Operation to Unlock
                </p>
            </div>
        );
    }

    return (
        <div className="relative w-72 h-96 perspective-1000 group cursor-pointer" onClick={handleFlip}>
            <motion.div
                className="w-full h-full relative preserve-3d transition-transform duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* FRONT OF CARD */}
                <div
                    className="absolute w-full h-full backface-hidden rounded-xl bg-gray-900 border-2 overflow-hidden flex flex-col"
                    style={{ ...glowStyle, backfaceVisibility: 'hidden' }}
                >
                    {/* Header */}
                    <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
                        <span className="text-xs font-bold tracking-wider uppercase" style={{ color: rarity.hex }}>
                            {rarity.label}
                        </span>
                        <span className="text-xs text-gray-400">Lvl {Math.floor(agent.stats.powerLevel / 10)}</span>
                    </div>

                    {/* Image/Icon Area */}
                    <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-gray-800">
                        <div className="text-6xl mb-4 filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            {agent.icon}
                        </div>
                        <h3 className="text-xl font-bold text-center text-white mb-1 leading-tight">
                            {agent.name}
                        </h3>
                        <p className="text-xs text-cyan-400 font-mono">{agent.role}</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="p-3 bg-gray-800/80 border-t border-gray-700 grid grid-cols-2 gap-2 text-xs">
                        <div className="flex flex-col">
                            <span className="text-gray-500 uppercase text-[10px]">Time Saved</span>
                            <span className="text-white font-bold">{agent.stats.timeSaved}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 uppercase text-[10px]">Power</span>
                            <div className="w-full bg-gray-700 h-1.5 rounded-full mt-1">
                                <div
                                    className="h-full rounded-full"
                                    style={{ width: `${agent.stats.powerLevel}%`, backgroundColor: rarity.hex }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 uppercase text-[10px]">Complexity</span>
                            <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < agent.stats.complexity ? 'opacity-100' : 'opacity-20'}>
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 uppercase text-[10px]">Value</span>
                            <span className="text-green-400 font-bold">{agent.stats.moneySaved}</span>
                        </div>
                    </div>

                    {isNew && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                            NEW
                        </div>
                    )}
                </div>

                {/* BACK OF CARD */}
                <div
                    className="absolute w-full h-full backface-hidden rounded-xl bg-gray-900 border-2 flex flex-col overflow-hidden"
                    style={{
                        ...glowStyle,
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <div className="p-4 flex-1 flex flex-col">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-700 pb-2">
                            Summon Prompt
                        </h4>

                        <div className="flex-1 bg-black/30 rounded p-3 mb-4 overflow-y-auto text-xs font-mono text-cyan-300 leading-relaxed border border-gray-700/50">
                            {agent.prompt}
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={handleCopy}
                                className="w-full py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                            >
                                {copied ? '✅ Copied!' : '📋 Copy Code'}
                            </button>

                            <div className="text-[10px] text-center text-gray-500">
                                Compatible with: ChatGPT, Claude, Gemini
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AgentCard;
