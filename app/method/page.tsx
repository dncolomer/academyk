import Link from "next/link";
import { Container } from "@/components/Container";
import { Lamp } from "@/components/Lamp";
import { PageCta } from "@/components/pages/PageCta";
import { SectionBlock } from "@/components/pages/SectionBlock";
import { pageMetadata } from "@/components/pages/metadata";
import { offer } from "@/content/site";

const description = `Each course is ${offer.weeks} weeks with a personal Grok Bot tutor, ${offer.liveSessions} live sessions with the head tutor, and a cohort on Discord. ${offer.seats} seats per course. First cohort starts ${offer.cohortStart}.`;

export const metadata = pageMetadata({
  title: "How it works",
  description,
  path: "/method",
});

const facts = [
  { label: "Length", value: `${offer.weeks} weeks`, detail: `Starts ${offer.cohortStart}, ends ${offer.cohortEnd}, ${offer.holidayNote}.` },
  {
    label: "Personal tutor",
    value: "Grok Bot, 24/7",
    detail: "Every student gets a dedicated Grok Bot tutor for the 4 weeks. Included in the price, no separate account needed.",
  },
  {
    label: "Live sessions",
    value: `${offer.liveSessions} sessions`,
    detail: `With the human head tutor (${offer.headTutor}) and the tutor bot together.`,
  },
  { label: "Cohort", value: "Discord", detail: "You talk directly to your tutor and to the rest of the cohort." },
  { label: "Seats", value: `${offer.seats} per course`, detail: "In the first cohort." },
  {
    label: "Verification",
    value: "Uncertain Systems",
    detail: "Verifies what each student actually learned.",
  },
];

export default function MethodPage() {
  return (
    <Container className="py-16 lg:py-24">
      <SectionBlock
        as="h1"
        index="03"
        label="Method"
        title="How it works"
        lede={`${offer.weeks} weeks, personal Grok Bot tutor, Discord cohort, ${offer.liveSessions} live sessions.`}
      >
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <li key={fact.label} className="min-w-0 bg-bg px-5 py-6 sm:px-6">
              <p className="ak-label flex items-start gap-2 text-ink">
                <Lamp className="mt-1" />
                <span className="min-w-0">{fact.label}</span>
              </p>
              <p className="ak-serif mt-6 text-3xl leading-none text-ink">{fact.value}</p>
              <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">{fact.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[40rem] text-sm leading-relaxed text-muted">
          Joining the waitlist is free. In November you get an email with a payment link to confirm your seat. The
          steps and prices are on the <Link className="text-ink underline underline-offset-4" href="/enrol">enrol page</Link>.
        </p>
      </SectionBlock>

      <PageCta />
    </Container>
  );
}
