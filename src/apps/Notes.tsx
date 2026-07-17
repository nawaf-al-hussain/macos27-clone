'use client';

import { useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  preview: string;
  date: string;
  folder: string;
  pinned: boolean;
}

const NOTES: Note[] = [
  {
    id: '1', title: 'macOS 27 Design Notes', pinned: true, folder: 'Notes', date: 'Today',
    content: 'Liquid Glass Design System\n\nKey principles:\n• Translucent surfaces that refract light\n• Dynamic blur based on content behind\n• Subtle noise texture for depth\n• System-wide consistency\n\nColor tokens:\n- Glass bg: rgba(255,255,255,0.15)\n- Glass border: rgba(255,255,255,0.2)\n- Blur radius: 40px',
    preview: 'Liquid Glass Design System\n\nKey principles:\n• Translucent surfaces that refract...',
  },
  {
    id: '2', title: 'Team Standup Notes', pinned: false, folder: 'Notes', date: 'Today',
    content: 'Maya: brand refresh wraps 7/18\nSam: chess AI depth-2 is enough, ship it\nAction: me — Spotlight search redesign\nCarlos: new icons landing Friday\nPriya: accessibility audit done, 3 issues found',
    preview: 'Maya: brand refresh wraps 7/18 Sam: chess AI depth-2 is enough, ship it Action: me — Spotl...',
  },
  {
    id: '3', title: 'Sprint Planning Notes', pinned: false, folder: 'Work', date: 'Yesterday',
    content: 'Q3 2026 Sprint Goals\n\n1. Ship macOS Tahoe beta\n2. Complete Liquid Glass animations\n3. Apple Intelligence integration\n4. Performance optimization\n5. Accessibility audit',
    preview: 'Q3 2026 Sprint Goals\n\n1. Ship macOS Tahoe beta\n2. Complete Liquid Glass animations...',
  },
  {
    id: '4', title: 'WWDC Session Ideas', pinned: false, folder: 'Notes', date: 'Jul 15',
    content: 'Potential WWDC 2026 topics:\n\n• "Building with Liquid Glass"\n• "Performance in the Age of AI"\n• "The Future of Desktop Computing"\n• "Design Systems at Scale"',
    preview: 'Potential WWDC 2026 topics:\n\n• "Building with Liquid Glass"...',
  },
  {
    id: '5', title: 'Meeting Notes — Craig', pinned: false, folder: 'Work', date: 'Jul 14',
    content: 'Discussion about SwiftUI improvements:\n\n- New glass modifier\n- Improved animation API\n- Better state management\n- Reusable component library',
    preview: 'Discussion about SwiftUI improvements:\n\n- New glass modifier...',
  },
];

const FOLDERS = [
  { group: 'iCloud', items: [
    { name: 'Notes', count: 3 },
    { name: 'Work', count: 2 },
  ]},
  { group: 'On My Mac', items: [
    { name: 'Local', count: 0 },
  ]},
];

const TAGS = ['work', 'personal', 'ideas'];

