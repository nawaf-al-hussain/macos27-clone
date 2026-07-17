'use client';

import { useState, useRef, useCallback, useMemo } from 'react';

interface DockItem {
  id: string;
  name: string;
  color: string;
  letter: string;
}

const DOCK_ITEMS: DockItem[] = [
  { id: 'finder', name: 'Finder', color: '#1e90ff', letter: '⌘' },
  { id: 'safari', name: 'Safari', color: '#0078d4', letter: '🧭' },
  { id: 'messages', name: 'Messages', color: '#34c759', letter: '💬' },
  { id: 'mail', name: 'Mail', color: '#007aff', letter: '✉' },
  { id: 'maps', name: 'Maps', color: '#34c759', letter: '🗺' },
  { id: 'photos', name: 'Photos', color: '#ff2d55', letter: '🌸' },
  { id: 'facetime', name: 'FaceTime', color: '#34c759', letter: '📹' },
  { id: 'phone', name: 'Phone', color: '#34c759', letter: '📞' },
  { id: 'calendar', name: 'Calendar', color: '#ff3b30', letter: '📅' },
  { id: 'contacts', name: 'Contacts', color: '#5856d6', letter: '👤' },
  { id: 'reminders', name: 'Reminders', color: '#007aff', letter: '📋' },
  { id: 'notes', name: 'Notes', color: '#ffcc00', letter: '📝' },
  { id: 'freeform', name: 'Freeform', color: '#ff9500', letter: '🎨' },
  { id: 'music', name: 'Music', color: '#ff2d55', letter: '♫' },
  { id: 'podcasts', name: 'Podcasts', color: '#9b59b6', letter: '🎙' },
  { id: 'tv', name: 'TV', color: '#000000', letter: '📺' },
  { id: 'news', name: 'News', color: '#ff3b30', letter: '📰' },
  { id: 'games', name: 'Games', color: '#5856d6', letter: '🎮' },
  { id: 'appstore', name: 'App Store', color: '#007aff', letter: '🅰' },
  { id: 'settings', name: 'System Settings', color: '#6e6e73', letter: '⚙' },
  { id: 'downloads', name: 'Downloads', color: '#6e6e73', letter: '⬇' },
];

interface DockProps {
  onOpenApp: (appId: string) => void;
  isAppOpen: (appId: string) => boolean;
}

export default function Dock({ onOpenApp, isAppOpen }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef(0);

  const getIconSize = useCallback((index: number) => {
    if (hoveredIndex === null) return 48;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 72;
    if (distance === 1) return 58;
    if (distance === 2) return 52;
    return 48;
  }, [hoveredIndex]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    const icons = dockRef.current.querySelectorAll('[data-dock-item]');
    let closest = -1;
    let closestDist = Infinity;
    icons.forEach((icon, i) => {
      const iconRect = icon.getBoundingClientRect();
      const center = iconRect.left + iconRect.width / 2;
      const dist = Math.abs(e.clientX - center);
      if (dist < closestDist && dist < 100) {
        closestDist = dist;
        closest = i;
      }
    });
    setHoveredIndex(closest >= 0 ? closest : null);
    mousePos.current = e.clientX;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setShowTooltip(null);
  }, []);

  const tooltipStyle = useMemo(() => {
    if (!showTooltip) return {};
    return {
      position: 'absolute' as const,
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: '8px',
    };
  }, [showTooltip]);

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2" style={{ zIndex: 'var(--z-dock)' }}>
      <div
        ref={dockRef}
        className="flex items-end gap-[2px] px-2 pb-1 pt-1 rounded-[18px]"
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 0 0 0.5px rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.4)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {DOCK_ITEMS.map((item, index) => {
          const size = getIconSize(index);
          const open = isAppOpen(item.id);
          return (
            <div
              key={item.id}
              data-dock-item
              className="relative flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setShowTooltip(item.name)}
              onMouseLeave={() => setShowTooltip(null)}
              onClick={() => onOpenApp(item.id)}
            >
              {showTooltip === item.name && (
                <div
                  className="absolute text-[12px] text-white px-2.5 py-1 rounded-md whitespace-nowrap z-50 pointer-events-none"
                  style={{
                    bottom: '100%',
                    marginBottom: '6px',
                    background: 'rgba(40,40,40,0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                  }}
                >
                  {item.name}
                </div>
              )}
              <div
                className="rounded-[12px] flex items-center justify-center transition-transform duration-150 ease-out shadow-lg"
                style={{
                  width: size,
                  height: size,
                  background: item.id === 'tv' ? 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' :
                    item.color === '#6e6e73' ? 'linear-gradient(135deg, #6e6e73, #8e8e93)' :
                    `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                  fontSize: size * 0.42,
                  lineHeight: 1,
                }}
              >
                {item.letter}
              </div>
              {/* Open indicator dot */}
              {open && (
                <div
                  className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-white/60"
                />
              )}
            </div>
          );
        })}

        {/* Separator */}
        <div className="w-px h-10 bg-white/20 mx-1 self-center" />

        {/* Trash */}
        <div
          data-dock-item
          className="relative flex flex-col items-center cursor-pointer"
          onMouseEnter={() => setShowTooltip('Trash')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          {showTooltip === 'Trash' && (
            <div
              className="absolute text-[12px] text-white px-2.5 py-1 rounded-md whitespace-nowrap z-50 pointer-events-none"
              style={{
                bottom: '100%',
                marginBottom: '6px',
                background: 'rgba(40,40,40,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Trash
            </div>
          )}
          <div
            className="rounded-[12px] flex items-center justify-center transition-transform duration-150 ease-out shadow-lg"
            style={{
              width: getIconSize(DOCK_ITEMS.length),
              height: getIconSize(DOCK_ITEMS.length),
              background: 'linear-gradient(135deg, #6e6e73, #8e8e93)',
              fontSize: getIconSize(DOCK_ITEMS.length) * 0.42,
            }}
          >
            🗑
          </div>
        </div>
      </div>
    </div>
  );
}