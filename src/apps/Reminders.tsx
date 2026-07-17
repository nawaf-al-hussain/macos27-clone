'use client';

import { useState } from 'react';

interface Reminder {
  id: string;
  text: string;
  done: boolean;
  due: string;
  priority: 'high' | 'medium' | 'low';
}

const INITIAL_REMINDERS: Reminder[] = [
  { id: '1', text: 'Send brand review feedback', done: false, due: 'Today, 5:00 PM', priority: 'high' },
  { id: '2', text: 'Review macOS Tahoe design tokens', done: false, due: 'Today', priority: 'high' },
  { id: '3', text: 'Prepare WWDC session slides', done: false, due: 'Tomorrow', priority: 'medium' },
  { id: '4', text: 'Update App Store screenshots', done: true, due: 'Jun 17', priority: 'medium' },
  { id: '5', text: 'Schedule 1:1 with team leads', done: false, due: 'Friday', priority: 'low' },
  { id: '6', text: 'Fix Liquid Glass animation bug', done: false, due: 'Friday', priority: 'high' },
  { id: '7', text: 'Order new Magic Keyboard', done: true, due: 'Jun 15', priority: 'low' },
];

const LISTS = ['All', 'Today', 'Scheduled', 'Completed', 'Flagged'];

export default function Reminders() {
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);
  const [activeList, setActiveList] = useState('Today');
  const [newReminder, setNewReminder] = useState('');

  const toggleDone = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r));
  };

  const addReminder = () => {
    if (!newReminder.trim()) return;
    setReminders(prev => [{
      id: `r-${Date.now()}`,
      text: newReminder,
      done: false,
      due: 'Today',
      priority: 'medium',
    }, ...prev]);
    setNewReminder('');
  };

  const filtered = activeList === 'All' ? reminders :
    activeList === 'Today' ? reminders.filter(r => r.due.includes('Today')) :
    activeList === 'Completed' ? reminders.filter(r => r.done) :
    activeList === 'Flagged' ? reminders.filter(r => r.priority === 'high') :
    reminders;

  return (
    <div className="flex h-full">
      <div className="w-[160px] shrink-0 py-2 px-2 overflow-y-auto" style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        {LISTS.map(list => (
          <button
            key={list}
            className={`w-full text-left px-2 py-1.5 rounded-md text-[13px] transition-colors mb-0.5 ${
              activeList === list ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
            }`}
            onClick={() => setActiveList(list)}
          >
            {list}
            <span className="text-white/30 ml-1">
              {list === 'All' ? `(${reminders.length})` :
               list === 'Today' ? `(${reminders.filter(r => r.due.includes('Today')).length})` :
               list === 'Completed' ? `(${reminders.filter(r => r.done).length})` :
               list === 'Flagged' ? `(${reminders.filter(r => r.priority === 'high').length})` :
               `(${reminders.length})`}
            </span>
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <input
            type="text"
            placeholder="New reminder..."
            value={newReminder}
            onChange={e => setNewReminder(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addReminder()}
            className="flex-1 bg-white/5 rounded-lg px-3 py-1.5 text-[13px] text-white/80 outline-none placeholder:text-white/25"
          />
          <button onClick={addReminder} className="text-blue-400 text-[14px]">+</button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {filtered.map(r => (
            <div key={r.id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/4">
              <button
                onClick={() => toggleDone(r.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  r.done ? 'bg-blue-500 border-blue-500' : 'border-white/30'
                }`}
              >
                {r.done && <span className="text-[10px] text-white">✓</span>}
              </button>
              <div className="flex-1">
                <span className={`text-[14px] ${r.done ? 'text-white/30 line-through' : 'text-white/80'}`}>{r.text}</span>
                {r.priority === 'high' && <span className="text-red-400 ml-1 text-[12px]">!</span>}
              </div>
              <span className="text-[11px] text-white/30">{r.due}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}