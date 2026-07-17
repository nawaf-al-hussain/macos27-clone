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
  starred: boolean;
}

const EMAILS: Email[] = [
  {
    id: '1', from: 'Maya Chen', subject: 'Q3 brand refresh — review Friday?',
    preview: 'Hi!',
    date: '7:52 PM', read: false, folder: 'inbox', starred: false,
    body: 'Hi!\n\nHope your evening is going well.\n\nI just wrapped up the Q3 brand refresh deck and wanted to see if you have time to review it before Friday\'s meeting. The main changes are:\n\n• Updated color palette with the new Liquid Glass tokens\n• Revised typography scale using SF Pro\n• New icon system with consistent stroke weights\n• Updated motion/animation guidelines\n\nLet me know if Friday works or if you\'d prefer to sync earlier.\n\nBest,\nMaya'
  },
  {
    id: '2', from: 'Apple', subject: 'Your receipt from the App Store',
    preview: 'Dear kimi,',
    date: '7:40 PM', read: false, folder: 'inbox', starred: false,
    body: 'Dear kimi,\n\nThis is a receipt for your purchase.\n\nItem: Bear — Notes & Writing\nPrice: $2.99\nDate: June 19, 2025\nOrder ID: MG2K8X9H4N\n\nIf you have any questions, please contact Apple Support.\n\nThanks,\nApple'
  },
  {
    id: '3', from: 'GitHub', subject: '[acos27] PR #142: Add genie minimize animation',
    preview: 'sam-okafor requested your review...',
    date: '6:00 PM', read: true, folder: 'inbox', starred: true,
    body: 'sam-okafor requested your review on pull request #142 in acos27/acos27\n\nAdd genie minimize animation\n\nThis PR implements the classic macOS genie minimize effect for the window manager:\n\n- Added GenieEffect component with configurable duration\n- SVG-based distortion mesh for smooth animation\n- Supports both genie and scale-down modes\n- Performance: 60fps on M-series chips\n\nFiles changed: 12\nAdditions: +847\nDeletions: -123\n\nReview the changes on GitHub.'
  },
  {
    id: '4', from: 'United Airlines', subject: 'Your trip to San Francisco is coming up',
    preview: 'Get ready for your trip, kimi.',
    date: '4:00 PM', read: true, folder: 'inbox', starred: false,
    body: 'Get ready for your trip, kimi.\n\n✈️ Flight Confirmation\n\nFlight: UA 1543\nFrom: SFO — San Francisco International\nTo: JFK — John F. Kennedy International\nDeparture: July 12, 2025 at 8:30 AM PT\nArrival: July 12, 2025 at 5:15 PM ET\nSeat: 14A (Window)\n\nCheck in online or via the United app starting 24 hours before departure.\n\nWe look forward to seeing you on board!'
  },
  {
    id: '5', from: 'Linda Harper', subject: 'Photos from the garden 🌻',
    preview: 'Hi sweetheart,',
    date: 'Yesterday', read: true, folder: 'inbox', starred: true,
    body: 'Hi sweetheart,\n\nThe sunflowers are finally blooming! I took some photos this morning and wanted to share them with you.\n\nThe garden is really coming along this year. The tomatoes should be ready in another week or two.\n\nCome visit soon and I\'ll send you home with a basket!\n\nLove,\nMom'
  },
  {
    id: '6', from: 'Linear', subject: 'KIM-88 was assigned to you',
    preview: 'KIM-88 · Spotlight clipboard pane',
    date: 'Yesterday', read: true, folder: 'inbox', starred: false,
    body: 'KIM-88 · Spotlight clipboard pane\n\nA new issue has been assigned to you:\n\nStatus: In Progress\nPriority: High\nProject: macOS 27 — Desktop\nAssignee: kimi\n\nDescription:\nImplement the clipboard history pane in Spotlight. Should show recent clipboard items (text, images, links) with quick-copy actions. Needs to respect clipboard privacy settings.\n\nDue: June 25, 2025'
  },
  {
    id: '7', from: 'Figma', subject: 'New comment in "Liquid Glass Explorations"',
    preview: 'Maya C. commented on a frame you own:',
    date: 'Yesterday', read: true, folder: 'inbox', starred: false,
    body: 'Maya C. commented on a frame you own:\n\n"Liquid Glass Explorations" → "Navigation Bar Variant C"\n\n"Love the blur radius here — this feels like the right balance. Can we try pushing the border opacity to 0.2 and see how it looks against a busy background? Also, the active tab indicator could use a subtle glow."\n\nView comment in Figma.'
  },
  {
    id: '8', from: 'Bank of America', subject: 'Your July statement is ready',
    preview: 'Your statement for account ••8821 is now available.',
    date: 'Wed', read: true, folder: 'inbox', starred: false,
    body: 'Your statement for account ••8821 is now available.\n\nAccount ending in 8821\nStatement period: June 1–30, 2025\n\nSummary:\n• Beginning balance: $4,230.00\n• Total deposits: +$8,450.00\n• Total withdrawals: -$3,120.00\n• Ending balance: $9,560.00\n\nLog in to online banking to view your full statement.\n\nBank of America'
  },
  {
    id: '9', from: 'Airbnb', subject: 'Your stay in Lake Tahoe is confirmed',
    preview: "You're all set, kimi!",
    date: 'Wed', read: true, folder: 'inbox', starred: false,
    body: "You're all set, kimi!\n\n🏡 Reservation Confirmed\n\nLake Tahoe Cabin with Lake View\nCheck-in: July 18, 2025 · 4:00 PM\nCheck-out: July 21, 2025 · 11:00 AM\nGuests: 2\nTotal: $894.00\n\nHost: Sarah M.\n\nYou'll receive check-in instructions 24 hours before your stay.\n\nEnjoy your trip!"
  },
  {
    id: '10', from: 'Sam Okafor', subject: 'Re: chess.js depth — benchmarks',
    preview: 'Numbers are in:',
    date: 'Tue', read: true, folder: 'inbox', starred: false,
    body: 'Numbers are in:\n\nDepth 4:  12ms avg (was 45ms before pruning)\nDepth 6:  85ms avg (was 320ms)\nDepth 8:  620ms avg (was 2.1s)\n\nThe alpha-beta pruning with move ordering made a huge difference. Transposition table hit rate is around 68% which is decent for now.\n\nThinking about adding iterative deepening next. Should help with time management in the UI.\n\nWant to pair on this tomorrow?'
  },
];

