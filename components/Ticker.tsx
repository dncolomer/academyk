import { cn } from "@/lib/cn";

type TickerProps = {
  items: string[];
  className?: string;
  durationSec?: number;
};

export function Ticker({ items, className, durationSec = 42 }: TickerProps) {
  if (items.length === 0) return null;

  const boxes = (keyPrefix: string) =>
    items.map((item, i) => (
      <span key={`${keyPrefix}-${i}`} className="ak-ticker-item">
        {item}
      </span>
    ));

  return (
    <div className={cn("ak-ticker", className)}>
      <p className="sr-only">{items.join(". ")}</p>
      <div className="ak-ticker-track" style={{ animationDuration: `${durationSec}s` }} aria-hidden="true">
        {boxes("a")}
        {boxes("b")}
      </div>
    </div>
  );
}
