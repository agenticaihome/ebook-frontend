import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const TroubleshootingAccordion = ({ title = "Troubleshooting", issues = [] }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleIndex = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="my-12 border border-yellow-500/30 bg-yellow-900/10 rounded-xl overflow-hidden">
            <div className="p-4 bg-yellow-900/20 border-b border-yellow-500/30 flex items-center gap-3">
                <AlertTriangle className="text-yellow-500" size={24} />
                <h3 className="text-lg font-bold text-yellow-100">{title}</h3>
            </div>

            <div className="divide-y divide-yellow-500/20">
                {issues.map((issue, index) => (
                    <div key={index} className="bg-transparent">
                        <button
                            onClick={() => toggleIndex(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-yellow-500/5 transition-colors"
                        >
                            <span className="font-medium text-yellow-200">{issue.problem}</span>
                            {activeIndex === index ? (
                                <ChevronUp className="text-yellow-500" size={20} />
                            ) : (
                                <ChevronDown className="text-yellow-500/50" size={20} />
                            )}
                        </button>

                        <AnimatePresence>
                            {activeIndex === index && (
                                <m.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 pt-0 text-slate-300 text-sm leading-relaxed">
                                        <div className="flex gap-3 items-start bg-slate-900/50 p-3 rounded-lg">
                                            <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                                            <div>{issue.solution}</div>
                                        </div>
                                    </div>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TroubleshootingAccordion;
