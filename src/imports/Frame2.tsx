import svgPaths from "./svg-vgr5suyddz";

function IconFlag() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon / flag">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon / flag">
          <path d={svgPaths.p2ea0c00} fill="var(--fill-0, #0D0D0D)" id="vector" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative size-full">
      <IconFlag />
    </div>
  );
}