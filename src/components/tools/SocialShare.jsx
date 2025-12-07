import React from 'react';
import {
    TwitterShareButton,
    LinkedinShareButton,
    FacebookShareButton,
    TwitterIcon,
    LinkedinIcon,
    FacebookIcon
} from 'react-share';
import { Share2 } from 'lucide-react';

const SocialShare = ({ url = "https://agenticaihome.com", title, hashtags = ["AgenticAI", "Productivity"] }) => {
    return (
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-600 my-8">
            <div className="flex items-center gap-3 mb-4">
                <Share2 className="text-cyan-400" size={24} />
                <h3 className="text-lg font-bold text-white">Share your progress</h3>
            </div>
            <p className="text-slate-400 mb-6 text-sm">
                Inspire others to reclaim their time. Share your journey!
            </p>
            <div className="flex gap-4 flex-wrap">
                <TwitterShareButton url={url} title={title} hashtags={hashtags} className="hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </div>
                </TwitterShareButton>

                <LinkedinShareButton url={url} title={title} summary={title} source="Agentic AI at Home" className="hover:opacity-80 transition-opacity">
                    <LinkedinIcon size={40} round />
                </LinkedinShareButton>

                <FacebookShareButton url={url} quote={title} hashtag={`#${hashtags[0]}`} className="hover:opacity-80 transition-opacity">
                    <FacebookIcon size={40} round />
                </FacebookShareButton>
            </div>
        </div>
    );
};

export default SocialShare;
