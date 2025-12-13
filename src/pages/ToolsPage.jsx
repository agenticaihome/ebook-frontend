import React, { useState, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowLeft, Calculator, Brain, Mail, Home, Calendar, DollarSign, Shield, Lightbulb, Clock, Utensils, Sparkles } from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';

// ============================================
// TOOLS HUB PAGE
// All tools FREE - Organized by category
// ============================================

// Lazy load all tools for performance
const MorningChaosCalculator = React.lazy(() => import('../components/MorningChaosCalculator'));
const EmailChaosCalculator = React.lazy(() => import('../components/EmailChaosCalculator'));
const FoodChaosCalculator = React.lazy(() => import('../components/FoodChaosCalculator'));
const HouseholdChaosCalculator = React.lazy(() => import('../components/HouseholdChaosCalculator'));
const MentalLoadCalculator = React.lazy(() => import('../components/MentalLoadCalculator'));
const FinancialHealthScore = React.lazy(() => import('../components/FinancialHealthScore'));
const CalendarHealthScore = React.lazy(() => import('../components/CalendarHealthScore'));
const PrivacyAssessment = React.lazy(() => import('../components/PrivacyAssessment'));
const KnowledgeChaosAssessment = React.lazy(() => import('../components/KnowledgeChaosAssessment'));
const SmartHomeReadinessAssessment = React.lazy(() => import('../components/SmartHomeReadinessAssessment'));

// Tool Categories with their tools
const TOOL_CATEGORIES = [
    {
        id: 'daily-life',
        name: '🌅 Daily Life Chaos',
        description: 'Assess your everyday routines',
        color: 'from-orange-500 to-amber-500',
        tools: [
            {
                id: 'morning',
                name: 'Morning Chaos Calculator',
                description: 'How chaotic are your mornings?',
                icon: Clock,
                color: 'from-orange-500 to-amber-500',
                component: MorningChaosCalculator
            },
            {
                id: 'food',
                name: 'Food Chaos Calculator',
                description: 'Are meals stressing you out?',
                icon: Utensils,
                color: 'from-green-500 to-emerald-500',
                component: FoodChaosCalculator
            },
            {
                id: 'household',
                name: 'Household Chaos Calculator',
                description: 'Is your home under control?',
                icon: Home,
                color: 'from-teal-500 to-cyan-500',
                component: HouseholdChaosCalculator
            }
        ]
    },
    {
        id: 'financial-planning',
        name: '💰 Financial & Planning',
        description: 'Money and schedule health',
        color: 'from-green-600 to-teal-500',
        tools: [
            {
                id: 'financial',
                name: 'Financial Health Score',
                description: 'How healthy are your finances?',
                icon: DollarSign,
                color: 'from-green-600 to-teal-500',
                component: FinancialHealthScore
            },
            {
                id: 'calendar',
                name: 'Calendar Health Score',
                description: 'Is your schedule working for you?',
                icon: Calendar,
                color: 'from-indigo-500 to-purple-500',
                component: CalendarHealthScore
            }
        ]
    },
    {
        id: 'digital-wellness',
        name: '📧 Digital Wellness',
        description: 'Your online life assessment',
        color: 'from-blue-500 to-cyan-500',
        tools: [
            {
                id: 'email',
                name: 'Email Chaos Calculator',
                description: 'Is your inbox controlling you?',
                icon: Mail,
                color: 'from-blue-500 to-cyan-500',
                component: EmailChaosCalculator
            },
            {
                id: 'mental',
                name: 'Mental Load Calculator',
                description: "What's the weight on your mind?",
                icon: Brain,
                color: 'from-purple-500 to-pink-500',
                component: MentalLoadCalculator
            },
            {
                id: 'privacy',
                name: 'Privacy Assessment',
                description: 'How exposed are you online?',
                icon: Shield,
                color: 'from-red-500 to-rose-500',
                component: PrivacyAssessment
            }
        ]
    },
    {
        id: 'future-ready',
        name: '✨ Future-Ready',
        description: 'Prepare for automation',
        color: 'from-cyan-500 to-blue-500',
        tools: [
            {
                id: 'knowledge',
                name: 'Knowledge Chaos Assessment',
                description: 'Is your information organized?',
                icon: Lightbulb,
                color: 'from-yellow-500 to-orange-500',
                component: KnowledgeChaosAssessment
            },
            {
                id: 'smarthome',
                name: 'Smart Home Readiness',
                description: 'Ready for automation?',
                icon: Sparkles,
                color: 'from-cyan-500 to-blue-500',
                component: SmartHomeReadinessAssessment
            }
        ]
    }
];

