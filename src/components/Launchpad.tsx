'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Smile, LayoutGrid, Compass, MessagesSquare, Mail as MailIcon, Map,
  Flower2, Video, Phone, ContactRound, ListChecks, NotebookPen,
  Spline, Music, Podcast as PodcastIcon, Tv, Newspaper, Gamepad2,
  Store, Settings, FolderDown, Terminal as TerminalIcon, Calculator,
  Clock, Image as ImageIcon,
} from 'lucide-react';
import { sounds, haptic } from '@/lib/sounds';

/* ─────────────── App Data ─────────────── */

interface AppEntry {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  from: string;
  to: string;
  glyphColor?: string;
}

const ALL_APPS: AppEntry[] = [
  { id: 'finder', name: 'Finder', category: 'Essentials', icon: Smile, from: 'rgb(94,201,248)', to: 'rgb(20,99,232)' },
  { id: 'safari', name: 'Safari', category: 'Essentials', icon: Compass, from: 'rgb(94,224,248)', to: 'rgb(26,108,240)' },
  { id: 'messages', name: 'Messages', category: 'Essentials', icon: MessagesSquare, from: 'rgb(123,248,123)', to: 'rgb(15,209,48)' },
  { id: 'mail', name: 'Mail', category: 'Essentials', icon: MailIcon, from: 'rgb(94,201,248)', to: 'rgb(20,99,232)' },
  { id: 'maps', name: 'Maps', category: 'Essentials', icon: Map, from: 'rgb(143,227,136)', to: 'rgb(47,168,79)' },
  { id: 'photos', name: 'Photos', category: 'Essentials', icon: Flower2, from: 'rgb(255,255,255)', to: 'rgb(229,229,234)', glyphColor: '#333' },
  { id: 'facetime', name: 'FaceTime', category: 'Essentials', icon: Video, from: 'rgb(123,248,123)', to: 'rgb(15,209,48)' },
  { id: 'phone', name: 'Phone', category: 'Essentials', icon: Phone, from: 'rgb(123,248,123)', to: 'rgb(15,209,48)' },
  { id: 'calendar', name: 'Calendar', category: 'Productivity', icon: Clock, from: 'rgb(255,59,48)', to: 'rgb(255,69,58)' },
  { id: 'contacts', name: 'Contacts', category: 'Productivity', icon: ContactRound, from: 'rgb(165,152,140)', to: 'rgb(110,98,89)' },
  { id: 'reminders', name: 'Reminders', category: 'Productivity', icon: ListChecks, from: 'rgb(255,159,107)', to: 'rgb(247,79,158)' },
  { id: 'notes', name: 'Notes', category: 'Productivity', icon: NotebookPen, from: 'rgb(255,229,122)', to: 'rgb(255,198,0)' },
  { id: 'freeform', name: 'Freeform', category: 'Productivity', icon: Spline, from: 'rgb(255,255,255)', to: 'rgb(232,232,237)', glyphColor: '#5E5CE6' },
  { id: 'music', name: 'Music', category: 'Media', icon: Music, from: 'rgb(252,92,125)', to: 'rgb(250,45,85)' },
  { id: 'podcasts', name: 'Podcasts', category: 'Media', icon: PodcastIcon, from: 'rgb(177,80,226)', to: 'rgb(125,42,232)' },
  { id: 'tv', name: 'TV', category: 'Media', icon: Tv, from: 'rgb(58,58,60)', to: 'rgb(0,0,0)' },
  { id: 'news', name: 'News', category: 'Media', icon: Newspaper, from: 'rgb(255,107,107)', to: 'rgb(250,45,85)' },
  { id: 'games', name: 'Games', category: 'Entertainment', icon: Gamepad2, from: 'rgb(255,159,10)', to: 'rgb(247,79,158)' },
  { id: 'appstore', name: 'App Store', category: 'Entertainment', icon: Store, from: 'rgb(50,173,230)', to: 'rgb(10,92,255)' },
  { id: 'settings', name: 'System Settings', category: 'Utilities', icon: Settings, from: 'rgb(142,142,147)', to: 'rgb(72,72,74)' },
];

