"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CornerDownLeft, Hash, Layers, Mail, Search, Sparkles } from "lucide-react";
import { anybody } from "../fonts";
import { experience, method, offers, profile, projects, type Project } from "../content";
import { intentById, starterIds, type Intent } from "../chat/knowledge";
import { useScriptedChat } from "../chat/useScriptedChat";
import { AnswerBlocks, ChatAnnouncer, StreamedText } from "../chat/Blocks";
import Spark from "../Spark";

/*
 * 05 — Index
 * The procedural option: everything on one page as indexes — projects,
 * offers, method, career and a technology cross-reference — plus a ⌘K
 * palette that both searches and answers.
 * Signature: the name's letters widen under the cursor (Anybody, wdth 50–150).
 */

const vars = {
  "--b-surface": "#121212",
  "--b-line": "#2a2a2a",
  "--b-ink": "#f5efe8",
  "--b-muted": "#b0a79e",
  "--b-accent": "#ff6a13",
  "--b-accent-ink": "#0a0806",
  "--b-radius": "4px",
  "--spark-body": "#ff6a13",
} as React.CSSProperties;

const display = "[font-family:var(--f-anybody)]";

type Filter = "Tout" | "Web" | "Mobile" | "IA" | "Freelance";
const FILTERS: Filter[] = ["Tout", "Web", "Mobile", "IA", "Freelance"];
const matchFilter = (p: Project, f: Filter) =>
  f === "Tout" ||
  (f === "Mobile" && p.stack.includes("React Native")) ||
  (f === "Web" && !p.stack.includes("React Native")) ||
  (f === "IA" && Boolean(p.ai)) ||
  (f === "Freelance" && p.context === "Freelance");

/** Technology → projects, derived from the data */
const techIndex = (() => {
  const map = new Map<string, Project[]>();
  for (const p of projects) for (const t of p.stack) map.set(t, [...(map.get(t) ?? []), p]);
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, "fr"));
})();

