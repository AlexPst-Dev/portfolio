"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUp, ArrowUpRight, Check, Mail, MessageCircle, X } from "lucide-react";
import { hanken, jetbrains, unbounded } from "../fonts";
import { experience, method, offers, profile, projects, stack } from "../content";
import { useScriptedChat } from "../chat/useScriptedChat";
import { AnswerBlocks, ChatAnnouncer, StreamedText } from "../chat/Blocks";
import Spark from "../Spark";

/*
 * 1.3 — Fusion
 * The Pipeline page (01) with the Étincelle character (03).
 * - Header and "/" shortcut from 01; the bottom command bar becomes the spark,
 *   bottom right, whose conversation opens large.
 * - Hero: the 01 layout, a smaller pipeline on the right, and the name set
 *   big in Unbounded (03) with the cursor-reactive letters of 05, driven by
 *   weight since Unbounded has no width axis.
 * - Offers in the 03 colours (one orange, one black), the rest of the scroll
 *   from 01, career and contact from 03.
 */

const STAGES = ["Idée", "Design", "Code", "Prod"] as const;
const STAGE_NOTE = ["On cadre le problème", "On choisit la direction", "On construit, on teste", "C'est en ligne"];

const vars = {
  "--b-surface": "#16110d",
  "--b-line": "#30271f",
  "--b-ink": "#f5efe8",
  "--b-muted": "#b3a89d",
  "--b-accent": "#ff6a13",
  "--b-accent-ink": "#0a0806",
  "--b-radius": "16px",
  "--spark-body": "#ff6a13",
} as React.CSSProperties;

const display = "[font-family:var(--f-unbounded)]";
const mono = "[font-family:var(--f-jetbrains)]";
const h2 = `${display} text-[clamp(2rem,4.4vw,4rem)] font-[800] leading-[0.98] tracking-[-0.03em]`;

// What the spark says, section by section
const LINES: Record<string, string> = {
  "fx-hero": "Psst. Tapez / ou cliquez-moi : je connais tout son travail.",
  "fx-offres": "Deux offres. La seconde, c'est pour les produits qui existent déjà.",
  "fx-methode": "Ici l'IA accélère, mais c'est lui qui décide.",
  "fx-projets": "TimeIt a été codé avec un agent IA. Demandez-moi comment.",
  "fx-parcours": "Quatre ans de TypeScript avant de parler aux IA.",
  "fx-contact": "Le plus rapide : un email. Il répond lui-même.",
};

