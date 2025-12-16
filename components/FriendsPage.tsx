import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { User, FriendRequest } from '../data/socialSphereTypes';

type FriendsPageTab = 'requests' | 'all' | 'suggestions';

const UserCard: React.FC<{ user: User, children: React.ReactNode }> = ({ user, children }) => (
    <div className="bg-surface-dark rounded-lg shadow-md border border-border-dark overflow-hidden flex flex-col">
        <a href={`#profile/${user.id}`}>
            <img src={user.avatarUrl} alt={user.name} className="w-full h-40 object-cover" />
        </a>
        <div className="p-4 flex flex-col flex-1">
            <a href={`#profile/${user.id}`} className="font-bold text-e4e6eb hover:underline truncate">{user.name}</a>
            <div className="mt-auto pt-3">
                {children}
            </div>
        </div>
    </div>
);


const FriendsPage: React.FC = () => {
  const { state, actions } = useData();
  const { currentUser, users, friendRequests } = state;
  const [activeTab, setActiveTab] = useState<FriendsPageTab>('requests');

  const { friends, receivedRequests, sentRequests, suggestions } = useMemo(() => {
    if (!currentUser) {
        return { friends: [], receivedRequests: [], sentRequests: [], suggestions: [] };
    }
    
    const friendIds = currentUser.friendIds || [];
    const friends = users.filter(u => friendIds.includes(u.id));

    const received = friendRequests.filter(req => req.toUserId === currentUser.id);
    const sent = friendRequests.filter(req => req.fromUserId === currentUser.id);

    const sentRequestIds = sent.map(req => req.toUserId);
    const receivedRequestIds = received.map(req => req.fromUserId);
    
    const excludedIds = new Set([
        currentUser.id,
        ...friendIds,
        ...sentRequestIds,
        ...receivedRequestIds,
    ]);
    const suggestions = users.filter(user => !excludedIds.has(user.id));

    return { friends, receivedRequests: received, sentRequests: sent, suggestions };
  }, [currentUser, users, friendRequests]);
  
  if (!currentUser) {
    return <div className="text-center p-8 text-text-secondary">Please log in to see your friends.</div>;
  }
  
  const TabButton: React.FC<{tabId: FriendsPageTab; label: string; count?: number;}> = ({ tabId, label, count }) => (
      <button 
        onClick={() => setActiveTab(tabId)} 
        className={`w-full text-left flex items-center justify-between p-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === tabId ? 'bg-surface-dark-search text-e4e6eb' : 'text-text-secondary hover:bg-surface-dark-search'}`}
      >
        <span>{label}</span>
        {count !== undefined && count > 0 && <span className="px-2 py-0.5 rounded-full bg-primary-blue text-white text-xs">{count}</span>}
      </button>
  );

  const renderContent = () => {
    switch (activeTab) {
        case 'requests':
            const allRequests = [...receivedRequests, ...sentRequests];
            return (
                <div>
                    {receivedRequests.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-bold mb-4">Incoming Requests ({receivedRequests.length})</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {receivedRequests.map(req => {
                                    const user = users.find(u => u.id === req.fromUserId);
                                    if (!user) return null;
                                    return (
                                        <UserCard key={req.id} user={user}>
                                            <div className="flex flex-col gap-2">
                                                <button onClick={() => actions.acceptFriendRequest(req.id)} className="w-full h-9 bg-primary-blue text-white font-bold rounded-lg text-sm">Confirm</button>
                                                <button onClick={() => actions.declineFriendRequest(req.id)} className="w-full h-9 bg-surface-dark-search text-e4e6eb font-bold rounded-lg text-sm">Delete</button>
                                            </div>
                                        </UserCard>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {sentRequests.length > 0 && (
                         <div className="mb-8">
                            <h3 className="text-lg font-bold mb-4">Sent Requests ({sentRequests.length})</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {sentRequests.map(req => {
                                    const user = users.find(u => u.id === req.toUserId);
                                    if (!user) return null;
                                    return (
                                        <UserCard key={req.id} user={user}>
                                            <button onClick={() => actions.cancelFriendRequest(req.id)} className="w-full h-9 bg-surface-dark-search text-e4e6eb font-bold rounded-lg text-sm">Cancel Request</button>
                                        </UserCard>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {allRequests.length === 0 && <p className="text-text-secondary">No new friend requests.</p>}
                </div>
            );
        case 'all':
            return (
                 <div>
                    <h3 className="text-lg font-bold mb-4">All Friends ({friends.length})</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {friends.map(user => (
                            <UserCard key={user.id} user={user}>
                                <button onClick={() => actions.unfriend(user.id)} className="w-full h-9 bg-surface-dark-search text-e4e6eb font-bold rounded-lg text-sm">Unfriend</button>
                            </UserCard>
                        ))}
                    </div>
                 </div>
            );
        case 'suggestions':
             return (
                 <div>
                    <h3 className="text-lg font-bold mb-4">Suggestions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {suggestions.map(user => (
                            <UserCard key={user.id} user={user}>
                                <button onClick={() => actions.sendFriendRequest(user.id)} className="w-full h-9 bg-primary-blue text-white font-bold rounded-lg text-sm">Add Friend</button>
                            </UserCard>
                        ))}
                    </div>
                </div>
            );
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full min-h-[calc(100vh-8rem)]">
      <aside className="w-full md:w-80 shrink-0 bg-surface-dark rounded-lg p-3 self-start md:sticky md:top-20">
        <h2 className="text-2xl font-bold p-3 mb-2">Friends</h2>
        <nav className="space-y-1">
            <TabButton tabId="requests" label="Friend Requests" count={receivedRequests.length} />
            <TabButton tabId="all" label="All Friends" />
            <TabButton tabId="suggestions" label="Suggestions" />
        </nav>
      </aside>
      <main className="flex-1">
        <div className="animate-in fade-in duration-300">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default FriendsPage;