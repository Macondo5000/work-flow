import svgPaths from "./svg-acbms88gzx";

function Frame13() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['SF_Pro:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-[510] leading-[30px] relative shrink-0 text-[#0d0d0d] text-[14px] tracking-[-0.4px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        工作计划
      </p>
    </div>
  );
}

function IconChevronDownLg() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="icon / chevron-down-lg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="icon / chevron-down-lg">
          <path d={svgPaths.p2d252270} fill="var(--fill-0, #0D0D0D)" id="vector" />
        </g>
      </svg>
    </div>
  );
}

function Left() {
  return (
    <div className="bg-[#e3e3e4] content-stretch flex items-center justify-center p-[4px] relative rounded-[49px] shrink-0" data-name="Left">
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(13,13,13,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[49.5px]" />
      <IconChevronDownLg />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center justify-end relative">
      <Left />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-between relative rounded-[8px] shrink-0 w-full">
      <Frame13 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <Frame12 />
        </div>
      </div>
    </div>
  );
}

function SearchField() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Search Field">
      <Frame4 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['PingFang_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[-0.18px]">完成 2/6 步</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <p className="font-['PingFang_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#007aff] text-[14px] tracking-[-0.18px]">剩余 4 步</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-between relative rounded-[8px] shrink-0 w-full">
      <Frame14 />
      <Frame15 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <SearchField />
      <Frame5 />
    </div>
  );
}

function IconCheckLg() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="icon / check-lg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="icon / check-lg">
          <path d={svgPaths.p35512300} fill="var(--fill-0, #007AFF)" id="vector" />
        </g>
      </svg>
    </div>
  );
}

function Left1() {
  return (
    <div className="bg-[rgba(0,94,255,0.1)] content-stretch flex items-center justify-center p-[4px] relative rounded-[49px] shrink-0" data-name="Left">
      <IconCheckLg />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center pt-[6px] relative self-stretch shrink-0 w-[32px]">
      <Left1 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-0">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 92">
            <path d="M0.5 0V92" id="Vector 1" stroke="var(--stroke-0, #B7B7B7)" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="bg-[#ff8044] h-[8px] rounded-[2px] shrink-0 w-[4px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#020617] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Topic
      </p>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 w-full" data-name="status bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
          <Frame />
          <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] opacity-0 overflow-hidden relative shrink-0 text-[#8794a6] text-[12px] text-ellipsis" style={{ fontVariationSettings: "\'wdth\' 100" }}>
            Locate in Chat
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[309px]">
      <StatusBar />
      <p className="font-['SF_Pro:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-[510] leading-[normal] relative shrink-0 text-[#0d0d0d] text-[16px] tracking-[-0.4px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        与技术确认具体需求和背景
      </p>
      <p className="font-['PingFang_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[-0.18px] w-full whitespace-pre-wrap">了解完整的产品需求文档、UI设计范围、期望交付时间</p>
      <p className="font-['SF_Pro:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0d0d0d] text-[14px] tracking-[-0.4px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        花费时间：2 天
      </p>
    </div>
  );
}

function AppContent() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="App content">
      <Frame7 />
      <Frame17 />
    </div>
  );
}

function Left2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Left">
      <div className="absolute inset-[-2.5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
          <g id="Left">
            <rect height="20" rx="10" stroke="var(--stroke-0, #B7B7B7)" strokeDasharray="4 4" width="20" x="0.5" y="0.5" />
            <circle cx="10.5" cy="10.5" fill="var(--fill-0, #005EFF)" id="Ellipse 1" r="4" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center pt-[6px] relative self-stretch shrink-0 w-[32px]">
      <Left2 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-0">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 96">
            <path d="M0.5 0V96" id="Vector 1" stroke="var(--stroke-0, #B7B7B7)" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="bg-[#ff8044] h-[8px] rounded-[2px] shrink-0 w-[4px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#020617] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Analyze
      </p>
    </div>
  );
}

function StatusBar1() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 w-full" data-name="status bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
          <Frame1 />
          <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] opacity-0 overflow-hidden relative shrink-0 text-[#8794a6] text-[12px] text-ellipsis" style={{ fontVariationSettings: "\'wdth\' 100" }}>
            Locate in Chat
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <StatusBar1 />
      <p className="font-['SF_Pro:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-[510] leading-[normal] relative shrink-0 text-[#0d0d0d] text-[16px] tracking-[-0.4px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        与产品精力确认接手准备度
      </p>
      <p className="font-['PingFang_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[-0.18px] w-full whitespace-pre-wrap">检查Link验收进度、当前工作负荷、对离职宝的理解程度</p>
    </div>
  );
}

