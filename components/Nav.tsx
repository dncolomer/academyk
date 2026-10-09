"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tracks } from "@/content/tracks";
import { isActivePath, primaryNav } from "@/lib/nav";
import { cn } from "@/lib/cn";

type NavProps = {
  onNavigate?: () => void;
  variant?: "sidebar" | "overlay";
};

export function PrimaryNav({ onNavigate, variant = "sidebar" }: NavProps) {
  const pathname = usePathname();
  const overlay = variant === "overlay";

  return (
    <ul className={cn("flex flex-col", overlay ? "gap-1" : "gap-0.5")}>
      {primaryNav.map((item) => {
        const current = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={current ? "page" : undefined}
              className={cn(
                "flex items-baseline gap-3 px-2 transition-colors",
                overlay ? "py-2.5" : "py-1.5",
                current ? "bg-ink text-bg" : "text-muted hover:text-ink",
              )}
            >
              <span className={cn("ak-mono w-6 shrink-0 text-[11px] tracking-[0.14em]", overlay && "w-8")}>
                {item.index}
              </span>
              <span className={cn(overlay ? "ak-serif text-3xl leading-none" : "text-[13px] tracking-wide")}>
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export { PrimaryNav as Nav };

export function TrackNav({ onNavigate, variant = "sidebar" }: NavProps) {
  const pathname = usePathname();
  const overlay = variant === "overlay";

  return (
    <ul className={cn("flex flex-col", overlay ? "gap-1" : "gap-0.5")}>
      {tracks.map((track) => {
        const href = `/tracks/${track.slug}`;
        const current = isActivePath(pathname, href);
        return (
          <li key={track.slug}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={current ? "page" : undefined}
              className={cn(
                "flex items-baseline gap-3 px-2 py-1.5 transition-colors",
                current ? "bg-ink text-bg" : "text-muted hover:text-ink",
              )}
            >
              <span className="ak-mono w-6 shrink-0 text-[11px] tracking-[0.14em]">{track.index}</span>
              <span className={cn(overlay ? "text-base" : "text-[13px] tracking-wide")}>{track.short}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
