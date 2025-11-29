import { useState, useEffect } from 'react';

const useDeviceCapabilities = () => {
    const [capabilities, setCapabilities] = useState({
        isLowEnd: false,
        isReducedMotion: false,
        isSaveData: false,
        performanceTier: 'high' // 'high', 'medium', 'low'
    });

    useEffect(() => {
        // 1. Check for Reduced Motion
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const isReducedMotion = reducedMotionQuery.matches;

        // 2. Check for Data Saver
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const isSaveData = connection ? connection.saveData : false;

        // 3. Estimate Hardware Capabilities
        // Logical processors (cores)
        const cores = navigator.hardwareConcurrency || 4;
        // RAM in GB (approximate, often capped at 8)
        const ram = navigator.deviceMemory || 4;

        let isLowEnd = false;
        let tier = 'high';

        // Low-end criteria: < 4 cores OR < 4GB RAM
        if (cores < 4 || ram < 4) {
            isLowEnd = true;
            tier = 'low';
        } else if (cores <= 6 || ram <= 6) {
            tier = 'medium';
        }

        // Downgrade tier if Data Saver is on
        if (isSaveData) {
            tier = 'low';
            isLowEnd = true;
        }

        setCapabilities({
            isLowEnd,
            isReducedMotion,
            isSaveData,
            performanceTier: tier
        });

        // Listener for reduced motion changes
        const handleMotionChange = (e) => {
            setCapabilities(prev => ({ ...prev, isReducedMotion: e.matches }));
        };

        reducedMotionQuery.addEventListener('change', handleMotionChange);

        return () => {
            reducedMotionQuery.removeEventListener('change', handleMotionChange);
        };
    }, []);

    return capabilities;
};

export default useDeviceCapabilities;
