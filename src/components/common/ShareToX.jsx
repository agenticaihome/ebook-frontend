import React, { useState } from 'react';
import { MessageCircle, Send, Check, Share2 } from 'lucide-react';

/**
 * ShareToX - Multi-platform share component optimized for organic sharing
 * Philosophy: "Sharing should feel like helping a friend, not promoting a brand"
 * 
 * Features:
 * - Native share API for mobile (one-tap sharing)
 * - WhatsApp direct share
 * - SMS/Text share  
 * - X (Twitter) share
 * - Facebook share
 * - Copy for DM (renamed from "Copy")
 * - "Helping a friend" framing throughout
 */
const ShareToX = ({ chapterNumber, chapterTitle }) => {
    const [copied, setCopied] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    // Check if native share is available (mobile browsers)
    const canShare = typeof navigator !== 'undefined' && navigator.share;

    // "Helping a friend" share texts - personal, not promotional
    const shareTexts = {
        1: {
            private: `Hey! Found this thing that sends you a personalized morning briefing every day. Took me 5 minutes to set up. Thought of you → agenticaihome.com`,
            public: `Just set up an AI that sends me a morning briefing every day. No coding. Just copy-paste. Wild.\n\nagenticaihome.com`
        },
        2: {
            private: `Know how you hate the "what's for dinner" question? This solved it for me. An AI plans my meals now → agenticaihome.com`,
            public: `Finally automated meal planning. An AI agent now handles my weekly menus and grocery lists. Took 10 minutes.\n\nagenticaihome.com`
        },
        3: {
            private: `Never forgetting birthdays again. Set up a little AI reminder system. You might like it → agenticaihome.com`,
            public: `Never forgetting a birthday again. Set up an AI agent that tracks all important dates for me.\n\nagenticaihome.com`
        },
        4: {
            private: `You mentioned being buried in email. This helped me get to inbox zero. Might work for you → agenticaihome.com`,
            public: `Email triage on autopilot. Built an AI agent that sorts my inbox. Inbox zero is actually achievable now.\n\nagenticaihome.com`
        },
        5: {
            private: `Found something for weekly money check-ins without the anxiety. Thought it might help you too → agenticaihome.com`,
            public: `Weekly money check-ins without the anxiety. Set up an AI agent that gives me a calm financial overview.\n\nagenticaihome.com`
        },
        6: {
            private: `Built a wellness thing that actually fits my schedule. No more generic routines. Might work for you → agenticaihome.com`,
            public: `Built a wellness agent that creates plans that actually fit my life. No more generic routines.\n\nagenticaihome.com`
        },
        7: {
            private: `Know how overwhelmed you've been? Found something that helps prioritize what actually matters → agenticaihome.com`,
            public: `Stop doing everything. Start doing what matters. Just built a work task agent that prioritizes my to-do list.\n\nagenticaihome.com`
        },
        8: {
            private: `Learned how to build any AI helper I want. It's not as hard as I thought. You'd probably like this → agenticaihome.com`,
            public: `Learned how to build ANY AI agent I want from scratch. The possibilities are wild.\n\nagenticaihome.com`
        },
        9: {
            private: `Set up something that helps me reflect weekly. No journaling required. Simple and oddly calming → agenticaihome.com`,
            public: `Set up a Reflection Agent. Now my AI system learns and improves WITH me. No journaling. Just awareness.\n\nagenticaihome.com`
        },
        10: {
            private: `Built my complete AI system. 10 little helpers handling life stuff. It's oddly calming. Check it out → agenticaihome.com`,
            public: `Built my complete Agent Army. 10 AI agents handling my life logistics. Time reclaimed. ✅\n\nagenticaihome.com`
        },
    };

    const texts = shareTexts[chapterNumber] || shareTexts[1];
    const privateText = texts.private;
    const publicText = texts.public;

    // URL-encoded versions
    const encodedPrivate = encodeURIComponent(privateText);
    const encodedPublic = encodeURIComponent(publicText);

    // Native share (mobile) - uses private/personal text
    const handleNativeShare = async () => {
        try {
            await navigator.share({
                title: 'Agentic AI Home',
                text: privateText,
                url: 'https://agenticaihome.com'
            });
        } catch (err) {
            // User cancelled or error - fall back to showing options
            if (err.name !== 'AbortError') {
                setShowOptions(true);
            }
        }
    };

    // WhatsApp share
    const handleWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodedPrivate}`, '_blank');
    };

    // SMS share
    const handleSMS = () => {
        // iOS uses &body=, Android uses ?body=
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const smsUrl = isIOS
            ? `sms:&body=${encodedPrivate}`
            : `sms:?body=${encodedPrivate}`;
        window.location.href = smsUrl;
    };

    // X (Twitter) share - uses public text
    const handleX = () => {
        window.open(`https://x.com/intent/tweet?text=${encodedPublic}`, '_blank', 'width=550,height=420');
    };

    // Facebook share
    const handleFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodedPublic}`, '_blank', 'width=550,height=420');
    };

    // Copy for DM
    const handleCopy = () => {
        navigator.clipboard.writeText(privateText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center gap-4 py-6 px-4 bg-gradient-to-r from-slate-900/80 to-slate-800/80 rounded-xl border border-teal-500/30 max-w-md mx-auto">
            {/* Human-first framing */}
            <div className="text-center">
                <p className="text-teal-300 text-sm font-medium mb-1">
                    🎉 You did it!
                </p>
                <p className="text-slate-400 text-xs">
                    Know someone who'd find this helpful?
                </p>
            </div>

            {/* Primary: Native Share on mobile, expanded options on desktop */}
            {canShare ? (
                <div className="flex flex-col items-center gap-3 w-full">
                    {/* Big native share button for mobile */}
                    <button
                        onClick={handleNativeShare}
                        className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white rounded-xl font-bold transition-all shadow-lg"
                    >
                        <Share2 size={18} />
                        Share with a friend
                    </button>

                    {/* Secondary options */}
                    <button
                        onClick={() => setShowOptions(!showOptions)}
                        className="text-slate-400 hover:text-white text-xs transition-colors"
                    >
                        {showOptions ? 'Hide options' : 'More ways to share'}
                    </button>
                </div>
            ) : (
                /* Desktop: Show all options */
                <div className="flex flex-col items-center gap-3 w-full">
                    {/* Private sharing row (most important) */}
                    <div className="flex items-center gap-2 w-full justify-center">
                        {/* WhatsApp */}
                        <button
                            onClick={handleWhatsApp}
                            className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg transition-all font-bold shadow-lg"
                            aria-label="Share via WhatsApp"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span>WhatsApp</span>
                        </button>

                        {/* Copy for DM */}
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all font-medium border border-slate-500"
                            aria-label="Copy message to send to a friend"
                        >
                            {copied ? (
                                <>
                                    <Check size={16} className="text-green-400" />
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <MessageCircle size={16} />
                                    <span>Copy for DM</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Public sharing row */}
                    <div className="flex items-center gap-2">
                        {/* X (Twitter) */}
                        <button
                            onClick={handleX}
                            className="flex items-center gap-2 px-3 py-2 min-h-[40px] bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all text-sm border border-slate-600"
                            aria-label="Share on X (Twitter)"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span>X</span>
                        </button>

                        {/* Facebook */}
                        <button
                            onClick={handleFacebook}
                            className="flex items-center gap-2 px-3 py-2 min-h-[40px] bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all text-sm border border-slate-600"
                            aria-label="Share on Facebook"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span>Facebook</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Expanded options for mobile (shown after tapping "More ways to share") */}
            {canShare && showOptions && (
                <div className="flex flex-col items-center gap-3 w-full pt-2 border-t border-slate-700/50">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleWhatsApp}
                            className="flex items-center gap-2 px-3 py-2 min-h-[40px] bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg transition-all text-sm font-medium"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp
                        </button>
                        <button
                            onClick={handleSMS}
                            className="flex items-center gap-2 px-3 py-2 min-h-[40px] bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all text-sm font-medium"
                        >
                            <Send size={14} />
                            Text
                        </button>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-3 py-2 min-h-[40px] bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all text-sm"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <MessageCircle size={14} />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={handleX} className="flex items-center gap-2 px-3 py-2 min-h-[40px] bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm border border-slate-600">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            X
                        </button>
                        <button onClick={handleFacebook} className="flex items-center gap-2 px-3 py-2 min-h-[40px] bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm border border-slate-600">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            Facebook
                        </button>
                    </div>
                </div>
            )}

            {/* Social proof + helpful nudge */}
            <p className="text-slate-400 text-xs text-center">
                💡 500+ people already shared this with someone they care about
            </p>
        </div>
    );
};

export default ShareToX;
