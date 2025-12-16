import React from 'react';
import { useData } from '../contexts/DataContext';
import { ViewState } from '../App';

interface LoginPageProps {
  onNavigate: (view: ViewState) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { state, actions } = useData();
  const { users, currentUser } = state;

  // Render this if a user is already logged in
  if (currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-dark p-4 animate-in fade-in duration-500">
        <div className="w-full max-w-sm bg-surface-dark rounded-lg shadow-md p-6 md:p-8 border border-border-dark text-center">
          <img src={currentUser.avatarUrl} alt={currentUser.name} className="size-24 rounded-full object-cover mx-auto mb-4 border-4 border-primary-blue"/>
          <h2 className="text-xl font-bold text-white">You're already logged in</h2>
          <p className="text-text-secondary mt-2">
            Welcome back, <span className="font-bold text-white">{currentUser.name}</span>.
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <button onClick={() => onNavigate('feed')} className="w-full h-12 bg-primary-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
              Go to Feed
            </button>
            <button onClick={actions.logout} className="w-full h-12 bg-surface-dark-search text-text-secondary font-bold rounded-lg hover:bg-white/10 transition-colors">
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render this for a logged-out user
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-dark p-4 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <div className="size-16 mx-auto bg-primary-blue rounded-full text-white font-bold text-4xl flex items-center justify-center font-display">SS</div>
        <h1 className="text-3xl font-bold text-white mt-4">Welcome to SocialSphere</h1>
        <p className="text-text-secondary mt-2">Choose a profile to continue.</p>
      </div>
      
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {users.map(user => (
            <div key={user.id} onClick={() => actions.login(user.id)} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-surface-dark cursor-pointer transition-colors group">
              <img src={user.avatarUrl} alt={user.name} className="size-20 rounded-full object-cover border-2 border-surface-dark group-hover:border-primary-blue transition-colors"/>
              <span className="text-sm font-medium text-center text-text-secondary group-hover:text-white">{user.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button onClick={() => onNavigate('register')} className="text-primary-blue font-semibold hover:underline">
          Or create a new account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;