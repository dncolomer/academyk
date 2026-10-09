import { LinkButton } from "@/components/Button";
import { Container } from "@/components/Container";
import { Lamp } from "@/components/Lamp";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const steps = [
  {
    title: "Open a workspace",
    body: "Readings, worked examples and a guided workspace you can open any time.",
  },
  {
    title: "Build proof of work",
    body: "Each module ends with a proof-of-work deliverable you build and submit.",
  },
  {
    title: "Verification instead of tests",
    body: "The deliverable is checked by the Uncertain Systems platform instead of a multiple-choice test.",
  },
  {
    title: "Live cohort sessions",
    body: "A weekly live session to work through the hardest ideas, review proofs and ask questions.",
  },
];

export function MethodSection() {
  return (
    <Container as="section" className="border-t border-line py-20 lg:py-28">
      <Reveal>
        <SectionHeader
          index="02"
          label="How learning works"
          title="Build, then verify."
          lede="Learn by building proof, verified by the Uncertain Systems platform."
        />
      </Reveal>
      <ol className="mt-12 border-t border-line">
        {steps.map((step, i) => (
          <li key={step.title} className="min-w-0 border-b border-line py-7 sm:py-8">
            <Reveal delayMs={i * 60}>
              <div className="flex items-center gap-4">
                <span className="ak-serif w-10 shrink-0 text-3xl leading-none text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px min-w-0 flex-1 bg-line" aria-hidden />
                <Lamp />
              </div>
              <h3 className="mt-4 text-lg text-ink">{step.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      <Reveal>
        <div className="mt-8">
          <LinkButton href="/method">The method</LinkButton>
        </div>
      </Reveal>
    </Container>
  );
}
