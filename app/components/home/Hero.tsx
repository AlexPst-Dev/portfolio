import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { profile } from "@/app/lib/content";
import { AskButton } from "./ChatProvider";
import KineticName from "./KineticName";
import { display, mono, wrap } from "./styles";

const STAGES = [
  { name: "Idée", note: "On cadre le problème" },
  { name: "Design", note: "On choisit la direction" },
  { name: "Code", note: "On construit, on teste" },
  { name: "Prod", note: "C'est en ligne" },
];

/**
 * The name set big (kinetic letters), the promise, and the four stages
 * running once on load. The stages' run is pure CSS (see globals.css): the
 * markup holds the end state, which is what reduced motion and crawlers get.
 */
export default function Hero() {
  return (
    <section
      id="accueil"
      aria-labelledby="titre"
      className={`${wrap} relative grid min-h-[calc(100svh-4rem)] grid-cols-1 content-center gap-12 pb-24 pt-10 lg:grid-cols-12 lg:gap-8`}
    >
      <div data-kinetic-host="" className="flex min-w-0 flex-col gap-6 lg:col-span-7">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-sm text-ash">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full rounded-full bg-flame opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-flame" />
          </span>
          {profile.availability}
        </p>
        <h1 id="titre" className={`${display} uppercase leading-[0.86] [container-type:inline-size]`}>
          <span className="sr-only">Alexandre Proust, product builder et développeur fullstack </span>
          <KineticName
            lines={[
              { text: "Alexandre", className: "text-[12cqi]" },
              { text: "Proust", className: "text-[18.6cqi] text-flame" },
            ]}
          />
        </h1>
        {/* The two roles, already read in the h1; each pill stays on one line and they wrap as a pair */}
        <p aria-hidden="true" className={`${display} flex flex-wrap gap-2 text-[clamp(0.95rem,1.5vw,1.3rem)] font-[600]`}>
          <span className="whitespace-nowrap rounded-full border-2 border-flame px-4 py-1.5 text-flame">Product builder</span>
          <span className="whitespace-nowrap rounded-full border-2 border-white/25 px-4 py-1.5 text-bone">Développeur fullstack</span>
        </p>
        <p className="max-w-[34ch] text-[clamp(1.2rem,1.7vw,1.45rem)] leading-snug text-bone/90">{profile.promise}</p>
        {/* Each fact reads as one phrase: "4 ans de TypeScript en production" */}
        <ul className="grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-5">
          {profile.facts.map((f) => (
            <li key={f.label}>
              <span className="block text-lg font-semibold">{f.value}</span>{" "}
              <span className="block text-sm leading-tight text-ash">{f.label}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-flame px-6 font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Parler de votre projet
            <ArrowRight size={18} strokeWidth={2.25} className="icon-nudge" aria-hidden />
          </a>
          <AskButton className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white/20 px-6 font-semibold transition-colors hover:border-flame hover:text-flame">
            <MessageCircle size={18} strokeWidth={2.25} className="icon-draw" aria-hidden />
            Questionner l&apos;étincelle
          </AskButton>
        </div>
      </div>

      <ol
        aria-label="La méthode en quatre étapes"
        className="grid content-center [container-type:inline-size] lg:col-span-4 lg:col-start-9"
      >
        {STAGES.map((s, i) => (
          <li
            key={s.name}
            className="stage relative flex flex-col overflow-hidden border-b border-white/10 pb-1.5 pt-2 first:border-t"
            style={{ "--i": i } as React.CSSProperties}
          >
            <span aria-hidden="true" className="stage-fill absolute inset-0 origin-left bg-flame" />
            <span className={`${mono} stage-note relative flex items-center gap-1.5 pl-3 text-[12px] leading-tight`}>
              {i < STAGES.length - 1 && <Check size={13} strokeWidth={2.5} className="stage-check shrink-0" aria-hidden />}
              {s.note}
            </span>
            <span
              className={`${display} stage-word relative pr-3 text-right text-[min(4.5rem,13cqi)] uppercase leading-[0.95] tracking-[-0.02em]`}
            >
              {s.name}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
