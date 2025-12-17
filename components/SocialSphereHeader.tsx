
import React, { useState, useRef, useEffect } from 'react';
import { ViewState } from '../App';
import { useData } from '../contexts/DataContext';

interface SocialSphereHeaderProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
  onToggleMobileMenu: () => void;
}

const SocialSphereHeader: React.FC<SocialSphereHeaderProps> = ({ activeView, onNavigate, onToggleMobileMenu }) => {
  const { state } = useData();
  const { unreadMessagesCount } = state;

  return (
    <header className="fixed top-12 left-0 right-0 z-50 h-14 bg-surface-light dark:bg-surface-dark px-4 py-2 border-b border-divider dark:border-divider-dark flex items-center justify-between shrink-0 transition-colors">
      <div className="flex items-center gap-2">
        <button 
          onClick={onToggleMobileMenu} 
          className="lg:hidden flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-divider-dark transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        <h1 
          onClick={() => onNavigate('feed')}
          className="text-primary text-2xl font-bold tracking-tight cursor-pointer hover:opacity-90 transition-opacity"
        >
          SocialApp
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-background-light dark:bg-divider-dark text-text-main dark:text-text-main-dark hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <span className="material-symbols-outlined text-2xl">search</span>
        </button>
        <button 
          onClick={() => onNavigate('messages')}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background-light dark:bg-divider-dark text-text-main dark:text-text-main-dark hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative"
        >
          <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
          {unreadMessagesCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-surface-light dark:border-surface-dark">
              {unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default SocialSphereHeader;
