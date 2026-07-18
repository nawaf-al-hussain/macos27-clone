'use client';

import { useState } from 'react';

type ViewMode = 'icon' | 'list' | 'column' | 'gallery';

interface FinderItem {
  name: string;
  kind: string;
  date: string;
  size: string;
  badge: string;
  badgeColor: string;
}

const FOLDER_CONTENTS: Record<string, FinderItem[]> = {
  recents: [
    { name: 'Project Proposal.docx', kind: 'Document', date: 'Today, 10:32 AM', size: '245 KB', badge: 'DOCX', badgeColor: '#2b5797' },
    { name: 'screenshot-2025.png', kind: 'Image', date: 'Today, 9:15 AM', size: '1.2 MB', badge: 'PNG', badgeColor: '#7b2d8b' },
    { name: 'meeting-notes.md', kind: 'Markdown', date: 'Yesterday, 4:00 PM', size: '12 KB', badge: 'MD', badgeColor: '#519aba' },
  ],
  airdrop: [],
  applications: [
    { name: 'Safari.app', kind: 'Application', date: 'Jun 10, 2025', size: '124 MB', badge: 'APP', badgeColor: '#0070c9' },
    { name: 'Messages.app', kind: 'Application', date: 'Jun 10, 2025', size: '89 MB', badge: 'APP', badgeColor: '#34c759' },
    { name: 'Mail.app', kind: 'Application', date: 'Jun 10, 2025', size: '67 MB', badge: 'APP', badgeColor: '#0070c9' },
    { name: 'Maps.app', kind: 'Application', date: 'Jun 10, 2025', size: '234 MB', badge: 'APP', badgeColor: '#34c759' },
    { name: 'Photos.app', kind: 'Application', date: 'Jun 10, 2025', size: '312 MB', badge: 'APP', badgeColor: '#ff9500' },
  ],
  desktop: [
    { name: 'Screenshot 2025-06-19.png', kind: 'Image', date: 'Today, 8:00 AM', size: '2.1 MB', badge: 'PNG', badgeColor: '#7b2d8b' },
    { name: 'Todo.txt', kind: 'Text', date: 'Yesterday', size: '1 KB', badge: 'TXT', badgeColor: '#8e8e93' },
  ],
  documents: [
    { name: 'Project Notes.txt', kind: 'Text', date: 'Today, 3:45 PM', size: '4 KB', badge: 'TXT', badgeColor: '#8e8e93' },
    { name: 'Q3 Plan.txt', kind: 'Text', date: 'Today, 1:22 PM', size: '12 KB', badge: 'TXT', badgeColor: '#8e8e93' },
    { name: 'Reading List.md', kind: 'Markdown', date: 'Yesterday, 9:10 AM', size: '6 KB', badge: 'MD', badgeColor: '#519aba' },
  ],
  downloads: [
    { name: 'macOS-Tahoe-Installer.dmg', kind: 'Disk Image', date: 'Today, 7:00 AM', size: '14.2 GB', badge: 'DMG', badgeColor: '#8e8e93' },
    { name: 'photo-batch.zip', kind: 'Archive', date: 'Yesterday', size: '245 MB', badge: 'ZIP', badgeColor: '#8e8e93' },
    { name: 'annual-report.pdf', kind: 'PDF', date: 'Jun 16, 2025', size: '8.7 MB', badge: 'PDF', badgeColor: '#e74c3c' },
  ],
  icloud: [
    { name: 'Documents', kind: 'Folder', date: 'Jun 15, 2025', size: '--', badge: '', badgeColor: '' },
    { name: 'Desktop', kind: 'Folder', date: 'Jun 19, 2025', size: '--', badge: '', badgeColor: '' },
  ],
};

const SIDEBAR_FAVORITES = [
  { id: 'recents', name: 'Recents', icon: 'clock' },
  { id: 'airdrop', name: 'AirDrop', icon: 'airdrop' },
  { id: 'applications', name: 'Applications', icon: 'applications' },
  { id: 'desktop', name: 'Desktop', icon: 'desktop' },
  { id: 'documents', name: 'Documents', icon: 'documents' },
  { id: 'downloads', name: 'Downloads', icon: 'downloads' },
  { id: 'icloud', name: 'iCloud Drive', icon: 'icloud' },
];

const SIDEBAR_LOCATIONS = [
  { id: 'macbook', name: 'MacBook', icon: 'macbook' },
  { id: 'icloud-loc', name: 'iCloud', icon: 'icloud' },
  { id: 'network', name: 'Network', icon: 'network' },
];

