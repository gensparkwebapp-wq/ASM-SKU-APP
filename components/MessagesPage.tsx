
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useData } from '../contexts/DataContext';
import { User, Conversation } from '../data/socialSphereTypes';
import { timeAgo } from './PostCard';
import Modal from './Modal';

// --- Sub-Components ---

const ActiveUsersRail: React.FC<{ users: User[] }> = ({ users }) => {
    return (
        <div className="py-4 pl-4 border-b border-gray-200 dark:border-gray-800/50 shrink-0">
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pr-4">
                {/* Add Story Item */}
                <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
                    <div className="size-[52px] rounded-full bg-gray-200 dark:bg-surface-dark flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">add</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Your Story</span>
                </div>
                
                {/* Active Users List */}
                {users.slice(0, 10).map((user) => (
                    <div key={user.id} className="flex flex-col items-center gap-1 shrink-0 relative cursor-pointer group">
                        <div className="relative">
                            <div 
                                className="bg-center bg-no-repeat bg-cover rounded-full size-[52px] ring-2 ring-transparent group-hover:ring-primary-blue/50 transition-all" 
                                style={{ backgroundImage: `url("${user.avatarUrl}")` }}
                            ></div>
                            <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full border-2 border-white dark:border-[#101922]"></div>
                        </div>
                        <span className="text-xs text-gray-900 dark:text-white font-medium max-w-[60px] truncate">{user.name.split(' ')[0]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface ConversationItemProps {
    conversation: Conversation;
    isActive: boolean;
    onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isActive, onClick }) => {
    const { state } = useData();
    const { currentUser, users, messages } = state;

    const otherParticipantId = conversation.participantIds.find(id => id !== currentUser?.id);
    const otherParticipant = users.find(u => u.id === otherParticipantId);
    
    // Get last message details
    const lastMessage = messages
        .filter(m => m.conversationId === conversation.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

    const isUnread = lastMessage && lastMessage.senderId !== currentUser?.id && !lastMessage.readByUserIds.includes(currentUser?.id ?? '');
    
    if (!otherParticipant) return null;

    return (
        <div 
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer group transition-colors ${isActive ? 'bg-primary-blue/10 dark:bg-white/5' : 'hover:bg-gray-100 dark:hover:bg-surface-dark'}`}
        >
            <div className="relative shrink-0">
                <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-14" 
                    style={{ backgroundImage: `url("${otherParticipant.avatarUrl}")` }}
                ></div>
                {/* Mock Online Status for UI completeness */}
                <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full border-2 border-white dark:border-[#101922]"></div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                    <p className={`text-base truncate ${isUnread ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-900 dark:text-white'}`}>
                        {otherParticipant.name}
                    </p>
                    {lastMessage && (
                        <p className={`text-xs shrink-0 ${isUnread ? 'text-primary-blue font-bold' : 'text-gray-500 font-normal'}`}>
                            {timeAgo(lastMessage.createdAt).replace(' ago', '')}
                        </p>
                    )}
                </div>
                <div className="flex justify-between items-center mt-0.5">
                    <p className={`text-sm truncate pr-4 ${isUnread ? 'font-bold text-gray-900 dark:text-white' : 'font-normal text-gray-500'}`}>
                        {lastMessage ? (lastMessage.senderId === currentUser?.id ? 'You: ' : '') + lastMessage.content : 'Start a conversation'}
                    </p>
                    {isUnread && <div className="size-2.5 rounded-full bg-primary-blue shrink-0"></div>}
                </div>
            </div>
        </div>
    );
};

const ChatInterface: React.FC<{ conversationId: string; onBack: () => void }> = ({ conversationId, onBack }) => {
    const { state, actions } = useData();
    const { currentUser, users, messages } = state;
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const conversation = state.conversations.find(c => c.id === conversationId);
    const otherParticipantId = conversation?.participantIds.find(id => id !== currentUser?.id);
    const otherParticipant = users.find(u => u.id === otherParticipantId);

    const conversationMessages = useMemo(() => {
        return messages
            .filter(m => m.conversationId === conversationId)
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }, [messages, conversationId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversationMessages]);

    if (!conversation || !otherParticipant || !currentUser) return null;

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            actions.sendMessage(conversationId, newMessage.trim());
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#101922] relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center px-4 py-3 justify-between bg-white/95 dark:bg-[#101922]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shrink-0 z-20">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="text-primary-blue hover:bg-gray-100 dark:hover:bg-surface-dark rounded-full p-1 -ml-2 transition-colors">
                        <span className="material-symbols-outlined text-[26px]">arrow_back</span>
                    </button>
                    <div className="relative cursor-pointer" onClick={() => window.location.hash = `profile/${otherParticipant.id}`}>
                        <div className="bg-center bg-no-repeat bg-cover rounded-full size-10" style={{ backgroundImage: `url("${otherParticipant.avatarUrl}")` }}></div>
                        <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border-2 border-white dark:border-[#101922]"></div>
                    </div>
                    <div className="flex flex-col cursor-pointer" onClick={() => window.location.hash = `profile/${otherParticipant.id}`}>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white leading-tight">{otherParticipant.name}</h2>
                        <span className="text-xs text-green-500 font-medium">Active now</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-primary-blue">
                    <button className="hover:bg-primary-blue/10 rounded-full p-2 transition-colors"><span className="material-symbols-outlined text-[24px]">call</span></button>
                    <button className="hover:bg-primary-blue/10 rounded-full p-2 transition-colors"><span className="material-symbols-outlined text-[24px]">videocam</span></button>
                    <button className="hover:bg-primary-blue/10 rounded-full p-2 text-primary-blue/80 transition-colors"><span className="material-symbols-outlined text-[24px]">info</span></button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-[#f0f2f5] dark:bg-[#0b1219]">
                <div className="flex justify-center my-4">
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">Today</span>
                </div>
                
                {conversationMessages.map((msg, index) => {
                    const isSender = msg.senderId === currentUser.id;
                    const isLast = index === conversationMessages.length - 1;
                    return (
                        <div key={msg.id} className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} max-w-[85%] self-${isSender ? 'end' : 'start'}`}>
                            <div className="flex items-end gap-2">
                                {!isSender && (
                                    <div className="bg-center bg-no-repeat bg-cover rounded-full size-6 shrink-0 mb-1" style={{ backgroundImage: `url("${otherParticipant.avatarUrl}")` }}></div>
                                )}
                                <div className={`px-4 py-2.5 text-[15px] leading-relaxed shadow-sm ${
                                    isSender 
                                    ? 'bg-primary-blue text-white rounded-2xl rounded-tr-sm' 
                                    : 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white rounded-2xl rounded-tl-sm'
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                            {isLast && isSender && (
                                <span className="text-[10px] text-gray-400 mr-1 mt-1 font-medium">Delivered</span>
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-[#101922] border-t border-gray-200 dark:border-gray-800 shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                    <button type="button" className="p-2 text-primary-blue hover:bg-primary-blue/10 rounded-full mb-0.5 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">add_circle</span>
                    </button>
                    <div className="flex-1 bg-gray-100 dark:bg-surface-dark rounded-2xl flex items-center min-h-[44px] px-4 py-1 border border-transparent focus-within:border-primary-blue/30 focus-within:ring-1 focus-within:ring-primary-blue/30 transition-all">
                        <input 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 w-full p-0 text-[15px] leading-6 resize-none" 
                            placeholder="Message..." 
                            type="text"
                        />
                        <button type="button" className="ml-2 text-gray-500 dark:text-gray-400 hover:text-primary-blue transition-colors">
                            <span className="material-symbols-outlined text-[24px]">sentiment_satisfied</span>
                        </button>
                    </div>
                    {newMessage.trim() ? (
                        <button type="submit" className="p-2 bg-primary-blue text-white rounded-full hover:bg-blue-600 shadow-md shadow-primary-blue/20 mb-0.5 transition-transform active:scale-95 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px] ml-0.5">send</span>
                        </button>
                    ) : (
                        <button type="button" className="p-2 text-primary-blue hover:bg-primary-blue/10 rounded-full mb-0.5 transition-colors">
                            <span className="material-symbols-outlined text-[24px]">thumb_up</span>
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

const MessagesPage: React.FC = () => {
    const { state, actions } = useData();
    const { currentUser, users, conversations } = state;
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleHashChange = () => {
          const hash = window.location.hash.substring(1);
          const parts = hash.split('/');
          if (parts[0] === 'messages' && parts[1]) {
            setSelectedConversationId(parts[1]);
            actions.markConversationRead(parts[1]);
          } else if (parts[0] === 'messages') {
            setSelectedConversationId(null);
          }
        };
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [actions]);

    const userConversations = useMemo(() => {
        if (!currentUser) return [];
        let sorted = conversations
            .filter(c => c.participantIds.includes(currentUser.id))
            .sort((a,b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
            
        if (searchQuery.trim()) {
            const lowerQ = searchQuery.toLowerCase();
            sorted = sorted.filter(c => {
                const otherId = c.participantIds.find(id => id !== currentUser.id);
                const user = users.find(u => u.id === otherId);
                return user?.name.toLowerCase().includes(lowerQ);
            });
        }
        return sorted;
    }, [currentUser, conversations, users, searchQuery]);

    const handleSelectConversation = (id: string) => {
        window.location.hash = `messages/${id}`;
    };

    const handleStartNewConversation = (userId: string) => {
        const newConvoId = actions.startConversation(userId);
        setIsNewMessageModalOpen(false);
        handleSelectConversation(newConvoId);
    };

    const NewMessageModal: React.FC = () => {
        const friends = (currentUser?.friendIds || []).map(id => state.users.find(u => u.id === id)).filter(Boolean) as User[];
        return (
            <Modal isOpen={isNewMessageModalOpen} onClose={() => setIsNewMessageModalOpen(false)} title="New Message">
                <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
                    {friends.length > 0 ? friends.map(friend => (
                        <div key={friend.id} onClick={() => handleStartNewConversation(friend.id)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-dark-search cursor-pointer transition-colors">
                            <img src={friend.avatarUrl} alt={friend.name} className="size-12 rounded-full object-cover" />
                            <span className="font-bold text-white">{friend.name}</span>
                        </div>
                    )) : <p className="text-sm text-text-secondary text-center py-4">You have no friends to message yet.</p>}
                </div>
            </Modal>
        )
    };

    if (!currentUser) return null;

    // Filter users for the stories rail (exclude current user)
    const activeUsers = users.filter(u => u.id !== currentUser.id);

    return (
        <div className="flex h-[calc(100vh-3.5rem)] md:h-[calc(100vh-5rem)] bg-white dark:bg-[#101922] md:rounded-2xl md:border md:border-gray-200 md:dark:border-gray-800 shadow-xl overflow-hidden relative">
            
            {/* Left Side: Inbox View */}
            <div className={`w-full md:w-[380px] lg:w-[420px] flex flex-col border-r border-gray-200 dark:border-gray-800 ${selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 pt-5 pb-2 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="relative cursor-pointer" onClick={() => window.location.hash = 'profile'}>
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary-blue/20" style={{ backgroundImage: `url("${currentUser.avatarUrl}")` }}></div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Chats</h1>
                    </div>
                    <button 
                        onClick={() => setIsNewMessageModalOpen(true)}
                        className="size-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-surface-dark text-primary-blue hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">edit_square</span>
                    </button>
                </div>

                {/* Search */}
                <div className="px-4 py-2 shrink-0">
                    <div className="flex w-full items-center rounded-xl h-10 bg-gray-100 dark:bg-surface-dark px-3 gap-2 transition-all focus-within:ring-2 focus-within:ring-primary-blue/50">
                        <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">search</span>
                        <input 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-sm w-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-0 h-full" 
                            placeholder="Search" 
                            type="text"
                        />
                    </div>
                </div>

                {/* Scrollable List Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Active Users / Stories */}
                    <ActiveUsersRail users={activeUsers} />

                    {/* Conversation List */}
                    <div className="flex flex-col py-2">
                        {userConversations.length > 0 ? (
                            userConversations.map(convo => (
                                <ConversationItem 
                                    key={convo.id} 
                                    conversation={convo} 
                                    isActive={convo.id === selectedConversationId} 
                                    onClick={() => handleSelectConversation(convo.id)}
                                />
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                <p className="mb-2">No conversations found.</p>
                                <button onClick={() => setIsNewMessageModalOpen(true)} className="text-primary-blue font-bold hover:underline">Start a new chat</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side: Chat View */}
            <div className={`w-full md:flex-1 flex flex-col bg-white dark:bg-[#101922] ${selectedConversationId ? 'flex' : 'hidden md:flex'}`}>
                {selectedConversationId ? (
                    <ChatInterface conversationId={selectedConversationId} onBack={() => window.location.hash = 'messages'} />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-[#f0f2f5] dark:bg-[#0b1219]">
                        <div className="size-24 rounded-full bg-gray-200 dark:bg-surface-dark flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-5xl text-gray-400 dark:text-gray-600">chat_bubble_outline</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Your Messages</h3>
                        <p className="text-sm mt-2">Select a chat to start messaging</p>
                        <button onClick={() => setIsNewMessageModalOpen(true)} className="mt-6 px-6 py-2.5 bg-primary-blue text-white rounded-full font-bold shadow-lg shadow-primary-blue/20 hover:bg-blue-600 transition-all">
                            Send Message
                        </button>
                    </div>
                )}
            </div>

            <NewMessageModal />
        </div>
    );
};

export default MessagesPage;
