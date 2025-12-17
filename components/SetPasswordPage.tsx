
import React, { useState, useEffect } from 'react';
import { ViewState } from '../App';

interface SetPasswordPageProps {
  onNavigate: (view: ViewState) => void;
}

const SetPasswordPage: React.FC<SetPasswordPageProps> = ({ onNavigate }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation State
  const [hasLength, setHasLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [hasCase, setHasCase] = useState(false);
  const [strengthLabel, setStrengthLabel] = useState('Weak');
  const [strengthColor, setStrengthColor] = useState('text-orange-500');
  const [strengthScore, setStrengthScore] = useState(0);

  useEffect(() => {
    // Check criteria
    const length = password.length >= 8;
    const number = /\d/.test(password);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const casing = /[a-z]/.test(password) && /[A-Z]/.test(password);

    setHasLength(length);
    setHasNumber(number);
    setHasSpecial(special);
    setHasCase(casing);

    // Calculate score (0-4)
    let score = 0;
    if (length) score++;
    if (number) score++;
    if (special) score++;
    if (casing) score++;
    setStrengthScore(score);

    // Set label & color
    if (score === 0) {
        setStrengthLabel('Weak');
        setStrengthColor('text-orange-500');
    } else if (score < 3) {
        setStrengthLabel('Medium');
        setStrengthColor('text-yellow-500');
    } else if (score === 4) {
        setStrengthLabel('Strong');
        setStrengthColor('text-green-500');
    } else {
        setStrengthLabel('Good');
        setStrengthColor('text-green-400');
    }

  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (strengthScore < 4) {
        alert("Please create a stronger password.");
        return;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    // Simulate success
    alert("Password updated successfully!");
    onNavigate('login');
  };

  const renderProgressBar = () => {
    const bars = [];
    for (let i = 0; i < 4; i++) {
        let bgColor = 'bg-gray-200 dark:bg-gray-700';
        if (i < strengthScore) {
            if (strengthScore < 2) bgColor = 'bg-orange-500';
            else if (strengthScore < 3) bgColor = 'bg-yellow-500';
            else if (strengthScore < 4) bgColor = 'bg-green-400';
            else bgColor = 'bg-green-500';
        }
        bars.push(
            <div key={i} className={`flex-1 rounded-full transition-all duration-300 h-1.5 ${bgColor}`}></div>
        );
    }
    return bars;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6f7f8] dark:bg-[#101922] p-4 font-display">
      <div className="w-full max-w-md bg-white dark:bg-[#1b2630] shadow-2xl rounded-[2rem] border-0 md:border-4 md:border-gray-200 dark:md:border-gray-800 overflow-hidden flex flex-col h-auto min-h-[600px] animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center px-4 pt-6 pb-2 justify-between bg-white dark:bg-[#1b2630] shrink-0 z-10">
            <button 
                onClick={() => onNavigate('login')}
                className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors"
            >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Security</h1>
            <div className="size-10"></div> 
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 no-scrollbar">
            {/* Icon */}
            <div className="flex justify-center py-6">
                <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center text-primary relative">
                    <span className="material-symbols-outlined text-[48px]">lock_reset</span>
                    <div className="absolute bottom-0 right-0 bg-white dark:bg-[#1b2630] rounded-full p-1">
                        <span className="material-symbols-outlined text-green-500 text-[20px] bg-green-500/10 rounded-full p-0.5">check_circle</span>
                    </div>
                </div>
            </div>

            {/* Title & Desc */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Set New Password</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-[85%] mx-auto leading-relaxed">
                    Create a strong, unique password to secure your account. It must be different from previously used passwords.
                </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-5 mt-4" onSubmit={handleSubmit}>
                {/* New Password */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">New Password</label>
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 material-symbols-outlined group-focus-within:text-primary transition-colors">lock</span>
                        <input 
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-100 dark:bg-[#24303c] border-transparent focus:border-primary focus:bg-white dark:focus:bg-[#1b2630] focus:ring-0 rounded-2xl py-4 pl-12 pr-12 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 shadow-sm" 
                            placeholder="Enter new password" 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
                        </button>
                    </div>
                </div>

                {/* Strength Meter */}
                <div className="bg-gray-50 dark:bg-[#1f2b36] p-4 rounded-xl border border-gray-100 dark:border-gray-800 transition-all">
                    <div className="flex justify-between text-xs font-medium mb-2.5">
                        <span className="text-gray-500 dark:text-gray-400">Password Strength</span>
                        <span className={`transition-colors duration-300 ${strengthColor}`}>{strengthLabel}</span>
                    </div>
                    <div className="flex gap-1.5 h-1.5 w-full mb-4">
                        {renderProgressBar()}
                    </div>
                    <ul className="space-y-2.5">
                        <li className={`flex items-center gap-2.5 text-xs font-medium transition-colors ${hasLength ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                            <span className={`material-symbols-outlined text-[16px] ${hasLength ? '' : 'text-gray-400'}`}>{hasLength ? 'check_circle' : 'radio_button_unchecked'}</span>
                            <span>At least 8 characters</span>
                        </li>
                        <li className={`flex items-center gap-2.5 text-xs font-medium transition-colors ${hasNumber ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                            <span className={`material-symbols-outlined text-[16px] ${hasNumber ? '' : 'text-gray-400'}`}>{hasNumber ? 'check_circle' : 'radio_button_unchecked'}</span>
                            <span>Contains a number (0-9)</span>
                        </li>
                        <li className={`flex items-center gap-2.5 text-xs font-medium transition-colors ${hasSpecial ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                            <span className={`material-symbols-outlined text-[16px] ${hasSpecial ? '' : 'text-gray-400'}`}>{hasSpecial ? 'check_circle' : 'radio_button_unchecked'}</span>
                            <span>Contains a special character (!@#$)</span>
                        </li>
                        <li className={`flex items-center gap-2.5 text-xs font-medium transition-colors ${hasCase ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                            <span className={`material-symbols-outlined text-[16px] ${hasCase ? '' : 'text-gray-400'}`}>{hasCase ? 'check_circle' : 'radio_button_unchecked'}</span>
                            <span>Contains uppercase & lowercase</span>
                        </li>
                    </ul>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Confirm New Password</label>
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 material-symbols-outlined group-focus-within:text-primary transition-colors">lock_clock</span>
                        <input 
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-gray-100 dark:bg-[#24303c] border-transparent focus:border-primary focus:bg-white dark:focus:bg-[#1b2630] focus:ring-0 rounded-2xl py-4 pl-12 pr-12 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 shadow-sm" 
                            placeholder="Re-enter password" 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? 'visibility' : 'visibility_off'}</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>

        {/* Footer */}
        <div className="p-6 pt-2 bg-white dark:bg-[#1b2630] shrink-0">
            <button 
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <span>Set New Password</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <div className="h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SetPasswordPage;
