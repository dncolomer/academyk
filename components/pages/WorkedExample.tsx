import { TrackGlyph } from "@/components/TrackGlyph";
import { getTrack } from "@/content/tracks";
import { sharedFormatDetail } from "@/components/pages/format";
import { InlineLink } from "@/components/pages/InlineLink";

export function WorkedExample() {
  const track = getTrack("thermodynamic-computing");
  const mod = track?.modules[0];
  if (!track || !mod) return null;

  const workspace =
    sharedFormatDetail("Self-paced") ??
    "Readings, worked examples and a guided workspace you can open any time.";
  const verification =
    sharedFormatDetail("Verification") ??
    "The Uncertain Systems platform checks the proof against the module's criteria.";

  const steps = [
    {
      index: "01",
      label: "Module",
      title: mod.title,
      body: mod.summary,
    },
    {
      index: "02",
      label: "Workspace",
      title: "Where the artefact is made",
      body: workspace,
    },
    {
      index: "03",
      label: "Deliverable",
      title: "The proof",
      body: mod.proof,
    },
    {
      index: "04",
      label: "Verification",
      title: "Checked against the module",
      body: verification,
    },
  ];

  return (
    <div>
      <div className="flex min-w-0 items-start gap-4 border border-line p-5 sm:p-6">
        <TrackGlyph slug={track.slug} size={56} className="mt-0.5 hidden shrink-0 sm:block" />
        <div className="min-w-0">
          <p className="ak-label break-words">
            {track.index} / {track.short} · Week {mod.week}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Module 01 of{" "}
            <InlineLink href={`/tracks/${track.slug}`}>{track.title}</InlineLink>. The deliverable below is the
            one written in the syllabus.
          </p>
        </div>
      </div>

      <ol className="mt-px grid gap-px border border-line bg-line sm:grid-cols-2">
        {steps.map((step) => (
          <li key={step.index} className="min-w-0 bg-bg p-5 sm:p-6">
            <p className="ak-label">
              {step.index} / {step.label}
            </p>
            <h3 className="ak-serif mt-4 text-2xl leading-tight text-balance text-ink">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed break-words text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
