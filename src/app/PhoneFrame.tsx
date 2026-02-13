import React from 'react';

export const StatusBar = ({ bg = '#f2f3f5' }: { bg?: string }) => (
  <div className="fixed top-0 inset-x-0 z-[150] h-[54px] flex items-end justify-between px-8 pb-[11px] pointer-events-none" style={{ backgroundColor: bg }}>
    {/* Left - Time */}
    <span className="text-[15px] font-semibold text-black tracking-tight" style={{ fontFamily: '-apple-system, SF Pro Text, sans-serif' }}>
      9:41
    </span>

    {/* Right - Signal, WiFi, Battery */}
    <div className="flex items-center gap-[5px] mb-[1px]">
      {/* Cellular signal */}
      <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
        <rect x="0" y="9" width="3" height="3" rx="0.5" fill="black"/>
        <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="black"/>
        <rect x="9" y="3" width="3" height="9" rx="0.5" fill="black"/>
        <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="black"/>
      </svg>
      {/* WiFi */}
      <svg width="16" height="13" viewBox="0 -1 16 13" fill="none">
        <path d="M8 11.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" fill="black"/>
        <path d="M4.7 8.2a4.7 4.7 0 016.6 0" stroke="black" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M2.3 5.8a8 8 0 0111.4 0" stroke="black" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M0 3.3a11.3 11.3 0 0116 0" stroke="black" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
      {/* Battery */}
      <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
        <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="black" strokeOpacity="0.35"/>
        <rect x="2" y="2" width="19" height="9" rx="1.5" fill="black"/>
        <path d="M24 4.5v4a2 2 0 000-4z" fill="black" fillOpacity="0.4"/>
      </svg>
    </div>
  </div>
);

export const PhoneFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-8">
      {/* iPhone 15 Pro frame */}
      <div className="relative">
        {/* Outer shell */}
        <div
          className="relative rounded-[55px] bg-[#1a1a1a] p-[12px] shadow-2xl"
          style={{
            width: 393 + 24,
            height: 852 + 24,
            boxShadow:
              '0 50px 100px -20px rgba(0,0,0,0.25), 0 30px 60px -30px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.1)',
          }}
        >
          {/* Screen bezel */}
          <div className="relative w-[393px] h-[852px] rounded-[44px] overflow-hidden bg-white">
            {/* Dynamic Island - always on top of everything */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[200] flex items-start justify-center pt-[11px] pointer-events-none">
              <div className="w-[126px] h-[37px] bg-black rounded-full" />
            </div>

            {/* App content - transform creates containing block for fixed children */}
            <div className="relative w-full h-full overflow-hidden" style={{ transform: 'translateZ(0)' }}>
              {children}
            </div>
          </div>
        </div>

        {/* Side buttons - left */}
        {/* Silent switch */}
        <div className="absolute left-[-2px] top-[142px] w-[3px] h-[28px] bg-[#2a2a2a] rounded-l-sm" />
        {/* Volume Up */}
        <div className="absolute left-[-2px] top-[195px] w-[3px] h-[52px] bg-[#2a2a2a] rounded-l-sm" />
        {/* Volume Down */}
        <div className="absolute left-[-2px] top-[260px] w-[3px] h-[52px] bg-[#2a2a2a] rounded-l-sm" />

        {/* Side button - right (Power) */}
        <div className="absolute right-[-2px] top-[220px] w-[3px] h-[76px] bg-[#2a2a2a] rounded-r-sm" />
      </div>
    </div>
  );
};
