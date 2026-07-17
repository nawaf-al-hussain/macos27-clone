'use client';

import { useState } from 'react';

interface FinderItem {
  name: string;
  kind: string;
  date: string;
  size: string;
  icon: string;
}

const SIDEBAR_ITEMS = [
  { section: 'Favorites', items: [
    { id: 'recents', name: 'Recents', icon: '🕐' },
    { id: 'airdrop', name: 'AirDrop', icon: '📡' },
    { id: 'applications', name: 'Applications', icon: '📱' },
    { id: 'desktop', name: 'Desktop', icon: '🖥' },
    { id: 'documents', name: 'Documents', icon: '📁' },
    { id: 'downloads', name: 'Downloads', icon: '⬇' },
    { id: 'icloud', name: 'iCloud Drive', icon: '☁' },
  ]},
  { section: 'Tags', items: [
    { id: 'red', name: 'Red', icon: '🔴' },
    { id: 'blue', name: 'Blue', icon: '🔵' },
    { id: 'green', name: 'Green', icon: '🟢' },
  ]},
];

const FOLDER_CONTENTS: Record<string, FinderItem[]> = {
  recents: [
    { name: 'Project Proposal.docx', kind: 'Document', date: 'Today, 10:32 AM', size: '245 KB', icon: '📄' },
    { name: 'screenshot-2025.png', kind: 'Image', date: 'Today, 9:15 AM', size: '1.2 MB', icon: '🖼' },
    { name: 'meeting-notes.md', kind: 'Markdown', date: 'Yesterday, 4:00 PM', size: '12 KB', icon: '📝' },
    { name: 'budget-2025.xlsx', kind: 'Spreadsheet', date: 'Yesterday, 2:30 PM', size: '89 KB', icon: '📊' },
    { name: 'presentation.key', kind: 'Presentation', date: 'Jun 18, 11:00 AM', size: '15.3 MB', icon: '📽' },
    { name: 'logo-final.svg', kind: 'Image', date: 'Jun 17, 3:45 PM', size: '48 KB', icon: '🖼' },
  ],
  applications: [
    { name: 'Safari.app', kind: 'Application', date: 'Jun 10, 2025', size: '124 MB', icon: '🧭' },
    { name: 'Messages.app', kind: 'Application', date: 'Jun 10, 2025', size: '89 MB', icon: '💬' },
    { name: 'Mail.app', kind: 'Application', date: 'Jun 10, 2025', size: '67 MB', icon: '✉' },
    { name: 'Maps.app', kind: 'Application', date: 'Jun 10, 2025', size: '234 MB', icon: '🗺' },
    { name: 'Photos.app', kind: 'Application', date: 'Jun 10, 2025', size: '312 MB', icon: '🌸' },
    { name: 'Music.app', kind: 'Application', date: 'Jun 10, 2025', size: '198 MB', icon: '♫' },
    { name: 'Calendar.app', kind: 'Application', date: 'Jun 10, 2025', size: '45 MB', icon: '📅' },
    { name: 'Notes.app', kind: 'Application', date: 'Jun 10, 2025', size: '34 MB', icon: '📝' },
    { name: 'Xcode.app', kind: 'Application', date: 'Jun 10, 2025', size: '2.4 GB', icon: '🔨' },
    { name: 'Terminal.app', kind: 'Application', date: 'Jun 10, 2025', size: '12 MB', icon: '⬛' },
  ],
  desktop: [
    { name: 'Screenshot 2025-06-19.png', kind: 'Image', date: 'Today, 8:00 AM', size: '2.1 MB', icon: '🖼' },
    { name: 'Todo.txt', kind: 'Text', date: 'Yesterday', size: '1 KB', icon: '📄' },
  ],
  documents: [
    { name: 'Work', kind: 'Folder', date: 'Jun 15, 2025', size: '--', icon: '📁' },
    { name: 'Personal', kind: 'Folder', date: 'Jun 12, 2025', size: '--', icon: '📁' },
    { name: 'Archive', kind: 'Folder', date: 'May 30, 2025', size: '--', icon: '📁' },
    { name: 'resume-2025.pdf', kind: 'PDF', date: 'Jun 18, 2025', size: '340 KB', icon: '📕' },
  ],
  downloads: [
    { name: 'macOS-Tahoe-Installer.dmg', kind: 'Disk Image', date: 'Today, 7:00 AM', size: '14.2 GB', icon: '💿' },
    { name: 'photo-batch.zip', kind: 'Archive', date: 'Yesterday', size: '245 MB', icon: '📦' },
    { name: 'annual-report.pdf', kind: 'PDF', date: 'Jun 16, 2025', size: '8.7 MB', icon: '📕' },
  ],
  airdrop: [],
  icloud: [
    { name: 'Documents', kind: 'Folder', date: 'Jun 15, 2025', size: '--', icon: '📁' },
    { name: 'Desktop', kind: 'Folder', date: 'Jun 19, 2025', size: '--', icon: '📁' },
  ],
  red: [
    { name: 'urgent-task.md', kind: 'Markdown', date: 'Today', size: '2 KB', icon: '🔴' },
  ],
  blue: [
    { name: 'project-blueprint.pdf', kind: 'PDF', date: 'Jun 15', size: '4.5 MB', icon: '📘' },
  ],
  green: [
    { name: 'approved-designs', kind: 'Folder', date: 'Jun 14', size: '--', icon: '🟢' },
  ],
};