function AppContent2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start justify-center min-h-px min-w-px relative" data-name="App content">
      <Frame16 />
      <p className="font-['SF_Pro:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0d0d0d] text-[14px] tracking-[-0.4px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        预计：今天完成
      </p>
    </div>
  );
}

function AppContent1() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="App content">
      <Frame8 />
      <AppContent2 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="h-[39px] relative shrink-0 w-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 39">
        <g id="Frame 1984078390">
          <g id="Left">
            <rect height="20" rx="10" stroke="var(--stroke-0, #B7B7B7)" strokeDasharray="4 4" width="20" x="6" y="6" />
          </g>
          <path d="M16 38V39" id="Vector 1" stroke="var(--stroke-0, #B7B7B7)" strokeDasharray="4 4" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="bg-[#ff8044] h-[8px] rounded-[2px] shrink-0 w-[4px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#020617] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Normalize
      </p>
    </div>
  );
}

function StatusBar2() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 w-full" data-name="status bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
          <Frame2 />
          <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] opacity-0 overflow-hidden relative shrink-0 text-[#8794a6] text-[12px] text-ellipsis" style={{ fontVariationSettings: "\'wdth\' 100" }}>
            Locate in Chat
          </p>
        </div>
      </div>
    </div>
  );
}

function AppContent4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px relative" data-name="App content">
      <StatusBar2 />
      <p className="font-['SF_Pro:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-[510] leading-[normal] relative shrink-0 text-[#0d0d0d] text-[16px] tracking-[-0.4px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        评估工作量，制定排期计划
      </p>
      <p className="font-['PingFang_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[-0.18px] w-full whitespace-pre-wrap">基于需求和Xia的能力进行工作量拆解</p>
      <p className="font-['SF_Pro:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0d0d0d] text-[14px] tracking-[-0.4px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        预计花费时间：1 天
      </p>
    </div>
  );
}

function AppContent3() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="App content">
      <Frame9 />
      <AppContent4 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="h-[39px] relative shrink-0 w-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 39">
        <g id="Frame 1984078390">
          <g id="Left">
            <rect height="20" rx="10" stroke="var(--stroke-0, #B7B7B7)" strokeDasharray="4 4" width="20" x="6" y="6" />
          </g>
          <path d="M16 38V39" id="Vector 1" stroke="var(--stroke-0, #B7B7B7)" strokeDasharray="4 4" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="bg-[#ff8044] h-[8px] rounded-[2px] shrink-0 w-[4px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#020617] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Kickoff
      </p>
    </div>
  );
}

function StatusBar3() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 w-full" data-name="status bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
          <Frame3 />
          <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] opacity-0 overflow-hidden relative shrink-0 text-[#8794a6] text-[12px] text-ellipsis" style={{ fontVariationSettings: "\'wdth\' 100" }}>
            Locate in Chat
          </p>
        </div>
      </div>
    </div>
  );
}

function AppContent6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px relative" data-name="App content">
      <StatusBar3 />
      <p className="font-['SF_Pro:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-[510] leading-[normal] relative shrink-0 text-[#0d0d0d] text-[16px] tracking-[-0.4px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        启动界面设计
      </p>
      <p className="font-['PingFang_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[-0.18px] w-full whitespace-pre-wrap">反馈评估结果和排期安排</p>
      <p className="font-['SF_Pro:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0d0d0d] text-[14px] tracking-[-0.4px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        预计花费时间：5 天
      </p>
    </div>
  );
}

function AppContent5() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="App content">
      <Frame10 />
      <AppContent6 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[33px] relative shrink-0 w-[32px]">
      <div className="absolute inset-[-1.52%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 33.5">
          <g id="Frame 1984078390">
            <g id="Left">
              <rect height="20" rx="10" stroke="var(--stroke-0, #B7B7B7)" strokeDasharray="4 4" width="20" x="6" y="0.5" />
            </g>
            <path d="M16 32.5V33.5" id="Vector 1" stroke="var(--stroke-0, #B7B7B7)" strokeDasharray="4 4" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function AppContent8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px relative whitespace-pre-wrap" data-name="App content">
      <p className="font-['SF_Pro:Medium','Noto_Sans_JP:Medium',sans-serif] font-[510] leading-[normal] relative shrink-0 text-[#0d0d0d] text-[16px] tracking-[-0.4px] w-full" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        建立跟踪机制
      </p>
      <p className="font-['PingFang_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[-0.18px] w-full">确保后续执行可控</p>
    </div>
  );
}

function AppContent7() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="App content">
      <Frame11 />
      <AppContent8 />
    </div>
  );
}

export default function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start py-[10px] relative size-full">
      <Frame18 />
      <AppContent />
      <AppContent1 />
      <AppContent3 />
      <AppContent5 />
      <AppContent7 />
    </div>
  );
}