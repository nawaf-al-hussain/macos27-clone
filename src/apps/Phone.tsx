'use client';

import { useState } from 'react';

const CONTACTS = [
  { name: 'Maya Chen', color: '#ff6b6b' },
  { name: 'Linda Harper', color: '#4ecdc4' },
  { name: 'Alex Rivera', color: '#45b7d1' },
  { name: 'Sam Okafor', color: '#f9ca24' },
  { name: 'Priya Nair', color: '#a29bfe' },
  { name: 'Jordan Lee', color: '#fd79a8' },
  { name: 'Linda Harper', color: '#4ecdc4' },
  { name: 'Emma Wilson', color: '#00b894' },
  { name: 'Carlos Mendez', color: '#e17055' },
  { name: 'Yuki Tanaka', color: '#6c5ce7' },
];

const TABS = [
  { id: 'favorites', label: 'Favorites', icon: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 14.27l-4.77 2.51.91-5.32L2.27 7.62l5.34-.78L10 2z" />
    </svg>
  )},
  { id: 'recents', label: 'Recents', icon: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="10" cy="10" r="8" />
      <polyline points="10,6 10,10 13,10" />
    </svg>
  )},
  { id: 'contacts', label: 'Contacts', icon: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
      <circle cx="8" cy="6" r="3" />
      <line x1="16" y1="4" x2="16" y2="10" />
      <line x1="13" y1="7" x2="19" y2="7" />
    </svg>
  )},
  { id: 'keypad', label: 'Keypad', icon: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="5" height="5" rx="1" />
      <rect x="12" y="3" width="5" height="5" rx="1" />
      <rect x="3" y="12" width="5" height="5" rx="1" />
      <rect x="12" y="12" width="5" height="5" rx="1" />
    </svg>
  )},
  { id: 'voicemail', label: 'Voicemail', badge: '2', icon: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5v4a6 6 0 0 0 12 0V5" />
      <line x1="9" y1="16" x2="11" y2="16" />
      <line x1="10" y1="16" x2="10" y2="18" />
    </svg>
  )},
];

export default function Phone() {
  const [activeTab, setActiveTab] = useState('recents');

  return (
    <div className="flex h-full">
      {/* Sidebar with tabs */}
      <div
        className="w-[200px] shrink-0 flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {CONTACTS.map((contact, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2 hover:bg-white/6 transition-colors"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium text-white shrink-0"
                style={{ background: contact.color + '33', color: contact.color }}
              >
                {contact.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-white/80 truncate">{contact.name}</div>
              </div>
              <button className="w-6 h-6 rounded-full flex items-center justify-center text-white/30 hover:bg-white/8 hover:text-white/60 transition-colors">
                <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                  <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <text x="10" y="13.5" textAnchor="middle" fontSize="10" fontWeight="600" fill="currentColor" fontFamily="system-ui">i</text>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Tab Bar */}
        <div
          className="flex items-center justify-around py-1.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`flex flex-col items-center gap-0.5 px-1 py-1 rounded-md relative transition-colors ${
                activeTab === tab.id ? 'text-blue-400' : 'text-white/40 hover:text-white/60'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 min-w-[14px] h-[14px] rounded-full bg-red-500 flex items-center justify-center text-[9px] text-white font-bold leading-none px-1">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] leading-none">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Recents List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Recents</div>
        </div>
        {CONTACTS.map((contact, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/4 transition-colors"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-medium text-white shrink-0"
              style={{ background: contact.color + '33', color: contact.color }}
            >
              {contact.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] text-white/90 font-medium">{contact.name}</div>
            </div>
            <button className="px-2.5 py-1 rounded-md text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors">
              Info for {contact.name.split(' ')[0]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}