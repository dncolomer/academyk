import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Academy K Problem Catalog: 150 practice problems across quantum computing, AI / SI, and thermodynamic computing";
export const size = ogSize;
export const contentType = ogContentType;

export default async function ProblemsOpenGraphImage() {
  return ogImage({
    label: "Problems",
    title: "Problem Catalog",
    subtitle: "150 practice problems grounded in real industry needs. Interview-level questions with worked solutions.",
    chips: ["50 Quantum", "50 AI / SI", "50 Thermodynamic"],
  });
}
