import React, { useState } from 'react';
import SEO from './components/SEO';
import { m, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, Search, Mail, HelpCircle
} from 'lucide-react';
import WebbookLayout from './components/layout/WebbookLayout';
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
                "name": "What exactly is Agentic AI Home?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "An interactive webbook that teaches you how to use AI tools to automate your daily life — morning routines, meal planning, email management, calendar optimization, household maintenance, finances, health tracking, and more."
                }
            },
            {
                "@type": "Question",
                "name": "Who is this for?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Anyone overwhelmed by the logistics of modern life — overwhelmed professionals, entrepreneurs, students, busy parents, and retirees who want to automate their daily life logistics."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need tech skills?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No coding required. If you can send an email and follow step-by-step instructions, you can do this. We provide templates for everything."
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
                title="FAQ - Agentic AI Home Courses"
                description="Frequently asked questions about Agentic AI Home. Learn about AI helpers, getting started, privacy, and more."
                keywords={["FAQ", "Agentic AI Home", "AI Helpers", "Learn AI", "Pricing", "Privacy"]}
                schema={faqSchema}
            />

            <div className="min-h-screen bg-[#0a0a12] text-slate-300">
                {/* Hero Section */}
                <div className="relative pt-24 pb-16 px-6 overflow-hidden">
                    {/* Background blobs */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-20 left-1/4 w-[150px] sm:w-[250px] md:w-96 h-[150px] sm:h-[250px] md:h-96 bg-teal-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
                        <div className="absolute bottom-0 right-1/4 w-[150px] sm:w-[250px] md:w-96 h-[150px] sm:h-[250px] md:h-96 bg-cyan-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
                    </div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                                    Frequently Asked Questions
                                </span>
                            </h1>
                            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
                                Everything you need to know about getting started with AI helpers.
                            </p>
                        </m.div>

                        {/* Search Bar */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative max-w-xl mx-auto"
                        >
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search className="text-slate-500" size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl py-4 pl-12 pr-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all backdrop-blur-sm"
                            />
                        </m.div>
                    </div>
                </div>

                {/* Categories */}
                <div className="max-w-6xl mx-auto px-6 mb-12">
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all min-h-[44px] ${activeCategory === 'all'
                                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25'
                                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-700/50'
                                }`}
                        >
                            All Questions
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all min-h-[44px] ${activeCategory === cat.id
                                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25'
                                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-700/50'
                                    }`}
                            >
                                {cat.icon}
                                <span className="hidden sm:inline">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ List */}
                <div className="max-w-4xl mx-auto px-6 pb-24">
                    <div className="space-y-3">
                        {filteredFaq.length > 0 ? (
                            filteredFaq.map((item, index) => (
                                <m.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                    className={`group rounded-xl border transition-all duration-300 overflow-hidden ${expandedId === item.id
                                        ? 'bg-slate-800/80 border-teal-500/40 shadow-lg shadow-teal-900/20'
                                        : 'bg-slate-900/40 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/40'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleQuestion(item.id)}
                                        className="w-full text-left p-5 flex items-start justify-between gap-4 min-h-[60px]"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-0.5 p-2 rounded-lg transition-colors flex-shrink-0 ${expandedId === item.id
                                                ? 'bg-teal-500/20 text-teal-400'
                                                : 'bg-slate-800 text-slate-500 group-hover:text-teal-400'
                                                }`}>
                                                <HelpCircle size={18} />
                                            </div>
                                            <h3 className={`text-base font-semibold transition-colors pt-0.5 ${expandedId === item.id
                                                ? 'text-teal-400'
                                                : 'text-slate-200 group-hover:text-white'
                                                }`}>
                                                {item.question}
                                            </h3>
                                        </div>
                                        <ChevronDown
                                            size={20}
                                            className={`flex-shrink-0 mt-1 transition-transform duration-300 ${expandedId === item.id
                                                ? 'rotate-180 text-teal-400'
                                                : 'text-slate-500'
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
                                                <div className="px-5 pb-5 pl-16 text-slate-300 leading-relaxed">
                                                    <div className="prose prose-invert prose-sm prose-p:text-slate-300 prose-a:text-teal-400 prose-strong:text-white max-w-none">
                                                        {item.answer}
                                                    </div>
                                                </div>
                                            </m.div>
                                        )}
                                    </AnimatePresence>
                                </m.div>
                            ))
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="text-slate-500" size={28} />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">No questions found</h3>
                                <p className="text-slate-300 mb-4">Try adjusting your search or category filter.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                    className="text-teal-400 hover:text-teal-300 font-medium underline underline-offset-2"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-slate-900/80 border-t border-slate-700/50 py-16 pb-32 md:pb-16">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-teal-500/20">
                            <Mail className="text-white" size={26} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Still have questions?</h2>
                        <p className="text-slate-300 mb-6 max-w-md mx-auto">
                            We're here to help. Send us an email and we'll respond within 24 hours.
                        </p>
                        <a
                            href="mailto:support@agenticaihome.com"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-teal-500/25 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Mail size={18} />
                            Email Support
                        </a>
                    </div>
                </div>
            </div>
        </WebbookLayout>
    );
}
