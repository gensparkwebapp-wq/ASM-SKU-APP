import React from 'react';

const MyStudios: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[1280px] min-h-[60vh] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">My Studios</h1>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-background-dark font-bold rounded-full hover:brightness-110 transition-all shadow-[0_0_15px_rgba(43,238,121,0.3)]">
            <span className="material-symbols-outlined">add</span>
            <span>Add New Studio</span>
        </button>
      </div>

      {/* Empty State / Placeholder List */}
      <div className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center border border-dashed border-white/10 bg-white/[0.02]">
        <div className="size-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white/20">
            <span className="material-symbols-outlined text-5xl">sound_sampler</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Studios Listed Yet</h3>
        <p className="text-white/50 max-w-md mb-8 leading-relaxed">
            You haven't listed any studios on Sangeet Kalakar yet. Join our network of premium recording spaces and start earning.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl text-left">
             <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="material-symbols-outlined text-primary mb-2">visibility</span>
                <h4 className="font-bold text-white text-sm">Increased Visibility</h4>
                <p className="text-xs text-white/40 mt-1">Reach thousands of verified artists.</p>
             </div>
             <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="material-symbols-outlined text-primary mb-2">payments</span>
                <h4 className="font-bold text-white text-sm">Secure Payments</h4>
                <p className="text-xs text-white/40 mt-1">Automated booking & payouts.</p>
             </div>
             <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="material-symbols-outlined text-primary mb-2">verified_user</span>
                <h4 className="font-bold text-white text-sm">Verified Users</h4>
                <p className="text-xs text-white/40 mt-1">Connect with professional union members.</p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default MyStudios;