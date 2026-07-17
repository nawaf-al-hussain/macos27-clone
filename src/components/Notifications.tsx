'use client';

import { useState, useEffect } from 'react';

interface NotificationsProps {
  onClose: () => void;
}

export default function Notifications({ onClose }: NotificationsProps) {
  const [expanded, setExpanded] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 z-[600]" onClick={onClose}>
      <div
        className="absolute top-[32px] right-0 w-[360px] h-[calc(100vh-32px)] notification-slide flex flex-col"
        style={{
          background: 'rgba(40, 40, 40, 0.78)',
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          borderLeft: '1px solid rgba(255,255,255,0.15)',
          borderBottom: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.4)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-3 pt-3 pb-3 space-y-3">
          {/* ── Notifications Section ── */}
          <div className="space-y-2">
            {/* Reminders notification */}
            <div
              className="rounded-xl p-3"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="flex items-start gap-2.5">
                {/* Reminders app icon */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: '#FF9500' }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 2h10a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" fill="white" fillOpacity="0.9"/>
                    <path d="M5 6h8M5 9h8M5 12h5" stroke="#FF9500" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-white/90">Reminders</span>
                    <span className="text-[10px] text-white/40">7m ago</span>
                  </div>
                  <div className="text-[13px] text-white/75 mt-0.5">Pick up dry cleaning</div>
                  <div className="text-[11px] text-white/45 mt-0.5">5:30 PM</div>
                  <button
                    className="mt-2 px-3 py-1 rounded-md text-[11px] font-medium transition-colors"
                    style={{
                      background: 'rgba(10, 109, 255, 0.7)',
                      color: '#fff',
                    }}
                  >
                    Complete
                  </button>
                </div>
              </div>
            </div>

            {/* 2 more button (when collapsed) */}
            {!expanded && (
              <button
                className="w-full py-1.5 rounded-lg text-[12px] text-white/50 hover:bg-white/8 transition-colors text-center"
                onClick={() => setExpanded(true)}
              >
                2 more
              </button>
            )}

            {/* Expanded notifications */}
            {expanded && (
              <div className="space-y-2">
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: '#007AFF' }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="3" width="14" height="12" rx="2" stroke="white" strokeWidth="1.2" fill="none"/>
                        <path d="M2 7h14" stroke="white" strokeWidth="1" strokeOpacity="0.6"/>
                        <rect x="4" y="9" width="3" height="2" rx="0.5" fill="white" fillOpacity="0.6"/>
                        <rect x="8" y="9" width="5" height="1" rx="0.5" fill="white" fillOpacity="0.4"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold text-white/90">Calendar</span>
                        <span className="text-[10px] text-white/40">32m ago</span>
                      </div>
                      <div className="text-[13px] text-white/75 mt-0.5">Sprint Planning</div>
                      <div className="text-[11px] text-white/45 mt-0.5">Starting in 30 minutes</div>
                    </div>
                  </div>
                </div>
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: '#34C759' }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3 4h12a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="white" strokeWidth="1.2"/>
                        <path d="M3 7l6 4 6-4" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold text-white/90">Mail</span>
                        <span className="text-[10px] text-white/40">1h ago</span>
                      </div>
                      <div className="text-[13px] text-white/75 mt-0.5">Apple Developer</div>
                      <div className="text-[11px] text-white/45 mt-0.5">WWDC 2025 Session videos available</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* ── Widgets Section ── */}
          <div className="space-y-3">

            {/* Calendar Widget */}
            <CalendarWidget now={now} />

            {/* Weather Widget */}
            <WeatherWidget />

            {/* Reminders Widget */}
            <RemindersWidget />

            {/* Stocks Widget */}
            <StocksWidget />

            {/* World Clock Widget */}
            <WorldClockWidget now={now} />

            {/* Screen Time Widget */}
            <ScreenTimeWidget />

            {/* Edit Widgets Button */}
            <button
              className="w-full py-2.5 rounded-xl text-[12px] font-medium text-white/50 hover:bg-white/8 transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Edit Widgets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ Calendar Widget ═══════════════ */

function CalendarWidget({ now }: { now: Date }) {
  const year = 2026;
  const month = 6; // July (0-indexed)
  const today = now.getDate() === 1 ? 1 : 2; // show a highlighted day

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = 'July 2026';

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  // Events for this widget
  const events = [
    { day: 3, label: 'Sprint planning', color: '#FF3B30' },
    { day: 7, label: 'Dentist', color: '#FF9500' },
  ];

  return (
    <div className="rounded-2xl p-3" style={{
      backdropFilter: 'blur(28px) saturate(170%)',
      WebkitBackdropFilter: 'blur(28px) saturate(170%)',
      background: 'rgba(248, 248, 250, 0.78)',
      boxShadow: '0 10px 32px rgba(0,0,0,0.15)',
    }}>
      <div className="text-[12px] font-semibold" style={{ color: '#FF3B30' }}>
        {monthLabel}
      </div>
      <div className="grid grid-cols-7 gap-0 mt-1.5 text-center">
        {dayLabels.map((d, i) => (
          <div key={i} className="text-[8px] font-semibold" style={{ color: 'rgba(0,0,0,0.35)' }}>
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          const ev = events.find(e => e.day === day);
          return (
            <div
              key={i}
              className="text-[9px] leading-[18px] relative"
              style={{ color: day ? 'rgba(0,0,0,0.75)' : 'transparent' }}
            >
              {day}
              {ev && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: ev.color }}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Event indicators */}
      <div className="mt-2 space-y-1">
        {events.map((ev, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ev.color }} />
            <span className="text-[9px] truncate" style={{ color: 'rgba(0,0,0,0.55)' }}>
              {ev.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ Weather Widget ═══════════════ */

function WeatherWidget() {
  return (
    <div className="rounded-2xl p-3" style={{
      backdropFilter: 'blur(28px) saturate(170%)',
      WebkitBackdropFilter: 'blur(28px) saturate(170%)',
      background: 'rgba(248, 248, 250, 0.78)',
      boxShadow: '0 10px 32px rgba(0,0,0,0.15)',
    }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[13px] font-semibold" style={{ color: 'rgba(0,0,0,0.75)' }}>
            Cupertino
          </div>
          <div className="text-[11px]" style={{ color: 'rgba(0,0,0,0.5)' }}>
            Partly Cloudy
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="10" r="4" fill="#FFD60A" />
            <path d="M9 4v2M9 14v2M3 10h2M13 10h2M4.76 4.76l1.41 1.41M11.83 11.83l1.41 1.41M4.76 15.24l1.41-1.41M11.83 8.17l1.41-1.41" stroke="#FFD60A" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M17 17H8.5a3.5 3.5 0 01-.3-6.98A4.5 4.5 0 0117.3 9.5c.17 0 .33.01.5.03A3 3 0 0117 17z" fill="#B0B0B8" />
          </svg>
          <span className="text-[24px] font-light leading-none" style={{ color: 'rgba(0,0,0,0.85)' }}>
            68°
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ Reminders Widget ═══════════════ */

function RemindersWidget() {
  const items = [
    { text: 'Send brand review feedback', done: false },
    { text: 'Pick up dry cleaning', done: false },
    { text: 'Call dentist to reschedule', done: true },
  ];

  return (
    <div className="rounded-2xl p-3" style={{
      backdropFilter: 'blur(28px) saturate(170%)',
      WebkitBackdropFilter: 'blur(28px) saturate(170%)',
      background: 'rgba(248, 248, 250, 0.78)',
      boxShadow: '0 10px 32px rgba(0,0,0,0.15)',
    }}>
      <div className="flex items-center gap-1.5 mb-2">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="#FF9500" strokeWidth="1.5" fill="none"/>
          <path d="M4 6l1.5 1.5L8 5" stroke="#FF9500" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[11px] font-semibold" style={{ color: 'rgba(0,0,0,0.5)' }}>Reminders</span>
      </div>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border shrink-0 flex items-center justify-center"
              style={{
                borderColor: item.done ? '#FF9500' : 'rgba(0,0,0,0.25)',
                background: item.done ? '#FF9500' : 'transparent',
              }}
            >
              {item.done && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M2 4l1.5 1.5L6 3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span
              className="text-[11px]"
              style={{
                color: item.done ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.75)',
                textDecoration: item.done ? 'line-through' : 'none',
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ Stocks Widget ═══════════════ */

function StocksWidget() {
  const stocks = [
    { symbol: 'AAPL', price: '229.86', change: '+1.23%', up: true },
    { symbol: 'MSFT', price: '448.22', change: '+0.67%', up: true },
    { symbol: 'NVDA', price: '131.44', change: '-0.89%', up: false },
  ];

  return (
    <div className="rounded-2xl p-3" style={{
      backdropFilter: 'blur(28px) saturate(170%)',
      WebkitBackdropFilter: 'blur(28px) saturate(170%)',
      background: 'rgba(248, 248, 250, 0.78)',
      boxShadow: '0 10px 32px rgba(0,0,0,0.15)',
    }}>
      <div className="flex items-center gap-1.5 mb-2">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 9l3-4 2 2 3-4 2 2" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[11px] font-semibold" style={{ color: 'rgba(0,0,0,0.5)' }}>Stocks</span>
      </div>
      <div className="space-y-2">
        {stocks.map((s, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-[12px] font-semibold" style={{ color: 'rgba(0,0,0,0.8)' }}>
              {s.symbol}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px]" style={{ color: 'rgba(0,0,0,0.6)' }}>
                {s.price}
              </span>
              <span
                className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                style={{
                  background: s.up ? 'rgba(52,199,89,0.15)' : 'rgba(255,59,48,0.15)',
                  color: s.up ? '#34C759' : '#FF3B30',
                }}
              >
                {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ World Clock Widget ═══════════════ */

function WorldClockWidget({ now }: { now: Date }) {
  const cupertino = now.toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const newYork = now.toLocaleTimeString('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const tokyo = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Tokyo',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const clocks = [
    { city: 'Cupertino', time: cupertino },
    { city: 'New York', time: newYork },
    { city: 'Tokyo', time: tokyo },
  ];

  return (
    <div className="rounded-2xl p-3" style={{
      backdropFilter: 'blur(28px) saturate(170%)',
      WebkitBackdropFilter: 'blur(28px) saturate(170%)',
      background: 'rgba(248, 248, 250, 0.78)',
      boxShadow: '0 10px 32px rgba(0,0,0,0.15)',
    }}>
      <div className="flex items-center gap-1.5 mb-2">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="rgba(0,0,0,0.5)" strokeWidth="1"/>
          <path d="M6 3.5v3l2 1" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" strokeLinecap="round"/>
        </svg>
        <span className="text-[11px] font-semibold" style={{ color: 'rgba(0,0,0,0.5)' }}>World Clock</span>
      </div>
      <div className="space-y-1.5">
        {clocks.map((c, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-[11px]" style={{ color: 'rgba(0,0,0,0.55)' }}>
              {c.city}
            </span>
            <span className="text-[13px] font-medium" style={{ color: 'rgba(0,0,0,0.85)' }}>
              {c.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ Screen Time Widget ═══════════════ */

function ScreenTimeWidget() {
  // Weekly bar chart data (Mon-Sun), taller = more usage
  const weeklyData = [65, 50, 70, 80, 45, 30, 20];
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const maxVal = Math.max(...weeklyData);

  return (
    <div className="rounded-2xl p-3" style={{
      backdropFilter: 'blur(28px) saturate(170%)',
      WebkitBackdropFilter: 'blur(28px) saturate(170%)',
      background: 'rgba(248, 248, 250, 0.78)',
      boxShadow: '0 10px 32px rgba(0,0,0,0.15)',
    }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10a1 1 0 01-1-1V3a1 1 0 011-1h8a1 1 0 011 1v6a1 1 0 01-1 1H2z" stroke="rgba(0,0,0,0.5)" strokeWidth="1" fill="none"/>
            <path d="M2 7h8" stroke="rgba(0,0,0,0.4)" strokeWidth="0.8"/>
            <circle cx="9" cy="4.5" r="0.8" fill="rgba(0,0,0,0.5)"/>
          </svg>
          <span className="text-[11px] font-semibold" style={{ color: 'rgba(0,0,0,0.5)' }}>Screen Time</span>
        </div>
        <span className="text-[11px]" style={{ color: 'rgba(0,0,0,0.45)' }}>today</span>
      </div>

      <div className="text-[20px] font-light leading-none" style={{ color: 'rgba(0,0,0,0.85)' }}>
        3h 42m
      </div>

      {/* Weekly bar chart */}
      <div className="flex items-end gap-[6px] mt-3 h-[40px]">
        {weeklyData.map((val, i) => {
          const height = (val / maxVal) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-sm"
                style={{
                  height: `${height}%`,
                  minHeight: 3,
                  background: i === 3
                    ? 'rgba(10, 109, 255, 0.8)'
                    : 'rgba(0,0,0,0.12)',
                  borderRadius: 2,
                }}
              />
              <span className="text-[7px]" style={{ color: 'rgba(0,0,0,0.35)' }}>
                {dayLabels[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}