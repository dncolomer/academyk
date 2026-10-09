import { cn } from "@/lib/cn";

type LampProps = {
  on?: boolean;
  className?: string;
  label?: string;
};

/** Small square indicator, in the Observatory-K family of lamps. */
export function Lamp({ on = true, className, label }: LampProps) {
  return (
    <span
      className={cn(
        "inline-block size-1.5 shrink-0 border border-ink",
        on ? "bg-ink" : "bg-transparent",
        className,
      )}
      aria-hidden={label ? undefined : true}
      title={label}
    />
  );
}
