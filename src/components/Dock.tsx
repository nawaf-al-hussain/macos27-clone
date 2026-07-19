'use client';

import { useState, useRef, useCallback, type ReactNode } from 'react';
import {
  Smile, LayoutGrid, Compass, MessagesSquare, Mail as MailIcon, Map,
  Flower2, Video, Phone, ContactRound, ListChecks, NotebookPen,
  Spline, Music, Podcast as PodcastIcon, Tv, Newspaper, Gamepad2,
  Store, Settings, FolderDown,
} from 'lucide-react';

/* ─────────────── Gradient Icon ─────────────── */

const ICON_SHADOW = '0 1px 3px rgba(0,0,0,0.18), inset 0 0 0 0.5px rgba(255,255,255,0.25)';

function GradientIcon({
  from,
  to,
  glyph: Glyph,
  glyphColor,
  size = 48,
}: {
  from: string;
  to: string;
  glyph: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  glyphColor?: string;
  size?: number;
}) {
  const iconSize = Math.round(size * 0.58);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.2237,
        background: `linear-gradient(135deg, ${from}, ${to})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: ICON_SHADOW,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <Glyph size={iconSize} color={glyphColor || 'white'} strokeWidth={1.8} />
    </div>
  );
}

/* ─────────────── Calendar Icon (special) ─────────────── */

function CalendarDockIcon({ size = 48 }: { size?: number }) {
  const today = new Date();
  const day = today.getDate();
  const days = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  const dayName = days[today.getDay()];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.2237,
        background: 'linear-gradient(135deg, #FFFFFF, #E5E5EA)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: ICON_SHADOW,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Red header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: '#FF3B30',
          borderRadius: `${size * 0.2237}px ${size * 0.2237}px 0 0`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: 'white', fontSize: size * 0.13, fontWeight: 600, letterSpacing: '0.5px' }}>
          {dayName}
        </span>
      </div>
      {/* Day number */}
      <span style={{ color: '#1d1d1f', fontSize: size * 0.36, fontWeight: 600, fontFamily: 'system-ui, -apple-system, sans-serif', marginTop: size * 0.12 }}>
        {day}
      </span>
    </div>
  );
}

/* ─────────────── Downloads Folder Icon ─────────────── */

function DownloadsFolderIcon({ size = 48 }: { size?: number }) {
  const iconSize = Math.round(size * 0.42);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.2237,
        background: 'linear-gradient(135deg, #8E8E93, #636366)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: ICON_SHADOW,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <FolderDown size={iconSize} color="white" strokeWidth={1.8} />
    </div>
  );
}

/* ─────────────── Trash Icon ─────────────── */

function TrashDockIcon({ size = 48 }: { size?: number }) {
  const iconSize = Math.round(size * 0.42);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.2237,
        background: 'linear-gradient(135deg, #8E8E93, #636366)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: ICON_SHADOW,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    </div>
  );
}

/* ─────────────── Icon Map ─────────────── */

const ICON_MAP: Record<string, (props: { size: number }) => ReactNode> = {
  finder: ({ size }) => <GradientIcon from="rgb(94,201,248)" to="rgb(20,99,232)" glyph={Smile} size={size} />,
  apps: ({ size }) => <GradientIcon from="rgb(142,142,147)" to="rgb(72,72,74)" glyph={LayoutGrid} size={size} />,
  safari: ({ size }) => <GradientIcon from="rgb(94,224,248)" to="rgb(26,108,240)" glyph={Compass} size={size} />,
  messages: ({ size }) => <GradientIcon from="rgb(123,248,123)" to="rgb(15,209,48)" glyph={MessagesSquare} size={size} />,
  mail: ({ size }) => <GradientIcon from="rgb(94,201,248)" to="rgb(20,99,232)" glyph={MailIcon} size={size} />,
  maps: ({ size }) => <GradientIcon from="rgb(143,227,136)" to="rgb(47,168,79)" glyph={Map} size={size} />,
  photos: ({ size }) => <GradientIcon from="rgb(255,255,255)" to="rgb(229,229,234)" glyph={Flower2} glyphColor="#333" size={size} />,
  facetime: ({ size }) => <GradientIcon from="rgb(123,248,123)" to="rgb(15,209,48)" glyph={Video} size={size} />,
  phone: ({ size }) => <GradientIcon from="rgb(123,248,123)" to="rgb(15,209,48)" glyph={Phone} size={size} />,
  calendar: ({ size }) => <CalendarDockIcon size={size} />,
  contacts: ({ size }) => <GradientIcon from="rgb(165,152,140)" to="rgb(110,98,89)" glyph={ContactRound} size={size} />,
  reminders: ({ size }) => <GradientIcon from="rgb(255,159,107)" to="rgb(247,79,158)" glyph={ListChecks} size={size} />,
  notes: ({ size }) => <GradientIcon from="rgb(255,229,122)" to="rgb(255,198,0)" glyph={NotebookPen} size={size} />,
  freeform: ({ size }) => <GradientIcon from="rgb(255,255,255)" to="rgb(232,232,237)" glyph={Spline} glyphColor="#5E5CE6" size={size} />,
  music: ({ size }) => <GradientIcon from="rgb(252,92,125)" to="rgb(250,45,85)" glyph={Music} size={size} />,
  podcasts: ({ size }) => <GradientIcon from="rgb(177,80,226)" to="rgb(125,42,232)" glyph={PodcastIcon} size={size} />,
  tv: ({ size }) => <GradientIcon from="rgb(58,58,60)" to="rgb(0,0,0)" glyph={Tv} size={size} />,
  news: ({ size }) => <GradientIcon from="rgb(255,107,107)" to="rgb(250,45,85)" glyph={Newspaper} size={size} />,
  games: ({ size }) => <GradientIcon from="rgb(255,159,10)" to="rgb(247,79,158)" glyph={Gamepad2} size={size} />,
  appstore: ({ size }) => <GradientIcon from="rgb(50,173,230)" to="rgb(10,92,255)" glyph={Store} size={size} />,
  settings: ({ size }) => <GradientIcon from="rgb(142,142,147)" to="rgb(72,72,74)" glyph={Settings} size={size} />,
  downloads: ({ size }) => <DownloadsFolderIcon size={size} />,
  trash: ({ size }) => <TrashDockIcon size={size} />,
};

/* ─────────────── Dock Item Type ─────────────── */

type DockItemType = 'app' | 'separator' | 'stack';

interface DockItemDef {
  id: string;
  name: string;
  type: DockItemType;
  badge?: number;
}

const DOCK_ITEMS: DockItemDef[] = [
  { id: 'finder', name: 'Finder', type: 'app' },
  { id: 'apps', name: 'Apps', type: 'app' },
  { id: 'safari', name: 'Safari', type: 'app' },
  { id: 'messages', name: 'Messages', type: 'app', badge: 2 },
  { id: 'mail', name: 'Mail', type: 'app', badge: 4 },
  { id: 'maps', name: 'Maps', type: 'app' },
  { id: 'photos', name: 'Photos', type: 'app' },
  { id: 'facetime', name: 'FaceTime', type: 'app' },
  { id: 'phone', name: 'Phone', type: 'app' },
  { id: 'calendar', name: 'Calendar', type: 'app' },
  { id: 'contacts', name: 'Contacts', type: 'app' },
  { id: 'reminders', name: 'Reminders', type: 'app', badge: 3 },
  { id: 'notes', name: 'Notes', type: 'app' },
  { id: 'freeform', name: 'Freeform', type: 'app' },
  { id: 'music', name: 'Music', type: 'app' },
  { id: 'podcasts', name: 'Podcasts', type: 'app' },
  { id: 'tv', name: 'TV', type: 'app' },
  { id: 'news', name: 'News', type: 'app' },
  { id: 'games', name: 'Games', type: 'app' },
  { id: 'appstore', name: 'App Store', type: 'app', badge: 4 },
  { id: 'settings', name: 'System Settings', type: 'app' },
  { id: '__sep1__', name: '', type: 'separator' },
  { id: 'downloads', name: 'Downloads', type: 'stack' },
  { id: '__sep2__', name: '', type: 'separator' },
  { id: 'trash', name: 'Trash', type: 'app' },
];

/* ─────────────── Dock Component ─────────────── */

interface DockProps {
  onOpenApp: (appId: string) => void;
  isAppOpen: (appId: string) => boolean;
  onLaunchpad?: () => void;
}

export default function Dock({ onOpenApp, isAppOpen, onLaunchpad }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [showDownloadsPopup, setShowDownloadsPopup] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  const getIconSize = useCallback((index: number) => {
    if (hoveredIndex === null) return 48;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 72;
    if (distance === 1) return 60;
    if (distance === 2) return 52;
    return 48;
  }, [hoveredIndex]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dockRef.current) return;
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
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setShowTooltip(null);
    setShowDownloadsPopup(false);
  }, []);

  const handleClick = useCallback((item: DockItemDef) => {
    if (item.id === 'apps' && onLaunchpad) {
      onLaunchpad();
      return;
    }
    if (item.type === 'stack') {
      setShowDownloadsPopup(prev => !prev);
      return;
    }
    onOpenApp(item.id);
  }, [onOpenApp, onLaunchpad]);

  // Build a mapping from DOCK_ITEMS index to a visual-only index (for magnification)
  let visualIndex = -1;
  const itemVisualIndex: number[] = [];
  for (const item of DOCK_ITEMS) {
    if (item.type !== 'separator') {
      visualIndex++;
    }
    itemVisualIndex.push(visualIndex);
  }

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2" style={{ zIndex: 'var(--z-dock)' }}>
      <div
        ref={dockRef}
        className="glass-dock lg-refract flex flex-row items-end rounded-[24px] p-[7px]"
        style={{ gap: '4px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {DOCK_ITEMS.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <div key={item.id} className="dock-separator" style={{ margin: '0 6px' }} />
            );
          }

          const vi = itemVisualIndex[index];
          const size = getIconSize(vi);
          const isOpen = item.type === 'app' && isAppOpen(item.id);
          const IconComponent = ICON_MAP[item.id];
          const isHovered = hoveredIndex !== null && vi === hoveredIndex;
          const isNearHovered = hoveredIndex !== null && Math.abs(vi - hoveredIndex) <= 2;

          return (
            <div
              key={item.id}
              data-dock-item
              className="relative flex flex-col items-center cursor-pointer"
              style={{
                width: size,
                height: size + 6,
                flexShrink: 0,
                zIndex: isHovered ? 20 : isNearHovered ? 10 : 1,
                transition: 'width 200ms cubic-bezier(0.32, 0.72, 0, 1), height 200ms cubic-bezier(0.32, 0.72, 0, 1)',
              }}
              onMouseEnter={() => setShowTooltip(item.name)}
              onMouseLeave={() => setShowTooltip(null)}
              onClick={() => handleClick(item)}
            >
              {/* Tooltip */}
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

              {/* Icon container */}
              <div
                className="w-full flex items-center justify-center overflow-hidden"
                style={{
                  width: size,
                  height: size,
                  transition: 'width 200ms cubic-bezier(0.32, 0.72, 0, 1), height 200ms cubic-bezier(0.32, 0.72, 0, 1)',
                }}
              >
                {IconComponent && <IconComponent size={size} />}
              </div>

              {/* Badge */}
              {item.badge !== undefined && item.badge > 0 && (
                <div className="dock-badge" style={{ fontSize: size < 52 ? 9 : 11, minWidth: size < 52 ? 15 : 18, height: size < 52 ? 15 : 18, top: size < 52 ? -3 : -4, right: size < 52 ? -3 : -4 }}>
                  {item.badge}
                </div>
              )}

              {/* Active indicator dot */}
              {isOpen && (
                <div className="dock-active-dot" style={{ bottom: 0 }} />
              )}

              {/* Downloads stack popup */}
              {item.id === 'downloads' && showDownloadsPopup && (
                <div
                  className="stack-popup absolute"
                  style={{
                    bottom: size + 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="px-2 py-1 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                    Downloads
                  </div>
                  <div className="stack-popup-item mt-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect width="20" height="20" rx="4" fill="#5856D6" />
                      <text x="10" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">ZIP</text>
                    </svg>
                    <span>macOS27-WallpaperPack.zip</span>
                  </div>
                  <div className="stack-popup-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect width="20" height="20" rx="4" fill="#FF3B30" />
                      <text x="10" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">PDF</text>
                    </svg>
                    <span>Flight Confirmation SFO.pdf</span>
                  </div>
                  <div className="stack-popup-item" style={{ justifyContent: 'center', color: '#0a6dff', fontWeight: 500 }}>
                    More...
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}