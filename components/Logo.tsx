import { cn } from "@/lib/cn";

type LogoProps = {
  size?: number;
  className?: string;
  title?: string;
};

/** Stepped square-ladder mark — a climb, readable at 24px. */
export function Logo({ size = 24, className, title }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 text-ink", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <rect x="2" y="15" width="7" height="7" stroke="currentColor" strokeWidth="1.25" />
      <rect x="8.5" y="8.5" width="7" height="7" stroke="currentColor" strokeWidth="1.25" />
      <rect x="15" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Logo size={24} />
      <span className="ak-label text-ink">Academy K</span>
    </span>
  );
}
