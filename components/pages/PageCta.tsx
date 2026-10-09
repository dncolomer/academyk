import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { waitlistHref } from "@/content/site";

type PageCtaProps = {
  title?: string;
  body?: string;
  subject?: string;
};

export function PageCta({
  title = "Dates are not set yet.",
  body = "Join the waitlist and we will write to you.",
  subject = "Academy K waitlist",
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
            <LinkButton href={waitlistHref(subject)} solid>
              Join the waitlist
            </LinkButton>
            <LinkButton href="/tracks">View tracks</LinkButton>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
