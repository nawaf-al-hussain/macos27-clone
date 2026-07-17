'use client';

import { useState } from 'react';

interface ControlCenterProps {
  onClose: () => void;
}

export default function ControlCenter({ onClose }: ControlCenterProps) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(false);
  const [focus, setFocus] = useState(false);
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(65);

  return (
    <div className="fixed inset-0 z-[600]" onClick={onClose}>
      <div
        className="absolute top-[34px] right-4 w-[320px] p-3 rounded-2xl slide-up"
        style={{
          background: 'rgba(40, 40, 40, 0.75)',
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Network Grid */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <ToggleTile
            icon={<WifiIcon active={wifi} />}
            label="Wi-Fi"
            sublabel={wifi ? 'Home' : 'Off'}
            active={wifi}
            onClick={() => setWifi(!wifi)}
          />
          <ToggleTile
            icon={<BluetoothIcon active={bluetooth} />}
            label="Bluetooth"
            sublabel={bluetooth ? 'On' : 'Off'}
            active={bluetooth}
            onClick={() => setBluetooth(!bluetooth)}
          />
          <ToggleTile
            icon={<AirDropIcon active={airdrop} />}
            label="AirDrop"
            sublabel={airdrop ? 'Everyone' : 'Off'}
            active={airdrop}
            onClick={() => setAirdrop(!airdrop)}
          />
          <ToggleTile
            icon={<FocusIcon active={focus} />}
            label="Focus"
            sublabel={focus ? 'On' : 'Off'}
            active={focus}
            onClick={() => setFocus(!focus)}
          />
        </div>

        {/* Display / Brightness */}
        <SliderTile
          icon={<DisplayIcon />}
          label="Display"
          value={brightness}
          onChange={setBrightness}
        />

        {/* Sound */}
        <SliderTile
          icon={<SoundIcon />}
          label="Sound"
          value={volume}
          onChange={setVolume}
        />

        {/* Bottom shortcuts */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          <SmallTile icon="🌙" label="Dark Mode" />
          <SmallTile icon="🔒" label="Lock Screen" />
          <SmallTile icon="💤" label="Sleep" />
          <SmallTile icon="⏸" label="Screen Mirroring" />
        </div>
      </div>
    </div>
  );
}

function ToggleTile({ icon, label, sublabel, active, onClick }: {
  icon: React.ReactNode; label: string; sublabel: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-colors"
      style={{
        background: active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
      }}
    >
      <div className="text-[18px]">{icon}</div>
      <div>
        <div className="text-[12px] font-medium text-white/90">{label}</div>
        <div className="text-[10px] text-white/50">{sublabel}</div>
      </div>
    </button>
  );
}

function SliderTile({ icon, label, value, onChange }: {
  icon: React.ReactNode; label: string; value: number; onChange: (v: number) => void;
}) {
  return (
    <div
      className="flex items-center gap-2.5 p-2.5 rounded-xl mb-2"
      style={{ background: 'rgba(255,255,255,0.06)' }}
    >
      <div className="text-[18px]">{icon}</div>
      <div className="flex-1">
        <div className="text-[12px] font-medium text-white/90 mb-1">{label}</div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-1 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgba(255,255,255,0.8) ${value}%, rgba(255,255,255,0.15) ${value}%)`,
          }}
        />
      </div>
    </div>
  );
}

function SmallTile({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/10 transition-colors">
      <span className="text-[18px]">{icon}</span>
      <span className="text-[9px] text-white/60">{label}</span>
    </button>
  );
}

function WifiIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill={active ? '#007aff' : 'rgba(255,255,255,0.5)'}>
      <path d="M9 11a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" transform="translate(0,-2)"/>
      <path d="M5 9a5.5 5.5 0 018 0" stroke={active ? '#007aff' : 'rgba(255,255,255,0.5)'} strokeWidth="1.5" fill="none" strokeLinecap="round" transform="translate(0,-0.5)"/>
      <path d="M2 6a9.5 9.5 0 0114 0" stroke={active ? '#007aff' : 'rgba(255,255,255,0.5)'} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function BluetoothIcon({ active }: { active: boolean }) {
  return <span style={{ color: active ? '#007aff' : 'rgba(255,255,255,0.5)' }}>📶</span>;
}

function AirDropIcon({ active }: { active: boolean }) {
  return <span style={{ color: active ? '#007aff' : 'rgba(255,255,255,0.5)' }}>📡</span>;
}

function FocusIcon({ active }: { active: boolean }) {
  return <span style={{ color: active ? '#007aff' : 'rgba(255,255,255,0.5)' }}>🌙</span>;
}

function DisplayIcon() {
  return <span>🔆</span>;
}

function SoundIcon() {
  return <span>🔊</span>;
}