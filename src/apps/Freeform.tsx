'use client';

import { useState } from 'react';

const BOARDS = [
  { name: 'macOS 27 Brainstorm', items: 7, icon: '🧠' },
  { name: 'Tahoe Trip', items: 3, icon: '🏔️' },
];

const TOOL_BUTTONS = [
  { label: 'Select', shortcut: 'V', icon: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2l7 12H3l7-12" transform="rotate(0,8,8) translate(0,0)" />
      <line x1="3" y1="14" x2="3" y2="2" />
    </svg>
  )},
  { label: 'Sticky Note', shortcut: 'N', icon: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="12" height="12" rx="1" fill="rgba(255,200,0,0.2)" stroke="currentColor" />
      <line x1="5" y1="5" x2="11" y2="5" />
      <line x1="5" y1="7.5" x2="10" y2="7.5" />
      <line x1="5" y1="10" x2="8" y2="10" />
    </svg>
  )},
  { label: 'Text Box', shortcut: 'T', icon: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <text x="3" y="12" fontSize="11" fill="currentColor" fontFamily="system-ui" fontWeight="600">T</text>
    </svg>
  )},
  { label: 'Rectangle', shortcut: 'R', icon: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="12" height="10" rx="1" />
    </svg>
  )},
  { label: 'Ellipse', shortcut: 'O', icon: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <ellipse cx="8" cy="8" rx="6" ry="5" />
    </svg>
  )},
  { label: 'Arrow', shortcut: 'A', icon: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="13" x2="13" y2="3" />
      <polyline points="7,3 13,3 13,9" />
    </svg>
  )},
  { label: 'Pen', shortcut: 'P', icon: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2 2-8 8H4v-2L12 2z" />
    </svg>
  )},
];

export default function Freeform() {
  const [activeBoard, setActiveBoard] = useState('macOS 27 Brainstorm');
  const [activeTool, setActiveTool] = useState('Select');
  const [zoom, setZoom] = useState(100);

  const currentBoard = BOARDS.find(b => b.name === activeBoard);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[200px] shrink-0 flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* All Boards */}
        <div className="py-2 px-2">
          <div className="flex items-center justify-between px-2 py-1 mb-1">
            <span className="text-[11px] font-semibold text-white/30 uppercase tracking-wider">All Boards</span>
            <button className="text-white/25 hover:text-white/50 transition-colors">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="7" y1="2" x2="7" y2="12" />
                <line x1="2" y1="7" x2="12" y2="7" />
              </svg>
            </button>
          </div>
          {BOARDS.map(board => (
            <button
              key={board.name}
              className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-left transition-colors ${
                activeBoard === board.name ? 'bg-white/12 text-white' : 'text-white/60 hover:bg-white/6'
              }`}
              onClick={() => setActiveBoard(board.name)}
            >
              <span className="text-[16px]">{board.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium truncate">{board.name}</div>
                <div className="text-[10px] text-white/30">{board.items} items</div>
              </div>
            </button>
          ))}
        </div>

        {/* Recents */}
        <div className="py-2 px-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="px-2 py-1 mb-1">
            <span className="text-[11px] font-semibold text-white/30 uppercase tracking-wider">Recents</span>
          </div>
          {BOARDS.map(board => (
            <button
              key={`recent-${board.name}`}
              className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-left transition-colors ${
                activeBoard === board.name ? 'bg-white/12 text-white' : 'text-white/60 hover:bg-white/6'
              }`}
              onClick={() => setActiveBoard(board.name)}
            >
              <span className="text-[16px]">{board.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium truncate">{board.name}</div>
                <div className="text-[10px] text-white/30">{board.items} items</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Board Header + Toolbar */}
        <div
          className="flex items-center gap-1.5 px-3 py-2 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="text-[13px] font-medium text-white/80 mr-2">
            {currentBoard?.name} · {currentBoard?.items} items
          </div>

          <div className="w-px h-4 bg-white/10" />

          {/* Tool Buttons */}
          {TOOL_BUTTONS.map(tool => (
            <button
              key={tool.label}
              title={`${tool.label} (${tool.shortcut})`}
              className={`p-1.5 rounded-md transition-colors ${
                activeTool === tool.label
                  ? 'bg-white/15 text-white/80'
                  : 'text-white/40 hover:bg-white/8 hover:text-white/60'
              }`}
              onClick={() => setActiveTool(tool.label)}
            >
              {tool.icon}
            </button>
          ))}

          <div className="w-px h-4 bg-white/10 mx-0.5" />

          {/* Color swatch */}
          <button className="w-4 h-4 rounded-full bg-blue-500 border border-white/20 hover:scale-110 transition-transform" title="Pen/shape color" />
          <button className="w-4 h-4 rounded-full bg-white/80 border border-white/10 hover:scale-110 transition-transform" title="Pen/shape color" />
          <button className="w-4 h-4 rounded-full bg-red-500 border border-white/20 hover:scale-110 transition-transform" title="Pen/shape color" />

          {/* Width selector */}
          <div className="flex items-center gap-0.5 ml-1">
            {[1, 2, 3].map(w => (
              <button
                key={w}
                className="rounded-sm hover:bg-white/10 p-0.5 transition-colors"
                title={`Width ${w}`}
              >
                <div
                  className="rounded-full bg-white/50"
                  style={{ width: w * 3, height: w * 3 }}
                />
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Undo / Redo */}
          <button className="p-1.5 rounded-md text-white/40 hover:bg-white/8 hover:text-white/60 transition-colors" title="Undo (⌘Z)">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6,3 2,7 6,11" />
              <line x1="2" y1="7" x2="12" y2="7" />
            </svg>
          </button>
          <button className="p-1.5 rounded-md text-white/40 hover:bg-white/8 hover:text-white/60 transition-colors" title="Redo (⇧⌘Z)">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="10,3 14,7 10,11" />
              <line x1="14" y1="7" x2="4" y2="7" />
            </svg>
          </button>

          <div className="w-px h-4 bg-white/10 mx-0.5" />

          {/* Zoom */}
          <button
            className="px-1.5 py-1 rounded-md text-[11px] text-white/40 hover:bg-white/8 hover:text-white/60 transition-colors min-w-[36px] text-center"
            title="Zoom"
          >
            {zoom}%
          </button>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          {/* Empty canvas message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[16px] text-white/20 font-light">Add content to your board</div>
              <div className="text-[12px] text-white/15 mt-1">Use the toolbar above to add sticky notes, shapes, text, and more</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}