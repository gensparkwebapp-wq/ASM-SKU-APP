import React from 'react';

const MessagesPage: React.FC = () => {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow min-h-[calc(100vh-10rem)] flex flex-col md:flex-row border border-gray-200 dark:border-border-dark">
      {/* Conversation List */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 dark:border-border-dark">
        <div className="p-4 border-b border-gray-200 dark:border-border-dark">
          <h2 className="text-xl font-bold">Messages</h2>
        </div>
        <div className="p-2 space-y-1">
          {/* Active Conversation */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-100 dark:bg-surface-dark-search cursor-pointer">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" className="size-12 rounded-full"/>
            <div>
              <p className="font-bold text-sm">Maria Garcia</p>
              <p className="text-xs text-gray-500 dark:text-text-secondary truncate">Sounds good! See you then.</p>
            </div>
          </div>
          {/* Other Conversations */}
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark-search cursor-pointer">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" className="size-12 rounded-full"/>
            <div>
              <p className="font-semibold text-sm">Alex Johnson</p>
              <p className="text-xs text-gray-500 dark:text-text-secondary truncate">Yeah, I can send the file over...</p>
            </div>
          </div>
        </div>
      </div>
      {/* Chat Window */}
      <div className="hidden md:flex w-full md:w-2/3 flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-border-dark flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" className="size-10 rounded-full"/>
            <h3 className="font-bold">Maria Garcia</h3>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* Placeholder messages */}
          <div className="flex justify-end"><div className="bg-primary-blue text-white p-3 rounded-2xl max-w-xs">Hey! Are we still on for tomorrow?</div></div>
          <div className="flex justify-start"><div className="bg-gray-200 dark:bg-surface-dark-search p-3 rounded-2xl max-w-xs">Yep, absolutely! Looking forward to it.</div></div>
          <div className="flex justify-end"><div className="bg-primary-blue text-white p-3 rounded-2xl max-w-xs">Sounds good! See you then.</div></div>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-border-dark">
          <input className="w-full h-10 px-4 rounded-full bg-gray-100 dark:bg-surface-dark-search border-none" placeholder="Type a message..."/>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;