import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Share2, ArrowLeft, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';
import { useGameAudio } from '../../hooks/useGameAudio';

// ===================
// CSS CAPTAIN EFFICIENCY COMPONENT
// Stylized robot mascot - no image needed!
// ===================
const CaptainEfficiency = ({ size = 60, isDefending = false, isFiring = false }) => {
    return (
        <div
            className="relative"
            style={{ width: size, height: size }}
        >
            {/* Glow effect */}
            <div
                className={`absolute inset-[-20%] rounded-full blur-xl transition-all duration-200
                    ${isFiring ? 'bg-cyan-400/60' : isDefending ? 'bg-cyan-400/40' : 'bg-cyan-400/20'}
                `}
            />

            {/* Cape */}
            <div
                className="absolute top-[35%] left-[10%] w-[80%] h-[70%] rounded-b-full"
                style={{
                    background: 'linear-gradient(180deg, #1e3a5f 0%, #0f172a 100%)',
                    transform: isDefending ? 'rotate(-5deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    borderRight: '2px solid #d4af37',
                }}
            />

            {/* Body */}
            <div
                className="absolute top-[30%] left-[20%] w-[60%] h-[50%] rounded-2xl"
                style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
                    border: '2px solid rgba(6, 182, 212, 0.5)',
                }}
            >
                {/* Chest emblem - E */}
                <div
                    className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[40%] h-[40%] rounded-md flex items-center justify-center"
                    style={{
                        background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                        border: '1px solid rgba(255,255,255,0.3)',
                    }}
                >
                    <span className="text-white font-black" style={{ fontSize: size * 0.12 }}>E</span>
                </div>
            </div>

            {/* Head */}
            <div
                className="absolute top-0 left-[15%] w-[70%] h-[40%] rounded-t-full rounded-b-3xl"
                style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    border: '2px solid rgba(6, 182, 212, 0.5)',
                }}
            >
                {/* Visor */}
                <div
                    className="absolute top-[25%] left-[10%] w-[80%] h-[45%] rounded-xl"
                    style={{
                        background: 'linear-gradient(180deg, #0c1929 0%, #1e3a5f 100%)',
                        border: '2px solid #94a3b8',
                    }}
                >
                    {/* Eyes */}
                    <div className="absolute top-1/2 left-[20%] -translate-y-1/2 flex gap-[30%]">
                        <div
                            className={`rounded-sm transition-all duration-100 ${isFiring ? 'bg-yellow-300' : 'bg-cyan-400'}`}
                            style={{
                                width: size * 0.08,
                                height: size * 0.04,
                                boxShadow: isFiring ? '0 0 10px #fde047' : '0 0 8px #22d3ee',
                            }}
                        />
                        <div
                            className={`rounded-sm transition-all duration-100 ${isFiring ? 'bg-yellow-300' : 'bg-cyan-400'}`}
                            style={{
                                width: size * 0.08,
                                height: size * 0.04,
                                boxShadow: isFiring ? '0 0 10px #fde047' : '0 0 8px #22d3ee',
                            }}
                        />
                    </div>
                    {/* Smile */}
                    <div
                        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 bg-cyan-400 rounded-full"
                        style={{
                            width: size * 0.15,
                            height: size * 0.03,
                            boxShadow: '0 0 6px #22d3ee',
                        }}
                    />
                </div>
            </div>

            {/* Arms */}
            <div
                className="absolute top-[40%] left-0 w-[25%] h-[30%] rounded-full"
                style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    transform: isFiring ? 'rotate(-30deg)' : 'rotate(0deg)',
                    transformOrigin: 'right center',
                    transition: 'transform 0.1s',
                }}
            />
            <div
                className="absolute top-[40%] right-0 w-[25%] h-[30%] rounded-full"
                style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    transform: isFiring ? 'rotate(30deg)' : 'rotate(0deg)',
                    transformOrigin: 'left center',
                    transition: 'transform 0.1s',
                }}
            />

            {/* Cyan accents */}
            <div
                className="absolute top-[75%] left-[25%] w-[20%] h-[8%] rounded-full bg-cyan-400"
                style={{ boxShadow: '0 0 6px #22d3ee' }}
            />
            <div
                className="absolute top-[75%] right-[25%] w-[20%] h-[8%] rounded-full bg-cyan-400"
                style={{ boxShadow: '0 0 6px #22d3ee' }}
            />
        </div>
    );
};

