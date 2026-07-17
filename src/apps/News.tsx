'use client';

const ARTICLES = [
  { title: 'Apple Unveils macOS Tahoe with Revolutionary Liquid Glass Design', source: 'MacRumors', time: '2h ago', category: 'Technology' },
  { title: 'WWDC 2025: The 10 Biggest Announcements', source: 'The Verge', time: '4h ago', category: 'Technology' },
  { title: 'Apple Stock Hits All-Time High After Tahoe Debut', source: 'Bloomberg', time: '5h ago', category: 'Business' },
  { title: 'Designing for the Next Era of Computing', source: 'Wired', time: '8h ago', category: 'Design' },
  { title: 'The M5 Ultra Chip: Performance Benchmarks', source: 'AnandTech', time: '12h ago', category: 'Hardware' },
  { title: 'How Liquid Glass Changes UI Development', source: '9to5Mac', time: '1d ago', category: 'Developer' },
  { title: 'Apple Intelligence Gets Major Upgrade', source: 'TechCrunch', time: '1d ago', category: 'AI' },
  { title: 'The Future of Desktop Operating Systems', source: 'Ars Technica', time: '2d ago', category: 'Opinion' },
];

export default function News() {
  return (
    <div className="flex h-full">
      <div className="w-[180px] shrink-0 py-3 px-2 overflow-y-auto" style={{ background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        {['Today', 'Trending', 'Technology', 'Business', 'Science', 'Sports', 'Entertainment'].map((tab, i) => (
          <button
            key={tab}
            className={`w-full text-left px-2 py-1.5 rounded-md text-[13px] transition-colors mb-0.5 ${
              i === 0 ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-[22px] font-semibold text-white/90 mb-4">Top Stories</h2>
        <div className="space-y-3 max-w-[600px]">
          {ARTICLES.map((article, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-white/6 transition-colors cursor-pointer" style={{ background: i === 0 ? 'rgba(255,255,255,0.06)' : 'transparent' }}>
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-[24px] shrink-0">
                {i === 0 ? '🍎' : i === 1 ? '🎉' : '📰'}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[14px] ${i === 0 ? 'font-semibold' : 'font-medium'} text-white/85 leading-snug`}>{article.title}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] text-white/40">{article.source}</span>
                  <span className="text-[11px] text-white/25">•</span>
                  <span className="text-[11px] text-white/30">{article.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}