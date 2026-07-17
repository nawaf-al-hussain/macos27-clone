'use client';

import { useState } from 'react';

const CONTACTS = [
  { name: 'Tim Cook', role: 'CEO', email: 'tim@apple.com', phone: '+1 (408) 996-1010' },
  { name: 'Craig Federighi', role: 'SVP Software Engineering', email: 'craig@apple.com', phone: '+1 (408) 996-1010' },
  { name: 'Jony Ive', role: 'Designer', email: 'jony@apple.com', phone: '+1 (408) 996-1010' },
  { name: 'Lisa Su', role: 'CEO AMD', email: 'lisa@amd.com', phone: '+1 (408) 749-4000' },
  { name: 'Angela Ahrendts', role: 'Former SVP Retail', email: 'angela@apple.com', phone: '+1 (408) 996-1010' },
  { name: 'Phil Schiller', role: 'Apple Fellow', email: 'phil@apple.com', phone: '+1 (408) 996-1010' },
  { name: 'John Appleseed', role: 'Product Manager', email: 'john@apple.com', phone: '+1 (408) 555-0142' },
];

export default function Contacts() {
  const [selected, setSelected] = useState<string | null>('Tim Cook');
  const contact = CONTACTS.find(c => c.name === selected);

  return (
    <div className="flex h-full">
      <div className="w-[220px] shrink-0 overflow-y-auto py-2 px-2" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        {CONTACTS.map(c => (
          <button
            key={c.name}
            className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] text-left transition-colors ${
              selected === c.name ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
            }`}
            onClick={() => setSelected(c.name)}
          >
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[14px] shrink-0">
              {c.name[0]}
            </div>
            <span className="truncate">{c.name}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        {contact && (
          <>
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-[36px] mb-3">{contact.name[0]}</div>
            <div className="text-[22px] font-medium text-white/90">{contact.name}</div>
            <div className="text-[14px] text-white/40 mt-1">{contact.role}</div>
            <div className="mt-6 space-y-2 text-[14px]">
              <div className="flex items-center gap-3 text-white/60"><span className="text-white/30">📧</span>{contact.email}</div>
              <div className="flex items-center gap-3 text-white/60"><span className="text-white/30">📞</span>{contact.phone}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}