'use client';

import { useState } from 'react';

const RECENTS = [
  { name: 'Maya Chen', detail: 'Outgoing · 4:12 · 6:00 PM', color: '#ff6b6b' },
  { name: 'Linda Harper', detail: 'Missed · 3:00 PM', color: '#4ecdc4' },
  { name: 'Alex Rivera', detail: 'Incoming · 12:33 · Yesterday', color: '#45b7d1' },
  { name: 'Sam Okafor', detail: 'Outgoing · 1:02 · Wed', color: '#f9ca24' },
  { name: 'Priya Nair', detail: 'Incoming · 28:41 · Tue', color: '#a29bfe' },
];

export default function FaceTime() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[220px] shrink-0 flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Toolbar */}
        <div className="px-3 py-2 flex flex-col gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/8 hover:bg-white/12 text-[12px] text-white/80 transition-colors">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="8" y1="2" x2="8" y2="14" />
              <line x1="2" y1="8" x2="14" y2="8" />
            </svg>
            New FaceTime
          </button>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent text-[11px] text-white/80 outline-none placeholder:text-white/25"
            />
          </div>
        </div>

        {/* Recents */}
        <div className="px-3 pt-3 pb-1">
          <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Recents</div>
        </div>
        <div className="flex-1 overflow-y-auto px-1">
          {RECENTS.map((entry, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-left transition-colors ${
                selected === entry.name ? 'bg-white/12' : 'hover:bg-white/6'
              }`}
              onClick={() => setSelected(entry.name)}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium text-white shrink-0"
                style={{ background: entry.color + '33', color: entry.color }}
              >
                {entry.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-white/90 font-medium truncate">{entry.name}</div>
                <div className="text-[11px] text-white/40 truncate">{entry.detail}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="text-center max-w-[380px]">
          <div className="text-[22px] font-light text-white/80 mb-2">FaceTime</div>
          <div className="text-[13px] text-white/40 leading-relaxed">
            Start a video or audio call from Recents, or search for a contact above.
          </div>
        </div>

        {/* Suggested Calls */}
        <div className="flex gap-3 mt-8">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 hover:bg-green-500/30 text-[13px] text-green-300 font-medium transition-colors">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 1.5h3.8a1 1 0 0 1 .95.68l1.2 3.6a1 1 0 0 1-.27 1.05l-1.7 1.7a11 11 0 0 0 5.14 5.14l1.7-1.7a1 1 0 0 1 1.05-.27l3.6 1.2a1 1 0 0 1 .68.95v3.8a1 1 0 0 1-1 1A17 17 0 0 1 2.5 2.5a1 1 0 0 1 1-1z" />
              <line x1="14" y1="2" x2="14" y2="7" />
              <line x1="11.5" y1="4.5" x2="16.5" y2="4.5" />
            </svg>
            Call Mom
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 hover:bg-green-500/30 text-[13px] text-green-300 font-medium transition-colors">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3a1 1 0 0 1 1-1h3.8a1 1 0 0 1 .95.68l1.2 3.6a1 1 0 0 1-.27 1.05l-1.7 1.7a11 11 0 0 0 5.14 5.14l1.7-1.7a1 1 0 0 1 1.05-.27l3.6 1.2a1 1 0 0 1 .68.95V18a1 1 0 0 1-1 1A17 17 0 0 1 1 2.5 1 1 0 0 1 2 1.5z" transform="translate(0,1.5)" />
            </svg>
            Audio with Maya
          </button>
        </div>
      </div>
    </div>
  );
}