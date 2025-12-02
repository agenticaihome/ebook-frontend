import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Share2, ArrowLeft, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';

const DeepWorkDive = ({ onBack }) => {
    // Game state
    const [gameState, setGameState] = useState('idle'); // idle, playing, dead
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
        try { return parseInt(localStorage.getItem('deepwork_best') || '0', 10); }
        catch { return 0; }
    });
    const [isNewBest, setIsNewBest] = useState(false);

    // Visual state (for rendering)
    const [captainY, setCaptainY] = useState(50);
    const [captainRotation, setCaptainRotation] = useState(0);
    const [obstacles, setObstacles] = useState([]);
    const [screenShake, setScreenShake] = useState(false);
    const [flashColor, setFlashColor] = useState(null);
    const [nearMiss, setNearMiss] = useState(false);
    const [passedEffect, setPassedEffect] = useState(null);

    // Refs for game loop (mutable, no re-renders)
    const gameAreaRef = useRef(null);
    const animationFrameRef = useRef(null);
    const lastTimeRef = useRef(0);
    const accumulatorRef = useRef(0);

    // Game state refs (accessed in animation frame)
    const gameStateRef = useRef('idle');
    const velocityRef = useRef(0);
    const captainYRef = useRef(50);
    const captainRotationRef = useRef(0);
    const scoreRef = useRef(0);
    const obstaclesRef = useRef([]);
    const lastSpawnRef = useRef(0);
    const SPAWN_INTERVAL = 1700;        // ↑ Way more space between distractions (was 1450)

    // ===================
    // GAME DIMENSIONS (percentage-based for responsiveness)
    // ===================
    const CAPTAIN_X = 22;             // Captain horizontal position (%)
    const CAPTAIN_SIZE = 11;          // Captain size as % of container width
    const OBSTACLE_WIDTH = 15;        // Obstacle width (%)
    const GAP_SIZE = 35;              // ↑ Massive gaps (was 28) – auto-win most
    const HITBOX_SHRINK = 2.5;        // ↑ Super forgiving (was 1.5) – barely collide

    // Distraction types
    const distractionTypes = [
        { emoji: '📱', name: 'Phone', color: 'from-red-500 to-red-700' },
        { emoji: '📧', name: 'Email', color: 'from-orange-500 to-orange-700' },
        { emoji: '💬', name: 'Slack', color: 'from-purple-500 to-purple-700' },
        { emoji: '🗓️', name: 'Meeting', color: 'from-yellow-500 to-yellow-700' },
        { emoji: '🔔', name: 'Notif', color: 'from-pink-500 to-pink-700' },
        { emoji: '🎮', name: 'Games', color: 'from-green-500 to-green-700' },
        { emoji: '📺', name: 'TV', color: 'from-blue-500 to-blue-700' },
    ];

    // Milestone thresholds
    const getMilestone = (s) => {
        if (s >= 50) return { label: 'LEGENDARY', color: 'text-yellow-400', bg: 'bg-yellow-500/20', emoji: '👑' };
        if (s >= 30) return { label: 'MASTER', color: 'text-purple-400', bg: 'bg-purple-500/20', emoji: '💎' };
        if (s >= 20) return { label: 'EXPERT', color: 'text-cyan-400', bg: 'bg-cyan-500/20', emoji: '⭐' };
        if (s >= 10) return { label: 'FOCUSED', color: 'text-green-400', bg: 'bg-green-500/20', emoji: '🎯' };
        if (s >= 5) return { label: 'WARMING UP', color: 'text-blue-400', bg: 'bg-blue-500/20', emoji: '🔥' };
        return { label: 'DISTRACTED', color: 'text-slate-400', bg: 'bg-slate-500/20', emoji: '😵' };
    };

    // ===================
    // VISUAL FEEDBACK
    // ===================
    const triggerHaptic = (pattern = 10) => {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    const triggerScreenShake = () => {
        setScreenShake(true);
        triggerHaptic(100);
        setTimeout(() => setScreenShake(false), 150);
    };

    const triggerFlash = (color) => {
        setFlashColor(color);
        setTimeout(() => setFlashColor(null), 80);
    };

    const triggerPassedEffect = () => {
        setPassedEffect(Date.now());
        triggerHaptic(5);
        setTimeout(() => setPassedEffect(null), 300);
    };

    const triggerNearMiss = () => {
        if (!nearMiss) {
            setNearMiss(true);
            triggerHaptic([10, 20, 10]);
            setTimeout(() => setNearMiss(false), 400);
        }
    };

    // ===================
    // SPAWN OBSTACLE
    // ===================
    const spawnObstacle = useCallback(() => {
        const progress = scoreRef.current * 0.1;
        const gapCenter = 50 + Math.sin(progress) * 12;  // ↓ Less swingy (was *22) – stays 38-62%
        const type = distractionTypes[Math.floor(Math.random() * distractionTypes.length)];

        const newObstacle = {
            id: Date.now() + Math.random(),
            x: 105, // Start just off-screen right
            gapCenter,
            gapSize: GAP_SIZE,
            passed: false,
            scored: false,
            ...type
        };

        obstaclesRef.current = [...obstaclesRef.current, newObstacle];
    }, []);

    // ===================
    // COLLISION DETECTION (all in percentages)
    // ===================
    const checkCollision = useCallback((cY, obs) => {
        // Captain hitbox (with forgiving shrink)
        const captainHalfSize = (CAPTAIN_SIZE / 2) - HITBOX_SHRINK;
        const captainLeft = CAPTAIN_X - captainHalfSize;
        const captainRight = CAPTAIN_X + captainHalfSize;
        const captainTop = cY - captainHalfSize;
        const captainBottom = cY + captainHalfSize;

        // Boundary collision (top/bottom of screen)
        if (captainTop < 0 || captainBottom > 100) {
            return true;
        }

        for (const obstacle of obs) {
            const obsLeft = obstacle.x;
            const obsRight = obstacle.x + OBSTACLE_WIDTH;

            // Check horizontal overlap
            if (captainRight > obsLeft && captainLeft < obsRight) {
                const gapTop = obstacle.gapCenter - (obstacle.gapSize / 2);
                const gapBottom = obstacle.gapCenter + (obstacle.gapSize / 2);

                // Check if captain is outside the gap (collision)
                if (captainTop < gapTop || captainBottom > gapBottom) {
                    return true;
                }

                // Near miss detection (within 2% of gap edges)
                const nearMissThreshold = 2.5;
                if (captainTop < gapTop + nearMissThreshold || captainBottom > gapBottom - nearMissThreshold) {
                    triggerNearMiss();
                }
            }
        }

        return false;
    }, []);

    // ===================
    // GAME LOOP (requestAnimationFrame with fixed timestep)
    // ===================
    const gameLoop = useCallback((currentTime) => {
        if (gameStateRef.current !== 'playing') return;

        // Calculate delta time
        if (lastTimeRef.current === 0) {
            lastTimeRef.current = currentTime;
        }
        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;

        // Accumulate time for fixed timestep physics
        accumulatorRef.current += deltaTime;

        // Run physics updates at fixed rate
        while (accumulatorRef.current >= FIXED_TIMESTEP) {
            // Apply gravity
            velocityRef.current += GRAVITY;

            // Separate rise/fall feel
            if (velocityRef.current < 0) {
                // Rising → light & floaty
                velocityRef.current *= RISE_DAMPING;
            } else {
                // Falling → heavier, more momentum
                velocityRef.current = Math.min(velocityRef.current, TERMINAL_VELOCITY);
            }

            // Update position
            captainYRef.current += velocityRef.current;

            // Calculate current speed (increases with score)
            const currentSpeed = BASE_SPEED * (1 + scoreRef.current * SPEED_INCREASE);

            // Move obstacles
            obstaclesRef.current = obstaclesRef.current
                .map(obs => ({ ...obs, x: obs.x - currentSpeed * 0.5 }))
                .filter(obs => obs.x > -OBSTACLE_WIDTH - 5);

            // Spawn new obstacles
            const timeSinceStart = currentTime - gameStartTimeRef.current;
            if (timeSinceStart - lastSpawnRef.current > SPAWN_INTERVAL) {
                spawnObstacle();
                lastSpawnRef.current = timeSinceStart;
            }

            // Score check (when captain passes obstacle center)
            obstaclesRef.current.forEach(obs => {
                if (!obs.scored && obs.x + OBSTACLE_WIDTH / 2 < CAPTAIN_X) {
                    obs.scored = true;
                    scoreRef.current += 1;
                    setScore(scoreRef.current);
                    triggerPassedEffect();
                    triggerFlash('green');

                    // Confetti every score for addictive feel
                    confetti({
                        particleCount: 30,
                        spread: 50,
                        origin: { x: 0.2, y: 0.45 },
                        colors: ['#00ff88', '#00ffff', '#ff00ff'],
                        scalar: 1.3,
                    });

                    // Milestone celebrations (bigger)
                    if ([5, 10, 20, 30, 50].includes(scoreRef.current)) {
                        confetti({
                            particleCount: 40 + scoreRef.current,
                            spread: 70,
                            origin: { x: 0.25, y: 0.5 },
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

            accumulatorRef.current -= FIXED_TIMESTEP;
        }

        // Update visual state (can be at any framerate)
        setCaptainY(captainYRef.current);

        // Smooth rotation calculation
        const targetRotation = velocityRef.current > 0
            ? Math.min(velocityRef.current * 8, 90)
            : velocityRef.current * 4;
        captainRotationRef.current += (targetRotation - captainRotationRef.current) * 0.2;
        setCaptainRotation(captainRotationRef.current);

        setObstacles([...obstaclesRef.current]);

        // Continue loop
        animationFrameRef.current = requestAnimationFrame(gameLoop);
    }, [spawnObstacle, checkCollision]);

    // ===================
    // JUMP ACTION
    // ===================
    const jump = useCallback(() => {
        if (gameStateRef.current === 'dead') {
            // Tap to restart after death
            startGame();
            return;
        }

        if (gameStateRef.current === 'idle') {
            startGame();
            return;
        }

        // Apply jump velocity
        velocityRef.current = JUMP_VELOCITY;
        triggerFlash('cyan');
        triggerHaptic(8);
    }, []);

    // ===================
    // START GAME
    // ===================
    const startGame = useCallback(() => {
        // Reset all state
        gameStateRef.current = 'playing';
        setGameState('playing');

        scoreRef.current = 0;
        setScore(0);

        captainYRef.current = 50;
        setCaptainY(50);

        velocityRef.current = JUMP_VELOCITY; // Initial jump
        captainRotationRef.current = 0;
        setCaptainRotation(0);

        obstaclesRef.current = [];
        setObstacles([]);

        setIsNewBest(false);
        setNearMiss(false);
        setPassedEffect(null);

        // Reset timing
        lastTimeRef.current = 0;
        accumulatorRef.current = 0;
        lastSpawnRef.current = 0;
        gameStartTimeRef.current = performance.now();

        // Spawn first obstacle after a short delay
        setTimeout(() => {
            if (gameStateRef.current === 'playing') {
                spawnObstacle();
                lastSpawnRef.current = performance.now() - gameStartTimeRef.current;
            }
        }, 800);

        // Start game loop
        animationFrameRef.current = requestAnimationFrame(gameLoop);
    }, [gameLoop, spawnObstacle]);

    // ===================
    // END GAME
    // ===================
    const endGame = useCallback(() => {
        if (gameStateRef.current === 'dead') return;

        gameStateRef.current = 'dead';
        setGameState('dead');

        // Stop animation frame
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

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

            // Big celebration - fire twice
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#fbbf24', '#f59e0b', '#06b6d4', '#a855f7']
                });
            }, 200);
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#fbbf24', '#f59e0b', '#06b6d4', '#a855f7']
                });
            }, 600);
        }

        // Submit score
        api.submitScore?.('deepwork', finalScore)?.catch(err => {
            console.error('Failed to submit score:', err);
        });
    }, [bestScore]);

    // ===================
    // INPUT HANDLING (Global for zero-latency)
    // ===================
    useEffect(() => {
        const handleInteraction = (e) => {
            if (e.touches || e.type === 'mousedown') {
                e.preventDefault();
                jump();
            }
        };

        window.addEventListener('touchstart', handleInteraction, { passive: false });
        window.addEventListener('mousedown', handleInteraction);

        return () => {
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('mousedown', handleInteraction);
        };
    }, [jump]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
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
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // ===================
    // SHARE SCORE
    // ===================
    const shareScore = () => {
        const milestone = getMilestone(score);
        const text = `${milestone.emoji} I survived ${score} distractions in Deep Work Dive! ${milestone.label} status achieved!\n\nCan you beat my focus? 🧠💪\nTry it at AgenticAIHome.com`;

        if (navigator.share) {
            navigator.share({ text }).catch(() => { });
        } else {
            navigator.clipboard?.writeText(text).then(() => {
                alert('Score copied! Share it with friends! 🎯');
            }).catch(() => { });
        }
    };

    const milestone = getMilestone(score);

    // Memoized obstacles for perf
    const renderedObstacles = useMemo(() => obstacles.map((obs) => {
        const gapTop = obs.gapCenter - (obs.gapSize / 2);
        const gapBottom = obs.gapCenter + (obs.gapSize / 2);

        return (
            <div
                key={obs.id}
                className="absolute top-0 bottom-0 z-10"
                style={{
                    left: `${obs.x}%`,
                    width: `${OBSTACLE_WIDTH}%`
                }}
            >
                {/* Top pipe */}
                <div
                    className={`absolute left-0 right-0 bg-gradient-to-b ${obs.color} shadow-2xl`}
                    style={{
                        top: 0,
                        height: `${gapTop}%`,
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px',
                    }}
                >
                    {/* Pipe cap */}
                    <div
                        className={`absolute bottom-0 left-[-8%] right-[-8%] h-[12%] min-h-[20px] bg-gradient-to-b ${obs.color} rounded-lg shadow-lg`}
                        style={{ borderWidth: '2px', borderColor: 'rgba(255,255,255,0.25)' }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg sm:text-xl">{obs.emoji}</span>
                        </div>
                    </div>
                    {/* Highlight */}
                    <div className="absolute inset-y-0 left-0 w-[20%] bg-white/10 rounded-bl-lg" />
                </div>

                {/* Bottom pipe */}
                <div
                    className={`absolute left-0 right-0 bg-gradient-to-t ${obs.color} shadow-2xl`}
                    style={{
                        bottom: 0,
                        height: `${100 - gapBottom}%`,
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                    }}
                >
                    {/* Pipe cap */}
                    <div
                        className={`absolute top-0 left-[-8%] right-[-8%] h-[12%] min-h-[20px] bg-gradient-to-t ${obs.color} rounded-lg shadow-lg`}
                        style={{ borderWidth: '2px', borderColor: 'rgba(255,255,255,0.25)' }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg sm:text-xl">{obs.emoji}</span>
                        </div>
                    </div>
                    {/* Highlight */}
                    <div className="absolute inset-y-0 left-0 w-[20%] bg-white/10 rounded-tl-lg" />
                </div>
            </div>
        );
    }), [obstacles]);

    return (
        <div
            className={`w-full max-w-2xl mx-auto bg-slate-900 border-2 rounded-2xl overflow-hidden shadow-2xl relative select-none touch-none
                ${gameState === 'playing' ? 'border-cyan-500/50' : 'border-slate-700'}
                ${screenShake ? 'animate-shake' : ''}
            `}
        >
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-4px) rotate(-0.5deg); }
                    40% { transform: translateX(4px) rotate(0.5deg); }
                    60% { transform: translateX(-3px) rotate(-0.3deg); }
                    80% { transform: translateX(3px) rotate(0.3deg); }
                }
                .animate-shake {
                    animation: shake 0.15s ease-in-out;
                }
                @keyframes bob {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-bob {
                    animation: bob 1.2s ease-in-out infinite;
                }
            `}</style>

            {/* Score Display - Cleaner, less intrusive */}
            {gameState === 'playing' && (
                <div className="absolute top-4 left-0 right-0 z-30 flex justify-center pointer-events-none">
                    <motion.div
                        key={score}
                        initial={{ scale: 1.3 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        className="text-5xl sm:text-6xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                        style={{
                            WebkitTextStroke: '2px rgba(0,0,0,0.3)',
                        }}
                    >
                        {score}
                    </motion.div>
                </div>
            )}

            {/* Game Area */}
            <div
                ref={gameAreaRef}
                className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[70vh] overflow-hidden cursor-pointer"
                style={{
                    background: 'linear-gradient(180deg, #0c1929 0%, #1a3a52 40%, #0f2744 80%, #0a1628 100%)',
                    minHeight: '400px'
                }}
            >
                {/* Subtle scanline overlay for retro-premium feel */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.05) 1px, rgba(0,0,0,0.05) 2px)' }} />

                {/* Flash overlay */}
                <AnimatePresence>
                    {flashColor && (
                        <motion.div
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.08 }}
                            className={`absolute inset-0 z-40 pointer-events-none
                                ${flashColor === 'green' ? 'bg-green-400' : ''}
                                ${flashColor === 'red' ? 'bg-red-500' : ''}
                                ${flashColor === 'cyan' ? 'bg-cyan-400' : ''}
                            `}
                        />
                    )}
                </AnimatePresence>

                {/* Parallax stars */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(25)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                                left: `${(i * 17 + 5) % 100}%`,
                                top: `${(i * 23 + 10) % 100}%`,
                                width: `${1 + (i % 3)}px`,
                                height: `${1 + (i % 3)}px`,
                                opacity: 0.2 + (i % 5) * 0.1
                            }}
                        />
                    ))}
                </div>

                {/* Near miss indicator */}
                <AnimatePresence>
                    {nearMiss && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-30"
                        >
                            <div className="bg-yellow-500/90 text-black font-black text-sm sm:text-base px-3 py-1 rounded-full shadow-lg">
                                😰 CLOSE!
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* +1 floating effect */}
                <AnimatePresence>
                    {passedEffect && (
                        <motion.div
                            key={passedEffect}
                            initial={{ opacity: 1, y: 0, scale: 1 }}
                            animate={{ opacity: 0, y: -50, scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-30 text-green-400 font-black text-3xl sm:text-4xl pointer-events-none"
                        >
                            +1
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Captain Efficiency */}
                {gameState !== 'idle' && (
                    <div
                        className="absolute z-20 pointer-events-none transition-transform duration-[16ms] ease-linear"
                        style={{
                            left: `${CAPTAIN_X}%`,
                            top: `${captainY}%`,
                            transform: `translate(-50%, -50%) rotate(${captainRotation}deg)`,
                            width: `${CAPTAIN_SIZE}%`,
                            aspectRatio: '1',
                            willChange: 'transform'
                        }}
                    >
                        {/* Glow effect */}
                        <div
                            className={`absolute inset-[-20%] rounded-full blur-lg transition-colors duration-150
                                ${nearMiss ? 'bg-yellow-500/50' : gameState === 'dead' ? 'bg-red-500/50' : 'bg-cyan-500/40'}
                            `}
                        />

                        {/* Captain body */}
                        <div
                            className={`relative w-full h-full rounded-full flex items-center justify-center shadow-xl transition-all duration-100
                                ${gameState === 'dead'
                                    ? 'bg-gradient-to-br from-red-400 to-red-600 border-red-300'
                                    : 'bg-gradient-to-br from-cyan-400 to-blue-600 border-white/80'}
                            `}
                            style={{ borderWidth: '3px' }}
                        >
                            <Zap
                                className="text-white"
                                style={{ width: '50%', height: '50%' }}
                                strokeWidth={2.5}
                            />
                        </div>

                        {/* Trail effect when jumping */}
                        {velocityRef.current < -4 && gameState === 'playing' && (
                            <>
                                <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-[30%] h-[80%] bg-gradient-to-b from-cyan-400/60 to-transparent rounded-full blur-sm" />
                                <motion.div
                                    initial={{ opacity: 0.6, scale: 0 }}
                                    animate={{ opacity: 0, scale: 1.5, y: -40 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute w-8 h-16 bg-gradient-to-t from-cyan-400/80 to-transparent rounded-full blur-md -z-10"
                                    style={{ left: '50%', top: '80%', transform: 'translateX(-50%)' }}
                                />
                            </>
                        )}
                    </div>
                )}

                {/* Obstacles (Pipes) - Memoized */}
                {renderedObstacles}

                {/* Ground line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-red-500/50 to-transparent" />
                {/* Ceiling line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-red-500/50 to-transparent" />

                {/* START SCREEN */}
                <AnimatePresence>
                    {gameState === 'idle' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30 backdrop-blur-sm p-4"
                        >
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-center w-full max-w-xs"
                            >
                                {/* Animated Captain - Enhanced floating bob */}
                                <div className="animate-bob mb-4">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/40 border-4 border-white">
                                        <Zap className="text-white w-10 h-10 sm:w-12 sm:h-12" strokeWidth={2} />
                                    </div>
                                </div>

                                <h1 className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight">
                                    DEEP WORK DIVE
                                </h1>
                                <p className="text-cyan-400 font-medium mb-5 text-sm sm:text-base">
                                    Dodge distractions. Stay in flow.
                                </p>

                                {bestScore > 0 && (
                                    <div className="mb-5 bg-slate-800/60 rounded-xl py-2 px-4 inline-block">
                                        <span className="text-xs text-slate-400 uppercase tracking-wider">Best</span>
                                        <div className="text-2xl sm:text-3xl font-black text-yellow-400 flex items-center justify-center gap-2">
                                            <Trophy size={20} /> {bestScore}
                                        </div>
                                    </div>
                                )}

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => { e.stopPropagation(); startGame(); }}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:from-cyan-600 active:to-blue-700 text-white px-8 py-4 rounded-2xl font-black text-lg sm:text-xl shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-3"
                                >
                                    <Play size={24} fill="white" /> TAP TO PLAY
                                </motion.button>

                                <p className="text-slate-500 text-xs sm:text-sm mt-4">
                                    Tap screen or press SPACE to fly
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
                            transition={{ delay: 0.2 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30 backdrop-blur-sm p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                                className="text-center w-full max-w-xs"
                            >
                                {isNewBest ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.5 }}
                                            className="text-5xl sm:text-6xl mb-2"
                                        >
                                            🏆
                                        </motion.div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-yellow-400 mb-1">NEW BEST!</h2>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-4xl sm:text-5xl mb-2">{milestone.emoji}</div>
                                        <h2 className={`text-xl sm:text-2xl font-black ${milestone.color} mb-1`}>
                                            {milestone.label}
                                        </h2>
                                    </>
                                )}

                                <div className={`${milestone.bg} rounded-2xl p-4 mb-4`}>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider">Score</div>
                                    <div className="text-4xl sm:text-5xl font-black text-white">{score}</div>
                                    {!isNewBest && bestScore > 0 && (
                                        <div className="text-xs sm:text-sm text-slate-400 mt-1">
                                            Best: {bestScore} {score === bestScore && '🎯'}
                                        </div>
                                    )}
                                </div>

                                {/* Tips */}
                                {score < 3 && (
                                    <p className="text-slate-400 text-xs sm:text-sm mb-4 bg-slate-800/50 rounded-lg p-2">
                                        💡 Tap with rhythm - small taps keep you steady!
                                    </p>
                                )}
                                {score >= 3 && score < 10 && (
                                    <p className="text-slate-400 text-xs sm:text-sm mb-4 bg-slate-800/50 rounded-lg p-2">
                                        💡 Look ahead at the next gap, not at Captain!
                                    </p>
                                )}
                                {score >= 10 && score < 20 && (
                                    <p className="text-slate-400 text-xs sm:text-sm mb-4 bg-slate-800/50 rounded-lg p-2">
                                        💡 Great focus! The gaps get trickier as you go.
                                    </p>
                                )}

                                <div className="flex gap-3 justify-center mb-4">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.stopPropagation(); onBack?.(); }}
                                        className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white px-4 sm:px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-sm sm:text-base"
                                    >
                                        <ArrowLeft size={18} /> Back
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:from-cyan-600 active:to-blue-700 text-white px-5 sm:px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base"
                                    >
                                        <RotateCcw size={18} /> Again
                                    </motion.button>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); shareScore(); }}
                                    className="text-slate-400 hover:text-white active:text-cyan-400 text-xs sm:text-sm flex items-center gap-2 mx-auto transition-colors"
                                >
                                    <Share2 size={14} /> Share Score
                                </button>
                            </motion.div>

                            {/* Tap to restart hint */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="absolute bottom-4 text-slate-600 text-xs"
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