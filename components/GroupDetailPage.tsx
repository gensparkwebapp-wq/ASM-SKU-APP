
import React, { useState, useMemo, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { Group, User, GroupJoinRequest } from '../data/socialSphereTypes';
import { getMembershipForUserInGroup, getPendingJoinRequestsForGroup } from '../utils/groupUtils';
import PostCard from './PostCard';
import CreatePostWidget from './CreatePostWidget';

type Tab = 'feed' | 'about' | 'members' | 'admin';

const AdminPanel: React.FC<{
    groupId: string;
    pendingRequests: GroupJoinRequest[];
    membersList: (User & { groupRole: 'member' | 'admin', membershipId: string })[];
}> = ({ groupId, pendingRequests, membersList }) => {
    const { state, actions } = useData();
    const { users } = state;

    return (
        <div className="space-y-6 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Requests Section */}
             <div className="bg-surface-dark rounded-lg p-6 border border-border-dark">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                    Member Requests
                    {pendingRequests.length > 0 && <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">{pendingRequests.length}</span>}
                </h3>
                {pendingRequests.length > 0 ? (
                    <div className="space-y-3">
                        {pendingRequests.map(req => {
                            const reqUser = users.find(u => u.id === req.userId);
                            if (!reqUser) return null;
                            return (
                                <div key={req.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-surface-dark-search rounded-lg gap-4 border border-white/5">
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <img src={reqUser.avatarUrl} className="size-12 rounded-full object-cover" alt={reqUser.name} />
                                        <div>
                                            <span className="font-bold text-white block">{reqUser.name}</span>
                                            <span className="text-xs text-text-secondary">Requested {new Date(req.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button onClick={() => actions.respondToJoinRequest(req.id, true)} className="flex-1 sm:flex-none px-4 py-2 bg-primary-blue text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors">Approve</button>
                                        <button onClick={() => actions.rejectJoinRequest(req.id)} className="flex-1 sm:flex-none px-4 py-2 bg-white/10 text-white text-sm font-bold rounded-lg hover:bg-white/20 transition-colors">Decline</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8 text-text-secondary border border-dashed border-border-dark rounded-lg bg-surface-dark-search/30">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">person_check</span>
                        <p>No pending requests at the moment.</p>
                    </div>
                )}
            </div>

            {/* Members List Section */}
            <div className="bg-surface-dark rounded-lg p-6 border border-border-dark">
                <h3 className="text-xl font-bold mb-4 text-white">Manage Members</h3>
                <div className="max-h-96 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                    {membersList.map(member => (
                        <div key={member.id} className="flex items-center justify-between p-3 hover:bg-surface-dark-search rounded-lg transition-colors group">
                            <div className="flex items-center gap-3">
                                <img src={member.avatarUrl} className="size-10 rounded-full object-cover" alt={member.name} />
                                <div>
                                    <span className="font-medium text-e4e6eb block">{member.name}</span>
                                    <span className="text-xs text-text-secondary capitalize">{member.groupRole}</span>
                                </div>
                            </div>
                            {member.groupRole === 'admin' && <span className="text-[10px] uppercase font-bold text-primary-blue bg-primary-blue/10 px-2 py-1 rounded">Admin</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const GroupDetailPage: React.FC = () => {
    const { state, actions } = useData();
    const { currentUser, groups, posts, users, groupJoinRequests, groupMemberships } = state;
    const [group, setGroup] = useState<Group | null | undefined>(undefined);
    const [activeTab, setActiveTab] = useState<Tab>('feed');

    useEffect(() => {
        const handleHashChange = () => {
          const hash = window.location.hash.substring(1);
          const parts = hash.split('/');
          if (parts[0] === 'group' && parts[1]) {
            const foundGroup = groups.find(g => g.id === parts[1]);
            setGroup(foundGroup || null);
            setActiveTab('feed');
          }
        };
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [groups]);

    // Current User Status
    const membership = useMemo(() => {
        if (!group || !currentUser) return undefined;
        return getMembershipForUserInGroup(state, currentUser.id, group.id);
    }, [group, currentUser, state]);

    const isMember = !!membership;
    const isAdmin = membership?.role === 'admin';
    const hasPendingRequest = useMemo(() => group && currentUser ? groupJoinRequests.some(r => r.groupId === group.id && r.userId === currentUser.id) : false, [group, currentUser, groupJoinRequests]);

    // Group Data Lists
    const groupPosts = useMemo(() => {
        if (!group) return [];
        return posts
            .filter(p => p.groupId === group.id)
            .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [group, posts]);

    const pendingRequests = useMemo(() => {
        if (!isAdmin || !group) return [];
        return getPendingJoinRequestsForGroup(state, group.id);
    }, [isAdmin, group, state]);

    const membersList = useMemo(() => {
        if (!group) return [];
        const memberships = groupMemberships.filter(m => m.groupId === group.id);
        return memberships.map(m => {
            const user = users.find(u => u.id === m.userId);
            return user ? { ...user, groupRole: m.role, membershipId: m.id } : null;
        }).filter(Boolean) as (User & { groupRole: 'member' | 'admin', membershipId: string })[];
    }, [group, users, groupMemberships]);


    if (group === undefined) {
        return <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin size-8 border-4 border-primary-blue border-t-transparent rounded-full"></div></div>;
    }
    if (group === null) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-secondary">
                <span className="material-symbols-outlined text-6xl mb-4">group_off</span>
                <h2 className="text-xl font-bold text-white">Group not found</h2>
                <a href="#groups" className="mt-4 text-primary-blue hover:underline">Back to Groups</a>
            </div>
        );
    }

    const handleLeaveGroup = () => {
        if (window.confirm("Are you sure you want to leave this group?")) {
            actions.leaveGroup(group.id);
        }
    };

    const ActionButton = () => {
        if (!currentUser) {
            return (
                <a href="#login" className="px-4 py-2 bg-primary-blue text-white font-bold rounded-lg text-sm hover:bg-blue-600 transition-all flex items-center gap-1.5 shadow-lg shadow-primary-blue/20">
                    Log in to join
                </a>
            );
        }
        if (isMember) {
            return (
                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex px-3 py-2 bg-green-500/10 text-green-500 font-bold rounded-lg text-sm border border-green-500/20 items-center gap-1.5 cursor-default">
                        <span className="material-symbols-outlined text-base">check</span>
                        Joined
                    </div>
                    <button onClick={handleLeaveGroup} className="px-3 py-2 bg-surface-dark-search text-text-secondary font-bold rounded-lg text-sm hover:bg-white/10 hover:text-white transition-all flex items-center gap-2" title="Leave Group">
                        <span className="material-symbols-outlined text-base">logout</span>
                        <span className="sm:hidden">Leave</span>
                    </button>
                </div>
            );
        }
        if (hasPendingRequest) {
            return (
                <div className="px-4 py-2 bg-surface-dark-search text-text-secondary font-bold rounded-lg text-sm flex items-center gap-1.5 cursor-default border border-border-dark">
                    <span className="material-symbols-outlined text-base">hourglass_top</span>
                    Request Pending
                </div>
            );
        }
        
        const label = group.privacy === 'private' ? 'Request to Join' : 'Join Group';
        return (
            <button onClick={() => actions.joinGroup(group.id)} className="px-4 py-2 bg-primary-blue text-white font-bold rounded-lg text-sm hover:bg-blue-600 transition-all flex items-center gap-1.5 shadow-lg shadow-primary-blue/20">
                <span className="material-symbols-outlined text-base">group_add</span>
                {label}
            </button>
        );
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'feed':
                if (!isMember && group.privacy === 'private') {
                    return (
                        <div className="bg-surface-dark rounded-lg p-12 text-center border border-border-dark mt-4">
                            <span className="material-symbols-outlined text-5xl text-text-secondary mb-4">lock</span>
                            <h3 className="font-bold text-xl mt-2 text-white">This Group is Private</h3>
                            <p className="text-text-secondary mt-2">Join this group to view posts and participate.</p>
                        </div>
                    );
                }
                return (
                    <div className="max-w-2xl mx-auto mt-4 space-y-4">
                        {isMember && <CreatePostWidget groupId={group.id} />}
                        {groupPosts.length > 0 ? (
                            groupPosts.map(post => {
                                const author = users.find(u => u.id === post.authorId);
                                return <PostCard key={post.id} post={post} author={author} />
                            })
                        ) : (
                            <div className="bg-surface-dark rounded-lg p-12 text-center border border-border-dark">
                                <span className="material-symbols-outlined text-5xl text-text-secondary mb-3">forum</span>
                                <h3 className="font-bold text-lg text-white">No posts yet</h3>
                                <p className="text-sm text-text-secondary mt-1">Be the first to share something with the group!</p>
                            </div>
                        )}
                    </div>
                );
            case 'about':
                const owner = users.find(u => u.id === group.ownerId);
                return (
                    <div className="bg-surface-dark rounded-lg p-6 border border-border-dark mt-4">
                        <h3 className="text-xl font-bold mb-4 text-white">About this Group</h3>
                        {group.description && <p className="text-e4e6eb whitespace-pre-wrap mb-6 leading-relaxed">{group.description}</p>}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-text-secondary text-2xl mt-0.5">public</span>
                                <div>
                                    <p className="font-bold text-e4e6eb text-base">{group.privacy === 'public' ? 'Public' : 'Private'}</p>
                                    <p className="text-text-secondary mt-0.5">
                                        {group.privacy === 'public' 
                                            ? 'Anyone can see who\'s in the group and what they post.' 
                                            : 'Only members can see who\'s in the group and what they post.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-text-secondary text-2xl mt-0.5">history</span>
                                <div>
                                    <p className="font-bold text-e4e6eb text-base">History</p>
                                    <p className="text-text-secondary mt-0.5">Created on {new Date(group.createdAt).toLocaleDateString()} by <span className="text-white font-medium">{owner ? owner.name : 'Unknown'}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'members':
                return (
                    <div className="bg-surface-dark rounded-lg p-6 border border-border-dark mt-4">
                        <h3 className="text-xl font-bold mb-4 text-white">Members · {membersList.length}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {membersList.map(member => (
                                <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-dark-search transition-colors border border-transparent hover:border-border-dark">
                                    <a href={`#profile/${member.id}`}>
                                        <img src={member.avatarUrl} alt={member.name} className="size-12 rounded-full object-cover" />
                                    </a>
                                    <div className="flex-1 min-w-0">
                                        <a href={`#profile/${member.id}`} className="font-bold text-e4e6eb hover:underline block truncate">{member.name}</a>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {group.ownerId === member.id && (
                                                <span className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase border border-yellow-500/20">Owner</span>
                                            )}
                                            {member.groupRole === 'admin' && group.ownerId !== member.id && (
                                                <span className="px-1.5 py-0.5 rounded bg-primary-blue/20 text-primary-blue text-[10px] font-bold uppercase border border-primary-blue/20">Admin</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-text-secondary truncate mt-0.5">{member.shortBio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'admin':
                if (!isAdmin) return <div className="p-8 text-center text-red-400 font-bold bg-surface-dark rounded-lg mt-4 border border-border-dark">Access Denied: Admins Only</div>;
                return <AdminPanel groupId={group.id} pendingRequests={pendingRequests} membersList={membersList} />;
            default: return null;
        }
    }

    return (
        <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300 pb-10">
            {/* Group Header */}
            <div className="bg-surface-dark rounded-b-lg shadow-lg border-x border-b border-border-dark">
                <div className="h-48 md:h-80 bg-cover bg-center relative" style={{backgroundImage: `url(${group.coverPhotoUrl})`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <h1 className="text-3xl md:text-5xl font-bold text-white shadow-sm">{group.name}</h1>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mt-2">
                            <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                                <span className="material-symbols-outlined text-sm">{group.privacy === 'public' ? 'public' : 'lock'}</span>
                                <span className="capitalize">{group.privacy} Group</span>
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="font-semibold text-white">{membersList.length} member{membersList.length !== 1 ? 's' : ''}</span>
                        </div>
                    </div>
                </div>
                
                <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5">
                    <div className="flex gap-1 overflow-x-auto hide-scrollbar w-full md:w-auto border-b md:border-b-0 border-white/5 pb-2 md:pb-0">
                        {(['feed', 'about', 'members', ...(isAdmin ? ['admin'] : [])] as Tab[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap capitalize ${
                                    activeTab === tab 
                                    ? 'text-primary-blue border-primary-blue' 
                                    : 'text-text-secondary border-transparent hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {tab}
                                {tab === 'admin' && pendingRequests.length > 0 && (
                                    <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full">{pendingRequests.length}</span>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="shrink-0 w-full md:w-auto flex justify-end pb-3 md:pb-0">
                        <ActionButton />
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default GroupDetailPage;
