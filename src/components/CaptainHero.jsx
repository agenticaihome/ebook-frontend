import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { useUser } from '../context/UserContext';
import useDeviceCapabilities from '../hooks/useDeviceCapabilities';

const CaptainHero = ({
    message,
    position = 'right', // 'left' | 'right' | 'center'
    size = 'md', // 'sm' | 'md' | 'lg'
    className = '',
    pose = 'default', // 'default' | 'thinking' | 'pointing' | 'celebrating' | 'working'
    imageSrc, // Optional override
    videoSrc, // Optional video override
    loading = "eager" // 'eager' | 'lazy'
}) => {
    const { userState, setUserState } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState('');
    const { isLowEnd, isReducedMotion } = useDeviceCapabilities();

    useEffect(() => {
        if (userState?.name) setTempName(userState.name);
    }, [userState?.name]);

    const handleNameSubmit = (e) => {
        e.preventDefault();
        setUserState(prev => ({ ...prev, name: tempName }));
        setIsEditing(false);
    };

    // Map poses to image files
    const poseImages = {
        default: '/assets/captain-efficiency-dark-transparent.webp',
        thinking: '/assets/captain-thinking-transparent.webp',
        pointing: '/assets/captain-pointing-transparent.webp',
        celebrating: '/assets/captain-celebrating-transparent.webp',
        working: '/assets/captain-working-transparent.webp'
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

    const getPersonaGreeting = () => {
        if (!userState?.persona) return "";
        switch (userState.persona) {
            case 'professional': return " Ready to optimize your workflow?";
            case 'parent': return " Ready to reclaim your sanity?";
            case 'student': return " Ready to hack your study schedule?";
            default: return "";
        }
    };

    const personalizedMessage = message ? message.replace(
        "I'm Captain Efficiency.",
        `I'm Captain Efficiency${userState?.name ? `, Agent ${userState.name}` : ''}.${getPersonaGreeting()}`
    ) : "";

    return (
        <div className={`flex items-center gap-4 md:gap-8 ${containerClasses[position]} ${className}`}>
            {/* Character Image or Video */}
            <m.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`relative flex-shrink-0 ${sizeClasses[size]}`}
                style={{
                    filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.4)) drop-shadow(0 0 40px rgba(6, 182, 212, 0.2))'
                }}
            >
                {/* Multi-layer radial glow effect - Disabled on low-end devices */}
                {!isLowEnd && !isReducedMotion && (
                    <>
                        <div className="absolute inset-0 bg-gradient-radial from-cyan-400/50 via-cyan-500/30 to-transparent rounded-full blur-3xl scale-150 animate-pulse" />
                        <div className="absolute inset-0 bg-gradient-radial from-blue-400/30 via-blue-500/20 to-transparent rounded-full blur-3xl scale-[1.8]" />
                    </>
                )}

                {videoSrc ? (
                    <div className="relative w-full h-full">
                        <video
                            src={videoSrc}
                            poster={finalImageSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="relative z-10 w-full h-full object-contain mix-blend-lighten"
                            style={{
                                filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.5)) contrast(1.1) brightness(1.1)',
                                maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
                                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
                            }}
                        />
                        {/* Overlay gradient to further blend edges */}
                        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-cyan-900/20 rounded-full z-20 pointer-events-none" />
                    </div>
                ) : (
                    <img
                        src={finalImageSrc}
                        alt="Captain Efficiency"
                        className="relative z-10 w-full h-full object-contain mix-blend-normal captain-idle"
                        loading={loading}
                        width={size === 'lg' ? 256 : size === 'md' ? 192 : 128}
                        height={size === 'lg' ? 256 : size === 'md' ? 192 : 128}
                        fetchpriority={loading === 'eager' ? 'high' : 'low'}
                        decoding={loading === 'eager' ? 'sync' : 'async'}
                        style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))' }}
                    />
                )}
            </m.div>

            {/* Message Bubble */}
            {message && (
                <m.div
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

                    <div className="flex items-center gap-2 mb-1">
                        <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">
                            Captain Efficiency
                        </div>
                    </div>

                    <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                        "{personalizedMessage}"
                    </p>

                    {(!userState?.name || isEditing) && (
                        <m.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 pt-3 border-t border-white/10"
                        >
                            <p className="text-xs text-cyan-300 mb-2 font-medium">
                                {isEditing ? "Update your alias:" : "To serve you better, what should I call you?"}
                            </p>
                            <form onSubmit={handleNameSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="bg-slate-900/50 border border-slate-600 rounded px-3 py-1.5 text-sm text-white focus:border-cyan-500 outline-none w-full placeholder-slate-500 transition-colors"
                                    aria-label="Enter your name"
                                    autoFocus={false}
                                />
                                <button
                                    type="submit"
                                    disabled={!tempName.trim()}
                                    className="text-xs bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded font-medium transition-colors whitespace-nowrap"
                                >
                                    {isEditing ? "Save" : "Confirm"}
                                </button>
                            </form>
                        </m.div>
                    )}
                </m.div>
            )}
        </div>
    );
};

export default React.memo(CaptainHero);
