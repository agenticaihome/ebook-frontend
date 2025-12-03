import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Share2, ArrowLeft, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';

const FocusFury = ({ onBack }) => {
    // Game state
    const [gameState, setGameState] = useState('idle'); // idle, playing, dead
    const [kills, setKills] = useState(0);
    const [bestKills, setBestKills] = useState(() => {
        try { return parseInt(localStorage.getItem('focusfury_best') || '0', 10); }
        catch { return 0; }
    });
    const [isNewBest, setIsNewBest] = useState(false);
    const [timer, setTimer] = useState(60);
    const [combo, setCombo] = useState(0);
    const [rank, setRank] = useState('Distracted');

    // Visual state
    const [beams, setBeams] = useState([]);
    const [distractions, setDistractions] = useState([]);
    const [particles, setParticles] = useState([]);
    const [screenShake, setScreenShake] = useState(false);
    const [flashColor, setFlashColor] = useState(null);
    const [slowMo, setSlowMo] = useState(false);

    // Refs
    const gameAreaRef = useRef(null);
    const animationFrameRef = useRef(null);
    const lastTimeRef = useRef(0);
    const gameStateRef = useRef('idle');
    const killsRef = useRef(0);
    const timerRef = useRef(60);
    const comboRef = useRef(0);
    const distractionsRef = useRef([]);
    const beamsRef = useRef([]);
    const particlesRef = useRef([]);
    const mousePosRef = useRef({ x: 50, y: 50 });
    const gameStartTimeRef = useRef(0);

    // Constants
    const GAME_DURATION = 60;
    const CENTER_X = 50;
    const CENTER_Y = 50;
    const CAPTAIN_SIZE = 10;
    const DISTRACTION_SIZE = 4;
    const BEAM_LIFETIME = 200;
    const PARTICLE_LIFETIME = 800;
    const SPAWN_RATE_BASE = 0.8;
    const SPAWN_RATE_INCREASE = 0.005;

    // Ranks - Updated for our theme
    const getRank = (k) => {
        if (k >= 300) return 'LEGENDARY FOCUS';
        if (k >= 250) return 'Zen Master';
        if (k >= 200) return 'Ultra Focus';
        if (k >= 150) return 'Flow State';
        if (k >= 100) return 'Locked In';
        if (k >= 50) return 'Aware';
        return 'Distracted';
    };

    const getRankColor = (r) => {
        const ranks = {
            'Distracted': 'text-slate-400',
            'Aware': 'text-blue-400',
            'Locked In': 'text-green-400',
            'Flow State': 'text-cyan-400',
            'Ultra Focus': 'text-purple-400',
            'Zen Master': 'text-yellow-400',
            'LEGENDARY FOCUS': 'text-orange-400'
        };
        return ranks[r] || 'text-slate-400';
    };

    // Haptics & Feedback
    const triggerHaptic = (pattern = 10) => {
        if (navigator.vibrate) navigator.vibrate(pattern);
    };

    const triggerScreenShake = () => {
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 100);
        triggerHaptic(50);
    };

    const triggerFlash = (color) => {
        setFlashColor(color);
        setTimeout(() => setFlashColor(null), 60);
    };

    const triggerSlowMo = () => {
        setSlowMo(true);
        setTimeout(() => setSlowMo(false), 500);
        triggerHaptic([15, 10, 15]);
    };

    // Spawn Distraction
    const spawnDistraction = useCallback(() => {
        const sides = [
            { x: Math.random() * 100, y: -5, vx: 0, vy: (2 + Math.random() * 3) },
            { x: 105, y: Math.random() * 100, vx: -(2 + Math.random() * 3), vy: 0 },
            { x: Math.random() * 100, y: 105, vx: 0, vy: -(2 + Math.random() * 3) },
            { x: -5, y: Math.random() * 100, vx: (2 + Math.random() * 3), vy: 0 }
        ];
        const side = sides[Math.floor(Math.random() * 4)];
        const types = ['📱', '📧', '💬', '🔔', '🎮', '📺', '🐦', '🍿'];
        const type = types[Math.floor(Math.random() * types.length)];

        distractionsRef.current.push({
            id: Date.now() + Math.random(),
            x: side.x,
            y: side.y,
            vx: side.vx,
            vy: side.vy,
            type,
            size: DISTRACTION_SIZE + Math.random() * 2
        });
    }, []);

    // Fire Beam
    const fireBeam = useCallback((endX, endY) => {
        const beam = {
            id: Date.now() + Math.random(),
            startX: CENTER_X,
            startY: CENTER_Y,
            endX,
            endY,
            life: BEAM_LIFETIME
        };
        beamsRef.current.push(beam);
        setBeams([...beamsRef.current]);
        setTimeout(() => {
            beamsRef.current = beamsRef.current.filter(b => b.id !== beam.id);
            setBeams([...beamsRef.current]);
        }, BEAM_LIFETIME);
    }, []);

    // Game Loop
    const gameLoop = useCallback((currentTime) => {
        if (gameStateRef.current !== 'playing') return;

        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;
        const dt = slowMo ? deltaTime * 0.3 : deltaTime;

        // Timer
        timerRef.current -= dt / 1000;
        setTimer(Math.max(0, Math.ceil(timerRef.current)));
        if (timerRef.current <= 0) {
            endGame();
            return;
        }

        // Spawn
        const spawnRate = SPAWN_RATE_BASE + (GAME_DURATION - timerRef.current) * SPAWN_RATE_INCREASE;
        if (Math.random() < spawnRate * (dt / 1000)) {
            spawnDistraction();
        }

        // Update distractions
        distractionsRef.current = distractionsRef.current.map(dist => {
            dist.x += dist.vx * (dt / 16);
            dist.y += dist.vy * (dt / 16);

            const dx = CENTER_X - dist.x;
            const dy = CENTER_Y - dist.y;
            const distToCenter = Math.sqrt(dx * dx + dy * dy);

            if (distToCenter < 8) {
                endGame();
                return dist;
            }

            const accel = 0.05;
            dist.vx += (dx / distToCenter) * accel;
            dist.vy += (dy / distToCenter) * accel;
            return dist;
        }).filter(dist => dist.x > -10 && dist.x < 110 && dist.y > -10 && dist.y < 110);

        // Update beams
        beamsRef.current.forEach(beam => beam.life -= dt);
        beamsRef.current = beamsRef.current.filter(b => b.life > 0);
        setBeams([...beamsRef.current]);

        // Update particles
        particlesRef.current = particlesRef.current.map(p => {
            p.x += p.vx * (dt / 16);
            p.y += p.vy * (dt / 16);
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.life -= dt;
            return p;
        }).filter(p => p.life > 0);
        setParticles([...particlesRef.current]);

        // Collision detection
        beamsRef.current.forEach(beam => {
            distractionsRef.current = distractionsRef.current.filter((dist, dIndex) => {
                const dx = dist.x - beam.startX;
                const dy = dist.y - beam.startY;
                const beamLen = Math.sqrt((beam.endX - beam.startX) ** 2 + (beam.endY - beam.startY) ** 2);
                const proj = Math.max(0, Math.min(beamLen, ((dx * (beam.endX - beam.startX) + dy * (beam.endY - beam.startY)) / beamLen)));
                const closestX = beam.startX + (proj / beamLen) * (beam.endX - beam.startX);
                const closestY = beam.startY + (proj / beamLen) * (beam.endY - beam.startY);
                const distToBeam = Math.sqrt((dist.x - closestX) ** 2 + (dist.y - closestY) ** 2);

                if (distToBeam < dist.size) {
                    killsRef.current += 1;
                    comboRef.current += 1;
                    setKills(killsRef.current);
                    setCombo(comboRef.current);
                    triggerFlash('cyan');
                    triggerHaptic(5);

                    // Particles
                    for (let i = 0; i < 8; i++) {
                        particlesRef.current.push({
                            id: Date.now() + Math.random(),
                            x: dist.x,
                            y: dist.y,
                            vx: (Math.random() - 0.5) * 10,
                            vy: (Math.random() - 0.5) * 10,
                            life: PARTICLE_LIFETIME,
                            color: ['#00ff88', '#00ffff', '#06b6d4'][Math.floor(Math.random() * 3)]
                        });
                    }
                    setParticles([...particlesRef.current]);

                    if (comboRef.current % 10 === 0) {
                        triggerSlowMo();
                        confetti({
                            particleCount: 50,
                            spread: 360,
                            origin: { x: dist.x / 100, y: dist.y / 100 },
                            colors: ['#06b6d4', '#22c55e', '#eab308']
                        });
                    }
                    return false;
                }
                return true;
            });
        });
        setDistractions([...distractionsRef.current]);

        // Update rank
        const currentRank = getRank(killsRef.current);
        if (currentRank !== rank) setRank(currentRank);

        animationFrameRef.current = requestAnimationFrame(gameLoop);
    }, [slowMo, rank, spawnDistraction]);

    // Input
    const handlePointerMove = useCallback((e) => {
        if (gameStateRef.current !== 'playing') return;
        const rect = gameAreaRef.current.getBoundingClientRect();
        const x = ((e.clientX || e.touches?.[0]?.clientX) - rect.left) / rect.width * 100;
        const y = ((e.clientY || e.touches?.[0]?.clientY) - rect.top) / rect.height * 100;
        mousePosRef.current = { x, y };
    }, []);

    const handlePointerDown = useCallback((e) => {
        if (gameStateRef.current !== 'playing') return;
        const rect = gameAreaRef.current.getBoundingClientRect();
        const x = ((e.clientX || e.touches?.[0]?.clientX) - rect.left) / rect.width * 100;
        const y = ((e.clientY || e.touches?.[0]?.clientY) - rect.top) / rect.height * 100;
        fireBeam(x, y);
    }, [fireBeam]);

    // Start Game
    const startGame = useCallback(() => {
        gameStateRef.current = 'playing';
        setGameState('playing');
        killsRef.current = 0;
        setKills(0);
        comboRef.current = 0;
        setCombo(0);
        timerRef.current = GAME_DURATION;
        setTimer(GAME_DURATION);
        distractionsRef.current = [];
        setDistractions([]);
        beamsRef.current = [];
        setBeams([]);
        particlesRef.current = [];
        setParticles([]);
        setIsNewBest(false);
        setRank('Distracted');
        gameStartTimeRef.current = performance.now();
        lastTimeRef.current = performance.now();
        animationFrameRef.current = requestAnimationFrame(gameLoop);
    }, [gameLoop]);

    // End Game
    const endGame = useCallback(() => {
        if (gameStateRef.current === 'dead') return;
        gameStateRef.current = 'dead';
        setGameState('dead');
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

        const finalKills = killsRef.current;
        setRank(getRank(finalKills));

        if (finalKills > bestKills) {
            setIsNewBest(true);
            setBestKills(finalKills);
            try { localStorage.setItem('focusfury_best', finalKills.toString()); }
            catch { }

            setTimeout(() => confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 },
                colors: ['#06b6d4', '#22c55e', '#eab308', '#a855f7']
            }), 200);
        }

        api.submitScore?.('focusfury', finalKills)?.catch(console.error);
    }, [bestKills]);

    // Share
    const shareScore = () => {
        const text = `⚡ I zapped ${kills} distractions in Focus Blitz!\n\n${rank} achieved! Can you beat my focus?\n\nPlay free: AgenticAIHome.com/games`;
        if (navigator.share) {
            navigator.share({ title: 'Focus Blitz Score', text }).catch(() => { });
        } else {
            navigator.clipboard?.writeText(text);
        }
    };

    // Effects
    useEffect(() => {
        const area = gameAreaRef.current;
        if (!area) return;

        area.addEventListener('mousemove', handlePointerMove);
        area.addEventListener('mousedown', handlePointerDown);
        area.addEventListener('touchmove', handlePointerMove, { passive: true });
        area.addEventListener('touchstart', handlePointerDown, { passive: true });

        return () => {
            area.removeEventListener('mousemove', handlePointerMove);
            area.removeEventListener('mousedown', handlePointerDown);
            area.removeEventListener('touchmove', handlePointerMove);
            area.removeEventListener('touchstart', handlePointerDown);
        };
    }, [handlePointerMove, handlePointerDown]);

    useEffect(() => () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }, []);

    return (
        <div className={`w-full max-w-2xl mx-auto bg-slate-900 border-2 rounded-2xl overflow-hidden shadow-2xl relative select-none
            ${gameState === 'playing' ? 'border-cyan-500/50' : 'border-slate-700'}
            ${screenShake ? 'animate-shake' : ''}`}
        >
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translate(0); }
                    25% { transform: translate(-3px, -2px); }
                    75% { transform: translate(3px, 2px); }
                }
                .animate-shake { animation: shake 0.1s ease-in-out; }
            `}</style>

            {/* HUD */}
            {gameState === 'playing' && (
                <div className="absolute top-3 left-4 right-4 z-30 flex justify-between items-center px-2">
                    <motion.div
                        key={timer}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-2xl sm:text-3xl font-black text-cyan-400"
                    >
                        {timer}s
                    </motion.div>
                    <div className="text-4xl sm:text-5xl font-black text-white">{kills}</div>
                    <div className={`${getRankColor(rank)} text-sm sm:text-base font-bold text-right`}>
                        {rank}
                    </div>
                </div>
            )}

            {/* Game Area */}
            <div
                ref={gameAreaRef}
                className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[70vh] min-h-[500px] overflow-hidden cursor-crosshair"
                style={{
                    background: 'linear-gradient(180deg, #0c1929 0%, #153653 35%, #1a4a6e 50%, #153653 65%, #0c1929 100%)'
                }}
            >
                {/* Flash */}
                <AnimatePresence>
                    {flashColor && (
                        <motion.div
                            className={`absolute inset-0 z-40 pointer-events-none ${flashColor === 'cyan' ? 'bg-cyan-400/20' : ''}`}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.06 }}
                        />
                    )}
                </AnimatePresence>

                {/* Captain Efficiency (Center) */}
                {gameState !== 'idle' && (
                    <motion.div
                        className="absolute z-20 flex items-center justify-center"
                        style={{
                            left: `${CENTER_X}%`,
                            top: `${CENTER_Y}%`,
                            width: `${CAPTAIN_SIZE}%`,
                            maxWidth: '70px',
                            aspectRatio: '1',
                            transform: 'translate(-50%, -50%)'
                        }}
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {/* Glow */}
                        <div className="absolute inset-[-40%] rounded-full blur-xl bg-cyan-400/50" />

                        {/* Captain Image */}
                        <img
                            src="/assets/captain-efficiency-dark.png"
                            alt="Captain Efficiency"
                            className="relative w-full h-full object-contain"
                            draggable="false"
                        />
                    </motion.div>
                )}

                {/* Beams */}
                {beams.map(beam => (
                    <div
                        key={beam.id}
                        className="absolute z-10"
                        style={{
                            left: `${CENTER_X}%`,
                            top: `${CENTER_Y}%`,
                            width: `${Math.hypot(beam.endX - CENTER_X, beam.endY - CENTER_Y)}%`,
                            height: '2px',
                            background: 'linear-gradient(to right, rgba(6, 182, 212, 0.8), rgba(34, 197, 94, 0.6))',
                            transform: `rotate(${Math.atan2(beam.endY - CENTER_Y, beam.endX - CENTER_X) * 180 / Math.PI}deg)`,
                            transformOrigin: '0 50%',
                            opacity: beam.life / BEAM_LIFETIME,
                            boxShadow: '0 0 10px rgba(6, 182, 212, 0.6)'
                        }}
                    />
                ))}

                {/* Distractions */}
                {distractions.map(dist => (
                    <motion.div
                        key={dist.id}
                        className="absolute z-10 flex items-center justify-center rounded-full shadow-lg border-2 border-white/30 text-lg sm:text-xl"
                        style={{
                            left: `${dist.x}%`,
                            top: `${dist.y}%`,
                            width: `${dist.size}%`,
                            maxWidth: '50px',
                            aspectRatio: '1',
                            transform: 'translate(-50%, -50%)',
                            background: `linear-gradient(135deg, hsl(${Math.random() * 360}, 70%, 50%), hsl(${Math.random() * 360}, 70%, 40%))`
                        }}
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    >
                        {dist.type}
                    </motion.div>
                ))}

                {/* Particles */}
                {particles.map(p => (
                    <motion.div
                        key={p.id}
                        className="absolute z-5 rounded-full"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: '3px',
                            height: '3px',
                            background: p.color,
                            transform: 'translate(-50%, -50%)',
                            opacity: p.life / PARTICLE_LIFETIME,
                            boxShadow: `0 0 6px ${p.color}`
                        }}
                    />
                ))}

                {/* Start Screen */}
                <AnimatePresence>
                    {gameState === 'idle' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm z-30 p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="text-center max-w-sm"
                            >
                                {/* Captain Image */}
                                <div className="mb-4">
                                    <img
                                        src="/assets/captain-efficiency-dark.png"
                                        alt="Captain Efficiency"
                                        className="w-24 h-24 mx-auto object-contain animate-float animate-glow"
                                        style={{
                                            animation: 'float 2s ease-in-out infinite, glow 1.5s ease-in-out infinite'
                                        }}
                                        draggable="false"
                                    />
                                </div>

                                <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Focus Blitz</h1>
                                <p className="text-cyan-400 font-medium mb-2 text-sm sm:text-base">
                                    Captain E needs your help!
                                </p>
                                <p className="text-slate-400 text-xs mb-6">
                                    🎯 60 seconds • Zap ALL distractions • Protect focus
                                </p>

                                {bestKills > 0 && (
                                    <div className="mb-4 bg-slate-800/70 rounded-xl py-2 px-4 inline-block">
                                        <span className="text-xs text-slate-400 uppercase">Your Best</span>
                                        <div className="text-2xl font-black text-yellow-400 flex items-center justify-center gap-2">
                                            <Trophy size={20} /> {bestKills}
                                        </div>
                                    </div>
                                )}

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={startGame}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <Play size={24} fill="white" /> START MISSION
                                </motion.button>

                                <p className="text-slate-500 text-xs mt-4">
                                    Tap or click to fire focus beams
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Death Screen */}
                <AnimatePresence>
                    {gameState === 'dead' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md z-30 p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="text-center w-full max-w-sm"
                            >
                                {isNewBest ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
                                            transition={{ repeat: 3, duration: 0.3 }}
                                            className="text-5xl mb-2"
                                        >
                                            🏆
                                        </motion.div>
                                        <h2 className="text-2xl font-black text-yellow-400 mb-2">NEW BEST!</h2>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-4xl mb-2">⚡</div>
                                        <h2 className={`text-xl sm:text-2xl font-black ${getRankColor(rank)} mb-1`}>
                                            {rank}
                                        </h2>
                                    </>
                                )}

                                <div className="bg-slate-800/60 rounded-2xl p-4 mb-6">
                                    <div className="text-xs text-slate-400 uppercase">Distractions Zapped</div>
                                    <div className="text-5xl font-black text-white">{kills}</div>
                                    {!isNewBest && bestKills > 0 && (
                                        <div className="text-xs text-slate-500 mt-1">
                                            Best: {bestKills}
                                        </div>
                                    )}
                                </div>

                                {/* Contextual tips */}
                                {kills < 20 && (
                                    <p className="text-slate-400 text-xs mb-4 bg-slate-800/50 rounded-lg p-2">
                                        💡 Tip: Fire early and often - don't let them close!
                                    </p>
                                )}
                                {kills >= 20 && kills < 100 && (
                                    <p className="text-slate-400 text-xs mb-4 bg-slate-800/50 rounded-lg p-2">
                                        💡 Nice! Track multiple distractions at once!
                                    </p>
                                )}
                                {kills >= 100 && (
                                    <p className="text-slate-400 text-xs mb-4 bg-slate-800/50 rounded-lg p-2">
                                        💡 Incredible focus! Keep the rhythm going!
                                    </p>
                                )}

                                <div className="flex gap-3 mb-4">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => onBack?.()}
                                        className="flex-1 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm"
                                    >
                                        <ArrowLeft size={18} /> Back
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={startGame}
                                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                                    >
                                        <RotateCcw size={18} /> Try Again
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={shareScore}
                                        className="flex-1 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm"
                                    >
                                        <Share2 size={18} /> Share
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FocusFury;
