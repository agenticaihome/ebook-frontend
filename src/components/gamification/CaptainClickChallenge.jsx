import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Clock, Trophy, Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const CaptainClickChallenge = () => {
    const [gameState, setGameState] = useState('idle'); // idle, playing, finished
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [captainPos, setCaptainPos] = useState({ x: 50, y: 50 }); // Percentage
    const [clickEffect, setClickEffect] = useState(null);
    const [powerUps, setPowerUps] = useState([]);
    const [activePowerUp, setActivePowerUp] = useState(null);
    const [moveSpeed, setMoveSpeed] = useState(1500);
    const [screenShake, setScreenShake] = useState(false);

    const containerRef = useRef(null);
    const timerRef = useRef(null);
    const moveIntervalRef = useRef(null);

    const powerUpTypes = [
        { id: 'speed', label: '⚡ Speed Boost', color: 'bg-yellow-400', effect: 'Points x2 for 5s' },
        { id: 'slow', label: '🎯 Slow Mode', color: 'bg-blue-400', effect: 'Captain slows down' },
        { id: 'double', label: '💥 Double Points', color: 'bg-purple-400', effect: 'x2 score per click' },
    ];

    const moveCaptain = () => {
        if (!containerRef.current) return;
        // Keep within 15% - 85% range to avoid edge clipping
        const x = Math.floor(Math.random() * 70) + 15;
        const y = Math.floor(Math.random() * 70) + 15;
        setCaptainPos({ x, y });
    };

    const spawnPowerUp = () => {
        if (powerUps.length >= 2) return;
        const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        const newPowerUp = {
            id: Date.now(),
            x: Math.floor(Math.random() * 70) + 15,
            y: Math.floor(Math.random() * 70) + 15,
            ...type
        };
        setPowerUps(prev => [...prev, newPowerUp]);
    };

    const handleCaptainClick = (e) => {
        e.stopPropagation();
        if (gameState !== 'playing') return;

        let points = 1;
        if (activePowerUp === 'double' || activePowerUp === 'speed') {
            points = 2;
        }

        setScore(prev => prev + points);

        // Click effect
        setClickEffect({
            id: Date.now(),
            x: captainPos.x,
            y: captainPos.y,
            text: `+${points}`
        });
        setTimeout(() => setClickEffect(null), 300);

        // Screen shake
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 100);

        moveCaptain();
    };

    const handlePowerUpClick = (powerUp) => {
        if (gameState !== 'playing') return;

        setActivePowerUp(powerUp.id);
        setPowerUps(prev => prev.filter(p => p.id !== powerUp.id));

        if (powerUp.id === 'slow') {
            setMoveSpeed(2500);
        } else if (powerUp.id === 'speed') {
            setMoveSpeed(700);
        }

        // Reset after 5s
        setTimeout(() => {
            setActivePowerUp(null);
            setMoveSpeed(1500);
        }, 5000);
    };

    const startGame = () => {
        if (gameState === 'playing') return;
        setGameState('playing');
        setScore(0);
        setTimeLeft(30);
        setPowerUps([]);
        setActivePowerUp(null);
        setMoveSpeed(1500);
        moveCaptain();

        // Timer
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Difficulty progression
        setTimeout(() => setMoveSpeed(1200), 10000); // Faster at 10s
        setTimeout(() => {
            setMoveSpeed(800);
            spawnPowerUp(); // First power-up at 15s
        }, 15000);
        setTimeout(() => {
            setMoveSpeed(700);
            spawnPowerUp(); // Second power-up at 25s
        }, 25000);
    };

    const endGame = () => {
        clearInterval(timerRef.current);
        setGameState('finished');

        // Save high score
        const currentHigh = parseInt(localStorage.getItem('highscore_clicker') || '0');
        if (score > currentHigh) {
            localStorage.setItem('highscore_clicker', score.toString());
        }

        if (score >= 40) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#06b6d4', '#ffffff', '#fbbf24']
            });
        }
    };

    useEffect(() => {
        return () => {
            clearInterval(timerRef.current);
            clearInterval(moveIntervalRef.current);
        };
    }, []);

    // Score tier messaging
    const getScoreTier = (s) => {
        if (s >= 40) return { label: 'LEGENDARY EFFICIENCY!', color: 'text-yellow-400' };
        if (s >= 30) return { label: 'Excellent Work!', color: 'text-cyan-400' };
        if (s >= 20) return { label: 'Decent Performance', color: 'text-green-400' };
        return { label: 'Needs Coffee ☕', color: 'text-slate-400' };
    };

    const scoreTier = getScoreTier(score);

    return (
        <div className="w-full max-w-2xl mx-auto bg-slate-900/80 border border-orange-500/30 rounded-2xl overflow-hidden shadow-2xl relative min-h-[400px] backdrop-blur-sm">
            {/* HUD */}
            <div className="bg-slate-800/90 p-4 flex justify-between items-center border-b border-slate-700 z-20 relative backdrop-blur-xl">
                <div className="flex items-center gap-6">
                    <div className="text-orange-400 font-bold font-mono text-xl">CLICKS: {score}</div>
                    <div className={`font-bold font-mono text-xl ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-slate-300'}`}>
                        TIME: {timeLeft}s
                    </div>
                    {activePowerUp && (
                        <div className="text-sm text-yellow-400 font-bold animate-pulse">
                            {powerUpTypes.find(p => p.id === activePowerUp)?.label}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs">CE</div>
                    <span className="text-xs text-orange-300 font-medium hidden sm:block">Click me fast!</span>
                </div>
            </div>

            {/* Game Area */}
            <div
                ref={containerRef}
                className="relative h-[340px] bg-[#0f0f1a] overflow-hidden cursor-crosshair"
            >
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '50px 50px' }}
                />

                {/* Start Overlay */}
                {gameState !== 'playing' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30 backdrop-blur-sm text-center p-6">
                        {gameState === 'finished' && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="mb-8"
                            >
                                <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                                <h2 className={`text-4xl font-bold mb-2 ${scoreTier.color}`}>
                                    {scoreTier.label}
                                </h2>
                                <p className="text-2xl text-white font-mono mb-2">{score} clicks</p>
                                <p className="text-sm text-slate-400">
                                    {score >= 40 && '🏆 Legendary status achieved!'}
                                    {score >= 30 && score < 40 && 'So close to legendary!'}
                                    {score >= 20 && score < 30 && 'Keep practicing!'}
                                    {score < 20 && 'Try again for a better score'}
                                </p>
                            </motion.div>
                        )}

                        {gameState === 'idle' && (
                            <>
                                <h3 className="text-3xl font-bold text-white mb-2">Captain Click Challenge</h3>
                                <p className="text-slate-300 mb-6 max-w-md">
                                    Click Captain Efficiency as fast as you can!<br />
                                    <span className="text-yellow-400">Collect power-ups for bonuses</span><br />
                                    <strong className="text-cyan-400">Goal: 40+ clicks for Legendary!</strong>
                                </p>
                            </>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startGame}
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-900/50 transition-all"
                        >
                            {gameState === 'idle' ? <><Play size={20} /> START CHALLENGE</> : <><RotateCcw size={20} /> Try Again</>}
                        </motion.button>
                    </div>
                )}

                {/* The Captain */}
                <AnimatePresence>
                    {(gameState === 'playing' || gameState === 'idle') && (
                        <motion.img
                            key="captain"
                            src="/assets/captain-efficiency-dark-transparent.png"
                            alt="Captain"
                            initial={{ scale: 0 }}
                            animate={{
                                left: `${captainPos.x}%`,
                                top: `${captainPos.y}%`,
                                scale: 1,
                                rotate: [0, 3, -3, 0]
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            whileHover={{ scale: 1.1 }}
                            className="absolute w-24 md:w-28 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] cursor-pointer z-10 select-none"
                            style={{ transform: 'translate(-50%, -50%)', pointerEvents: gameState === 'playing' ? 'auto' : 'none' }}
                            onClick={handleCaptainClick}
                            draggable="false"
                        />
                    )}
                </AnimatePresence>

                {/* Power-ups */}
                <AnimatePresence>
                    {powerUps.map((powerUp) => (
                        <motion.button
                            key={powerUp.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                            exit={{ scale: 0 }}
                            transition={{ rotate: { repeat: Infinity, duration: 2 } }}
                            onClick={() => handlePowerUpClick(powerUp)}
                            className={`absolute w-12 h-12 rounded-full ${powerUp.color} text-white flex items-center justify-center text-2xl shadow-lg cursor-pointer z-20 hover:scale-125 transition-transform`}
                            style={{
                                left: `${powerUp.x}%`,
                                top: `${powerUp.y}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            {powerUp.label.split(' ')[0]}
                        </motion.button>
                    ))}
                </AnimatePresence>

                {/* Click Effect */}
                {clickEffect && (
                    <div
                        className="absolute text-green-400 font-bold text-3xl animate-ping pointer-events-none z-30"
                        style={{ left: `${clickEffect.x}%`, top: `${clickEffect.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        {clickEffect.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaptainClickChallenge;
