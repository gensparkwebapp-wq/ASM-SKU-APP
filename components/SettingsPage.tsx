
import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-6">
         <button onClick={() => window.history.back()} className="size-10 flex items-center justify-center rounded-full hover:bg-surface-dark-search transition-colors text-white">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
         </button>
         <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden divide-y divide-border-dark">
        {/* Account Section */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-1">Account</h3>
          <p className="text-sm text-text-secondary mb-4">Manage your personal information.</p>
          <div className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5">Full Name</label>
                <input className="w-full h-11 px-4 rounded-lg bg-surface-dark-search border border-transparent focus:border-primary-blue focus:ring-0 text-white transition-colors" defaultValue="Arjun Mehta" />
            </div>
            <div>
                <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5">Email Address</label>
                <input className="w-full h-11 px-4 rounded-lg bg-surface-dark-search border border-transparent focus:border-primary-blue focus:ring-0 text-white transition-colors" defaultValue="arjun.mehta@example.com" />
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-1">Privacy</h3>
          <p className="text-sm text-text-secondary mb-4">Control your profile visibility and data.</p>
           <div className="space-y-4">
             <label htmlFor="privacyToggle" className="flex justify-between items-center cursor-pointer group">
                <div>
                    <p className="text-white font-medium">Private Account</p>
                    <p className="text-xs text-text-secondary">Only followers can see your photos and videos.</p>
                </div>
                <div className="relative">
                    <input type="checkbox" id="privacyToggle" className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-dark-search rounded-full peer peer-checked:bg-primary-blue peer-focus:ring-2 peer-focus:ring-primary-blue/50 transition-colors"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                </div>
             </label>
             <label htmlFor="activityToggle" className="flex justify-between items-center cursor-pointer group">
                <div>
                    <p className="text-white font-medium">Activity Status</p>
                    <p className="text-xs text-text-secondary">Allow accounts you follow to see when you were last active.</p>
                </div>
                <div className="relative">
                    <input type="checkbox" id="activityToggle" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-dark-search rounded-full peer peer-checked:bg-primary-blue peer-focus:ring-2 peer-focus:ring-primary-blue/50 transition-colors"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                </div>
             </label>
           </div>
        </div>

        {/* Notifications Section */}
        <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-1">Notifications</h3>
            <p className="text-sm text-text-secondary mb-4">Choose what you want to be notified about.</p>
            <div className="space-y-3">
                {['Likes', 'Comments', 'New Followers', 'Mentions'].map(item => (
                    <div key={item} className="flex items-center justify-between">
                        <span className="text-white">{item}</span>
                        <select className="bg-surface-dark-search border-none text-white text-sm rounded-lg focus:ring-primary-blue">
                            <option>Everyone</option>
                            <option>People I Follow</option>
                            <option>Off</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>

        <div className="p-6 bg-surface-dark-search/30 flex justify-end gap-3">
            <button onClick={() => window.history.back()} className="px-6 py-2.5 rounded-lg text-sm font-bold text-white hover:bg-surface-dark-search transition-colors">Cancel</button>
            <button className="px-6 py-2.5 bg-primary-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-primary-blue/20">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
