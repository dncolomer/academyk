import { LinkButton } from "@/components/Button";
import { Container } from "@/components/Container";
import { KMotif } from "@/components/KMotif";
import { site } from "@/content/site";
import { pageMetadata } from "@/components/pages/metadata";

export const metadata = pageMetadata({
  title: "Page not found",
  description: "This address does not match a page in Academy K.",
  path: "/404",
});

export default function NotFound() {
  return (
    <Container className="py-16 lg:py-24">
      <p className="ak-label">00 / Missing</p>
      <p className="ak-serif mt-6 text-7xl leading-none text-ink sm:text-8xl">404</p>
      <h1 className="ak-serif mt-6 max-w-xl text-4xl leading-[1.05] text-balance text-ink sm:text-5xl">
        This page is not on the map.
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
        The address does not match a page in this prototype. The tracks, the method and the FAQ are still on the
        site.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton href="/" solid>
          Home
        </LinkButton>
        <LinkButton href="/tracks">Tracks</LinkButton>
        <LinkButton href="/method">Method</LinkButton>
      </div>
      <KMotif compact observatoryHref={site.observatoryUrl} className="mt-16 max-w-xs" />
    </Container>
  );
}
