'use client';

import { useState, useEffect } from 'react';

/* ─────────────── Calendar Widget ─────────────── */
function CalendarWidget() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      className="glass-banner col-span-2 overflow-hidden cursor-default text-left"
      style={{
        padding: 12,
        height: 160,
        animation: 'widgetIn 350ms var(--ease-ios) forwards',
      }}
    >
      <div className="flex h-full gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold" style={{ color: '#FF3B30' }}>
            {monthLabel}
          </div>
          <div className="grid grid-cols-7 gap-0 mt-1 text-center">
            {dayLabels.map((d, i) => (
              <div key={i} className="text-[8px] font-semibold" style={{ color: 'rgba(0,0,0,0.35)' }}>
                {d}
              </div>
            ))}
            {cells.map((day, i) => (
              <div
                key={i}
                className="text-[9px] leading-[16px] relative"
                style={{ color: day ? 'rgba(0,0,0,0.75)' : 'transparent' }}
              >
                {day}
                {day === today && (
                  <span
                    className="absolute inset-0 flex items-center justify-center rounded-full"
                    style={{
                      background: '#FF3B30',
                      color: '#fff',
                      fontWeight: 600,
                    }}
                  >
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Weather Widget ─────────────── */
function WeatherWidget() {
  return (
    <div
      className="glass-banner overflow-hidden cursor-default"
      style={{
        padding: 12,
        height: 140,
        animation: 'widgetIn 350ms var(--ease-ios) forwards',
        animationDelay: '50ms',
        opacity: 0,
      }}
    >
      <div className="flex flex-col h-full">
        <div
          className="text-[13px] font-semibold flex items-center gap-1"
          style={{ color: 'rgba(0,0,0,0.75)' }}
        >
          Cupertino
        </div>
        <div className="flex items-center gap-2 mt-1">
          {/* Partly cloudy icon */}
          <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
            <circle cx="10" cy="10" r="5" fill="#FFD60A" />
            <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.05 5.05l1.41 1.41M13.54 13.54l1.41 1.41M5.05 14.95l1.41-1.41M13.54 6.46l1.41-1.41" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17 18H8a4 4 0 01-.4-7.98A5.5 5.5 0 0117.5 10c.18 0 .35.01.53.03A3.5 3.5 0 0117 18z" fill="#B0B0B8" />
          </svg>
          <span className="text-[30px] font-light leading-none" style={{ color: 'rgba(0,0,0,0.85)' }}>
            68°
          </span>
        </div>
        <div className="mt-auto text-[11px]" style={{ color: 'rgba(0,0,0,0.5)' }}>
          Partly Cloudy
        </div>
        <div className="text-[11px]" style={{ color: 'rgba(0,0,0,0.5)' }}>
          H:74°  L:55°
        </div>
      </div>
    </div>
  );
}

/* ─────────────── World Clock Widget ─────────────── */
function WorldClockWidget() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const sfTime = now.toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const tokyoTime = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div
      className="glass-banner overflow-hidden cursor-default"
      style={{
        padding: 12,
        height: 140,
        animation: 'widgetIn 350ms var(--ease-ios) forwards',
        animationDelay: '100ms',
        opacity: 0,
      }}
    >
      <div className="text-[11px] font-semibold mb-2" style={{ color: 'rgba(0,0,0,0.4)' }}>
        World Clock
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[11px]" style={{ color: 'rgba(0,0,0,0.55)' }}>Cupertino</span>
          <span className="text-[13px] font-medium" style={{ color: 'rgba(0,0,0,0.85)' }}>{sfTime}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[11px]" style={{ color: 'rgba(0,0,0,0.55)' }}>Tokyo</span>
          <span className="text-[13px] font-medium" style={{ color: 'rgba(0,0,0,0.85)' }}>{tokyoTime}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Battery Widget ─────────────── */
function BatteryWidget() {
  const level = 85;

  return (
    <div
      className="glass-banner overflow-hidden cursor-default"
      style={{
        padding: 12,
        height: 140,
        animation: 'widgetIn 350ms var(--ease-ios) forwards',
        animationDelay: '150ms',
        opacity: 0,
      }}
    >
      <div className="text-[11px] font-semibold mb-2" style={{ color: 'rgba(0,0,0,0.4)' }}>
        Battery
      </div>
      <div className="flex items-center gap-3">
        <svg width={28} height={14} viewBox="0 0 28 14" fill="none">
          <rect x="0.5" y="0.5" width="24" height="13" rx="3" stroke="rgba(0,0,0,0.4)" />
          <rect x="25" y="4" width="2.5" height="6" rx="1" fill="rgba(0,0,0,0.25)" />
          <rect x="2" y="2.5" width={(level / 100) * 21} height="9" rx="2" fill="#34c759" />
        </svg>
        <div>
          <div className="text-[20px] font-light leading-none" style={{ color: 'rgba(0,0,0,0.85)' }}>
            {level}%
          </div>
        </div>
      </div>
      <div className="mt-2 text-[11px]" style={{ color: 'rgba(0,0,0,0.45)' }}>
        Power Adapter
      </div>
    </div>
  );
}

/* ─────────────── Desktop Widgets Container ─────────────── */
export default function DesktopWidgets() {
  return (
    <div
      className="absolute left-3 hidden lg:grid grid-cols-2 gap-3 w-[344px]"
      style={{ zIndex: 'var(--z-desktop)', top: 36 }}
    >
      <CalendarWidget />
      <WeatherWidget />
      <WorldClockWidget />
      <BatteryWidget />
    </div>
  );
}