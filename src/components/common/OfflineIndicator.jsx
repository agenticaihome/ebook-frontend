import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';

/**
 * OfflineIndicator - Shows a banner when the user loses internet connection
 * Automatically hides when connection is restored
 */
const OfflineIndicator = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOffline(false);
            // Keep banner visible briefly to show "Back online"
            setTimeout(() => setShowBanner(false), 2000);
        };

        const handleOffline = () => {
            setIsOffline(true);
            setShowBanner(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Set initial state
        if (!navigator.onLine) {
            setShowBanner(true);
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <m.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className={`fixed top-0 left-0 right-0 z-[100] px-4 py-3 text-center text-sm font-medium ${isOffline
                            ? 'bg-amber-500 text-amber-950'
                            : 'bg-green-500 text-green-950'
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        {isOffline ? (
                            <>
                                <WifiOff size={16} />
                                <span>You're offline. Some features may be unavailable.</span>
                                <button
                                    onClick={handleRetry}
                                    className="ml-2 flex items-center gap-1 px-2 py-1 bg-amber-600 hover:bg-amber-700 rounded text-xs transition-colors"
                                >
                                    <RefreshCw size={12} />
                                    Retry
                                </button>
                            </>
                        ) : (
                            <span>✓ Back online!</span>
                        )}
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default OfflineIndicator;
