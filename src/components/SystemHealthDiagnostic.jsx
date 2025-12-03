import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Activity, AlertTriangle, CheckCircle, Wrench } from 'lucide-react';

const SystemHealthDiagnostic = () => {
    const [ratings, setRatings] = useState({
        morning: 3,
        kitchen: 3,
        household: 3,
        email: 3,
        calendar: 3,
        finance: 3,
        recovery: 3,
        secondBrain: 3
    });
    const [showResults, setShowResults] = useState(false);

    const handleRatingChange = (agent, value) => {
        setRatings({ ...ratings, [agent]: parseInt(value) });
    };

    const calculateHealth = () => {
        const scores = Object.values(ratings);
        const total = scores.reduce((a, b) => a + b, 0);
        const average = total / scores.length;
        const percentage = Math.round((total / (scores.length * 5)) * 100);

        const weakPoints = Object.entries(ratings)
            .filter(([_, score]) => score <= 2)
            .map(([agent]) => agent);

        const strongPoints = Object.entries(ratings)
            .filter(([_, score]) => score >= 4)
            .map(([agent]) => agent);

        return { percentage, average, weakPoints, strongPoints };
    };

    const results = showResults ? calculateHealth() : null;

    const getAgentName = (key) => key.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase());

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Activity className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">System Health Diagnostic</h3>
            </div>

            {!showResults ? (
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-slate-300 mb-6">Rate each agent's current helpfulness (1 = Useless, 5 = Essential).</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {Object.keys(ratings).map((agent) => (
                            <div key={agent} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                <div className="flex justify-between mb-2">
                                    <label className="text-white font-medium">{getAgentName(agent)} Agent</label>
                                    <span className={`font-bold ${ratings[agent] >= 4 ? 'text-green-400' : ratings[agent] <= 2 ? 'text-red-400' : 'text-yellow-400'}`}>
                                        {ratings[agent]}/5
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    value={ratings[agent]}
                                    onChange={(e) => handleRatingChange(agent, e.target.value)}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-1">
                                    <span>Useless</span>
                                    <span>Essential</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowResults(true)}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all"
                    >
                        Run Diagnostic
                    </button>
                </m.div>
            ) : (
                <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="text-center mb-8">
                        <div className={`text-6xl font-bold mb-2 ${results.percentage >= 80 ? 'text-green-400' : results.percentage >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {results.percentage}%
                        </div>
                        <div className="text-slate-400">Overall System Health</div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/30">
                            <div className="flex items-center gap-2 mb-2 text-green-400">
                                <CheckCircle size={18} />
                                <span className="font-bold">Strong Points</span>
                            </div>
                            {results.strongPoints.length > 0 ? (
                                <ul className="text-sm text-slate-300 list-disc pl-4">
                                    {results.strongPoints.map(agent => (
                                        <li key={agent}>{getAgentName(agent)} Agent</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-slate-400">No strong points yet. Keep building!</p>
                            )}
                        </div>

                        <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/30">
                            <div className="flex items-center gap-2 mb-2 text-red-400">
                                <AlertTriangle size={18} />
                                <span className="font-bold">Needs Attention</span>
                            </div>
                            {results.weakPoints.length > 0 ? (
                                <ul className="text-sm text-slate-300 list-disc pl-4">
                                    {results.weakPoints.map(agent => (
                                        <li key={agent}>{getAgentName(agent)} Agent</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-slate-400">No critical failures. Great job!</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-6">
                        <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                            <Wrench size={20} />
                            Captain's Prescription
                        </h4>
                        <p className="text-white">
                            {results.weakPoints.length > 0
                                ? `Focus entirely on fixing your ${getAgentName(results.weakPoints[0])} Agent this week. A broken agent creates more work than no agent.`
                                : "Your system is healthy! Focus on 'friction logging' — identify the one tiny annoyance that happens daily and automate it away."}
                        </p>
                    </div>

                    <button
                        onClick={() => setShowResults(false)}
                        className="w-full text-slate-400 hover:text-white transition-colors"
                    >
                        Recalculate
                    </button>
                </m.div>
            )}
        </div>
    );
};

export default SystemHealthDiagnostic;
