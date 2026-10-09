import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { FormatSection } from "@/components/home/FormatSection";
import { Hero } from "@/components/home/Hero";
import { KardashevSection } from "@/components/home/KardashevSection";
import { TracksSection } from "@/components/home/TracksSection";
import { site } from "@/content/site";

const title = "Learn the frontier tech that climbs the Kardashev scale";
const description = site.description;
const socialTitle = `${title}: ${site.name}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: socialTitle,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description,
  },
};

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <TracksSection />
      <KardashevSection />
      <FormatSection />
      <ClosingCta />
    </div>
  );
}
