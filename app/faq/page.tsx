import { KardashevResearchLink } from "@/components/KardashevResearchLink";
import Link from "next/link";
import { Container } from "@/components/Container";
import { TrackGlyph } from "@/components/TrackGlyph";
import { offer, site } from "@/content/site";
import { tracks } from "@/content/tracks";
import { FaqList } from "@/components/pages/FaqList";
import { InlineLink } from "@/components/pages/InlineLink";
import { PageCta } from "@/components/pages/PageCta";
import { SectionBlock } from "@/components/pages/SectionBlock";
import { pageMetadata } from "@/components/pages/metadata";

const description =
  "Questions about Academy K: the courses, the December cohort, price and how enrolment works.";

export const metadata = pageMetadata({
  title: "FAQ",
  description,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <Container className="py-16 lg:py-24">
      <SectionBlock
        as="h1"
        index="06"
        label="FAQ"
        title="Questions"
        lede="Short answers about the courses, the cohort and enrolment."
      >
        <FaqList
          items={[
            {
              q: "What is Academy K?",
              a: (
                <>
                  {site.description} It is the sibling of{" "}
                  <InlineLink href={site.observatoryUrl}>Observatory-K</InlineLink>. K stands for Kardashev.
                  Observatory-K tracks the climb. Academy K teaches the tech. More on the{" "}
                  <InlineLink href="/about">about</InlineLink> page.
                </>
              ),
            },
            {
              q: "Is it live?",
              a: `The site is open and you can join the waitlist. The first cohort starts ${offer.cohortStart}.`,
            },
            {
              q: "How does the tutor work?",
              a: `Every student gets a personal, dedicated Grok Bot tutor, available 24/7 for the ${offer.weeks} weeks. It is included in the price; you do not need your own account. The cohort runs on Discord, where you talk directly to your tutor and to the rest of the cohort.`,
            },
            {
              q: "Who runs the live sessions?",
              a: `${offer.headTutor} is the human head tutor. The ${offer.liveSessions} live sessions are with the head tutor and the tutor bot together.`,
            },
            {
              q: "What is Uncertain Systems?",
              a: "Uncertain Systems is the knowledge verification backbone. It verifies what each student actually learned.",
            },
            {
              q: "How many people are in a cohort?",
              a: `Each course is limited to ${offer.seats} people.`,
            },
            {
              q: "When does it start?",
              a: `The first cohort starts ${offer.cohortStart} and runs into ${offer.cohortEnd}, ${offer.holidayNote}.`,
            },
            {
              q: "What does it cost?",
              a: `${offer.foundingPrice} per course (founding price, until 11 Nov 2026), then ${offer.laterPrice} per course. Prices are in USD. Two tracks together are 10% off (${offer.twoTrackFounding} founding, ${offer.twoTrackLater} later) and all three are 15% off (${offer.threeTrackFounding} and ${offer.threeTrackLater}). Nothing is paid on this site.`,
            },
            {
              q: "Where do the proceeds go?",
              a: (
                <>
                  50% of proceeds go to <KardashevResearchLink /> and related initiatives.
                </>
              ),
            },
            {
              q: "How does enrolment work?",
              a: (
                <>
                  Join the waitlist. That is free. In November we email a payment link so you can confirm your seat.
                  The steps are on the <InlineLink href="/enrol">enrolment</InlineLink> page.
                </>
              ),
            },
            {
              q: "Is joining the waitlist a commitment?",
              a: "No. Joining is free and carries no commitment. You decide when the payment link arrives.",
            },
            {
              q: "Do I need prior experience?",
              a: (
                <>
                  Each track lists its own prerequisites. Quantum Computing does not require prior quantum mechanics.
                  Thermodynamic Computing teaches statistical mechanics from the start. Read the track page before
                  you reserve a place.
                </>
              ),
            },
            {
              q: "Is there a certificate?",
              a: "No certificate is promised.",
            },
            {
              q: "Who runs it?",
              a: (
                <>
                  The contact is <InlineLink href={`mailto:${site.contact}`}>{site.contact}</InlineLink>. Academy K
                  runs on the <InlineLink href={site.platformUrl}>Uncertain Systems</InlineLink> platform. The source is on <InlineLink href={site.github}>GitHub</InlineLink>.
                </>
              ),
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock
        index="02"
        label="Track FAQ"
        title="Questions on each track"
        lede="Each track page has a short FAQ of its own."
      >
        <ul className="divide-y divide-line border-y border-line">
          {tracks.map((track) => (
            <li key={track.slug}>
              <Link
                href={`/tracks/${track.slug}#faq`}
                className="group flex min-w-0 items-center gap-4 py-4"
              >
                <TrackGlyph slug={track.slug} size={40} className="shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="ak-label">{track.index}</span>
                  <span className="mt-1 block text-ink group-hover:underline">{track.title}</span>
                </span>
                <span className="ak-label shrink-0">FAQ</span>
              </Link>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <PageCta />
    </Container>
  );
}
