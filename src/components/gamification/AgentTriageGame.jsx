import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Trash2, AlertCircle, Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const AgentTriageGame = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, won, lost
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [emails, setEmails] = useState([]);
    const [captainMessage, setCaptainMessage] = useState("Ready to train your Triage Agent?");

    const gameLoopRef = useRef(null);
    const timerRef = useRef(null);

    // Email Types
    const emailTypes = [
        { type: 'urgent', subject: 'URGENT: Server Down', action: 'delegate', color: 'text-red-400' },
        { type: 'spam', subject: 'Win a free iPhone!', action: 'delete', color: 'text-slate-400' },
        { type: 'newsletter', subject: 'Weekly Digest', action: 'delete', color: 'text-blue-300' },
        { type: 'work', subject: 'Q4 Report Draft', action: 'delegate', color: 'text-white' },
        { type: 'meeting', subject: 'Sync?', action: 'delegate', color: 'text-purple-300' },
        { type: 'receipt', subject: 'Your Order #1234', action: 'delete', color: 'text-green-300' },
    ];

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(30);
        setEmails([]);
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
        gameLoopRef.current = setInterval(() => {
            spawnEmail();
        }, 1200); // New email every 1.2s
    };

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

        // Check if action was correct
        // Delegate = Keep/Action (Work, Urgent, Meeting)
        // Delete = Archive/Trash (Spam, Newsletter, Receipt)
        const isCorrect = (action === 'delegate' && email.action === 'delegate') ||
            (action === 'delete' && email.action === 'delete');

        if (isCorrect) {
            setScore(prev => prev + 10);
            setEmails(prev => prev.filter(e => e.id !== id));
            if (score + 10 >= 150) {
                endGame(true);
            }
        } else {
            setScore(prev => Math.max(0, prev - 5));
            setCaptainMessage("Oops! Wrong action!");
            setTimeout(() => setCaptainMessage("Keep going!"), 800);
        }
    };

    const endGame = (win) => {
        clearInterval(gameLoopRef.current);
        clearInterval(timerRef.current);
        setGameState(win ? 'won' : 'lost');

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
        <div className="w-full max-w-2xl mx-auto bg-slate-900/80 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl relative min-h-[400px]">
            {/* Header / HUD */}
            <div className="bg-slate-800/90 p-4 flex justify-between items-center border-b border-slate-700 z-20 relative">
                <div className="flex items-center gap-4">
                    <div className="text-cyan-400 font-bold font-mono text-xl">SCORE: {score}</div>
                    <div className={`font-bold font-mono text-xl ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-slate-300'}`}>
                        TIME: {timeLeft}s
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xs">CE</div>
                    <span className="text-xs text-cyan-300 font-medium hidden sm:block">{captainMessage}</span>
                </div>
            </div>

            {/* Game Area */}
            <div className="relative h-[340px] bg-[#0f172a] overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />

                {/* Start Screen */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30 backdrop-blur-sm text-center p-6">
                        <h3 className="text-3xl font-bold text-white mb-2">Inbox Defense</h3>
                        <p className="text-slate-300 mb-6 max-w-md">
                            Emails are flooding in! <br />
                            <span className="text-green-400">DELEGATE</span> important work.<br />
                            <span className="text-red-400">DELETE</span> spam & noise.<br />
                            Don't let the inbox overflow (5 max)!
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
                            {gameState === 'won' ? 'MISSION ACCOMPLISHED' : 'INBOX OVERFLOW'}
                        </h3>
                        <p className="text-white text-xl mb-6 font-mono">Final Score: {score}</p>
                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
                        >
                            <RotateCcw size={20} /> Try Again
                        </button>
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

                {/* Danger Zone Indicator */}
                {emails.length >= 4 && (
                    <div className="absolute inset-0 border-4 border-red-500/50 animate-pulse pointer-events-none z-10" />
                )}
            </div>
        </div>
    );
};

export default AgentTriageGame;
