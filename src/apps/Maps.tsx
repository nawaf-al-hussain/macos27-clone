'use client';

import { useState } from 'react';

export default function Maps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      {showSidebar && (
        <div
          className="w-[200px] shrink-0 flex flex-col"
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="p-3">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/5">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
                <circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Maps"
                className="flex-1 bg-transparent text-[12px] text-white/80 outline-none placeholder:text-white/25"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2">
            <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wide px-2 mb-1">Favorites</div>
            {['Home', 'Work', 'Apple Park'].map((place, i) => (
              <button
                key={place}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-left transition-colors ${
                  i === 2 ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1C4.79 1 3 2.79 3 5c0 3.5 4 7.5 4 7.5s4-4 4-7.5C11 2.79 9.21 1 7 1z" fill={i === 2 ? '#007aff' : 'rgba(255,255,255,0.5)'}/>
                  <circle cx="7" cy="5" r="1.5" fill="white"/>
                </svg>
                <span className="truncate">{place}</span>
              </button>
            ))}
            <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wide px-2 mb-1 mt-3">Recents</div>
            {['Starbucks, Cupertino', 'Whole Foods, Sunnyvale'].map(place => (
              <button
                key={place}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-left text-white/70 hover:bg-white/6 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  <path d="M5 7l1.5 1.5L9 5.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="truncate">{place}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Map Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Standard/Satellite toggle */}
          <div className="flex items-center gap-0.5 bg-white/5 rounded-md p-0.5">
            <button className="px-2 py-0.5 rounded text-[11px] bg-white/15 text-white">Standard</button>
            <button className="px-2 py-0.5 rounded text-[11px] text-white/40 hover:text-white/60">Satellite</button>
          </div>

          <div className="flex-1" />

          {/* Zoom */}
          <button className="p-1 rounded hover:bg-white/10 text-white/60">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="7" y1="3" x2="7" y2="11"/><line x1="3" y1="7" x2="11" y2="7"/></svg>
          </button>
          <button className="p-1 rounded hover:bg-white/10 text-white/60">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="7" x2="11" y2="7"/></svg>
          </button>

          {/* Go Home */}
          <button className="p-1 rounded hover:bg-white/10 text-white/60">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 2L2 6h2v5h6V6h2L7 2z" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Toggle sidebar */}
          <button
            className="p-1 rounded hover:bg-white/10 text-white/60"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="1" width="12" height="12" rx="2"/>
              <line x1="5" y1="1" x2="5" y2="13"/>
            </svg>
          </button>
        </div>

        {/* Map Content */}
        <div className="flex-1 relative overflow-hidden" style={{ background: '#1a2a1a' }}>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-122.06,-37.35,-121.93,-37.28&layer=mapnik&marker=-122.00,-37.32"
            className="absolute inset-0 w-full h-full border-0"
            style={{ filter: 'brightness(0.85) contrast(1.1)' }}
            title="Map"
          />

          {/* Map footer */}
          <div
            className="absolute bottom-0 left-0 right-0 px-3 py-1.5 text-[10px] text-white/30 flex items-center justify-between"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}
          >
            <span>Report a problem</span>
            <span>© OpenStreetMap contributors</span>
          </div>
        </div>
      </div>
    </div>
  );
}