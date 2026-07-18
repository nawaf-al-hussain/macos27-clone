'use client';

import { useState } from 'react';

const CONTACTS = [
  { name: 'Alex Rivera', color: '#45b7d1', letter: 'A' },
  { name: 'Carlos Mendez', color: '#e17055', letter: 'C' },
  { name: 'David Kim', color: '#636e72', letter: 'D' },
  { name: 'Emma Wilson', color: '#00b894', letter: 'E' },
  { name: 'Jordan Lee', color: '#fd79a8', letter: 'J' },
  { name: 'Linda Harper', color: '#4ecdc4', letter: 'L' },
  { name: 'Linda Harper', color: '#4ecdc4', letter: 'L' },
  { name: 'Maya Chen', color: '#ff6b6b', letter: 'M' },
  { name: 'Priya Nair', color: '#a29bfe', letter: 'P' },
  { name: 'Raj Patel', color: '#fdcb6e', letter: 'R' },
  { name: 'Sam Okafor', color: '#f9ca24', letter: 'S' },
  { name: 'Yuki Tanaka', color: '#6c5ce7', letter: 'Y' },
];

const INDEX_LETTERS = ['A', 'C', 'D', 'E', 'J', 'L', 'M', 'P', 'R', 'S', 'T', 'Y'];

const GROUPS = [
  { name: 'All Contacts', count: 12, icon: (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
      <circle cx="8" cy="6" r="3" />
      <line x1="16" y1="4" x2="16" y2="10" />
      <line x1="13" y1="7" x2="19" y2="7" />
    </svg>
  )},
  { name: 'iCloud', count: 12, icon: (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M6 16a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 15.5 8 3.5 3.5 0 0 1 16 15.5H6z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )},
  { name: 'Favorites', count: 1, icon: (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 14.27l-4.77 2.51.91-5.32L2.27 7.62l5.34-.78L10 2z" />
    </svg>
  )},
];

const ACTION_BUTTONS = [
  { label: 'Edit', icon: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 3l6 6-8.5 8.5H2.5v-6L11 3z" />
    </svg>
  )},
  { label: 'Share', icon: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
      <polyline points="14,8 18,4 14,0" transform="translate(0,2)" />
      <line x1="12" y1="6" x2="18" y2="6" />
    </svg>
  )},
  { label: 'Call', icon: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 1.5h3.8a1 1 0 0 1 .95.68l1.2 3.6a1 1 0 0 1-.27 1.05l-1.7 1.7a11 11 0 0 0 5.14 5.14l1.7-1.7a1 1 0 0 1 1.05-.27l3.6 1.2a1 1 0 0 1 .68.95v3.8a1 1 0 0 1-1 1A17 17 0 0 1 2.5 2.5a1 1 0 0 1 1-1z" />
    </svg>
  )},
  { label: 'Message', icon: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5l-3 3V5a1 1 0 0 1 1-1z" />
    </svg>
  )},
  { label: 'Email', icon: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="16" height="12" rx="2" />
      <polyline points="2,6 10,11 18,6" />
    </svg>
  )},
];

export default function Contacts() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState('All Contacts');

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[180px] shrink-0 flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* My Card */}
        <div className="px-3 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2 px-1 py-1 rounded-md hover:bg-white/6 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center text-[14px] font-bold text-white shrink-0">
              N
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] text-white/90 font-medium">Nawaf</div>
              <div className="text-[10px] text-white/35">My Card</div>
            </div>
          </div>
        </div>

        {/* Groups */}
        <div className="flex-1 overflow-y-auto py-1 px-1">
          {GROUPS.map(group => (
            <button
              key={group.name}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-left transition-colors ${
                activeGroup === group.name ? 'bg-white/12 text-white' : 'text-white/60 hover:bg-white/6'
              }`}
              onClick={() => setActiveGroup(group.name)}
            >
              <span className="text-white/40">{group.icon}</span>
              <span className="flex-1">{group.name}</span>
              <span className="text-[11px] text-white/30">{group.count}</span>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="px-2 py-2 flex items-center gap-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex-1 flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
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
          <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-white/60 hover:bg-white/10 transition-colors">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
              <line x1="7" y1="2" x2="7" y2="12" />
              <line x1="2" y1="7" x2="12" y2="7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-3 py-2 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 flex-1 max-w-[200px]">
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
          <div className="flex-1" />
          <button className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] text-white/70 hover:bg-white/10 transition-colors font-medium">
            New Contact
            <span className="text-white/30 text-[10px]">⌘N</span>
          </button>
        </div>

        {/* Contact List with Index */}
        <div className="flex-1 overflow-y-auto relative">
          <div>
            {CONTACTS.map((contact, i) => {
              const showLetter = i === 0 || CONTACTS[i - 1].letter !== contact.letter;
              return (
                <div key={i}>
                  {showLetter && (
                    <div className="px-4 py-1">
                      <span className="text-[11px] font-semibold text-white/40 uppercase">{contact.letter}</span>
                    </div>
                  )}
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-1.5 text-left transition-colors ${
                      selected === contact.name + i ? 'bg-[#0058d0]' : 'hover:bg-white/4'
                    }`}
                    onClick={() => setSelected(contact.name + i)}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-medium text-white shrink-0"
                      style={{ background: contact.color + '33', color: contact.color }}
                    >
                      {contact.name[0]}
                    </div>
                    <span className="text-[13px] text-white/80">{contact.name}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Alphabetical Index */}
          <div className="absolute right-1 top-0 bottom-0 flex flex-col items-center justify-center gap-0 py-1">
            {INDEX_LETTERS.map(letter => (
              <button
                key={letter}
                className="w-3.5 h-3.5 flex items-center justify-center text-[9px] text-white/25 hover:text-white/60 hover:bg-white/10 rounded transition-colors"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div
          className="flex items-center justify-center gap-6 px-4 py-2 shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {ACTION_BUTTONS.map(btn => (
            <button
              key={btn.label}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-md text-white/40 hover:text-white/70 hover:bg-white/6 transition-colors"
            >
              {btn.icon}
              <span className="text-[9px]">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}