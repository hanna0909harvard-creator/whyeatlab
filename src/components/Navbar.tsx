"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/product", label: "Product" },
  { href: "/newspaper", label: "Newspaper" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/intro") return null;

  return (
    <header className="w-full border-b border-neutral-200">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/home"
          className="font-script text-3xl leading-none text-neutral-900"
        >
          Why Eat
        </Link>

        <ul className="flex items-center gap-6 text-sm tracking-wide text-neutral-700 sm:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors hover:text-sage-600 ${
                    isActive ? "text-sage-700" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
