import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "About Academy K";
export const size = ogSize;
export const contentType = ogContentType;

export default function AboutOpenGraphImage() {
  return ogImage({
    label: "ACADEMY K · 05 / ABOUT",
    title: "Sibling of Observatory-K",
    subtitle: "K is Kardashev. Observatory-K tracks the climb. Academy K teaches the tech.",
  });
}
