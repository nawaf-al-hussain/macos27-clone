'use client';

import { useState } from 'react';

interface Reminder {
  id: string;
  text: string;
  done: boolean;
  list: string;
  flagged: boolean;
  due?: string;
}

const INITIAL_REMINDERS: Reminder[] = [
  // Today (3)
  { id: '1', text: 'Send brand review feedback to Maya', done: false, list: 'Today', flagged: true, due: 'Today' },
  { id: '2', text: 'Review PR #142 — genie animation', done: false, list: 'Today', flagged: false, due: 'Today' },
  { id: '3', text: 'Pick up dry cleaning', done: false, list: 'Today', flagged: false, due: 'Today' },
  // Scheduled (7 total, 3 today + 4 future)
  { id: '4', text: 'Prepare WWDC session slides', done: false, list: 'Work', flagged: false, due: 'Tomorrow' },
  { id: '5', text: 'Schedule 1:1 with team leads', done: false, list: 'Work', flagged: false, due: 'Friday' },
  { id: '6', text: 'Fix Liquid Glass animation bug', done: false, list: 'Work', flagged: false, due: 'Friday' },
  { id: '7', text: 'Update App Store screenshots', done: false, list: 'Personal', flagged: false, due: 'Jul 20' },
  // Flagged (2)
  { id: '8', text: 'Ship chess AI depth-2 update', done: false, list: 'Work', flagged: true, due: 'Saturday' },
  // Completed (3)
  { id: '9', text: 'Order new Magic Keyboard', done: true, list: 'Shopping', flagged: false, due: 'Jun 15' },
  { id: '10', text: 'Review macOS Tahoe design tokens', done: true, list: 'Work', flagged: false, due: 'Jun 16' },
  { id: '11', text: 'Submit expense report', done: true, list: 'Personal', flagged: false, due: 'Jun 14' },
  // Additional for All count
  { id: '12', text: 'Buy groceries', done: false, list: 'Shopping', flagged: false, due: 'Sunday' },
  { id: '13', text: 'Call dentist for appointment', done: false, list: 'Personal', flagged: false, due: 'Jul 22' },
];

const CUSTOM_LISTS = ['Work', 'Personal', 'Shopping'];

const FILTERS = [
  { id: 'Today', getCount: (r: Reminder[]) => r.filter(x => !x.done && x.due === 'Today').length },
  { id: 'Scheduled', getCount: (r: Reminder[]) => r.filter(x => !x.done && x.due && x.due !== 'Today').length },
  { id: 'All', getCount: (r: Reminder[]) => r.filter(x => !x.done).length },
  { id: 'Flagged', getCount: (r: Reminder[]) => r.filter(x => !x.done && x.flagged).length },
  { id: 'Completed', getCount: (r: Reminder[]) => r.filter(x => x.done).length },
];

export default function Reminders() {
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);
  const [activeFilter, setActiveFilter] = useState('Today');
  const [activeList, setActiveList] = useState<string | null>(null);

  const toggleDone = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r));
  };

  const getFiltered = (): Reminder[] => {
    if (activeList) {
      return reminders.filter(r => r.list === activeList);
    }
    switch (activeFilter) {
      case 'Today': return reminders.filter(r => !r.done && r.due === 'Today');
      case 'Scheduled': return reminders.filter(r => !r.done && r.due && r.due !== 'Today');
      case 'All': return reminders.filter(r => !r.done);
      case 'Flagged': return reminders.filter(r => !r.done && r.flagged);
      case 'Completed': return reminders.filter(r => r.done);
      default: return reminders;
    }
  };

  const filtered = getFiltered();

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[180px] shrink-0 flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Filters */}
        <div className="py-2 px-2">
          {FILTERS.map(filter => {
            const count = filter.getCount(reminders);
            const isActive = !activeList && activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-left transition-colors mb-0.5 ${
                  isActive ? 'bg-white/12 text-white' : 'text-white/60 hover:bg-white/6'
                }`}
                onClick={() => { setActiveFilter(filter.id); setActiveList(null); }}
              >
                <span className="flex-1">{filter.id}</span>
                <span className="text-[11px] text-white/30">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Lists */}
        <div className="px-2 pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="px-2 py-1.5 text-[11px] font-semibold text-white/30 uppercase tracking-wider">My Lists</div>
          {CUSTOM_LISTS.map(list => {
            const listReminders = reminders.filter(r => r.list === list);
            const isActive = activeList === list;
            return (
              <button
                key={list}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-left transition-colors mb-0.5 ${
                  isActive ? 'bg-white/12 text-white' : 'text-white/60 hover:bg-white/6'
                }`}
                onClick={() => { setActiveList(list); setActiveFilter(''); }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                  <circle cx="8" cy="8" r="6" />
                </svg>
                <span className="flex-1">{list}</span>
                <span className="text-[11px] text-white/30">{listReminders.filter(r => !r.done).length}</span>
              </button>
            );
          })}
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] text-white/30 hover:text-white/50 hover:bg-white/6 transition-colors">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
              <line x1="7" y1="2" x2="7" y2="12" />
              <line x1="2" y1="7" x2="12" y2="7" />
            </svg>
            Add List
          </button>
        </div>

        {/* Toolbar */}
        <div className="mt-auto px-2 py-2 flex items-center gap-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex-1 flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent text-[11px] text-white/80 outline-none placeholder:text-white/25"
            />
          </div>
          <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-white/60 hover:bg-white/10 transition-colors">
            New
            <span className="text-white/30 text-[9px]">⌘N</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-3 py-2 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="text-[13px] font-medium text-white/70">
            {activeList || activeFilter}
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-[120px] bg-transparent text-[11px] text-white/80 outline-none placeholder:text-white/25"
            />
          </div>
          <button className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] text-white/70 hover:bg-white/10 transition-colors font-medium">
            New Reminder
            <span className="text-white/30 text-[10px]">⌘N</span>
          </button>
        </div>

        {/* Reminders List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map(r => (
            <div
              key={r.id}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/4 transition-colors"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
            >
              {/* Circular checkbox */}
              <button
                onClick={() => toggleDone(r.id)}
                className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${
                  r.done
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-white/25 hover:border-white/50'
                }`}
              >
                {r.done && (
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3,7 6,10 11,4" />
                  </svg>
                )}
              </button>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <span className={`text-[14px] ${r.done ? 'text-white/30 line-through' : 'text-white/80'}`}>
                  {r.text}
                </span>
                {r.due && !r.done && (
                  <div className="text-[11px] text-white/30 mt-0.5">{r.due}</div>
                )}
              </div>

              {/* Flag */}
              {r.flagged && !r.done && (
                <svg width="12" height="12" viewBox="0 0 16 16" fill="#ff9500" stroke="none">
                  <path d="M4 2v12l2-2 2 2V2H4z" />
                </svg>
              )}

              {/* Show details button */}
              <button className="w-5 h-5 rounded-full flex items-center justify-center text-white/25 hover:bg-white/8 hover:text-white/50 transition-colors">
                <span className="text-[11px] font-medium italic">i</span>
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-white/30 text-[13px] mt-12">No reminders</div>
          )}
        </div>
      </div>
    </div>
  );
}