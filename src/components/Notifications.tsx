'use client';

import { useState, useEffect } from 'react';
import { Check, Phone, CloudFog, ChevronRight, ListChecks } from 'lucide-react';

interface NotificationsProps {
  onClose: () => void;
}

export default function Notifications({ onClose }: NotificationsProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="absolute top-[28px] right-0 bottom-0 glass-panel lg-refract-strong overflow-visible"
      style={{
        width: 'var(--nc-w)',
        borderRadius: 'var(--radius-cc-panel) 0 0 0',
        animation: 'ncSlideIn 350ms var(--ease-ios)',
        zIndex: 9200,
      }}
      onClick={e => e.stopPropagation()}
    >
      <div className="h-full overflow-y-auto p-3 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[17px] font-semibold text-label">Notification Center</span>
        </div>

        {/* ── Notification Banners ── */}
        {/* Reminders Banner */}
        <div className="relative">
          <div className="cursor-default">
            <div className="glass-banner relative p-3" style={{ width: 'var(--banner-w)' }}>
              <div className="flex gap-2.5">
                <div
                  className="os-icon grid place-items-center shrink-0"
                  style={{ width: 36, height: 36, background: 'linear-gradient(rgb(255, 159, 107), rgb(247, 79, 158))' }}
                >
                  <ListChecks size={20} strokeWidth={1.8} color="#fff" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] uppercase tracking-wide text-label-2 font-medium">Reminders</span>
                    <span className="text-[11px] text-label-3">5h ago</span>
                  </div>
                  <div className="text-[13px] font-semibold text-label truncate">Reminder</div>
                  <div className="text-[13px] text-label-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    Prepare Q3 demo slides — 9:00 AM
                  </div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    <div className="glass-pill px-2 py-[3px] text-[11px] text-label flex items-center gap-1">
                      <Check size={12} />
                      Complete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Banner */}
        <div className="relative">
          <div className="cursor-default">
            <div className="glass-banner relative p-3" style={{ width: 'var(--banner-w)' }}>
              <div className="flex gap-2.5">
                <div
                  className="os-icon grid place-items-center shrink-0"
                  style={{ width: 36, height: 36, background: 'linear-gradient(rgb(123, 248, 123), rgb(15, 209, 48))' }}
                >
                  <Phone size={20} strokeWidth={1.8} color="#fff" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] uppercase tracking-wide text-label-2 font-medium">Phone</span>
                    <span className="text-[11px] text-label-3">20h ago</span>
                  </div>
                  <div className="text-[13px] font-semibold text-label truncate">Missed Call</div>
                  <div className="text-[13px] text-label-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    Alex Rivera · (415) 555-0161
                  </div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    <div className="glass-pill px-2 py-[3px] text-[11px] text-label">
                      Call Back
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Widgets Grid ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* Calendar Widget (col-span-2) */}
          <div className="relative col-span-2">
            <div className="w-full h-full">
              <div className="glass-banner p-3 w-full h-full overflow-hidden cursor-default text-left" style={{ height: 160, animation: 'widgetIn 350ms var(--ease-ios)' }}>
                <div className="flex h-full gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold" style={{ color: '#FF3B30' }}>July 2026</div>
                    <CalendarGrid />
                  </div>
                  <div className="w-[110px] shrink-0 flex flex-col gap-1.5 justify-center">
                    <CalendarEvent color="rgb(48, 209, 88)" title="Book club — Project Hail Mary" time="6:00 PM" />
                    <CalendarEvent color="rgb(48, 209, 88)" title="Gym" time="7:00 AM" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="relative">
            <div className="w-full h-full">
              <div className="glass-banner p-3 w-full h-full overflow-hidden cursor-default text-left" style={{ height: 160, animation: 'widgetIn 350ms var(--ease-ios)', animationDelay: '40ms', animationFillMode: 'backwards' }}>
                <div className="flex flex-col h-full">
                  <div className="text-[13px] font-semibold text-label flex items-center gap-1">Cupertino</div>
                  <div className="flex items-center gap-2 mt-1">
                    <CloudFog size={30} className="text-label-2" />
                    <span className="text-[30px] font-light text-label leading-none">59°</span>
                  </div>
                  <div className="mt-auto text-[11px] text-label-2">Fog</div>
                  <div className="text-[11px] text-label-2">H:83°  L:59°</div>
                </div>
              </div>
            </div>
          </div>

          {/* Reminders Widget */}
          <div className="relative">
            <div className="w-full h-full">
              <div className="glass-banner p-3 w-full h-full overflow-hidden cursor-default text-left" style={{ height: 160, animation: 'widgetIn 350ms var(--ease-ios)', animationDelay: '80ms', animationFillMode: 'backwards' }}>
                <div className="flex flex-col h-full">
                  <div className="text-[13px] font-semibold text-label">Today</div>
                  <div className="mt-1.5 flex flex-col gap-1.5">
                    <ReminderItem text="Send brand review feedback to Maya" />
                    <ReminderItem text="Review PR #142 — genie animation" />
                    <ReminderItem text="Pick up dry cleaning" />
                  </div>
                  <div className="mt-auto text-[10px] text-label-3 flex items-center gap-0.5">
                    4 remaining
                    <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stocks Widget */}
          <div className="relative">
            <div className="w-full h-full">
              <div className="glass-banner p-3 w-full h-full overflow-hidden cursor-default text-left" style={{ height: 160, animation: 'widgetIn 350ms var(--ease-ios)', animationDelay: '120ms', animationFillMode: 'backwards' }}>
                <div className="flex flex-col h-full justify-between py-0.5">
                  <StockRow symbol="AAPL" name="Apple Inc." price="232.40" change="+12.02%" up={true} />
                  <StockRow symbol="MSFT" name="Microsoft Corp." price="505.80" change="+3.52%" up={true} />
                  <StockRow symbol="NVDA" name="NVIDIA Corp." price="168.25" change="-6.22%" up={false} />
                </div>
              </div>
            </div>
          </div>

          {/* World Clock Widget */}
          <div className="relative">
            <div className="w-full h-full">
              <div className="glass-banner p-3 w-full h-full overflow-hidden cursor-default text-left" style={{ height: 160, animation: 'widgetIn 350ms var(--ease-ios)', animationDelay: '160ms', animationFillMode: 'backwards' }}>
                <div className="flex flex-col h-full justify-center gap-1.5">
                  <ClockRow city="Cupertino" tz="America/Los_Angeles" now={now} />
                  <ClockRow city="New York" tz="America/New_York" now={now} />
                  <ClockRow city="Tokyo" tz="Asia/Tokyo" now={now} />
                </div>
              </div>
            </div>
          </div>

          {/* Screen Time Widget (col-span-2) */}
          <div className="relative col-span-2">
            <div className="w-full h-full">
              <div className="glass-banner p-3 w-full h-full overflow-hidden cursor-default text-left" style={{ height: 160, animation: 'widgetIn 350ms var(--ease-ios)', animationDelay: '200ms', animationFillMode: 'backwards' }}>
                <div className="flex flex-col h-full">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-label-2">Screen Time</span>
                    <span className="text-[15px] font-semibold text-label" style={{ fontVariantNumeric: 'tabular-nums' }}>3h 42m today</span>
                  </div>
                  <div className="mt-auto flex items-end gap-[5px] h-[52px]">
                    <ScreenBar pct={42} accent={false} />
                    <ScreenBar pct={68} accent={false} />
                    <ScreenBar pct={55} accent={false} />
                    <ScreenBar pct={74} accent={true} />
                    <ScreenBar pct={38} accent={false} />
                    <ScreenBar pct={61} accent={false} />
                    <ScreenBar pct={52} accent={false} />
                  </div>
                  <div className="flex justify-between text-[7px] text-label-3 mt-0.5">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Widgets */}
        <div className="flex-1" />
        <button className="text-[11px] text-label-2 py-1 hover:text-label self-center transition-colors">
          Edit Widgets
        </button>
      </div>
    </div>
  );
}

