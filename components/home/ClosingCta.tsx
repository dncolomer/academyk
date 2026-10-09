import { LinkButton } from "@/components/Button";
import { Container } from "@/components/Container";
import { Lamp } from "@/components/Lamp";
import { Reveal } from "@/components/Reveal";
import { site, waitlistHref } from "@/content/site";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="ak-grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <Reveal>
          <p className="ak-label flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <Lamp />
            <span>Waitlist</span>
          </p>
          <h2 className="ak-serif mt-5 max-w-[14ch] text-4xl leading-[1.02] text-ink sm:text-6xl">
            Dates are not set yet.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
            Join the waitlist and we will write to you. Dates and pricing are TBA.
          </p>
          <div className="mt-8 flex flex-col items-start gap-5">
            <LinkButton href={waitlistHref("Academy K waitlist")} solid>
              Join the waitlist
            </LinkButton>
            <a
              href={`mailto:${site.contact}`}
              className="ak-label max-w-full break-all text-ink hover:underline"
            >
              {site.contact}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
