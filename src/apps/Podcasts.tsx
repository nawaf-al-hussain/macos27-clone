'use client';

import { useState } from 'react';

const PODCAST_EPISODES = [
  { title: 'The Future of AI', show: 'Tech Today', duration: '45 min', date: 'Jun 18' },
  { title: 'Design Systems at Scale', show: 'Design Details', duration: '38 min', date: 'Jun 17' },
  { title: 'Building for Apple Silicon', show: 'Core Intuition', duration: '52 min', date: 'Jun 16' },
  { title: 'WWDC 2025 Recap', show: 'Mac Power Users', duration: '1h 12min', date: 'Jun 15' },
  { title: 'The Art of Minimalism', show: 'Creative Pep Talk', duration: '29 min', date: 'Jun 14' },
];

export default function Podcasts() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-[22px] font-semibold text-white/90 mb-4">Up Next</h2>
        <div className="space-y-2">
          {PODCAST_EPISODES.map((ep, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
                selected === i ? 'bg-white/10' : 'hover:bg-white/6'
              }`}
              onClick={() => setSelected(i)}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[24px] shrink-0">
                🎙
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium text-white/90">{ep.title}</div>
                <div className="text-[12px] text-white/50">{ep.show}</div>
                <div className="text-[11px] text-white/30 mt-0.5">{ep.date} • {ep.duration}</div>
              </div>
              <div className="text-[20px] text-white/40">{selected === i ? '⏸' : '▶'}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}