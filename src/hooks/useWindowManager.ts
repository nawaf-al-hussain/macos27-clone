'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isClosing: boolean;
}

const DEFAULT_POSITIONS: Record<string, { x: number; y: number; w: number; h: number }> = {
  finder: { x: 80, y: 60, w: 820, h: 520 },
  safari: { x: 120, y: 50, w: 900, h: 600 },
  messages: { x: 140, y: 70, w: 750, h: 500 },
  mail: { x: 100, y: 80, w: 850, h: 520 },
  maps: { x: 160, y: 40, w: 800, h: 560 },
  photos: { x: 90, y: 50, w: 880, h: 560 },
  facetime: { x: 200, y: 80, w: 640, h: 480 },
  phone: { x: 220, y: 90, w: 360, h: 600 },
  calendar: { x: 100, y: 40, w: 780, h: 560 },
  contacts: { x: 180, y: 60, w: 620, h: 480 },
  reminders: { x: 160, y: 70, w: 500, h: 440 },
  notes: { x: 200, y: 80, w: 680, h: 480 },
  freeform: { x: 60, y: 30, w: 1000, h: 640 },
  music: { x: 140, y: 60, w: 820, h: 520 },
  podcasts: { x: 160, y: 70, w: 750, h: 500 },
  tv: { x: 120, y: 40, w: 880, h: 560 },
  news: { x: 150, y: 50, w: 800, h: 560 },
  games: { x: 180, y: 60, w: 720, h: 500 },
  appstore: { x: 100, y: 40, w: 860, h: 580 },
  settings: { x: 180, y: 50, w: 780, h: 520 },
  downloads: { x: 200, y: 90, w: 680, h: 440 },
};

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const zIndexCounter = useRef(100);

  const openWindow = useCallback((appId: string, title: string) => {
    const existing = windows.find(w => w.appId === appId && !w.isClosing);
    if (existing) {
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w =>
          w.id === existing.id ? { ...w, isMinimized: false, zIndex: ++zIndexCounter.current } : w
        ));
      } else {
        setWindows(prev => prev.map(w =>
          w.id === existing.id ? { ...w, zIndex: ++zIndexCounter.current } : w
        ));
      }
      setActiveWindowId(existing.id);
      return;
    }

    const id = `${appId}-${Date.now()}`;
    const pos = DEFAULT_POSITIONS[appId] || { x: 100 + Math.random() * 100, y: 50 + Math.random() * 80, w: 700, h: 480 };

    const newWindow: WindowState = {
      id,
      appId,
      title,
      x: pos.x,
      y: pos.y,
      width: pos.w,
      height: pos.h,
      minWidth: 400,
      minHeight: 300,
      zIndex: ++zIndexCounter.current,
      isMinimized: false,
      isMaximized: false,
      isClosing: false,
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(id);
  }, [windows]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isClosing: true } : w
    ));
    setTimeout(() => {
      setWindows(prev => prev.filter(w => w.id !== id));
      setActiveWindowId(prev => prev === id ? null : prev);
    }, 300);
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMinimized: true } : w
    ));
    setActiveWindowId(prev => prev === id ? null : prev);
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMaximized: !w.isMaximized, zIndex: ++zIndexCounter.current } : w
    ));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, zIndex: ++zIndexCounter.current, isMinimized: false } : w
    ));
    setActiveWindowId(id);
  }, []);

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, x, y } : w
    ));
  }, []);

  const updateWindowSize = useCallback((id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, width, height } : w
    ));
  }, []);

  const isAppOpen = useCallback((appId: string) => {
    return windows.some(w => w.appId === appId && !w.isClosing);
  }, [windows]);

  return {
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
  };
}