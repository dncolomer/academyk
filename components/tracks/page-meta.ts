import type { Metadata } from "next";
import { site } from "@/content/site";

/** Page metadata that keeps the layout's site defaults on Open Graph and Twitter. */
export function pageMetadata({
  title,
  description,
  canonical,
}: {
  title: string;
  description: string;
  canonical: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url: canonical,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
