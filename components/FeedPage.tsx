
import React, { useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import PostCard from './PostCard';
import CreatePostWidget from './CreatePostWidget';

const StoryItem: React.FC<{ name: string; avatar: string; cover?: string; isSelf?: boolean }> = ({ name, avatar, cover, isSelf }) => (
    <div className="relative w-[110px] h-[190px] shrink-0 rounded-xl overflow-hidden cursor-pointer group border border-divider dark:border-divider-dark shadow-sm">
        {isSelf ? (
            <div className="flex flex-col h-full">
                <div className="h-3/5 w-full bg-cover bg-center" style={{ backgroundImage: `url("${avatar}")` }}></div>
                <div className="h-2/5 bg-surface-light dark:bg-surface-dark relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary rounded-full p-1 border-4 border-surface-light dark:border-surface-dark flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-xl font-bold">add</span>
                    </div>
                    <p className="absolute bottom-2 w-full text-center text-xs font-semibold text-text-main dark:text-text-main-dark">Create Story</p>
                </div>
            </div>
        ) : (
            <>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("${cover || avatar}")` }}></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-4 border-primary overflow-hidden shadow-md">
                    <img className="w-full h-full object-cover" src={avatar} alt={name} />
                </div>
                <p className="absolute bottom-3 left-3 text-white text-xs font-bold drop-shadow-md">{name}</p>
            </>
        )}
    </div>
);

const FeedPage: React.FC = () => {
    const { state } = useData();
    const { posts, users, currentUser } = state;

    const sortedPosts = useMemo(() => 
        posts
            .filter(p => !p.groupId)
            .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [posts]);

    const otherUsers = users.filter(u => u.id !== currentUser?.id).slice(0, 5);

    return (
        <div className="max-w-[680px] mx-auto animate-in fade-in duration-500">
            {/* Composer */}
            <CreatePostWidget />
            <div className="h-2 bg-background-light dark:bg-background-dark"></div>

            {/* Story Carousel */}
            <div className="bg-surface-light dark:bg-surface-dark py-4 overflow-hidden">
                <div className="flex overflow-x-auto gap-2 px-4 no-scrollbar pb-1">
                    <StoryItem 
                        isSelf 
                        name="Create Story" 
                        avatar={currentUser?.avatarUrl || ''} 
                    />
                    {otherUsers.map((user, idx) => (
                        <StoryItem 
                            key={user.id}
                            name={user.name.split(' ')[0]} 
                            avatar={user.avatarUrl || ''}
                            cover={[
                                "https://images.unsplash.com/photo-1517230878791-4d28214057c2?w=300&h=500&fit=crop",
                                "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300&h=500&fit=crop",
                                "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=500&fit=crop",
                                "https://images.unsplash.com/photo-1543321269-9d86d368095b?w=300&h=500&fit=crop",
                                "https://images.unsplash.com/photo-1484876065684-b683cf17a275?w=300&h=500&fit=crop"
                            ][idx % 5]}
                        />
                    ))}
                </div>
            </div>
            <div className="h-2 bg-background-light dark:bg-background-dark"></div>

            {/* Posts Feed */}
            <div className="space-y-2">
                {sortedPosts.map(post => {
                    const author = users.find(u => u.id === post.authorId);
                    return <PostCard key={post.id} post={post} author={author} />
                })}
            </div>

            {/* Footer Padding for Bottom Nav */}
            <div className="h-16 lg:hidden"></div>
        </div>
    );
};

export default FeedPage;
