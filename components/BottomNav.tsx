
import React from 'react';
import { ViewState } from '../App';
import { useData } from '../contexts/DataContext';

interface BottomNavProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate }) => {
  const { state } = useData();
  const { currentUser, unreadCount } = state;

  const isActive = (view: ViewState) => activeView === view;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-light dark:bg-surface-dark border-t border-divider dark:border-divider-dark px-2 pb-5 pt-2 shrink-0 lg:hidden">
      <div className="flex items-center justify-between px-2">
        <button 
          onClick={() => onNavigate('feed')}
          className="flex flex-col items-center justify-center w-full gap-1 group"
        >
          <span className={`material-symbols-outlined text-[28px] ${isActive('feed') ? 'text-primary' : 'text-text-secondary dark:text-text-secondary-dark'}`}>
            home
          </span>
        </button>

        <button 
          onClick={() => onNavigate('groups')}
          className="flex flex-col items-center justify-center w-full gap-1 group relative"
        >
          <span className={`material-symbols-outlined text-[28px] ${isActive('groups') ? 'text-primary' : 'text-text-secondary dark:text-text-secondary-dark'}`}>
            group
          </span>
          <span className="absolute top-0 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-surface-light dark:border-surface-dark">2</span>
        </button>

        <button 
          onClick={() => onNavigate('watch')}
          className="flex flex-col items-center justify-center w-full gap-1 group relative"
        >
          <span className={`material-symbols-outlined text-[28px] ${isActive('watch') ? 'text-primary' : 'text-text-secondary dark:text-text-secondary-dark'}`}>
            smart_display
          </span>
          <span className="absolute top-0 right-4 flex h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-surface-light dark:border-surface-dark"></span>
        </button>

        <button 
          onClick={() => onNavigate('marketplace')}
          className="flex flex-col items-center justify-center w-full gap-1 group"
        >
          <span className={`material-symbols-outlined text-[28px] ${isActive('marketplace') ? 'text-primary' : 'text-text-secondary dark:text-text-secondary-dark'}`}>
            storefront
          </span>
        </button>

        <button 
          onClick={() => onNavigate('notifications')}
          className="flex flex-col items-center justify-center w-full gap-1 group relative"
        >
          <span className={`material-symbols-outlined text-[28px] ${isActive('notifications') ? 'text-primary' : 'text-text-secondary dark:text-text-secondary-dark'}`}>
            notifications
          </span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-surface-light dark:border-surface-dark">
                {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        <button 
          onClick={() => onNavigate('profile')}
          className="flex flex-col items-center justify-center w-full gap-1 group"
        >
          <div className="relative">
            <div 
              className="w-7 h-7 rounded-full bg-cover bg-center border border-divider dark:border-divider-dark" 
              style={{ backgroundImage: `url("${currentUser?.avatarUrl}")` }}
            ></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-surface-light dark:bg-surface-dark rounded-full flex items-center justify-center border border-divider">
              <span className="material-symbols-outlined text-[10px] text-text-main dark:text-text-main-dark">menu</span>
            </div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
