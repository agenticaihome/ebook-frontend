/**
 * Diagnostics Panel
 * 
 * Hidden debug panel for production troubleshooting.
 * Access via: ?diagnostics=1 in URL
 * 
 * Shows:
 * - APP_VERSION, environment
 * - Last error logged
 * - Storage keys summary
 * - Device info
 */

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Bug, RefreshCw, Trash2 } from 'lucide-react';
import { APP_VERSION, FEATURES } from '../../config/appConfig';

const DiagnosticsPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [storageKeys, setStorageKeys] = useState([]);
    const [lastError, setLastError] = useState(null);

    // Check for diagnostics flag in URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('diagnostics') === '1') {
            setIsOpen(true);
        }
    }, []);

    // Gather storage info
    useEffect(() => {
        if (!isOpen) return;

        try {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                keys.push({
                    key,
                    size: value?.length || 0,
                    preview: value?.slice(0, 50) || '',
                });
            }
            setStorageKeys(keys.sort((a, b) => b.size - a.size));
        } catch (e) {
            setStorageKeys([{ key: 'Error', size: 0, preview: e.message }]);
        }
    }, [isOpen]);

    const handleClearStorage = () => {
        if (window.confirm('Clear all localStorage? This will reset your progress.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    if (!isOpen) return null;

    const environment = process.env.NODE_ENV;
    const totalStorageSize = storageKeys.reduce((acc, k) => acc + k.size, 0);

    return (
        <AnimatePresence>
            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-4 right-4 z-[9999] max-w-sm w-full"
            >
                <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-slate-800 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Bug className="w-4 h-4 text-green-400" />
                            <span className="font-bold text-white text-sm">Diagnostics</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-white p-1"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-3 space-y-3 max-h-80 overflow-y-auto">
                        {/* Version & Environment */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-slate-800/50 p-2 rounded">
                                <div className="text-slate-400">Version</div>
                                <div className="text-white font-mono">{APP_VERSION}</div>
                            </div>
                            <div className="bg-slate-800/50 p-2 rounded">
                                <div className="text-slate-400">Environment</div>
                                <div className={`font-mono ${environment === 'production' ? 'text-green-400' : 'text-amber-400'}`}>
                                    {environment}
                                </div>
                            </div>
                        </div>

                        {/* Device Info */}
                        <div className="bg-slate-800/50 p-2 rounded text-xs">
                            <div className="text-slate-400 mb-1">Device</div>
                            <div className="text-white font-mono text-[10px] break-all">
                                {navigator.userAgent.slice(0, 100)}...
                            </div>
                        </div>

                        {/* Storage Summary */}
                        <div className="bg-slate-800/50 p-2 rounded text-xs">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-400">localStorage</span>
                                <span className="text-white">{storageKeys.length} keys • {(totalStorageSize / 1024).toFixed(1)}KB</span>
                            </div>
                            <div className="space-y-1 max-h-24 overflow-y-auto">
                                {storageKeys.slice(0, 5).map(k => (
                                    <div key={k.key} className="flex justify-between text-[10px]">
                                        <span className="text-slate-300 truncate flex-1">{k.key}</span>
                                        <span className="text-slate-500 ml-2">{k.size}b</span>
                                    </div>
                                ))}
                                {storageKeys.length > 5 && (
                                    <div className="text-slate-500 text-[10px]">
                                        +{storageKeys.length - 5} more keys
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Feature Flags */}
                        <div className="bg-slate-800/50 p-2 rounded text-xs">
                            <div className="text-slate-400 mb-1">Features</div>
                            <div className="flex flex-wrap gap-1">
                                {Object.entries(FEATURES).map(([key, value]) => (
                                    <span
                                        key={key}
                                        className={`px-1.5 py-0.5 rounded text-[10px] ${value ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                                    >
                                        {key}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 flex items-center justify-center gap-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded text-xs"
                            >
                                <RefreshCw className="w-3 h-3" />
                                Reload
                            </button>
                            <button
                                onClick={handleClearStorage}
                                className="flex-1 flex items-center justify-center gap-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded text-xs"
                            >
                                <Trash2 className="w-3 h-3" />
                                Clear Storage
                            </button>
                        </div>
                    </div>
                </div>
            </m.div>
        </AnimatePresence>
    );
};

export default DiagnosticsPanel;
