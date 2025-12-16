import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow p-6 border border-gray-200 dark:border-border-dark max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold">Account</h3>
          <p className="text-sm text-gray-500 dark:text-text-secondary">Manage your account information.</p>
          <div className="mt-4 space-y-4">
            <input className="w-full h-10 px-4 rounded-lg bg-gray-100 dark:bg-surface-dark-search border-none focus:ring-2 focus:ring-primary-blue" defaultValue="Arjun Mehta" />
            <input className="w-full h-10 px-4 rounded-lg bg-gray-100 dark:bg-surface-dark-search border-none focus:ring-2 focus:ring-primary-blue" defaultValue="arjun.mehta@example.com" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold">Privacy</h3>
          <p className="text-sm text-gray-500 dark:text-text-secondary">Control who can see your activity.</p>
           <div className="mt-4 space-y-3">
             <label htmlFor="privacyToggle" className="flex justify-between items-center cursor-pointer">
                <p>Make profile private</p>
                <div className="relative">
                    <input type="checkbox" id="privacyToggle" className="sr-only peer" />
                    <div className="w-10 h-6 bg-gray-200 dark:bg-surface-dark-search rounded-full peer peer-checked:bg-primary-blue"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4"></div>
                </div>
             </label>
           </div>
        </div>
        <button className="px-6 py-2 bg-primary-blue text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">Save Changes</button>
      </div>
    </div>
  );
};

export default SettingsPage;