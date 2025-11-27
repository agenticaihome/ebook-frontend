import React from 'react';
import { motion } from 'framer-motion';

const CaptainHero = ({
    message,
    position = 'right', // 'left' | 'right' | 'center'
    size = 'md', // 'sm' | 'md' | 'lg'
    className = ''
}) => {
    const sizeClasses = {
        sm: 'w-32',
        md: 'w-48',
        lg: 'w-64'
    };

    const floatAnimation = {
        y: [0, -15, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const glowAnimation = {
        boxShadow: [
            "0 0 20px rgba(0, 221, 221, 0.2)",
            "0 0 40px rgba(0, 221, 221, 0.4)",
            "0 0 20px rgba(0, 221, 221, 0.2)"
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <div className={`relative flex flex-col items-center ${className}`}>
            {/* Speech Bubble */}
            {message && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    className={`
            mb-4 bg-white rounded-2xl p-4 shadow-xl border-2 border-cyan-400 
            relative max-w-xs text-center z-10
            after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 
            after:-translate-x-1/2 after:border-l-[10px] after:border-l-transparent 
            after:border-r-[10px] after:border-r-transparent after:border-t-[10px] 
            after:border-t-white
          `}
                >
                    <p className="text-slate-800 font-medium text-sm">{message}</p>
                </motion.div>
            )}

            {/* Hero Image */}
            <motion.div
                animate={floatAnimation}
                className={`${sizeClasses[size]} relative z-0`}
            >
                {/* Glow Effect behind */}
                <motion.div
                    animate={glowAnimation}
                    className="absolute inset-4 bg-cyan-400 rounded-full blur-2xl opacity-30 -z-10"
                />

                <img
                    src="/assets/captain-efficiency.png"
                    alt="Captain Efficiency"
                    className="w-full h-auto drop-shadow-2xl"
                />
            </motion.div>
        </div>
    );
};

export default CaptainHero;
