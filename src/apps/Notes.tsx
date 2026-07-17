'use client';

import { useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  folder: string;
}

const NOTES: Note[] = [
  {
    id: '1', title: 'macOS 27 Design Notes',
    content: 'Liquid Glass Design System\n\nKey principles:\n• Translucent surfaces that refract light\n• Dynamic blur based on content behind\n• Subtle noise texture for depth\n• System-wide consistency\n\nColor tokens:\n- Glass bg: rgba(255,255,255,0.15)\n- Glass border: rgba(255,255,255,0.2)\n- Blur radius: 40px',
    date: 'Today', folder: 'notes',
  },
  {
    id: '2', title: 'Sprint Planning Notes',
    content: 'Q3 2025 Sprint Goals\n\n1. Ship macOS Tahoe beta\n2. Complete Liquid Glass animations\n3. Apple Intelligence integration\n4. Performance optimization\n5. Accessibility audit\n\nBlockers:\n- GPU shader compilation time\n- Memory usage in glass effects',
    date: 'Yesterday', folder: 'notes',
  },
  {
    id: '3', title: 'Send brand review feedback',
    content: 'TODO: Send brand review feedback\n\nItems to review:\n- [ ] Logo variations\n- [ ] Color palette updates\n- [ ] Typography scale\n- [ ] Icon system\n\nDue: Today at 5:00 PM',
    date: 'Jun 17', folder: 'notes',
  },
  {
    id: '4', title: 'WWDC Session Ideas',
    content: 'Potential WWDC 2026 topics:\n\n• "Building with Liquid Glass"\n• "Performance in the Age of AI"\n• "The Future of Desktop Computing"\n• "Design Systems at Scale"',
    date: 'Jun 15', folder: 'notes',
  },
  {
    id: '5', title: 'Meeting Notes — Craig',
    content: 'Discussion about SwiftUI improvements:\n\n- New glass modifier\n- Improved animation API\n- Better state management\n- Reusable component library',
    date: 'Jun 14', folder: 'notes',
  },
];

export default function Notes() {
  const [selectedNote, setSelectedNote] = useState('1');
  const [notes, setNotes] = useState(NOTES);
  const [editingContent, setEditingContent] = useState(false);

  const selected = notes.find(n => n.id === selectedNote);

  const handleContentChange = (content: string) => {
    setNotes(prev => prev.map(n => n.id === selectedNote ? { ...n, content } : n));
  };

  return (
    <div className="flex h-full">
      {/* Note List */}
      <div
        className="w-[220px] shrink-0 flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="text-[15px] font-semibold text-white/90">All Notes</div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notes.map(note => (
            <button
              key={note.id}
              className={`w-full text-left px-3 py-2.5 transition-colors ${
                selectedNote === note.id ? 'bg-[#0058d0]' : 'hover:bg-white/6'
              }`}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              onClick={() => { setSelectedNote(note.id); setEditingContent(false); }}
            >
              <div className="text-[13px] font-medium text-white/90 mb-0.5">{note.title}</div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/40">{note.date}</span>
                <span className="text-[11px] text-white/30">{note.content.length} chars</span>
              </div>
              <div className="text-[11px] text-white/35 truncate mt-0.5">{note.content.split('\n')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {selected ? (
          <>
            <div className="px-4 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <input
                type="text"
                value={selected.title}
                onChange={e => setNotes(prev => prev.map(n => n.id === selectedNote ? { ...n, title: e.target.value } : n))}
                className="w-full bg-transparent text-[18px] font-semibold text-white/90 outline-none"
              />
            </div>
            <textarea
              value={selected.content}
              onChange={e => handleContentChange(e.target.value)}
              onFocus={() => setEditingContent(true)}
              onBlur={() => setEditingContent(false)}
              className="flex-1 p-4 bg-transparent text-[14px] text-white/70 leading-relaxed outline-none resize-none"
              style={{ userSelect: 'text' }}
            />
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