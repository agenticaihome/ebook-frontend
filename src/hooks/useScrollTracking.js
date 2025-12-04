import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga4';

/**
 * Custom hook to track scroll depth milestones
 * Fires GA4 events at 25%, 50%, 75%, and 100% scroll depth
 */
export const useScrollTracking = () => {
    const milestones = useRef(new Set());

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollHeight > 0
                ? Math.round((window.scrollY / scrollHeight) * 100)
                : 0;

            // Track at 25%, 50%, 75%, 100% milestones
            [25, 50, 75, 100].forEach(milestone => {
                if (scrollPercent >= milestone && !milestones.current.has(milestone)) {
                    milestones.current.add(milestone);
                    ReactGA.event('scroll', {
                        percent_scrolled: milestone,
                        page_path: window.location.pathname
                    });
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Reset milestones when component unmounts (new page)
    useEffect(() => {
        return () => {
            milestones.current = new Set();
        };
    }, []);
};
