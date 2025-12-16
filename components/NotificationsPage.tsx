import React from 'react';

const notifications = [
    { type: 'like', user: 'Maria Garcia', text: 'liked your post.', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', icon: 'favorite', color: 'text-red-500' },
    { type: 'comment', user: 'Alex Johnson', text: 'commented on your photo.', time: '5 hours ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', icon: 'chat_bubble', color: 'text-primary-blue' },
    { type: 'friend', user: 'David Chen', text: 'sent you a friend request.', time: '1 day ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', icon: 'person_add', color: 'text-green-500' },
];

const NotificationsPage: React.FC = () => {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow p-6 border border-gray-200 dark:border-border-dark max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="space-y-2">
        {notifications.map((notif, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark-search cursor-pointer">
            <div className="relative">
                <img src={notif.avatar} className="size-14 rounded-full" />
                <div className={`absolute -bottom-1 -right-1 size-6 rounded-full flex items-center justify-center ${notif.color} bg-surface-light dark:bg-surface-dark`}>
                    <span className="material-symbols-outlined text-sm filled">{notif.icon}</span>
                </div>
            </div>
            <div className="flex-1">
              <p className="text-sm"><span className="font-bold">{notif.user}</span> {notif.text}</p>
              <p className="text-xs text-primary-blue">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
