import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const CaptainTooltip = ({ content }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-block ml-2">
            <button
                type="button"
                className="text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={() => setIsVisible(!isVisible)}
                aria-label="Show help tip"
            >
                <HelpCircle size={16} />
            </button>

            <AnimatePresence>
                {isVisible && (
                    <m.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-xl text-sm text-slate-300"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-xs border-2 border-white/10">
                                CE
                            </div>
                            <div>
                                <p className="leading-relaxed">{content}</p>
                            </div>
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-slate-900" />
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CaptainTooltip;
