const STARS: Array<[number, number, number, boolean]> = [
  [72, 96, 0.45, true],
  [128, 210, 0.22, false],
  [196, 64, 0.35, false],
  [248, 168, 0.18, false],
  [540, 88, 0.4, true],
  [612, 156, 0.22, false],
  [688, 72, 0.5, false],
  [724, 248, 0.28, true],
  [96, 520, 0.2, false],
  [168, 640, 0.32, false],
  [590, 600, 0.26, true],
  [670, 690, 0.16, false],
  [740, 540, 0.38, false],
  [40, 340, 0.18, false],
  [760, 400, 0.24, false],
];

/**
 * Hero backdrop: slow concentric rings, a counter-rotating arc,
 * drifting radial glows and a few star dots. Decorative only.
 */
export function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="ak-home-drift absolute -left-24 top-[-18%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_68%)] sm:h-[34rem] sm:w-[34rem]" />
      <div className="ak-home-drift-slow absolute -right-20 bottom-[-28%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_64%)] sm:h-[40rem] sm:w-[40rem]" />
      <div className="ak-home-drift absolute top-[38%] left-[42%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)]" />

      <svg
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[68%] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 text-ink opacity-35 sm:top-1/2 sm:right-[-46%] sm:left-auto sm:h-[42rem] sm:w-[42rem] sm:translate-x-0 sm:-translate-y-1/2 sm:opacity-60 lg:right-[-18rem] lg:h-[50rem] lg:w-[50rem] lg:opacity-70"
      >
        <g opacity="0.45">
          <line x1="400" y1="352" x2="400" y2="448" stroke="currentColor" strokeWidth="1" />
          <line x1="352" y1="400" x2="448" y2="400" stroke="currentColor" strokeWidth="1" />
          <circle cx="400" cy="400" r="3" fill="currentColor" />
        </g>

        <g className="ak-spin" style={{ animationDuration: "110s" }} opacity="0.8">
          <circle cx="400" cy="400" r="340" stroke="currentColor" strokeOpacity="0.16" />
          <circle cx="400" cy="400" r="268" stroke="currentColor" strokeOpacity="0.12" />
          <circle
            cx="400"
            cy="400"
            r="206"
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeDasharray="2 11"
          />
          <path
            d="M400 60 A340 340 0 0 1 718 292"
            stroke="currentColor"
            strokeOpacity="0.55"
          />
          <circle cx="718" cy="292" r="3.2" fill="currentColor" />
        </g>

        <g
          className="ak-spin"
          style={{ animationDuration: "72s", animationDirection: "reverse" }}
          opacity="0.7"
        >
          <circle cx="400" cy="400" r="132" stroke="currentColor" strokeOpacity="0.35" />
          <path
            d="M292 332 A132 132 0 0 1 468 286"
            stroke="currentColor"
            strokeOpacity="0.75"
          />
          <circle cx="468" cy="286" r="2.4" fill="currentColor" />
        </g>

        {STARS.map(([cx, cy, opacity, pulse]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={pulse ? 1.7 : 1.15}
            fill="currentColor"
            opacity={opacity}
            className={pulse ? "ak-pulse" : undefined}
          />
        ))}
      </svg>

      <style>{`
        .ak-home-drift {
          animation: ak-drift 30s ease-in-out infinite alternate;
        }
        .ak-home-drift-slow {
          animation: ak-drift 46s ease-in-out infinite alternate-reverse;
        }
        @media (prefers-reduced-motion: reduce) {
          .ak-home-drift,
          .ak-home-drift-slow {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
