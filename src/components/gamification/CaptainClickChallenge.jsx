import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Clock, Trophy, Play, RotateCcw, ArrowLeft, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';

const CaptainClickChallenge = ({ onBack }) => {
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
    const [captainPos, setCaptainPos] = useState({ x: 50, y: 50 });
    const [clickEffects, setClickEffects] = useState([]);
    const [powerUps, setPowerUps] = useState([]);
    const [activePowerUp, setActivePowerUp] = useState(null);
    const [moveSpeed, setMoveSpeed] = useState(1200);
    const [captainSize, setCaptainSize] = useState(112); // px
    const [screenShake, setScreenShake] = useState(false);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [frenzyMode, setFrenzyMode] = useState(false);
    const [isFrozen, setIsFrozen] = useState(false);
    const [criticalHit, setCriticalHit] = useState(false);
    const [missFlash, setMissFlash] = useState(false);

    const containerRef = useRef(null);
    const timerRef = useRef(null);
    const moveIntervalRef = useRef(null);
    const comboTimerRef = useRef(null);
    const lastClickTime = useRef(0);

    const powerUpTypes = [
        { id: 'freeze', label: '❄️ Freeze', color: 'bg-cyan-400', effect: 'Stops Captain for 3s' },
        { id: 'double', label: '💎 Double', color: 'bg-purple-500', effect: 'x2 points per click' },
        { id: 'grow', label: '🎯 Big Target', color: 'bg-green-500', effect: 'Captain grows larger' },
    ];

    const moveCaptain = useCallback(() => {
        if (isFrozen) return;
        const x = Math.floor(Math.random() * 65) + 18;
        const y = Math.floor(Math.random() * 65) + 18;
        setCaptainPos({ x, y });
    }, [isFrozen]);

    const spawnPowerUp = useCallback(() => {
        if (powerUps.length >= 2) return;
        const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        const newPowerUp = {
            id: Date.now(),
            x: Math.floor(Math.random() * 60) + 20,
            y: Math.floor(Math.random() * 60) + 20,
            ...type
        };
        setPowerUps(prev => [...prev, newPowerUp]);

        // Power-up expires after 4s if not collected
        setTimeout(() => {
            setPowerUps(prev => prev.filter(p => p.id !== newPowerUp.id));
        }, 4000);
    }, [powerUps.length]);

    const addClickEffect = (x, y, text, color = 'text-green-400') => {
        const effect = { id: Date.now() + Math.random(), x, y, text, color };
        setClickEffects(prev => [...prev, effect]);
        setTimeout(() => {
            setClickEffects(prev => prev.filter(e => e.id !== effect.id));
        }, 600);
    };

    const handleCaptainClick = (e) => {
        e.stopPropagation();
        if (gameState !== 'playing') return;

        // Prevent double-clicks registering
        const now = Date.now();
        if (now - lastClickTime.current < 50) return;
        lastClickTime.current = now;

        // Calculate points
        let points = 1;
        let isCritical = Math.random() < 0.08; // 8% crit chance

        if (isCritical) {
            points = 5;
            setCriticalHit(true);
            setTimeout(() => setCriticalHit(false), 300);
        }

        if (activePowerUp === 'double') points *= 2;
        if (frenzyMode) points *= 2;

        setScore(prev => prev + points);
        setCombo(prev => {
            const newCombo = prev + 1;
            setMaxCombo(m => Math.max(m, newCombo));
            return newCombo;
        });

        // Reset combo timer
        if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
        comboTimerRef.current = setTimeout(() => setCombo(0), 1500);

        // Visual feedback
        const effectColor = isCritical ? 'text-yellow-300' : frenzyMode ? 'text-orange-400' : 'text-green-400';
        const effectText = isCritical ? `CRIT +${points}!` : `+${points}`;
        addClickEffect(captainPos.x, captainPos.y, effectText, effectColor);

        // Screen shake
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 80);

        // Move captain immediately after click
        if (!isFrozen) moveCaptain();
    };

    const handleMissClick = (e) => {
        if (gameState !== 'playing') return;
        if (e.target !== containerRef.current) return; // Only count clicks on background

        // Break combo on miss
        if (combo > 0) {
            setCombo(0);
            setMissFlash(true);
            setTimeout(() => setMissFlash(false), 200);
            addClickEffect(
                (e.nativeEvent.offsetX / containerRef.current.offsetWidth) * 100,
                (e.nativeEvent.offsetY / containerRef.current.offsetHeight) * 100,
                'MISS!',
                'text-red-500'
            );
        }
    };

    const handlePowerUpClick = (powerUp, e) => {
        e.stopPropagation();
        if (gameState !== 'playing') return;

        setPowerUps(prev => prev.filter(p => p.id !== powerUp.id));
        addClickEffect(powerUp.x, powerUp.y, powerUp.label, 'text-cyan-300');

        if (powerUp.id === 'freeze') {
            setIsFrozen(true);
            setActivePowerUp('freeze');
            setTimeout(() => {
                setIsFrozen(false);
                setActivePowerUp(null);
            }, 3000);
        } else if (powerUp.id === 'double') {
            setActivePowerUp('double');
            setTimeout(() => setActivePowerUp(null), 5000);
        } else if (powerUp.id === 'grow') {
            setCaptainSize(160);
            setActivePowerUp('grow');
            setTimeout(() => {
                setCaptainSize(s => Math.max(70, s - 50)); // Restore but account for time shrink
                setActivePowerUp(null);
            }, 4000);
        }
    };

    const startGame = () => {
        if (gameState === 'playing') return;

        // Reset everything
        setGameState('playing');
        setScore(0);
        setTimeLeft(30);
        setPowerUps([]);
        setActivePowerUp(null);
        setMoveSpeed(1200);
        setCaptainSize(112);
        setCombo(0);
        setMaxCombo(0);
        setFrenzyMode(false);
        setIsFrozen(false);
        setClickEffects([]);
        moveCaptain();

        // Game timer
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Captain auto-movement
        moveIntervalRef.current = setInterval(() => {
            if (!isFrozen) moveCaptain();
        }, moveSpeed);
    };

    const endGame = async () => {
        clearInterval(timerRef.current);
        clearInterval(moveIntervalRef.current);
        setGameState('finished');

        // Update high score
        if (score > highScore) {
            setHighScore(score);
            try {
                localStorage.setItem('captainClickHighScore', score.toString());
            } catch { }
        }

        // Submit score to backend
        try {
            await api.submitScore('clicker', score);
        } catch (err) {
            console.error('Failed to submit score:', err);
        }

        // Confetti based on score
        if (score >= 50) {
            confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 }, colors: ['#fbbf24', '#f59e0b', '#ffffff'] });
        } else if (score >= 35) {
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: ['#06b6d4', '#ffffff'] });
        }
    };

    // Combo / Frenzy Logic
    useEffect(() => {
        setFrenzyMode(combo >= 5);
    }, [combo]);

    // Difficulty progression - speed up and shrink
    useEffect(() => {
        if (gameState !== 'playing') return;

        const progressionTimers = [
            setTimeout(() => { setMoveSpeed(1000); setCaptainSize(100); }, 8000),
            setTimeout(() => { setMoveSpeed(850); setCaptainSize(90); spawnPowerUp(); }, 12000),
            setTimeout(() => { setMoveSpeed(700); setCaptainSize(80); }, 18000),
            setTimeout(() => { spawnPowerUp(); }, 22000),
            setTimeout(() => { setMoveSpeed(550); setCaptainSize(70); }, 25000),
        ];

        return () => progressionTimers.forEach(t => clearTimeout(t));
    }, [gameState, spawnPowerUp]);

    // Update movement interval when speed changes
    useEffect(() => {
        if (gameState !== 'playing') return;
        clearInterval(moveIntervalRef.current);
        moveIntervalRef.current = setInterval(() => {
            moveCaptain();
        }, moveSpeed);
        return () => clearInterval(moveIntervalRef.current);
    }, [moveSpeed, gameState, moveCaptain]);

    // Freeze effect - pause movement
    useEffect(() => {
        if (isFrozen && moveIntervalRef.current) {
            clearInterval(moveIntervalRef.current);
        }
    }, [isFrozen]);

    // Cleanup
    useEffect(() => {
        return () => {
            clearInterval(timerRef.current);
            clearInterval(moveIntervalRef.current);
            clearTimeout(comboTimerRef.current);
        };
    }, []);

    const getScoreTier = (s) => {
        if (s >= 50) return { label: '🏆 LEGENDARY!', color: 'text-yellow-400', sub: 'You are the efficiency master!' };
        if (s >= 35) return { label: '⭐ Excellent!', color: 'text-cyan-400', sub: 'Almost legendary status!' };
        if (s >= 25) return { label: '👍 Good Job!', color: 'text-green-400', sub: 'Keep practicing!' };
        if (s >= 15) return { label: '☕ Warming Up', color: 'text-slate-300', sub: 'You can do better!' };
        return { label: '😴 Sleepy Start', color: 'text-slate-500', sub: 'More coffee needed!' };
    };

    const scoreTier = getScoreTier(score);
    const comboPercent = Math.min((combo / 5) * 100, 100);

    return (
        <div className={`w-full max-w-2xl mx-auto bg-slate-900/90 border-2 rounded-2xl overflow-hidden shadow-2xl relative min-h-[420px] backdrop-blur-sm transition-all duration-300
            ${frenzyMode ? 'border-orange-500 shadow-orange-500/40' : 'border-cyan-500/30'}
            ${criticalHit ? 'ring-4 ring-yellow-400' : ''}
            ${missFlash ? 'ring-4 ring-red-500' : ''}
        `}>
            {/* HUD */}
            <div className="bg-slate-800/95 p-4 flex flex-wrap justify-between items-center border-b border-slate-700 z-20 relative backdrop-blur-xl gap-2">
                <div className="flex items-center gap-4 md:gap-6 flex-wrap">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Score</span>
                        <span className="text-orange-400 font-black font-mono text-2xl leading-none">{score}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Best</span>
                        <span className="text-cyan-400 font-bold font-mono text-lg leading-none">{highScore}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Time</span>
                        <span className={`font-bold font-mono text-xl leading-none ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-slate-200'}`}>
                            {timeLeft}s
                        </span>
                    </div>
                </div>

                {/* Combo Meter */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                            {frenzyMode && <Flame className="w-4 h-4 text-orange-500 animate-pulse" />}
                            <span className={`text-xs font-bold uppercase tracking-wider ${frenzyMode ? 'text-orange-400' : 'text-slate-500'}`}>
                                {frenzyMode ? 'FRENZY x2!' : `Combo ${combo}`}
                            </span>
                        </div>
                        <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden mt-1">
                            <motion.div
                                className={`h-full rounded-full ${frenzyMode ? 'bg-gradient-to-r from-orange-500 to-yellow-400' : 'bg-cyan-500'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${comboPercent}%` }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                        </div>
                    </div>
                    {activePowerUp && (
                        <div className="px-2 py-1 bg-cyan-500/20 rounded-lg border border-cyan-500/50">
                            <span className="text-xs text-cyan-300 font-bold animate-pulse">
                                {powerUpTypes.find(p => p.id === activePowerUp)?.label}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Game Area */}
            <div
                ref={containerRef}
                onClick={handleMissClick}
                className={`relative h-[340px] overflow-hidden cursor-crosshair transition-transform duration-75
                    ${screenShake ? 'translate-x-1' : ''}
                    ${frenzyMode ? 'bg-gradient-to-br from-slate-900 via-orange-950/20 to-slate-900' : 'bg-[#0a0a12]'}
                `}
            >
                {/* Animated Grid Background */}
                <div
                    className={`absolute inset-0 transition-opacity duration-500 ${frenzyMode ? 'opacity-20' : 'opacity-10'}`}
                    style={{
                        backgroundImage: `linear-gradient(${frenzyMode ? '#f59e0b' : '#06b6d4'} 1px, transparent 1px), linear-gradient(90deg, ${frenzyMode ? '#f59e0b' : '#06b6d4'} 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Start/End Overlay */}
                <AnimatePresence>
                    {gameState !== 'playing' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-30 backdrop-blur-sm text-center p-6"
                        >
                            {gameState === 'finished' ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-full max-w-sm"
                                >
                                    <Trophy className={`w-16 h-16 mx-auto mb-3 ${score >= 50 ? 'text-yellow-400' : 'text-cyan-400'}`} />
                                    <h2 className={`text-3xl font-black mb-1 ${scoreTier.color}`}>
                                        {scoreTier.label}
                                    </h2>
                                    <p className="text-slate-400 text-sm mb-4">{scoreTier.sub}</p>

                                    <div className="grid grid-cols-2 gap-3 mb-6 text-center">
                                        <div className="bg-slate-800/80 rounded-xl p-3">
                                            <div className="text-2xl font-black text-orange-400">{score}</div>
                                            <div className="text-xs text-slate-500 uppercase">Final Score</div>
                                        </div>
                                        <div className="bg-slate-800/80 rounded-xl p-3">
                                            <div className="text-2xl font-black text-cyan-400">{maxCombo}</div>
                                            <div className="text-xs text-slate-500 uppercase">Max Combo</div>
                                        </div>
                                    </div>

                                    {score > highScore - score && score <= highScore && (
                                        <p className="text-yellow-400 text-sm mb-4 animate-pulse">
                                            🎯 {highScore - score === 0 ? 'NEW HIGH SCORE!' : `${highScore - score} away from your best!`}
                                        </p>
                                    )}

                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={onBack}
                                            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-5 py-3 rounded-xl font-bold transition-all"
                                        >
                                            <ArrowLeft size={18} /> Back
                                        </button>
                                        <button
                                            onClick={startGame}
                                            className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-900/50 transition-all hover:scale-105"
                                        >
                                            <RotateCcw size={18} /> Again
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                >
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                                        <Target className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2">Captain Click Challenge</h3>
                                    <p className="text-slate-400 mb-1 text-sm">
                                        Click Captain Efficiency before he escapes!
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2 mb-5 text-xs">
                                        <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">🔥 5 combo = FRENZY</span>
                                        <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">💥 8% crit chance</span>
                                        <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full">❌ Miss = combo reset</span>
                                    </div>
                                    {highScore > 0 && (
                                        <p className="text-cyan-400 text-sm mb-4">Your best: {highScore} clicks</p>
                                    )}
                                    <button
                                        onClick={startGame}
                                        className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-900/50 transition-all hover:scale-105 mx-auto"
                                    >
                                        <Play size={20} /> START
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* The Captain */}
                <AnimatePresence>
                    {gameState === 'playing' && (
                        <motion.div
                            key="captain-wrapper"
                            animate={{
                                left: `${captainPos.x}%`,
                                top: `${captainPos.y}%`,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: isFrozen ? 0 : 400,
                                damping: 25,
                                mass: 0.8
                            }}
                            className="absolute z-10"
                            style={{ transform: 'translate(-50%, -50%)' }}
                        >
                            <motion.img
                                src="/assets/captain-efficiency-dark-transparent.png"
                                alt="Captain Efficiency"
                                animate={{
                                    scale: frenzyMode ? [1, 1.08, 1] : 1,
                                    rotate: isFrozen ? 0 : [0, 3, -3, 0],
                                    filter: isFrozen ? 'brightness(1.5) hue-rotate(180deg)' : frenzyMode ? 'brightness(1.3)' : 'brightness(1)'
                                }}
                                transition={{
                                    scale: { repeat: Infinity, duration: 0.3 },
                                    rotate: { repeat: Infinity, duration: 0.5 }
                                }}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleCaptainClick}
                                className={`cursor-pointer select-none drop-shadow-[0_0_25px_rgba(251,191,36,0.7)] transition-all duration-200
                                    ${isFrozen ? 'drop-shadow-[0_0_30px_rgba(6,182,212,0.9)]' : ''}
                                `}
                                style={{
                                    width: `${captainSize}px`,
                                    height: 'auto',
                                    pointerEvents: 'auto'
                                }}
                                draggable="false"
                            />
                            {isFrozen && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-4xl animate-pulse">❄️</span>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Power-ups */}
                <AnimatePresence>
                    {powerUps.map((powerUp) => (
                        <motion.button
                            key={powerUp.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: 1,
                                rotate: [0, 5, -5, 0]
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                                scale: { repeat: Infinity, duration: 1 },
                                rotate: { repeat: Infinity, duration: 2 }
                            }}
                            onClick={(e) => handlePowerUpClick(powerUp, e)}
                            className={`absolute w-12 h-12 rounded-full ${powerUp.color} text-white flex items-center justify-center text-xl shadow-xl cursor-pointer z-20 hover:scale-125 transition-transform border-2 border-white/30`}
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

                {/* Click Effects */}
                <AnimatePresence>
                    {clickEffects.map((effect) => (
                        <motion.div
                            key={effect.id}
                            initial={{ opacity: 1, scale: 1, y: 0 }}
                            animate={{ opacity: 0, scale: 1.5, y: -30 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className={`absolute font-black text-2xl pointer-events-none z-30 ${effect.color}`}
                            style={{
                                left: `${effect.x}%`,
                                top: `${effect.y}%`,
                                transform: 'translate(-50%, -50%)',
                                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                            }}
                        >
                            {effect.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Footer Tips */}
            {gameState === 'playing' && (
                <div className="bg-slate-800/50 px-4 py-2 text-center border-t border-slate-700/50">
                    <p className="text-xs text-slate-500">
                        💡 Chain 5 clicks for <span className="text-orange-400">Frenzy Mode</span> • Collect power-ups • Don't miss!
                    </p>
                </div>
            )}
        </div>
    );
};

export default CaptainClickChallenge;
