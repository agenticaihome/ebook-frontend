/**
 * CrossTabGameLock - Warning overlay when another tab is playing the same game
 * 
 * Uses the useActiveTabLock hook from useCrossTabSync to detect
 * when another browser tab has an active game session.
 */

import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ArrowLeft, ExternalLink } from 'lucide-react';

/**
 * CrossTabGameLock - Shows warning when another tab is playing
 * @param {boolean} isLocked - Whether game is locked by another tab
 * @param {string} gameName - Name of the game
 * @param {Function} onBack - Callback to navigate back
 */
export const CrossTabGameLock = ({ isLocked, gameName, onBack }) => {
    if (!isLocked) return null;

    return (
        <AnimatePresence>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            >
                <m.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-slate-800 rounded-2xl border border-amber-500/30 p-6 max-w-sm text-center shadow-xl"
                >
                    <div className="bg-amber-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-amber-400" />
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2">
                        Game Active in Another Tab
                    </h2>

                    <p className="text-slate-300 mb-4 text-sm">
                        {gameName || 'This game'} is currently running in another browser tab.
                        Close the other tab to play here.
                    </p>

                    <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
                        <p className="text-xs text-slate-400">
                            ⚡ This prevents score conflicts and keeps your progress safe
                        </p>
                    </div>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>

                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Retry
                        </button>
                    </div>
                </m.div>
            </m.div>
        </AnimatePresence>
    );
};

export default CrossTabGameLock;
