"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { activeSectionId, trackToc, type TrackSectionId } from "@/components/tracks/sections";

/** Reading line, as a fraction of the viewport, kept near the top. */
const LINE_RATIO = 0.2;

export function SectionIndex() {
  const [active, setActive] = useState<TrackSectionId>(trackToc[0].id);

  useEffect(() => {
    const elements = trackToc
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const apply = () => {
      const line = Math.min(168, Math.max(88, window.innerHeight * LINE_RATIO));
      const next = activeSectionId(
        elements.map((element) => ({
          id: element.id as TrackSectionId,
          top: element.getBoundingClientRect().top,
        })),
        line,
      );
      setActive(next);
    };

    apply();

    // A band through the upper half of the viewport. Any section that enters,
    // leaves, or crosses a threshold remeasures every heading and keeps the
    // one nearest the top — not the one with the largest intersection ratio.
    const observer = new IntersectionObserver(apply, {
      root: null,
      rootMargin: "-8% 0px -45% 0px",
      threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
    });
    elements.forEach((element) => observer.observe(element));

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    window.addEventListener("hashchange", apply);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      window.removeEventListener("hashchange", apply);
    };
  }, []);

  return (
    <nav aria-label="On this page" className="sticky top-10 hidden h-fit self-start lg:block">
      <p className="ak-label">On this page</p>
      <ul className="mt-4 space-y-1">
        {trackToc.map((section) => {
          const current = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "ak-mono flex min-w-0 items-baseline gap-2 border-l py-1 pl-3 text-[11px] leading-snug tracking-[0.12em] uppercase break-words",
                  current ? "border-ink text-ink" : "border-line text-muted hover:text-ink",
                )}
              >
                <span className="shrink-0">{section.index}</span>
                <span className="min-w-0">{section.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
