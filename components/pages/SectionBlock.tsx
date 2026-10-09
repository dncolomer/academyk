import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/cn";

type SectionBlockProps = {
  index: string;
  label: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionBlock({
  index,
  label,
  title,
  lede,
  children,
  as = "h2",
  className,
}: SectionBlockProps) {
  return (
    <Reveal className={cn(as === "h1" ? undefined : "mt-20 sm:mt-24", className)}>
      <section>
        <SectionHeader as={as} index={index} label={label} title={title} lede={lede} />
        {children ? <div className="mt-8">{children}</div> : null}
      </section>
    </Reveal>
  );
}
