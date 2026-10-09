import { Lamp } from "@/components/Lamp";
import type { Module } from "@/content/types";

function moduleCode(index: number) {
  return `M${String(index + 1).padStart(2, "0")}`;
}

const weeks = [1, 2, 3, 4] as const;

export function SyllabusTimeline({ modules }: { modules: Module[] }) {
  let running = 0;
  const groups = weeks.map((week) => ({
    week,
    items: modules
      .filter((mod) => mod.week === week)
      .map((mod) => {
        const code = moduleCode(running);
        running += 1;
        return { mod, code };
      }),
  }));

  return (
    <div className="mt-10">
      {groups.map((group) =>
        group.items.length === 0 ? null : (
          <section key={group.week} className="mt-12 first:mt-0">
            <h3 className="ak-label text-ink">Week {group.week}</h3>
            <ol className="mt-6 border-l border-line">
              {group.items.map(({ mod, code }) => (
                <li key={mod.title} className="relative pb-12 pl-5 last:pb-0 sm:pl-8">
                  <span
                    className="absolute top-1.5 -left-[4.5px] size-2 border border-ink bg-bg"
                    aria-hidden="true"
                  />
                  <p className="ak-label text-ink">{code}</p>
                  <h4 className="ak-serif mt-2 break-words text-2xl leading-tight text-ink sm:text-3xl">{mod.title}</h4>
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
          </section>
        ),
      )}
    </div>
  );
}
