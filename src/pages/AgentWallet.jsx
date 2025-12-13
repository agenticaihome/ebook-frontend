import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
    Wallet, Clock, Zap, Search, Star, Trophy
} from 'lucide-react';
import AgentCard from '../components/gamification/AgentCard';
import WebbookLayout from '../components/layout/WebbookLayout';

/**
 * AgentWallet - Collection view of all earned agent cards
 */

// All available cards in the game
const ALL_CARDS = [
    // Daily Ops
    { id: 'morning_brief', name: 'Morning Brief Agent', rarity: 'common', category: 'Daily Ops', timeSaved: '30 min/day', moneySaved: '$0', complexity: 2, powerLevel: 45, prompt: 'I want you to act as my morning briefing agent. Ask me: 1) What time I wake up, 2) What info I need each morning (weather, calendar, priorities), 3) How I want it formatted. Then show me what tomorrow\'s briefing would look like.' },
    { id: 'meal_planner', name: 'Meal Planner', rarity: 'common', category: 'Daily Ops', timeSaved: '2 hrs/week', moneySaved: '$50/mo', complexity: 2, powerLevel: 55, prompt: 'You are my meal planning assistant. Help me plan a week of meals based on my dietary preferences, budget, and schedule.' },
    { id: 'grocery_list', name: 'Grocery List Generator', rarity: 'common', category: 'Daily Ops', timeSaved: '1 hr/week', moneySaved: '$30/mo', complexity: 1, powerLevel: 35, prompt: 'Generate my grocery list based on my meal plan. Organize by store section.' },
    { id: 'cleaning_coordinator', name: 'Cleaning Coordinator', rarity: 'rare', category: 'Daily Ops', timeSaved: '1 hr/week', moneySaved: '$0', complexity: 3, powerLevel: 50, prompt: 'You are my household cleaning coordinator. Create a weekly cleaning schedule based on my home and availability.' },
    { id: 'maintenance_manager', name: 'Maintenance Manager', rarity: 'rare', category: 'Daily Ops', timeSaved: '30 min/week', moneySaved: '$100/mo', complexity: 3, powerLevel: 60, prompt: 'Track and manage home maintenance tasks. Alert me to seasonal maintenance needs.' },
    { id: 'supplies_tracker', name: 'Supplies Tracker', rarity: 'common', category: 'Daily Ops', timeSaved: '30 min/week', moneySaved: '$20/mo', complexity: 2, powerLevel: 40, prompt: 'Monitor household supplies and alert me when items are running low.' },

    // Digital Ops
    { id: 'email_triage', name: 'Email Triage Specialist', rarity: 'rare', category: 'Digital Ops', timeSaved: '1 hr/day', moneySaved: '$0', complexity: 3, powerLevel: 70, prompt: 'You are my email triage specialist. Help me categorize emails by urgency and draft quick responses.' },
    { id: 'email_drafter', name: 'Email Drafter', rarity: 'rare', category: 'Digital Ops', timeSaved: '30 min/day', moneySaved: '$0', complexity: 3, powerLevel: 65, prompt: 'Draft professional emails based on my bullet points and context.' },
    { id: 'calendar_defender', name: 'Calendar Defender', rarity: 'epic', category: 'Digital Ops', timeSaved: '2 hrs/week', moneySaved: '$0', complexity: 4, powerLevel: 80, prompt: 'You are my calendar defender. Help me protect focus time and optimize my schedule.' },
    { id: 'meeting_prep', name: 'Meeting Prep Agent', rarity: 'rare', category: 'Digital Ops', timeSaved: '30 min/meeting', moneySaved: '$0', complexity: 3, powerLevel: 60, prompt: 'Prepare me for upcoming meetings with agendas, context, and talking points.' },
    { id: 'admin_tracker', name: 'Admin Tracker', rarity: 'rare', category: 'Digital Ops', timeSaved: '1 hr/week', moneySaved: '$50/mo', complexity: 3, powerLevel: 55, prompt: 'Track administrative tasks, deadlines, and paperwork.' },
    { id: 'subscription_auditor', name: 'Subscription Auditor', rarity: 'common', category: 'Digital Ops', timeSaved: '15 min/mo', moneySaved: '$100/mo', complexity: 2, powerLevel: 45, prompt: 'Audit and optimize my subscriptions. Find unused services.' },

    // Life Systems
    { id: 'health_coordinator', name: 'Health Coordinator', rarity: 'epic', category: 'Life Systems', timeSaved: '30 min/week', moneySaved: '$0', complexity: 4, powerLevel: 75, prompt: 'You are my personal health coordinator. Track appointments, symptoms, and wellness goals.' },
    { id: 'medication_manager', name: 'Medication Manager', rarity: 'rare', category: 'Life Systems', timeSaved: '15 min/day', moneySaved: '$0', complexity: 2, powerLevel: 50, prompt: 'Track and remind me about medications and supplements.' },
    { id: 'wellness_tracker', name: 'Wellness Tracker', rarity: 'rare', category: 'Life Systems', timeSaved: '15 min/day', moneySaved: '$0', complexity: 3, powerLevel: 55, prompt: 'Monitor my wellness metrics including sleep, exercise, and stress.' },
    { id: 'connection_agent', name: 'Connection Agent', rarity: 'epic', category: 'Life Systems', timeSaved: '30 min/week', moneySaved: '$0', complexity: 4, powerLevel: 70, prompt: 'Help me maintain important relationships with reminders and conversation starters.' },
    { id: 'occasion_tracker', name: 'Occasion Tracker', rarity: 'rare', category: 'Life Systems', timeSaved: '1 hr/mo', moneySaved: '$0', complexity: 2, powerLevel: 45, prompt: 'Track birthdays, anniversaries, and important events. Suggest gift ideas.' },
    { id: 'network_nurturer', name: 'Network Nurturer', rarity: 'epic', category: 'Life Systems', timeSaved: '30 min/week', moneySaved: '$0', complexity: 4, powerLevel: 65, prompt: 'Nurture professional network relationships with strategic touchpoints.' },
    { id: 'recovery_learner', name: 'Recovery-Aware Learner', rarity: 'epic', category: 'Life Systems', timeSaved: '1 hr/week', moneySaved: '$0', complexity: 4, powerLevel: 75, prompt: 'Match learning activities to my current energy level for optimal retention.' },
    { id: 'second_brain', name: 'Second Brain', rarity: 'epic', category: 'Life Systems', timeSaved: '2 hrs/week', moneySaved: '$0', complexity: 5, powerLevel: 85, prompt: 'Capture, organize, and connect my knowledge for easy retrieval.' },

    // Master
    { id: 'the_conductor', name: 'The Conductor', rarity: 'legendary', category: 'Master', timeSaved: '3 hrs/week', moneySaved: '$0', complexity: 5, powerLevel: 95, prompt: 'You are the master orchestrator of all my agents. Coordinate their outputs into a unified Life Operating System.' },
    { id: 'daily_briefing', name: 'Daily Briefing Commander', rarity: 'legendary', category: 'Master', timeSaved: '1 hr/day', moneySaved: '$0', complexity: 5, powerLevel: 90, prompt: 'Compile and deliver my comprehensive daily briefing from all agent inputs.' },
    { id: 'weekly_review', name: 'Weekly Review Overseer', rarity: 'legendary', category: 'Master', timeSaved: '2 hrs/week', moneySaved: '$0', complexity: 5, powerLevel: 88, prompt: 'Guide me through systematic weekly reviews covering all life domains.' },
    { id: 'system_health', name: 'System Health Monitor', rarity: 'legendary', category: 'Master', timeSaved: '1 hr/week', moneySaved: '$0', complexity: 5, powerLevel: 92, prompt: 'Monitor and optimize my entire Life OS. Identify bottlenecks and suggest improvements.' },
];

