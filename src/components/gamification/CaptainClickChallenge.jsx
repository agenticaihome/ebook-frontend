import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Clock, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const CaptainClickChallenge = () => {
    const [gameState, setGameState] = useState('idle'); // idle, playing, finished
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [captainPos, setCaptainPos] = useState({ x: 50, y: 50 }); // Percentage
    const [clickEffect, setClickEffect] = useState(null);

    const containerRef = useRef(null);
    const timerRef = useRef(null);

    const moveCaptain = () => {
        if (!containerRef.current) return;
        // Keep within 10% - 90% range to avoid edge clipping
        const x = Math.floor(Math.random() * 80) + 10;
        const y = Math.floor(Math.random() * 80) + 10;
        setCaptainPos({ x, y });
    };

    const handleCaptainClick = (e) => {
        e.stopPropagation();
        if (gameState !== 'playing') return;

        setScore(prev => prev + 1);

        // Click effect
        const rect = e.target.getBoundingClientRect();
        setClickEffect({
            id: Date.now(),
            x: e.clientX,
            y: e.clientY
        });
        setTimeout(() => setClickEffect(null), 300);

        moveCaptain();
    };

    const startGame = () => {
        if (gameState === 'playing') return;
        setGameState('playing');
        setScore(0);
        setTimeLeft(30);
        moveCaptain();

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const endGame = () => {
        clearInterval(timerRef.current);
        setGameState('finished');

        let msg = "Mission Complete!";
        if (score >= 40) {
            msg = "LEGENDARY EFFICIENCY!";
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#06b6d4', '#ffffff']
            });
        } else if (score >= 25) {
            msg = "Excellent Work!";
        }

        // You could trigger a modal or just show the start screen again with the score
    };

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    return (
        <div className="min-h-screen bg-[#0f172a] text-[#e0f2fe] font-sans flex flex-col items-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black z-0" />
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)', backgroundSize: '50px 50px' }}
            />

            {/* Hero Content */}
            <div className="z-10 w-full max-w-5xl mx-auto px-4 pt-10 flex flex-col items-center">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 text-center drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                >
                    Captain Efficiency
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-cyan-100/80 mb-8 text-center"
                >
                    Click him as fast as you can before time runs out!
                </motion.p>

                {/* Stats Bar */}
                <div className="flex gap-12 mb-8 text-3xl font-bold font-mono">
                    <div className="flex items-center gap-3 text-cyan-400">
                        <Target /> <span>{score}</span>
                    </div>
                    <div className="flex items-center gap-3 text-purple-400">
                        <Clock /> <span>{timeLeft}s</span>
                    </div>
                </div>

                {/* Game Area */}
                <div
                    ref={containerRef}
                    className="relative w-full h-[60vh] max-h-[600px] border-4 border-cyan-500/50 rounded-3xl bg-slate-900/80 backdrop-blur-sm shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden cursor-crosshair"
                >
                    {/* Start Overlay */}
                    {gameState !== 'playing' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20 backdrop-blur-sm">
                            {gameState === 'finished' && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mb-8 text-center"
                                >
                                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                                    <h2 className="text-4xl font-bold text-white mb-2">
                                        {score >= 40 ? 'LEGENDARY!' : 'Mission Complete'}
                                    </h2>
                                    <p className="text-2xl text-cyan-400 font-mono">Score: {score} clicks</p>
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.6)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="px-12 py-6 bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-2xl font-bold rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center gap-3"
                            >
                                <Zap className="fill-current" />
                                {gameState === 'idle' ? 'START MISSION' : 'PLAY AGAIN'}
                            </motion.button>
                        </div>
                    )}

                    {/* The Captain */}
                    <AnimatePresence>
                        {(gameState === 'playing' || gameState === 'idle') && (
                            <motion.img
                                key="captain"
                                src="/assets/captain-efficiency-dark-transparent.png"
                                alt="Captain Efficiency"
                                initial={{ scale: 0 }}
                                animate={{
                                    left: `${captainPos.x}%`,
                                    top: `${captainPos.y}%`,
                                    scale: 1,
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute w-32 md:w-40 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] cursor-pointer z-10"
                                style={{ transform: 'translate(-50%, -50%)' }}
                                onClick={handleCaptainClick}
                                draggable="false"
                            />
                        )}
                    </AnimatePresence>

                    {/* Click Particles */}
                    {clickEffect && (
                        <div
                            className="fixed pointer-events-none z-50 text-cyan-400 font-bold text-2xl animate-ping"
                            style={{ left: clickEffect.x, top: clickEffect.y }}
                        >
                            +1
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <button className="px-10 py-5 bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] rounded-xl text-xl font-bold transition-all uppercase tracking-widest">
                        Get Your Own Captain Efficiency →
                    </button>
                    <p className="mt-4 text-slate-500 text-sm">Join 10,000+ others reclaiming their time.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default CaptainClickChallenge;
