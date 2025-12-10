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
        <div className="flex flex-col items-center gap-3 py-6 px-4 bg-slate-900/50 rounded-xl border border-slate-700/50 max-w-md mx-auto">
            <p className="text-slate-400 text-sm text-center">
                Share your progress! 🎉
            </p>

            <div className="flex items-center gap-3">
                {/* Share to X Button */}
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-slate-800 text-white rounded-lg transition-all font-medium border border-slate-600"
                >
                    {/* X Logo SVG */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Share to X</span>
                </button>

                {/* Copy Text Button */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all text-sm border border-slate-600"
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

            <p className="text-slate-500 text-xs text-center mt-1">
                Help others discover AI agents
            </p>
        </div>
    );
};

export default ShareToX;
