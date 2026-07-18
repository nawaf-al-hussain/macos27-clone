'use client';

export default function Downloads() {
  return (
    <div className="p-3">
      <div className="space-y-0">
        <div
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-white/6 transition-colors cursor-default"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2">
            <rect x="2" y="3" width="12" height="10" rx="1.5"/>
            <path d="M5 1v3m6-3v3" strokeLinecap="round"/>
            <path d="M2 6.5h12" strokeLinecap="round"/>
          </svg>
          <span className="text-[13px] text-white/80 truncate">macOS27-WallpaperPack.zip</span>
        </div>
        <div
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-white/6 transition-colors cursor-default"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2">
            <path d="M3 2h8a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2z"/>
            <path d="M4 6h8m-8 2.5h5m-5 2.5h3" strokeLinecap="round"/>
          </svg>
          <span className="text-[13px] text-white/80 truncate">Flight Confirmation SFO.pdf</span>
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <button className="text-[12px] text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 rounded hover:bg-white/6">
          More…
        </button>
      </div>
    </div>
  );
}