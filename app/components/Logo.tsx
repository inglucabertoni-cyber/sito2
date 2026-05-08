export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 44"
      className={className}
      aria-label="Roccaro Bertoni"
    >
      {/* Left amber bar — R for Roccaro (wife first) */}
      <polygon points="2,2 26,2 30,42 6,42" fill="#F59E0B" />
      {/* Right navy bar — B for Bertoni */}
      <polygon points="34,2 58,2 62,42 38,42" fill="#1E3A5F" />
      {/* Letters */}
      <text x="16" y="31" textAnchor="middle" fill="white" fontFamily="system-ui,sans-serif" fontWeight="900" fontSize="24" letterSpacing="-1">R</text>
      <text x="48" y="31" textAnchor="middle" fill="white" fontFamily="system-ui,sans-serif" fontWeight="900" fontSize="24" letterSpacing="-1">B</text>
    </svg>
  );
}

export function LogoFull({ inverted = false }: { inverted?: boolean }) {
  const name1Color = inverted ? "#FFFFFF" : "#1E3A5F";
  const name2Color = inverted ? "rgba(255,255,255,0.75)" : "#374151";
  const subColor = inverted ? "rgba(255,255,255,0.55)" : "#6B7280";
  const tagColor = inverted ? "rgba(255,255,255,0.4)" : "#9CA3AF";

  return (
    <div className="flex items-center gap-3">
      <Logo className="h-10 w-auto flex-shrink-0" />
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-[3px]">
          <span
            className="font-black tracking-wider text-base"
            style={{ color: name1Color, letterSpacing: "0.1em" }}
          >
            ROCCARO
          </span>
          <span
            className="font-bold tracking-wider text-base"
            style={{ color: name2Color, letterSpacing: "0.1em" }}
          >
            {" "}BERTONI
          </span>
        </div>
        <span
          className="text-[9px] font-semibold tracking-[0.28em] uppercase"
          style={{ color: subColor }}
        >
          Ingegneri Gestionali
        </span>
        <span
          className="text-[8px] tracking-wide italic"
          style={{ color: tagColor }}
        >
          Dal desiderio alla realtà
        </span>
      </div>
    </div>
  );
}
