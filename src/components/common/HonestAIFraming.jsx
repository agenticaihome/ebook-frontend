import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Clock, Zap, TrendingUp } from 'lucide-react';

/**
 * FutureProofBanner - Shows "You're Early" messaging in header area
 * Positioned after chapter title, before main content
 */
export const FutureProofBanner = () => (
    <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/30 mb-6"
    >
        <div className="flex items-center gap-3">
            <Rocket className="text-amber-400 flex-shrink-0" size={20} />
            <p className="text-sm text-slate-300">
                <span className="text-amber-400 font-bold">You're Early:</span>{' '}
                The AI assistants in this course work as powerful tools today. By the time everyone else figures this out, you'll have a 6-month head start.
            </p>
        </div>
    </motion.div>
);

/**
 * WhereWeAre - Honest framing about current state of AI agents
 * "Insider knowledge" vibe, not disclaimer
 */
export const WhereWeAre = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-10"
    >
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="text-amber-400 font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                <Clock size={14} />
                A Note About Where We Are
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        {/* Content Card */}
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/40 rounded-2xl p-6 md:p-8 border-l-4 border-amber-500/50 backdrop-blur-sm">
            <p className="text-white text-lg font-medium mb-4">
                Let's be real for a second.
            </p>

            <p className="text-slate-300 mb-4">
                When you hear "AI agent," you might imagine a robot assistant that automatically handles your life while you sleep. That future is coming—<span className="text-amber-400 font-medium">fast</span>. OpenAI, Google, Apple, and Anthropic are all racing to build exactly that.
            </p>

            <p className="text-slate-300 mb-4">
                But we're not quite there yet.
            </p>

            <p className="text-slate-300 mb-6">
                What you're learning in this course is something <span className="text-white font-medium">better than waiting</span>: you're learning the foundation. The prompts, frameworks, and AI thinking skills you build here are exactly what will power those autonomous agents when they arrive.
            </p>

            {/* The Analogy */}
            <div className="bg-cyan-900/20 rounded-xl p-5 border border-cyan-500/30 mb-6">
                <p className="text-cyan-400 font-medium mb-2">Think of it like this:</p>
                <p className="text-slate-300 text-sm">
                    Learning to drive before self-driving cars are everywhere. When they arrive, you'll understand the rules of the road. You'll know how to direct them. You'll have a massive head start over everyone just getting started.
                </p>
            </div>

            {/* Today vs Tomorrow */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/50">
                    <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                        <Clock size={14} />
                        TODAY
                    </div>
                    <p className="text-white font-medium">
                        You'll use these prompts manually with ChatGPT or Claude
                    </p>
                </div>
                <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-xl p-4 border border-cyan-500/30">
                    <div className="text-sm text-cyan-400 mb-2 flex items-center gap-2">
                        <Rocket size={14} />
                        TOMORROW
                    </div>
                    <p className="text-white font-medium">
                        You'll plug them into agents that run while you sleep
                    </p>
                </div>
            </div>

            <p className="text-slate-400 text-sm italic">
                The skills are the same. You're just early.
            </p>

            <p className="text-white font-bold mt-4">
                Let's build your foundation.
            </p>
        </div>
    </motion.div>
);

/**
 * TechnologyTimeline - For Chapter 2, shows progression of AI capabilities
 */
export const TechnologyTimeline = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-10"
    >
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/50" />
            <span className="text-purple-400 font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                <TrendingUp size={14} />
                The Technology Timeline
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/50" />
        </div>

        {/* Timeline Cards */}
        <div className="space-y-4">
            {/* TODAY */}
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-500 flex items-center justify-center">
                        <Clock className="text-slate-400" size={20} />
                    </div>
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-slate-500 to-purple-500" />
                </div>
                <div className="flex-1 pb-6">
                    <div className="text-slate-400 text-sm font-mono mb-1">TODAY</div>
                    <h4 className="text-white font-bold text-lg mb-2">Manual Prompting</h4>
                    <p className="text-slate-300 text-sm">
                        You copy prompts and paste them into ChatGPT, Claude, or voice assistants.
                        The AI responds, you act on the results. Simple but powerful.
                    </p>
                </div>
            </div>

            {/* SOON */}
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 border-2 border-purple-400 flex items-center justify-center">
                        <Zap className="text-white" size={20} />
                    </div>
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-purple-500 to-cyan-500" />
                </div>
                <div className="flex-1 pb-6">
                    <div className="text-purple-400 text-sm font-mono mb-1">2025</div>
                    <h4 className="text-white font-bold text-lg mb-2">Connected Agents</h4>
                    <p className="text-slate-300 text-sm">
                        AI agents that access your calendar, email, and apps—taking actions automatically.
                        The prompts you learn here become the "instructions" these agents follow.
                    </p>
                </div>
            </div>

            {/* THE CONSTANT */}
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-green-500 border-2 border-cyan-400 flex items-center justify-center">
                        <Rocket className="text-white" size={20} />
                    </div>
                </div>
                <div className="flex-1">
                    <div className="text-cyan-400 text-sm font-mono mb-1">THE CONSTANT</div>
                    <h4 className="text-white font-bold text-lg mb-2">Your Ability to Delegate</h4>
                    <p className="text-slate-300 text-sm">
                        Tools will change. Your skill at instructing, delegating, and managing AI stays valuable forever.
                        <span className="text-cyan-400 font-medium"> That's what this course teaches.</span>
                    </p>
                </div>
            </div>
        </div>
    </motion.div>
);

/**
 * WhatYoullBuild - Updated framing for skills section
 */
export const WhatYoullBuildFraming = () => (
    <div className="grid md:grid-cols-3 gap-4 my-8">
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-600/50 text-center">
            <div className="text-2xl mb-2">💬</div>
            <div className="text-white font-bold mb-1">TODAY</div>
            <p className="text-slate-400 text-sm">
                AI assistants you can call on anytime
            </p>
        </div>
        <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-xl p-5 border border-purple-500/30 text-center">
            <div className="text-2xl mb-2">🚀</div>
            <div className="text-white font-bold mb-1">TOMORROW</div>
            <p className="text-slate-400 text-sm">
                Prompts that power your autonomous agents
            </p>
        </div>
        <div className="bg-gradient-to-br from-cyan-900/30 to-green-900/30 rounded-xl p-5 border border-cyan-500/30 text-center">
            <div className="text-2xl mb-2">♾️</div>
            <div className="text-white font-bold mb-1">FOREVER</div>
            <p className="text-slate-400 text-sm">
                Delegation skills that make AI actually useful
            </p>
        </div>
    </div>
);
