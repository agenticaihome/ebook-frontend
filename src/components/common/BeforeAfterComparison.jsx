import React from 'react';
import { X, Check } from 'lucide-react';

/**
 * BeforeAfterComparison Component
 * 
 * Visual side-by-side comparison showing the transformation from
 * "before AI agents" to "with AI agents". Makes benefits concrete.
 * 
 * @param {Array<string>} before - List of pain points without AI
 * @param {Array<string>} after - List of benefits with AI
 * @param {Object} metric - Optional metric object with {before, after, label}
 */
const BeforeAfterComparison = ({ before, after, metric }) => {
    return (
        <div className="grid md:grid-cols-2 gap-6 my-8">
            {/* BEFORE */}
            <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                <div className="flex items-center gap-2 mb-4">
                    <X className="text-red-400" size={20} />
                    <h4 className="text-white font-bold">Before AI Agents</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                    {before.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <X className="text-red-400 flex-shrink-0 mt-0.5" size={16} />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                {metric && metric.before && (
                    <div className="mt-4 pt-4 border-t border-red-500/30 text-center">
                        <div className="text-2xl font-bold text-red-400">{metric.before}</div>
                        <div className="text-xs text-slate-400">{metric.label}</div>
                    </div>
                )}
            </div>

            {/* AFTER */}
            <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                <div className="flex items-center gap-2 mb-4">
                    <Check className="text-green-400" size={20} />
                    <h4 className="text-white font-bold">With AI Agents</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                    {after.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                {metric && metric.after && (
                    <div className="mt-4 pt-4 border-t border-green-500/30 text-center">
                        <div className="text-2xl font-bold text-green-400">{metric.after}</div>
                        <div className="text-xs text-slate-400">{metric.label}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BeforeAfterComparison;
