import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CourseOutline } from "@/components/qec/CourseOutline";
import { InteractiveLab } from "@/components/qec/InteractiveLab";
import { QecHeader } from "@/components/qec/QecHeader";

export const metadata: Metadata = {
  title: "QEC Engineering Course Proposal",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function QecPitchPage() {
  return (
    <div className="min-h-dvh pb-24">
      <Container className="pt-16 lg:pt-24">
        <QecHeader />
      </Container>

      <Container className="mt-16">
        <InteractiveLab />
      </Container>

      <Container className="mt-24">
        <CourseOutline />
      </Container>
    </div>
  );
}
