'use client';

import { useState } from 'react';

const RECENTLY_PLAYED = [
  { title: 'Drift', artist: 'Isla Wave', album: 'Drift', subtitle: '' },
  { title: 'Blue Note Sessions', artist: 'The Meridian Trio', album: 'Blue Note Sessions', subtitle: '' },
  { title: 'Golden Hour', artist: 'Café Mono', album: 'Golden Hour', subtitle: '' },
  { title: 'Neon Skyline', artist: 'Vector Fields', album: 'Neon Skyline', subtitle: 'Single' },
];

const MADE_FOR_YOU = [
  { title: 'Favorites Mix', count: '4 songs' },
  { title: 'Focus', count: '2 songs' },
  { title: 'Evening Drive', count: '2 songs' },
];

const COVER_COLORS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
];

const PLAYLIST_COLORS = [
  'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
];

export default function Music() {
  const [activeItem, setActiveItem] = useState('listen-now');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(72);
  const [shuffle, setShuffle] = useState<'Off' | 'On'>('Off');
  const [repeat, setRepeat] = useState<'Off' | 'All' | 'One'>('Off');

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[200px] shrink-0 flex flex-col overflow-y-auto py-2"
        style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Apple Music */}
        <div className="px-3 mb-1">
          <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wide px-2 mb-1">Apple Music</div>
          {[
            { id: 'listen-now', label: 'Listen Now' },
            { id: 'browse', label: 'Browse' },
            { id: 'radio', label: 'Radio' },
          ].map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-2 px-2 py-[5px] rounded-md text-[13px] text-left transition-colors ${
                activeItem === item.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
              }`}
              onClick={() => setActiveItem(item.id)}
            >
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Library */}
        <div className="px-3 mb-1">
          <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wide px-2 mb-1">Library</div>
          {[
            { id: 'recently-added', label: 'Recently Added' },
            { id: 'artists', label: 'Artists' },
            { id: 'albums', label: 'Albums' },
            { id: 'songs', label: 'Songs' },
          ].map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-2 px-2 py-[5px] rounded-md text-[13px] text-left transition-colors ${
                activeItem === item.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
              }`}
              onClick={() => setActiveItem(item.id)}
            >
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Playlists */}
        <div className="px-3 mb-1">
          <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wide px-2 mb-1">Playlists</div>
          <button className="w-full flex items-center gap-2 px-2 py-[5px] rounded-md text-[13px] text-left text-white/70 hover:bg-white/6 transition-colors">
            <span className="truncate">New Playlist</span>
            <span className="text-[11px] text-white/30 ml-auto shrink-0">⌘N</span>
          </button>
          {[
            { label: 'Favorites Mix', count: '4' },
            { label: 'Focus', count: '2' },
            { label: 'Evening Drive', count: '2' },
          ].map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-2 px-2 py-[5px] rounded-md text-[13px] text-left transition-colors ${
                activeItem === `playlist-${i}` ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
              }`}
              onClick={() => setActiveItem(`playlist-${i}`)}
            >
              <span className="truncate">{item.label}</span>
              <span className="text-[11px] text-white/30 ml-auto shrink-0">{item.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4">
          <h1 className="text-[24px] font-bold text-white/90">Listen Now</h1>
          <p className="text-[13px] text-white/40 mt-0.5 mb-5">Your music, right where you left it</p>

          {/* Recently Played */}
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-white/85 mb-3">Recently Played</h2>
            <div className="grid grid-cols-4 gap-3">
              {RECENTLY_PLAYED.map((track, i) => (
                <div
                  key={i}
                  className="group cursor-pointer"
                >
                  <div
                    className="aspect-square rounded-lg overflow-hidden relative"
                    style={{ background: COVER_COLORS[i] }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="#000">
                          <path d="M4 2.5v11l9-5.5z"/>
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/50 to-transparent">
                      <div className="text-[12px] font-medium text-white truncate">{track.title}</div>
                      <div className="text-[11px] text-white/60 truncate">{track.artist}</div>
                      {track.subtitle && (
                        <div className="text-[10px] text-white/40 truncate">{track.subtitle}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Made for You */}
          <div>
            <h2 className="text-[16px] font-semibold text-white/85 mb-3">Made for You</h2>
            <div className="grid grid-cols-3 gap-3">
              {MADE_FOR_YOU.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-white/6 transition-colors group"
                >
                  <div
                    className="w-14 h-14 rounded-lg shrink-0 flex items-center justify-center relative"
                    style={{ background: PLAYLIST_COLORS[i] }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="rgba(0,0,0,0.3)">
                      <path d="M3 5v10l7-5z"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="#000">
                          <path d="M4 2.5v11l9-5.5z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-white/85 truncate">{item.title}</div>
                    <div className="text-[11px] text-white/40">{item.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Now Playing Bar */}
        <div
          className="shrink-0 flex items-center gap-3 px-3 py-2"
          style={{
            background: 'rgba(30,30,30,0.92)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Track Info */}
          <div className="flex items-center gap-2.5 w-[200px] shrink-0">
            <div
              className="w-10 h-10 rounded-md shrink-0"
              style={{ background: COVER_COLORS[0] }}
            />
            <div className="min-w-0">
              <div className="text-[12px] font-medium text-white/80 truncate">Drift</div>
              <div className="text-[11px] text-white/40 truncate">Isla Wave</div>
            </div>
          </div>

          {/* Center Controls */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-center gap-4">
              <button className="text-white/30 text-[11px] cursor-not-allowed" title="Previous (⌘←)">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 3h2v10H3zm4 5l8-5v10z"/>
                </svg>
              </button>
              <button
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15 transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
                title="Play/Pause (Space)"
              >
                {isPlaying ? (
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="white">
                    <rect x="3" y="2" width="3.5" height="12" rx="1"/>
                    <rect x="9.5" y="2" width="3.5" height="12" rx="1"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="white">
                    <path d="M4 2.5v11l9-5.5z"/>
                  </svg>
                )}
              </button>
              <button className="text-white/30 text-[11px] cursor-not-allowed" title="Next (⌘→)">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11 3h2v10h-2zm-2 5L1 3v10z"/>
                </svg>
              </button>
            </div>
            {/* Progress bar */}
            <div className="w-full max-w-[360px] flex items-center gap-2">
              <span className="text-[10px] text-white/30 w-6 text-right">0:00</span>
              <div className="flex-1 h-[3px] bg-white/15 rounded-full overflow-hidden">
                <div className="h-full bg-white/50 rounded-full" style={{ width: '0%' }} />
              </div>
              <span className="text-[10px] text-white/30 w-6">3:42</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 w-[200px] shrink-0 justify-end">
            <button
              className="text-[11px] text-white/40 hover:text-white/60 transition-colors px-1.5 py-0.5 rounded hover:bg-white/6"
              onClick={() => setShuffle(shuffle === 'Off' ? 'On' : 'Off')}
            >
              Shuffle: {shuffle}
            </button>
            <button
              className="text-[11px] text-white/40 hover:text-white/60 transition-colors px-1.5 py-0.5 rounded hover:bg-white/6"
              onClick={() => setRepeat(repeat === 'Off' ? 'All' : repeat === 'All' ? 'One' : 'Off')}
            >
              Repeat: {repeat}
            </button>
            <button className="text-white/40 hover:text-white/60 transition-colors p-1">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9v3.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V9" strokeLinecap="round"/>
                <path d="M8 11V3m-3 3l3-3 3 3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex items-center gap-1.5">
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="w-16 music-progress"
              />
            </div>
            <button className="text-[11px] text-white/40 hover:text-white/60 transition-colors px-1.5 py-0.5 rounded hover:bg-white/6">
              Lyrics
            </button>
            <button className="text-[11px] text-white/40 hover:text-white/60 transition-colors px-1.5 py-0.5 rounded hover:bg-white/6">
              Up Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}