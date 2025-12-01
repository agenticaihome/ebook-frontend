import React from 'react';
import { Zap } from 'lucide-react';

/**
 * TryThisNow Component
 * 
 * Creates an actionable challenge box that encourages users to immediately
 * try what they've learned. Increases engagement and practical application.
 * 
 * @param {string} challenge - The main challenge/goal description
 * @param {string} estimatedTime - How long this will take (e.g., "5 min")
 * @param {Array<string>} steps - Array of step-by-step instructions
 */
const TryThisNow = ({ challenge, estimatedTime = "5 min", steps }) => {
    return (
        <div className="my-8 bg-gradient-to-br from-yellow-900/30 to-orange-900/20 p-6 rounded-xl border-2 border-yellow-500/50 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-500/20 p-2 rounded-full">
                    <Zap className="text-yellow-400" size={24} />
                </div>
                <div>
                    <div className="text-yellow-400 font-bold uppercase tracking-wider text-sm">Try This Now</div>
                    <div className="text-slate-400 text-xs">⏱️ {estimatedTime}</div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-4">{challenge}</h3>

            <div className="space-y-2 mb-4">
                {steps.map((step, i) => (
                    <div key={i} className="flex gap-3 text-slate-300">
                        <div className="bg-yellow-500/20 text-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {i + 1}
                        </div>
                        <div className="text-sm">{step}</div>
                    </div>
                ))}
            </div>

            <div className="text-xs text-slate-400 italic border-t border-yellow-500/20 pt-3 mt-3">
                💡 <strong>Tip:</strong> Screenshot your result! Share on social media with #AgenticAI
            </div>
        </div>
    );
};

export default TryThisNow;
