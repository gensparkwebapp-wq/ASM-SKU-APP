
import { User, Post, Comment, Conversation, Message, Notification, ReactionType, FriendRequest, Friendship, NotificationType, Group, GroupJoinRequest, GroupPrivacy, GroupMembership, MediaAttachment, MediaKind } from './socialSphereTypes';
import { 
    seedCurrentUser,
    seedUsers,
    seedPosts,
    seedComments,
    seedConversations,
    seedMessages,
    seedFriendRequests,
    seedGroups,
    seedGroupMemberships,
    seedGroupJoinRequests
} from './mockData';

// --- STATE INTERFACE ---

export interface DataState {
  users: User[];
  posts: Post[];
  comments: Comment[];
  friendRequests: FriendRequest[];
  friendships: Friendship[];
  conversations: Conversation[];
  messages: Message[];
  notifications: Notification[];
  groups: Group[];
  groupMemberships: GroupMembership[];
  groupJoinRequests: GroupJoinRequest[];
  currentUserId: string | null;
}

const LOCAL_STORAGE_KEY = "socialsphere_data_v2";

// --- VALIDATION HELPERS ---

export const isSafeHttpUrl = (url: string): boolean => {
    try {
        const u = new URL(url);
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
        return false;
    }
};

export const getMediaKindFromUrl = (url: string): MediaKind | null => {
    const clean = url.split('?')[0].toLowerCase();
    if (/\.(jpg|jpeg|png|gif|webp|avif)$/.test(clean)) return 'image';
    if (/\.(mp4|webm|ogg|mov)$/.test(clean)) return 'video';
    return null;
};

// --- STATE INITIALIZATION ---

const getInitialState = (): DataState => ({
  users: Object.values(seedUsers), // Convert record to array
  posts: seedPosts,
  comments: seedComments,
  friendRequests: seedFriendRequests,
  friendships: [],
  conversations: seedConversations,
  messages: seedMessages,
  notifications: [], // Start with no notifications
  groups: seedGroups,
  groupMemberships: seedGroupMemberships,
  groupJoinRequests: seedGroupJoinRequests,
  currentUserId: 'user-0', // Default to logged in as Arjun Mehta for stability
});

// --- LOCALSTORAGE PERSISTENCE ---

export const loadState = (): DataState => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return getInitialState();
    }
    const parsedState = JSON.parse(serializedState);
    
    // Merge strategy: Ensure critical arrays exist if local storage is malformed or old
    const initialState = getInitialState();
    return { 
        ...initialState, 
        ...parsedState,
        // Ensure default user if somehow null in stored state (optional, but good for stability)
        currentUserId: parsedState.currentUserId || 'user-0' 
    };
  } catch (err) {
    console.error("Could not load state from localStorage. Falling back to initial state.", err);
    return getInitialState();
  }
};

const saveState = (state: DataState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage.", err);
  }
};


// --- OBSERVABLE STORE IMPLEMENTATION ---

type Listener = () => void;
let listeners: Listener[] = [];
let state: DataState = loadState();

const notify = () => {
  for (const listener of listeners) {
    listener();
  }
};

const mutate = (mutation: (currentState: DataState) => DataState | void) => {
    const newState = mutation(state);
    if (newState) { // Allow mutations to return a new state object
        state = newState;
    }
    notify();
    saveState(state);
};

// --- PRIVATE HELPERS ---
const _createNotification = (
    currentState: DataState,
    userId: string, // recipient
    type: NotificationType,
    data: Partial<Notification["data"]>
): DataState => {
    if (userId === data.actorUserId) { // Don't notify user for their own actions
        return currentState;
    }
    const newNotification: Notification = {
        id: `notif-${Date.now()}-${Math.random()}`,
        userId,
        type,
        createdAt: new Date().toISOString(),
        read: false,
        data: {
          ...data
        },
    };
    return {
        ...currentState,
        notifications: [newNotification, ...currentState.notifications]
    };
};


