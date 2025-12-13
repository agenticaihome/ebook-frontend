import React from 'react';
import { X, Check } from 'lucide-react';

export default function BeforeAfterComparison() {
    return (
        <div className="grid md:grid-cols-2 gap-0 md:gap-8 max-w-5xl mx-auto">
            {/* Before State */}
            <div className="bg-red-900/10 border border-red-900/30 rounded-t-3xl md:rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <X size={100} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                    <span className="bg-red-900/30 w-8 h-8 rounded-full flex items-center justify-center text-sm">VS</span>
                    The Old Way (Chaos)
                </h3>
                <ul className="space-y-4">
                    <li className="flex gap-3 text-slate-300">
                        <X className="text-red-500 flex-shrink-0" size={20} />
                        <span>Waking up to a messy kitchen & no plan</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <X className="text-red-500 flex-shrink-0" size={20} />
                        <span>Drowning in 100+ unread emails</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <X className="text-red-500 flex-shrink-0" size={20} />
                        <span>"What's for dinner?" panic at 5 PM</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <X className="text-red-500 flex-shrink-0" size={20} />
                        <span>Fighting biology & burning out</span>
                    </li>
                </ul>
            </div>

            {/* After State */}
            <div className="bg-green-900/10 border border-green-500/30 rounded-b-3xl md:rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Check size={100} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                    <span className="bg-green-900/30 w-8 h-8 rounded-full flex items-center justify-center text-sm">AI</span>
                    The Agentic Way (Peace)
                </h3>
                <ul className="space-y-4">
                    <li className="flex gap-3 text-slate-300">
                        <Check className="text-green-500 flex-shrink-0" size={20} />
                        <span>Morning Agent briefs you while coffee brews</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <Check className="text-green-500 flex-shrink-0" size={20} />
                        <span>Inbox Zero maintained by Email Agent</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <Check className="text-green-500 flex-shrink-0" size={20} />
                        <span>Meals planned & groceries ordered automatically</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <Check className="text-green-500 flex-shrink-0" size={20} />
                        <span>Schedule adapts to your energy levels</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
