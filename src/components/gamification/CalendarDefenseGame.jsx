import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, XCircle, CheckCircle, Shield, Clock, Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const CalendarDefenseGame = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, won, lost
    const [score, setScore] = useState(0);
    const [deepWorkHours, setDeepWorkHours] = useState(8); // Start with 8 hours of potential deep work
    const [enemies, setEnemies] = useState([]); // Incoming meetings
    const [captainMessage, setCaptainMessage] = useState("Protect your Deep Work blocks!");

    const gameLoopRef = useRef(null);
    const spawnerRef = useRef(null);

    const meetingTypes = [
        { name: 'Quick Sync', color: 'bg-red-500', speed: 3 },
        { name: 'Brainstorm', color: 'bg-orange-500', speed: 2 },
        { name: 'Touch Base', color: 'bg-yellow-500', speed: 4 },
        { name: 'Status Update', color: 'bg-purple-500', speed: 2.5 },
        { name: 'All Hands', color: 'bg-pink-600', speed: 1.5, boss: true },
    ];

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setDeepWorkHours(8);
        setEnemies([]);
        setCaptainMessage("Here they come! DECLINE them!");

        // Game Loop (Movement & Collision)
        gameLoopRef.current = setInterval(() => {
            setEnemies(prev => {
                const newEnemies = prev.map(e => ({ ...e, x: e.x - e.speed }));

                // Check collisions (reached the calendar on the left)
                const hitCalendar = newEnemies.filter(e => e.x <= 10);
                if (hitCalendar.length > 0) {
                    handleImpact(hitCalendar.length);
                    return newEnemies.filter(e => e.x > 10);
                }

                return newEnemies;
            });
        }, 50);

        // Spawner
        spawnerRef.current = setInterval(() => {
            spawnEnemy();
        }, 1500);
    };

    const spawnEnemy = () => {
        const template = meetingTypes[Math.floor(Math.random() * meetingTypes.length)];
        const newEnemy = {
            id: Date.now() + Math.random(),
            ...template,
            x: 100, // Start at right side (100%)
            y: Math.random() * 80 + 10, // Random height
        };
        setEnemies(prev => [...prev, newEnemy]);
    };

    const handleImpact = (count) => {
        setDeepWorkHours(prev => {
            const newHours = prev - (count * 1); // Lose 1 hour per meeting
            if (newHours <= 0) {
                endGame(false);
                return 0;
            }
            return newHours;
        });
        setCaptainMessage("Meeting accepted! Deep Work lost!");
        setTimeout(() => setCaptainMessage("Focus! Decline them!"), 1000);
    };

    const zapEnemy = (id) => {
        if (gameState !== 'playing') return;

        setEnemies(prev => prev.filter(e => e.id !== id));
        setScore(prev => {
            const newScore = prev + 100;
            if (newScore >= 1500) endGame(true);
            return newScore;
        });

        // Visual feedback could go here
    };

    const endGame = (win) => {
        clearInterval(gameLoopRef.current);
        clearInterval(spawnerRef.current);
        setGameState(win ? 'won' : 'lost');

        if (win) {
            setCaptainMessage("Calendar Secure! Maximum productivity achieved.");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#22d3ee', '#3b82f6', '#ffffff']
            });
        } else {
            setCaptainMessage("Day ruined. Too many meetings.");
        }
    };

    useEffect(() => {
        return () => {
            clearInterval(gameLoopRef.current);
            clearInterval(spawnerRef.current);
        };
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto bg-slate-900/80 border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl relative min-h-[400px]">
            {/* HUD */}
            <div className="bg-slate-800/90 p-4 flex justify-between items-center border-b border-slate-700 z-20 relative">
                <div className="flex items-center gap-6">
                    <div className="text-purple-400 font-bold font-mono text-xl">SCORE: {score}</div>
                    <div className="flex items-center gap-2">
                        <Shield size={18} className={deepWorkHours < 3 ? 'text-red-500 animate-pulse' : 'text-cyan-400'} />
                        <span className={`font-bold font-mono text-xl ${deepWorkHours < 3 ? 'text-red-500' : 'text-slate-300'}`}>
                            HOURS: {deepWorkHours.toFixed(1)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">CE</div>
                    <span className="text-xs text-purple-300 font-medium hidden sm:block">{captainMessage}</span>
                </div>
            </div>

            {/* Game Area */}
            <div className="relative h-[340px] bg-[#0f172a] overflow-hidden cursor-crosshair">
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
                            Useless meetings are attacking your schedule!<br />
                            <span className="text-red-400">CLICK</span> them to DECLINE before they steal your hours.<br />
                            Protect your 8 hours of Deep Work!
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
                            {gameState === 'won' ? 'CALENDAR SECURE' : 'BURNOUT REACHED'}
                        </h3>
                        <p className="text-white text-xl mb-6 font-mono">Score: {score}</p>
                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
                        >
                            <RotateCcw size={20} /> Try Again
                        </button>
                    </div>
                )}

                {/* Enemies */}
                <AnimatePresence>
                    {enemies.map((enemy) => (
                        <motion.button
                            key={enemy.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            onClick={() => zapEnemy(enemy.id)}
                            className={`absolute px-3 py-2 rounded shadow-lg flex items-center gap-2 border border-white/20 hover:scale-110 active:scale-95 transition-transform ${enemy.color} text-white font-bold text-xs z-20`}
                            style={{
                                left: `${enemy.x}%`,
                                top: `${enemy.y}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <Calendar size={12} />
                            {enemy.name}
                            <XCircle size={12} className="ml-1 opacity-70" />
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CalendarDefenseGame;
