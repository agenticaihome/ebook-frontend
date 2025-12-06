import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Copy, CheckCircle, ExternalLink } from 'lucide-react';

/**
 * TotalBeginnerGuide - Expandable guide for users who have never used AI before
 * Shows step-by-step instructions for getting started with any AI tool
 */

const TotalBeginnerGuide = ({ className = '' }) => {
    const [expanded, setExpanded] = useState(false);
    const [copiedStep, setCopiedStep] = useState(null);

    const samplePrompt = `Hello! I'm new to using AI assistants. 
Can you help me understand how you work? 
What kinds of things can you help me with in my daily life?`;

    const handleCopy = () => {
        navigator.clipboard.writeText(samplePrompt);
        setCopiedStep('prompt');
        setTimeout(() => setCopiedStep(null), 2000);
    };

    return (
        <div className={`bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-2xl border border-blue-500/30 overflow-hidden ${className}`}>
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-blue-900/20 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <HelpCircle className="text-blue-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">🆕 Never Used AI Before?</h3>
                        <p className="text-slate-400 text-sm">Click here for a complete beginner's walkthrough</p>
                    </div>
                </div>
                {expanded ? <ChevronUp className="text-blue-400" size={20} /> : <ChevronDown className="text-blue-400" size={20} />}
            </button>

            {expanded && (
                <div className="p-5 pt-0 border-t border-blue-500/20">
                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                1
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-2">Pick Any AI Tool</h4>
                                <p className="text-slate-300 text-sm mb-3">
                                    We recommend <strong className="text-blue-400">ChatGPT</strong> or <strong className="text-blue-400">Claude</strong> for beginners.
                                    Both are free and easy to use.
                                </p>
                                <div className="flex gap-2">
                                    <a
                                        href="https://chat.openai.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-colors text-sm"
                                    >
                                        <span>🤖</span> Open ChatGPT <ExternalLink size={12} />
                                    </a>
                                    <a
                                        href="https://claude.ai"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 transition-colors text-sm"
                                    >
                                        <span>🧠</span> Open Claude <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                2
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-2">Create a Free Account</h4>
                                <p className="text-slate-300 text-sm">
                                    You'll need to sign up with your email. It takes about 30 seconds.
                                    Free accounts work perfectly for everything in this guide.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                3
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-2">Start Chatting</h4>
                                <p className="text-slate-300 text-sm mb-3">
                                    You'll see a text box. Just type like you're texting a smart friend.
                                    Try copying this starter message:
                                </p>
                                <div className="bg-slate-900/80 rounded-xl p-4 mb-3">
                                    <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono">{samplePrompt}</pre>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${copiedStep === 'prompt'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-blue-500 hover:bg-blue-400 text-white'
                                        }`}
                                >
                                    {copiedStep === 'prompt' ? <CheckCircle size={16} /> : <Copy size={16} />}
                                    {copiedStep === 'prompt' ? 'Copied!' : 'Copy This Message'}
                                </button>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                4
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-2">Have a Conversation</h4>
                                <p className="text-slate-300 text-sm">
                                    The AI will respond. Then you reply. It's like texting back and forth.
                                    Don't worry about saying the "right" thing—just be natural!
                                </p>
                            </div>
                        </div>

                        {/* Reassurance */}
                        <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/30">
                            <p className="text-green-400 text-sm">
                                <strong>You can't break anything!</strong> AI tools are very forgiving.
                                If something doesn't work, just try rephrasing. The AI will help you.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TotalBeginnerGuide;