export default function Fusion() {
  const chat = useScriptedChat({
    greetingText:
      "Bonjour, je suis l'étincelle, l'assistante d'Alexandre. Posez-moi vos questions sur ses projets, sa méthode ou ce qu'il peut construire pour vous.",
  });
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("fx-hero");

  // The spark's line follows the section in view
  useEffect(() => {
    const els = Object.keys(LINES)
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setSection(hit.target.id);
      },
      { threshold: [0.35, 0.6] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const ask = (q: string, id?: string) => {
    setOpen(true);
    chat.ask(q, id);
  };
  const openChat = () => setOpen(true);

  return (
    <div
      className={`${unbounded.variable} ${hanken.variable} ${jetbrains.variable} bg-ink text-bone [font-family:var(--f-hanken)] antialiased`}
      style={vars}
    >
      <a
        href="#fx-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-[calc(var(--lab-h)+12px)] focus:z-50 focus:rounded-full focus:bg-flame focus:px-4 focus:py-2 focus:text-ink"
      >
        Aller au contenu
      </a>
      <Header onAsk={openChat} />
      <main id="fx-main">
        <Hero onAsk={openChat} />
        <Offers onAsk={ask} />
        <Method />
        <Projects />
        <Career />
        <Contact />
      </main>
      <Footer />
      <Companion chat={chat} open={open} setOpen={setOpen} line={LINES[section]} onAsk={ask} />
    </div>
  );
}

/* ───────────── Header (01): the living logo and the "/" command ───────────── */

function Header({ onAsk }: { onAsk: () => void }) {
  return (
    <header className="sticky top-[var(--lab-h)] z-40 border-b border-white/10 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
        <a href="#fx-main" className={`${display} flex items-center gap-2.5 text-[15px] font-[700]`}>
          <Spark size={32} label="Logo d'Alexandre Proust" />
          <span>Alexandre Proust</span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-7 text-[15px] text-ash lg:flex">
          {[
            ["#fx-offres", "Offres"],
            ["#fx-methode", "Méthode"],
            ["#fx-projets", "Projets"],
            ["#fx-parcours", "Parcours"],
            ["#fx-contact", "Contact"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-bone">
              {label}
            </a>
          ))}
        </nav>
        {/* Looks like a command field: a click or "/" opens the spark's conversation */}
        <button
          type="button"
          onClick={onAsk}
          className="hidden min-h-11 w-[min(300px,34vw)] items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] pl-4 pr-1.5 text-[15px] text-ash transition-colors hover:border-flame hover:text-bone sm:inline-flex"
        >
          <MessageCircle size={17} strokeWidth={2.25} className="icon-draw shrink-0 text-flame" aria-hidden />
          <span className="flex-1 text-left">Une question ? Tapez</span>
          <kbd className={`${mono} grid h-8 min-w-8 place-items-center rounded-full bg-white/10 px-2 text-sm text-bone`}>/</kbd>
        </button>
      </div>
    </header>
  );
}

/* ───────────── Hero: big kinetic name (05 idea, 03 type) + the 01 pipeline, smaller ───────────── */

// Letters swell in weight near the cursor. Sizes leave room for every letter at 900.
const REST_WEIGHT = 800;

function KineticLine({ text, hostRef, className }: { text: string; hostRef: React.RefObject<HTMLElement | null>; className: string }) {
  const reduce = useReducedMotion();
  const letters = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const spans = letters.current.filter(Boolean) as HTMLSpanElement[];
    const host = hostRef.current;
    if (reduce || !host || !window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let px = -1;
    const apply = () => {
      raf = 0;
      spans.forEach((s) => {
        const r = s.getBoundingClientRect();
        const c = r.left + r.width / 2;
        const w = px < 0 ? REST_WEIGHT : 330 + 570 * Math.exp(-(((c - px) / 150) ** 2));
        s.style.fontWeight = String(Math.round(w));
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
    <span className={`flex justify-between ${className}`} aria-hidden>
      {[...text].map((ch, i) => (
        <span
          key={i}
          ref={(el) => void (letters.current[i] = el)}
          className="inline-block transition-[font-weight] duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
          // Letters light up from hairline to bold; `backwards` hands the weight back to the cursor
          style={{
            fontWeight: REST_WEIGHT,
            animation: reduce ? undefined : `fx-ignite 1100ms cubic-bezier(.22,1,.36,1) ${i * 55}ms backwards`,
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

function Hero({ onAsk }: { onAsk: () => void }) {
  const reduce = useReducedMotion();
  const nameHost = useRef<HTMLDivElement>(null);
  // -1: not started; 0..3: running stage; 4: all done
  const [running, setStep] = useState(-1);
  const step = reduce ? 4 : running;

  useEffect(() => {
    if (reduce) return;
    const timers = [0, 1, 2, 3, 4].map((i) => window.setTimeout(() => setStep(i), 700 + i * 700));
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  return (
    <section
      id="fx-hero"
      aria-labelledby="fx-title"
      className="relative mx-auto grid min-h-[calc(100svh-var(--lab-h)-4rem)] max-w-[1440px] grid-cols-1 content-center gap-12 px-5 pb-24 pt-10 md:px-10 lg:grid-cols-12 lg:gap-8"
    >
      <div ref={nameHost} className="flex min-w-0 flex-col gap-6 lg:col-span-7">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-sm text-ash">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-flame opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-flame" />
          </span>
          {profile.availability}
        </p>
        <h1 id="fx-title" className={`${display} uppercase leading-[0.86] [container-type:inline-size]`}>
          <span className="sr-only">Alexandre Proust, product builder</span>
          <KineticLine text="Alexandre" hostRef={nameHost} className="text-[12cqi]" />
          <KineticLine text="Proust" hostRef={nameHost} className="text-[18.6cqi] text-flame" />
        </h1>
        <p className={`${display} w-fit rounded-full border-2 border-flame px-4 py-1.5 text-[clamp(1rem,1.5vw,1.3rem)] font-[600] text-flame`} aria-hidden>
          Product builder
        </p>
        <p className="max-w-[34ch] text-[clamp(1.2rem,1.7vw,1.45rem)] leading-snug text-bone/90">{profile.promise}</p>
        <dl className="grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-5">
          {profile.facts.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block text-lg font-semibold">{f.value}</span>
                <span className="block text-sm leading-tight text-ash">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-3">
          <a
            href="#fx-contact"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-flame px-6 font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Parler de votre projet
            <ArrowRight size={18} strokeWidth={2.25} className="icon-nudge" aria-hidden />
          </a>
          <button
            type="button"
            onClick={onAsk}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white/20 px-6 font-semibold transition-colors hover:border-flame hover:text-flame"
          >
            <MessageCircle size={18} strokeWidth={2.25} className="icon-draw" aria-hidden />
            Questionner l&apos;étincelle
          </button>
        </div>
      </div>

      <ol aria-label="La méthode en quatre étapes" className="grid content-center [container-type:inline-size] lg:col-span-4 lg:col-start-9">
        {STAGES.map((name, i) => {
          const state = step > i || step === 4 ? "done" : step === i ? "active" : "todo";
          const last = i === STAGES.length - 1;
          const shipped = last && step === 4;
          return (
            <li key={name} className="relative flex flex-col overflow-hidden border-b border-white/10 pb-1.5 pt-2 first:border-t">
              {/* Progress fill while the stage runs; the last stage keeps its field */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 bg-flame"
                style={{
                  width: state === "active" || shipped ? "100%" : "0%",
                  opacity: state === "active" ? 0.14 : shipped ? 1 : 0,
                  transition: reduce
                    ? "none"
                    : state === "active"
                      ? "width 650ms cubic-bezier(.65,0,.35,1), opacity 200ms"
                      : "width 900ms cubic-bezier(.22,1,.36,1), opacity 500ms",
                }}
              />
              <span
                className={`${mono} relative pl-3 text-[12px] leading-tight`}
                style={{ color: shipped ? "#0a0806" : state === "todo" ? "#5c5249" : "#a89e94" }}
              >
                {state === "done" && !last ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={13} strokeWidth={2.5} aria-hidden /> {STAGE_NOTE[i]}
                  </span>
                ) : (
                  STAGE_NOTE[i]
                )}
              </span>
              <span
                className={`${display} relative pr-3 text-right text-[min(4.5rem,13cqi)] uppercase leading-[0.95] tracking-[-0.02em]`}
                style={{
                  fontWeight: state === "active" || shipped ? 900 : state === "done" ? 700 : 200,
                  color: shipped ? "#0a0806" : state === "todo" ? "#4a4038" : "#f5efe8",
                  transition: reduce ? "none" : "font-weight 600ms cubic-bezier(.22,1,.36,1), color 300ms",
                }}
              >
                {name}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ───────────── Offers: 01 layout, 03 colours (one orange, one black) ───────────── */

function Offers({ onAsk }: { onAsk: (q: string, id?: string) => void }) {
  return (
    <section id="fx-offres" aria-labelledby="fx-offres-title" className="scroll-mt-32 border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <h2 id="fx-offres-title" className={`${h2} max-w-[18ch]`}>
          Deux façons de travailler ensemble
        </h2>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {offers.map((o, i) => {
            const filled = i === 0;
            return (
              <article
                key={o.id}
                className={[
                  "flex flex-col gap-6 rounded-[24px] p-7 transition-transform duration-300 hover:-translate-y-0.5 md:p-10",
                  filled ? "bg-flame text-ink" : "border-2 border-[#3a3028] bg-[#120e0b]",
                ].join(" ")}
              >
                <p className={filled ? "font-semibold" : "font-semibold text-flame"}>{o.forWho}</p>
                <h3 className={`${display} text-[clamp(1.6rem,2.6vw,2.4rem)] font-[700] leading-[1.02] tracking-[-0.02em]`}>{o.title}</h3>
                <p className={`max-w-[48ch] text-lg leading-relaxed ${filled ? "" : "text-bone/85"}`}>{o.pitch}</p>
                <ul className="grid gap-3">
                  {o.deliverables.map((d) => (
                    <li key={d} className={`flex gap-3 border-t pt-3 ${filled ? "border-ink/20" : "border-white/10"}`} data-icon-trigger>
                      <Check size={18} strokeWidth={2.5} className={`icon-draw mt-0.5 shrink-0 ${filled ? "" : "text-flame"}`} aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() =>
                    onAsk(o.id === "mvp" ? "Combien de temps pour un MVP ?" : "Ajouter de l'IA à mon produit existant ?", o.id === "mvp" ? "mvp" : "integration")
                  }
                  className={[
                    "mt-auto inline-flex min-h-12 w-fit items-center gap-2 rounded-full px-5 font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0",
                    filled ? "bg-ink text-bone" : "bg-bone text-ink",
                  ].join(" ")}
                >
                  {o.id === "mvp" ? "Estimer mon MVP" : "Trouver le bon cas d'usage"}
                  <ArrowRight size={18} strokeWidth={2.25} className="icon-nudge" aria-hidden />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Method (01): a progress line crosses the four stages as you scroll ───────────── */

function Method() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [reached, setReached] = useState(0);
  useEffect(() => {
    if (reduce) return;
    return scrollYProgress.on("change", (v) => setReached(Math.floor(v * 4 + 0.15)));
  }, [scrollYProgress, reduce]);
  const shown = reduce ? 4 : reached;

  return (
    <section id="fx-methode" ref={ref} aria-labelledby="fx-methode-title" className="scroll-mt-32 border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 id="fx-methode-title" className={`${h2} lg:col-span-7`}>
            L&apos;IA accélère. Je décide.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-bone/80 lg:col-span-5 lg:self-end">
            À chaque étape, ce que je tranche moi-même et ce que l&apos;IA me permet d&apos;aller chercher plus vite.
          </p>
        </div>

        <div className="relative mt-16">
          <div aria-hidden className="absolute left-0 right-0 top-[15px] hidden h-px bg-white/15 md:block" />
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-[14px] hidden h-[3px] origin-left bg-flame md:block"
            style={{ scaleX: reduce ? 1 : scale }}
          />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {method.map((s, i) => {
              const on = shown > i;
              return (
                <li key={s.id} className="relative grid content-start gap-4">
                  <span
                    aria-hidden
                    className="relative z-10 grid size-8 place-items-center rounded-full border-2 transition-colors duration-300"
                    style={{ borderColor: on ? "#ff6a13" : "rgba(255,255,255,.25)", background: on ? "#ff6a13" : "#0a0806" }}
                  >
                    {on && <Check size={15} strokeWidth={3} className="text-ink" />}
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
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Projects (01): rows; the screenshot opens on hover ───────────── */

// Long titles break per word from the start, so hovering never adds a line
const titleLines = (title: string) => (title.length > 12 ? title.split(" ") : [title]);

function Projects() {
  return (
    <section id="fx-projets" aria-labelledby="fx-projets-title" className="scroll-mt-32 border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <h2 id="fx-projets-title" className={h2}>
          Déjà en production
        </h2>
        <ul className="mt-12 border-t border-white/15">
          {projects.map((p) => {
            const lines = titleLines(p.title);
            return (
              <li key={p.id} className="group border-b border-white/15">
                <div className="grid items-center gap-5 py-8 md:grid-cols-12 md:gap-6">
                  <div className="min-w-0 md:col-span-5">
                    <h3
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
                    <p className={`${mono} text-[13px] text-ash`}>{p.stack.join(" / ")}</p>
                  </div>
                  <div className="md:col-span-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-ink-2 [clip-path:inset(0_0_0_0)] md:[clip-path:inset(18%_0_18%_0_round_14px)] md:transition-[clip-path] md:duration-500 md:ease-[cubic-bezier(.22,1,.36,1)] md:group-hover:[clip-path:inset(0_0_0_0_round_14px)]">
                      <Image
                        src={p.image}
                        alt={`Aperçu du projet ${p.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-3 flex gap-5 text-[15px]">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-1 font-semibold text-flame underline-offset-4 hover:underline"
                        >
                          Voir le site <ArrowUpRight size={16} strokeWidth={2.25} className="icon-nudge" aria-hidden />
                          <span className="sr-only">{p.title} (nouvel onglet)</span>
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-1 text-ash underline-offset-4 hover:text-bone hover:underline"
                        >
                          Code <span className="sr-only">de {p.title} sur GitHub (nouvel onglet)</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Career (03): timeline + stack card ───────────── */

function Career() {
  return (
    <section id="fx-parcours" aria-labelledby="fx-parcours-title" className="scroll-mt-32 border-t border-white/10">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 lg:grid-cols-2">
        <div>
          <h2 id="fx-parcours-title" className={h2}>
            Le parcours
          </h2>
          <ol className="mt-10 grid gap-8">
            {experience.map((e) => (
              <li key={e.title} className="grid gap-1">
                <p className="text-[15px] tabular-nums text-flame">{e.period}</p>
                <h3 className={`${display} text-xl font-[700]`}>{e.title}</h3>
                <p className="max-w-[52ch] text-bone/80">{e.detail}</p>
              </li>
            ))}
          </ol>
        </div>
        <dl className="grid content-start gap-6 rounded-[24px] border-2 border-[#30271f] p-8">
          {Object.entries(stack).map(([group, items]) => (
            <div key={group} className="grid gap-2.5">
              <dt className="font-semibold text-[#c9bfb5]">{group}</dt>
              <dd className="flex flex-wrap gap-2">
                {items.map((t) => (
                  <span key={t} className="rounded-full bg-[#1f1914] px-3.5 py-1.5 text-[15px]">
                    {t}
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

/* ───────────── Contact (03): the spark, big ───────────── */

function Contact() {
  return (
    <section id="fx-contact" aria-labelledby="fx-contact-title" className="scroll-mt-32 border-t border-white/10 px-5 pb-16 pt-24 md:px-10">
      <div className="mx-auto grid max-w-[1440px] justify-items-center gap-8 text-center">
        <Spark size={180} />
        <h2 id="fx-contact-title" className={`${display} max-w-[16ch] text-[clamp(2.2rem,5.4vw,5rem)] font-[800] leading-[0.95] tracking-[-0.035em]`}>
          Une idée ? Allumons-la.
        </h2>
        <p className="max-w-[44ch] text-xl leading-snug text-bone/85">
          Décrivez votre projet en quelques lignes, Alexandre vous répond avec une première estimation.
        </p>
        <a
          href={`mailto:${profile.email}?subject=${encodeURIComponent("Un projet à vous présenter")}`}
          className="inline-flex min-h-14 items-center gap-2.5 rounded-full bg-flame px-7 text-lg font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Mail size={20} strokeWidth={2.25} className="icon-draw" aria-hidden />
          Présenter mon projet
        </a>
        <p className="text-[15px] text-[#a89e94]">{profile.email}</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 pb-32 pt-8 text-sm text-ash md:px-10">
        <p>© {new Date().getFullYear()} Alexandre Proust · Rennes</p>
        <div className="flex gap-6">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ───────────── The spark (03), bottom right; its conversation opens large ───────────── */

type Chat = ReturnType<typeof useScriptedChat>;

function Companion({
  chat,
  open,
  setOpen,
  line,
  onAsk,
}: {
  chat: Chat;
  open: boolean;
  setOpen: (v: boolean) => void;
  line: string;
  onAsk: (q: string, id?: string) => void;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState("");
  const [hideBubble, setHideBubble] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mood = chat.status === "thinking" ? "thinking" : chat.status === "streaming" ? "talking" : "idle";

  // "/" opens the conversation (or jumps back to its field); Escape closes it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      const typing = !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      if (e.key === "/" && !typing) {
        e.preventDefault();
        if (open) inputRef.current?.focus();
        else setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) return;
    // Focus goes into the panel, and back to whatever opened it on close
    const opener = document.activeElement as HTMLElement | null;
    const toggle = toggleRef.current;
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      const target = opener && opener !== document.body && document.contains(opener) ? opener : toggle;
      target?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [chat.messages, chat.status, reduce, open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || chat.busy) return;
    onAsk(value);
    setValue("");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label="Conversation avec l'étincelle"
            data-lab-modal-open=""
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.35, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: 30 }}
            transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 360, damping: 34 }}
            style={{ transformOrigin: "100% 100%" }}
            className="fixed inset-x-0 bottom-0 top-[var(--lab-h)] z-[60] flex flex-col overflow-hidden bg-[#120e0b] shadow-[0_40px_120px_-20px_rgba(0,0,0,.95)] sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(880px,calc(100svh-var(--lab-h)-3rem))] sm:w-[min(760px,calc(100vw-3rem))] sm:rounded-[28px] sm:border-2 sm:border-[#3a3028]"
          >
            <div className="flex items-center gap-4 border-b border-[#2a221c] px-5 py-4 sm:px-7">
              <Spark size={56} mood={mood} />
              <div className="min-w-0">
                <p className={`${display} text-lg font-[700]`}>L&apos;étincelle</p>
                <p className="text-sm text-[#a89e94]">Réponses rédigées à l&apos;avance, en attendant le vrai modèle</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer la conversation"
                className="ml-auto grid size-11 shrink-0 place-items-center rounded-full hover:bg-white/10"
              >
                <X size={20} strokeWidth={2.25} className="icon-spin" aria-hidden />
              </button>
            </div>

            <div ref={threadRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 [scrollbar-width:thin] sm:px-7">
              <ol className="grid gap-6">
                {chat.messages.map((m) =>
                  m.role === "user" ? (
                    <li key={m.id} className="ml-auto w-fit max-w-[80%] rounded-[22px] rounded-br-md bg-flame px-5 py-3 text-[17px] font-medium text-ink">
                      <span className="sr-only">Vous : </span>
                      {m.text}
                    </li>
                  ) : (
                    <li key={m.id} className="grid grid-cols-[32px_1fr] gap-x-3">
                      <Spark size={32} track={false} className="mt-0.5" />
                      <div className="grid min-w-0 gap-4">
                        <span className="sr-only">Étincelle : </span>
                        <StreamedText message={m} className="max-w-[60ch] text-[17px] leading-relaxed text-bone/90" />
                        {m.done && m.blocks.length > 0 && (
                          <motion.div
                            initial={reduce ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <AnswerBlocks blocks={m.blocks} />
                          </motion.div>
                        )}
                      </div>
                    </li>
                  ),
                )}
                {chat.status === "thinking" && (
                  <li className="grid grid-cols-[32px_1fr] gap-x-3 text-[15px] text-[#a89e94]">
                    <Spark size={32} mood="thinking" track={false} />
                    <span className="self-center">L&apos;étincelle réfléchit…</span>
                  </li>
                )}
              </ol>
              {chat.suggestions.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 pl-[44px]">
                  {chat.suggestions.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => chat.askIntent(s)}
                      className="min-h-11 rounded-full border-2 border-[#3a3028] px-4 text-[15px] transition-colors hover:border-flame hover:text-flame"
                    >
                      {s.question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={submit} className="flex items-center gap-2 border-t border-[#2a221c] p-3 sm:p-4">
              <label htmlFor="fx-ask" className="sr-only">
                Votre question à l&apos;étincelle
              </label>
              <input
                id="fx-ask"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Délais, méthode, projets… demandez."
                autoComplete="off"
                className="min-h-14 min-w-0 flex-1 rounded-full bg-[#1d1713] px-5 text-[17px] outline-none placeholder:text-[#8f8479] focus-visible:outline-2 focus-visible:outline-flame"
              />
              <button
                type="submit"
                disabled={!value.trim() || chat.busy}
                aria-label="Envoyer la question"
                className="grid size-14 shrink-0 place-items-center rounded-full bg-flame text-ink transition-opacity disabled:opacity-35"
              >
                <ArrowUp size={22} strokeWidth={2.5} aria-hidden />
              </button>
            </form>
            <ChatAnnouncer messages={chat.messages} />
          </motion.section>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-50 flex items-end gap-2 sm:bottom-6 sm:right-6">
        <AnimatePresence mode="wait">
          {!open && !hideBubble && (
            <motion.div
              key={line}
              initial={reduce ? false : { opacity: 0, scale: 0.85, x: 12 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ transformOrigin: "100% 100%" }}
              className="relative mb-3 hidden max-w-[270px] rounded-[18px] rounded-br-sm bg-bone py-3 pl-4 pr-9 text-[15px] font-medium leading-snug text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,.8)] sm:block"
            >
              <button type="button" onClick={() => setOpen(true)} className="text-left">
                {line}
              </button>
              <button
                type="button"
                onClick={() => setHideBubble(true)}
                aria-label="Masquer la bulle"
                className="absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-full text-ink/60 hover:bg-ink/10 hover:text-ink"
              >
                <X size={14} strokeWidth={2.5} aria-hidden />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Always mounted (hidden while open) so focus can come back to it */}
        <button
          ref={toggleRef}
          type="button"
          hidden={open}
          onClick={() => setOpen(true)}
          aria-label="Ouvrir la conversation avec l'étincelle"
          className="grid size-[76px] place-items-center rounded-full bg-[#120e0b] shadow-[0_12px_30px_-8px_rgba(0,0,0,.9)] ring-2 ring-[#3a3028] transition-transform hover:-translate-y-1 hover:ring-flame active:translate-y-0"
        >
          <Spark size={56} mood={mood} />
        </button>
      </div>
    </>
  );
}
