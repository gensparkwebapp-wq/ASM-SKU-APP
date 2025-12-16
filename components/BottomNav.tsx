import React from 'react';
import { ViewState } from '../App';

interface BottomNavProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const navItems: { view: ViewState; label: string; icon: string }[] = [
  { view: 'feed', label: 'Home', icon: 'home' },
  { view: 'friends', label: 'Friends', icon: 'group' },
  { view: 'messages', label: 'Messages', icon: 'chat' },
  { view: 'notifications', label: 'Alerts', icon: 'notifications' },
  { view: 'profile', label: 'Profile', icon: 'person' },
];

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate }) => {
  const isActive = (view: ViewState) => {
    return activeView === view;
  };

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-border-dark">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => (
          <button 
            key={item.view}
            onClick={() => onNavigate(item.view)}
            aria-label={item.label}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${isActive(item.view) ? 'text-primary-blue' : 'text-gray-600 dark:text-text-secondary'}`}
          >
            <span className={`material-symbols-outlined text-2xl ${isActive(item.view) ? 'filled' : ''}`}>{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;