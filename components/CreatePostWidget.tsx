
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';

interface CreatePostWidgetProps {
    groupId?: string;
}

const CreatePostWidget: React.FC<CreatePostWidgetProps> = ({ groupId }) => {
    const { state, actions } = useData();
    const [isExpanded, setIsExpanded] = useState(false);
    const user = state.currentUser;

    if (!user) return null;

    return (
        <div className="bg-surface-light dark:bg-surface-dark px-4 py-3 transition-colors">
            <div className="flex gap-3 items-center">
                <div 
                    onClick={() => window.location.hash = 'profile'}
                    className="bg-center bg-no-repeat bg-cover rounded-full size-10 shrink-0 border border-divider dark:border-divider-dark cursor-pointer hover:opacity-90 transition-opacity" 
                    style={{ backgroundImage: `url("${user.avatarUrl}")` }}
                ></div>
                <button 
                    onClick={() => actions.createPost("Simulated new post from dashboard")}
                    className="flex-1 text-left px-4 h-10 rounded-full border border-divider dark:border-divider-dark bg-background-light dark:bg-[#3a3b3c] hover:bg-gray-200 dark:hover:bg-[#4e4f50] transition-colors"
                >
                    <span className="text-text-secondary dark:text-text-secondary-dark text-[15px]">What's on your mind?</span>
                </button>
                <button className="shrink-0 flex items-center justify-center text-green-500 hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">photo_library</span>
                </button>
            </div>
        </div>
    );
};

export default CreatePostWidget;
