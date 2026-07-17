'use client';

export default function TV() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <h2 className="text-[22px] font-semibold text-white/90 mb-4">Watch Now</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: 'Severance', season: 'Season 2', img: '🎬' },
            { title: 'Ted Lasso', season: 'Season 3', img: '⚽' },
            { title: 'Foundation', season: 'Season 2', img: '🌌' },
            { title: 'Silo', season: 'Season 2', img: '🏗' },
            { title: 'Slow Horses', season: 'Season 3', img: '🕵' },
            { title: 'Pachinko', season: 'Season 2', img: '🌏' },
          ].map((show, i) => (
            <div key={i} className="rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-[40px]">
                {show.img}
              </div>
              <div className="p-2 bg-white/4">
                <div className="text-[13px] font-medium text-white/80">{show.title}</div>
                <div className="text-[11px] text-white/40">{show.season}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}