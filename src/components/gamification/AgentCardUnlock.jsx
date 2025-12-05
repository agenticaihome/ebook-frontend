import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Zap, ChevronDown, Check } from 'lucide-react';
import AgentCard from './AgentCard';

/**
 * AgentCardUnlock - Dramatic reveal animation for earning a new card
 * Includes confetti, glow effects, and celebration
 */

// Confetti particle component
const ConfettiParticle = ({ delay, emoji }) => {
    const randomX = Math.random() * 100;
    const randomRotation = Math.random() * 360;
    const duration = 2 + Math.random() * 2;

    return (
        <motion.div
            initial={{ 
                y: -20, 
                x: `${randomX}%`, 
                opacity: 1, 
                rotate: 0,
                scale: 0,
            }}
            animate={{ 
                y: '100vh', 
                opacity: 0, 
                rotate: randomRotation,
                scale: 1,
            }}
            transition={{ 
                duration, 
                delay,
                ease: 'easeOut',
            }}
            className="absolute text-2xl pointer-events-none"
            style={{ left: `${randomX}%` }}
        >
            {emoji}
        </motion.div>
    );
};

const AgentCardUnlock = ({
    card,
    onUnlock,
    onComplete,
    autoReveal = false,
    revealDelay = 500,
}) => {
    const [stage, setStage] = useState('locked'); // 'locked', 'revealing', 'revealed', 'complete'
    const [showConfetti, setShowConfetti] = useState(false);

    const confettiEmojis = ['⭐', '✨', '🎉', '🎊', '💫', '🌟', '⚡', '🏆'];

    useEffect(() => {
        if (autoReveal) {
            const timer = setTimeout(() => {
                handleReveal();
            }, revealDelay);
            return () => clearTimeout(timer);
        }
    }, [autoReveal, revealDelay]);

    const handleReveal = () => {
        setStage('revealing');
        setShowConfetti(true);
        
        // Play sound effect if available
        try {
            const audio = new Audio('/sounds/card-unlock.mp3');
            audio.volume = 0.3;
            audio.play().catch(() => {}); // Ignore if no sound file
        } catch (e) {}

        setTimeout(() => {
            setStage('revealed');
            onUnlock?.(card.id);
        }, 1500);

        setTimeout(() => {
            setShowConfetti(false);
        }, 3000);
    };

    const handleComplete = () => {
        setStage('complete');
        onComplete?.(card.id);
    };

    return (
        <div className="relative mb-8">
            {/* Confetti overlay */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <ConfettiParticle
                            key={i}
                            delay={i * 0.1}
                            emoji={confettiEmojis[i % confettiEmojis.length]}
                        />
                    ))}
                </div>
            )}

            {/* Main container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-2xl border border-slate-600 overflow-hidden backdrop-blur-sm"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 px-6 py-4 border-b border-green-500/30">
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={stage === 'locked' ? { 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Zap className="text-green-400" size={24} />
                        </motion.div>
                        <div>
                            <h3 className="text-green-400 font-bold text-lg">
                                {stage === 'complete' ? 'AGENT ACQUIRED!' : 'NEW AGENT AVAILABLE'}
                            </h3>
                            <p className="text-slate-400 text-sm">
                                {stage === 'locked' && 'Deploy the prompt to unlock this card'}
                                {stage === 'revealing' && 'Unlocking...'}
                                {stage === 'revealed' && 'Card added to your deck!'}
                                {stage === 'complete' && `${card.name} is ready for deployment`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card reveal area */}
                <div className="p-8 flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        {stage === 'locked' && (
                            <motion.div
                                key="locked"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative"
                            >
                                {/* Locked card preview */}
                                <div className="relative">
                                    <div className="w-64 h-96 bg-slate-800 rounded-2xl border-2 border-slate-600 flex items-center justify-center relative overflow-hidden">
                                        {/* Animated glow behind */}
                                        <motion.div
                                            animate={{
                                                opacity: [0.3, 0.6, 0.3],
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-cyan-500/20"
                                        />
                                        
                                        {/* Question mark */}
                                        <div className="text-center relative z-10">
                                            <motion.div
                                                animate={{ y: [0, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="text-6xl mb-4"
                                            >
                                                🎴
                                            </motion.div>
                                            <p className="text-white font-bold">{card.name}</p>
                                            <p className="text-slate-400 text-sm">{card.rarity.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Unlock button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleReveal}
                                    className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
                                >
                                    <Sparkles size={20} />
                                    UNLOCK CARD
                                </motion.button>
                            </motion.div>
                        )}

                        {stage === 'revealing' && (
                            <motion.div
                                key="revealing"
                                initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: [0.5, 1.2, 1],
                                    rotateY: 0,
                                }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                className="relative"
                            >
                                {/* Glow burst */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: [0, 1, 0], scale: [0, 2, 3] }}
                                    transition={{ duration: 1.5 }}
                                    className="absolute inset-0 bg-gradient-to-r from-green-500/50 to-cyan-500/50 rounded-full blur-3xl"
                                />
                                
                                <AgentCard {...card} isNew={true} />
                            </motion.div>
                        )}

                        {(stage === 'revealed' || stage === 'complete') && (
                            <motion.div
                                key="revealed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative"
                            >
                                {/* Subtle glow */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
                                
                                <AgentCard {...card} isNew={true} />

                                {stage === 'revealed' && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleComplete}
                                        className="mt-6 w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2"
                                    >
                                        <Check size={18} />
                                        Add to My Deck
                                    </motion.button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stats earned */}
                    {(stage === 'revealed' || stage === 'complete') && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 flex gap-4"
                        >
                            <div className="bg-cyan-500/20 rounded-lg px-4 py-2 text-center">
                                <span className="text-cyan-400 text-lg font-bold block">+{card.powerLevel || 50}</span>
                                <span className="text-slate-400 text-xs">Power</span>
                            </div>
                            <div className="bg-green-500/20 rounded-lg px-4 py-2 text-center">
                                <span className="text-green-400 text-lg font-bold block">{card.timeSaved}</span>
                                <span className="text-slate-400 text-xs">Saved</span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AgentCardUnlock;
