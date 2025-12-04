import React from 'react';
import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * HowThisWorks - Early explanation for non-tech readers
 * Addresses user testing feedback that readers didn't understand 
 * "what is an agent" until Chapter 3
 */
const HowThisWorks = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-2xl p-6 border border-cyan-500/30 mb-8"
    >
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="text-cyan-400" size={20} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-white mb-2">
                    How This Works (30 seconds)
                </h3>
                <p className="text-slate-300 text-sm mb-3">
                    Throughout this book, you'll copy <strong className="text-white">ready-to-use prompts</strong> and
                    paste them into <strong className="text-cyan-400">ChatGPT, Claude, or any AI assistant</strong>.
                    That's it. The AI becomes your personal "agent" for that task—like a helpful assistant who never forgets.
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                    <span className="bg-slate-800/50 px-3 py-1.5 rounded-lg text-slate-400">
                        📋 Copy prompt → 🤖 Paste in ChatGPT → ✨ Get results
                    </span>
                </div>
            </div>
        </div>
    </motion.div>
);

export default HowThisWorks;
