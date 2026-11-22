"use client";

import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { experience, method, offers, profile, projects, stack } from "@/app/lib/content";
import type { Block } from "@/app/lib/chat/knowledge";
import type { ChatMessage } from "@/app/lib/chat/useScriptedChat";

/*
 * Rich answer blocks. Styled only through CSS variables set by each proposal:
 * --b-surface, --b-line, --b-ink, --b-muted, --b-accent, --b-accent-ink, --b-radius
 */

const card =
  "rounded-[var(--b-radius,12px)] border border-[var(--b-line)] bg-[var(--b-surface)] text-[var(--b-ink)]";

export function StreamedText({ message, className }: { message: ChatMessage; className?: string }) {
  const streaming = !message.done && message.role === "assistant";
  return (
    <p className={className}>
      {message.text.slice(0, message.shown)}
      {streaming && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] animate-pulse bg-[var(--b-accent)]"
        />
      )}
    </p>
  );
}

export function ProjectsBlock({ ids }: { ids?: string[] }) {
  const list = ids ? projects.filter((p) => ids.includes(p.id)) : projects;
  const single = list.length === 1;
  return (
    <ul className={single ? "grid gap-3" : "grid gap-3 sm:grid-cols-2"}>
      {list.map((p) => (
        <li key={p.id} className={`${card} group overflow-hidden`}>
          <div className={`relative overflow-hidden ${single ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
            <Image
              src={p.image}
              alt={`Aperçu du projet ${p.title}`}
              fill
              sizes="(max-width: 640px) 100vw, 360px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
          <div className="grid gap-1.5 p-3">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-semibold">{p.title}</h3>
              <span className="text-xs text-[var(--b-muted)]">{p.kind}</span>
            </div>
            {single && <p className="text-sm leading-relaxed text-[var(--b-muted)]">{p.summary}</p>}
            <p className="text-xs text-[var(--b-muted)]">{p.stack.join(" · ")}</p>
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-1 text-sm font-medium text-[var(--b-accent)] underline-offset-4 hover:underline"
              >
                {p.liveLabel ?? "Voir le site"}
                <ArrowUpRight size={15} strokeWidth={2.25} className="icon-nudge" aria-hidden />
                <span className="sr-only">(nouvel onglet)</span>
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function OffersBlock() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {offers.map((o) => (
        <li key={o.id} className={`${card} grid content-start gap-2 p-4`}>
          <p className="text-xs text-[var(--b-muted)]">{o.forWho}</p>
          <h3 className="text-lg font-semibold leading-tight">{o.title}</h3>
          <ul className="grid gap-1 text-sm text-[var(--b-muted)]">
            {o.deliverables.map((d) => (
              <li key={d} className="flex gap-2">
                <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[var(--b-accent)]" />
                {d}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export function MethodBlock() {
  return (
    <ol className="grid gap-2">
      {method.map((s, i) => (
        <li key={s.id} className={`${card} grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 p-3`}>
          <span className="row-span-2 grid size-7 place-items-center rounded-full bg-[var(--b-accent)] text-xs font-bold text-[var(--b-accent-ink)] tabular-nums">
            {i + 1}
          </span>
          <h3 className="font-semibold">{s.name}</h3>
          <p className="text-sm text-[var(--b-muted)]">{s.ai}</p>
        </li>
      ))}
    </ol>
  );
}

export function StackBlock() {
  return (
    <dl className={`${card} grid gap-3 p-4`}>
      {Object.entries(stack).map(([group, items]) => (
        <div key={group} className="grid gap-1">
          <dt className="text-xs text-[var(--b-muted)]">{group}</dt>
          <dd className="flex flex-wrap gap-1.5">
            {items.map((t) => (
              <span key={t} className="rounded-full border border-[var(--b-line)] px-2.5 py-0.5 text-sm">
                {t}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ExperienceBlock() {
  return (
    <ol className={`${card} grid gap-3 p-4`}>
      {experience.map((e) => (
        <li key={e.title} className="grid gap-0.5">
          <p className="text-xs tabular-nums text-[var(--b-muted)]">{e.period}</p>
          <h3 className="font-semibold">{e.title}</h3>
          <p className="text-sm text-[var(--b-muted)]">{e.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function ContactBlock() {
  return (
    <div className={`${card} flex flex-wrap items-center justify-between gap-3 p-4`}>
      <div>
        <p className="font-semibold">Écrire à Alexandre</p>
        <p className="text-sm text-[var(--b-muted)]">{profile.email}</p>
      </div>
      <a
        href={`mailto:${profile.email}?subject=${encodeURIComponent("Un projet à vous présenter")}`}
        className="inline-flex min-h-11 items-center gap-2 rounded-[calc(var(--b-radius,12px)-4px)] bg-[var(--b-accent)] px-4 font-semibold text-[var(--b-accent-ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
      >
        <Mail size={17} strokeWidth={2.25} className="icon-draw" aria-hidden />
        Présenter mon projet
      </a>
    </div>
  );
}

/**
 * Screen readers get each answer once, complete, instead of every streamed character.
 * The visible thread carries no live region.
 */
export function ChatAnnouncer({ messages }: { messages: ChatMessage[] }) {
  const last = messages.findLast((m) => m.role === "assistant" && m.done);
  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {last ? last.text : ""}
    </div>
  );
}

export function AnswerBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="grid gap-3">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "projects":
            return <ProjectsBlock key={i} ids={b.ids} />;
          case "offers":
            return <OffersBlock key={i} />;
          case "method":
            return <MethodBlock key={i} />;
          case "stack":
            return <StackBlock key={i} />;
          case "experience":
            return <ExperienceBlock key={i} />;
          case "contact":
            return <ContactBlock key={i} />;
        }
      })}
    </div>
  );
}
