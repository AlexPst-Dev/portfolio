import { Check } from "lucide-react";
import Spark from "@/app/components/Spark";
import { method } from "@/app/lib/content";
import { display, h2, wrap } from "./styles";

/**
 * The four stages, and what AI speeds up in each. A line crosses them as the
 * row scrolls through the viewport: a CSS scroll-driven animation where
 * supported (see globals.css), otherwise the finished line.
 */
export default function Method() {
  return (
    <section id="methode" aria-labelledby="methode-titre" className="border-t border-white/10">
      <div className={`${wrap} py-24`}>
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 id="methode-titre" className={`${h2} lg:col-span-7`}>
            L&apos;IA accélère. Je décide.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-bone/80 lg:col-span-5 lg:self-end">
            À chaque étape, ce que je tranche moi-même et ce que l&apos;IA me permet d&apos;aller chercher plus vite.
          </p>
        </div>

        <div className="method-track relative mt-16">
          <div aria-hidden="true" className="absolute inset-x-0 top-[15px] hidden h-px bg-white/15 md:block" />
          <div aria-hidden="true" className="method-line absolute inset-x-0 top-[14px] hidden h-[3px] origin-left bg-flame md:block" />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {method.map((s, i) => (
              <li key={s.id} className="relative grid content-start gap-4" style={{ "--i": i } as React.CSSProperties}>
                <span
                  aria-hidden="true"
                  className="method-dot relative z-10 grid size-8 place-items-center rounded-full border-2 border-flame bg-flame text-ink"
                >
                  <Check size={15} strokeWidth={3} />
                </span>
                <h3 className={`${display} text-[clamp(1.5rem,2.2vw,2.2rem)] font-[800] tracking-[-0.02em]`}>{s.name}</h3>
                <div className="grid gap-1">
                  <p className="text-sm font-semibold text-bone">Ce que je décide</p>
                  <p className="leading-relaxed text-bone/75">{s.human}</p>
                </div>
                <div className="grid gap-1">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-flame">
                    <Spark size={16} track={false} />
                    Ce que l&apos;IA accélère
                  </p>
                  <p className="leading-relaxed text-bone/75">{s.ai}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
