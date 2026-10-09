import Link from "next/link";
import { site } from "@/content/site";
import { KMotif } from "@/components/KMotif";
import { Lamp } from "@/components/Lamp";
import { Wordmark } from "@/components/Logo";
import { PrimaryNav, TrackNav } from "@/components/Nav";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-sidebar flex-col border-r border-line bg-bg/90 lg:flex">
      <div className="flex h-full flex-col overflow-y-auto px-5 py-7">
        <Link href="/" className="flex items-center gap-2.5 px-2">
          <Wordmark />
          <Lamp className="ml-auto" />
        </Link>

        <nav aria-label="Primary" className="mt-10">
          <PrimaryNav />
        </nav>

        <div className="mt-10 px-2">
          <p className="ak-label mb-3">Tracks</p>
          <nav aria-label="Tracks">
            <TrackNav />
          </nav>
        </div>

        <div className="mt-auto border-t border-line px-2 pt-6">
          <KMotif compact observatoryHref={site.observatoryUrl} />
          <a
            href={`mailto:${site.contact}`}
            className="ak-label mt-4 inline-block text-muted hover:text-ink"
          >
            {site.contact}
          </a>
        </div>
      </div>
    </aside>
  );
}
