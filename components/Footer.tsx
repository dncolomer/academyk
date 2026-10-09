import Link from "next/link";
import { site } from "@/content/site";
import { primaryNav } from "@/lib/nav";
import { Container } from "@/components/Container";

const elsewhere = [
  { label: "Observatory-K", href: site.observatoryUrl },
  { label: "Uncertain Systems", href: site.platformUrl },
  { label: "GitHub", href: site.github },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="ak-label text-ink">Academy K</p>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted">{site.description}</p>
          </div>
          <div>
            <p className="ak-label text-ink">Explore</p>
            <ul className="mt-3 space-y-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="ak-label text-ink">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              {elsewhere.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted hover:text-ink"
                  >
                    {item.label} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="ak-label mt-12">Courses run on the Uncertain Systems platform</p>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Learn by building proof, verified by the Uncertain Systems platform.
        </p>
      </Container>
    </footer>
  );
}