type ViewMode = 'icon' | 'list' | 'column' | 'gallery';

export default function Finder() {
  const [selectedFolder, setSelectedFolder] = useState('recents');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const contents = FOLDER_CONTENTS[selectedFolder] || [];
  const filtered = searchQuery
    ? contents.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : contents;

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[180px] shrink-0 overflow-y-auto py-2 px-2"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {SIDEBAR_ITEMS.map(section => (
          <div key={section.section} className="mb-3">
            <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wide px-2 mb-1">
              {section.section}
            </div>
            {section.items.map(item => (
              <button
                key={item.id}
                className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-[13px] text-left transition-colors ${
                  selectedFolder === item.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
                }`}
                onClick={() => { setSelectedFolder(item.id); setSelectedItem(null); }}
              >
                <span className="text-[14px]">{item.icon}</span>
                <span className="truncate">{item.name}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-3 py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <button className="p-1 rounded hover:bg-white/10 text-white/40">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3L5 8l5 5"/></svg>
          </button>
          <button className="p-1 rounded hover:bg-white/10 text-white/40">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3l5 5-5 5"/></svg>
          </button>

          <div className="flex-1" />

          {/* View Mode Buttons */}
          <div className="flex items-center gap-0.5 bg-white/5 rounded-md p-0.5">
            {(['icon', 'list', 'column', 'gallery'] as ViewMode[]).map(mode => (
              <button
                key={mode}
                className={`px-1.5 py-0.5 rounded text-[11px] capitalize ${
                  viewMode === mode ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/60'
                }`}
                onClick={() => setViewMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 ml-2">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-[12px] text-white/80 outline-none w-[100px] placeholder:text-white/25"
            />
          </div>
        </div>

        {/* File List / Grid */}
        <div className="flex-1 overflow-y-auto p-3">
          {viewMode === 'list' ? (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-white/40 text-[11px] border-b border-white/8">
                  <th className="pb-1.5 font-medium">Name</th>
                  <th className="pb-1.5 font-medium w-[100px]">Date Modified</th>
                  <th className="pb-1.5 font-medium w-[70px]">Size</th>
                  <th className="pb-1.5 font-medium w-[80px]">Kind</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr
                    key={item.name}
                    className={`cursor-default ${selectedItem === item.name ? 'bg-[#0058d0] text-white' : 'text-white/80 hover:bg-white/6'}`}
                    onClick={() => setSelectedItem(item.name)}
                  >
                    <td className="py-1 flex items-center gap-2">
                      <span className="text-[16px]">{item.icon}</span>
                      {item.name}
                    </td>
                    <td className="py-1 text-white/50">{item.date}</td>
                    <td className="py-1 text-white/50">{item.size}</td>
                    <td className="py-1 text-white/50">{item.kind}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : viewMode === 'icon' ? (
            <div className="grid grid-cols-4 gap-4">
              {filtered.map(item => (
                <button
                  key={item.name}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg text-center ${selectedItem === item.name ? 'bg-[#0058d0]' : 'hover:bg-white/6'}`}
                  onClick={() => setSelectedItem(item.name)}
                >
                  <span className="text-[32px]">{item.icon}</span>
                  <span className="text-[11px] text-white/80 leading-tight line-clamp-2">{item.name}</span>
                </button>
              ))}
            </div>
          ) : viewMode === 'gallery' ? (
            <div className="grid grid-cols-3 gap-3">
              {filtered.map(item => (
                <div
                  key={item.name}
                  className={`rounded-lg overflow-hidden ${selectedItem === item.name ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedItem(item.name)}
                >
                  <div className="h-24 bg-white/5 flex items-center justify-center text-[40px]">
                    {item.icon}
                  </div>
                  <div className="p-2 text-[12px] text-white/80 truncate">{item.name}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[13px] text-white/40 p-4">Column view</div>
          )}

          {filtered.length === 0 && (
            <div className="text-center text-white/30 text-[14px] mt-12">
              This folder is empty
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-3 py-1 text-[11px] text-white/40" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span>{filtered.length} items</span>
          <span>Available: 487.3 GB</span>
        </div>
      </div>
    </div>
  );
}