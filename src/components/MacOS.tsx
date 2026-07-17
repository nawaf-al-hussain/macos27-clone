'use client';

import { useState, useCallback, useEffect } from 'react';
import LockScreen from '@/components/LockScreen';
import MenuBar from '@/components/MenuBar';
import Dock from '@/components/Dock';
import Window from '@/components/Window';
import ControlCenter from '@/components/ControlCenter';
import Notifications from '@/components/Notifications';
import Spotlight from '@/components/Spotlight';
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
  const [isLocked, setIsLocked] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);

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

  const handleUnlock = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setIsLocked(false);
      setFadeOut(false);
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
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        setShowSpotlight(prev => !prev);
      }
      if (e.key === 'Escape') {
        if (showSpotlight) setShowSpotlight(false);
        if (showControlCenter) setShowControlCenter(false);
        if (showNotifications) setShowNotifications(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSpotlight, showControlCenter, showNotifications]);

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

      {/* Wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/wallpaper-tahoe-day.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Lock Screen */}
      {isLocked && (
        <div className={fadeOut ? 'lock-fade-out' : ''}>
          <LockScreen onUnlock={handleUnlock} />
        </div>
      )}

      {/* Desktop */}
      {!isLocked && (
        <>
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
          />

          {/* Control Center */}
          {showControlCenter && (
            <ControlCenter onClose={() => setShowControlCenter(false)} />
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
        </>
      )}
    </div>
  );
}