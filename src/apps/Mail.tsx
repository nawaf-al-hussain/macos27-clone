'use client';

import { useState } from 'react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  folder: string;
  body: string;
}

const EMAILS: Email[] = [
  {
    id: '1', from: 'Apple Developer', subject: 'WWDC 2025 Session Videos Now Available',
    preview: 'Watch the latest sessions from WWDC 2025, including deep dives into macOS Tahoe...',
    date: 'Today', read: false, folder: 'inbox',
    body: 'Dear Developer,\n\nAll session videos from WWDC 2025 are now available on developer.apple.com. Highlights include:\n\n• What\'s new in macOS Tahoe\n• Designing with Liquid Glass\n• Building for Apple Intelligence\n• SwiftUI 6.0 workshop\n\nWe can\'t wait to see what you build!\n\nThe Apple Developer Team'
  },
  {
    id: '2', from: 'Tim Cook', subject: 'MacBook Pro M5 Ultra — First Look',
    preview: 'I wanted to share some incredible performance numbers from our latest chip...',
    date: 'Today', read: false, folder: 'inbox',
    body: 'Hey,\n\nI wanted to share some incredible performance numbers from our latest chip. The M5 Ultra is truly a marvel of engineering — 40-core CPU, 80-core GPU, and 192GB unified memory.\n\nThe benchmarks are blowing everyone away. Can\'t wait for you to try it.\n\nBest,\nTim'
  },
  {
    id: '3', from: 'GitHub', subject: '[apple/macos-tahoe] New pull request',
    preview: 'crafterd opened a PR: Implement Liquid Glass animation system (#4821)...',
    date: 'Yesterday', read: true, folder: 'inbox',
    body: 'crafterd opened a pull request in apple/macos-tahoe\n\n#4821 Implement Liquid Glass animation system\n\nThis PR adds the new Liquid Glass animation system with:\n- SVG filter-based refraction\n- Smooth transitions\n- Per-component blur controls\n\nReview requested from: @craigfederighi'
  },
  {
    id: '4', from: 'App Store Connect', subject: 'Your app has been approved',
    preview: 'Great news! Your app "macOS 27 Simulator" has been approved for the App Store...',
    date: 'Yesterday', read: true, folder: 'inbox',
    body: 'Great news!\n\nYour app "macOS 27 Simulator" has been approved for distribution on the App Store. It will be available within 24 hours.\n\nVersion: 1.0\nBuild: 2025.06.19\n\nCongratulations!\nApp Store Review Team'
  },
  {
    id: '5', from: 'Jony Ive', subject: 'Re: Design System Review',
    preview: 'The new color palette is exceptional. The glass effects need one more pass...',
    date: 'Jun 17', read: true, folder: 'inbox',
    body: 'Hi,\n\nThe new color palette is exceptional. The glass effects need one more pass — I think we can push the blur radius just a touch more.\n\nLet\'s schedule a review for Thursday.\n\nBest,\nJony'
  },
  {
    id: '6', from: 'Apple Music', subject: 'Your Weekly Playlist is ready',
    preview: 'Discover new music based on your listening history. This week: electronic, ambient...',
    date: 'Jun 16', read: true, folder: 'inbox',
    body: 'Your personalized mix is ready!\n\nThis week\'s New Music Mix features:\n1. "Glass" — BT\n2. "Aurora" — Tycho\n3. "Liquid" — Bonobo\n4. "Crystalline" — Björk\n\nListen now on Apple Music.'
  },
];

const FOLDERS = [
  { id: 'inbox', name: 'Inbox', icon: '📥', count: 2 },
  { id: 'sent', name: 'Sent', icon: '📤', count: 0 },
  { id: 'drafts', name: 'Drafts', icon: '📝', count: 0 },
  { id: 'trash', name: 'Trash', icon: '🗑', count: 0 },
  { id: 'archive', name: 'Archive', icon: '📦', count: 0 },
];

export default function Mail() {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<string | null>('1');

  const folderEmails = EMAILS.filter(e => e.folder === selectedFolder);
  const selected = EMAILS.find(e => e.id === selectedEmail);

  return (
    <div className="flex h-full">
      {/* Folder Sidebar */}
      <div className="w-[140px] shrink-0 py-2 px-1.5 overflow-y-auto" style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        {FOLDERS.map(folder => (
          <button
            key={folder.id}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-left transition-colors ${
              selectedFolder === folder.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
            }`}
            onClick={() => { setSelectedFolder(folder.id); setSelectedEmail(null); }}
          >
            <span className="text-[14px]">{folder.icon}</span>
            <span className="flex-1">{folder.name}</span>
            {folder.count > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white">
                {folder.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Email List */}
      <div className="w-[280px] shrink-0 overflow-y-auto" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        {folderEmails.map(email => (
          <button
            key={email.id}
            className={`w-full text-left px-3 py-2.5 transition-colors ${
              selectedEmail === email.id ? 'bg-[#0058d0]' : 'hover:bg-white/6'
            }`}
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            onClick={() => setSelectedEmail(email.id)}
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className={`text-[13px] ${email.read ? 'text-white/60' : 'font-semibold text-white/90'}`}>{email.from}</span>
              <span className="text-[11px] text-white/35">{email.date}</span>
            </div>
            <div className={`text-[12px] ${email.read ? 'text-white/50' : 'font-medium text-white/80'} truncate`}>{email.subject}</div>
            <div className="text-[11px] text-white/40 truncate mt-0.5">{email.preview}</div>
          </button>
        ))}
        {folderEmails.length === 0 && (
          <div className="text-center text-white/30 text-[13px] mt-8">No messages</div>
        )}
      </div>

      {/* Email Detail */}
      <div className="flex-1 overflow-y-auto p-4">
        {selected ? (
          <>
            <div className="mb-4">
              <h2 className="text-[18px] font-semibold text-white/90 mb-2">{selected.subject}</h2>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[14px]">
                  {selected.from[0]}
                </div>
                <div>
                  <div className="text-[13px] font-medium text-white/80">{selected.from}</div>
                  <div className="text-[11px] text-white/40">{selected.date}</div>
                </div>
              </div>
            </div>
            <div className="text-[14px] text-white/70 leading-relaxed whitespace-pre-line">{selected.body}</div>
          </>
        ) : (
          <div className="text-center text-white/30 text-[14px] mt-12">Select a message</div>
        )}
      </div>
    </div>
  );
}