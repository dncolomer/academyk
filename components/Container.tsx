import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "nav";
};

export function Container({ children, className, as }: ContainerProps) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={cn("mx-auto w-full min-w-0 max-w-[72rem] px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}
