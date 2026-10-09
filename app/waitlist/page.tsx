import { Suspense } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { WaitlistForm } from "@/components/pages/WaitlistForm";
import { pageMetadata } from "@/components/pages/metadata";
import { offer, site } from "@/content/site";

export const metadata = pageMetadata({
  title: "Reserve your place",
  description: `Join the Academy K waitlist for quantum computing, AI / SI or thermodynamic computing. Free, with no payment now. A payment link arrives by email in November. The first cohort starts in ${offer.cohortStart}.`,
  path: "/waitlist",
});

export default function WaitlistPage() {
  return (
    <Container className="py-16 lg:py-24">
      <Reveal>
        <SectionHeader
          as="h1"
          index="07"
          label="Waitlist"
          title="Reserve your place"
          lede="Joining is free. There is nothing to pay now, and no commitment. In November we email a link to confirm your seat."
        />
      </Reveal>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Suspense fallback={<div className="h-96 border border-line" />}>
          <WaitlistForm />
        </Suspense>
        <aside className="border border-line p-5 text-sm leading-relaxed text-muted lg:self-start">
          <p className="ak-label text-ink">Privacy note</p>
          <p className="mt-3">
            We collect the name, email, track and message you enter. We use your email to send the November payment
            link and cohort updates. Submissions are forwarded by email through the FormSubmit email-forwarding
            service to the Academy K team. They are not stored in a database on this site. This site has no
            analytics. FormSubmit, as a third-party service, handles them in transit under its own terms.
          </p>
          <p className="mt-3">
            To remove your details, write to{" "}
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
