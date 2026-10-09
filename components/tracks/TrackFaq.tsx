import type { Faq } from "@/content/types";

export function TrackFaq({ items }: { items: Faq[] }) {
  return (
    <div className="mt-8 border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left text-ink [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 break-words text-sm leading-snug sm:text-base">{item.q}</span>
            <span
              className="ak-mono mt-0.5 shrink-0 text-muted transition-transform duration-200 motion-reduce:transition-none group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="max-w-[40rem] pb-5 text-sm leading-relaxed break-words text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
