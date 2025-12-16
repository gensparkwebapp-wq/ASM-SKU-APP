import React, { useMemo } from 'react';
import { useData } from '../contexts/DataContext';

const trends = [
    { topic: 'Tech', name: '#React19', posts: '15.2K posts' },
    { topic: 'Music', name: '#IndieAcoustic', posts: '8,901 posts' },
    { topic: 'Gaming', name: '#EldenRingDLC', posts: '45.7K posts' }
];

const RightSidebar: React.FC = () => {
  const { state, actions } = useData();
  const { currentUser, users, friendRequests } = state;

  const suggestions = useMemo(() => {
    if (!currentUser) return [];
    
    const friendIds = currentUser.friendIds || [];
    const sentRequestIds = friendRequests
        .filter(req => req.fromUserId === currentUser.id)
        .map(req => req.toUserId);
    const receivedRequestIds = friendRequests
        .filter(req => req.toUserId === currentUser.id)
        .map(req => req.fromUserId);
    
    const excludedIds = new Set([
        currentUser.id,
        ...friendIds,
        ...sentRequestIds,
        ...receivedRequestIds,
    ]);

    // Simple suggestion: just filter and shuffle, take first few
    return users.filter(user => !excludedIds.has(user.id))
      .sort(() => 0.5 - Math.random()) // pseudo-randomize
      .slice(0, 3);

  }, [currentUser, users, friendRequests]);


  return (
    <aside className="w-[360px] p-3 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto hide-scrollbar">
      <div className="space-y-4">
        {/* Trends for you */}
        <div className="p-3">
          <h3 className="text-lg font-semibold text-text-secondary mb-2">Trends for you</h3>
          <div className="space-y-3">
            {trends.map(trend => (
              <div key={trend.name} className="p-2 rounded-lg hover:bg-surface-dark-search cursor-pointer">
                <p className="text-xs text-text-secondary">{trend.topic} · Trending</p>
                <p className="font-bold text-sm text-e4e6eb">{trend.name}</p>
                <p className="text-xs text-text-secondary">{trend.posts}</p>
              </div>
            ))}
          </div>
           <div className="border-t border-border-dark my-4"></div>
        </div>

        {/* People you may know */}
        {suggestions.length > 0 && (
          <div className="p-3">
            <h3 className="text-lg font-semibold text-text-secondary mb-2">People you may know</h3>
            {suggestions.map(person => (
              <div key={person.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-dark-search transition-colors">
                <a href={`#profile/${person.id}`}>
                    <img src={person.avatarUrl} alt={person.name} className="size-12 rounded-full" />
                </a>
                <div className="flex-1">
                  <a href={`#profile/${person.id}`} className="font-bold text-sm text-e4e6eb hover:underline">{person.name}</a>
                  <button onClick={() => actions.sendFriendRequest(person.id)} className="mt-1 w-full h-8 text-sm font-bold bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors">Add Friend</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;