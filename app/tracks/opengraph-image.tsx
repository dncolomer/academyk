import { tracks } from "@/content/tracks";
import { offerChips, ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Academy K tracks";
export const size = ogSize;
export const contentType = ogContentType;

export default function TracksOpenGraphImage() {
  return ogImage({
    label: "ACADEMY K · 02 / TRACKS",
    title: "Three tracks",
    subtitle: tracks.map((track) => track.title).join(", "),
    chips: offerChips,
  });
}
