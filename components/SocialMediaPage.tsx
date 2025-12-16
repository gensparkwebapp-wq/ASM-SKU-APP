import React from 'react';
import { ViewState } from '../App';
import { Post, User } from '../data/socialSphereTypes';
import { useSocialSphereData } from '../contexts/SocialSphereDataContext';

interface SocialMediaPageProps {
    onLoginSuccess: () => void;
    onNavigate: (view: ViewState) => void;
}

const PostCard: React.FC<{ post: Post; author?: User; onLike: (id: string) => void }> = ({ post, author, onLike }) => {
    if (!author) {
        return null; // Or a loading/error state
    }
    const totalLikes = Object.values(post.likeCounts).reduce((sum: number, count: number) => sum + count, 0);

    return (
        <div className="bg-white dark:bg-surface-dark-search rounded-lg shadow-md border border-transparent dark:border-white/10">
            {/* Post Header */}
            <div className="flex items-center gap-3 p-4">
                <img src={author.avatarUrl} alt={author.name} className="size-10 rounded-full" />
                <div>
                    <p className="font-bold text-gray-900 dark:text-white">{author.name}</p>
                    <p className="text-xs text-gray-500 dark:text-text-secondary">{post.createdAt}</p>
                </div>
            </div>
            {/* Post Content */}
            {post.content && <p className="px-4 pb-2 text-gray-800 dark:text-white/90">{post.content}</p>}
            {post.mediaUrls?.[0] && <img src={post.mediaUrls[0]} alt="Post content" className="w-full h-auto object-cover" />}
            {/* Post Stats */}
            <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-500 dark:text-text-secondary">
                <div className="flex items-center gap-1">
                    <div className="size-4 rounded-full bg-primary-blue flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[10px] filled">thumb_up</span>
                    </div>
                    <span>{totalLikes}</span>
                </div>
                {/* Comment count removed from model */}
            </div>
            {/* Post Actions */}
            <div className="border-t border-gray-200 dark:border-white/10 mx-4 my-1"></div>
            <div className="flex justify-around py-1">
                <button onClick={() => onLike(post.id)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors`}>
                    <span className="material-symbols-outlined text-lg">thumb_up</span>
                    <span className="text-sm font-medium">Like</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-lg">chat_bubble_outline</span>
                    <span className="text-sm font-medium">Comment</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-lg">share</span>
                    <span className="text-sm font-medium">Share</span>
                </button>
            </div>
        </div>
    );
};


const SocialMediaPage: React.FC<SocialMediaPageProps> = ({ onNavigate }) => {
    const { posts, users, currentUser, likePost } = useSocialSphereData();

    // The currentUser can be null if the ID is invalid, so we need a fallback.
    const userForPostCreation = currentUser ?? { name: 'Guest', avatarUrl: '' };

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-[#18191A] font-body">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-surface-dark-search shadow-md flex items-center justify-between px-4 border-b border-transparent dark:border-white/10">
                <div className="flex items-center gap-2">
                    <div className="text-primary-blue text-4xl font-bold">f</div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-text-secondary">
                            <span className="material-symbols-outlined text-lg">search</span>
                        </span>
                        <input className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-[#3A3B3C] border-none focus:ring-2 focus:ring-primary-blue text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-text-secondary text-sm" placeholder="Search" type="text" />
                    </div>
                </div>
                <nav className="hidden lg:flex items-center justify-center flex-1">
                    <div className="flex items-center gap-2">
                        <button className="w-28 h-12 flex items-center justify-center border-b-2 border-primary-blue text-primary-blue"><span className="material-symbols-outlined text-3xl filled">home</span></button>
                        <button className="w-28 h-12 flex items-center justify-center text-gray-500 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"><span className="material-symbols-outlined text-3xl">group</span></button>
                        <button className="w-28 h-12 flex items-center justify-center text-gray-500 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"><span className="material-symbols-outlined text-3xl">smart_display</span></button>
                        <button className="w-28 h-12 flex items-center justify-center text-gray-500 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"><span className="material-symbols-outlined text-3xl">storefront</span></button>
                    </div>
                </nav>
                <div className="flex items-center gap-2">
                    <button className="size-10 rounded-full bg-gray-200 dark:bg-[#3A3B3C] flex items-center justify-center text-gray-800 dark:text-white"><span className="material-symbols-outlined text-xl">apps</span></button>
                    <button className="size-10 rounded-full bg-gray-200 dark:bg-[#3A3B3C] flex items-center justify-center text-gray-800 dark:text-white"><span className="material-symbols-outlined text-xl">chat</span></button>
                    <button className="size-10 rounded-full bg-gray-200 dark:bg-[#3A3B3C] flex items-center justify-center text-gray-800 dark:text-white"><span className="material-symbols-outlined text-xl">notifications</span></button>
                    <img src={userForPostCreation.avatarUrl} alt="User" className="size-10 rounded-full cursor-pointer"/>
                </div>
            </header>
            
            <div className="flex pt-14">
                {/* Main Feed */}
                <main className="flex-1 max-w-[680px] mx-auto py-6 px-2 sm:px-0 space-y-4">
                    {/* Stories section is removed as the type is obsolete */}

                    {/* Create Post */}
                    <div className="bg-white dark:bg-surface-dark-search rounded-lg shadow-md p-4 border border-transparent dark:border-white/10">
                        <div className="flex items-center gap-3">
                            <img src={userForPostCreation.avatarUrl} alt={userForPostCreation.name} className="size-10 rounded-full"/>
                            <input type="text" placeholder={`What's on your mind, ${userForPostCreation.name.split(' ')[0]}?`} className="flex-1 h-10 px-4 rounded-full bg-gray-100 dark:bg-[#3A3B3C] border-none focus:ring-2 focus:ring-primary-blue text-gray-900 dark:text-white"/>
                        </div>
                        <div className="border-t border-gray-200 dark:border-white/10 my-3"></div>
                        <div className="flex justify-around">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-red-500">videocam</span>
                                <span className="text-sm font-medium">Live video</span>
                            </button>
                             <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-green-500">photo_library</span>
                                <span className="text-sm font-medium">Photo/video</span>
                            </button>
                             <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-yellow-500">sentiment_very_satisfied</span>
                                <span className="text-sm font-medium">Feeling/activity</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Posts Feed */}
                    {posts.map(post => {
                        const author = users.find(u => u.id === post.authorId);
                        return <PostCard key={post.id} post={post} author={author} onLike={likePost} />
                    })}
                </main>
            </div>
        </div>
    );
};

export default SocialMediaPage;