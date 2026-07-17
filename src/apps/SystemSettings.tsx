'use client';

import { useState } from 'react';

const ACCENT_COLORS = [
  { name: 'blue', color: '#007aff' },
  { name: 'purple', color: '#af52de' },
  { name: 'pink', color: '#ff2d55' },
  { name: 'red', color: '#ff3b30' },
  { name: 'orange', color: '#ff9500' },
  { name: 'yellow', color: '#ffcc00' },
  { name: 'green', color: '#34c759' },
  { name: 'graphite', color: '#8e8e93' },
];

const SETTINGS_ITEMS = [
  { id: 'apple-account', name: 'Apple Account', icon: '👤', color: '#007aff' },
  { id: 'wifi', name: 'Wi-Fi', icon: '📶', color: '#007aff' },
  { id: 'bluetooth', name: 'Bluetooth', icon: '🔵', color: '#007aff' },
  { id: 'network', name: 'Network', icon: '🌐', color: '#007aff' },
  { id: 'vpn', name: 'VPN', icon: '🔒', color: '#6e6e73' },
  { id: 'battery', name: 'Battery', icon: '🔋', color: '#34c759' },
  { id: 'general', name: 'General', icon: '⚙️', color: '#6e6e73' },
  { id: 'accessibility', name: 'Accessibility', icon: '♿', color: '#007aff' },
  { id: 'appearance', name: 'Appearance', icon: '🎨', color: '#007aff' },
  { id: 'menu-bar', name: 'Menu Bar', icon: '📊', color: '#6e6e73' },
  { id: 'apple-intelligence', name: 'Apple Intelligence & Siri', icon: '✨', color: '#af52de' },
  { id: 'desktop-dock', name: 'Desktop & Dock', icon: '🖥️', color: '#5856d6' },
  { id: 'displays', name: 'Displays', icon: '🖥️', color: '#007aff' },
  { id: 'wallpaper', name: 'Wallpaper', icon: '🏞️', color: '#34c759' },
  { id: 'screen-saver', name: 'Screen Saver', icon: '🖥️', color: '#0ea5e9' },
  { id: 'notifications', name: 'Notifications', icon: '🔔', color: '#ff3b30' },
  { id: 'focus', name: 'Focus', icon: '🌙', color: '#5856d6' },
  { id: 'sound', name: 'Sound', icon: '🔊', color: '#ff375f' },
  { id: 'keyboard', name: 'Keyboard', icon: '⌨️', color: '#6e6e73' },
  { id: 'trackpad', name: 'Trackpad', icon: '👆', color: '#6e6e73' },
  { id: 'mouse', name: 'Mouse', icon: '🖱️', color: '#6e6e73' },
  { id: 'privacy', name: 'Privacy & Security', icon: '🔒', color: '#007aff' },
  { id: 'users-groups', name: 'Users & Groups', icon: '👥', color: '#5856d6' },
  { id: 'time-machine', name: 'Time Machine', icon: '⏱️', color: '#34c759' },
];

