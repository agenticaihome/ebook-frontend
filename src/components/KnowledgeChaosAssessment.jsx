import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Database, Search, FolderOpen, AlertCircle } from 'lucide-react';

const KnowledgeChaosAssessment = () => {
    const [inputs, setInputs] = useState({
        findability: 'sometimes',
        storageLocations: 3,
        searchHours: 2,
        systemRating: 5
    });
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (field, value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const calculateResults = () => {
        const { findability, storageLocations, searchHours, systemRating } = inputs;

        // Chaos score calculation (1-10, 10 is max chaos)
        let chaos = 5;

        // Findability impact
        if (findability === 'rarely') chaos += 3;
        if (findability === 'sometimes') chaos += 1;
        if (findability === 'always') chaos -= 2;

        // Storage locations impact
        if (storageLocations > 5) chaos += 2;
        if (storageLocations < 3) chaos -= 1;

        // Search hours impact
        if (searchHours > 4) chaos += 2;
        if (searchHours < 1) chaos -= 1;

        // System rating impact
        if (systemRating < 4) chaos += 2;
        if (systemRating > 7) chaos -= 2;

        chaos = Math.max(Math.min(chaos, 10), 1);

        // Analysis
        let problem = "Fragmentation";
        let fix = "Centralize Capture";
        let recoverable = Math.round(searchHours * 0.7); // Assume 70% reduction possible

        if (findability === 'rarely') {
            problem = "Black Hole Storage";
            fix = "Implement Tagging System";
        } else if (storageLocations > 5) {
            problem = "Tool Overload";
            fix = "Consolidate to One Inbox";
        } else if (searchHours > 5) {
            problem = "Inefficient Retrieval";
            fix = "Full-Text Search Agent";
        }

        return { chaos, problem, fix, recoverable };
    };

    const results = showResults ? calculateResults() : null;

    const getScoreColor = (score) => {
        if (score <= 3) return 'text-green-400';
        if (score <= 6) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Database className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Knowledge Chaos Assessment</h3>
            </div>

            {!showResults ? (
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div>
                        <label className="block text-white font-medium mb-3">How often can you find info you've saved?</label>
                        <div className="grid grid-cols-2 gap-3">
                            {['always', 'usually', 'sometimes', 'rarely'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleInputChange('findability', opt)}
                                    className={`p-3 rounded-xl border-2 transition-all capitalize text-sm ${inputs.findability === opt
                                            ? 'border-cyan-500 bg-cyan-900/20 text-white'
                                            : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">How many places do you save info? (Apps, folders, etc)</label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs.storageLocations}
                            onChange={(e) => handleInputChange('storageLocations', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>1 place</span>
                            <span className="text-cyan-400 font-bold">{inputs.storageLocations} places</span>
                            <span>10+ places</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">Hours spent searching for things weekly?</label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.5"
                            value={inputs.searchHours}
                            onChange={(e) => handleInputChange('searchHours', parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>0 hrs</span>
                            <span className="text-cyan-400 font-bold">{inputs.searchHours} hrs</span>
                            <span>10+ hrs</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">Rate your current system (1-10)</label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs.systemRating}
                            onChange={(e) => handleInputChange('systemRating', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                            <span>Useless (1)</span>
                            <span className="text-cyan-400 font-bold">{inputs.systemRating}</span>
                            <span>Perfect (10)</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(true)}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all mt-4"
                    >
                        Calculate Chaos Score
                    </button>
                </m.div>
            ) : (
                <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="text-center mb-8">
                        <div className={`text-6xl font-bold ${getScoreColor(results.chaos)} mb-2`}>
                            {results.chaos}/10
                        </div>
                        <div className="text-slate-400">Knowledge Chaos Score</div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-red-400">
                                <AlertCircle size={18} />
                                <span className="text-sm">Primary Problem</span>
                            </div>
                            <div className="text-xl font-bold text-white">{results.problem}</div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-green-400">
                                <Search size={18} />
                                <span className="text-sm">Recoverable Time</span>
                            </div>
                            <div className="text-2xl font-bold text-green-400">{results.recoverable} hrs/week</div>
                            <div className="text-xs text-slate-500 mt-1">Potential gain</div>
                        </div>
                    </div>

                    <div className="bg-cyan-900/20 p-6 rounded-xl border border-cyan-500/30 mb-6">
                        <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                            <FolderOpen size={20} />
                            Recommended First Step
                        </h4>
                        <p className="text-white text-lg">
                            {results.chaos > 6
                                ? "Stop organizing. Start capturing. Create a single 'Knowledge Inbox' where everything goes first. Don't worry about tags yet."
                                : "You have a decent foundation. Now focus on retrieval. Set up a weekly review to process your inbox and tag items for search."}
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

export default KnowledgeChaosAssessment;