const SUGGESTED_APPS = ['safari', 'messages', 'mail', 'notes', 'music', 'settings'];
const CATEGORIES = ['All', 'Essentials', 'Productivity', 'Media', 'Entertainment', 'Utilities'];

/* ─────────────── Launchpad Icon ─────────────── */

function LaunchpadIcon({ app, size = 64 }: { app: AppEntry; size?: number }) {
  const iconSize = Math.round(size * 0.52);
  const Glyph = app.icon;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.2237,
        background: `linear-gradient(135deg, ${app.from}, ${app.to})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25), inset 0 0 0 0.5px rgba(255,255,255,0.2)',
        overflow: 'hidden',
        transition: 'transform 200ms var(--ease-ios)',
      }}
      className="group-hover:scale-105"
    >
      <Glyph size={iconSize} color={app.glyphColor || 'white'} strokeWidth={1.6} />
    </div>
  );
}

/* ─────────────── Launchpad Component ─────────────── */

interface LaunchpadProps {
  onOpenApp: (appId: string) => void;
  onClose: () => void;
}

export default function Launchpad({ onOpenApp, onClose }: LaunchpadProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus search on mount
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  const filteredApps = useMemo(() => {
    let apps = ALL_APPS;
    if (activeCategory !== 'All') {
      apps = apps.filter(a => a.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      apps = apps.filter(a => a.name.toLowerCase().includes(q));
    }
    return apps;
  }, [search, activeCategory]);

  const suggestedApps = useMemo(() => {
    if (search.trim() || activeCategory !== 'All') return [];
    return ALL_APPS.filter(a => SUGGESTED_APPS.includes(a.id));
  }, [search, activeCategory]);

  const handleOpen = useCallback((appId: string) => {
    sounds.tick();
    haptic();
    onOpenApp(appId);
    onClose();
  }, [onOpenApp, onClose]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center"
      style={{
        zIndex: 'var(--z-appswitcher)',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
      }}
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center w-full max-w-[720px] px-6 pt-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div
          className="w-full max-w-[340px] mb-8"
          style={{ animation: 'spotlightIn 200ms var(--ease-ios) forwards' }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-white/90 text-[13px] w-full placeholder:text-white/30"
            />
          </div>
        </div>

        {/* Category Pills */}
        {!search.trim() && (
          <div
            className="flex gap-1.5 mb-6 flex-wrap justify-center"
            style={{ animation: 'slideUp 250ms var(--ease-ios) forwards' }}
          >
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { sounds.tick(); haptic(); setActiveCategory(cat); }}
                className="px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-default"
                style={{
                  background: activeCategory === cat ? 'rgba(10,109,255,0.7)' : 'rgba(255,255,255,0.08)',
                  color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.7)',
                  border: activeCategory === cat ? '0.5px solid rgba(10,109,255,0.5)' : '0.5px solid rgba(255,255,255,0.08)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Suggested Apps */}
        {suggestedApps.length > 0 && (
          <div className="w-full mb-6" style={{ animation: 'slideUp 300ms var(--ease-ios) forwards' }}>
            <div className="text-[11px] text-white/40 font-medium uppercase tracking-wider mb-3 px-1">
              Suggested
            </div>
            <div className="flex gap-5 justify-start px-1 overflow-x-auto pb-1">
              {suggestedApps.map(app => (
                <button
                  key={app.id}
                  className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
                  onClick={() => handleOpen(app.id)}
                >
                  <LaunchpadIcon app={app} size={56} />
                  <span className="text-[10px] text-white/70 group-hover:text-white transition-colors text-center max-w-[64px] truncate">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* App Grid */}
        <div
          className="grid gap-x-8 gap-y-5 justify-center"
          style={{
            gridTemplateColumns: 'repeat(7, auto)',
            animation: 'launchpadIn 300ms var(--ease-ios) forwards',
          }}
        >
          {filteredApps.map(app => (
            <button
              key={app.id}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
              onClick={() => handleOpen(app.id)}
            >
              <LaunchpadIcon app={app} size={64} />
              <span className="text-[10px] text-white/70 group-hover:text-white transition-colors text-center max-w-[72px] truncate">
                {app.name}
              </span>
            </button>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-white/30 text-[13px] mt-12">No apps found</div>
        )}
      </div>
    </div>
  );
}