"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { trackToc, type TrackSectionId } from "@/components/tracks/sections";

export function SectionIndex() {
  const [active, setActive] = useState<TrackSectionId>(trackToc[0].id);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (trackToc.some((section) => section.id === hash)) {
      setActive(hash as TrackSectionId);
    }

    const elements = trackToc
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id && trackToc.some((section) => section.id === id)) {
          setActive(id as TrackSectionId);
        }
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
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
