import Link from "next/link";
import { Container } from "@/components/Container";
import { TrackGlyph } from "@/components/TrackGlyph";
import { site, waitlistHref } from "@/content/site";
import { tracks } from "@/content/tracks";
import { FaqList } from "@/components/pages/FaqList";
import { InlineLink } from "@/components/pages/InlineLink";
import { PageCta } from "@/components/pages/PageCta";
import { SectionBlock } from "@/components/pages/SectionBlock";
import { pageMetadata } from "@/components/pages/metadata";

const description =
  "Questions about Academy K: what it is, whether a cohort is live, proof of work, prerequisites, pricing, certificates and the waitlist.";

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
        index="05"
        label="FAQ"
        title="Questions"
        lede="Short answers. Where a date, a price or a credential is not set, the answer is TBA."
      >
        <FaqList
          items={[
            {
              q: "What is Academy K?",
              a: (
                <>
                  {site.description} It is the sibling of{" "}
                  <InlineLink href={site.observatoryUrl}>Observatory-K</InlineLink>. K stands for Kardashev.
                  Observatory-K tracks the climb. Academy K teaches the tech. Read more on the{" "}
                  <InlineLink href="/about">about</InlineLink> page.
                </>
              ),
            },
            {
              q: "Is it live?",
              a: "No. Static prototype: syllabi are drafts; dates, pricing and instructors are TBA.",
            },
            {
              q: "Who runs it?",
              a: (
                <>
                  The contact is <InlineLink href={`mailto:${site.contact}`}>{site.contact}</InlineLink>. Academy K
                  runs on the <InlineLink href={site.platformUrl}>Uncertain Systems</InlineLink> platform, which
                  checks each proof. The source is on <InlineLink href={site.github}>GitHub</InlineLink>.
                </>
              ),
            },
            {
              q: "What is proof of work?",
              a: (
                <>
                  You do not pass a test. You produce an artefact — code, a derivation, a model, or a written
                  analysis — in a workspace. The Uncertain Systems platform checks that proof against the module&apos;s
                  criteria. The <InlineLink href="/method">method</InlineLink> page walks through it.
                </>
              ),
            },
            {
              q: "Do I need prior experience?",
              a: (
                <>
                  Each track lists its own prerequisites. Quantum Computing does not require prior quantum mechanics.
                  On Thermodynamic Computing, statistical mechanics is taught from the start. Read the track before
                  you write to the waitlist.
                </>
              ),
            },
            {
              q: "What does it cost?",
              a: "Pricing is TBA.",
            },
            {
              q: "Is there a certificate?",
              a: "Certificates are TBA. This site does not promise a credential.",
            },
            {
              q: "How do I join the waitlist?",
              a: (
                <>
                  Dates are not set yet. Join the waitlist and we will write to you.{" "}
                  <InlineLink href={waitlistHref("Academy K waitlist")}>Write to {site.contact}</InlineLink>.
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

      <PageCta subject="Academy K waitlist — FAQ" />
    </Container>
  );
}
