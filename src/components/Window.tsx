'use client';

import { useRef, useCallback, useState, useEffect, type ReactNode } from 'react';

interface WindowProps {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isClosing: boolean;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (w: number, h: number) => void;
  children: ReactNode;
  hideTrafficLights?: boolean;
  showSidebar?: boolean;
}

export default function Window({
  id, title, x, y, width, height, zIndex,
  isMinimized, isMaximized, isClosing, isActive,
  onFocus, onClose, onMinimize, onMaximize, onMove, onResize,
  children, hideTrafficLights, showSidebar = true,
}: WindowProps) {
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; origW: number; origH: number } | null>(null);
  const [showTrafficHover, setShowTrafficHover] = useState(false);
  const [preMaxBounds, setPreMaxBounds] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    onFocus();
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: x, origY: y };

    const handleDragMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;
      onMove(dragRef.current.origX + dx, Math.max(28, dragRef.current.origY + dy));
    };

    const handleDragEnd = () => {
      dragRef.current = null;
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  }, [x, y, isMaximized, onFocus, onMove]);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus();
    resizeRef.current = { startX: e.clientX, startY: e.clientY, origW: width, origH: height };

    const handleResizeMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return;
      const dx = ev.clientX - resizeRef.current.startX;
      const dy = ev.clientY - resizeRef.current.startY;
      onResize(Math.max(400, resizeRef.current.origW + dx), Math.max(300, resizeRef.current.origH + dy));
    };

    const handleResizeEnd = () => {
      resizeRef.current = null;
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  }, [width, height, isMaximized, onFocus, onResize]);

  const handleMaximize = useCallback(() => {
    if (isMaximized) {
      onMove(preMaxBounds.x, preMaxBounds.y);
      onResize(preMaxBounds.w, preMaxBounds.h);
    } else {
      setPreMaxBounds({ x, y, w: width, h: height });
      onMove(0, 28);
      onResize(window.innerWidth, window.innerHeight - 28 - 76);
    }
    onMaximize();
  }, [isMaximized, x, y, width, height, preMaxBounds, onMove, onResize, onMaximize]);

  if (isMinimized) return null;

  const style: React.CSSProperties = isMaximized
    ? { left: 0, top: 28, width: '100%', height: 'calc(100% - 28px - 76px)', zIndex }
    : { left: x, top: y, width, height, zIndex };

  return (
    <div
      className={`absolute flex flex-col rounded-xl overflow-hidden shadow-2xl transition-opacity duration-300 ${isClosing ? 'opacity-0 scale-95' : 'opacity-100'}`}
      style={{
        ...style,
        background: 'rgba(30, 30, 30, 0.8)',
        backdropFilter: 'blur(50px)',
        WebkitBackdropFilter: 'blur(50px)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: isActive
          ? '0 0 0 0.5px rgba(0,0,0,0.3), 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.15)'
          : '0 0 0 0.5px rgba(0,0,0,0.2), 0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex items-center h-[38px] px-3 shrink-0 cursor-default"
        style={{
          background: 'rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
        onMouseDown={handleDragStart}
        onDoubleClick={handleMaximize}
      >
        {/* Traffic Lights */}
        {!hideTrafficLights && (
          <div
            className="flex items-center gap-2 mr-3"
            onMouseEnter={() => setShowTrafficHover(true)}
            onMouseLeave={() => setShowTrafficHover(false)}
          >
            <button
              className="w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-bold leading-none transition-colors"
              style={{ background: '#ff5f57', color: 'rgba(0,0,0,0)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(80,0,0,0.8)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0)')}
              onClick={(e) => { e.stopPropagation(); onClose(); }}
            >
              {showTrafficHover && '✕'}
            </button>
            <button
              className="w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-bold leading-none transition-colors"
              style={{ background: '#febc2e', color: 'rgba(0,0,0,0)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(80,50,0,0.8)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0)')}
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            >
              {showTrafficHover && '−'}
            </button>
            <button
              className="w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-bold leading-none transition-colors"
              style={{ background: '#28c840', color: 'rgba(0,0,0,0)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(0,50,0,0.8)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0)')}
              onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            >
              {showTrafficHover && '⤢'}
            </button>
          </div>
        )}

        {/* Title */}
        <div className="flex-1 text-center text-[13px] font-medium text-white/70 select-none">
          {title}
        </div>

        {/* Spacer to balance traffic lights */}
        {!hideTrafficLights && <div className="w-[52px]" />}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex window-body">
        {children}
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10"
          onMouseDown={handleResizeStart}
        />
      )}
    </div>
  );
}