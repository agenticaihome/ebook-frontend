import React, { useState } from 'react';
import { m } from 'framer-motion';
import { FileText, Copy, Check } from 'lucide-react';

const AgentConstitutionBuilder = () => {
    const [selections, setSelections] = useState({
        alwaysAllowed: [],
        mustAsk: [],
        neverAllowed: []
    });
    const [copied, setCopied] = useState(false);

    const options = {
        alwaysAllowed: [
            'Read and categorize my emails',
            'View my calendar events',
            'Suggest actions based on patterns',
            'Draft messages for my review',
            'Track spending categories',
            'Organize my notes and documents'
        ],
        mustAsk: [
            'Send any message on my behalf',
            'Make any purchase over $25',
            'Share my information with anyone',
            'Schedule meetings with others',
            'Modify financial accounts',
            'Access health-related data'
        ],
        neverAllowed: [
            'Store passwords or credentials',
            'Access banking login information',
            'Share data with third parties',
            'Post to social media',
            'Make medical decisions',
            'Delete important files'
        ]
    };

    const toggleSelection = (category, item) => {
        setSelections(prev => ({
            ...prev,
            [category]: prev[category].includes(item)
                ? prev[category].filter(i => i !== item)
                : [...prev[category], item]
        }));
    };

    const generateConstitution = () => {
        return `MY AGENT CONSTITUTION
Generated: ${new Date().toLocaleDateString()}

═══════════════════════════════════════════

ALWAYS ALLOWED:
${selections.alwaysAllowed.length > 0
                ? selections.alwaysAllowed.map(item => `✓ ${item}`).join('\n')
                : '(None selected)'}

MUST ASK FIRST:
${selections.mustAsk.length > 0
                ? selections.mustAsk.map(item => `? ${item}`).join('\n')
                : '(None selected)'}

NEVER ALLOWED:
${selections.neverAllowed.length > 0
                ? selections.neverAllowed.map(item => `✗ ${item}`).join('\n')
                : '(None selected)'}

WHEN UNCERTAIN:
→ Ask me before proceeding
→ Default to more restrictive option
→ Flag for my review

═══════════════════════════════════════════

This constitution guides all my AI agents.
Review and update quarterly or as needs change.`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateConstitution());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const hasSelections = Object.values(selections).some(arr => arr.length > 0);

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <FileText className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Agent Constitution Builder</h3>
            </div>

            <p className="text-slate-300 mb-6">
                Select the rules that will govern your AI agents. This creates clear boundaries for what your agents can and cannot do.
            </p>

            <div className="space-y-8">
                {/* Always Allowed */}
                <div>
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        Always Allowed
                    </h4>
                    <div className="space-y-2">
                        {options.alwaysAllowed.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => toggleSelection('alwaysAllowed', item)}
                                className={`w-full p-3 rounded-xl border-2 transition-all text-left ${selections.alwaysAllowed.includes(item)
                                        ? 'border-green-500 bg-green-900/20 text-white'
                                        : 'border-slate-700 hover:border-slate-600 bg-slate-900/50 text-slate-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selections.alwaysAllowed.includes(item)
                                            ? 'border-green-500 bg-green-500'
                                            : 'border-slate-600'
                                        }`}>
                                        {selections.alwaysAllowed.includes(item) && (
                                            <Check size={14} className="text-white" />
                                        )}
                                    </div>
                                    <span>{item}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Must Ask First */}
                <div>
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        Must Ask First
                    </h4>
                    <div className="space-y-2">
                        {options.mustAsk.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => toggleSelection('mustAsk', item)}
                                className={`w-full p-3 rounded-xl border-2 transition-all text-left ${selections.mustAsk.includes(item)
                                        ? 'border-yellow-500 bg-yellow-900/20 text-white'
                                        : 'border-slate-700 hover:border-slate-600 bg-slate-900/50 text-slate-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selections.mustAsk.includes(item)
                                            ? 'border-yellow-500 bg-yellow-500'
                                            : 'border-slate-600'
                                        }`}>
                                        {selections.mustAsk.includes(item) && (
                                            <Check size={14} className="text-white" />
                                        )}
                                    </div>
                                    <span>{item}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Never Allowed */}
                <div>
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        Never Allowed
                    </h4>
                    <div className="space-y-2">
                        {options.neverAllowed.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => toggleSelection('neverAllowed', item)}
                                className={`w-full p-3 rounded-xl border-2 transition-all text-left ${selections.neverAllowed.includes(item)
                                        ? 'border-red-500 bg-red-900/20 text-white'
                                        : 'border-slate-700 hover:border-slate-600 bg-slate-900/50 text-slate-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selections.neverAllowed.includes(item)
                                            ? 'border-red-500 bg-red-500'
                                            : 'border-slate-600'
                                        }`}>
                                        {selections.neverAllowed.includes(item) && (
                                            <Check size={14} className="text-white" />
                                        )}
                                    </div>
                                    <span>{item}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {hasSelections && (
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                >
                    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-white font-bold">Your Constitution</h5>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-all"
                            >
                                {copied ? (
                                    <>
                                        <Check size={16} />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} />
                                        Copy to Clipboard
                                    </>
                                )}
                            </button>
                        </div>
                        <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                            {generateConstitution()}
                        </pre>
                    </div>
                    <div className="text-sm text-slate-400 text-center">
                        Save this document and share it with your AI agents when setting them up.
                    </div>
                </m.div>
            )}
        </div>
    );
};

export default AgentConstitutionBuilder;
