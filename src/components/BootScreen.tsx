'use client';

import { useState, useEffect } from 'react';

const APPLE_PATH = 'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.03 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701';

interface BootScreenProps {
  onDone: () => void;
}

export default function BootScreen({ onDone }: BootScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setFadeOut(true), 2400);
    const t2 = window.setTimeout(() => onDone(), 2800);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 bg-black grid place-items-center"
      style={{ zIndex: 'var(--z-boot)', opacity: fadeOut ? 0 : 1, transitionProperty: 'opacity', transitionDuration: '400ms', transitionTimingFunction: 'ease' }}
    >
      <style>{`@keyframes bootFill{0%{width:0%}55%{width:65%}68%{width:65%}100%{width:100%}}`}</style>
      <div className="flex flex-col items-center">
        <svg width={72} height={72} viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d={APPLE_PATH} />
        </svg>
        <div
          className="mt-14 rounded-full overflow-hidden"
          style={{ width: 180, height: 3, background: 'rgba(255,255,255,0.25)' }}
        >
          <div
            className="h-full bg-white rounded-full"
            style={{ animation: 'bootFill 2400ms cubic-bezier(0.4, 0, 0.2, 1) forwards' }}
          />
        </div>
      </div>
    </div>
  );
}