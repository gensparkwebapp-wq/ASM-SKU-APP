import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { Post, User } from '../data/socialSphereTypes';
import PostCard from './PostCard';

const CreatePostWidget: React.FC = () => {
    const { state, actions } = useData();
    const [content, setContent] = useState('');
    const user = state.currentUser;

    if (!user) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            actions.createPost(content);
            setContent('');
        }
    };

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md p-4 border border-gray-200 dark:border-border-dark">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3">
                    <img src={user.avatarUrl} alt={user.name} className="size-10 rounded-full"/>
                    <input 
                        type="text" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`} 
                        className="flex-1 h-10 px-4 rounded-full bg-gray-100 dark:bg-surface-dark-search border-none focus:ring-2 focus:ring-primary-blue text-gray-900 dark:text-[#e4e6eb]"
                    />
                </div>
                <div className="border-t border-gray-200 dark:border-border-dark my-3"></div>
                <div className="flex justify-between items-center">
                    <div className="flex">
                         <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark-search transition-colors">
                            <span className="material-symbols-outlined text-red-500">videocam</span>
                            <span className="text-sm font-medium hidden sm:inline">Live video</span>
                        </button>
                         <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark-search transition-colors">
                            <span className="material-symbols-outlined text-green-500">photo_library</span>
                            <span className="text-sm font-medium hidden sm:inline">Photo/video</span>
                        </button>
                         <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark-search transition-colors">
                            <span className="material-symbols-outlined text-yellow-500">sentiment_very_satisfied</span>
                            <span className="text-sm font-medium hidden sm:inline">Feeling/activity</span>
                        </button>
                    </div>
                    <button type="submit" disabled={!content.trim()} className="px-6 h-9 bg-primary-blue text-white font-bold text-sm rounded-full disabled:bg-gray-300 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">Post</button>
                </div>
            </form>
         </div>
    );
};


const FeedPage: React.FC = () => {
    const { state } = useData();
    const { posts, users } = state;

    const sortedPosts = useMemo(() => 
        [...posts].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [posts]);

    return (
        <div className="space-y-6 max-w-[680px] mx-auto animate-in fade-in duration-500">
            <CreatePostWidget />
            {sortedPosts.map(post => {
                const author = users.find(u => u.id === post.authorId);
                return <PostCard key={post.id} post={post} author={author} />
            })}
        </div>
    );
};

export default FeedPage;