/**
 * useGameAudio - Premium Game Audio Hook
 * 
 * The Agentic AI Sound Identity:
 * - Clean, soft, modern
 * - Futuristic but friendly
 * - Apple/Duolingo inspired
 * - Light chimes, soft digital blips, gentle whooshes
 * 
 * Uses Web Audio API for precise, low-latency sounds
 * with no external audio file dependencies.
 */

import { useCallback, useRef, useEffect, useState } from 'react';

// Audio Context singleton (shared across all game instances)
let audioContextInstance = null;

const getAudioContext = () => {
    if (!audioContextInstance) {
        try {
            audioContextInstance = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            return null;
        }
    }
    return audioContextInstance;
};

// Unlock audio on first user interaction (required for mobile)
const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
        ctx.resume();
    }
};

// Add unlock listeners once
if (typeof window !== 'undefined') {
    ['touchstart', 'touchend', 'mousedown', 'keydown'].forEach(event => {
        document.addEventListener(event, unlockAudio, { once: true, passive: true });
    });
}

/**
 * Sound definitions - each sound is a function that creates the waveform
 * These are synthetically generated, not audio files
 */
const SOUND_GENERATORS = {
    // Soft tap/click - light digital tap for button presses
    tap: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
        osc.type = 'sine';

        gainNode.gain.setValueAtTime(gain * 0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        osc.start();
        osc.stop(ctx.currentTime + 0.08);
    },

    // Score increment - gentle upward chime
    score: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.frequency.setValueAtTime(523, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.05); // E5
        osc.type = 'sine';

        gainNode.gain.setValueAtTime(gain * 0.12, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    },

    // Combo hit - quick satisfying ping
    combo: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08); // E6
        osc.type = 'sine';

        gainNode.gain.setValueAtTime(gain * 0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

        osc.start();
        osc.stop(ctx.currentTime + 0.12);
    },

    // Critical hit - short triumphant ding (Duolingo-esque)
    critical: (ctx, gain) => {
        [523, 659, 784].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            const startTime = ctx.currentTime + i * 0.04;
            osc.frequency.setValueAtTime(freq, startTime);
            osc.type = 'sine';

            gainNode.gain.setValueAtTime(gain * 0.1, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

            osc.start(startTime);
            osc.stop(startTime + 0.15);
        });
    },

    // Passed obstacle - light whoosh
    pass: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.12);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.12);

        gainNode.gain.setValueAtTime(gain * 0.06, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

        osc.start();
        osc.stop(ctx.currentTime + 0.12);
    },

    // Near miss - lower warning tone (exciting, not punishing)
    nearMiss: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.1);
        osc.type = 'triangle';

        gainNode.gain.setValueAtTime(gain * 0.12, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    },

    // Collision/failure - soft, non-irritating failure cue
    fail: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.15);
        osc.type = 'sine';

        gainNode.gain.setValueAtTime(gain * 0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    },

    // Game over - quick clean end
    gameOver: (ctx, gain) => {
        [392, 330, 262].forEach((freq, i) => { // G4, E4, C4 descending
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            const startTime = ctx.currentTime + i * 0.12;
            osc.frequency.setValueAtTime(freq, startTime);
            osc.type = 'sine';

            gainNode.gain.setValueAtTime(gain * 0.12, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

            osc.start(startTime);
            osc.stop(startTime + 0.25);
        });
    },

    // New high score - happy celebratory chime
    highScore: (ctx, gain) => {
        [523, 659, 784, 1047].forEach((freq, i) => { // C5, E5, G5, C6
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            const startTime = ctx.currentTime + i * 0.08;
            osc.frequency.setValueAtTime(freq, startTime);
            osc.type = 'sine';

            gainNode.gain.setValueAtTime(gain * 0.12, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
    },

    // Game start - futuristic quick swish
    start: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        osc.type = 'sine';

        gainNode.gain.setValueAtTime(gain * 0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    },

    // Power-up collected - sparkly pickup sound
    powerUp: (ctx, gain) => {
        [880, 1047, 1319].forEach((freq, i) => { // A5, C6, E6
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            const startTime = ctx.currentTime + i * 0.03;
            osc.frequency.setValueAtTime(freq, startTime);
            osc.type = 'sine';

            gainNode.gain.setValueAtTime(gain * 0.08, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

            osc.start(startTime);
            osc.stop(startTime + 0.15);
        });
    },

    // Correct action (swipe right, good choice)
    correct: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554, ctx.currentTime + 0.06);
        osc.type = 'sine';

        gainNode.gain.setValueAtTime(gain * 0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

        osc.start();
        osc.stop(ctx.currentTime + 0.12);
    },

    // Wrong action (swipe wrong way)
    wrong: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.12);
        osc.type = 'triangle';

        gainNode.gain.setValueAtTime(gain * 0.12, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    },

    // Jump/flap sound
    jump: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
        osc.type = 'sine';

        gainNode.gain.setValueAtTime(gain * 0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    },

    // Shield/block sound
    shield: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);
        osc.type = 'square';

        gainNode.gain.setValueAtTime(gain * 0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    },

    // Zap/fire sound
    zap: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(500, ctx.currentTime);

        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
        osc.type = 'sawtooth';

        gainNode.gain.setValueAtTime(gain * 0.06, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

        osc.start();
        osc.stop(ctx.currentTime + 0.12);
    },

    // Frenzy mode activated
    frenzy: (ctx, gain) => {
        [440, 554, 659, 880].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            const startTime = ctx.currentTime + i * 0.05;
            osc.frequency.setValueAtTime(freq, startTime);
            osc.type = 'sine';

            gainNode.gain.setValueAtTime(gain * 0.08, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

            osc.start(startTime);
            osc.stop(startTime + 0.2);
        });
    },

    // Countdown tick
    tick: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        osc.type = 'sine';

        gainNode.gain.setValueAtTime(gain * 0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

        osc.start();
        osc.stop(ctx.currentTime + 0.03);
    },

    // Time warning (last 10 seconds)
    timeWarning: (ctx, gain) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.type = 'triangle';

        gainNode.gain.setValueAtTime(gain * 0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        osc.start();
        osc.stop(ctx.currentTime + 0.08);
    }
};

