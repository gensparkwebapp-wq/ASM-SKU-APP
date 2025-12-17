import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { GroupPrivacy } from '../data/socialSphereTypes';

const CreateGroupPage: React.FC = () => {
    const { actions } = useData();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [privacy, setPrivacy] = useState<GroupPrivacy>('public');
    const [coverPhotoUrl, setCoverPhotoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            alert('Group name is required.');
            return;
        }
        setIsLoading(true);

        // Simulate a delay for creating the group then navigate
        setTimeout(() => {
            const newGroup = actions.createGroup({ name, description, privacy, coverPhotoUrl });
            if (newGroup) {
                window.location.hash = `group/${newGroup.id}`;
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="max-w-2xl mx-auto bg-surface-dark p-6 rounded-lg border border-border-dark animate-in fade-in duration-300">
            <div className="flex items-center gap-4 mb-6">
                 <a href="#groups" className="size-9 flex items-center justify-center rounded-full hover:bg-surface-dark-search transition-colors -ml-2">
                    <span className="material-symbols-outlined">arrow_back</span>
                </a>
                <div>
                    <h1 className="text-2xl font-bold">Create a Group</h1>
                    <p className="text-sm text-text-secondary">Build a community around a shared interest.</p>
                </div>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-6">
                <div>
                    <label htmlFor="group-name" className="block text-sm font-bold text-text-secondary mb-2">Group Name</label>
                    <input
                        id="group-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Ableton Lovers"
                        className="w-full h-11 px-4 rounded-lg bg-surface-dark-search border border-border-dark focus:border-primary-blue focus:ring-primary-blue/50"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="group-description" className="block text-sm font-bold text-text-secondary mb-2">Description</label>
                    <textarea
                        id="group-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what your group is about..."
                        rows={4}
                        className="w-full p-4 rounded-lg bg-surface-dark-search border border-border-dark focus:border-primary-blue focus:ring-primary-blue/50 resize-none"
                    />
                </div>
                
                 <div>
                    <label className="block text-sm font-bold text-text-secondary mb-2">Privacy</label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-border-dark hover:bg-surface-dark-search flex-1">
                            <input type="radio" name="privacy" value="public" checked={privacy === 'public'} onChange={() => setPrivacy('public')} className="size-4 text-primary-blue bg-surface-dark-search border-text-secondary focus:ring-primary-blue"/>
                            <div>
                                <p className="font-semibold">Public</p>
                                <p className="text-xs text-text-secondary">Anyone can see who's in the group and what they post.</p>
                            </div>
                        </label>
                         <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-border-dark hover:bg-surface-dark-search flex-1">
                            <input type="radio" name="privacy" value="private" checked={privacy === 'private'} onChange={() => setPrivacy('private')} className="size-4 text-primary-blue bg-surface-dark-search border-text-secondary focus:ring-primary-blue"/>
                             <div>
                                <p className="font-semibold">Private</p>
                                <p className="text-xs text-text-secondary">Only members can see who's in the group and what they post.</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div>
                    <label htmlFor="group-cover" className="block text-sm font-bold text-text-secondary mb-2">Cover Photo URL (Optional)</label>
                    <input
                        id="group-cover"
                        type="url"
                        value={coverPhotoUrl}
                        onChange={(e) => setCoverPhotoUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full h-11 px-4 rounded-lg bg-surface-dark-search border border-border-dark focus:border-primary-blue focus:ring-primary-blue/50"
                    />
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-border-dark">
                     <a href="#groups" className="px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-surface-dark-search transition-colors">Cancel</a>
                     <button
                        type="submit"
                        disabled={isLoading || !name.trim()}
                        className="px-6 py-2.5 bg-primary-blue text-white font-bold rounded-lg text-sm disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors flex items-center justify-center min-w-[120px]"
                     >
                        {isLoading ? <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Create Group'}
                     </button>
                </div>
            </form>
        </div>
    );
};

export default CreateGroupPage;