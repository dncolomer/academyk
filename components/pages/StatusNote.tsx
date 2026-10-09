import { Lamp } from "@/components/Lamp";

const STATUS = "Static prototype: syllabi are drafts; dates, pricing and instructors are TBA";

export function StatusNote() {
  return (
    <aside className="border border-line px-5 py-6 sm:px-6">
      <p className="ak-label flex items-center gap-2 text-ink">
        <Lamp label="Prototype" />
        Status
      </p>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink">{STATUS}</p>
    </aside>
  );
}
