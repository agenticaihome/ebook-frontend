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
                "name": "What exactly is \"Agentic AI at Home\"?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Agentic AI at Home is a comprehensive course that teaches you how to build AI-powered systems that automate your daily life — morning routines, meal planning, email management, calendar optimization, household maintenance, finances, health tracking, and more."
                }
            },
            {
                "@type": "Question",
                "name": "Who is this course for?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "This course is designed for overwhelmed professionals, entrepreneurs, students, busy parents, and retirees who want to automate their daily life logistics."
                }
            },
            {
                "@type": "Question",
                "name": "I'm not a parent. Is this still for me?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "YES. Absolutely. While the system was originally battle-tested by a busy parent, the core problem is universal: Life Admin Fatigue. The systems work for everyone including students, entrepreneurs, and retirees."
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
                title="FAQ - Agentic AI at Home"
                description="Frequently asked questions about the Agentic AI at Home course. Learn about the curriculum, prerequisites, privacy, and more."
                keywords={["FAQ", "Agentic AI", "Course Details", "Pricing", "Privacy"]}
                schema={faqSchema}
            />

            <div className="min-h-screen bg-[#0f0f1a] text-slate-300 font-sans selection:bg-cyan-500/30">
                {/* Hero Section */}
                <div className="relative pt-32 pb-20 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
                    </div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Questions</span>
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                                Everything you need to know about the course, the technology, and how it will transform your daily life.
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
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-lg backdrop-blur-sm"
                            />
                        </m.div>
                    </div>
                </div>

                {/* Categories */}
                <div className="max-w-7xl mx-auto px-6 mb-16">
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'all'
                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700'
                                }`}
                        >
                            All Questions
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700'
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
                                    className={`group rounded-2xl border transition-all duration-300 ${expandedId === item.id
                                        ? 'bg-slate-800/80 border-cyan-500/30 shadow-2xl shadow-cyan-900/10'
                                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleQuestion(item.id)}
                                        className="w-full text-left p-6 flex items-start justify-between gap-4"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 p-2 rounded-lg transition-colors ${expandedId === item.id ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500 group-hover:text-slate-400'
                                                }`}>
                                                <HelpCircle size={20} />
                                            </div>
                                            <div>
                                                <h3 className={`text-lg font-semibold transition-colors ${expandedId === item.id ? 'text-white' : 'text-slate-200 group-hover:text-white'
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
                                            className={`flex-shrink-0 transition-transform duration-300 ${expandedId === item.id ? 'rotate-180 text-cyan-400' : 'text-slate-500'
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
                                                    <div className="prose prose-invert prose-p:text-slate-300 prose-a:text-cyan-400 max-w-none">
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
                                    className="mt-4 text-cyan-400 hover:text-cyan-300 font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-slate-900 border-t border-slate-800 py-20">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
                            <Mail className="text-white" size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                            We're happy to help. Send us an email and we'll get back to you within 24 hours.
                        </p>
                        <a
                            href="mailto:support@agenticai.home"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                        >
                            <Mail size={20} />
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </WebbookLayout>
    );
}
