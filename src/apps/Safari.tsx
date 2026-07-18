'use client';

import { useState } from 'react';

const FAVORITES_BAR = [
  { name: 'Apple', letter: 'A', color: '#333333' },
  { name: 'Wikipedia', letter: 'W', color: '#636466' },
  { name: 'Hacker News', letter: 'N', color: '#ff6600' },
  { name: 'GitHub Trending', letter: 'G', color: '#24292e' },
];

const START_PAGE_FAVORITES = [
  { name: 'Apple', letter: 'A', color: '#333333' },
  { name: 'Wikipedia', letter: 'W', color: '#636466' },
  { name: 'GitHub', letter: 'G', color: '#24292e' },
  { name: 'Hacker News', letter: 'N', color: '#ff6600' },
  { name: 'Figma', letter: 'F', color: '#a259ff' },
  { name: 'Dribbble', letter: 'D', color: '#ea4c89' },
  { name: 'MDN Web Docs', letter: 'M', color: '#212121' },
  { name: 'OpenStreetMap', letter: 'O', color: '#7ebc6f' },
];

const FREQUENTLY_VISITED = [
  { name: 'en.wikipedia.org', letter: 'e', color: '#636466' },
  { name: 'apple.com', letter: 'a', color: '#333333' },
  { name: 'news.ycombinator.com', letter: 'n', color: '#ff6600' },
  { name: 'github.com', letter: 'g', color: '#24292e' },
];

const READING_LIST = [
  {
    id: '1',
    title: 'Liquid Glass: Designing for Depth',
    source: 'Apple Developer',
    preview: 'A new material that refracts its surroundings and adapts to …',
  },
  {
    id: '2',
    title: 'macOS 27 review: the glass reset',
    source: 'The Verge',
    preview: 'Apple rebuilds the desktop around translucency, depth, and a…',
  },
];