export default function Notes() {
  const [selectedNote, setSelectedNote] = useState('1');
  const [activeFolder, setActiveFolder] = useState('Notes');

  const selected = NOTES.find(n => n.id === selectedNote);

  const pinnedNotes = NOTES.filter(n => n.pinned);
  const unpinnedNotes = NOTES.filter(n => !n.pinned);
  const visibleNotes = activeFolder === 'Notes'
    ? NOTES
    : NOTES.filter(n => n.folder === activeFolder);
  const visiblePinned = visibleNotes.filter(n => n.pinned);
  const visibleUnpinned = visibleNotes.filter(n => !n.pinned);

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
        {/* Folders */}
        <div className="flex-1 overflow-y-auto py-2 px-2">
          {FOLDERS.map(group => (
            <div key={group.group} className="mb-2">
              <div className="px-2 py-1 text-[11px] font-semibold text-white/30 uppercase tracking-wider">
                {group.group}
              </div>
              {group.items.map(folder => (
                <button
                  key={folder.name}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-left transition-colors ${
                    activeFolder === folder.name ? 'bg-white/12 text-white' : 'text-white/60 hover:bg-white/6'
                  }`}
                  onClick={() => setActiveFolder(folder.name)}
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h4l1.5 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                  </svg>
                  <span className="flex-1">{folder.name}</span>
                  {folder.count > 0 && (
                    <span className="text-[11px] text-white/25">{folder.count}</span>
                  )}
                </button>
              ))}
            </div>
          ))}

          {/* Tags */}
          <div className="mt-2">
            <div className="px-2 py-1 text-[11px] font-semibold text-white/30 uppercase tracking-wider">
              Tags
            </div>
            {TAGS.map(tag => (
              <div
                key={tag}
                className="flex items-center gap-2 px-2 py-1 rounded-md text-[12px] text-white/40 hover:bg-white/6 cursor-pointer transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-orange-400/60" />
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Search + New Note */}
        <div className="px-2 py-2 space-y-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search all notes"
              className="flex-1 bg-transparent text-[11px] text-white/80 outline-none placeholder:text-white/25"
            />
          </div>
          <button className="w-full flex items-center gap-2 px-2 py-1 rounded-md text-[12px] text-white/60 hover:bg-white/10 transition-colors">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
              <rect x="2" y="2" width="10" height="10" rx="1.5" />
              <line x1="5" y1="5" x2="9" y2="5" />
              <line x1="5" y1="7" x2="9" y2="7" />
              <line x1="5" y1="9" x2="7.5" y2="9" />
            </svg>
            New Note
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div
        className="w-[220px] shrink-0 flex flex-col overflow-y-auto"
        style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Pinned */}
        {visiblePinned.length > 0 && (
          <>
            <div className="px-3 py-1.5">
              <span className="text-[11px] font-semibold text-white/35 uppercase tracking-wider">Pinned</span>
            </div>
            {visiblePinned.map(note => (
              <button
                key={note.id}
                className={`w-full text-left px-3 py-2.5 transition-colors ${
                  selectedNote === note.id ? 'bg-[#0058d0]' : 'hover:bg-white/6'
                }`}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                onClick={() => setSelectedNote(note.id)}
              >
                <div className="text-[13px] font-medium text-white/90 mb-0.5">{note.title}</div>
                <div className="text-[11px] text-white/35">{note.date}</div>
                <div className="text-[11px] text-white/30 truncate mt-0.5 leading-snug">{note.preview.split('\n')[0]}</div>
              </button>
            ))}
          </>
        )}

        {/* Unpinned */}
        <div className="px-3 py-1.5">
          <span className="text-[11px] font-semibold text-white/35 uppercase tracking-wider">Notes</span>
        </div>
        {visibleUnpinned.map(note => (
          <button
            key={note.id}
            className={`w-full text-left px-3 py-2.5 transition-colors ${
              selectedNote === note.id ? 'bg-[#0058d0]' : 'hover:bg-white/6'
            }`}
            style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
            onClick={() => setSelectedNote(note.id)}
          >
            <div className="text-[13px] font-medium text-white/90 mb-0.5">{note.title}</div>
            <div className="text-[11px] text-white/35">{note.date}</div>
            <div className="text-[11px] text-white/30 truncate mt-0.5 leading-snug">{note.preview.split('\n')[0]}</div>
          </button>
        ))}

        {/* New Note button at bottom */}
        <div className="mt-auto p-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-[12px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="7" y1="2" x2="7" y2="12" />
              <line x1="2" y1="7" x2="12" y2="7" />
            </svg>
            New Note
          </button>
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {selected ? (
          <>
            {/* Title */}
            <div className="px-4 pt-4 pb-1">
              <div className="text-[20px] font-semibold text-white/90">{selected.title}</div>
              <div className="text-[11px] text-white/30 mt-0.5">{selected.date}</div>
            </div>

            {/* Formatting Toolbar */}
            <div
              className="flex items-center gap-0.5 px-3 py-1.5 mx-3 mt-1 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Body (disabled) */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/20 cursor-default" disabled>Body</button>
              <div className="w-px h-3.5 bg-white/10 mx-0.5" />
              {/* Bold */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors font-bold">B</button>
              {/* Italic */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors italic">I</button>
              {/* Underline */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors underline">U</button>
              {/* Strikethrough */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors line-through">S</button>
              <div className="w-px h-3.5 bg-white/10 mx-0.5" />
              {/* Checklist */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors">☐</button>
              {/* Bulleted list */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors">•≡</button>
              {/* Dashed list */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors">-≡</button>
              {/* Numbered list */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors">1.</button>
              {/* Block quote */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors">❝</button>
              {/* Table */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors">⊞</button>
              {/* Link */}
              <button className="px-1.5 py-1 rounded text-[10px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors">🔗</button>
              {/* Highlight */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors">🖍</button>
              <div className="w-px h-3.5 bg-white/10 mx-0.5" />
              {/* Markdown */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors">⇧⌘E</button>
              {/* Delete */}
              <button className="px-1.5 py-1 rounded text-[11px] text-red-400/50 hover:bg-red-500/10 hover:text-red-400 transition-colors">🗑</button>
              {/* New Note */}
              <button className="px-1.5 py-1 rounded text-[11px] text-white/50 hover:bg-white/8 hover:text-white/70 transition-colors">⌘N</button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <div className="text-[14px] text-white/70 leading-relaxed whitespace-pre-line" style={{ userSelect: 'text' }}>
                {selected.content}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/30 text-[14px]">
            Select a note
          </div>
        )}
      </div>
    </div>
  );
}