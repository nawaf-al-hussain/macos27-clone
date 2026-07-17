'use client';

export default function Games() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="text-[48px] mb-3">🎮</div>
        <div className="text-[20px] font-light text-white/50">Apple Arcade</div>
        <div className="text-[14px] text-white/30 mt-2">Play incredible games with no ads or in-app purchases</div>
        <div className="grid grid-cols-3 gap-3 mt-8 max-w-[400px] mx-auto">
          {['🏆', '⚔️', '🏎', '🧩', '♟', '🎯'].map((g, i) => (
            <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-[32px] cursor-pointer hover:opacity-90">
              {g}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}