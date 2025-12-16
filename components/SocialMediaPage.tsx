import React, { useState, useMemo } from 'react';
import { ViewState } from '../App';
import { Post, User, ReactionType } from '../data/socialSphereTypes';
import { useData } from '../contexts/DataContext';

interface SocialMediaPageProps {
    onLoginSuccess: () => void;
    onNavigate: (view: ViewState) => void;
}

const timeAgo = (isoString: string): string => {
    const date = new Date(isoString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return "Just now";
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

const PostCard: React.FC<{ post: Post; author?: User; onReact: (id: string, reaction: ReactionType) => void }> = React.memo(({ post, author, onReact }) => {
    const { state, actions } = useData();
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");

    if (!author) {
        return null; // Or a loading/error state
    }

    const postComments = state.comments.filter(c => c.postId === post.id);
    // FIX: The reduce function was causing a type error. Using Number(count) ensures that the values are treated as numbers, resolving the 'unknown' type issue for totalLikes.
    const totalLikes = Object.values(post.likeCounts).reduce((sum, count) => sum + Number(count), 0);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            actions.addComment(post.id, newComment);
            setNewComment("");
        }
    };

    return (
        <div className="bg-white dark:bg-surface-dark-search rounded-lg shadow-md border border-transparent dark:border-white/10">
            {/* Post Header */}
            <div className="flex items-center gap-3 p-4">
                <img src={author.avatarUrl} alt={author.name} className="size-10 rounded-full" />
                <div>
                    <p className="font-bold text-gray-900 dark:text-white">{author.name}</p>
                    <p className="text-xs text-gray-500 dark:text-text-secondary">{timeAgo(post.createdAt)}</p>
                </div>
            </div>
            {/* Post Content */}
            {post.content && <p className="px-4 pb-2 text-gray-800 dark:text-white/90 whitespace-pre-wrap">{post.content}</p>}
            {post.mediaUrls?.[0] && <img src={post.mediaUrls[0]} alt="Post content" className="w-full h-auto object-cover" />}
            {/* Post Stats */}
            <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-500 dark:text-text-secondary">
                <div className="flex items-center gap-1">
                    {totalLikes > 0 && <>
                        <div className="size-4 rounded-full bg-primary-blue flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[10px] filled">thumb_up</span>
                        </div>
                        <span>{totalLikes}</span>
                    </>}
                </div>
                {postComments.length > 0 && <span>{postComments.length} {postComments.length === 1 ? 'Comment' : 'Comments'}</span>}
            </div>
            {/* Post Actions */}
            <div className="border-t border-gray-200 dark:border-white/10 mx-4 my-1"></div>
            <div className="flex justify-around py-1">
                <button onClick={() => onReact(post.id, 'like')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors`}>
                    <span className="material-symbols-outlined text-lg">thumb_up</span>
                    <span className="text-sm font-medium">Like</span>
                </button>
                <button onClick={() => setShowComments(prev => !prev)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-lg">chat_bubble_outline</span>
                    <span className="text-sm font-medium">Comment</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-lg">share</span>
                    <span className="text-sm font-medium">Share</span>
                </button>
            </div>
            {/* Comments Section */}
            {showComments && (
                <div className="p-4 border-t border-gray-200 dark:border-white/10 animate-in fade-in duration-300">
                    <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 mb-4">
                        <img src={state.currentUser?.avatarUrl} alt="Your avatar" className="size-8 rounded-full" />
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 h-9 px-3 rounded-full bg-gray-100 dark:bg-[#3A3B3C] border-none text-sm focus:ring-2 focus:ring-primary-blue text-gray-900 dark:text-white"
                        />
                    </form>
                    <div className="space-y-3">
                        {postComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(comment => {
                            const commentAuthor = state.users.find(u => u.id === comment.authorId);
                            if (!commentAuthor) return null;
                            return (
                                <div key={comment.id} className="flex items-start gap-2">
                                    <img src={commentAuthor.avatarUrl} alt={commentAuthor.name} className="size-8 rounded-full" />
                                    <div className="bg-gray-100 dark:bg-[#3A3B3C] rounded-xl px-3 py-1.5">
                                        <div className="flex items-baseline gap-2">
                                            <p className="font-bold text-xs">{commentAuthor.name}</p>
                                            <p className="text-[10px] text-gray-500 dark:text-text-secondary">{timeAgo(comment.createdAt)}</p>
                                        </div>
                                        <p className="text-sm">{comment.content}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
});

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
        <div className="bg-white dark:bg-surface-dark-search rounded-lg shadow-md p-4 border border-transparent dark:border-white/10">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3">
                    <img src={user.avatarUrl} alt={user.name} className="size-10 rounded-full"/>
                    <input 
                        type="text" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`} 
                        className="flex-1 h-10 px-4 rounded-full bg-gray-100 dark:bg-[#3A3B3C] border-none focus:ring-2 focus:ring-primary-blue text-gray-900 dark:text-white"
                    />
                </div>
                <div className="border-t border-gray-200 dark:border-white/10 my-3"></div>
                <div className="flex justify-between items-center">
                    <div className="flex">
                         <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-green-500">photo_library</span>
                            <span className="text-sm font-medium hidden sm:inline">Photo/video</span>
                        </button>
                         <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-yellow-500">sentiment_very_satisfied</span>
                            <span className="text-sm font-medium hidden sm:inline">Feeling</span>
                        </button>
                    </div>
                    <button type="submit" disabled={!content.trim()} className="px-6 h-9 bg-primary-blue text-white font-bold text-sm rounded-full disabled:bg-gray-300 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">Post</button>
                </div>
            </form>
         </div>
    );
};


const SocialMediaPage: React.FC<SocialMediaPageProps> = ({ onNavigate }) => {
    const { state, actions } = useData();
    const { posts, users, currentUser } = state;
    const { togglePostReaction } = actions;

    const sortedPosts = useMemo(() => 
        [...posts].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [posts]);

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-[#18191A] font-body">
            {/* This component uses the main app layout which includes MasterHeader, so its own header must be positioned below it. */}
            <header className="fixed top-12 left-0 right-0 z-40 h-14 bg-white dark:bg-surface-dark-search shadow-md flex items-center justify-between px-2 sm:px-4 border-b border-transparent dark:border-white/10">
                <div className="flex items-center gap-2">
                    <div className="text-primary-blue text-4xl font-bold hidden sm:block">f</div>
                    
                    {/* Mobile Search Icon */}
                    <button className="sm:hidden flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-[#3A3B3C]">
                         <span className="material-symbols-outlined text-lg text-gray-600 dark:text-text-secondary">search</span>
                    </button>
                    {/* Desktop Search Input */}
                    <div className="relative hidden sm:block">
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
                    <button className="hidden sm:flex size-10 rounded-full bg-gray-200 dark:bg-[#3A3B3C] items-center justify-center text-gray-800 dark:text-white"><span className="material-symbols-outlined text-xl">apps</span></button>
                    <button className="flex size-10 rounded-full bg-gray-200 dark:bg-[#3A3B3C] items-center justify-center text-gray-800 dark:text-white"><span className="material-symbols-outlined text-xl">chat</span></button>
                    <button className="flex size-10 rounded-full bg-gray-200 dark:bg-[#3A3B3C] items-center justify-center text-gray-800 dark:text-white"><span className="material-symbols-outlined text-xl">notifications</span></button>
                    <img src={currentUser?.avatarUrl} alt="User" className="size-10 rounded-full cursor-pointer"/>
                </div>
            </header>
            
            <div className="pt-[6.5rem]"> {/* pt-12 for master + pt-14 for social header */}
                {/* Main Feed */}
                <main className="flex-1 max-w-[680px] mx-auto py-6 px-2 sm:px-0 space-y-4">
                    <CreatePostWidget />
                    
                    {/* Posts Feed */}
                    {sortedPosts.map(post => {
                        const author = users.find(u => u.id === post.authorId);
                        return <PostCard key={post.id} post={post} author={author} onReact={togglePostReaction} />
                    })}
                </main>
            </div>
        </div>
    );
};

export default SocialMediaPage;