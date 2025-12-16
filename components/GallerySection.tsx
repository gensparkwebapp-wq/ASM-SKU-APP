import React, { useState } from "react";

interface GalleryItem {
  id: number;
  src: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=600&h=800&fit=crop&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=800&fit=crop&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=600&h=800&fit=crop&q=80",
  },
];

const GallerySection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 max-w-[1400px]">
       <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-primary rounded-full"></div>
        <h2 className="text-2xl font-bold tracking-tight">Community Gallery</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="h-64 rounded-lg bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer overflow-hidden group"
          >
            <img src={item.src} alt={`Gallery image ${item.id}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;