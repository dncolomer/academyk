import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  lede?: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeader({
  index,
  label,
  title,
  lede,
  className,
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <header className={cn("max-w-[40rem]", className)}>
      <p className="ak-label">
        {index} / {label}
      </p>
      <Heading className="ak-serif mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">
        {title}
      </Heading>
      {lede ? <div className="mt-5 text-[0.975rem] leading-relaxed text-muted">{lede}</div> : null}
    </header>
  );
}
