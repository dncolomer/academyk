const STARS: Array<[number, number, number, boolean]> = [
  [70, 48, 0.4, true],
  [128, 120, 0.22, false],
  [186, 64, 0.32, false],
  [240, 168, 0.16, false],
  [310, 88, 0.38, true],
  [390, 42, 0.2, false],
  [470, 140, 0.28, false],
  [560, 70, 0.45, true],
  [640, 180, 0.16, false],
  [720, 36, 0.3, false],
  [810, 110, 0.22, true],
  [890, 58, 0.4, false],
  [980, 150, 0.18, false],
  [1060, 40, 0.34, true],
  [1140, 96, 0.2, false],
  [1220, 168, 0.28, false],
  [1320, 52, 0.36, false],
  [48, 220, 0.16, false],
  [1010, 210, 0.14, false],
  [1380, 200, 0.22, true],
];

const HORIZON = 508;
const FLOOR = 900;
const VANISH_X = 860;

const depthLines = Array.from({ length: 14 }, (_, index) => {
  const t = (index + 1) / 14;
  return HORIZON + (FLOOR - HORIZON) * Math.pow(t, 1.62);
});

const rays = Array.from({ length: 23 }, (_, index) => -80 + index * 74);

const flight = [
  [120, 860, 250],
  [250, 800, 390],
  [390, 742, 530],
  [530, 688, 680],
  [680, 640, 840],
  [840, 596, 1000],
  [1000, 556, 1160],
  [1160, 524, 1320],
] as const;

/**
 * Hero backdrop: a perspective floor, an ascending terrace flight,
 * drifting glows and faint stars. Decorative only.
 */
export function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="ak-home-drift absolute -left-16 top-[-12%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_68%)] sm:h-[34rem] sm:w-[34rem]" />
      <div className="ak-home-drift-slow absolute right-[-8%] bottom-[-10%] h-[28rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.055),transparent_64%)] sm:h-[40rem] sm:w-[44rem]" />
      <div className="ak-home-drift absolute top-[42%] left-[46%] h-40 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_70%)]" />

      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full text-ink opacity-45 sm:opacity-70"
      >
        {STARS.map(([cx, cy, opacity, pulse]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={pulse ? 1.6 : 1.05}
            fill="currentColor"
            opacity={opacity}
            className={pulse ? "ak-pulse" : undefined}
          />
        ))}

        <g opacity="0.55">
          <line x1="0" y1={HORIZON} x2="1440" y2={HORIZON} stroke="currentColor" strokeWidth="1" />
          <path
            d={`M0 ${HORIZON + 18} H1440`}
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.25"
          />
        </g>

        <g opacity="0.42">
          {depthLines.map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="1440"
              y2={y}
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity={y < HORIZON + 80 ? 0.28 : 0.55}
            />
          ))}
          {rays.map((x) => (
            <line
              key={x}
              x1={VANISH_X}
              y1={HORIZON}
              x2={x}
              y2={FLOOR}
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          ))}
        </g>

        <g opacity="0.28">
          {flight.map(([x0, y, x1], index) => (
            <path
              key={`ghost-${x0}`}
              d={`M${x0 + 70} ${y + 36} H${x1 + 70} V${flight[index + 1]?.[1] ?? HORIZON + 28} H${x0 + 70} Z`}
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </g>

        <g>
          {flight.map(([x0, y, x1], index) => {
            const nextY = flight[index + 1]?.[1] ?? HORIZON;
            return (
              <g key={`${x0}-${y}`}>
                <path
                  d={`M${x0} ${y + 28} H${x1} V${y} H${x0} Z`}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity={0.55 + index * 0.04}
                />
                <path
                  d={`M${x0} ${y} H${x1} V${nextY + 28}`}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.35"
                />
                <line
                  x1={x0 + 18}
                  y1={y + 10}
                  x2={x1 - 16}
                  y2={y + 10}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.35"
                  strokeDasharray="2 4"
                />
              </g>
            );
          })}
          <circle cx="1320" cy="524" r="2.2" fill="currentColor" />
          <circle cx="1000" cy="556" r="1.6" fill="currentColor" opacity="0.7" />
          <circle cx="680" cy="640" r="1.6" fill="currentColor" opacity="0.55" />
        </g>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-r from-bg from-0% via-bg/80 via-38% to-transparent to-72% sm:via-bg/55" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
