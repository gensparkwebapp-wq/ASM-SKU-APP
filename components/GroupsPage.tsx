
import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { Group, User, GroupJoinRequest } from '../data/socialSphereTypes';
import { getMembershipForUserInGroup, getPendingJoinRequestsForGroup, getGroupsForUser, getGroupsUserCanSee } from '../utils/groupUtils';
import PostCard from './PostCard';
import CreatePostWidget from './CreatePostWidget';

type Tab = 'feed' | 'about' | 'members' | 'admin';
type PrivacyFilter = 'all' | 'public' | 'private';

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
    const { state, actions } = useData();
    const { currentUser, groupJoinRequests, groupMemberships } = state;

    // Derived state
    const membership = currentUser ? groupMemberships.find(m => m.groupId === group.id && m.userId === currentUser.id) : undefined;
    const request = currentUser ? groupJoinRequests.find(r => r.groupId === group.id && r.userId === currentUser.id && r.status === 'pending') : undefined;
    
    const isMember = !!membership;
    const isPending = !!request;
    const isAdmin = membership?.role === 'admin';
    const memberCount = groupMemberships.filter(m => m.groupId === group.id).length;

    const handleJoinClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        actions.joinGroup(group.id);
    };

    const handleViewClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.hash = `group/${group.id}`;
    };

    let actionButton;
    if (isMember) {
        actionButton = (
            <button onClick={handleViewClick} className="w-full h-9 bg-surface-dark-search text-e4e6eb font-bold rounded-lg text-sm hover:bg-white/10 transition-colors">
                View Group
            </button>
        );
    } else if (isPending) {
        actionButton = (
            <button disabled className="w-full h-9 bg-surface-dark-search text-text-secondary font-bold rounded-lg text-sm cursor-not-allowed flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-base">hourglass_top</span> Request Sent
            </button>
        );
    } else {
        const label = group.privacy === 'private' ? 'Request to Join' : 'Join Group';
        actionButton = (
            <button onClick={handleJoinClick} className="w-full h-9 bg-primary-blue/20 text-primary-blue font-bold rounded-lg text-sm hover:bg-primary-blue/30 transition-colors">
                {label}
            </button>
        );
    }

    return (
        <a href={`#group/${group.id}`} className="bg-surface-dark rounded-lg shadow-md border border-border-dark overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform relative h-full">
            <div className="w-full h-28 bg-cover bg-center" style={{backgroundImage: `url(${group.coverPhotoUrl})`}}></div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-e4e6eb text-lg group-hover:underline truncate flex-1">{group.name}</h4>
                    {isAdmin && (
                        <span className="px-1.5 py-0.5 rounded bg-primary-blue/20 text-primary-blue text-[10px] font-bold uppercase shrink-0 mt-1">
                            Admin
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-1 mb-4">
                    <span className="material-symbols-outlined text-sm">{group.privacy === 'public' ? 'public' : 'lock'}</span>
                    <span className="capitalize">{group.privacy} Group</span>
                    <span>•</span>
                    <span>{memberCount} member{memberCount !== 1 ? 's' : ''}</span>
                </div>
                <div className="mt-auto">
                    {actionButton}
                </div>
            </div>
        </a>
    )
}

const GroupsPage: React.FC = () => {
  const { state } = useData();
  const { currentUser } = state;
  const [activeTab, setActiveTab] = useState<'your_groups' | 'discover'>('your_groups');
  const [searchQuery, setSearchQuery] = useState('');
  const [privacyFilter, setPrivacyFilter] = useState<PrivacyFilter>('all');

  const { yourGroups, discoverGroups } = useMemo(() => {
    if (!currentUser) {
        return { yourGroups: [], discoverGroups: [] };
    }

    const myGroups = getGroupsForUser(state, currentUser.id);
    const visibleGroups = getGroupsUserCanSee(state, currentUser.id);
    
    // Discoverable groups are those user can see but is not a member of
    let discoverable = visibleGroups.filter(g => !myGroups.some(mg => mg.id === g.id));

    // Apply search query
    if (searchQuery.trim() !== '') {
        const lowerQuery = searchQuery.toLowerCase();
        discoverable = discoverable.filter(g =>
            g.name.toLowerCase().includes(lowerQuery) ||
            g.description?.toLowerCase().includes(lowerQuery)
        );
    }

    // Apply privacy filter
    if (privacyFilter !== 'all') {
        discoverable = discoverable.filter(g => g.privacy === privacyFilter);
    }
    
    return { yourGroups: myGroups, discoverGroups: discoverable };
  }, [state, currentUser, searchQuery, privacyFilter]);

  if (!currentUser) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center p-6 animate-in fade-in duration-300">
            <div className="bg-surface-dark p-8 rounded-2xl border border-border-dark max-w-md w-full">
                <span className="material-symbols-outlined text-6xl text-primary-blue mb-4">groups</span>
                <h2 className="text-2xl font-bold text-white mb-2">Connect with Communities</h2>
                <p className="text-text-secondary mb-8">Log in to see your groups, discover new ones, and join the conversation.</p>
                <a href="#login" className="block w-full py-3 bg-primary-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
                    Log In
                </a>
            </div>
        </div>
      );
  }

  const TabButton: React.FC<{ tabId: 'your_groups' | 'discover', label: string, icon: string }> = ({ tabId, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center gap-3 ${activeTab === tabId ? 'bg-primary-blue/20 text-primary-blue' : 'text-text-secondary hover:bg-surface-dark-search hover:text-e4e6eb'}`}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      {label}
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full min-h-[calc(100vh-8rem)]">
      <aside className="w-full md:w-80 shrink-0 bg-surface-dark rounded-lg p-3 self-start md:sticky md:top-20 h-fit border border-border-dark">
        <h2 className="text-2xl font-bold p-3 mb-2 text-white">Groups</h2>
        
        <nav className="space-y-1">
          <TabButton tabId="your_groups" label="Your Groups" icon="group_work" />
          <TabButton tabId="discover" label="Discover" icon="explore" />
        </nav>
      </aside>
      
      <main className="flex-1 animate-in fade-in duration-300">
        {activeTab === 'your_groups' && (
           <div className="space-y-6">
              <div className="flex items-center justify-between bg-surface-dark p-4 rounded-lg border border-border-dark">
                  <h3 className="text-xl font-bold text-white">Your Groups ({yourGroups.length})</h3>
                  <a href="#create-group" className="h-9 px-4 flex items-center justify-center gap-2 bg-primary-blue text-white font-bold rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    <span className="material-symbols-outlined text-base">add_circle</span>
                    Create Group
                  </a>
              </div>
              {yourGroups.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {yourGroups.map(group => <GroupCard key={group.id} group={group} />)}
                </div>
              ) : (
                <div className="text-center py-20 bg-surface-dark rounded-lg border border-border-dark flex flex-col items-center">
                  <span className="material-symbols-outlined text-6xl text-text-secondary mb-4 opacity-50">group_off</span>
                  <p className="text-text-secondary text-lg font-medium">You haven't joined any groups yet.</p>
                  <p className="text-text-secondary/60 text-sm mt-1 mb-6">Find communities that share your interests or create your own.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setActiveTab('discover')} className="px-6 py-2 bg-surface-dark-search text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                        Discover Groups
                    </button>
                    <a href="#create-group" className="px-6 py-2 bg-primary-blue/10 text-primary-blue font-semibold rounded-lg hover:bg-primary-blue/20 transition-colors border border-primary-blue/20">
                        Create Group
                    </a>
                  </div>
                </div>
              )}
           </div>
        )}
         {activeTab === 'discover' && (
           <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white px-1">Discover Groups</h3>
              <div className="bg-surface-dark p-4 rounded-lg border border-border-dark space-y-4">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search groups..."
                        className="w-full h-11 pl-10 pr-4 rounded-full bg-surface-dark-search border-none focus:ring-2 focus:ring-primary-blue text-e4e6eb placeholder-text-secondary"
                    />
                </div>
                <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
                    <span className="text-sm font-bold text-text-secondary shrink-0">Filter:</span>
                    {(['all', 'public', 'private'] as PrivacyFilter[]).map(filter => (
                        <button 
                            key={filter}
                            onClick={() => setPrivacyFilter(filter)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors capitalize ${privacyFilter === filter ? 'bg-primary-blue text-white' : 'bg-surface-dark-search text-text-secondary hover:bg-white/10'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
              </div>

              {discoverGroups.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {discoverGroups.map(group => <GroupCard key={group.id} group={group} />)}
                </div>
              ) : (
                <div className="text-center py-20 bg-surface-dark rounded-lg border border-border-dark flex flex-col items-center">
                  <span className="material-symbols-outlined text-6xl text-text-secondary mb-4 opacity-50">search_off</span>
                  <p className="text-text-secondary text-lg">No groups found matching your criteria.</p>
                  <button onClick={() => { setSearchQuery(''); setPrivacyFilter('all'); }} className="mt-4 text-primary-blue font-semibold hover:underline">
                    Clear Filters
                  </button>
                </div>
              )}
           </div>
        )}
      </main>
    </div>
  );
};

export default GroupsPage;
