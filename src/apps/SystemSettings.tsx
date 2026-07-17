'use client';

import { useState } from 'react';

interface SettingCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface SettingItem {
  name: string;
  description?: string;
  type: 'toggle' | 'select' | 'slider' | 'info';
  value?: string | boolean | number;
  options?: string[];
}

const CATEGORIES: SettingCategory[] = [
  { id: 'general', name: 'General', icon: '⚙', color: '#6e6e73' },
  { id: 'appearance', name: 'Appearance', icon: '🎨', color: '#007aff' },
  { id: 'accessibility', name: 'Accessibility', icon: '♿', color: '#007aff' },
  { id: 'controlcenter', name: 'Control Center', icon: '🔲', color: '#6e6e73' },
  { id: 'desktop-dock', name: 'Desktop & Dock', icon: '🖥', color: '#5856d6' },
  { id: 'displays', name: 'Displays', icon: '🖥', color: '#007aff' },
  { id: 'wallpaper', name: 'Wallpaper', icon: '🏞', color: '#34c759' },
  { id: 'sound', name: 'Sound', icon: '🔊', color: '#ff375f' },
  { id: 'notifications', name: 'Notifications', icon: '🔔', color: '#ff3b30' },
  { id: 'focus', name: 'Focus', icon: '🌙', color: '#5856d6' },
  { id: 'screen-time', name: 'Screen Time', icon: '⏱', color: '#5856d6' },
  { id: 'battery', name: 'Battery', icon: '🔋', color: '#34c759' },
  { id: 'lock-screen', name: 'Lock Screen', icon: '🔒', color: '#6e6e73' },
  { id: 'touch-id', name: 'Touch ID & Password', icon: '👆', color: '#ff375f' },
  { id: 'users', name: 'Users & Groups', icon: '👥', color: '#5856d6' },
  { id: 'network', name: 'Network', icon: '🌐', color: '#007aff' },
  { id: 'bluetooth', name: 'Bluetooth', icon: '📶', color: '#007aff' },
  { id: 'wifi', name: 'Wi-Fi', icon: '📶', color: '#007aff' },
  { id: 'storage', name: 'Storage', icon: '💾', color: '#6e6e73' },
  { id: 'privacy', name: 'Privacy & Security', icon: '🔒', color: '#007aff' },
  { id: 'about', name: 'About', icon: 'ℹ', color: '#6e6e73' },
];

const SETTINGS_MAP: Record<string, SettingItem[]> = {
  general: [
    { name: 'About This Mac', type: 'info', description: 'macOS Tahoe Version 27.0' },
    { name: 'Software Update', type: 'info', description: 'macOS is up to date' },
    { name: 'Storage', type: 'info', description: '487.3 GB available of 1 TB' },
    { name: 'AirDrop & Handoff', type: 'toggle', value: true },
    { name: 'Login Items', type: 'info', description: '8 items' },
    { name: 'Language & Region', type: 'info', description: 'English (US)' },
    { name: 'Date & Time', type: 'info', description: 'Set automatically' },
  ],
  appearance: [
    { name: 'Appearance', type: 'select', value: 'Dark', options: ['Light', 'Dark', 'Auto'] },
    { name: 'Accent Color', type: 'select', value: 'Blue', options: ['Blue', 'Purple', 'Pink', 'Red', 'Orange', 'Yellow', 'Green', 'Graphite'] },
    { name: 'Sidebar Icon Size', type: 'select', value: 'Medium', options: ['Small', 'Medium', 'Large'] },
    { name: 'Allow wallpaper tinting', type: 'toggle', value: true },
  ],
  'desktop-dock': [
    { name: 'Dock Size', type: 'slider', value: 48 },
    { name: 'Magnification', type: 'toggle', value: true },
    { name: 'Position on screen', type: 'select', value: 'Bottom', options: ['Left', 'Bottom', 'Right'] },
    { name: 'Minimize windows using', type: 'select', value: 'Genie Effect', options: ['Genie Effect', 'Scale Effect'] },
    { name: 'Automatically hide and show the Dock', type: 'toggle', value: false },
  ],
  sound: [
    { name: 'Output Volume', type: 'slider', value: 75 },
    { name: 'Mute', type: 'toggle', value: false },
    { name: 'Alert Sound', type: 'select', value: 'Glass', options: ['Basso', 'Blow', 'Bottle', 'Frog', 'Funk', 'Glass', 'Hero', 'Morse', 'Ping', 'Pop', 'Purr', 'Sosumi', 'Submarine', 'Tink'] },
    { name: 'Play sound on startup', type: 'toggle', value: true },
  ],
  wallpaper: [
    { name: 'Current Wallpaper', type: 'info', description: 'Tahoe Day' },
    { name: 'Dynamic Wallpaper', type: 'toggle', value: true },
    { name: 'Change Wallpaper', type: 'info', description: 'Choose from built-in wallpapers' },
  ],
  network: [
    { name: 'Wi-Fi', type: 'toggle', value: true, description: 'Connected to Home' },
    { name: 'Network Name', type: 'info', description: 'Home-5G' },
    { name: 'IP Address', type: 'info', description: '192.168.1.42' },
    { name: 'Firewall', type: 'toggle', value: true },
  ],
  about: [
    { name: 'macOS', type: 'info', description: 'Tahoe Version 27.0 (Build 24A5328a)' },
    { name: 'Chip', type: 'info', description: 'Apple M5 Ultra' },
    { name: 'Memory', type: 'info', description: '192 GB' },
    { name: 'Serial Number', type: 'info', description: 'FVFXXXXXXXXXXX' },
    { name: 'macOS', type: 'info', description: 'Licensed to: John Appleseed' },
  ],
};

