import React, { createContext, useContext, useMemo, ReactNode, useSyncExternalStore } from 'react';
import { User, ReactionType } from '../data/socialSphereTypes';
import { DataState, store } from '../data/store';

// --- TYPES ---
interface Actions {
    createPost: (content: string) => void;
    addComment: (postId: string, content: string) => void;
    togglePostReaction: (postId: string, reaction: ReactionType) => void;
    markAllNotificationsRead: () => void;
    login: (userId: string) => void;
    logout: () => void;
    registerUser: (name: string, options?: { avatarUrl?: string; shortBio?: string }) => User;
}

interface AugmentedState extends DataState {
    currentUser: User | null;
}

interface DataContextType {
    state: AugmentedState;
    actions: Actions;
}

// --- CONTEXT ---
const DataContext = createContext<DataContextType | undefined>(undefined);

// --- PROVIDER ---
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dataState = useSyncExternalStore(store.subscribe, store.getState);

    const currentUser = useMemo(() => {
        if (!dataState.currentUserId) return null;
        return dataState.users.find(u => u.id === dataState.currentUserId) ?? null;
    }, [dataState.currentUserId, dataState.users]);

    const state: AugmentedState = useMemo(() => ({
        ...dataState,
        currentUser,
    }), [dataState, currentUser]);

    const actions: Actions = useMemo(() => ({
        createPost: store.createPost.bind(store),
        addComment: store.addComment.bind(store),
        togglePostReaction: store.togglePostReaction.bind(store),
        markAllNotificationsRead: store.markAllNotificationsRead.bind(store),
        login: store.login.bind(store),
        logout: store.logout.bind(store),
        registerUser: store.registerUser.bind(store),
    }), []);

    const value = useMemo(() => ({ state, actions }), [state, actions]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

// --- HOOK ---
export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};