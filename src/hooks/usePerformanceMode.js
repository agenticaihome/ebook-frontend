import { useState, useEffect } from 'react';

export const usePerformanceMode = () => {
    const [isPerformanceMode, setIsPerformanceMode] = useState(false);

    useEffect(() => {
        const checkPerformance = () => {
            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // Check for slow connection
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const isSlowConnection = connection ? (connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === '3g') : false;

            // Check for low concurrency (maybe older device)
            // 4 cores or less usually indicates a mobile device or older laptop
            const isLowConcurrency = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

            if (prefersReducedMotion || isSlowConnection || isLowConcurrency) {
                setIsPerformanceMode(true);
            }
        };

        checkPerformance();
    }, []);

    return isPerformanceMode;
};
