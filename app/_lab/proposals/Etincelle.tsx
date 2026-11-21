"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUp, ArrowUpRight, Mail, MessageCircle, X } from "lucide-react";
import { hanken, unbounded } from "../fonts";
import { experience, method, offers, profile, projects, stack } from "../content";
import { useScriptedChat } from "../chat/useScriptedChat";
import { AnswerBlocks, ChatAnnouncer, StreamedText } from "../chat/Blocks";
import Spark from "../Spark";
import ParticlePortrait from "../ParticlePortrait";

/*
 * 03 — Étincelle
 * The logo comes alive as a companion that follows the visit, comments on
 * each section and opens the conversation. The portrait is a particle field.
 * Signature: particles part around the cursor; the spark's eyes follow it.
 */

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

const LINES: Record<string, string> = {
  "et-hero": "Psst. Je connais tout son parcours. Une question ?",
  "et-offres": "Deux offres. La seconde, c'est pour les produits qui existent déjà.",
  "et-methode": "Ici l'IA accélère, mais c'est lui qui décide.",
  "et-projets": "TimeIt a été codé avec un agent IA. Demandez-moi comment.",
  "et-parcours": "Quatre ans de TypeScript avant de parler aux IA.",
  "et-contact": "Le plus rapide : un email. Il répond lui-même.",
};

