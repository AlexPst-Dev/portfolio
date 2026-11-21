import { MessageCircle } from "lucide-react";
import Spark from "@/app/components/Spark";
import { AskButton } from "./ChatProvider";
import { display, mono, wrap } from "./styles";

export const sections = [
  { id: "offres", label: "Offres" },
  { id: "methode", label: "Méthode" },
  { id: "projets", label: "Projets" },
  { id: "parcours", label: "Parcours" },
  { id: "contact", label: "Contact" },
] as const;

/** Sticky header: the living logo, the sections, and the "/" command that opens the spark. */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-md">
      <div className={`${wrap} flex h-16 items-center justify-between gap-6`}>
        <a href="#accueil" className={`${display} flex min-h-11 items-center gap-2.5 text-[15px] font-[700]`}>
          <Spark size={32} />
          Alexandre Proust
        </a>
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[15px] text-ash">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="transition-colors hover:text-bone">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Looks like a command field: a click or "/" opens the spark's conversation */}
        <AskButton
          aria-keyshortcuts="/"
          className="hidden min-h-11 w-[min(300px,34vw)] items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] pl-4 pr-1.5 text-[15px] text-ash transition-colors hover:border-flame hover:text-bone sm:inline-flex"
        >
          <MessageCircle size={17} strokeWidth={2.25} className="icon-draw shrink-0 text-flame" aria-hidden />
          <span className="flex-1 text-left">Une question ? Tapez</span>
          <kbd className={`${mono} grid h-8 min-w-8 place-items-center rounded-full bg-white/10 px-2 text-sm text-bone`}>/</kbd>
        </AskButton>
      </div>
    </header>
  );
}
