"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUp, Mail } from "lucide-react";
import { bricolage, figtree } from "../fonts";
import { profile } from "../content";
import { type Intent, intentById } from "../chat/knowledge";
import { type ChatMessage, useScriptedChat } from "../chat/useScriptedChat";
import { AnswerBlocks, ChatAnnouncer, StreamedText } from "../chat/Blocks";
import Spark from "../Spark";

/*
 * 02 — Conversation
 * The whole site is a conversation. The first screen holds the live assistant
 * next to Alexandre's portrait; further down, the portfolio is a transcript.
 * Signature: a tapped question morphs into the visitor's message bubble.
 */

const vars = {
  "--b-surface": "#17130f",
  "--b-line": "#2e2620",
  "--b-ink": "#f5efe8",
  "--b-muted": "#b3a89d",
  "--b-accent": "#ff6a13",
  "--b-accent-ink": "#0a0806",
  "--b-radius": "18px",
  "--spark-body": "#ff6a13",
} as React.CSSProperties;

const display = "[font-family:var(--f-bricolage)]";

/** The portfolio told as a recorded exchange, in reading order. */
const TRANSCRIPT = ["offers", "method", "projects", "experience"]
  .map(intentById)
  .filter(Boolean) as Intent[];

export default function Conversation() {
  return (
    <div
      className={`${bricolage.variable} ${figtree.variable} bg-ink text-bone [font-family:var(--f-figtree)] antialiased`}
      style={vars}
    >
      <a
        href="#cv-chat"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-[calc(var(--lab-h)+12px)] focus:z-50 focus:rounded-full focus:bg-flame focus:px-4 focus:py-2 focus:text-ink"
      >
        Aller à l&apos;assistant
      </a>
      <header className="sticky top-[var(--lab-h)] z-40 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-5 md:px-8">
          <a href="#cv-top" className="flex items-center gap-2.5 font-semibold">
            <Spark size={28} label="Logo d'Alexandre Proust" />
            Alexandre Proust
          </a>
          <nav aria-label="Sections" className="flex items-center gap-2 text-[15px]">
            <a href="#cv-transcript" className="hidden rounded-full px-4 py-2 text-[#c9bfb5] hover:bg-white/5 hover:text-bone sm:block">
              Lire le portfolio
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-bone px-4 py-2 font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Écrire à Alexandre
            </a>
          </nav>
        </div>
      </header>

      <main id="cv-top">
        <Hero />
        <Transcript />
        <Close />
      </main>

      <footer className="mx-auto flex max-w-[1360px] flex-wrap justify-between gap-4 px-5 py-10 text-sm text-[#a89e94] md:px-8">
        <p>© {new Date().getFullYear()} Alexandre Proust · Rennes</p>
        <p className="flex gap-6">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
}

/* ───────────── First screen: portrait + live assistant ───────────── */

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="cv-title" className="mx-auto grid max-w-[1360px] gap-6 px-5 pb-16 pt-4 md:px-8 lg:grid-cols-12 lg:gap-8">
      <div className="grid content-start gap-6 lg:col-span-5">
        <motion.div
          initial={reduce ? false : { clipPath: "inset(12% 12% 12% 12% round 28px)", scale: 1.08 }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)", scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[16/11] max-h-[34svh] overflow-hidden sm:aspect-[4/5] sm:max-h-[52svh] rounded-[28px] bg-ink-2 lg:aspect-auto lg:h-[calc(100svh-var(--lab-h)-22rem)] lg:min-h-[260px] lg:w-full"
        >
          <Image
            src={profile.portrait}
            alt="Portrait d'Alexandre Proust"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 40vw"
            className="object-cover object-[50%_30%]"
          />
        </motion.div>
        <div className="grid gap-3">
          <h1 id="cv-title" className={`${display} text-[clamp(2rem,3.1vw,3rem)] font-[700] leading-[1.02] tracking-[-0.02em] [font-variation-settings:'opsz'_96,'wdth'_92]`}>
            Alexandre Proust construit votre produit avec l&apos;IA, de l&apos;idée à la prod.
          </h1>
          <p className="flex flex-wrap gap-x-3 gap-y-1 text-[15px] text-[#c9bfb5]">
            {profile.facts.map((f, i) => (
              <span key={f.label} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden className="size-1 rounded-full bg-flame" />}
                <span>
                  <strong className="font-semibold text-bone">{f.value}</strong> {f.label}
                </span>
              </span>
            ))}
          </p>
        </div>
      </div>
      <LiveChat />
    </section>
  );
}

