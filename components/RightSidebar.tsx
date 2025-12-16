import React from 'react';

const people = [
  { id: 1, name: 'Alex Johnson', mutuals: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80' },
  { id: 2, name: 'Maria Garcia', mutuals: 12, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80' },
  { id: 3, name: 'David Chen', mutuals: 2, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80' }
];

const trends = [
    { topic: 'Tech', name: '#React19', posts: '15.2K posts' },
    { topic: 'Music', name: '#IndieAcoustic', posts: '8,901 posts' },
    { topic: 'Gaming', name: '#EldenRingDLC', posts: '45.7K posts' }
];

const RightSidebar: React.FC = () => {
  return (
    <aside className="w-[360px] p-3 h-[calc(100vh-3.5rem)] sticky top-14">
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
        <div className="p-3">
          <h3 className="text-lg font-semibold text-text-secondary mb-2">People you may know</h3>
          {people.map(person => (
            <div key={person.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-dark-search transition-colors">
              <img src={person.avatar} alt={person.name} className="size-12 rounded-full" />
              <div className="flex-1">
                <p className="font-bold text-sm text-e4e6eb">{person.name}</p>
                <p className="text-xs text-text-secondary">{person.mutuals} mutual friends</p>
                <button className="mt-1 w-full h-8 text-sm font-bold bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors">Add Friend</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;