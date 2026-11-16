import { Container } from "@/components/Container";
import { Lamp } from "@/components/Lamp";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { offer } from "@/content/site";

const points = [
  {
    label: "Autonomous learning",
    text: "Academy K is an autonomous school. It is both solo and community. The community part is optional.",
  },
  {
    label: "Private tutor",
    text: "Each student gets their own private tutor, with a private tutor thread in Discord. The tutor is prepared to teach the course content and adapts to your needs, your pace, and how much time you want to put in.",
  },
  {
    label: "Verification",
    text: "The tutor can use Uncertain Systems verification flows to help you learn, practise, and work through problems.",
  },
  {
    label: "Community",
    text: `Discord is there for the community. There is one live call a week with ${offer.headTutor}, the tutor, and the whole group.`,
  },
  {
    label: "Your pace",
    text: "Go fully at your own pace, join the group as much as you like, or both.",
  },
];

export function CohortSection() {
  return (
    <Container as="section" className="border-t border-line py-20 lg:py-28">
      <Reveal>
        <SectionHeader
          index="01b"
          label="How it works"
          title="How the cohort works"
        />
      </Reveal>
      <Reveal delayMs={70}>
        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point, i) => (
            <li
              key={point.label}
              className={`min-w-0 bg-bg px-5 py-6 sm:px-6 ${
                i === points.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <p className="ak-label flex items-start gap-2 text-ink">
                <Lamp className="mt-1" />
                <span className="min-w-0">{point.label}</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {point.text}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  );
}
