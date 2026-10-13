import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { FormatSection } from "@/components/home/FormatSection";
import { Hero } from "@/components/home/Hero";
import { KardashevSection } from "@/components/home/KardashevSection";
import { TracksSection } from "@/components/home/TracksSection";
import { site } from "@/content/site";

const title = "Academy K: 4 week paths into quantum, ai and thermodynamic computing";
const description = site.description;
const socialTitle = title;

export const metadata: Metadata = {
  title: { absolute: title },
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
