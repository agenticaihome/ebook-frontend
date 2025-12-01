import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * CopyPrompt Component
 * 
 * A reusable component for displaying AI prompts with one-click copy functionality.
 * Makes prompts easy to copy and customize for users.
 * 
 * @param {string} prompt - The actual prompt text to be copied
 * @param {string} title - Title/heading for the prompt box
 * @param {string} whatItDoes - Explanation of what the prompt accomplishes
 * @param {string} howToCustomize - Guidance on how to modify the prompt
 * @param {Array} variables - Array of {name, description} objects for variables to replace
 */
const CopyPrompt = ({
    prompt,
    title = "Copy This Prompt",
    whatItDoes,
    howToCustomize,
    variables = []
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = prompt;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="my-8 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 rounded-xl border border-cyan-500/50">
            {/* Header with Copy Button */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-400">📋 {title}</h3>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-lg hover:shadow-cyan-500/50"
                >
                    {copied ? (
                        <>
                            <Check size={18} />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy size={18} />
                            Copy Prompt
                        </>
                    )}
                </button>
            </div>

            {/* The Prompt */}
            <div className="bg-slate-900/80 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4 border border-slate-700 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{prompt}</pre>
            </div>

            {/* What it does */}
            {whatItDoes && (
                <div className="mb-3">
                    <div className="text-green-400 font-bold text-sm mb-1">✅ What this does:</div>
                    <div className="text-slate-300 text-sm">{whatItDoes}</div>
                </div>
            )}

            {/* How to customize */}
            {howToCustomize && (
                <div className="mb-3">
                    <div className="text-purple-400 font-bold text-sm mb-1">⚙️ How to customize:</div>
                    <div className="text-slate-300 text-sm">{howToCustomize}</div>
                </div>
            )}

            {/* Variable list */}
            {variables.length > 0 && (
                <div>
                    <div className="text-yellow-400 font-bold text-sm mb-1">📝 Replace these variables:</div>
                    <div className="text-slate-300 text-xs space-y-1">
                        {variables.map((v, i) => (
                            <div key={i} className="font-mono">
                                • <span className="text-yellow-300">{v.name}</span> - {v.description}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CopyPrompt;
