import React from 'react';
import { ViewState } from '../App';
import { useSocialSphereData } from '../contexts/SocialSphereDataContext';


const LeftSidebar: React.FC = () => {
  const { currentUser } = useSocialSphereData();

  const navItems: { icon: string; label: string; color: string; view?: ViewState }[] = [
    { icon: 'group', label: 'Friends', color: 'text-primary-blue', view: 'friends' },
    { icon: 'bookmark', label: 'Saved', color: 'text-purple-500' },
    { icon: 'groups', label: 'Groups', color: 'text-cyan-500', view: 'groups' },
    { icon: 'storefront', label: 'Marketplace', color: 'text-green-500', view: 'marketplace' },
    { icon: 'smart_display', label: 'Watch', color: 'text-red-500', view: 'watch' },
    { icon: 'history', label: 'Memories', color: 'text-blue-400' },
  ];

  if (!currentUser) return null; // Or a loading state

  return (
    <aside className="hidden lg:block w-80 p-3 h-[calc(100vh-56px)] sticky top-14">
      <nav className="flex flex-col gap-1">
        <a href="#profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-surface-dark-search transition-colors">
          <img src={currentUser.avatarUrl} alt={currentUser.name} className="size-9 rounded-full" />
          <span className="font-semibold">{currentUser.name}</span>
        </a>
        {navItems.map(item => (
          <a key={item.label} href={item.view ? `#${item.view}` : '#'} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-surface-dark-search transition-colors">
            <span className={`material-symbols-outlined text-3xl ${item.color}`}>{item.icon}</span>
            <span className="font-semibold">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="border-t border-gray-300 dark:border-border-dark my-3"></div>
    </aside>
  );
};

export default LeftSidebar;