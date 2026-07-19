'use client';

import { useState } from 'react';
import { sounds, haptic, setVolume as setSoundVolume, setMuted as setSoundMuted } from '@/lib/sounds';

interface ControlCenterProps {
  onClose: () => void;
  onBrightnessChange?: (v: number) => void;
  onNightShiftChange?: (v: boolean) => void;
}

export default function ControlCenter({ onClose, onBrightnessChange, onNightShiftChange }: ControlCenterProps) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(false);
  const [focus, setFocus] = useState(false);
  const [stageManager, setStageManager] = useState(false);
  const [brightness, setBrightnessState] = useState(80);
  const [volume, setVolumeState] = useState(65);
  const [muted, setMutedState] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [nightShift, setNightShift] = useState(false);

  return (
    <div className="fixed inset-0 z-[600]" onClick={onClose}>
      <div
        className="absolute top-[32px] right-2 w-[320px] p-3 rounded-2xl slide-up"
        style={{
          background: 'rgba(40, 40, 40, 0.78)',
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* 2x2 Toggle Grid */}
        <div className="grid grid-cols-2 gap-[6px] mb-[6px]">
          <ToggleTile
            icon={<WifiIcon active={wifi} />}
            label="Wi-Fi"
            sublabel={wifi ? 'HomeNet-5G' : 'Off'}
            active={wifi}
            onClick={() => { sounds.tick(); haptic(); setWifi(!wifi); }}
          />
          <ToggleTile
            icon={<BluetoothIcon active={bluetooth} />}
            label="Bluetooth"
            sublabel={bluetooth ? 'On' : 'Off'}
            active={bluetooth}
            onClick={() => { sounds.tick(); haptic(); setBluetooth(!bluetooth); }}
          />
          <ToggleTile
            icon={<AirDropIcon active={airdrop} />}
            label="AirDrop"
            sublabel={airdrop ? 'Everyone' : 'Receiving Off'}
            active={airdrop}
            onClick={() => { sounds.tick(); haptic(); setAirdrop(!airdrop); }}
          />
          <ToggleTile
            icon={<FocusIcon active={focus} />}
            label="Focus"
            sublabel={focus ? 'On' : 'Off'}
            active={focus}
            onClick={() => { sounds.tick(); haptic(); setFocus(!focus); }}
          />
        </div>

        {/* Stage Manager & Screen Mirroring row */}
        <div className="grid grid-cols-2 gap-[6px] mb-[6px]">
          <ToggleTile
            icon={<StageManagerIcon active={stageManager} />}
            label="Stage Manager"
            sublabel={stageManager ? 'On' : 'Off'}
            active={stageManager}
            onClick={() => { sounds.tick(); haptic(); setStageManager(!stageManager); }}
          />
          <ToggleTile
            icon={<ScreenMirroringIcon />}
            label="Screen Mirroring"
            sublabel="AirPlay"
            active={false}
            onClick={() => { sounds.tick(); haptic(); }}
          />
        </div>

        {/* Volume Slider */}
        <div
          className="flex items-center gap-2.5 p-2.5 rounded-xl mb-[6px]"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={() => { const m = !muted; setMutedState(m); setSoundMuted(m); sounds.tick(); haptic(); }}
            className="flex items-center justify-center w-5 h-5 shrink-0"
          >
            <VolumeIcon muted={muted} />
          </button>
          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={100}
              value={muted ? 0 : volume}
              onChange={e => { const v = Number(e.target.value); setSoundVolume(v / 100); setVolumeState(v); if (muted) { setMutedState(false); setSoundMuted(false); } }}
              className="w-full h-[4px] rounded-full appearance-none cursor-pointer cc-slider"
              style={{
                background: `linear-gradient(to right, ${muted ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)'} ${muted ? 0 : volume}%, rgba(255,255,255,0.15) ${muted ? 0 : volume}%)`,
              }}
            />
          </div>
        </div>

        {/* Brightness Slider */}
        <div
          className="flex items-center gap-2.5 p-2.5 rounded-xl mb-[6px]"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center justify-center w-5 h-5 shrink-0">
            <BrightnessIcon />
          </div>
          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={100}
              value={brightness}
              onChange={e => { const v = Number(e.target.value); setBrightnessState(v); onBrightnessChange?.(v); }}
              className="w-full h-[4px] rounded-full appearance-none cursor-pointer cc-slider"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.8) ${brightness}%, rgba(255,255,255,0.15) ${brightness}%)`,
              }}
            />
          </div>
        </div>

        {/* Button Row */}
        <div className="grid grid-cols-4 gap-[6px]">
          <ActionButton
            icon={<DarkModeIcon active={darkMode} />}
            label="Dark Mode"
            active={darkMode}
            onClick={() => { sounds.tick(); haptic(); setDarkMode(!darkMode); }}
          />
          <ActionButton
            icon={<NightShiftIcon active={nightShift} />}
            label="Night Shift"
            active={nightShift}
            onClick={() => { const ns = !nightShift; setNightShift(ns); onNightShiftChange?.(ns); sounds.tick(); haptic(); }}
          />
          <ActionButton
            icon={<MuteIcon active={muted} />}
            label="Mute"
            active={muted}
            onClick={() => { const m = !muted; setMutedState(m); setSoundMuted(m); sounds.tick(); haptic(); }}
          />
          <button
            className="flex flex-col items-center justify-center gap-1 py-2.5 px-1 rounded-xl hover:bg-white/10 transition-colors cursor-default"
          >
            <span className="text-[9px] text-white/50 font-medium">Edit</span>
            <span className="text-[9px] text-white/50 font-medium">Controls…</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Toggle Tile ─────────────── */

function ToggleTile({ icon, label, sublabel, active, onClick }: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 p-[10px] rounded-xl text-left transition-colors duration-150"
      style={{
        background: active
          ? 'rgba(10, 109, 255, 0.35)'
          : 'rgba(255,255,255,0.06)',
        border: active
          ? '1px solid rgba(10, 109, 255, 0.4)'
          : '1px solid transparent',
      }}
    >
      <div className="shrink-0 w-[20px] h-[20px] flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0">
        <div
          className="text-[12px] font-medium leading-tight truncate"
          style={{ color: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)' }}
        >
          {label}
        </div>
        <div className="text-[10px] leading-tight truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {sublabel}
        </div>
      </div>
    </button>
  );
}

/* ─────────────── Action Button ─────────────── */

function ActionButton({ icon, label, active, onClick }: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl hover:bg-white/10 transition-colors duration-150"
    >
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      <span
        className="text-[9px] font-medium leading-tight text-center"
        style={{ color: active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)' }}
      >
        {label}
      </span>
    </button>
  );
}

/* ─────────────── SVG Icons ─────────────── */

function WifiIcon({ active }: { active: boolean }) {
  const color = active ? '#4DA3FF' : 'rgba(255,255,255,0.5)';
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 15.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"
        fill={color}
      />
      <path
        d="M6.5 12.5a5 5 0 017 0"
        stroke={color}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M3.5 9.5a8.5 8.5 0 0113 0"
        stroke={color}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M0.5 6.5a12 12 0 0119 0"
        stroke={color}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BluetoothIcon({ active }: { active: boolean }) {
  const color = active ? '#4DA3FF' : 'rgba(255,255,255,0.5)';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M10.5 1.5L4.5 7.5l3.5 3.5-3.5 3.5 6-6-3.5-3.5 3.5-3.5z"
        fill={color}
        stroke={color}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 1.5v13"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M7 4L10.5 1.5M7 12l3.5 2.5M4.5 7.5L7.5 5M4.5 8.5L7.5 11"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AirDropIcon({ active }: { active: boolean }) {
  const color = active ? '#4DA3FF' : 'rgba(255,255,255,0.5)';
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2L3 11h5l-1 7 6-9h-5l2-7z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FocusIcon({ active }: { active: boolean }) {
  const color = active ? '#4DA3FF' : 'rgba(255,255,255,0.5)';
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke={color} strokeWidth="1.4" />
      <path d="M10 5a5 5 0 015 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 2.5v2.5M10 15v2.5M2.5 10h2.5M15 10h2.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function StageManagerIcon({ active }: { active: boolean }) {
  const color = active ? '#4DA3FF' : 'rgba(255,255,255,0.5)';
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="3" width="18" height="14" rx="2" stroke={color} strokeWidth="1.3" />
      <rect x="3" y="5" width="6" height="5" rx="1" stroke={color} strokeWidth="1" fill={active ? 'rgba(10,109,255,0.3)' : 'rgba(255,255,255,0.08)'} />
      <rect x="11" y="5" width="6" height="5" rx="1" stroke={color} strokeWidth="1" fill={active ? 'rgba(10,109,255,0.3)' : 'rgba(255,255,255,0.08)'} />
      <rect x="3" y="12" width="6" height="3" rx="1" stroke={color} strokeWidth="1" fill={active ? 'rgba(10,109,255,0.3)' : 'rgba(255,255,255,0.08)'} />
      <rect x="11" y="12" width="6" height="3" rx="1" stroke={color} strokeWidth="1" fill={active ? 'rgba(10,109,255,0.3)' : 'rgba(255,255,255,0.08)'} />
    </svg>
  );
}

function ScreenMirroringIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="3" width="16" height="10" rx="1.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" />
      <path d="M6 17h8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10 13v4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="4" y="5" width="12" height="6" rx="0.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="rgba(255,255,255,0.05)" />
    </svg>
  );
}

function VolumeIcon({ muted }: { muted: boolean }) {
  const color = muted ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.8)';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 6h2.5l3-2.5v9L4.5 10H2V6z" fill={color} />
      {!muted && (
        <>
          <path d="M11 5.5a3.5 3.5 0 010 5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M13 4a6 6 0 010 8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}
      {muted && (
        <path d="M10 6.5l3 3M13 6.5l-3 3" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      )}
    </svg>
  );
}

function BrightnessIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.3" fill="none" />
      <path d="M8 1v2.5M8 12.5V15M1 8h2.5M12.5 8H15M3.05 3.05l1.77 1.77M11.18 11.18l1.77 1.77M3.05 12.95l1.77-1.77M11.18 4.82l1.77-1.77" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DarkModeIcon({ active }: { active: boolean }) {
  const color = active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)';
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M17.3 12.2A7.5 7.5 0 018.8 2.7 7.5 7.5 0 1017.3 12.2z"
        fill={color}
      />
    </svg>
  );
}

function NightShiftIcon({ active }: { active: boolean }) {
  const color = active ? '#FFD60A' : 'rgba(255,255,255,0.45)';
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M15 10a6.5 6.5 0 01-12 3.5A6.5 6.5 0 0015 10z"
        fill={color}
      />
      <path d="M16 2l1.5 1.5M16 5l1.5-1.5M18.5 3.5h-2.5M18.5 3.5h2" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function MuteIcon({ active }: { active: boolean }) {
  const color = active ? '#FF453A' : 'rgba(255,255,255,0.45)';
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M3 7h3l4-3v12l-4-3H3V7z" fill={color} />
      {active ? (
        <path d="M14 7.5l3 3M17 7.5l-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <>
          <path d="M14.5 6.5a4 4 0 010 5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M16.5 4.5a7 7 0 010 9" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}