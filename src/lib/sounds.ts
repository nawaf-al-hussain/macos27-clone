/**
 * Web Audio API sound system — synthesised macOS-like UI sounds.
 * Based on reverse-engineering of the original macOS 27 simulator.
 */

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let volume = 0.7;
let muted = false;

function getCtx(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    if (masterGain) {
      masterGain.gain.value = muted ? 0 : Math.max(0, Math.min(1, volume)) * 0.9;
    }
    return ctx;
  } catch {
    return null;
  }
}

function envelope(gain: GainNode, start: number, peak: number, dur: number) {
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
}

function tone(
  freqStart: number,
  freqEnd: number,
  dur: number,
  vol: number,
  type: OscillatorType = 'sine',
  delay = 0,
) {
  const ac = getCtx();
  if (!ac || !masterGain) return;
  const t = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freqStart, t);
  if (freqEnd !== freqStart) {
    osc.frequency.exponentialRampToValueAtTime(freqEnd, t + dur);
  }
  envelope(gain, t, vol, dur);
  osc.connect(gain).connect(masterGain);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

function noise(
  dur: number,
  freq: number,
  vol: number,
  filterType: BiquadFilterType = 'bandpass',
  q?: number,
) {
  const ac = getCtx();
  if (!ac || !masterGain) return;
  const t = ac.currentTime;
  const len = Math.max(1, Math.floor(ac.sampleRate * dur));
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const src = ac.createBufferSource();
  src.buffer = buf;
  const filter = ac.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = freq;
  if (q !== undefined) filter.Q.value = q;
  const gain = ac.createGain();
  envelope(gain, t, vol, dur);
  src.connect(filter).connect(gain).connect(masterGain);
  src.start(t);
}

export const sounds = {
  tick() { tone(1200, 1200, 0.018, 0.08); },
  pop() { tone(480, 720, 0.09, 0.1); },
  trash() { noise(0.14, 900, 0.14); tone(200, 160, 0.12, 0.1, 'sine', 0.02); },
  emptyTrash() { noise(0.4, 2400, 0.16, 'lowpass', 300); },
  chime() {
    tone(659.25, 659.25, 0.12, 0.12);
    tone(880, 880, 0.12, 0.12, 'sine', 0.06);
    tone(1174.66, 1174.66, 0.16, 0.12, 'sine', 0.12);
  },
  shutter() {
    noise(0.002, 3000, 0.25, 'highpass');
    noise(0.002, 2600, 0.2, 'highpass');
    tone(0, 0, 0.001, 0.0001, 'sine', 0.03);
    noise(0.002, 3000, 0.22, 'highpass');
  },
  unlock() { tone(520, 1040, 0.22, 0.12); },
  error() { tone(180, 180, 0.12, 0.06, 'square'); },
  poof() { noise(0.22, 500, 0.12, 'lowpass', 120); },
};

export function haptic(ms = 8) {
  try {
    if (window.matchMedia('(pointer: coarse)').matches) {
      navigator.vibrate?.(ms);
    }
  } catch { /* ignore */ }
}

export function setVolume(v: number) {
  volume = v;
  if (masterGain && ctx) {
    masterGain.gain.setTargetAtTime(
      muted ? 0 : Math.max(0, Math.min(1, v)) * 0.9,
      ctx.currentTime,
      0.02,
    );
  }
}

export function setMuted(m: boolean) {
  muted = m;
  if (masterGain && ctx) {
    masterGain.gain.setTargetAtTime(
      m ? 0 : Math.max(0, Math.min(1, volume)) * 0.9,
      ctx.currentTime,
      0.02,
    );
  }
}