export default function IndexProposal() {
  const [palette, setPalette] = useState(false);
  const [paletteSeed, setPaletteSeed] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openPalette = (seed?: string) => {
    setPaletteSeed(seed ?? null);
    setPalette(true);
  };

  return (
    <div className={`${anybody.variable} bg-[#0b0b0b] text-bone [font-family:var(--font-chivo)] antialiased`} style={vars}>
      <a
        href="#ix-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-[calc(var(--lab-h)+12px)] focus:z-50 focus:bg-flame focus:px-4 focus:py-2 focus:text-ink"
      >
        Aller au contenu
      </a>
      <header className="sticky top-[var(--lab-h)] z-40 border-b border-white/10 bg-[#0b0b0b]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 md:px-8">
          <a href="#ix-main" className="flex items-center gap-2 text-[15px] font-semibold">
            <Spark size={24} label="Logo d'Alexandre Proust" />
            A. Proust
          </a>
          <nav aria-label="Index" className="hidden items-center gap-6 text-[14px] text-[#b0a79e] md:flex">
            {[
              ["#ix-projets", "Projets"],
              ["#ix-offres", "Offres"],
              ["#ix-methode", "Méthode"],
              ["#ix-tech", "Technologies"],
              ["#ix-parcours", "Parcours"],
            ].map(([h, l]) => (
              <a key={h} href={h} className="hover:text-bone">
                {l}
              </a>
            ))}
          </nav>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => openPalette()}
            className="inline-flex min-h-10 items-center gap-2 rounded border border-white/15 px-3 text-[14px] text-[#b0a79e] transition-colors hover:border-flame hover:text-bone"
          >
            <Search size={15} strokeWidth={2.25} aria-hidden />
            Rechercher
            <kbd className="rounded bg-white/10 px-1.5 text-[12px]">⌘K</kbd>
          </button>
        </div>
      </header>

      <main id="ix-main">
        <Hero onSearch={openPalette} />
        <ProjectsIndex />
        <OffersIndex onAsk={openPalette} />
        <MethodIndex />
        <TechIndex />
        <CareerIndex />
        <Close />
      </main>

      <footer className="mx-auto flex max-w-[1600px] flex-wrap justify-between gap-4 px-4 py-8 text-sm text-[#9a9189] md:px-8">
        <p>© {new Date().getFullYear()} Alexandre Proust · Rennes</p>
        <p className="flex gap-6">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-bone">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-bone">LinkedIn</a>
        </p>
      </footer>

      <AnimatePresence>
        {palette && (
          <Palette
            seed={paletteSeed}
            onClose={() => {
              setPalette(false);
              triggerRef.current?.focus();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────── Hero: the kinetic name ───────────── */

function KineticLine({ text, hostRef }: { text: string; hostRef: React.RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion();
  const letters = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const spans = letters.current.filter(Boolean) as HTMLSpanElement[];
    // The entrance is a CSS animation on each letter (see render); this only drives the cursor
    const host = hostRef.current;
    if (reduce || !host || !window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let px = -1;
    const apply = () => {
      raf = 0;
      const centers = spans.map((s) => {
        const r = s.getBoundingClientRect();
        return r.left + r.width / 2;
      });
      // Gaussian bump around the cursor, renormalised so the line keeps its length
      const raw = centers.map((c) => (px < 0 ? 100 : 62 + 88 * Math.exp(-(((c - px) / 170) ** 2))));
      const k = (spans.length * 100) / raw.reduce((a, b) => a + b, 0);
      spans.forEach((s, i) => {
        s.style.transition = "font-stretch 260ms cubic-bezier(.22,1,.36,1)";
        s.style.fontStretch = `${Math.max(50, Math.min(150, raw[i] * k)).toFixed(1)}%`;
      });
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      px = -1;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, hostRef]);

  return (
    <span className="flex justify-between" aria-hidden>
      {[...text].map((ch, i) => (
        <span
          key={i}
          ref={(el) => void (letters.current[i] = el)}
          className="inline-block"
          // Letters open from narrow to normal width; `backwards` hands control back to the cursor once done
          style={reduce ? undefined : { animation: `ix-open 900ms cubic-bezier(.22,1,.36,1) ${i * 45}ms backwards` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

function Hero({ onSearch }: { onSearch: (seed?: string) => void }) {
  const host = useRef<HTMLElement>(null);
  return (
    <section ref={host} aria-labelledby="ix-title" className="mx-auto max-w-[1600px] px-4 pb-14 pt-6 md:px-8">
      <p className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3 text-[13px] text-[#9a9189]">
        <span>Product builder · Développeur fullstack TypeScript</span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-flame" aria-hidden /> {profile.availability}
        </span>
      </p>
      <h1 id="ix-title" className={`${display} mt-4 font-[800] uppercase leading-[0.8] tracking-[-0.01em] [container-type:inline-size]`}>
        <span className="sr-only">Alexandre Proust, product builder</span>
        <span className="block text-[15.2cqi]">
          <KineticLine text="ALEXANDRE" hostRef={host} />
        </span>
        <span className="block text-[21.5cqi] text-flame">
          <KineticLine text="PROUST" hostRef={host} />
        </span>
      </h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
        <p className="max-w-[30ch] text-[clamp(1.3rem,2vw,1.75rem)] leading-snug lg:col-span-5">{profile.promise}</p>
        <dl className="grid gap-1.5 text-[15px] sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1">
          {profile.facts.map((f) => (
            <div key={f.label} className="flex gap-2 border-b border-white/10 pb-1.5">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="font-semibold tabular-nums">{f.value}</span>{" "}
                <span className="text-[#9a9189]">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={() => onSearch()}
          className="group flex min-h-16 items-center gap-3 rounded border-2 border-white/20 px-4 text-left text-lg text-[#b0a79e] transition-colors hover:border-flame lg:col-span-4"
        >
          <Search size={22} strokeWidth={2.25} className="shrink-0 text-flame" aria-hidden />
          <span className="flex-1">Projet, techno ou question…</span>
          <kbd className="rounded bg-white/10 px-2 py-0.5 text-[13px]">⌘K</kbd>
        </button>
      </div>
    </section>
  );
}

/* ───────────── Projects index with a cursor-following preview ───────────── */

function ProjectsIndex() {
  const [filter, setFilter] = useState<Filter>("Tout");
  const [hover, setHover] = useState<Project | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const list = projects.filter((p) => matchFilter(p, filter));

  useEffect(() => {
    if (reduce) return;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX + 24;
      ty = e.clientY - 120;
    };
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      if (preview.current) preview.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <section id="ix-projets" aria-labelledby="ix-projets-title" className="scroll-mt-28 border-t border-white/10">
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="ix-projets-title" className={`${display} text-[clamp(2.6rem,6vw,6rem)] font-[800] uppercase leading-[0.85] [font-stretch:70%]`}>
            Projets <span className="align-top text-[0.35em] text-flame tabular-nums">({list.length})</span>
          </h2>
          <div role="group" aria-label="Filtrer les projets" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={[
                  "min-h-10 rounded-full border px-4 text-[14px] transition-colors",
                  filter === f ? "border-flame bg-flame font-semibold text-ink" : "border-white/20 hover:border-bone",
                ].join(" ")}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="mt-10 w-full border-collapse text-left">
          <caption className="sr-only">Index des projets</caption>
          <thead className="hidden text-[12px] uppercase tracking-[0.06em] text-[#9a9189] md:table-header-group">
            <tr className="border-b border-white/20">
              <th scope="col" className="py-3 font-medium">Projet</th>
              <th scope="col" className="py-3 font-medium">Type</th>
              <th scope="col" className="py-3 font-medium">Rôle</th>
              <th scope="col" className="py-3 font-medium">Stack</th>
              <th scope="col" className="py-3 text-right font-medium">Lien</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr
                key={p.id}
                id={`ix-row-${p.id}`}
                onPointerEnter={() => setHover(p)}
                onPointerLeave={() => setHover(null)}
                className="group grid grid-cols-2 gap-x-4 gap-y-2 border-b border-white/10 py-5 transition-colors target:bg-flame/10 hover:bg-white/[0.03] md:table-row md:py-0"
              >
                <th scope="row" className="col-span-2 align-middle font-normal md:py-6">
                  <span className={`${display} flex items-center gap-3 text-[clamp(1.8rem,3.4vw,3.2rem)] font-[800] uppercase leading-none [font-stretch:75%] transition-[font-stretch,color] duration-300 group-hover:text-flame group-hover:[font-stretch:110%]`}>
                    {p.title}
                    {p.ai && <Sparkles size={20} strokeWidth={2.25} className="shrink-0 text-flame" aria-label="Projet IA" />}
                  </span>
                  <span className="relative mt-3 block aspect-[16/9] overflow-hidden rounded md:hidden">
                    <Image src={p.image} alt={`Aperçu du projet ${p.title}`} fill sizes="100vw" className="object-cover" />
                  </span>
                </th>
                <td className="text-[15px] text-[#b0a79e] md:py-6">{p.kind}</td>
                <td className="text-[15px] md:max-w-[22ch] md:py-6">{p.role}</td>
                <td className="col-span-2 text-[14px] text-[#b0a79e] md:max-w-[26ch] md:py-6">{p.stack.join(", ")}</td>
                <td className="col-span-2 md:py-6 md:text-right">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-flame underline-offset-4 hover:underline"
                    >
                      Voir <ArrowUpRight size={17} strokeWidth={2.25} className="icon-nudge" aria-hidden />
                      <span className="sr-only">le site {p.title} (nouvel onglet)</span>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating preview (pointer devices only) */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
      >
        <AnimatePresence>
          {hover && (
            <motion.div
              key={hover.id}
              initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: -2, clipPath: "inset(50% 0 50% 0)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, clipPath: "inset(0% 0 0% 0)" }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[200px] w-[300px] overflow-hidden rounded shadow-[0_20px_50px_-15px_rgba(0,0,0,.9)]"
            >
              <Image src={hover.image} alt="" fill sizes="300px" className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function OffersIndex({ onAsk }: { onAsk: (seed?: string) => void }) {
  return (
    <section id="ix-offres" aria-labelledby="ix-offres-title" className="scroll-mt-28 bg-flame text-ink">
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <h2 id="ix-offres-title" className={`${display} text-[clamp(2.6rem,6vw,6rem)] font-[800] uppercase leading-[0.85] [font-stretch:70%]`}>
          Offres <span className="align-top text-[0.35em] tabular-nums">({offers.length})</span>
        </h2>
        <div className="mt-10 grid border-t-2 border-ink">
          {offers.map((o) => (
            <article key={o.id} className="grid gap-6 border-b-2 border-ink py-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-[14px] font-semibold">{o.forWho}</p>
                <h3 className={`${display} mt-2 text-[clamp(2rem,3.4vw,3.2rem)] font-[800] uppercase leading-[0.9] [font-stretch:80%]`}>{o.title}</h3>
              </div>
              <p className="text-lg leading-relaxed lg:col-span-4">{o.pitch}</p>
              <div className="grid content-start gap-4 lg:col-span-3">
                <ul className="grid gap-1.5 text-[15px]">
                  {o.deliverables.map((d) => (
                    <li key={d} className="flex gap-2">
                      <ArrowRight size={16} strokeWidth={2.5} className="mt-1 shrink-0" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onAsk(o.id === "mvp" ? "mvp" : "integration")}
                  className="inline-flex min-h-11 w-fit items-center gap-2 rounded bg-ink px-4 font-semibold text-bone transition-transform hover:-translate-y-0.5"
                >
                  Poser la question
                  <CornerDownLeft size={16} strokeWidth={2.25} aria-hidden />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodIndex() {
  return (
    <section id="ix-methode" aria-labelledby="ix-methode-title" className="scroll-mt-28 border-t border-white/10">
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <h2 id="ix-methode-title" className={`${display} text-[clamp(2.6rem,6vw,6rem)] font-[800] uppercase leading-[0.85] [font-stretch:70%]`}>
          Méthode
        </h2>
        <table className="mt-10 w-full border-collapse text-left">
          <caption className="sr-only">Ce que décide l&apos;humain et ce qu&apos;accélère l&apos;IA, étape par étape</caption>
          <thead className="hidden text-[12px] uppercase tracking-[0.06em] text-[#9a9189] md:table-header-group">
            <tr className="border-b border-white/20">
              <th scope="col" className="w-[22%] py-3 font-medium">Étape</th>
              <th scope="col" className="py-3 font-medium">Je décide</th>
              <th scope="col" className="py-3 font-medium text-flame">L&apos;IA accélère</th>
            </tr>
          </thead>
          <tbody>
            {method.map((s) => (
              <tr key={s.id} className="grid gap-2 border-b border-white/10 py-5 md:table-row md:py-0">
                <th scope="row" className={`${display} text-[clamp(1.8rem,3vw,2.8rem)] font-[800] uppercase [font-stretch:90%] md:py-6`}>
                  {s.name}
                </th>
                <td className="max-w-[44ch] pr-6 text-[16px] leading-relaxed md:py-6">{s.human}</td>
                <td className="max-w-[44ch] text-[16px] leading-relaxed text-[#ffb27a] md:py-6">{s.ai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TechIndex() {
  return (
    <section id="ix-tech" aria-labelledby="ix-tech-title" className="scroll-mt-28 border-t border-white/10">
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <h2 id="ix-tech-title" className={`${display} text-[clamp(2.6rem,6vw,6rem)] font-[800] uppercase leading-[0.85] [font-stretch:70%]`}>
          Technologies <span className="align-top text-[0.35em] text-flame tabular-nums">({techIndex.length})</span>
        </h2>
        <dl className="mt-10 columns-1 gap-10 sm:columns-2 lg:columns-3">
          {techIndex.map(([tech, used]) => (
            <div key={tech} id={`ix-tech-${tech.replace(/\W+/g, "-").toLowerCase()}`} className="mb-0 flex break-inside-avoid items-baseline justify-between gap-4 border-b border-white/10 py-3 target:bg-flame/10">
              <dt className="text-lg font-semibold">{tech}</dt>
              <dd className="text-right text-[14px] text-[#b0a79e]">
                {used.map((p, i) => (
                  <span key={p.id}>
                    {i > 0 && ", "}
                    <a href={`#ix-row-${p.id}`} className="underline-offset-4 hover:text-flame hover:underline">
                      {p.title}
                    </a>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CareerIndex() {
  return (
    <section id="ix-parcours" aria-labelledby="ix-parcours-title" className="scroll-mt-28 border-t border-white/10">
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <h2 id="ix-parcours-title" className={`${display} text-[clamp(2.6rem,6vw,6rem)] font-[800] uppercase leading-[0.85] [font-stretch:70%]`}>
          Parcours
        </h2>
        <ol className="mt-10 border-t border-white/20">
          {experience.map((e) => (
            <li key={e.title} className="grid gap-2 border-b border-white/10 py-6 md:grid-cols-12 md:gap-6">
              <p className="text-[15px] tabular-nums text-flame md:col-span-3">{e.period}</p>
              <h3 className={`${display} text-3xl font-[800] uppercase [font-stretch:85%] md:col-span-3`}>{e.title}</h3>
              <p className="max-w-[60ch] text-[16px] leading-relaxed text-[#cfc6bd] md:col-span-6">{e.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section aria-labelledby="ix-close-title" className="border-t border-white/10">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-24 md:px-8 lg:grid-cols-12 lg:items-end">
        <h2 id="ix-close-title" className={`${display} text-[clamp(3rem,9vw,9rem)] font-[800] uppercase leading-[0.82] [font-stretch:65%] lg:col-span-8`}>
          Entrée suivante : <span className="text-flame">votre projet</span>
        </h2>
        <div className="grid gap-4 lg:col-span-4">
          <p className="text-lg leading-snug text-[#cfc6bd]">Quelques lignes suffisent. Réponse personnelle, avec une première estimation.</p>
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent("Un projet à vous présenter")}`}
            className="inline-flex min-h-14 w-fit items-center gap-2.5 rounded bg-flame px-6 text-lg font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Mail size={20} strokeWidth={2.25} className="icon-draw" aria-hidden />
            Présenter mon projet
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────── ⌘K: search that also answers ───────────── */

type Item =
  | { kind: "ask"; label: string }
  | { kind: "question"; label: string; intent: Intent }
  | { kind: "project"; label: string; hint: string; target: string }
  | { kind: "tech"; label: string; hint: string; target: string }
  | { kind: "section"; label: string; target: string };

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function Palette({ seed, onClose }: { seed: string | null; onClose: () => void }) {
  const reduce = useReducedMotion();
  const chat = useScriptedChat({ greet: false });
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"search" | "answer">(seed ? "answer" : "search");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);

  const askIntent = useCallback(
    (intent: Intent) => {
      setMode("answer");
      chat.askIntent(intent);
    },
    [chat],
  );

  useEffect(() => {
    inputRef.current?.focus();
    if (seed && !seeded.current) {
      seeded.current = true;
      const intent = intentById(seed);
      if (intent) chat.askIntent(intent);
    }
  }, [seed, chat]);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [chat.messages, chat.status, reduce]);

  const items = useMemo<Item[]>(() => {
    const q = norm(query.trim());
    const questions = (q ? [] : starterIds.map(intentById).filter(Boolean) as Intent[]).map(
      (intent) => ({ kind: "question", label: intent.question, intent }) as Item,
    );
    const projectItems = projects
      .filter((p) => !q || norm(`${p.title} ${p.kind} ${p.stack.join(" ")}`).includes(q))
      .map((p) => ({ kind: "project", label: p.title, hint: p.kind, target: `ix-row-${p.id}` }) as Item);
    const techItems = techIndex
      .filter(([t]) => q && norm(t).includes(q))
      .map(([t, used]) => ({ kind: "tech", label: t, hint: `${used.length} projet${used.length > 1 ? "s" : ""}`, target: `ix-tech-${t.replace(/\W+/g, "-").toLowerCase()}` }) as Item);
    const sections = (
      [
        ["Offres", "ix-offres"],
        ["Méthode", "ix-methode"],
        ["Technologies", "ix-tech"],
        ["Parcours", "ix-parcours"],
      ] as const
    )
      .filter(([l]) => !q || norm(l).includes(q))
      .map(([label, target]) => ({ kind: "section", label, target }) as Item);
    return [...(q ? [{ kind: "ask", label: query.trim() } as Item] : []), ...questions, ...projectItems, ...techItems, ...sections];
  }, [query]);

  const run = (item: Item) => {
    if (item.kind === "ask") {
      setMode("answer");
      chat.ask(item.label);
      setQuery("");
    } else if (item.kind === "question") {
      askIntent(item.intent);
    } else {
      onClose();
      requestAnimationFrame(() => {
        const el = document.getElementById(item.target);
        el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        history.replaceState(null, "", `${location.search}#${item.target}`);
      });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      if (mode === "answer") setMode("search");
      else onClose();
    } else if (mode === "search" && e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(items.length - 1, c + 1));
    } else if (mode === "search" && e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") {
      e.preventDefault();
      if (mode === "answer") {
        if (query.trim() && !chat.busy) {
          chat.ask(query.trim());
          setQuery("");
        }
      } else if (items[cursor]) run(items[cursor]);
    } else if (e.key === "Tab") {
      // Keep focus inside the dialog
      const f = dialogRef.current?.querySelectorAll<HTMLElement>("button, input, a[href]");
      if (!f || f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const icon = (k: Item["kind"]) =>
    k === "ask" || k === "question" ? <Spark size={20} track={false} /> : k === "tech" ? <Hash size={17} strokeWidth={2.25} aria-hidden /> : <Layers size={17} strokeWidth={2.25} aria-hidden />;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[90] grid place-items-start bg-black/70 px-3 pt-[calc(var(--lab-h)+8vh)] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      data-lab-modal-open=""
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Recherche et assistant"
        onKeyDown={onKeyDown}
        initial={reduce ? false : { opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-h-[min(640px,80svh)] w-full max-w-2xl flex-col overflow-hidden rounded-md border border-white/15 bg-[#121212] shadow-[0_40px_100px_-20px_rgba(0,0,0,.95)]"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          {mode === "answer" ? (
            <button type="button" onClick={() => setMode("search")} aria-label="Retour à la recherche" className="grid size-9 place-items-center rounded hover:bg-white/10">
              <ArrowLeft size={18} strokeWidth={2.25} aria-hidden />
            </button>
          ) : (
            <Search size={19} strokeWidth={2.25} className="text-flame" aria-hidden />
          )}
          <label htmlFor="ix-q" className="sr-only">
            {mode === "answer" ? "Poser une autre question" : "Rechercher ou poser une question"}
          </label>
          <input
            id="ix-q"
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder={mode === "answer" ? "Une autre question ?" : "Projet, techno, section… ou une question"}
            autoComplete="off"
            role="combobox"
            aria-expanded={mode === "search"}
            aria-controls="ix-results"
            aria-activedescendant={mode === "search" && items[cursor] ? `ix-opt-${cursor}` : undefined}
            className="min-h-14 min-w-0 flex-1 bg-transparent text-[17px] outline-none placeholder:text-[#7d756e] focus-visible:outline-none"
          />
          <kbd className="rounded bg-white/10 px-1.5 text-[12px] text-[#9a9189]">Échap</kbd>
        </div>

        {mode === "search" ? (
          <ul id="ix-results" role="listbox" aria-label="Résultats" className="min-h-0 flex-1 overflow-y-auto p-2">
            {items.length === 0 && <li className="px-3 py-6 text-center text-[#9a9189]">Aucun résultat.</li>}
            {items.map((item, i) => (
              <li
                key={`${item.kind}-${item.label}`}
                id={`ix-opt-${i}`}
                role="option"
                aria-selected={i === cursor}
                onMouseEnter={() => setCursor(i)}
                onClick={() => run(item)}
                className={[
                  "flex min-h-12 cursor-pointer items-center gap-3 rounded px-3 text-[15px]",
                  i === cursor ? "bg-flame text-ink" : "text-bone",
                ].join(" ")}
              >
                <span className="grid w-6 shrink-0 place-items-center">{icon(item.kind)}</span>
                <span className="flex-1 truncate">
                  {item.kind === "ask" ? (
                    <>
                      Demander à l&apos;assistant : <strong>« {item.label} »</strong>
                    </>
                  ) : (
                    item.label
                  )}
                </span>
                {"hint" in item && <span className={i === cursor ? "text-ink/70" : "text-[#9a9189]"}>{item.hint}</span>}
                {i === cursor && <CornerDownLeft size={15} strokeWidth={2.25} aria-hidden />}
              </li>
            ))}
          </ul>
        ) : (
          <div ref={threadRef} className="min-h-0 flex-1 overflow-y-auto p-5">
            <ol className="grid gap-5">
              {chat.messages.map((m) =>
                m.role === "user" ? (
                  <li key={m.id} className={`${display} text-2xl font-[800] uppercase leading-none text-flame [font-stretch:80%]`}>
                    <span className="sr-only">Vous : </span>
                    {m.text}
                  </li>
                ) : (
                  <li key={m.id} className="grid gap-3">
                    <span className="sr-only">Assistant : </span>
                    <StreamedText message={m} className="leading-relaxed text-[#e8e0d8]" />
                    {m.done && m.blocks.length > 0 && <AnswerBlocks blocks={m.blocks} />}
                  </li>
                ),
              )}
              {chat.status === "thinking" && <li className="text-[#9a9189]">Recherche dans le portfolio…</li>}
            </ol>
            {chat.suggestions.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {chat.suggestions.map((s) => (
                  <button key={s.id} type="button" onClick={() => chat.askIntent(s)} className="min-h-10 rounded-full border border-white/20 px-3.5 text-[14px] hover:border-flame">
                    {s.question}
                  </button>
                ))}
              </div>
            )}
            <p className="mt-6 text-[12px] text-[#7d756e]">Réponses rédigées à l&apos;avance pour cette maquette.</p>
          </div>
        )}
        <ChatAnnouncer messages={chat.messages} />
      </motion.div>
    </motion.div>
  );
}
