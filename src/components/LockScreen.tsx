'use client';

import { useState, useEffect } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="absolute inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-700"
      style={{
        background: 'url(/images/wallpaper-tahoe-day.jpg) center/cover no-repeat',
        filter: 'blur(0px) brightness(0.95)',
      }}
      onClick={onUnlock}
    >
      <div className="text-center" style={{ filter: 'blur(0px)' }}>
        <div className="text-[80px] font-light text-white leading-none tracking-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
          {displayHours}:{minutes}
        </div>
        <div className="text-[22px] font-light text-white/80 mt-1 tracking-wide" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}>
          {ampm}
        </div>
        <div className="text-[18px] font-normal text-white/70 mt-4" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
          {dateStr}
        </div>

        {/* User avatar */}
        <div className="mt-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-medium shadow-lg">
            J
          </div>
          <div className="mt-3 text-[15px] font-medium text-white/90">John Appleseed</div>
          <div className="mt-4 text-[13px] text-white/50">Click to log in</div>
        </div>
      </div>
    </div>
  );
}