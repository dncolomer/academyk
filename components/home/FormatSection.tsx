"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { Lamp } from "@/components/Lamp";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { offer } from "@/content/site";
import { cn } from "@/lib/cn";
import { isFoundingPriceActive, foundingPriceEndsLabel } from "@/lib/pricing";

function usePricing() {
  const [isFoundingPrice, setIsFoundingPrice] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsFoundingPrice(isFoundingPriceActive());
  }, []);

  return { isFoundingPrice, mounted };
}

export function FormatSection() {
  const { isFoundingPrice, mounted } = usePricing();

  const priceValue = isFoundingPrice
    ? `${offer.foundingPrice} founding, ${offer.laterPrice} later`
    : offer.laterPrice;

  const priceDetail = isFoundingPrice
    ? `USD, per course. Founding price until ${foundingPriceEndsLabel()}. Two tracks are 10% off, three are 15% off. Nothing to pay on this site.`
    : "USD, per course. Two tracks are 10% off, three are 15% off. Nothing to pay on this site.";

  const cells = [
    {
      label: "Personal tutor",
      value: "Grok Bot, 24/7",
      detail: "Every student gets a dedicated Grok Bot tutor for the 4 weeks. Included in the price, no separate account needed.",
    },
    {
      label: "Live sessions",
      value: `${offer.liveSessions} sessions`,
      detail: `With the human head tutor (${offer.headTutor}) and the tutor bot together.`,
    },
    {
      label: "Cohort",
      value: "Discord",
      detail: "You talk directly to your tutor and to the rest of the cohort.",
    },
    {
      label: "Price",
      value: mounted ? priceValue : `${offer.foundingPrice} founding, ${offer.laterPrice} later`,
      detail: mounted ? priceDetail : `USD, per course. Founding price until ${foundingPriceEndsLabel()}. Two tracks are 10% off, three are 15% off. Nothing to pay on this site.`,
      long: true,
    },
  ];

  return (
    <Container as="section" className="border-t border-line py-20 lg:py-28">
      <Reveal>
        <SectionHeader index="03" label="Format" title="Format" />
      </Reveal>
      <Reveal delayMs={70}>
        <ul className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {cells.map((cell) => (
            <li key={cell.label} className="min-w-0 bg-bg px-5 py-6 sm:px-6">
              <p className="ak-label flex items-start gap-2 text-ink">
                <Lamp className="mt-1" />
                <span className="min-w-0">{cell.label}</span>
              </p>
              <p
                className={cn(
                  "ak-serif mt-6 text-ink",
                  cell.long
                    ? "text-2xl leading-snug break-words sm:text-[1.65rem]"
                    : "text-3xl leading-none sm:text-4xl",
                )}
              >
                {cell.value}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">{cell.detail}</p>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delayMs={100}>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border border-line p-4">
            <p className="ak-label text-ink">Seats</p>
            <p className="mt-2 text-sm text-muted">{offer.seats} per course</p>
          </div>
          <div className="border border-line p-4">
            <p className="ak-label text-ink">First cohort</p>
            <p className="mt-2 text-sm text-muted">Starts {offer.cohortStart}, ends {offer.cohortEnd}, {offer.holidayNote}.</p>
          </div>
          <div className="border border-line p-4">
            <p className="ak-label text-ink">Verification</p>
            <p className="mt-2 text-sm text-muted">Uncertain Systems verifies what each student actually learned.</p>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
