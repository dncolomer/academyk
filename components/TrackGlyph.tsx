import type { Track } from "@/content/types";
import { cn } from "@/lib/cn";

type TrackGlyphProps = {
  slug: Track["slug"];
  className?: string;
  size?: number;
};

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
};

export function TrackGlyph({ slug, className, size = 72 }: TrackGlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("ak-glyph text-ink", className)}
      aria-hidden
    >
      {slug === "quantum-computing" ? <QuantumMark /> : null}
      {slug === "ai-si" ? <LatticeMark /> : null}
      {slug === "thermodynamic-computing" ? <LandscapeMark /> : null}
    </svg>
  );
}

function QuantumMark() {
  const ticks = [8, 16, 24, 48, 56, 64];
  return (
    <g {...stroke}>
      <circle cx="36" cy="36" r="34" opacity="0.28" />
      <circle className="ak-pulse" cx="36" cy="36" r="30" opacity="0.4" />
      <circle className="ak-dash" cx="36" cy="36" r="26" strokeDasharray="1.2 2.4" opacity="0.75" />
      <circle cx="36" cy="36" r="21.5" opacity="0.5" />
      <circle cx="36" cy="36" r="16" />
      <circle cx="36" cy="36" r="8" opacity="0.85" />
      <g className="ak-spin">
        <ellipse cx="36" cy="36" rx="22" ry="7.5" />
        <ellipse cx="36" cy="36" rx="7.5" ry="22" />
        <ellipse cx="36" cy="36" rx="19" ry="5" transform="rotate(52 36 36)" opacity="0.75" />
        <ellipse cx="36" cy="36" rx="19" ry="5" transform="rotate(-52 36 36)" opacity="0.55" />
      </g>
      <line x1="36" y1="2" x2="36" y2="70" opacity="0.32" />
      <line x1="2" y1="36" x2="70" y2="36" opacity="0.32" />
      {ticks.map((value) => (
        <g key={value} opacity="0.55">
          <line x1={value} y1="34.2" x2={value} y2="37.8" />
          <line x1="34.2" y1={value} x2="37.8" y2={value} />
        </g>
      ))}
      <path d="M6 14 V6 H14" opacity="0.6" />
      <path d="M58 6 H66 V14" opacity="0.6" />
      <path d="M66 58 V66 H58" opacity="0.6" />
      <path d="M14 66 H6 V58" opacity="0.6" />
      <circle cx="36" cy="36" r="1.35" fill="currentColor" stroke="none" />
      <g className="ak-orbit-dot">
        <circle cx="57" cy="20" r="1.25" fill="currentColor" stroke="none" />
      </g>
      <g className="ak-orbit-dot" style={{ animationDuration: "22s", animationDirection: "reverse" }}>
        <circle cx="15" cy="49" r="1.05" fill="currentColor" stroke="none" />
      </g>
    </g>
  );
}

function LatticeMark() {
  const coords = [12, 28, 44, 60] as const;
  const nodes = coords.flatMap((y) => coords.map((x) => [x, y] as const));
  return (
    <g {...stroke}>
      <rect x="6" y="6" width="60" height="60" opacity="0.3" />
      <rect className="ak-pulse" x="12" y="12" width="48" height="48" opacity="0.45" />
      <rect x="22" y="22" width="28" height="28" opacity="0.7" />
      <path d="M36 6 L66 36 L36 66 L6 36 Z" opacity="0.4" />
      <path d="M36 16 L56 36 L36 56 L16 36 Z" opacity="0.55" />
      {coords.map((value) => (
        <g key={value}>
          <line x1={value} y1="12" x2={value} y2="60" />
          <line x1="12" y1={value} x2="60" y2={value} />
        </g>
      ))}
      <line x1="12" y1="12" x2="60" y2="60" opacity="0.55" />
      <line x1="60" y1="12" x2="12" y2="60" opacity="0.55" />
      <line x1="12" y1="36" x2="36" y2="12" opacity="0.35" />
      <line x1="36" y1="60" x2="60" y2="36" opacity="0.35" />
      {nodes.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.15" fill="currentColor" stroke="none" />
      ))}
      <circle cx="36" cy="36" r="2" fill="currentColor" stroke="none" />
    </g>
  );
}

function LandscapeMark() {
  const contours = [
    "M4 18 C14 10, 22 24, 32 14 S48 8, 58 18 S66 24, 68 20",
    "M4 26 C16 16, 24 32, 34 22 S50 14, 60 26 S66 32, 68 27",
    "M4 34 C14 26, 24 42, 36 30 S50 20, 60 32 S66 40, 68 35",
    "M4 42 C16 34, 26 50, 38 40 S52 28, 62 40 S66 48, 68 43",
    "M4 50 C14 44, 24 58, 36 48 S50 36, 62 48 S66 56, 68 51",
    "M4 58 C16 52, 28 66, 40 56 S54 46, 64 56 S66 62, 68 59",
    "M4 66 C18 60, 30 70, 44 64 S58 56, 68 66",
  ];
  return (
    <g {...stroke} className="ak-wave">
      <line x1="4" y1="70" x2="68" y2="70" opacity="0.35" />
      {[16, 28, 40, 52, 64].map((x) => (
        <line key={x} x1={x} y1="68" x2={x} y2="70" opacity="0.45" />
      ))}
      {contours.map((d, index) => (
        <path key={d} d={d} opacity={0.4 + index * 0.08} />
      ))}
      <path
        d="M4 46 C12 52, 18 34, 26 42 S38 56, 46 40 S58 30, 66 44"
        strokeDasharray="1.5 2.2"
        className="ak-dash"
        opacity="0.7"
      />
      <line x1="22" y1="20" x2="22" y2="70" opacity="0.18" />
      <line x1="40" y1="16" x2="40" y2="70" opacity="0.18" />
      <line x1="56" y1="22" x2="56" y2="70" opacity="0.18" />
      <circle cx="32" cy="14" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="58" cy="18" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="46" cy="40" r="1.15" fill="currentColor" stroke="none" />
      <path d="M6 10 V4 H12" opacity="0.45" />
      <path d="M60 4 H66 V10" opacity="0.45" />
    </g>
  );
}
