import React, { createContext, useState, useContext, useEffect, useRef, useMemo, useCallback } from 'react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
    const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
        const saved = localStorage.getItem('sound_enabled');
        return saved !== null ? JSON.parse(saved) : true;
    });

    const audioContextRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('sound_enabled', JSON.stringify(isSoundEnabled));
    }, [isSoundEnabled]);

    const initAudioContext = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
    };

    const playChime = useCallback((type = 'success') => {
        if (!isSoundEnabled) return;

        initAudioContext();
        const ctx = audioContextRef.current;

        // Resume context if suspended (browser policy)
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === 'success') {
            // "Efficiency Chime": Ascending major triad arpeggio with a futuristic decay
            // C5 -> E5 -> G5
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, now); // C5
            oscillator.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
            oscillator.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

            oscillator.start(now);
            oscillator.stop(now + 0.6);
        } else if (type === 'click') {
            // Subtle UI click
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(800, now);
            gainNode.gain.setValueAtTime(0.05, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
        } else if (type === 'celebration') {
            // Triumphant celebration fanfare - ascending with sparkle
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, now); // C5
            oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
            oscillator.frequency.setValueAtTime(1046.5, now + 0.3); // C6 (octave up!)

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.25, now + 0.05);
            gainNode.gain.setValueAtTime(0.25, now + 0.3);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

            oscillator.start(now);
            oscillator.stop(now + 0.8);
        }
    }, [isSoundEnabled]);

    const toggleSound = useCallback(() => setIsSoundEnabled(prev => !prev), []);

    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        isSoundEnabled,
        toggleSound,
        playChime
    }), [isSoundEnabled, toggleSound, playChime]);

    return (
        <SoundContext.Provider value={value}>
            {children}
        </SoundContext.Provider>
    );
};
