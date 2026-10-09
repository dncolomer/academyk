import { KMotif } from "@/components/KMotif";
import { LinkButton } from "@/components/Button";
import { Container } from "@/components/Container";
import { site, waitlistHref } from "@/content/site";
import { InlineLink } from "@/components/pages/InlineLink";
import { Principles } from "@/components/pages/Principles";
import { SectionBlock } from "@/components/pages/SectionBlock";
import { StatusNote } from "@/components/pages/StatusNote";
import { pageMetadata } from "@/components/pages/metadata";

const description =
  "Academy K teaches the frontier tech that climbs the Kardashev scale. Sibling of Observatory-K. Runs on the Uncertain Systems platform. Static prototype: syllabi are drafts; dates, pricing and instructors are TBA.";

export const metadata = pageMetadata({
  title: "About",
  description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-16 lg:py-24">
      <SectionBlock
        as="h1"
        index="04"
        label="About"
        title="Academy K"
        lede={site.description}
      />

      <SectionBlock
        index="01"
        label="Sibling"
        title="K is Kardashev"
        lede="Academy K is the sibling of Observatory-K. Observatory-K tracks the climb. Academy K teaches the tech."
      >
        <div className="grid gap-10 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] sm:items-end">
          <KMotif observatoryHref={site.observatoryUrl} />
          <p className="max-w-md text-sm leading-relaxed text-muted">
            The scale is marked illustrative.{" "}
            <InlineLink href={site.observatoryUrl}>Observatory-K</InlineLink> follows the climb. The academy teaches
            the three tracks: quantum computing, AI / SI and thermodynamic computing.
          </p>
        </div>
      </SectionBlock>

      <SectionBlock
        index="02"
        label="Platform"
        title="Uncertain Systems"
        lede="Academy K runs on the Uncertain Systems platform. The platform checks each module's proof."
      >
        <InlineLink href={site.platformUrl}>{site.platformUrl}</InlineLink>
      </SectionBlock>

      <SectionBlock index="03" label="Status" title="A prototype, stated plainly">
        <StatusNote />
      </SectionBlock>

      <SectionBlock
        index="04"
        label="Contact"
        title="Write, or read the source"
        lede="Dates are not set yet. Join the waitlist and we will write to you."
      >
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          <a href={`mailto:${site.contact}`} className="min-w-0 bg-bg p-5 transition-colors hover:bg-white/[0.03] sm:p-6">
            <p className="ak-label">Email</p>
            <p className="mt-3 text-sm break-all text-ink">{site.contact}</p>
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 bg-bg p-5 transition-colors hover:bg-white/[0.03] sm:p-6"
          >
            <p className="ak-label">GitHub</p>
            <p className="mt-3 text-sm break-all text-ink">
              {site.github} <span aria-hidden>↗</span>
            </p>
          </a>
        </div>
        <div className="mt-6">
          <LinkButton href={waitlistHref()} solid>
            Join the waitlist
          </LinkButton>
        </div>
      </SectionBlock>

      <SectionBlock
        index="05"
        label="Principles"
        title="Three rules for the work"
        lede="How a module is finished, what the syllabus is for, and how you learn it."
      >
        <Principles />
      </SectionBlock>
    </Container>
  );
}
