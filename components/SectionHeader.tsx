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
    <header className={cn("min-w-0", className)}>
      <p className="ak-label max-w-full break-words">
        {index} / {label}
      </p>
      <div
        className={
          lede
            ? "mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-16"
            : "mt-4"
        }
      >
        <Heading className="ak-serif min-w-0 break-words text-4xl leading-[1.05] text-ink sm:text-5xl">
          {title}
        </Heading>
        {lede ? (
          <div className="mt-5 min-w-0 text-[0.975rem] leading-relaxed break-words text-muted lg:mt-2">
            {lede}
          </div>
        ) : null}
      </div>
    </header>
  );
}
