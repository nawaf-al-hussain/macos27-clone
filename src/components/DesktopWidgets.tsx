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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="flex-1 min-w-0">
        {/* Month header */}
        <div className="text-[12px] font-semibold" style={{ color: '#FF3B30' }}>
          {monthLabel}
        </div>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0 mt-1 text-center">
          {dayLabels.map((d, i) => (
            <div key={i} className="text-[8px] font-semibold" style={{ color: 'rgba(0,0,0,0.35)' }}>
              {d}
            </div>
          ))}
          {/* Date cells */}
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
      {/* Events below calendar */}
      <div className="mt-1 space-y-0.5" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 4 }}>
        <div className="flex items-center gap-1.5">
          <div className="w-[3px] h-[10px] rounded-full" style={{ background: '#FF3B30' }} />
          <span className="text-[9px] leading-tight" style={{ color: 'rgba(0,0,0,0.75)' }}>
            Sprint planning
          </span>
          <span className="text-[8px] ml-auto" style={{ color: 'rgba(0,0,0,0.4)' }}>9:30 AM</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-[3px] h-[10px] rounded-full" style={{ background: '#FF9500' }} />
          <span className="text-[9px] leading-tight" style={{ color: 'rgba(0,0,0,0.75)' }}>
            Dentist
          </span>
          <span className="text-[8px] ml-auto" style={{ color: 'rgba(0,0,0,0.4)' }}>2:30 PM</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Weather Widget ─────────────── */

function WeatherWidget() {
  return (
    <div
      className="glass-banner overflow-hidden cursor-pointer"
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
          className="text-[13px] font-semibold"
          style={{ color: 'rgba(0,0,0,0.75)' }}
        >
          Cupertino
        </div>
        <div className="flex items-center gap-2 mt-1">
          {/* Sun icon - clear sky */}
          <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" fill="#FFD60A" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-[30px] font-light leading-none" style={{ color: 'rgba(0,0,0,0.85)' }}>
            78°
          </span>
        </div>
        <div className="mt-auto text-[11px]" style={{ color: 'rgba(0,0,0,0.5)' }}>
          Clear
        </div>
        <div className="text-[11px]" style={{ color: 'rgba(0,0,0,0.5)' }}>
          H:80°  L:53°
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Reminders Widget ─────────────── */

function RemindersWidget() {
  const [items, setItems] = useState([
    { id: 1, text: 'Send brand review feedback to Maya', checked: false },
    { id: 2, text: 'Review PR #142 — genie animation', checked: false },
    { id: 3, text: 'Pick up dry cleaning', checked: false },
  ]);

  const handleCheck = (id: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const remaining = items.filter(i => !i.checked).length;

  return (
    <div
      className="glass-banner overflow-hidden cursor-pointer"
      style={{
        padding: 12,
        height: 140,
        animation: 'widgetIn 350ms var(--ease-ios) forwards',
        animationDelay: '100ms',
        opacity: 0,
      }}
    >
      <div className="flex flex-col h-full">
        <div className="text-[11px] font-semibold mb-2" style={{ color: 'rgba(0,0,0,0.4)' }}>
          Today
        </div>
        <div className="space-y-2.5 flex-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-2 cursor-pointer"
              onClick={() => handleCheck(item.id)}
            >
              {/* Circular checkbox */}
              <div
                className="flex-shrink-0 w-[14px] h-[14px] rounded-full border-[1.5px] mt-[1px] flex items-center justify-center"
                style={{
                  borderColor: item.checked ? '#FF9500' : 'rgba(0,0,0,0.25)',
                  background: item.checked ? '#FF9500' : 'transparent',
                }}
              >
                {item.checked && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4 L3 5.5 L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-[11px] leading-[14px]"
                style={{
                  color: item.checked ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.75)',
                  textDecoration: item.checked ? 'line-through' : 'none',
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
        <div className="text-[10px]" style={{ color: 'rgba(0,0,0,0.4)' }}>
          {remaining} remaining
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Stocks Widget ─────────────── */

function StocksWidget() {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$232.40', change: '+12.02%', positive: true },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$505.80', change: '+3.52%', positive: true },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$168.25', change: '-6.22%', positive: false },
  ];

  return (
    <div
      className="glass-banner overflow-hidden cursor-pointer"
      style={{
        padding: 12,
        height: 140,
        animation: 'widgetIn 350ms var(--ease-ios) forwards',
        animationDelay: '150ms',
        opacity: 0,
      }}
    >
      <div className="text-[11px] font-semibold mb-2" style={{ color: 'rgba(0,0,0,0.4)' }}>
        Stocks
      </div>
      <div className="space-y-2.5">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[12px] font-semibold" style={{ color: 'rgba(0,0,0,0.85)' }}>
                {stock.symbol}
              </span>
              <span className="text-[10px] truncate" style={{ color: 'rgba(0,0,0,0.45)' }}>
                {stock.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[12px] font-medium" style={{ color: 'rgba(0,0,0,0.85)' }}>
                {stock.price}
              </span>
              <span
                className="text-[11px] font-medium flex items-center gap-0.5"
                style={{ color: stock.positive ? '#34C759' : '#FF3B30' }}
              >
                {stock.positive ? (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M4 1.5 L6.5 5.5 L1.5 5.5 Z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M4 6.5 L1.5 2.5 L6.5 2.5 Z" fill="currentColor" />
                  </svg>
                )}
                {stock.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── Desktop Widgets Container ─────────────── */

export default function DesktopWidgets() {
  return (
    <div
      className="absolute left-3 hidden lg:grid grid-cols-2 gap-3 w-[344px]"
      style={{ zIndex: 'var(--z-desktop)', top: '36px' }}
    >
      <CalendarWidget />
      <WeatherWidget />
      <RemindersWidget />
      <StocksWidget />
    </div>
  );
}