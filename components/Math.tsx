"use client";

import katex from "katex";
import { useMemo } from "react";

type MathProps = {
  children: string;
  display?: boolean;
  className?: string;
};

export function Math({ children, display = false, className }: MathProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, {
        displayMode: display,
        throwOnError: false,
        trust: true,
        strict: false,
      });
    } catch {
      return children;
    }
  }, [children, display]);

  if (display) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function InlineMath({ children, className }: Omit<MathProps, "display">) {
  return <Math className={className}>{children}</Math>;
}

export function BlockMath({ children, className }: Omit<MathProps, "display">) {
  return <Math display className={className}>{children}</Math>;
}
