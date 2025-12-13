import React, { useState } from 'react';
import { ExternalLink, Sparkles, Bot, Brain, Zap, MessageCircle, Search, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * AIToolLinks - Reusable component showing links to all major AI platforms
 * Use in any chapter to help readers get started with their preferred tool
 */

const tools = [
    {
        name: 'ChatGPT',
        company: 'OpenAI',
        url: 'https://chat.openai.com',
        color: 'from-green-500 to-emerald-600',
        borderColor: 'border-green-500/40',
        textColor: 'text-green-400',
        icon: '🤖',
        free: true,
        bestFor: 'General tasks, coding, creative writing',
        note: 'Most popular. Free tier available.',
    },
    {
        name: 'Claude',
        company: 'Anthropic',
        url: 'https://claude.ai',
        color: 'from-orange-500 to-amber-600',
        borderColor: 'border-orange-500/40',
        textColor: 'text-orange-400',
        icon: '🧠',
        free: true,
        bestFor: 'Long documents, analysis, privacy-conscious users',
        note: 'Best privacy practices. Thoughtful responses.',
    },
    {
        name: 'Gemini',
        company: 'Google',
        url: 'https://gemini.google.com',
        color: 'from-blue-500 to-indigo-600',
        borderColor: 'border-blue-500/40',
        textColor: 'text-blue-400',
        icon: '✨',
        free: true,
        bestFor: 'Google integration, research, real-time info',
        note: 'Integrates with Gmail, Docs, Calendar.',
    },
    {
        name: 'Copilot',
        company: 'Microsoft',
        url: 'https://copilot.microsoft.com',
        color: 'from-cyan-500 to-teal-600',
        borderColor: 'border-cyan-500/40',
        textColor: 'text-cyan-400',
        icon: '💼',
        free: true,
        bestFor: 'Microsoft 365 users, work tasks',
        note: 'Best if you use Outlook, Word, Excel.',
    },
    {
        name: 'Grok',
        company: 'xAI',
        url: 'https://grok.x.ai',
        color: 'from-slate-500 to-gray-600',
        borderColor: 'border-slate-500/40',
        textColor: 'text-slate-300',
        icon: '🚀',
        free: false,
        bestFor: 'X/Twitter users, real-time news, humor',
        note: 'Requires X Premium. Unfiltered style.',
    },
    {
        name: 'Perplexity',
        company: 'Perplexity AI',
        url: 'https://perplexity.ai',
        color: 'from-purple-500 to-violet-600',
        borderColor: 'border-purple-500/40',
        textColor: 'text-purple-400',
        icon: '🔍',
        free: true,
        bestFor: 'Research, fact-checking, citations',
        note: 'Shows sources. Great for research.',
    },
    {
        name: 'Meta AI',
        company: 'Meta',
        url: 'https://meta.ai',
        color: 'from-blue-600 to-blue-700',
        borderColor: 'border-blue-600/40',
        textColor: 'text-blue-300',
        icon: '👤',
        free: true,
        bestFor: 'Casual chat, image generation',
        note: 'Built into Facebook, Instagram, WhatsApp.',
    },
];

// Compact version for inline use
export const AIToolLinksCompact = ({ className = '' }) => (
    <div className={`flex flex-wrap gap-2 ${className}`}>
        {tools.slice(0, 4).map((tool) => (
            <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${tool.color} text-white text-sm font-medium hover:opacity-90 transition-opacity`}
            >
                <span>{tool.icon}</span>
                <span>{tool.name}</span>
                <ExternalLink size={12} />
            </a>
        ))}
    </div>
);

// Full version with details
export const AIToolLinksFull = ({ showAll = false, className = '' }) => {
    const [expanded, setExpanded] = useState(showAll);
    const displayTools = expanded ? tools : tools.slice(0, 4);

    return (
        <div className={`bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-teal-500/30 backdrop-blur-sm ${className}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                    <Bot className="text-teal-400" size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Choose Your AI Tool</h3>
                    <p className="text-slate-300 text-sm">Pick any one to get started. They all work with our prompts.</p>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {displayTools.map((tool) => (
                    <a
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group bg-slate-900/50 rounded-xl p-4 border ${tool.borderColor} hover:bg-slate-900/70 transition-all`}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{tool.icon}</span>
                                <div>
                                    <div className={`font-bold ${tool.textColor}`}>{tool.name}</div>
                                    <div className="text-slate-500 text-xs">{tool.company}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                {tool.free && (
                                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">Free</span>
                                )}
                                <ExternalLink className="text-slate-500 group-hover:text-slate-300 transition-colors" size={14} />
                            </div>
                        </div>
                        <p className="text-slate-300 text-xs mb-1">{tool.bestFor}</p>
                        <p className="text-slate-500 text-xs italic">{tool.note}</p>
                    </a>
                ))}
            </div>

            {!showAll && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full flex items-center justify-center gap-2 text-teal-400 text-sm hover:text-teal-300 transition-colors py-2"
                >
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {expanded ? 'Show fewer' : `Show ${tools.length - 4} more tools`}
                </button>
            )}

            <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <p className="text-blue-400 text-xs flex items-start gap-2">
                    <Sparkles size={14} className="flex-shrink-0 mt-0.5" />
                    <span>
                        <strong>First time?</strong> We recommend <strong>Claude</strong> or <strong>ChatGPT</strong> for beginners.
                        Both have free tiers and work great with all our prompts.
                    </span>
                </p>
            </div>
        </div>
    );
};

// Sticky bar version for top of chapters
export const AIToolBar = ({ className = '' }) => (
    <div className={`sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 py-3 px-4 -mx-6 mb-6 ${className}`}>
        <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-slate-300 text-sm font-medium">Open your AI:</span>
            <div className="flex flex-wrap gap-2">
                {tools.slice(0, 5).map((tool) => (
                    <a
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${tool.borderColor} ${tool.textColor} text-xs font-medium hover:bg-slate-800 transition-colors`}
                    >
                        <span>{tool.icon}</span>
                        <span>{tool.name}</span>
                    </a>
                ))}
            </div>
        </div>
    </div>
);

// Default export is the full version
const AIToolLinks = AIToolLinksFull;
export default AIToolLinks;
