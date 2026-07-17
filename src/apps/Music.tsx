'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  file: string;
}

const TRACKS: Track[] = [
  { id: 1, title: 'Midnight Drive', artist: 'Synthwave Collective', album: 'Neon Horizons', duration: '4:23', cover: '/images/cover-1.jpg', file: '/audio/track-1.mp3' },
  { id: 2, title: 'Crystal Waters', artist: 'Ambient Dreams', album: 'Still Waters', duration: '3:45', cover: '/images/cover-2.jpg', file: '/audio/track-2.mp3' },
  { id: 3, title: 'Electric Pulse', artist: 'Digital Echo', album: 'Voltage', duration: '5:12', cover: '/images/cover-3.jpg', file: '/audio/track-3.mp3' },
  { id: 4, title: 'Glass Garden', artist: 'Bonobo', album: 'Fragments', duration: '4:56', cover: '/images/cover-4.jpg', file: '/audio/track-4.mp3' },
];

const SIDEBAR_ITEMS = [
  { id: 'now-playing', name: 'Now Playing', icon: '♫' },
  { id: 'browse', name: 'Browse', icon: '🔍' },
  { id: 'radio', name: 'Radio', icon: '📻' },
  { id: 'library', name: 'Library', icon: '📚' },
  { id: 'playlists', name: 'Playlists', icon: '📋' },
  { id: 'albums', name: 'Albums', icon: '💿' },
  { id: 'artists', name: 'Artists', icon: '🎤' },
  { id: 'songs', name: 'Songs', icon: '🎵' },
];

export default function Music() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [activeTab, setActiveTab] = useState('now-playing');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const track = TRACKS[currentTrack];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const audio = new Audio(track.file);
    audio.volume = volume / 100;
    audioRef.current = audio;

    if (isPlaying) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => {});
      progressInterval.current = setInterval(() => {
        if (audioRef.current && !audioRef.current.paused) {
          setProgress((audioRef.current.currentTime / (audioRef.current.duration || 1)) * 100);
        }
      }, 250);
    } else {
      audioRef.current?.pause();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    setCurrentTrack(prev => (prev + 1) % TRACKS.length);
    setProgress(0);
  }, []);

  const prevTrack = useCallback(() => {
    setCurrentTrack(prev => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  }, []);

  const handleProgressSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setProgress(val);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
    }
  };

  const formatTime = (percent: number) => {
    const parts = track.duration.split(':');
    const totalSec = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    const currentSec = Math.floor((percent / 100) * totalSec);
    const m = Math.floor(currentSec / 60);
    const s = currentSec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-[150px] shrink-0 py-2 px-1.5 overflow-y-auto" style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        {SIDEBAR_ITEMS.map(item => (
          <button
            key={item.id}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-left transition-colors ${
              activeTab === item.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="text-[14px]">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeTab === 'now-playing' ? (
          <>
            {/* Album Art */}
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="w-[240px] h-[240px] rounded-xl overflow-hidden shadow-2xl mb-6">
                <img
                  src={track.cover}
                  alt={track.album}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mb-4">
                <div className="text-[20px] font-semibold text-white/90">{track.title}</div>
                <div className="text-[15px] text-white/50 mt-1">{track.artist}</div>
              </div>

              {/* Progress */}
              <div className="w-full max-w-[360px] mb-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={handleProgressSeek}
                  className="w-full music-progress"
                />
                <div className="flex justify-between text-[11px] text-white/35 mt-1">
                  <span>{formatTime(progress)}</span>
                  <span>{track.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6">
                <button className="text-white/50 hover:text-white/80 text-[16px]" onClick={prevTrack}>⏮</button>
                <button
                  className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white text-[24px] hover:bg-white/20 transition-colors"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button className="text-white/50 hover:text-white/80 text-[16px]" onClick={nextTrack}>⏭</button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-white/40 text-[14px]">{volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="w-24 music-progress"
                />
              </div>
            </div>
          </>
        ) : (
          /* Track List */
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-3">
              <h2 className="text-[20px] font-semibold text-white/90 mb-3">Songs</h2>
              <div className="space-y-1">
                {TRACKS.map((t, i) => (
                  <button
                    key={t.id}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      currentTrack === i ? 'bg-white/12' : 'hover:bg-white/6'
                    }`}
                    onClick={() => { setCurrentTrack(i); setProgress(0); setIsPlaying(true); }}
                  >
                    <div className="w-10 h-10 rounded-md overflow-hidden shrink-0">
                      <img src={t.cover} alt={t.album} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[14px] truncate ${currentTrack === i ? 'text-blue-400 font-medium' : 'text-white/80'}`}>
                        {t.title}
                      </div>
                      <div className="text-[12px] text-white/40 truncate">{t.artist}</div>
                    </div>
                    <div className="text-[12px] text-white/35 shrink-0">{t.album}</div>
                    <div className="text-[12px] text-white/35 shrink-0 w-[40px] text-right">{t.duration}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mini Player */}
            <div
              className="sticky bottom-0 flex items-center gap-3 px-4 py-2"
              style={{ background: 'rgba(30,30,30,0.9)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="w-8 h-8 rounded overflow-hidden shrink-0">
                <img src={track.cover} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-white/80 truncate">{track.title}</div>
                <div className="text-[10px] text-white/40 truncate">{track.artist}</div>
              </div>
              <button onClick={prevTrack} className="text-white/50 text-[14px]">⏮</button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="text-white text-[16px]">
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button onClick={nextTrack} className="text-white/50 text-[14px]">⏭</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}