import { Ticker } from "@/components/Ticker";
import { Lamp } from "@/components/Lamp";
import { Container } from "@/components/Container";
import { site } from "@/content/site";
import { InlineLink } from "@/components/pages/InlineLink";
import { PageCta } from "@/components/pages/PageCta";
import { SectionBlock } from "@/components/pages/SectionBlock";
import { WorkedExample } from "@/components/pages/WorkedExample";
import { pageMetadata } from "@/components/pages/metadata";
import { sharedFormatDetail } from "@/components/pages/format";

const description =
  "How Academy K works. You produce an artefact in a workspace. The Uncertain Systems platform checks it against the module's criteria. Cohorts pair self-paced materials with weekly live sessions. Schedule TBA.";

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
        lede="An artefact, a check against the module, a cohort, a worked example, and the portfolio you leave with."
      >
        <p className="max-w-[40rem] text-sm leading-relaxed text-muted">
          It runs on the <InlineLink href={site.platformUrl}>Uncertain Systems</InlineLink> platform, an
          OpenLesson-based human learning harness.
        </p>
      </SectionBlock>

      <SectionBlock
        index="01"
        label="Proof of work"
        title="An artefact, not a pass mark"
        lede="You do not pass a test. You produce an artefact: code, a derivation, a model, or a written analysis, in a workspace."
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
          Verification replaces a test. The platform checks the proof you produced against the criteria of that
          module. This page stays at that level: it does not state scores, thresholds or timings, because none are
          published here.
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
        title="Self-paced, then a live review"
        lede="Self-paced materials, plus weekly live sessions to review proofs. The schedule is TBA."
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
                <Lamp on={false} />
                Schedule TBA
              </span>
            </p>
            <h3 className="ak-serif mt-4 text-2xl leading-tight text-ink">Review the proofs</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Weekly live sessions review the proofs. What a session covers is written on each track. The timetable
              is TBA.
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
          against its module. That set is the portfolio. This site does not describe a credential beyond it.
        </p>
      </SectionBlock>

      <PageCta />
    </Container>
  );
}
