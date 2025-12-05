import React, { useState, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import AgentCard from '../components/gamification/AgentCard';
import { AGENT_DECKS, AGENT_RARITY } from '../data/agentData';
import { motion } from 'framer-motion';

const AgentWallet = () => {
    const { collectedCards, allAgents } = useGame();
    const [filterDeck, setFilterDeck] = useState('ALL');
    const [sortBy, setSortBy] = useState('POWER');

    // Calculate Stats
    const stats = useMemo(() => {
        const collected = allAgents.filter((a) => collectedCards.includes(a.id));
        const totalPower = collected.reduce((sum, a) => sum + a.stats.powerLevel, 0);

        // Simple parsing for time/money (just summing counts for now to avoid complex parsing logic)
        // In a real app, we'd parse "2 hrs/week" into minutes.
        // For now, let's just count them.

        return {
            count: collected.length,
            total: allAgents.length,
            power: totalPower,
        };
    }, [collectedCards, allAgents]);

    // Filter and Sort
    const displayedAgents = useMemo(() => {
        let result = [...allAgents];

        if (filterDeck !== 'ALL') {
            result = result.filter((a) => a.deck === filterDeck);
        }

        result.sort((a, b) => {
            const isALocked = !collectedCards.includes(a.id);
            const isBLocked = !collectedCards.includes(b.id);

            // Always show unlocked first
            if (isALocked && !isBLocked) return 1;
            if (!isALocked && isBLocked) return -1;

            if (sortBy === 'POWER') return b.stats.powerLevel - a.stats.powerLevel;
            if (sortBy === 'RARITY') {
                const rarityOrder = { LEGENDARY: 4, EPIC: 3, RARE: 2, COMMON: 1 };
                return rarityOrder[b.rarity] - rarityOrder[a.rarity];
            }
            return 0;
        });

        return result;
    }, [allAgents, collectedCards, filterDeck, sortBy]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            {/* Header Stats */}
            <div className="max-w-7xl mx-auto mb-12">
                <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    AGENT DECK
                </h1>
                <p className="text-gray-400 mb-8">Manage your deployed AI workforce.</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-gray-500 text-xs uppercase tracking-wider">Agents Collected</div>
                        <div className="text-2xl font-bold text-white">
                            {stats.count} <span className="text-gray-600 text-lg">/ {stats.total}</span>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-gray-500 text-xs uppercase tracking-wider">Total Power</div>
                        <div className="text-2xl font-bold text-purple-400">{stats.power}</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-gray-500 text-xs uppercase tracking-wider">Est. Time Saved</div>
                        <div className="text-2xl font-bold text-green-400">-- hrs/wk</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-gray-500 text-xs uppercase tracking-wider">Est. Monthly Savings</div>
                        <div className="text-2xl font-bold text-green-400">$--/mo</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        <button
                            onClick={() => setFilterDeck('ALL')}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${filterDeck === 'ALL' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                }`}
                        >
                            ALL
                        </button>
                        {Object.values(AGENT_DECKS).map((deck) => (
                            <button
                                key={deck}
                                onClick={() => setFilterDeck(deck)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${filterDeck === deck ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                    }`}
                            >
                                {deck}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-700 text-white text-sm rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-cyan-500"
                        >
                            <option value="POWER">Power Level</option>
                            <option value="RARITY">Rarity</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Card Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {displayedAgents.map((agent) => (
                    <motion.div
                        key={agent.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AgentCard
                            agent={agent}
                            isLocked={!collectedCards.includes(agent.id)}
                            isNew={false} // Todo: Implement "New" logic
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AgentWallet;
