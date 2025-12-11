import React, { useState, useEffect, useRef, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Calendar, XCircle, Shield, Clock, Play, RotateCcw, ArrowLeft, Trophy, Volume2, VolumeX, Coffee, Zap, Battery, Keyboard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';

const CalendarDefenseGame = ({ onBack }) => {
    // Core Game State
    const [gameState, setGameState] = useState('start');
    const [score, setScore] = useState(0);
    const [deepWorkHours, setDeepWorkHours] = useState(8);
    const [enemies, setEnemies] = useState([]);
    const [powerUps, setPowerUps] = useState([]);

    // Wave & Time
    const [wave, setWave] = useState(1);
    const [timer, setTimer] = useState(0);
    const [waveAnnouncement, setWaveAnnouncement] = useState(null);

    // Shield System
    const [shieldActive, setShieldActive] = useState(false);
    const [shieldCooldown, setShieldCooldown] = useState(0);
    const [shieldCharges, setShieldCharges] = useState(2);
    const SHIELD_DURATION = 2000;
    const SHIELD_COOLDOWN = 8;

    // Combo & Multiplier
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [multiplier, setMultiplier] = useState(1);

    // Active Effects
    const [slowMotion, setSlowMotion] = useState(false);
    const [autoDeclineReady, setAutoDeclineReady] = useState(false);

    // Stats
    const [stats, setStats] = useState({
        declined: 0,
        bossBlocked: 0,
        powerUpsCollected: 0,
        damagesTaken: 0
    });
    const [personalBest, setPersonalBest] = useState(() => {
        const saved = localStorage.getItem('calendarBest');
        return saved ? JSON.parse(saved) : { score: 0, survived: false };
    });

    // UI State
    const [captainMessage, setCaptainMessage] = useState({ text: "Protect your Deep Work blocks!", mood: 'neutral' });
    const [particles, setParticles] = useState([]);
    const [shake, setShake] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [hoveredEnemy, setHoveredEnemy] = useState(null);
    const [flashColor, setFlashColor] = useState(null);

    // Refs
    const gameLoopRef = useRef(null);
    const spawnerRef = useRef(null);
    const powerUpSpawnerRef = useRef(null);
    const gameTimeRef = useRef(0);
    const audioContext = useRef(null);
    const gameStateRef = useRef(gameState);

    // Keep ref in sync with state
    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    // Meeting types with movement patterns
    const meetingTypes = [
        // LOW PRIORITY - Easy to hit
        {
            name: 'Touch Base',
            color: 'from-green-600 to-green-700',
            borderColor: 'border-green-400',
            speed: 4.0,
            damage: 0.5,
            points: 50,
            priority: 'low',
            pattern: 'straight',
            icon: '💬'
        },
        {
            name: 'FYI Email',
            color: 'from-emerald-600 to-emerald-700',
            borderColor: 'border-emerald-400',
            speed: 3.5,
            damage: 0.3,
            points: 30,
            priority: 'low',
            pattern: 'straight',
            icon: '📧'
        },

        // MEDIUM PRIORITY - Moderate challenge
        {
            name: 'Brainstorm',
            color: 'from-yellow-500 to-yellow-600',
            borderColor: 'border-yellow-300',
            speed: 5.0,
            damage: 1,
            points: 100,
            priority: 'medium',
            pattern: 'zigzag',
            icon: '💡'
        },
        {
            name: 'Status Update',
            color: 'from-orange-500 to-orange-600',
            borderColor: 'border-orange-300',
            speed: 6.0,
            damage: 1,
            points: 100,
            priority: 'medium',
            pattern: 'sine',
            icon: '📊'
        },
        {
            name: 'Review Session',
            color: 'from-amber-500 to-amber-600',
            borderColor: 'border-amber-300',
            speed: 4.5,
            damage: 0.8,
            points: 80,
            priority: 'medium',
            pattern: 'straight',
            icon: '👀'
        },

        // HIGH PRIORITY - Fast and dangerous
        {
            name: 'Quick Sync',
            color: 'from-red-500 to-red-600',
            borderColor: 'border-red-300',
            speed: 8.0,
            damage: 1.5,
            points: 150,
            priority: 'high',
            pattern: 'accelerate',
            icon: '⚡'
        },
        {
            name: 'Urgent Call',
            color: 'from-rose-500 to-rose-600',
            borderColor: 'border-rose-300',
            speed: 7.5,
            damage: 1.5,
            points: 150,
            priority: 'high',
            pattern: 'zigzag',
            icon: '📞'
        },

        // BOSS - Can only be blocked with shield
        {
            name: 'All Hands',
            color: 'from-pink-600 to-purple-700',
            borderColor: 'border-pink-300',
            speed: 3.5,
            damage: 2,
            points: 0,
            boss: true,
            priority: 'boss',
            pattern: 'straight',
            icon: '👑'
        },
        {
            name: 'Exec Review',
            color: 'from-purple-600 to-indigo-700',
            borderColor: 'border-purple-300',
            speed: 3.0,
            damage: 2.5,
            points: 0,
            boss: true,
            priority: 'boss',
            pattern: 'straight',
            icon: '🎯'
        },
    ];

    // Power-up types
    const powerUpTypes = [
        {
            type: 'coffee',
            name: 'Coffee Break',
            color: 'from-amber-500 to-orange-600',
            icon: Coffee,
            effect: 'slow',
            duration: 5000
        },
        {
            type: 'focus',
            name: 'Focus Boost',
            color: 'from-green-500 to-emerald-600',
            icon: Battery,
            effect: 'heal',
            amount: 1
        },
        {
            type: 'autodecline',
            name: 'Auto-Decline',
            color: 'from-cyan-500 to-blue-600',
            icon: Zap,
            effect: 'massZap'
        },
    ];

    // Sound Effects
    const playSound = useCallback((type) => {
        if (!soundEnabled) return;

        if (!audioContext.current) {
            audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        const ctx = audioContext.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        switch (type) {
            case 'decline':
                oscillator.frequency.setValueAtTime(880, ctx.currentTime);
                oscillator.frequency.setValueAtTime(1100, ctx.currentTime + 0.05);
                oscillator.type = 'square';
                gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
                gainNode.gain.setValueAtTime(0.01, ctx.currentTime + 0.15);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.15);
                break;
            case 'damage':
                oscillator.frequency.setValueAtTime(150, ctx.currentTime);
                oscillator.frequency.setValueAtTime(100, ctx.currentTime + 0.1);
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
                gainNode.gain.setValueAtTime(0.01, ctx.currentTime + 0.3);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.3);
                break;
            case 'shield':
                oscillator.frequency.setValueAtTime(523, ctx.currentTime);
                oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(1047, ctx.currentTime + 0.2);
                gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
                gainNode.gain.setValueAtTime(0.01, ctx.currentTime + 0.3);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.3);
                break;
            case 'powerup':
                oscillator.frequency.setValueAtTime(440, ctx.currentTime);
                oscillator.frequency.setValueAtTime(554, ctx.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.2);
                oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
                gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
                gainNode.gain.setValueAtTime(0.01, ctx.currentTime + 0.4);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.4);
                break;
            case 'combo':
                oscillator.frequency.setValueAtTime(659, ctx.currentTime);
                oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.05);
                oscillator.frequency.setValueAtTime(988, ctx.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
                gainNode.gain.setValueAtTime(0.01, ctx.currentTime + 0.2);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.2);
                break;
            case 'boss':
                oscillator.frequency.setValueAtTime(200, ctx.currentTime);
                oscillator.frequency.setValueAtTime(150, ctx.currentTime + 0.2);
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
                gainNode.gain.setValueAtTime(0.01, ctx.currentTime + 0.4);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.4);
                break;
            default:
                break;
        }
    }, [soundEnabled]);

    // Captain messages
    const captainMessages = {
        start: { text: "Defend your calendar! Let's go!", mood: 'excited' },
        decline: [
            { text: "Meeting declined! Freedom!", mood: 'happy' },
            { text: "That's the way!", mood: 'happy' },
            { text: "Another one bites the dust!", mood: 'happy' }
        ],
        combo3: { text: "🔥 Triple decline! Keep going!", mood: 'excited' },
        combo5: { text: "⚡ DECLINE MASTER! 2x Multiplier!", mood: 'excited' },
        combo10: { text: "🌟 LEGENDARY! 3x Multiplier!", mood: 'excited' },
        damage: { text: "Ouch! That meeting got through!", mood: 'concerned' },
        boss: { text: "👑 Boss meeting! Use SHIELD or let it pass!", mood: 'urgent' },
        bossBlocked: { text: "🛡️ SHIELD ACTIVATED! Boss blocked!", mood: 'excited' },
        shield: { text: "Shield ready! Press SPACE when needed.", mood: 'helpful' },
        powerup: { text: "Power-up collected! Nice!", mood: 'happy' },
        wave2: { text: "⚠️ Wave 2! They're getting faster!", mood: 'urgent' },
        wave3: { text: "🚨 FINAL WAVE! Boss rush incoming!", mood: 'urgent' },
        lowHealth: { text: "⚠️ Calendar critical! Stay focused!", mood: 'urgent' },
        win: { text: "🎉 CALENDAR DEFENDED! Deep work preserved!", mood: 'victory' },
        lose: { text: "📅 Burnout... Your calendar was overrun.", mood: 'sad' }
    };

    const updateCaptain = (eventType) => {
        const msg = captainMessages[eventType];
        if (Array.isArray(msg)) {
            setCaptainMessage(msg[Math.floor(Math.random() * msg.length)]);
        } else if (msg) {
            setCaptainMessage(msg);
        }
    };

    // Calculate position based on pattern
    const calculatePosition = (enemy, deltaTime) => {
        let newX = enemy.x - enemy.speed * deltaTime * (slowMotion ? 0.4 : 1);
        let newY = enemy.y;

        switch (enemy.pattern) {
            case 'zigzag':
                newY = enemy.baseY + Math.sin((100 - enemy.x) * 0.15) * 12;
                break;
            case 'sine':
                newY = enemy.baseY + Math.sin((100 - enemy.x) * 0.08) * 8;
                break;
            case 'accelerate':
                // Speed increases as it gets closer
                const accelFactor = 1 + (100 - enemy.x) * 0.01;
                newX = enemy.x - enemy.speed * deltaTime * accelFactor * (slowMotion ? 0.4 : 1);
                break;
            default:
                break;
        }

        return { x: newX, y: Math.max(10, Math.min(85, newY)) };
    };

    // Spawn enemy
    const spawnEnemy = useCallback(() => {
        if (gameStateRef.current !== 'playing') return;

        let availableTypes = meetingTypes;
        const currentWave = wave;

        // Filter based on wave
        if (currentWave < 2) {
            // Reduce boss meetings in early waves (only Wave 1)
            availableTypes = meetingTypes.filter(m => !m.boss);
        }

        // Weight towards harder enemies in later waves
        if (currentWave >= 2) {
            availableTypes = [...availableTypes, ...meetingTypes.filter(m => m.priority === 'high')];
        }

        const template = availableTypes[Math.floor(Math.random() * availableTypes.length)];
        const baseY = Math.random() * 60 + 20;

        const newEnemy = {
            id: Date.now() + Math.random(),
            ...template,
            x: 105,
            y: baseY,
            baseY: baseY,
            spawnTime: gameTimeRef.current
        };

        setEnemies(prev => [...prev, newEnemy]);

        if (template.boss) {
            playSound('boss');
            updateCaptain('boss');
        }
    }, [wave, playSound]);

    // Spawn power-up
    const spawnPowerUp = useCallback(() => {
        if (gameStateRef.current !== 'playing') return;
        if (Math.random() > 0.4) return; // 40% chance to spawn

        const template = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        const newPowerUp = {
            id: Date.now() + Math.random(),
            ...template,
            x: 105,
            y: Math.random() * 60 + 20,
            speed: 1.5
        };

        setPowerUps(prev => [...prev, newPowerUp]);
    }, []);

    // Start game
    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setDeepWorkHours(6);
        setEnemies([]);
        setPowerUps([]);
        setWave(1);
        setTimer(0);
        setCombo(0);
        setMaxCombo(0);
        setMultiplier(1);
        setShieldCharges(2);
        setShieldCooldown(0);
        setShieldActive(false);
        setSlowMotion(false);
        setStats({ declined: 0, bossBlocked: 0, powerUpsCollected: 0, damagesTaken: 0 });
        gameTimeRef.current = 0;
        updateCaptain('start');

        // Main game loop
        let lastTime = Date.now();
        gameLoopRef.current = setInterval(() => {
            const now = Date.now();
            const deltaTime = (now - lastTime) / 1000;
            lastTime = now;

            gameTimeRef.current += deltaTime;
            setTimer(Math.floor(gameTimeRef.current));

            // Update shield cooldown
            setShieldCooldown(prev => Math.max(0, prev - deltaTime));

            // Move enemies
            setEnemies(prev => {
                const updated = prev.map(enemy => {
                    const newPos = calculatePosition(enemy, deltaTime);
                    return { ...enemy, ...newPos };
                });

                // Check for impacts
                const hitting = updated.filter(e => e.x <= 12);
                if (hitting.length > 0) {
                    handleImpact(hitting);
                    return updated.filter(e => e.x > 12);
                }

                return updated;
            });

            // Move power-ups
            setPowerUps(prev => {
                return prev
                    .map(p => ({ ...p, x: p.x - p.speed * deltaTime * 50 }))
                    .filter(p => p.x > -10);
            });

            // Wave transitions
            if (gameTimeRef.current >= 12 && gameTimeRef.current < 12.1 && wave === 1) {
                setWave(2);
                setWaveAnnouncement('WAVE 2');
                updateCaptain('wave2');
                setTimeout(() => setWaveAnnouncement(null), 2000);
            } else if (gameTimeRef.current >= 28 && gameTimeRef.current < 28.1 && wave === 2) {
                setWave(3);
                setWaveAnnouncement('FINAL WAVE');
                updateCaptain('wave3');
                setTimeout(() => setWaveAnnouncement(null), 2000);
            }

            // Win condition
            if (gameTimeRef.current >= 45) {
                endGame(true);
            }
        }, 16); // ~60fps

        // Enemy spawner
        startSpawner(1400);

        // Power-up spawner
        powerUpSpawnerRef.current = setInterval(spawnPowerUp, 12000);
    };

    const startSpawner = (interval) => {
        if (spawnerRef.current) clearInterval(spawnerRef.current);
        spawnerRef.current = setInterval(() => {
            spawnEnemy();
        }, interval);
    };

    // Update spawner when wave changes
    useEffect(() => {
        if (gameState !== 'playing') return;

        switch (wave) {
            case 2:
                startSpawner(900);
                break;
            case 3:
                startSpawner(650);
                break;
            default:
                break;
        }
    }, [wave, gameState]);

    // Handle meeting impact
    const handleImpact = (meetings) => {
        let totalDamage = 0;
        let bossBlocked = false;

        meetings.forEach(meeting => {
            if (meeting.boss && shieldActive) {
                // Shield blocks boss
                bossBlocked = true;
                setStats(prev => ({ ...prev, bossBlocked: prev.bossBlocked + 1 }));
            } else {
                totalDamage += meeting.damage;
            }
        });

        if (bossBlocked) {
            updateCaptain('bossBlocked');
            playSound('shield');
            createParticle(15, 50, '🛡️', 'text-cyan-400');
        }

        if (totalDamage > 0) {
            setDeepWorkHours(prev => {
                const newHours = prev - totalDamage;
                if (newHours <= 0) {
                    endGame(false);
                    return 0;
                }
                if (newHours < 3) {
                    updateCaptain('lowHealth');
                }
                return newHours;
            });

            setCombo(0);
            setMultiplier(1);
            setStats(prev => ({ ...prev, damagesTaken: prev.damagesTaken + 1 }));
            updateCaptain('damage');
            playSound('damage');
            setShake(true);
            setFlashColor('red');
            setTimeout(() => {
                setShake(false);
                setFlashColor(null);
            }, 300);
        }
    };

    // Decline (zap) enemy
    const zapEnemy = (enemy) => {
        if (gameState !== 'playing') return;

        if (enemy.boss) {
            if (shieldActive) {
                // Can zap boss while shield is active
                setEnemies(prev => prev.filter(e => e.id !== enemy.id));
                setStats(prev => ({ ...prev, bossBlocked: prev.bossBlocked + 1 }));
                playSound('shield');
                createParticle(enemy.x, enemy.y, '🛡️ BLOCKED!', 'text-cyan-400');
                updateCaptain('bossBlocked');
            } else {
                updateCaptain('boss');
                return;
            }
        } else {
            // Regular meeting
            const newCombo = combo + 1;
            setCombo(newCombo);
            setMaxCombo(prev => Math.max(prev, newCombo));

            // Update multiplier based on combo
            let newMultiplier = 1;
            if (newCombo >= 10) {
                newMultiplier = 3;
                if (combo < 10) {
                    updateCaptain('combo10');
                    playSound('combo');
                }
            } else if (newCombo >= 5) {
                newMultiplier = 2;
                if (combo < 5) {
                    updateCaptain('combo5');
                    playSound('combo');
                }
            } else if (newCombo >= 3) {
                if (combo < 3) updateCaptain('combo3');
            } else {
                updateCaptain('decline');
            }
            setMultiplier(newMultiplier);

            const points = enemy.points * newMultiplier;
            setScore(prev => prev + points);
            setStats(prev => ({ ...prev, declined: prev.declined + 1 }));

            setEnemies(prev => prev.filter(e => e.id !== enemy.id));
            playSound('decline');

            // Visual feedback
            setFlashColor('green');
            setTimeout(() => setFlashColor(null), 100);

            createParticle(enemy.x, enemy.y, `+${points}`, newMultiplier >= 2 ? 'text-yellow-400' : 'text-green-400');
        }
    };

    // Collect power-up
    const collectPowerUp = (powerUp) => {
        if (gameState !== 'playing') return;

        setPowerUps(prev => prev.filter(p => p.id !== powerUp.id));
        setStats(prev => ({ ...prev, powerUpsCollected: prev.powerUpsCollected + 1 }));
        playSound('powerup');
        updateCaptain('powerup');

        switch (powerUp.effect) {
            case 'slow':
                setSlowMotion(true);
                createParticle(powerUp.x, powerUp.y, '☕ SLOW-MO!', 'text-amber-400');
                setTimeout(() => setSlowMotion(false), powerUp.duration);
                break;
            case 'heal':
                setDeepWorkHours(prev => Math.min(6, prev + powerUp.amount));
                createParticle(powerUp.x, powerUp.y, '+1 HOUR!', 'text-green-400');
                break;
            case 'massZap':
                // Zap all non-boss enemies
                const zapped = enemies.filter(e => !e.boss);
                const totalPoints = zapped.reduce((sum, e) => sum + e.points, 0);
                setScore(prev => prev + totalPoints);
                setEnemies(prev => prev.filter(e => e.boss));
                createParticle(50, 50, `⚡ ${zapped.length} DECLINED!`, 'text-cyan-400');
                break;
            default:
                break;
        }
    };

    // Create particle effect
    const createParticle = (x, y, text, colorClass) => {
        const particle = {
            id: Date.now() + Math.random(),
            x,
            y,
            text,
            colorClass
        };
        setParticles(prev => [...prev, particle]);
        setTimeout(() => setParticles(prev => prev.filter(p => p.id !== particle.id)), 800);
    };

    // Activate shield
    const activateShield = useCallback(() => {
        if (gameState !== 'playing') return;
        if (shieldCooldown > 0 || shieldCharges <= 0) return;

        setShieldActive(true);
        setShieldCharges(prev => prev - 1);
        playSound('shield');

        setTimeout(() => {
            setShieldActive(false);
            setShieldCooldown(SHIELD_COOLDOWN);
        }, SHIELD_DURATION);
    }, [gameState, shieldCooldown, shieldCharges, playSound]);

    // Keyboard controls
    useEffect(() => {
        if (gameState !== 'playing') return;

        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();

            if (key === ' ' || key === 's') {
                e.preventDefault();
                activateShield();
            }

            // If hovering over an enemy, Enter/E to decline
            if ((key === 'enter' || key === 'e') && hoveredEnemy) {
                const enemy = enemies.find(e => e.id === hoveredEnemy);
                if (enemy) zapEnemy(enemy);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, activateShield, hoveredEnemy, enemies]);

    // End game
    const endGame = async (win) => {
        clearInterval(gameLoopRef.current);
        clearInterval(spawnerRef.current);
        clearInterval(powerUpSpawnerRef.current);
        setGameState(win ? 'won' : 'lost');

        // Update personal best
        const finalScore = score;
        if (finalScore > personalBest.score) {
            const newBest = { score: finalScore, survived: win };
            setPersonalBest(newBest);
            localStorage.setItem('calendarBest', JSON.stringify(newBest));
        }

        try {
            await api.submitScore('calendar', finalScore);
        } catch (err) {
            console.error('Failed to submit score:', err);
        }

        if (win) {
            updateCaptain('win');
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#a855f7', '#06b6d4', '#22c55e']
            });
        } else {
            updateCaptain('lose');
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            clearInterval(gameLoopRef.current);
            clearInterval(spawnerRef.current);
            clearInterval(powerUpSpawnerRef.current);
        };
    }, []);

    // Calculate health bar color
    const healthPercent = (deepWorkHours / 6) * 100;
    const healthColor = healthPercent > 50 ? 'from-green-500 to-emerald-400'
        : healthPercent > 25 ? 'from-yellow-500 to-orange-400'
            : 'from-red-500 to-rose-400';

    // Mood colors for Captain
    const moodColors = {
        neutral: 'bg-purple-600',
        happy: 'bg-green-500',
        excited: 'bg-yellow-500',
        concerned: 'bg-orange-500',
        urgent: 'bg-red-500 animate-pulse',
        victory: 'bg-gradient-to-r from-purple-400 to-cyan-400',
        sad: 'bg-slate-500',
        helpful: 'bg-cyan-500'
    };

    return (
        <div
            className={`w-full max-w-2xl mx-auto bg-slate-900/90 border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl relative backdrop-blur-sm transition-all ${shake ? 'animate-[shake_0.3s_ease-in-out]' : ''}`}
            style={{
                boxShadow: flashColor === 'green' ? '0 0 40px rgba(34, 197, 94, 0.4)' :
                    flashColor === 'red' ? '0 0 40px rgba(239, 68, 68, 0.5)' :
                        shieldActive ? '0 0 60px rgba(6, 182, 212, 0.6)' :
                            '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
        >
            {/* HUD */}
            <div className="bg-slate-800/95 p-3 sm:p-4 border-b border-slate-600 backdrop-blur-xl">
                <div className="flex justify-between items-center gap-2">
                    {/* Left: Time & Wave */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-1.5">
                            <Clock size={16} className="text-purple-400" />
                            <span className={`font-bold font-mono text-sm sm:text-lg ${timer >= 38 ? 'text-green-400' : 'text-purple-400'}`}>
                                {timer}/45s
                            </span>
                        </div>
                        <div className="text-slate-400 font-mono text-xs sm:text-sm">W{wave}</div>
                        {combo > 0 && (
                            <div className="flex items-center gap-1 text-orange-400">
                                <span className="font-bold font-mono text-sm">{combo}x</span>
                                {multiplier > 1 && (
                                    <span className="text-xs bg-yellow-500/20 px-1.5 py-0.5 rounded text-yellow-400 font-bold">
                                        {multiplier}x
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Center: Score */}
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{score}</div>
                        {personalBest.score > 0 && (
                            <div className="text-[10px] text-slate-400">Best: {personalBest.score}</div>
                        )}
                    </div>

                    {/* Right: Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-colors"
                        >
                            {soundEnabled ? <Volume2 size={16} className="text-slate-300" /> : <VolumeX size={16} className="text-slate-400" />}
                        </button>
                        <button
                            onClick={() => setShowControls(!showControls)}
                            className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-colors"
                        >
                            <Keyboard size={16} className="text-slate-300" />
                        </button>
                    </div>
                </div>

                {/* Health Bar */}
                <div className="mt-2 flex items-center gap-2">
                    <Shield size={16} className={deepWorkHours < 3 ? 'text-red-500 animate-pulse' : 'text-cyan-400'} />
                    <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                        <m.div
                            className={`h-full bg-gradient-to-r ${healthColor} rounded-full`}
                            initial={{ width: '100%' }}
                            animate={{ width: `${healthPercent}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <span className={`font-bold font-mono text-sm w-12 text-right ${deepWorkHours < 3 ? 'text-red-500' : 'text-slate-300'}`}>
                        {deepWorkHours.toFixed(1)}h
                    </span>
                </div>

                {/* Captain & Shield Status */}
                <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-600/50">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg transition-all ${moodColors[captainMessage.mood]}`}>
                            CE
                        </div>
                        <p className="text-xs sm:text-sm text-purple-300 font-medium truncate">{captainMessage.text}</p>
                    </div>

                    {/* Shield Status */}
                    <div className="flex items-center gap-1">
                        {[...Array(2)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${i < shieldCharges
                                    ? shieldActive ? 'bg-cyan-400 animate-pulse' : 'bg-cyan-600'
                                    : 'bg-slate-700'
                                    }`}
                            >
                                <Shield size={12} className={i < shieldCharges ? 'text-white' : 'text-slate-400'} />
                            </div>
                        ))}
                        {shieldCooldown > 0 && (
                            <span className="text-xs text-slate-400 font-mono ml-1">{Math.ceil(shieldCooldown)}s</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Controls Overlay */}
            <AnimatePresence>
                {showControls && (
                    <m.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-[160px] sm:top-[180px] left-4 right-4 bg-slate-800/95 border border-purple-500/30 rounded-lg p-3 z-40 backdrop-blur-md"
                    >
                        <div className="flex justify-between items-start">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                                <div><kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono">Click</kbd> Decline meeting</div>
                                <div><kbd className="px-1.5 py-0.5 bg-cyan-900/50 rounded text-cyan-400 font-mono">Space/S</kbd> Shield</div>
                                <div><kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono">Hover+E</kbd> Decline</div>
                                <div className="text-slate-400">Click power-ups to collect</div>
                            </div>
                            <button onClick={() => setShowControls(false)} className="text-slate-400 hover:text-white">×</button>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Game Area */}
            <div className="relative h-[380px] sm:h-[420px] bg-gradient-to-b from-[#0a0a14] to-[#0f0f1a] overflow-hidden cursor-crosshair">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Shield Visual Effect */}
                {shieldActive && (
                    <m.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-cyan-500/30 to-transparent pointer-events-none z-20"
                    >
                        <div className="absolute inset-0 border-r-4 border-cyan-400 animate-pulse" />
                    </m.div>
                )}

                {/* Calendar Fortress */}
                <div className={`absolute left-0 top-0 bottom-0 w-[12%] bg-gradient-to-r from-purple-900/40 to-transparent border-r-2 transition-all ${shieldActive ? 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.5)]' : 'border-purple-500/50'
                    } flex flex-col justify-center items-center z-10`}>
                    <div className="text-purple-400/70 font-bold rotate-90 whitespace-nowrap tracking-widest text-[10px] sm:text-xs">
                        DEEP WORK ZONE
                    </div>
                </div>

                {/* Slow-mo indicator */}
                {slowMotion && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-500/20 text-amber-400 px-4 py-1 rounded-full text-sm font-bold z-30 flex items-center gap-2">
                        <Coffee size={16} /> SLOW MOTION
                    </div>
                )}

                {/* Wave Announcement */}
                <AnimatePresence>
                    {waveAnnouncement && (
                        <m.div
                            initial={{ opacity: 0, scale: 1.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                        >
                            <h1 className="text-5xl sm:text-7xl font-black text-purple-500/30 tracking-widest">
                                {waveAnnouncement}
                            </h1>
                        </m.div>
                    )}
                </AnimatePresence>

                {/* Start Screen */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-30 backdrop-blur-sm text-center p-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg shadow-purple-500/30">
                            CE
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Meeting Mayhem</h3>
                        <p className="text-slate-300 mb-6 max-w-sm text-sm sm:text-base">
                            Your calendar is under attack! Decline meetings to protect your deep work time.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-6 text-left text-xs max-w-sm">
                            <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-2.5">
                                <div className="flex items-center gap-2 text-purple-300 font-bold mb-1">
                                    <XCircle size={14} /> CLICK TO DECLINE
                                </div>
                                <p className="text-slate-400 text-[10px]">Regular meetings can be declined</p>
                            </div>
                            <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-lg p-2.5">
                                <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1">
                                    <Shield size={14} /> SHIELD (SPACE)
                                </div>
                                <p className="text-slate-400 text-[10px]">Block boss meetings with shield</p>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-4 text-xs">
                            <span className="px-2 py-1 rounded bg-green-900/50 text-green-400">Low Priority</span>
                            <span className="px-2 py-1 rounded bg-yellow-900/50 text-yellow-400">Medium</span>
                            <span className="px-2 py-1 rounded bg-red-900/50 text-red-400">High</span>
                            <span className="px-2 py-1 rounded bg-pink-900/50 text-pink-400">👑 Boss</span>
                        </div>

                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-purple-900/50"
                        >
                            <Play size={20} /> START DEFENSE
                        </button>

                        {personalBest.score > 0 && (
                            <div className="mt-4 flex items-center gap-2 text-yellow-400 text-sm">
                                <Trophy size={16} />
                                Personal Best: {personalBest.score} pts
                            </div>
                        )}
                    </div>
                )}

                {/* Game Over Screen */}
                {(gameState === 'won' || gameState === 'lost') && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 z-30 backdrop-blur-md text-center p-4">
                        <m.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full max-w-sm"
                        >
                            <h3 className={`text-3xl sm:text-4xl font-bold mb-2 ${gameState === 'won' ? 'text-green-400' : 'text-red-400'}`}>
                                {gameState === 'won' ? '🛡️ CALENDAR SECURED!' : '📅 BURNOUT'}
                            </h3>

                            <div className="text-4xl sm:text-5xl font-bold text-white mb-2 font-mono">{score}</div>

                            {score > personalBest.score && (
                                <div className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold mb-4">
                                    <Trophy size={14} /> NEW BEST!
                                </div>
                            )}

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-2 mt-4 mb-6 text-sm">
                                <div className="bg-slate-800/50 rounded-lg p-2">
                                    <div className="text-slate-400">Declined</div>
                                    <div className="text-xl font-bold text-purple-400">{stats.declined}</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-2">
                                    <div className="text-slate-400">Max Combo</div>
                                    <div className="text-xl font-bold text-orange-400">{maxCombo}x</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-2">
                                    <div className="text-slate-400">Boss Blocked</div>
                                    <div className="text-xl font-bold text-cyan-400">{stats.bossBlocked}</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-2">
                                    <div className="text-slate-400">Deep Work Left</div>
                                    <div className="text-xl font-bold text-green-400">{deepWorkHours.toFixed(1)}h</div>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={onBack}
                                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all"
                                >
                                    <ArrowLeft size={18} /> Hub
                                </button>
                                <button
                                    onClick={startGame}
                                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/50"
                                >
                                    <RotateCcw size={18} /> Again
                                </button>
                            </div>
                        </m.div>
                    </div>
                )}

                {/* Power-ups */}
                <AnimatePresence>
                    {powerUps.map((powerUp) => {
                        const IconComponent = powerUp.icon;
                        return (
                            <m.button
                                key={powerUp.id}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => collectPowerUp(powerUp)}
                                className={`absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${powerUp.color} flex items-center justify-center shadow-lg cursor-pointer z-25 border-2 border-white/30`}
                                style={{
                                    left: `${powerUp.x}%`,
                                    top: `${powerUp.y}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <IconComponent size={20} className="text-white" />
                            </m.button>
                        );
                    })}
                </AnimatePresence>

                {/* Enemies (Meetings) */}
                <AnimatePresence>
                    {enemies.map((enemy) => (
                        <m.button
                            key={enemy.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0, rotate: 360 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => zapEnemy(enemy)}
                            onMouseEnter={() => setHoveredEnemy(enemy.id)}
                            onMouseLeave={() => setHoveredEnemy(null)}
                            className={`absolute px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg shadow-lg flex items-center gap-1.5 border-2 ${enemy.borderColor} transition-all z-20 ${enemy.boss
                                ? shieldActive ? 'cursor-pointer ring-2 ring-cyan-400' : 'cursor-not-allowed opacity-90'
                                : 'cursor-pointer hover:ring-2 hover:ring-white/50'
                                } bg-gradient-to-r ${enemy.color}`}
                            style={{
                                left: `${enemy.x}%`,
                                top: `${enemy.y}%`,
                                transform: 'translate(-50%, -50%)',
                                minWidth: '60px',
                                minHeight: '40px'
                            }}
                        >
                            <span className="text-sm">{enemy.icon}</span>
                            <span className="text-white font-bold text-[10px] sm:text-xs truncate max-w-[80px]">
                                {enemy.name}
                            </span>
                            {!enemy.boss && (
                                <XCircle size={12} className="text-white/70 hidden sm:block" />
                            )}
                        </m.button>
                    ))}
                </AnimatePresence>

                {/* Particles */}
                <AnimatePresence>
                    {particles.map(particle => (
                        <m.div
                            key={particle.id}
                            initial={{ opacity: 1, y: 0, scale: 1 }}
                            animate={{ opacity: 0, y: -50, scale: 1.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className={`absolute ${particle.colorClass} font-bold text-lg sm:text-xl pointer-events-none z-30 whitespace-nowrap`}
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            {particle.text}
                        </m.div>
                    ))}
                </AnimatePresence>

                {/* Danger overlay when low health */}
                {deepWorkHours < 3 && gameState === 'playing' && (
                    <div className="absolute inset-0 border-4 border-red-500/50 animate-pulse pointer-events-none z-10" />
                )}
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    50% { transform: translateX(5px); }
                    75% { transform: translateX(-5px); }
                }
            `}</style>
        </div>
    );
};

export default CalendarDefenseGame;
