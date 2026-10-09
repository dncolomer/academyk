import Link from "next/link";
import type { ReactNode } from "react";
import { LinkButton } from "@/components/Button";
import { KMotif } from "@/components/KMotif";
import { Lamp } from "@/components/Lamp";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TrackGlyph } from "@/components/TrackGlyph";
import { SectionIndex } from "@/components/tracks/SectionIndex";
import { SyllabusTimeline } from "@/components/tracks/SyllabusTimeline";
import { TrackFaq } from "@/components/tracks/TrackFaq";
import { site, waitlistHref } from "@/content/site";
import { tracks } from "@/content/tracks";
import type { Track } from "@/content/types";

export function TrackDetail({ track }: { track: Track }) {
  const index = tracks.findIndex((item) => item.slug === track.slug);
  const previous = tracks[(index + tracks.length - 1) % tracks.length];
  const next = tracks[(index + 1) % tracks.length];
  const waitlist = waitlistHref(track.slug);
  const moduleCount = track.modules.length;

  return (
    <div className="grid w-full grid-cols-[minmax(0,1fr)]">
      <div className="mx-auto w-full min-w-0 max-w-[72rem] px-6 py-14 sm:px-8 sm:py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_9rem] lg:items-start lg:gap-8 lg:px-10 lg:py-20 xl:grid-cols-[minmax(0,1fr)_11rem] xl:gap-12 xl:px-12 xl:py-24">
        <article className="min-w-0">
          <Reveal>
            <header className="relative isolate overflow-hidden">
              <div className="ak-grid-bg pointer-events-none absolute inset-0 opacity-90" aria-hidden />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-48 overflow-hidden sm:h-56 lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[min(48%,380px)]" aria-hidden>
                <div className="absolute top-0 left-1/2 w-[280px] -translate-x-1/2 sm:w-[320px] lg:top-6 lg:right-0 lg:left-auto lg:w-[340px] lg:translate-x-0 xl:w-[360px]">
                  <div className="ak-glyph-float opacity-[0.32] lg:opacity-[0.6]">
                    <TrackGlyph
                      slug={track.slug}
                      size={360}
                      className="h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] lg:h-[340px] lg:w-[340px] xl:h-[360px] xl:w-[360px]"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/15 to-bg lg:bg-gradient-to-l lg:from-transparent lg:via-bg/20 lg:to-bg" />
              </div>
              <div className="ak-scan" aria-hidden />

              <div className="relative z-10 pt-48 sm:pt-56 lg:pt-0 lg:pr-[min(30%,280px)]">
                <p className="ak-label max-w-full break-words">
                  Track {track.index} / {track.title}
                </p>
                <h1 className="ak-serif mt-4 text-4xl leading-[1.02] text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[0.98]">
                  {track.title}
                </h1>
              </div>

              <p className="relative z-10 mt-6 max-w-[40rem] lg:max-w-[min(24rem,52%)] text-[0.975rem] leading-relaxed text-pretty text-muted sm:text-base">
                {track.tagline}
              </p>

              <p className="ak-label relative z-10 mt-6 inline-flex max-w-full items-center gap-2 break-words text-ink">
                <Lamp />
                <span>{track.status}</span>
              </p>

              <dl className="relative z-10 mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4 [&>*]:bg-bg">
                <Fact label="Duration">{track.timeCommitment.duration}</Fact>
                <Fact label="Weekly">{track.timeCommitment.weekly}</Fact>
                <Fact label="Modules">{moduleCount}</Fact>
                <Fact label="Format">{track.format.map((item) => item.label).join(" · ")}</Fact>
              </dl>
              <p className="relative z-10 mt-3 max-w-[40rem] text-sm leading-relaxed text-muted">{track.timeCommitment.note}</p>

              <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <LinkButton solid href={waitlist} className="w-full sm:w-auto">
                  Join the waitlist
                </LinkButton>
                <LinkButton href="#syllabus" className="w-full sm:w-auto">
                  See syllabus
                </LinkButton>
              </div>
            </header>
          </Reveal>

          <Reveal>
            <section id="climb" className="mt-20 scroll-mt-24 sm:mt-24">
              <SectionHeader index="01" label="The climb" title={track.kardashevAngle} lede={track.hook} />
              <div className="mt-8 max-w-sm">
                <KMotif compact observatoryHref={site.observatoryUrl} />
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section id="audience" className="mt-20 scroll-mt-24 sm:mt-24">
              <SectionHeader index="02" label="Who it's for" title="Who it's for" />
              <ul className="mt-8 grid gap-3">
                {track.audience.map((item, itemIndex) => (
                  <li key={item} className="flex min-w-0 gap-4 border border-line p-4">
                    <span className="ak-label shrink-0 text-ink">{pad(itemIndex)}</span>
                    <span className="min-w-0 break-words text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section id="prerequisites" className="mt-20 scroll-mt-24 sm:mt-24">
              <SectionHeader index="03" label="Prerequisites & time" title="Prerequisites and time" />
              <ul className="mt-8 grid gap-3">
                {track.prerequisites.map((item, itemIndex) => (
                  <li key={item} className="flex min-w-0 gap-4 border border-line p-4">
                    <span className="ak-label shrink-0 text-ink">{pad(itemIndex)}</span>
                    <span className="min-w-0 break-words text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-3">
                <Fact label="Duration">{track.timeCommitment.duration}</Fact>
                <Fact label="Weekly">{track.timeCommitment.weekly}</Fact>
                <Fact label="Note">{track.timeCommitment.note}</Fact>
              </dl>
            </section>
          </Reveal>

          <Reveal>
            <section id="syllabus" className="mt-20 scroll-mt-24 border-y border-line py-14 sm:mt-24 sm:py-16">
              <SectionHeader
                index="04"
                label="Syllabus"
                title="Syllabus"
                lede={`${moduleCount} modules. Each module ends with a proof-of-work deliverable.`}
              />
              <p className="ak-label mt-6 inline-flex max-w-full items-center gap-2 break-words text-ink">
                <Lamp />
                <span>{track.status}</span>
              </p>
              <SyllabusTimeline modules={track.modules} />
            </section>
          </Reveal>

          <Reveal>
            <section id="format" className="mt-20 scroll-mt-24 sm:mt-24">
              <SectionHeader index="05" label="Format" title="Format" />
              <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
                {track.format.map((item, itemIndex) => (
                  <li key={item.label} className="min-w-0 bg-bg p-5">
                    <p className="ak-label text-ink">{pad(itemIndex)}</p>
                    <h3 className="mt-3 break-words text-sm text-ink">{item.label}</h3>
                    <p className="mt-2 break-words text-sm leading-relaxed text-muted">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section id="outcomes" className="mt-20 scroll-mt-24 sm:mt-24">
              <SectionHeader index="06" label="Outcomes" title="Outcomes" />
              <ol className="mt-8 grid gap-3">
                {track.outcomes.map((item, itemIndex) => (
                  <li key={item} className="flex min-w-0 gap-4 border border-line p-4">
                    <span className="ak-label shrink-0 text-ink">{pad(itemIndex)}</span>
                    <span className="min-w-0 break-words text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          <Reveal>
            <section id="faq" className="mt-20 scroll-mt-24 sm:mt-24">
              <SectionHeader index="07" label="FAQ" title="FAQ" />
              <TrackFaq items={track.faq} />
            </section>
          </Reveal>

          <Reveal>
            <section className="mt-20 border border-line p-6 sm:mt-24 sm:p-10" aria-labelledby="enrol-heading">
              <p className="ak-label">
                {track.index} / {track.short}
              </p>
              <h2 id="enrol-heading" className="ak-serif mt-4 break-words text-3xl leading-tight text-ink sm:text-4xl">
                Enrolment opens soon — dates and pricing TBA
              </h2>
              <div className="mt-6">
                <LinkButton solid href={waitlist} className="w-full sm:w-auto">
                  Join the waitlist
                </LinkButton>
              </div>
            </section>
          </Reveal>

          <nav aria-label="Adjacent tracks" className="mt-8 grid border border-line sm:grid-cols-2">
            <TrackLink track={previous} direction="Previous" />
            <TrackLink track={next} direction="Next" align="end" />
          </nav>
          <p className="mt-4">
            <Link href="/tracks" className="ak-label text-ink hover:underline">
              All tracks
            </Link>
          </p>
        </article>

        <SectionIndex />
      </div>
    </div>
  );
}

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0 bg-bg px-4 py-4">
      <dt className="ak-label">{label}</dt>
      <dd className="mt-2 break-words text-sm leading-snug text-ink">{children}</dd>
    </div>
  );
}

function TrackLink({
  track,
  direction,
  align = "start",
}: {
  track: Track;
  direction: "Previous" | "Next";
  align?: "start" | "end";
}) {
  const end = align === "end";
  return (
    <Link
      href={`/tracks/${track.slug}`}
      className={
        end
          ? "ak-link-row min-w-0 border-line p-5 sm:border-l sm:text-right"
          : "ak-link-row min-w-0 border-b border-line p-5 sm:border-b-0"
      }
    >
      <span className="ak-label">
        {direction} · {track.index}
      </span>
      <span className="ak-serif mt-2 block break-words text-2xl leading-tight text-ink">{track.title}</span>
    </Link>
  );
}
