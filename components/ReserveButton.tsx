import { LinkButton } from "@/components/Button";
import { waitlistHref } from "@/content/site";

type ReserveButtonProps = {
  slug?: string;
  solid?: boolean;
  className?: string;
  onClick?: () => void;
};

export function ReserveButton({ slug, solid = true, className, onClick }: ReserveButtonProps) {
  return (
    <LinkButton href={waitlistHref(slug)} solid={solid} className={className} onClick={onClick}>
      Reserve your place
    </LinkButton>
  );
}
