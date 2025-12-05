import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Clock, DollarSign, Brain, Zap, Copy, CheckCircle,
    Sun, Mail, Calendar, ShoppingCart, Home, Wrench,
    Heart, Users, BookOpen, Crown, Shield, Sparkles
} from 'lucide-react';

/**
 * AgentCard - Collectible trading card component
 * Flips to reveal the prompt on the back
 */

// Icon mapping for different agent types
const agentIcons = {
    'morning_brief': Sun,
    'meal_planner': ShoppingCart,
    'grocery_list': ShoppingCart,
    'email_triage': Mail,
    'calendar_defender': Calendar,
    'cleaning_coordinator': Home,
    'maintenance_manager': Wrench,
    'health_coordinator': Heart,
    'connection_agent': Users,
    'recovery_learner': BookOpen,
    'the_conductor': Crown,
    'default': Brain,
};

// Rarity configurations
const rarityConfig = {
    common: {
        gradient: 'from-slate-600 via-slate-500 to-slate-600',
        border: 'border-slate-400',
        glow: '',
        label: 'COMMON',
        labelBg: 'bg-slate-500',
    },
    rare: {
        gradient: 'from-blue-600 via-blue-400 to-blue-600',
        border: 'border-blue-400',
        glow: 'shadow-blue-500/30 shadow-lg',
        label: 'RARE',
        labelBg: 'bg-blue-500',
    },
    epic: {
        gradient: 'from-purple-600 via-purple-400 to-purple-600',
        border: 'border-purple-400',
        glow: 'shadow-purple-500/40 shadow-xl',
        label: 'EPIC',
        labelBg: 'bg-purple-500',
    },
    legendary: {
        gradient: 'from-yellow-500 via-amber-400 to-yellow-500',
        border: 'border-yellow-400',
        glow: 'shadow-yellow-500/50 shadow-2xl',
        label: 'LEGENDARY',
        labelBg: 'bg-gradient-to-r from-yellow-500 to-amber-500',
    },
};

