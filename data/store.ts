import { User, Post, Comment, Conversation, Message, Notification, ReactionType } from './socialSphereTypes';
import { 
    seedCurrentUser,
    seedUsers,
    seedPosts,
    seedComments,
    seedConversations,
    seedMessages
} from './mockData';

// --- STATE INTERFACE ---

export interface DataState {
  users: User[];
  posts: Post[];
  comments: Comment[];
  conversations: Conversation[];
  messages: Message[];
  notifications: Notification[];
  currentUserId: string | null;
}

const LOCAL_STORAGE_KEY = "socialsphere_data_v1";

// --- STATE INITIALIZATION ---

const getInitialState = (): DataState => ({
  users: Object.values(seedUsers), // Convert record to array
  posts: seedPosts,
  comments: seedComments,
  conversations: seedConversations,
  messages: seedMessages,
  notifications: [], // No seed notifications
  currentUserId: null, // Default to logged out
});

// --- LOCALSTORAGE PERSISTENCE ---

export const loadState = (): DataState => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      // On first load, use initial seed data
      return getInitialState();
    }
    const parsedState = JSON.parse(serializedState);
    // Ensure currentUserId is loaded, default to null if not present
    return { ...getInitialState(), ...parsedState, currentUserId: parsedState.currentUserId || null };
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

const mutate = (mutation: (currentState: DataState) => DataState) => {
    state = mutation(state);
    notify();
    saveState(state);
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
        const userExists = currentState.users.some(u => u.id === userId);
        if (!userExists) {
            console.warn(`Login failed: User with ID "${userId}" not found.`);
            return currentState;
        }
        return {
            ...currentState,
            currentUserId: userId,
        };
    });
  },

  logout() {
    mutate(currentState => ({
        ...currentState,
        currentUserId: null,
    }));
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
        return {
            ...currentState,
            users: [...currentState.users, newUser],
            currentUserId: newUserId, // Automatically log in the new user
        };
    });
    
    return newUser;
  },

  // --- CONTENT MUTATIONS ---
  createPost(content: string) {
    mutate(currentState => {
        if (!currentState.currentUserId) {
            console.error("No current user to create a post.");
            return currentState;
        }
        const newPost: Post = {
            id: `post-${Date.now()}`,
            authorId: currentState.currentUserId,
            content,
            createdAt: new Date().toISOString(),
            audience: 'friends', // default
            likeCounts: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
            mediaUrls: [],
        };
        return {
            ...currentState,
            posts: [newPost, ...currentState.posts],
        };
    });
  },

  addComment(postId: string, content: string) {
      mutate(currentState => {
          if (!currentState.currentUserId) {
              console.error("No current user to add a comment.");
              return currentState;
          }
          const newComment: Comment = {
              id: `comment-${Date.now()}`,
              postId,
              authorId: currentState.currentUserId,
              content,
              createdAt: new Date().toISOString(),
          };
          return {
              ...currentState,
              comments: [...currentState.comments, newComment],
          };
      });
  },

  togglePostReaction(postId: string, reaction: ReactionType) {
      mutate(currentState => ({
          ...currentState,
          posts: currentState.posts.map(post => {
              if (post.id === postId) {
                  // This is a simplified implementation. A real app would check if the user
                  // has already reacted and toggle accordingly. For now, it just increments.
                  return {
                      ...post,
                      likeCounts: {
                          ...post.likeCounts,
                          [reaction]: (post.likeCounts[reaction] || 0) + 1,
                      },
                  };
              }
              return post;
          }),
      }));
  },

  markAllNotificationsRead() {
      mutate(currentState => {
          if (!currentState.currentUserId) return currentState;
          return {
              ...currentState,
              notifications: currentState.notifications.map(notif =>
                  notif.userId === currentState.currentUserId ? { ...notif, read: true } : notif
              ),
          };
      });
  },
};