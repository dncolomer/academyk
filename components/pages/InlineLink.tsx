import type { ReactNode } from "react";
import Link from "next/link";

const className =
  "break-words text-ink underline decoration-white/25 underline-offset-4 hover:decoration-ink";

export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  const external = href.startsWith("http://") || href.startsWith("https://");
  return (
    <a href={href} className={className} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}
