import React, { useState, useRef } from 'react';

interface Studio {
  id: number;
  name: string;
  location: string;
  pricePerHour: string;
  image: string;
}

const MyStudios: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studios, setStudios] = useState<Studio[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStudio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (!formData.get('name') || !formData.get('location') || !formData.get('price') || !imagePreview) {
        alert("Please fill out all fields and upload an image.");
        return;
    }

    const newStudio: Studio = {
      id: Date.now(),
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      pricePerHour: `₹${formData.get('price')}/hr`,
      image: imagePreview,
    };

    setStudios(prevStudios => [newStudio, ...prevStudios]);
    handleCloseModal();
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-[1280px] min-h-[60vh] animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Studios</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-background-dark font-bold rounded-full hover:brightness-110 transition-all shadow-[0_0_15px_rgba(43,238,121,0.3)]"
          >
            <span className="material-symbols-outlined">add</span>
            <span>Add New Studio</span>
          </button>
        </div>

        {studios.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map(studio => (
              <div key={studio.id} className="glass-card rounded-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className="relative h-48 w-full">
                   <img src={studio.image} alt={studio.name} loading="lazy" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white truncate">{studio.name}</h3>
                  <div className="flex items-center gap-1 text-white/50 text-xs mt-1 mb-4">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span>{studio.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-primary font-bold">{studio.pricePerHour}</span>
                     <button className="text-xs font-bold text-white/50 hover:text-white">Manage</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Studio Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface-dark border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-surface-dark z-10">
              <h3 className="text-xl font-bold text-white">Add New Studio</h3>
              <button onClick={handleCloseModal}>
                <span className="material-symbols-outlined text-white/50 hover:text-white">close</span>
              </button>
            </div>
            <form onSubmit={handleAddStudio} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase mb-2">Studio Name</label>
                <input
                  name="name"
                  required
                  placeholder="e.g., Sonic Realm Studios"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase mb-2">Location</label>
                <input
                  name="location"
                  required
                  placeholder="e.g., Andheri West, Mumbai"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase mb-2">Price Per Hour (₹)</label>
                <input
                  name="price"
                  type="number"
                  required
                  placeholder="e.g., 1200"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase mb-2">Studio Image</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center cursor-pointer hover:bg-white/5 hover:border-primary/30 transition-colors"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    required
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Studio preview" className="max-h-40 mx-auto rounded-lg object-contain" />
                  ) : (
                    <div className="text-white/40">
                      <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                      <p className="text-sm mt-2">Click to upload image</p>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-background-dark font-bold py-3 rounded-xl hover:brightness-110 mt-4 transition-all"
              >
                Add Studio
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyStudios;