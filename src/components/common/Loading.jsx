import React from 'react';
import { motion } from 'framer-motion';

/**
 * Loading - Captain Efficiency themed loading state
 * Makes waiting feel like part of the experience
 */
const Loading = ({ message = "Loading..." }) => {
    // Fun loading messages that rotate
    const loadingMessages = [
        "Deploying agents...",
        "Organizing your life...",
        "Loading your content...",
        "Almost there...",
        "Loading awesome stuff..."
    ];

    // Use provided message or pick a random fun one
    const displayMessage = message === "Loading..."
        ? loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
        : message;

    return (
        <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center gap-6 p-4">
            {/* Captain Efficiency with floating animation */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative"
            >
                {/* Glow effect behind Captain Efficiency */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-xl scale-150" />

                <img
                    src="/assets/captain-pointing-transparent.webp"
                    alt="Captain Efficiency"
                    className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10"
                />
            </motion.div>

            {/* Loading dots */}
            <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                        className="w-3 h-3 rounded-full bg-teal-500"
                    />
                ))}
            </div>

            {/* Message */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-300 text-sm md:text-base font-medium"
            >
                {displayMessage}
            </motion.p>
        </div>
    );
};

export default Loading;
