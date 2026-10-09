import { Container } from "@/components/Container";
import { Lamp } from "@/components/Lamp";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const cells = [
  {
    label: "Self-paced",
    value: "Any time",
    detail: "Readings, worked examples and a guided workspace you can open any time.",
  },
  {
    label: "Live cohorts",
    value: "Weekly",
    detail: "A live session to work through the hardest ideas, review proofs and ask questions.",
  },
  {
    label: "Verified proof",
    value: "Checked",
    detail: "A deliverable reviewed by the Uncertain Systems platform instead of a multiple-choice test.",
  },
  {
    label: "Pricing",
    value: "TBA",
    detail: "Dates and pricing are TBA.",
  },
];

export function FormatSection() {
  return (
    <Container as="section" className="border-t border-line py-20 lg:py-28">
      <Reveal>
        <SectionHeader index="04" label="Format at a glance" title="Cohort, pace, proof, price." />
      </Reveal>
      <Reveal delayMs={70}>
        <ul className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {cells.map((cell) => (
            <li key={cell.label} className="min-w-0 bg-bg px-5 py-6 sm:px-6">
              <p className="ak-label flex items-start gap-2 text-ink">
                <Lamp className="mt-1" />
                <span className="min-w-0">{cell.label}</span>
              </p>
              <p className="ak-serif mt-6 text-3xl leading-none text-ink sm:text-4xl">{cell.value}</p>
              <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">{cell.detail}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  );
}