/* ═══════════════ Calendar Grid ═══════════════ */

function CalendarGrid() {
  const year = 2026;
  const month = 6; // July (0-indexed)
  const today = 20;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="grid grid-cols-7 gap-0 mt-1 text-center">
      {dayLabels.map((d, i) => (
        <div key={i} className="text-[8px] font-semibold text-label-3">{d}</div>
      ))}
      {cells.map((day, i) => (
        <div key={i} className="text-[9px] leading-[16px] text-label relative">
          {day}
          {day === today && (
            <span className="inline-grid place-items-center w-4 h-4 rounded-full bg-[#FF3B30] text-white absolute -top-[2px] left-1/2 -translate-x-1/2 text-[9px] leading-[16px]">
              {day}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════ Calendar Event ═══════════════ */

function CalendarEvent({ color, title, time }: { color: string; title: string; time: string }) {
  return (
    <div className="flex gap-1.5 items-start">
      <div className="w-[3px] self-stretch rounded-full mt-[1px]" style={{ background: color }} />
      <div className="min-w-0">
        <div className="text-[10px] font-medium text-label truncate">{title}</div>
        <div className="text-[9px] text-label-2">{time}</div>
      </div>
    </div>
  );
}

/* ═══════════════ Reminder Item ═══════════════ */

function ReminderItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1.5 text-left">
      <div
        className="w-4 h-4 rounded-full border grid place-items-center shrink-0"
        style={{ borderColor: 'var(--label-3)', background: 'transparent' }}
      />
      <span className="text-[11px] text-label truncate">{text}</span>
    </div>
  );
}

/* ═══════════════ Stock Row ═══════════════ */

function StockRow({ symbol, name, price, change, up }: { symbol: string; name: string; price: string; change: string; up: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[64px]">
        <div className="text-[12px] font-semibold text-label">{symbol}</div>
        <div className="text-[9px] text-label-3 truncate">{name}</div>
      </div>
      <div className="shrink-0 ml-auto text-right">
        <div className="text-[12px] font-medium text-label" style={{ fontVariantNumeric: 'tabular-nums' }}>{price}</div>
        <div className="text-[9px]" style={{ fontVariantNumeric: 'tabular-nums', color: up ? 'rgb(48, 209, 88)' : 'rgb(255, 69, 58)' }}>{change}</div>
      </div>
    </div>
  );
}

/* ═══════════════ Clock Row ═══════════════ */

function ClockRow({ city, tz, now }: { city: string; tz: string; now: Date }) {
  const time = now.toLocaleTimeString('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex items-baseline justify-between">
      <span className="text-[11px] text-label-2">{city}</span>
      <span className="text-[13px] font-medium text-label" style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
    </div>
  );
}

/* ═══════════════ Screen Time Bar ═══════════════ */

function ScreenBar({ pct, accent }: { pct: number; accent: boolean }) {
  return (
    <div
      className="flex-1 rounded-[2px]"
      style={{
        height: `${pct}%`,
        background: accent ? 'var(--accent)' : 'var(--accent-selection)',
      }}
    />
  );
}