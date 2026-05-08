export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 44"
      className={className}
      aria-label="help for house"
    >
      {/* Left amber bar — R for Roccaro (wife first) */}
      <polygon points="2,2 26,2 30,42 6,42" fill="#F59E0B" />
      {/* Right navy bar — B for Bertoni */}
      <polygon points="34,2 58,2 62,42 38,42" fill="#1E3A5F" />
      <text x="16" y="31" textAnchor="middle" fill="white" fontFamily="system-ui,sans-serif" fontWeight="900" fontSize="24" letterSpacing="-1">R</text>
      <text x="48" y="31" textAnchor="middle" fill="white" fontFamily="system-ui,sans-serif" fontWeight="900" fontSize="24" letterSpacing="-1">B</text>
    </svg>
  );
}

export function LogoFull({ inverted = false }: { inverted?: boolean }) {
  const mainColor = inverted ? "#FFFFFF" : "#1E3A5F";
  const subColor = inverted ? "rgba(255,255,255,0.65)" : "#6B7280";

  return (
    <div className="flex items-center gap-3">
      <Logo className="h-10 w-auto flex-shrink-0" />
      <div className="flex flex-col leading-tight">
        <span
          className="font-black text-base tracking-tight"
          style={{ color: mainColor }}
        >
          help for house
        </span>
        <span
          className="text-[10px] font-medium tracking-wide"
          style={{ color: subColor }}
        >
          by Roccaro e Bertoni
        </span>
      </div>
    </div>
  );
}