// Category configurations
const categoryConfig = {
    'Daily Ops': { color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
    'Digital Ops': { color: 'text-purple-400', bg: 'bg-purple-500/20' },
    'Life Systems': { color: 'text-rose-400', bg: 'bg-rose-500/20' },
    'Master': { color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
};

const AgentCard = ({
    id,
    name,
    rarity = 'common',
    category = 'Daily Ops',
    timeSaved = '1 hr/week',
    moneySaved = '$50/mo',
    complexity = 3,
    powerLevel = 50,
    prompt,
    description,
    locked = false,
    isNew = false,
    size = 'default', // 'small', 'default', 'large'
    onFlip,
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [copied, setCopied] = useState(false);

    const rarityStyle = rarityConfig[rarity];
    const categoryStyle = categoryConfig[category] || categoryConfig['Daily Ops'];
    const IconComponent = agentIcons[id] || agentIcons.default;

    const sizeClasses = {
        small: 'w-48 h-72',
        default: 'w-64 h-96',
        large: 'w-80 h-[480px]',
    };

    const handleFlip = () => {
        if (!locked) {
            setIsFlipped(!isFlipped);
            onFlip?.(!isFlipped);
        }
    };

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (locked) {
        return (
            <div className={`${sizeClasses[size]} relative cursor-not-allowed`}>
                <div className="absolute inset-0 bg-slate-800 rounded-2xl border-2 border-slate-600 flex items-center justify-center">
                    <div className="text-center p-6">
                        <Shield className="text-slate-600 mx-auto mb-3" size={48} />
                        <p className="text-slate-500 font-bold text-sm">LOCKED</p>
                        <p className="text-slate-600 text-xs mt-2">Complete mission to unlock</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className={`${sizeClasses[size]} perspective-1000 cursor-pointer`}
            onClick={handleFlip}
        >
            <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* FRONT OF CARD */}
                <div 
                    className={`
                        absolute inset-0 rounded-2xl overflow-hidden
                        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                        border-2 ${rarityStyle.border} ${rarityStyle.glow}
                    `}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {/* Rarity gradient header */}
                    <div className={`h-2 bg-gradient-to-r ${rarityStyle.gradient}`} />

                    {/* New badge */}
                    {isNew && (
                        <div className="absolute top-4 right-4 z-10">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                            >
                                NEW
                            </motion.div>
                        </div>
                    )}

                    {/* Card content */}
                    <div className="p-4 h-full flex flex-col">
                        {/* Category & Rarity */}
                        <div className="flex items-center justify-between mb-3">
                            <span className={`text-xs font-mono ${categoryStyle.color} ${categoryStyle.bg} px-2 py-0.5 rounded`}>
                                {category}
                            </span>
                            <span className={`text-xs font-bold text-white px-2 py-0.5 rounded ${rarityStyle.labelBg}`}>
                                {rarityStyle.label}
                            </span>
                        </div>

                        {/* Agent icon/portrait */}
                        <div className="flex-1 flex items-center justify-center mb-4">
                            <div className={`
                                w-24 h-24 rounded-full 
                                bg-gradient-to-br ${rarityStyle.gradient}
                                flex items-center justify-center
                                shadow-lg
                            `}>
                                <IconComponent className="text-white" size={40} />
                            </div>
                        </div>

                        {/* Agent name */}
                        <h3 className="text-white font-bold text-center text-lg mb-3 leading-tight">
                            {name}
                        </h3>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="bg-slate-800/80 rounded-lg p-2 text-center">
                                <Clock className="text-cyan-400 mx-auto mb-1" size={14} />
                                <span className="text-white text-xs font-bold block">{timeSaved}</span>
                                <span className="text-slate-500 text-[10px]">saved</span>
                            </div>
                            <div className="bg-slate-800/80 rounded-lg p-2 text-center">
                                <DollarSign className="text-green-400 mx-auto mb-1" size={14} />
                                <span className="text-white text-xs font-bold block">{moneySaved}</span>
                                <span className="text-slate-500 text-[10px]">saved</span>
                            </div>
                        </div>

                        {/* Complexity stars */}
                        <div className="flex items-center justify-center gap-1 mb-2">
                            <Brain className="text-purple-400" size={12} />
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full ${
                                            i <= complexity ? 'bg-purple-400' : 'bg-slate-600'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Power level bar */}
                        <div className="mt-auto">
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-slate-500">Power Level</span>
                                <span className="text-white font-bold">{powerLevel}</span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${powerLevel}%` }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    className={`h-full bg-gradient-to-r ${rarityStyle.gradient}`}
                                />
                            </div>
                        </div>

                        {/* Flip hint */}
                        <p className="text-slate-500 text-[10px] text-center mt-2">
                            Tap to reveal summon prompt →
                        </p>
                    </div>
                </div>

                {/* BACK OF CARD */}
                <div 
                    className={`
                        absolute inset-0 rounded-2xl overflow-hidden
                        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                        border-2 ${rarityStyle.border} ${rarityStyle.glow}
                    `}
                    style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${rarityStyle.gradient} px-4 py-3`}>
                        <div className="flex items-center gap-2">
                            <Zap className="text-white" size={18} />
                            <span className="text-white font-bold text-sm">SUMMON PROMPT</span>
                        </div>
                    </div>

                    {/* Prompt content */}
                    <div className="p-4 h-[calc(100%-52px)] flex flex-col">
                        <div className="flex-1 bg-slate-950/80 rounded-lg p-3 mb-3 overflow-auto">
                            <pre className="text-slate-300 text-xs whitespace-pre-wrap font-mono leading-relaxed">
                                {prompt}
                            </pre>
                        </div>

                        {/* Copy button */}
                        <button
                            onClick={handleCopy}
                            className={`
                                w-full py-3 rounded-xl font-bold text-sm
                                flex items-center justify-center gap-2
                                transition-all
                                ${copied 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                                }
                            `}
                        >
                            {copied ? (
                                <>
                                    <CheckCircle size={16} />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy size={16} />
                                    Copy Summon Code
                                </>
                            )}
                        </button>

                        {/* Flip back hint */}
                        <p className="text-slate-500 text-[10px] text-center mt-2">
                            ← Tap to flip back
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AgentCard;
