import React from 'react';
import { useData } from '../contexts/DataContext';

const ProfilePage: React.FC = () => {
  const { state } = useData();
  const { currentUser } = state;

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-text-secondary">Loading profile...</div>
      </div>
    );
  }

  const formatCount = (num: number = 0) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Banner */}
      <div className="h-48 md:h-80 rounded-b-lg bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=400&fit=crop)' }}>
        {/* Avatar */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-background-dark"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold">{currentUser.name}</h1>
        <p className="text-text-secondary mt-1">@{currentUser.name.replace(/\s+/g, '_').toLowerCase()}</p>
        <p className="max-w-lg mx-auto mt-4 text-sm text-text-secondary">
          {currentUser.shortBio}
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-12 my-8 p-4">
        <div className="text-center">
          <p className="text-2xl font-bold">1.2K</p>
          <p className="text-sm text-text-secondary">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">15.4K</p>
          <p className="text-sm text-text-secondary">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">850</p>
          <p className="text-sm text-text-secondary">Following</p>
        </div>
      </div>
      
      {/* Placeholder Content (e.g., Post Grid) */}
      <div className="border-t border-border-dark pt-6">
        <h3 className="text-lg font-bold text-center mb-4 text-text-secondary">Posts</h3>
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="aspect-square bg-surface-dark rounded-md"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;