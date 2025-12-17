
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Post, User } from '../data/socialSphereTypes';

export const timeAgo = (isoString: string): string => {
    const date = new Date(isoString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return "Just now";
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "m";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
};

const PostCard: React.FC<{ post: Post; author?: User }> = React.memo(({ post, author }) => {
    const { state, actions } = useData();
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");

    if (!author) return null;

    const postComments = state.comments.filter(c => c.postId === post.id);
    const totalLikes = post.likedByUserIds?.length || 0;
    const userHasLiked = state.currentUser ? post.likedByUserIds?.includes(state.currentUser.id) : false;

    const hasAttachments = post.attachments && post.attachments.length > 0;
    const hasLegacyMedia = post.mediaUrls && post.mediaUrls.length > 0;

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() && state.currentUser) {
            actions.addComment(post.id, newComment);
            setNewComment("");
        }
    };

    return (
        <article className="bg-surface-light dark:bg-surface-dark flex flex-col border-b border-divider dark:border-divider-dark lg:rounded-lg lg:border lg:mb-4 transition-colors">
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <a href={`#profile/${author.id}`} className="size-10 rounded-full bg-gray-200 dark:bg-divider-dark overflow-hidden shrink-0 transition-opacity hover:opacity-90">
                        <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
                    </a>
                    <div>
                        <a href={`#profile/${author.id}`} className="text-text-main dark:text-text-main-dark text-[15px] font-semibold leading-tight hover:underline">
                            {author.name}
                        </a>
                        <div className="flex items-center gap-1 text-text-secondary dark:text-text-secondary-dark text-[12px] font-normal">
                            <span>{timeAgo(post.createdAt)}</span>
                            <span>•</span>
                            <span className="material-symbols-outlined text-[12px]">{post.audience === 'public' ? 'public' : 'group'}</span>
                        </div>
                    </div>
                </div>
                <button className="text-text-secondary dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1 transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                </button>
            </div>

            {/* Content Text */}
            {post.content && (
                <div className="px-4 pb-3">
                    <p className="text-text-main dark:text-text-main-dark text-[15px] leading-normal whitespace-pre-wrap">
                        {post.content}
                    </p>
                </div>
            )}

            {/* Media */}
            {hasAttachments ? (
                <div className={`w-full bg-background-light dark:bg-[#18191a] aspect-video grid gap-0.5 overflow-hidden ${post.attachments!.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {post.attachments!.map((att) => (
                        <div key={att.id} className="relative w-full h-full">
                            {att.kind === 'video' ? (
                                <video src={att.url} controls playsInline preload="metadata" className="w-full h-full object-cover" />
                            ) : (
                                <img src={att.url} alt="attachment" className="w-full h-full object-cover" loading="lazy" />
                            )}
                        </div>
                    ))}
                </div>
            ) : hasLegacyMedia ? (
                <div className="w-full bg-background-light dark:bg-[#18191a] aspect-[4/3] overflow-hidden">
                    <img src={post.mediaUrls![0]} alt="Post content" className="w-full h-full object-cover" loading="lazy" />
                </div>
            ) : null}

            {/* Stats */}
            <div className="px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1">
                        <div className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center border-2 border-white dark:border-surface-dark z-10">
                            <span className="material-symbols-outlined text-[10px] text-white filled">thumb_up</span>
                        </div>
                        <div className="w-[18px] h-[18px] rounded-full bg-red-500 flex items-center justify-center border-2 border-white dark:border-surface-dark">
                            <span className="material-symbols-outlined text-[10px] text-white filled">favorite</span>
                        </div>
                    </div>
                    <p className="text-text-secondary dark:text-text-secondary-dark text-[13px] hover:underline cursor-pointer">
                        {totalLikes.toLocaleString()}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <p className="text-text-secondary dark:text-text-secondary-dark text-[13px] hover:underline cursor-pointer">{postComments.length} comments</p>
                    <p className="text-text-secondary dark:text-text-secondary-dark text-[13px] hover:underline cursor-pointer">4 shares</p>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-4 h-px bg-divider dark:bg-divider-dark"></div>

            {/* Action Buttons */}
            <div className="px-2 py-1 flex items-center justify-between">
                <button 
                    onClick={() => actions.togglePostReaction(post.id, 'like')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group ${userHasLiked ? 'text-primary' : 'text-text-secondary dark:text-text-secondary-dark'}`}
                >
                    <span className={`material-symbols-outlined text-[20px] ${userHasLiked ? 'filled' : ''}`}>thumb_up</span>
                    <span className="font-medium text-[13px]">Like</span>
                </button>
                <button 
                    onClick={() => setShowComments(!showComments)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group text-text-secondary dark:text-text-secondary-dark"
                >
                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    <span className="font-medium text-[13px]">Comment</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group text-text-secondary dark:text-text-secondary-dark">
                    <span className="material-symbols-outlined text-[20px] -scale-x-100">reply</span>
                    <span className="font-medium text-[13px]">Share</span>
                </button>
            </div>

            {/* Comments Overlay/Section */}
            {showComments && (
                <div className="p-4 border-t border-divider dark:border-divider-dark animate-in fade-in duration-300">
                    <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
                        <img src={state.currentUser?.avatarUrl} className="size-8 rounded-full object-cover shrink-0" />
                        <input 
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            placeholder="Write a comment..." 
                            className="flex-1 h-9 px-4 rounded-full bg-background-light dark:bg-[#3a3b3c] border-none text-[14px] focus:ring-2 focus:ring-primary text-text-main dark:text-white"
                        />
                    </form>
                    <div className="space-y-4">
                        {postComments.map(comment => {
                            const cAuthor = state.users.find(u => u.id === comment.authorId);
                            if (!cAuthor) return null;
                            return (
                                <div key={comment.id} className="flex gap-2">
                                    <img src={cAuthor.avatarUrl} className="size-8 rounded-full object-cover shrink-0" />
                                    <div className="bg-background-light dark:bg-[#3a3b3c] rounded-2xl px-3 py-2">
                                        <p className="font-bold text-xs text-text-main dark:text-white">{cAuthor.name}</p>
                                        <p className="text-sm text-text-main dark:text-gray-200">{comment.content}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </article>
    );
});

export default PostCard;
