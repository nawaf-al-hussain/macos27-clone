'use client';

import { useState, useEffect, useRef } from 'react';

interface MenuBarProps {
  activeApp: string;
  onSpotlight: () => void;
  onControlCenter: () => void;
  onNotifications: () => void;
}

export default function MenuBar({ activeApp, onSpotlight, onControlCenter, onNotifications }: MenuBarProps) {
  const [time, setTime] = useState(new Date());
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const [showAppMenu, setShowAppMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowAppleMenu(false);
        setShowAppMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const timeStr = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const menuItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  const fileMenuItems = ['New Finder Window', 'New Folder', 'Open', 'Open With', 'Close Window', '---', 'Get Info', '---', 'Move to Trash'];
  const editMenuItems = ['Undo', 'Redo', '---', 'Cut', 'Copy', 'Paste', 'Select All'];
  const viewMenuItems = ['as Icons', 'as List', 'as Columns', 'as Gallery', '---', 'Show Toolbar', 'Show Sidebar', 'Show Path Bar'];
  const goMenuItems = ['Back', 'Forward', '---', 'Recents', 'Applications', 'Desktop', 'Documents', 'Downloads'];
  const windowMenuItems = ['Minimize', 'Zoom', '---', 'Bring All to Front'];
  const helpMenuItems = ['macOS Help', 'Search'];

  const menuMap: Record<string, string[]> = {
    File: fileMenuItems,
    Edit: editMenuItems,
    View: viewMenuItems,
    Go: goMenuItems,
    Window: windowMenuItems,
    Help: helpMenuItems,
  };

  return (
    <div
      className="absolute top-0 left-0 right-0 z-[500] h-[28px] flex items-center px-2 text-[13px] font-normal"
      style={{
        background: 'rgba(30, 30, 30, 0.65)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
      ref={menuRef}
    >
      {/* Apple Logo */}
      <button
        className="px-2 py-0.5 rounded hover:bg-white/10 text-white/90"
        onClick={() => { setShowAppleMenu(!showAppleMenu); setShowAppMenu(null); }}
      >
        <svg width="14" height="17" viewBox="0 0 14 17" fill="white" fillOpacity="0.9">
          <path d="M13.1 12.6c-.3.7-.7 1.3-1.1 1.8-.6.8-1.1 1.3-1.5 1.6-.6.5-1.3.7-2 .7-.5 0-1.1-.1-1.8-.4-.7-.3-1.3-.4-1.9-.4s-1.2.1-1.9.4C2.2 16.6 1.7 16.7 1.2 16.7c-.7 0-1.3-.3-2-.8C-.4 15.5-.8 15-1.4 14.1c-.6-.9-1.1-2-1.5-3.2-.4-1.3-.6-2.5-.6-3.7 0-1.4.3-2.5.9-3.4.5-.7 1.1-1.3 1.9-1.7.8-.4 1.7-.6 2.6-.6.5 0 1.2.2 2 .5.8.3 1.3.5 1.5.5.2 0 .7-.2 1.6-.6.9-.3 1.6-.5 2.2-.4 1.6.1 2.8.8 3.6 2-1.4.9-2.1 2.1-2.1 3.7 0 1.2.5 2.3 1.3 3.1.4.4.8.7 1.3.9-.1.3-.2.6-.4.9zM9.5.4C9.5 1.5 9.1 2.5 8.3 3.4 7.3 4.5 6.1 5.2 4.8 5c0-.1 0-.3 0-.4 0-1 .4-2 1.2-2.8.4-.4.9-.8 1.5-1 .6-.3 1.2-.4 1.7-.4.1.1.2.1.3 0z" transform="translate(1.5, 0.5)"/>
        </svg>
      </button>

      {showAppleMenu && (
        <div className="absolute top-[26px] left-[2px] context-menu z-[600] min-w-[200px]">
          {['About This Mac', '---', 'System Settings...', 'App Store...', '---', 'Recent Items', '---', 'Force Quit...', '---', 'Sleep', 'Restart...', 'Shut Down...', '---', 'Lock Screen'].map((item, i) =>
            item === '---' ? <div key={i} className="h-px bg-white/10 my-1 mx-1" /> :
            <div key={i} className="context-menu-item">{item}</div>
          )}
        </div>
      )}

      {/* Active App Name */}
      <span className="px-2 py-0.5 font-semibold text-white/90">{activeApp}</span>

      {/* Menu Items */}
      {menuItems.map((item) => (
        <div key={item} className="relative">
          <button
            className="px-2 py-0.5 rounded hover:bg-white/10 text-white/80"
            onClick={() => { setShowAppMenu(showAppMenu === item ? null : item); setShowAppleMenu(false); }}
          >
            {item}
          </button>
          {showAppMenu === item && (
            <div className="absolute top-[26px] left-0 context-menu z-[600] min-w-[200px]">
              {(menuMap[item] || []).map((mi, i) =>
                mi === '---' ? <div key={i} className="h-px bg-white/10 my-1 mx-1" /> :
                <div key={i} className="context-menu-item">{mi}</div>
              )}
            </div>
          )}
        </div>
      ))}

      <div className="flex-1" />

      {/* Right side items */}
      <div className="flex items-center gap-1 text-white/80">
        {/* Battery */}
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" className="text-white/80">
            <rect x="0.5" y="0.5" width="15" height="9" rx="2" stroke="currentColor" strokeOpacity="0.5"/>
            <rect x="16" y="3" width="2" height="4" rx="0.5" fill="currentColor" fillOpacity="0.4"/>
            <rect x="2" y="2" width="11" height="6" rx="1" fill="currentColor" fillOpacity="0.8"/>
          </svg>
        </div>

        {/* Wi-Fi */}
        <div className="px-1.5 py-0.5 rounded hover:bg-white/10">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" fillOpacity="0.8">
            <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" transform="translate(0,-2)"/>
            <path d="M4.5 8.5a5 5 0 017 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" transform="translate(0,-1)"/>
            <path d="M1.5 5.5a9 9 0 0113 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Spotlight */}
        <button className="px-1.5 py-0.5 rounded hover:bg-white/10" onClick={onSpotlight}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="6" cy="6" r="4.5"/>
            <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Control Center */}
        <button className="px-1.5 py-0.5 rounded hover:bg-white/10" onClick={onControlCenter}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" fillOpacity="0.8">
            <rect x="1" y="1" width="5" height="5" rx="1.5"/>
            <rect x="8" y="1" width="5" height="5" rx="1.5"/>
            <rect x="1" y="8" width="5" height="5" rx="1.5"/>
            <rect x="8" y="8" width="5" height="5" rx="1.5"/>
          </svg>
        </button>

        {/* Notifications */}
        <button className="px-1.5 py-0.5 rounded hover:bg-white/10" onClick={onNotifications}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" fillOpacity="0.8">
            <path d="M7 1a4 4 0 00-4 4v3l-1 2h10l-1-2V5a4 4 0 00-4-4z"/>
            <path d="M5.5 11a1.5 1.5 0 003 0"/>
          </svg>
        </button>

        {/* Clock */}
        <div className="px-2 py-0.5 rounded hover:bg-white/10 text-white/90">
          {dateStr} {timeStr}
        </div>
      </div>
    </div>
  );
}