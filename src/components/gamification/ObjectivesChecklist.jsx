import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, CheckCircle, Circle, Star, Zap, Trophy } from 'lucide-react';

/**
 * ObjectivesChecklist - Interactive mission objectives with persistence
 * Tracks completion in localStorage and provides visual feedback
 */

const ObjectivesChecklist = ({
    operationId,
    primaryObjectives = [],
    bonusObjectives = [],
    onObjectiveComplete,
    onAllComplete,
}) => {
    const [completedObjectives, setCompletedObjectives] = useState({});
    const [justCompleted, setJustCompleted] = useState(null);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(`objectives_${operationId}`);
        if (saved) {
            setCompletedObjectives(JSON.parse(saved));
        }
    }, [operationId]);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem(`objectives_${operationId}`, JSON.stringify(completedObjectives));
        
        // Check if all primary objectives complete
        const allPrimaryComplete = primaryObjectives.every(
            obj => completedObjectives[obj.id || obj]
        );
        if (allPrimaryComplete && primaryObjectives.length > 0) {
            onAllComplete?.();
        }
    }, [completedObjectives, operationId, primaryObjectives, onAllComplete]);

    const toggleObjective = (id) => {
        const newCompleted = {
            ...completedObjectives,
            [id]: !completedObjectives[id],
        };
        setCompletedObjectives(newCompleted);
        
        if (!completedObjectives[id]) {
            setJustCompleted(id);
            setTimeout(() => setJustCompleted(null), 1000);
            onObjectiveComplete?.(id);
            
            // Play sound
            try {
                const audio = new Audio('/sounds/objective-complete.mp3');
                audio.volume = 0.2;
                audio.play().catch(() => {});
            } catch (e) {}
        }
    };

    const getObjectiveId = (obj) => typeof obj === 'string' ? obj : obj.id;
    const getObjectiveLabel = (obj) => typeof obj === 'string' ? obj : obj.label;

    const completedPrimary = primaryObjectives.filter(
        obj => completedObjectives[getObjectiveId(obj)]
    ).length;
    const completedBonus = bonusObjectives.filter(
        obj => completedObjectives[getObjectiveId(obj)]
    ).length;
    const totalCompleted = completedPrimary + completedBonus;
    const totalObjectives = primaryObjectives.length + bonusObjectives.length;
    const progressPercent = (totalCompleted / totalObjectives) * 100;

    const allPrimaryDone = completedPrimary === primaryObjectives.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 rounded-2xl border border-slate-600/50 overflow-hidden backdrop-blur-sm mb-8"
        >
            {/* Header with progress */}
            <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                            <Target className="text-cyan-400" size={20} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">MISSION OBJECTIVES</h3>
                            <p className="text-slate-400 text-sm">
                                {totalCompleted}/{totalObjectives} complete
                            </p>
                        </div>
                    </div>
                    
                    {allPrimaryDone && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full"
                        >
                            <Trophy className="text-green-400" size={16} />
                            <span className="text-green-400 font-bold text-sm">READY</span>
                        </motion.div>
                    )}
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={`h-full ${
                            allPrimaryDone 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                                : 'bg-gradient-to-r from-cyan-500 to-purple-500'
                        }`}
                    />
                </div>
            </div>

            {/* Objectives list */}
            <div className="p-6">
                {/* Primary Objectives */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Zap className="text-cyan-400" size={16} />
                        <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">
                            Primary Objectives
                        </span>
                        <span className="text-slate-500 text-sm">
                            ({completedPrimary}/{primaryObjectives.length})
                        </span>
                    </div>

                    <div className="space-y-2">
                        {primaryObjectives.map((obj, i) => {
                            const id = getObjectiveId(obj);
                            const label = getObjectiveLabel(obj);
                            const isComplete = completedObjectives[id];
                            const isJustDone = justCompleted === id;

                            return (
                                <motion.button
                                    key={id}
                                    onClick={() => toggleObjective(id)}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`
                                        w-full flex items-center gap-3 p-3 rounded-xl
                                        transition-all cursor-pointer text-left
                                        ${isComplete 
                                            ? 'bg-green-500/10 border border-green-500/30' 
                                            : 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600'
                                        }
                                    `}
                                >
                                    <motion.div
                                        animate={isJustDone ? { 
                                            scale: [1, 1.3, 1],
                                            rotate: [0, 10, -10, 0],
                                        } : {}}
                                    >
                                        {isComplete ? (
                                            <CheckCircle className="text-green-400" size={20} />
                                        ) : (
                                            <Circle className="text-slate-500" size={20} />
                                        )}
                                    </motion.div>
                                    <span className={`flex-1 ${
                                        isComplete ? 'text-green-300 line-through' : 'text-slate-300'
                                    }`}>
                                        {label}
                                    </span>
                                    {isJustDone && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-green-400 text-sm font-bold"
                                        >
                                            +25 XP
                                        </motion.span>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Bonus Objectives */}
                {bonusObjectives.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Star className="text-yellow-400" size={16} />
                            <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
                                Bonus Objectives
                            </span>
                            <span className="text-slate-500 text-sm">
                                ({completedBonus}/{bonusObjectives.length})
                            </span>
                        </div>

                        <div className="space-y-2">
                            {bonusObjectives.map((obj, i) => {
                                const id = getObjectiveId(obj);
                                const label = getObjectiveLabel(obj);
                                const isComplete = completedObjectives[id];
                                const isJustDone = justCompleted === id;

                                return (
                                    <motion.button
                                        key={id}
                                        onClick={() => toggleObjective(id)}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`
                                            w-full flex items-center gap-3 p-3 rounded-xl
                                            transition-all cursor-pointer text-left
                                            ${isComplete 
                                                ? 'bg-yellow-500/10 border border-yellow-500/30' 
                                                : 'bg-slate-800/30 border border-slate-700/30 hover:border-slate-600'
                                            }
                                        `}
                                    >
                                        <motion.div
                                            animate={isJustDone ? { 
                                                scale: [1, 1.3, 1],
                                                rotate: [0, 10, -10, 0],
                                            } : {}}
                                        >
                                            {isComplete ? (
                                                <Star className="text-yellow-400 fill-yellow-400" size={18} />
                                            ) : (
                                                <Star className="text-slate-600" size={18} />
                                            )}
                                        </motion.div>
                                        <span className={`flex-1 text-sm ${
                                            isComplete ? 'text-yellow-300 line-through' : 'text-slate-400'
                                        }`}>
                                            {label}
                                        </span>
                                        {isJustDone && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="text-yellow-400 text-sm font-bold"
                                            >
                                                +10 XP
                                            </motion.span>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ObjectivesChecklist;
