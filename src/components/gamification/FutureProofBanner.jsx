import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';

/**
 * FutureProofBanner - Positioned near top of operations
 * Honest framing that feels like insider knowledge, not a disclaimer
 */
const FutureProofBanner = ({ 
    variant = 'default',
    children 
}) => {
    const variants = {
        default: {
            bg: 'from-cyan-900/30 via-purple-900/20 to-cyan-900/30',
            border: 'border-cyan-500/40',
            iconColor: 'text-cyan-400',
            textColor: 'text-cyan-100',
            accentColor: 'text-cyan-400',
            glow: 'shadow-cyan-500/20',
        },
        gold: {
            bg: 'from-yellow-900/30 via-amber-900/20 to-yellow-900/30',
            border: 'border-yellow-500/40',
            iconColor: 'text-yellow-400',
            textColor: 'text-yellow-100',
            accentColor: 'text-yellow-400',
            glow: 'shadow-yellow-500/20',
        },
    };

    const v = variants[variant];

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`
                relative overflow-hidden rounded-xl mb-8
                bg-gradient-to-r ${v.bg}
                border ${v.border}
                shadow-lg ${v.glow}
            `}
        >
            {/* Animated background shimmer */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: 'easeInOut',
                }}
            />

            {/* Content */}
            <div className="relative px-6 py-4 flex items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                    <motion.div
                        animate={{ 
                            y: [0, -3, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                    >
                        <Rocket className={v.iconColor} size={24} />
                    </motion.div>
                </div>

                {/* Text */}
                <div className="flex-1">
                    {children ? (
                        <p className={`text-sm ${v.textColor} leading-relaxed`}>
                            {children}
                        </p>
                    ) : (
                        <p className={`text-sm ${v.textColor} leading-relaxed`}>
                            <span className={`font-bold ${v.accentColor}`}>FUTURE-PROOF EDITION:</span>{' '}
                            The prompts you learn here work today with ChatGPT and Claude. 
                            When fully autonomous agents arrive{' '}
                            <span className={`font-medium ${v.accentColor}`}>(soon)</span>, 
                            you'll already know exactly how to use them.
                        </p>
                    )}
                </div>

                {/* Sparkle decoration */}
                <div className="flex-shrink-0 hidden md:block">
                    <Sparkles className={`${v.iconColor} opacity-50`} size={20} />
                </div>
            </div>

            {/* Corner accent */}
            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full`} />
        </motion.div>
    );
};

export default FutureProofBanner;
