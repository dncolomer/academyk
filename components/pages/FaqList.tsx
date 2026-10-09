import type { ReactNode } from "react";

export type FaqItem = {
  q: string;
  a: ReactNode;
};

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item, index) => (
        <details key={item.q} name="academy-faq" className="group border-b border-line" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-start gap-3 py-5 sm:gap-4 [&::-webkit-details-marker]:hidden">
            <span className="ak-label mt-1 w-7 shrink-0">{String(index + 1).padStart(2, "0")}</span>
            <span className="min-w-0 flex-1 text-base leading-snug text-ink">{item.q}</span>
            <span className="ak-label mt-1 shrink-0 group-open:hidden" aria-hidden>
              +
            </span>
            <span className="ak-label mt-1 hidden shrink-0 group-open:inline" aria-hidden>
              –
            </span>
          </summary>
          <div className="max-w-[40rem] pb-5 pl-10 text-sm leading-relaxed text-muted sm:pl-11">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
