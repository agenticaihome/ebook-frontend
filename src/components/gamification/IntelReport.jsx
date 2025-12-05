import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileWarning, ChevronDown, ChevronUp, Shield, Eye } from 'lucide-react';

/**
 * IntelReport - Scout report styling for honest framing
 * Used to set expectations about current AI agent technology
 */
const IntelReport = ({
    title = "SCOUT REPORT",
    content,
    classification = "TERRITORY 1",
    collapsible = true,
    defaultExpanded = false
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    const lines = content.split('\n\n');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-8"
        >
            {/* Scout report tape effect at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-amber-500 text-amber-950 px-6 py-1 font-mono text-xs font-bold tracking-widest transform -rotate-1 shadow-lg">
                    🧭 SCOUT REPORT
                </div>
            </div>

            {/* Main document */}
            <div className="bg-gradient-to-br from-amber-950/40 via-slate-900/80 to-slate-900/90 rounded-xl border-2 border-amber-700/50 overflow-hidden shadow-2xl">

                {/* Document header */}
                <div className="bg-gradient-to-r from-amber-900/50 to-amber-800/30 px-6 py-4 border-b border-amber-700/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center border border-amber-500/40">
                                <FileWarning className="text-amber-400" size={20} />
                            </div>
                            <div>
                                <h3 className="text-amber-400 font-mono font-bold text-sm tracking-wider">
                                    {title}
                                </h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <Shield className="text-amber-600" size={12} />
                                    <span className="text-amber-600 text-xs font-mono">
                                        {classification}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {collapsible && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
                            >
                                <Eye size={16} />
                                <span className="text-xs font-mono">
                                    {expanded ? 'HIDE' : 'REVEAL'}
                                </span>
                                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                        )}
                    </div>
                </div>

                {/* Document content */}
                <AnimatePresence initial={false}>
                    {(expanded || !collapsible) && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="p-6 relative">
                                {/* Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                                    <span className="text-6xl font-mono font-bold text-amber-400 transform rotate-[-15deg]">
                                        SCOUT INTEL
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="relative space-y-4">
                                    {lines.map((paragraph, i) => (
                                        <p
                                            key={i}
                                            className={`text-slate-300 leading-relaxed ${i === 0 ? 'text-lg font-medium text-white' : 'text-sm'
                                                }`}
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                {/* Signature line */}
                                <div className="mt-6 pt-4 border-t border-amber-700/30 flex items-center justify-between">
                                    <div className="text-amber-600/60 text-xs font-mono">
                                        DOC-REF: AAH-{Date.now().toString().slice(-6)}
                                    </div>
                                    <div className="text-amber-400 font-bold italic text-sm">
                                        — Captain Efficiency
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Collapsed preview */}
                {collapsible && !expanded && (
                    <div className="px-6 py-4">
                        <p className="text-slate-400 text-sm italic">
                            {lines[0]?.substring(0, 100)}...
                        </p>
                        <button
                            onClick={() => setExpanded(true)}
                            className="text-amber-400 text-sm mt-2 hover:text-amber-300 font-medium"
                        >
                            Read full scout report →
                        </button>
                    </div>
                )}
            </div>

            {/* Corner stamps */}
            <div className="absolute -bottom-2 -right-2 bg-cyan-600 text-white px-3 py-1 font-mono text-xs font-bold transform rotate-3 shadow-lg">
                EXPLORER INTEL
            </div>
        </motion.div >
    );
};

export default IntelReport;
