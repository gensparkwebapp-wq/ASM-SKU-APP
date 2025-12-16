import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { Post, User, ReactionType } from '../data/socialSphereTypes';

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

const PostCard: React.FC<{ post: Post; author?: User }> = React.memo(({ post, author }) => {
    const { state, actions } = useData();
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");

    if (!author) {
        return null; // Or a loading/error state
    }

    const postComments = state.comments.filter(c => c.postId === post.id);
    const totalLikes = Object.values(post.likeCounts).reduce((sum: number, count: number) => sum + count, 0);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            actions.addComment(post.id, newComment);
            setNewComment("");
        }
    };

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md border border-gray-200 dark:border-border-dark">
            {/* Post Header */}
            <div className="flex items-center gap-3 p-4">
                <img src={author.avatarUrl} alt={author.name} className="size-10 rounded-full" />
                <div>
                    <p className="font-bold text-gray-900 dark:text-e4e6eb">{author.name}</p>
                    <p className="text-xs text-gray-500 dark:text-text-secondary">{timeAgo(post.createdAt)}</p>
                </div>
            </div>
            {/* Post Content */}
            {post.content && <p className="px-4 pb-2 text-gray-800 dark:text-e4e6eb whitespace-pre-wrap">{post.content}</p>}
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
            <div className="border-t border-gray-200 dark:border-border-dark mx-4 my-1"></div>
            <div className="flex justify-around py-1">
                <button onClick={() => actions.togglePostReaction(post.id, 'like')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark-search transition-colors`}>
                    <span className="material-symbols-outlined text-lg">thumb_up</span>
                    <span className="text-sm font-medium">Like</span>
                </button>
                <button onClick={() => setShowComments(prev => !prev)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark-search transition-colors">
                    <span className="material-symbols-outlined text-lg">chat_bubble_outline</span>
                    <span className="text-sm font-medium">Comment</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark-search transition-colors">
                    <span className="material-symbols-outlined text-lg">share</span>
                    <span className="text-sm font-medium">Share</span>
                </button>
            </div>
            {/* Comments Section */}
            {showComments && (
                <div className="p-4 border-t border-gray-200 dark:border-border-dark animate-in fade-in duration-300">
                    <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 mb-4">
                        <img src={state.currentUser?.avatarUrl} alt="Your avatar" className="size-8 rounded-full" />
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 h-9 px-3 rounded-full bg-gray-100 dark:bg-surface-dark-search border-none text-sm focus:ring-2 focus:ring-primary-blue text-gray-900 dark:text-e4e6eb"
                        />
                    </form>
                    <div className="space-y-3">
                        {postComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(comment => {
                            const commentAuthor = state.users.find(u => u.id === comment.authorId);
                            if (!commentAuthor) return null;
                            return (
                                <div key={comment.id} className="flex items-start gap-2">
                                    <img src={commentAuthor.avatarUrl} alt={commentAuthor.name} className="size-8 rounded-full" />
                                    <div className="bg-gray-100 dark:bg-surface-dark-search rounded-xl px-3 py-1.5">
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
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md p-4 border border-gray-200 dark:border-border-dark">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3">
                    <img src={user.avatarUrl} alt={user.name} className="size-10 rounded-full"/>
                    <input 
                        type="text" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`} 
                        className="flex-1 h-10 px-4 rounded-full bg-gray-100 dark:bg-surface-dark-search border-none focus:ring-2 focus:ring-primary-blue text-gray-900 dark:text-e4e6eb"
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