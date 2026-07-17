'use client';

import { useState, useEffect } from 'react';

interface NotificationsProps {
  onClose: () => void;
}

interface Notification {
  id: string;
  app: string;
  icon: string;
  title: string;
  body: string;
  time: string;
}

const NOTIFICATIONS: Notification[] = [
  { id: '1', app: 'Messages', icon: '💬', title: 'Tim Cook', body: 'Hey! Check out the new macOS 27 features 🎉', time: '2m ago' },
  { id: '2', app: 'Mail', icon: '✉', title: 'Apple Developer', body: 'WWDC 2025 Session videos are now available', time: '15m ago' },
  { id: '3', app: 'Calendar', icon: '📅', title: 'Sprint Planning', body: 'Starting in 30 minutes — Conference Room B', time: '28m ago' },
  { id: '4', app: 'Reminders', icon: '📋', title: 'Send brand review feedback', body: 'Due today at 5:00 PM', time: '1h ago' },
  { id: '5', app: 'News', icon: '📰', title: 'Apple News+', body: 'Breaking: Apple announces macOS Tahoe with Liquid Glass design', time: '2h ago' },
  { id: '6', app: 'Music', icon: '♫', title: 'New Music Friday', body: 'Check out this week\'s fresh releases', time: '3h ago' },
];

export default function Notifications({ onClose }: NotificationsProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const dateStr = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-[600]" onClick={onClose}>
      <div
        className="absolute top-[34px] right-4 w-[360px] rounded-2xl overflow-hidden slide-up"
        style={{
          background: 'rgba(40, 40, 40, 0.75)',
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          maxHeight: 'calc(100vh - 60px)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 pt-3 pb-2">
          <div className="text-[12px] font-semibold text-white/40 uppercase tracking-wide">{dateStr}</div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[calc(100vh-120px)] px-2 pb-2">
          {NOTIFICATIONS.map(n => (
            <div
              key={n.id}
              className="flex items-start gap-2.5 p-2.5 rounded-xl mx-1 mb-1 hover:bg-white/8 transition-colors cursor-default"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm shrink-0 mt-0.5">
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-white/40">{n.app}</span>
                  <span className="text-[10px] text-white/25">{n.time}</span>
                </div>
                <div className="text-[13px] font-medium text-white/90 mt-0.5">{n.title}</div>
                <div className="text-[12px] text-white/60 mt-0.5 line-clamp-2">{n.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}