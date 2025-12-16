import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { ViewState } from '../App';

interface RegisterPageProps {
  onNavigate: (view: ViewState) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { actions } = useData();
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [shortBio, setShortBio] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    setError('');

    const options: { avatarUrl?: string; shortBio?: string } = {};
    if (avatarUrl.trim()) {
      options.avatarUrl = avatarUrl.trim();
    }
    if (shortBio.trim()) {
      options.shortBio = shortBio.trim();
    }
    actions.registerUser(name.trim(), options);
    // The auth gate in App.tsx will handle navigation to the feed automatically.
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background-dark animate-in fade-in duration-500">
      <div className="w-full max-w-md bg-surface-dark rounded-lg shadow-md p-6 md:p-8 border border-border-dark">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Create a SocialSphere Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-text-secondary mb-1">
              Full Name <span className="text-primary-blue">*</span>
            </label>
            <input 
              id="name"
              type="text" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-surface-dark-search border border-transparent focus:border-primary-blue focus:ring-primary-blue text-white" 
              required 
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div>
            <label htmlFor="avatarUrl" className="block text-sm font-medium text-text-secondary mb-1">
              Avatar URL (Optional)
            </label>
            <input 
              id="avatarUrl"
              type="url" 
              placeholder="https://example.com/avatar.png" 
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-surface-dark-search border border-transparent focus:border-primary-blue focus:ring-primary-blue text-white" 
            />
          </div>

          <div>
            <label htmlFor="shortBio" className="block text-sm font-medium text-text-secondary mb-1">
              Short Bio (Optional)
            </label>
            <textarea 
              id="shortBio"
              placeholder="A little bit about yourself..." 
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-surface-dark-search border border-transparent focus:border-primary-blue focus:ring-primary-blue text-white resize-none"
              rows={3}
            />
          </div>
          
          <button type="submit" className="w-full h-12 bg-primary-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
            Sign Up & Log In
          </button>
        </form>
        <div className="text-center mt-6">
            <button onClick={() => onNavigate('login')} className="text-sm text-primary-blue hover:underline">
              Already have an account? Log In
            </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;