const TAG_COLORS = [
  { id: 'red', color: '#ff453a', name: 'Red' },
  { id: 'orange', color: '#ff9f0a', name: 'Orange' },
  { id: 'yellow', color: '#ffd60a', name: 'Yellow' },
  { id: 'green', color: '#30d158', name: 'Green' },
  { id: 'blue', color: '#0a84ff', name: 'Blue' },
  { id: 'purple', color: '#bf5af2', name: 'Purple' },
  { id: 'gray', color: '#8e8e93', name: 'Gray' },
];

function SidebarIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'clock':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-white/60">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M8 4.5V8L10.5 9.5" strokeLinecap="round" />
        </svg>
      );
    case 'airdrop':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-blue-400">
          <path d="M8 2L3 7.5h3.5L5 12l6-6H7.5L8 2z" strokeLinejoin="round" />
        </svg>
      );
    case 'applications':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/60">
          <rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="rgba(255,255,255,0.15)" />
          <rect x="9.5" y="1" width="5.5" height="5.5" rx="1" fill="rgba(255,255,255,0.15)" />
          <rect x="1" y="9.5" width="5.5" height="5.5" rx="1" fill="rgba(255,255,255,0.15)" />
          <rect x="9.5" y="9.5" width="5.5" height="5.5" rx="1" fill="rgba(255,255,255,0.15)" />
        </svg>
      );
    case 'desktop':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/60">
          <rect x="1.5" y="2" width="13" height="8.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5.5 12.5h5M8 10.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'documents':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-400">
          <path d="M4 2h5l3 3v9a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );
    case 'downloads':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-white/60">
          <path d="M8 2v8M5 7l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" strokeLinecap="round" />
        </svg>
      );
    case 'icloud':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-sky-400">
          <path d="M4 11.5a3 3 0 01-.5-5.96A4.5 4.5 0 0112.5 7a3 3 0 01-.5 4.5H4z" fill="rgba(56,189,248,0.15)" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case 'macbook':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/60">
          <rect x="2" y="2" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <path d="M0.5 12.5h15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'network':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/60">
          <circle cx="8" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="3" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="13" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6.5 4.5L4 8.5M9.5 4.5L12 8.5M4.5 10v2.5M11.5 10v2.5M6 12.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function FileIcon({ item, size = 64 }: { item: FinderItem; size?: number }) {
  const iconScale = size / 64;
  if (item.kind === 'Folder') {
    return (
      <div style={{ width: size, height: size * 0.85 }} className="flex flex-col items-center justify-end">
        <div
          style={{
            width: size * 0.82,
            height: size * 0.28,
            background: 'linear-gradient(180deg, #5ac8fa 0%, #007aff 100%)',
            borderRadius: `${4 * iconScale}px ${4 * iconScale}px ${2 * iconScale}px ${2 * iconScale}px`,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -size * 0.12,
              left: 0,
              width: size * 0.4,
              height: size * 0.14,
              background: 'linear-gradient(180deg, #5ac8fa 0%, #007aff 100%)',
              borderRadius: `${3 * iconScale}px ${3 * iconScale}px 0 0`,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: size, height: size * 0.85 }} className="flex items-center justify-center relative">
      <div
        style={{
          width: size * 0.62,
          height: size * 0.78,
          background: 'rgba(255,255,255,0.08)',
          border: `1px solid rgba(255,255,255,0.15)`,
          borderRadius: `${2 * iconScale}px`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dog-ear */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: size * 0.18,
            height: size * 0.18,
            background: 'linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.04) 50%)',
          }}
        />
        {/* Badge */}
        {item.badge && (
          <div
            style={{
              position: 'absolute',
              bottom: size * 0.06,
              left: '50%',
              transform: 'translateX(-50%)',
              background: item.badgeColor,
              borderRadius: `${3 * iconScale}px`,
              padding: `${1.5 * iconScale}px ${4 * iconScale}px`,
              fontSize: `${9 * iconScale}px`,
              fontWeight: 600,
              color: 'white',
              letterSpacing: `${0.3 * iconScale}px`,
              whiteSpace: 'nowrap',
            }}
          >
            {item.badge}
          </div>
        )}
        {/* Lines representing text */}
        <div style={{ position: 'absolute', top: size * 0.18, left: size * 0.1, right: size * 0.1 }}>
          <div style={{ height: 1.5 * iconScale, background: 'rgba(255,255,255,0.12)', borderRadius: 1, marginBottom: 4 * iconScale, width: '85%' }} />
          <div style={{ height: 1.5 * iconScale, background: 'rgba(255,255,255,0.08)', borderRadius: 1, marginBottom: 4 * iconScale, width: '70%' }} />
          <div style={{ height: 1.5 * iconScale, background: 'rgba(255,255,255,0.08)', borderRadius: 1, width: '60%' }} />
        </div>
      </div>
    </div>
  );
}

export default function Finder() {
  const [selectedFolder, setSelectedFolder] = useState('documents');
  const [viewMode, setViewMode] = useState<ViewMode>('icon');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [iconSize, setIconSize] = useState(64);

  const contents = FOLDER_CONTENTS[selectedFolder] || [];
  const filtered = searchQuery
    ? contents.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : contents;

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[180px] shrink-0 overflow-y-auto py-1.5"
        style={{
          background: 'rgba(255,255,255,0.03)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Favorites */}
        <div className="mb-1">
          <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wider px-4 mb-0.5">
            Favorites
          </div>
          {SIDEBAR_FAVORITES.map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-[7px] px-3 py-[3px] text-[13px] text-left transition-colors ${
                selectedFolder === item.id
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/70 hover:bg-white/5'
              }`}
              onClick={() => { setSelectedFolder(item.id); setSelectedItem(null); }}
            >
              <SidebarIcon icon={item.icon} />
              <span className="truncate">{item.name}</span>
            </button>
          ))}
        </div>

        {/* Locations */}
        <div className="mb-1 mt-2">
          <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wider px-4 mb-0.5">
            Locations
          </div>
          {SIDEBAR_LOCATIONS.map(item => (
            <button
              key={item.id}
              className="w-full flex items-center gap-[7px] px-3 py-[3px] text-[13px] text-left text-white/70 hover:bg-white/5 transition-colors"
            >
              <SidebarIcon icon={item.icon} />
              <span className="truncate">{item.name}</span>
            </button>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-2">
          <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wider px-4 mb-0.5">
            Tags
          </div>
          {TAG_COLORS.map(tag => (
            <button
              key={tag.id}
              className="w-full flex items-center gap-[7px] px-3 py-[3px] text-[13px] text-left text-white/70 hover:bg-white/5 transition-colors"
            >
              <div
                className="w-[12px] h-[12px] rounded-sm shrink-0"
                style={{ background: tag.color }}
              />
              <span className="truncate">{tag.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div
          className="flex items-center gap-1.5 px-2 py-[5px] shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Back button (disabled) */}
          <button className="p-1.5 rounded-md text-white/20 cursor-default" disabled>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Forward button (disabled) */}
          <button className="p-1.5 rounded-md text-white/20 cursor-default" disabled>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="w-px h-4 bg-white/8 mx-1" />

          {/* View toggles */}
          <div className="flex items-center bg-white/5 rounded-md p-[2px]">
            {([
              { mode: 'icon' as ViewMode, label: 'Icon', path: 'M3 3h3v3H3zM8 3h3v3H8zM3 8h3v3H3zM8 8h3v3H8z' },
              { mode: 'list' as ViewMode, label: 'List', path: 'M2 4h10M2 7h10M2 10h10M0 2v1h12V2z' },
              { mode: 'column' as ViewMode, label: 'Column', path: 'M0 2h4v10H0zM5 2h4v10H5zM10 2h4v10h-4z' },
              { mode: 'gallery' as ViewMode, label: 'Gallery', path: 'M0 9l3-4 2.5 2L9 4l5 5v4H0z' },
            ]).map(v => (
              <button
                key={v.mode}
                title={v.label}
                className={`p-1.5 rounded-[4px] transition-colors ${
                  viewMode === v.mode
                    ? 'bg-white/15 text-white/80'
                    : 'text-white/30 hover:text-white/50'
                }`}
                onClick={() => setViewMode(v.mode)}
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                  <path d={v.path} />
                </svg>
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Action (gear) */}
          <button className="p-1.5 rounded-md text-white/40 hover:bg-white/6 hover:text-white/60 transition-colors">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="8" cy="8" r="2.5" />
              <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3 3l1.5 1.5M11.5 11.5L13 13M13 3l-1.5 1.5M4.5 11.5L3 13" strokeLinecap="round" />
            </svg>
          </button>

          {/* Tags button */}
          <button className="px-2 py-1 rounded-md text-[12px] text-white/40 hover:bg-white/6 hover:text-white/60 transition-colors">
            Tags…
          </button>

          {/* Share button */}
          <button className="px-2 py-1 rounded-md text-[12px] text-white/40 hover:bg-white/6 hover:text-white/60 transition-colors">
            Share…
          </button>

          <div className="w-px h-4 bg-white/8 mx-0.5" />

          {/* Search */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-[12px] text-white/80 outline-none w-[80px] placeholder:text-white/25"
            />
          </div>
        </div>

        {/* File Content Area */}
        <div className="flex-1 overflow-y-auto p-3">
          {viewMode === 'icon' ? (
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${iconSize + 20}px, 1fr))`,
              }}
            >
              {filtered.map(item => (
                <button
                  key={item.name}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg text-center transition-colors ${
                    selectedItem === item.name ? 'bg-[#0058d0]/60' : 'hover:bg-white/6'
                  }`}
                  onClick={() => setSelectedItem(item.name)}
                >
                  <FileIcon item={item} size={iconSize} />
                  <span
                    className="text-[11px] text-white/80 leading-tight max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-1"
                  >
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          ) : viewMode === 'list' ? (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-white/40 text-[11px]" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th className="pb-1.5 font-medium">Name</th>
                  <th className="pb-1.5 font-medium w-[130px]">Date Modified</th>
                  <th className="pb-1.5 font-medium w-[70px]">Size</th>
                  <th className="pb-1.5 font-medium w-[90px]">Kind</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr
                    key={item.name}
                    className={`cursor-default transition-colors ${
                      selectedItem === item.name
                        ? 'bg-[#0058d0] text-white'
                        : 'text-white/80 hover:bg-white/6'
                    }`}
                    onClick={() => setSelectedItem(item.name)}
                  >
                    <td className="py-[5px] pr-3">
                      <div className="flex items-center gap-2">
                        <FileIcon item={item} size={20} />
                        <span className="truncate">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-[5px] text-white/50 text-[12px]">{item.date}</td>
                    <td className="py-[5px] text-white/50 text-[12px]">{item.size}</td>
                    <td className="py-[5px] text-white/50 text-[12px]">{item.kind}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : viewMode === 'column' ? (
            <div className="flex h-full">
              {/* Column 1: items */}
              <div className="w-[180px] overflow-y-auto shrink-0" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                {filtered.map(item => (
                  <button
                    key={item.name}
                    className={`w-full text-left px-3 py-[4px] text-[13px] flex items-center gap-2 transition-colors ${
                      selectedItem === item.name ? 'bg-[#0058d0] text-white' : 'text-white/80 hover:bg-white/6'
                    }`}
                    onClick={() => setSelectedItem(item.name)}
                  >
                    <FileIcon item={item} size={20} />
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
              </div>
              {/* Column 2: preview */}
              <div className="flex-1 p-4">
                {selectedItem ? (
                  <div>
                    <FileIcon item={filtered.find(i => i.name === selectedItem) || filtered[0]} size={64} />
                    <div className="mt-3">
                      <div className="text-[13px] font-medium text-white/90">{selectedItem}</div>
                      <div className="text-[11px] text-white/40 mt-1">
                        {filtered.find(i => i.name === selectedItem)?.kind}
                      </div>
                      <div className="text-[11px] text-white/40 mt-0.5">
                        {filtered.find(i => i.name === selectedItem)?.size}
                      </div>
                      <div className="text-[11px] text-white/40 mt-0.5">
                        Modified: {filtered.find(i => i.name === selectedItem)?.date}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-[13px] text-white/30">Select an item</div>
                )}
              </div>
            </div>
          ) : viewMode === 'gallery' ? (
            <div className="grid grid-cols-3 gap-3">
              {filtered.map(item => (
                <div
                  key={item.name}
                  className={`rounded-lg overflow-hidden cursor-default transition-colors ${
                    selectedItem === item.name ? 'ring-2 ring-blue-500/60' : 'hover:bg-white/6'
                  }`}
                  onClick={() => setSelectedItem(item.name)}
                >
                  <div className="h-28 bg-white/5 flex items-center justify-center">
                    <FileIcon item={item} size={56} />
                  </div>
                  <div className="p-2 text-[12px] text-white/80 truncate">{item.name}</div>
                </div>
              ))}
            </div>
          ) : null}

          {filtered.length === 0 && (
            <div className="text-center text-white/30 text-[14px] mt-12">
              This folder is empty
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div
          className="flex items-center justify-between px-3 py-[3px] text-[11px] text-white/40 shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span>{filtered.length} items, 214.3 GB available</span>
          <div className="flex items-center gap-2">
            <span>Icon size</span>
            <input
              type="range"
              min="32"
              max="96"
              value={iconSize}
              onChange={e => setIconSize(Number(e.target.value))}
              className="w-[80px] h-[3px] appearance-none bg-white/10 rounded-full outline-none
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white/70"
            />
          </div>
        </div>
      </div>
    </div>
  );
}