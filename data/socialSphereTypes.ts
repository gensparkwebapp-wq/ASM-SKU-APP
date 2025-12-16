// --- Enums / Type Aliases ---

export type UserRole = "user" | "moderator" | "admin";

export type PrivacyLevel = "public" | "friends" | "onlyMe";

export type ReactionType = "like" | "love" | "haha" | "wow" | "sad" | "angry";

export type PostAudience = PrivacyLevel;

export type NotificationType = "friend_request" | "post_reaction" | "comment" | "message";

export type FriendRequestStatus = "pending" | "accepted" | "declined" | "cancelled";


// --- Core Interfaces ---

export interface User {
    id: string;
    name: string;
    avatarUrl?: string;
    shortBio?: string;
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
    mediaUrls?: string[];
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
    lastMessageAt: string; // ISO 8601 string
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    createdAt: string; // ISO 8601 string
    readByIds: string[];
}

export interface Notification {
    id: string;
    userId: string; // The user who receives the notification
    type: NotificationType;
    createdAt: string; // ISO 8601 string
    read: boolean;
    data: Record<string, unknown>; // Flexible data payload, e.g., { actorId: '...', postId: '...' }
}