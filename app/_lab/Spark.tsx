"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export type SparkMood = "idle" | "thinking" | "talking";

type Props = {
  size?: number;
  mood?: SparkMood;
  /** Eyes follow the pointer */
  track?: boolean;
  className?: string;
  /** Accessible name; decorative when omitted */
  label?: string;
};

/**
 * The assistant's face: the portfolio's spark logo, given eyes.
 * Colours come from --spark-body and --spark-eye.
 */
export default function Spark({ size = 64, mood = "idle", track = true, className, label }: Props) {
  const root = useRef<SVGSVGElement>(null);
  const eyes = useRef<SVGGElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!track || reduce) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, d / 260);
      tx = (dx / d) * 7 * reach;
      ty = (dy / d) * 6 * reach;
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      eyes.current?.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [track, reduce]);

  return (
    <svg
      ref={root}
      viewBox="0 0 160 160"
      width={size}
      height={size}
      className={["spark", `spark--${mood}`, className].filter(Boolean).join(" ")}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <g className="spark-body">
        <path
          d="M72.4972 20.2761C75.0744 13.3111 84.9256 13.3111 87.5028 20.276L100.331 54.9428C101.141 57.1326 102.867 58.859 105.057 59.6693L139.724 72.4972C146.689 75.0744 146.689 84.9256 139.724 87.5028L105.057 100.331C102.867 101.141 101.141 102.867 100.331 105.057L87.5028 139.724C84.9256 146.689 75.0744 146.689 72.4972 139.724L59.6693 105.057C58.859 102.867 57.1326 101.141 54.9428 100.331L20.2761 87.5028C13.3111 84.9256 13.3111 75.0744 20.276 72.4972L54.9428 59.6693C57.1326 58.859 58.859 57.1326 59.6693 54.9428L72.4972 20.2761Z"
          fill="var(--spark-body, #ff6a13)"
        />
        <g ref={eyes}>
          <g className="spark-eyes">
            <ellipse cx="69" cy="80" rx="5.5" ry="10" fill="var(--spark-eye, #0a0806)" />
            <ellipse cx="91" cy="80" rx="5.5" ry="10" fill="var(--spark-eye, #0a0806)" />
          </g>
        </g>
      </g>
      <path
        className="spark-twin"
        d="M126.249 10.138C127.537 6.65556 132.463 6.65555 133.751 10.138L137.464 20.1723C137.87 21.2672 138.733 22.1304 139.828 22.5356L149.862 26.2486C153.344 27.5372 153.344 32.4628 149.862 33.7514L139.828 37.4644C138.733 37.8696 137.87 38.7328 137.464 39.8277L133.751 49.862C132.463 53.3444 127.537 53.3444 126.249 49.862L122.536 39.8277C122.13 38.7328 121.267 37.8696 120.172 37.4644L110.138 33.7514C106.656 32.4628 106.656 27.5372 110.138 26.2486L120.172 22.5356C121.267 22.1304 122.13 21.2672 122.536 20.1723L126.249 10.138Z"
        fill="var(--spark-twin, var(--spark-body, #ff6a13))"
      />
      <style>{`
        .spark .spark-eyes { transform-origin: 80px 80px; transform-box: view-box; animation: spark-blink 5.2s infinite; }
        .spark .spark-twin { transform-origin: 130px 30px; transform-box: view-box; transition: transform 600ms cubic-bezier(.22,1,.36,1); }
        .spark .spark-body { transform-origin: 80px 80px; transform-box: view-box; }
        .spark--thinking .spark-twin { animation: spark-orbit 1.1s cubic-bezier(.65,0,.35,1) infinite; }
        .spark--thinking .spark-eyes { animation: none; transform: translate(4px,-5px) scaleY(.75); }
        .spark--talking .spark-body { animation: spark-talk .42s ease-in-out infinite alternate; }
        @keyframes spark-blink { 0%, 92%, 100% { transform: scaleY(1); } 95% { transform: scaleY(.1); } }
        @keyframes spark-orbit { to { transform: rotate(180deg) scale(.8); } }
        @keyframes spark-talk { from { transform: scale(1); } to { transform: scale(1.045, .97); } }
        @media (prefers-reduced-motion: reduce) {
          .spark .spark-eyes, .spark--thinking .spark-twin, .spark--talking .spark-body { animation: none; }
        }
      `}</style>
    </svg>
  );
}
