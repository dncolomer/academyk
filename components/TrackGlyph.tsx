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
};

export function TrackGlyph({ slug, className, size = 72 }: TrackGlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-ink", className)}
      aria-hidden
    >
      {slug === "quantum-computing" ? <QuantumMark /> : null}
      {slug === "ai-si" ? <LatticeMark /> : null}
      {slug === "thermodynamic-computing" ? <LandscapeMark /> : null}
    </svg>
  );
}

function QuantumMark() {
  return (
    <g {...stroke}>
      <circle className="ak-pulse" cx="36" cy="36" r="30" opacity="0.28" />
      <circle className="ak-pulse" cx="36" cy="36" r="24" opacity="0.45" />
      <g className="ak-spin">
        <ellipse cx="36" cy="36" rx="16" ry="6" />
        <ellipse cx="36" cy="36" rx="6" ry="16" />
      </g>
      <circle cx="36" cy="36" r="16" />
      <line x1="36" y1="20" x2="36" y2="52" />
      <line x1="20" y1="36" x2="52" y2="36" />
      <g className="ak-orbit-dot">
        <circle cx="50" cy="24" r="1.6" fill="currentColor" stroke="none" />
      </g>
    </g>
  );
}

function LatticeMark() {
  const nodes = [
    [16, 16],
    [36, 16],
    [56, 16],
    [16, 36],
    [36, 36],
    [56, 36],
    [16, 56],
    [36, 56],
    [56, 56],
  ] as const;
  return (
    <g {...stroke}>
      <g className="ak-pulse" opacity="0.4">
        <rect x="22" y="22" width="28" height="28" />
      </g>
      <line x1="16" y1="16" x2="56" y2="16" />
      <line x1="16" y1="36" x2="56" y2="36" />
      <line x1="16" y1="56" x2="56" y2="56" />
      <line x1="16" y1="16" x2="16" y2="56" />
      <line x1="36" y1="16" x2="36" y2="56" />
      <line x1="56" y1="16" x2="56" y2="56" />
      <line x1="16" y1="16" x2="56" y2="56" />
      <line x1="56" y1="16" x2="16" y2="56" />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill="currentColor" stroke="none" />
      ))}
    </g>
  );
}

function LandscapeMark() {
  return (
    <g {...stroke} className="ak-wave">
      <path d="M6 28 C14 16, 20 38, 30 26 S48 12, 56 24 S64 36, 66 30" />
      <path d="M6 38 C16 26, 22 46, 32 34 S50 22, 58 34 S64 44, 66 38" opacity="0.85" />
      <path d="M6 48 C14 40, 24 56, 34 46 S50 34, 60 46 S64 54, 66 48" opacity="0.6" />
      <path
        d="M6 44 C12 50, 18 36, 24 42 S36 54, 42 40 S54 32, 60 44 S64 50, 66 44"
        strokeDasharray="2 3"
        opacity="0.55"
      />
    </g>
  );
}
