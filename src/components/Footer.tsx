"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/newspaper", label: "Newspaper" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/intro") return null;

  return (
    <footer className="border-t-[0.5px] border-divider bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 py-20 sm:px-10 sm:py-28">
        <nav className="flex flex-col items-center gap-6 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-14 sm:gap-y-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[32px] leading-none tracking-[0.03em] transition-colors hover:text-neutral-900 sm:text-[40px] ${
                  isActive ? "text-neutral-900" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <p className="text-xs tracking-wide text-muted">© Why Eat</p>
      </div>
    </footer>
  );
}
