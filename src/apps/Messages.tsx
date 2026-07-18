'use client';

import { useState } from 'react';

interface Conversation {
  id: string;
  name: string;
  color: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Message {
  id: string;
  text: string;
  time: string;
  sent: boolean;
  sender?: string;
}

const CONVERSATIONS: Conversation[] = [
  { id: 'maya', name: 'Maya Chen', color: '#ff6b6b', lastMessage: '', time: '', unread: 1 },
  { id: 'mom', name: 'Mom', color: '#ff9f43', lastMessage: '', time: '', unread: 0 },
  { id: 'dev-squad', name: 'Dev Squad', color: '#5f6ff5', lastMessage: 'Sam: standup in 10 — someone bring the launch checklist', time: '7:34 PM', unread: 1 },
  { id: 'alex', name: 'Alex Rivera', color: '#2ed573', lastMessage: 'perfect, I\'ll bring snacks', time: '5:06 PM', unread: 0 },
  { id: 'sam', name: 'Sam Okafor', color: '#a55eea', lastMessage: 'famous last words', time: 'Yesterday', unread: 0 },
  { id: 'priya', name: 'Priya Nair', color: '#0abde3', lastMessage: 'Thursday 6pm, my place', time: 'Wed', unread: 0 },
];

const MESSAGES_MAP: Record<string, Message[]> = {
  maya: [
    { id: 'm1', text: 'Hey, did you get a chance to look at the brand review deck?', time: '6:20 PM', sent: false },
    { id: 'm2', text: 'Yeah, I went through it this afternoon. The color updates look great — the new palette really ties everything together.', time: '6:22 PM', sent: true },
    { id: 'm3', text: 'Awesome! What do you think about the typography changes? I swapped Inter for the SF Pro scale.', time: '6:24 PM', sent: false },
    { id: 'm4', text: 'Honestly the SF Pro weight variants make a huge difference. The 600 weight for headings feels much more Apple-like now.', time: '6:26 PM', sent: true },
    { id: 'm5', text: 'That\'s exactly the feedback I was hoping for. Can you send me your notes by Friday? I want to finalize before the Q3 review.', time: '6:28 PM', sent: false },
  ],
  mom: [
    { id: 'm1', text: 'Hi sweetie! Are you coming home for dinner this weekend?', time: '4:15 PM', sent: false },
    { id: 'm2', text: 'I\'ll try! Might be working on Saturday but I should be free Sunday.', time: '4:30 PM', sent: true },
    { id: 'm3', text: 'That would be wonderful. I\'m making your favorite — lasagna!', time: '4:32 PM', sent: false },
  ],
  'dev-squad': [
    { id: 'm1', text: 'Sprint retro is in 30. Who\'s running the doc?', time: '7:10 PM', sent: false, sender: 'Alex' },
    { id: 'm2', text: 'I have the notes from last sprint. Let me pull those up.', time: '7:15 PM', sent: true },
    { id: 'm3', text: 'also can someone check if the CI pipeline is green? I got a flaky test on main', time: '7:22 PM', sent: false, sender: 'Priya' },
    { id: 'm4', text: 'Looks green to me. The flaky one was the snapshot test — I opened a PR to fix it.', time: '7:28 PM', sent: true },
    { id: 'm5', text: 'standup in 10 — someone bring the launch checklist', time: '7:34 PM', sent: false, sender: 'Sam' },
  ],
  alex: [
    { id: 'm1', text: 'are we still on for the hike this weekend?', time: '4:45 PM', sent: true },
    { id: 'm2', text: 'definitely! I was thinking we try the trail near Lake Tahoe', time: '4:50 PM', sent: false },
    { id: 'm3', text: 'that sounds perfect. what time should we head out?', time: '4:55 PM', sent: true },
    { id: 'm4', text: 'perfect, I\'ll bring snacks', time: '5:06 PM', sent: false },
  ],
  sam: [
    { id: 'm1', text: 'did you push the genie animation branch?', time: '3:00 PM', sent: false },
    { id: 'm2', text: 'just pushed it. the easing curve still needs work but the core effect is there', time: '3:15 PM', sent: true },
    { id: 'm3', text: 'famous last words', time: '3:20 PM', sent: false },
  ],
  priya: [
    { id: 'm1', text: 'movie night this week?', time: '6:00 PM', sent: true },
    { id: 'm2', text: 'Thursday 6pm, my place', time: '6:05 PM', sent: false },
  ],
};

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [localMessages, setLocalMessages] = useState<Record<string, Message[]>>(MESSAGES_MAP);

