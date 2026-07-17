'use client';

export default function Phone() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-[40px]">📞</div>
      <div className="text-[20px] font-light text-white/70 mt-2">Phone</div>
      <div className="flex items-center gap-1 mt-4">
        <div className="grid grid-cols-3 gap-3">
          {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(key => (
            <button key={key} className="w-16 h-16 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-[22px] text-white/80 transition-colors">
              {key}
            </button>
          ))}
        </div>
      </div>
      <button className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-[24px] mt-2">📞</button>
    </div>
  );
}