import React, { useState, useEffect, useRef, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Zap, Target, Clock, Trophy, Play, RotateCcw, ArrowLeft, Flame, Star, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';
import { useGameAudio } from '../../hooks/useGameAudio';

const CaptainClickChallenge = ({ onBack }) => {
    // Audio hook
    const { playSound, SoundToggle } = useGameAudio();

    // Game state
    const [gameState, setGameState] = useState('idle'); // idle, playing, finished
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        try {
            return parseInt(localStorage.getItem('captainClickHighScore') || '0', 10);
        } catch {
            return 0;
        }
    });
    const [timeLeft, setTimeLeft] = useState(30);
    const [isNewHighScore, setIsNewHighScore] = useState(false);

    // Captain state
    const [captainPos, setCaptainPos] = useState({ x: 50, y: 50 });
    const [captainScale, setCaptainScale] = useState(1); // 1 = 100% base size
    const [isFrozen, setIsFrozen] = useState(false);

    // Visual effects
    const [clickEffects, setClickEffects] = useState([]);
    const [screenShake, setScreenShake] = useState(false);
    const [flashColor, setFlashColor] = useState(null);
    const [criticalHit, setCriticalHit] = useState(false);

    // Combo system
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [frenzyMode, setFrenzyMode] = useState(false);

    // Power-ups
    const [powerUps, setPowerUps] = useState([]);
    const [activePowerUp, setActivePowerUp] = useState(null);
    const [powerUpTimer, setPowerUpTimer] = useState(0);

    // Difficulty
    const [moveInterval, setMoveInterval] = useState(1200);

    // Refs
    const containerRef = useRef(null);
    const gameLoopRef = useRef(null);
    const lastClickTimeRef = useRef(0);
    const comboTimeoutRef = useRef(null);
    const scoreRef = useRef(0);
    const frozenRef = useRef(false);

    // Keep refs in sync
    useEffect(() => { scoreRef.current = score; }, [score]);
    useEffect(() => { frozenRef.current = isFrozen; }, [isFrozen]);

    // Power-up definitions
    const POWER_UP_TYPES = [
        { type: 'freeze', emoji: '❄️', label: 'Freeze', color: 'from-cyan-400 to-cyan-600', duration: 3000 },
        { type: 'double', emoji: '💎', label: '2X Points', color: 'from-purple-400 to-purple-600', duration: 5000 },
        { type: 'grow', emoji: '🎯', label: 'Big Target', color: 'from-green-400 to-green-600', duration: 4000 },
    ];

    // ===================
    // HAPTIC FEEDBACK
    // ===================
    const triggerHaptic = (pattern = 10) => {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    // ===================
    // VISUAL EFFECTS
    // ===================
    const triggerScreenShake = () => {
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 100);
    };

    const triggerFlash = (color) => {
        setFlashColor(color);
        setTimeout(() => setFlashColor(null), 80);
    };

    const addClickEffect = useCallback((x, y, text, color = 'text-green-400', size = 'text-2xl') => {
        const effect = { id: Date.now() + Math.random(), x, y, text, color, size };
        setClickEffects(prev => [...prev, effect]);
        setTimeout(() => {
            setClickEffects(prev => prev.filter(e => e.id !== effect.id));
        }, 600);
    }, []);

    // ===================
    // CAPTAIN MOVEMENT
    // ===================
    const moveCaptain = useCallback(() => {
        if (frozenRef.current) return;

        // Keep captain away from edges (15-85% range)
        const x = 15 + Math.random() * 70;
        const y = 15 + Math.random() * 70;
        setCaptainPos({ x, y });
    }, []);

    // ===================
    // POWER-UP SPAWNING
    // ===================
    const spawnPowerUp = useCallback(() => {
        if (powerUps.length >= 2) return;

        const typeData = POWER_UP_TYPES[Math.floor(Math.random() * POWER_UP_TYPES.length)];
        const newPowerUp = {
            id: Date.now() + Math.random(),
            x: 20 + Math.random() * 60,
            y: 20 + Math.random() * 60,
            ...typeData,
            expiresAt: Date.now() + 4000
        };

        setPowerUps(prev => [...prev, newPowerUp]);

        // Auto-expire after 4s
        setTimeout(() => {
            setPowerUps(prev => prev.filter(p => p.id !== newPowerUp.id));
        }, 4000);
    }, [powerUps.length]);

    // ===================
    // HANDLE CAPTAIN CLICK
    // ===================
    const handleCaptainClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (gameState !== 'playing') return;

        // Debounce rapid clicks
        const now = Date.now();
        if (now - lastClickTimeRef.current < 40) return;
        lastClickTimeRef.current = now;

        // Calculate points
        let points = 1;
        let isCritical = Math.random() < 0.1; // 10% crit chance

        if (isCritical) {
            points = 5;
            setCriticalHit(true);
            triggerHaptic([20, 30, 20]);
            playSound('critical');
            setTimeout(() => setCriticalHit(false), 250);
        } else {
            triggerHaptic(8);
            playSound('tap');
        }

        // Apply multipliers
        if (activePowerUp === 'double') points *= 2;
        if (frenzyMode) points *= 2;

        // Update score
        setScore(prev => prev + points);
        playSound('score', { debounce: 50 });

        // Update combo
        setCombo(prev => {
            const newCombo = prev + 1;
            setMaxCombo(m => Math.max(m, newCombo));

            // Frenzy mode at 5 combo
            if (newCombo >= 5 && !frenzyMode) {
                setFrenzyMode(true);
                triggerHaptic([30, 20, 30, 20, 50]);
                playSound('frenzy');
                addClickEffect(50, 30, '🔥 FRENZY MODE!', 'text-orange-400', 'text-3xl');
            }

            return newCombo;
        });

        // Reset combo timer
        if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
        comboTimeoutRef.current = setTimeout(() => {
            setCombo(0);
            setFrenzyMode(false);
        }, 1200);

        // Visual feedback
        const effectColor = isCritical ? 'text-yellow-300' : frenzyMode ? 'text-orange-400' : 'text-green-400';
        const effectText = isCritical ? `💥 CRIT +${points}!` : `+${points}`;
        addClickEffect(captainPos.x, captainPos.y - 5, effectText, effectColor);

        // Screen effects
        triggerScreenShake();
        triggerFlash(isCritical ? 'yellow' : 'green');

        // Move captain (unless frozen)
        if (!frozenRef.current) {
            moveCaptain();
        }
    }, [gameState, activePowerUp, frenzyMode, captainPos, moveCaptain, addClickEffect]);

    // ===================
    // HANDLE MISS (BACKGROUND CLICK)
    // ===================
    const handleBackgroundClick = useCallback((e) => {
        if (gameState !== 'playing') return;

        // Only register as miss if clicking the actual background
        const target = e.target;
        const isBackground = target === containerRef.current ||
            target.classList.contains('game-background');

        if (!isBackground) return;

        // Break combo on miss
        if (combo > 0) {
            setCombo(0);
            setFrenzyMode(false);
            triggerFlash('red');
            playSound('wrong');
            triggerHaptic(50);

            // Calculate click position for effect
            const rect = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            addClickEffect(x, y, '❌ MISS!', 'text-red-500', 'text-xl');
        }
    }, [gameState, combo, addClickEffect]);

    // ===================
    // HANDLE POWER-UP CLICK
    // ===================
    const handlePowerUpClick = useCallback((powerUp, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (gameState !== 'playing') return;

        // Remove this power-up
        setPowerUps(prev => prev.filter(p => p.id !== powerUp.id));

        // Show collection effect
        addClickEffect(powerUp.x, powerUp.y, `${powerUp.emoji} ${powerUp.label}!`, 'text-cyan-300', 'text-xl');
        triggerHaptic([15, 30, 15]);
        playSound('powerUp');

        // Apply power-up effect based on TYPE (not id!)
        setActivePowerUp(powerUp.type);
        setPowerUpTimer(powerUp.duration);

        if (powerUp.type === 'freeze') {
            setIsFrozen(true);
            setTimeout(() => {
                setIsFrozen(false);
                setActivePowerUp(prev => prev === 'freeze' ? null : prev);
            }, powerUp.duration);
        } else if (powerUp.type === 'double') {
            setTimeout(() => {
                setActivePowerUp(prev => prev === 'double' ? null : prev);
            }, powerUp.duration);
        } else if (powerUp.type === 'grow') {
            setCaptainScale(1.6);
            setTimeout(() => {
                setCaptainScale(1);
                setActivePowerUp(prev => prev === 'grow' ? null : prev);
            }, powerUp.duration);
        }
    }, [gameState, addClickEffect]);

    // ===================
    // START GAME
    // ===================
    const startGame = useCallback(() => {
        if (gameState === 'playing') return;

        // Play start sound
        playSound('start');

        // Reset state
        setGameState('playing');
        setScore(0);
        scoreRef.current = 0;
        setTimeLeft(30);
        setCombo(0);
        setMaxCombo(0);
        setFrenzyMode(false);
        setPowerUps([]);
        setActivePowerUp(null);
        setIsFrozen(false);
        frozenRef.current = false;
        setCaptainScale(1);
        setMoveInterval(1200);
        setClickEffects([]);
        setIsNewHighScore(false);

        // Initial position
        moveCaptain();

        // Start game loop
        let lastMoveTime = 0;
        let lastSpawnCheck = 0;
        let currentMoveInterval = 1200;

        const loop = (timestamp) => {
            if (gameState === 'finished') return;

            // Captain movement
            if (!frozenRef.current && timestamp - lastMoveTime > currentMoveInterval) {
                moveCaptain();
                lastMoveTime = timestamp;
            }

            // Power-up spawning (check every 5s after 8s mark)
            const elapsed = timestamp / 1000;
            if (elapsed > 8 && timestamp - lastSpawnCheck > 5000) {
                if (Math.random() < 0.6) { // 60% chance to spawn
                    spawnPowerUp();
                }
                lastSpawnCheck = timestamp;
            }

            gameLoopRef.current = requestAnimationFrame(loop);
        };

        gameLoopRef.current = requestAnimationFrame(loop);

        // Game timer
        const timerInterval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerInterval);
                    endGame();
                    return 0;
                }

                // Difficulty progression
                const remaining = prev - 1;
                if (remaining === 22) {
                    currentMoveInterval = 1000;
                    setMoveInterval(1000);
                } else if (remaining === 15) {
                    currentMoveInterval = 800;
                    setMoveInterval(800);
                    setCaptainScale(s => Math.min(s, 0.9));
                } else if (remaining === 8) {
                    currentMoveInterval = 600;
                    setMoveInterval(600);
                    setCaptainScale(s => Math.min(s, 0.8));
                }

                return remaining;
            });
        }, 1000);

        // Store interval for cleanup
        return () => clearInterval(timerInterval);
    }, [gameState, moveCaptain, spawnPowerUp]);

    // ===================
    // END GAME
    // ===================
    const endGame = useCallback(() => {
        if (gameLoopRef.current) {
            cancelAnimationFrame(gameLoopRef.current);
        }

        setGameState('finished');

        const finalScore = scoreRef.current;

        // Check high score
        if (finalScore > highScore) {
            setIsNewHighScore(true);
            setHighScore(finalScore);
            playSound('highScore');
            try {
                localStorage.setItem('captainClickHighScore', finalScore.toString());
            } catch { }

            // Big celebration
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#fbbf24', '#f59e0b', '#06b6d4', '#a855f7']
                });
            }, 200);
        } else if (finalScore >= 40) {
            playSound('gameOver');
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#06b6d4', '#3b82f6']
            });
        } else {
            playSound('gameOver');
        }

        // Submit score
        api.submitScore?.('clicker', finalScore)?.catch(err => {
            console.error('Failed to submit score:', err);
        });
    }, [highScore]);

    // ===================
    // CLEANUP
    // ===================
    useEffect(() => {
        return () => {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
        };
    }, []);

    // ===================
    // SHARE
    // ===================
    const shareScore = () => {
        const tier = getScoreTier(score);
        const text = `${tier.label.split(' ')[0]} I scored ${score} points in Tap Blitz!\n\nMax combo: ${maxCombo}x! Think you can beat me? 🎮\n\nPlay free: AgenticAIHome.com/games`;

        if (navigator.share) {
            navigator.share({ title: 'Tap Blitz Challenge', text }).catch(() => { });
        } else {
            navigator.clipboard?.writeText(text).then(() => {
                alert('Challenge copied! Paste it anywhere to challenge a friend.');
            }).catch(() => { });
        }
    };

    // ===================
    // SCORE TIER CALCULATION
    // ===================
    const getScoreTier = (s) => {
        if (s >= 60) return { label: '👑 LEGENDARY!', color: 'text-yellow-400', bg: 'bg-yellow-500/20', sub: 'Absolute efficiency master!' };
        if (s >= 45) return { label: '💎 Amazing!', color: 'text-purple-400', bg: 'bg-purple-500/20', sub: 'Top tier performance!' };
        if (s >= 35) return { label: '⭐ Excellent!', color: 'text-cyan-400', bg: 'bg-cyan-500/20', sub: 'Really impressive!' };
        if (s >= 25) return { label: '🎯 Good Job!', color: 'text-green-400', bg: 'bg-green-500/20', sub: 'Solid clicking skills!' };
        if (s >= 15) return { label: '☕ Warming Up', color: 'text-slate-300', bg: 'bg-slate-500/20', sub: 'Keep practicing!' };
        return { label: '😴 Sleepy Start', color: 'text-slate-300', bg: 'bg-slate-700/20', sub: 'More coffee needed!' };
    };

    const scoreTier = getScoreTier(score);
    const comboPercent = Math.min((combo / 5) * 100, 100);

    // Captain base size (responsive)
    const baseCaptainSize = 'w-16 h-16 sm:w-20 sm:h-20';

    return (
        <div
            className={`w-full max-w-2xl mx-auto bg-slate-900/95 border-2 rounded-2xl overflow-hidden shadow-2xl relative backdrop-blur-sm transition-all duration-150
                ${frenzyMode ? 'border-orange-500 shadow-orange-500/30' : 'border-cyan-500/30'}
                ${criticalHit ? 'ring-4 ring-yellow-400/70' : ''}
                ${screenShake ? 'animate-shake' : ''}
            `}
        >
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0) rotate(0); }
                    20% { transform: translateX(-3px) rotate(-0.5deg); }
                    40% { transform: translateX(3px) rotate(0.5deg); }
                    60% { transform: translateX(-2px) rotate(-0.3deg); }
                    80% { transform: translateX(2px) rotate(0.3deg); }
                }
                .animate-shake {
                    animation: shake 0.1s ease-in-out;
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
                    50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8); }
                }
                .frenzy-glow {
                    animation: pulse-glow 0.3s ease-in-out infinite;
                }
            `}</style>

            {/* HUD */}
            <div className="bg-slate-800/95 p-3 sm:p-4 border-b border-slate-600 backdrop-blur-xl">
                <div className="flex justify-between items-center gap-2">
                    {/* Score & Time */}
                    <div className="flex items-center gap-3 sm:gap-5">
                        <div className="text-center">
                            <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider">Score</div>
                            <m.div
                                key={score}
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                                className="text-xl sm:text-2xl font-black text-orange-400 font-mono"
                            >
                                {score}
                            </m.div>
                        </div>
                        <div className="text-center">
                            <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider">Best</div>
                            <div className="text-lg sm:text-xl font-bold text-cyan-400 font-mono">{highScore}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider">Time</div>
                            <div className={`text-lg sm:text-xl font-bold font-mono ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                                {timeLeft}s
                            </div>
                        </div>
                    </div>

                    {/* Sound Toggle & Combo Meter */}
                    <div className="flex items-center gap-3">
                        <SoundToggle />
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 mb-1">
                                {frenzyMode && <Flame className="w-4 h-4 text-orange-500 animate-pulse" />}
                                <span className={`text-[10px] sm:text-xs font-bold uppercase ${frenzyMode ? 'text-orange-400' : 'text-slate-300'}`}>
                                    {frenzyMode ? 'FRENZY x2!' : `Combo ${combo}`}
                                </span>
                            </div>
                            <div className="w-20 sm:w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                                <m.div
                                    className={`h-full rounded-full ${frenzyMode
                                        ? 'bg-gradient-to-r from-orange-500 to-yellow-400'
                                        : 'bg-gradient-to-r from-cyan-500 to-cyan-400'
                                        }`}
                                    animate={{ width: `${comboPercent}%` }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Power-up Indicator */}
                <AnimatePresence>
                    {activePowerUp && (
                        <m.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-2 flex justify-center"
                        >
                            <div className="px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/50 flex items-center gap-2">
                                <span className="text-sm">
                                    {POWER_UP_TYPES.find(p => p.type === activePowerUp)?.emoji}
                                </span>
                                <span className="text-xs text-cyan-300 font-bold">
                                    {POWER_UP_TYPES.find(p => p.type === activePowerUp)?.label} Active
                                </span>
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Game Area */}
            <div
                ref={containerRef}
                onClick={handleBackgroundClick}
                onTouchStart={(e) => {
                    // Let touch events through, but handle background taps
                    if (e.target === containerRef.current || e.target.classList.contains('game-background')) {
                        handleBackgroundClick(e);
                    }
                }}
                className={`game-background relative w-full aspect-[4/3] sm:aspect-[3/2] min-h-[280px] max-h-[400px] overflow-hidden touch-none
                    ${frenzyMode
                        ? 'bg-gradient-to-br from-slate-900 via-orange-950/30 to-slate-900'
                        : 'bg-gradient-to-br from-[#0a0a14] via-[#0c1424] to-[#0a0a14]'
                    }
                `}
                style={{ cursor: gameState === 'playing' ? 'crosshair' : 'default' }}
            >
                {/* Flash overlay */}
                <AnimatePresence>
                    {flashColor && (
                        <m.div
                            initial={{ opacity: 0.4 }}
                            animate={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.08 }}
                            className={`absolute inset-0 z-50 pointer-events-none
                                ${flashColor === 'green' ? 'bg-green-400' : ''}
                                ${flashColor === 'red' ? 'bg-red-500' : ''}
                                ${flashColor === 'yellow' ? 'bg-yellow-400' : ''}
                            `}
                        />
                    )}
                </AnimatePresence>

                {/* Animated Grid Background */}
                <div
                    className={`game-background absolute inset-0 pointer-events-none transition-opacity duration-300 ${frenzyMode ? 'opacity-15' : 'opacity-8'
                        }`}
                    style={{
                        backgroundImage: `radial-gradient(${frenzyMode ? '#f59e0b' : '#06b6d4'} 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                    }}
                />

                {/* Start Screen */}
                <AnimatePresence>
                    {gameState === 'idle' && (
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-30 backdrop-blur-sm p-4"
                        >
                            <m.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-center w-full max-w-xs"
                            >
                                <m.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/40"
                                >
                                    <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                </m.div>

                                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Tap Blitz</h3>
                                <p className="text-slate-300 mb-4 text-sm">
                                    Tap Captain Efficiency before he escapes! Speed = efficiency.
                                </p>

                                <div className="flex flex-wrap justify-center gap-2 mb-4 text-[10px] sm:text-xs">
                                    <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">🔥 5 hits = FRENZY</span>
                                    <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">💥 10% crit chance</span>
                                    <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full">❌ Miss = combo reset</span>
                                </div>

                                {highScore > 0 && (
                                    <div className="mb-4 text-sm text-cyan-400 flex items-center justify-center gap-2">
                                        <Trophy size={16} /> Best: {highScore}
                                    </div>
                                )}

                                <m.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={startGame}
                                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 active:from-orange-700 active:to-orange-600 text-white px-8 py-4 rounded-xl font-black text-lg shadow-lg shadow-orange-900/50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Play size={22} fill="white" /> TAP TO START
                                </m.button>
                            </m.div>
                        </m.div>
                    )}
                </AnimatePresence>

                {/* End Screen */}
                <AnimatePresence>
                    {gameState === 'finished' && (
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30 backdrop-blur-sm p-4"
                        >
                            <m.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="text-center w-full max-w-xs"
                            >
                                {isNewHighScore ? (
                                    <>
                                        <m.div
                                            animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.4 }}
                                            className="text-5xl mb-2"
                                        >
                                            🏆
                                        </m.div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-yellow-400 mb-1">NEW HIGH SCORE!</h2>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-4xl sm:text-5xl mb-2">{scoreTier.label.split(' ')[0]}</div>
                                        <h2 className={`text-xl sm:text-2xl font-black ${scoreTier.color} mb-1`}>
                                            {scoreTier.label.split(' ').slice(1).join(' ')}
                                        </h2>
                                    </>
                                )}
                                <p className="text-slate-300 text-sm mb-4">{scoreTier.sub}</p>

                                <div className={`${scoreTier.bg} rounded-2xl p-4 mb-4`}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-slate-300 uppercase">Score</div>
                                            <div className="text-3xl sm:text-4xl font-black text-orange-400">{score}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-300 uppercase">Max Combo</div>
                                            <div className="text-3xl sm:text-4xl font-black text-cyan-400">{maxCombo}</div>
                                        </div>
                                    </div>
                                    {!isNewHighScore && score > 0 && (
                                        <div className="text-xs text-slate-300 mt-2">
                                            {highScore - score > 0 ? `${highScore - score} away from best` : 'Tied with best!'}
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3 justify-center">
                                    <m.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onBack}
                                        className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white px-4 sm:px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-sm sm:text-base"
                                    >
                                        <ArrowLeft size={18} /> Back
                                    </m.button>
                                    <m.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={startGame}
                                        className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 active:from-orange-700 active:to-orange-600 text-white px-5 sm:px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base"
                                    >
                                        <RotateCcw size={18} /> Again
                                    </m.button>
                                </div>

                                {/* PROMINENT SHARE / CHALLENGE SECTION */}
                                <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/40 rounded-xl p-3 mt-4">
                                    <p className="text-orange-300 text-xs font-medium mb-2 text-center">
                                        📸 Screenshot this → Challenge a friend!
                                    </p>
                                    <button
                                        onClick={shareScore}
                                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <Share2 size={16} />
                                        Challenge a Friend
                                    </button>
                                </div>

                                <p className="text-slate-500 text-xs text-center mt-2">
                                    Think they can beat {score}? 😏
                                </p>
                            </m.div>
                        </m.div>
                    )}
                </AnimatePresence>

                {/* The Captain - Now with SVG fallback */}
                <AnimatePresence>
                    {gameState === 'playing' && (
                        <m.div
                            key="captain"
                            animate={{
                                left: `${captainPos.x}%`,
                                top: `${captainPos.y}%`,
                                scale: captainScale,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: isFrozen ? 0 : 350,
                                damping: 25,
                            }}
                            className="absolute z-10"
                            style={{
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <m.div
                                animate={{
                                    rotate: isFrozen ? 0 : [0, 3, -3, 0],
                                }}
                                transition={{
                                    rotate: { repeat: Infinity, duration: 0.4 },
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.85 }}
                                onClick={handleCaptainClick}
                                onTouchStart={(e) => {
                                    e.preventDefault();
                                    handleCaptainClick(e);
                                }}
                                className={`${baseCaptainSize} rounded-full cursor-pointer select-none touch-none
                                    ${frenzyMode ? 'frenzy-glow' : 'shadow-xl shadow-orange-500/50'}
                                    ${isFrozen ? 'shadow-cyan-400/70' : ''}
                                `}
                                style={{
                                    background: isFrozen
                                        ? 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
                                        : 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)',
                                    border: '3px solid rgba(255,255,255,0.3)',
                                }}
                            >
                                {/* Captain face/icon */}
                                <div className="w-full h-full flex items-center justify-center relative">
                                    <Zap
                                        className={`w-8 h-8 sm:w-10 sm:h-10 ${isFrozen ? 'text-white' : 'text-white'}`}
                                        strokeWidth={2.5}
                                        fill={isFrozen ? '#06b6d4' : '#fbbf24'}
                                    />
                                    {/* Frozen overlay */}
                                    {isFrozen && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-2xl sm:text-3xl">❄️</span>
                                        </div>
                                    )}
                                </div>
                            </m.div>
                        </m.div>
                    )}
                </AnimatePresence>

                {/* Power-ups */}
                <AnimatePresence>
                    {powerUps.map((powerUp) => (
                        <m.button
                            key={powerUp.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: 1,
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                                scale: { repeat: Infinity, duration: 0.8 },
                            }}
                            onClick={(e) => handlePowerUpClick(powerUp, e)}
                            onTouchStart={(e) => {
                                e.preventDefault();
                                handlePowerUpClick(powerUp, e);
                            }}
                            className={`absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${powerUp.color} text-white flex items-center justify-center text-lg sm:text-xl shadow-xl z-20 border-2 border-white/40 touch-none`}
                            style={{
                                left: `${powerUp.x}%`,
                                top: `${powerUp.y}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            {powerUp.emoji}
                        </m.button>
                    ))}
                </AnimatePresence>

                {/* Click Effects */}
                <AnimatePresence>
                    {clickEffects.map((effect) => (
                        <m.div
                            key={effect.id}
                            initial={{ opacity: 1, scale: 1, y: 0 }}
                            animate={{ opacity: 0, scale: 1.4, y: -35 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className={`absolute font-black pointer-events-none z-40 ${effect.color} ${effect.size}`}
                            style={{
                                left: `${effect.x}%`,
                                top: `${effect.y}%`,
                                transform: 'translate(-50%, -50%)',
                                textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                            }}
                        >
                            {effect.text}
                        </m.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Footer tip */}
            {gameState === 'playing' && (
                <div className="bg-slate-800/50 px-3 py-2 text-center border-t border-slate-600/50">
                    <p className="text-[10px] sm:text-xs text-slate-300">
                        🎯 Hit 5 in a row for <span className="text-orange-400 font-bold">FRENZY MODE</span> • Collect power-ups • Don't miss!
                    </p>
                </div>
            )}
        </div>
    );
};

export default CaptainClickChallenge;