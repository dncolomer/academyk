"use client";

import { useEffect, useState } from "react";
import { offer } from "@/content/site";
import { isFoundingPriceActive, foundingPriceEndsLabel } from "@/lib/pricing";

export function usePricing() {
  const [isFoundingPrice, setIsFoundingPrice] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsFoundingPrice(isFoundingPriceActive());
  }, []);

  return { isFoundingPrice, mounted };
}

export function PriceLine() {
  const { isFoundingPrice, mounted } = usePricing();

  if (!mounted) {
    return <>{`${offer.foundingPrice} founding (until ${foundingPriceEndsLabel()}), ${offer.laterPrice} later`}</>;
  }

  if (isFoundingPrice) {
    return <>{`${offer.foundingPrice} founding (until ${foundingPriceEndsLabel()}), ${offer.laterPrice} later`}</>;
  }

  return <>{offer.laterPrice}</>;
}

export function FoundingPriceNote({ className }: { className?: string }) {
  const { isFoundingPrice, mounted } = usePricing();

  if (!mounted || !isFoundingPrice) {
    return null;
  }

  return (
    <span className={className}>
      Founding price until {foundingPriceEndsLabel()}.
    </span>
  );
}
