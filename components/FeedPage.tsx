import React from 'react';

// Reusable Post Card component
const PostCard: React.FC<{ author: { name: string, avatar: string }, text: string, image?: string, time: string }> = ({ author, text, image, time }) => (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow p-4 border border-gray-200 dark:border-border-dark">
        <div className="flex items-center gap-3">
            <img src={author.avatar} alt={author.name} className="size-10 rounded-full" />
            <div>
                <p className="font-bold">{author.name}</p>
                <p className="text-xs text-gray-500 dark:text-text-secondary">{time}</p>
            </div>
        </div>
        <p className="my-4">{text}</p>
        {image && <img src={image} alt="Post content" className="rounded-lg w-full object-cover" />}
        <div className="border-t border-gray-200 dark:border-border-dark mt-4 pt-2 flex justify-around">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark-search transition-colors">
                <span className="material-symbols-outlined text-lg">thumb_up</span>
                <span className="text-sm font-medium">Like</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark-search transition-colors">
                <span className="material-symbols-outlined text-lg">chat_bubble</span>
                <span className="text-sm font-medium">Comment</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark-search transition-colors">
                <span className="material-symbols-outlined text-lg">share</span>
                <span className="text-sm font-medium">Share</span>
            </button>
        </div>
    </div>
);

const FeedPage: React.FC = () => {
  const currentUser = { name: 'Arjun Mehta', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80' };

  return (
    <div className="space-y-6 max-w-[680px] mx-auto">
      {/* Create Post Widget */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow p-4 border border-gray-200 dark:border-border-dark">
        <div className="flex items-center gap-3">
          <img src={currentUser.avatar} alt={currentUser.name} className="size-10 rounded-full" />
          <div className="flex-1 h-10 px-4 rounded-full bg-gray-100 dark:bg-surface-dark-search flex items-center text-gray-500 dark:text-text-secondary cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600/50">
            What's on your mind, Arjun?
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-border-dark my-3"></div>
        <div className="flex justify-around">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark-search transition-colors">
            <span className="material-symbols-outlined text-red-500">videocam</span>
            <span className="text-sm font-medium">Live video</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark-search transition-colors">
            <span className="material-symbols-outlined text-green-500">photo_library</span>
            <span className="text-sm font-medium">Photo/video</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark-search transition-colors">
            <span className="material-symbols-outlined text-yellow-500">sentiment_very_satisfied</span>
            <span className="text-sm font-medium">Feeling/activity</span>
          </button>
        </div>
      </div>

      {/* Example Post */}
       <PostCard 
        author={{ name: "Maria Garcia", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }}
        text="Had an amazing time at the concert last night! The energy was incredible."
        image="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=600&fit=crop"
        time="3 hours ago"
      />

      {/* Placeholder Post (Loading) */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow p-4 border border-gray-200 dark:border-border-dark animate-pulse">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-gray-200 dark:bg-surface-dark-search"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-surface-dark-search rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 dark:bg-surface-dark-search rounded w-1/4"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-surface-dark-search rounded w-full my-4"></div>
        <div className="aspect-video bg-gray-200 dark:bg-surface-dark-search rounded-lg"></div>
      </div>
    </div>
  );
};

export default FeedPage;
