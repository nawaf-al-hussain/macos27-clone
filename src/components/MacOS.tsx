'use client';

import { useState, useCallback, useEffect } from 'react';
import BootScreen from '@/components/BootScreen';
import LockScreen from '@/components/LockScreen';
import MenuBar from '@/components/MenuBar';
import Dock from '@/components/Dock';
import DesktopWidgets from '@/components/DesktopWidgets';
import Window from '@/components/Window';
import ControlCenter from '@/components/ControlCenter';
import Notifications from '@/components/Notifications';
import Spotlight from '@/components/Spotlight';
import Launchpad from '@/components/Launchpad';
import { useWindowManager, type WindowState } from '@/hooks/useWindowManager';

import Finder from '@/apps/Finder';
import Safari from '@/apps/Safari';
import Messages from '@/apps/Messages';
import Mail from '@/apps/Mail';
import Maps from '@/apps/Maps';
import Photos from '@/apps/Photos';
import FaceTime from '@/apps/FaceTime';
import Phone from '@/apps/Phone';
import Calendar from '@/apps/Calendar';
import Contacts from '@/apps/Contacts';
import Reminders from '@/apps/Reminders';
import Notes from '@/apps/Notes';
import Freeform from '@/apps/Freeform';
import Music from '@/apps/Music';
import Podcasts from '@/apps/Podcasts';
import TV from '@/apps/TV';
import News from '@/apps/News';
import Games from '@/apps/Games';
import AppStore from '@/apps/AppStore';
import SystemSettings from '@/apps/SystemSettings';
import Downloads from '@/apps/Downloads';

type Phase = 'boot' | 'lock' | 'desktop';

const APP_NAMES: Record<string, string> = {
  finder: 'Finder',
  safari: 'Safari',
  messages: 'Messages',
  mail: 'Mail',
  maps: 'Maps',
  photos: 'Photos',
  facetime: 'FaceTime',
  phone: 'Phone',
  calendar: 'Calendar',
  contacts: 'Contacts',
  reminders: 'Reminders',
  notes: 'Notes',
  freeform: 'Freeform',
  music: 'Music',
  podcasts: 'Podcasts',
  tv: 'TV',
  news: 'News',
  games: 'Games',
  appstore: 'App Store',
  settings: 'System Settings',
  downloads: 'Downloads',
};

function AppContent({ appId }: { appId: string }) {
  switch (appId) {
    case 'finder': return <Finder />;
    case 'safari': return <Safari />;
    case 'messages': return <Messages />;
    case 'mail': return <Mail />;
    case 'maps': return <Maps />;
    case 'photos': return <Photos />;
    case 'facetime': return <FaceTime />;
    case 'phone': return <Phone />;
    case 'calendar': return <Calendar />;
    case 'contacts': return <Contacts />;
    case 'reminders': return <Reminders />;
    case 'notes': return <Notes />;
    case 'freeform': return <Freeform />;
    case 'music': return <Music />;
    case 'podcasts': return <Podcasts />;
    case 'tv': return <TV />;
    case 'news': return <News />;
    case 'games': return <Games />;
    case 'appstore': return <AppStore />;
    case 'settings': return <SystemSettings />;
    case 'downloads': return <Downloads />;
    default: return (
      <div className="flex items-center justify-center h-full text-white/40 text-[14px]">
        App not implemented
      </div>
    );
  }
}

