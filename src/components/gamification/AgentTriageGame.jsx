import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Trash2, AlertCircle, Play, RotateCcw, ArrowLeft, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';

const AgentTriageGame = ({ onBack }) => {
    const [gameState, setGameState] = useState('start'); // start, playing, won, lost
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [emails, setEmails] = useState([]);
    const [emailsTriaged, setEmailsTriaged] = useState(0);
    const [combo, setCombo] = useState(0);
    const [captainMessage, setCaptainMessage] = useState("Ready to train your Triage Agent?");
    const [particles, setParticles] = useState([]);
    const [wave, setWave] = useState(1);
    const [shake, setShake] = useState(false);

    const gameLoopRef = useRef(null);
    const timerRef = useRef(null);

    // Email Types
    const emailTypes = [
        { type: 'urgent', subject: '🔥 Client needs this TODAY', action: 'delegate', color: 'text-red-400' },
        { type: 'spam', subject: '🎁 You won a free cruise!', action: 'delete', color: 'text-slate-400' },
        { type: 'newsletter', subject: '📧 Weekly Marketing Digest', action: 'delete', color: 'text-blue-300' },
        { type: 'work', subject: '📊 Q4 Report needs review', action: 'delegate', color: 'text-cyan-300' },
        { type: 'meeting', subject: '📅 Quick sync today?', action: 'delegate', color: 'text-purple-300' },
        { type: 'receipt', subject: '🧾 Order confirmation #1234', action: 'delete', color: 'text-green-300' },
        { type: 'boss', subject: '⚡ From: Your Boss', action: 'delegate', color: 'text-yellow-400' },
        { type: 'junk', subject: '💊 Cheap meds online', action: 'delete', color: 'text-slate-500' },
    ];

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(30);
        setEmails([]);
        setEmailsTriaged(0);
        setCombo(0);
        setWave(1);
        setCaptainMessage("Incoming! Sort them fast!");

        // Spawn first email immediately
        spawnEmail();

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

        // Start Spawner
        startSpawner(1800);
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

        if (timeLeft === 20) {
            setWave(2);
            setCaptainMessage("⚠️ WAVE 2: SPEED UP!");
            startSpawner(1200);
        } else if (timeLeft === 10) {
            setWave(3);
            setCaptainMessage("🚨 WAVE 3: MAXIMUM CHAOS!");
            startSpawner(800);
        }
    }, [timeLeft, gameState]);

    const spawnEmail = () => {
        const template = emailTypes[Math.floor(Math.random() * emailTypes.length)];
        const newEmail = {
            id: Date.now() + Math.random(),
            ...template,
            x: Math.random() * 60 + 20, // Random X position (20% to 80%)
        };

        setEmails(prev => {
            if (prev.length >= 5) {
                endGame(false); // Too many emails = overflow
                return prev;
            }
            return [...prev, newEmail];
        });
    };

    const handleAction = (id, action) => {
        if (gameState !== 'playing') return;

        const email = emails.find(e => e.id === id);
        if (!email) return;

        const isCorrect = (action === 'delegate' && email.action === 'delegate') ||
            (action === 'delete' && email.action === 'delete');

        if (isCorrect) {
            // Correct action
            const newTriaged = emailsTriaged + 1;
            const newCombo = combo + 1;
            setEmailsTriaged(newTriaged);
            setCombo(newCombo);
            setEmails(prev => prev.filter(e => e.id !== id));

            // Combo bonuses
            let points = 10;
            if (newCombo >= 5) {
                points += 15;
                setCaptainMessage("🔥 ON FIRE! +15 bonus!");
            } else if (newCombo >= 3) {
                points += 5;
                setCaptainMessage("Great! +5 combo!");
            }
            setScore(prev => prev + points);

            // Add particle effect
            setParticles(prev => [...prev, { id: Date.now(), x: Math.random() * 100, y: Math.random() * 100, text: `+${points}` }]);
            setTimeout(() => setParticles(prev => prev.slice(1)), 500);

            // Win condition: 20 emails triaged
            if (newTriaged >= 20) {
                endGame(true);
            }
        } else {
            // Wrong action
            setCombo(0);
            setScore(prev => Math.max(0, prev - 5));
            setCaptainMessage("❌ Wrong! Combo reset.");
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setTimeout(() => setCaptainMessage("Keep going!"), 1000);
        }
    };

    const endGame = async (win) => {
        clearInterval(gameLoopRef.current);
        clearInterval(timerRef.current);
        setGameState(win ? 'won' : 'lost');

        // Submit score to backend
        try {
            await api.submitScore('triage', score);
            console.log('Score submitted:', score);
        } catch (err) {
            console.error('Failed to submit score:', err);
        }

        if (win) {
            setCaptainMessage("Outstanding! You're a Triage Master!");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            setCaptainMessage("Inbox Overflow! Try again.");
        }
    };

    useEffect(() => {
        return () => {
            clearInterval(gameLoopRef.current);
            clearInterval(timerRef.current);
        };
    }, []);

    return (
        <div className={`w-full max-w-2xl mx-auto bg-slate-900/80 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl relative min-h-[400px] backdrop-blur-sm ${shake ? 'animate-shake' : ''}`}>

            {/* Header / HUD */}
            <div className="bg-slate-800/90 p-4 flex justify-between items-center border-b border-slate-700 z-20 relative backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="text-cyan-400 font-bold font-mono text-xl">TRIAGED: {emailsTriaged}/20</div>
                    <div className={`font-bold font-mono text-xl ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-slate-300'}`}>
                        TIME: {timeLeft}s
                    </div>
                    <div className="text-orange-400 font-bold font-mono text-sm">
                        {combo > 0 && `🔥 ${combo}x`}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xs">CE</div>
                    <span className="text-xs text-cyan-300 font-medium hidden sm:block">{captainMessage}</span>
                </div>
            </div>

            {/* Game Area */}
            <div className="relative h-[340px] bg-[#0f0f1a] overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />

                {/* Wave Indicator */}
                <AnimatePresence>
                    {gameState === 'playing' && (
                        <motion.div
                            key={wave}
                            initial={{ opacity: 0, scale: 2 }}
                            animate={{ opacity: 0, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                        >
                            <h1 className="text-9xl font-bold text-white/5">WAVE {wave}</h1>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Start Screen */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30 backdrop-blur-sm text-center p-6">
                        <h3 className="text-3xl font-bold text-white mb-2">Inbox Defense</h3>
                        <p className="text-slate-300 mb-6 max-w-md">
                            <span className="text-green-400 font-bold">DELEGATE</span> = Work, boss, urgent items<br />
                            <span className="text-red-400 font-bold">DELETE</span> = Spam, newsletters, receipts<br />
                            <strong className="text-cyan-400">Goal: Triage 20 emails correctly!</strong>
                        </p>
                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-cyan-900/50"
                        >
                            <Play size={20} /> START MISSION
                        </button>
                    </div>
                )}

                {/* Game Over Screen */}
                {(gameState === 'won' || gameState === 'lost') && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30 backdrop-blur-md text-center p-6">
                        <h3 className={`text-4xl font-bold mb-2 ${gameState === 'won' ? 'text-green-400' : 'text-red-400'}`}>
                            {gameState === 'won' ? 'TRIAGE MASTER! 🎯' : 'INBOX OVERFLOW'}
                        </h3>
                        <p className="text-white text-xl mb-4 font-mono">Emails Triaged: {emailsTriaged}/20</p>
                        <p className="text-slate-400 text-sm mb-6">Final Score: {score} | Max Combo: {combo}</p>

                        <div className="flex gap-4">
                            <button
                                onClick={onBack}
                                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
                            >
                                <ArrowLeft size={20} /> Hub
                            </button>
                            <button
                                onClick={startGame}
                                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/50"
                            >
                                <RotateCcw size={20} /> Play Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Emails */}
                <AnimatePresence>
                    {emails.map((email) => (
                        <motion.div
                            key={email.id}
                            initial={{ y: -50, opacity: 0, x: `${email.x}%` }}
                            animate={{ y: 50 + (emails.indexOf(email) * 60), opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="absolute left-0 w-64 bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl flex flex-col gap-2"
                            style={{ left: `${email.x}%`, transform: 'translateX(-50%)' }}
                        >
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-slate-400" />
                                <span className={`text-xs font-bold truncate ${email.color}`}>{email.subject}</span>
                            </div>
                            <div className="flex gap-2 mt-1">
                                <button
                                    onClick={() => handleAction(email.id, 'delegate')}
                                    className="flex-1 bg-green-900/50 hover:bg-green-800 text-green-400 text-[10px] font-bold py-1 rounded border border-green-500/30 flex justify-center items-center gap-1"
                                >
                                    <Check size={10} /> DELEGATE
                                </button>
                                <button
                                    onClick={() => handleAction(email.id, 'delete')}
                                    className="flex-1 bg-red-900/50 hover:bg-red-800 text-red-400 text-[10px] font-bold py-1 rounded border border-red-500/30 flex justify-center items-center gap-1"
                                >
                                    <Trash2 size={10} /> DELETE
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Particle Effects */}
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="absolute text-green-400 font-bold text-xl animate-ping pointer-events-none z-30"
                        style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
                    >
                        {particle.text}
                    </div>
                ))}

                {/* Danger Zone Indicator */}
                {emails.length >= 4 && (
                    <div className="absolute inset-0 border-4 border-red-500/50 animate-pulse pointer-events-none z-10" />
                )}
            </div>
        </div>
    );
};

export default AgentTriageGame;
