'use client';

import { useState } from 'react';

const EPISODES = [
  {
    title: 'Liquid Glass, one year later',
    show: 'The Gradient Hour',
    duration: '52 min',
    hasPlay: true,
    hasRemove: true,
    saved: true,
  },
  {
    title: 'Night Circuit 042: Neon Skyline',
    show: 'Night Circuit',
    duration: '38 min',
    hasPlay: true,
    hasSave: true,
    saved: false,
  },
  {
    title: 'The anatomy of a perfect sidebar',
    show: 'The Gradient Hour',
    duration: '44 min',
    hasPlay: true,
    hasSave: true,
    saved: false,
  },
  {
    title: 'Night Circuit 041: Midnight Drift',
    show: 'Night Circuit',
    duration: '41 min',
    hasPlay: false,
    hasSave: true,
    saved: false,
  },
];

export default function Podcasts() {
  const [activeTab, setActiveTab] = useState('listen-now');
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedEpisodes, setSavedEpisodes] = useState<Set<number>>(new Set([0]));
  const [volume, setVolume] = useState(65);

  const toggleSave = (index: number) => {
    setSavedEpisodes(prev => {
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
        className="w-[200px] shrink-0 flex flex-col overflow-y-auto py-2"
        style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Top-level tabs */}
        <div className="px-3 mb-1">
          {[
            { id: 'listen-now', label: 'Listen Now' },
            { id: 'browse', label: 'Browse' },
            { id: 'top-charts', label: 'Top Charts' },
          ].map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-2 px-2 py-[5px] rounded-md text-[13px] text-left transition-colors ${
                activeTab === item.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Library */}
        <div className="px-3 mb-1">
          <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wide px-2 mb-1">Library</div>
          {[
            { id: 'shows', label: 'Shows', count: '2' },
            { id: 'episodes', label: 'Episodes', count: '6' },
            { id: 'saved', label: 'Saved', count: '1' },
          ].map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-2 px-2 py-[5px] rounded-md text-[13px] text-left transition-colors ${
                activeTab === item.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="truncate">{item.label}</span>
              <span className="text-[11px] text-white/30 ml-auto shrink-0">{item.count}</span>
            </button>
          ))}
        </div>

        {/* Following */}
        <div className="px-3 mb-1">
          <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wide px-2 mb-1">Following</div>
          {[
            { id: 'gradient-hour', label: 'The Gradient Hour' },
            { id: 'night-circuit', label: 'Night Circuit' },
          ].map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-2 px-2 py-[5px] rounded-md text-[13px] text-left transition-colors ${
                activeTab === item.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4">
          <h1 className="text-[24px] font-bold text-white/90">New episodes from your shows</h1>

          {/* Up Next */}
          <div className="mt-5">
            <h2 className="text-[16px] font-semibold text-white/85 mb-3">Up Next</h2>
            <div className="space-y-2">
              {EPISODES.map((ep, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/6 transition-colors"
                >
                  {/* Play button or artwork placeholder */}
                  <div className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${['#6366f1,#a855f7', '#0ea5e9,#6366f1', '#6366f1,#a855f7', '#0ea5e9,#6366f1'][i]})` }}
                  >
                    {ep.hasPlay ? (
                      <button
                        className="text-white hover:scale-110 transition-transform"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                            <rect x="3" y="2" width="3.5" height="12" rx="1"/>
                            <rect x="9.5" y="2" width="3.5" height="12" rx="1"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                            <path d="M4 2.5v11l9-5.5z"/>
                          </svg>
                        )}
                      </button>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="rgba(255,255,255,0.5)">
                        <path d="M4 2.5v11l9-5.5z"/>
                      </svg>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-white/85 truncate">{ep.title}</div>
                    <div className="text-[11px] text-white/40">{ep.show} · {ep.duration}</div>
                  </div>

                  {/* Action button */}
                  <div className="shrink-0">
                    {ep.hasRemove ? (
                      <button
                        className="text-[11px] text-white/40 hover:text-white/70 transition-colors px-2 py-1 rounded hover:bg-white/8"
                        onClick={() => toggleSave(i)}
                      >
                        Remove from Saved
                      </button>
                    ) : ep.hasSave ? (
                      <button
                        className="text-[11px] text-white/40 hover:text-white/70 transition-colors px-2 py-1 rounded hover:bg-white/8"
                        onClick={() => toggleSave(i)}
                      >
                        {savedEpisodes.has(i) ? 'Saved ✓' : 'Save Episode'}
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Playback Bar */}
        <div
          className="shrink-0 flex items-center gap-2.5 px-3 py-2"
          style={{
            background: 'rgba(30,30,30,0.92)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Skip back 15s */}
          <button className="text-white/30 text-[11px] cursor-not-allowed flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/4">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 6.5h2V4l5 4-5 4V9.5H2z" opacity="0.5"/>
              <path d="M8 6.5h2V4l5 4-5 4V9.5H8z"/>
            </svg>
            <span>15</span>
          </button>

          {/* Play/Pause */}
          <button
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15 transition-colors"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <svg width="10" height="10" viewBox="0 0 16 16" fill="white">
                <rect x="3" y="2" width="3.5" height="12" rx="1"/>
                <rect x="9.5" y="2" width="3.5" height="12" rx="1"/>
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 16 16" fill="white">
                <path d="M4 2.5v11l9-5.5z"/>
              </svg>
            )}
          </button>

          {/* Skip forward 30s */}
          <button className="text-white/30 text-[11px] cursor-not-allowed flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/4">
            <span>30</span>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 6.5h2V4l5 4-5 4V9.5H6z"/>
              <path d="M0 6.5h2V4l5 4-5 4V9.5H0z" opacity="0.5"/>
            </svg>
          </button>

          <div className="flex-1" />

          {/* Volume */}
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
              <path d="M2 6v4h3l4 3V3L5 6H2z" strokeLinejoin="round"/>
              <path d="M11 5.5a3.5 3.5 0 010 5" strokeLinecap="round"/>
            </svg>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              className="w-20 music-progress"
            />
          </div>

          {/* 1x Speed */}
          <button className="text-[11px] text-white/50 hover:text-white/70 transition-colors px-1.5 py-0.5 rounded hover:bg-white/6">
            1×
          </button>

          {/* Sleep Timer */}
          <button className="text-[11px] text-white/50 hover:text-white/70 transition-colors px-1.5 py-0.5 rounded hover:bg-white/6">
            Sleep Timer
          </button>
        </div>
      </div>
    </div>
  );
}