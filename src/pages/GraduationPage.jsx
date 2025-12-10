import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Trophy, Share2, Download, Home, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import WebbookLayout from '../components/layout/WebbookLayout';
import CommanderCertificate from '../components/common/CommanderCertificate';
import confetti from 'canvas-confetti';

/**
 * GraduationPage - The ultimate "Pixar Moment"
 * When users complete all 10 chapters, they see this celebration
 */
const GraduationPage = () => {
    const [commanderName, setCommanderName] = useState('Commander');
    const [showNamePrompt, setShowNamePrompt] = useState(true);
    const [tempName, setTempName] = useState('');

    useEffect(() => {
        // Fire epic confetti on load
        const duration = 5000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#14b8a6', '#f59e0b', '#a855f7']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#14b8a6', '#f59e0b', '#a855f7']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();

        // Mark as graduated
        localStorage.setItem('graduated', 'true');
    }, []);

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (tempName.trim()) {
            setCommanderName(tempName.trim());
            localStorage.setItem('commander_name', tempName.trim());
            setShowNamePrompt(false);
        }
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>🎖️ Congratulations, Commander! | Agentic AI Home</title>
                <meta name="description" content="You've completed all 10 missions and joined the Agent Army!" />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12] text-white py-12 px-6">
                <div className="max-w-4xl mx-auto">

                    {/* Name prompt modal */}
                    {showNamePrompt && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-slate-800 rounded-2xl p-8 max-w-md w-full text-center border border-slate-700"
                            >
                                <div className="w-20 h-20 mx-auto mb-6">
                                    <img
                                        src="/assets/captain-celebrating-transparent.webp"
                                        alt="Captain E celebrating"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">One Last Thing, Commander...</h2>
                                <p className="text-slate-400 mb-6">What name should go on your certificate?</p>
                                <form onSubmit={handleNameSubmit}>
                                    <input
                                        type="text"
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white text-center text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold rounded-xl transition-all"
                                    >
                                        Reveal My Certificate
                                    </button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 mb-6">
                            <Trophy className="text-amber-400" size={18} />
                            <span className="text-amber-400 font-bold text-sm">ALL 10 MISSIONS COMPLETE</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black mb-4">
                            Welcome to the{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                                Agent Army
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            You've built a complete AI delegation system. Your mornings, emails, meals,
                            finances, and fitness are now on autopilot. You've earned this.
                        </p>
                    </motion.div>

                    {/* Captain E message */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-800/50 rounded-2xl p-6 mb-12 border border-teal-500/30"
                    >
                        <div className="flex items-start gap-4">
                            <img
                                src="/assets/captain-pointing-transparent.webp"
                                alt="Captain E"
                                className="w-20 h-20 object-contain flex-shrink-0"
                            />
                            <div>
                                <p className="text-teal-400 font-bold mb-2">Captain Efficiency says:</p>
                                <p className="text-slate-300 leading-relaxed text-lg italic">
                                    "Commander {commanderName}, on behalf of every hour you'll never waste again,
                                    every morning you'll wake up to clarity, and every task that now runs on autopilot...
                                    <span className="text-white font-medium">Welcome to the Agent Army.</span>
                                    You didn't just read a book. You built a Life Operating System.
                                    Now go live the life your agents are working to give you."
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Certificate */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                            <Sparkles className="text-amber-400" size={24} />
                            Your Commander Certificate
                        </h2>
                        <CommanderCertificate
                            commanderName={commanderName}
                            agentsDeployed={10}
                        />
                    </motion.div>

                    {/* Next steps */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-center"
                    >
                        <h3 className="text-xl font-bold mb-4">What's Next, Commander?</h3>
                        <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                            <Link
                                to="/dashboard"
                                className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-all group"
                            >
                                <Home className="mx-auto mb-2 text-teal-400 group-hover:scale-110 transition-transform" size={24} />
                                <div className="text-white font-bold">Dashboard</div>
                                <div className="text-slate-500 text-sm">Review your agents</div>
                            </Link>
                            <Link
                                to="/games"
                                className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all group"
                            >
                                <Trophy className="mx-auto mb-2 text-purple-400 group-hover:scale-110 transition-transform" size={24} />
                                <div className="text-white font-bold">Games</div>
                                <div className="text-slate-500 text-sm">Compete on leaderboards</div>
                            </Link>
                            <button
                                onClick={() => {
                                    const text = "🎖️ I just graduated from @agenticaihome! All 10 AI agents deployed. My life is officially on autopilot. #AgentArmy";
                                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                                }}
                                className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all group"
                            >
                                <Share2 className="mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
                                <div className="text-white font-bold">Share</div>
                                <div className="text-slate-500 text-sm">Tell the world</div>
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default GraduationPage;