const MAILBOXES = [
  { id: 'inbox', name: 'Inbox', icon: 'inbox', count: 4 },
  { id: 'vip', name: 'VIP', icon: 'star', count: 0 },
  { id: 'flagged', name: 'Flagged', icon: 'flag', count: 2 },
  { id: 'drafts', name: 'Drafts', icon: 'drafts', count: 1 },
  { id: 'sent', name: 'Sent', icon: 'sent', count: 0 },
  { id: 'junk', name: 'Junk', icon: 'junk', count: 1 },
  { id: 'trash', name: 'Trash', icon: 'trash', count: 0 },
  { id: 'archive', name: 'Archive', icon: 'archive', count: 0 },
];

const ACCOUNTS = [
  { id: 'icloud', name: 'iCloud', email: 'kimi@icloud.com', icon: 'icloud' },
  { id: 'gmail', name: 'Gmail', email: 'offline', icon: 'gmail', offline: true },
];

function MailboxIcon({ icon }: { icon: string }) {
  const cls = "text-white/50";
  switch (icon) {
    case 'inbox':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={cls}>
          <path d="M2 3.5h12a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V4a.5.5 0 01.5-.5z" stroke="currentColor" strokeWidth="1.1" />
          <path d="M2 3.5l6 5 6-5" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      );
    case 'star':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={cls}>
          <path d="M8 1.5l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.2 4.4 12.5l.7-4L2.2 5.7l4-.6L8 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      );
    case 'flag':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={cls}>
          <path d="M3 2h7l-2 4 2 4H3V2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
          <path d="M3 2v12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case 'drafts':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={cls}>
          <path d="M11.5 1.5l3 3-8.5 8.5H3v-3l8.5-8.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      );
    case 'sent':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={cls}>
          <path d="M14.5 1.5L7 9M14.5 1.5L9.5 14.5L7 9M14.5 1.5L1.5 6.5L7 9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'junk':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={cls}>
          <path d="M2 4l3.5-1.5L8 5.5l2.5-3L14 4l-1.5 3.5L14 11l-3.5 1.5L8 9.5l-2.5 3L2 11l1.5-3.5L2 4z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      );
    case 'trash':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={cls}>
          <path d="M3 4.5h10M6 4.5V3a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v1.5M5 4.5v8a1 1 0 001 1h4a1 1 0 001-1v-8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case 'archive':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={cls}>
          <rect x="1.5" y="3" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.1" />
          <path d="M1.5 7h13" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      );
    case 'icloud':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-sky-400">
          <path d="M4 11.5a3 3 0 01-.5-5.96A4.5 4.5 0 0112.5 7a3 3 0 01-.5 4.5H4z" fill="rgba(56,189,248,0.15)" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      );
    case 'gmail':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-white/50">
          <rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.1" />
          <path d="M1.5 3.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Mail() {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const folderEmails = EMAILS.filter(e => e.folder === selectedFolder);
  const selected = EMAILS.find(e => e.id === selectedEmail);

  return (
    <div className="flex h-full">
      {/* Mailbox Sidebar */}
      <div
        className="w-[140px] shrink-0 overflow-y-auto py-1.5 px-1"
        style={{
          background: 'rgba(255,255,255,0.03)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* MAILBOXES Section */}
        <div className="mb-2">
          <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wider px-3 mb-0.5">
            MAILBOXES
          </div>
          {MAILBOXES.map(mailbox => (
            <button
              key={mailbox.id}
              className={`w-full flex items-center gap-[6px] px-2 py-[3px] rounded-md text-[13px] text-left transition-colors ${
                selectedFolder === mailbox.id ? 'bg-white/10 text-white font-medium' : 'text-white/60 hover:bg-white/5'
              }`}
              onClick={() => { setSelectedFolder(mailbox.id); setSelectedEmail(null); }}
            >
              <MailboxIcon icon={mailbox.icon} />
              <span className="flex-1 truncate">{mailbox.name}</span>
              {mailbox.count > 0 && (
                <span className="text-[11px] text-white/40 font-normal">{mailbox.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* ACCOUNTS Section */}
        <div className="mt-3">
          <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wider px-3 mb-0.5">
            ACCOUNTS
          </div>
          {ACCOUNTS.map(account => (
            <button
              key={account.id}
              className="w-full flex items-center gap-[6px] px-2 py-[3px] rounded-md text-[13px] text-left text-white/60 hover:bg-white/5 transition-colors"
            >
              <MailboxIcon icon={account.icon} />
              <div className="flex-1 min-w-0">
                <div className="truncate">{account.name}</div>
                <div className="text-[10px] text-white/30 truncate">{account.email}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Email List */}
      <div
        className="w-[300px] shrink-0 flex flex-col overflow-hidden"
        style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-3 py-[5px] shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button className="px-2 py-1 rounded-md text-[11px] text-white/40 hover:bg-white/6 hover:text-white/60 transition-colors shrink-0">
            Erase Junk…
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-[12px] text-white/80 outline-none w-[80px] placeholder:text-white/25"
            />
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {folderEmails.map(email => (
            <button
              key={email.id}
              className={`w-full text-left px-3 py-2.5 transition-colors ${
                selectedEmail === email.id ? 'bg-[#0058d0]' : 'hover:bg-white/5'
              }`}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              onClick={() => setSelectedEmail(email.id)}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className={`text-[13px] truncate ${email.read ? 'text-white/60' : 'font-semibold text-white/90'}`}>
                  {email.from}
                </span>
                <span className="text-[11px] text-white/35 shrink-0 ml-2">{email.date}</span>
              </div>
              <div className={`text-[12px] truncate ${email.read ? 'text-white/45' : 'font-medium text-white/75'}`}>
                {email.subject}
              </div>
              <div className="text-[11px] text-white/35 truncate mt-0.5">{email.preview}</div>
            </button>
          ))}
          {folderEmails.length === 0 && (
            <div className="text-center text-white/30 text-[13px] mt-8">No messages</div>
          )}
        </div>
      </div>

      {/* Email Detail */}
      <div className="flex-1 overflow-y-auto">
        {selected ? (
          <div className="p-5">
            {/* Header */}
            <h2 className="text-[18px] font-semibold text-white/90 mb-3">{selected.subject}</h2>
            <div className="flex items-start gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-semibold text-white shrink-0 mt-0.5"
                style={{ background: `hsl(${selected.from.charCodeAt(0) * 7 % 360}, 45%, 40%)` }}
              >
                {selected.from[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-white/85">{selected.from}</span>
                  {selected.starred && (
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="#ffd60a" className="shrink-0">
                      <path d="M8 1.5l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.2 4.4 12.5l.7-4L2.2 5.7l4-.6L8 1.5z" />
                    </svg>
                  )}
                </div>
                <div className="text-[11px] text-white/40 mt-0.5">{selected.date}</div>
              </div>
            </div>

            {/* Body */}
            <div className="text-[14px] text-white/70 leading-relaxed whitespace-pre-line">
              {selected.body}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center h-full">
            <div className="text-[20px] font-light text-white/40 mb-2">No Message Selected</div>
            <p className="text-[13px] text-white/25">
              Press ⌘N to compose a new message.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}