"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import Spark from "@/app/components/Spark";
import { AnswerBlocks, ChatAnnouncer, StreamedText } from "@/app/components/chat/Blocks";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { useChat } from "./ChatProvider";
import { display } from "./styles";

// What the spark says, section by section
const LINES: Record<string, string> = {
  accueil: "Psst. Tapez / ou cliquez-moi : je connais tout son travail.",
  offres: "Deux offres. La seconde, c'est pour les produits qui existent déjà.",
  methode: "Ici l'IA accélère, mais c'est lui qui décide.",
  projets: "TimeIt a été codé avec un agent IA. Demandez-moi comment.",
  parcours: "Quatre ans de TypeScript avant de parler aux IA.",
  contact: "Le plus rapide : le formulaire juste là. Il répond lui-même.",
};

// Colours of the rich answer blocks (components/chat/Blocks.tsx)
const blockVars = {
  "--b-surface": "#16110d",
  "--b-line": "#30271f",
  "--b-ink": "#f5efe8",
  "--b-muted": "#b3a89d",
  "--b-accent": "#ff6a13",
  "--b-accent-ink": "#0a0806",
  "--b-radius": "16px",
} as React.CSSProperties;

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

/**
 * The spark, bottom right. It comments on the section in view, and opens a
 * large conversation in a native modal <dialog>: focus moves in and comes
 * back, Escape closes it, and the page behind is inert.
 */
export default function Companion() {
  const { chat, open, setOpen, ask } = useChat();
  const reduce = useReducedMotion();
  const [value, setValue] = useState("");
  const [section, setSection] = useState("accueil");
  const [hideBubble, setHideBubble] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const pressedBackdrop = useRef(false);
  const mood = chat.status === "thinking" ? "thinking" : chat.status === "streaming" ? "talking" : "idle";

  // The bubble's line follows the section in view
  useEffect(() => {
    const els = Object.keys(LINES)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
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

  // "/" opens the conversation, or jumps back to its field
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented || isTyping(e.target)) return;
      e.preventDefault();
      if (open) inputRef.current?.focus();
      else setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  // React state drives the native modal
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      inputRef.current?.focus();
    } else {
      if (dialog.open) dialog.close();
      // The dialog hands focus back to its opener; a mouse click may have left none, so fall back to the spark
      if (wasOpen.current && (document.activeElement === document.body || !document.activeElement)) {
        toggleRef.current?.focus({ preventScroll: true });
      }
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    const el = threadRef.current;
    if (el && open) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [chat.messages, chat.status, reduce, open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || chat.busy) return;
    ask(value);
    setValue("");
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-labelledby="etincelle-titre"
        aria-describedby="etincelle-note"
        style={blockVars}
        // Escape (or any other native close) syncs back to React
        onClose={() => setOpen(false)}
        // A click on the backdrop lands on the dialog itself; only close when the press started there too
        onPointerDown={(e) => (pressedBackdrop.current = e.target === e.currentTarget)}
        onClick={(e) => {
          if (pressedBackdrop.current && e.target === e.currentTarget) setOpen(false);
        }}
        className="companion m-0 h-dvh max-h-none w-full max-w-none flex-col overflow-hidden border-0 bg-[#120e0b] p-0 text-bone shadow-[0_40px_120px_-20px_rgba(0,0,0,.95)] open:flex sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(880px,calc(100dvh-3rem))] sm:w-[min(760px,calc(100vw-3rem))] sm:rounded-[28px] sm:border-2 sm:border-[#3a3028]"
      >
        <div className="flex items-center gap-4 border-b border-[#2a221c] px-5 py-4 sm:px-7">
          <Spark size={56} mood={mood} />
          <div className="min-w-0">
            <h2 id="etincelle-titre" className={`${display} text-lg font-[700]`}>
              L&apos;étincelle
            </h2>
            <p id="etincelle-note" className="text-sm text-ash">
              Réponses rédigées à l&apos;avance, en attendant le vrai modèle
            </p>
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
                      <div className="companion-rise">
                        <AnswerBlocks blocks={m.blocks} />
                      </div>
                    )}
                  </div>
                </li>
              ),
            )}
            {chat.status === "thinking" && (
              <li className="grid grid-cols-[32px_1fr] gap-x-3 text-[15px] text-ash">
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
          <label htmlFor="etincelle-question" className="sr-only">
            Votre question à l&apos;étincelle
          </label>
          <input
            id="etincelle-question"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Délais, méthode, projets… demandez."
            autoComplete="off"
            enterKeyHint="send"
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
      </dialog>

      <div className="fixed bottom-4 right-4 z-50 flex items-end gap-2 sm:bottom-6 sm:right-6">
        {!open && !hideBubble && (
          // Keyed by section so each new line plays its entrance
          <div
            key={section}
            className="companion-bubble relative mb-3 hidden max-w-[270px] rounded-[18px] rounded-br-sm bg-bone py-3 pl-4 pr-9 text-[15px] font-medium leading-snug text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,.8)] sm:block"
          >
            <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className="text-left">
              {LINES[section]}
            </button>
            <button
              type="button"
              onClick={() => setHideBubble(true)}
              aria-label="Masquer la bulle"
              className="absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-full text-ink/60 hover:bg-ink/10 hover:text-ink"
            >
              <X size={14} strokeWidth={2.5} aria-hidden />
            </button>
          </div>
        )}
        {/* Always mounted (hidden while open) so focus can come back to it */}
        <button
          ref={toggleRef}
          type="button"
          hidden={open}
          aria-haspopup="dialog"
          aria-keyshortcuts="/"
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
