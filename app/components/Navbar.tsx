"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex w-full justify-between py-8 px-4 md:px-10 lg:px-32 sticky top-0 z-50 bg-neutral-900/20 backdrop-blur-md border-b border-neutral-800">
      <a className="hover:underline self-center" href="./">
        Alexandre Proust
      </a>

      {/* Desktop menu (keep your current layout) */}
      <ul className="hidden md:flex gap-8 list-none items-center">
        <li className="hover:underline">
          <a href="./projects/">Projets</a>
        </li>
        <li className="hover:underline">
          <a href="./experiences/">Experiences</a>
        </li>
        <li>
          <a
            href="/contact/"
            className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Contactez-moi
          </a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-neutral-800/60 focus:outline-none focus:ring-2 focus:ring-white/70"
      >
        <span className="sr-only">Menu</span>
        <span className="block w-5">
          <span className="block h-0.5 bg-white w-5 rounded" />
          <span className="block h-0.5 bg-white w-5 rounded mt-1" />
          <span className="block h-0.5 bg-white w-5 rounded mt-1" />
        </span>
      </button>

      {/* Mobile sliding menu (right side) */}
      <div
        className={[
          "md:hidden absolute right-0 top-full mt-2",
          "w-56 rounded-md border border-neutral-800",
          "bg-neutral-900/95 backdrop-blur-md",
          "transform transition-transform transition-opacity duration-300 ease-out",
          open
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-full opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <ul className="flex flex-col items-end gap-4 p-4 list-none">
          <li className="hover:underline">
            <a href="./projects/" onClick={() => setOpen(false)}>
              Projets
            </a>
          </li>
          <li className="hover:underline">
            <a href="./experiences/" onClick={() => setOpen(false)}>
              Experiences
            </a>
          </li>
          <li>
            <a
              href="/contact/"
              onClick={() => setOpen(false)}
              className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Contactez-moi
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