const FocusFury = ({ onBack }) => {
    // Audio hook
    const { playSound, SoundToggle } = useGameAudio();

    // ===================
    // GAME STATE
    // ===================
    const [gameState, setGameState] = useState('idle'); // idle, playing, dead
    const [kills, setKills] = useState(0);
    const [bestKills, setBestKills] = useState(() => {
        try { return parseInt(localStorage.getItem('focusfury_best') || '0', 10); }
        catch { return 0; }
    });
    const [isNewBest, setIsNewBest] = useState(false);
    const [timer, setTimer] = useState(60);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);

    // Visual state
    const [beams, setBeams] = useState([]);
    const [distractions, setDistractions] = useState([]);
    const [particles, setParticles] = useState([]);
    const [screenShake, setScreenShake] = useState(false);
    const [flashColor, setFlashColor] = useState(null);
    const [isFiring, setIsFiring] = useState(false);
    const [difficultyLevel, setDifficultyLevel] = useState(1);

    // Refs
    const gameAreaRef = useRef(null);
    const animationFrameRef = useRef(null);
    const lastTimeRef = useRef(0);
    const gameStateRef = useRef('idle');
    const killsRef = useRef(0);
    const timerRef = useRef(60);
    const comboRef = useRef(0);
    const maxComboRef = useRef(0);
    const distractionsRef = useRef([]);
    const beamsRef = useRef([]);
    const particlesRef = useRef([]);
    const lastSpawnRef = useRef(0);
    const comboTimeoutRef = useRef(null);

    // ===================
    // CONSTANTS
    // ===================
    const GAME_DURATION = 60;
    const CENTER_X = 50;
    const CENTER_Y = 50;
    const CAPTAIN_SIZE = 12; // percentage
    const DISTRACTION_SIZE = 5;
    const BEAM_LIFETIME = 150;
    const PARTICLE_LIFETIME = 600;
    const DEFENSE_RADIUS = 8; // % - if distraction gets this close, game over

    // ===================
    // DIFFICULTY SETTINGS
    // ===================
    const getDifficultySettings = useCallback((timeRemaining) => {
        // Difficulty increases as time goes on
        if (timeRemaining > 50) {
            return { spawnRate: 0.6, speed: 1.5, accel: 0.03, label: 'WARM UP', color: 'text-green-400' };
        } else if (timeRemaining > 40) {
            return { spawnRate: 0.9, speed: 2.0, accel: 0.04, label: 'FOCUSED', color: 'text-blue-400' };
        } else if (timeRemaining > 25) {
            return { spawnRate: 1.3, speed: 2.5, accel: 0.05, label: 'INTENSE', color: 'text-yellow-400' };
        } else if (timeRemaining > 10) {
            return { spawnRate: 1.8, speed: 3.0, accel: 0.06, label: 'FURY', color: 'text-orange-400' };
        } else {
            return { spawnRate: 2.5, speed: 3.5, accel: 0.07, label: 'CHAOS', color: 'text-red-400' };
        }
    }, []);

    // Distraction types with fixed colors
    const distractionTypes = useMemo(() => [
        { emoji: '📱', name: 'Phone', color: 'from-red-500 to-red-700' },
        { emoji: '📧', name: 'Email', color: 'from-orange-500 to-orange-700' },
        { emoji: '💬', name: 'Slack', color: 'from-purple-500 to-purple-700' },
        { emoji: '🔔', name: 'Notif', color: 'from-pink-500 to-pink-700' },
        { emoji: '🎮', name: 'Games', color: 'from-green-500 to-green-700' },
        { emoji: '📺', name: 'TV', color: 'from-blue-500 to-blue-700' },
        { emoji: '🐦', name: 'Social', color: 'from-sky-500 to-sky-700' },
        { emoji: '☕', name: 'Break', color: 'from-amber-500 to-amber-700' },
    ], []);

    // Ranks based on kills
    const getRank = useCallback((k) => {
        if (k >= 150) return { label: 'EFFICIENCY GOD', emoji: '👑', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
        if (k >= 120) return { label: 'ZEN MASTER', emoji: '🧘', color: 'text-purple-400', bg: 'bg-purple-500/20' };
        if (k >= 90) return { label: 'FLOW STATE', emoji: '🌊', color: 'text-cyan-400', bg: 'bg-cyan-500/20' };
        if (k >= 60) return { label: 'LOCKED IN', emoji: '🔒', color: 'text-green-400', bg: 'bg-green-500/20' };
        if (k >= 30) return { label: 'FOCUSED', emoji: '🎯', color: 'text-blue-400', bg: 'bg-blue-500/20' };
        if (k >= 10) return { label: 'WARMING UP', emoji: '🔥', color: 'text-orange-400', bg: 'bg-orange-500/20' };
        return { label: 'DISTRACTED', emoji: '😵', color: 'text-slate-300', bg: 'bg-slate-500/20' };
    }, []);

    // ===================
    // FEEDBACK
    // ===================
    const triggerHaptic = (pattern = 10) => {
        if (navigator.vibrate) navigator.vibrate(pattern);
    };

    const triggerScreenShake = () => {
        setScreenShake(true);
        triggerHaptic(80);
        setTimeout(() => setScreenShake(false), 100);
    };

    const triggerFlash = (color) => {
        setFlashColor(color);
        setTimeout(() => setFlashColor(null), 80);
    };

    // ===================
    // SPAWN DISTRACTION
    // ===================
    const spawnDistraction = useCallback(() => {
        const settings = getDifficultySettings(timerRef.current);

        // Spawn from random edge
        const side = Math.floor(Math.random() * 4);
        let x, y, vx, vy;
        const speed = settings.speed + Math.random() * 1.5;

        switch (side) {
            case 0: // Top
                x = 10 + Math.random() * 80;
                y = -5;
                vx = (CENTER_X - x) * 0.02;
                vy = speed;
                break;
            case 1: // Right
                x = 105;
                y = 10 + Math.random() * 80;
                vx = -speed;
                vy = (CENTER_Y - y) * 0.02;
                break;
            case 2: // Bottom
                x = 10 + Math.random() * 80;
                y = 105;
                vx = (CENTER_X - x) * 0.02;
                vy = -speed;
                break;
            default: // Left
                x = -5;
                y = 10 + Math.random() * 80;
                vx = speed;
                vy = (CENTER_Y - y) * 0.02;
        }

        const type = distractionTypes[Math.floor(Math.random() * distractionTypes.length)];

        distractionsRef.current.push({
            id: Date.now() + Math.random(),
            x, y, vx, vy,
            ...type,
            size: DISTRACTION_SIZE + Math.random() * 1.5,
            accel: settings.accel,
        });
    }, [getDifficultySettings, distractionTypes]);

    // ===================
    // FIRE BEAM
    // ===================
    const fireBeam = useCallback((targetX, targetY) => {
        if (gameStateRef.current !== 'playing') return;

        setIsFiring(true);
        setTimeout(() => setIsFiring(false), 100);
        triggerHaptic(5);
        playSound('zap');

        const beam = {
            id: Date.now() + Math.random(),
            startX: CENTER_X,
            startY: CENTER_Y,
            endX: targetX,
            endY: targetY,
            createdAt: performance.now(),
        };

        beamsRef.current.push(beam);
        setBeams([...beamsRef.current]);

        // Check for hits immediately
        const hitIndices = [];
        distractionsRef.current.forEach((dist, index) => {
            if (checkBeamHit(beam, dist)) {
                hitIndices.push(index);
            }
        });

        // Process hits (reverse order to maintain indices)
        hitIndices.reverse().forEach(index => {
            const dist = distractionsRef.current[index];
            distractionsRef.current.splice(index, 1);

            // Score
            killsRef.current += 1;
            comboRef.current += 1;
            maxComboRef.current = Math.max(maxComboRef.current, comboRef.current);
            setKills(killsRef.current);
            setCombo(comboRef.current);
            setMaxCombo(maxComboRef.current);

            // Reset combo timeout
            if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
            comboTimeoutRef.current = setTimeout(() => {
                comboRef.current = 0;
                setCombo(0);
            }, 1500);

            triggerFlash('cyan');
            playSound('score', { debounce: 40 });

            // Spawn particles
            for (let i = 0; i < 6; i++) {
                particlesRef.current.push({
                    id: Date.now() + Math.random() + i,
                    x: dist.x,
                    y: dist.y,
                    vx: (Math.random() - 0.5) * 8,
                    vy: (Math.random() - 0.5) * 8,
                    createdAt: performance.now(),
                    color: ['#00ffff', '#00ff88', '#ff00ff', '#fbbf24'][Math.floor(Math.random() * 4)],
                });
            }
            setParticles([...particlesRef.current]);

            // Combo milestone effects
            if (comboRef.current === 10 || comboRef.current === 25 || comboRef.current === 50) {
                triggerScreenShake();
                playSound('frenzy');
                confetti({
                    particleCount: 40 + comboRef.current,
                    spread: 60,
                    origin: { x: dist.x / 100, y: dist.y / 100 },
                    colors: ['#06b6d4', '#a855f7', '#fbbf24'],
                });
            }
        });

        setDistractions([...distractionsRef.current]);
    }, []);

    // ===================
    // BEAM-DISTRACTION COLLISION
    // ===================
    const checkBeamHit = useCallback((beam, dist) => {
        // Line segment to circle collision
        const dx = beam.endX - beam.startX;
        const dy = beam.endY - beam.startY;
        const fx = beam.startX - dist.x;
        const fy = beam.startY - dist.y;

        const a = dx * dx + dy * dy;
        const b = 2 * (fx * dx + fy * dy);
        const c = fx * fx + fy * fy - (dist.size * 1.2) ** 2; // Slightly larger hitbox

        let discriminant = b * b - 4 * a * c;
        if (discriminant < 0) return false;

        discriminant = Math.sqrt(discriminant);
        const t1 = (-b - discriminant) / (2 * a);
        const t2 = (-b + discriminant) / (2 * a);

        // Check if intersection is within line segment
        return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1);
    }, []);

    // ===================
    // GAME LOOP
    // ===================
    const gameLoop = useCallback((currentTime) => {
        if (gameStateRef.current !== 'playing') return;

        const deltaTime = Math.min(currentTime - lastTimeRef.current, 50); // Cap delta
        lastTimeRef.current = currentTime;
        const dt = deltaTime / 16; // Normalize to ~60fps

        // Timer
        timerRef.current -= deltaTime / 1000;
        if (timerRef.current <= 0) {
            timerRef.current = 0;
            setTimer(0);
            endGame(false); // Survived!
            return;
        }
        setTimer(Math.ceil(timerRef.current));

        // Update difficulty display
        const settings = getDifficultySettings(timerRef.current);
        const newLevel = timerRef.current > 50 ? 1 : timerRef.current > 40 ? 2 : timerRef.current > 25 ? 3 : timerRef.current > 10 ? 4 : 5;
        if (newLevel !== difficultyLevel) {
            setDifficultyLevel(newLevel);
            if (newLevel > 1) {
                triggerHaptic([20, 30, 20]);
                playSound('frenzy'); // Level up sound
            }
        }

        // Spawn distractions
        if (currentTime - lastSpawnRef.current > (1000 / settings.spawnRate)) {
            spawnDistraction();
            lastSpawnRef.current = currentTime;
        }

        // Update distractions
        let gameOver = false;
        distractionsRef.current = distractionsRef.current.map(dist => {
            // Move
            dist.x += dist.vx * dt * 0.5;
            dist.y += dist.vy * dt * 0.5;

            // Accelerate towards center
            const dx = CENTER_X - dist.x;
            const dy = CENTER_Y - dist.y;
            const distToCenter = Math.sqrt(dx * dx + dy * dy);

            if (distToCenter < DEFENSE_RADIUS) {
                gameOver = true;
            }

            if (distToCenter > 1) {
                dist.vx += (dx / distToCenter) * dist.accel * dt;
                dist.vy += (dy / distToCenter) * dist.accel * dt;
            }

            return dist;
        }).filter(dist =>
            dist.x > -15 && dist.x < 115 &&
            dist.y > -15 && dist.y < 115
        );

        if (gameOver) {
            endGame(true); // Overwhelmed
            return;
        }

        // Update beams (remove old ones)
        beamsRef.current = beamsRef.current.filter(
            beam => currentTime - beam.createdAt < BEAM_LIFETIME
        );
        setBeams([...beamsRef.current]);

        // Update particles
        particlesRef.current = particlesRef.current.map(p => {
            p.x += p.vx * dt * 0.5;
            p.y += p.vy * dt * 0.5;
            p.vx *= 0.95;
            p.vy *= 0.95;
            return p;
        }).filter(p => currentTime - p.createdAt < PARTICLE_LIFETIME);
        setParticles([...particlesRef.current]);

        setDistractions([...distractionsRef.current]);

        animationFrameRef.current = requestAnimationFrame(gameLoop);
    }, [getDifficultySettings, spawnDistraction, difficultyLevel]);

    // ===================
    // INPUT HANDLING
    // ===================
    const handleInteraction = useCallback((e) => {
        if (gameStateRef.current !== 'playing') return;

        e.preventDefault();

        const rect = gameAreaRef.current?.getBoundingClientRect();
        if (!rect) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;

        fireBeam(x, y);
    }, [fireBeam]);

    // ===================
    // START GAME
    // ===================
    const startGame = useCallback(() => {
        gameStateRef.current = 'playing';
        setGameState('playing');

        killsRef.current = 0;
        setKills(0);

        comboRef.current = 0;
        setCombo(0);

        maxComboRef.current = 0;
        setMaxCombo(0);

        timerRef.current = GAME_DURATION;
        setTimer(GAME_DURATION);

        distractionsRef.current = [];
        setDistractions([]);

        beamsRef.current = [];
        setBeams([]);

        particlesRef.current = [];
        setParticles([]);

        setIsNewBest(false);
        setDifficultyLevel(1);

        lastTimeRef.current = performance.now();
        lastSpawnRef.current = performance.now();

        playSound('start');
        animationFrameRef.current = requestAnimationFrame(gameLoop);
    }, [gameLoop, playSound]);

    // ===================
    // END GAME
    // ===================
    const endGame = useCallback((wasOverwhelmed) => {
        if (gameStateRef.current === 'dead') return;

        gameStateRef.current = 'dead';
        setGameState('dead');

        // Track death time to prevent accidental restarts when clicking buttons
        window._focusfuryDeathTime = Date.now();

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        if (wasOverwhelmed) {
            triggerScreenShake();
            triggerFlash('red');
            playSound('fail');
        } else {
            playSound('score'); // Survived the timer!
        }

        const finalKills = killsRef.current;
        if (finalKills > bestKills) {
            setIsNewBest(true);
            setBestKills(finalKills);
            try { localStorage.setItem('focusfury_best', finalKills.toString()); }
            catch { }

            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#fbbf24', '#06b6d4', '#a855f7', '#22c55e'],
                });
            }, 200);
            playSound('highScore');
        } else if (!wasOverwhelmed) {
            playSound('gameOver');
        }

        api.submitScore?.('focusfury', finalKills)?.catch(console.error);
    }, [bestKills]);

    // ===================
    // SHARE
    // ===================
    const shareScore = () => {
        const rank = getRank(kills);
        const text = `${rank.emoji} I destroyed ${kills} distractions in Focus Fury!\n\n${rank.label} with ${maxCombo}x max combo! Think you can beat me? 🎮\n\nPlay free: AgenticAIHome.com/games`;

        if (navigator.share) {
            navigator.share({ title: 'Focus Fury Challenge', text }).catch(() => { });
        } else {
            navigator.clipboard?.writeText(text).then(() => {
                alert('Challenge copied! Paste it anywhere to challenge a friend.');
            }).catch(() => { });
        }
    };

    // ===================
    // EFFECTS
    // ===================
    useEffect(() => {
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
        };
    }, []);

    const rank = getRank(kills);
    const diffSettings = getDifficultySettings(timer);

    return (
        <div
            className={`w-full max-w-2xl mx-auto bg-slate-900 border-2 rounded-2xl overflow-hidden shadow-2xl relative select-none
                ${gameState === 'playing' ? 'border-purple-500/50' : 'border-slate-600'}
                ${screenShake ? 'animate-shake' : ''}
            `}
        >
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-3px) rotate(-0.3deg); }
                    75% { transform: translateX(3px) rotate(0.3deg); }
                }
                .animate-shake { animation: shake 0.1s ease-in-out; }
                @keyframes pulse-ring {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
                    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
                }
                .pulse-ring { animation: pulse-ring 1s ease-out infinite; }
                @keyframes float-captain {
                    0%, 100% { transform: translate(-50%, -50%) translateY(0); }
                    50% { transform: translate(-50%, -50%) translateY(-5px); }
                }
                .float-captain { animation: float-captain 2s ease-in-out infinite; }
            `}</style>

            {/* HUD */}
            {gameState === 'playing' && (
                <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
                    <div className="flex justify-between items-start p-3 sm:p-4">
                        {/* Timer */}
                        <div className="text-center">
                            <div className={`text-3xl sm:text-4xl font-black ${timer <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                                {timer}
                            </div>
                            <div className={`text-[10px] sm:text-xs font-bold ${diffSettings.color}`}>
                                {diffSettings.label}
                            </div>
                        </div>

                        {/* Score */}
                        <div className="text-center">
                            <m.div
                                key={kills}
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                                className="text-4xl sm:text-5xl font-black text-white"
                            >
                                {kills}
                            </m.div>
                            <div className="text-[10px] text-slate-300">KILLS</div>
                        </div>

                        {/* Combo */}
                        <div className="text-center">
                            {combo > 0 && (
                                <m.div
                                    key={combo}
                                    initial={{ scale: 1.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className={`text-2xl sm:text-3xl font-black ${combo >= 10 ? 'text-yellow-400' : combo >= 5 ? 'text-cyan-400' : 'text-purple-400'}`}
                                >
                                    {combo}x
                                </m.div>
                            )}
                            <div className="text-[10px] text-slate-300">COMBO</div>
                        </div>
                    </div>
                    <SoundToggle className="absolute top-3 right-3 pointer-events-auto" />
                </div>
            )}

            {/* Game Area */}
            <div
                ref={gameAreaRef}
                onClick={handleInteraction}
                onTouchStart={handleInteraction}
                onTouchMove={(e) => e.preventDefault()}
                className="relative w-full aspect-square sm:aspect-[4/3] max-h-[70vh] min-h-[400px] overflow-hidden cursor-crosshair touch-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 60%, #020617 100%)',
                }}
            >
                {/* Grid background */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Flash overlay */}
                <AnimatePresence>
                    {flashColor && (
                        <m.div
                            initial={{ opacity: 0.4 }}
                            animate={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.08 }}
                            className={`absolute inset-0 z-40 pointer-events-none
                                ${flashColor === 'cyan' ? 'bg-cyan-400' : ''}
                                ${flashColor === 'red' ? 'bg-red-500' : ''}
                            `}
                        />
                    )}
                </AnimatePresence>

                {/* Defense zone rings */}
                {gameState === 'playing' && (
                    <>
                        <div
                            className="absolute rounded-full border-2 border-purple-500/30 pointer-events-none pulse-ring"
                            style={{
                                left: `${CENTER_X}%`,
                                top: `${CENTER_Y}%`,
                                width: `${DEFENSE_RADIUS * 4}%`,
                                height: `${DEFENSE_RADIUS * 4}%`,
                            }}
                        />
                        <div
                            className="absolute rounded-full border border-red-500/50 pointer-events-none"
                            style={{
                                left: `${CENTER_X}%`,
                                top: `${CENTER_Y}%`,
                                width: `${DEFENSE_RADIUS * 2}%`,
                                height: `${DEFENSE_RADIUS * 2}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    </>
                )}

                {/* Captain Efficiency - Center defender */}
                {gameState !== 'idle' && (
                    <div
                        className="absolute z-20 pointer-events-none float-captain"
                        style={{
                            left: `${CENTER_X}%`,
                            top: `${CENTER_Y}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <CaptainEfficiency
                            size={gameAreaRef.current ? gameAreaRef.current.offsetWidth * (CAPTAIN_SIZE / 100) : 60}
                            isDefending={distractionsRef.current.length > 3}
                            isFiring={isFiring}
                        />
                    </div>
                )}

                {/* Beams */}
                {beams.map(beam => {
                    const angle = Math.atan2(beam.endY - beam.startY, beam.endX - beam.startX) * 180 / Math.PI;
                    const length = Math.sqrt((beam.endX - beam.startX) ** 2 + (beam.endY - beam.startY) ** 2);
                    const age = performance.now() - beam.createdAt;
                    const opacity = 1 - (age / BEAM_LIFETIME);

                    return (
                        <div
                            key={beam.id}
                            className="absolute z-15 pointer-events-none"
                            style={{
                                left: `${beam.startX}%`,
                                top: `${beam.startY}%`,
                                width: `${length}%`,
                                height: '3px',
                                background: 'linear-gradient(90deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)',
                                boxShadow: '0 0 10px #06b6d4, 0 0 20px #a855f7',
                                transform: `rotate(${angle}deg)`,
                                transformOrigin: '0 50%',
                                opacity,
                            }}
                        />
                    );
                })}

                {/* Distractions */}
                {distractions.map(dist => (
                    <div
                        key={dist.id}
                        className={`absolute z-10 flex items-center justify-center rounded-full bg-gradient-to-br ${dist.color} shadow-lg border-2 border-white/20`}
                        style={{
                            left: `${dist.x}%`,
                            top: `${dist.y}%`,
                            width: `${dist.size}%`,
                            height: `${dist.size}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <span className="text-lg sm:text-xl">{dist.emoji}</span>
                    </div>
                ))}

                {/* Particles */}
                {particles.map(p => {
                    const age = performance.now() - p.createdAt;
                    const opacity = 1 - (age / PARTICLE_LIFETIME);
                    return (
                        <div
                            key={p.id}
                            className="absolute z-5 rounded-full pointer-events-none"
                            style={{
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                width: '4px',
                                height: '4px',
                                background: p.color,
                                boxShadow: `0 0 6px ${p.color}`,
                                transform: 'translate(-50%, -50%)',
                                opacity,
                            }}
                        />
                    );
                })}

                {/* START SCREEN */}
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
                                className="text-center w-full max-w-sm"
                            >
                                {/* Captain preview */}
                                <div className="mb-4 mx-auto w-24 h-24 sm:w-28 sm:h-28">
                                    <CaptainEfficiency size={112} isDefending={false} isFiring={false} />
                                </div>

                                <h1 className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight">
                                    FOCUS FURY
                                </h1>
                                <p className="text-purple-400 font-medium mb-2 text-sm sm:text-base">
                                    Defend Captain Efficiency from distractions!
                                </p>
                                <p className="text-slate-300 text-xs mb-5">
                                    ⏱️ 60 seconds • 📱 Tap to fire beams • 🎯 Don't let them reach the center!
                                </p>

                                {bestKills > 0 && (
                                    <div className="mb-5 bg-slate-800/70 rounded-xl py-3 px-5 inline-block">
                                        <span className="text-xs text-slate-300 uppercase">Your Best</span>
                                        <div className="text-3xl font-black text-yellow-400 flex items-center justify-center gap-2">
                                            <Trophy size={24} /> {bestKills}
                                        </div>
                                    </div>
                                )}

                                <m.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={startGame}
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 active:from-purple-600 active:to-pink-700 text-white px-8 py-4 rounded-2xl font-black text-lg sm:text-xl shadow-xl shadow-purple-500/30 transition-all flex items-center justify-center gap-3"
                                >
                                    <Zap size={26} fill="white" /> UNLEASH FURY
                                </m.button>

                                <p className="text-slate-300 text-xs mt-4">
                                    Tap/click anywhere to fire focus beams
                                </p>
                            </m.div>
                        </m.div>
                    )}
                </AnimatePresence>

                {/* DEATH SCREEN */}
                <AnimatePresence>
                    {gameState === 'dead' && (
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30 backdrop-blur-sm p-4"
                        >
                            <m.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.25, type: 'spring' }}
                                className="text-center w-full max-w-xs"
                            >
                                {isNewBest ? (
                                    <>
                                        <m.div
                                            animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.5 }}
                                            className="text-5xl mb-2"
                                        >
                                            🏆
                                        </m.div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-yellow-400 mb-1">NEW BEST!</h2>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-4xl mb-2">{rank.emoji}</div>
                                        <h2 className={`text-xl sm:text-2xl font-black ${rank.color} mb-1`}>
                                            {rank.label}
                                        </h2>
                                    </>
                                )}

                                <div className={`${rank.bg} rounded-2xl p-4 mb-4`}>
                                    <div className="text-xs text-slate-300 uppercase">Distractions Destroyed</div>
                                    <div className="text-5xl font-black text-white">{kills}</div>
                                    <div className="flex justify-center gap-4 mt-2 text-sm">
                                        <div className="text-purple-400">
                                            Max Combo: <span className="font-bold">{maxCombo}x</span>
                                        </div>
                                    </div>
                                    {!isNewBest && bestKills > 0 && (
                                        <div className="text-xs text-slate-300 mt-1">
                                            Best: {bestKills} {kills === bestKills && '(Tied!)'}
                                        </div>
                                    )}
                                </div>

                                {/* Tips */}
                                {kills < 20 && (
                                    <p className="text-slate-300 text-xs mb-4 bg-slate-800/50 rounded-lg p-2">
                                        💡 Tip: Fire ahead of where distractions are moving!
                                    </p>
                                )}
                                {kills >= 20 && kills < 60 && (
                                    <p className="text-slate-300 text-xs mb-4 bg-slate-800/50 rounded-lg p-2">
                                        💡 Build combos for bonus points - don't let the streak drop!
                                    </p>
                                )}

                                <div className="flex gap-3 justify-center mb-4">
                                    <m.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.stopPropagation(); onBack?.(); }}
                                        className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-sm"
                                    >
                                        <ArrowLeft size={18} /> Back
                                    </m.button>
                                    <m.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 text-sm"
                                    >
                                        <RotateCcw size={18} /> Fury Again
                                    </m.button>
                                </div>

                                {/* PROMINENT SHARE / CHALLENGE SECTION */}
                                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-xl p-3 mb-4">
                                    <p className="text-purple-300 text-xs font-medium mb-2 text-center">
                                        📸 Screenshot this → Challenge a friend!
                                    </p>
                                    <button
                                        onClick={shareScore}
                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <Share2 size={16} />
                                        Challenge a Friend
                                    </button>
                                </div>

                                <p className="text-slate-500 text-xs text-center">
                                    Think they can beat {kills}? 😏
                                </p>
                            </m.div>
                        </m.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FocusFury;