// FIX: DataState is not exported from socialSphereTypes. It's exported from store.
import { User, FriendRequest } from '../data/socialSphereTypes';
import type { DataState } from '../data/store';

export type RelationshipStatus = "self" | "friends" | "incoming_request" | "outgoing_request" | "none" | "not_logged_in";

export interface Relationship {
    status: RelationshipStatus;
    request?: FriendRequest;
}

export function getFriendsOfUser(userId: string, state: DataState): User[] {
    const user = state.users.find(u => u.id === userId);
    if (!user || !user.friendIds) return [];
    
    const friendIds = new Set(user.friendIds);
    return state.users.filter(u => friendIds.has(u.id));
}

export function getPendingIncomingRequests(userId: string, state: DataState): FriendRequest[] {
    return state.friendRequests.filter(req => req.toUserId === userId && req.status === 'pending');
}

export function getPendingOutgoingRequests(userId: string, state: DataState): FriendRequest[] {
    return state.friendRequests.filter(req => req.fromUserId === userId && req.status === 'pending');
}

export function getRelationshipStatus(currentUserId: string | null | undefined, otherUserId: string | null | undefined, state: DataState): Relationship {
    if (!currentUserId) {
        return { status: 'not_logged_in' };
    }
    if (!otherUserId || currentUserId === otherUserId) {
        return { status: 'self' };
    }

    const currentUser = state.users.find(u => u.id === currentUserId);
    if (currentUser?.friendIds?.includes(otherUserId)) {
        return { status: 'friends' };
    }

    const outgoingRequest = state.friendRequests.find(req => req.fromUserId === currentUserId && req.toUserId === otherUserId && req.status === 'pending');
    if (outgoingRequest) {
        return { status: 'outgoing_request', request: outgoingRequest };
    }

    const incomingRequest = state.friendRequests.find(req => req.fromUserId === otherUserId && req.toUserId === currentUserId && req.status === 'pending');
    if (incomingRequest) {
        return { status: 'incoming_request', request: incomingRequest };
    }

    return { status: 'none' };
}
