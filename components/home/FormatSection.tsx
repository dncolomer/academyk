import { Container } from "@/components/Container";
import { Lamp } from "@/components/Lamp";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { offer, priceLine } from "@/content/site";
import { cn } from "@/lib/cn";

const cells = [
  {
    label: "Self-paced",
    value: `${offer.weeks} weeks`,
    detail: "Readings, worked examples and a workspace. You do the work on your own time.",
  },
  {
    label: "Live sessions",
    value: `${offer.liveSessions}, optional`,
    detail: "A kickoff and seven more, with a human expert in the field. You can skip them.",
  },
  {
    label: "Verified proof",
    value: "Checked",
    detail: "Each module ends with work you submit. The Uncertain Systems platform checks it.",
  },
  {
    label: "Price",
    value: priceLine,
    detail: "USD, per course. The founding price is the first cohort. Nothing to pay on this site.",
    long: true,
  },
];

export function FormatSection() {
  return (
    <Container as="section" className="border-t border-line py-20 lg:py-28">
      <Reveal>
        <SectionHeader index="04" label="Format" title="Format" />
      </Reveal>
      <Reveal delayMs={70}>
        <ul className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {cells.map((cell) => (
            <li key={cell.label} className="min-w-0 bg-bg px-5 py-6 sm:px-6">
              <p className="ak-label flex items-start gap-2 text-ink">
                <Lamp className="mt-1" />
                <span className="min-w-0">{cell.label}</span>
              </p>
              <p
                className={cn(
                  "ak-serif mt-6 text-ink",
                  cell.long
                    ? "text-2xl leading-snug break-words sm:text-[1.65rem]"
                    : "text-3xl leading-none sm:text-4xl",
                )}
              >
                {cell.value}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">{cell.detail}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  );
}
