import { useCallback } from 'react';
import confetti from 'canvas-confetti';

/**
 * useImmersion Hook
 * Provides unified immersion utilities for haptics, confetti, and delight effects
 * Used across the site to create addictive, delightful micro-interactions
 */
export const useImmersion = () => {
    // ===================
    // HAPTIC FEEDBACK
    // ===================
    const triggerHaptic = useCallback((pattern = 10) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }, []);

    // ===================
    // CONFETTI EFFECTS
    // ===================
    const triggerConfetti = useCallback((type = 'success') => {
        const configs = {
            // Small burst for button clicks, copies
            success: {
                particleCount: 30,
                spread: 50,
                origin: { y: 0.7 },
                colors: ['#14b8a6', '#06b6d4', '#22c55e'],
                startVelocity: 20,
                gravity: 0.8,
            },
            // Medium celebration for chapter completion
            chapter: {
                particleCount: 80,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#14b8a6', '#06b6d4', '#fbbf24', '#a855f7'],
                startVelocity: 30,
            },
            // Big celebration for major milestones
            milestone: {
                particleCount: 150,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#fbbf24', '#f59e0b', '#06b6d4', '#a855f7', '#ec4899'],
                startVelocity: 40,
            },
            // Subtle sparkle effect
            sparkle: {
                particleCount: 15,
                spread: 30,
                origin: { y: 0.8 },
                colors: ['#fbbf24', '#ffffff'],
                startVelocity: 15,
                gravity: 0.6,
                scalar: 0.6,
            },
            // Copy button specific
            copy: {
                particleCount: 20,
                spread: 40,
                origin: { y: 0.8 },
                colors: ['#14b8a6', '#22c55e', '#ffffff'],
                startVelocity: 18,
                gravity: 0.9,
                scalar: 0.7,
            },
        };

        const config = configs[type] || configs.success;
        confetti(config);
    }, []);

    // Side cannon confetti (left and right burst)
    const triggerSideCannons = useCallback(() => {
        const duration = 300;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.6 },
                colors: ['#14b8a6', '#fbbf24', '#a855f7'],
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.6 },
                colors: ['#14b8a6', '#fbbf24', '#a855f7'],
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, []);

    // ===================
    // SCREEN EFFECTS
    // ===================
    const triggerFlash = useCallback((element, color = 'teal') => {
        if (!element) return;

        const flashColors = {
            teal: 'rgba(20, 184, 166, 0.3)',
            green: 'rgba(34, 197, 94, 0.3)',
            amber: 'rgba(251, 191, 36, 0.3)',
            purple: 'rgba(168, 85, 247, 0.3)',
        };

        const originalBg = element.style.backgroundColor;
        element.style.backgroundColor = flashColors[color] || flashColors.teal;
        element.style.transition = 'background-color 0.1s ease-out';

        setTimeout(() => {
            element.style.backgroundColor = originalBg;
        }, 100);
    }, []);

    // ===================
    // COMBINED DELIGHT
    // ===================
    const triggerDelight = useCallback((type = 'success') => {
        // Haptic patterns by type
        const hapticPatterns = {
            success: 10,
            chapter: [20, 30, 20],
            milestone: [30, 20, 30, 20, 50],
            copy: 8,
            sparkle: 5,
        };

        triggerHaptic(hapticPatterns[type] || 10);
        triggerConfetti(type);
    }, [triggerHaptic, triggerConfetti]);

    // ===================
    // PROGRESS CELEBRATION
    // ===================
    const celebrateProgress = useCallback((percentage) => {
        if (percentage >= 100) {
            triggerSideCannons();
            triggerHaptic([50, 30, 50, 30, 100]);
        } else if (percentage >= 75) {
            triggerConfetti('milestone');
            triggerHaptic([20, 30, 20]);
        } else if (percentage >= 50) {
            triggerConfetti('chapter');
            triggerHaptic([15, 20]);
        } else if (percentage >= 25) {
            triggerConfetti('success');
            triggerHaptic(15);
        }
    }, [triggerConfetti, triggerSideCannons, triggerHaptic]);

    return {
        triggerHaptic,
        triggerConfetti,
        triggerSideCannons,
        triggerFlash,
        triggerDelight,
        celebrateProgress,
    };
};

export default useImmersion;
