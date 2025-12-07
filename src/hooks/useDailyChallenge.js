import { useState, useEffect, useMemo } from 'react';

/**
 * Hook for Daily Challenge Mode
 * - Determines if daily challenge is available
 * - Provides 2x score multiplier
 * - Tracks completion for the day
 */
export const useDailyChallenge = (gameId) => {
    const [isDailyActive, setIsDailyActive] = useState(false);
    const [hasCompletedToday, setHasCompletedToday] = useState(false);

    // Get today's date string for consistent daily seed
    const todayKey = useMemo(() => {
        const d = new Date();
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }, []);

    const storageKey = `daily_challenge_${gameId}_${todayKey}`;

    useEffect(() => {
        // Check if already completed today
        try {
            const completed = localStorage.getItem(storageKey);
            setHasCompletedToday(!!completed);
        } catch {
            setHasCompletedToday(false);
        }
    }, [storageKey]);

    const startDailyChallenge = () => {
        if (!hasCompletedToday) {
            setIsDailyActive(true);
        }
    };

    const completeDailyChallenge = (score) => {
        if (isDailyActive) {
            setIsDailyActive(false);
            setHasCompletedToday(true);
            try {
                localStorage.setItem(storageKey, score.toString());
            } catch {
                // Storage full, ignore
            }
        }
    };

    // Score multiplier (2x during daily challenge)
    const scoreMultiplier = isDailyActive ? 2 : 1;

    // Hours until daily reset (midnight)
    const hoursUntilReset = useMemo(() => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        return Math.ceil((midnight - now) / (1000 * 60 * 60));
    }, []);

    return {
        isDailyActive,
        hasCompletedToday,
        startDailyChallenge,
        completeDailyChallenge,
        scoreMultiplier,
        hoursUntilReset,
        todayKey,
    };
};

export default useDailyChallenge;
