
import { User, Post, Comment, Conversation, Message, ReactionType, FriendRequest, Group, GroupJoinRequest, GroupMembership } from './socialSphereTypes';

// --- USERS ---
const currentUser: User = {
    id: 'user-0',
    name: 'Arjun Mehta',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD6sDLpT9V49rPQFWOJeVbH3vXCURSguXOhM1YHS5tCcrMTwI0if2ZgGDnAeL4LlZdsoOQ1oJfcZDkgK2ndwbIz-ul5N6pxas2VaTpVBpS8NDj6oUF2ME0m2xwPFN8ozA12nhGWlhHM9ArtHX87-gkCPuJy8VeNMe8ta0G9MNpel7ZUUYwoujrbD-9tpNTkreGvTmwoLXNBCXP4CQknX_73HDR5wbYnMs21G9QKsEitUedyzf9h71iskUM9ecl890rdT1KzqWNBAI',
    coverPhotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAASzMBg0-M3WaeQkZmBZ9axoqCWB_KnbEyFoboyuRGrxwvOUfeOj1FEvqaFN3PZqGzTOWllwsLJk7fKeKWnWaiqrHRa2GnAAI3srk3uIdESrbl4WsjnQGRuAPMJhKhouvzBNrC1iyzxGKFL_klrZOuCHXi2Cztacp07HuOB-rchUYviHwSDXeFrMEqXbr-vK8pQHseUHMVCd83wi8Lm9PWAxZlx99qVR5W8p86GDEtdVIX7vJH9TJi_lS7MSCUVFaM1dHY1FGFZ74',
    createdAt: new Date('2023-01-15T09:00:00Z').toISOString(),
    role: 'admin',
    shortBio: 'Digital Creator 📸 | Traveler ✈️ | Coffee enthusiast ☕️',
    work: 'Director at Design Studio',
    education: 'Studied at University of Arts',
    location: 'Mumbai, Maharashtra',
    website: 'arjunmehta.design',
    friendIds: ['user-1', 'user-2'],
};

