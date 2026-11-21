"use client";

import { useEffect, useRef } from "react";

// Weight at rest; sizes leave room for every letter at 900
const REST_WEIGHT = 800;

/**
 * The name, set big: letters light up on load (CSS, see home.css) and swell in
 * weight near the cursor. The pointer effect runs only on fine pointers and
 * without reduced motion; the markup is the same for everyone.
 */
export default function KineticName({ lines }: { lines: { text: string; className: string }[] }) {
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    // The whole hero column reacts, not just the letters
    const host = el?.closest<HTMLElement>("[data-kinetic-host]");
    if (!el || !host) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const letters = [...el.querySelectorAll<HTMLSpanElement>("[data-letter]")];

    let raf = 0;
    let px = -1;
    const apply = () => {
      raf = 0;
      for (const s of letters) {
        const r = s.getBoundingClientRect();
        const c = r.left + r.width / 2;
        const w = px < 0 ? REST_WEIGHT : 330 + 570 * Math.exp(-(((c - px) / 150) ** 2));
        s.style.fontWeight = String(Math.round(w));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      schedule();
    };
    const onLeave = () => {
      px = -1;
      schedule();
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Read as one name by assistive tech (the sr-only text in the h1); the letters are decoration
  return (
    <span ref={root} aria-hidden="true" data-nosnippet="" className="block">
      {lines.map((line) => (
        // The trailing space keeps the words apart in the page's text ("Alexandre Proust")
        <span key={line.text} className={`flex justify-between ${line.className}`}>
          {[...line.text].map((ch, i) => (
            <span key={i} data-letter="" className="kinetic-letter" style={{ "--i": i } as React.CSSProperties}>
              {ch}
            </span>
          ))}{" "}
        </span>
      ))}
    </span>
  );
}
