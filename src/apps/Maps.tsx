'use client';

import { useState } from 'react';

export default function Maps() {
  const [searchQuery, setSearchQuery] = useState('Apple Park, Cupertino');

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/8">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
            <circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-[13px] text-white/80 outline-none placeholder:text-white/25"
            placeholder="Search Maps"
          />
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 relative overflow-hidden" style={{ background: '#1a2a1a' }}>
        {/* Simulated Map */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 800 500" className="opacity-80">
            {/* Water */}
            <rect width="800" height="500" fill="#1a3a4a"/>
            {/* Land masses */}
            <path d="M0,200 Q100,180 200,220 T400,200 T600,230 T800,210 L800,500 L0,500Z" fill="#1e3e2e" opacity="0.8"/>
            <path d="M0,300 Q150,280 300,320 T500,300 T700,330 L800,320 L800,500 L0,500Z" fill="#1a3528" opacity="0.6"/>

            {/* Roads */}
            <line x1="100" y1="0" x2="100" y2="500" stroke="#3a5a4a" strokeWidth="2"/>
            <line x1="300" y1="0" x2="300" y2="500" stroke="#3a5a4a" strokeWidth="2"/>
            <line x1="500" y1="0" x2="500" y2="500" stroke="#3a5a4a" strokeWidth="2"/>
            <line x1="700" y1="0" x2="700" y2="500" stroke="#3a5a4a" strokeWidth="2"/>
            <line x1="0" y1="100" x2="800" y2="100" stroke="#3a5a4a" strokeWidth="2"/>
            <line x1="0" y1="250" x2="800" y2="250" stroke="#3a5a4a" strokeWidth="2"/>
            <line x1="0" y1="400" x2="800" y2="400" stroke="#3a5a4a" strokeWidth="2"/>

            {/* Major roads */}
            <line x1="0" y1="180" x2="800" y2="180" stroke="#4a6a5a" strokeWidth="3"/>
            <line x1="400" y1="0" x2="400" y2="500" stroke="#4a6a5a" strokeWidth="3"/>

            {/* Apple Park Ring */}
            <circle cx="400" cy="250" r="60" fill="none" stroke="#2a5a3a" strokeWidth="4"/>
            <circle cx="400" cy="250" r="55" fill="#1e4a2e" opacity="0.5"/>

            {/* Buildings */}
            <rect x="150" y="120" width="30" height="25" rx="2" fill="#2a4a3a" opacity="0.7"/>
            <rect x="220" y="280" width="25" height="35" rx="2" fill="#2a4a3a" opacity="0.7"/>
            <rect x="550" y="150" width="40" height="30" rx="2" fill="#2a4a3a" opacity="0.7"/>
            <rect x="620" y="320" width="35" height="25" rx="2" fill="#2a4a3a" opacity="0.7"/>

            {/* Park label */}
            <text x="400" y="255" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Inter">Apple Park</text>

            {/* Location Pin */}
            <g transform="translate(400, 210)">
              <ellipse cx="0" cy="20" rx="8" ry="3" fill="rgba(0,0,0,0.3)"/>
              <path d="M0,-15 A10,10,0,1,1,0,5 C0,5,-10,10,-10,15 A10,10,0,0,0,10,15 C10,10,0,5,0,5Z" fill="#007aff"/>
              <circle cx="0" cy="-5" r="4" fill="white"/>
            </g>
          </svg>
        </div>

        {/* Floating Info Card */}
        <div
          className="absolute bottom-4 left-4 w-[240px] rounded-xl p-3"
          style={{
            background: 'rgba(30,30,30,0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <div className="text-[14px] font-medium text-white/90 mb-1">Apple Park</div>
          <div className="text-[12px] text-white/50 mb-2">One Apple Park Way, Cupertino, CA</div>
          <div className="flex gap-2">
            <button className="flex-1 text-center py-1.5 rounded-lg bg-blue-500 text-[12px] text-white font-medium">
              Directions
            </button>
            <button className="flex-1 text-center py-1.5 rounded-lg bg-white/10 text-[12px] text-white/80">
              Share
            </button>
          </div>
        </div>

        {/* Zoom Controls */}
        <div
          className="absolute right-4 top-4 flex flex-col rounded-lg overflow-hidden"
          style={{ background: 'rgba(30,30,30,0.85)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <button className="px-3 py-2 text-white/70 hover:bg-white/10 text-[16px]">+</button>
          <div className="h-px bg-white/10" />
          <button className="px-3 py-2 text-white/70 hover:bg-white/10 text-[16px]">−</button>
        </div>
      </div>
    </div>
  );
}