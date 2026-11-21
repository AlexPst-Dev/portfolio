import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Spark from "@/app/components/Spark";
import { projects } from "@/app/lib/content";
import { display, h2, mono, wrap } from "./styles";

// Long titles break per word from the start, so the bolder hover weight never adds a line
const titleLines = (title: string) => (title.length > 12 ? title.split(" ") : [title]);

/** Shipped projects as rows; the screenshot opens on hover. */
export default function Projects() {
  return (
    <section id="projets" aria-labelledby="projets-titre" className="border-t border-white/10">
      <div className={`${wrap} py-24`}>
        <h2 id="projets-titre" className={h2}>
          Déjà en production
        </h2>
        <ul className="mt-12 border-t border-white/15">
          {projects.map((p) => {
            const lines = titleLines(p.title);
            return (
              <li key={p.id} className="group border-b border-white/15">
                <article aria-labelledby={`projet-${p.id}`} className="grid items-center gap-5 py-8 md:grid-cols-12 md:gap-6">
                  <div className="min-w-0 md:col-span-5">
                    <h3
                      id={`projet-${p.id}`}
                      className={`${display} text-[clamp(1.8rem,3.2vw,3rem)] font-[500] uppercase leading-[0.95] tracking-[-0.02em] transition-[font-weight,color] duration-500 group-hover:font-[900] group-hover:text-flame`}
                    >
                      {lines.map((l, i) => (
                        <span key={l} className="block">
                          {l}
                          {i < lines.length - 1 ? " " : ""}
                        </span>
                      ))}
                    </h3>
                    {p.ai && (
                      <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-flame py-0.5 pl-1.5 pr-3 text-sm font-semibold text-ink">
                        <Spark size={18} track={false} className="[--spark-body:#0a0806] [--spark-eye:#ff6a13]" />
                        {p.ai}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2 md:col-span-4">
                    <p className="text-sm text-ash">
                      {p.kind} · {p.context}
                    </p>
                    <p className="leading-relaxed text-bone/85">{p.summary}</p>
                    <p className={`${mono} text-[13px] text-ash`}>
                      <span className="sr-only">Technologies : </span>
                      {p.stack.join(" / ")}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-ink-2 md:[clip-path:inset(18%_0_18%_0_round_14px)] md:transition-[clip-path] md:duration-500 md:ease-[cubic-bezier(.22,1,.36,1)] md:group-hover:[clip-path:inset(0_0_0_0_round_14px)]">
                      <Image
                        src={p.image}
                        alt={`Capture d'écran de ${p.title}`}
                        fill
                        sizes="(max-width: 768px) calc(100vw - 2.5rem), 330px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-3 flex gap-5 text-[15px]">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex min-h-11 items-center gap-1 font-semibold text-flame underline-offset-4 hover:underline"
                        >
                          Voir le site <span className="sr-only">{p.title} (nouvel onglet)</span>
                          <ArrowUpRight size={16} strokeWidth={2.25} className="icon-nudge" aria-hidden />
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex min-h-11 items-center gap-1 text-ash underline-offset-4 hover:text-bone hover:underline"
                        >
                          Code <span className="sr-only">de {p.title} sur GitHub (nouvel onglet)</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
