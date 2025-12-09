import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy, Star, Zap, ArrowRight, Award, Clock, Target,
    CheckCircle, Sparkles, Crown, Share2, ChevronRight, BookOpen
} from 'lucide-react';

/**
 * MissionComplete - Celebration screen after completing a chapter
 * Shows rewards, stats, achievements, and next chapter
 */

// Celebration confetti
const ConfettiBurst = () => {
    const emojis = ['🎉', '⭐', '🏆', '✨', '💫', '🚀', '📚', '🎊', '🙌', '✅'];

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => {
                const emoji = emojis[i % emojis.length];
                const startX = 50 + (Math.random() - 0.5) * 20;
                const endX = startX + (Math.random() - 0.5) * 100;
                const endY = -(100 + Math.random() * 200);
                const duration = 1 + Math.random() * 1;
                const delay = i * 0.05;

                return (
                    <motion.div
                        key={i}
                        initial={{
                            x: `${startX}%`,
                            y: '100%',
                            scale: 0,
                            rotate: 0,
                        }}
                        animate={{
                            x: `${endX}%`,
                            y: `${endY}%`,
                            scale: [0, 1, 1, 0.5],
                            rotate: Math.random() * 360,
                        }}
                        transition={{
                            duration,
                            delay,
                            ease: 'easeOut',
                        }}
                        className="absolute text-2xl"
                    >
                        {emoji}
                    </motion.div>
                );
            })}
        </div>
    );
};

// Achievement badge component
const AchievementBadge = ({ id, name, description, isNew }) => {
    const achievementIcons = {
        first_blood: { icon: Zap, color: 'teal' },
        card_collector: { icon: Star, color: 'yellow' },
        speed_runner: { icon: Clock, color: 'green' },
        perfectionist: { icon: Target, color: 'purple' },
        default: { icon: Award, color: 'blue' },
    };

    const config = achievementIcons[id] || achievementIcons.default;
    const IconComponent = config.icon;

    const colorClasses = {
        teal: 'from-teal-500/20 to-teal-500/5 border-teal-500/40 text-teal-400',
        yellow: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/40 text-yellow-400',
        green: 'from-green-500/20 to-green-500/5 border-green-500/40 text-green-400',
        purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/40 text-purple-400',
        blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/40 text-blue-400',
    };

    return (
        <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`
                relative bg-gradient-to-br ${colorClasses[config.color]}
                rounded-xl p-4 border text-center
            `}
        >
            {isNew && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
                >
                    NEW!
                </motion.div>
            )}
            <IconComponent className="mx-auto mb-2" size={28} />
            <p className="font-bold text-sm">{name}</p>
            <p className="text-slate-400 text-xs mt-1">{description}</p>
        </motion.div>
    );
};

