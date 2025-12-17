
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { ViewState } from '../App';

interface LoginPageProps {
  onNavigate: (view: ViewState) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { state, actions } = useData();
  const { currentUser } = state;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // If already logged in, show the "Switch Account" or "Go to Feed" view
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login logic: always log in as the first available user (Arjun)
    // In a real app, this would validate 'email' and 'password'
    actions.login('user-0');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f7f8] dark:bg-[#101922] font-display text-slate-900 dark:text-white transition-colors duration-300">
      {/* Hero / Top Section */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-12 pb-6 w-full max-w-[480px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Logo */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-primary-blue rounded-full flex items-center justify-center shadow-lg shadow-primary-blue/20">
            <span className="material-symbols-outlined text-white text-[40px] font-bold">social_leaderboard</span>
          </div>
          <h1 className="text-primary-blue tracking-tight text-[32px] font-bold leading-tight text-center">SocialSphere</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full space-y-4">
          {/* Username Field */}
          <div className="group relative">
            <label className="block w-full">
              <input 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer flex w-full h-14 px-4 bg-white dark:bg-[#192633] border border-gray-200 dark:border-[#324d67] rounded-xl text-base font-normal text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#92adc9] focus:border-primary-blue focus:ring-1 focus:ring-primary-blue focus:outline-none transition-all"
                placeholder="Mobile number or email" 
              />
            </label>
          </div>

          {/* Password Field */}
          <div className="group relative">
            <label className="block w-full">
              <div className="relative flex items-center">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer flex w-full h-14 pl-4 pr-12 bg-white dark:bg-[#192633] border border-gray-200 dark:border-[#324d67] rounded-xl text-base font-normal text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#92adc9] focus:border-primary-blue focus:ring-1 focus:ring-primary-blue focus:outline-none transition-all"
                  placeholder="Password" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center text-gray-400 dark:text-[#92adc9] hover:text-primary-blue transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </label>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full h-12 mt-2 bg-primary-blue hover:bg-blue-600 active:bg-blue-700 text-white text-base font-bold rounded-full shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center"
          >
            Log In
          </button>

          {/* Forgot Password */}
          <div className="flex justify-center pt-2">
            <a 
                onClick={() => onNavigate('set-password')}
                className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary-blue dark:hover:text-white transition-colors cursor-pointer"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Bottom Section: Create Account */}
      <div className="w-full max-w-[480px] mx-auto px-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        {/* Divider */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300 dark:border-[#324d67]"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Or</span>
          <div className="flex-grow border-t border-gray-300 dark:border-[#324d67]"></div>
        </div>

        {/* Create Account Button */}
        <button 
          onClick={() => onNavigate('register')}
          className="w-full h-12 border border-primary-blue/30 dark:border-primary-blue/50 bg-transparent hover:bg-primary-blue/5 active:bg-primary-blue/10 text-primary-blue dark:text-blue-400 text-base font-bold rounded-full transition-all flex items-center justify-center"
        >
          Create new account
        </button>

        {/* Brand/Meta Logo */}
        <div className="mt-6 flex justify-center items-center gap-1 opacity-40">
          <span className="material-symbols-outlined text-[16px] text-slate-500 dark:text-slate-400">all_inclusive</span>
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">SocialSphere</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