export const store = {
  subscribe(listener: Listener): () => void {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },

  getState(): DataState {
    return state;
  },
  
  // --- AUTH MUTATIONS ---
  login(userId: string) {
    mutate(currentState => {
        if (currentState.users.some(u => u.id === userId)) {
            currentState.currentUserId = userId;
        }
    });
  },

  logout() {
    mutate(currentState => {
        currentState.currentUserId = null;
    });
  },
  
  registerUser(name: string, options?: { avatarUrl?: string; shortBio?: string }): User {
    if (!name) {
        throw new Error("Cannot register user without a name.");
    }
    const newUserId = `user-${Date.now()}`;
    const newUser: User = {
        id: newUserId,
        name,
        avatarUrl: options?.avatarUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}`,
        createdAt: new Date().toISOString(),
        role: 'user',
        shortBio: options?.shortBio || 'New SocialSphere user!',
    };
    mutate(currentState => {
        currentState.users.push(newUser);
        currentState.currentUserId = newUserId;
    });
    return newUser;
  },

  updateUserProfile(userId: string, updates: Partial<User>) {
    mutate(currentState => {
        const index = currentState.users.findIndex(u => u.id === userId);
        if (index !== -1) {
            currentState.users[index] = { ...currentState.users[index], ...updates };
        }
    });
  },

  // --- CONTENT MUTATIONS ---
  createPost(content: string, options?: { groupId?: string; attachments?: MediaAttachment[] }) {
    mutate(currentState => {
        if (!currentState.currentUserId) return;

        let groupId: string | null = null;
        let audience = 'friends';

        // Logic for group posts
        if (options?.groupId) {
            const group = currentState.groups.find(g => g.id === options.groupId);
            const isMember = currentState.groupMemberships.some(m => m.groupId === options.groupId && m.userId === currentState.currentUserId);
            
            if (!group || !isMember) return; // Cannot post if not a member or group doesn't exist
            
            groupId = options.groupId;
            audience = 'public'; // Group posts are visible within the group (simplified)
        }

        const validAttachments = (options?.attachments || []).filter(att => 
            isSafeHttpUrl(att.url) && getMediaKindFromUrl(att.url) !== null
        ).slice(0, 4);

        const newPost: Post = {
            id: `post-${Date.now()}`,
            authorId: currentState.currentUserId,
            content,
            createdAt: new Date().toISOString(),
            audience: audience as any,
            likeCounts: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
            likedByUserIds: [],
            mediaUrls: [],
            attachments: validAttachments,
            groupId: groupId
        };
        currentState.posts.unshift(newPost);
    });
  },

  addComment(postId: string, content: string) {
      mutate(currentState => {
          if (!currentState.currentUserId) return;
          const post = currentState.posts.find(p => p.id === postId);
          if (!post) return;

          const newComment: Comment = {
              id: `comment-${Date.now()}`,
              postId,
              authorId: currentState.currentUserId,
              content,
              createdAt: new Date().toISOString(),
          };
          currentState.comments.push(newComment);
          
          if (currentState.currentUserId !== post.authorId) {
            return _createNotification(currentState, post.authorId, 'post_commented', {
                actorUserId: currentState.currentUserId,
                postId: post.id,
            });
          }
      });
  },

  togglePostReaction(postId: string, reaction: ReactionType) {
      mutate(currentState => {
        if (!currentState.currentUserId) return;
        const currentUserId = currentState.currentUserId;
        const post = currentState.posts.find(p => p.id === postId);
        if (!post || reaction !== 'like') return;

        const likedByUserIds = post.likedByUserIds || [];
        const userHasLiked = likedByUserIds.includes(currentUserId);

        if (userHasLiked) {
            post.likedByUserIds = likedByUserIds.filter(id => id !== currentUserId);
        } else {
            post.likedByUserIds = [...likedByUserIds, currentUserId];
             if (currentUserId !== post.authorId) {
                return _createNotification(currentState, post.authorId, 'post_liked', {
                    actorUserId: currentUserId,
                    postId: post.id,
                });
             }
        }
        post.likeCounts.like = post.likedByUserIds.length;
      });
  },

  // --- FRIEND MUTATIONS ---
  sendFriendRequest(toUserId: string) {
    mutate(currentState => {
      const { currentUserId, users, friendRequests } = currentState;
      if (!currentUserId || currentUserId === toUserId) return;
      
      const fromUser = users.find(u => u.id === currentUserId);
      const toUser = users.find(u => u.id === toUserId);
      if (!fromUser || !toUser) return; // Ensure both users exist

      const areAlreadyFriends = fromUser.friendIds?.includes(toUserId);
      const requestExists = friendRequests.some(req => (req.fromUserId === currentUserId && req.toUserId === toUserId) || (req.fromUserId === toUserId && req.toUserId === currentUserId));
      
      if (areAlreadyFriends || requestExists) return;

      const newRequest: FriendRequest = {
        id: `fr-${Date.now()}`,
        fromUserId: currentUserId,
        toUserId,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };
      currentState.friendRequests.push(newRequest);
      
      return _createNotification(currentState, toUserId, 'friend_request_received', {
          actorUserId: currentUserId,
          friendRequestId: newRequest.id
      });
    });
  },

  respondToFriendRequest(requestId: string, accept: boolean) {
    mutate(currentState => {
      const { currentUserId } = currentState;
      if (!currentUserId) return;

      const requestIndex = currentState.friendRequests.findIndex(r => r.id === requestId);
      const request = currentState.friendRequests[requestIndex];

      if (!request || request.toUserId !== currentUserId) return;

      if (!accept) {
        currentState.friendRequests.splice(requestIndex, 1);
        return;
      }

      const fromUserId = request.fromUserId;
      const toUserId = request.toUserId;
      
      const fromUser = currentState.users.find(u => u.id === fromUserId);
      const toUser = currentState.users.find(u => u.id === toUserId);

      if (fromUser && toUser) {
        fromUser.friendIds = [...(fromUser.friendIds || []), toUserId];
        toUser.friendIds = [...(toUser.friendIds || []), fromUserId];
      }
      
      currentState.friendRequests.splice(requestIndex, 1);
      
      return _createNotification(currentState, fromUserId, 'friend_request_accepted', {
          actorUserId: currentUserId,
          friendRequestId: requestId,
      });
    });
  },
  
  cancelFriendRequest(requestId: string) {
    mutate(currentState => {
      const { currentUserId } = currentState;
      currentState.friendRequests = currentState.friendRequests.filter(r => !(r.id === requestId && r.fromUserId === currentUserId));
    });
  },

  unfriend(friendId: string) {
    mutate(currentState => {
      const { currentUserId } = currentState;
      if (!currentUserId) return;
      const currentUser = currentState.users.find(u => u.id === currentUserId);
      const friend = currentState.users.find(u => u.id === friendId);
      if (currentUser && friend) {
          currentUser.friendIds = (currentUser.friendIds || []).filter(id => id !== friendId);
          friend.friendIds = (friend.friendIds || []).filter(id => id !== currentUserId);
      }
    });
  },
  
  // --- MESSAGE MUTATIONS ---
  startConversation(withUserId: string): string {
    let conversationId = '';
    mutate(currentState => {
        if (!currentState.currentUserId) return;
        
        const existingConvo = currentState.conversations.find(c =>
            c.participantIds.length === 2 &&
            c.participantIds.includes(currentState.currentUserId!) &&
            c.participantIds.includes(withUserId)
        );

        if (existingConvo) {
            conversationId = existingConvo.id;
            return;
        }

        const newConvo: Conversation = {
            id: `convo-${Date.now()}`,
            participantIds: [currentState.currentUserId!, withUserId],
            createdAt: new Date().toISOString(),
            lastMessageAt: new Date().toISOString(),
        };
        currentState.conversations.unshift(newConvo);
        conversationId = newConvo.id;
    });
    return conversationId;
  },

  sendMessage(conversationId: string, content: string) {
      mutate(currentState => {
          if (!currentState.currentUserId) return;
          const conversation = currentState.conversations.find(c => c.id === conversationId);
          if (!conversation) return;

          const newMessage: Message = {
              id: `msg-${Date.now()}`,
              conversationId,
              senderId: currentState.currentUserId,
              content,
              createdAt: new Date().toISOString(),
              readByUserIds: [currentState.currentUserId],
          };
          currentState.messages.push(newMessage);
          conversation.lastMessageAt = newMessage.createdAt;
          conversation.lastMessagePreview = content;

          const recipient = conversation.participantIds.find(id => id !== currentState.currentUserId);
          if (recipient) {
              return _createNotification(currentState, recipient, 'message_received', {
                  actorUserId: currentState.currentUserId,
                  conversationId: conversation.id,
                  message: content,
              });
          }
      });
  },

  markConversationRead(conversationId: string) {
      mutate(currentState => {
          if (!currentState.currentUserId) return;
          const currentUserId = currentState.currentUserId;
          currentState.messages.forEach(msg => {
              if (msg.conversationId === conversationId && !msg.readByUserIds.includes(currentUserId)) {
                  msg.readByUserIds.push(currentUserId);
              }
          });
      });
  },

  // --- GROUP MUTATIONS ---
   createGroup(input: { name: string; description?: string; privacy: GroupPrivacy; coverPhotoUrl?: string }): Group | null {
    let newGroup: Group | null = null;
    mutate(currentState => {
      const { currentUserId } = currentState;
      if (!currentUserId) return;
      
      newGroup = {
        id: `group-${Date.now()}`,
        name: input.name,
        description: input.description,
        privacy: input.privacy,
        ownerId: currentUserId,
        coverPhotoUrl: input.coverPhotoUrl || `https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=400&fit=crop&q=80`,
        createdAt: new Date().toISOString(),
      };
      
      currentState.groups.unshift(newGroup);

      // Add corresponding membership record for admin
      currentState.groupMemberships.push({
          id: `gm-${Date.now()}`,
          groupId: newGroup.id,
          userId: currentUserId,
          role: 'admin',
          createdAt: new Date().toISOString()
      });
    });
    return newGroup;
  },

  joinGroup(groupId: string) {
    mutate(currentState => {
      const { currentUserId, groups, groupJoinRequests, groupMemberships } = currentState;
      if (!currentUserId) return;
      const group = groups.find(g => g.id === groupId);
      if (!group) return;

      const isMember = groupMemberships.some(m => m.groupId === groupId && m.userId === currentUserId);
      if (isMember) return; // Already a member, do nothing

      if (group.privacy === 'public') {
        currentState.groupMemberships.push({
            id: `gm-${Date.now()}`,
            groupId: group.id,
            userId: currentUserId,
            role: 'member',
            createdAt: new Date().toISOString()
          });
      } else {
        const hasPendingRequest = groupJoinRequests.some(r => r.groupId === groupId && r.userId === currentUserId);
        if (hasPendingRequest) return; // Already requested, do nothing

        const newRequest: GroupJoinRequest = {
          id: `gjr-${Date.now()}`,
          groupId,
          userId: currentUserId,
          createdAt: new Date().toISOString(),
          status: 'pending',
        };
        currentState.groupJoinRequests.push(newRequest);
        
        let finalState: DataState | void = currentState;
        // Notify admins
        const adminMemberships = groupMemberships.filter(m => m.groupId === groupId && m.role === 'admin');
        adminMemberships.forEach(admin => {
            finalState = _createNotification(finalState || currentState, admin.userId, 'group_join_request_received', {
                actorUserId: currentUserId,
                groupId: group.id,
                groupRequestId: newRequest.id
            });
        });
        return finalState;
      }
    });
  },

  leaveGroup(groupId: string) {
    mutate(currentState => {
      if (!currentState.currentUserId) return;
      
      currentState.groupMemberships = currentState.groupMemberships.filter(
          m => !(m.groupId === groupId && m.userId === currentState.currentUserId)
      );
    });
  },

  respondToJoinRequest(requestId: string, accept: boolean) {
    mutate(currentState => {
      const { currentUserId, groupJoinRequests, groups, groupMemberships } = currentState;
      if (!currentUserId) return;
      
      const requestIndex = groupJoinRequests.findIndex(r => r.id === requestId);
      if (requestIndex === -1) return;
      
      const request = groupJoinRequests[requestIndex];
      const group = groups.find(g => g.id === request.groupId);

      // Verify the current user is an admin of this group
      const isAdmin = groupMemberships.some(m => m.groupId === request.groupId && m.userId === currentUserId && m.role === 'admin');

      if (!group || !isAdmin) return;

      if (accept) {
        const isAlreadyMember = groupMemberships.some(m => m.groupId === group.id && m.userId === request.userId);
        if (!isAlreadyMember) {
          currentState.groupMemberships.push({
            id: `gm-${Date.now()}`,
            groupId: group.id,
            userId: request.userId,
            role: 'member',
            createdAt: new Date().toISOString()
          });
        }
        currentState.groupJoinRequests.splice(requestIndex, 1);
        return _createNotification(currentState, request.userId, 'group_join_request_accepted', {
            actorUserId: currentUserId,
            groupId: group.id
        });
      } else {
        currentState.groupJoinRequests.splice(requestIndex, 1);
      }
    });
  },

  rejectJoinRequest(requestId: string) {
    mutate(currentState => {
      const { currentUserId, groupJoinRequests, groupMemberships } = currentState;
      if (!currentUserId) return;
      
      const requestIndex = groupJoinRequests.findIndex(r => r.id === requestId);
      if (requestIndex === -1) return;
      
      const request = groupJoinRequests[requestIndex];
      
      // Verify the current user is an admin of this group
      const isAdmin = groupMemberships.some(m => m.groupId === request.groupId && m.userId === currentUserId && m.role === 'admin');

      if (!isAdmin) return;

      // Remove the request (effectively rejecting it)
      currentState.groupJoinRequests.splice(requestIndex, 1);
    });
  },

  // --- NOTIFICATION MUTATIONS ---
  markNotificationRead(notificationId: string) {
    mutate(currentState => {
        if (!currentState.currentUserId) return;
        const notif = currentState.notifications.find(n => n.id === notificationId && n.userId === currentState.currentUserId);
        if(notif) notif.read = true;
    });
  },

  markAllNotificationsRead() {
      mutate(currentState => {
          if (!currentState.currentUserId) return;
          currentState.notifications.forEach(notif => {
              if (notif.userId === currentState.currentUserId) {
                  notif.read = true;
              }
          });
      });
  },
};