const MissionComplete = ({
    operationId,
    operationName = "Chapter Complete",
    operationNumber = 1,
    nextOperationPath,
    nextOperationName = "Next Chapter",
    rewards = { xp: 100, cards: [], achievements: [] },
    stats = {},
    onContinue,
}) => {
    const [stage, setStage] = useState('celebrating'); // 'celebrating', 'rewards', 'ready'
    const [showConfetti, setShowConfetti] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Progress through stages
        const timer1 = setTimeout(() => setStage('rewards'), 1500);
        const timer2 = setTimeout(() => setStage('ready'), 3000);
        const timer3 = setTimeout(() => setShowConfetti(false), 2000);

        // Save completion to localStorage
        const completed = JSON.parse(localStorage.getItem('completed_operations') || '[]');
        if (!completed.includes(operationId)) {
            completed.push(operationId);
            localStorage.setItem('completed_operations', JSON.stringify(completed));
        }

        // Save XP
        const currentXP = parseInt(localStorage.getItem('total_xp') || '0');
        localStorage.setItem('total_xp', (currentXP + rewards.xp).toString());

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [operationId, rewards.xp]);

    const handleContinue = () => {
        onContinue?.();
        if (nextOperationPath) {
            navigate(nextOperationPath);
        }
    };

    // Achievement data
    const achievementData = {
        first_blood: { name: 'First Steps', description: 'Complete your first chapter' },
        card_collector: { name: 'Agent Builder', description: 'Create 10 different agents' },
        speed_runner: { name: 'Quick Learner', description: 'Complete in under 5 minutes' },
        perfectionist: { name: 'Completionist', description: 'Complete all objectives' },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-green-500/40 overflow-hidden"
        >
            {/* Confetti */}
            {showConfetti && <ConfettiBurst />}

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative p-8">
                {/* Big celebration header */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="text-center mb-8"
                >
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <CheckCircle className="text-green-400 mx-auto mb-4" size={64} />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-white mb-2"
                    >
                        CHAPTER COMPLETE!
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-green-400 text-lg font-medium"
                    >
                        {operationName}
                    </motion.p>
                </motion.div>

                {/* Rewards section */}
                <AnimatePresence>
                    {stage !== 'celebrating' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            {/* XP and Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-teal-500/20 rounded-xl p-4 text-center border border-teal-500/30">
                                    <Sparkles className="text-teal-400 mx-auto mb-2" size={24} />
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-2xl font-bold text-white block"
                                    >
                                        +{rewards.xp}
                                    </motion.span>
                                    <span className="text-teal-400 text-sm">XP Earned</span>
                                </div>

                                {rewards.cards?.length > 0 && (
                                    <div className="bg-purple-500/20 rounded-xl p-4 text-center border border-purple-500/30">
                                        <Star className="text-purple-400 mx-auto mb-2" size={24} />
                                        <span className="text-2xl font-bold text-white block">
                                            +{rewards.cards.length}
                                        </span>
                                        <span className="text-purple-400 text-sm">
                                            {rewards.cards.length === 1 ? 'Agent' : 'Agents'}
                                        </span>
                                    </div>
                                )}

                                <div className="bg-green-500/20 rounded-xl p-4 text-center border border-green-500/30">
                                    <BookOpen className="text-green-400 mx-auto mb-2" size={24} />
                                    <span className="text-2xl font-bold text-white block">
                                        {operationNumber}/10
                                    </span>
                                    <span className="text-green-400 text-sm">Chapters</span>
                                </div>
                            </div>

                            {/* Agents unlocked */}
                            {rewards.cards?.length > 0 && (
                                <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                                    <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                                        <Star className="text-yellow-400" size={16} />
                                        AGENTS UNLOCKED
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {rewards.cards.map((card, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.1 * i }}
                                                className="bg-gradient-to-r from-purple-500/20 to-teal-500/20 px-3 py-1.5 rounded-lg border border-purple-500/30"
                                            >
                                                <span className="text-white text-sm font-medium">{card}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            {rewards.achievements?.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                                        <Award className="text-yellow-400" size={16} />
                                        ACHIEVEMENTS UNLOCKED
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {rewards.achievements.map((achievementId, i) => (
                                            <AchievementBadge
                                                key={i}
                                                id={achievementId}
                                                name={achievementData[achievementId]?.name || achievementId}
                                                description={achievementData[achievementId]?.description || ''}
                                                isNew={true}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Stats breakdown */}
                            {Object.keys(stats).length > 0 && (
                                <div className="bg-slate-800/30 rounded-xl p-4 mb-6">
                                    <h4 className="text-slate-400 font-bold text-xs mb-3 uppercase tracking-wider">
                                        Chapter Stats
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {stats.timeToComplete && (
                                            <div className="flex items-center gap-2">
                                                <Clock className="text-slate-500" size={14} />
                                                <span className="text-slate-400 text-sm">Time:</span>
                                                <span className="text-white text-sm font-medium">{stats.timeToComplete}</span>
                                            </div>
                                        )}
                                        {stats.objectivesCompleted && (
                                            <div className="flex items-center gap-2">
                                                <Target className="text-slate-500" size={14} />
                                                <span className="text-slate-400 text-sm">Objectives:</span>
                                                <span className="text-white text-sm font-medium">{stats.objectivesCompleted}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Continue button */}
                <AnimatePresence>
                    {stage === 'ready' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <button
                                onClick={handleContinue}
                                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-teal-500/25 transition-all group"
                            >
                                <span>Continue to {nextOperationName}</span>
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </button>

                            {/* Share option */}
                            <div className="flex justify-center gap-4 mt-4">
                                <button className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
                                    <Share2 size={14} />
                                    Share Progress
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default MissionComplete;
