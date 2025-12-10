import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Trophy, Shield, Sparkles } from 'lucide-react';

/**
 * CommanderCertificate - Shareable proof of completion
 * This is the "graduation diploma" users can share on social media
 */
const CommanderCertificate = ({
    commanderName = "Friend",
    completionDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    agentsDeployed = 10
}) => {
    const certificateRef = useRef(null);

    const handleShare = () => {
        const shareText = `🎉 I just finished all 10 chapters at @agenticaihome!\n\n✅ 10 AI agents helping me daily\n✅ Mornings, emails, meals on autopilot\n✅ 5+ hours saved every week\n\nCheck it out → agenticaihome.com`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank');
    };

    const handleDownload = () => {
        // For now, open share dialog - in production would generate image
        alert("Certificate download coming soon! For now, take a screenshot 📸");
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* The Certificate */}
            <motion.div
                ref={certificateRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border-2 border-amber-500/50 p-8 md:p-12 overflow-hidden"
            >
                {/* Background decorations */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full blur-[100px]" />
                </div>

                {/* Stars decoration */}
                <div className="absolute top-4 left-4 text-amber-400/30">
                    <Sparkles size={40} />
                </div>
                <div className="absolute top-4 right-4 text-amber-400/30">
                    <Sparkles size={40} />
                </div>

                {/* Certificate content */}
                <div className="relative z-10 text-center">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30 mb-4">
                            <Trophy className="text-white" size={36} />
                        </div>
                        <h3 className="text-amber-400 font-bold tracking-[0.3em] text-sm uppercase">
                            Certificate of Completion
                        </h3>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                        AI Pro
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-amber-500 mx-auto rounded-full mb-6" />

                    {/* Name */}
                    <p className="text-slate-400 mb-2">This certifies that</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-6">
                        {commanderName}
                    </h1>

                    {/* Description */}
                    <p className="text-slate-300 max-w-md mx-auto mb-8 leading-relaxed">
                        has successfully completed all 10 chapters of the Agentic AI at Home training and built a full <span className="text-white font-semibold">Agent Army</span> to automate their daily life.
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-6 mb-8">
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">{agentsDeployed}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Agents Built</div>
                        </div>
                        <div className="w-px bg-slate-700" />
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">5+</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Hours Saved/Week</div>
                        </div>
                        <div className="w-px bg-slate-700" />
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">∞</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Lifetime Access</div>
                        </div>
                    </div>

                    {/* Signatures */}
                    <div className="flex justify-center gap-12 mb-6">
                        <div className="text-center">
                            <img
                                src="/assets/captain-pointing-transparent.webp"
                                alt="Captain Efficiency"
                                className="w-16 h-16 object-contain mx-auto mb-2"
                            />
                            <div className="text-white font-bold text-sm">Captain Efficiency</div>
                            <div className="text-slate-500 text-xs">Your Guide</div>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mx-auto mb-2">
                                <span className="text-2xl">🦷</span>
                            </div>
                            <div className="text-white font-bold text-sm">DDS</div>
                            <div className="text-slate-500 text-xs">Founder</div>
                        </div>
                    </div>

                    {/* Date and verification */}
                    <div className="flex justify-center items-center gap-4 text-sm text-slate-500">
                        <Shield size={14} className="text-green-400" />
                        <span>Issued {completionDate}</span>
                        <span className="text-slate-700">•</span>
                        <span>agenticaihome.com</span>
                    </div>
                </div>

                {/* Corner badge */}
                <div className="absolute bottom-4 right-4 opacity-20">
                    <img
                        src="/assets/logo-new.webp"
                        alt="Agentic AI Home"
                        className="w-12 h-12"
                    />
                </div>
            </motion.div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-500/20"
                >
                    <Share2 size={18} />
                    Share to X
                </button>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold rounded-xl transition-all"
                >
                    <Download size={18} />
                    Download
                </button>
            </div>
        </div>
    );
};

export default CommanderCertificate;
