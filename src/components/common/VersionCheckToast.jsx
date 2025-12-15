/**
 * VersionCheck Component
 * 
 * Displays a non-intrusive toast when a new version is available.
 * Prompts user to refresh to get latest features.
 */

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';
import { APP_VERSION } from '../../config/appConfig';

/**
 * Check if stored version matches current version
 */
const checkVersionMismatch = () => {
    try {
        const storedVersion = localStorage.getItem('app_version');
        if (storedVersion && storedVersion !== APP_VERSION) {
            return true;
        }
        // Store current version
        localStorage.setItem('app_version', APP_VERSION);
        return false;
    } catch {
        return false;
    }
};

/**
 * VersionCheckToast - Shows when app version changes
 */
export const VersionCheckToast = () => {
    const [showToast, setShowToast] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Check on mount
        if (checkVersionMismatch() && !dismissed) {
            setShowToast(true);
        }

        // Also listen for focus events (user returns to tab after deploy)
        const handleFocus = () => {
            if (checkVersionMismatch() && !dismissed) {
                setShowToast(true);
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [dismissed]);

    const handleRefresh = () => {
        // Clear cache and reload
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => caches.delete(name));
            });
        }
        window.location.reload(true);
    };

    const handleDismiss = () => {
        setShowToast(false);
        setDismissed(true);
        // Store current version so we don't show again
        try {
            localStorage.setItem('app_version', APP_VERSION);
        } catch { }
    };

    return (
        <AnimatePresence>
            {showToast && (
                <m.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full mx-4"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl p-4 flex items-center gap-3">
                        <div className="bg-white/20 rounded-full p-2">
                            <RefreshCw className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-semibold text-sm">
                                New version available!
                            </p>
                            <p className="text-white/80 text-xs">
                                Refresh for the latest features
                            </p>
                        </div>
                        <button
                            onClick={handleRefresh}
                            className="bg-white text-blue-600 px-3 py-1.5 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors"
                        >
                            Refresh
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="text-white/60 hover:text-white p-1"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default VersionCheckToast;
