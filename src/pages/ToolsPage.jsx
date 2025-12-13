import React, { useState, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowLeft, Calculator, Brain, Mail, Home, Calendar, DollarSign, Shield, Lightbulb, Clock, Utensils, Sparkles, Lock } from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';

// ============================================
// TOOLS HUB PAGE
// Showcases all interactive calculators/tools
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

// Tool definitions
const TOOLS = [
    {
        id: 'morning',
        name: 'Morning Chaos Calculator',
        description: 'How chaotic are your mornings?',
        icon: Clock,
        color: 'from-orange-500 to-amber-500',
        component: MorningChaosCalculator,
        free: true
    },
    {
        id: 'email',
        name: 'Email Chaos Calculator',
        description: 'Is your inbox controlling you?',
        icon: Mail,
        color: 'from-blue-500 to-cyan-500',
        component: EmailChaosCalculator,
        free: true
    },
    {
        id: 'mental',
        name: 'Mental Load Calculator',
        description: 'What\'s the weight on your mind?',
        icon: Brain,
        color: 'from-purple-500 to-pink-500',
        component: MentalLoadCalculator,
        free: false
    },
    {
        id: 'food',
        name: 'Food Chaos Calculator',
        description: 'Are meals stressing you out?',
        icon: Utensils,
        color: 'from-green-500 to-emerald-500',
        component: FoodChaosCalculator,
        free: false
    },
    {
        id: 'household',
        name: 'Household Chaos Calculator',
        description: 'Is your home under control?',
        icon: Home,
        color: 'from-teal-500 to-cyan-500',
        component: HouseholdChaosCalculator,
        free: false
    },
    {
        id: 'financial',
        name: 'Financial Health Score',
        description: 'How healthy are your finances?',
        icon: DollarSign,
        color: 'from-green-600 to-teal-500',
        component: FinancialHealthScore,
        free: false
    },
    {
        id: 'calendar',
        name: 'Calendar Health Score',
        description: 'Is your schedule working for you?',
        icon: Calendar,
        color: 'from-indigo-500 to-purple-500',
        component: CalendarHealthScore,
        free: false
    },
    {
        id: 'privacy',
        name: 'Privacy Assessment',
        description: 'How exposed are you online?',
        icon: Shield,
        color: 'from-red-500 to-rose-500',
        component: PrivacyAssessment,
        free: false
    },
    {
        id: 'knowledge',
        name: 'Knowledge Chaos Assessment',
        description: 'Is your information organized?',
        icon: Lightbulb,
        color: 'from-yellow-500 to-orange-500',
        component: KnowledgeChaosAssessment,
        free: false
    },
    {
        id: 'smarthome',
        name: 'Smart Home Readiness',
        description: 'Ready for automation?',
        icon: Sparkles,
        color: 'from-cyan-500 to-blue-500',
        component: SmartHomeReadinessAssessment,
        free: false
    }
];

// ============================================
// TOOL CARD COMPONENT
// ============================================
const ToolCard = ({ tool, isUnlocked, onSelect, isSelected }) => {
    const Icon = tool.icon;
    const canAccess = tool.free || isUnlocked;

    return (
        <m.div
            whileHover={{ scale: canAccess ? 1.02 : 1 }}
            whileTap={{ scale: canAccess ? 0.98 : 1 }}
            onClick={() => canAccess && onSelect(tool.id)}
            className={`relative p-5 rounded-2xl border cursor-pointer transition-all ${isSelected
                    ? `bg-gradient-to-br ${tool.color} border-white/30 shadow-lg`
                    : canAccess
                        ? 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
                        : 'bg-slate-800/30 border-slate-700/30 opacity-60 cursor-not-allowed'
                }`}
        >
            {!canAccess && (
                <div className="absolute top-3 right-3">
                    <Lock className="text-slate-500" size={16} />
                </div>
            )}
            {tool.free && (
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                    FREE
                </div>
            )}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${isSelected ? 'bg-white/20' : `bg-gradient-to-br ${tool.color}`
                }`}>
                <Icon className="text-white" size={24} />
            </div>
            <h3 className={`font-bold mb-1 ${isSelected ? 'text-white' : 'text-white'}`}>
                {tool.name}
            </h3>
            <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-slate-300'}`}>
                {tool.description}
            </p>
        </m.div>
    );
};

// ============================================
// MAIN TOOLS PAGE
// ============================================
const ToolsPage = () => {
    const [selectedTool, setSelectedTool] = useState(null);

    // Check if user has premium access
    const isUnlocked = localStorage.getItem('unlocked_part_2') === 'true' ||
        localStorage.getItem('beta_access') === 'true' ||
        localStorage.getItem('token');

    const selectedToolData = TOOLS.find(t => t.id === selectedTool);

    return (
        <WebbookLayout>
            <Helmet>
                <title>Tools Hub | Agentic AI Home</title>
                <meta name="description" content="10+ interactive tools to assess your chaos levels and find opportunities for AI automation." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12] text-white px-4 py-8">
                <div className="max-w-6xl mx-auto">

                    {/* HEADER */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link to="/dashboard" className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black">🛠️ Tools Hub</h1>
                            <p className="text-slate-300">Assess your chaos levels before building agents</p>
                        </div>
                    </div>

                    {/* UNLOCK BANNER (if not premium) */}
                    {!isUnlocked && (
                        <div className="mb-8 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-bold">🔒 2 tools are free. Unlock all 10 with premium!</p>
                                    <p className="text-slate-300 text-sm">Get full access to diagnose every area of your life.</p>
                                </div>
                                <Link to="/unlock" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-sm transition-colors">
                                    Unlock All
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* MAIN LAYOUT */}
                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* TOOL SELECTOR */}
                        <div className="lg:col-span-1">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Calculator size={20} className="text-teal-400" />
                                Select a Tool
                            </h2>
                            <div className="grid gap-3">
                                {TOOLS.map(tool => (
                                    <ToolCard
                                        key={tool.id}
                                        tool={tool}
                                        isUnlocked={isUnlocked}
                                        isSelected={selectedTool === tool.id}
                                        onSelect={setSelectedTool}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* TOOL CONTENT */}
                        <div className="lg:col-span-2">
                            {selectedTool ? (
                                <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6">
                                    <Suspense fallback={
                                        <div className="flex items-center justify-center h-64">
                                            <div className="animate-spin w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full" />
                                        </div>
                                    }>
                                        {selectedToolData && <selectedToolData.component />}
                                    </Suspense>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-slate-800/20 rounded-2xl border border-slate-700/30">
                                    <div className="text-6xl mb-4">👈</div>
                                    <h3 className="text-xl font-bold text-white mb-2">Select a Tool</h3>
                                    <p className="text-slate-300 text-center max-w-sm">
                                        Pick a calculator from the left to assess your chaos levels and discover where AI can help.
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default ToolsPage;
