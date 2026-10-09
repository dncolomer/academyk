import { LinkButton } from "@/components/Button";
import { Container } from "@/components/Container";
import { Lamp } from "@/components/Lamp";
import { Ticker } from "@/components/Ticker";
import { HeroAtmosphere } from "@/components/home/HeroAtmosphere";
import { waitlistHref } from "@/content/site";
import { tracks } from "@/content/tracks";

const tickerItems = [
  ...tracks.map((track) => `Track ${track.index} ${track.title}`),
  "Proof of work, verified",
  "Live cohorts",
  "Self-paced",
  "Sample syllabus — draft",
  "Uncertain Systems",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="ak-grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <HeroAtmosphere />

      <Container className="relative z-10 pt-16 pb-14 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24">
        <p className="ak-label flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1">
          <Lamp />
          <span>Academy K · Sample programme — draft</span>
        </p>
        <h1 className="ak-serif mt-6 max-w-[16ch] text-[2.75rem] leading-[0.96] text-ink sm:text-6xl lg:text-[4.75rem]">
          Learn the tech that powers the climb.
        </h1>
        <p className="mt-6 max-w-xl text-[0.975rem] leading-relaxed text-muted">
          Three tracks in frontier technology — quantum computing, AI / SI and thermodynamic
          computing — as a sample programme. You build the work. The Uncertain Systems platform
          checks it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/tracks" solid>
            Explore tracks
          </LinkButton>
          <LinkButton href={waitlistHref("Academy K waitlist")}>Join the waitlist</LinkButton>
        </div>
      </Container>

      <div className="relative z-10">
        <Ticker items={tickerItems} />
      </div>
    </section>
  );
}
