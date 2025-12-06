import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';

/**
 * ScrollProgress - Shows reading progress as a thin amber bar at top of viewport
 * Sticks to top, shows percentage of page scrolled
 */
const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(scrollPercent, 100));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-slate-900/50 backdrop-blur-sm">
            <m.div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
            />
        </div>
    );
};

export default ScrollProgress;
