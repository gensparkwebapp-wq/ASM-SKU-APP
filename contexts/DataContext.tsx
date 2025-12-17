
import React, { createContext, useContext, useMemo, ReactNode, useSyncExternalStore } from 'react';
import { User, ReactionType, Notification, GroupPrivacy, Group, MediaAttachment } from '../data/socialSphereTypes';
import { DataState, store } from '../data/store';

// --- TYPES ---
interface Actions {
    createPost: (content: string, options?: { groupId?: string; attachments?: MediaAttachment[] }) => void;
    addComment: (postId: string, content: string) => void;
    togglePostReaction: (postId: string, reaction: ReactionType) => void;
    markNotificationRead: (notificationId: string) => void;
    markAllNotificationsRead: () => void;
    login: (userId: string) => void;
    logout: () => void;
    registerUser: (name: string, options?: { avatarUrl?: string; shortBio?: string }) => User;
    updateUserProfile: (userId: string, data: Partial<User>) => void;
    sendFriendRequest: (toUserId: string) => void;
    respondToFriendRequest: (requestId: string, accept: boolean) => void;
    cancelFriendRequest: (requestId: string) => void;
    unfriend: (friendId: string) => void;
    startConversation: (withUserId: string) => string;
    sendMessage: (conversationId: string, content: string) => void;
    markConversationRead: (conversationId: string) => void;
    createGroup(input: { name: string; description?: string; privacy: GroupPrivacy; coverPhotoUrl?: string }): Group | null;
    joinGroup: (groupId: string) => void;
    leaveGroup: (groupId: string) => void;
    respondToJoinRequest: (requestId: string, accept: boolean) => void;
    rejectJoinRequest: (requestId: string) => void;
}

interface AugmentedState extends DataState {
    currentUser: User | null;
    currentUserNotifications: Notification[];
    unreadCount: number;
    unreadMessagesCount: number;
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

    const currentUserNotifications = useMemo(() => {
        if (!dataState.currentUserId) return [];
        return dataState.notifications
            .filter(n => n.userId === dataState.currentUserId)
            .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [dataState.currentUserId, dataState.notifications]);

    const unreadCount = useMemo(() => {
        return currentUserNotifications.filter(n => !n.read).length;
    }, [currentUserNotifications]);

    const unreadMessagesCount = useMemo(() => {
        if (!dataState.currentUserId) return 0;
        
        const userConversationIds = new Set(dataState.conversations
            .filter(c => c.participantIds.includes(dataState.currentUserId!))
            .map(c => c.id)
        );

        return dataState.messages.filter(msg =>
            userConversationIds.has(msg.conversationId) &&
            msg.senderId !== dataState.currentUserId &&
            !msg.readByUserIds.includes(dataState.currentUserId!)
        ).length;
    }, [dataState.currentUserId, dataState.conversations, dataState.messages]);

    const state: AugmentedState = useMemo(() => ({
        ...dataState,
        currentUser,
        currentUserNotifications,
        unreadCount,
        unreadMessagesCount,
    }), [dataState, currentUser, currentUserNotifications, unreadCount, unreadMessagesCount]);

    const actions: Actions = useMemo(() => ({
        createPost: store.createPost.bind(store),
        addComment: store.addComment.bind(store),
        togglePostReaction: store.togglePostReaction.bind(store),
        markNotificationRead: store.markNotificationRead.bind(store),
        markAllNotificationsRead: store.markAllNotificationsRead.bind(store),
        login: store.login.bind(store),
        logout: store.logout.bind(store),
        registerUser: store.registerUser.bind(store),
        updateUserProfile: store.updateUserProfile.bind(store),
        sendFriendRequest: store.sendFriendRequest.bind(store),
        respondToFriendRequest: store.respondToFriendRequest.bind(store),
        cancelFriendRequest: store.cancelFriendRequest.bind(store),
        unfriend: store.unfriend.bind(store),
        startConversation: store.startConversation.bind(store),
        sendMessage: store.sendMessage.bind(store),
        markConversationRead: store.markConversationRead.bind(store),
        createGroup: store.createGroup.bind(store),
        joinGroup: store.joinGroup.bind(store),
        leaveGroup: store.leaveGroup.bind(store),
        respondToJoinRequest: store.respondToJoinRequest.bind(store),
        rejectJoinRequest: store.rejectJoinRequest.bind(store),
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