export default function Etincelle() {
  const reduce = useReducedMotion();
  const chat = useScriptedChat();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("et-hero");

  // The companion's line follows the section in view
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

  return (
    <div
      className={`${unbounded.variable} ${hanken.variable} bg-ink text-bone [font-family:var(--f-hanken)] antialiased`}
      style={vars}
    >
      <a
        href="#et-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-[calc(var(--lab-h)+12px)] focus:z-50 focus:rounded-full focus:bg-flame focus:px-4 focus:py-2 focus:text-ink"
      >
        Aller au contenu
      </a>
      <header className="sticky top-[var(--lab-h)] z-40 bg-ink/75 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between gap-4 px-5 md:px-10">
          <a href="#et-main" className={`${display} flex items-center gap-2.5 text-[15px] font-semibold`}>
            <Spark size={32} label="Logo d'Alexandre Proust" />
            <span className="hidden min-[400px]:inline">Alexandre Proust</span>
          </a>
          <nav aria-label="Sections" className="hidden items-center gap-8 text-[15px] text-[#c9bfb5] md:flex">
            <a href="#et-offres" className="hover:text-bone">Offres</a>
            <a href="#et-methode" className="hover:text-bone">Méthode</a>
            <a href="#et-projets" className="hover:text-bone">Projets</a>
          </nav>
          <a
            href="#et-contact"
            className="rounded-full bg-flame px-5 py-2.5 text-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Me contacter
          </a>
        </div>
      </header>

      <main id="et-main">
        {/* Hero */}
        <section id="et-hero" aria-labelledby="et-title" className="relative overflow-hidden">
          <div className="mx-auto grid min-h-[calc(100svh-var(--lab-h)-4.5rem)] max-w-[1400px] grid-cols-1 items-center gap-6 px-5 py-10 md:px-10 lg:grid-cols-2">
            <div className="relative z-10 grid min-w-0 gap-7">
              <motion.h1
                id="et-title"
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`${display} text-[clamp(2.6rem,6.2vw,6rem)] font-[800] leading-[0.92] tracking-[-0.035em]`}
              >
                Alexandre
                <br />
                Proust
              </motion.h1>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-6"
              >
                <p className={`${display} w-fit rounded-full border-2 border-flame px-4 py-1.5 text-[clamp(1rem,1.6vw,1.35rem)] font-[600] text-flame`}>
                  Product builder
                </p>
                <p className="max-w-[30ch] text-[clamp(1.2rem,1.8vw,1.5rem)] leading-snug text-bone/90">
                  {profile.promise}
                </p>
                <p className="text-[15px] text-[#b3a89d]">
                  {profile.facts.map((f) => `${f.value} ${f.label}`).join(" · ")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#et-contact"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-bone px-6 font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Parler de votre projet
                    <ArrowRight size={18} strokeWidth={2.25} className="icon-nudge" aria-hidden />
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white/20 px-6 font-semibold transition-colors hover:border-flame hover:text-flame"
                  >
                    <MessageCircle size={18} strokeWidth={2.25} className="icon-draw" aria-hidden />
                    Questionner l&apos;étincelle
                  </button>
                </div>
              </motion.div>
            </div>
            <ParticlePortrait
              src={profile.portrait}
              alt="Portrait d'Alexandre Proust composé de particules orange"
              className="relative aspect-square w-full max-w-[640px] justify-self-center lg:max-h-[calc(100svh-var(--lab-h)-7rem)]"
              reduceMotion={Boolean(reduce)}
            />
          </div>
        </section>

        {/* Offers */}
        <section id="et-offres" aria-labelledby="et-offres-title" className="scroll-mt-32 px-5 py-24 md:px-10">
          <div className="mx-auto max-w-[1400px]">
            <h2 id="et-offres-title" className={`${display} max-w-[18ch] text-[clamp(2rem,4.4vw,4rem)] font-[800] leading-[0.98] tracking-[-0.03em]`}>
              Ce que je construis pour vous
            </h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {offers.map((o, i) => {
                const filled = i === 0;
                return (
                  <article
                    key={o.id}
                    className={[
                      "group grid content-start gap-6 rounded-[24px] p-8 transition-transform duration-300 hover:-translate-y-0.5 md:p-10",
                      filled ? "bg-flame text-ink" : "border-2 border-[#3a3028] bg-[#120e0b]",
                    ].join(" ")}
                  >
                    <p className={filled ? "font-semibold" : "font-semibold text-flame"}>{o.forWho}</p>
                    <h3 className={`${display} text-[clamp(1.6rem,2.6vw,2.4rem)] font-[700] leading-[1.02] tracking-[-0.02em]`}>{o.title}</h3>
                    <p className={`max-w-[46ch] text-lg leading-relaxed ${filled ? "" : "text-bone/85"}`}>{o.pitch}</p>
                    <ul className="grid gap-2.5 text-[17px]">
                      {o.deliverables.map((d) => (
                        <li key={d} className="flex gap-3">
                          <Spark size={18} track={false} className={`mt-1 shrink-0 ${filled ? "[--spark-body:#0a0806] [--spark-eye:#ff6a13]" : ""}`} />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() =>
                        ask(o.id === "mvp" ? "Combien de temps pour un MVP ?" : "Ajouter de l'IA à mon produit existant ?", o.id === "mvp" ? "mvp" : "integration")
                      }
                      className={[
                        "inline-flex min-h-12 w-fit items-center gap-2 rounded-full px-5 font-semibold transition-transform hover:-translate-y-0.5",
                        filled ? "bg-ink text-bone" : "bg-bone text-ink",
                      ].join(" ")}
                    >
                      Demander à l&apos;étincelle
                      <ArrowRight size={18} strokeWidth={2.25} className="icon-nudge" aria-hidden />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Method */}
        <section id="et-methode" aria-labelledby="et-methode-title" className="scroll-mt-32 px-5 py-24 md:px-10">
          <div className="mx-auto max-w-[1400px]">
            <h2 id="et-methode-title" className={`${display} max-w-[20ch] text-[clamp(2rem,4.4vw,4rem)] font-[800] leading-[0.98] tracking-[-0.03em]`}>
              De l&apos;idée à la prod, l&apos;IA à chaque étape
            </h2>
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {method.map((s) => (
                <li
                  key={s.id}
                  className="group grid content-start gap-5 rounded-[20px] border-2 border-[#30271f] p-6 transition-colors duration-300 hover:border-flame"
                >
                  <h3 className={`${display} text-[clamp(1.6rem,2.4vw,2.2rem)] font-[800] tracking-[-0.02em] transition-colors group-hover:text-flame`}>
                    {s.name}
                  </h3>
                  <p className="text-[17px] leading-relaxed text-bone/85">{s.human}</p>
                  <p className="flex gap-2.5 border-t border-[#30271f] pt-4 text-[15px] leading-relaxed text-[#c9bfb5]">
                    <Spark size={18} track={false} className="mt-0.5 shrink-0" />
                    {s.ai}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Projects */}
        <section id="et-projets" aria-labelledby="et-projets-title" className="scroll-mt-32 px-5 py-24 md:px-10">
          <div className="mx-auto max-w-[1400px]">
            <h2 id="et-projets-title" className={`${display} text-[clamp(2rem,4.4vw,4rem)] font-[800] leading-[0.98] tracking-[-0.03em]`}>
              Ils sont en ligne
            </h2>
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {projects.map((p) => (
                <li key={p.id} className="group grid content-start gap-4">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-ink-2">
                    <Image
                      src={p.image}
                      alt={`Aperçu du projet ${p.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    {p.ai && (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink/85 py-1.5 pl-2 pr-3.5 text-sm font-semibold text-bone backdrop-blur">
                        <Spark size={20} track={false} />
                        {p.ai}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className={`${display} text-2xl font-[700] tracking-[-0.02em]`}>{p.title}</h3>
                    <p className="text-[15px] text-[#b3a89d]">{p.kind} · {p.context}</p>
                  </div>
                  <p className="max-w-[58ch] text-[17px] leading-relaxed text-bone/85">{p.summary}</p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-flame underline-offset-4 hover:underline"
                      >
                        Voir le site <ArrowUpRight size={17} strokeWidth={2.25} className="icon-nudge" aria-hidden />
                        <span className="sr-only">{p.title} (nouvel onglet)</span>
                      </a>
                    )}
                    <p className="text-sm text-[#a89e94]">{p.stack.join(" · ")}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Career */}
        <section id="et-parcours" aria-labelledby="et-parcours-title" className="scroll-mt-32 px-5 py-24 md:px-10">
          <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2">
            <div>
              <h2 id="et-parcours-title" className={`${display} text-[clamp(2rem,4.4vw,4rem)] font-[800] leading-[0.98] tracking-[-0.03em]`}>
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

        {/* Close */}
        <section id="et-contact" aria-labelledby="et-contact-title" className="scroll-mt-32 px-5 pb-16 pt-24 md:px-10">
          <div className="mx-auto grid max-w-[1400px] justify-items-center gap-8 text-center">
            <Spark size={180} />
            <h2 id="et-contact-title" className={`${display} max-w-[16ch] text-[clamp(2.2rem,5.4vw,5rem)] font-[800] leading-[0.95] tracking-[-0.035em]`}>
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
      </main>

      <footer className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-4 px-5 pb-32 pt-8 text-sm text-[#a89e94] md:px-10">
        <p>© {new Date().getFullYear()} Alexandre Proust · Rennes</p>
        <p className="flex gap-6">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-bone">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-bone">LinkedIn</a>
        </p>
      </footer>

      <Companion chat={chat} open={open} setOpen={setOpen} line={LINES[section]} onAsk={ask} />
    </div>
  );
}

/* ───────────── The companion ───────────── */

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
  }, [chat.messages, chat.status, reduce]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || chat.busy) return;
    onAsk(value);
    setValue("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6" data-lab-modal-open={open ? "" : undefined}>
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label="Conversation avec l'étincelle"
            initial={reduce ? false : { opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 20 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            style={{ transformOrigin: "100% 100%" }}
            className="flex h-[min(640px,calc(100svh-var(--lab-h)-9rem))] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[24px] border-2 border-[#3a3028] bg-[#120e0b] shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)]"
          >
            <div className="flex items-center justify-between border-b border-[#2a221c] px-5 py-3.5">
              <p className={`${display} text-[15px] font-[700]`}>L&apos;étincelle</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer la conversation"
                className="grid size-10 place-items-center rounded-full hover:bg-white/10"
              >
                <X size={18} strokeWidth={2.25} className="icon-spin" aria-hidden />
              </button>
            </div>
            <div ref={threadRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-5 [scrollbar-width:thin]">
              <ol className="grid gap-5">
                {chat.messages.map((m) =>
                  m.role === "user" ? (
                    <li key={m.id} className="ml-auto w-fit max-w-[85%] rounded-[20px] rounded-br-md bg-flame px-4 py-2.5 font-medium text-ink">
                      <span className="sr-only">Vous : </span>
                      {m.text}
                    </li>
                  ) : (
                    <li key={m.id} className="grid gap-3">
                      <span className="sr-only">Étincelle : </span>
                      <StreamedText message={m} className="text-[16px] leading-relaxed text-bone/90" />
                      {m.done && m.blocks.length > 0 && <AnswerBlocks blocks={m.blocks} />}
                    </li>
                  ),
                )}
                {chat.status === "thinking" && (
                  <li className="text-[15px] text-[#a89e94]">L&apos;étincelle réfléchit…</li>
                )}
              </ol>
              {chat.suggestions.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {chat.suggestions.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => chat.askIntent(s)}
                      className="min-h-10 rounded-full border-2 border-[#3a3028] px-3.5 text-[15px] transition-colors hover:border-flame"
                    >
                      {s.question}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <form onSubmit={submit} className="flex items-center gap-2 border-t border-[#2a221c] p-3">
              <label htmlFor="et-ask" className="sr-only">Votre question</label>
              <input
                id="et-ask"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Votre question…"
                autoComplete="off"
                className="min-h-11 min-w-0 flex-1 rounded-full bg-[#1d1713] px-4 text-[16px] outline-none placeholder:text-[#8f8479] focus-visible:outline-2 focus-visible:outline-flame"
              />
              <button
                type="submit"
                disabled={!value.trim() || chat.busy}
                aria-label="Envoyer la question"
                className="grid size-11 place-items-center rounded-full bg-flame text-ink disabled:opacity-35"
              >
                <ArrowUp size={20} strokeWidth={2.5} aria-hidden />
              </button>
            </form>
            <ChatAnnouncer messages={chat.messages} />
          </motion.section>
        )}
      </AnimatePresence>

      <div className="flex items-end gap-2">
        <AnimatePresence mode="wait">
          {!open && !hideBubble && (
            <motion.div
              key={line}
              initial={reduce ? false : { opacity: 0, scale: 0.85, x: 12 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ transformOrigin: "100% 100%" }}
              className="relative mb-3 hidden max-w-[260px] rounded-[18px] rounded-br-sm bg-bone py-3 pl-4 pr-9 text-[15px] font-medium leading-snug text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,.8)] sm:block"
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
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fermer la conversation" : "Ouvrir la conversation avec l'étincelle"}
          className="grid size-[76px] place-items-center rounded-full bg-[#120e0b] shadow-[0_12px_30px_-8px_rgba(0,0,0,.9)] ring-2 ring-[#3a3028] transition-transform hover:-translate-y-1 hover:ring-flame active:translate-y-0"
        >
          <Spark size={56} mood={mood} />
        </button>
      </div>
    </div>
  );
}
