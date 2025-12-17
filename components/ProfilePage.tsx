
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useData } from '../contexts/DataContext';
import { User, Post } from '../data/socialSphereTypes';
import PostCard from './PostCard';
import { getRelationshipStatus, getFriendsOfUser } from '../utils/friendshipUtils';
import CreatePostWidget from './CreatePostWidget';
import Modal from './Modal';

// --- SUB-COMPONENTS ---

const ProfileHeader: React.FC<{ user: User; onBack: () => void }> = ({ user, onBack }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`sticky top-[6.5rem] z-40 flex items-center justify-between bg-white/95 dark:bg-[#101922]/95 backdrop-blur-sm p-4 border-b border-gray-100 dark:border-gray-800 transition-all duration-300`}>
            <button 
                onClick={onBack}
                className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#111418] dark:text-white transition-colors"
            >
                <span className="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
            <div className={`text-base font-bold text-[#111418] dark:text-white transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
                {user.name}
            </div>
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#111418] dark:text-white transition-colors">
                <span className="material-symbols-outlined">more_horiz</span>
            </button>
        </div>
    );
};

const ProfileActionButtons: React.FC<{ user: User; relationship: any; actions: any }> = ({ user, relationship, actions }) => {
    if (relationship.status === 'self') {
        return (
            <div className="flex gap-3 mb-6">
                <button className="flex-1 h-10 bg-primary-blue hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    Add to Story
                </button>
                <button className="flex-1 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#111418] dark:text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                    Edit Profile
                </button>
                <button className="h-10 w-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#111418] dark:text-white rounded-lg flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
            </div>
        );
    } else if (relationship.status === 'friends') {
        return (
            <div className="flex gap-3 mb-6">
                <button className="flex-1 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#111418] dark:text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                    Friends
                </button>
                <button className="flex-1 h-10 bg-primary-blue hover:bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    Message
                </button>
                <button className="h-10 w-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#111418] dark:text-white rounded-lg flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
            </div>
        );
    } else {
        // Not friends
        const isPendingOutgoing = relationship.status === 'outgoing_request';
        const isPendingIncoming = relationship.status === 'incoming_request';

        return (
            <div className="flex gap-3 mb-6">
                {isPendingOutgoing ? (
                    <button onClick={() => actions.cancelFriendRequest(relationship.request.id)} className="flex-1 h-10 bg-gray-100 dark:bg-gray-800 text-[#111418] dark:text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                        Requested
                    </button>
                ) : isPendingIncoming ? (
                    <button onClick={() => actions.respondToFriendRequest(relationship.request.id, true)} className="flex-1 h-10 bg-primary-blue text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                        Confirm
                    </button>
                ) : (
                    <button onClick={() => actions.sendFriendRequest(user.id)} className="flex-1 h-10 bg-primary-blue hover:bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">person_add</span>
                        Add Friend
                    </button>
                )}
                <button className="flex-1 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#111418] dark:text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    Message
                </button>
                <button className="h-10 w-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#111418] dark:text-white rounded-lg flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
            </div>
        );
    }
};

const FriendsPreviewSection: React.FC<{ user: User }> = ({ user }) => {
    const { state } = useData();
    const friends = useMemo(() => getFriendsOfUser(user.id, state), [user.id, state]);
    const displayFriends = friends.slice(0, 6); // Show top 6

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-[#111418] dark:text-white">Friends</span>
                    <span className="text-sm text-gray-500">{friends.length} friends</span>
                </div>
                <span className="text-primary-blue text-sm font-medium hover:underline cursor-pointer">Find Friends</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {displayFriends.map(friend => (
                    <div key={friend.id} className="flex flex-col gap-1 cursor-pointer" onClick={() => window.location.hash = `profile/${friend.id}`}>
                        <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden">
                            <img className="w-full h-full object-cover" src={friend.avatarUrl} alt={friend.name} />
                        </div>
                        <span className="text-xs font-semibold truncate text-[#111418] dark:text-gray-200">{friend.name}</span>
                    </div>
                ))}
            </div>
            <button className="w-full mt-3 h-9 bg-gray-100 dark:bg-gray-800 text-[#111418] dark:text-white rounded-lg text-sm font-semibold transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
                See all friends
            </button>
        </div>
    );
};

// --- MAIN PROFILE PAGE COMPONENT ---

const ProfilePage: React.FC = () => {
  const { state, actions } = useData();
  const { currentUser, users, posts } = state;
  const [profileUser, setProfileUser] = useState<User | null | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'posts' | 'photos' | 'about'>('posts');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const parts = hash.split('/');
      const view = parts[0];
      const userId = parts[1];

      if (view === 'profile') {
        if (userId) {
          const user = users.find(u => u.id === userId);
          setProfileUser(user || null);
        } else {
          setProfileUser(currentUser);
        }
         setActiveTab('posts'); 
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
    return getRelationshipStatus(currentUser?.id, profileUser?.id, state);
  }, [currentUser, profileUser, state]);


  if (profileUser === undefined) {
    return (
      <div className="flex items-center justify-center h-screen pt-20">
        <div className="animate-spin size-8 border-4 border-primary-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (profileUser === null) {
     return (
      <div className="flex flex-col items-center justify-center text-center py-20 min-h-screen pt-20">
        <span className="material-symbols-outlined text-6xl text-text-secondary mb-4">person_off</span>
        <h2 className="text-2xl font-bold mt-4 text-white">User Not Found</h2>
        <p className="mt-2 text-white/60 max-w-sm">Sorry, we couldn't find a profile at this address.</p>
        <button onClick={() => window.history.back()} className="mt-6 px-6 py-2 bg-white/10 rounded-lg font-bold text-white hover:bg-white/20">Go Back</button>
      </div>
    );
  }

  const isSelf = relationship.status === 'self';

  return (
    <div className="relative flex h-full w-full max-w-2xl mx-auto flex-col bg-white dark:bg-background-dark min-h-screen shadow-xl">
        <ProfileHeader user={profileUser} onBack={() => window.history.back()} />
        
        {/* Scrollable Content */}
        <div className="flex flex-col pb-20">
            {/* Cover Photo */}
            <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-800">
                <div 
                    className="w-full h-full bg-center bg-cover" 
                    style={{ backgroundImage: `url("${profileUser.coverPhotoUrl || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=300&fit=crop&q=80'}")` }}
                >
                </div>
            </div>

            {/* Profile Info Container */}
            <div className="px-4 pb-4 relative">
                {/* Avatar (Overlapping) */}
                <div className="relative -mt-16 mb-3 flex justify-between items-end">
                    <div className="size-32 rounded-full border-[4px] border-white dark:border-[#101922] bg-gray-200 dark:bg-gray-700 overflow-hidden shadow-sm">
                        <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url("${profileUser.avatarUrl}")` }}></div>
                    </div>
                    {isSelf && (
                        <button className="mb-1 rounded-full bg-gray-100 dark:bg-gray-800 p-2 text-[#111418] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                        </button>
                    )}
                </div>

                {/* Identity */}
                <div className="flex flex-col gap-1 mb-4">
                    <h1 className="text-2xl font-bold leading-tight text-[#111418] dark:text-white">{profileUser.name}</h1>
                    <p className="text-base font-normal text-gray-600 dark:text-gray-400">{profileUser.shortBio || "No bio added."}</p>
                </div>

                {/* Detailed Info List */}
                <div className="flex flex-col gap-2 mb-6">
                    {profileUser.work && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <span className="material-symbols-outlined text-[20px] text-gray-400">work</span>
                            <span className="text-sm">{profileUser.work}</span>
                        </div>
                    )}
                    {profileUser.education && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <span className="material-symbols-outlined text-[20px] text-gray-400">school</span>
                            <span className="text-sm">{profileUser.education}</span>
                        </div>
                    )}
                    {profileUser.location && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <span className="material-symbols-outlined text-[20px] text-gray-400">location_on</span>
                            <span className="text-sm">{profileUser.location}</span>
                        </div>
                    )}
                    {profileUser.website && (
                        <div className="flex items-center gap-2 text-primary-blue">
                            <span className="material-symbols-outlined text-[20px]">link</span>
                            <a className="text-sm font-medium hover:underline" href={`https://${profileUser.website}`} target="_blank" rel="noreferrer">{profileUser.website}</a>
                        </div>
                    )}
                     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px] text-gray-400">cake</span>
                        <span className="text-sm">Joined {new Date(profileUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                </div>

                <ProfileActionButtons user={profileUser} relationship={relationship} actions={actions} />

                {/* Divider */}
                <div className="h-px w-full bg-gray-200 dark:bg-gray-800 mb-4"></div>

                {/* Friends Section */}
                <FriendsPreviewSection user={profileUser} />
            </div>

            {/* Thick Divider */}
            <div className="h-2 bg-gray-100 dark:bg-[#0b1219]"></div>

            {/* Sticky Tab Navigation */}
            <div className="sticky top-[104px] z-30 bg-white dark:bg-[#101922] border-b border-gray-200 dark:border-gray-800 flex">
                <button 
                    onClick={() => setActiveTab('posts')}
                    className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === 'posts' ? 'text-primary-blue border-b-2 border-primary-blue' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-400'}`}
                >
                    Posts
                </button>
                <button 
                    onClick={() => setActiveTab('photos')}
                    className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === 'photos' ? 'text-primary-blue border-b-2 border-primary-blue' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-400'}`}
                >
                    Photos
                </button>
                <button 
                    onClick={() => setActiveTab('about')}
                    className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === 'about' ? 'text-primary-blue border-b-2 border-primary-blue' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-400'}`}
                >
                    About
                </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-col bg-gray-100 dark:bg-[#0b1219] gap-2 pt-2 min-h-[300px]">
                {activeTab === 'posts' && (
                    <>
                        {isSelf && (
                            <div className="bg-white dark:bg-background-dark p-4">
                                <CreatePostWidget />
                            </div>
                        )}
                        {userPosts.length > 0 ? (
                            userPosts.map(post => (
                                <PostCard key={post.id} post={post} author={profileUser} />
                            ))
                        ) : (
                            <div className="p-8 flex justify-center text-gray-400 text-sm">
                                No posts to show
                            </div>
                        )}
                        {userPosts.length > 0 && (
                            <div className="p-8 flex justify-center text-gray-400 text-sm">
                                No more posts to show
                            </div>
                        )}
                    </>
                )}
                {activeTab === 'photos' && (
                    <div className="bg-white dark:bg-background-dark p-4 text-center text-text-secondary">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">photo_library</span>
                        <p>No photos yet.</p>
                    </div>
                )}
                {activeTab === 'about' && (
                    <div className="bg-white dark:bg-background-dark p-6 text-sm text-gray-600 dark:text-gray-300">
                        <h3 className="font-bold text-lg mb-4 text-[#111418] dark:text-white">More about {profileUser.name}</h3>
                        <p>User ID: {profileUser.id}</p>
                        <p className="mt-2">Role: {profileUser.role}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;
