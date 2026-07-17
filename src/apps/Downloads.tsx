'use client';

const DOWNLOADS = [
  { name: 'macOS-Tahoe-Installer.dmg', size: '14.2 GB', date: 'Today, 7:00 AM', status: 'complete' },
  { name: 'photo-batch.zip', size: '245 MB', date: 'Yesterday, 3:30 PM', status: 'complete' },
  { name: 'annual-report.pdf', size: '8.7 MB', date: 'Jun 16, 2025', status: 'complete' },
  { name: 'meeting-recording.mp4', size: '1.3 GB', date: 'Jun 15, 2025', status: 'complete' },
  { name: 'design-system-v3.fig', size: '56 MB', date: 'Jun 14, 2025', status: 'complete' },
  { name: 'project-backup.tar.gz', size: '3.8 GB', date: 'Jun 12, 2025', status: 'complete' },
];

export default function Downloads() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h2 className="text-[18px] font-semibold text-white/90 mb-3">Downloads</h2>
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left text-white/40 text-[11px] border-b border-white/8">
            <th className="pb-2 font-medium">Name</th>
            <th className="pb-2 font-medium w-[80px]">Size</th>
            <th className="pb-2 font-medium w-[120px]">Date</th>
          </tr>
        </thead>
        <tbody>
          {DOWNLOADS.map((d, i) => (
            <tr key={i} className="border-b border-white/4 hover:bg-white/4 cursor-default">
              <td className="py-2 flex items-center gap-2">
                <span className="text-[16px]">📄</span>
                <span className="text-white/80">{d.name}</span>
              </td>
              <td className="py-2 text-white/50">{d.size}</td>
              <td className="py-2 text-white/50">{d.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}