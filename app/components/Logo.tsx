export default function Logo({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  const houseColor = inverted ? "#FFFFFF" : "#0F2540";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 44"
      className={className}
      aria-label="help for house"
    >
      {/* H amber — help */}
      <rect x="2"  y="2"  width="5" height="40" rx="2" fill="#F59E0B" />
      <rect x="2"  y="19" width="18" height="5"  rx="2" fill="#F59E0B" />
      <rect x="15" y="2"  width="5" height="40" rx="2" fill="#F59E0B" />

      {/* H navy/white — house */}
      <rect x="28" y="2"  width="5" height="40" rx="2" fill={houseColor} />
      <rect x="28" y="19" width="18" height="5"  rx="2" fill={houseColor} />
      <rect x="41" y="2"  width="5" height="40" rx="2" fill={houseColor} />

      {/* Overlap accent */}
      <rect x="19" y="19" width="9" height="5" rx="2" fill="#F59E0B" opacity="0.35" />
    </svg>
  );
}

export function LogoFull({ inverted = false }: { inverted?: boolean }) {
  const forColor = inverted ? "rgba(255,255,255,0.45)" : "#9CA3AF";
  const byColor  = inverted ? "rgba(255,255,255,0.35)" : "#9CA3AF";

  return (
    <div className="flex items-center gap-3">
      <Logo className="h-9 w-auto flex-shrink-0" inverted={inverted} />
      <div className="flex flex-col leading-none gap-[3px]">
        <div className="flex items-baseline gap-[2px]">
          <span
            className="text-[17px] font-black tracking-tight leading-none"
            style={{ color: "#F59E0B" }}
          >
            help
          </span>
          <span
            className="text-[10px] font-light leading-none px-[3px]"
            style={{ color: forColor }}
          >
            for
          </span>
          <span
            className="text-[17px] font-black tracking-tight leading-none"
            style={{ color: inverted ? "#FFFFFF" : "#0F2540" }}
          >
            house
          </span>
        </div>
        <span
          className="text-[11px] italic whitespace-nowrap"
          style={{ color: byColor, fontFamily: "var(--font-caveat), cursive", fontWeight: 400 }}
        >
          by Roccaro e Bertoni
        </span>
      </div>
    </div>
  );
}