const users: Record<string, User> = {
    [currentUser.id]: currentUser,
    'user-1': { id: 'user-1', name: 'Maria Garcia', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80', createdAt: new Date('2023-02-20T14:30:00Z').toISOString(), role: 'user', shortBio: 'Music lover. Creator.', friendIds: ['user-0'] },
    'user-2': { id: 'user-2', name: 'Alex Johnson', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80', createdAt: new Date('2023-03-10T18:45:00Z').toISOString(), role: 'user', shortBio: 'Singer and songwriter.', friendIds: ['user-0', 'user-3'] },
    'user-3': { id: 'user-3', name: 'David Chen', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80', createdAt: new Date('2023-04-05T11:20:00Z').toISOString(), role: 'moderator', shortBio: 'Rock guitarist.', friendIds: ['user-2'] },
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
        likeCounts: { ...defaultLikeCounts, like: 2, love: 10 },
        likedByUserIds: ['user-0', 'user-2'],
    },
    {
        id: 'post-group-1',
        authorId: 'user-0',
        groupId: 'group-1',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        content: 'Hey @AbletonLovers! I just discovered this amazing new granular synthesis VST. Has anyone tried it?',
        audience: 'public',
        likeCounts: { ...defaultLikeCounts, like: 1 },
        likedByUserIds: ['user-1'],
    },
    {
        id: 'post-2',
        authorId: 'user-2',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        content: 'Beautiful evening for a live acoustic session. Thanks to everyone who came out!',
        mediaUrls: ['https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=800&h=600&fit=crop'],
        audience: 'public',
        likeCounts: { ...defaultLikeCounts, like: 1, love: 50, wow: 5 },
        likedByUserIds: ['user-1'],
    },
     {
        id: 'post-group-2',
        authorId: 'user-2',
        groupId: 'group-2',
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        content: 'For all the songwriters, what\'s your process for overcoming writer\'s block?',
        audience: 'public',
        likeCounts: { ...defaultLikeCounts, like: 0 },
        likedByUserIds: [],
    },
    {
        id: 'post-3',
        authorId: 'user-3',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        content: 'New gear day! This beauty sounds absolutely insane. Can\'t wait to record with it. #guitar #newgear',
        mediaUrls: ['https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&h=600&fit=crop'],
        audience: 'friends',
        likeCounts: { ...defaultLikeCounts, like: 0 },
        likedByUserIds: [],
    },
    {
        id: 'post-4',
        authorId: 'user-0',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        content: 'Had an amazing weekend hiking in Yosemite! The views were absolutely breathtaking. 🌲🏔️ #Nature #Hiking #Yosemite',
        mediaUrls: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBRaEOVjluKZDrTR_VfCQ-csMj4wGxa3SK2iNP9jjNrTjgldZn8FnAV5FgErlVx6Uno5wn4IiUntVRn3aJtSTHLEn3Cd3LDEbRuU_yb3XWxt9t0XZvspKhkqYAnDJuotNObJm7yq4z7oA6lop1G_71VAqtthNUNsDIMa6eJRiapx5ugeRBQWYDOWnN1D4d1eEXo-ULeRYCL8jE_XR_ninJH59sQX_sbGv9GOZ93ZUEAWve1OhfZlMoagcTdfOWkZ33RttvanGwpFjE'],
        audience: 'friends',
        likeCounts: { ...defaultLikeCounts, like: 245, wow: 4 },
        likedByUserIds: ['user-1', 'user-3'],
    },
    {
        id: 'post-5',
        authorId: 'user-0',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        content: 'Just updated my portfolio with some new design case studies. Check it out at the link in my bio! 🚀 Let me know what you think.',
        audience: 'public',
        likeCounts: { ...defaultLikeCounts, like: 89 },
        likedByUserIds: ['user-2'],
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

// --- FRIEND REQUESTS ---
const friendRequests: FriendRequest[] = [
    {
        id: 'fr-1',
        fromUserId: 'user-3',
        toUserId: 'user-0',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        status: 'pending',
    }
];


// --- CONVERSATIONS & MESSAGES ---
const conversations: Conversation[] = [
    {
        id: 'convo-1',
        participantIds: ['user-0', 'user-1'],
        createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        lastMessageAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        lastMessagePreview: 'Sounds good! See you then.',
    },
    {
        id: 'convo-2',
        participantIds: ['user-0', 'user-2'],
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        lastMessagePreview: 'Yeah, I can send the file over...',
    }
];

const messages: Message[] = [
    {
        id: 'msg-1',
        conversationId: 'convo-1',
        senderId: 'user-0',
        content: 'Hey! Are we still on for tomorrow?',
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        readByUserIds: ['user-0', 'user-1']
    },
    {
        id: 'msg-2',
        conversationId: 'convo-1',
        senderId: 'user-1',
        content: 'Yep, absolutely! Looking forward to it.',
        createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
        readByUserIds: ['user-0', 'user-1']
    },
     {
        id: 'msg-3',
        conversationId: 'convo-1',
        senderId: 'user-0',
        content: 'Sounds good! See you then.',
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        readByUserIds: ['user-0', 'user-1']
    },
     {
        id: 'msg-4',
        conversationId: 'convo-2',
        senderId: 'user-2',
        content: 'Yeah, I can send the file over...',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        readByUserIds: ['user-0', 'user-2']
    },
];

// --- GROUPS ---
const groups: Group[] = [
    {
        id: 'group-1',
        name: 'Ableton Lovers',
        description: 'A community for producers who use Ableton Live. Share tips, tracks, and techniques.',
        privacy: 'public',
        ownerId: 'user-0',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1616411132583-df7414858055?w=800&h=400&fit=crop',
        createdAt: new Date('2023-10-01T10:00:00Z').toISOString(),
    },
    {
        id: 'group-2',
        name: 'Songwriters Circle',
        description: 'A private group for dedicated songwriters to share lyrics, get feedback, and collaborate.',
        privacy: 'private',
        ownerId: 'user-2',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=400&fit=crop',
        createdAt: new Date('2023-11-15T10:00:00Z').toISOString(),
    },
    {
        id: 'group-3',
        name: 'Guitar Gods',
        description: 'Public forum for everything guitar: gear, tabs, theory, and sharing your best riffs.',
        privacy: 'public',
        ownerId: 'user-3',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=400&fit=crop',
        createdAt: new Date('2023-09-01T10:00:00Z').toISOString(),
    }
];

const groupMemberships: GroupMembership[] = [
    // Group 1: Ableton Lovers (Owner: user-0)
    { id: 'gm-1', groupId: 'group-1', userId: 'user-0', role: 'admin', createdAt: new Date().toISOString() },
    { id: 'gm-2', groupId: 'group-1', userId: 'user-1', role: 'member', createdAt: new Date().toISOString() },
    
    // Group 2: Songwriters Circle (Owner: user-2)
    { id: 'gm-3', groupId: 'group-2', userId: 'user-2', role: 'admin', createdAt: new Date().toISOString() },
    
    // Group 3: Guitar Gods (Owner: user-3)
    { id: 'gm-4', groupId: 'group-3', userId: 'user-3', role: 'admin', createdAt: new Date().toISOString() },
    { id: 'gm-5', groupId: 'group-3', userId: 'user-2', role: 'member', createdAt: new Date().toISOString() },
];

const groupJoinRequests: GroupJoinRequest[] = [
    {
        id: 'gjr-1',
        groupId: 'group-2',
        userId: 'user-0',
        createdAt: new Date().toISOString(),
        status: 'pending',
    }
];

// --- EXPORTS ---
export {
    currentUser as seedCurrentUser,
    users as seedUsers,
    posts as seedPosts,
    comments as seedComments,
    friendRequests as seedFriendRequests,
    conversations as seedConversations,
    messages as seedMessages,
    groups as seedGroups,
    groupMemberships as seedGroupMemberships,
    groupJoinRequests as seedGroupJoinRequests
};
