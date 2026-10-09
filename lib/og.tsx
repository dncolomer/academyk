import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { offer } from "@/content/site";
import type { Track } from "@/content/types";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const SERIF = "IBM Plex Serif";
const MONO = "IBM Plex Mono";

const INK = "#f4f4f4";
const MUTED = "#8c8c8c";
const LINE = "rgba(255,255,255,0.24)";
const FAINT = "rgba(255,255,255,0.07)";

async function fonts() {
  const dir = path.join(process.cwd(), "assets", "fonts");
  const [serif, mono] = await Promise.all([
    readFile(path.join(dir, "IBMPlexSerif-Bold.ttf")),
    readFile(path.join(dir, "IBMPlexMono-Regular.ttf")),
  ]);
  return [
    { name: SERIF, data: serif, weight: 700 as const, style: "normal" as const },
    { name: MONO, data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

/** Offer chips used on cards where the offer is relevant. */
export const offerChips = [
  `${offer.weeks} weeks, self-paced`,
  `${offer.liveSessions} optional live sessions`,
  `${offer.cohortStart} cohort, ${offer.seats} seats`,
];

type OgCardProps = {
  label: string;
  title: string;
  subtitle: string;
  glyph?: Track["slug"];
  chips?: string[];
};

function Grid() {
  const w = ogSize.width;
  const h = ogSize.height;
  const lines: React.ReactNode[] = [];
  for (let x = 0; x <= w; x += 60) lines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={h} stroke={FAINT} strokeWidth={1} />);
  for (let y = 0; y <= h; y += 60) lines.push(<line key={`h${y}`} x1={0} y1={y} x2={w} y2={y} stroke={FAINT} strokeWidth={1} />);
  return <g>{lines}</g>;
}

/** Ascending terraces over a perspective floor: the climb. */
function Terraces({ opacity = 1 }: { opacity?: number }) {
  const steps = [0, 1, 2, 3, 4, 5];
  const floor: React.ReactNode[] = [];
  // Perspective lines converge on a vanishing point at the upper right.
  const vx = 930;
  const vy = 210;
  for (let i = 0; i <= 14; i++) {
    const x = -200 + i * 130;
    floor.push(<line key={`p${i}`} x1={x} y1={640} x2={vx} y2={vy} stroke="rgba(255,255,255,0.10)" strokeWidth={1} />);
  }
  for (let j = 1; j <= 6; j++) {
    const y = vy + (640 - vy) * Math.pow(j / 6, 2);
    floor.push(<line key={`f${j}`} x1={0} y1={y} x2={1200} y2={y} stroke="rgba(255,255,255,0.09)" strokeWidth={1} />);
  }
  return (
    <g opacity={opacity}>
      {floor}
      {steps.map((i) => {
        const x = 560 + i * 100;
        const y = 540 - i * 62;
        return (
          <g key={i}>
            <rect x={x} y={y} width={180} height={62 + i * 62} fill="rgba(5,5,5,0.55)" stroke={`rgba(255,255,255,${0.2 + i * 0.1})`} strokeWidth={1} />
            <line x1={x} y1={y} x2={x + 180} y2={y} stroke={`rgba(255,255,255,${0.35 + i * 0.12})`} strokeWidth={1.5} />
          </g>
        );
      })}
      <circle cx={560 + 5 * 100 + 90} cy={540 - 5 * 62 - 14} r={4} fill={INK} />
    </g>
  );
}

function GlyphArt({ slug }: { slug: Track["slug"] }) {
  const stroke = INK;
  const common = { fill: "none", stroke, strokeWidth: 0.4 } as const;
  if (slug === "quantum-computing") {
    return (
      <g {...common}>
        <circle cx="36" cy="36" r="34" opacity="0.3" />
        <circle cx="36" cy="36" r="30" opacity="0.45" />
        <circle cx="36" cy="36" r="26" strokeDasharray="1.2 2.4" opacity="0.8" />
        <circle cx="36" cy="36" r="21.5" opacity="0.5" />
        <circle cx="36" cy="36" r="16" />
        <circle cx="36" cy="36" r="8" opacity="0.85" />
        <ellipse cx="36" cy="36" rx="22" ry="7.5" />
        <ellipse cx="36" cy="36" rx="7.5" ry="22" />
        <path d="M17.6 24 C22 16 30 14 36 20 C44 28 52 44 54.4 48 C50 56 42 58 36 52 C28 44 20 28 17.6 24 Z" opacity="0.7" />
        <path d="M54.4 24 C50 16 42 14 36 20 C28 28 20 44 17.6 48 C22 56 30 58 36 52 C44 44 52 28 54.4 24 Z" opacity="0.55" />
        <line x1="36" y1="2" x2="36" y2="70" opacity="0.35" />
        <line x1="2" y1="36" x2="70" y2="36" opacity="0.35" />
        <path d="M6 14 V6 H14" opacity="0.6" />
        <path d="M58 6 H66 V14" opacity="0.6" />
        <path d="M66 58 V66 H58" opacity="0.6" />
        <path d="M14 66 H6 V58" opacity="0.6" />
        <circle cx="36" cy="36" r="1.5" fill={stroke} />
        <circle cx="57" cy="20" r="1.4" fill={stroke} />
        <circle cx="15" cy="49" r="1.2" fill={stroke} />
      </g>
    );
  }
  if (slug === "ai-si") {
    const coords = [12, 28, 44, 60];
    return (
      <g {...common}>
        <rect x="6" y="6" width="60" height="60" opacity="0.3" />
        <rect x="12" y="12" width="48" height="48" opacity="0.45" />
        <rect x="22" y="22" width="28" height="28" opacity="0.7" />
        <path d="M36 6 L66 36 L36 66 L6 36 Z" opacity="0.4" />
        <path d="M36 16 L56 36 L36 56 L16 36 Z" opacity="0.55" />
        {coords.map((v) => (
          <g key={v}>
            <line x1={v} y1="12" x2={v} y2="60" />
            <line x1="12" y1={v} x2="60" y2={v} />
          </g>
        ))}
        <line x1="12" y1="12" x2="60" y2="60" opacity="0.55" />
        <line x1="60" y1="12" x2="12" y2="60" opacity="0.55" />
        {coords.flatMap((y) => coords.map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" fill={stroke} />))}
        <circle cx="36" cy="36" r="2.2" fill={stroke} />
      </g>
    );
  }
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
    <g {...common}>
      <line x1="4" y1="70" x2="68" y2="70" opacity="0.4" />
      {contours.map((d, i) => (
        <path key={i} d={d} opacity={0.4 + i * 0.08} />
      ))}
      <path d="M4 46 C12 52, 18 34, 26 42 S38 56, 46 40 S58 30, 66 44" strokeDasharray="1.5 2.2" opacity="0.8" />
      <circle cx="32" cy="14" r="1.4" fill={stroke} />
      <circle cx="58" cy="18" r="1.4" fill={stroke} />
      <circle cx="46" cy="40" r="1.4" fill={stroke} />
      <path d="M6 10 V4 H12" opacity="0.5" />
      <path d="M60 4 H66 V10" opacity="0.5" />
    </g>
  );
}

function LogoMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32">
      <g fill="none" stroke={INK} strokeWidth={1.6}>
        <rect x="3" y="21" width="8" height="8" />
        <rect x="12" y="13" width="8" height="8" />
        <rect x="21" y="5" width="8" height="8" />
      </g>
    </svg>
  );
}

const mono = (size: number, extra: Record<string, string | number> = {}) => ({
  display: "flex",
  fontFamily: MONO,
  fontSize: size,
  letterSpacing: 2,
  textTransform: "uppercase" as const,
  color: MUTED,
  ...extra,
});

export function OgCard({ label, title, subtitle, glyph, chips }: OgCardProps) {
  const inset = 28;
  const pad = 44;
  const frameW = ogSize.width - inset * 2;
  const frameH = ogSize.height - inset * 2;
  const long = title.length > 26;
  const titleSize = long ? 66 : 80;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#050505", color: INK, fontFamily: SERIF }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: ogSize.width, height: ogSize.height, display: "flex" }}>
      <svg width={ogSize.width} height={ogSize.height} viewBox={`0 0 ${ogSize.width} ${ogSize.height}`}>
        <defs>
          <radialGradient id="glow" cx="78%" cy="30%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={ogSize.width} height={ogSize.height} fill="url(#glow)" />
        {Grid()}
        {Terraces({ opacity: glyph ? 0.45 : 1 })}
        {glyph ? (
          <g transform="translate(795 100) scale(4.3)">{GlyphArt({ slug: glyph })}</g>
        ) : null}
      </svg>
      </div>

      <div
        style={{
          position: "absolute",
          top: inset,
          left: inset,
          width: frameW,
          height: frameH,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `1px solid ${LINE}`,
          padding: pad,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LogoMark />
            <div style={mono(17, { marginLeft: 14, color: INK, letterSpacing: 4 })}>Academy K</div>
          </div>
          <div style={mono(15)}>{label}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: glyph ? 700 : 820,
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: titleSize,
              lineHeight: 1.04,
              letterSpacing: -2.2,
              color: INK,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 26, width: glyph ? 620 : 640, fontFamily: MONO, fontSize: 21, lineHeight: 1.45, color: MUTED }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 800 }}>
            {(chips ?? []).map((c) => (
              <div key={c} style={mono(14, { border: `1px solid ${LINE}`, padding: "8px 12px", marginRight: 10, marginTop: 8, color: INK, background: "rgba(5,5,5,0.7)" })}>
                {c}
              </div>
            ))}
          </div>
          <div style={mono(18, { color: INK, letterSpacing: 1, textTransform: "none" })}>academy-k.com</div>
        </div>
      </div>
    </div>
  );
}

export async function ogImage(props: OgCardProps) {
  return new ImageResponse(<OgCard {...props} />, {
    ...ogSize,
    fonts: await fonts(),
  });
}
