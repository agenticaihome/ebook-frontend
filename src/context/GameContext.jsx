import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { agents } from '../data/agentData';

const GameContext = createContext();

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};

const STORAGE_KEY = 'agentic-rpg-state';

const INITIAL_STATE = {
    xp: 0,
    collectedCards: [], // Array of card IDs
    completedOperations: [], // Array of operation IDs (e.g., 'op_1')
    unlockedOperations: ['op_1'], // Start with Op 1 unlocked
    achievements: [],
};

export const RANKS = [
    { id: 1, name: 'Civilian', minOps: 0 },
    { id: 2, name: 'Recruit', minOps: 1 },
    { id: 3, name: 'Operator', minOps: 4 },
    { id: 4, name: 'Specialist', minOps: 8 },
    { id: 5, name: 'Commander', minOps: 12 },
    { id: 6, name: 'Life OS Master', minOps: 16 },
];

export const GameProvider = ({ children }) => {
    const [state, setState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_STATE;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const addXp = (amount) => {
        setState((prev) => ({ ...prev, xp: prev.xp + amount }));
    };

    const collectCard = (cardId) => {
        if (!state.collectedCards.includes(cardId)) {
            setState((prev) => ({
                ...prev,
                collectedCards: [...prev.collectedCards, cardId],
                xp: prev.xp + 25, // 25 XP per card
            }));
            return true; // Indicates new card
        }
        return false;
    };

    const completeOperation = (opId) => {
        if (!state.completedOperations.includes(opId)) {
            setState((prev) => {
                const nextOpNum = parseInt(opId.split('_')[1]) + 1;
                const nextOpId = `op_${nextOpNum}`;

                return {
                    ...prev,
                    completedOperations: [...prev.completedOperations, opId],
                    unlockedOperations: [...prev.unlockedOperations, nextOpId],
                    xp: prev.xp + 100, // 100 XP per operation
                };
            });
        }
    };

    const unlockOperation = (opId) => {
        if (!state.unlockedOperations.includes(opId)) {
            setState((prev) => ({
                ...prev,
                unlockedOperations: [...prev.unlockedOperations, opId],
            }));
        }
    };

    const getRank = () => {
        const opsCount = state.completedOperations.length;
        // Find the highest rank met
        return RANKS.slice().reverse().find(r => opsCount >= r.minOps) || RANKS[0];
    };

    const resetProgress = () => {
        if (window.confirm('Are you sure you want to reset your mission progress? This cannot be undone.')) {
            setState(INITIAL_STATE);
        }
    };

    // Memoize the context value to prevent re-renders
    const value = useMemo(() => ({
        ...state,
        addXp,
        collectCard,
        completeOperation,
        unlockOperation,
        getRank,
        resetProgress,
        allAgents: agents,
    }), [state]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

