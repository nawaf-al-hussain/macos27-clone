'use client';

const FEATURED_APPS = [
  { name: 'Xcode 17', category: 'Developer Tools', rating: '4.8', size: '12.4 GB' },
  { name: 'Final Cut Pro', category: 'Video', rating: '4.7', size: '4.2 GB' },
  { name: 'Logic Pro', category: 'Music', rating: '4.8', size: '7.8 GB' },
  { name: 'Keynote', category: 'Productivity', rating: '4.6', size: '892 MB' },
  { name: 'Numbers', category: 'Productivity', rating: '4.5', size: '234 MB' },
  { name: 'Pages', category: 'Productivity', rating: '4.5', size: '456 MB' },
  { name: 'Swift Playgrounds', category: 'Education', rating: '4.7', size: '1.2 GB' },
  { name: 'Clips', category: 'Photo & Video', rating: '4.4', size: '567 MB' },
];

export default function AppStore() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Featured Banner */}
      <div className="mx-4 mt-4 mb-4 rounded-xl overflow-hidden bg-gradient-to-r from-blue-600/30 to-purple-600/30 p-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="text-[11px] text-white/40 uppercase tracking-wide mb-1">Featured</div>
        <div className="text-[24px] font-semibold text-white/90">macOS Tahoe Apps</div>
        <div className="text-[14px] text-white/50 mt-1">Discover apps optimized for Liquid Glass</div>
      </div>

      <div className="px-4 pb-4">
        <h3 className="text-[18px] font-semibold text-white/90 mb-3">Top Free Apps</h3>
        <div className="grid grid-cols-2 gap-2">
          {FEATURED_APPS.map((app, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-white/8 flex items-center justify-center text-[22px] shrink-0">
                {['📱', '🎬', '🎹', '📊', '🔢', '📝', '🎮', '🎞'][i]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-white/85 truncate">{app.name}</div>
                <div className="text-[11px] text-white/40">{app.category}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[11px] text-yellow-400">★</span>
                  <span className="text-[11px] text-white/40">{app.rating}</span>
                </div>
              </div>
              <button className="px-3 py-1 rounded-full bg-blue-500 text-[12px] text-white font-medium shrink-0">
                GET
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}