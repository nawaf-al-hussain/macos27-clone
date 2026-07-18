'use client';

import { useState } from 'react';

const SIDEBAR_TABS = [
  { id: 'discover', label: 'Discover' },
  { id: 'create', label: 'Create' },
  { id: 'work', label: 'Work' },
  { id: 'play', label: 'Play' },
  { id: 'develop', label: 'Develop' },
  { id: 'categories', label: 'Categories' },
  { id: 'updates', label: 'Updates', badge: '2' },
  { id: 'account', label: 'Account' },
];

const MUST_HAVE_APPS = [
  { name: 'Chess', subtitle: 'Board', gradient: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)', emoji: '♟️', action: 'Get' as const },
  { name: 'Games', subtitle: 'Entertainment', gradient: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', emoji: '🎮', action: 'Open' as const },
  { name: 'Home', subtitle: 'Lifestyle', gradient: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)', emoji: '🏠', action: 'Get' as const },
  { name: 'Dictionary', subtitle: 'Reference', gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', emoji: '📖', action: 'Get' as const },
];

const APPS_WE_LOVE = [
  { name: 'Nova Writer', subtitle: 'Productivity', gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', emoji: '✍️', action: 'Get' as const },
  { name: 'Deepfield', subtitle: 'Photography', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)', emoji: '🔭', action: '$4.99' as const },
  { name: 'Chess', subtitle: 'Board', gradient: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)', emoji: '♟️', action: 'Get' as const },
  { name: 'Tempo', subtitle: 'Music', gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)', emoji: '🎵', action: 'Get' as const },
  { name: 'Dictionary', subtitle: 'Reference', gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', emoji: '📖', action: 'Get' as const },
  { name: 'PixelForge', subtitle: 'Design', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d946ef 100%)', emoji: '🎨', action: '$9.99' as const },
];

const TOP_FREE_APPS = [
  { name: 'Chess', subtitle: 'Board', gradient: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)', emoji: '♟️', action: 'Get' as const },
  { name: 'Games', subtitle: 'Entertainment', gradient: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', emoji: '🎮', action: 'Open' as const },
  { name: 'Home', subtitle: 'Lifestyle', gradient: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)', emoji: '🏠', action: 'Get' as const },
  { name: 'Dictionary', subtitle: 'Reference', gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', emoji: '📖', action: 'Get' as const },
  { name: 'Nova Writer', subtitle: 'Productivity', gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', emoji: '✍️', action: 'Get' as const },
  { name: 'Tempo', subtitle: 'Music', gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)', emoji: '🎵', action: 'Get' as const },
  { name: 'Orbit Mail', subtitle: 'Productivity', gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', emoji: '✉️', action: 'Get' as const },
];

function ActionButton({ action }: { action: string }) {
  if (action === 'Open') {
    return (
      <button className="px-3 py-1 rounded-full bg-white/10 text-[11px] text-blue-400 font-medium shrink-0 hover:bg-white/15 transition-colors">
        Open
      </button>
    );
  }
  if (action.startsWith('$')) {
    return (
      <button className="px-3 py-1 rounded-full bg-white/10 text-[11px] text-blue-400 font-medium shrink-0 hover:bg-white/15 transition-colors">
        {action}
      </button>
    );
  }
  return (
    <button className="px-3 py-1 rounded-full bg-blue-500/80 hover:bg-blue-500 text-[11px] text-white font-medium shrink-0 transition-colors">
      Get
    </button>
  );
}

export default function AppStore() {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[160px] shrink-0 py-2 px-2"
        style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {SIDEBAR_TABS.map(tab => (
          <button
            key={tab.id}
            className={`w-full flex items-center justify-between px-2.5 py-[5px] rounded-md text-[13px] text-left transition-colors mb-0.5 ${
              activeTab === tab.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="text-[10px] bg-blue-500 text-white rounded-full px-1.5 py-0.5 leading-none">{tab.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div
          className="shrink-0 flex items-center gap-2 px-3 py-1.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button className="p-1 rounded hover:bg-white/10 text-white/25 cursor-not-allowed">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3L5 8l5 5"/></svg>
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-[12px] text-white/80 outline-none w-[120px] placeholder:text-white/25"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-5">
          {/* Featured Banner */}
          <div
            className="rounded-xl overflow-hidden p-5 mb-6 relative"
            style={{
              background: 'linear-gradient(135deg, rgba(30,41,59,0.6) 0%, rgba(71,85,105,0.4) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wide mb-2">Now Built for Liquid Glass</div>
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)' }}
              >
                <span className="text-[36px]">♟️</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[20px] font-bold text-white/90">Chess</div>
                <div className="text-[13px] text-white/50 mt-0.5">The classic. Beautiful board, smart opponent.</div>
              </div>
              <button className="px-4 py-1.5 rounded-full bg-blue-500/80 hover:bg-blue-500 text-[13px] text-white font-medium shrink-0 transition-colors">
                Get
              </button>
            </div>
          </div>

          {/* Must-Have Apps */}
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-white/85 mb-3">Must-Have Apps</h2>
            <div className="grid grid-cols-2 gap-2">
              {MUST_HAVE_APPS.map((app, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-colors cursor-pointer">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: app.gradient }}
                  >
                    <span className="text-[22px]">{app.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-white/85 truncate">{app.name}</div>
                    <div className="text-[11px] text-white/40">{app.subtitle}</div>
                  </div>
                  <ActionButton action={app.action} />
                </div>
              ))}
            </div>
          </div>

          {/* Apps We Love */}
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-white/85 mb-3">Apps We Love</h2>
            <div className="grid grid-cols-2 gap-2">
              {APPS_WE_LOVE.map((app, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-colors cursor-pointer">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: app.gradient }}
                  >
                    <span className="text-[22px]">{app.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-white/85 truncate">{app.name}</div>
                    <div className="text-[11px] text-white/40">{app.subtitle}</div>
                  </div>
                  <ActionButton action={app.action} />
                </div>
              ))}
            </div>
          </div>

          {/* Top Free */}
          <div>
            <h2 className="text-[16px] font-semibold text-white/85 mb-3">Top Free</h2>
            <div className="grid grid-cols-2 gap-2">
              {TOP_FREE_APPS.map((app, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-colors cursor-pointer">
                  <div className="text-[13px] text-white/30 w-4 text-right shrink-0 font-medium">{i + 1}</div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: app.gradient }}
                  >
                    <span className="text-[18px]">{app.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-white/85 truncate">{app.name}</div>
                    <div className="text-[11px] text-white/40">{app.subtitle}</div>
                  </div>
                  <ActionButton action={app.action} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}