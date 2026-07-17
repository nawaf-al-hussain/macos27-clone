'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

interface SpotlightProps {
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}

/* ───────── App definitions with colored icon backgrounds ───────── */

interface AppDef {
  id: string;
  name: string;
  color: string;
  icon: 'finder' | 'settings' | 'appstore' | 'games' | 'voicememos' | 'activity' | 'terminal' | 'diskutility' | 'calculator' | 'clock' | 'safari' | 'stocks' | 'notes' | 'reminders' | 'calendar' | 'contacts' | 'textedit' | 'stickies' | 'mail' | 'messages' | 'facetime' | 'phone' | 'freeform' | 'photos' | 'photobooth' | 'weather' | 'maps' | 'news' | 'music' | 'podcasts' | 'tv' | 'quicktime' | 'books' | 'preview' | 'home' | 'translate' | 'fontbook';
}

const ALL_APPS: AppDef[] = [
  { id: 'finder', name: 'Apps', color: '#2196F3', icon: 'finder' },
  { id: 'settings', name: 'System Settings', color: '#78909C', icon: 'settings' },
  { id: 'appstore', name: 'App Store', color: '#2196F3', icon: 'appstore' },
  { id: 'games', name: 'Games', color: '#4CAF50', icon: 'games' },
  { id: 'finder', name: 'Finder', color: '#42A5F5', icon: 'finder' },
  { id: 'voicememos', name: 'Voice Memos', color: '#EF5350', icon: 'voicememos' },
  { id: 'activity', name: 'Activity Monitor', color: '#78909C', icon: 'activity' },
  { id: 'terminal', name: 'Terminal', color: '#212121', icon: 'terminal' },
  { id: 'diskutility', name: 'Disk Utility', color: '#78909C', icon: 'diskutility' },
  { id: 'calculator', name: 'Calculator', color: '#FF7043', icon: 'calculator' },
  { id: 'clock', name: 'Clock', color: '#212121', icon: 'clock' },
  { id: 'safari', name: 'Safari', color: '#42A5F5', icon: 'safari' },
  { id: 'stocks', name: 'Stocks', color: '#212121', icon: 'stocks' },
  { id: 'notes', name: 'Notes', color: '#FFD54F', icon: 'notes' },
  { id: 'reminders', name: 'Reminders', color: '#FF9500', icon: 'reminders' },
  { id: 'calendar', name: 'Calendar', color: '#FF3B30', icon: 'calendar' },
  { id: 'contacts', name: 'Contacts', color: '#78909C', icon: 'contacts' },
  { id: 'textedit', name: 'TextEdit', color: '#78909C', icon: 'textedit' },
  { id: 'stickies', name: 'Stickies', color: '#FDD835', icon: 'stickies' },
  { id: 'mail', name: 'Mail', color: '#42A5F5', icon: 'mail' },
  { id: 'messages', name: 'Messages', color: '#34C759', icon: 'messages' },
  { id: 'facetime', name: 'FaceTime', color: '#34C759', icon: 'facetime' },
  { id: 'phone', name: 'Phone', color: '#34C759', icon: 'phone' },
  { id: 'freeform', name: 'Freeform', color: '#42A5F5', icon: 'freeform' },
  { id: 'photos', name: 'Photos', color: '#FF6B6B', icon: 'photos' },
  { id: 'photobooth', name: 'Photo Booth', color: '#78909C', icon: 'photobooth' },
  { id: 'weather', name: 'Weather', color: '#42A5F5', icon: 'weather' },
  { id: 'maps', name: 'Maps', color: '#34C759', icon: 'maps' },
  { id: 'news', name: 'News', color: '#FF3B30', icon: 'news' },
  { id: 'music', name: 'Music', color: '#FF2D55', icon: 'music' },
  { id: 'podcasts', name: 'Podcasts', color: '#9C27B0', icon: 'podcasts' },
  { id: 'tv', name: 'TV', color: '#212121', icon: 'tv' },
  { id: 'quicktime', name: 'QuickTime Player', color: '#42A5F5', icon: 'quicktime' },
  { id: 'books', name: 'Books', color: '#FF9500', icon: 'books' },
  { id: 'preview', name: 'Preview', color: '#42A5F5', icon: 'preview' },
  { id: 'home', name: 'Home', color: '#FF9500', icon: 'home' },
  { id: 'translate', name: 'Translate', color: '#34C759', icon: 'translate' },
  { id: 'fontbook', name: 'Font Book', color: '#78909C', icon: 'fontbook' },
];