function LiveChat() {
  const chat = useScriptedChat();
  const reduce = useReducedMotion();
  const [value, setValue] = useState("");
  const [morph, setMorph] = useState<string | null>(null);
  const threadRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = threadRef.current?.parentElement;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [chat.messages, chat.status, reduce]);

  const lastUserId = [...chat.messages].reverse().find((m) => m.role === "user")?.id;

  const pick = (s: Intent) => {
    setMorph(s.id);
    chat.askIntent(s);
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || chat.busy) return;
    setMorph(null);
    chat.ask(value);
    setValue("");
  };
  const mood = chat.status === "thinking" ? "thinking" : chat.status === "streaming" ? "talking" : "idle";

  return (
    <section
      id="cv-chat"
      aria-label="Assistant d'Alexandre"
      className="flex min-h-[72svh] flex-col overflow-hidden rounded-[28px] border border-[#2e2620] bg-[#120f0c] lg:col-span-7 lg:h-[calc(100svh-var(--lab-h)-6rem)] lg:min-h-0"
    >
      <div className="flex items-center gap-3 border-b border-[#2e2620] px-5 py-4">
        <Spark size={40} mood={mood} />
        <div>
          <p className="font-semibold">L&apos;assistant d&apos;Alexandre</p>
          <p className="text-sm text-[#a89e94]">Réponses rédigées à l&apos;avance, en attendant le vrai modèle</p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 [scrollbar-width:thin]">
        <LayoutGroup>
          <ol ref={threadRef} className="grid gap-6">
            {chat.messages.map((m, i) => (
              <li key={m.id}>
                {m.role === "user" ? (
                  <motion.p
                    layoutId={m.id === lastUserId && morph ? `cv-chip-${morph}` : undefined}
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    className="ml-auto w-fit max-w-[85%] rounded-[22px] rounded-br-md bg-bone px-4 py-2.5 text-[17px] font-medium text-ink"
                  >
                    <span className="sr-only">Vous : </span>
                    {m.text}
                  </motion.p>
                ) : (
                  <AssistantTurn message={m} big={i === 0} />
                )}
              </li>
            ))}
            {chat.status === "thinking" && (
              <li aria-hidden className="flex gap-1.5 py-2">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="size-2 rounded-full bg-flame motion-reduce:animate-none"
                    style={{ animation: `cv-typing 1s cubic-bezier(.45,0,.55,1) ${d * 140}ms infinite` }}
                  />
                ))}
              </li>
            )}
          </ol>

          <AnimatePresence mode="popLayout">
            {chat.suggestions.length > 0 && (
              <motion.ul
                key={chat.suggestions.map((s) => s.id).join()}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                aria-label="Questions suggérées"
                className="mt-6 flex flex-wrap justify-end gap-2"
              >
                {chat.suggestions.map((s) => (
                  <li key={s.id}>
                    <motion.button
                      layoutId={`cv-chip-${s.id}`}
                      type="button"
                      onClick={() => pick(s)}
                      className="min-h-11 rounded-[22px] border border-[#4a3d33] px-4 text-[16px] text-bone transition-colors hover:border-flame hover:bg-flame/10"
                    >
                      {s.question}
                    </motion.button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>

      <form onSubmit={submit} className="border-t border-[#2e2620] p-3">
        <div className="flex items-center gap-2 rounded-full bg-[#1d1814] p-1.5 pl-5 focus-within:ring-2 focus-within:ring-flame">
          <label htmlFor="cv-ask" className="sr-only">
            Votre question
          </label>
          <input
            id="cv-ask"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Posez votre question…"
            autoComplete="off"
            className="min-h-11 min-w-0 flex-1 bg-transparent text-[17px] outline-none placeholder:text-[#8f8479] focus-visible:outline-none"
          />
          <button
            type="submit"
            disabled={!value.trim() || chat.busy}
            aria-label="Envoyer la question"
            className="grid size-11 place-items-center rounded-full bg-flame text-ink transition-[transform,opacity] hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-35"
          >
            <ArrowUp size={20} strokeWidth={2.5} aria-hidden />
          </button>
        </div>
      </form>
      <ChatAnnouncer messages={chat.messages} />
    </section>
  );
}

function AssistantTurn({ message, big = false }: { message: ChatMessage; big?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-4">
      <span className="sr-only">Assistant : </span>
      <StreamedText
        message={message}
        className={
          big
            ? `${display} text-[clamp(1.5rem,2.3vw,2.1rem)] font-[600] leading-[1.15] tracking-[-0.02em] [font-variation-settings:'opsz'_48]`
            : "max-w-[60ch] text-[17px] leading-relaxed text-[#e6ddd4]"
        }
      />
      {message.done && message.blocks.length > 0 && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnswerBlocks blocks={message.blocks} />
        </motion.div>
      )}
    </div>
  );
}

/* ───────────── The portfolio as a transcript ───────────── */

function Transcript() {
  return (
    <section id="cv-transcript" aria-labelledby="cv-transcript-title" className="scroll-mt-32 border-t border-[#2e2620]">
      <div className="mx-auto max-w-[1360px] px-5 py-24 md:px-8">
        <h2
          id="cv-transcript-title"
          className={`${display} max-w-[18ch] text-[clamp(2.4rem,5.5vw,5rem)] font-[700] leading-[0.98] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'wdth'_85]`}
        >
          Le portfolio, en quatre questions
        </h2>
        <ol className="mt-16 grid gap-24">
          {TRANSCRIPT.map((intent) => (
            <li key={intent.id} className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="w-fit max-w-full rounded-[22px] rounded-br-md bg-bone px-5 py-3 text-xl font-medium text-ink lg:sticky lg:top-[calc(var(--lab-h)+6rem)]">
                  {intent.question}
                </p>
              </div>
              <div className="grid gap-8 lg:col-span-8">
                <div className="flex gap-4">
                  <Spark size={44} className="mt-1 shrink-0" />
                  <p
                    className={`${display} text-[clamp(1.6rem,2.8vw,2.6rem)] font-[500] leading-[1.12] tracking-[-0.02em] [font-variation-settings:'opsz'_72]`}
                  >
                    {intent.text}
                  </p>
                </div>
                {intent.blocks && (
                  <div className="lg:pl-[3.75rem]">
                    <AnswerBlocks blocks={intent.blocks} />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section aria-labelledby="cv-close-title" className="px-5 pb-10 md:px-8">
      <div className="mx-auto grid max-w-[1360px] gap-8 overflow-hidden rounded-[32px] bg-flame px-6 py-16 text-ink md:px-14 lg:grid-cols-12 lg:items-end">
        <div className="flex gap-5 lg:col-span-8">
          <Spark size={64} className="shrink-0 [--spark-body:#0a0806] [--spark-eye:#ff6a13]" />
          <h2
            id="cv-close-title"
            className={`${display} text-[clamp(2.2rem,5vw,4.6rem)] font-[700] leading-[1] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'wdth'_88]`}
          >
            Le mieux, maintenant, c&apos;est de lui parler de votre projet.
          </h2>
        </div>
        <div className="grid gap-4 lg:col-span-4">
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent("Un projet à vous présenter")}`}
            className="inline-flex min-h-14 w-fit items-center gap-2.5 rounded-full bg-ink px-6 text-lg font-semibold text-bone transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Mail size={20} strokeWidth={2.25} className="icon-draw" aria-hidden />
            Présenter mon projet
          </a>
          <p className="text-[15px]">Il répond personnellement, avec une première estimation.</p>
        </div>
      </div>
    </section>
  );
}
