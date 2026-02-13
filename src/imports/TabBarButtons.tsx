import svgPaths from "./svg-l5pgks3whr";

function Blur1() {
  return <div className="backdrop-blur-[20px] bg-[rgba(0,0,0,0.04)] blur-[10px] h-[62px] mix-blend-hard-light rounded-[1000px] shrink-0 w-[294px]" data-name="Blur" />;
}

function Mask() {
  return (
    <div className="absolute bg-white inset-[-50px]" data-name="Mask">
      <div className="absolute bg-black inset-[76px] rounded-[1000px]" data-name="Shape" />
    </div>
  );
}

function Blur() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[10px] h-[110px] items-start left-[-26px] opacity-67 px-[26px] py-[24px] right-[-26px] top-1/2" data-name="Blur">
      <Blur1 />
      <Mask />
    </div>
  );
}

function Fill() {
  return (
    <div className="absolute inset-0 rounded-[296px]" data-name="Fill">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[296px]">
        <div className="absolute bg-[#333] inset-0 mix-blend-color-dodge rounded-[296px]" />
        <div className="absolute inset-0 rounded-[296px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(247, 247, 247) 0%, rgb(247, 247, 247) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)" }} />
      </div>
    </div>
  );
}

function TabWorkspaceDefault() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="tab/workspace/default">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="tab/workspace/default">
          <g id="Union">
            <path d={svgPaths.p174e06c0} fill="var(--fill-0, #35394C)" />
            <path d={svgPaths.p1fc92600} fill="var(--fill-0, #35394C)" />
            <path d={svgPaths.p1814df0} fill="var(--fill-0, #35394C)" />
            <path d={svgPaths.p154c3300} fill="var(--fill-0, #35394C)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center relative shrink-0" data-name="icon">
      <TabWorkspaceDefault />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#35394c] text-[10px] text-center w-[40px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Work
      </p>
    </div>
  );
}

function Status() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center justify-center mr-[-10px] pb-[7px] pt-[6px] px-[8px] relative shrink-0 w-[102px]" data-name="Status">
      <div className="absolute bg-[#f3f4f6] inset-0 rounded-[100px]" data-name="Selection" />
      <Icon />
    </div>
  );
}

function TabChatDefault() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="tab/chat/default">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="tab/chat/default">
          <path d={svgPaths.p3b0842f1} id="tab chat" stroke="var(--stroke-0, #6F7F94)" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center relative shrink-0" data-name="icon">
      <TabChatDefault />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6f7f94] text-[10px] text-center w-[40px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Chat
      </p>
    </div>
  );
}

function Status1() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center justify-center mr-[-10px] pb-[7px] pt-[6px] px-[8px] relative shrink-0 w-[102px]" data-name="Status">
      <div className="absolute inset-0 rounded-[100px]" data-name="Selection" />
      <Icon1 />
    </div>
  );
}

function LinkTanka() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="link-tanka">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="link-tanka">
          <path d={svgPaths.p2c8bfc0} fill="var(--fill-0, #6F7F94)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TabLinkDefault() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tab/link/default">
      <LinkTanka />
    </div>
  );
}

function Icon2() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center relative shrink-0" data-name="icon">
      <TabLinkDefault />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6f7f94] text-[10px] text-center w-[40px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Link
      </p>
    </div>
  );
}

function Status2() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center justify-center mr-[-10px] pb-[7px] pt-[6px] px-[8px] relative shrink-0 w-[102px]" data-name="Status">
      <div className="absolute inset-0 rounded-[100px]" data-name="Selection" />
      <Icon2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex items-center left-[4px] pr-[10px] top-[4px]">
      <Status />
      <Status1 />
      <Status2 />
    </div>
  );
}

function GlassEffect() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[296px]" data-name="Glass Effect">
      <Frame />
    </div>
  );
}

function Bg() {
  return (
    <div className="h-[62px] relative shrink-0 w-[294px]" data-name="BG">
      <Blur />
      <Fill />
      <GlassEffect />
    </div>
  );
}

export default function TabBarButtons() {
  return (
    <div className="content-stretch flex items-start justify-center relative shadow-[0px_8px_34px_0px_rgba(0,0,0,0.15)] size-full" data-name="Tab Bar Buttons">
      <Bg />
    </div>
  );
}