import React from 'react';
import { motion } from 'framer-motion';
import CaptainHero from '../CaptainHero'; // Assuming this exists, or I'll use a placeholder

const MissionBriefing = ({
    title,
    missionNumber,
    duration,
    briefing,
    onAccept
}) => {
    return (
        <div className="max-w-4xl mx-auto mb-12">
            {/* Top Secret Stamp */}
            <motion.div
                initial={{ opacity: 0, scale: 2, rotate: -45 }}
                animate={{ opacity: 0.1, scale: 1, rotate: -15 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-0 right-0 text-red-600 font-black text-8xl border-8 border-red-600 p-4 rounded uppercase pointer-events-none select-none z-0"
            >
                Classified
            </motion.div>

            {/* Header */}
            <div className="relative z-10 bg-gray-900 border-2 border-cyan-500/50 rounded-t-lg p-6 flex items-center justify-between">
                <div>
                    <h3 className="text-cyan-400 font-mono text-sm tracking-widest mb-1">
                        OPERATION ORDER #{missionNumber.toString().padStart(3, '0')}
                    </h3>
                    <h1 className="text-3xl md:text-4xl font-black text-white uppercase italic">
                        {title}
                    </h1>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-gray-400 text-xs uppercase tracking-wider">Est. Duration</div>
                    <div className="text-xl font-bold text-yellow-400">{duration}</div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 bg-gray-800/80 border-x-2 border-b-2 border-cyan-500/30 rounded-b-lg p-6 md:p-8 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Captain Image */}
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <div className="bg-cyan-900/20 rounded-lg border border-cyan-500/30 p-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                            {/* Using a placeholder for now if CaptainHero isn't exactly what we want, but trying to reuse */}
                            <div className="relative z-10">
                                {/* Placeholder for Captain Efficiency Command Room Pose */}
                                <img
                                    src="/assets/captain-efficiency-command.png"
                                    alt="Captain Efficiency"
                                    className="w-full h-auto rounded shadow-lg"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/400x400/1e293b/06b6d4?text=Captain+Efficiency';
                                    }}
                                />
                            </div>
                            <div className="mt-2 text-center">
                                <div className="text-cyan-400 font-bold text-sm">CPT. EFFICIENCY</div>
                                <div className="text-cyan-600 text-[10px] uppercase tracking-wider">Mission Commander</div>
                            </div>
                        </div>
                    </div>

                    {/* Briefing Text */}
                    <div className="flex-1">
                        <h4 className="text-gray-400 font-bold text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2">
                            Mission Briefing
                        </h4>

                        <div className="prose prose-invert max-w-none mb-6">
                            <p className="text-lg leading-relaxed text-gray-200 font-light">
                                {briefing}
                            </p>
                        </div>

                        <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6">
                            <h5 className="text-yellow-500 font-bold text-sm uppercase mb-1">Objective</h5>
                            <p className="text-gray-300 text-sm">
                                Deploy the designated agents to neutralize the threat and reclaim your resources.
                            </p>
                        </div>

                        {onAccept && (
                            <button
                                onClick={onAccept}
                                className="w-full md:w-auto px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
                            >
                                Accept Mission
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionBriefing;
