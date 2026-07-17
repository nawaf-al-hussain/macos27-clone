'use client';

import { useState } from 'react';

const EVENTS = [
  { id: '1', time: '9:00 AM', title: 'Team Standup', duration: '15m', color: '#007aff' },
  { id: '2', time: '10:00 AM', title: 'Sprint Planning', duration: '1h', color: '#ff9500' },
  { id: '3', time: '11:30 AM', title: 'Design Review', duration: '30m', color: '#5856d6' },
  { id: '4', time: '1:00 PM', title: 'Lunch with Craig', duration: '1h', color: '#34c759' },
  { id: '5', time: '2:30 PM', title: '1:1 with Jony', duration: '30m', color: '#ff2d55' },
  { id: '6', time: '3:30 PM', title: 'Send brand review feedback', duration: '1h', color: '#ff3b30' },
  { id: '7', time: '5:00 PM', title: 'WWDC Prep Meeting', duration: '45m', color: '#007aff' },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState(now.getDate());

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = now.getDate();
  const isCurrentMonth = currentMonth === now.getMonth() && currentYear === now.getFullYear();

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const dayEvents = selectedDate === today ? EVENTS : [];

  return (
    <div className="flex h-full">
      {/* Mini Calendar Sidebar */}
      <div className="w-[220px] shrink-0 p-3" style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Month Nav */}
        <div className="flex items-center justify-between mb-3">
          <button onClick={prevMonth} className="p-1 rounded hover:bg-white/10 text-white/60 text-[14px]">‹</button>
          <span className="text-[14px] font-medium text-white/90">{monthName}</span>
          <button onClick={nextMonth} className="p-1 rounded hover:bg-white/10 text-white/60 text-[14px]">›</button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-0 mb-1">
          {DAYS.map(d => (
            <div key={d} className="text-[10px] text-white/35 text-center font-medium py-1">{d}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-0">
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const isToday = isCurrentMonth && day === today;
            const isSelected = day === selectedDate;
            const hasEvents = isToday;
            return (
              <button
                key={day}
                className={`aspect-square rounded-full flex items-center justify-center text-[12px] relative ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : isToday
                      ? 'text-white font-semibold'
                      : 'text-white/70 hover:bg-white/8'
                }`}
                onClick={() => setSelectedDate(day)}
              >
                {day}
                {hasEvents && !isSelected && (
                  <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-blue-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-[18px] font-semibold text-white/90 mb-1">
          {isCurrentMonth && selectedDate === today ? 'Today' : `June ${selectedDate}`}
        </div>
        <div className="text-[13px] text-white/40 mb-4">
          {new Date(currentYear, currentMonth, selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>

        {dayEvents.length > 0 ? (
          <div className="space-y-2">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', borderLeft: `3px solid ${event.color}` }}
              >
                <div className="text-[12px] text-white/50 w-[60px] shrink-0">{event.time}</div>
                <div className="text-[13px] text-white/80 font-medium">{event.title}</div>
                <div className="text-[11px] text-white/35 ml-auto">{event.duration}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[14px] text-white/30 text-center mt-12">No events scheduled</div>
        )}
      </div>
    </div>
  );
}