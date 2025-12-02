import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Share2, ArrowLeft, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';

const DeepWorkDive = ({ onBack }) => {
    const [gameState, setGameState] = useState('idle'); // idle, playing, dead
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
        try { return parseInt(localStorage.getItem('deepwork_best') || '0', 10); }
        catch { return 0; }
    });
    const [captainY, setCaptainY] = useState(45);
    const [velocity, setVelocity] = useState(0);
    const [obstacles, setObstacles] = useState([]);
    const [screenShake, setScreenShake] = useState(false);
    const [flashColor, setFlashColor] = useState(null);
    const [nearMiss, setNearMiss] = useState(false);
    const [passedEffect, setPassedEffect] = useState(null);
    const [gameSpeed, setGameSpeed] = useState(1);
    const [isNewBest, setIsNewBest] = useState(false);

    const gameAreaRef = useRef(null);
    const gameLoopRef = useRef(null);
    const velocityRef = useRef(0);
    const scoreRef = useRef(0);
    const obstaclesRef = useRef([]);
    const gameStateRef = useRef('idle');
    const captainYRef = useRef(45);

    // TIGHT Flappy Bird-style physics
    const GRAVITY = 0.6;
    const JUMP_FORCE = -9;
    const TERMINAL_VELOCITY = 12;
    const OBSTACLE_SPEED = 4;
    const OBSTACLE_WIDTH = 70; // px
    const GAP_SIZE = 28; // percentage of screen height
    const SPAWN_INTERVAL = 1800; // ms - consistent timing!
    const CAPTAIN_SIZE = 44; // px
    const HITBOX_PADDING = 4; // Forgiving hitbox

    // Distraction types with emojis
    const distractionTypes = [
        { emoji: '📱', name: 'Phone', color: 'from-red-500 to-red-600' },
        { emoji: '📧', name: 'Email', color: 'from-orange-500 to-orange-600' },
        { emoji: '💬', name: 'Slack', color: 'from-purple-500 to-purple-600' },
        { emoji: '🗓️', name: 'Meeting', color: 'from-yellow-500 to-yellow-600' },
        { emoji: '🔔', name: 'Notification', color: 'from-pink-500 to-pink-600' },
    ];

    // Milestone thresholds
    const getMilestone = (s) => {
        if (s >= 50) return { label: 'LEGENDARY', color: 'text-yellow-400', emoji: '👑' };
        if (s >= 30) return { label: 'MASTER', color: 'text-purple-400', emoji: '💎' };
        if (s >= 20) return { label: 'EXPERT', color: 'text-cyan-400', emoji: '⭐' };
        if (s >= 10) return { label: 'FOCUSED', color: 'text-green-400', emoji: '🎯' };
        if (s >= 5) return { label: 'WARMING UP', color: 'text-blue-400', emoji: '🔥' };
        return { label: 'DISTRACTED', color: 'text-slate-400', emoji: '😵' };
    };

    const triggerScreenShake = () => {
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 150);
    };

    const triggerFlash = (color) => {
        setFlashColor(color);
        setTimeout(() => setFlashColor(null), 100);
    };

    const triggerPassedEffect = () => {
        setPassedEffect(Date.now());
        setTimeout(() => setPassedEffect(null), 300);
    };

    const triggerNearMiss = () => {
        setNearMiss(true);
        setTimeout(() => setNearMiss(false), 500);
    };

    const jump = useCallback(() => {
        if (gameStateRef.current === 'dead') return;

        if (gameStateRef.current === 'idle') {
            startGame();
            return;
        }

        velocityRef.current = JUMP_FORCE;
        setVelocity(JUMP_FORCE);
        triggerFlash('cyan');
    }, []);

    const spawnObstacle = useCallback(() => {
        const gapCenter = Math.random() * 40 + 30; // 30-70% from top
        const type = distractionTypes[Math.floor(Math.random() * distractionTypes.length)];

        const newObstacle = {
            id: Date.now(),
            x: 105, // Start off screen
            gapCenter,
            gapSize: GAP_SIZE,
            passed: false,
            ...type
        };

        obstaclesRef.current = [...obstaclesRef.current, newObstacle];
        setObstacles([...obstaclesRef.current]);
    }, []);

    const checkCollision = useCallback((captainY, obstacles) => {
        const captainLeft = 18; // percentage
        const captainRight = 18 + (CAPTAIN_SIZE / 6.4); // ~7% width
        const captainTop = captainY - (CAPTAIN_SIZE / 8) + HITBOX_PADDING;
        const captainBottom = captainY + (CAPTAIN_SIZE / 8) - HITBOX_PADDING;

        for (const obs of obstacles) {
            const obsLeft = obs.x;
            const obsRight = obs.x + (OBSTACLE_WIDTH / 6.4); // ~11% width

            // Check if horizontally aligned
            if (captainRight > obsLeft && captainLeft < obsRight) {
                const gapTop = obs.gapCenter - (obs.gapSize / 2);
                const gapBottom = obs.gapCenter + (obs.gapSize / 2);

                // Check if captain is outside the gap
                if (captainTop < gapTop || captainBottom > gapBottom) {
                    return true; // Collision!
                }

                // Near miss detection (within 3% of gap edges)
                if (captainTop < gapTop + 3 || captainBottom > gapBottom - 3) {
                    triggerNearMiss();
                }
            }
        }
        return false;
    }, []);

    const gameLoop = useCallback(() => {
        if (gameStateRef.current !== 'playing') return;

        // Apply gravity
        velocityRef.current = Math.min(velocityRef.current + GRAVITY, TERMINAL_VELOCITY);
        captainYRef.current += velocityRef.current * 0.4;

        // Boundary check
        if (captainYRef.current < 2 || captainYRef.current > 98) {
            endGame();
            return;
        }

        // Move obstacles
        const currentSpeed = OBSTACLE_SPEED * (1 + scoreRef.current * 0.008); // Speed increases with score
        obstaclesRef.current = obstaclesRef.current
            .map(obs => ({ ...obs, x: obs.x - currentSpeed * 0.4 }))
            .filter(obs => obs.x > -15);

        // Check for passed obstacles
        obstaclesRef.current.forEach(obs => {
            if (!obs.passed && obs.x < 15) {
                obs.passed = true;
                scoreRef.current += 1;
                setScore(scoreRef.current);
                triggerPassedEffect();
                triggerFlash('green');

                // Milestone celebrations
                if ([10, 20, 30, 50].includes(scoreRef.current)) {
                    confetti({
                        particleCount: 30,
                        spread: 60,
                        origin: { x: 0.2, y: 0.5 },
                        colors: ['#06b6d4', '#3b82f6', '#fbbf24']
                    });
                }
            }
        });

        // Collision detection
        if (checkCollision(captainYRef.current, obstaclesRef.current)) {
            endGame();
            return;
        }

        // Update state
        setCaptainY(captainYRef.current);
        setVelocity(velocityRef.current);
        setObstacles([...obstaclesRef.current]);
    }, [checkCollision]);

    const startGame = useCallback(() => {
        setGameState('playing');
        gameStateRef.current = 'playing';
        setScore(0);
        scoreRef.current = 0;
        setCaptainY(45);
        captainYRef.current = 45;
        setVelocity(0);
        velocityRef.current = 0;
        setObstacles([]);
        obstaclesRef.current = [];
        setIsNewBest(false);
        setGameSpeed(1);

        // Initial jump
        setTimeout(() => {
            velocityRef.current = JUMP_FORCE;
            setVelocity(JUMP_FORCE);
        }, 50);

        // Start game loop (60fps)
        gameLoopRef.current = setInterval(gameLoop, 16);

        // Start obstacle spawning
        spawnObstacle();
        const spawnLoop = setInterval(() => {
            if (gameStateRef.current === 'playing') {
                spawnObstacle();
            } else {
                clearInterval(spawnLoop);
            }
        }, SPAWN_INTERVAL);
    }, [gameLoop, spawnObstacle]);

    const endGame = useCallback(async () => {
        if (gameStateRef.current === 'dead') return;

        gameStateRef.current = 'dead';
        setGameState('dead');
        clearInterval(gameLoopRef.current);

        // Death feedback
        triggerScreenShake();
        triggerFlash('red');

        // Check for new best
        const finalScore = scoreRef.current;
        if (finalScore > bestScore) {
            setIsNewBest(true);
            setBestScore(finalScore);
            try {
                localStorage.setItem('deepwork_best', finalScore.toString());
            } catch { }

            // Big celebration for new record
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#fbbf24', '#f59e0b', '#06b6d4']
                });
            }, 300);
        }

        // Submit to backend
        try {
            await api.submitScore('deepwork', finalScore);
        } catch (err) {
            console.error('Failed to submit score:', err);
        }
    }, [bestScore]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === 'w') {
                e.preventDefault();
                jump();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [jump]);

    // Cleanup
    useEffect(() => {
        return () => {
            clearInterval(gameLoopRef.current);
        };
    }, []);

    const shareScore = () => {
        const milestone = getMilestone(score);
        const text = `${milestone.emoji} I survived ${score} distractions in Deep Work Dive! ${milestone.label} status achieved. Can you beat my focus? 🧠💪\n\nTry it at AgenticAIHome.com`;

        if (navigator.share) {
            navigator.share({ text });
        } else {
            navigator.clipboard.writeText(text);
            alert('Copied to clipboard! Share your score! 🎯');
        }
    };

    const milestone = getMilestone(score);

    return (
        <div
            className={`w-full max-w-2xl mx-auto bg-slate-900 border-2 rounded-2xl overflow-hidden shadow-2xl relative select-none
                ${gameState === 'playing' ? 'border-cyan-500/50' : 'border-slate-700'}
                ${screenShake ? 'animate-shake' : ''}
            `}
            style={{
                animation: screenShake ? 'shake 0.15s ease-in-out' : 'none'
            }}
        >
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px) rotate(-1deg); }
                    75% { transform: translateX(5px) rotate(1deg); }
                }
                @keyframes pulse-score {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }
                @keyframes float-up {
                    0% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-30px); }
                }
            `}</style>

            {/* Minimal HUD - Flappy Bird style */}
            <div className="absolute top-4 left-0 right-0 z-30 flex justify-center pointer-events-none">
                <div
                    className={`text-6xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] transition-transform duration-100
                        ${passedEffect ? 'scale-125' : 'scale-100'}
                    `}
                    style={{
                        WebkitTextStroke: '3px rgba(0,0,0,0.5)',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                >
                    {score}
                </div>
            </div>

            {/* Game Area */}
            <div
                ref={gameAreaRef}
                onClick={jump}
                onTouchStart={(e) => { e.preventDefault(); jump(); }}
                className="relative h-[500px] overflow-hidden cursor-pointer"
                style={{
                    background: 'linear-gradient(180deg, #0c1929 0%, #1e3a5f 30%, #0f2744 70%, #0a1628 100%)'
                }}
            >
                {/* Flash overlay */}
                <AnimatePresence>
                    {flashColor && (
                        <motion.div
                            initial={{ opacity: 0.6 }}
                            animate={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className={`absolute inset-0 z-40 pointer-events-none
                                ${flashColor === 'green' ? 'bg-green-500' : ''}
                                ${flashColor === 'red' ? 'bg-red-500' : ''}
                                ${flashColor === 'cyan' ? 'bg-cyan-500' : ''}
                            `}
                        />
                    )}
                </AnimatePresence>

                {/* Parallax background elements */}
                <div className="absolute inset-0 opacity-20">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: Math.random() * 0.5 + 0.2
                            }}
                        />
                    ))}
                </div>

                {/* Near miss indicator */}
                <AnimatePresence>
                    {nearMiss && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-20 left-1/2 -translate-x-1/2 z-30 text-yellow-400 font-black text-xl"
                        >
                            CLOSE! 😰
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* +1 floating effect */}
                <AnimatePresence>
                    {passedEffect && (
                        <motion.div
                            key={passedEffect}
                            initial={{ opacity: 1, y: 0, x: '-50%' }}
                            animate={{ opacity: 0, y: -40 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-24 left-1/2 z-30 text-green-400 font-black text-3xl"
                        >
                            +1
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Captain Efficiency */}
                {gameState !== 'idle' && (
                    <motion.div
                        className="absolute z-20 pointer-events-none"
                        style={{
                            left: '18%',
                            top: `${captainY}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <motion.div
                            animate={{
                                rotate: Math.min(Math.max(velocity * 4, -30), 90),
                            }}
                            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                            className="relative"
                        >
                            {/* Glow effect */}
                            <div className={`absolute inset-0 rounded-full blur-md transition-colors duration-200
                                ${nearMiss ? 'bg-yellow-500/60' : 'bg-cyan-500/40'}
                            `} style={{ width: CAPTAIN_SIZE, height: CAPTAIN_SIZE }} />

                            {/* Captain body */}
                            <div
                                className={`relative rounded-full flex items-center justify-center shadow-lg border-3 transition-all duration-100
                                    ${gameState === 'dead' ? 'bg-red-500 border-red-300' : 'bg-gradient-to-br from-cyan-400 to-blue-600 border-white'}
                                `}
                                style={{
                                    width: CAPTAIN_SIZE,
                                    height: CAPTAIN_SIZE,
                                    borderWidth: 3
                                }}
                            >
                                <Zap className="text-white" size={22} strokeWidth={3} />
                            </div>

                            {/* Trail effect when moving up */}
                            {velocity < -2 && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-cyan-400/60 to-transparent rounded-full" />
                            )}
                        </motion.div>
                    </motion.div>
                )}

                {/* Obstacles */}
                {obstacles.map((obs) => {
                    const gapTop = obs.gapCenter - (obs.gapSize / 2);
                    const gapBottom = obs.gapCenter + (obs.gapSize / 2);

                    return (
                        <div
                            key={obs.id}
                            className="absolute top-0 bottom-0 z-10"
                            style={{
                                left: `${obs.x}%`,
                                width: OBSTACLE_WIDTH
                            }}
                        >
                            {/* Top pipe */}
                            <div
                                className={`absolute left-0 right-0 bg-gradient-to-b ${obs.color} rounded-b-lg shadow-2xl border-2 border-white/20`}
                                style={{
                                    top: 0,
                                    height: `${gapTop}%`,
                                }}
                            >
                                {/* Pipe cap */}
                                <div className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b ${obs.color} rounded-lg border-2 border-white/30 -mx-1`}>
                                    <div className="absolute inset-x-0 bottom-2 flex justify-center">
                                        <span className="text-xl">{obs.emoji}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom pipe */}
                            <div
                                className={`absolute left-0 right-0 bg-gradient-to-t ${obs.color} rounded-t-lg shadow-2xl border-2 border-white/20`}
                                style={{
                                    bottom: 0,
                                    height: `${100 - gapBottom}%`,
                                }}
                            >
                                {/* Pipe cap */}
                                <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-t ${obs.color} rounded-lg border-2 border-white/30 -mx-1`}>
                                    <div className="absolute inset-x-0 top-2 flex justify-center">
                                        <span className="text-xl">{obs.emoji}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Ground */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-slate-900 to-transparent z-15" />

                {/* START SCREEN */}
                <AnimatePresence>
                    {gameState === 'idle' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-center"
                            >
                                {/* Animated logo */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 border-4 border-white"
                                >
                                    <Zap className="text-white" size={40} strokeWidth={2.5} />
                                </motion.div>

                                <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                                    DEEP WORK DIVE
                                </h1>
                                <p className="text-cyan-400 font-medium mb-6">
                                    Dodge the distractions. Stay focused.
                                </p>

                                {bestScore > 0 && (
                                    <div className="mb-6 text-slate-300">
                                        <span className="text-sm">BEST SCORE</span>
                                        <div className="text-3xl font-black text-yellow-400">{bestScore}</div>
                                    </div>
                                )}

                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.2 }}
                                >
                                    <button
                                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-10 py-4 rounded-2xl font-black text-xl shadow-lg shadow-cyan-500/30 transition-all flex items-center gap-3 mx-auto"
                                    >
                                        <Play size={24} fill="white" /> TAP TO PLAY
                                    </button>
                                </motion.div>

                                <p className="text-slate-500 text-sm mt-6">
                                    Tap or press SPACE to fly
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* DEATH SCREEN */}
                <AnimatePresence>
                    {gameState === 'dead' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4, type: 'spring' }}
                                className="text-center w-full max-w-xs px-4"
                            >
                                {isNewBest ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: [0, -10, 10, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.5 }}
                                            className="text-6xl mb-2"
                                        >
                                            🏆
                                        </motion.div>
                                        <h2 className="text-3xl font-black text-yellow-400 mb-1">NEW BEST!</h2>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-5xl mb-2">{milestone.emoji}</div>
                                        <h2 className={`text-2xl font-black ${milestone.color} mb-1`}>{milestone.label}</h2>
                                    </>
                                )}

                                <div className="bg-slate-800/80 rounded-2xl p-4 mb-4">
                                    <div className="text-sm text-slate-400 uppercase tracking-wider">Score</div>
                                    <div className="text-5xl font-black text-white">{score}</div>
                                    {!isNewBest && (
                                        <div className="text-sm text-slate-500 mt-1">
                                            Best: {bestScore} {score === bestScore && '(Tied!)'}
                                        </div>
                                    )}
                                </div>

                                {/* Quick tips based on score */}
                                {score < 5 && (
                                    <p className="text-slate-400 text-sm mb-4">
                                        💡 Tip: Tap in rhythm, don't panic!
                                    </p>
                                )}
                                {score >= 5 && score < 15 && (
                                    <p className="text-slate-400 text-sm mb-4">
                                        💡 Tip: Anticipate the gaps early!
                                    </p>
                                )}

                                <div className="flex gap-3 justify-center mb-4">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onBack?.(); }}
                                        className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                                    >
                                        <ArrowLeft size={18} /> Back
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2"
                                    >
                                        <RotateCcw size={18} /> Again
                                    </button>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); shareScore(); }}
                                    className="text-slate-400 hover:text-white text-sm flex items-center gap-2 mx-auto transition-colors"
                                >
                                    <Share2 size={16} /> Share Score
                                </button>
                            </motion.div>

                            {/* Tap anywhere hint */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="absolute bottom-6 text-slate-500 text-sm"
                            >
                                Tap anywhere to play again
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DeepWorkDive;