'use client';

import { useState } from 'react';

const DAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const VIEW_BUTTONS = ['Day', 'Week', 'Month', 'Year'];

// Event dots: date -> color
const EVENT_DOTS: Record<number, string[]> = {
  2: ['#007aff', '#ff9500'],
  5: ['#34c759'],
  7: ['#ff2d55'],
  8: ['#5856d6', '#007aff'],
  10: ['#ff9500'],
  12: ['#34c759', '#ff2d55'],
  14: ['#007aff'],
  15: ['#ff9500'],
  17: ['#007aff', '#34c759', '#ff2d55'], // Today
  19: ['#5856d6'],
  21: ['#ff9500', '#007aff'],
  23: ['#34c759'],
  25: ['#ff2d55'],
  27: ['#5856d6', '#ff9500'],
  29: ['#007aff'],
  30: ['#34c759'],
};

// July 2026: starts on Wednesday (day 3), 31 days
// June 29, 30 overflow
// August 1-8 overflow

const PREV_MONTH_DAYS = [29, 30]; // June
const DAYS_IN_MONTH = 31;
const START_DAY = 3; // Wednesday
const NEXT_MONTH_DAYS = [1, 2, 3, 4, 5, 6, 7, 8]; // August
const TODAY = 17;

export default function Calendar() {
  const [activeView, setActiveView] = useState('Month');

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Navigation */}
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white/70 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="8,2 4,6 8,10" />
            </svg>
          </button>
          <button className="px-2.5 py-1 rounded-md text-[12px] text-white/70 hover:bg-white/10 transition-colors font-medium">
            Today
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white/70 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="4,2 8,6 4,10" />
            </svg>
          </button>
        </div>

        {/* Month Title */}
        <div className="text-[15px] font-semibold text-white/90 ml-2">July 2026</div>

        {/* View Buttons */}
        <div className="flex items-center gap-0.5 ml-4">
          {VIEW_BUTTONS.map(view => (
            <button
              key={view}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                activeView === view
                  ? 'bg-white/15 text-white/90'
                  : 'text-white/40 hover:text-white/60 hover:bg-white/6'
              }`}
              onClick={() => setActiveView(view)}
            >
              {view}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
            <circle cx="6" cy="6" r="4.5" />
            <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-[100px] bg-transparent text-[11px] text-white/80 outline-none placeholder:text-white/25"
          />
        </div>

        {/* New Event */}
        <button className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] text-white/70 hover:bg-white/10 transition-colors font-medium">
          New Event
          <span className="text-white/30 text-[10px]">⌘N</span>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-hidden flex flex-col px-3 py-2">
        {/* Day Headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_HEADERS.map((day, i) => (
            <div key={i} className="text-center text-[11px] font-medium text-white/40 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="flex-1 grid grid-rows-6 grid-cols-7 gap-0">
          {/* Previous month overflow (June) */}
          {PREV_MONTH_DAYS.map((day, i) => (
            <div
              key={`prev-${i}`}
              className="flex flex-col items-center pt-1 border-t border-white/4"
            >
              <span className="text-[12px] text-white/20 leading-none">{day}</span>
            </div>
          ))}

          {/* Empty cells before start */}
          {Array.from({ length: START_DAY - PREV_MONTH_DAYS.length }, (_, i) => (
            <div
              key={`empty-${i}`}
              className="flex flex-col items-center pt-1 border-t border-white/4"
            />
          ))}

          {/* July days */}
          {Array.from({ length: DAYS_IN_MONTH }, (_, i) => {
            const day = i + 1;
            const isToday = day === TODAY;
            const events = EVENT_DOTS[day] || [];

            return (
              <div
                key={`day-${day}`}
                className="flex flex-col items-center pt-1 border-t border-white/4 group hover:bg-white/4 transition-colors"
              >
                <span
                  className={`text-[12px] leading-none w-6 h-6 flex items-center justify-center rounded-full ${
                    isToday
                      ? 'bg-blue-500 text-white font-semibold'
                      : 'text-white/70'
                  }`}
                >
                  {day}
                </span>
                {events.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {events.slice(0, 3).map((color, ci) => (
                      <div
                        key={ci}
                        className="w-1 h-1 rounded-full"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Next month overflow (August) */}
          {NEXT_MONTH_DAYS.map((day, i) => (
            <div
              key={`next-${i}`}
              className="flex flex-col items-center pt-1 border-t border-white/4"
            >
              <span className="text-[12px] text-white/20 leading-none">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}