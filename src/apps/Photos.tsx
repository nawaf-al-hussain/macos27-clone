'use client';

import { useState } from 'react';

const PHOTOS = [
  { id: '1', src: '/images/photo-1.jpg', name: 'Lake Tahoe Sunrise' },
  { id: '2', src: '/images/photo-2.jpg', name: 'Mountain Vista' },
  { id: '3', src: '/images/photo-3.jpg', name: 'Forest Path' },
  { id: '4', src: '/images/photo-4.jpg', name: 'Coastal Sunset' },
  { id: '5', src: '/images/photo-5.jpg', name: 'City Lights' },
  { id: '6', src: '/images/photo-6.jpg', name: 'Desert Bloom' },
  { id: '7', src: '/images/photo-7.jpg', name: 'Ocean Waves' },
  { id: '8', src: '/images/photo-8.jpg', name: 'Aurora Borealis' },
];

const SIDEBAR_ITEMS = [
  { id: 'library', name: 'Library', icon: '📚' },
  { id: 'favorites', name: 'Favorites', icon: '❤️' },
  { id: 'recents', name: 'Recents', icon: '🕐' },
  { id: 'people', name: 'People', icon: '👥' },
  { id: 'places', name: 'Places', icon: '📍' },
  { id: 'memories', name: 'Memories', icon: '💎' },
];

export default function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('library');

  const selected = PHOTOS.find(p => p.id === selectedPhoto);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-[150px] shrink-0 py-2 px-1.5 overflow-y-auto" style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        {SIDEBAR_ITEMS.map(item => (
          <button
            key={item.id}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-left transition-colors ${
              activeTab === item.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="text-[14px]">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {selectedPhoto ? (
          <div>
            <button
              className="text-[13px] text-blue-400 mb-3 hover:underline"
              onClick={() => setSelectedPhoto(null)}
            >
              ← Back to Library
            </button>
            <div className="rounded-xl overflow-hidden">
              <img
                src={selected?.src}
                alt={selected?.name}
                className="w-full max-h-[400px] object-cover"
              />
            </div>
            <div className="mt-3 text-[14px] text-white/80 font-medium">{selected?.name}</div>
            <div className="text-[12px] text-white/40 mt-1">June 19, 2025</div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1.5">
            {PHOTOS.map(photo => (
              <button
                key={photo.id}
                className="aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                onClick={() => setSelectedPhoto(photo.id)}
              >
                <img
                  src={photo.src}
                  alt={photo.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}