export default function SystemSettings() {
  const [activeSetting, setActiveSetting] = useState('appearance');
  const [mode, setMode] = useState<'Light' | 'Dark' | 'Auto'>('Dark');
  const [selectedAccent, setSelectedAccent] = useState('blue');
  const [selectedHighlight, setSelectedHighlight] = useState('blue');
  const [iconStyle, setIconStyle] = useState<'Default' | 'Dark' | 'Tinted' | 'Clear'>('Default');
  const [sidebarSize, setSidebarSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[240px] shrink-0 flex flex-col"
        style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* User Card */}
        <div className="px-3 pt-3 pb-2">
          <button
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors ${
              activeSetting === 'apple-account-profile' ? 'bg-white/12' : 'hover:bg-white/6'
            }`}
            onClick={() => setActiveSetting('apple-account-profile')}
          >
            <div
              className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-[16px] font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #007aff 0%, #5ac8fa 100%)' }}
            >
              K
            </div>
            <div className="text-left min-w-0">
              <div className="text-[13px] font-medium text-white/85">kimi</div>
              <div className="text-[11px] text-white/40">Apple Account</div>
            </div>
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pb-2">
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-white/5">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[12px] text-white/80 outline-none placeholder:text-white/25"
            />
          </div>
        </div>

        {/* Settings list */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {SETTINGS_ITEMS.map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-2.5 px-2 py-[6px] rounded-lg text-[13px] text-left transition-colors mb-0.5 ${
                activeSetting === item.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
              }`}
              onClick={() => setActiveSetting(item.id)}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-[13px] shrink-0"
                style={{ background: item.color + '30' }}
              >
                {item.icon}
              </div>
              <span className="truncate">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navigation bar */}
        <div
          className="shrink-0 flex items-center gap-2 px-3 py-1.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button className="p-1 rounded hover:bg-white/10 text-white/25 cursor-not-allowed">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3L5 8l5 5"/></svg>
          </button>
          <button className="p-1 rounded hover:bg-white/10 text-white/25 cursor-not-allowed">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3l5 5-5 5"/></svg>
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-[12px] text-white/80 outline-none w-[120px] placeholder:text-white/25"
            />
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-[22px] font-semibold text-white/90 mb-5">Appearance</h2>

          <div className="space-y-5 max-w-[500px]">
            {/* Mode */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-[13px] font-medium text-white/70 mb-3">Mode</div>
              <div className="flex items-center bg-white/5 rounded-lg p-0.5 inline-flex">
                {(['Light', 'Dark', 'Auto'] as const).map(m => (
                  <button
                    key={m}
                    className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                      mode === m
                        ? 'bg-white/15 text-white shadow-sm'
                        : 'text-white/50 hover:text-white/70'
                    }`}
                    onClick={() => setMode(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-[13px] font-medium text-white/70 mb-3">ACCENT COLOR</div>
              <div className="flex items-center gap-2.5">
                {ACCENT_COLORS.map(c => (
                  <button
                    key={c.name}
                    className={`w-6 h-6 rounded-full transition-all flex items-center justify-center ${
                      selectedAccent === c.name ? 'ring-2 ring-offset-1 ring-offset-[#1e1e1e]' : 'hover:scale-110'
                    }`}
                    style={{
                      background: c.color,
                      ['--tw-ring-color' as string]: c.color,
                    } as React.CSSProperties}
                    onClick={() => setSelectedAccent(c.name)}
                  >
                    {selectedAccent === c.name && (
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="white">
                        <path d="M6 13L2 9l1.5-1.5L6 10l6.5-6.5L14 5z"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Highlight Color */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-[13px] font-medium text-white/70 mb-1">HIGHLIGHT COLOR</div>
              <div className="text-[11px] text-white/30 mb-3">Used for text selections</div>
              <div className="flex items-center gap-2.5">
                {ACCENT_COLORS.map(c => (
                  <button
                    key={c.name}
                    className={`w-6 h-6 rounded-full transition-all flex items-center justify-center ${
                      selectedHighlight === c.name ? 'ring-2 ring-offset-1 ring-offset-[#1e1e1e]' : 'hover:scale-110'
                    }`}
                    style={{
                      background: c.color,
                      ringColor: c.color,
                    }}
                    onClick={() => setSelectedHighlight(c.name)}
                  >
                    {selectedHighlight === c.name && (
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="white">
                        <path d="M6 13L2 9l1.5-1.5L6 10l6.5-6.5L14 5z"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon & Widget Style */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-[13px] font-medium text-white/70 mb-3">ICON & WIDGET STYLE</div>
              <div className="flex items-center bg-white/5 rounded-lg p-0.5 inline-flex">
                {(['Default', 'Dark', 'Tinted', 'Clear'] as const).map(s => (
                  <button
                    key={s}
                    className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                      iconStyle === s
                        ? 'bg-white/15 text-white shadow-sm'
                        : 'text-white/50 hover:text-white/70'
                    }`}
                    onClick={() => setIconStyle(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Icon Size */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-[13px] font-medium text-white/70 mb-3">SIDEBAR ICON SIZE</div>
              <div className="flex items-center gap-4">
                {(['Small', 'Medium', 'Large'] as const).map(s => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        sidebarSize === s ? 'border-blue-500' : 'border-white/20'
                      }`}
                      onClick={() => setSidebarSize(s)}
                    >
                      {sidebarSize === s && (
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <span className="text-[13px] text-white/70">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}