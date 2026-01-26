import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronDown, CheckCircle } from 'lucide-react';

/**
 * MakeItStick Component
 * Shows readers how to make each agent persistent using ChatGPT Tasks, Memory, or Claude Projects
 * 
 * Props:
 * - title: string (optional, defaults to "Make It Stick")
 * - tips: array of { title: string, description: string }
 * - note: string (optional footer note)
 */
const MakeItStick = ({ title = "Make It Stick", tips = [], note = null }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-6"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl text-left hover:from-amber-500/15 hover:to-orange-500/15 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <Lightbulb className="text-white" size={20} />
                    </div>
                    <div>
                        <span className="text-amber-400 font-bold text-sm">💡 {title}</span>
                        <p className="text-slate-400 text-xs">Turn this into an automated agent</p>
                    </div>
                </div>
                <ChevronDown 
                    size={20} 
                    className={`text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3 bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-2xl p-5 border border-amber-500/20">
                            <div className="space-y-4">
                                {tips.map((tip, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-amber-400 text-xs font-bold">{index + 1}</span>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">{tip.title}</p>
                                            <p className="text-slate-400 text-sm mt-1">{tip.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {note && (
                                <div className="mt-4 pt-4 border-t border-amber-500/20">
                                    <p className="text-slate-500 text-xs italic flex items-start gap-2">
                                        <CheckCircle size={14} className="text-amber-500/50 mt-0.5 flex-shrink-0" />
                                        {note}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default MakeItStick;

/**
 * USAGE EXAMPLE:
 * 
 * import MakeItStick from '../../components/common/MakeItStick';
 * 
 * <MakeItStick 
 *     tips={[
 *         {
 *             title: "Enable Memory",
 *             description: "After your first conversation, ChatGPT will remember your preferences."
 *         },
 *         {
 *             title: "Set up a Task",
 *             description: 'Say: "Send me this briefing every day at 7am"'
 *         },
 *         {
 *             title: "Claude Project alternative",
 *             description: "Create a Project with your preferences in custom instructions."
 *         }
 *     ]}
 *     note="The goal: Set it once, let it run. You shouldn't paste this prompt every day."
 * />
 */
