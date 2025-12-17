import { DataState } from '../data/store';
import { Group, GroupMembership, User, GroupJoinRequest } from '../data/socialSphereTypes';

/**
 * Returns the membership record for a specific user in a specific group, if it exists.
 */
export const getMembershipForUserInGroup = (state: DataState, userId: string, groupId: string): GroupMembership | undefined => {
    return state.groupMemberships.find(m => m.userId === userId && m.groupId === groupId);
};

/**
 * Returns a list of User objects who are members of the specified group.
 */
export const getMembersOfGroup = (state: DataState, groupId: string): User[] => {
    const memberIds = state.groupMemberships
        .filter(m => m.groupId === groupId)
        .map(m => m.userId);
    return state.users.filter(u => memberIds.includes(u.id));
};

/**
 * Returns a list of Groups that the specified user is a member of.
 */
export const getGroupsForUser = (state: DataState, userId: string): Group[] => {
    const groupIds = state.groupMemberships
        .filter(m => m.userId === userId)
        .map(m => m.groupId);
    return state.groups.filter(g => groupIds.includes(g.id));
};

/**
 * Returns a list of pending join requests for the specified group.
 */
export const getPendingJoinRequestsForGroup = (state: DataState, groupId: string): GroupJoinRequest[] => {
    return state.groupJoinRequests.filter(r => r.groupId === groupId && r.status === 'pending');
};

/**
 * Returns a list of groups visible to the user:
 * - Public groups
 * - Private groups where the user is a member
 */
export const getGroupsUserCanSee = (state: DataState, userId?: string | null): Group[] => {
    if (!userId) {
        return state.groups.filter(g => g.privacy === 'public');
    }
    
    const userGroupIds = new Set(
        state.groupMemberships
            .filter(m => m.userId === userId)
            .map(m => m.groupId)
    );
        
    return state.groups.filter(g => g.privacy === 'public' || userGroupIds.has(g.id));
};
