'use client';

import { useState } from 'react';

const ARTICLES = [
  {
    source: 'Game Theory Weekly',
    time: 'Yesterday',
    headline: 'A new chess engine plays endgames \'more human\' than grandmasters',
  },
  {
    source: 'Market Wire',
    time: '2d ago',
    headline: 'Markets steady as chip stocks rally on relentless AI datacenter demand',
  },
  {
    source: 'Alpine Standard',
    time: '2d ago',
    headline: 'Lake Tahoe clarity rebounds to its best levels since the 1980s',
  },
  {
    source: 'Capital Desk',
    time: '3d ago',
    headline: 'Sacramento weighs new privacy rules for on-device AI assistants',
  },
  {
    source: 'The Circuit',
    time: '3d ago',
    headline: 'macOS 27 \'Tahoe\' review: Liquid Glass is gorgeous — mostly',
    isNewsPlus: true,
  },
  {
    source: 'Golden Gate Eats',
    time: '4d ago',
    headline: 'The Bay\'s best new coffee bars are roasting in the fog',
  },
  {
    source: 'Science Beacon',
    time: '5d ago',
    headline: 'JWST finds the earliest galaxy yet — and it shouldn\'t be this bright',
  },
  {
    source: 'Bay Sports Wire',
    time: '5d ago',
    headline: 'Giants walk off in the 11th on a rookie\'s first career homer',
  },
  {
    source: 'Interface',
    time: '7d ago',
    headline: 'Inside the design of Liquid Glass: an interview with the team that bent light',
  },
];

const SIDEBAR_TABS = [
  { id: 'today', label: 'Today' },
  { id: 'news-plus', label: 'News+' },
  { id: 'sports', label: 'Sports' },
  { id: 'politics', label: 'Politics' },
  { id: 'business', label: 'Business' },
  { id: 'food', label: 'Food' },
  { id: 'technology', label: 'Technology' },
  { id: 'following', label: 'Following' },
  { id: 'saved', label: 'Saved Stories' },
];

export default function News() {
  const [activeTab, setActiveTab] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedStories, setSavedStories] = useState<Set<number>>(new Set());

  const toggleSave = (index: number) => {
    setSavedStories(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[160px] shrink-0 flex flex-col py-2 px-2"
        style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {SIDEBAR_TABS.map(tab => (
          <button
            key={tab.id}
            className={`w-full text-left px-2.5 py-[5px] rounded-md text-[13px] transition-colors mb-0.5 ${
              activeTab === tab.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
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
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search (⌘F)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-[12px] text-white/80 outline-none w-[180px] placeholder:text-white/25"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-5">
          {/* Section header */}
          <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wide mb-1">Suggested</div>
          <h1 className="text-[24px] font-bold text-white/90">Today</h1>
          <p className="text-[13px] text-white/40 mt-0.5 mb-5">Thursday, July 16</p>

          {/* Articles */}
          <div className="space-y-0">
            {ARTICLES.map((article, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 cursor-pointer hover:bg-white/4 transition-colors -mx-2 px-2 rounded-lg group"
                style={{ borderBottom: i < ARTICLES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
              >
                {/* Save button */}
                <button
                  className="mt-0.5 shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
                  onClick={(e) => { e.stopPropagation(); toggleSave(i); }}
                  title="Save story"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill={savedStories.has(i) ? 'rgba(255,255,255,0.8)' : 'none'}
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                  >
                    <path d="M3 2.5v11l5-3 5 3v-11H3z" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Article info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-semibold text-white/30 uppercase tracking-wide">
                      {article.source}
                    </span>
                    {article.isNewsPlus && (
                      <span className="text-[9px] font-bold text-white/40 bg-white/8 px-1 py-0.5 rounded">News+</span>
                    )}
                    <span className="text-[11px] text-white/25">·</span>
                    <span className="text-[11px] text-white/30">{article.time}</span>
                  </div>
                  <div className="text-[14px] text-white/80 leading-snug">
                    {article.headline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}