import React, { useState, useRef } from 'react';
import { Artist, PortfolioItem } from '../data/artists';

// Sub-component for adding a portfolio item
const AddPortfolioItemModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<PortfolioItem, 'id'>) => void;
}> = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  const [item, setItem] = useState<Omit<PortfolioItem, 'id'>>({ type: 'image', title: '', thumb: '', src: '' });
  const portfolioFileInputRef = useRef<HTMLInputElement>(null);

  const handleItemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  const handleItemFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        
        const fileType: PortfolioItem['type'] = file.type.startsWith('image/') ? 'image' : 
                         file.type.startsWith('video/') ? 'video' :
                         file.type.startsWith('audio/') ? 'audio' :
                         file.type === 'application/pdf' ? 'pdf' : 'image';

        const placeholderThumbs = {
          video: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963e?w=800&h=450&fit=crop',
          audio: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=450&fit=crop',
          pdf: 'https://images.unsplash.com/photo-1583341612448-034875a54533?w=800&h=450&fit=crop',
          image: dataUrl
        };
        
        setItem(prev => ({ ...prev, src: dataUrl, thumb: placeholderThumbs[fileType], type: fileType }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const resetForm = () => {
    setItem({ type: 'image', title: '', thumb: '', src: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item.title && item.src) {
      onSave(item);
      resetForm();
    } else {
      alert('Please provide a title and upload a file.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-dark border border-white/10 rounded-2xl w-full max-w-md">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Add Portfolio Item</h3>
          <button onClick={() => { onClose(); resetForm(); }}><span className="material-symbols-outlined text-white/50 hover:text-white">close</span></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-white/70 uppercase mb-2">Title</label>
            <input name="title" value={item.title} onChange={handleItemInputChange} className="edit-input" placeholder="e.g., Live Concert Highlights" />
          </div>
           <div>
            <label className="block text-xs font-bold text-white/70 uppercase mb-2">Media File</label>
            <div
              onClick={() => portfolioFileInputRef.current?.click()}
              className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center cursor-pointer hover:bg-white/5 hover:border-primary/30 transition-colors"
            >
              <input
                type="file"
                ref={portfolioFileInputRef}
                onChange={handleItemFileChange}
                className="hidden"
                accept="image/*,video/*,audio/*,application/pdf"
              />
              {item.src ? (
                <img src={item.thumb} alt="Preview" className="max-h-24 mx-auto rounded-lg object-contain" />
              ) : (
                <div className="text-white/40">
                  <span className="material-symbols-outlined text-4xl">upload_file</span>
                  <p className="text-sm mt-2">Click to upload file</p>
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="w-full bg-primary text-background-dark font-bold py-3 rounded-xl hover:brightness-110 mt-4 transition-all">
            Add to Portfolio
          </button>
        </form>
      </div>
    </div>
  );
};


interface EditProfileProps {
  artist: Artist;
  onSave: (updatedArtist: Artist) => void;
  onCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ artist, onSave, onCancel }) => {
  const [editableArtist, setEditableArtist] = useState<Artist>({ ...artist });
  const [isSaving, setIsSaving] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableArtist(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSocialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableArtist(prev => ({
        ...prev,
        socials: {
            ...prev.socials,
            [name]: value
        }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatar' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditableArtist(prev => ({ ...prev, [field]: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAddPortfolioItem = (newItem: Omit<PortfolioItem, 'id'>) => {
    setEditableArtist(prev => ({
      ...prev,
      portfolio: [...prev.portfolio, { ...newItem, id: Date.now() }]
    }));
    setIsPortfolioModalOpen(false);
  };
  
  const handleRemovePortfolioItem = (id: number) => {
    setEditableArtist(prev => ({
        ...prev,
        portfolio: prev.portfolio.filter(item => item.id !== id)
    }));
  };
  
  const handleSaveChanges = () => {
    setIsSaving(true);
    // Simulate API call delay
    setTimeout(() => {
        onSave(editableArtist);
        setIsSaving(false);
    }, 1000);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-5xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
        <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'avatar')} />
        <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'banner')} />

        <div className="flex items-center justify-between mb-8">
          <div>
              <h1 className="text-3xl font-bold text-white">Edit Your Profile</h1>
              <p className="text-white/50 mt-1">Changes will be reflected across the entire platform.</p>
          </div>
          <div className="flex items-center gap-3">
              <button onClick={onCancel} className="px-4 py-2 bg-white/10 border border-white/20 text-white font-bold rounded-lg text-sm hover:bg-white/20 transition-all">
                  Cancel
              </button>
              <button onClick={handleSaveChanges} disabled={isSaving} className="px-6 py-2 bg-primary text-background-dark font-bold rounded-lg text-sm hover:brightness-110 transition-all flex items-center gap-2 min-w-[100px] justify-center">
                  {isSaving ? <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : 'Save'}
              </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Image Management */}
          <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Profile Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <label className="block text-xs font-bold text-white/70 uppercase mb-2">Cover Photo</label>
                      <div className="relative aspect-video rounded-lg bg-surface-dark group overflow-hidden">
                          <img src={editableArtist.banner} alt="Banner" loading="lazy" className="w-full h-full object-cover"/>
                          <button onClick={() => bannerInputRef.current?.click()} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="material-symbols-outlined text-white">upload</span>
                          </button>
                      </div>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-white/70 uppercase mb-2">Profile Picture</label>
                      <div className="relative aspect-square w-40 rounded-lg bg-surface-dark group overflow-hidden">
                          <img src={editableArtist.avatar} alt="Avatar" loading="lazy" className="w-full h-full object-cover"/>
                          <button onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="material-symbols-outlined text-white">upload</span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
          
          {/* Basic Information */}
          <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                      <label className="block text-xs font-bold text-white/70 uppercase mb-2">Full Name</label>
                      <input name="name" value={editableArtist.name} onChange={handleInputChange} className="edit-input"/>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-white/70 uppercase mb-2">Sub-Category / Title</label>
                      <input name="subCategory" value={editableArtist.subCategory} onChange={handleInputChange} className="edit-input"/>
                  </div>
                  <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-white/70 uppercase mb-2">Bio</label>
                      <textarea name="bio" value={editableArtist.bio} onChange={handleInputChange} rows={5} className="edit-textarea"/>
                  </div>
              </div>
          </div>

          {/* Contact & Location */}
          <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Contact & Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                      <label className="block text-xs font-bold text-white/70 uppercase mb-2">Email Address</label>
                      <input name="email" type="email" value={editableArtist.email} onChange={handleInputChange} className="edit-input"/>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-white/70 uppercase mb-2">WhatsApp Number</label>
                      <input name="whatsapp" value={editableArtist.whatsapp} onChange={handleInputChange} className="edit-input"/>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-white/70 uppercase mb-2">Location</label>
                      <input name="location" value={editableArtist.location} onChange={handleInputChange} className="edit-input"/>
                  </div>
              </div>
          </div>

          {/* Portfolio Management */}
          <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Portfolio</h3>
                  <button 
                    onClick={() => setIsPortfolioModalOpen(true)}
                    className="px-4 py-2 bg-white/10 border border-white/20 text-white font-bold rounded-lg text-xs hover:bg-white/20 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">add</span>
                      Add New Item
                  </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {editableArtist.portfolio.map(item => (
                      <div key={item.id} className="relative group aspect-video rounded-lg overflow-hidden bg-surface-dark border border-border-dark">
                          <img src={item.thumb} alt={item.title} className="w-full h-full object-cover"/>
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-xs font-bold text-white truncate">{item.title}</p>
                            <div className="flex gap-2 mt-2">
                                  <button className="size-7 rounded-md bg-white/10 text-white flex items-center justify-center hover:bg-primary hover:text-background-dark"><span className="material-symbols-outlined text-sm">edit</span></button>
                                  <button onClick={() => handleRemovePortfolioItem(item.id)} className="size-7 rounded-md bg-white/10 text-white flex items-center justify-center hover:bg-red-500"><span className="material-symbols-outlined text-sm">delete</span></button>
                            </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Availability & Socials */}
          <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Availability & Socials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                      <label className="block text-xs font-bold text-white/70 uppercase mb-3">Booking Availability</label>
                      <label htmlFor="availability-toggle" className="flex items-center cursor-pointer group w-fit">
                        <div className="relative">
                            <input type="checkbox" id="availability-toggle" className="sr-only" checked={editableArtist.available} onChange={(e) => setEditableArtist(prev => ({...prev, available: e.target.checked}))} />
                            <div className={`block w-10 h-6 rounded-full transition ${editableArtist.available ? 'bg-primary' : 'bg-black/30'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${editableArtist.available ? 'translate-x-4' : ''}`}></div>
                        </div>
                        <div className="ml-3 text-sm font-bold text-white/80">Available</div>
                      </label>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-white/70 uppercase mb-3">Social Links</label>
                      <div className="grid grid-cols-2 gap-3">
                          <input name="youtube" placeholder="YouTube" value={editableArtist.socials.youtube || ''} onChange={handleSocialsChange} className="edit-input"/>
                          <input name="instagram" placeholder="Instagram" value={editableArtist.socials.instagram || ''} onChange={handleSocialsChange} className="edit-input"/>
                          <input name="facebook" placeholder="Facebook" value={editableArtist.socials.facebook || ''} onChange={handleSocialsChange} className="edit-input col-span-2 sm:col-span-1"/>
                      </div>
                  </div>
              </div>
          </div>

        </div>
      </div>
      <AddPortfolioItemModal 
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        onSave={handleAddPortfolioItem}
      />
    </>
  );
};

export default EditProfile;