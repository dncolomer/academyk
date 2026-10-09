import { Suspense } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { WaitlistForm } from "@/components/pages/WaitlistForm";
import { pageMetadata } from "@/components/pages/metadata";
import { site } from "@/content/site";

export const metadata = pageMetadata({
  title: "Join the waitlist",
  description:
    "Join the Academy K waitlist for quantum computing, AI / SI or thermodynamic computing. Dates and pricing are TBA.",
  path: "/waitlist",
});

export default function WaitlistPage() {
  return (
    <Container className="py-16 lg:py-24">
      <Reveal>
        <SectionHeader
          as="h1"
          index="06"
          label="Waitlist"
          title="Join the waitlist"
          lede="Tell us which track you want. We will write to you when a cohort is announced. Dates and pricing are TBA."
        />
      </Reveal>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Suspense fallback={<div className="h-96 border border-line" />}>
          <WaitlistForm />
        </Suspense>
        <aside className="border border-line p-5 text-sm leading-relaxed text-muted lg:self-start">
          <p className="ak-label text-ink">Privacy note · prototype</p>
          <p className="mt-3">
            This is a prototype. We collect the name, email, track and message you enter, only to contact you about
            Academy K cohorts. They are forwarded by email through the FormSubmit email-forwarding service to the
            Academy K team. They are not stored in a database on this site, and this site loads no analytics.
            FormSubmit, as a third-party service, handles them in transit under its own terms.
          </p>
          <p className="mt-3">
            To ask for your details to be removed, write to{" "}
            <a className="text-ink underline underline-offset-4" href={`mailto:${site.contact}`}>
              {site.contact}
            </a>
            .
          </p>
        </aside>
      </div>
    </Container>
  );
}
