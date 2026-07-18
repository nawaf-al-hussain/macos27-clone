'use client';

import { useState, useEffect } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
  unlocking: boolean;
}

export default function LockScreen({ onUnlock, unlocking }: LockScreenProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, '0');

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="absolute inset-0 cursor-pointer select-none overflow-hidden"
      style={{
        zIndex: 'var(--z-lock)',
      }}
      onClick={unlocking ? undefined : onUnlock}
    >
      {/* Blurred wallpaper background - matches original exactly */}
      <div
        className="absolute inset-0 transition-all"
        style={{
          backgroundImage: 'url(/images/wallpaper-tahoe-day.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          transform: unlocking ? 'scale(1)' : 'scale(1.08)',
          filter: unlocking ? 'blur(0px) brightness(1)' : 'blur(40px) brightness(0.85)',
          transitionDuration: '600ms',
          transitionTimingFunction: 'var(--ease-ios)',
        }}
      />

      {/* Time + Date - top section */}
      <div
        className="absolute inset-0 flex flex-col items-center transition-all"
        style={{
          paddingTop: '18vh',
          opacity: unlocking ? 0 : 1,
          transform: unlocking ? 'translateY(-20px)' : 'translateY(0)',
          transitionDuration: '600ms',
          transitionTimingFunction: 'var(--ease-ios)',
        }}
      >
        {/* Date above time */}
        <div
          className="text-white text-[22px] font-semibold"
          style={{ textShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 6px' }}
        >
          {dateStr}
        </div>

        {/* Time - no AM/PM, ultralight weight */}
        <div
          className="text-white leading-none mt-1"
          style={{
            fontSize: 96,
            fontWeight: 275,
            fontVariantNumeric: 'tabular-nums',
            textShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 12px',
          }}
        >
          {hours}:{minutes}
        </div>
      </div>

      {/* User avatar + name + login prompt - bottom section */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center transition-all"
        style={{
          bottom: '12vh',
          opacity: unlocking ? 0 : 1,
          transitionDuration: '500ms',
        }}
      >
        {/* Avatar with inset white ring shadow */}
        <div
          className="w-24 h-24 rounded-full grid place-items-center"
          style={{
            background: 'linear-gradient(160deg, rgb(94, 179, 248), rgb(20, 99, 232))',
            boxShadow: 'rgba(255, 255, 255, 0.4) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.3) 0px 8px 24px',
          }}
        >
          <span className="text-white text-[40px] font-semibold">N</span>
        </div>
        <div
          className="mt-3 text-white text-[15px] font-semibold"
          style={{ textShadow: 'rgba(0, 0, 0, 0.4) 0px 1px 4px' }}
        >
          Nawaf
        </div>
        {/* Pulsing login prompt */}
        <div
          className="mt-1.5 text-white/70 text-[13px]"
          style={{ animation: 'pulseOpacity 2.4s ease-in-out 0s infinite normal none running' }}
        >
          Click to log in
        </div>
      </div>
    </div>
  );
}