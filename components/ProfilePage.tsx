import React, { useState, useEffect, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { User, Post } from '../data/socialSphereTypes';
import PostCard from './PostCard';

const ProfilePage: React.FC = () => {
  const { state, actions } = useData();
  const { currentUser, users, posts, friendRequests } = state;
  const [profileUser, setProfileUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const parts = hash.split('/');
      const view = parts[0];
      const userId = parts[1];

      if (view === 'profile') {
        if (userId) {
          const user = users.find(u => u.id === userId);
          setProfileUser(user || null); // null if not found
        } else {
          setProfileUser(currentUser);
        }
      }
    };

    handleHashChange(); // Initial load
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [users, currentUser]);

  const userPosts = useMemo(() => {
    if (!profileUser) return [];
    return posts
      .filter(p => p.authorId === profileUser.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [profileUser, posts]);

  const relationship = useMemo(() => {
    if (!currentUser || !profileUser) return { status: 'loading' };
    if (currentUser.id === profileUser.id) return { status: 'self' };

    const friendIds = currentUser.friendIds || [];
    if (friendIds.includes(profileUser.id)) return { status: 'friends' };

    const sentRequest = friendRequests.find(req => req.fromUserId === currentUser.id && req.toUserId === profileUser.id);
    if (sentRequest) return { status: 'sent', request: sentRequest };

    const receivedRequest = friendRequests.find(req => req.fromUserId === profileUser.id && req.toUserId === currentUser.id);
    if (receivedRequest) return { status: 'received', request: receivedRequest };

    return { status: 'none' };
  }, [currentUser, profileUser, friendRequests]);

  if (profileUser === undefined) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-text-secondary">Loading profile...</div>
      </div>
    );
  }
  
  if (profileUser === null) {
     return (
      <div className="flex flex-col items-center justify-center text-center py-20 min-h-[60vh]">
        <span className="material-symbols-outlined text-6xl text-text-secondary mb-4">person_off</span>
        <h2 className="text-2xl font-bold mt-4 text-white">User Not Found</h2>
        <p className="mt-2 text-white/60 max-w-sm">Sorry, we couldn't find a profile at this address.</p>
      </div>
    );
  }

  const friendCount = profileUser.friendIds?.length || 0;

  const ActionButtons: React.FC = () => {
    if (!profileUser) return null;

    switch (relationship.status) {
        case 'self':
            return <button className="px-4 py-2 bg-surface-dark-search text-e4e6eb font-bold rounded-lg text-sm hover:bg-white/10 transition-all flex items-center gap-1.5"><span className="material-symbols-outlined text-base">edit</span>Edit Profile</button>;
        case 'friends':
            return <button onClick={() => actions.unfriend(profileUser.id)} className="px-4 py-2 bg-red-500/20 text-red-400 font-bold rounded-lg text-sm hover:bg-red-500/30 transition-all flex items-center gap-1.5"><span className="material-symbols-outlined text-base">person_remove</span>Unfriend</button>;
        case 'sent':
            return <button onClick={() => actions.cancelFriendRequest(relationship.request.id)} className="px-4 py-2 bg-surface-dark-search text-e4e6eb font-bold rounded-lg text-sm hover:bg-white/10 transition-all flex items-center gap-1.5"><span className="material-symbols-outlined text-base">cancel_schedule_send</span>Cancel Request</button>;
        case 'received':
            return (
                <>
                    <button onClick={() => actions.acceptFriendRequest(relationship.request.id)} className="px-4 py-2 bg-primary-blue text-white font-bold rounded-lg text-sm hover:bg-blue-600 transition-all flex items-center gap-1.5"><span className="material-symbols-outlined text-base">check</span>Confirm</button>
                    <button onClick={() => actions.declineFriendRequest(relationship.request.id)} className="px-4 py-2 bg-surface-dark-search text-e4e6eb font-bold rounded-lg text-sm hover:bg-white/10 transition-all flex items-center gap-1.5"><span className="material-symbols-outlined text-base">close</span>Delete</button>
                </>
            );
        case 'none':
            return <button onClick={() => actions.sendFriendRequest(profileUser.id)} className="px-4 py-2 bg-primary-blue text-white font-bold rounded-lg text-sm hover:bg-blue-600 transition-all flex items-center gap-1.5"><span className="material-symbols-outlined text-base">person_add</span>Add Friend</button>;
        default:
            return null;
    }
};


  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Banner */}
      <div className="h-48 md:h-80 rounded-b-lg bg-cover bg-center relative bg-surface-dark">
         <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=400&fit=crop" className="w-full h-full object-cover rounded-b-lg opacity-50" />
      </div>

      <div className="px-4">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-24 gap-4 md:gap-6 pb-6">
            <img
              src={profileUser.avatarUrl}
              alt={profileUser.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-background-dark shrink-0"
            />
          <div className="flex-1 flex flex-col md:flex-row items-center md:items-end justify-between w-full gap-4 text-center md:text-left">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{profileUser.name}</h1>
              <p className="text-text-secondary mt-1">{friendCount} {friendCount === 1 ? 'friend' : 'friends'}</p>
              <p className="max-w-lg mt-2 text-sm text-text-secondary">
                {profileUser.shortBio}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ActionButtons />
              {relationship.status !== 'self' && <button className="px-4 py-2 bg-surface-dark-search text-e4e6eb font-bold rounded-lg text-sm hover:bg-white/10 transition-all flex items-center gap-1.5"><span className="material-symbols-outlined text-base">chat</span>Message</button>}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border-dark mt-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 px-4">
            <button className="px-4 py-3 border-b-2 border-primary-blue text-primary-blue font-bold text-sm">Posts</button>
            <button className="px-4 py-3 border-b-2 border-transparent text-text-secondary font-bold text-sm hover:bg-surface-dark-search rounded-t-lg">About</button>
            <button className="px-4 py-3 border-b-2 border-transparent text-text-secondary font-bold text-sm hover:bg-surface-dark-search rounded-t-lg">Friends</button>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column (Intro/Friends) */}
        <div className="lg:col-span-5 space-y-4">
            <div className="bg-surface-dark rounded-lg p-4 border border-border-dark">
                <h3 className="font-bold text-lg mb-2">Intro</h3>
                <p className="text-sm text-text-secondary">{profileUser.shortBio}</p>
            </div>
             <div className="bg-surface-dark rounded-lg p-4 border border-border-dark">
                <h3 className="font-bold text-lg mb-2">Friends</h3>
                <p className="text-sm text-text-secondary">{friendCount} {friendCount === 1 ? 'friend' : 'friends'}</p>
                {/* Placeholder for friends grid */}
            </div>
        </div>

        {/* Right column (Posts) */}
        <div className="lg:col-span-7 space-y-4">
            {relationship.status === 'self' && <CreatePostWidget />}
            {userPosts.length > 0 ? (
                userPosts.map(post => (
                    <PostCard key={post.id} post={post} author={profileUser} />
                ))
            ) : (
                <div className="bg-surface-dark rounded-lg p-8 text-center border border-border-dark">
                    <p className="text-text-secondary">No posts to show.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

// Minimal CreatePostWidget for profile page context
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
        <div className="bg-surface-dark rounded-lg p-4 border border-border-dark">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3">
                    <img src={user.avatarUrl} alt={user.name} className="size-10 rounded-full"/>
                    <input 
                        type="text" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`What's on your mind?`} 
                        className="flex-1 h-10 px-4 rounded-full bg-surface-dark-search border-none focus:ring-2 focus:ring-primary-blue text-e4e6eb"
                    />
                </div>
                 <div className="border-t border-border-dark my-3"></div>
                <div className="flex justify-end">
                    <button type="submit" disabled={!content.trim()} className="px-6 h-9 bg-primary-blue text-white font-bold text-sm rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">Post</button>
                </div>
            </form>
         </div>
    );
};


export default ProfilePage;