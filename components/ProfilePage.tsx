import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Banner */}
      <div className="h-48 md:h-64 rounded-lg bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=400&fit=crop)' }}>
        {/* Avatar */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&q=80"
            alt="User Profile"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-surface-light dark:border-surface-dark"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mt-16">
        <h1 className="text-3xl font-bold">Arjun Mehta</h1>
        <p className="text-gray-500 dark:text-text-secondary mt-1">@arjun_mehta</p>
        <p className="max-w-md mx-auto mt-4 text-sm">
          Music producer & sound designer from Mumbai. Crafting sounds for the future. 
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-8 my-6 p-4 bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm">
        <div>
          <p className="text-xl font-bold">1.2K</p>
          <p className="text-xs text-gray-500 dark:text-text-secondary">Posts</p>
        </div>
        <div>
          <p className="text-xl font-bold">15.4K</p>
          <p className="text-xs text-gray-500 dark:text-text-secondary">Followers</p>
        </div>
        <div>
          <p className="text-xl font-bold">850</p>
          <p className="text-xs text-gray-500 dark:text-text-secondary">Following</p>
        </div>
      </div>
      
      {/* Placeholder Content (e.g., Photo Grid) */}
      <div className="border-t border-gray-200 dark:border-border-dark pt-6">
        <h3 className="text-lg font-bold text-center mb-4">Posts</h3>
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 dark:bg-surface-dark-search rounded-md animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
