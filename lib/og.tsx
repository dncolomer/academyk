import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Built-in face shipped with next/og is registered as "sans serif" (weight 700). No font files are fetched. */
const SERIF = "Bodoni MT, Didot, Bodoni 72, Times New Roman, serif, sans serif";
const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace, sans serif";

const INK = "#f4f4f4";
const MUTED = "#8a8a8a";
const LINE = "rgba(255,255,255,0.22)";
const GRID = "rgba(255,255,255,0.08)";

type OgCardProps = {
  label: string;
  title: string;
  subtitle: string;
};

function Blueprint() {
  const vertical = [80, 200, 400, 600, 800, 1000, 1120];
  const horizontal = [70, 180, 315, 450, 560];
  return (
    <svg width="1200" height="630" viewBox="0 0 1200 630">
      {vertical.map((x) => (
        <line key={`v-${x}`} x1={x} y1={0} x2={x} y2={630} stroke={GRID} strokeWidth={1} />
      ))}
      {horizontal.map((y) => (
        <line key={`h-${y}`} x1={0} y1={y} x2={1200} y2={y} stroke={GRID} strokeWidth={1} />
      ))}
    </svg>
  );
}

function KBar() {
  const width = 260;
  const mark = Math.round(0.73 * width);
  return (
    <div style={{ display: "flex", flexDirection: "column", width }}>
      <div style={{ display: "flex", fontFamily: SERIF, fontSize: 28, color: INK, letterSpacing: -0.6 }}>
        K = 0.73
      </div>
      <div style={{ display: "flex", position: "relative", width, height: 16, marginTop: 10 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 7,
            width,
            height: 1,
            background: LINE,
          }}
        />
        <div style={{ position: "absolute", left: 0, top: 4, width: 7, height: 7, background: INK }} />
        <div style={{ position: "absolute", left: mark - 3, top: 4, width: 7, height: 7, background: INK }} />
        <div
          style={{
            position: "absolute",
            left: width - 7,
            top: 4,
            width: 7,
            height: 7,
            border: "1px solid #f4f4f4",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width, marginTop: 6 }}>
        <div
          style={{
            display: "flex",
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: 1.6,
            color: MUTED,
            textTransform: "uppercase",
          }}
        >
          Type 0
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: 1.6,
            color: MUTED,
            textTransform: "uppercase",
          }}
        >
          Type I
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 8,
          fontFamily: MONO,
          fontSize: 12,
          letterSpacing: 1.6,
          color: MUTED,
          textTransform: "uppercase",
        }}
      >
        Estimate
      </div>
    </div>
  );
}

export function OgCard({ label, title, subtitle }: OgCardProps) {
  const inset = 32;
  const frameW = ogSize.width - inset * 2;
  const frameH = ogSize.height - inset * 2;
  const pad = 44;
  const contentW = frameW - pad * 2;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#050505",
        color: INK,
        fontFamily: SERIF,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: ogSize.width,
          height: ogSize.height,
          display: "flex",
        }}
      >
        <Blueprint />
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
        <div style={{ display: "flex", flexDirection: "column", width: contentW }}>
          <div
            style={{
              display: "flex",
              fontFamily: MONO,
              fontSize: 16,
              letterSpacing: 2.2,
              color: MUTED,
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              width: contentW,
              fontFamily: SERIF,
              fontSize: 64,
              lineHeight: 1.05,
              letterSpacing: -1.6,
              color: INK,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              width: contentW - 80,
              fontFamily: SERIF,
              fontSize: 24,
              lineHeight: 1.35,
              color: MUTED,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: contentW,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <KBar />
          <div
            style={{
              display: "flex",
              fontFamily: MONO,
              fontSize: 16,
              letterSpacing: 1.2,
              color: MUTED,
            }}
          >
            academy-k.com
          </div>
        </div>
      </div>
    </div>
  );
}

export function ogImage(props: OgCardProps) {
  return new ImageResponse(<OgCard {...props} />, {
    width: ogSize.width,
    height: ogSize.height,
  });
}
