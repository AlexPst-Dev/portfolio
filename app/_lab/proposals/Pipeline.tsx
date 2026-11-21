"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, CornerDownLeft, Mail, X } from "lucide-react";
import { archivo, jetbrains } from "../fonts";
import { experience, method, offers, profile, projects, stack } from "../content";
import { useScriptedChat } from "../chat/useScriptedChat";
import { AnswerBlocks, ChatAnnouncer, StreamedText } from "../chat/Blocks";
import Spark from "../Spark";

/*
 * 01 — Pipeline
 * The page is the path an idea travels: Idée → Design → Code → Prod.
 * Signature: the four stages run once on load, each one stretching its type
 * width as it executes; the assistant is a command bar docked at the bottom.
 */

const STAGES = ["Idée", "Design", "Code", "Prod"] as const;
const STAGE_NOTE = [
  "On cadre le problème",
  "On choisit la direction",
  "On construit, on teste",
  "C'est en ligne",
];

const vars = {
  "--b-surface": "#15110d",
  "--b-line": "#2c251f",
  "--b-ink": "#f5efe8",
  "--b-muted": "#a89e94",
  "--b-accent": "#ff6a13",
  "--b-accent-ink": "#0a0806",
  "--b-radius": "6px",
  "--spark-body": "#ff6a13",
} as React.CSSProperties;

export default function Pipeline() {
  const chat = useScriptedChat();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const ask = (q: string, id?: string) => {
    setOpen(true);
    chat.ask(q, id);
  };
  const focusBar = () => {
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div
      className={`${archivo.variable} ${jetbrains.variable} bg-ink text-bone [font-family:var(--f-archivo)] antialiased`}
      style={vars}
    >
      <a
        href="#pl-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-[calc(var(--lab-h)+12px)] focus:z-50 focus:bg-flame focus:px-4 focus:py-2 focus:text-ink"
      >
        Aller au contenu
      </a>
      <Header onAsk={focusBar} />
      <main id="pl-main" className="pb-32">
        <Hero onAsk={focusBar} />
        <Offers onAsk={ask} />
        <Method />
        <Projects />
        <Career />
        <Close />
      </main>
      <Footer />
      <CommandBar chat={chat} open={open} setOpen={setOpen} inputRef={inputRef} onAsk={ask} />
    </div>
  );
}

/* ───────────── Header ───────────── */

