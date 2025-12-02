import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Medal, Calendar, User } from 'lucide-react';
import { api } from '../../services/api';

const LeaderboardModal = ({ gameId, gameTitle, isOpen, onClose }) => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && gameId) {
            fetchScores();
        }
    }, [isOpen, gameId]);

    const fetchScores = async () => {
        setLoading(true);
        try {
            const data = await api.getLeaderboard(gameId);
            setScores(data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch leaderboard:', err);
            setError('Failed to load scores. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#131320] border border-slate-700 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                                <Trophy className="text-yellow-400" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Top Agents</h2>
                                <p className="text-xs text-slate-400">{gameTitle}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-12 text-red-400">
                                <p>{error}</p>
                                <button
                                    onClick={fetchScores}
                                    className="mt-4 text-sm text-slate-400 hover:text-white underline"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : scores.length === 0 ? (
                            <div className="text-center py-12 text-slate-500">
                                <Trophy size={48} className="mx-auto mb-4 opacity-20" />
                                <p>No scores yet. Be the first!</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {scores.map((score, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between p-3 rounded-xl border ${index === 0 ? 'bg-yellow-500/10 border-yellow-500/30' :
                                                index === 1 ? 'bg-slate-300/10 border-slate-300/30' :
                                                    index === 2 ? 'bg-orange-500/10 border-orange-500/30' :
                                                        'bg-slate-800/30 border-slate-700/50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${index === 0 ? 'bg-yellow-500 text-black' :
                                                    index === 1 ? 'bg-slate-300 text-black' :
                                                        index === 2 ? 'bg-orange-500 text-black' :
                                                            'bg-slate-700 text-slate-300'
                                                }`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white flex items-center gap-2">
                                                    {score.username}
                                                    {index < 3 && <Medal size={14} className={
                                                        index === 0 ? 'text-yellow-400' :
                                                            index === 1 ? 'text-slate-300' :
                                                                'text-orange-400'
                                                    } />}
                                                </div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Calendar size={10} />
                                                    {new Date(score.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-mono font-bold text-cyan-400 text-lg">
                                                {score.score.toLocaleString()}
                                            </div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                                                Score
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-slate-800 bg-slate-900/50 text-center">
                        <p className="text-xs text-slate-500">
                            Top 25 Agents Global Leaderboard
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LeaderboardModal;
