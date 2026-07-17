'use client';

import { useState } from 'react';

const SIDEBAR_TABS = [
  { id: 'watch-now', label: 'Watch Now' },
  { id: 'apple-tv-plus', label: 'Apple TV+' },
  { id: 'store', label: 'Store' },
  { id: 'library', label: 'Library' },
];

const UP_NEXT = [
  { title: 'Orbit', subtitle: 'Resume · S1 E4 · 42 min', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { title: 'Deep Field', subtitle: 'In your Watchlist · S1 E2 · 51 min', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)' },
];

const TRENDING = [
  { title: 'Orbit', duration: '', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { title: 'The Last Compiler', duration: '2h 4m', gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)' },
  { title: 'Tahoe Nights', duration: 'S2 E1 · 38m', gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' },
  { title: 'Horizon Line', duration: '1h 47m', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
  { title: 'Deep Field', duration: '', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)' },
  { title: 'The Art of Glass', duration: '1h 22m', gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' },
  { title: 'Static Bloom', duration: '1h 35m', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d946ef 100%)' },
  { title: 'Night Market', duration: 'S3 E6 · 29m', gradient: 'linear-gradient(135deg, #14b8a6 0%, #2563eb 100%)' },
];

export default function TV() {
  const [activeTab, setActiveTab] = useState('watch-now');

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[160px] shrink-0 py-2 px-2"
        style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {SIDEBAR_TABS.map(tab => (
          <button
            key={tab.id}
            className={`w-full text-left px-2.5 py-[5px] rounded-md text-[13px] transition-colors ${
              activeTab === tab.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Featured Hero */}
        <div
          className="relative mx-4 mt-3 mb-4 rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.3) 50%, rgba(14,165,233,0.3) 100%)',
            minHeight: '180px',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="relative z-10 p-6 flex flex-col justify-end h-full" style={{ minHeight: '180px' }}>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[11px] text-white/50 uppercase tracking-wide mb-1">Featured</div>
                <h2 className="text-[28px] font-bold text-white">Orbit</h2>
                <p className="text-[13px] text-white/60 mt-1">A cosmic journey through the boundaries of human ambition.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors text-[13px] text-white font-medium backdrop-blur-sm">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="white">
                    <path d="M4 2.5v11l9-5.5z"/>
                  </svg>
                  Play
                </button>
                <button className="px-4 py-1.5 rounded-full bg-white/8 hover:bg-white/15 transition-colors text-[13px] text-white/80 backdrop-blur-sm">
                  More Info
                </button>
              </div>
            </div>
          </div>
          {/* Second featured title hint */}
          <div className="absolute bottom-3 right-6 z-10 text-[11px] text-white/40">
            Also featured: <span className="text-white/60">Deep Field</span>
          </div>
        </div>

        <div className="px-5 pb-5">
          {/* Up Next */}
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-white/85 mb-3">Up Next</h2>
            <div className="grid grid-cols-2 gap-3">
              {UP_NEXT.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-white/6 transition-colors"
                >
                  <div
                    className="w-28 h-16 rounded-lg shrink-0 relative overflow-hidden"
                    style={{ background: item.gradient }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 16 16" fill="rgba(255,255,255,0.7)">
                        <path d="M4 2.5v11l9-5.5z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-white/85 truncate">{item.title}</div>
                    <div className="text-[11px] text-white/40 mt-0.5">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Now */}
          <div>
            <h2 className="text-[16px] font-semibold text-white/85 mb-3">Trending Now</h2>
            <div className="grid grid-cols-4 gap-3">
              {TRENDING.map((item, i) => (
                <div key={i} className="cursor-pointer group">
                  <div
                    className="aspect-[3/4] rounded-lg overflow-hidden relative"
                    style={{ background: item.gradient }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 flex items-center justify-center">
                      <button className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="#000">
                          <path d="M4 2.5v11l9-5.5z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-1.5">
                    <div className="text-[12px] font-medium text-white/80 truncate">{item.title}</div>
                    {item.duration && (
                      <div className="text-[11px] text-white/40">{item.duration}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}