import { LinkButton } from "@/components/Button";
import { Container } from "@/components/Container";
import { Lamp } from "@/components/Lamp";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { offer } from "@/content/site";

const steps = [
  {
    title: "Open a workspace",
    body: "Readings, worked examples and a guided workspace you can open any time.",
  },
  {
    title: "Build the proof",
    body: "Each module ends with a proof-of-work deliverable you build and submit.",
  },
  {
    title: "The platform checks it",
    body: "The Uncertain Systems platform checks the deliverable against the module's criteria. There is no multiple-choice test.",
  },
  {
    title: "Optional live sessions",
    body: `${offer.liveSessions} sessions with a human expert in the field: a kickoff and seven more. Come to all of them, some, or none.`,
  },
];

export function MethodSection() {
  return (
    <Container as="section" className="border-t border-line py-20 lg:py-28">
      <Reveal>
        <SectionHeader
          index="02"
          label="How learning works"
          title="How it works"
          lede="Learn by building proof, verified by the Uncertain Systems platform."
        />
      </Reveal>
      <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="min-w-0 bg-bg">
            <Reveal delayMs={i * 60} className="h-full">
              <div className="flex h-full min-w-0 flex-col p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="ak-serif w-10 shrink-0 text-3xl leading-none text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px min-w-0 flex-1 bg-line" aria-hidden />
                  <Lamp />
                </div>
                <h3 className="mt-5 break-words text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">{step.body}</p>
              </div>
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
