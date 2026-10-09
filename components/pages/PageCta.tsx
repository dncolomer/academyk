import { ProceedsBadge } from "@/components/ProceedsBadge";
import { LinkButton } from "@/components/Button";
import { ReserveButton } from "@/components/ReserveButton";
import { Reveal } from "@/components/Reveal";

type PageCtaProps = {
  title?: string;
  body?: string;
};

export function PageCta({
  title = "Reserve your place.",
  body = "Free to join. Nothing to pay now.",
}: PageCtaProps) {
  return (
    <Reveal className="mt-20 sm:mt-24">
      <div className="border border-line">
        <div className="border-b border-line px-5 py-3 sm:px-6">
          <p className="ak-label">Waitlist</p>
        </div>
        <div className="px-5 py-8 sm:px-8">
          <h2 className="ak-serif max-w-xl text-3xl leading-tight text-balance text-ink sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ReserveButton />
            <LinkButton href="/tracks">View tracks</LinkButton>
          </div>
          <ProceedsBadge className="mt-6" />
        </div>
      </div>
    </Reveal>
  );
}
