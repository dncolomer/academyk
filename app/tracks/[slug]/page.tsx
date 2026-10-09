import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/components/tracks/page-meta";
import { TrackDetail } from "@/components/tracks/TrackDetail";
import { getTrack, tracks } from "@/content/tracks";

type TrackPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tracks.map((track) => ({ slug: track.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { slug } = await params;
  const track = getTrack(slug);
  if (!track) {
    return pageMetadata({
      title: "Track",
      description: "Academy K track.",
      canonical: "/tracks",
    });
  }

  return pageMetadata({
    title: track.title,
    description: track.tagline,
    canonical: `/tracks/${track.slug}`,
  });
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { slug } = await params;
  const track = getTrack(slug);
  if (!track) notFound();
  return <TrackDetail track={track} />;
}
