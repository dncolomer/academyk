"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Wordmark } from "@/components/Logo";
import { PrimaryNav, TrackNav } from "@/components/Nav";
import { cn } from "@/lib/cn";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-bg/90 lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <Wordmark />
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex size-10 items-center justify-center border border-line text-ink"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block size-3.5" aria-hidden>
              <span
                className={cn(
                  "absolute inset-x-0 top-[3px] h-px bg-ink transition-transform duration-200",
                  open && "top-[6.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 top-[10px] h-px bg-ink transition-transform duration-200",
                  open && "top-[6.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          tabIndex={-1}
          className="fixed inset-0 z-40 overflow-y-auto bg-bg pt-14 lg:hidden"
        >
          <div className="ak-grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative px-5 py-8">
            <nav aria-label="Primary">
              <PrimaryNav variant="overlay" onNavigate={() => setOpen(false)} />
            </nav>
            <div className="mt-10">
              <p className="ak-label mb-3 px-2">Tracks</p>
              <nav aria-label="Tracks">
                <TrackNav variant="overlay" onNavigate={() => setOpen(false)} />
              </nav>
            </div>
            <a href={`mailto:${site.contact}`} className="ak-label mt-12 inline-block px-2 text-muted">
              {site.contact}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
