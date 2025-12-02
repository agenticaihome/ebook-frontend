import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mail, Calendar, MessageSquare, Smartphone, Play, RotateCcw, Trophy, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const DeepWorkDive = () => {
    const [gameState, setGameState] = useState('idle'); // idle, playing, dead
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [captainY, setCaptainY] = useState(50); // Percentage from top
    const [velocity, setVelocity] = useState(0);
    const [obstacles, setObstacles] = useState([]);
    const [inFlowZone, setInFlowZone] = useState(false);
    const [combo, setCombo] = useState(0);

    const gameLoopRef = useRef(null);
    const obstacleSpawnRef = useRef(null);
    const scoreTimerRef = useRef(null);

    // Game constants
    const GRAVITY = 0.6;
    const JUMP_FORCE = -12;
    const FLOW_ZONE_TOP = 35;
    const FLOW_ZONE_BOTTOM = 65;
    const CAPTAIN_SIZE = 60;
    const GAP_SIZE = 180;

    // Obstacle types
    const obstacleTypes = [
        { type: 'notification', icon: Smartphone, color: 'bg-red-500', label: '📱' },
        { type: 'email', icon: Mail, color: 'bg-orange-500', label: '📧' },
        { type: 'meeting', icon: Calendar, color: 'bg-yellow-500', label: '🗓️' },
        { type: 'slack', icon: MessageSquare, color: 'bg-purple-500', label: '💬' },
    ];

    // Load best score
    useEffect(() => {
        const saved = localStorage.getItem('highscore_deepwork');
        if (saved) setBestScore(parseInt(saved));
    }, []);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setCaptainY(50);
        setVelocity(0);
        setObstacles([]);
        setCombo(0);

        let currentVelocity = 0;

        // Game loop - physics
        gameLoopRef.current = setInterval(() => {
            currentVelocity += GRAVITY;

            setCaptainY(prev => {
                const newY = prev + currentVelocity;
                if (newY < 0 || newY > 100) {
                    endGame();
                    return prev;
                }
                return newY;
            });

            setVelocity(currentVelocity);

            // Check flow zone
            setCaptainY(y => {
                const inZone = y >= FLOW_ZONE_TOP && y <= FLOW_ZONE_BOTTOM;
                setInFlowZone(inZone);
                return y;
            });
        }, 50);

        // Obstacle spawner
        let spawnDelay = 2000;
        const spawnObstacle = () => {
            const gapY = Math.random() * 40 + 30; // Gap center between 30-70%
            const template = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];

            const newObstacle = {
                id: Date.now(),
                x: 100,
                gapY,
                gapSize: GAP_SIZE,
                ...template,
                scored: false
            };

            setObstacles(prev => [...prev, newObstacle]);
        };

        spawnObstacle(); // First obstacle
        obstacleSpawnRef.current = setInterval(() => {
            spawnObstacle();
            // Increase difficulty
            if (score > 10) spawnDelay = 1500;
            if (score > 20) spawnDelay = 1200;
        }, spawnDelay);

        // Score timer for Flow Zone bonus
        scoreTimerRef.current = setInterval(() => {
            setInFlowZone(zone => {
                if (zone) {
                    setScore(s => s + 1);
                    setCombo(c => c + 1);
                }
                return zone;
            });
        }, 1000);
    };

    const jump = () => {
        if (gameState !== 'playing') return;

        if (gameLoopRef.current) {
            clearInterval(gameLoopRef.current);

            let currentVelocity = JUMP_FORCE;
            setVelocity(JUMP_FORCE);

            gameLoopRef.current = setInterval(() => {
                currentVelocity += GRAVITY;

                setCaptainY(prev => {
                    const newY = prev + currentVelocity;
                    if (newY < 0 || newY > 100) {
                        endGame();
                        return prev;
                    }
                    return newY;
                });

                setVelocity(currentVelocity);

                setCaptainY(y => {
                    const inZone = y >= FLOW_ZONE_TOP && y <= FLOW_ZONE_BOTTOM;
                    setInFlowZone(inZone);
                    return y;
                });
            }, 50);
        }
    };

    const endGame = () => {
        clearInterval(gameLoopRef.current);
        clearInterval(obstacleSpawnRef.current);
        clearInterval(scoreTimerRef.current);
        setGameState('dead');

        // Save high score
        if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem('highscore_deepwork', score.toString());
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#06b6d4', '#3b82f6', '#8b5cf6']
            });
        }
    };

    // Move obstacles and check collisions
    useEffect(() => {
        if (gameState !== 'playing') return;

        const moveInterval = setInterval(() => {
            setObstacles(prev => {
                const updated = prev.map(obs => {
                    const newX = obs.x - 3;

                    // Collision detection
                    if (newX < 30 && newX > 10) {
                        const captainTop = captainY - 8;
                        const captainBottom = captainY + 8;
                        const gapTop = obs.gapY - (obs.gapSize / 2) / (window.innerHeight * 0.0034);
                        const gapBottom = obs.gapY + (obs.gapSize / 2) / (window.innerHeight * 0.0034);

                        if (captainTop < gapTop || captainBottom > gapBottom) {
                            endGame();
                        }
                    }

                    // Score point for passing obstacle
                    if (newX < 20 && !obs.scored) {
                        setScore(s => s + 5);
                        obs.scored = true;
                    }

                    return { ...obs, x: newX };
                });

                return updated.filter(obs => obs.x > -10);
            });
        }, 50);

        return () => clearInterval(moveInterval);
    }, [gameState, captainY]);

    useEffect(() => {
        return () => {
            clearInterval(gameLoopRef.current);
            clearInterval(obstacleSpawnRef.current);
            clearInterval(scoreTimerRef.current);
        };
    }, []);

    const getShareText = () => {
        const messages = [
            {
                score: 0 - 10,
                text: `I lasted ${score} seconds battling productivity distractions 😅\n\nTurns out staying focused is harder than I thought. Deep Work Dive is brutally accurate.\n\nThink you can beat my score?`
            },
            {
                score: 11 - 20,
                text: `Just survived ${score} distractions in Deep Work Dive! 🎯\n\nThis game perfectly captures the struggle of modern knowledge work. Every notification, every Slack ping... relatable anxiety at its finest.\n\nCan you do better?`
            },
            {
                score: 21 - 35,
                text: `${score} distractions dodged in Deep Work Dive! 🔥\n\nI'm learning that focus is a skill you have to practice. This game makes it click.\n\nReady to test your concentration?`
            },
            {
                score: 36,
                text: `I just scored ${score} in Deep Work Dive! 💪\n\nThis isn't just a game - it's a masterclass in what kills productivity. The creator built an entire system for living an "agentic life" where AI handles the noise while you focus on what matters.\n\nGame on:`
            }
        ];

        let selectedMessage = messages[0];
        if (score > 35) selectedMessage = messages[3];
        else if (score > 20) selectedMessage = messages[2];
        else if (score > 10) selectedMessage = messages[1];

        return selectedMessage.text;
    };

    const shareToTwitter = () => {
        const text = getShareText();
        const url = 'https://agenticaihome.com'; // Main site URL
        const hashtags = 'DeepWork,Productivity,AI,Focus';
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;
        window.open(twitterUrl, '_blank', 'width=550,height=420');
    };

    const shareToLinkedIn = () => {
        const url = 'https://agenticaihome.com';
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedInUrl, '_blank', 'width=550,height=520');
    };

    const shareToFacebook = () => {
        const url = 'https://agenticaihome.com';
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank', 'width=550,height=420');
    };

    const copyToClipboard = () => {
        const text = `${getShareText()}\n\nhttps://agenticaihome.com`;
        navigator.clipboard.writeText(text).then(() => {
            alert('✅ Score copied to clipboard!');
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-slate-900/80 border border-blue-500/30 rounded-2xl overflow-hidden shadow-2xl relative min-h-[500px] backdrop-blur-sm">
            {/* HUD */}
            <div className="bg-slate-800/90 p-4 flex justify-between items-center border-b border-slate-700 z-20 relative backdrop-blur-xl">
                <div className="flex items-center gap-6">
                    <div className="text-cyan-400 font-bold font-mono text-2xl">
                        {gameState === 'playing' ? score : `BEST: ${bestScore}`}
                    </div>
                    {inFlowZone && gameState === 'playing' && (
                        <div className="text-green-400 font-bold text-sm animate-pulse">
                            🌊 FLOW ZONE +1/s
                        </div>
                    )}
                    {combo > 5 && (
                        <div className="text-orange-400 font-bold text-sm">
                            🔥 {combo}s STREAK
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">CE</div>
                    <span className="text-xs text-blue-300 font-medium hidden sm:block">
                        {gameState === 'playing' ? 'Stay Focused!' : 'Tap to Dive'}
                    </span>
                </div>
            </div>

            {/* Game Area */}
            <div
                className="relative h-[400px] bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 overflow-hidden cursor-pointer select-none"
                onClick={gameState === 'playing' ? jump : null}
            >
                {/* Flow Zone Indicator */}
                <div
                    className="absolute left-0 right-0 bg-cyan-500/10 border-y border-cyan-500/30 pointer-events-none z-10"
                                <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
                    <span className="text-cyan-400 font-bold">TAP to surge upward</span><br />
                    Navigate through distractions<br />
                    Stay in the <span className="text-green-400">FLOW ZONE</span> for bonus points<br />
                    <strong className="text-orange-400">Can you survive 30 distractions?</strong>
                </p>
            </>
                        )}

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-900/50 transition-all"
            >
                {gameState === 'idle' ? <><Play size={20} /> START DIVING</> : <><RotateCcw size={20} /> Try Again</>}
            </motion.button>
        </div>
    )
}

{/* Captain Efficiency */ }
{
    gameState === 'playing' && (
        <motion.div
            className="absolute w-12 h-12 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50 flex items-center justify-center z-20 pointer-events-none border-2 border-white"
            style={{
                left: '20%',
                top: `${captainY}%`,
                transform: 'translateY(-50%)'
            }}
            animate={{
                rotate: velocity * 3,
            }}
        >
            <Zap className="text-white" size={24} />
        </motion.div>
    )
}

{/* Obstacles */ }
<AnimatePresence>
    {obstacles.map((obs) => {
        const gapTopPx = (obs.gapY - (obs.gapSize / 2) / 4);
        const gapBottomPx = (obs.gapY + (obs.gapSize / 2) / 4);

        return (
            <div key={obs.id} className="absolute top-0 bottom-0 w-16 z-15" style={{ left: `${obs.x}%` }}>
                {/* Top obstacle */}
                <div
                    className={`absolute left-0 right-0 ${obs.color} border-4 border-white/20 shadow-lg`}
                    style={{
                        top: 0,
                        height: `${gapTopPx}%`,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingBottom: '8px'
                    }}
                >
                    <span className="text-2xl">{obs.label}</span>
                </div>

                {/* Bottom obstacle */}
                <div
                    className={`absolute left-0 right-0 ${obs.color} border-4 border-white/20 shadow-lg`}
                    style={{
                        bottom: 0,
                        height: `${100 - gapBottomPx}%`,
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingTop: '8px'
                    }}
                >
                    <span className="text-2xl">{obs.label}</span>
                </div>
            </div>
        );
    })}
</AnimatePresence>

{/* Instructions (only when idle) */ }
{
    gameState === 'idle' && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-slate-400 text-sm z-20 pointer-events-none">
            Click anywhere to start diving 👇
        </div>
    )
}
            </div >
        </div >
    );
};

export default DeepWorkDive;
