import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/artists';

interface Category {
  id: number;
  name: string;
  subcategories: string[];
}

const AddCategoryModal: React.FC<{ onSave: (name: string) => void; onClose: () => void; }> = ({ onSave, onClose }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-dark border border-white/10 rounded-2xl w-full max-w-md">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Add New Category</h3>
          <button onClick={onClose}><span className="material-symbols-outlined text-white/50 hover:text-white">close</span></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="category-name" className="block text-xs font-bold text-white/50 uppercase mb-2">Category Name</label>
            <input
              id="category-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Event Manager"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              autoFocus
            />
          </div>
          <button type="submit" className="w-full bg-primary text-background-dark font-bold py-3 rounded-xl hover:brightness-110 mt-4 transition-all">
            Save Category
          </button>
        </form>
      </div>
    </div>
  );
};

const EditCategoryModal: React.FC<{ category: Category | null; onUpdate: (category: Category) => void; onClose: () => void; }> = ({ category, onUpdate, onClose }) => {
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [newSub, setNewSub] = useState('');

  useEffect(() => {
    if (category) {
      setSubcategories(category.subcategories);
    }
  }, [category]);

  if (!category) return null;
  
  const handleAddSub = () => {
    if (newSub.trim() && !subcategories.includes(newSub.trim())) {
      const updatedSubcategories = [...subcategories, newSub.trim()];
      setSubcategories(updatedSubcategories);
      onUpdate({ ...category, subcategories: updatedSubcategories });
      setNewSub('');
    }
  };
  
  const handleRemoveSub = (subToRemove: string) => {
    const updatedSubcategories = subcategories.filter(sub => sub !== subToRemove);
    setSubcategories(updatedSubcategories);
    onUpdate({ ...category, subcategories: updatedSubcategories });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-dark border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Edit: <span className="text-primary">{category.name}</span></h3>
          <button onClick={onClose}><span className="material-symbols-outlined text-white/50 hover:text-white">close</span></button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <label className="block text-xs font-bold text-white/50 uppercase">Subcategories</label>
          <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-black/20 min-h-[4rem]">
            {subcategories.length > 0 ? subcategories.map(sub => (
              <div key={sub} className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 text-sm font-bold px-3 py-1 rounded-full animate-in fade-in zoom-in-95">
                <span>{sub}</span>
                <button onClick={() => handleRemoveSub(sub)} className="size-4 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </div>
            )) : <p className="text-sm text-white/40 italic">No subcategories yet.</p>}
          </div>
          
          <div>
            <label htmlFor="new-subcategory" className="block text-xs font-bold text-white/50 uppercase mt-4 mb-2">Add New Subcategory</label>
            <div className="flex gap-2">
              <input
                id="new-subcategory"
                value={newSub}
                onChange={(e) => setNewSub(e.target.value)}
                placeholder="e.g., Corporate Events"
                className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSub(); }}}
              />
              <button onClick={handleAddSub} type="button" className="px-5 bg-white/10 border border-white/10 rounded-lg text-sm font-bold hover:bg-white/20 transition-colors">Add</button>
            </div>
          </div>
        </div>
        <div className="p-6 mt-auto border-t border-white/5">
          <button onClick={onClose} className="w-full bg-primary text-background-dark font-bold py-3 rounded-xl hover:brightness-110 transition-all">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};


const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    // Transform the initial data into the desired state structure
    const initialCategories = Object.entries(CATEGORIES).map(([name, subcategories], index) => ({
      id: index + 1,
      name,
      subcategories,
    }));
    setCategories(initialCategories);
  }, []);

  const handleAddCategory = (name: string) => {
    const newCategory: Category = {
      id: Date.now(),
      name,
      subcategories: [],
    };
    setCategories(prev => [newCategory, ...prev]);
    setIsAddModalOpen(false);
  };
  
  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(prev => prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-4xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Manage Categories</h1>
            <p className="text-white/50 mt-1">Add, edit, or remove categories and subcategories.</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-background-dark font-bold rounded-full hover:brightness-110 transition-all shadow-[0_0_15px_rgba(43,238,121,0.3)] self-start sm:self-center"
          >
            <span className="material-symbols-outlined">add</span>
            <span>New Category</span>
          </button>
        </div>

        <div className="space-y-6">
          {categories.map(category => (
            <div key={category.id} className="glass-card rounded-2xl p-6 transition-all hover:border-primary/40">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-sm text-white/50 mb-4">{category.subcategories.length} subcategories</p>
                </div>
                <button onClick={() => setEditingCategory(category)} className="flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
                  <span className="material-symbols-outlined text-base">edit</span>
                  Edit
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.subcategories.slice(0, 8).map(sub => (
                  <span key={sub} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-bold text-white/60 uppercase tracking-wider">
                    {sub}
                  </span>
                ))}
                {category.subcategories.length > 8 && (
                   <span className="px-2.5 py-1 rounded bg-black/20 border border-white/10 text-[11px] font-bold text-white/40 uppercase tracking-wider">
                    + {category.subcategories.length - 8} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAddModalOpen && <AddCategoryModal onSave={handleAddCategory} onClose={() => setIsAddModalOpen(false)} />}
      {editingCategory && <EditCategoryModal category={editingCategory} onUpdate={handleUpdateCategory} onClose={() => setEditingCategory(null)} />}
    </>
  );
};

export default CategoriesPage;