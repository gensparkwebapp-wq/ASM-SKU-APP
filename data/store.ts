import { User, Post, Comment, Conversation, Message, Notification } from './socialSphereTypes';
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
  users: Object.values(seedUsers), // Convert record to array as requested
  posts: seedPosts,
  comments: seedComments,
  conversations: seedConversations,
  messages: seedMessages,
  notifications: [], // No seed notifications
  currentUserId: seedCurrentUser.id,
});

// --- LOCALSTORAGE PERSISTENCE ---

export const loadState = (): DataState => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      // On first load, use initial seed data
      return getInitialState();
    }
    return JSON.parse(serializedState);
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

  // --- MUTATIONS ---
  
  likePost(postId: string) {
    mutate(currentState => ({
        ...currentState,
        posts: currentState.posts.map(post => {
            if (post.id === postId) {
                // Simplified like, doesn't check if already liked
                return {
                    ...post,
                    likeCounts: { ...post.likeCounts, like: post.likeCounts.like + 1 }
                };
            }
            return post;
        })
    }));
  },
};