export default function MacOS() {
  const [phase, setPhase] = useState<Phase>('boot');
  const [unlocking, setUnlocking] = useState(false);
  const [desktopVisible, setDesktopVisible] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [nightShift, setNightShift] = useState(false);

  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    isAppOpen,
  } = useWindowManager();

  const activeApp = windows.find(w => w.id === activeWindowId)?.appId || 'Finder';

  const handleBootDone = useCallback(() => {
    setPhase('lock');
  }, []);

  const handleUnlock = useCallback(() => {
    setUnlocking(true);
    setTimeout(() => {
      setPhase('desktop');
      setUnlocking(false);
      setDesktopVisible(true);
      // Open Finder by default
      openWindow('finder', 'Finder');
    }, 700);
  }, [openWindow]);

  const handleOpenApp = useCallback((appId: string) => {
    openWindow(appId, APP_NAMES[appId] || appId);
  }, [openWindow]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== 'desktop') return;
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        setShowSpotlight(prev => !prev);
      }
      if (e.key === 'Escape') {
        if (showSpotlight) setShowSpotlight(false);
        if (showControlCenter) setShowControlCenter(false);
        if (showNotifications) setShowNotifications(false);
        if (showLaunchpad) setShowLaunchpad(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, showSpotlight, showControlCenter, showNotifications, showLaunchpad]);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#000' }}>
      {/* SVG Filter for Liquid Glass - hidden but available */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="lg-refraction">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" />
            <feGaussianBlur stdDeviation="2.2" />
            <feDisplacementMap in="SourceGraphic" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Wallpaper (always rendered underneath) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/wallpaper-tahoe-day.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 'var(--z-desktop)',
        }}
      />

      {/* Boot Screen */}
      {phase === 'boot' && (
        <BootScreen onDone={handleBootDone} />
      )}

      {/* Lock Screen */}
      {phase === 'lock' && (
        <LockScreen onUnlock={handleUnlock} unlocking={unlocking} />
      )}

      {/* Desktop (fade in on transition) */}
      {phase === 'desktop' && (
        <div
          style={{
            opacity: desktopVisible ? 1 : 0,
            transition: 'opacity 400ms var(--ease-ios)',
          }}
        >
          {/* Desktop Widgets */}
          <DesktopWidgets />

          {/* Desktop Icons (top-right area) */}
          <div className="absolute top-[40px] right-4 flex flex-col items-end gap-2" style={{ zIndex: 'var(--z-desktop)' }}>
            <button className="flex flex-col items-center gap-0.5 w-[72px] group" onDoubleClick={() => openWindow('finder', 'Tahoe Trip')}>
              <div className="w-[52px] h-[44px] flex items-end justify-center pb-0.5">
                <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
                  <path d="M4 4h28v28H4z" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                  <path d="M8 4V2a2 2 0 012-2h20v4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
                  <path d="M4 12h28" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
                </svg>
              </div>
              <span className="text-[11px] text-white/90 text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Tahoe Trip</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 w-[72px] group">
              <div className="w-[52px] h-[44px] flex items-end justify-center pb-0.5">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="2" y="2" width="36" height="36" rx="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                  <rect x="6" y="6" width="28" height="4" rx="1" fill="rgba(255,255,255,0.3)"/>
                  <rect x="6" y="13" width="20" height="2" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                  <rect x="6" y="18" width="22" height="2" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                  <rect x="6" y="23" width="16" height="2" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                  <rect x="28" y="28" width="6" height="6" rx="1" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
                </svg>
              </div>
              <span className="text-[11px] text-white/90 text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Welcome.txt</span>
            </button>
          </div>

          {/* Menu Bar */}
          <MenuBar
            activeApp={APP_NAMES[activeApp] || 'Finder'}
            onSpotlight={() => { setShowSpotlight(true); setShowControlCenter(false); setShowNotifications(false); }}
            onControlCenter={() => { setShowControlCenter(prev => !prev); setShowNotifications(false); setShowSpotlight(false); }}
            onNotifications={() => { setShowNotifications(prev => !prev); setShowControlCenter(false); setShowSpotlight(false); }}
          />

          {/* Windows */}
          {windows.map((win: WindowState) => (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              x={win.x}
              y={win.y}
              width={win.width}
              height={win.height}
              zIndex={win.zIndex}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              isClosing={win.isClosing}
              isActive={win.id === activeWindowId}
              onFocus={() => focusWindow(win.id)}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximize={() => maximizeWindow(win.id)}
              onMove={(x, y) => updateWindowPosition(win.id, x, y)}
              onResize={(w, h) => updateWindowSize(win.id, w, h)}
            >
              <AppContent appId={win.appId} />
            </Window>
          ))}

          {/* Dock */}
          <Dock
            onOpenApp={handleOpenApp}
            isAppOpen={isAppOpen}
            onLaunchpad={() => { setShowLaunchpad(prev => !prev); setShowSpotlight(false); setShowControlCenter(false); setShowNotifications(false); }}
          />

          {/* Launchpad Overlay */}
          {showLaunchpad && (
            <Launchpad
              onOpenApp={handleOpenApp}
              onClose={() => setShowLaunchpad(false)}
            />
          )}

          {/* Brightness overlay */}
          {brightness < 100 && (
            <div
              className="fixed inset-0 pointer-events-none"
              style={{
                zIndex: 9999,
                background: `rgba(0,0,0,${(100 - brightness) / 100})`,
              }}
            />
          )}

          {/* Night Shift overlay */}
          {nightShift && (
            <div
              className="fixed inset-0 pointer-events-none mix-blend-multiply"
              style={{
                zIndex: 9998,
                background: 'rgba(255, 147, 41, 0.15)',
              }}
            />
          )}

          {/* Control Center */}
          {showControlCenter && (
            <ControlCenter
              onClose={() => setShowControlCenter(false)}
              onBrightnessChange={setBrightness}
              onNightShiftChange={setNightShift}
            />
          )}

          {/* Notifications */}
          {showNotifications && (
            <Notifications onClose={() => setShowNotifications(false)} />
          )}

          {/* Spotlight */}
          {showSpotlight && (
            <Spotlight
              onClose={() => setShowSpotlight(false)}
              onOpenApp={handleOpenApp}
            />
          )}
        </div>
      )}
    </div>
  );
}