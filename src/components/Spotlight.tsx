'use client';

import { useState, useEffect, useRef } from 'react';

interface SpotlightProps {
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}

const SEARCHABLE_APPS = [
  { id: 'finder', name: 'Finder', icon: '⌘' },
  { id: 'safari', name: 'Safari', icon: '🧭' },
  { id: 'messages', name: 'Messages', icon: '💬' },
  { id: 'mail', name: 'Mail', icon: '✉' },
  { id: 'maps', name: 'Maps', icon: '🗺' },
  { id: 'photos', name: 'Photos', icon: '🌸' },
  { id: 'facetime', name: 'FaceTime', icon: '📹' },
  { id: 'calendar', name: 'Calendar', icon: '📅' },
  { id: 'contacts', name: 'Contacts', icon: '👤' },
  { id: 'reminders', name: 'Reminders', icon: '📋' },
  { id: 'notes', name: 'Notes', icon: '📝' },
  { id: 'music', name: 'Music', icon: '♫' },
  { id: 'settings', name: 'System Settings', icon: '⚙' },
  { id: 'appstore', name: 'App Store', icon: '🅰' },
  { id: 'downloads', name: 'Downloads', icon: '⬇' },
];

export default function Spotlight({ onClose, onOpenApp }: SpotlightProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = query
    ? SEARCHABLE_APPS.filter(a => a.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="fixed inset-0 z-[700] flex items-start justify-center pt-[20%]" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative w-[560px] rounded-xl overflow-hidden spotlight-enter"
        style={{
          background: 'rgba(40, 40, 40, 0.8)',
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 20px 80px rgba(0,0,0,0.6)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 gap-3">
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
            <circle cx="6" cy="6" r="4.5"/>
            <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'Enter' && filtered.length > 0) {
                onOpenApp(filtered[0].id);
                onClose();
              }
            }}
            placeholder="Spotlight Search"
            className="flex-1 bg-transparent text-[18px] text-white/90 outline-none placeholder:text-white/30"
          />
        </div>

        {/* Results */}
        {filtered.length > 0 && (
          <div className="border-t border-white/10 max-h-[300px] overflow-y-auto">
            <div className="p-1">
              {filtered.map(app => (
                <button
                  key={app.id}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
                  onClick={() => { onOpenApp(app.id); onClose(); }}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">
                    {app.icon}
                  </div>
                  <div>
                    <div className="text-[14px] text-white/90">{app.name}</div>
                    <div className="text-[11px] text-white/40">Application</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {!query && (
          <div className="border-t border-white/10 p-4 text-center text-[13px] text-white/30">
            Type to search apps
          </div>
        )}
      </div>
    </div>
  );
}