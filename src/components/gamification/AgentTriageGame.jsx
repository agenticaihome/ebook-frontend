import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Trash2, Play, RotateCcw, ArrowLeft, Trophy, Volume2, VolumeX, Zap, Clock, Target, Flame, Keyboard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';

const AgentTriageGame = ({ onBack }) => {
    // Core Game State
    const [gameState, setGameState] = useState('start');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(45);
    const [emails, setEmails] = useState([]);
    const [emailsTriaged, setEmailsTriaged] = useState(0);
    const [selectedEmailIndex, setSelectedEmailIndex] = useState(0);

    // Combo & Streak
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [streak, setStreak] = useState({ delegate: 0, delete: 0 });

    // Waves & Difficulty
    const [wave, setWave] = useState(1);
    const [waveAnnouncement, setWaveAnnouncement] = useState(null);

    // Stats
    const [stats, setStats] = useState({ correct: 0, wrong: 0, fastActions: 0, criticalSaved: 0 });
    const [personalBest, setPersonalBest] = useState(() => {
        const saved = localStorage.getItem('triageBest');
        return saved ? JSON.parse(saved) : { score: 0, triaged: 0 };
    });

    // UI State
    const [captainMessage, setCaptainMessage] = useState({ text: "Ready to master your inbox?", mood: 'neutral' });
    const [particles, setParticles] = useState([]);
    const [shake, setShake] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [flashColor, setFlashColor] = useState(null);

    // Refs
    const gameLoopRef = useRef(null);
    const timerRef = useRef(null);
    const audioContext = useRef(null);
    const gameAreaRef = useRef(null);

    // Lane System - 3 lanes to prevent overlap
    const lanes = [
        { id: 0, x: 16 },
        { id: 1, x: 50 },
        { id: 2, x: 84 }
    ];
    const [laneOccupancy, setLaneOccupancy] = useState([false, false, false]);

    // Email Templates with more variety
    const emailTypes = [
        // DELEGATE emails (work-related, important)
        { type: 'urgent', subject: '🔥 Client deadline TODAY', action: 'delegate', color: 'from-red-500/20 to-red-900/20', borderColor: 'border-red-500/50', icon: '🔥', priority: 'critical' },
        { type: 'boss', subject: '⚡ Meeting request from CEO', action: 'delegate', color: 'from-yellow-500/20 to-yellow-900/20', borderColor: 'border-yellow-500/50', icon: '⚡', priority: 'high' },
        { type: 'work', subject: '📊 Q4 Report needs approval', action: 'delegate', color: 'from-cyan-500/20 to-cyan-900/20', borderColor: 'border-cyan-500/30', icon: '📊', priority: 'normal' },
        { type: 'meeting', subject: '📅 Team sync in 30 mins', action: 'delegate', color: 'from-purple-500/20 to-purple-900/20', borderColor: 'border-purple-500/30', icon: '📅', priority: 'normal' },
        { type: 'client', subject: '💼 Contract ready for review', action: 'delegate', color: 'from-emerald-500/20 to-emerald-900/20', borderColor: 'border-emerald-500/30', icon: '💼', priority: 'high' },
        { type: 'project', subject: '🎯 Sprint blocker identified', action: 'delegate', color: 'from-orange-500/20 to-orange-900/20', borderColor: 'border-orange-500/30', icon: '🎯', priority: 'high' },

        // DELETE emails (spam, newsletters, junk)
        { type: 'spam', subject: '🎁 You won $1,000,000!', action: 'delete', color: 'from-slate-500/20 to-slate-900/20', borderColor: 'border-slate-500/30', icon: '🎁', priority: 'normal' },
        { type: 'newsletter', subject: '📧 Weekly Marketing Digest', action: 'delete', color: 'from-blue-500/20 to-blue-900/20', borderColor: 'border-blue-500/30', icon: '📧', priority: 'normal' },
        { type: 'receipt', subject: '🧾 Your Amazon receipt', action: 'delete', color: 'from-green-500/20 to-green-900/20', borderColor: 'border-green-500/30', icon: '🧾', priority: 'normal' },
        { type: 'promo', subject: '🏷️ 50% OFF TODAY ONLY', action: 'delete', color: 'from-pink-500/20 to-pink-900/20', borderColor: 'border-pink-500/30', icon: '🏷️', priority: 'normal' },
        { type: 'social', subject: '👤 LinkedIn: New connection', action: 'delete', color: 'from-sky-500/20 to-sky-900/20', borderColor: 'border-sky-500/30', icon: '👤', priority: 'normal' },
        { type: 'junk', subject: '💊 Miracle weight loss pill', action: 'delete', color: 'from-gray-500/20 to-gray-900/20', borderColor: 'border-gray-500/30', icon: '💊', priority: 'normal' },
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
            case 'correct':
                oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
                gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
                gainNode.gain.exponentialDecayTo?.(0.01, ctx.currentTime + 0.2) || gainNode.gain.setValueAtTime(0.01, ctx.currentTime + 0.2);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.2);
                break;
            case 'wrong':
                oscillator.frequency.setValueAtTime(200, ctx.currentTime);
                oscillator.type = 'square';
                gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
                gainNode.gain.setValueAtTime(0.01, ctx.currentTime + 0.3);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.3);
                break;
            case 'combo':
                oscillator.frequency.setValueAtTime(784, ctx.currentTime); // G5
                oscillator.frequency.setValueAtTime(988, ctx.currentTime + 0.1); // B5
                oscillator.frequency.setValueAtTime(1175, ctx.currentTime + 0.15); // D6
                gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
                gainNode.gain.setValueAtTime(0.01, ctx.currentTime + 0.25);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.25);
                break;
            case 'spawn':
                oscillator.frequency.setValueAtTime(300, ctx.currentTime);
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
                gainNode.gain.setValueAtTime(0.01, ctx.currentTime + 0.1);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.1);
                break;
            case 'critical':
                oscillator.frequency.setValueAtTime(880, ctx.currentTime);
                oscillator.frequency.setValueAtTime(440, ctx.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
                gainNode.gain.setValueAtTime(0.01, ctx.currentTime + 0.3);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.3);
                break;
            default:
                break;
        }
    }, [soundEnabled]);

    // Captain Messages based on game events
    const captainMessages = {
        start: [
            { text: "Let's clear this inbox!", mood: 'excited' },
            { text: "Remember: Work → Delegate, Junk → Delete", mood: 'helpful' }
        ],
        correct: [
            { text: "Perfect sort!", mood: 'happy' },
            { text: "That's the way!", mood: 'happy' },
            { text: "Efficient!", mood: 'happy' }
        ],
        wrong: [
            { text: "Oops! Watch the categories.", mood: 'concerned' },
            { text: "That one slipped. Refocus!", mood: 'concerned' }
        ],
        combo3: [
            { text: "🔥 Triple combo! Keep it up!", mood: 'excited' }
        ],
        combo5: [
            { text: "⚡ UNSTOPPABLE! +15 bonus!", mood: 'excited' }
        ],
        combo10: [
            { text: "🏆 LEGENDARY STREAK!", mood: 'excited' }
        ],
        critical: [
            { text: "🚨 CRITICAL EMAIL! Handle it fast!", mood: 'urgent' }
        ],
        wave2: [
            { text: "⚠️ WAVE 2: They're coming faster!", mood: 'urgent' }
        ],
        wave3: [
            { text: "🌊 FINAL WAVE: Maximum intensity!", mood: 'urgent' }
        ],
        almostWin: [
            { text: "Almost there! Just a few more!", mood: 'excited' }
        ],
        win: [
            { text: "🎉 INBOX ZERO ACHIEVED!", mood: 'victory' }
        ],
        lose: [
            { text: "Inbox overflow! Your agent needs more training.", mood: 'sad' }
        ]
    };

    const updateCaptain = (eventType) => {
        const messages = captainMessages[eventType];
        if (messages) {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            setCaptainMessage(msg);
        }
    };

    // Find available lane
    const findAvailableLane = () => {
        const available = laneOccupancy.map((occupied, idx) => !occupied ? idx : -1).filter(idx => idx !== -1);
        if (available.length === 0) return -1;
        return available[Math.floor(Math.random() * available.length)];
    };

    // Spawn Email
    const spawnEmail = useCallback(() => {
        const laneIndex = findAvailableLane();
        if (laneIndex === -1) {
            // No lanes available - could lead to overflow
            return;
        }

        const template = emailTypes[Math.floor(Math.random() * emailTypes.length)];

        // Wave 3 has more critical emails
        const isCritical = wave === 3 ? Math.random() < 0.3 : Math.random() < 0.1;

        const newEmail = {
            id: Date.now() + Math.random(),
            ...template,
            lane: laneIndex,
            x: lanes[laneIndex].x,
            spawnTime: Date.now(),
            isCritical: isCritical || template.priority === 'critical',
            timeToLive: isCritical ? 4000 : 8000 // Critical emails expire faster
        };

        setLaneOccupancy(prev => {
            const updated = [...prev];
            updated[laneIndex] = true;
            return updated;
        });

        setEmails(prev => {
            if (prev.length >= 6) {
                endGame(false);
                return prev;
            }
            return [...prev, newEmail];
        });

        playSound(isCritical ? 'critical' : 'spawn');

        if (isCritical) {
            updateCaptain('critical');
        }
    }, [wave, playSound]);

    // Start Game
    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(45);
        setEmails([]);
        setEmailsTriaged(0);
        setCombo(0);
        setMaxCombo(0);
        setWave(1);
        setStats({ correct: 0, wrong: 0, fastActions: 0, criticalSaved: 0 });
        setLaneOccupancy([false, false, false]);
        setSelectedEmailIndex(0);
        updateCaptain('start');

        // Start Timer
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Initial spawn
        setTimeout(() => spawnEmail(), 500);

        // Start spawner
        startSpawner(2000);
    };

    const startSpawner = (interval) => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        gameLoopRef.current = setInterval(() => {
            spawnEmail();
        }, interval);
    };

    // Wave Management
    useEffect(() => {
        if (gameState !== 'playing') return;

        if (timeLeft === 30 && wave === 1) {
            setWave(2);
            setWaveAnnouncement('WAVE 2');
            updateCaptain('wave2');
            startSpawner(1400);
            setTimeout(() => setWaveAnnouncement(null), 2000);
        } else if (timeLeft === 15 && wave === 2) {
            setWave(3);
            setWaveAnnouncement('FINAL WAVE');
            updateCaptain('wave3');
            startSpawner(900);
            setTimeout(() => setWaveAnnouncement(null), 2000);
        }
    }, [timeLeft, wave, gameState]);

    // Check for almost win
    useEffect(() => {
        if (gameState === 'playing' && emailsTriaged >= 17 && emailsTriaged < 20) {
            updateCaptain('almostWin');
        }
    }, [emailsTriaged, gameState]);

    // Handle email timeout (for critical emails)
    useEffect(() => {
        if (gameState !== 'playing') return;

        const checkExpired = setInterval(() => {
            const now = Date.now();
            setEmails(prev => {
                const expired = prev.filter(email => email.isCritical && (now - email.spawnTime) > email.timeToLive);
                if (expired.length > 0) {
                    // Critical email expired - penalty
                    setScore(s => Math.max(0, s - 20));
                    setCombo(0);
                    setShake(true);
                    setTimeout(() => setShake(false), 300);
                    playSound('wrong');

                    // Free up lanes
                    expired.forEach(email => {
                        setLaneOccupancy(lo => {
                            const updated = [...lo];
                            updated[email.lane] = false;
                            return updated;
                        });
                    });

                    return prev.filter(email => !(email.isCritical && (now - email.spawnTime) > email.timeToLive));
                }
                return prev;
            });
        }, 500);

        return () => clearInterval(checkExpired);
    }, [gameState, playSound]);

    // Handle Action
    const handleAction = (id, action) => {
        if (gameState !== 'playing') return;

        const email = emails.find(e => e.id === id);
        if (!email) return;

        const isCorrect = email.action === action;
        const responseTime = Date.now() - email.spawnTime;
        const isFast = responseTime < 1500;

        if (isCorrect) {
            // Calculate points
            let points = 10;
            const newCombo = combo + 1;

            // Fast action bonus
            if (isFast) {
                points += 5;
                setStats(prev => ({ ...prev, fastActions: prev.fastActions + 1 }));
            }

            // Critical email bonus
            if (email.isCritical) {
                points += 10;
                setStats(prev => ({ ...prev, criticalSaved: prev.criticalSaved + 1 }));
            }

            // Combo bonuses
            if (newCombo >= 10) {
                points += 25;
                updateCaptain('combo10');
                playSound('combo');
            } else if (newCombo >= 5) {
                points += 15;
                updateCaptain('combo5');
                playSound('combo');
            } else if (newCombo >= 3) {
                points += 5;
                updateCaptain('combo3');
            } else {
                updateCaptain('correct');
            }

            // Update state
            setScore(prev => prev + points);
            setCombo(newCombo);
            setMaxCombo(prev => Math.max(prev, newCombo));
            setEmailsTriaged(prev => prev + 1);
            setStats(prev => ({ ...prev, correct: prev.correct + 1 }));

            // Visual feedback
            setFlashColor('green');
            setTimeout(() => setFlashColor(null), 150);
            playSound('correct');

            // Particle effect
            setParticles(prev => [...prev, {
                id: Date.now(),
                x: email.x,
                y: 30,
                text: `+${points}`,
                color: points >= 20 ? 'text-yellow-400' : 'text-green-400'
            }]);
            setTimeout(() => setParticles(prev => prev.slice(1)), 600);

            // Free lane
            setLaneOccupancy(prev => {
                const updated = [...prev];
                updated[email.lane] = false;
                return updated;
            });

            // Remove email
            setEmails(prev => prev.filter(e => e.id !== id));

            // Check win
            if (emailsTriaged + 1 >= 20) {
                endGame(true);
            }
        } else {
            // Wrong action
            setCombo(0);
            setScore(prev => Math.max(0, prev - 10));
            setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
            updateCaptain('wrong');

            // Visual feedback
            setFlashColor('red');
            setShake(true);
            setTimeout(() => {
                setFlashColor(null);
                setShake(false);
            }, 300);
            playSound('wrong');
        }
    };

    // Keyboard Controls
    useEffect(() => {
        if (gameState !== 'playing') return;

        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();

            // Select email with arrow keys or number keys
            if (key === 'arrowleft' || key === 'arrowup') {
                setSelectedEmailIndex(prev => Math.max(0, prev - 1));
            } else if (key === 'arrowright' || key === 'arrowdown') {
                setSelectedEmailIndex(prev => Math.min(emails.length - 1, prev + 1));
            } else if (key >= '1' && key <= '9') {
                const idx = parseInt(key) - 1;
                if (idx < emails.length) setSelectedEmailIndex(idx);
            }

            // Actions
            if (emails.length > 0 && selectedEmailIndex < emails.length) {
                const selectedEmail = emails[selectedEmailIndex];
                if (key === 'd' || key === 'j') {
                    handleAction(selectedEmail.id, 'delegate');
                } else if (key === 'x' || key === 'k' || key === 'delete' || key === 'backspace') {
                    e.preventDefault();
                    handleAction(selectedEmail.id, 'delete');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, emails, selectedEmailIndex]);

    // Keep selected index valid
    useEffect(() => {
        if (selectedEmailIndex >= emails.length && emails.length > 0) {
            setSelectedEmailIndex(emails.length - 1);
        }
    }, [emails.length, selectedEmailIndex]);

    // End Game
    const endGame = async (win) => {
        clearInterval(gameLoopRef.current);
        clearInterval(timerRef.current);
        setGameState(win ? 'won' : 'lost');

        // Update personal best
        const finalScore = score;
        if (finalScore > personalBest.score || emailsTriaged > personalBest.triaged) {
            const newBest = {
                score: Math.max(finalScore, personalBest.score),
                triaged: Math.max(emailsTriaged, personalBest.triaged)
            };
            setPersonalBest(newBest);
            localStorage.setItem('triageBest', JSON.stringify(newBest));
        }

        // Submit score
        try {
            await api.submitScore('triage', finalScore);
        } catch (err) {
            console.error('Failed to submit score:', err);
        }

        if (win) {
            updateCaptain('win');
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#06b6d4', '#22c55e', '#eab308']
            });
        } else {
            updateCaptain('lose');
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            clearInterval(gameLoopRef.current);
            clearInterval(timerRef.current);
        };
    }, []);

    // Captain avatar mood colors
    const moodColors = {
        neutral: 'bg-cyan-600',
        happy: 'bg-green-500',
        excited: 'bg-yellow-500',
        concerned: 'bg-orange-500',
        urgent: 'bg-red-500 animate-pulse',
        victory: 'bg-gradient-to-r from-yellow-400 to-green-400',
        sad: 'bg-slate-500'
    };

    return (
        <div
            ref={gameAreaRef}
            className={`w-full max-w-2xl mx-auto bg-slate-900/90 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl relative backdrop-blur-sm transition-all ${shake ? 'animate-[shake_0.3s_ease-in-out]' : ''}`}
            style={{
                boxShadow: flashColor === 'green' ? '0 0 40px rgba(34, 197, 94, 0.5)' :
                    flashColor === 'red' ? '0 0 40px rgba(239, 68, 68, 0.5)' :
                        '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
        >
            {/* Header / HUD */}
            <div className="bg-slate-800/95 p-3 sm:p-4 border-b border-slate-700 backdrop-blur-xl">
                <div className="flex justify-between items-center gap-2">
                    {/* Left: Progress & Time */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-1.5">
                            <Target size={16} className="text-cyan-400" />
                            <span className="text-cyan-400 font-bold font-mono text-sm sm:text-lg">{emailsTriaged}/20</span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-slate-300'}`}>
                            <Clock size={16} />
                            <span className="font-bold font-mono text-sm sm:text-lg">{timeLeft}s</span>
                        </div>
                        {combo > 0 && (
                            <div className="flex items-center gap-1 text-orange-400">
                                <Flame size={16} className={combo >= 5 ? 'animate-pulse' : ''} />
                                <span className="font-bold font-mono text-sm">{combo}x</span>
                            </div>
                        )}
                    </div>

                    {/* Center: Score */}
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{score}</div>
                        {personalBest.score > 0 && (
                            <div className="text-[10px] text-slate-500">Best: {personalBest.score}</div>
                        )}
                    </div>

                    {/* Right: Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-colors"
                            title={soundEnabled ? 'Mute' : 'Unmute'}
                        >
                            {soundEnabled ? <Volume2 size={16} className="text-slate-300" /> : <VolumeX size={16} className="text-slate-500" />}
                        </button>
                        <button
                            onClick={() => setShowControls(!showControls)}
                            className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-colors"
                            title="Keyboard shortcuts"
                        >
                            <Keyboard size={16} className="text-slate-300" />
                        </button>
                    </div>
                </div>

                {/* Captain Efficiency Bar */}
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700/50">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg transition-all ${moodColors[captainMessage.mood]}`}>
                        CE
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-cyan-300 font-medium truncate">{captainMessage.text}</p>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">W{wave}</div>
                </div>
            </div>

            {/* Keyboard Controls Overlay */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-[120px] sm:top-[140px] left-4 right-4 bg-slate-800/95 border border-cyan-500/30 rounded-lg p-3 z-40 backdrop-blur-md"
                    >
                        <div className="flex justify-between items-start">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                                <div><kbd className="px-1.5 py-0.5 bg-green-900/50 rounded text-green-400 font-mono">D</kbd> Delegate</div>
                                <div><kbd className="px-1.5 py-0.5 bg-red-900/50 rounded text-red-400 font-mono">X</kbd> Delete</div>
                                <div><kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono">←→</kbd> Select</div>
                                <div><kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono">1-9</kbd> Quick select</div>
                            </div>
                            <button onClick={() => setShowControls(false)} className="text-slate-400 hover:text-white">×</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Game Area */}
            <div className="relative h-[380px] sm:h-[420px] bg-gradient-to-b from-[#0a0a14] to-[#0f0f1a] overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}
                />

                {/* Lane Indicators */}
                {gameState === 'playing' && (
                    <div className="absolute inset-0 pointer-events-none">
                        {lanes.map((lane, idx) => (
                            <div
                                key={lane.id}
                                className="absolute top-0 bottom-0 w-px bg-cyan-500/10"
                                style={{ left: `${lane.x}%` }}
                            />
                        ))}
                    </div>
                )}

                {/* Wave Announcement */}
                <AnimatePresence>
                    {waveAnnouncement && (
                        <motion.div
                            initial={{ opacity: 0, scale: 1.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                        >
                            <h1 className="text-5xl sm:text-7xl font-black text-cyan-500/30 tracking-widest">
                                {waveAnnouncement}
                            </h1>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Start Screen */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-30 backdrop-blur-sm text-center p-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg shadow-cyan-500/30">
                            CE
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Inbox Defense</h3>
                        <p className="text-slate-300 mb-6 max-w-sm text-sm sm:text-base">
                            Train your Triage Agent to sort emails at lightning speed!
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6 text-left text-sm">
                            <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 text-green-400 font-bold mb-1">
                                    <Check size={16} /> DELEGATE
                                </div>
                                <p className="text-slate-400 text-xs">Work emails, meetings, boss messages, client requests</p>
                            </div>
                            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
                                    <Trash2 size={16} /> DELETE
                                </div>
                                <p className="text-slate-400 text-xs">Spam, newsletters, receipts, promotions</p>
                            </div>
                        </div>

                        <div className="text-xs text-slate-500 mb-4">
                            Keyboard: <kbd className="px-1 py-0.5 bg-slate-700 rounded mx-1">D</kbd> Delegate
                            <kbd className="px-1 py-0.5 bg-slate-700 rounded mx-1">X</kbd> Delete
                        </div>

                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-cyan-900/50"
                        >
                            <Play size={20} /> START MISSION
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
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full max-w-sm"
                        >
                            <h3 className={`text-3xl sm:text-4xl font-bold mb-2 ${gameState === 'won' ? 'text-green-400' : 'text-red-400'}`}>
                                {gameState === 'won' ? '🎯 INBOX ZERO!' : '📥 OVERFLOW'}
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
                                    <div className="text-slate-400">Triaged</div>
                                    <div className="text-xl font-bold text-white">{emailsTriaged}/20</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-2">
                                    <div className="text-slate-400">Max Combo</div>
                                    <div className="text-xl font-bold text-orange-400">{maxCombo}x</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-2">
                                    <div className="text-slate-400">Accuracy</div>
                                    <div className="text-xl font-bold text-cyan-400">
                                        {stats.correct + stats.wrong > 0
                                            ? Math.round((stats.correct / (stats.correct + stats.wrong)) * 100)
                                            : 0}%
                                    </div>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-2">
                                    <div className="text-slate-400">Fast Actions</div>
                                    <div className="text-xl font-bold text-yellow-400">{stats.fastActions}</div>
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
                                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/50"
                                >
                                    <RotateCcw size={18} /> Again
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Emails */}
                <AnimatePresence>
                    {emails.map((email, index) => {
                        const isSelected = index === selectedEmailIndex;
                        const timeElapsed = Date.now() - email.spawnTime;
                        const urgency = email.isCritical ? Math.min(1, timeElapsed / email.timeToLive) : 0;

                        return (
                            <motion.div
                                key={email.id}
                                initial={{ y: -80, opacity: 0, scale: 0.8 }}
                                animate={{
                                    y: 60 + (index * 70),
                                    opacity: 1,
                                    scale: isSelected ? 1.02 : 1
                                }}
                                exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className={`absolute w-[85%] sm:w-72 bg-gradient-to-r ${email.color} border ${email.borderColor} rounded-xl p-2.5 sm:p-3 shadow-xl cursor-pointer transition-all
                                    ${isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900' : ''}
                                    ${email.isCritical ? 'animate-[pulse_0.5s_ease-in-out_infinite]' : ''}`}
                                style={{
                                    left: `${email.x}%`,
                                    transform: 'translateX(-50%)',
                                    boxShadow: email.isCritical
                                        ? `0 0 ${20 + urgency * 30}px rgba(239, 68, 68, ${0.3 + urgency * 0.4})`
                                        : undefined
                                }}
                                onClick={() => setSelectedEmailIndex(index)}
                            >
                                {/* Critical Timer Bar */}
                                {email.isCritical && (
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-red-900/50 rounded-t-xl overflow-hidden">
                                        <motion.div
                                            className="h-full bg-red-500"
                                            initial={{ width: '100%' }}
                                            animate={{ width: `${Math.max(0, 100 - urgency * 100)}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                )}

                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">{email.icon}</span>
                                    <span className="text-xs sm:text-sm font-semibold text-white truncate flex-1">{email.subject}</span>
                                    {email.isCritical && (
                                        <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold animate-pulse">
                                            URGENT
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleAction(email.id, 'delegate'); }}
                                        className="flex-1 bg-green-600/80 hover:bg-green-500 text-white text-xs font-bold py-1.5 sm:py-2 rounded-lg flex justify-center items-center gap-1 transition-all hover:scale-[1.02] active:scale-95"
                                    >
                                        <Check size={12} /> DELEGATE
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleAction(email.id, 'delete'); }}
                                        className="flex-1 bg-red-600/80 hover:bg-red-500 text-white text-xs font-bold py-1.5 sm:py-2 rounded-lg flex justify-center items-center gap-1 transition-all hover:scale-[1.02] active:scale-95"
                                    >
                                        <Trash2 size={12} /> DELETE
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Particle Effects */}
                <AnimatePresence>
                    {particles.map(particle => (
                        <motion.div
                            key={particle.id}
                            initial={{ opacity: 1, y: 0, scale: 1 }}
                            animate={{ opacity: 0, y: -40, scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className={`absolute ${particle.color} font-bold text-xl pointer-events-none z-30`}
                            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
                        >
                            {particle.text}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Danger Zone */}
                {emails.length >= 4 && gameState === 'playing' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 border-4 border-red-500/60 pointer-events-none z-10"
                        style={{ animation: 'pulse 0.5s ease-in-out infinite' }}
                    />
                )}

                {/* Overflow Warning */}
                {emails.length >= 5 && gameState === 'playing' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-900/90 text-red-200 px-4 py-2 rounded-lg font-bold text-sm animate-pulse z-20">
                        ⚠️ INBOX OVERFLOWING!
                    </div>
                )}
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    50% { transform: translateX(4px); }
                    75% { transform: translateX(-4px); }
                }
            `}</style>
        </div>
    );
};

export default AgentTriageGame;
