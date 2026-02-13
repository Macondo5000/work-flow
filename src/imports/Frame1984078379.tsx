import svgPaths from "./svg-xgf43ysqwd";

function Frame2() {
  return (
    <div className="content-stretch flex font-['PingFang_SC:Medium',sans-serif] gap-[8px] items-center leading-[30px] not-italic relative shrink-0 text-[14px] tracking-[-0.4px]">
      <p className="relative shrink-0 text-[#757575]">1/6 步</p>
      <p className="relative shrink-0 text-[#0d0d0d]">与技术侧确认具体需求</p>
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

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0">
      <p className="font-['PingFang_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[-0.18px]">进行中</p>
      <Left />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between relative rounded-[8px] size-full">
      <Frame2 />
      <Frame1 />
    </div>
  );
}