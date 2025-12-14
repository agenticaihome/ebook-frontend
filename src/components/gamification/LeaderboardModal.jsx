import React, { useState, useEffect, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Trophy, X, Medal, Calendar, Crown, Sparkles, Star, Clock } from 'lucide-react';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';

const LeaderboardModal = ({ gameId, gameTitle, isOpen, onClose, currentUserScore = null }) => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCelebration, setShowCelebration] = useState(false);

    // Calculate days until month reset
    const daysUntilReset = useMemo(() => {
        const now = new Date();
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const diffTime = nextMonth - now;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }, []);

    useEffect(() => {
        if (isOpen && gameId) {
            fetchScores();
        }
    }, [isOpen, gameId]);

    const fetchScores = async () => {
        setLoading(true);
        try {
            // Use monthly leaderboard for fresh competition
            const data = await api.getMonthlyLeaderboard(gameId);
            setScores(data);
            setError(null);

            // Check if current user made the leaderboard
            if (currentUserScore && data.some(s => s.score === currentUserScore)) {
                setShowCelebration(true);
                setTimeout(() => {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.5 },
                        colors: ['#fbbf24', '#f59e0b', '#06b6d4', '#a855f7']
                    });
                }, 300);
            }
        } catch (err) {
            console.error('Failed to fetch leaderboard:', err);
            setError('Failed to load scores. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const getRankIcon = (index) => {
        if (index === 0) return <Crown className="text-yellow-400" size={16} />;
        if (index === 1) return <Medal className="text-slate-300" size={14} />;
        if (index === 2) return <Medal className="text-orange-400" size={14} />;
        return null;
    };

    return (
        <AnimatePresence>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
                role="dialog"
                aria-modal="true"
                aria-labelledby="leaderboard-title"
            >
                <m.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="bg-[#131320] border border-slate-600 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with Captain Efficiency for #1 */}
                    <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-yellow-900/20 to-slate-900">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <m.div
                                    className="p-2 bg-yellow-500/20 rounded-lg relative"
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <Trophy className="text-yellow-400" size={24} />
                                    <Sparkles className="absolute -top-1 -right-1 text-yellow-300 w-4 h-4" />
                                </m.div>
                                <div>
                                    <h2 id="leaderboard-title" className="text-xl font-bold text-white flex items-center gap-2">
                                        Top 10 Agents
                                        <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">GLOBAL</span>
                                    </h2>
                                    <p className="text-xs text-slate-300">{gameTitle}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                aria-label="Close leaderboard"
                                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-slate-700 active:bg-slate-600 rounded-full transition-all text-slate-300 hover:text-white active:scale-95 touch-manipulation"
                            >
                                <X size={22} />
                            </button>
                        </div>
                    </div>

                    {/* Celebration Banner */}
                    <AnimatePresence>
                        {showCelebration && (
                            <m.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 border-b border-yellow-500/30"
                            >
                                <div className="px-4 py-3 flex items-center justify-center gap-2 text-yellow-400 font-bold">
                                    <Star className="w-5 h-5" />
                                    <span>🎉 NEW GLOBAL RANK!</span>
                                    <Star className="w-5 h-5" />
                                </div>
                            </m.div>
                        )}
                    </AnimatePresence>

                    {/* Content - Touch-optimized scrolling */}
                    <div
                        className="max-h-[55vh] overflow-y-auto p-4 custom-scrollbar overscroll-contain"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-3">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
                                <p className="text-slate-300 text-sm">Loading champions...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-12 text-red-400">
                                <p>{error}</p>
                                <button
                                    onClick={fetchScores}
                                    className="mt-4 text-sm text-slate-300 hover:text-white underline"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : scores.length === 0 ? (
                            <div className="text-center py-12 text-slate-300">
                                <Trophy size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="font-bold">No scores yet!</p>
                                <p className="text-sm mt-1">Be the first to claim the #1 spot!</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {scores.map((score, index) => (
                                    <m.div
                                        key={score.id || index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${index === 0
                                            ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border-yellow-500/40 shadow-lg shadow-yellow-500/10'
                                            : index === 1
                                                ? 'bg-slate-300/10 border-slate-300/30'
                                                : index === 2
                                                    ? 'bg-orange-500/10 border-orange-500/30'
                                                    : 'bg-slate-800/30 border-slate-600/50 hover:bg-slate-800/50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Rank Badge */}
                                            <m.div
                                                className={`w-9 h-9 flex items-center justify-center rounded-full font-bold text-sm ${index === 0
                                                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black shadow-lg'
                                                    : index === 1
                                                        ? 'bg-gradient-to-br from-slate-200 to-slate-400 text-black'
                                                        : index === 2
                                                            ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-black'
                                                            : 'bg-slate-700 text-slate-300'
                                                    }`}
                                                animate={index === 0 ? { scale: [1, 1.1, 1] } : {}}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                            >
                                                {index + 1}
                                            </m.div>

                                            <div>
                                                <div className="font-bold text-white flex items-center gap-2">
                                                    {score.username || score.user?.email?.split('@')[0] || 'Anonymous'}
                                                    {getRankIcon(index)}
                                                </div>
                                                <div className="text-xs text-slate-300 flex items-center gap-1">
                                                    <Calendar size={10} />
                                                    {score.achievedAt
                                                        ? new Date(score.achievedAt).toLocaleDateString()
                                                        : score.date
                                                            ? new Date(score.date).toLocaleDateString()
                                                            : 'Today'
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <m.div
                                                className={`font-mono font-bold text-lg ${index === 0 ? 'text-yellow-400' : 'text-cyan-400'
                                                    }`}
                                                animate={index === 0 ? { textShadow: ['0 0 10px #fbbf24', '0 0 20px #fbbf24', '0 0 10px #fbbf24'] } : {}}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                            >
                                                {score.score?.toLocaleString() || 0}
                                            </m.div>
                                            <div className="text-[10px] text-slate-300 uppercase tracking-wider">
                                                Points
                                            </div>
                                        </div>
                                    </m.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                                <Clock size={12} className="text-cyan-400" />
                                <span>Resets in <span className="text-cyan-400 font-bold">{daysUntilReset}</span> days</span>
                            </div>
                            <button
                                onClick={fetchScores}
                                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>
                </m.div>
            </m.div>
        </AnimatePresence>
    );
};

export default LeaderboardModal;

