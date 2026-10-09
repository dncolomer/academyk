import Link from "next/link";
import { Container } from "@/components/Container";
import { ReserveButton } from "@/components/ReserveButton";
import { TrackGlyph } from "@/components/TrackGlyph";
import { SectionBlock } from "@/components/pages/SectionBlock";
import { pageMetadata } from "@/components/pages/metadata";
import { offer, priceLine } from "@/content/site";
import { tracks } from "@/content/tracks";

const description = `How Academy K enrolment works. Join the waitlist for free. A payment link arrives by email in November. ${priceLine} per course, USD. The first cohort starts in ${offer.cohortStart}.`;

export const metadata = pageMetadata({
  title: "How enrolment works",
  description,
  path: "/enrol",
});

const steps = [
  {
    index: "01",
    title: "Join the waitlist",
    body: "Free. No payment, and no commitment. Tell us which course you want, or say you are not sure.",
  },
  {
    index: "02",
    title: "Confirm your seat in November",
    body: `In November you get an email with a payment link. The first cohort is ${offer.foundingPrice} per course (founding price). Later cohorts are ${offer.laterPrice} per course. Prices are in USD. Seats are confirmed in the order payments come in. Nothing is paid on this site.`,
  },
  {
    index: "03",
    title: "Start in December",
    body: `A ${offer.weeks}-week self-paced course starts in ${offer.cohortStart} and runs into ${offer.cohortEnd}, ${offer.holidayNote}. There are ${offer.liveSessions} optional live sessions with a human expert in the field: a kickoff and seven more.`,
  },
];

export default function EnrolPage() {
  return (
    <Container className="py-16 lg:py-24">
      <SectionBlock
        as="h1"
        index="04"
        label="Enrol"
        title="How enrolment works"
        lede="Three steps. Joining the list is free. The payment link comes later, by email."
      >
        <ol className="grid gap-px border border-line bg-line sm:grid-cols-3">
          {steps.map((step) => (
            <li key={step.index} className="min-w-0 bg-bg p-5 sm:p-6">
              <p className="ak-label">{step.index}</p>
              <h2 className="ak-serif mt-4 text-2xl leading-tight text-ink">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted">Free to join. Nothing to pay now.</p>
      </SectionBlock>

      <SectionBlock index="01" label="Price" title="Founding price">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          <div className="min-w-0 bg-bg p-5 sm:p-6">
            <p className="ak-label">First cohort</p>
            <p className="ak-serif mt-4 text-4xl leading-none text-ink sm:text-5xl">{offer.foundingPrice}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Founding price, per course, USD. Limited to {offer.seats} people per course.
            </p>
          </div>
          <div className="min-w-0 bg-bg p-5 sm:p-6">
            <p className="ak-label">Later cohorts</p>
            <p className="ak-serif mt-4 text-4xl leading-none text-ink sm:text-5xl">{offer.laterPrice}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">Per course, USD, after the first cohort.</p>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Each course is limited to {offer.seats} people. The payment link is sent by email around November, about
          four weeks before the {offer.cohortStart} start.
        </p>
      </SectionBlock>

      <SectionBlock
        index="02"
        label="Tracks"
        title="Three courses"
        lede="Same length, same price, different subject. Pick one on the form, or choose Not sure."
      >
        <ul className="grid gap-4">
          {tracks.map((track) => (
            <li key={track.slug} className="border border-line p-5 sm:p-6">
              <div className="flex items-start gap-4 sm:gap-5">
                <TrackGlyph
                  slug={track.slug}
                  size={72}
                  className="mt-0.5 h-14 w-14 shrink-0 sm:h-[72px] sm:w-[72px]"
                />
                <div className="min-w-0">
                  <p className="ak-label">{track.index}</p>
                  <h3 className="ak-serif mt-2 break-words text-2xl leading-tight text-ink sm:text-3xl">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{track.tagline}</p>
                  <p className="ak-label mt-3">
                    Four weekly blocks, {track.modules.length} modules
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <ReserveButton slug={track.slug} />
                <Link href={`/tracks/${track.slug}`} className="ak-label text-ink hover:underline">
                  View track
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </SectionBlock>
    </Container>
  );
}
