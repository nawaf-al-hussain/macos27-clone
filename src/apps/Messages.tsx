'use client';

import { useState } from 'react';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Message {
  id: string;
  text: string;
  time: string;
  sent: boolean;
}

const CONVERSATIONS: Conversation[] = [
  { id: '1', name: 'Tim Cook', avatar: '👨‍💼', lastMessage: 'Hey! Check out the new macOS 27 features 🎉', time: '2:34 PM', unread: 2 },
  { id: '2', name: 'Craig Federighi', avatar: '🧑‍💻', lastMessage: 'Liquid Glass is going to blow people away', time: '1:15 PM', unread: 0 },
  { id: '3', name: 'Jony Ive', avatar: '🎨', lastMessage: 'The design language is truly revolutionary', time: '12:00 PM', unread: 1 },
  { id: '4', name: 'Phil Schiller', avatar: '📊', lastMessage: 'Great quarter! 📈', time: 'Yesterday', unread: 0 },
  { id: '5', name: 'Angela Ahrendts', avatar: '👩‍💼', lastMessage: 'The retail experience looks amazing', time: 'Yesterday', unread: 0 },
  { id: '6', name: 'Lisa Su', avatar: '🔬', lastMessage: 'The chip performance is incredible', time: 'Monday', unread: 0 },
];

const MESSAGES_MAP: Record<string, Message[]> = {
  '1': [
    { id: 'm1', text: 'Have you seen the new macOS Tahoe design?', time: '2:30 PM', sent: false },
    { id: 'm2', text: 'Yes! The Liquid Glass effect is stunning', time: '2:31 PM', sent: true },
    { id: 'm3', text: 'The entire UI feels so cohesive now', time: '2:32 PM', sent: true },
    { id: 'm4', text: 'Hey! Check out the new macOS 27 features 🎉', time: '2:34 PM', sent: false },
  ],
  '2': [
    { id: 'm1', text: 'The new dock with Liquid Glass is my favorite part', time: '1:10 PM', sent: false },
    { id: 'm2', text: 'Agreed! The refraction effect is subtle but beautiful', time: '1:12 PM', sent: true },
    { id: 'm3', text: 'Liquid Glass is going to blow people away', time: '1:15 PM', sent: false },
  ],
  '3': [
    { id: 'm1', text: 'I spent months on the design system', time: '11:55 AM', sent: false },
    { id: 'm2', text: 'It really shows. Every detail is perfect', time: '11:58 AM', sent: true },
    { id: 'm3', text: 'The design language is truly revolutionary', time: '12:00 PM', sent: false },
  ],
};

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [messageInput, setMessageInput] = useState('');
  const [localMessages, setLocalMessages] = useState<Record<string, Message[]>>(MESSAGES_MAP);

  const currentMessages = [...(localMessages[selectedConversation] || []), ...(MESSAGES_MAP[selectedConversation] || [])]
    .filter((m, i, arr) => arr.findIndex(x => x.id === m.id) === i);

  const handleSend = () => {
    if (!messageInput.trim()) return;
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
        className="w-[240px] shrink-0 flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/5">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent text-[12px] text-white/80 outline-none placeholder:text-white/25"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map(conv => (
            <button
              key={conv.id}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                selectedConversation === conv.id ? 'bg-[#0058d0]' : 'hover:bg-white/6'
              }`}
              onClick={() => setSelectedConversation(conv.id)}
            >
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[18px] shrink-0">
                {conv.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-white/90">{conv.name}</span>
                  <span className="text-[11px] text-white/35">{conv.time}</span>
                </div>
                <div className="text-[12px] text-white/50 truncate">{conv.lastMessage}</div>
              </div>
              {conv.unread > 0 && (
                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-medium">
                  {conv.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center gap-2 px-4 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-[20px]">{selectedConv?.avatar}</span>
          <span className="text-[14px] font-medium text-white/90">{selectedConv?.name}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {currentMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[70%] px-3 py-2 rounded-2xl text-[14px] leading-relaxed ${
                  msg.sent
                    ? 'bg-[#0058d0] text-white rounded-br-md'
                    : 'bg-white/12 text-white/90 rounded-bl-md'
                }`}
              >
                {msg.text}
                <div className={`text-[10px] mt-0.5 ${msg.sent ? 'text-white/50' : 'text-white/35'}`}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 py-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/8">
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
              className="text-blue-400 text-[14px] font-medium hover:text-blue-300"
              style={{ opacity: messageInput ? 1 : 0.3 }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}