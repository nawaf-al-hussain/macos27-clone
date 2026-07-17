'use client';

import { useState } from 'react';

const GAMES = [
  {
    name: 'Chess',
    description: 'Classic, three difficulties',
    lastPlayed: null,
    gradient: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    emoji: '♟️',
  },
  {
    name: 'Nebula Drift',
    description: 'Anti-gravity racing',
    lastPlayed: '2 days ago',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
    emoji: '🏎️',
  },
  {
    name: 'Emberfall Tactics',
    description: 'Turn-based strategy',
    lastPlayed: null,
    gradient: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
    emoji: '⚔️',
  },
  {
    name: 'Puzzle Grove',
    description: 'Relaxing match-and-grow',
    lastPlayed: '5 days ago',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    emoji: '🧩',
  },
  {
    name: 'Starforge TD',
    description: 'Tower defense in orbit',
    lastPlayed: null,
    gradient: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
    emoji: '🛡️',
  },
  {
    name: 'Midnight Kart',
    description: 'Neon street racing',
    lastPlayed: null,
    gradient: 'linear-gradient(135deg, #e11d48 0%, #f59e0b 100%)',
    emoji: '🏁',
  },
  {
    name: 'Aqua Depths',
    description: 'Deep-sea exploration',
    lastPlayed: null,
    gradient: 'linear-gradient(135deg, #0e7490 0%, #0d9488 100%)',
    emoji: '🐠',
  },
];

const PLAY_TOGETHER = [
  {
    name: 'Maya',
    initial: 'M',
    color: '#a855f7',
    challenge: 'Chess: win 3 games this week',
  },
  {
    name: 'Leo',
    initial: 'L',
    color: '#3b82f6',
    challenge: 'Nebula Drift: beat 1:42 on Solar Loop',
  },
  {
    name: 'Ana',
    initial: 'A',
    color: '#10b981',
    challenge: 'Puzzle Grove: grow 50 blossoms',
  },
];

export default function Games() {
  const [activeTab, setActiveTab] = useState('library');

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[160px] shrink-0 py-2 px-2"
        style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {[
          { id: 'library', label: 'Library' },
          { id: 'arcade', label: 'Arcade' },
          { id: 'store', label: 'Store' },
        ].map(tab => (
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
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-5">
        <h1 className="text-[24px] font-bold text-white/90 mb-5">Library</h1>

        {/* Games Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {GAMES.map((game, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden hover:bg-white/4 transition-colors group cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Game icon */}
              <div
                className="h-28 flex items-center justify-center relative"
                style={{ background: game.gradient }}
              >
                <span className="text-[40px]">{game.emoji}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 rounded-full bg-white/90 text-[11px] font-medium text-black">
                    Play
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="text-[13px] font-medium text-white/85">{game.name}</div>
                <div className="text-[11px] text-white/40 mt-0.5">{game.description}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-white/30">
                    {game.lastPlayed ? `Last played ${game.lastPlayed}` : 'Never played'}
                  </span>
                  <button className="px-3 py-0.5 rounded-full bg-blue-500/80 hover:bg-blue-500 text-[11px] text-white font-medium transition-colors">
                    Play
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Play Together */}
        <div>
          <h2 className="text-[16px] font-semibold text-white/85 mb-3">Play Together</h2>
          <div className="space-y-2">
            {PLAY_TOGETHER.map((person, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-[14px] font-semibold text-white"
                  style={{ background: person.color }}
                >
                  {person.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-white/80">{person.name}</div>
                  <div className="text-[11px] text-white/40">{person.challenge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}