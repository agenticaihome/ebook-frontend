import React from 'react';
import useDeviceCapabilities from '../../hooks/useDeviceCapabilities';

const BackgroundEffects = ({
    blob1Color = "bg-purple-900/30",
    blob2Color = "bg-teal-900/20"
}) => {
    const { isLowEnd, isReducedMotion } = useDeviceCapabilities();

    // On low-end devices or reduced motion, we skip the animated blobs entirely
    // or render a static, simpler background if needed.
    // For now, we'll just skip them to save GPU/CPU.
    if (isLowEnd || isReducedMotion) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className={`absolute top-20 right-10 w-96 h-96 ${blob1Color} rounded-full blur-3xl animate-pulse`} />
            <div className={`absolute bottom-0 left-10 w-64 h-64 ${blob2Color} rounded-full blur-3xl`} />
        </div>
    );
};

export default BackgroundEffects;
