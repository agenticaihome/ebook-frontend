import { useEffect, useRef, useCallback } from 'react';

/**
 * useVisibilityPause - Hook to pause game loops when tab is hidden
 * 
 * Prevents battery drain and unexpected behavior when user switches tabs.
 * Games will pause and resume from where they left off.
 * 
 * @param {Object} options
 * @param {boolean} options.isPlaying - Whether the game is currently active
 * @param {function} options.onPause - Callback when game should pause
 * @param {function} options.onResume - Callback when game should resume
 * @param {boolean} [options.showResumeOverlay=true] - Show visual indication when resuming
 * @returns {Object} { isPaused, pauseReason }
 */
export const useVisibilityPause = ({
    isPlaying,
    onPause,
    onResume,
    showResumeOverlay = true
}) => {
    const isPausedRef = useRef(false);
    const pauseTimeRef = useRef(null);
    const wasPlayingRef = useRef(false);

    const handleVisibilityChange = useCallback(() => {
        if (document.hidden) {
            // Tab is now hidden
            if (isPlaying && !isPausedRef.current) {
                isPausedRef.current = true;
                pauseTimeRef.current = Date.now();
                wasPlayingRef.current = true;
                onPause?.();
            }
        } else {
            // Tab is visible again
            if (isPausedRef.current && wasPlayingRef.current) {
                isPausedRef.current = false;
                const pauseDuration = Date.now() - (pauseTimeRef.current || 0);
                onResume?.(pauseDuration);
                wasPlayingRef.current = false;
            }
        }
    }, [isPlaying, onPause, onResume]);

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Also handle window blur/focus for additional coverage
        const handleBlur = () => {
            if (isPlaying && !isPausedRef.current) {
                isPausedRef.current = true;
                pauseTimeRef.current = Date.now();
                wasPlayingRef.current = true;
                onPause?.();
            }
        };

        const handleFocus = () => {
            if (isPausedRef.current && wasPlayingRef.current) {
                isPausedRef.current = false;
                const pauseDuration = Date.now() - (pauseTimeRef.current || 0);
                onResume?.(pauseDuration);
                wasPlayingRef.current = false;
            }
        };

        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
        };
    }, [handleVisibilityChange, isPlaying, onPause, onResume]);

    return {
        isPaused: isPausedRef.current,
        pauseTime: pauseTimeRef.current
    };
};

/**
 * Simple pause overlay component for games
 */
export const PauseOverlay = ({ isVisible, onResume, message = "Game Paused" }) => {
    if (!isVisible) return null;

    return (
        <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
            onClick={onResume}
        >
            <div className="text-center">
                <div className="text-6xl mb-4">⏸️</div>
                <h2 className="text-2xl font-bold text-white mb-2">{message}</h2>
                <p className="text-slate-300 mb-6">Tab was hidden - game paused</p>
                <button
                    onClick={onResume}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                    ▶️ Resume
                </button>
            </div>
        </div>
    );
};

export default useVisibilityPause;
