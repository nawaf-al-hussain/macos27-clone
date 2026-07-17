'use client';

import { useState, useRef, useCallback, useMemo, type ReactNode } from 'react';

/* ─────────────── SVG Icon Components ─────────────── */

function FinderIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#finder-grad)" />
      <defs>
        <linearGradient id="finder-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#42A1EC" />
          <stop offset="1" stopColor="#0070C9" />
        </linearGradient>
      </defs>
      {/* Face */}
      <ellipse cx="24" cy="26" rx="12" ry="11" fill="white" opacity="0.95" />
      {/* Left eye */}
      <circle cx="19.5" cy="23.5" r="1.8" fill="#1d1d1f" />
      {/* Right eye */}
      <circle cx="28.5" cy="23.5" r="1.8" fill="#1d1d1f" />
      {/* Nose */}
      <path d="M23.5 25.5 Q24 27 24.5 25.5" stroke="#1d1d1f" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* Smile */}
      <path d="M20 28 Q24 32 28 28" stroke="#1d1d1f" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Left antenna */}
      <line x1="20" y1="16" x2="18" y2="11" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="18" cy="10.5" r="1" fill="white" />
      {/* Right antenna */}
      <line x1="28" y1="16" x2="30" y2="11" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="30" cy="10.5" r="1" fill="white" />
    </svg>
  );
}

function AppsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#apps-grad)" />
      <defs>
        <linearGradient id="apps-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#5856D6" />
          <stop offset="1" stopColor="#3634A3" />
        </linearGradient>
      </defs>
      {/* Grid of 4 dots */}
      <circle cx="19" cy="19" r="3.5" fill="white" opacity="0.9" />
      <circle cx="29" cy="19" r="3.5" fill="white" opacity="0.9" />
      <circle cx="19" cy="29" r="3.5" fill="white" opacity="0.9" />
      <circle cx="29" cy="29" r="3.5" fill="white" opacity="0.9" />
    </svg>
  );
}

function SafariIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#safari-grad)" />
      <defs>
        <linearGradient id="safari-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#5AC8FA" />
          <stop offset="1" stopColor="#007AFF" />
        </linearGradient>
      </defs>
      {/* Compass circle */}
      <circle cx="24" cy="24" r="14" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9" />
      {/* Tick marks */}
      <line x1="24" y1="10" x2="24" y2="13" stroke="white" strokeWidth="1" opacity="0.7" />
      <line x1="24" y1="35" x2="24" y2="38" stroke="white" strokeWidth="1" opacity="0.7" />
      <line x1="10" y1="24" x2="13" y2="24" stroke="white" strokeWidth="1" opacity="0.7" />
      <line x1="35" y1="24" x2="38" y2="24" stroke="white" strokeWidth="1" opacity="0.7" />
      {/* Compass needle (red/white) */}
      <polygon points="24,14 21,26 24,24 27,26" fill="white" opacity="0.95" />
      <polygon points="24,34 21,22 24,24 27,22" fill="#FF3B30" opacity="0.9" />
    </svg>
  );
}

function MessagesIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#msg-grad)" />
      <defs>
        <linearGradient id="msg-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#34C759" />
          <stop offset="1" stopColor="#28A745" />
        </linearGradient>
      </defs>
      {/* Speech bubble */}
      <path d="M13 16 C13 14 14.5 12.5 16.5 12.5 L31.5 12.5 C33.5 12.5 35 14 35 16 L35 28 C35 30 33.5 31.5 31.5 31.5 L22 31.5 L17 36 L17 31.5 L16.5 31.5 C14.5 31.5 13 30 13 28 Z" fill="white" opacity="0.95" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#mail-grad)" />
      <defs>
        <linearGradient id="mail-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#5AC8FA" />
          <stop offset="1" stopColor="#007AFF" />
        </linearGradient>
      </defs>
      {/* Envelope body */}
      <rect x="11" y="16" width="26" height="17" rx="2" fill="white" opacity="0.95" />
      {/* Envelope flap */}
      <path d="M11 16 L24 27 L37 16" stroke="#007AFF" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M11 33 L20 25" stroke="#007AFF" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <path d="M37 33 L28 25" stroke="#007AFF" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

function MapsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#maps-grad)" />
      <defs>
        <linearGradient id="maps-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#30D158" />
          <stop offset="1" stopColor="#28A745" />
        </linearGradient>
      </defs>
      {/* Map area */}
      <rect x="12" y="12" width="24" height="26" rx="2" fill="white" opacity="0.95" />
      {/* Road lines */}
      <line x1="24" y1="14" x2="24" y2="36" stroke="#34C759" strokeWidth="1.5" opacity="0.5" />
      <line x1="14" y1="24" x2="34" y2="24" stroke="#34C759" strokeWidth="1.5" opacity="0.5" />
      <line x1="14" y1="30" x2="34" y2="30" stroke="#34C759" strokeWidth="1" opacity="0.3" />
      {/* Location pin */}
      <circle cx="30" cy="18" r="4" fill="#FF3B30" />
      <path d="M30 22 L30 27" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="30" cy="18" r="1.5" fill="white" />
    </svg>
  );
}

function PhotosIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#photos-grad)" />
      <defs>
        <linearGradient id="photos-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#FF6B6B" />
          <stop offset="0.33" stopColor="#FFB347" />
          <stop offset="0.66" stopColor="#FFE66D" />
          <stop offset="1" stopColor="#4ECB71" />
        </linearGradient>
      </defs>
      {/* Flower petals */}
      <circle cx="24" cy="17" r="5" fill="#FF6B6B" opacity="0.9" />
      <circle cx="18" cy="22" r="5" fill="#FF9500" opacity="0.9" />
      <circle cx="30" cy="22" r="5" fill="#FFCC02" opacity="0.9" />
      <circle cx="20" cy="29" r="5" fill="#34C759" opacity="0.9" />
      <circle cx="28" cy="29" r="5" fill="#5AC8FA" opacity="0.9" />
      {/* Center */}
      <circle cx="24" cy="24" r="3" fill="white" opacity="0.9" />
    </svg>
  );
}

function FaceTimeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#ft-grad)" />
      <defs>
        <linearGradient id="ft-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#34C759" />
          <stop offset="1" stopColor="#28A745" />
        </linearGradient>
      </defs>
      {/* Camera body */}
      <rect x="10" y="15" width="20" height="18" rx="3" fill="white" opacity="0.95" />
      {/* Camera triangle */}
      <path d="M30 20 L38 15 L38 33 L30 28 Z" fill="white" opacity="0.95" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#phone-grad)" />
      <defs>
        <linearGradient id="phone-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#34C759" />
          <stop offset="1" stopColor="#28A745" />
        </linearGradient>
      </defs>
      {/* Phone receiver */}
      <path d="M14 18 C14 16.5 15 15.5 16.5 15.5 L20 15.5 C21 15.5 21.5 16 21.8 17 L22.5 20 C22.8 21 22.5 21.8 21.5 22.2 L20 22.8 C21.5 26 24.5 29 27.5 30.5 L28.2 29 C28.5 28 29.3 27.7 30.3 28 L33 28.8 C34 29 34.5 29.5 34.5 30.5 L34.5 33.5 C34.5 35 33.5 36 32 36 C23 36 14 27 14 18 Z" fill="white" opacity="0.95" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="#E8E8ED" />
      {/* White calendar body */}
      <rect x="8" y="14" width="32" height="28" rx="4" fill="white" />
      {/* Red header */}
      <rect x="8" y="10" width="32" height="12" rx="4" fill="#FF3B30" />
      <rect x="8" y="18" width="32" height="4" fill="#FF3B30" />
      {/* Day number */}
      <text x="24" y="36" textAnchor="middle" fill="#1d1d1f" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">17</text>
      {/* Day of week */}
      <text x="24" y="18.5" textAnchor="middle" fill="white" fontSize="7" fontWeight="500" fontFamily="Inter, sans-serif">FRIDAY</text>
    </svg>
  );
}

function ContactsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#contacts-grad)" />
      <defs>
        <linearGradient id="contacts-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#A2845E" />
          <stop offset="1" stopColor="#8B6E4E" />
        </linearGradient>
      </defs>
      {/* Silhouette body */}
      <circle cx="24" cy="18" r="6" fill="#6B5A3E" opacity="0.8" />
      <ellipse cx="24" cy="34" rx="11" ry="9" fill="#6B5A3E" opacity="0.8" />
      {/* Shoulders cutout for silhouette style */}
      <rect x="8" y="24" width="32" height="24" fill="#6B5A3E" opacity="0.8" />
      <circle cx="24" cy="18" r="6" fill="#6B5A3E" />
      {/* White overlay shapes for contrast */}
      <circle cx="16" cy="18" r="4.5" fill="white" opacity="0.25" />
      <circle cx="32" cy="18" r="4.5" fill="white" opacity="0.25" />
      <circle cx="24" cy="18" r="4.5" fill="white" opacity="0.25" />
    </svg>
  );
}

function RemindersIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="white" />
      {/* List lines */}
      <circle cx="15" cy="16" r="3" stroke="#FF9500" strokeWidth="1.5" fill="none" />
      <circle cx="15" cy="26" r="3" fill="#FF9500" />
      <circle cx="15" cy="36" r="3" stroke="#8E8E93" strokeWidth="1.5" fill="none" />
      <line x1="22" y1="16" x2="35" y2="16" stroke="#C7C7CC" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="26" x2="35" y2="26" stroke="#C7C7CC" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="36" x2="35" y2="36" stroke="#C7C7CC" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function NotesIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="#FFCC02" />
      {/* Notepad lines */}
      <line x1="13" y1="18" x2="35" y2="18" stroke="#E5A800" strokeWidth="0.8" opacity="0.6" />
      <line x1="13" y1="23" x2="35" y2="23" stroke="#E5A800" strokeWidth="0.8" opacity="0.6" />
      <line x1="13" y1="28" x2="35" y2="28" stroke="#E5A800" strokeWidth="0.8" opacity="0.6" />
      <line x1="13" y1="33" x2="30" y2="33" stroke="#E5A800" strokeWidth="0.8" opacity="0.6" />
      {/* Pencil */}
      <path d="M34 11 L38 15 L28 34 L23 35 L24 30 Z" fill="#FF9500" />
      <path d="M34 11 L38 15 L36 17 L32 13 Z" fill="#FF6B00" />
      <line x1="24" y1="30" x2="28" y2="34" stroke="#E5A800" strokeWidth="1.5" />
    </svg>
  );
}

function FreeformIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="white" />
      {/* Colorful shapes */}
      <circle cx="16" cy="16" r="5" fill="#FF3B30" opacity="0.8" />
      <rect x="24" y="12" width="12" height="12" rx="2" fill="#007AFF" opacity="0.8" />
      <polygon points="14,28 22,28 18,36" fill="#FFCC02" opacity="0.8" />
      <rect x="24" y="26" width="12" height="10" rx="5" fill="#34C759" opacity="0.8" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#music-grad)" />
      <defs>
        <linearGradient id="music-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#FC3C44" />
          <stop offset="1" stopColor="#D63384" />
        </linearGradient>
      </defs>
      {/* Music note */}
      <path d="M20 33 L20 17 L34 14 L34 30" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="33" r="3.5" fill="white" opacity="0.95" />
      <circle cx="31" cy="30" r="3.5" fill="white" opacity="0.95" />
    </svg>
  );
}

function PodcastsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#pod-grad)" />
      <defs>
        <linearGradient id="pod-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      {/* Microphone body */}
      <rect x="20" y="10" width="8" height="16" rx="4" fill="white" opacity="0.95" />
      {/* Microphone stand */}
      <path d="M24 26 L24 32" stroke="white" strokeWidth="1.5" opacity="0.8" />
      <line x1="18" y1="32" x2="30" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      {/* Sound waves */}
      <path d="M15 16 C13 19 13 23 15 26" stroke="white" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M33 16 C35 19 35 23 33 26" stroke="white" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M12 13 C9 17.5 9 24.5 12 29" stroke="white" strokeWidth="1" fill="none" opacity="0.3" strokeLinecap="round" />
      <path d="M36 13 C39 17.5 39 24.5 36 29" stroke="white" strokeWidth="1" fill="none" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

function TVIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#tv-grad)" />
      <defs>
        <linearGradient id="tv-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#1C1C1E" />
          <stop offset="1" stopColor="#2C2C2E" />
        </linearGradient>
      </defs>
      {/* TV screen */}
      <rect x="8" y="14" width="32" height="20" rx="3" fill="#000" />
      <rect x="9" y="15" width="30" height="18" rx="2" fill="#1a1a2e" />
      {/* Apple TV logo - stylized TV text */}
      <text x="24" y="28" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif" opacity="0.9">TV</text>
      {/* Stand */}
      <rect x="18" y="35" width="12" height="2" rx="1" fill="#48484A" />
    </svg>
  );
}

function NewsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#news-grad)" />
      <defs>
        <linearGradient id="news-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#FF3B30" />
          <stop offset="1" stopColor="#D63028" />
        </linearGradient>
      </defs>
      {/* Newspaper */}
      <rect x="11" y="10" width="26" height="28" rx="3" fill="white" opacity="0.95" />
      {/* Header bar */}
      <rect x="11" y="10" width="26" height="8" rx="3" fill="#FF3B30" opacity="0.9" />
      <rect x="11" y="15" width="26" height="3" fill="#FF3B30" opacity="0.9" />
      {/* Text lines */}
      <line x1="15" y1="23" x2="33" y2="23" stroke="#C7C7CC" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="15" y1="27" x2="30" y2="27" stroke="#C7C7CC" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="15" y1="31" x2="33" y2="31" stroke="#C7C7CC" strokeWidth="1.2" strokeLinecap="round" />
      {/* TODAY text */}
      <text x="24" y="16.5" textAnchor="middle" fill="white" fontSize="5" fontWeight="600" fontFamily="Inter, sans-serif">TODAY</text>
    </svg>
  );
}

function GamesIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#games-grad)" />
      <defs>
        <linearGradient id="games-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#5856D6" />
          <stop offset="1" stopColor="#3634A3" />
        </linearGradient>
      </defs>
      {/* Controller body */}
      <path d="M13 22 C13 18 16 15 20 15 L28 15 C32 15 35 18 35 22 L35 28 C35 32 33 35 30 36 L28 36 C26 36 25 34 24 34 C23 34 22 36 20 36 L18 36 C15 35 13 32 13 28 Z" fill="white" opacity="0.95" />
      {/* D-pad */}
      <line x1="20" y1="21" x2="20" y2="27" stroke="#5856D6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="24" x2="23" y2="24" stroke="#5856D6" strokeWidth="1.5" strokeLinecap="round" />
      {/* Buttons */}
      <circle cx="28" cy="22" r="1.5" fill="#5856D6" />
      <circle cx="31" cy="24" r="1.5" fill="#5856D6" />
      <circle cx="28" cy="27" r="1.5" fill="#5856D6" />
    </svg>
  );
}

function AppStoreIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#as-grad)" />
      <defs>
        <linearGradient id="as-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#5AC8FA" />
          <stop offset="1" stopColor="#007AFF" />
        </linearGradient>
      </defs>
      {/* A shape */}
      <path d="M16 34 L21 14 L24 14 L27 26 L30 14 L33 14 L28 34 L25 34 L22.5 23 L20 34 Z" fill="white" opacity="0.95" />
      {/* Circle around A */}
      <circle cx="24" cy="24" r="12" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
    </svg>
  );
}

function SystemSettingsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#settings-grad)" />
      <defs>
        <linearGradient id="settings-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#8E8E93" />
          <stop offset="1" stopColor="#636366" />
        </linearGradient>
      </defs>
      {/* Gear shape */}
      <path d="M24 14 C27.5 14 30.5 16 31.8 19 L35 19 C35 19 36 19 35.5 20.5 L33 28 C32.5 29.5 31.5 29.5 31.5 29.5 L16.5 29.5 C16.5 29.5 15.5 29.5 15 28 L12.5 20.5 C12 19 13 19 13 19 L16.2 19 C17.5 16 20.5 14 24 14 Z" fill="white" opacity="0.95" />
      <circle cx="24" cy="24" r="4" fill="#636366" />
      <circle cx="24" cy="24" r="2" fill="#8E8E93" />
    </svg>
  );
}

function DownloadsFolderIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#dl-grad)" />
      <defs>
        <linearGradient id="dl-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#8E8E93" />
          <stop offset="1" stopColor="#636366" />
        </linearGradient>
      </defs>
      {/* Folder */}
      <path d="M12 16 C12 14.9 12.9 14 14 14 L21 14 L23 17 L34 17 C35.1 17 36 17.9 36 19 L36 33 C36 34.1 35.1 35 34 35 L14 35 C12.9 35 12 34.1 12 33 Z" fill="white" opacity="0.95" />
      {/* Down arrow */}
      <path d="M24 22 L24 30 M20 27 L24 31 L28 27" stroke="#636366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="url(#trash-grad)" />
      <defs>
        <linearGradient id="trash-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#8E8E93" />
          <stop offset="1" stopColor="#636366" />
        </linearGradient>
      </defs>
      {/* Trash can */}
      <path d="M16 17 L18 35 C18 36 18.5 36.5 19.5 36.5 L28.5 36.5 C29.5 36.5 30 36 30 35 L32 17 Z" fill="white" opacity="0.9" />
      {/* Lid */}
      <rect x="14" y="14" width="20" height="3" rx="1.5" fill="white" opacity="0.95" />
      {/* Handle */}
      <rect x="21" y="11" width="6" height="3" rx="1.5" fill="white" opacity="0.95" />
      {/* Lines */}
      <line x1="21" y1="20" x2="21" y2="34" stroke="#636366" strokeWidth="0.8" opacity="0.4" />
      <line x1="24" y1="20" x2="24" y2="34" stroke="#636366" strokeWidth="0.8" opacity="0.4" />
      <line x1="27" y1="20" x2="27" y2="34" stroke="#636366" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

/* ─────────────── Icon Map ─────────────── */

const ICON_MAP: Record<string, () => ReactNode> = {
  finder: FinderIcon,
  apps: AppsIcon,
  safari: SafariIcon,
  messages: MessagesIcon,
  mail: MailIcon,
  maps: MapsIcon,
  photos: PhotosIcon,
  facetime: FaceTimeIcon,
  phone: PhoneIcon,
  calendar: CalendarIcon,
  contacts: ContactsIcon,
  reminders: RemindersIcon,
  notes: NotesIcon,
  freeform: FreeformIcon,
  music: MusicIcon,
  podcasts: PodcastsIcon,
  tv: TVIcon,
  news: NewsIcon,
  games: GamesIcon,
  appstore: AppStoreIcon,
  settings: SystemSettingsIcon,
  downloads: DownloadsFolderIcon,
  trash: TrashIcon,
};

/* ─────────────── Dock Item Type ─────────────── */

type DockItemType = 'app' | 'separator' | 'stack';

interface DockItemDef {
  id: string;
  name: string;
  type: DockItemType;
  badge?: number;
}

const DOCK_ITEMS: DockItemDef[] = [
  { id: 'finder', name: 'Finder', type: 'app' },
  { id: '__sep1__', name: '', type: 'separator' },
  { id: 'apps', name: 'Apps', type: 'app' },
  { id: 'safari', name: 'Safari', type: 'app' },
  { id: 'messages', name: 'Messages', type: 'app', badge: 2 },
  { id: 'mail', name: 'Mail', type: 'app', badge: 4 },
  { id: 'maps', name: 'Maps', type: 'app' },
  { id: 'photos', name: 'Photos', type: 'app' },
  { id: 'facetime', name: 'FaceTime', type: 'app' },
  { id: 'phone', name: 'Phone', type: 'app' },
  { id: 'calendar', name: 'Calendar', type: 'app' },
  { id: 'contacts', name: 'Contacts', type: 'app' },
  { id: 'reminders', name: 'Reminders', type: 'app', badge: 3 },
  { id: 'notes', name: 'Notes', type: 'app' },
  { id: 'freeform', name: 'Freeform', type: 'app' },
  { id: 'music', name: 'Music', type: 'app' },
  { id: 'podcasts', name: 'Podcasts', type: 'app' },
  { id: 'tv', name: 'TV', type: 'app' },
  { id: 'news', name: 'News', type: 'app' },
  { id: 'games', name: 'Games', type: 'app' },
  { id: 'appstore', name: 'App Store', type: 'app', badge: 4 },
  { id: 'settings', name: 'System Settings', type: 'app' },
  { id: '__sep2__', name: '', type: 'separator' },
  { id: 'downloads', name: 'Downloads', type: 'stack' },
  { id: '__sep3__', name: '', type: 'separator' },
  { id: 'trash', name: 'Trash', type: 'app' },
];

/* ─────────────── Dock Component ─────────────── */

interface DockProps {
  onOpenApp: (appId: string) => void;
  isAppOpen: (appId: string) => boolean;
  onLaunchpad?: () => void;
}

export default function Dock({ onOpenApp, isAppOpen, onLaunchpad }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [showDownloadsPopup, setShowDownloadsPopup] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  // Only count actual dock-item elements for magnification
  const getIconSize = useCallback((index: number) => {
    if (hoveredIndex === null) return 48;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 72;
    if (distance === 1) return 60;
    if (distance === 2) return 52;
    return 48;
  }, [hoveredIndex]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dockRef.current) return;
    const icons = dockRef.current.querySelectorAll('[data-dock-item]');
    let closest = -1;
    let closestDist = Infinity;
    icons.forEach((icon, i) => {
      const iconRect = icon.getBoundingClientRect();
      const center = iconRect.left + iconRect.width / 2;
      const dist = Math.abs(e.clientX - center);
      if (dist < closestDist && dist < 100) {
        closestDist = dist;
        closest = i;
      }
    });
    setHoveredIndex(closest >= 0 ? closest : null);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setShowTooltip(null);
    setShowDownloadsPopup(false);
  }, []);

  const handleClick = useCallback((item: DockItemDef) => {
    if (item.id === 'apps' && onLaunchpad) {
      onLaunchpad();
      return;
    }
    if (item.type === 'stack') {
      setShowDownloadsPopup(prev => !prev);
      return;
    }
    onOpenApp(item.id);
  }, [onOpenApp, onLaunchpad]);

  // Build a mapping from DOCK_ITEMS index to a visual-only index (for magnification)
  // Separators don't get magnified, but they break the sequence
  let visualIndex = -1;
  const itemVisualIndex: number[] = [];
  for (const item of DOCK_ITEMS) {
    if (item.type !== 'separator') {
      visualIndex++;
    }
    itemVisualIndex.push(visualIndex);
  }

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2" style={{ zIndex: 'var(--z-dock)' }}>
      <div
        ref={dockRef}
        className="glass-dock lg-refract flex flex-row items-end rounded-[18px] px-2 pb-1 pt-1"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {DOCK_ITEMS.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <div key={item.id} className="dock-separator" />
            );
          }

          const vi = itemVisualIndex[index];
          const size = getIconSize(vi);
          const isOpen = item.type === 'app' && isAppOpen(item.id);
          const IconComponent = ICON_MAP[item.id];

          return (
            <div
              key={item.id}
              data-dock-item
              className="dock-icon relative flex flex-col items-center cursor-pointer"
              style={{ width: size, height: size + 4 }}
              onMouseEnter={() => setShowTooltip(item.name)}
              onMouseLeave={() => setShowTooltip(null)}
              onClick={() => handleClick(item)}
            >
              {/* Tooltip */}
              {showTooltip === item.name && (
                <div
                  className="absolute text-[12px] text-white px-2.5 py-1 rounded-md whitespace-nowrap z-50 pointer-events-none"
                  style={{
                    bottom: '100%',
                    marginBottom: '6px',
                    background: 'rgba(40,40,40,0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                  }}
                >
                  {item.name}
                </div>
              )}

              {/* Icon container */}
              <div
                className="dock-icon w-full h-full flex items-center justify-center rounded-[12px] shadow-lg overflow-hidden"
                style={{
                  width: size,
                  height: size,
                }}
              >
                {IconComponent && <IconComponent />}
              </div>

              {/* Badge */}
              {item.badge !== undefined && item.badge > 0 && (
                <div className="dock-badge" style={{ fontSize: size < 52 ? 9 : 11, minWidth: size < 52 ? 15 : 18, height: size < 52 ? 15 : 18, top: size < 52 ? -3 : -4, right: size < 52 ? -3 : -4 }}>
                  {item.badge}
                </div>
              )}

              {/* Active indicator dot */}
              {isOpen && (
                <div className="dock-active-dot" style={{ bottom: 0 }} />
              )}

              {/* Downloads stack popup */}
              {item.id === 'downloads' && showDownloadsPopup && (
                <div
                  className="stack-popup absolute"
                  style={{
                    bottom: size + 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="px-2 py-1 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                    Downloads
                  </div>
                  <div className="stack-popup-item mt-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect width="20" height="20" rx="4" fill="#5856D6" />
                      <text x="10" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">ZIP</text>
                    </svg>
                    <span>macOS27-WallpaperPack.zip</span>
                  </div>
                  <div className="stack-popup-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect width="20" height="20" rx="4" fill="#FF3B30" />
                      <text x="10" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">PDF</text>
                    </svg>
                    <span>Flight Confirmation SFO.pdf</span>
                  </div>
                  <div className="stack-popup-item" style={{ justifyContent: 'center', color: '#0a6dff', fontWeight: 500 }}>
                    More...
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}