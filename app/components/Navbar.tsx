"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projets" },
  { href: "/experiences", label: "Expériences" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation principale"
      className="flex w-full justify-between py-8 px-4 md:px-10 lg:px-32 sticky top-0 z-50 bg-neutral-900/20 backdrop-blur-md border-b border-neutral-800"
    >
      <Link href="/" className="flex items-center gap-2 hover:underline">
        <Image
          src="/logo-portfolio.svg"
          alt=""
          loading="eager"
          width={32}
          height={32}
        />
        <span className="self-center">Alexandre Proust</span>
      </Link>

      <ul className="hidden md:flex gap-8 list-none items-center">
        {links.map((link) => (
          <li key={link.href} className="hover:underline">
            <Link
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/contact"
            className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Contactez-moi
          </Link>
        </li>
      </ul>

      <button
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation-menu"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-neutral-800/60 focus:outline-none focus:ring-2 focus:ring-white/70"
      >
        <span className="block w-5" aria-hidden="true">
          <span className="block h-0.5 bg-white w-5 rounded" />
          <span className="block h-0.5 bg-white w-5 rounded mt-1" />
          <span className="block h-0.5 bg-white w-5 rounded mt-1" />
        </span>
      </button>

      <div
        id="mobile-navigation-menu"
        className={[
          "md:hidden absolute right-4 top-full mt-2",
          "w-56 rounded-md border border-neutral-800",
          "bg-neutral-900/95 backdrop-blur-md",
          "transform transition-all duration-300 ease-out",
          open
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-[calc(100%+1rem)] opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <ul className="flex flex-col items-end gap-4 p-4 list-none">
          {links.map((link) => (
            <li key={link.href} className="hover:underline">
              <Link href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Contactez-moi
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
