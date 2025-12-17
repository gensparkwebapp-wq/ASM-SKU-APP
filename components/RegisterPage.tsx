
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { ViewState } from '../App';

interface RegisterPageProps {
  onNavigate: (view: ViewState) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { actions } = useData();
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [day, setDay] = useState('Day');
  const [month, setMonth] = useState('Month');
  const [year, setYear] = useState('Year');

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !surname.trim()) {
      alert('Name is required.');
      return;
    }
    // Basic validation passed, register the user
    // In a real app, send DOB and other fields to backend
    actions.registerUser(`${firstName} ${surname}`.trim(), {
        shortBio: 'New community member'
    });
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-[#f6f7f8] dark:bg-[#101922] font-display overflow-y-auto">
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 flex items-center bg-[#f6f7f8] dark:bg-[#101922] p-4 pb-2 justify-between">
        <button 
            onClick={() => onNavigate('login')}
            className="text-gray-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
            <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Join the Community</h2>
      </div>

      {/* Headline & Subheader */}
      <div className="px-4 pt-4 pb-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-gray-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left pb-2">Create account</h1>
        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">It’s quick and easy.</p>
      </div>

      {/* Form Fields */}
      <form className="flex flex-col gap-4 px-4 py-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100" onSubmit={handleSubmit}>
        {/* Name Fields (Split) */}
        <div className="flex gap-4">
            <div className="flex flex-col flex-1">
                <label className="sr-only" htmlFor="first-name">First Name</label>
                <input 
                    id="first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name" 
                    className="w-full rounded-xl border border-gray-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-14 placeholder:text-gray-400 dark:placeholder:text-[#92adc9] px-4 text-base font-normal text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                />
            </div>
            <div className="flex flex-col flex-1">
                <label className="sr-only" htmlFor="surname">Surname</label>
                <input 
                    id="surname"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Surname" 
                    className="w-full rounded-xl border border-gray-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-14 placeholder:text-gray-400 dark:placeholder:text-[#92adc9] px-4 text-base font-normal text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                />
            </div>
        </div>

        {/* Mobile/Email Field */}
        <div className="flex flex-col w-full">
            <label className="sr-only" htmlFor="email">Mobile number or email address</label>
            <input 
                id="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Mobile number or email address" 
                className="w-full rounded-xl border border-gray-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-14 placeholder:text-gray-400 dark:placeholder:text-[#92adc9] px-4 text-base font-normal text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
            />
        </div>

        {/* Password Field */}
        <div className="flex flex-col w-full relative">
            <label className="sr-only" htmlFor="password">New password</label>
            <input 
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password" 
                className="w-full rounded-xl border border-gray-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-14 placeholder:text-gray-400 dark:placeholder:text-[#92adc9] px-4 pr-12 text-base font-normal text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
            />
            <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#92adc9] hover:text-primary-blue transition-colors"
            >
                <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col w-full pt-2">
            <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Date of birth</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal pb-3">This won't be part of your public profile.</p>
            <div className="flex gap-3">
                {/* Day */}
                <div className="relative flex-1">
                    <select 
                        value={day} 
                        onChange={(e) => setDay(e.target.value)}
                        className="appearance-none w-full rounded-xl border border-gray-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-12 px-4 text-base font-normal text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                    >
                        <option>Day</option>
                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">expand_more</span>
                </div>
                {/* Month */}
                <div className="relative flex-[1.5]">
                    <select 
                        value={month} 
                        onChange={(e) => setMonth(e.target.value)}
                        className="appearance-none w-full rounded-xl border border-gray-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-12 px-4 text-base font-normal text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                    >
                        <option>Month</option>
                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">expand_more</span>
                </div>
                {/* Year */}
                <div className="relative flex-[1.2]">
                    <select 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)}
                        className="appearance-none w-full rounded-xl border border-gray-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-12 px-4 text-base font-normal text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                    >
                        <option>Year</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">expand_more</span>
                </div>
            </div>
        </div>

        {/* Legal Text */}
        <div className="py-4">
            <p className="text-gray-500 dark:text-gray-400 text-xs font-normal leading-relaxed text-center">
                By clicking Sign Up, you agree to our <a className="text-primary-blue hover:underline" href="#">Terms</a>, <a className="text-primary-blue hover:underline" href="#">Privacy Policy</a> and <a className="text-primary-blue hover:underline" href="#">Cookies Policy</a>. You may receive SMS notifications from us and can opt out at any time.
            </p>
        </div>

        {/* Sign Up Button */}
        <button type="submit" className="w-full bg-primary-blue hover:bg-blue-600 text-white font-bold text-lg h-12 rounded-full shadow-lg transition-transform active:scale-[0.98]">
            Sign Up
        </button>

        {/* Already have account */}
        <div className="flex justify-center items-center py-4">
            <a onClick={() => onNavigate('login')} className="text-primary-blue font-medium text-base hover:underline cursor-pointer">Already have an account? Log In</a>
        </div>
      </form>
      <div className="h-10"></div>
    </div>
  );
};

export default RegisterPage;
