import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getUserState, setUserState as saveUserState } from '../utils/typedStorage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Use typedStorage which handles corruption gracefully with automatic recovery
    const [userState, setUserState] = useState(() => getUserState());

    useEffect(() => {
        saveUserState(userState);
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
