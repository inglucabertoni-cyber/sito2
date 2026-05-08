export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
      aria-label="help for house"
    >
      {/* Amber bar — R / Roccaro */}
      <polygon points="2,4 20,4 18,44 0,44" fill="#F59E0B" />
      {/* Navy bar — B / Bertoni */}
      <polygon points="26,4 44,4 46,44 28,44" fill="#0F2540" />
      {/* Thin amber accent line between bars */}
      <rect x="22" y="4" width="2" height="40" fill="#F59E0B" opacity="0.3" />
    </svg>
  );
}

export function LogoFull({ inverted = false }: { inverted?: boolean }) {
  const forColor   = inverted ? "rgba(255,255,255,0.45)" : "#9CA3AF";
  const byColor    = inverted ? "rgba(255,255,255,0.35)" : "#9CA3AF";

  return (
    <div className="flex items-center gap-3">
      <Logo className="h-9 w-auto flex-shrink-0" />
      <div className="flex flex-col leading-none gap-[3px]">
        {/* Wordmark */}
        <div className="flex items-baseline gap-[2px]">
          <span className="text-[17px] font-black tracking-tight leading-none"
            style={{ color: "#F59E0B" }}>
            help
          </span>
          <span className="text-[10px] font-light leading-none px-[3px]"
            style={{ color: forColor }}>
            for
          </span>
          <span className="text-[17px] font-black tracking-tight leading-none"
            style={{ color: inverted ? "#FFFFFF" : "#0F2540" }}>
            house
          </span>
        </div>
        {/* Tagline */}
        <span
          className="text-[8.5px] font-medium tracking-[0.18em] uppercase"
          style={{ color: byColor }}
        >
          by Roccaro e Bertoni
        </span>
      </div>
    </div>
  );
}
