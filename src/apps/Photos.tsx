'use client';

import { useState } from 'react';

const PHOTO_GROUPS = [
  {
    label: 'July 2026',
    photos: [
      { id: '1', name: 'photo-1.jpg', color: 'from-blue-400/40 to-purple-500/40' },
      { id: '2', name: 'photo-2.jpg', color: 'from-green-400/40 to-cyan-500/40' },
    ],
  },
  {
    label: 'June 2026',
    photos: [
      { id: '3', name: 'photo-3.jpg', color: 'from-orange-400/40 to-red-500/40' },
      { id: '4', name: 'photo-4.jpg', color: 'from-pink-400/40 to-rose-500/40' },
      { id: '5', name: 'photo-5.jpg', color: 'from-yellow-400/40 to-amber-500/40' },
    ],
  },
  {
    label: 'May 2026',
    photos: [
      { id: '6', name: 'photo-6.jpg', color: 'from-teal-400/40 to-blue-500/40' },
      { id: '7', name: 'photo-7.jpg', color: 'from-indigo-400/40 to-purple-500/40' },
      { id: '8', name: 'photo-8.jpg', color: 'from-lime-400/40 to-green-500/40' },
    ],
  },
];

const SIDEBAR = {
  library: [
    { id: 'all', name: 'All Photos', count: 8 },
    { id: 'favorites', name: 'Favorites', count: 2 },
    { id: 'deleted', name: 'Recently Deleted', count: 0 },
  ],
  albums: [
    { id: 'albums-all', name: 'All Albums', count: 2 },
    { id: 'tahoe', name: 'Tahoe Trip', count: 2 },
    { id: 'coffee', name: 'Coffee', count: 1 },
  ],
};

export default function Photos() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeSection, setActiveSection] = useState<'library' | 'albums'>('library');

  const allPhotos = PHOTO_GROUPS.flatMap(g => g.photos);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[160px] shrink-0 py-2 px-1.5 overflow-y-auto"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Library */}
        <div className="mb-3">
          <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wide px-2 mb-1">
            Library
          </div>
          {SIDEBAR.library.map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[13px] text-left transition-colors ${
                activeTab === item.id && activeSection === 'library' ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
              }`}
              onClick={() => { setActiveTab(item.id); setActiveSection('library'); }}
            >
              <span className="truncate">{item.name}</span>
              {item.count > 0 && (
                <span className="text-[11px] text-white/30 ml-1">{item.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Albums */}
        <div className="mb-3">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-[11px] font-semibold text-white/30 uppercase tracking-wide">Albums</span>
            <button className="text-[11px] text-white/30 hover:text-white/50">+</button>
          </div>
          {SIDEBAR.albums.map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[13px] text-left transition-colors ${
                activeTab === item.id && activeSection === 'albums' ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
              }`}
              onClick={() => { setActiveTab(item.id); setActiveSection('albums'); }}
            >
              <span className="truncate">{item.name}</span>
              {item.count > 0 && (
                <span className="text-[11px] text-white/30 ml-1">{item.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button className="px-2.5 py-1 rounded-md hover:bg-white/10 text-[12px] text-white/70">
            Import
          </button>
          <button className="p-1 rounded hover:bg-white/10 text-white/50">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="3,2 12,7 3,12"/>
            </svg>
          </button>
          <span className="text-[11px] text-white/40">Play Slideshow</span>

          <div className="flex-1" />

          {/* Size slider */}
          <span className="text-[11px] text-white/30">Thumbnail size</span>
          <input
            type="range"
            min={60}
            max={200}
            defaultValue={120}
            className="w-20 cc-slider"
          />

          <button className="p-1 rounded hover:bg-white/10 text-white/50 ml-1">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Photo Grid */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="mb-2">
            <h2 className="text-[14px] font-medium text-white/80">
              {activeTab === 'all' ? 'All Photos' : activeTab === 'favorites' ? 'Favorites' : activeTab === 'tahoe' ? 'Tahoe Trip' : activeTab === 'coffee' ? 'Coffee' : 'All Photos'}
              <span className="text-white/40 font-normal ml-2">— {allPhotos.length} items</span>
            </h2>
          </div>

          {activeSection === 'library' && activeTab === 'all' ? (
            <div className="space-y-4">
              {PHOTO_GROUPS.map(group => (
                <div key={group.label}>
                  <div className="text-[13px] font-medium text-white/60 mb-2">{group.label}</div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {group.photos.map(photo => (
                      <div
                        key={photo.id}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <div className={`w-full h-full bg-gradient-to-br ${photo.color} flex items-center justify-center`}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <path d="M21 15l-5-5L5 21"/>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1.5">
              {allPhotos.slice(0, activeTab === 'favorites' ? 2 : activeTab === 'tahoe' ? 2 : activeTab === 'coffee' ? 1 : allPhotos.length).map(photo => (
                <div
                  key={photo.id}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <div className={`w-full h-full bg-gradient-to-br ${photo.color} flex items-center justify-center`}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}