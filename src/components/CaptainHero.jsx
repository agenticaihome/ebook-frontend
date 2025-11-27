import React from 'react';
import { motion } from 'framer-motion';

const CaptainHero = ({
    message,
    position = 'right', // 'left' | 'right' | 'center'
    size = 'md', // 'sm' | 'md' | 'lg'
    className = '',
    pose = 'default', // 'default' | 'thinking' | 'pointing' | 'celebrating' | 'working'
    imageSrc // Optional override
}) => {
    // Map poses to image files
    const poseImages = {
        default: '/assets/captain-efficiency-dark.png',
        thinking: '/assets/captain-thinking.png',
        pointing: '/assets/captain-pointing.png',
        celebrating: '/assets/captain-celebrating.png',
        working: '/assets/captain-working.png'
    };

    const finalImageSrc = imageSrc || poseImages[pose] || poseImages.default;

    const sizeClasses = {
        sm: 'w-24 h-24 md:w-32 md:h-32',
        md: 'w-32 h-32 md:w-48 md:h-48',
        lg: 'w-48 h-48 md:w-64 md:h-64'
    };

    const containerClasses = {
        left: 'flex-row',
        right: 'flex-row-reverse',
        center: 'flex-col'
    };

    return (
        <div className={`flex items-center gap-4 md:gap-8 ${containerClasses[position]} ${className}`}>
            {/* Character Image */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`relative flex-shrink-0 ${sizeClasses[size]}`}
            >
                <div className="absolute inset-0 bg-cyan-500/40 rounded-full blur-2xl animate-pulse scale-110" />
                <img
                    src={finalImageSrc}
                    alt="Captain Efficiency"
                    className="relative z-10 w-full h-full object-contain"
                />
            </motion.div>

            {/* Message Bubble */}
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative bg-slate-800/90 border border-cyan-500/30 p-4 md:p-6 rounded-2xl shadow-xl max-w-lg backdrop-blur-sm"
                >
                    {/* Speech Triangle */}
                    <div className={`absolute w-4 h-4 bg-slate-800/90 border-l border-b border-cyan-500/30 transform rotate-45 
                        ${position === 'left' ? '-left-2 top-1/2 -translate-y-1/2 border-r-0 border-t-0' : ''}
                        ${position === 'right' ? '-right-2 top-1/2 -translate-y-1/2 border-l-0 border-b-0 rotate-[225deg]' : ''}
                        ${position === 'center' ? '-top-2 left-1/2 -translate-x-1/2 border-b-0 border-r-0 rotate-[45deg]' : ''}
                    `} />

                    <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
                        Captain Efficiency
                    </div>
                    <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                        "{message}"
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default CaptainHero;
