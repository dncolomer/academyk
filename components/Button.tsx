import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = {
  solid?: boolean;
};

function btnClass(solid: boolean | undefined, className?: string) {
  return cn(solid ? "ak-btn-solid" : "ak-btn", className);
}

export function Button({
  solid,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Variant) {
  return <button type={type} className={btnClass(solid, className)} {...props} />;
}

type LinkButtonProps = Variant &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    children: ReactNode;
  };

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

export function LinkButton({ href, solid, className, children, ...props }: LinkButtonProps) {
  const cls = btnClass(solid, className);
  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(newTab ? { target: "_blank", rel: "noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...props}>
      {children}
    </Link>
  );
}