export default function SystemSettings() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [settings, setSettings] = useState<Record<string, Record<string, string | boolean | number>>>(() => {
    const initial: Record<string, Record<string, string | boolean | number>> = {};
    Object.entries(SETTINGS_MAP).forEach(([cat, items]) => {
      initial[cat] = {};
      items.forEach(item => {
        if (item.value !== undefined) {
          initial[cat][item.name] = item.value;
        }
      });
    });
    return initial;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const items = SETTINGS_MAP[selectedCategory] || [];

  const updateSetting = (name: string, value: string | boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [selectedCategory]: {
        ...(prev[selectedCategory] || {}),
        [name]: value,
      },
    }));
  };

  const filteredCategories = searchQuery
    ? CATEGORIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : CATEGORIES;

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-[220px] shrink-0 flex flex-col" style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Search */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/5">
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

        {/* Categories */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {filteredCategories.map(cat => {
            const categorySettings = settings[cat.id];
            const catItems = SETTINGS_MAP[cat.id];
            const hasBadge = catItems && catItems.some(item => {
              const val = categorySettings?.[item.name];
              return typeof val === 'boolean' && val;
            });

            return (
              <button
                key={cat.id}
                className={`w-full flex items-center gap-2.5 px-2 py-[6px] rounded-lg text-[13px] text-left transition-colors ${
                  selectedCategory === cat.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-[14px] shrink-0"
                  style={{ background: cat.color + '30' }}
                >
                  {cat.icon}
                </div>
                <span className="truncate">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-[22px] font-semibold text-white/90 mb-4">
          {CATEGORIES.find(c => c.id === selectedCategory)?.name}
        </h2>

        {items.length > 0 ? (
          <div className="space-y-1 max-w-[600px]">
            {items.map(item => {
              const currentValue = settings[selectedCategory]?.[item.name];
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <div className="flex-1 mr-4">
                    <div className="text-[14px] text-white/90">{item.name}</div>
                    {item.description && (
                      <div className="text-[12px] text-white/40 mt-0.5">{item.description}</div>
                    )}
                  </div>

                  {item.type === 'toggle' && (
                    <button
                      onClick={() => updateSetting(item.name, !currentValue)}
                      className={`w-[42px] h-[26px] rounded-full transition-colors relative ${
                        currentValue ? 'bg-green-500' : 'bg-white/20'
                      }`}
                    >
                      <div
                        className={`absolute top-[3px] w-[20px] h-[20px] rounded-full bg-white shadow transition-transform ${
                          currentValue ? 'translate-x-[19px]' : 'translate-x-[3px]'
                        }`}
                      />
                    </button>
                  )}

                  {item.type === 'select' && item.options && (
                    <select
                      value={currentValue as string}
                      onChange={e => updateSetting(item.name, e.target.value)}
                      className="bg-white/8 text-[13px] text-white/70 rounded-lg px-3 py-1.5 outline-none border border-white/10 cursor-pointer"
                    >
                      {item.options.map(opt => (
                        <option key={opt} value={opt} style={{ background: '#2a2a2a', color: '#fff' }}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {item.type === 'slider' && (
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={currentValue as number}
                        onChange={e => updateSetting(item.name, Number(e.target.value))}
                        className="w-32 music-progress"
                      />
                      <span className="text-[12px] text-white/50 w-8">{currentValue}</span>
                    </div>
                  )}

                  {item.type === 'info' && (
                    <span className="text-[13px] text-white/40">{item.description}</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-[14px] text-white/30 mt-8">
            Settings for this category are managed in System Preferences.
          </div>
        )}
      </div>
    </div>
  );
}