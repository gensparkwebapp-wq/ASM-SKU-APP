
// --- Enums / Type Aliases ---

export type UserRole = "user" | "moderator" | "admin";

export type PrivacyLevel = "public" | "friends" | "onlyMe";

export type ReactionType = "like" | "love" | "haha" | "wow" | "sad" | "angry";

export type PostAudience = PrivacyLevel;

export type NotificationType = "friend_request_received" | "friend_request_accepted" | "post_liked" | "post_commented" | "message_received" | "group_join_request_received" | "group_join_request_accepted";

export type FriendRequestStatus = "pending" | "accepted" | "declined" | "cancelled";

export type GroupPrivacy = 'public' | 'private';

export type GroupRole = 'member' | 'admin';

export type MediaKind = "image" | "video";

// --- Core Interfaces ---

export interface MediaAttachment {
    id: string;
    kind: MediaKind;
    url: string;
    order?: number;
}

export interface User {
    id: string;
    name: string;
    avatarUrl?: string;
    coverPhotoUrl?: string;
    shortBio?: string;
    work?: string;
    education?: string;
    location?: string;
    website?: string;
    createdAt: string; // ISO 8601 string
    role: UserRole;
    friendIds?: string[];
}

export interface Post {
    id: string;
    authorId: string;
    content: string;
    createdAt: string; // ISO 8601 string
    audience: PostAudience;
    likeCounts: Record<ReactionType, number>;
    likedByUserIds?: string[];
    mediaUrls?: string[]; // Deprecated, use attachments
    attachments?: MediaAttachment[];
    groupId?: string | null; // ID of the group this post belongs to
}

export interface Comment {
    id: string;
    postId: string;
    authorId: string;
    content: string;
    createdAt: string; // ISO 8601 string
    parentCommentId?: string | null;
}

export interface FriendRequest {
    id: string;
    fromUserId: string;
    toUserId: string;
    createdAt: string; // ISO 8601 string
    status: FriendRequestStatus;
}

export interface Friendship {
    id: string;
    userId1: string;
    userId2: string;
    createdAt: string; // ISO 8601 string
}

export interface Conversation {
    id: string;
    participantIds: string[];
    createdAt: string; // ISO 8601 string
    lastMessageAt: string; // ISO 8601 string
    lastMessagePreview?: string;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    createdAt: string; // ISO 8601 string
    readByUserIds: string[];
}

export interface Notification {
    id: string;
    userId: string; // The user who receives the notification
    type: NotificationType;
    createdAt: string; // ISO 8601 string
    read: boolean;
    data: { 
        actorUserId?: string;
        postId?: string;
        friendRequestId?: string;
        conversationId?: string;
        groupId?: string;
        groupRequestId?: string;
        message?: string;
        [key: string]: unknown;
     };
}

export interface Group {
    id: string;
    name: string;
    description?: string;
    privacy: GroupPrivacy;
    ownerId: string; // creator / main admin
    coverPhotoUrl: string;
    createdAt: string; // ISO 8601 string
}

export interface GroupMembership {
    id: string;
    groupId: string;
    userId: string;
    role: GroupRole;
    createdAt: string;
}

export interface GroupJoinRequest {
    id: string;
    groupId: string;
    userId: string;
    createdAt: string; // ISO 8601 string
    status: 'pending';
}
