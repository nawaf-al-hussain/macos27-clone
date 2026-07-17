'use client';

import { useState } from 'react';

export default function Safari() {
  const [url, setUrl] = useState('apple.com');
  const [inputUrl, setInputUrl] = useState('apple.com');

  const handleNavigate = () => {
    setUrl(inputUrl);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
      <div className="flex items-center px-2 pt-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-t-lg bg-white/8 text-[12px] text-white/80 max-w-[200px]">
          <span className="truncate flex-1">{url}</span>
          <span className="text-white/30 hover:text-white/60 cursor-pointer ml-1">×</span>
        </div>
        <button className="p-1 ml-1 rounded hover:bg-white/10 text-white/40 text-[16px]">+</button>
      </div>

      {/* URL Bar */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <button className="p-1 rounded hover:bg-white/10 text-white/40">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <button className="p-1 rounded hover:bg-white/10 text-white/40">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <div className="flex-1 flex items-center px-3 py-1.5 rounded-lg bg-white/8">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" className="mr-2">
            <circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleNavigate()}
            className="flex-1 bg-transparent text-[13px] text-white/80 text-center outline-none placeholder:text-white/25"
          />
        </div>
        <button className="p-1 rounded hover:bg-white/10 text-white/40">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 1v12M1 7h12" strokeLinecap="round"/>
          </svg>
        </button>
        <button className="p-1 rounded hover:bg-white/10 text-white/40">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 7h12" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto" style={{ background: 'rgba(20,20,20,0.95)' }}>
        <div className="max-w-[600px] mx-auto pt-16 px-6">
          {/* Apple-style Start Page */}
          <div className="text-center mb-12">
            <div className="text-[48px] mb-2">🍎</div>
            <h1 className="text-[28px] font-light text-white/90 mb-2">Apple</h1>
            <p className="text-[14px] text-white/50">Think Different.</p>
          </div>

          {/* Favorites Grid */}
          <div className="grid grid-cols-4 gap-4 mb-10">
            {[
              { name: 'Apple', icon: '🍎', color: '#333' },
              { name: 'GitHub', icon: '🐙', color: '#24292e' },
              { name: 'YouTube', icon: '▶️', color: '#ff0000' },
              { name: 'Twitter', icon: '🐦', color: '#1da1f2' },
              { name: 'Reddit', icon: '🔴', color: '#ff4500' },
              { name: 'Stack Overflow', icon: '📚', color: '#f48024' },
              { name: 'Wikipedia', icon: '🌐', color: '#333' },
              { name: 'Netflix', icon: '🎬', color: '#e50914' },
            ].map(site => (
              <button
                key={site.name}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/6 transition-colors"
                onClick={() => { setInputUrl(site.name.toLowerCase().replace(' ', '').replace('stackoverflow', 'stackoverflow.com')); }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-[24px]"
                  style={{ background: site.color }}
                >
                  {site.icon}
                </div>
                <span className="text-[11px] text-white/60">{site.name}</span>
              </button>
            ))}
          </div>

          {/* Stock Ticker */}
          <div className="rounded-xl p-4 mb-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-[12px] font-medium text-white/40 mb-3">Stocks</div>
            <div className="space-y-2">
              {[
                { symbol: 'AAPL', name: 'Apple Inc.', price: '234.58', change: '+2.34', up: true },
                { symbol: 'MSFT', name: 'Microsoft Corp.', price: '452.17', change: '+1.89', up: true },
                { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '138.72', change: '-0.54', up: false },
              ].map(stock => (
                <div key={stock.symbol} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-white/80 w-10">{stock.symbol}</span>
                    <span className="text-[12px] text-white/40">{stock.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-white/80">${stock.price}</span>
                    <span className={`text-[12px] ${stock.up ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change} ({stock.up ? '+' : ''}{((parseFloat(stock.change) / parseFloat(stock.price)) * 100).toFixed(2)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading List */}
          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-[12px] font-medium text-white/40 mb-3">Reading List</div>
            {[
              { title: 'macOS Tahoe: Everything You Need to Know', source: 'MacRumors' },
              { title: 'The Future of Apple Intelligence', source: 'The Verge' },
              { title: 'WWDC 2025 Recap: All the Announcements', source: '9to5Mac' },
            ].map((article, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-t border-white/5">
                <div className="flex-1">
                  <div className="text-[13px] text-white/70">{article.title}</div>
                  <div className="text-[11px] text-white/35">{article.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}