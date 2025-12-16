import { User, Post, Comment, Conversation, Message, ReactionType } from './socialSphereTypes';

// --- USERS ---
const currentUser: User = {
    id: 'user-0',
    name: 'Arjun Mehta',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80',
    createdAt: new Date('2023-01-15T09:00:00Z').toISOString(),
    role: 'admin',
    shortBio: 'Sound engineer & music producer. Chasing the perfect mix.'
};

const users: Record<string, User> = {
    [currentUser.id]: currentUser,
    'user-1': { id: 'user-1', name: 'Maria Garcia', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80', createdAt: new Date('2023-02-20T14:30:00Z').toISOString(), role: 'user', shortBio: 'Music lover. Creator.' },
    'user-2': { id: 'user-2', name: 'Alex Johnson', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80', createdAt: new Date('2023-03-10T18:45:00Z').toISOString(), role: 'user', shortBio: 'Singer and songwriter.' },
    'user-3': { id: 'user-3', name: 'David Chen', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80', createdAt: new Date('2023-04-05T11:20:00Z').toISOString(), role: 'moderator', shortBio: 'Rock guitarist.' },
};

// --- POSTS ---
const defaultLikeCounts: Record<ReactionType, number> = { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 };

const posts: Post[] = [
    {
        id: 'post-1',
        authorId: 'user-1',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        content: 'Had an amazing time at the concert last night! The energy was incredible.',
        mediaUrls: ['https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=600&fit=crop'],
        audience: 'public',
        likeCounts: { ...defaultLikeCounts, like: 125, love: 10 },
    },
    {
        id: 'post-2',
        authorId: 'user-2',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        content: 'Beautiful evening for a live acoustic session. Thanks to everyone who came out!',
        mediaUrls: ['https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=800&h=600&fit=crop'],
        audience: 'public',
        likeCounts: { ...defaultLikeCounts, like: 340, love: 50, wow: 5 },
    },
    {
        id: 'post-3',
        authorId: 'user-3',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        content: 'New gear day! This beauty sounds absolutely insane. Can\'t wait to record with it. #guitar #newgear',
        mediaUrls: ['https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&h=600&fit=crop'],
        audience: 'friends',
        likeCounts: { ...defaultLikeCounts, like: 98 },
    },
    {
        id: 'post-4',
        authorId: 'user-0',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        content: 'Mixing sessions are my favorite kind of therapy. Finding the right balance is everything.',
        audience: 'friends',
        likeCounts: { ...defaultLikeCounts, like: 72, wow: 4 },
    },
];


// --- COMMENTS ---
const comments: Comment[] = [
    {
        id: 'comment-1',
        postId: 'post-1',
        authorId: 'user-2',
        content: 'It was amazing!',
        createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'comment-2',
        postId: 'post-1',
        authorId: 'user-3',
        content: 'Wish I could have been there!',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'comment-3',
        postId: 'post-2',
        authorId: 'user-0',
        content: 'Sounded great, Alex!',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'comment-4',
        postId: 'post-2',
        authorId: 'user-1',
        content: 'So bummed I missed it!',
        createdAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
    },
];

// --- CONVERSATIONS & MESSAGES ---
const conversations: Conversation[] = [
    {
        id: 'convo-1',
        participantIds: ['user-0', 'user-1'],
        lastMessageAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    },
    {
        id: 'convo-2',
        participantIds: ['user-0', 'user-2'],
        lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    }
];

const messages: Message[] = [
    {
        id: 'msg-1',
        conversationId: 'convo-1',
        senderId: 'user-0',
        content: 'Hey! Are we still on for tomorrow?',
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        readByIds: ['user-0', 'user-1']
    },
    {
        id: 'msg-2',
        conversationId: 'convo-1',
        senderId: 'user-1',
        content: 'Yep, absolutely! Looking forward to it.',
        createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
        readByIds: ['user-0', 'user-1']
    },
     {
        id: 'msg-3',
        conversationId: 'convo-1',
        senderId: 'user-0',
        content: 'Sounds good! See you then.',
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        readByIds: ['user-0', 'user-1']
    },
     {
        id: 'msg-4',
        conversationId: 'convo-2',
        senderId: 'user-2',
        content: 'Yeah, I can send the file over...',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        readByIds: ['user-0', 'user-2']
    },
];

// --- EXPORTS ---
export {
    currentUser as seedCurrentUser,
    users as seedUsers,
    posts as seedPosts,
    comments as seedComments,
    conversations as seedConversations,
    messages as seedMessages
};