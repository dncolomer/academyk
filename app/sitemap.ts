import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { tracks } from "@/content/tracks";
import { getAllProblemSlugs } from "@/content/problems";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const problemSlugs = getAllProblemSlugs();

  const paths = [
    "",
    "/tracks",
    ...tracks.map((t) => `/tracks/${t.slug}`),
    "/problems",
    ...tracks.map((t) => `/problems/${t.slug}`),
    ...problemSlugs.map(({ trackSlug, problemSlug }) => `/problems/${trackSlug}/${problemSlug}`),
    "/method",
    "/enrol",
    "/about",
    "/faq",
    "/waitlist",
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
