import React from 'react';
import { ViewState } from '../App';
import { useData } from '../contexts/DataContext';


const LeftSidebar: React.FC = () => {
  const { state } = useData();
  const { currentUser } = state;

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
    <nav className="flex flex-col gap-1 p-3 h-full sticky top-14">
      <a href="#profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-dark-search transition-colors min-h-[44px]">
        <img src={currentUser.avatarUrl} alt={currentUser.name} className="size-9 rounded-full" />
        <span className="font-medium text-text-secondary">{currentUser.name}</span>
      </a>
      {navItems.map(item => (
        <a key={item.label} href={item.view ? `#${item.view}` : '#'} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-dark-search transition-colors min-h-[44px]">
          <span className={`material-symbols-outlined text-3xl ${item.color}`}>{item.icon}</span>
          <span className="font-medium text-text-secondary">{item.label}</span>
        </a>
      ))}
      <div className="border-t border-border-dark my-3"></div>
    </nav>
  );
};

export default LeftSidebar;