export default function Safari() {
  const [showStartPage, setShowStartPage] = useState(true);
  const [urlInput, setUrlInput] = useState('Search or enter website name');
  const [removedReading, setRemovedReading] = useState<Set<string>>(new Set());

  const handleRemoveReading = (id: string) => {
    setRemovedReading(prev => new Set(prev).add(id));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
      <div
        className="flex items-end px-2 pt-1 pb-0 shrink-0"
        style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Active Tab */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-[12px] text-white/80 max-w-[200px] shrink-0"
          style={{
            background: 'rgba(255,255,255,0.08)',
            borderBottom: '2px solid rgba(255,255,255,0.15)',
            marginBottom: '-1px',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-white/40 shrink-0">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8 4.5V8L10.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="truncate flex-1">Start Page</span>
          <button
            className="text-white/30 hover:text-white/70 text-[14px] leading-none font-light"
            onClick={() => setShowStartPage(true)}
          >
            ×
          </button>
        </div>

        {/* New Tab button */}
        <button
          className="p-1.5 ml-1 mb-0.5 rounded-md text-white/40 hover:bg-white/8 hover:text-white/60 transition-colors"
          title="New tab (⌘T)"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M8 3v10M3 8h10" strokeLinecap="round" />
          </svg>
        </button>

        {/* Tab Overview button */}
        <button
          className="p-1.5 mb-0.5 rounded-md text-white/40 hover:bg-white/8 hover:text-white/60 transition-colors ml-0.5"
          title="Tab overview"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="1" y="1" width="5.5" height="5.5" rx="1" />
            <rect x="9.5" y="1" width="5.5" height="5.5" rx="1" />
            <rect x="1" y="9.5" width="5.5" height="5.5" rx="1" />
            <rect x="9.5" y="9.5" width="5.5" height="5.5" rx="1" />
          </svg>
        </button>
      </div>

      {/* Navigation Bar */}
      <div
        className="flex items-center gap-2 px-3 py-[6px] shrink-0"
        style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Back (disabled) */}
        <button className="p-1 rounded-md text-white/20 cursor-default" disabled>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Forward (disabled) */}
        <button className="p-1 rounded-md text-white/20 cursor-default" disabled>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Reload */}
        <button className="p-1 rounded-md text-white/40 hover:bg-white/6 hover:text-white/60 transition-colors" title="Reload (⌘R)">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M13.5 8A5.5 5.5 0 118 2.5" strokeLinecap="round" />
            <path d="M10 2.5h3v3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* URL Bar */}
        <div className="flex-1 flex items-center px-3 py-[5px] rounded-lg bg-white/5">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" className="mr-2 shrink-0">
            <circle cx="6" cy="6" r="4.5" />
            <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onFocus={() => { if (urlInput === 'Search or enter website name') setUrlInput(''); }}
            onBlur={() => { if (!urlInput) setUrlInput('Search or enter website name'); }}
            className="flex-1 bg-transparent text-[13px] text-white/80 text-center outline-none placeholder:text-white/25"
          />
        </div>

        {/* Page menu */}
        <button className="p-1 rounded-md text-white/40 hover:bg-white/6 hover:text-white/60 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <path d="M2 4h12M2 8h12M2 12h12" />
          </svg>
        </button>
      </div>

      {/* Favorites Bar */}
      <div
        className="flex items-center gap-1 px-3 py-[4px] shrink-0"
        style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        {FAVORITES_BAR.map(fav => (
          <button
            key={fav.name}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/6 transition-colors shrink-0"
          >
            <div
              className="w-4 h-4 rounded-[3px] flex items-center justify-center text-[9px] font-bold text-white/90 shrink-0"
              style={{ background: fav.color }}
            >
              {fav.letter}
            </div>
            <span className="text-[11px] text-white/50 whitespace-nowrap">{fav.name}</span>
          </button>
        ))}
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto" style={{ background: 'rgba(18,18,18,0.95)' }}>
        {showStartPage && (
          <div className="max-w-[560px] mx-auto pt-10 px-6 pb-12">
            {/* Customize Start Page */}
            <div className="flex justify-end mb-6">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/8 text-[12px] text-white/40 hover:text-white/60 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <circle cx="8" cy="8" r="2" />
                  <path d="M8 1v3M8 12v3M1 8h3M12 8h3M2.93 2.93l2.12 2.12M10.95 10.95l2.12 2.12M13.07 2.93l-2.12 2.12M5.05 10.95l-2.12 2.12" strokeLinecap="round" />
                </svg>
                Customize start page
              </button>
            </div>

            {/* Favorites Section */}
            <div className="mb-10">
              <h2 className="text-[13px] font-semibold text-white/60 mb-4 px-1">Favorites</h2>
              <div className="grid grid-cols-4 gap-4">
                {START_PAGE_FAVORITES.map(fav => (
                  <button
                    key={fav.name}
                    className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div
                      className="w-[52px] h-[52px] rounded-[12px] flex items-center justify-center text-[22px] font-semibold text-white/90 transition-transform group-hover:scale-105"
                      style={{ background: fav.color }}
                    >
                      {fav.letter}
                    </div>
                    <span className="text-[11px] text-white/50 max-w-full truncate">{fav.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Frequently Visited */}
            <div className="mb-10">
              <h2 className="text-[13px] font-semibold text-white/60 mb-4 px-1">Frequently Visited</h2>
              <div className="grid grid-cols-4 gap-4">
                {FREQUENTLY_VISITED.map(fav => (
                  <button
                    key={fav.name}
                    className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div
                      className="w-[52px] h-[52px] rounded-[12px] flex items-center justify-center text-[24px] font-medium text-white/90 transition-transform group-hover:scale-105"
                      style={{ background: fav.color }}
                    >
                      {fav.letter}
                    </div>
                    <span className="text-[11px] text-white/50 max-w-full truncate">{fav.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy Report */}
            <div
              className="rounded-xl p-4 mb-8"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-white/50">
                    <path d="M8 1L2 4v4c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V4L8 1z" strokeLinejoin="round" />
                    <path d="M6 8l1.5 1.5L10.5 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[13px] font-medium text-white/80 mb-0.5">Privacy Report</h3>
                  <p className="text-[12px] text-white/50 leading-relaxed">
                    17 trackers prevented from profiling you in the last seven days
                  </p>
                  <p className="text-[11px] text-white/30 mt-1">Intelligent Tracking Prevention · simulated</p>
                </div>
              </div>
            </div>

            {/* Reading List */}
            <div>
              <h2 className="text-[13px] font-semibold text-white/60 mb-3 px-1">Reading List</h2>
              <div className="space-y-0">
                {READING_LIST.filter(r => !removedReading.has(r.id)).map(article => (
                  <div
                    key={article.id}
                    className="flex items-start gap-3 py-3 px-1 rounded-lg hover:bg-white/4 transition-colors group"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    {/* Article thumbnail placeholder */}
                    <div className="w-16 h-16 rounded-lg bg-white/5 shrink-0 flex items-center justify-center overflow-hidden">
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="text-white/15">
                        <path d="M2 2h12v12H2z" stroke="currentColor" strokeWidth="1" />
                        <path d="M4 5h8M4 7h6M4 9h7" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-white/80 mb-0.5">{article.title}</div>
                      <div className="text-[11px] text-white/35">{article.source}</div>
                      <div className="text-[12px] text-white/45 mt-0.5 leading-snug">{article.preview}</div>
                    </div>
                    <button
                      className="p-1 rounded-md text-white/20 hover:text-white/50 hover:bg-white/6 transition-colors opacity-0 group-hover:opacity-100 shrink-0 mt-0.5"
                      title="Remove"
                      onClick={() => handleRemoveReading(article.id)}
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
                {READING_LIST.filter(r => !removedReading.has(r.id)).length === 0 && (
                  <div className="text-[12px] text-white/30 py-4 text-center">No items in Reading List</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}