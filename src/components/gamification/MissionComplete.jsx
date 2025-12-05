import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';

const MissionComplete = ({
    operationId,
    nextOperationPath,
    rewards = { xp: 100, cards: [] }
}) => {
    const { completeOperation, addXp, collectCard } = useGame();

    useEffect(() => {
        // Trigger completion logic on mount
        completeOperation(operationId);

        // Fire confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#06b6d4', '#8b5cf6', '#f59e0b']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#06b6d4', '#8b5cf6', '#f59e0b']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();

    }, [operationId, completeOperation]);

    return (
        <div className="max-w-4xl mx-auto my-12 p-8 bg-gray-900 rounded-xl border-2 border-green-500/50 relative overflow-hidden text-center">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-green-500/5 z-0"></div>

            <div className="relative z-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="inline-block border-4 border-green-500 text-green-500 font-black text-3xl md:text-5xl px-8 py-4 rounded uppercase tracking-widest mb-8 transform -rotate-2"
                >
                    Mission Complete
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">XP Earned</div>
                        <div className="text-3xl font-bold text-purple-400">+{rewards.xp} XP</div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Status</div>
                        <div className="text-3xl font-bold text-green-400">SUCCESS</div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Agents Unlocked</div>
                        <div className="text-3xl font-bold text-cyan-400">{rewards.cards.length}</div>
                    </div>
                </div>

                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    Outstanding work, Operator. You have successfully completed this operation.
                    Your Life OS is becoming stronger.
                </p>

                {nextOperationPath ? (
                    <Link
                        to={nextOperationPath}
                        className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg text-lg uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-green-500/20"
                    >
                        Proceed to Next Operation →
                    </Link>
                ) : (
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center justify-center px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-lg uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
                    >
                        Return to Base
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MissionComplete;
