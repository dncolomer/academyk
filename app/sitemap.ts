import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { tracks } from "@/content/tracks";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/tracks",
    ...tracks.map((t) => `/tracks/${t.slug}`),
    "/method",
    "/enrol",
    "/about",
    "/faq",
    "/waitlist",
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
