import { Lamp } from "@/components/Lamp";
import type { Module } from "@/content/types";

function moduleCode(index: number) {
  return `M${String(index + 1).padStart(2, "0")}`;
}

export function SyllabusTimeline({ modules }: { modules: Module[] }) {
  return (
    <ol className="mt-10 border-l border-line">
      {modules.map((mod, index) => (
        <li key={mod.title} className="relative pb-12 pl-5 last:pb-0 sm:pl-8">
          <span
            className="absolute top-1.5 -left-[4.5px] size-2 border border-ink bg-bg"
            aria-hidden="true"
          />
          <p className="ak-label text-ink">{moduleCode(index)}</p>
          <h3 className="ak-serif mt-2 break-words text-2xl leading-tight text-ink sm:text-3xl">{mod.title}</h3>
          <p className="mt-3 max-w-[38rem] text-sm leading-relaxed text-muted">{mod.summary}</p>
          <div className="mt-5 max-w-[38rem] border border-line-strong bg-white/[0.04]">
            <p className="ak-label flex items-center gap-2 border-b border-line px-4 py-2.5 text-ink">
              <Lamp />
              <span className="min-w-0 break-words">Proof of work</span>
            </p>
            <p className="px-4 py-4 text-sm leading-relaxed break-words text-ink">{mod.proof}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
