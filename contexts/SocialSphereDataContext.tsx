import React, { createContext, useContext, useMemo, ReactNode, useSyncExternalStore } from 'react';
import { User } from '../data/socialSphereTypes';
import { DataState, store } from '../data/store';

// The context will provide the full data state, a derived currentUser, and mutation methods
interface SocialSphereContextType extends DataState {
    currentUser: User | null;
    likePost: (postId: string) => void;
}

const SocialSphereContext = createContext<SocialSphereContextType | undefined>(undefined);

export const SocialSphereDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // useSyncExternalStore is the canonical way to subscribe to external, mutable data sources.
    const dataState = useSyncExternalStore(store.subscribe, store.getState);

    // For convenience, we derive the full currentUser object here so components don't have to.
    const currentUser = useMemo(() => {
        if (!dataState.currentUserId) return null;
        return dataState.users.find(u => u.id === dataState.currentUserId) ?? null;
    }, [dataState.currentUserId, dataState.users]);

    // The value provided to consuming components.
    const value: SocialSphereContextType = {
        ...dataState,
        currentUser,
        // Bind store methods to ensure 'this' context is correct if they use it.
        likePost: store.likePost.bind(store),
    };

    return (
        <SocialSphereContext.Provider value={value}>
            {children}
        </SocialSphereContext.Provider>
    );
};

// --- CUSTOM HOOK ---

export const useSocialSphereData = (): SocialSphereContextType => {
    const context = useContext(SocialSphereContext);
    if (context === undefined) {
        throw new Error('useSocialSphereData must be used within a SocialSphereDataProvider');
    }
    return context;
};
