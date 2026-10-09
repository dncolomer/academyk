import { ProceedsBadge } from "@/components/ProceedsBadge";
import { LinkButton } from "@/components/Button";
import { Container } from "@/components/Container";
import { Lamp } from "@/components/Lamp";
import { ReserveButton } from "@/components/ReserveButton";
import { Reveal } from "@/components/Reveal";
import { offer, site } from "@/content/site";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="ak-grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <Reveal>
          <p className="ak-label flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <Lamp />
            <span>First cohort</span>
          </p>
          <h2 className="ak-serif mt-5 max-w-[14ch] text-4xl leading-[1.02] text-ink sm:text-6xl">
            The first cohort is in {offer.cohortStart}.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
            {offer.weeks} weeks, self-paced, limited to {offer.seats} people per course.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ReserveButton />
            <LinkButton href="/tracks">Explore tracks</LinkButton>
          </div>
          <p className="mt-4 text-sm text-muted">Free to join. Payment link by email in November.</p>
          <ProceedsBadge className="mt-5 max-w-xl" />
          <a
            href={`mailto:${site.contact}`}
            className="ak-label mt-5 inline-block max-w-full break-all text-ink hover:underline"
          >
            {site.contact}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
