import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { m, AnimatePresence } from 'framer-motion';
import { Play, Trophy, ArrowLeft, RotateCcw, Share2 } from "lucide-react";
import confetti from "canvas-confetti";
import { api } from '../../services/api';
import { useGameAudio } from '../../hooks/useGameAudio';

const DeepWorkDive = ({ onBack }) => {
    // Audio hook
    const { playSound, SoundToggle } = useGameAudio();

    // ===================
    // STATE
    // ===================
    const [gameState, setGameState] = useState("idle"); // idle, playing, dead
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
        try {
            return parseInt(localStorage.getItem("deepwork_best") || "0", 10);
        } catch {
            return 0;
        }
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
    const gameStateRef = useRef("idle");
    const velocityRef = useRef(0);
    const captainYRef = useRef(50);
    const scoreRef = useRef(0);
    const obstaclesRef = useRef([]);
    const lastSpawnRef = useRef(0);
    const gameStartTimeRef = useRef(0);
    const difficultyRef = useRef(1);

    // ===================
    // CONSTANTS
    // ===================
    const FIXED_TIMESTEP = 1000 / 60;
    const CAPTAIN_X = 20;
    const CAPTAIN_SIZE = 14;
    const OBSTACLE_WIDTH = 14;

    // Distraction types
    const distractionTypes = [
        { emoji: "📱", name: "Phone", color: "from-red-500 to-red-700" },
        { emoji: "📧", name: "Email", color: "from-orange-500 to-orange-700" },
        { emoji: "💬", name: "Slack", color: "from-purple-500 to-purple-700" },
        { emoji: "🗓️", name: "Meeting", color: "from-yellow-500 to-yellow-700" },
        { emoji: "🔔", name: "Notif", color: "from-pink-500 to-pink-700" },
        { emoji: "🎮", name: "Games", color: "from-green-500 to-green-700" },
        { emoji: "📺", name: "TV", color: "from-blue-500 to-blue-700" },
        { emoji: "🐦", name: "Social", color: "from-sky-500 to-sky-700" },
    ];

    // Milestone labels
    const getMilestone = (s) => {
        if (s >= 50)
            return {
                label: "LEGENDARY",
                color: "text-yellow-400",
                bg: "bg-yellow-500/20",
                emoji: "👑",
            };
        if (s >= 35)
            return {
                label: "MASTER",
                color: "text-purple-400",
                bg: "bg-purple-500/20",
                emoji: "💎",
            };
        if (s >= 25)
            return {
                label: "EXPERT",
                color: "text-cyan-400",
                bg: "bg-cyan-500/20",
                emoji: "⭐",
            };
        if (s >= 15)
            return {
                label: "FOCUSED",
                color: "text-green-400",
                bg: "bg-green-500/20",
                emoji: "🎯",
            };
        if (s >= 7)
            return {
                label: "GETTING THERE",
                color: "text-blue-400",
                bg: "bg-blue-500/20",
                emoji: "🔥",
            };
        if (s >= 3)
            return {
                label: "WARMING UP",
                color: "text-slate-300",
                bg: "bg-slate-500/20",
                emoji: "💪",
            };
        return {
            label: "JUST STARTING",
            color: "text-slate-400",
            bg: "bg-slate-600/20",
            emoji: "🌱",
        };
    };

    const getDifficultyLabel = (level) => {
        const labels = {
            1: { text: "BEGINNER", color: "text-green-400", bg: "bg-green-500/30" },
            2: { text: "EASY", color: "text-blue-400", bg: "bg-blue-500/30" },
            3: {
                text: "NORMAL",
                color: "text-yellow-400",
                bg: "bg-yellow-500/30",
            },
            4: {
                text: "HARD",
                color: "text-orange-400",
                bg: "bg-orange-500/30",
            },
            5: { text: "EXPERT", color: "text-red-400", bg: "bg-red-500/30" },
        };
        return labels[level] || labels[1];
    };

    const difficultyInfo = getDifficultyLabel(difficultyLevel);
    const milestone = getMilestone(score);

    // ===================
    // PROGRESSIVE DIFFICULTY SYSTEM
    // ===================
    const getDifficultySettings = useCallback((level) => {
        const settings = {
            1: {
                gravity: 0.22,
                jumpVelocity: -4.5,
                terminalVelocity: 5.5,
                gapSize: 45,
                obstacleSpeed: 1.8,
                spawnInterval: 2800,
                hitboxShrink: 5.0,
                gapVariance: 8,
            },
            2: {
                gravity: 0.25,
                jumpVelocity: -4.8,
                terminalVelocity: 6.0,
                gapSize: 42,
                obstacleSpeed: 2.0,
                spawnInterval: 2500,
                hitboxShrink: 4.5,
                gapVariance: 12,
            },
            3: {
                gravity: 0.28,
                jumpVelocity: -5.0,
                terminalVelocity: 6.5,
                gapSize: 38,
                obstacleSpeed: 2.3,
                spawnInterval: 2200,
                hitboxShrink: 4.0,
                gapVariance: 15,
            },
            4: {
                gravity: 0.3,
                jumpVelocity: -5.2,
                terminalVelocity: 7.0,
                gapSize: 35,
                obstacleSpeed: 2.6,
                spawnInterval: 1900,
                hitboxShrink: 3.5,
                gapVariance: 18,
            },
            5: {
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

    const calculateDifficulty = useCallback((currentScore) => {
        if (currentScore < 3) return 1;
        if (currentScore < 7) return 2;
        if (currentScore < 15) return 3;
        if (currentScore < 25) return 4;
        return 5;
    }, []);

    // ===================
    // FEEDBACK HELPERS
    // ===================
    const triggerHaptic = (pattern = 10) => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
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

    const triggerPassedEffect = useCallback(() => {
        setPassedEffect(Date.now());
        triggerHaptic(5);
        playSound('pass');
        setTimeout(() => setPassedEffect(null), 300);
    }, [playSound]);

    const triggerNearMiss = useCallback(() => {
        if (!nearMiss) {
            setNearMiss(true);
            triggerHaptic([8, 15, 8]);
            playSound('nearMiss');
            setTimeout(() => setNearMiss(false), 350);
        }
    }, [nearMiss, playSound]);

    // ===================
    // SPAWN OBSTACLE
    // ===================
    const spawnObstacle = useCallback(() => {
        const settings = getDifficultySettings(difficultyRef.current);

        const variance = settings.gapVariance;
        const gapCenter = 50 + (Math.random() - 0.5) * variance * 2;
        const safeGapCenter = Math.max(22, Math.min(78, gapCenter));

        const type =
            distractionTypes[Math.floor(Math.random() * distractionTypes.length)];

        const newObstacle = {
            id: Date.now() + Math.random(),
            x: 105,
            gapCenter: safeGapCenter,
            gapSize: settings.gapSize,
            passed: false,
            scored: false,
            ...type,
        };

        obstaclesRef.current = [...obstaclesRef.current, newObstacle];
    }, [getDifficultySettings, distractionTypes]);

    // ===================
    // COLLISION DETECTION
    // ===================
    const checkCollision = useCallback(
        (cY, obs) => {
            const settings = getDifficultySettings(difficultyRef.current);

            const captainHalfSize = CAPTAIN_SIZE / 2 - settings.hitboxShrink;
            const captainLeft = CAPTAIN_X - captainHalfSize;
            const captainRight = CAPTAIN_X + captainHalfSize;
            const captainTop = cY - captainHalfSize;
            const captainBottom = cY + captainHalfSize;

            // Boundary collision
            if (captainTop < 2 || captainBottom > 98) {
                return true;
            }

            for (const obstacle of obs) {
                const obsLeft = obstacle.x;
                const obsRight = obstacle.x + OBSTACLE_WIDTH;

                if (captainRight > obsLeft && captainLeft < obsRight) {
                    const gapTop = obstacle.gapCenter - obstacle.gapSize / 2;
                    const gapBottom = obstacle.gapCenter + obstacle.gapSize / 2;

                    if (captainTop < gapTop || captainBottom > gapBottom) {
                        return true;
                    }

                    const nearMissThreshold = 3;
                    if (
                        captainTop < gapTop + nearMissThreshold ||
                        captainBottom > gapBottom - nearMissThreshold
                    ) {
                        triggerNearMiss();
                    }
                }
            }

            return false;
        },
        [getDifficultySettings]
    );

    // ===================
    // END GAME
    // ===================
    const endGame = useCallback(() => {
        if (gameStateRef.current === "dead") return;

        gameStateRef.current = "dead";
        setGameState("dead");

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        triggerScreenShake();
        triggerFlash("red");

        const finalScore = scoreRef.current;
        if (finalScore > bestScore) {
            setIsNewBest(true);
            setBestScore(finalScore);
            try {
                localStorage.setItem("deepwork_best", finalScore.toString());
            } catch {
                // ignore
            }

            confetti({
                particleCount: 120,
                spread: 90,
                origin: { y: 0.6 },
                colors: ["#06b6d4", "#3b82f6", "#fbbf24", "#a855f7"],
            });
            playSound('highScore');
        } else {
            playSound('fail');
        }

        // Submit score to global leaderboard
        if (finalScore > 0) {
            api.submitScore?.('deepwork', finalScore)?.catch(err => {
                console.error('Failed to submit score:', err);
            });
        }
    }, [bestScore, playSound]);

    // ===================
    // GAME LOOP
    // ===================
    const gameLoop = useCallback(
        (currentTime) => {
            if (gameStateRef.current !== "playing") return;

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

                // Terminal velocity
                velocityRef.current = Math.max(
                    -settings.terminalVelocity,
                    Math.min(settings.terminalVelocity, velocityRef.current)
                );

                // Position
                captainYRef.current += velocityRef.current * 0.55;

                // Obstacles
                obstaclesRef.current = obstaclesRef.current
                    .map((obs) => ({
                        ...obs,
                        x: obs.x - settings.obstacleSpeed * 0.5,
                    }))
                    .filter((obs) => obs.x > -OBSTACLE_WIDTH - 5);

                // Spawn
                const timeSinceStart = currentTime - gameStartTimeRef.current;
                if (timeSinceStart - lastSpawnRef.current > settings.spawnInterval) {
                    spawnObstacle();
                    lastSpawnRef.current = timeSinceStart;
                }

                // Score
                obstaclesRef.current.forEach((obs) => {
                    if (!obs.scored && obs.x + OBSTACLE_WIDTH / 2 < CAPTAIN_X) {
                        obs.scored = true;
                        scoreRef.current += 1;
                        setScore(scoreRef.current);
                        triggerPassedEffect();
                        triggerFlash("green");

                        const newDiff = calculateDifficulty(scoreRef.current);
                        if (newDiff !== difficultyRef.current) {
                            difficultyRef.current = newDiff;
                            setDifficultyLevel(newDiff);
                            triggerHaptic([15, 30, 15]);
                            playSound('frenzy'); // Level up sound
                        }

                        if ([3, 7, 15, 25, 35, 50].includes(scoreRef.current)) {
                            confetti({
                                particleCount: 50 + scoreRef.current,
                                spread: 70,
                                origin: { x: 0.25, y: 0.5 },
                                colors: ["#06b6d4", "#3b82f6", "#fbbf24", "#a855f7"],
                            });
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

            const targetRotation =
                velocityRef.current > 0
                    ? Math.min(velocityRef.current * 6, 50)
                    : Math.max(velocityRef.current * 3, -15);
            setCaptainRotation(
                (prev) => prev + (targetRotation - prev) * 0.15
            );

            setObstacles([...obstaclesRef.current]);

            animationFrameRef.current = requestAnimationFrame(gameLoop);
        },
        [
            FIXED_TIMESTEP,
            checkCollision,
            endGame,
            getDifficultySettings,
            calculateDifficulty,
            spawnObstacle,
        ]
    );

    // ===================
    // START GAME
    // ===================
    const startGame = useCallback(() => {
        gameStateRef.current = "playing";
        setGameState("playing");

        scoreRef.current = 0;
        setScore(0);
        setIsNewBest(false);

        difficultyRef.current = 1;
        setDifficultyLevel(1);

        velocityRef.current = 0;
        captainYRef.current = 50;
        setCaptainY(50);

        obstaclesRef.current = [];
        setObstacles([]);
        setNearMiss(false);
        setPassedEffect(null);

        lastTimeRef.current = 0;
        accumulatorRef.current = 0;
        lastSpawnRef.current = 0;
        gameStartTimeRef.current = performance.now();

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        playSound('start');
        animationFrameRef.current = requestAnimationFrame(gameLoop);
    }, [gameLoop, playSound]);

    // ===================
    // JUMP / INTERACTION
    // ===================
    const jump = useCallback(() => {
        if (gameStateRef.current !== "playing") {
            startGame();
            return;
        }

        triggerFlash("cyan");
        triggerHaptic(6);
        playSound('jump');

        const settings = getDifficultySettings(difficultyRef.current);
        velocityRef.current = settings.jumpVelocity;
    }, [startGame, getDifficultySettings, playSound]);

    const handleInteraction = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            jump();
        },
        [jump]
    );

    // ===================
    // KEYBOARD CONTROLS
    // ===================
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (["Space", "ArrowUp", "KeyW"].includes(e.code)) {
                e.preventDefault();
                jump();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
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
    // SHARE
    // ===================
    const shareScore = () => {
        const m = getMilestone(score);
        const text = `${m.emoji} I dodged ${score} distractions in Deep Work Dive!\n\n${m.label} status achieved! Think you can beat me? 🎮\n\nPlay free: AgenticAIHome.com/games`;

        if (navigator.share) {
            navigator
                .share({ title: "Deep Work Dive Challenge", text })
                .catch(() => { });
        } else if (navigator.clipboard) {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    alert("Challenge copied! Paste it anywhere to challenge a friend.");
                })
                .catch(() => { });
        }
    };

    // ===================
    // MEMOIZED OBSTACLES
    // ===================
    const renderedObstacles = useMemo(
        () =>
            obstacles.map((obs) => {
                const gapTop = obs.gapCenter - obs.gapSize / 2;
                const gapBottom = obs.gapCenter + obs.gapSize / 2;

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
                                borderBottomLeftRadius: "10px",
                                borderBottomRightRadius: "10px",
                            }}
                        >
                            <div
                                className={`absolute bottom-0 left-[-10%] right-[-10%] h-[14%] min-h-[22px] bg-gradient-to-b ${obs.color} rounded-lg shadow-lg border-2 border-white/20`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg sm:text-xl drop-shadow-lg">
                                        {obs.emoji}
                                    </span>
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
                                borderTopLeftRadius: "10px",
                                borderTopRightRadius: "10px",
                            }}
                        >
                            <div
                                className={`absolute top-0 left-[-10%] right-[-10%] h-[14%] min-h-[22px] bg-gradient-to-t ${obs.color} rounded-lg shadow-lg border-2 border-white/20`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg sm:text-xl drop-shadow-lg">
                                        {obs.emoji}
                                    </span>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 left-0 w-[25%] bg-white/10 rounded-tl-lg" />
                        </div>
                    </div>
                );
            }),
        [obstacles]
    );

    // ===================
    // RENDER
    // ===================
    return (
        <div
            className={`w-full max-w-2xl mx-auto bg-slate-900 border-2 rounded-2xl overflow-hidden shadow-2xl relative select-none
      ${gameState === "playing" ? "border-cyan-500/50" : "border-slate-600"}
      ${screenShake ? "animate-shake" : ""}`}
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
            {gameState === "playing" && (
                <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
                    <div className="flex justify-between items-start p-3 sm:p-4">
                        <m.div
                            key={difficultyLevel}
                            initial={{ scale: 1.3, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`${difficultyInfo.bg} ${difficultyInfo.color} px-3 py-1 rounded-full text-xs sm:text-sm font-bold border border-current/30`}
                        >
                            {difficultyInfo.text}
                        </m.div>

                        <m.div
                            key={score}
                            initial={{ scale: 1.4 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="text-5xl sm:text-6xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                            style={{ WebkitTextStroke: "2px rgba(0,0,0,0.3)" }}
                        >
                            {score}
                        </m.div>

                        <SoundToggle className="absolute top-3 right-3 pointer-events-auto" />
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
                    background:
                        "linear-gradient(180deg, #0c1929 0%, #153653 35%, #1a4a6e 50%, #153653 65%, #0c1929 100%)",
                    minHeight: "420px",
                }}
            >
                {/* Stars */}
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

                {/* Flash */}
                <AnimatePresence>
                    {flashColor && (
                        <m.div
                            initial={{ opacity: 0.4 }}
                            animate={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.06 }}
                            className={`absolute inset-0 z-40 pointer-events-none
                ${flashColor === "green" ? "bg-green-400" : ""}
                ${flashColor === "red" ? "bg-red-500" : ""}
                ${flashColor === "cyan" ? "bg-cyan-400" : ""}`}
                        />
                    )}
                </AnimatePresence>

                {/* Near miss */}
                <AnimatePresence>
                    {nearMiss && (
                        <m.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute top-16 left-1/2 -translate-x-1/2 z-30"
                        >
                            <div className="bg-yellow-500 text-black font-black text-sm px-4 py-1.5 rounded-full shadow-lg">
                                😰 CLOSE CALL!
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>

                {/* +1 */}
                <AnimatePresence>
                    {passedEffect && (
                        <m.div
                            key={passedEffect}
                            initial={{ opacity: 1, y: 0, scale: 1 }}
                            animate={{ opacity: 0, y: -50, scale: 1.4 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-24 left-1/2 -translate-x-1/2 z-30 text-green-400 font-black text-3xl pointer-events-none"
                        >
                            +1
                        </m.div>
                    )}
                </AnimatePresence>

                {/* Captain Efficiency */}
                {gameState !== "idle" && (
                    <div
                        className="absolute z-20 pointer-events-none"
                        style={{
                            left: `${CAPTAIN_X}%`,
                            top: `${captainY}%`,
                            transform: `translate(-50%, -50%) rotate(${captainRotation}deg)`,
                            width: `${CAPTAIN_SIZE}%`,
                            maxWidth: "85px",
                            aspectRatio: "1",
                            willChange: "transform",
                        }}
                    >
                        <div
                            className={`absolute inset-[-35%] rounded-full blur-xl transition-colors duration-150
                ${nearMiss
                                    ? "bg-yellow-400/60"
                                    : gameState === "dead"
                                        ? "bg-red-500/60"
                                        : "bg-cyan-400/50"
                                }`}
                        />
                        <img
                            src="/assets/captain-efficiency-flying.webp"
                            alt="Captain Efficiency"
                            className={`relative w-full h-full object-contain ${gameState === "dead"
                                ? "grayscale brightness-50"
                                : ""
                                }`}
                            style={{
                                filter:
                                    gameState === "dead"
                                        ? "grayscale(1) brightness(0.5)"
                                        : nearMiss
                                            ? "drop-shadow(0 0 15px rgba(250, 204, 21, 0.8))"
                                            : "drop-shadow(0 0 12px rgba(6, 182, 212, 0.7))",
                            }}
                            draggable="false"
                        />
                        {velocityRef.current < -2.5 && gameState === "playing" && (
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
                    {gameState === "idle" && (
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30 backdrop-blur-sm p-4"
                        >
                            <m.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-center w-full max-w-sm"
                            >
                                <div className="animate-float animate-glow mb-4">
                                    <img
                                        src="/assets/captain-efficiency-flying.webp"
                                        alt="Captain Efficiency"
                                        className="w-24 h-24 sm:w-28 sm:h-28 mx-auto object-contain"
                                        draggable="false"
                                    />
                                </div>

                                <h1 className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight">
                                    DEEP WORK DIVE
                                </h1>
                                <p className="text-cyan-400 font-medium mb-1 text-sm sm:text-base">
                                    Tap to stay in the Deep Work Zone!
                                </p>
                                <p className="text-slate-400 text-xs mb-5">
                                    🎮 Avoid distractions • The longer you focus, the deeper you dive
                                </p>

                                {bestScore > 0 && (
                                    <div className="mb-5 bg-slate-800/70 rounded-xl py-3 px-5 inline-block">
                                        <span className="text-xs text-slate-400 uppercase">
                                            Your Best
                                        </span>
                                        <div className="text-3xl font-black text-yellow-400 flex items-center justify-center gap-2">
                                            <Trophy size={24} /> {bestScore}
                                        </div>
                                    </div>
                                )}

                                <m.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        startGame();
                                    }}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:from-cyan-600 active:to-blue-700 text-white px-8 py-4 rounded-2xl font-black text-lg sm:text-xl shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center gap-3"
                                >
                                    <Play size={26} fill="white" /> TAP TO PLAY
                                </m.button>

                                <p className="text-slate-400 text-xs mt-4">
                                    Tap anywhere or press SPACE to fly
                                </p>
                            </m.div>
                        </m.div>
                    )}
                </AnimatePresence>

                {/* DEATH SCREEN */}
                <AnimatePresence>
                    {gameState === "dead" && (
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30 backdrop-blur-sm p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <m.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.25, type: "spring" }}
                                className="text-center w-full max-w-xs"
                            >
                                {isNewBest ? (
                                    <>
                                        <m.div
                                            animate={{
                                                rotate: [-5, 5, -5],
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{ repeat: Infinity, duration: 0.5 }}
                                            className="text-5xl mb-2"
                                        >
                                            🏆
                                        </m.div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-yellow-400 mb-1">
                                            NEW BEST!
                                        </h2>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-4xl mb-2">{milestone.emoji}</div>
                                        <h2
                                            className={`text-xl sm:text-2xl font-black ${milestone.color} mb-1`}
                                        >
                                            {milestone.label}
                                        </h2>
                                    </>
                                )}

                                <div className={`${milestone.bg} rounded-2xl p-4 mb-4`}>
                                    <div className="text-xs text-slate-400 uppercase">
                                        Final Score
                                    </div>
                                    <div className="text-5xl font-black text-white">
                                        {score}
                                    </div>
                                    <div className={`text-xs mt-2 ${difficultyInfo.color}`}>
                                        Reached: {difficultyInfo.text}
                                    </div>
                                    {!isNewBest && bestScore > 0 && (
                                        <div className="text-xs text-slate-400 mt-1">
                                            Best: {bestScore}{" "}
                                            {score === bestScore && "(Tied!)"}
                                        </div>
                                    )}
                                </div>

                                {score < 3 && (
                                    <p className="text-slate-300 text-sm mb-4 bg-slate-800/50 rounded-lg p-2">
                                        💡 Tip: Tap gently and often - small movements work
                                        best!
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
                                    <m.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onBack?.();
                                        }}
                                        className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white px-4 py-3 min-h-[44px] rounded-xl font-bold transition-all flex items-center gap-2 text-sm"
                                        aria-label="Go back to games hub"
                                    >
                                        <ArrowLeft size={18} /> Back
                                    </m.button>
                                    <m.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            startGame();
                                        }}
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-3 min-h-[44px] rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 text-sm"
                                        aria-label="Play again"
                                    >
                                        <RotateCcw size={18} /> Try Again
                                    </m.button>
                                </div>

                                {/* PROMINENT SHARE / CHALLENGE SECTION */}
                                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-xl p-3 mb-4">
                                    <p className="text-purple-300 text-xs font-medium mb-2 text-center">
                                        📸 Screenshot this → Challenge a friend!
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            shareScore();
                                        }}
                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <Share2 size={16} />
                                        Challenge a Friend
                                    </button>
                                </div>

                                <p className="text-slate-500 text-xs text-center">
                                    Think they can beat {score}? 😏
                                </p>
                            </m.div>

                            <m.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="absolute bottom-4 text-slate-600 text-xs"
                            >
                                Tap anywhere to play again
                            </m.p>
                        </m.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DeepWorkDive;
