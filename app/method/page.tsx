import { Ticker } from "@/components/Ticker";
import { Lamp } from "@/components/Lamp";
import { Container } from "@/components/Container";
import { offer, site } from "@/content/site";
import { InlineLink } from "@/components/pages/InlineLink";
import { PageCta } from "@/components/pages/PageCta";
import { SectionBlock } from "@/components/pages/SectionBlock";
import { WorkedExample } from "@/components/pages/WorkedExample";
import { pageMetadata } from "@/components/pages/metadata";
import { sharedFormatDetail } from "@/components/pages/format";

const description = `How Academy K works. You produce an artefact in a workspace. The Uncertain Systems platform checks it against the module's criteria. Courses are self-paced for ${offer.weeks} weeks, with ${offer.liveSessions} optional live sessions.`;

export const metadata = pageMetadata({
  title: "How it works",
  description,
  path: "/method",
});

const artefacts = ["Code", "A derivation", "A model", "A written analysis"];

const selfPaced = sharedFormatDetail("Self-paced");
const verification = sharedFormatDetail("Verification");

export default function MethodPage() {
  return (
    <Container className="py-16 lg:py-24">
      <SectionBlock
        as="h1"
        index="03"
        label="Method"
        title="How it works"
        lede="How a module is finished, how a cohort runs, and what you leave with."
      >
        <p className="max-w-[40rem] text-sm leading-relaxed text-muted">
          It runs on the <InlineLink href={site.platformUrl}>Uncertain Systems</InlineLink> platform, an
          OpenLesson-based human learning harness.
        </p>
      </SectionBlock>

      <SectionBlock
        index="01"
        label="Proof of work"
        title="The artefact"
        lede="You produce an artefact in a workspace: code, a derivation, a model, or a written analysis."
      >
        <p className="max-w-[40rem] text-sm leading-relaxed text-muted">
          Each module names the artefact. That artefact is the work of the module. The syllabus calls it a
          proof-of-work deliverable.
        </p>
        <Ticker items={artefacts} className="mt-8" />
      </SectionBlock>

      <SectionBlock
        index="02"
        label="Verification"
        title="Checked against the module"
        lede={
          verification ??
          "The Uncertain Systems platform checks the proof against the module's criteria, instead of a multiple-choice test."
        }
      >
        <p className="max-w-[40rem] text-sm leading-relaxed text-muted">
          There is no exam. The platform takes the work you submitted and checks it against what the module asked for.
          A module counts as done when the work passes that check.
        </p>
        <ol className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
          {[
            { index: "01", title: "Artefact", body: "The proof you produced in the workspace." },
            { index: "02", title: "Criteria", body: "What the module asked the proof to show." },
            { index: "03", title: "Check", body: "The platform compares the proof with those criteria." },
          ].map((item) => (
            <li key={item.index} className="min-w-0 bg-bg p-5">
              <p className="ak-label flex items-center gap-2">
                <Lamp />
                {item.index}
              </p>
              <h3 className="ak-serif mt-4 text-2xl leading-tight text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </SectionBlock>

      <SectionBlock
        index="03"
        label="Cohorts"
        title="Self-paced, with optional sessions"
        lede={`Each course runs for ${offer.weeks} weeks and is self-paced. There are ${offer.liveSessions} optional live sessions with a human expert in the field. Each course is limited to ${offer.seats} people.`}
      >
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
          <li className="min-w-0 bg-bg p-5 sm:p-6">
            <p className="ak-label">01 / Self-paced</p>
            <h3 className="ak-serif mt-4 text-2xl leading-tight text-ink">Open the workspace</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {selfPaced ?? "Readings, worked examples and a guided workspace you can open any time."}
            </p>
          </li>
          <li className="min-w-0 bg-bg p-5 sm:p-6">
            <p className="ak-label flex flex-wrap items-center gap-2">
              <span>02 / Live</span>
              <span className="inline-flex items-center gap-1.5">
                <Lamp />
                Optional
              </span>
            </p>
            <h3 className="ak-serif mt-4 text-2xl leading-tight text-ink">{offer.liveSessions} sessions</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A kickoff and seven more, with a human expert in the field. Come to all of them, some, or none. The
              first cohort starts in {offer.cohortStart} and runs into {offer.cohortEnd}, {offer.holidayNote}.
            </p>
          </li>
        </ul>
      </SectionBlock>

      <SectionBlock
        index="04"
        label="Worked example"
        title="Module, workspace, proof, check"
        lede="A single module from the Thermodynamic Computing syllabus, followed from the module to verification."
      >
        <WorkedExample />
      </SectionBlock>

      <SectionBlock
        index="05"
        label="Portfolio"
        title="What you leave with"
        lede="A portfolio of verified proofs."
      >
        <p className="max-w-[40rem] text-sm leading-relaxed text-muted">
          You leave with the artefacts: code, derivations, models, written analyses. Each one has been checked
          against its module. That set is the portfolio. No certificate is promised.
        </p>
      </SectionBlock>

      <PageCta />
    </Container>
  );
}
