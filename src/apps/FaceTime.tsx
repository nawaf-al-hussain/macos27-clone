'use client';

export default function FaceTime() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-[48px]">📹</div>
      <div className="text-[22px] font-light text-white/70">FaceTime</div>
      <div className="text-[14px] text-white/40">Start a video or audio call</div>
      <div className="flex gap-4 mt-4">
        <button className="px-6 py-2.5 rounded-full bg-green-500 text-white text-[14px] font-medium">Video Call</button>
        <button className="px-6 py-2.5 rounded-full bg-green-500/30 text-green-300 text-[14px] font-medium">Audio Call</button>
      </div>
      <div className="mt-8 text-[13px] text-white/30">Recent Calls</div>
      <div className="w-full max-w-[300px] space-y-2 mt-2">
        {[
          { name: 'Tim Cook', time: 'Today, 2:30 PM', type: 'Video' },
          { name: 'Craig Federighi', time: 'Yesterday', type: 'Audio' },
        ].map((call, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/4">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">👤</div>
            <div className="flex-1">
              <div className="text-[13px] text-white/70">{call.name}</div>
              <div className="text-[11px] text-white/35">{call.type} • {call.time}</div>
            </div>
            <span className="text-green-400 text-[16px]">📞</span>
          </div>
        ))}
      </div>
    </div>
  );
}