  const currentMessages = selectedConversation
    ? [...(localMessages[selectedConversation] || []), ...(MESSAGES_MAP[selectedConversation] || [])]
        .filter((m, i, arr) => arr.findIndex(x => x.id === m.id) === i)
    : [];

  const handleSend = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      text: messageInput,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      sent: true,
    };
    const existing = localMessages[selectedConversation] || [];
    setLocalMessages(prev => ({
      ...prev,
      [selectedConversation]: [...existing, newMsg],
    }));
    setMessageInput('');
  };

  const selectedConv = CONVERSATIONS.find(c => c.id === selectedConversation);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[260px] shrink-0 flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.03)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Toolbar */}
        <div className="px-3 py-2 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-1.5 px-2.5 py-[5px] rounded-md bg-white/5">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
                <circle cx="6" cy="6" r="4.5" />
                <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent text-[12px] text-white/80 outline-none placeholder:text-white/25"
              />
            </div>
            <button
              className="p-[5px] rounded-md bg-white/8 text-white/60 hover:bg-white/12 hover:text-white/80 transition-colors shrink-0"
              title="New Message"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M14.5 1.5L7 9M14.5 1.5L9.5 14.5L7 9M14.5 1.5L1.5 6.5L7 9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map(conv => (
            <button
              key={conv.id}
              className={`w-full flex items-center gap-2.5 px-3 py-[6px] text-left transition-colors ${
                selectedConversation === conv.id ? 'bg-[#0058d0]' : 'hover:bg-white/5'
              }`}
              onClick={() => setSelectedConversation(conv.id)}
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[16px] font-semibold text-white shrink-0"
                style={{ background: conv.color }}
              >
                {conv.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[13px] ${conv.unread > 0 ? 'font-semibold' : 'font-normal'} text-white/90 truncate`}>
                    {conv.name}
                  </span>
                  <span className="text-[11px] text-white/35 shrink-0">{conv.time}</span>
                </div>
                <div className="text-[12px] text-white/45 truncate mt-0.5">{conv.lastMessage}</div>
              </div>
              {conv.unread > 0 && (
                <div className="w-[18px] h-[18px] rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-semibold shrink-0">
                  {conv.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {selectedConversation && selectedConv ? (
          <>
            {/* Chat Header */}
            <div
              className="flex items-center gap-3 px-4 py-2 shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold text-white"
                style={{ background: selectedConv.color }}
              >
                {selectedConv.name[0]}
              </div>
              <span className="text-[14px] font-medium text-white/90">{selectedConv.name}</span>
              <div className="flex-1" />
              <button className="p-1 rounded-md text-white/30 hover:bg-white/6 hover:text-white/50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <circle cx="8" cy="5" r="2" />
                  <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
                </svg>
              </button>
              <button className="p-1 rounded-md text-white/30 hover:bg-white/6 hover:text-white/50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="8" cy="8" r="6.5" />
                  <path d="M8 4.5V8L10.5 9.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
              {currentMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[65%] px-3 py-[7px] rounded-2xl text-[14px] leading-relaxed ${
                      msg.sent
                        ? 'bg-[#0058d0] text-white rounded-br-sm'
                        : 'bg-white/10 text-white/90 rounded-bl-sm'
                    }`}
                  >
                    {/* Show sender name in group chats */}
                    {!msg.sent && msg.sender && (
                      <div className="text-[11px] font-medium text-white/50 mb-1">{msg.sender}</div>
                    )}
                    {msg.text}
                    <div className={`text-[10px] mt-0.5 ${msg.sent ? 'text-white/40' : 'text-white/30'}`}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-2 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 px-3 py-[7px] rounded-full bg-white/7">
                <button className="text-white/30 hover:text-white/50 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12.5 2.5l1 1-4.5 4.5-3 0.5 0.5-3 4.5-4.5z" strokeLinejoin="round" />
                    <path d="M2 13.5h12" strokeLinecap="round" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="iMessage"
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-transparent text-[14px] text-white/80 outline-none placeholder:text-white/30"
                />
                <button
                  onClick={handleSend}
                  className="text-blue-400 text-[13px] font-medium hover:text-blue-300 transition-colors shrink-0"
                  style={{ opacity: messageInput ? 1 : 0.3 }}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No conversation selected */
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-[22px] font-light text-white/50 mb-2">Messages</h1>
            <p className="text-[13px] text-white/30">
              Select a conversation, or press ⌘N for a new message.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}