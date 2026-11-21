"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Loading = () => <div className="min-h-screen bg-ink" aria-busy="true" />;

export const proposals = [
  {
    id: "pipeline",
    num: "01",
    name: "Pipeline",
    pitch: "Votre idée traverse la page jusqu'à la prod",
    Component: dynamic(() => import("./proposals/Pipeline"), { loading: Loading }),
  },
  {
    id: "conversation",
    num: "02",
    name: "Conversation",
    pitch: "Le site entier est une conversation",
    Component: dynamic(() => import("./proposals/Conversation"), { loading: Loading }),
  },
  {
    id: "etincelle",
    num: "03",
    name: "Étincelle",
    pitch: "Un assistant-personnage et un portrait en particules",
    Component: dynamic(() => import("./proposals/Etincelle"), { loading: Loading, ssr: false }),
  },
  {
    id: "plan",
    num: "04",
    name: "Plan",
    pitch: "Le produit dessiné comme un plan technique",
    Component: dynamic(() => import("./proposals/Plan"), { loading: Loading }),
  },
  {
    id: "index",
    num: "05",
    name: "Index",
    pitch: "Un index complet et une palette de commandes",
    Component: dynamic(() => import("./proposals/Index"), { loading: Loading }),
  },
  {
    id: "fusion",
    num: "1.3",
    name: "Fusion",
    pitch: "Le pipeline de la 01 avec l'étincelle de la 03",
    Component: dynamic(() => import("./proposals/Fusion"), { loading: Loading }),
  },
] as const;

// The direction chosen after the first review opens by default
const DEFAULT_ID = "fusion";

type ProposalId = (typeof proposals)[number]["id"];

const isProposal = (v: string | null): v is ProposalId => proposals.some((p) => p.id === v);

// The chosen proposal lives in the URL (?v=), read as an external store
const NAV_EVENT = "lab:navigate";
const subscribe = (cb: () => void) => {
  window.addEventListener("popstate", cb);
  window.addEventListener(NAV_EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(NAV_EVENT, cb);
  };
};
const readUrl = () => new URLSearchParams(window.location.search).get("v") ?? "";
// During server render and hydration the URL is unknown: show a neutral screen, not proposal 01
const SERVER = "__server__";

export default function LabShell() {
  const fromUrl = useSyncExternalStore(subscribe, readUrl, () => SERVER);
  const current: ProposalId = isProposal(fromUrl) ? fromUrl : DEFAULT_ID;

  const go = useCallback((id: ProposalId) => {
    const url = new URL(window.location.href);
    url.searchParams.set("v", id);
    url.hash = "";
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(NAV_EVENT));
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const index = proposals.findIndex((p) => p.id === current);
  const prev = proposals[(index + proposals.length - 1) % proposals.length];
  const next = proposals[(index + 1) % proposals.length];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (document.querySelector("[data-lab-modal-open]")) return;
      if (e.key === "ArrowLeft") go(prev.id);
      else if (e.key === "ArrowRight") go(next.id);
      else if (/^[1-9]$/.test(e.key) && Number(e.key) <= proposals.length) go(proposals[Number(e.key) - 1].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, prev.id, next.id]);

  const Active = proposals[index].Component;

  return (
    <>
      <nav
        aria-label="Choix de la maquette"
        className="fixed inset-x-0 top-0 z-[100] flex h-[var(--lab-h)] items-center gap-3 border-b border-white/10 bg-[#141414] px-3 font-sans text-[13px] text-neutral-300 sm:px-4"
        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
      >
        <span className="hidden shrink-0 font-medium text-neutral-100 lg:inline">Maquettes test-ui</span>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-1">
          <button
            type="button"
            onClick={() => go(prev.id)}
            aria-label={`Maquette précédente : ${prev.name}`}
            className="grid size-8 shrink-0 place-items-center rounded-md hover:bg-white/10"
          >
            <ChevronLeft size={16} strokeWidth={2.25} aria-hidden />
          </button>
          <ul className="flex min-w-0 items-center gap-1">
            {proposals.map((p) => {
              const active = p.id === current;
              return (
                <li key={p.id} className={active ? "" : "hidden md:block"}>
                  <button
                    type="button"
                    onClick={() => go(p.id)}
                    aria-current={active ? "true" : undefined}
                    title={p.pitch}
                    className={[
                      "flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 transition-colors",
                      active ? "bg-white text-neutral-900" : "hover:bg-white/10",
                    ].join(" ")}
                  >
                    <span className="tabular-nums opacity-60">{p.num}</span>
                    {p.name}
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => go(next.id)}
            aria-label={`Maquette suivante : ${next.name}`}
            className="grid size-8 shrink-0 place-items-center rounded-md hover:bg-white/10"
          >
            <ChevronRight size={16} strokeWidth={2.25} aria-hidden />
          </button>
        </div>
        <span className="hidden shrink-0 text-neutral-500 xl:inline">← → ou 1–{proposals.length}</span>
        <Link href="/ancien" className="shrink-0 rounded-md px-2 py-1 hover:bg-white/10">
          Site actuel
        </Link>
      </nav>
      <div className="pt-[var(--lab-h)]">
        {fromUrl === SERVER ? <Loading /> : <Active key={current} />}
      </div>
    </>
  );
}