// Storage key for sound preference
const SOUND_PREF_KEY = 'agenticai_game_sound_enabled';

/**
 * useGameAudio Hook
 * 
 * @returns {Object} Audio control methods and state
 */
export const useGameAudio = () => {
    // Initialize from localStorage
    const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
        if (typeof window === 'undefined') return true;
        const stored = localStorage.getItem(SOUND_PREF_KEY);
        return stored === null ? true : stored === 'true';
    });

    const [volume, setVolume] = useState(0.7); // 0-1 scale
    const lastPlayedRef = useRef({}); // Debounce tracking

    // Persist preference
    useEffect(() => {
        localStorage.setItem(SOUND_PREF_KEY, String(isSoundEnabled));
    }, [isSoundEnabled]);

    // Play a sound by name
    const playSound = useCallback((soundName, options = {}) => {
        if (!isSoundEnabled) return;

        const { debounce = 30, volumeOverride } = options;
        const ctx = getAudioContext();

        if (!ctx || !SOUND_GENERATORS[soundName]) {
            return;
        }

        // Debounce rapid-fire sounds
        const now = Date.now();
        if (lastPlayedRef.current[soundName] && now - lastPlayedRef.current[soundName] < debounce) {
            return;
        }
        lastPlayedRef.current[soundName] = now;

        // Resume context if suspended
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        try {
            const finalVolume = volumeOverride ?? volume;
            SOUND_GENERATORS[soundName](ctx, finalVolume);
        } catch (e) {
            // Silently fail - don't break game for audio issues
            console.warn('Audio playback error:', e);
        }
    }, [isSoundEnabled, volume]);

    // Toggle sound
    const toggleSound = useCallback(() => {
        setIsSoundEnabled(prev => !prev);
    }, []);

    // Mute component - reusable UI button
    const SoundToggle = useCallback(({ className = '' }) => (
        <button
            onClick={toggleSound}
            className={`p-2 rounded-lg transition-all ${isSoundEnabled
                    ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                    : 'bg-slate-700/50 text-slate-500 hover:bg-slate-700'
                } ${className}`}
            title={isSoundEnabled ? 'Mute sounds' : 'Enable sounds'}
            aria-label={isSoundEnabled ? 'Mute sounds' : 'Enable sounds'}
        >
            {isSoundEnabled ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="22" y1="9" x2="16" y2="15" />
                    <line x1="16" y1="9" x2="22" y2="15" />
                </svg>
            )}
        </button>
    ), [isSoundEnabled, toggleSound]);

    return {
        playSound,
        isSoundEnabled,
        setIsSoundEnabled,
        toggleSound,
        volume,
        setVolume,
        SoundToggle
    };
};

export default useGameAudio;
