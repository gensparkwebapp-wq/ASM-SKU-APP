
import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { Notification, NotificationType } from '../data/socialSphereTypes';
import { timeAgo } from './PostCard';

type FilterType = 'All' | 'Unread' | 'Friend Requests' | 'Mentions';

const NotificationIconBadge: React.FC<{ type: NotificationType }> = ({ type }) => {
    let icon = 'notifications';
    let bg = 'bg-gray-500';
    let color = 'text-white';

    switch (type) {
        case 'friend_request_received':
            icon = 'person_add';
            bg = 'bg-primary-blue';
            break;
        case 'post_liked':
            icon = 'favorite';
            bg = 'bg-red-500';
            break;
        case 'post_commented':
            icon = 'chat_bubble';
            bg = 'bg-green-500';
            break;
        case 'message_received':
            icon = 'chat';
            bg = 'bg-sky-500';
            break;
        case 'group_join_request_received':
            icon = 'groups';
            bg = 'bg-orange-500';
            break;
        default:
            icon = 'notifications';
            bg = 'bg-purple-500';
    }

    return (
        <div className={`absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full ${bg} ring-2 ring-white dark:ring-[#1A2633]`}>
            <span className={`material-symbols-outlined ${color} text-[10px] font-bold`}>{icon}</span>
        </div>
    );
};

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const { state, actions } = useData();
    const { users, posts, groups } = state;
    
    const actor = users.find(u => u.id === notification.data.actorUserId);
    const post = notification.data.postId ? posts.find(p => p.id === notification.data.postId) : null;
    const group = notification.data.groupId ? groups.find(g => g.id === notification.data.groupId) : null;

    if (!actor) return null;

    const isFriendRequest = notification.type === 'friend_request_received';
    const isGroupRequest = notification.type === 'group_join_request_received';
    
    // Thumbnail Logic
    const thumbnail = post?.mediaUrls?.[0] || post?.attachments?.find(a => a.kind === 'image')?.url;

    const renderContent = () => {
        switch (notification.type) {
            case 'friend_request_received':
                return (
                    <span>
                        <span className="font-bold text-slate-900 dark:text-white">{actor.name}</span> sent you a friend request.
                    </span>
                );
            case 'friend_request_accepted':
                return (
                    <span>
                        <span className="font-bold text-slate-900 dark:text-white">{actor.name}</span> accepted your friend request.
                    </span>
                );
            case 'post_liked':
                return (
                    <span>
                        <span className="font-bold text-slate-900 dark:text-white">{actor.name}</span> liked your photo.
                    </span>
                );
            case 'post_commented':
                return (
                    <span>
                        <span className="font-bold text-slate-900 dark:text-white">{actor.name}</span> commented on your post.
                    </span>
                );
            case 'group_join_request_received':
                return (
                    <span>
                        <span className="font-bold text-slate-900 dark:text-white">{actor.name}</span> requested to join <span className="font-semibold">{group?.name}</span>.
                    </span>
                );
            default:
                return (
                    <span>
                        <span className="font-bold text-slate-900 dark:text-white">{actor.name}</span> updated their status.
                    </span>
                );
        }
    };

    const handleConfirm = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFriendRequest && notification.data.friendRequestId) {
            actions.respondToFriendRequest(notification.data.friendRequestId as string, true);
            actions.markNotificationRead(notification.id);
        } else if (isGroupRequest && notification.data.groupRequestId) {
            actions.respondToJoinRequest(notification.data.groupRequestId as string, true);
            actions.markNotificationRead(notification.id);
        }
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFriendRequest && notification.data.friendRequestId) {
            actions.respondToFriendRequest(notification.data.friendRequestId as string, false);
            actions.markNotificationRead(notification.id);
        } else if (isGroupRequest && notification.data.groupRequestId) {
            actions.rejectJoinRequest(notification.data.groupRequestId as string);
            actions.markNotificationRead(notification.id);
        }
    };

    const handleMainClick = () => {
        actions.markNotificationRead(notification.id);
        // Navigation logic here... (e.g. to profile, post, etc)
        if (notification.data.postId) window.location.hash = 'feed'; // ideally scroll to post
        if (notification.data.friendRequestId) window.location.hash = `profile/${actor.id}`;
    };

    return (
        <div 
            onClick={handleMainClick}
            className={`flex flex-col gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/50 dark:bg-primary-blue/10' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
        >
            <div className="flex gap-3">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <img src={actor.avatarUrl} alt={actor.name} className="h-12 w-12 rounded-full object-cover bg-gray-200" />
                    <NotificationIconBadge type={notification.type} />
                </div>

                {/* Content Text */}
                <div className="flex flex-col flex-1 justify-center min-h-[48px]">
                    <p className="text-gray-800 dark:text-gray-200 text-sm leading-snug">
                        {renderContent()}
                        <span className="text-primary-blue font-medium ml-1 text-xs">{timeAgo(notification.createdAt)}</span>
                    </p>
                    {isFriendRequest && <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">2 mutual friends</p>}
                </div>

                {/* Thumbnail (if applicable) */}
                {thumbnail && (
                    <div className="shrink-0 pt-1">
                        <div 
                            className="h-10 w-10 rounded-lg bg-gray-200 bg-cover bg-center" 
                            style={{ backgroundImage: `url("${thumbnail}")` }}
                        ></div>
                    </div>
                )}

                {/* Unread Dot */}
                {!notification.read && (
                    <div className="shrink-0 flex items-center self-center pl-1">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary-blue"></div>
                    </div>
                )}
            </div>

            {/* Inline Actions (Friend/Group Requests) */}
            {(isFriendRequest || isGroupRequest) && (
                <div className="pl-[60px] flex gap-2">
                    <button 
                        onClick={handleConfirm}
                        className="flex-1 h-8 rounded-lg bg-primary-blue text-white text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                        Confirm
                    </button>
                    <button 
                        onClick={handleDelete}
                        className="flex-1 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

const NotificationsPage: React.FC = () => {
    const { state, actions } = useData();
    const { currentUser, currentUserNotifications } = state;
    const [filter, setFilter] = useState<FilterType>('All');

    if (!currentUser) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
                <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">notifications_off</span>
                <p className="text-gray-500">Please log in to see your notifications.</p>
                <a href="#login" className="mt-4 px-6 py-2 bg-primary-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">Log In</a>
            </div>
        );
    }

    const filteredNotifications = useMemo(() => {
        let filtered = currentUserNotifications;
        if (filter === 'Unread') {
            filtered = filtered.filter(n => !n.read);
        } else if (filter === 'Friend Requests') {
            filtered = filtered.filter(n => n.type === 'friend_request_received');
        } else if (filter === 'Mentions') {
            // Mock mentions as post comments for now
            filtered = filtered.filter(n => n.type === 'post_commented');
        }
        return filtered;
    }, [currentUserNotifications, filter]);

    const newNotifications = filteredNotifications.filter(n => !n.read);
    const earlierNotifications = filteredNotifications.filter(n => n.read);

    return (
        <div className="flex flex-col h-full bg-surface-light dark:bg-background-dark min-h-screen">
            {/* Sticky Header */}
            <header className="sticky top-0 z-20 bg-surface-light dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between px-4 py-3">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">Notifications</h1>
                    <button 
                        onClick={() => actions.markAllNotificationsRead()}
                        className="text-primary-blue text-sm font-semibold hover:opacity-80 transition-opacity"
                    >
                        Mark all as read
                    </button>
                </div>
                {/* Filter Chips */}
                <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar">
                    {(['All', 'Unread', 'Friend Requests', 'Mentions'] as FilterType[]).map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`flex h-8 shrink-0 items-center justify-center rounded-full px-4 transition-colors text-sm font-medium ${
                                filter === type 
                                ? 'bg-primary-blue text-white' 
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col pb-8">
                {/* Section: New */}
                {newNotifications.length > 0 && (
                    <div>
                        <div className="px-4 py-3 bg-gray-50 dark:bg-background-dark sticky top-[108px] z-10 border-b border-gray-100 dark:border-gray-800/50">
                            <h3 className="text-gray-900 dark:text-gray-200 text-base font-bold leading-tight">New</h3>
                        </div>
                        {newNotifications.map(notification => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </div>
                )}

                {/* Section: Earlier */}
                {earlierNotifications.length > 0 && (
                    <div>
                        <div className="px-4 py-3 bg-gray-50 dark:bg-background-dark sticky top-[108px] z-10 border-b border-gray-100 dark:border-gray-800/50">
                            <h3 className="text-gray-900 dark:text-gray-200 text-base font-bold leading-tight">Earlier</h3>
                        </div>
                        {earlierNotifications.map(notification => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </div>
                )}

                {filteredNotifications.length === 0 && (
                    <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined text-5xl mb-4 opacity-50">notifications_none</span>
                        <p>No notifications found.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default NotificationsPage;