function Header({ onAsk }: { onAsk: () => void }) {
  return (
    <header className="sticky top-[var(--lab-h)] z-40 border-b border-white/10 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
        <a href="#pl-main" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Spark size={30} label="Logo d'Alexandre Proust" />
          <span>Alexandre Proust</span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-7 text-[15px] text-ash md:flex">
          {[
            ["#pl-offres", "Offres"],
            ["#pl-methode", "Méthode"],
            ["#pl-projets", "Projets"],
            ["#pl-contact", "Contact"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-bone">
              {label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={onAsk}
          className="hidden min-h-10 items-center gap-2 rounded-md border border-white/15 px-3.5 text-[15px] transition-colors hover:border-flame hover:text-flame sm:inline-flex"
        >
          Poser une question
          <kbd className="rounded bg-white/10 px-1.5 text-xs text-ash [font-family:var(--f-jetbrains)]">/</kbd>
        </button>
      </div>
    </header>
  );
}

/* ───────────── Hero: the pipeline runs once ───────────── */

function Hero({ onAsk }: { onAsk: () => void }) {
  const reduce = useReducedMotion();
  // -1: not started; 0..3: running stage; 4: all done
  const [running, setStep] = useState(-1);
  const step = reduce ? 4 : running;

  useEffect(() => {
    if (reduce) return;
    const timers = [0, 1, 2, 3, 4].map((i) => window.setTimeout(() => setStep(i), 450 + i * 760));
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  return (
    <section
      aria-labelledby="pl-hero-title"
      className="relative mx-auto grid min-h-[calc(100svh-var(--lab-h)-4rem)] max-w-[1440px] grid-cols-1 content-center gap-10 px-5 pb-28 pt-12 md:px-10 lg:grid-cols-12 lg:gap-8"
    >
      <div className="order-2 flex flex-col justify-end gap-7 lg:order-1 lg:col-span-5">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-sm text-ash">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-flame opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-flame" />
          </span>
          {profile.availability}
        </p>
        <h1 id="pl-hero-title" className="text-[clamp(2.4rem,4.6vw,4.4rem)] font-[750] leading-[0.95] tracking-[-0.03em]">
          Alexandre Proust,
          <br />
          <span className="text-flame">product builder.</span>
        </h1>
        <p className="max-w-[34ch] text-xl leading-snug text-bone/85">{profile.promise}</p>
        <dl className="grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-5">
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
            href="#pl-contact"
            className="group inline-flex min-h-12 items-center gap-2 rounded-md bg-flame px-5 font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Parler de votre projet
            <ArrowRight size={18} strokeWidth={2.25} className="icon-nudge" aria-hidden />
          </a>
          <button
            type="button"
            onClick={onAsk}
            className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/20 px-5 font-semibold transition-colors hover:border-bone"
          >
            Interroger l&apos;assistant
          </button>
        </div>
      </div>

      <ol aria-label="La méthode en quatre étapes" className="order-1 grid content-center [container-type:inline-size] lg:order-2 lg:col-span-7">
        {STAGES.map((name, i) => {
          const state = step > i || step === 4 ? "done" : step === i ? "active" : "todo";
          const last = i === STAGES.length - 1;
          const shipped = last && step === 4;
          return (
            <li
              key={name}
              className="relative flex flex-col items-stretch overflow-hidden border-b border-white/10 pb-1 pt-2.5 first:border-t"
            >
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
                      ? "width 700ms cubic-bezier(.65,0,.35,1), opacity 200ms"
                      : "width 900ms cubic-bezier(.22,1,.36,1), opacity 500ms",
                }}
              />
              <span
                className="relative pl-3 text-[13px] leading-tight [font-family:var(--f-jetbrains)]"
                style={{ color: shipped ? "#0a0806" : state === "todo" ? "#5c5249" : "#a89e94" }}
              >
                {state === "done" && !last ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={14} strokeWidth={2.5} aria-hidden /> {STAGE_NOTE[i]}
                  </span>
                ) : (
                  STAGE_NOTE[i]
                )}
              </span>
              <span
                className="relative pr-3 text-right text-[min(10rem,18cqi)] font-[850] uppercase leading-[0.88] tracking-[-0.02em]"
                style={{
                  fontStretch: state === "active" ? "125%" : state === "done" ? "100%" : "62%",
                  color: shipped ? "#0a0806" : state === "todo" ? "#3b332c" : "#f5efe8",
                  transition: reduce ? "none" : "font-stretch 650ms cubic-bezier(.22,1,.36,1), color 300ms",
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

/* ───────────── Offers ───────────── */

function Offers({ onAsk }: { onAsk: (q: string, id?: string) => void }) {
  return (
    <section id="pl-offres" aria-labelledby="pl-offres-title" className="scroll-mt-32 border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <h2
          id="pl-offres-title"
          className="max-w-[16ch] text-[clamp(2.2rem,5vw,4.5rem)] font-[800] leading-[0.95] tracking-[-0.03em] [font-stretch:85%]"
        >
          Deux façons de travailler ensemble
        </h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-md bg-white/10 md:grid-cols-2">
          {offers.map((o) => (
            <article key={o.id} className="group flex flex-col gap-6 bg-ink p-7 md:p-10">
              <p className="text-sm text-flame">{o.forWho}</p>
              <h3 className="text-[clamp(1.8rem,3vw,2.6rem)] font-[800] leading-none tracking-[-0.02em] [font-stretch:110%]">
                {o.title}
              </h3>
              <p className="max-w-[48ch] text-lg leading-relaxed text-bone/80">{o.pitch}</p>
              <ul className="grid gap-3">
                {o.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 border-t border-white/10 pt-3" data-icon-trigger>
                    <Check size={18} strokeWidth={2.5} className="icon-draw mt-0.5 shrink-0 text-flame" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  onAsk(o.id === "mvp" ? "Combien de temps pour un MVP ?" : "Ajouter de l'IA à mon produit existant ?", o.id === "mvp" ? "mvp" : "integration")
                }
                className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-flame underline-offset-[6px] hover:underline"
              >
                {o.id === "mvp" ? "Estimer mon MVP" : "Trouver le bon cas d'usage"}
                <ArrowRight size={18} strokeWidth={2.25} className="icon-nudge" aria-hidden />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Method: a progress line crosses the four stages as you scroll ───────────── */

function Method() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [reached, setReached] = useState(reduce ? 4 : 0);
  useEffect(() => {
    if (reduce) return;
    return scrollYProgress.on("change", (v) => setReached(Math.floor(v * 4 + 0.15)));
  }, [scrollYProgress, reduce]);

  return (
    <section id="pl-methode" ref={ref} aria-labelledby="pl-methode-title" className="scroll-mt-32 border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2
            id="pl-methode-title"
            className="text-[clamp(2.2rem,5vw,4.5rem)] font-[800] leading-[0.95] tracking-[-0.03em] [font-stretch:85%] lg:col-span-7"
          >
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
              const on = reached > i;
              return (
                <li key={s.id} className="relative grid content-start gap-4">
                  <span
                    aria-hidden
                    className="relative z-10 grid size-8 place-items-center rounded-full border-2 transition-colors duration-300"
                    style={{
                      borderColor: on ? "#ff6a13" : "rgba(255,255,255,.25)",
                      background: on ? "#ff6a13" : "#0a0806",
                    }}
                  >
                    {on && <Check size={15} strokeWidth={3} className="text-ink" />}
                  </span>
                  <h3 className="text-4xl font-[800] uppercase tracking-[-0.02em] [font-stretch:115%]">{s.name}</h3>
                  <div className="grid gap-1">
                    <p className="text-sm font-semibold text-bone">Ce que je décide</p>
                    <p className="leading-relaxed text-bone/75">{s.human}</p>
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-semibold text-flame">Ce que l&apos;IA accélère</p>
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

/* ───────────── Projects: rows; the screenshot opens on hover ───────────── */

function Projects() {
  return (
    <section id="pl-projets" aria-labelledby="pl-projets-title" className="scroll-mt-32 border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <h2
          id="pl-projets-title"
          className="text-[clamp(2.2rem,5vw,4.5rem)] font-[800] leading-[0.95] tracking-[-0.03em] [font-stretch:85%]"
        >
          Déjà en production
        </h2>
        <ul className="mt-12 border-t border-white/15">
          {projects.map((p) => (
            <li key={p.id} className="group border-b border-white/15">
              <div className="grid items-center gap-5 py-7 md:grid-cols-12 md:gap-6">
                <div className="md:col-span-5">
                  <h3 className="text-[clamp(2rem,4vw,3.6rem)] font-[850] uppercase leading-none tracking-[-0.02em] transition-[font-stretch] duration-500 [font-stretch:80%] group-hover:[font-stretch:110%]">
                    {/* Long titles break per word from the start, so the hover never adds a line */}
                    {(p.title.length > 12 ? p.title.split(" ") : [p.title]).map((l, i, all) => (
                      <span key={l} className="block">
                        {l}
                        {i < all.length - 1 ? " " : ""}
                      </span>
                    ))}
                  </h3>
                  {p.ai && (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-flame px-2.5 py-0.5 text-sm font-semibold text-ink">
                      <Spark size={16} track={false} className="[--spark-body:#0a0806] [--spark-eye:#ff6a13]" />
                      {p.ai}
                    </p>
                  )}
                </div>
                <div className="grid gap-2 md:col-span-4">
                  <p className="text-sm text-ash">
                    {p.kind} · {p.context}
                  </p>
                  <p className="leading-relaxed text-bone/85">{p.summary}</p>
                  <p className="text-[13px] text-ash [font-family:var(--f-jetbrains)]">{p.stack.join(" / ")}</p>
                </div>
                <div className="md:col-span-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-ink-2 [clip-path:inset(0_0_0_0)] md:[clip-path:inset(18%_0_18%_0_round_6px)] md:transition-[clip-path] md:duration-500 md:ease-[cubic-bezier(.22,1,.36,1)] md:group-hover:[clip-path:inset(0_0_0_0_round_6px)]">
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
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Career + stack ───────────── */

function Career() {
  return (
    <section aria-labelledby="pl-parcours-title" className="border-t border-white/10">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2
            id="pl-parcours-title"
            className="text-[clamp(2.2rem,5vw,4.5rem)] font-[800] leading-[0.95] tracking-[-0.03em] [font-stretch:85%]"
          >
            Quatre ans de TypeScript avant l&apos;IA
          </h2>
          <ol className="mt-10 grid gap-6">
            {experience.map((e) => (
              <li key={e.title} className="grid gap-1 border-l-2 border-white/15 pl-5">
                <p className="text-sm text-ash [font-family:var(--f-jetbrains)]">{e.period}</p>
                <h3 className="text-2xl font-bold">{e.title}</h3>
                <p className="text-bone/75">{e.detail}</p>
              </li>
            ))}
          </ol>
        </div>
        <dl className="grid content-start gap-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {Object.entries(stack).map(([group, items]) => (
            <div key={group}>
              <dt className="border-b border-white/15 pb-2 text-sm font-semibold text-flame">{group}</dt>
              <dd className="mt-3 grid gap-1.5 text-lg">
                {items.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ───────────── Close: the last stage as a full field ───────────── */

function Close() {
  return (
    <section id="pl-contact" aria-labelledby="pl-contact-title" className="scroll-mt-32 bg-flame text-ink">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 lg:grid-cols-12 lg:items-end">
        <h2
          id="pl-contact-title"
          className="text-[clamp(3.4rem,10vw,9.5rem)] font-[900] uppercase leading-[0.85] tracking-[-0.03em] [font-stretch:72%] lg:col-span-8"
        >
          Votre idée, en prod.
        </h2>
        <div className="grid gap-5 lg:col-span-4">
          <p className="text-xl leading-snug">
            Décrivez votre projet en quelques lignes. Je réponds personnellement, avec une première estimation.
          </p>
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent("Un projet à vous présenter")}`}
            className="inline-flex min-h-14 w-fit items-center gap-2.5 rounded-md bg-ink px-6 text-lg font-semibold text-bone transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Mail size={20} strokeWidth={2.25} className="icon-draw" aria-hidden />
            Présenter mon projet
          </a>
          <p className="text-[15px] [font-family:var(--f-jetbrains)]">{profile.email}</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-8 pb-28 text-sm text-ash md:px-10">
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

/* ───────────── Assistant: command bar + log drawer ───────────── */

type Chat = ReturnType<typeof useScriptedChat>;

function CommandBar({
  chat,
  open,
  setOpen,
  inputRef,
  onAsk,
}: {
  chat: Chat;
  open: boolean;
  setOpen: (v: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onAsk: (q: string, id?: string) => void;
}) {
  const [value, setValue] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [times] = useState(() => new Map<number, string>());

  const stamp = (id: number) => {
    if (!times.has(id)) {
      times.set(id, new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }
    return times.get(id);
  };

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat.messages, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = /^(INPUT|TEXTAREA)$/.test(t.tagName);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen, inputRef]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || chat.busy) return;
    onAsk(value);
    setValue("");
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-6 sm:pb-5" data-lab-modal-open={open ? "" : undefined}>
      <div className="pointer-events-auto mx-auto max-w-3xl">
        <AnimatePresence>
          {open && (
            <motion.section
              aria-label="Journal de l'assistant"
              initial={reduce ? false : { opacity: 0, y: 24, clipPath: "inset(30% 0 0 0 round 8px)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0 round 8px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, clipPath: "inset(40% 0 0 0 round 8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mb-2 overflow-hidden rounded-lg border border-white/15 bg-[#120e0b]/95 shadow-[0_24px_60px_-12px_rgba(0,0,0,.8)] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <p className="flex items-center gap-2 text-sm text-ash">
                  <Spark size={20} mood={chat.status === "thinking" ? "thinking" : chat.status === "streaming" ? "talking" : "idle"} />
                  Assistant · réponses rédigées à l&apos;avance
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le journal"
                  className="grid size-9 place-items-center rounded-md text-ash hover:bg-white/10 hover:text-bone"
                >
                  <X size={18} strokeWidth={2.25} className="icon-spin" aria-hidden />
                </button>
              </div>
              <div ref={logRef} className="max-h-[min(58vh,560px)] overflow-y-auto px-4 py-4 [scrollbar-width:thin]">
                <ol className="grid gap-5">
                  {chat.messages.map((m) => (
                    <li key={m.id} className="grid grid-cols-[4.75rem_1fr] gap-x-3 text-[15px]">
                      <span className="pt-0.5 text-xs tabular-nums text-[#6d6258] [font-family:var(--f-jetbrains)]">
                        {stamp(m.id)}
                      </span>
                      {m.role === "user" ? (
                        <p className="font-semibold text-flame">
                          <span aria-hidden>› </span>
                          <span className="sr-only">Vous : </span>
                          {m.text}
                        </p>
                      ) : (
                        <div className="grid gap-3">
                          <span className="sr-only">Assistant : </span>
                          <StreamedText message={m} className="leading-relaxed text-bone/90" />
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
                      )}
                    </li>
                  ))}
                  {chat.status === "thinking" && (
                    <li className="grid grid-cols-[4.75rem_1fr] gap-x-3 text-[15px] text-ash">
                      <span />
                      <span className="animate-pulse">L&apos;assistant cherche…</span>
                    </li>
                  )}
                </ol>
                {chat.suggestions.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2 pl-[5.5rem]">
                    {chat.suggestions.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => chat.askIntent(s)}
                        className="min-h-9 rounded-md border border-white/15 px-3 text-sm text-bone/90 transition-colors hover:border-flame hover:text-flame"
                      >
                        {s.question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <ChatAnnouncer messages={chat.messages} />
            </motion.section>
          )}
        </AnimatePresence>

        <form
          onSubmit={submit}
          className="flex items-center gap-2 rounded-lg border border-white/15 bg-[#120e0b]/95 p-1.5 pl-3 shadow-[0_18px_40px_-10px_rgba(0,0,0,.75)] backdrop-blur-xl focus-within:border-flame"
        >
          <Spark size={26} mood={chat.status === "thinking" ? "thinking" : chat.status === "streaming" ? "talking" : "idle"} />
          <label htmlFor="pl-ask" className="sr-only">
            Poser une question à l&apos;assistant
          </label>
          <input
            id="pl-ask"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Délais, méthode, projets… demandez."
            autoComplete="off"
            className="min-h-11 min-w-0 flex-1 bg-transparent text-[16px] text-bone outline-none placeholder:text-[#8a7f75] focus-visible:outline-none"
          />
          <button
            type="submit"
            disabled={!value.trim() || chat.busy}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-flame px-4 font-semibold text-ink transition-opacity disabled:opacity-40"
          >
            <span className="hidden sm:inline">Envoyer</span>
            <CornerDownLeft size={17} strokeWidth={2.25} aria-hidden />
            <span className="sr-only sm:hidden">Envoyer</span>
          </button>
        </form>
      </div>
    </div>
  );
}
