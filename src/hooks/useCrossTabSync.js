/**
 * Cross-Tab Storage Sync Hook
 * 
 * Detects when another tab modifies localStorage and syncs state.
 * Prevents score corruption and state inconsistencies across tabs.
 * 
 * @usage
 * const { isStale, syncState, disconnect } = useCrossTabSync(['highScore', 'calendarBest']);
 */

import { useEffect, useRef, useCallback, useState } from 'react';

// Keys that should trigger a sync when modified by another tab
const GAME_SCORE_KEYS = [
    'focusfury_best',
    'deepwork_best',
    'calendarBest',
    'triageBest',
    'captainClickHighScore',
];

/**
 * Hook to handle cross-tab storage synchronization
 * @param {string[]} keysToWatch - Storage keys to monitor for changes
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoReload - Whether to reload on critical changes (default: false)
 * @param {Function} options.onConflict - Callback when conflict detected
 */
export function useCrossTabSync(keysToWatch = GAME_SCORE_KEYS, options = {}) {
    const { autoReload = false, onConflict } = options;
    const [isStale, setIsStale] = useState(false);
    const [lastSync, setLastSync] = useState(Date.now());
    const listenerRef = useRef(null);

    const handleStorageChange = useCallback((event) => {
        // Only react to storage events from other tabs (event.key is null for clear())
        if (!event.key) return;

        // Check if the changed key is one we're watching
        const isWatchedKey = keysToWatch.some(key =>
            event.key === key || event.key?.includes(key)
        );

        if (isWatchedKey) {
            console.warn(`[CrossTabSync] Key "${event.key}" modified by another tab`);
            setIsStale(true);
            setLastSync(Date.now());

            if (onConflict) {
                onConflict({
                    key: event.key,
                    oldValue: event.oldValue,
                    newValue: event.newValue,
                    timestamp: Date.now()
                });
            }

            if (autoReload) {
                // Soft reload after a brief delay to allow user to see notification
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }
    }, [keysToWatch, autoReload, onConflict]);

    // Sync state by re-reading from localStorage
    const syncState = useCallback(() => {
        setIsStale(false);
        setLastSync(Date.now());
        // Trigger a re-render in consuming components by changing lastSync
    }, []);

    // Disconnect the listener (useful for cleanup)
    const disconnect = useCallback(() => {
        if (listenerRef.current) {
            window.removeEventListener('storage', listenerRef.current);
            listenerRef.current = null;
        }
    }, []);

    useEffect(() => {
        listenerRef.current = handleStorageChange;
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [handleStorageChange]);

    return { isStale, lastSync, syncState, disconnect };
}

/**
 * Simple hook to prevent game from running in multiple tabs
 * Uses a heartbeat pattern to detect active game sessions
 */
export function useActiveTabLock(gameId) {
    const heartbeatRef = useRef(null);
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        const HEARTBEAT_KEY = `${gameId}_activeTab`;
        const HEARTBEAT_INTERVAL = 1000; // ms
        const STALE_THRESHOLD = 3000; // ms - consider tab stale after this

        // Check if another tab is active
        const checkLock = () => {
            try {
                const lastHeartbeat = localStorage.getItem(HEARTBEAT_KEY);
                if (lastHeartbeat) {
                    const age = Date.now() - parseInt(lastHeartbeat, 10);
                    if (age < STALE_THRESHOLD) {
                        setIsLocked(true);
                        return true;
                    }
                }
            } catch (e) {
                // Storage unavailable
            }
            return false;
        };

        // Claim the lock
        const claimLock = () => {
            try {
                localStorage.setItem(HEARTBEAT_KEY, Date.now().toString());
            } catch (e) {
                // Storage unavailable
            }
        };

        // Release the lock
        const releaseLock = () => {
            try {
                localStorage.removeItem(HEARTBEAT_KEY);
            } catch (e) {
                // Storage unavailable
            }
        };

        // Initial check
        if (!checkLock()) {
            claimLock();
            setIsLocked(false);

            // Start heartbeat
            heartbeatRef.current = setInterval(claimLock, HEARTBEAT_INTERVAL);
        }

        // Listen for other tabs
        const handleStorage = (e) => {
            if (e.key === HEARTBEAT_KEY && e.newValue) {
                const otherTabTime = parseInt(e.newValue, 10);
                // If another tab has a more recent heartbeat, we're locked out
                const ourLastHeartbeat = parseInt(localStorage.getItem(HEARTBEAT_KEY) || '0', 10);
                if (otherTabTime > ourLastHeartbeat) {
                    setIsLocked(true);
                }
            }
        };
        window.addEventListener('storage', handleStorage);

        return () => {
            if (heartbeatRef.current) {
                clearInterval(heartbeatRef.current);
            }
            releaseLock();
            window.removeEventListener('storage', handleStorage);
        };
    }, [gameId]);

    return isLocked;
}

export default useCrossTabSync;
