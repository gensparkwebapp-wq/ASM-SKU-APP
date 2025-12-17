
import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { User } from '../data/socialSphereTypes';

const onlineUsers = [
    { name: "Sarah", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd8Byt95bhGBPy0H_iKqTjWYLWTudY3GXw3vP0wj0NPOmAxrkKGmQy5Iuo2LwF9e9ddVEA3GdPoZ94-F4vHcwktcEbyFbTD4jzolwFP--zqgb8DFa93tS0WMEvxBkvT_HbvzFAeqzKwAwo3VYMQx-rXTGs4iQQ01ZKD1FJ86__VolvQCw06fsosAcOkSIhC9HPQsjcqoiTQrQ4DunFBYIAi7jugDnGr5prLHgGUA6c8yQ7YLXQwbGO_vboUJkKLz_Ac7p_dmoA2eQ" },
    { name: "Michael", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlNdf2P_lQfhCCfpCZ8ytT8UksD5vYSiMrbxvICzHMNHJsQrWnITGTPWWzlyxIWLlahcHwplsi8CSouZwT4v1Z5CHLltDer5c8hlMjCDN25J0cV7HY8Aejmv1NCJEMtAIVxUg7V6rlZDrUm4NjXryqs3gI8ef6FvhuHgAv7_cY0LvRQzZC0pphRmD7zhiDWoRx6sb4IOSJa7fXXvmlEMqkBdrIrtY4DVReH_1_-5kChBvF-5Yl0xECk60YGIvxfA5NzaeCyusrva8" },
    { name: "Jessica", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxQKcSDE5CcEy-Cy27jhZbvxyeuKLQ12NGqcr41LBqTSGKN2BC1dHzhLIM0L-kU7K2BKllhuzbAjnAEBR6Ihf56CM5V4gSZH4-rrh1cMTtSFKD2nUx1PL5q8akAyZhiMgPpRdC5aItLyv-fbeGAl9ejyKUM1iW8IoNfaKbSMV6rWOb2xhchktXFRa-CbtqcQkrCW8NfxNTP1dnYUl7HXXPC1XwHPLHsVh6a_UhYZBa9Hr6whIgnuR1hDfIfem9mlR6rLpgigYCTFw" },
    { name: "David", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2PVFpPFajUI0tuFzn8rajvBNVje4Ifgvzl_cr3-i9T_YiVQLUZ_J_0WU0MLJCisiKCzklyhyXRC1SBriN-ej7PVhBA_eUdNIt1mPF0qQ14dDCtFYqJdkPHi91NT4BFYQVoKZTe80dcyHMGeqDE3RHSZtDFAUOKRQoEkFaLr39Mz5G3JTJNTTcGvxYSwSknnV5nR4mfijAo8RB7DI_r3c_CTjYlikV38jY9QUxHzJ-w97T_bRqFeVooBnbE-5gEvJ3jCmpfDQzVZk" },
    { name: "Emily", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuACpaSkPFyyptrwiaxDzbOaS_8BOPd54tAikzcS84yXDvN_ss8jWmc9OBGmn7M7av086omezBR8FNdN8Q4NuZJmQutuYWuGLRigJmFDEZdYLLpDGC434d2s9yMMTjBX5tqplXFS_Hs6th2c7aItBEGiBuuFajGZ-vFNY-G0Mqn4uMo3CSgpcGq8n-pkClqXV9fICpQkJg-GKZ6Un9aqI79iCSCmGVnkpc4iiSd_H7bqTjIcVv14fo0fpsAfi9ZvI01IiHrYpxao898" },
];

const FriendsPage: React.FC = () => {
  const { state, actions } = useData();
  const { currentUser, users } = state;
  const [searchQuery, setSearchQuery] = useState('');

  // Use the real users from state for the main list, but filter by search
  const friendsList = useMemo(() => {
    if (!currentUser) return [];
    
    let filtered = users.filter(u => u.id !== currentUser.id);
    
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(u => u.name.toLowerCase().includes(q));
    }
    
    return filtered;
  }, [currentUser, users, searchQuery]);

  // Handle actions
  const handleChat = (userId: string) => {
      const convoId = actions.startConversation(userId);
      window.location.hash = `messages/${convoId}`;
  };

  const handleProfile = (userId: string) => {
      window.location.hash = `profile/${userId}`;
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#111a22] text-[#111418] dark:text-white rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#111a22] border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button 
            onClick={() => window.history.back()}
            className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[#111418] dark:text-white text-2xl">arrow_back</span>
          </button>
          <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            Friends ({friendsList.length})
          </h2>
          <div className="flex w-10 items-center justify-end">
            <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-primary-blue">
              <span className="material-symbols-outlined text-2xl">person_add</span>
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 pb-3">
          <label className="flex flex-col h-10 w-full">
            <div className="flex w-full flex-1 items-center rounded-lg h-full bg-[#f0f2f4] dark:bg-[#1c2630] transition-colors focus-within:ring-2 focus-within:ring-primary-blue/50">
              <div className="text-[#617589] dark:text-[#9ba8b8] flex items-center justify-center pl-3 pr-2">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex w-full min-w-0 flex-1 bg-transparent text-[#111418] dark:text-white placeholder:text-[#617589] dark:placeholder:text-[#9ba8b8] focus:outline-0 border-none h-full px-2 text-sm font-normal leading-normal" 
                placeholder="Search friends" 
              />
            </div>
          </label>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Online Now Section */}
        <div className="py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-[#111418] dark:text-white text-base font-bold leading-tight px-4 mb-3">Online Now</h3>
          <div className="flex overflow-x-auto px-4 gap-4 hide-scrollbar pb-2 snap-x">
            {/* Render mock online users for visual fidelity to design */}
            {onlineUsers.map((user, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 snap-start shrink-0 w-[64px]">
                    <div className="relative">
                        <div 
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 ring-2 ring-white dark:ring-[#111a22]" 
                            style={{ backgroundImage: `url("${user.img}")` }}
                        ></div>
                        <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full border-2 border-white dark:border-[#111a22]"></div>
                    </div>
                    <p className="text-xs text-[#111418] dark:text-gray-300 font-medium text-center truncate w-full">{user.name}</p>
                </div>
            ))}
          </div>
        </div>

        {/* All Friends List */}
        <div>
          <h3 className="text-[#617589] dark:text-[#9ba8b8] text-sm font-bold uppercase tracking-wider px-4 pt-4 pb-2">All Friends</h3>
          
          {friendsList.map((user) => (
            <div 
                key={user.id} 
                onClick={() => handleProfile(user.id)}
                className="group flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#1a242d] transition-colors cursor-pointer border-b border-gray-50 dark:border-gray-800"
            >
                <div className="relative shrink-0">
                    <div 
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12" 
                        style={{ backgroundImage: `url("${user.avatarUrl}")` }}
                    ></div>
                    {/* Randomly assign online status for visual variety */}
                    {Math.random() > 0.5 && (
                        <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-[#111a22]"></div>
                    )}
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                    <p className="text-[#111418] dark:text-white text-base font-semibold leading-normal truncate">{user.name}</p>
                    <p className="text-[#617589] dark:text-[#9ba8b8] text-sm font-normal leading-normal truncate">
                        {user.shortBio || "15 Mutual Friends"}
                    </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleChat(user.id); }}
                        className="flex items-center justify-center h-9 w-9 rounded-full bg-primary-blue/10 text-primary-blue hover:bg-primary-blue hover:text-white transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    </button>
                    <button className="flex items-center justify-center h-9 w-9 rounded-full text-[#617589] dark:text-[#9ba8b8] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                        <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                    </button>
                </div>
            </div>
          ))}
          
          {friendsList.length === 0 && (
              <div className="p-8 text-center text-text-secondary">
                  No friends found matching "{searchQuery}"
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
