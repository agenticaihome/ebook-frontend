import React, { useState } from 'react';
import SEO from './components/SEO';
import { m, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, Search, MessageCircle, Shield, Zap,
    BookOpen, CreditCard, User, HelpCircle, FileText,
    Cpu, AlertTriangle, CheckCircle, Mail
} from 'lucide-react';
import WebbookLayout from './components/layout/WebbookLayout';
import { Link } from 'react-router-dom';
import { faqData, categories } from './data/faqData';

export default function FAQ() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedId, setExpandedId] = useState(null);

    const toggleQuestion = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What exactly is AI Frontier Adventure?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AI Frontier Adventure is a fun, interactive experience that teaches you how to use AI tools to automate your daily life — morning routines, meal planning, email management, calendar optimization, household maintenance, finances, health tracking, and more."
                }
            },
            {
                "@type": "Question",
                "name": "Who is this adventure for?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "This adventure is designed for overwhelmed professionals, entrepreneurs, students, busy parents, and retirees who want to automate their daily life logistics."
                }
            },
            {
                "@type": "Question",
                "name": "I'm not a parent. Is this still for me?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "YES. Absolutely. While the system was originally tested by a busy parent, the core problem is universal: Life Admin Fatigue. The systems work for everyone including students, entrepreneurs, and retirees."
                }
            }
        ]
    };

    const filteredFaq = faqData.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <WebbookLayout>
            <SEO
                title="FAQ - AI Frontier Adventure"
                description="Frequently asked questions about AI Frontier Adventure. Learn about AI helpers, getting started, privacy, and more."
                keywords={["FAQ", "AI Frontier Adventure", "AI Helpers", "Learn AI", "Pricing", "Privacy"]}
                schema={faqSchema}
            />

            <div className="min-h-screen bg-[var(--color-void-dark)] bg-grid-pattern text-slate-300 font-sans selection:bg-amber-500/30">
                {/* Hero Section */}
                <div className="relative pt-32 pb-20 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
                    </div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-mono">
                                <span className="text-amber-400">🧭</span> ADVENTURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">GUIDE</span>
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                                Everything you need to know — from getting started to advanced AI helpers.
                            </p>
                        </m.div>

                        {/* Search Bar */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative max-w-2xl mx-auto"
                        >
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search className="text-slate-500" size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-900/50 border border-teal-500/30 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all shadow-lg backdrop-blur-sm font-mono"
                            />
                        </m.div>
                    </div>
                </div>

                {/* Categories */}
                <div className="max-w-7xl mx-auto px-6 mb-16">
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium font-mono transition-all ${activeCategory === 'all'
                                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/25'
                                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-teal-500/30'
                                }`}
                        >
                            All Questions
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium font-mono transition-all ${activeCategory === cat.id
                                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/25'
                                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-teal-500/30'
                                    }`}
                            >
                                {cat.icon}
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ List */}
                <div className="max-w-4xl mx-auto px-6 pb-32">
                    <div className="space-y-4">
                        {filteredFaq.length > 0 ? (
                            filteredFaq.map((item, index) => (
                                <m.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className={`tactical-card group rounded-2xl transition-all duration-300 ${expandedId === item.id
                                        ? 'bg-slate-800/80 border-amber-500/40 shadow-2xl shadow-amber-900/20'
                                        : 'bg-slate-900/40 hover:border-teal-500/40 hover:bg-slate-800/40'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleQuestion(item.id)}
                                        className="w-full text-left p-6 flex items-start justify-between gap-4"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 p-2 rounded-lg transition-colors ${expandedId === item.id ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500 group-hover:text-teal-400'
                                                }`}>
                                                <HelpCircle size={20} />
                                            </div>
                                            <div>
                                                <h3 className={`text-lg font-semibold font-mono transition-colors ${expandedId === item.id ? 'text-amber-400' : 'text-slate-200 group-hover:text-amber-400'
                                                    }`}>
                                                    {item.question}
                                                </h3>
                                                {expandedId !== item.id && (
                                                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                                                        Click to read more...
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <ChevronDown
                                            className={`flex-shrink-0 transition-transform duration-300 ${expandedId === item.id ? 'rotate-180 text-amber-400' : 'text-slate-500'
                                                }`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {expandedId === item.id && (
                                            <m.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-6 pl-[4.5rem] text-slate-300 leading-relaxed">
                                                    <div className="prose prose-invert prose-p:text-slate-300 prose-a:text-amber-400 max-w-none">
                                                        {item.answer}
                                                    </div>
                                                </div>
                                            </m.div>
                                        )}
                                    </AnimatePresence>
                                </m.div>
                            ))
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="text-slate-500" size={32} />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No questions found</h3>
                                <p className="text-slate-400">Try adjusting your search or category filter.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                    className="mt-4 text-amber-400 hover:text-amber-300 font-medium font-mono"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-slate-900/80 border-t border-teal-500/20 py-20">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
                            <Mail className="text-white" size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4 font-mono">Still have questions?</h2>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                            Our expedition support team is ready to help. Send us a signal and we'll respond within 24 hours.
                        </p>
                        <a
                            href="mailto:support@agenticai.home"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold font-mono hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25"
                        >
                            <Mail size={20} />
                            Contact Expedition Support
                        </a>
                    </div>
                </div>
            </div>
        </WebbookLayout>
    );
}
