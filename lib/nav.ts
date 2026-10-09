export const primaryNav = [
  { index: "01", label: "Home", href: "/" },
  { index: "02", label: "Tracks", href: "/tracks" },
  { index: "03", label: "Method", href: "/method" },
  { index: "04", label: "About", href: "/about" },
  { index: "05", label: "FAQ", href: "/faq" },
] as const;

export type PrimaryNavItem = (typeof primaryNav)[number];

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