/* ───────── Tab definitions ───────── */
const TABS = ['Apps', 'Files', 'Actions', 'Clipboard'] as const;
type Tab = (typeof TABS)[number];

export default function Spotlight({ onClose, onOpenApp }: SpotlightProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('Apps');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return ALL_APPS;
    const q = query.toLowerCase();
    return ALL_APPS.filter(a => a.name.toLowerCase().includes(q));
  }, [query]);

  const handleAppClick = (appId: string) => {
    onOpenApp(appId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[700] flex items-start justify-center pt-[6vh] spotlight-enter"
      onClick={onClose}
    >
      {/* Dark translucent backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Panel */}
      <div
        className="relative w-[680px] max-w-[95vw] rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: 'rgba(30, 30, 30, 0.88)',
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 30px 100px rgba(0,0,0,0.7)',
          maxHeight: '80vh',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
            <circle cx="7" cy="7" r="5" />
            <line x1="11" y1="11" x2="14.5" y2="14.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Escape') onClose();
            }}
            placeholder="Search Apps"
            className="flex-1 bg-transparent text-[15px] text-white/90 outline-none placeholder:text-white/30"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0 px-4 pt-2 border-b border-white/8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 pb-2.5 text-[12px] font-medium transition-colors relative"
              style={{
                color: activeTab === tab ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
              }}
            >
              {tab}
              {activeTab === tab && (
                <span
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                  style={{ background: '#0A6DFF' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* App grid */}
        <div
          ref={scrollRef}
          className="overflow-y-auto overscroll-contain px-4 py-4"
          style={{ maxHeight: 'calc(80vh - 110px)' }}
        >
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {filtered.map((app, i) => (
              <button
                key={`${app.id}-${i}`}
                className="flex flex-col items-center gap-1.5 py-2 rounded-xl hover:bg-white/8 transition-colors duration-150"
                onClick={() => handleAppClick(app.id)}
              >
                <div
                  className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center shadow-lg"
                  style={{
                    background: app.color,
                    boxShadow: `0 3px 10px ${app.color}44`,
                  }}
                >
                  <AppIcon type={app.icon} />
                </div>
                <span
                  className="text-[10px] leading-tight text-center max-w-[68px] truncate w-full"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                  {app.name}
                </span>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-white/30">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-3">
                <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="2" />
                <line x1="27" y1="27" x2="36" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[13px]">No results found</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   App Icon renderer — simple SVG for each app type
   ═══════════════════════════════════════════════════════════════ */

function AppIcon({ type }: { type: AppDef['icon'] }) {
  const s = 28; // icon size
  const c = '#fff'; // icon color (white on colored bg)
  const co = '0.9'; // fill opacity

  switch (type) {
    case 'finder':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="3" y="4" width="22" height="18" rx="2" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.15"/>
          <rect x="3" y="4" width="22" height="5" rx="2" fill={c} fillOpacity="0.3"/>
          <path d="M9 15h10M9 18h7" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8"/>
        </svg>
      );

    case 'settings':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="4" stroke={c} strokeWidth="1.5"/>
          <path d="M14 3v3M14 22v3M3 14h3M22 14h3M6.1 6.1l2.1 2.1M19.8 19.8l2.1 2.1M6.1 21.9l2.1-2.1M19.8 8.2l2.1-2.1" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );

    case 'appstore':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M14 3l3 7h7l-5.5 4.5 2 7L14 17l-6.5 4.5 2-7L4 10h7l3-7z" fill={c} fillOpacity={co}/>
        </svg>
      );

    case 'games':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M6 14h3v3H6zM19 11h3v3h-3zM19 14h1.5v1.5H19z" fill={c} fillOpacity={co}/>
          <path d="M6 18c-1.5 0-3-1-3-3s1-3 3-3h16c1.5 0 3 1 3 3s-1 3-3 3H6z" stroke={c} strokeWidth="1.3" fill="none"/>
        </svg>
      );

    case 'voicememos':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="10" y="3" width="8" height="16" rx="4" stroke={c} strokeWidth="1.3"/>
          <path d="M7 15a7 7 0 0014 0" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M14 22v3" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      );

    case 'activity':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M3 18l5-6 4 3 5-8 8 11" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 4h22v20H3z" stroke={c} strokeWidth="1" strokeOpacity="0.3"/>
        </svg>
      );

    case 'terminal':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M6 9l4 4-4 4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 17h9" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );

    case 'diskutility':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="4" y="6" width="20" height="16" rx="2" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.1"/>
          <circle cx="14" cy="14" r="4" stroke={c} strokeWidth="1.2"/>
          <circle cx="14" cy="14" r="1" fill={c} fillOpacity="0.6"/>
        </svg>
      );

    case 'calculator':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="6" y="4" width="16" height="20" rx="2" stroke={c} strokeWidth="1.3"/>
          <rect x="8" y="7" width="12" height="5" rx="1" fill={c} fillOpacity="0.2"/>
          <circle cx="10" cy="16" r="1.2" fill={c} fillOpacity="0.6"/>
          <circle cx="14" cy="16" r="1.2" fill={c} fillOpacity="0.6"/>
          <circle cx="18" cy="16" r="1.2" fill={c} fillOpacity="0.6"/>
          <circle cx="10" cy="20" r="1.2" fill={c} fillOpacity="0.6"/>
          <circle cx="14" cy="20" r="1.2" fill={c} fillOpacity="0.6"/>
          <circle cx="18" cy="20" r="1.2" fill={c} fillOpacity="0.6"/>
        </svg>
      );

    case 'clock':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" stroke={c} strokeWidth="1.3"/>
          <path d="M14 8v6l4 3" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case 'safari':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" stroke={c} strokeWidth="1.3"/>
          <path d="M14 4a10 10 0 0110 10" stroke={c} strokeWidth="1.5" strokeOpacity="0.5"/>
          <polygon points="10,18 18,10 16,18" fill={c} fillOpacity="0.8"/>
          <polygon points="18,10 10,18 12,10" fill={c} fillOpacity="0.4"/>
        </svg>
      );

    case 'stocks':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M3 20l6-8 4 3 6-10 6 6" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 11h4v4h-4z" fill={c} fillOpacity="0.3"/>
        </svg>
      );

    case 'notes':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M7 4h14a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z" stroke={c} strokeWidth="1.2" fill={c} fillOpacity="0.1"/>
          <path d="M9 9h10M9 13h10M9 17h6" stroke={c} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
        </svg>
      );

    case 'reminders':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M7 4h14a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z" stroke={c} strokeWidth="1.2" fill={c} fillOpacity="0.1"/>
          <path d="M10 11l2.5 2.5L18 8" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 18h8" stroke={c} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4"/>
        </svg>
      );

    case 'calendar':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="5" y="5" width="18" height="18" rx="2" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.1"/>
          <path d="M5 10h18" stroke={c} strokeWidth="1.2"/>
          <path d="M10 3v4M18 3v4" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
          <text x="11" y="20" fill={c} fontSize="9" fontWeight="700" fontFamily="Inter">{new Date().getDate()}</text>
        </svg>
      );

    case 'contacts':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="11" r="4" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.15"/>
          <path d="M6 24c0-4.5 3.5-8 8-8s8 3.5 8 8" stroke={c} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
        </svg>
      );

    case 'textedit':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M7 4h14a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z" stroke={c} strokeWidth="1.2" fill={c} fillOpacity="0.1"/>
          <path d="M9 9h10M9 13h7" stroke={c} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
          <path d="M9 17l2 2 3-4" stroke={c} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4"/>
        </svg>
      );

    case 'stickies':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="5" y="4" width="18" height="20" rx="1" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="1" strokeOpacity="0.6"/>
          <path d="M9 10h10M9 14h8M9 18h6" stroke={c} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4"/>
        </svg>
      );

    case 'mail':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="4" y="7" width="20" height="14" rx="2" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.15"/>
          <path d="M4 10l10 6 10-6" stroke={c} strokeWidth="1.3" strokeLinejoin="round"/>
        </svg>
      );

    case 'messages':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M4 8a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-4l-4 4-4-4H6a2 2 0 01-2-2V8z" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.15"/>
          <circle cx="10" cy="13" r="1.2" fill={c} fillOpacity="0.7"/>
          <circle cx="14" cy="13" r="1.2" fill={c} fillOpacity="0.7"/>
          <circle cx="18" cy="13" r="1.2" fill={c} fillOpacity="0.7"/>
        </svg>
      );

    case 'facetime':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="4" y="8" width="12" height="12" rx="2" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.15"/>
          <path d="M16 11l7-4v14l-7-4v-6z" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.1"/>
        </svg>
      );

    case 'phone':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="8" y="3" width="12" height="22" rx="3" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.15"/>
          <path d="M13 21h2" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );

    case 'freeform':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="4" y="4" width="20" height="20" rx="2" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.1" strokeDasharray="3 2"/>
          <circle cx="10" cy="10" r="3" stroke={c} strokeWidth="1.2" fill={c} fillOpacity="0.2"/>
          <rect x="15" y="14" width="6" height="4" rx="1" fill={c} fillOpacity="0.3"/>
        </svg>
      );

    case 'photos':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="4" y="5" width="20" height="18" rx="2" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.1"/>
          <circle cx="11" cy="12" r="2.5" stroke={c} strokeWidth="1" fill={c} fillOpacity="0.3"/>
          <path d="M4 19l5-5 4 3 5-6 6 8" stroke={c} strokeWidth="1.2" strokeLinejoin="round"/>
        </svg>
      );

    case 'photobooth':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="7" y="5" width="14" height="18" rx="3" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.1"/>
          <circle cx="14" cy="13" r="4" stroke={c} strokeWidth="1.2" fill={c} fillOpacity="0.15"/>
          <circle cx="14" cy="13" r="1.5" fill={c} fillOpacity="0.5"/>
          <path d="M11 20h6" stroke={c} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4"/>
        </svg>
      );

    case 'weather':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <circle cx="12" cy="12" r="5" fill={c} fillOpacity="0.8"/>
          <path d="M12 5v2M12 17v2M5 12h2M17 12h2M7.76 7.76l1.41 1.41M14.83 14.83l1.41 1.41M7.76 16.24l1.41-1.41M14.83 9.17l1.41-1.41" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M18 22h-8a4 4 0 01-.3-7.98A5.5 5.5 0 0118.5 14h.5a3 3 0 010 6h-.5z" fill={c} fillOpacity="0.4" stroke={c} strokeWidth="0.8" strokeOpacity="0.3"/>
        </svg>
      );

    case 'maps':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M14 3C10.13 3 7 6.13 7 10c0 6 7 14 7 14s7-8 7-14c0-3.87-3.13-7-7-7z" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.15"/>
          <circle cx="14" cy="10" r="2.5" stroke={c} strokeWidth="1.2" fill={c} fillOpacity="0.3"/>
        </svg>
      );

    case 'news':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="5" y="4" width="18" height="20" rx="2" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.1"/>
          <path d="M5 9h18M5 14h18M5 19h12" stroke={c} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4"/>
          <rect x="8" y="11" width="4" height="1" rx="0.5" fill={c} fillOpacity="0.5"/>
        </svg>
      );

    case 'music':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M10 22V8l10-3v14" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8" cy="22" r="3" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.15"/>
          <circle cx="18" cy="19" r="3" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.15"/>
        </svg>
      );

    case 'podcasts':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="20" r="3" fill={c} fillOpacity="0.8"/>
          <path d="M8 16a8 8 0 0112 0" stroke={c} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
          <path d="M5 12a13 13 0 0118 0" stroke={c} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
        </svg>
      );

    case 'tv':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="4" y="7" width="20" height="13" rx="2" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.1"/>
          <path d="M10 23h8M14 20v3" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      );

    case 'quicktime':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.1"/>
          <polygon points="12,10 12,18 19,14" fill={c} fillOpacity="0.8"/>
        </svg>
      );

    case 'books':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M4 6c3-1 6 0 10 1 4-1 7-2 10-1v16c-3-1-6 0-10 1-4-1-7-2-10-1V6z" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.1"/>
          <path d="M14 7v16" stroke={c} strokeWidth="1.2" strokeOpacity="0.5"/>
        </svg>
      );

    case 'preview':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="4" y="4" width="20" height="20" rx="2" stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.1"/>
          <path d="M8 20l4-6 3 4 3-5 4 7" stroke={c} strokeWidth="1.2" strokeLinejoin="round" fill={c} fillOpacity="0.15"/>
          <circle cx="10" cy="11" r="2" stroke={c} strokeWidth="1" fill={c} fillOpacity="0.2"/>
        </svg>
      );

    case 'home':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M4 13l10-8 10 8" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 12v11h14V12" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill={c} fillOpacity="0.1"/>
          <rect x="11" y="16" width="6" height="7" stroke={c} strokeWidth="1" fill={c} fillOpacity="0.15"/>
        </svg>
      );

    case 'translate':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M8 5h12M14 5v18" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M9 9h6M9 13h5" stroke={c} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
          <path d="M17 14l4 5-4 4" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case 'fontbook':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <text x="7" y="21" fill={c} fontSize="20" fontWeight="700" fontFamily="serif" fillOpacity="0.9">A</text>
        </svg>
      );

    default:
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="4" y="4" width="20" height="20" rx="4" stroke={c} strokeWidth="1.3"/>
          <path d="M9 14h10M14 9v10" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
  }
}