// Flatten tools for lookup
const ALL_TOOLS = TOOL_CATEGORIES.flatMap(cat => cat.tools);

// ============================================
// TOOL CARD COMPONENT
// ============================================
const ToolCard = ({ tool, onSelect, isSelected }) => {
    const Icon = tool.icon;

    return (
        <m.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(tool.id)}
            className={`relative p-4 rounded-xl border cursor-pointer transition-all ${isSelected
                ? `bg-gradient-to-br ${tool.color} border-white/30 shadow-lg`
                : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
                }`}
        >
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full">
                FREE
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${isSelected ? 'bg-white/20' : `bg-gradient-to-br ${tool.color}`
                }`}>
                <Icon className="text-white" size={20} />
            </div>
            <h3 className="font-bold text-sm mb-0.5 text-white">
                {tool.name}
            </h3>
            <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                {tool.description}
            </p>
        </m.div>
    );
};

// ============================================
// CATEGORY SECTION COMPONENT
// ============================================
const CategorySection = ({ category, selectedTool, onSelectTool }) => {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
                <h3 className={`font-bold text-base bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.name}
                </h3>
                <span className="text-xs text-slate-500">{category.description}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.tools.map(tool => (
                    <ToolCard
                        key={tool.id}
                        tool={tool}
                        isSelected={selectedTool === tool.id}
                        onSelect={onSelectTool}
                    />
                ))}
            </div>
        </div>
    );
};

// ============================================
// MAIN TOOLS PAGE
// ============================================
const ToolsPage = () => {
    const [selectedTool, setSelectedTool] = useState(null);

    const selectedToolData = ALL_TOOLS.find(t => t.id === selectedTool);

    return (
        <WebbookLayout>
            <Helmet>
                <title>Free Tools Hub | Agentic AI Home</title>
                <meta name="description" content="10 free interactive tools to assess your chaos levels and find opportunities for AI automation." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12] text-white px-4 py-8">
                <div className="max-w-6xl mx-auto">

                    {/* HEADER */}
                    <div className="flex items-center gap-4 mb-6">
                        <Link to="/dashboard" className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2">
                                🛠️ Free Tools Hub
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">ALL FREE</span>
                            </h1>
                            <p className="text-slate-300 text-sm">Assess your chaos levels before building agents</p>
                        </div>
                    </div>

                    {/* TOOL SELECTOR BY CATEGORY */}
                    <div className="mb-8">
                        {TOOL_CATEGORIES.map(category => (
                            <CategorySection
                                key={category.id}
                                category={category}
                                selectedTool={selectedTool}
                                onSelectTool={setSelectedTool}
                            />
                        ))}
                    </div>

                    {/* SELECTED TOOL CONTENT */}
                    {selectedTool && (
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    {selectedToolData && <selectedToolData.icon size={24} className="text-teal-400" />}
                                    {selectedToolData?.name}
                                </h2>
                                <button
                                    onClick={() => setSelectedTool(null)}
                                    className="text-slate-400 hover:text-white text-sm px-3 py-1 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                            <Suspense fallback={
                                <div className="flex items-center justify-center h-64">
                                    <div className="animate-spin w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full" />
                                </div>
                            }>
                                {selectedToolData && <selectedToolData.component />}
                            </Suspense>
                        </m.div>
                    )}

                    {/* EMPTY STATE */}
                    {!selectedTool && (
                        <div className="flex flex-col items-center justify-center py-12 bg-slate-800/20 rounded-2xl border border-slate-700/30">
                            <div className="text-5xl mb-4">☝️</div>
                            <h3 className="text-lg font-bold text-white mb-2">Select a Tool Above</h3>
                            <p className="text-slate-400 text-center max-w-sm text-sm">
                                Pick any calculator to assess your chaos levels and discover where AI can help.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </WebbookLayout>
    );
};

export default ToolsPage;
