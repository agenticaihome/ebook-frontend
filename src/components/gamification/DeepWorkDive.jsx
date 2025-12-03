import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Play, ArrowLeft, RotateCcw, Share2 } from 'lucide-react';

const DeepWorkDive = ({ onBack }) => {
    const [gameState, setGameState] = useState('idle'); // idle, playing, dead
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
        try { return parseInt(localStorage.getItem('deepwork_best') || '0', 10); }
        catch { return 0; }
    });
    const [isNewBest, setIsNewBest] = useState(false);

    // Visual state
    const [captainY, setCaptainY] = useState(50);
    const [captainRotation, setCaptainRotation] = useState(0);
    const [obstacles, setObstacles] = useState([]);
    const [screenShake, setScreenShake] = useState(false);
    const [flashColor, setFlashColor] = useState(null);
    const [nearMiss, setNearMiss] = useState(false);
    const [passedEffect, setPassedEffect] = useState(null);
    const [difficultyLevel, setDifficultyLevel] = useState(1);

    // Refs for game loop
    const gameAreaRef = useRef(null);
    const animationFrameRef = useRef(null);
    const lastTimeRef = useRef(0);
    const accumulatorRef = useRef(0);

    // Game state refs
    const gameStateRef = useRef('idle');
    const velocityRef = useRef(0);
    const captainYRef = useRef(50);
    const scoreRef = useRef(0);
    const obstaclesRef = useRef([]);
    const lastSpawnRef = useRef(0);
    const gameStartTimeRef = useRef(0);
    const difficultyRef = useRef(1);

    // ===================
    // PROGRESSIVE DIFFICULTY SYSTEM
    // Starts VERY easy, gets harder gradually
    // ===================
    const getDifficultySettings = useCallback((level) => {
        const settings = {
            1: { // BEGINNER - Super forgiving, learn the controls
                gravity: 0.22,
                jumpVelocity: -4.5,
                terminalVelocity: 5.5,
                gapSize: 45,           // Huge gaps
                obstacleSpeed: 1.8,
                spawnInterval: 2800,   // Lots of time between obstacles
                hitboxShrink: 5.0,     // Very forgiving hitbox
                gapVariance: 8,        // Gaps stay near center
            },
            2: { // EASY - Still comfortable
                gravity: 0.25,
                jumpVelocity: -4.8,
                terminalVelocity: 6.0,
                gapSize: 42,
                obstacleSpeed: 2.0,
                spawnInterval: 2500,
                hitboxShrink: 4.5,
                gapVariance: 12,
            },
            3: { // NORMAL - The real game
                gravity: 0.28,
                jumpVelocity: -5.0,
                terminalVelocity: 6.5,
                gapSize: 38,
                obstacleSpeed: 2.3,
                spawnInterval: 2200,
                hitboxShrink: 4.0,
                gapVariance: 15,
            },
            4: { // HARD - Challenging
                gravity: 0.30,
                jumpVelocity: -5.2,
                terminalVelocity: 7.0,
                gapSize: 35,
                obstacleSpeed: 2.6,
                spawnInterval: 1900,
                hitboxShrink: 3.5,
                gapVariance: 18,
            },
            5: { // EXPERT - For dedicated players
                gravity: 0.32,
                jumpVelocity: -5.4,
                terminalVelocity: 7.5,
                gapSize: 32,
                obstacleSpeed: 2.9,
                spawnInterval: 1700,
                hitboxShrink: 3.0,
                gapVariance: 22,
            },
        };
        return settings[Math.min(level, 5)];
    }, []);

    // Calculate difficulty based on score
    const calculateDifficulty = useCallback((currentScore) => {
        if (currentScore < 3) return 1;   // First 3 points: Beginner
        if (currentScore < 7) return 2;   // 3-6: Easy
        if (currentScore < 15) return 3;  // 7-14: Normal
        if (currentScore < 25) return 4;  // 15-24: Hard
        return 5;                          // 25+: Expert
    }, []);

    // ===================
    // CONSTANTS
    // ===================
    const FIXED_TIMESTEP = 1000 / 60;
    const CAPTAIN_X = 20;
    const CAPTAIN_SIZE = 14;
    const OBSTACLE_WIDTH = 14;

    // Distraction types
    const distractionTypes = [
        { emoji: '📱', name: 'Phone', color: 'from-red-500 to-red-700' },
        { emoji: '📧', name: 'Email', color: 'from-orange-500 to-orange-700' },
        { emoji: '💬', name: 'Slack', color: 'from-purple-500 to-purple-700' },
        { emoji: '🗓️', name: 'Meeting', color: 'from-yellow-500 to-yellow-700' },
        { emoji: '🔔', name: 'Notif', color: 'from-pink-500 to-pink-700' },
        { emoji: '🎮', name: 'Games', color: 'from-green-500 to-green-700' },
        { emoji: '📺', name: 'TV', color: 'from-blue-500 to-blue-700' },
        { emoji: '🐦', name: 'Social', color: 'from-sky-500 to-sky-700' },
    ];

    // Milestone labels
    const getMilestone = (s) => {
        if (s >= 50) return { label: 'LEGENDARY', color: 'text-yellow-400', bg: 'bg-yellow-500/20', emoji: '👑' };
        if (s >= 35) return { label: 'MASTER', color: 'text-purple-400', bg: 'bg-purple-500/20', emoji: '💎' };
        if (s >= 25) return { label: 'EXPERT', color: 'text-cyan-400', bg: 'bg-cyan-500/20', emoji: '⭐' };
        if (s >= 15) return { label: 'FOCUSED', color: 'text-green-400', bg: 'bg-green-500/20', emoji: '🎯' };
        if (s >= 7) return { label: 'GETTING THERE', color: 'text-blue-400', bg: 'bg-blue-500/20', emoji: '🔥' };
        if (s >= 3) return { label: 'WARMING UP', color: 'text-slate-300', bg: 'bg-slate-500/20', emoji: '💪' };
        return { label: 'JUST STARTING', color: 'text-slate-400', bg: 'bg-slate-600/20', emoji: '🌱' };
    };

    const getDifficultyLabel = (level) => {
        const labels = {
            1: { text: 'BEGINNER', color: 'text-green-400', bg: 'bg-green-500/30' },
            2: { text: 'EASY', color: 'text-blue-400', bg: 'bg-blue-500/30' },
            3: { text: 'NORMAL', color: 'text-yellow-400', bg: 'bg-yellow-500/30' },
            4: { text: 'HARD', color: 'text-orange-400', bg: 'bg-orange-500/30' },
            5: { text: 'EXPERT', color: 'text-red-400', bg: 'bg-red-500/30' },
        };
        return labels[level] || labels[1];
    };

    // ===================
    // FEEDBACK HELPERS
    // ===================
    const triggerHaptic = (pattern = 10) => {
        if (typeof window !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    const triggerScreenShake = () => {
        setScreenShake(true);
        triggerHaptic(80);
        setTimeout(() => setScreenShake(false), 120);
    };

    const triggerFlash = (color) => {
        setFlashColor(color);
        setTimeout(() => setFlashColor(null), 60);
    };

    const triggerPassedEffect = () => {
        setPassedEffect(Date.now());
        triggerHaptic(5);
        setTimeout(() => setPassedEffect(null), 300);
    };

    const triggerNearMiss = () => {
        if (!nearMiss) {
            setNearMiss(true);
            triggerHaptic([8, 15, 8]);
            setTimeout(() => setNearMiss(false), 350);
        }
    };

    // ===================
    // SPAWN OBSTACLE
    // ===================
    const spawnObstacle = useCallback(() => {
        const settings = getDifficultySettings(difficultyRef.current);

        // Gap position: more centered at low difficulty, more varied at high
        const variance = settings.gapVariance;
        const gapCenter = 50 + (Math.random() - 0.5) * variance * 2;
        const safeGapCenter = Math.max(22, Math.min(78, gapCenter));

        const type = distractionTypes[Math.floor(Math.random() * distractionTypes.length)];

        const newObstacle = {
            id: Date.now() + Math.random(),
            x: 105,
            gapCenter: safeGapCenter,
            gapSize: settings.gapSize,
            passed: false,
            scored: false,
            ...type
        };

        obstaclesRef.current = [...obstaclesRef.current, newObstacle];
    }, [getDifficultySettings]);

    // ===================
    // COLLISION DETECTION
    // ===================
    const checkCollision = useCallback((cY, obs) => {
        const settings = getDifficultySettings(difficultyRef.current);

        const captainHalfSize = (CAPTAIN_SIZE / 2) - settings.hitboxShrink;
        const captainLeft = CAPTAIN_X - captainHalfSize;
        const captainRight = CAPTAIN_X + captainHalfSize;
        const captainTop = cY - captainHalfSize;
        const captainBottom = cY + captainHalfSize;

        // Boundary collision (with small buffer)
        if (captainTop < 2 || captainBottom > 98) {
            return true;
        }

        for (const obstacle of obs) {
            const obsLeft = obstacle.x;
            const obsRight = obstacle.x + OBSTACLE_WIDTH;

            if (captainRight > obsLeft && captainLeft < obsRight) {
                const gapTop = obstacle.gapCenter - (obstacle.gapSize / 2);
                const gapBottom = obstacle.gapCenter + (obstacle.gapSize / 2);

                if (captainTop < gapTop || captainBottom > gapBottom) {
                    return true;
                }

                // Near miss detection
                const nearMissThreshold = 3;
                if (captainTop < gapTop + nearMissThreshold || captainBottom > gapBottom - nearMissThreshold) {
                    triggerNearMiss();
                }
            }
        }

        return false;
    }, [getDifficultySettings]);

    // ===================
    // START GAME
    // ===================
    const startGame = useCallback(() => {
        gameStateRef.current = 'playing';
        setGameState('playing');

        setScore(0);
        scoreRef.current = 0;
        setIsNewBest(false);
        setNearMiss(false);
        setPassedEffect(null);
        setDifficultyLevel(1);
        difficultyRef.current = 1;

        captainYRef.current = 50;
        setCaptainY(50);
        velocityRef.current = 0;
        setCaptainRotation(0);

        obstaclesRef.current = [];
        setObstacles([]);

        lastTimeRef.current = 0;
        accumulatorRef.current = 0;
        lastSpawnRef.current = 0;
        gameStartTimeRef.current = typeof window !== 'undefined' ? performance.now() : Date.now();

        // First obstacle after generous delay
        setTimeout(() => {
            if (gameStateRef.current === 'playing') {
                spawnObstacle();
                lastSpawnRef.current = (typeof window !== 'undefined' ? performance.now() : Date.now()) - gameStartTimeRef.current;
            }
        }, 1500);

        animationFrameRef.current = requestAnimationFrame(gameLoop);
    }, [gameLoop, spawnObstacle, getDifficultySettings]);

    // ===================
    // GAME LOOP
    // ===================
    const gameLoop = useCallback((currentTime) => {
        if (gameStateRef.current !== 'playing') return;

        if (lastTimeRef.current === 0) {
            lastTimeRef.current = currentTime;
        }
        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;
        accumulatorRef.current += deltaTime;

        const settings = getDifficultySettings(difficultyRef.current);

        while (accumulatorRef.current >= FIXED_TIMESTEP) {
            // Gravity
            velocityRef.current += settings.gravity;

            // Smooth rising feel
            if (velocityRef.current < 0) {
                velocityRef.current *= 0.94;
            }

            // Terminal velocity (both directions)
            velocityRef.current = Math.max(
                -settings.terminalVelocity,
                Math.min(settings.terminalVelocity, velocityRef.current)
            );

            // Update position
            captainYRef.current += velocityRef.current * 0.55;

            // Move obstacles
            obstaclesRef.current = obstaclesRef.current
                .map(obs => ({ ...obs, x: obs.x - settings.obstacleSpeed * 0.5 }))
                .filter(obs => obs.x > -OBSTACLE_WIDTH - 5);

            // Spawn obstacles
            const timeSinceStart = currentTime - gameStartTimeRef.current;
            if (timeSinceStart - lastSpawnRef.current > settings.spawnInterval) {
                spawnObstacle();
                lastSpawnRef.current = timeSinceStart;
            }

            // Score check
            obstaclesRef.current.forEach(obs => {
                if (!obs.scored && obs.x + OBSTACLE_WIDTH / 2 < CAPTAIN_X) {
                    obs.scored = true;
                    scoreRef.current += 1;
                    setScore(scoreRef.current);
                    triggerPassedEffect();
                    triggerFlash('green');

                    // Update difficulty
                    const newDiff = calculateDifficulty(scoreRef.current);
                    if (newDiff !== difficultyRef.current) {
                        difficultyRef.current = newDiff;
                        setDifficultyLevel(newDiff);
                        triggerHaptic([15, 30, 15]);
                    }

                    // Milestone confetti
                    if ([3, 7, 15, 25, 35, 50].includes(scoreRef.current)) {
                        if (typeof window !== 'undefined') {
                            confetti({
                                particleCount: 50 + scoreRef.current,
                                spread: 70,
                                origin: { x: 0.25, y: 0.5 },
                                colors: ['#06b6d4', '#3b82f6', '#fbbf24', '#a855f7']
                            });
                        }
                    }
                }
            });

            // Collision
            if (checkCollision(captainYRef.current, obstaclesRef.current)) {
                endGame();
                return;
            }

            accumulatorRef.current -= FIXED_TIMESTEP;
        }

        // Visual updates
        setCaptainY(captainYRef.current);

        // Smooth rotation
        const targetRotation = velocityRef.current > 0
            ? Math.min(velocityRef.current * 6, 50)
            : Math.max(velocityRef.current * 3, -15);
        setCaptainRotation(prev => prev + (targetRotation - prev) * 0.15);

        setObstacles([...obstaclesRef.current]);

        animationFrameRef.current = requestAnimationFrame(gameLoop);
    }, [spawnObstacle, checkCollision, getDifficultySettings, calculateDifficulty]);

    // ===================
    // JUMP
    // ===================
    const jump = useCallback(() => {
        if (gameStateRef.current === 'dead' || gameStateRef.current === 'idle') {
            startGame();
            return;
        }

        triggerFlash('cyan');
        triggerHaptic(6);

        const settings = getDifficultySettings(1);
        velocityRef.current = settings.jumpVelocity;
        setCaptainRotation(0);
    }, [startGame, getDifficultySettings]);

    // ===================
    // END GAME
    // ===================
    const endGame = useCallback(() => {
        if (gameStateRef.current === 'dead') return;

        gameStateRef.current = 'dead';
        setGameState('dead');

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        triggerScreenShake();
        triggerFlash('red');

        const finalScore = scoreRef.current;
        if (finalScore > bestScore) {
            setIsNewBest(true);
            setBestScore(finalScore);
            try { localStorage.setItem('deepwork_best', finalScore.toString()); }
            catch { }

            setTimeout(() => {
                if (typeof window !== 'undefined') {
                    confetti({
                        particleCount: 120,
                        spread: 90,
                        origin: { y: 0.6 }
                    });
                }
            }, 300);
        }
    }, [bestScore]);

    // ===================
    // INTERACTION HANDLER
    // ===================
    const handleInteraction = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        jump();
    }, [jump]);

    // ===================
    // SHARE
    // ===================
    const shareScore = useCallback(() => {
        const milestone = getMilestone(score);
        const text = `${milestone.emoji} I dodged ${score} distractions in Deep Work Dive!\n\n${milestone.label} status achieved! Can you beat my focus? 🧠💪\n\nPlay free: AgenticAIHome.com`;

        if (typeof window !== 'undefined') {
            if (navigator.share) {
                navigator.share({ title: 'Deep Work Dive', text }).catch(() => { });
            } else {
                navigator.clipboard?.writeText(text).then(() => {
                    alert('Score copied to clipboard!');
                }).catch(() => { });
            }
        }
    }, [score]);

    // ===================
    // EFFECTS
    // ===================
    // Keyboard
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) {
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
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    // Memoized obstacles
    const renderedObstacles = useMemo(() => obstacles.map((obs) => {
        const gapTop = obs.gapCenter - (obs.gapSize / 2);
        const gapBottom = obs.gapCenter + (obs.gapSize / 2);

        return (
            <div
                key={obs.id}
                className="absolute top-0 bottom-0 z-10"
                style={{ left: `${obs.x}%`, width: `${OBSTACLE_WIDTH}%` }}
            >
                {/* Top pipe */}
                <div
                    className={`absolute left-0 right-0 bg-gradient-to-b ${obs.color} shadow-xl`}
                    style={{
                        top: 0,
                        height: `${gapTop}%`,
                        borderBottomLeftRadius: '10px',
                        borderBottomRightRadius: '10px',
                    }}
                >
                    <div
                        className={`absolute bottom-0 left-[-10%] right-[-10%] h-[14%] min-h-[22px] bg-gradient-to-b ${obs.color} rounded-lg shadow-lg border-2 border-white/20`}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg sm:text-xl drop-shadow-lg">{obs.emoji}</span>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 left-0 w-[25%] bg-white/10 rounded-bl-lg" />
                </div>

                {/* Bottom pipe */}
                <div
                    className={`absolute left-0 right-0 bg-gradient-to-t ${obs.color} shadow-xl`}
                    style={{
                        bottom: 0,
                        height: `${100 - gapBottom}%`,
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                    }}
                >
                    <div
                        className={`absolute top-0 left-[-10%] right-[-10%] h-[14%] min-h-[22px] bg-gradient-to-t ${obs.color} rounded-lg shadow-lg border-2 border-white/20`}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg sm:text-xl drop-shadow-lg">{obs.emoji}</span>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 left-0 w-[25%] bg-white/10 rounded-tl-lg" />
                </div>
            </div>
        );
    }), [obstacles]);

    return (
        <div
            className={`w-full max-w-2xl mx-auto bg-slate-900 border-2 rounded-2xl overflow-hidden shadow-2xl relative select-none
                ${gameState === 'playing' ? 'border-cyan-500/50' : 'border-slate-700'}
                ${screenShake ? 'animate-shake' : ''}
            `}
        >
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px) rotate(-0.5deg); }
                    50% { transform: translateX(4px) rotate(0.5deg); }
                    75% { transform: translateX(-3px) rotate(-0.3deg); }
                }
                .animate-shake { animation: shake 0.12s ease-in-out; }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(-3deg); }
                    50% { transform: translateY(-12px) rotate(3deg); }
                }
                .animate-float { animation: float 2s ease-in-out infinite; }
                @keyframes glow {
                    0%, 100% { filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.5)); }
                    50% { filter: drop-shadow(0 0 25px rgba(6, 182, 212, 0.8)); }
                }
                .animate-glow { animation: glow 1.5s ease-in-out infinite; }
            `}</style>

            {/* HUD */}
            {gameState === 'playing' && (
                <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
                    <div className="flex justify-between items-start p-3 sm:p-4">
                        {/* Difficulty */}
                        <motion.div
                            key={difficultyLevel}
                            initial={{ scale: 1.3, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`${getDifficultyLabel(difficultyLevel).bg} ${getDifficultyLabel(difficultyLevel).color} px-3 py-1 rounded-full text-xs sm:text-sm font-bold border border-current/30`}
                        >
                            {getDifficultyLabel(difficultyLevel).text}
                        </motion.div>

                        {/* Score */}
                        <motion.div
                            key={score}
                            initial={{ scale: 1.4 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            className="text-5xl sm:text-6xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                            style={{ WebkitTextStroke: '2px rgba(0,0,0,0.3)' }}
                        >
                            {score}
                        </motion.div>
                    </div>
                </div>
            )}

            {/* Game Area */}
            <div
                ref={gameAreaRef}
                onClick={handleInteraction}
                onTouchStart={handleInteraction}
                className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[75vh] overflow-hidden cursor-pointer touch-none"
                style={{
                    background: 'linear-gradient(180deg, #0c1929 0%, #153653 35%, #1a4a6e 50%, #153653 65%, #0c1929 100%)',
                    minHeight: '420px'
                }}
            >
                {/* Stars background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white/30"
                            style={{
                                left: `${(i * 19 + 7) % 100}%`,
                                top: `${(i * 23 + 11) % 100}%`,
                                width: `${2 + (i % 3)}px`,
                                height: `${2 + (i % 3)}px`,
                            }}
                        />
                    ))}
                </div>

                {/* Flash overlay */}
                <AnimatePresence>
                    {flashColor && (
                        <motion.div
                            initial={{ opacity: 0.4 }}
                            animate={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.06 }}
                            className={`absolute inset-0 z-40 pointer-events-none
                                ${flashColor === 'green' ? 'bg-green-400' : ''}
                                ${flashColor === 'red' ? 'bg-red-500' : ''}
                                ${flashColor === 'cyan' ? 'bg-cyan-400' : ''}
                            `}
                        />
                    )}
                </AnimatePresence>

                {/* Near miss */}
                <AnimatePresence>
                    {nearMiss && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute top-16 left-1/2 -translate-x-1/2 z-30"
                        >
                            <div className="bg-yellow-500 text-black font-black text-sm px-4 py-1.5 rounded-full shadow-lg">
                                😰 CLOSE CALL!
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* +1 effect */}
                <AnimatePresence>
                    {passedEffect && (
                        <motion.div
                            key={passedEffect}
                            initial={{ opacity: 1, y: 0, scale: 1 }}
                            animate={{ opacity: 0, y: -50, scale: 1.4 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-24 left-1/2 -translate-x-1/2 z-30 text-green-400 font-black text-3xl pointer-events-none"
                        >
                            +1
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CAPTAIN EFFICIENCY - Flying character! */}
                {gameState !== 'idle' && (
                    <div
                        className="absolute z-20 pointer-events-none"
                        style={{
                            left: `${CAPTAIN_X}%`,
                            top: `${captainY}%`,
                            transform: `translate(-50%, -50%) rotate(${captainRotation}deg)`,
                            width: `${CAPTAIN_SIZE}%`,
                            maxWidth: '85px',
                            aspectRatio: '1',
                            willChange: 'transform'
                        }}
                    >
                        {/* Glow */}
                        <div
                            className={`absolute inset-[-35%] rounded-full blur-xl transition-colors duration-150
                                ${nearMiss ? 'bg-yellow-400/60' : gameState === 'dead' ? 'bg-red-500/60' : 'bg-cyan-400/50'}
                            `}
                        />

                        {/* Captain Efficiency Image */}
                        <img
                            src="/assets/captain-efficiency-flying.png"
                            alt="Captain Efficiency"
                            className={`relative w-full h-full object-contain ${gameState === 'dead' ? 'grayscale brightness-50' : ''}`}
                            style={{
                                filter: gameState === 'dead'
                                    ? 'grayscale(1) brightness(0.5)'
                                    : nearMiss
                                        ? 'drop-shadow(0 0 15px rgba(250, 204, 21, 0.8))'
                                        : 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.7))'
                            }}
                            draggable="false"
                        />

                        {/* Jump trail */}
                        {velocityRef.current < -2.5 && gameState === 'playing' && (
                            <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[45%] h-[90%] bg-gradient-to-b from-cyan-400/50 to-transparent rounded-full blur-md" />
                        )}
                    </div>
                )}

                {/* Obstacles */}
                {renderedObstacles}

                {/* Danger zones */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-red-500/40 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-red-500/40 to-transparent" />

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
                                className="text-center w-full max-w-sm"
                            >
                                {/* Floating Captain */}
                                <div className="animate-float animate-glow mb-4">
                                    <img
                                        src="/assets/captain-efficiency-flying.png"
                                        alt="Captain Efficiency"
                                        className="w-24 h-24 sm:w-28 sm:h-28 mx-auto object-contain"
                                        draggable="false"
                                    />
                                </div>

                                <h1 className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight">
                                    DEEP WORK DIVE
                                </h1>
                                <p className="text-cyan-400 font-medium mb-2 text-sm sm:text-base">
                                    Guide Captain Efficiency through distractions!
                                </p>
                                <p className="text-slate-400 text-xs mb-5">
                                    🎮 Starts easy • Gets harder as you improve
                                </p>

                                {bestScore > 0 && (
                                    <div className="mb-5 bg-slate-800/70 rounded-xl py-3 px-5 inline-block">
                                        <span className="text-xs text-slate-400 uppercase">Your Best</span>
                                        <div className="text-3xl font-black text-yellow-400 flex items-center justify-center gap-2">
                                            <Trophy size={24} /> {bestScore}
                                        </div>
                                    </div>
                                )}

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => { e.stopPropagation(); startGame(); }}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:from-cyan-600 active:to-blue-700 text-white px-8 py-4 rounded-2xl font-black text-lg sm:text-xl shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center gap-3"
                                >
                                    <Play size={26} fill="white" /> TAP TO PLAY
                                </motion.button>

                                <p className="text-slate-500 text-xs mt-4">
                                    Tap anywhere or press SPACE to fly
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
                            transition={{ delay: 0.15 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30 backdrop-blur-sm p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.25, type: 'spring' }}
                                className="text-center w-full max-w-xs"
                            >
                                {isNewBest ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.5 }}
                                            className="text-5xl mb-2"
                                        >
                                            🏆
                                        </motion.div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-yellow-400 mb-1">NEW BEST!</h2>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-4xl mb-2">{getMilestone(score).emoji}</div>
                                        <h2 className={`text-xl sm:text-2xl font-black ${getMilestone(score).color} mb-1`}>
                                            {getMilestone(score).label}
                                        </h2>
                                    </>
                                )}

                                <div className={`${getMilestone(score).bg} rounded-2xl p-4 mb-4`}>
                                    <div className="text-xs text-slate-400 uppercase">Final Score</div>
                                    <div className="text-5xl font-black text-white">{score}</div>
                                    <div className={`text-xs mt-2 ${getDifficultyLabel(difficultyLevel).color}`}>
                                        Reached: {getDifficultyLabel(difficultyLevel).text}
                                    </div>
                                    {!isNewBest && bestScore > 0 && (
                                        <div className="text-xs text-slate-500 mt-1">
                                            Best: {bestScore} {score === bestScore && '(Tied!)'}
                                        </div>
                                    )}
                                </div>

                                {/* Contextual tips */}
                                {score < 3 && (
                                    <p className="text-slate-400 text-xs mb-4 bg-slate-800/50 rounded-lg p-2">
                                        💡 Tip: Tap gently and often - small movements work best!
                                    </p>
                                )}
                                {score >= 3 && score < 10 && (
                                    <p className="text-slate-400 text-xs mb-4 bg-slate-800/50 rounded-lg p-2">
                                        💡 Nice! Focus on the gaps ahead, not on Captain.
                                    </p>
                                )}
                                {score >= 10 && score < 20 && (
                                    <p className="text-slate-400 text-xs mb-4 bg-slate-800/50 rounded-lg p-2">
                                        💡 Great focus! Gaps get trickier - stay calm!
                                    </p>
                                )}

                                <div className="flex gap-3 justify-center mb-4">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.stopPropagation(); onBack?.(); }}
                                        className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-sm"
                                    >
                                        <ArrowLeft size={18} /> Back
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 text-sm"
                                    >
                                        <RotateCcw size={18} /> Try Again
                                    </motion.button>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); shareScore(); }}
                                    className="text-slate-400 hover:text-white text-sm flex items-center gap-2 mx-auto transition-colors"
                                >
                                    <Share2 size={16} /> Share Score
                                </button>
                            </motion.div>

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