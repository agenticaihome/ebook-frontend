import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, XCircle, CheckCircle, Shield, Clock, Play, RotateCcw, ArrowLeft, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';

const CalendarDefenseGame = ({ onBack }) => {
    const [gameState, setGameState] = useState('start'); // start, playing, won, lost
    const [score, setScore] = useState(0);
    const [deepWorkHours, setDeepWorkHours] = useState(8); // Start with 8 hours of potential deep work
    const [enemies, setEnemies] = useState([]); // Incoming meetings
    const [captainMessage, setCaptainMessage] = useState("Protect your Deep Work blocks!");
    const [wave, setWave] = useState(1);
    const [timer, setTimer] = useState(0);
    const [shake, setShake] = useState(false);

    const gameLoopRef = useRef(null);
    const spawnerRef = useRef(null);

    const meetingTypes = [
        // LOW PRIORITY (Green)
        { name: 'Touch Base', color: 'bg-green-500', speed: 3, damage: 0.5, points: 50, priority: 'low' },

        // MEDIUM PRIORITY (Yellow)
        { name: 'Brainstorm', color: 'bg-yellow-500', speed: 2.5, damage: 1, points: 100, priority: 'medium' },
        { name: 'Status Update', color: 'bg-orange-500', speed: 2.5, damage: 1, points: 100, priority: 'medium' },

        // HIGH PRIORITY (Red)
        { name: 'Quick Sync', color: 'bg-red-500', speed: 4, damage: 1.5, points: 150, priority: 'high' },

        // BOSS MEETING (Pink - can't decline)
        { name: '👑 All Hands', color: 'bg-pink-600', speed: 1.5, damage: 2, points: 0, boss: true, priority: 'boss' },
    ];

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setDeepWorkHours(8);
        setEnemies([]);
        setWave(1);
        setTimer(0);
        setCaptainMessage("Here they come! DECLINE them!");

        // Game Loop (Movement & Collision)
        let gameTime = 0;
        gameLoopRef.current = setInterval(() => {
            gameTime += 0.05;
            setTimer(Math.floor(gameTime));

            setEnemies(prev => {
                const newEnemies = prev.map(e => ({ ...e, x: e.x - e.speed * 0.05 }));

                // Check collisions (reached the calendar on the left)
                const hitCalendar = newEnemies.filter(e => e.x <= 10);
                if (hitCalendar.length > 0) {
                    handleImpact(hitCalendar);
                    return newEnemies.filter(e => e.x > 10);
                }

                return newEnemies;
            });

            // Win condition: Survive 60 seconds with 3+ hours
            if (gameTime >= 60) {
                endGame(true);
            }
        }, 50);

        // Spawner with wave system
        startSpawner(2000);

        // Wave 2 at 20s
        setTimeout(() => {
            if (gameState === 'playing') {
                setWave(2);
                setCaptainMessage("Wave 2! Speed increasing!");
                startSpawner(1500);
            }
        }, 20000);

        // Wave 3 at 40s
        setTimeout(() => {
            if (gameState === 'playing') {
                setWave(3);
                setCaptainMessage("Final wave! Boss incoming!");
                startSpawner(1000);
            }
        }, 40000);
    };

    const startSpawner = (interval) => {
        if (spawnerRef.current) clearInterval(spawnerRef.current);
        spawnerRef.current = setInterval(() => {
            spawnEnemy();
        }, interval);
    };

    const spawnEnemy = () => {
        // Increase boss meeting chance in wave 3
        let availableTypes = meetingTypes;
        if (wave < 3) {
            availableTypes = meetingTypes.filter(m => !m.boss);
        }

        const template = availableTypes[Math.floor(Math.random() * availableTypes.length)];
        const newEnemy = {
            id: Date.now() + Math.random(),
            ...template,
            x: 100, // Start at right side (100%)
            y: Math.random() * 70 + 15, // Random height (15-85%)
        };
        setEnemies(prev => [...prev, newEnemy]);
    };

    const handleImpact = (meetings) => {
        const totalDamage = meetings.reduce((sum, m) => sum + m.damage, 0);
        setDeepWorkHours(prev => {
            const newHours = prev - totalDamage;
            if (newHours <= 0) {
                endGame(false);
                return 0;
            }
            return newHours;
        });
        setCaptainMessage(`-${totalDamage.toFixed(1)} hours lost!`);
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setTimeout(() => setCaptainMessage("Focus! Decline them!"), 1000);
    };

    const zapEnemy = (enemy) => {
        if (gameState !== 'playing') return;

        // Boss meetings can't be declined
        if (enemy.boss) {
            setCaptainMessage("👑 Can't decline boss meetings!");
            setTimeout(() => setCaptainMessage("Let it pass..."), 800);
            return;
        }

        setEnemies(prev => prev.filter(e => e.id !== enemy.id));
        setScore(prev => prev + enemy.points);
    };

    const endGame = async (win) => {
        clearInterval(gameLoopRef.current);
        clearInterval(spawnerRef.current);
        setGameState(win ? 'won' : 'lost');

        // Submit score to backend (score is time survived * 10 + points?)
        // Actually, let's use the 'score' state which accumulates points from zapping enemies
        try {
            await api.submitScore('calendar', score);
            console.log('Score submitted:', score);
        } catch (err) {
            console.error('Failed to submit score:', err);
        }

        if (win) {
            setCaptainMessage("🛡️ Calendar Secure! Perfect defense.");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#22d3ee', '#3b82f6', '#ffffff']
            });
        } else {
            setCaptainMessage(timer >= 60 ? "Survived, but burned out." : "Calendar destroyed. Too many meetings.");
        }
    };

    useEffect(() => {
        return () => {
            clearInterval(gameLoopRef.current);
            clearInterval(spawnerRef.current);
        };
    }, []);

    return (
        <div className={`w-full max-w-2xl mx-auto bg-slate-900/80 border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl relative min-h-[400px] backdrop-blur-sm ${shake ? 'animate-shake' : ''}`}>
            {/* HUD */}
            <div className="bg-slate-800/90 p-4 flex justify-between items-center border-b border-slate-700 z-20 relative backdrop-blur-xl">
                <div className="flex items-center gap-6">
                    <div className="text-purple-400 font-bold font-mono text-lg">TIME: {timer}/60s</div>
                    <div className="flex items-center gap-2">
                        <Shield size={18} className={deepWorkHours < 3 ? 'text-red-500 animate-pulse' : 'text-cyan-400'} />
                        <span className={`font-bold font-mono text-xl ${deepWorkHours < 3 ? 'text-red-500' : 'text-slate-300'}`}>
                            {deepWorkHours.toFixed(1)}h
                        </span>
                    </div>
                    <div className="text-slate-400 font-mono text-sm">Wave {wave}/3</div>
                    <div className="text-yellow-400 font-mono font-bold">Score: {score}</div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">CE</div>
                    <span className="text-xs text-purple-300 font-medium hidden sm:block">{captainMessage}</span>
                </div>
            </div>

            {/* Game Area */}
            <div className="relative h-[340px] bg-[#0f0f1a] overflow-hidden cursor-crosshair">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(#4c1d95 1px, transparent 1px), linear-gradient(90deg, #4c1d95 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                {/* The Calendar Fortress (Left Side) */}
                <div className="absolute left-0 top-0 bottom-0 w-[10%] bg-blue-900/20 border-r-2 border-blue-500/50 flex flex-col justify-center items-center z-10">
                    <div className="text-blue-500/50 font-bold rotate-90 whitespace-nowrap tracking-widest text-xs">DEEP WORK ZONE</div>
                </div>

                {/* Start Screen */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30 backdrop-blur-sm text-center p-6">
                        <h3 className="text-3xl font-bold text-white mb-2">Calendar Defense</h3>
                        <p className="text-slate-300 mb-6 max-w-md">
                            <span className="text-cyan-400 font-bold">CLICK meetings to DECLINE</span><br />
                            <span className="text-pink-400">👑 Boss meetings</span> can't be declined!<br />
                            <strong className="text-green-400">Goal: Survive 60s with 3+ hours remaining</strong>
                        </p>
                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-purple-900/50"
                        >
                            <Play size={20} /> START DEFENSE
                        </button>
                    </div>
                )}

                {/* Game Over Screen */}
                {(gameState === 'won' || gameState === 'lost') && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30 backdrop-blur-md text-center p-6">
                        <h3 className={`text-4xl font-bold mb-2 ${gameState === 'won' ? 'text-green-400' : 'text-red-400'}`}>
                            {gameState === 'won' ? 'CALENDAR SECURE 🛡️' : 'BURNOUT REACHED'}
                        </h3>
                        <p className="text-white text-xl mb-4 font-mono">Final Score: {score}</p>
                        <p className="text-slate-400 text-sm mb-6">Deep Work Remaining: {deepWorkHours.toFixed(1)}h</p>

                        <div className="flex gap-4">
                            <button
                                onClick={onBack}
                                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
                            >
                                <ArrowLeft size={20} /> Hub
                            </button>
                            <button
                                onClick={startGame}
                                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/50"
                            >
                                <RotateCcw size={20} /> Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Enemies */}
                <AnimatePresence>
                    {enemies.map((enemy) => (
                        <motion.button
                            key={enemy.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0, opacity: 0, rotate: 360 }}
                            whileHover={{ scale: 1.15 }}
                            onClick={() => zapEnemy(enemy)}
                            className={`absolute px-3 py-2 rounded shadow-lg flex items-center gap-2 border border-white/20 active:scale-95 transition-transform ${enemy.color} text-white font-bold text-xs z-20 ${enemy.boss ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110'}`}
                            style={{
                                left: `${enemy.x}%`,
                                top: `${enemy.y}%`,
                                transform: 'translate(-50%, -50%)',
                                minWidth: '44px',
                                minHeight: '44px'
                            }}
                        >
                            <Calendar size={12} />
                            {enemy.name}
                            {!enemy.boss && <XCircle size={12} className="ml-1 opacity-70" />}
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CalendarDefenseGame;