const AgentWallet = ({ unlockedCardIds: propUnlockedCardIds }) => {
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('power');
    const [searchTerm, setSearchTerm] = useState('');
    const [unlockedCardIds, setUnlockedCardIds] = useState(propUnlockedCardIds || []);

    useEffect(() => {
        if (!propUnlockedCardIds) {
            const saved = JSON.parse(localStorage.getItem('unlocked_cards') || '[]');
            setUnlockedCardIds(saved);
        } else {
            setUnlockedCardIds(propUnlockedCardIds);
        }
    }, [propUnlockedCardIds]);

    // Calculate stats
    const unlockedCards = ALL_CARDS.filter(card => unlockedCardIds.includes(card.id));
    const totalPower = unlockedCards.reduce((sum, card) => sum + card.powerLevel, 0);
    const collectionPercent = Math.round((unlockedCards.length / ALL_CARDS.length) * 100);

    // Filter and sort cards
    const displayCards = ALL_CARDS
        .filter(card => {
            if (filter !== 'all' && card.category !== filter) return false;
            if (searchTerm && !card.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'power') return b.powerLevel - a.powerLevel;
            if (sortBy === 'rarity') {
                const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
                return rarityOrder[a.rarity] - rarityOrder[b.rarity];
            }
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            return 0;
        });

    const categories = ['all', 'Daily Ops', 'Digital Ops', 'Life Systems', 'Master'];

    return (
        <WebbookLayout>
            <Helmet>
                <title>Your Agent Deck | Agentic AI Home</title>
                <meta name="description" content="View and manage your collected AI agent cards." />
            </Helmet>
            <div className="min-h-screen bg-[#0f0f1a] p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-600 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-900/50 via-slate-800 to-cyan-900/50 px-6 py-5 border-b border-slate-700">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                                        <Wallet className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Agent Deck</h2>
                                        <p className="text-slate-300 text-sm">Your collection of AI agents</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-2xl font-bold text-white">
                                        {unlockedCards.length}/{ALL_CARDS.length}
                                    </div>
                                    <div className="text-slate-300 text-sm">Cards Collected</div>
                                </div>
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-4 gap-4">
                                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                                    <Zap className="text-cyan-400 mx-auto mb-1" size={18} />
                                    <span className="text-xl font-bold text-white block">{totalPower}</span>
                                    <span className="text-slate-500 text-xs">Total Power</span>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                                    <Clock className="text-green-400 mx-auto mb-1" size={18} />
                                    <span className="text-xl font-bold text-white block">7-8h</span>
                                    <span className="text-slate-500 text-xs">Weekly Saved</span>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                                    <Trophy className="text-yellow-400 mx-auto mb-1" size={18} />
                                    <span className="text-xl font-bold text-white block">{collectionPercent}%</span>
                                    <span className="text-slate-500 text-xs">Complete</span>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                                    <Star className="text-purple-400 mx-auto mb-1" size={18} />
                                    <span className="text-xl font-bold text-white block">
                                        {unlockedCards.filter(c => c.rarity === 'legendary').length}
                                    </span>
                                    <span className="text-slate-500 text-xs">Legendary</span>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex gap-2 flex-wrap">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setFilter(cat)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === cat
                                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                                : 'bg-slate-700/50 text-slate-300 hover:text-white'
                                                }`}
                                        >
                                            {cat === 'all' ? 'All' : cat}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex-1" />

                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-40"
                                    />
                                </div>

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                                >
                                    <option value="power">Power</option>
                                    <option value="rarity">Rarity</option>
                                    <option value="name">Name</option>
                                </select>
                            </div>
                        </div>

                        {/* Cards grid */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                                {displayCards.map((card, i) => {
                                    const isUnlocked = unlockedCardIds.includes(card.id);

                                    return (
                                        <motion.div
                                            key={card.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <AgentCard
                                                {...card}
                                                locked={!isUnlocked}
                                                size="default"
                                            />
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {displayCards.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-slate-500">No cards match your filters</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </WebbookLayout>
    );
};

export default AgentWallet;
export { ALL_CARDS };
