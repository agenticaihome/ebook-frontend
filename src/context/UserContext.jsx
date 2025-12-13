import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userState, setUserState] = useState(() => {
        const saved = localStorage.getItem('agentic_user_state');
        return saved ? JSON.parse(saved) : {
            persona: 'general', // 'parent', 'professional', 'student', 'general'
            name: '',
            progress: {}, // { part1: 0, part2: 0 ... }
            unlockedBadges: [],
            quizResults: null,
            lastVisit: Date.now()
        };
    });

    useEffect(() => {
        localStorage.setItem('agentic_user_state', JSON.stringify(userState));
    }, [userState]);

    const updatePersona = (quizResults) => {
        let newPersona = 'general';
        const drain = quizResults.timeDrain;

        if (drain === 'household' || drain === 'decisions') newPersona = 'parent';
        if (drain === 'email' || drain === 'scheduling') newPersona = 'professional';
        if (drain === 'other') newPersona = 'student'; // Simplified mapping

        setUserState(prev => ({
            ...prev,
            persona: newPersona,
            quizResults
        }));
    };

    const unlockBadge = (badgeId) => {
        if (!userState.unlockedBadges.includes(badgeId)) {
            setUserState(prev => ({
                ...prev,
                unlockedBadges: [...prev.unlockedBadges, badgeId]
            }));
            return true; // Badge newly unlocked
        }
        return false;
    };

    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        userState,
        setUserState,
        updatePersona,
        unlockBadge
    }), [userState]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
