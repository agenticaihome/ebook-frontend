import React, { useState } from 'react';

/**
 * ShareToX - Share button for X (Twitter) with pre-written, non-cringy text
 * Uses X logo per user request
 */
const ShareToX = ({ chapterNumber, chapterTitle }) => {
    const [copied, setCopied] = useState(false);

    // Non-cringy share texts based on which chapter was completed
    const shareTexts = {
        1: `Just built my first AI agent that sends me a morning briefing every day.\n\nNo coding. Just copy-paste. Wild.\n\nagenticaihome.com`,
        2: `Finally automated meal planning. An AI agent now handles my weekly menus and grocery lists.\n\nTook 10 minutes to set up. Worth every second.\n\nagenticaihome.com`,
        3: `Never forgetting a birthday again. Set up an AI agent that tracks all important dates for me.\n\nagenticaihome.com`,
        4: `Email triage on autopilot. Built an AI agent that sorts my inbox and drafts responses.\n\nInbox zero is actually achievable now.\n\nagenticaihome.com`,
        5: `Weekly money check-ins without the anxiety. Set up an AI agent that gives me a calm financial overview.\n\nagenticaihome.com`,
        6: `Built a fitness agent that creates workouts that actually fit my life.\n\nNo more generic plans that don't work.\n\nagenticaihome.com`,
        7: `Stop doing everything. Start doing what matters.\n\nJust built a work task agent that prioritizes my to-do list.\n\nagenticaihome.com`,
        8: `Learned how to build ANY AI agent I want from scratch.\n\nThe possibilities are wild.\n\nagenticaihome.com`,
        9: `My AI agents now talk to each other. Multi-agent coordination unlocked.\n\nThis is the future.\n\nagenticaihome.com`,
        10: `Built my complete Agent Army. 10 AI agents handling my life logistics.\n\nTime reclaimed. ✅\n\nagenticaihome.com`,
    };

    const shareText = shareTexts[chapterNumber] || shareTexts[1];
    const encodedText = encodeURIComponent(shareText);
    const xShareUrl = `https://x.com/intent/tweet?text=${encodedText}`;

    const handleShare = () => {
        window.open(xShareUrl, '_blank', 'width=550,height=420');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center gap-4 py-6 px-4 bg-gradient-to-r from-slate-900/80 to-slate-800/80 rounded-xl border border-teal-500/30 max-w-md mx-auto">
            {/* Viral prompt */}
            <p className="text-teal-400 text-sm text-center font-medium">
                🎉 You did it! Share your win:
            </p>

            <div className="flex items-center gap-2">
                {/* Share to X Button */}
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-lg transition-all font-bold border border-slate-500 shadow-lg"
                >
                    {/* X Logo SVG */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>X</span>
                </button>

                {/* Share to Facebook Button */}
                <button
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodedText}`, '_blank', 'width=550,height=420')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg transition-all font-bold shadow-lg"
                >
                    {/* Facebook Logo SVG */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                </button>

                {/* Copy Text Button */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all text-sm border border-slate-600"
                >
                    {copied ? (
                        <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Viral nudge */}
            <p className="text-slate-500 text-xs text-center">
                💡 Send this to someone drowning in to-do lists
            </p>
        </div>
    );
};

export default ShareToX;
