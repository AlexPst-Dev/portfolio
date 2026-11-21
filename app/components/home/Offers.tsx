import { ArrowRight, Check } from "lucide-react";
import { offers } from "@/app/lib/content";
import { AskButton } from "./ChatProvider";
import { display, h2, wrap } from "./styles";

const CTA = {
  mvp: { label: "Estimer mon MVP", question: "Combien de temps pour un MVP ?", intent: "mvp" },
  integration: {
    label: "Trouver le bon cas d'usage",
    question: "Ajouter de l'IA à mon produit existant ?",
    intent: "integration",
  },
} as const;

/** The two offers: one on an orange field, one on black. Each CTA asks the spark. */
export default function Offers() {
  return (
    <section id="offres" aria-labelledby="offres-titre" className="border-t border-white/10">
      <div className={`${wrap} py-24`}>
        <h2 id="offres-titre" className={`${h2} max-w-[18ch]`}>
          Deux façons de travailler ensemble
        </h2>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {offers.map((o, i) => {
            const filled = i === 0;
            const cta = CTA[o.id];
            return (
              <article
                key={o.id}
                aria-labelledby={`offre-${o.id}`}
                className={[
                  "flex flex-col gap-6 rounded-[24px] p-7 transition-transform duration-300 hover:-translate-y-0.5 md:p-10",
                  filled ? "bg-flame text-ink" : "border-2 border-[#3a3028] bg-[#120e0b]",
                ].join(" ")}
              >
                <p className={filled ? "font-semibold" : "font-semibold text-flame"}>{o.forWho}</p>
                <h3
                  id={`offre-${o.id}`}
                  className={`${display} text-[clamp(1.6rem,2.6vw,2.4rem)] font-[700] leading-[1.02] tracking-[-0.02em]`}
                >
                  {o.title}
                </h3>
                <p className={`max-w-[48ch] text-lg leading-relaxed ${filled ? "" : "text-bone/85"}`}>{o.pitch}</p>
                <ul className="grid gap-3">
                  {o.deliverables.map((d) => (
                    <li key={d} className={`flex gap-3 border-t pt-3 ${filled ? "border-ink/20" : "border-white/10"}`} data-icon-trigger="">
                      <Check size={18} strokeWidth={2.5} className={`icon-draw mt-0.5 shrink-0 ${filled ? "" : "text-flame"}`} aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                <AskButton
                  question={cta.question}
                  intentId={cta.intent}
                  className={[
                    "mt-auto inline-flex min-h-12 w-fit items-center gap-2 rounded-full px-5 font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0",
                    filled ? "bg-ink text-bone" : "bg-bone text-ink",
                  ].join(" ")}
                >
                  {cta.label}
                  <ArrowRight size={18} strokeWidth={2.25} className="icon-nudge" aria-hidden />
                </AskButton>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
