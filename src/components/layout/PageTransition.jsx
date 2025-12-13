import React from 'react';
import { m } from 'framer-motion';

const PageTransition = ({ children }) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full"
        >
            {/* Subtle neon glow pulse on entry */}
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 0.8, times: [0, 0.5, 1] }}
                className="absolute inset-0 pointer-events-none z-50 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 mix-blend-screen"
            />
            {children}
        </m.div>
    );
};

export default PageTransition;
