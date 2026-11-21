"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Mail, MessageSquareText, X } from "lucide-react";
import { geologica, martian } from "../fonts";
import { experience, method, offers, profile, projects, stack } from "../content";
import { useScriptedChat } from "../chat/useScriptedChat";
import { AnswerBlocks, ChatAnnouncer, StreamedText } from "../chat/Blocks";
import Spark from "../Spark";

/*
 * 04 — Plan
 * A product builder draws before building. The hero is an exploded technical
 * drawing of a product (interface, AI assistant, API, data) traced in orange
 * ink on a night blueprint. Each layer is annotated and asks the assistant.
 * Signature: the drawing traces itself; hovering a layer lifts it.
 */

const vars = {
  "--b-surface": "#0f0c0a",
  "--b-line": "#3a2a1e",
  "--b-ink": "#f5efe8",
  "--b-muted": "#b3a89d",
  "--b-accent": "#ff6a13",
  "--b-accent-ink": "#0a0806",
  "--b-radius": "2px",
  "--spark-body": "#ff6a13",
} as React.CSSProperties;

const display = "[font-family:var(--f-geologica)] [font-variation-settings:'SHRP'_100]";
const mono = "[font-family:var(--f-martian)]";

/** The blueprint ground: a real drawing sheet, minor and major rules. */
const sheet: React.CSSProperties = {
  backgroundColor: "#0a0806",
  backgroundImage: [
    "linear-gradient(rgba(255,106,19,.075) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255,106,19,.075) 1px, transparent 1px)",
    "linear-gradient(rgba(255,106,19,.035) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255,106,19,.035) 1px, transparent 1px)",
  ].join(","),
  backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
};

type Layer = {
  key: "A" | "B" | "C" | "D";
  name: string;
  tech: string;
  note: string;
  ask: { q: string; id: string };
};

const LAYERS: Layer[] = [
  {
    key: "A",
    name: "Interface",
    tech: "React · Next.js · React Native",
    note: "Ce que vos utilisateurs touchent : web ou mobile, dessiné sur Figma puis codé en TypeScript.",
    ask: { q: "Quelle est ta stack ?", id: "stack" },
  },
  {
    key: "B",
    name: "Assistant IA",
    tech: "Modèle de langage · vos documents",
    note: "La couche qui comprend, résume et répond, branchée sur vos données avec des garde-fous.",
    ask: { q: "Ajouter de l'IA à mon produit existant ?", id: "integration" },
  },
  {
    key: "C",
    name: "API",
    tech: "Node.js · NestJS · Express",
    note: "Les règles métier, l'authentification et les échanges entre toutes les couches.",
    ask: { q: "Parle-moi d'Hyperion Connect", id: "hyperion" },
  },
  {
    key: "D",
    name: "Données",
    tech: "MySQL · Strapi",
    note: "Ce qui doit durer : comptes, contenus, historiques. Un CMS quand votre équipe édite seule.",
    ask: { q: "Et le site Artefacto ?", id: "artefacto" },
  },
];

export default function Plan() {
  const chat = useScriptedChat();
  const [open, setOpen] = useState(false);
  const ask = (q: string, id?: string) => {
    setOpen(true);
    chat.ask(q, id);
  };

  return (
    <div
      className={`${geologica.variable} ${martian.variable} text-bone [font-family:var(--f-geologica)] antialiased`}
      style={{ ...vars, ...sheet }}
    >
      <a
        href="#pn-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-[calc(var(--lab-h)+12px)] focus:z-50 focus:bg-flame focus:px-4 focus:py-2 focus:text-ink"
      >
        Aller au contenu
      </a>
      <header className="sticky top-[var(--lab-h)] z-40 border-b border-flame/30 bg-ink/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10">
          <a href="#pn-main" className="flex items-center gap-3">
            <Spark size={28} label="Logo d'Alexandre Proust" />
            <span className={`${display} text-[17px] font-[600] tracking-[-0.01em]`}>Alexandre Proust</span>
            <span className={`${mono} hidden text-[11px] text-flame/80 sm:inline`}>PLAN N°1 · RÉV. TEST-UI</span>
          </a>
          <nav aria-label="Sections" className={`${mono} hidden items-center gap-6 text-[12px] uppercase tracking-[0.06em] text-[#c9bfb5] md:flex`}>
            <a href="#pn-offres" className="hover:text-flame">Offres</a>
            <a href="#pn-methode" className="hover:text-flame">Méthode</a>
            <a href="#pn-projets" className="hover:text-flame">Projets</a>
            <a href="#pn-contact" className="border border-flame px-3 py-2 text-flame hover:bg-flame hover:text-ink">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="pn-main">
        <Hero onAsk={ask} />
        <Offers />
        <Method />
        <Projects />
        <Career />
        <TitleBlock />
      </main>

      <footer className={`${mono} mx-auto flex max-w-[1440px] flex-wrap justify-between gap-4 px-5 pb-28 pt-6 text-[12px] text-[#a89e94] md:px-10`}>
        <p>© {new Date().getFullYear()} Alexandre Proust · Rennes</p>
        <p className="flex gap-6">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-flame">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-flame">LinkedIn</a>
        </p>
      </footer>

      <Notes chat={chat} open={open} setOpen={setOpen} onAsk={ask} />
    </div>
  );
}

/* ───────────── Corner marks: the drawing frame vocabulary ───────────── */

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {(["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "left-0 bottom-0 border-l-2 border-b-2", "right-0 bottom-0 border-r-2 border-b-2"] as const).map((c) => (
        <span key={c} aria-hidden className={`pointer-events-none absolute size-4 border-flame ${c}`} />
      ))}
      {children}
    </div>
  );
}

function Dimension({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 text-flame ${className}`}>
      <span className="h-3 w-px bg-flame" />
      <span className="h-px flex-1 bg-flame/70" />
      <span className={`${mono} shrink-0 text-[11px] uppercase tracking-[0.08em]`}>{label}</span>
      <span className="h-px flex-1 bg-flame/70" />
      <span className="h-3 w-px bg-flame" />
    </div>
  );
}

/* ───────────── Hero: the exploded drawing ───────────── */

// Isometric plate: maps (u, v) in [0,1]² onto a rhombus centred on (cx, cy)
const W = 190;
const H = 95;
const iso = (cx: number, cy: number) => (u: number, v: number) => [cx + (u - v) * W, cy + (u + v - 1) * H] as const;
const poly = (f: ReturnType<typeof iso>, u0: number, v0: number, u1: number, v1: number) =>
  [f(u0, v0), f(u1, v0), f(u1, v1), f(u0, v1)].map((p) => p.join(",")).join(" ");

const PLATE_Y = [100, 215, 330, 445];
const CX = 250;

function Drawing({ active, setActive }: { active: Layer["key"] | null; setActive: (k: Layer["key"] | null) => void }) {
  const reduce = useReducedMotion();
  const draw = (delay: number) =>
    reduce
      ? {}
      : ({ strokeDasharray: 1, strokeDashoffset: 1, animation: `pn-draw 1.3s cubic-bezier(.65,0,.35,1) ${delay}s forwards` } as React.CSSProperties);

  return (
    <svg viewBox="0 0 520 560" className="h-auto w-full" aria-hidden>
      <style>{`@keyframes pn-draw { to { stroke-dashoffset: 0; } }`}</style>
      {/* Vertical connectors between plates */}
      {[-1, 1].map((side) => (
        <line
          key={side}
          x1={CX + side * W}
          y1={PLATE_Y[0]}
          x2={CX + side * W}
          y2={PLATE_Y[3]}
          pathLength={1}
          stroke="#ff6a13"
          strokeOpacity=".45"
          strokeDasharray="4 6"
          strokeWidth="1"
        />
      ))}
      {/* Dimension on the left: the whole product */}
      <g style={draw(0.2)} stroke="#ff6a13" strokeWidth="1">
        <line x1="22" y1={PLATE_Y[0] - H} x2="22" y2={PLATE_Y[3] + H} pathLength={1} />
        <line x1="14" y1={PLATE_Y[0] - H} x2="30" y2={PLATE_Y[0] - H} pathLength={1} />
        <line x1="14" y1={PLATE_Y[3] + H} x2="30" y2={PLATE_Y[3] + H} pathLength={1} />
      </g>
      <text x="12" y={(PLATE_Y[0] + PLATE_Y[3]) / 2} fill="#ff6a13" fontSize="10" letterSpacing="1.5" transform={`rotate(-90 12 ${(PLATE_Y[0] + PLATE_Y[3]) / 2})`} textAnchor="middle" className="[font-family:var(--f-martian)]">
        DE L&apos;IDÉE À LA PROD
      </text>

      {LAYERS.map((layer, i) => {
        const cy = PLATE_Y[i];
        const f = iso(CX, cy);
        const on = active === layer.key;
        const lift = on ? -10 : 0;
        const d = 0.25 + i * 0.28;
        return (
          <g
            key={layer.key}
            style={{ transform: `translateY(${lift}px)`, transition: "transform 400ms cubic-bezier(.22,1,.36,1)" }}
            onPointerEnter={() => setActive(layer.key)}
            onPointerLeave={() => setActive(null)}
          >
            <polygon
              points={poly(f, 0, 0, 1, 1)}
              fill={on ? "rgba(255,106,19,.14)" : "rgba(10,8,6,.85)"}
              stroke="#ff6a13"
              strokeWidth={on ? 2.25 : 1.6}
              pathLength={1}
              style={{ ...draw(d), transition: "fill 300ms, stroke-width 300ms" }}
            />
            <g stroke="#ff6a13" strokeWidth="1.25" fill="none" strokeOpacity={on ? 1 : 0.85} style={draw(d + 0.35)}>
              {layer.key === "A" && (
                <>
                  <polygon points={poly(f, 0.06, 0.06, 0.94, 0.16)} pathLength={1} />
                  <polygon points={poly(f, 0.06, 0.22, 0.58, 0.5)} pathLength={1} />
                  <polygon points={poly(f, 0.06, 0.56, 0.3, 0.64)} pathLength={1} fill="rgba(255,106,19,.35)" />
                  <polygon points={poly(f, 0.06, 0.72, 0.3, 0.94)} pathLength={1} />
                  <polygon points={poly(f, 0.36, 0.72, 0.62, 0.94)} pathLength={1} />
                  <polygon points={poly(f, 0.68, 0.72, 0.94, 0.94)} pathLength={1} />
                  <polygon points={poly(f, 0.66, 0.22, 0.94, 0.62)} pathLength={1} />
                </>
              )}
              {layer.key === "B" && (
                <>
                  {[0.42, 0.3, 0.18].map((r) => (
                    <ellipse key={r} cx={CX} cy={cy} rx={W * r * 1.35} ry={H * r * 1.35} pathLength={1} />
                  ))}
                  {[0, 1, 2, 3, 4, 5].map((k) => {
                    const a = (k / 6) * Math.PI * 2;
                    return <circle key={k} cx={CX + Math.cos(a) * W * 0.57} cy={cy + Math.sin(a) * H * 0.57} r="3" fill="#ff6a13" pathLength={1} />;
                  })}
                </>
              )}
              {layer.key === "C" && (
                <>
                  {[
                    [0.2, 0.25],
                    [0.5, 0.2],
                    [0.8, 0.3],
                    [0.3, 0.7],
                    [0.7, 0.75],
                    [0.5, 0.5],
                  ].map(([u, v], k, all) => {
                    const [x, y] = f(u, v);
                    const [hx, hy] = f(all[5][0], all[5][1]);
                    return (
                      <g key={k}>
                        {k < 5 && <line x1={x} y1={y} x2={hx} y2={hy} pathLength={1} />}
                        <polygon points={poly(f, u - 0.05, v - 0.05, u + 0.05, v + 0.05)} fill="#0a0806" pathLength={1} />
                      </g>
                    );
                  })}
                </>
              )}
              {layer.key === "D" && (
                <>
                  {[0.25, 0.5, 0.75].map((u) => {
                    const [x, y] = f(u, 0.5);
                    return (
                      <g key={u}>
                        <ellipse cx={x} cy={y - 18} rx="22" ry="8" pathLength={1} />
                        <path d={`M${x - 22} ${y - 18} v24 a22 8 0 0 0 44 0 v-24`} pathLength={1} />
                        <path d={`M${x - 22} ${y - 6} a22 8 0 0 0 44 0`} pathLength={1} />
                      </g>
                    );
                  })}
                </>
              )}
            </g>
            {/* Pin and leader to the annotation column */}
            <g style={draw(d + 0.6)}>
              <line x1={CX + W * 0.62} y1={cy - H * 0.38} x2="470" y2={cy - H * 0.38} stroke="#ff6a13" strokeWidth="1" pathLength={1} />
            </g>
            <circle cx="482" cy={cy - H * 0.38} r="12" fill={on ? "#ff6a13" : "#0a0806"} stroke="#ff6a13" strokeWidth="1.5" />
            <text x="482" y={cy - H * 0.38 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={on ? "#0a0806" : "#ff6a13"} className="[font-family:var(--f-martian)]">
              {layer.key}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Hero({ onAsk }: { onAsk: (q: string, id?: string) => void }) {
  const [active, setActive] = useState<Layer["key"] | null>(null);
  const current = LAYERS.find((l) => l.key === active);

  return (
    <section aria-labelledby="pn-title" className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="grid content-center gap-7 lg:col-span-5">
          <h1 id="pn-title" className={`${display} text-[clamp(2.4rem,4.8vw,4.6rem)] font-[700] leading-[0.98] tracking-[-0.03em]`}>
            Alexandre Proust dessine, construit et livre votre produit.
          </h1>
          <p className="max-w-[40ch] text-xl leading-snug text-bone/85">
            Product builder : de l&apos;idée à la mise en production, avec l&apos;IA à chaque étape et quatre ans de TypeScript derrière.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#pn-contact"
              className="inline-flex min-h-12 items-center gap-2 bg-flame px-5 font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Faire dessiner mon projet
              <ArrowRight size={18} strokeWidth={2.25} className="icon-nudge" aria-hidden />
            </a>
            <a href="#pn-projets" className="inline-flex min-h-12 items-center gap-2 border border-bone/30 px-5 font-semibold hover:border-bone">
              Voir les réalisations
            </a>
          </div>
          <dl className={`${mono} grid max-w-md grid-cols-3 border border-flame/40 text-[11px]`}>
            {[
              ["Auteur", "A. Proust"],
              ["Lieu", "Rennes"],
              ["Statut", "Disponible"],
            ].map(([k, v]) => (
              <div key={k} className="border-r border-flame/40 p-2.5 last:border-r-0">
                <dt className="uppercase tracking-[0.08em] text-flame/80">{k}</dt>
                <dd className="mt-1 text-[12px] text-bone">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Frame className="p-4 sm:p-6 lg:col-span-7">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_15rem]">
            <Drawing active={active} setActive={setActive} />
            <ul aria-label="Les couches d'un produit" className="grid gap-2">
              {LAYERS.map((l) => (
                <li key={l.key}>
                  <button
                    type="button"
                    onPointerEnter={() => setActive(l.key)}
                    onPointerLeave={() => setActive(null)}
                    onFocus={() => setActive(l.key)}
                    onBlur={() => setActive(null)}
                    onClick={() => onAsk(l.ask.q, l.ask.id)}
                    className="group grid w-full grid-cols-[1.75rem_1fr] gap-x-3 border border-transparent p-2 text-left transition-colors hover:border-flame/50 focus-visible:border-flame"
                  >
                    <span className={`${mono} grid size-7 place-items-center rounded-full border border-flame text-[11px] font-bold text-flame transition-colors group-hover:bg-flame group-hover:text-ink`}>
                      {l.key}
                    </span>
                    <span className="font-semibold">{l.name}</span>
                    <span className={`${mono} col-start-2 text-[10.5px] leading-relaxed text-[#b3a89d]`}>{l.tech}</span>
                  </button>
                </li>
              ))}
              <li aria-live="polite" className="min-h-[5.5rem] border-t border-flame/30 pt-3 text-[15px] leading-snug text-bone/85">
                {current ? (
                  <>
                    {current.note}{" "}
                    <span className="text-flame">Cliquez pour en parler à l&apos;assistant.</span>
                  </>
                ) : (
                  <span className="text-[#a89e94]">Survolez une couche du plan pour la détailler.</span>
                )}
              </li>
            </ul>
          </div>
        </Frame>
      </div>
    </section>
  );
}

/* ───────────── Offers: two framed plans ───────────── */

function Offers() {
  return (
    <section id="pn-offres" aria-labelledby="pn-offres-title" className="scroll-mt-32 border-t border-flame/30">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <h2 id="pn-offres-title" className={`${display} text-[clamp(2.2rem,4.6vw,4.2rem)] font-[700] leading-[0.98] tracking-[-0.03em]`}>
          Deux plans de travail
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {offers.map((o) => (
            <Frame key={o.id} className="group bg-ink/70 p-7 transition-colors hover:bg-[#140f0b] md:p-9">
              <Dimension label={o.id === "mvp" ? "idée → produit en ligne" : "votre produit + IA"} className="mb-7" />
              <p className={`${mono} text-[11px] uppercase tracking-[0.08em] text-flame`}>{o.forWho}</p>
              <h3 className={`${display} mt-3 text-[clamp(1.7rem,2.6vw,2.4rem)] font-[700] leading-tight tracking-[-0.02em]`}>{o.title}</h3>
              <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-bone/85">{o.pitch}</p>
              <ol className="mt-6 grid gap-0 border-t border-flame/30">
                {o.deliverables.map((d, i) => (
                  <li key={d} className="grid grid-cols-[2.5rem_1fr] border-b border-flame/30 py-3 text-[17px]">
                    <span className={`${mono} text-[11px] text-flame`}>{String.fromCharCode(97 + i)}.</span>
                    {d}
                  </li>
                ))}
              </ol>
            </Frame>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Method: a dimension chain drawn when it enters ───────────── */

function Method() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const shown = reduce || inView;

  return (
    <section id="pn-methode" aria-labelledby="pn-methode-title" className="scroll-mt-32 border-t border-flame/30">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 id="pn-methode-title" className={`${display} text-[clamp(2.2rem,4.6vw,4.2rem)] font-[700] leading-[0.98] tracking-[-0.03em] lg:col-span-7`}>
            La coupe : qui fait quoi, à chaque étape
          </h2>
          <p className="max-w-[44ch] text-lg leading-relaxed text-bone/80 lg:col-span-5 lg:self-end">
            Les décisions restent humaines. L&apos;IA élargit ce que l&apos;on peut explorer et vérifier dans le même temps.
          </p>
        </div>
        <ol ref={ref} className="mt-14 grid md:grid-cols-4">
          {method.map((s, i) => (
            <li key={s.id} className="relative grid content-start gap-5 border-flame/40 pb-8 pr-6 pt-10 md:border-l md:pl-6 [&:last-child]:md:border-r">
              {/* Dimension segment */}
              <span aria-hidden className="absolute left-0 right-0 top-3 hidden h-px origin-left bg-flame md:block" style={{ transform: `scaleX(${shown ? 1 : 0})`, transition: reduce ? "none" : `transform 700ms cubic-bezier(.65,0,.35,1) ${i * 220}ms` }} />
              <span aria-hidden className={`${mono} absolute left-6 top-0 hidden -translate-y-1/2 bg-ink px-2 text-[11px] text-flame md:block`} style={{ opacity: shown ? 1 : 0, transition: reduce ? "none" : `opacity 400ms ${i * 220 + 500}ms` }}>
                {s.name.toUpperCase()}
              </span>
              <h3 className={`${display} text-3xl font-[700] tracking-[-0.02em]`}>{s.name}</h3>
              <div>
                <p className={`${mono} text-[11px] uppercase tracking-[0.08em] text-[#b3a89d]`}>Humain</p>
                <p className="mt-1.5 leading-relaxed text-bone/85">{s.human}</p>
              </div>
              <div>
                <p className={`${mono} text-[11px] uppercase tracking-[0.08em] text-flame`}>IA</p>
                <p className="mt-1.5 leading-relaxed text-bone/85">{s.ai}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────── Projects: annotated plates ───────────── */

function Projects() {
  return (
    <section id="pn-projets" aria-labelledby="pn-projets-title" className="scroll-mt-32 border-t border-flame/30">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <h2 id="pn-projets-title" className={`${display} text-[clamp(2.2rem,4.6vw,4.2rem)] font-[700] leading-[0.98] tracking-[-0.03em]`}>
          Réalisations, relevées sur site
        </h2>
        <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((p, i) => (
            <li key={p.id} className="group grid content-start gap-5">
              <div className={`${mono} flex items-center justify-between text-[11px] text-flame`}>
                <span>FICHE {String(i + 1).padStart(2, "0")}</span>
                <span>{p.kind.toUpperCase()}</span>
              </div>
              <Frame className="p-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-2">
                  <Image
                    src={p.image}
                    alt={`Aperçu du projet ${p.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale-[35%] transition-[transform,filter] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </div>
              </Frame>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className={`${display} text-[1.9rem] font-[700] tracking-[-0.02em]`}>{p.title}</h3>
                {p.ai && <span className={`${mono} border border-flame px-2 py-1 text-[11px] text-flame`}>{p.ai.toUpperCase()}</span>}
              </div>
              <p className="max-w-[56ch] text-[17px] leading-relaxed text-bone/85">{p.summary}</p>
              <dl className={`${mono} grid grid-cols-[7rem_1fr] gap-y-1.5 border-t border-flame/30 pt-4 text-[12px]`}>
                <dt className="text-[#a89e94]">RÔLE</dt>
                <dd>{p.role}</dd>
                <dt className="text-[#a89e94]">STACK</dt>
                <dd>{p.stack.join(", ")}</dd>
                <dt className="text-[#a89e94]">CONTEXTE</dt>
                <dd>{p.context}</dd>
              </dl>
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-fit items-center gap-1.5 font-semibold text-flame underline-offset-4 hover:underline"
                >
                  Voir le site en ligne <ArrowUpRight size={17} strokeWidth={2.25} className="icon-nudge" aria-hidden />
                  <span className="sr-only">{p.title} (nouvel onglet)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Career() {
  return (
    <section aria-labelledby="pn-parcours-title" className="border-t border-flame/30">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 lg:grid-cols-12">
        <h2 id="pn-parcours-title" className={`${display} text-[clamp(2.2rem,4.6vw,4.2rem)] font-[700] leading-[0.98] tracking-[-0.03em] lg:col-span-4`}>
          Fondations
        </h2>
        <div className="grid gap-10 lg:col-span-8">
          <ol className="grid border-t border-flame/30">
            {experience.map((e) => (
              <li key={e.title} className="grid gap-2 border-b border-flame/30 py-5 sm:grid-cols-[12rem_10rem_1fr] sm:gap-6">
                <p className={`${mono} text-[12px] text-flame`}>{e.period}</p>
                <h3 className="text-xl font-[650]">{e.title}</h3>
                <p className="text-bone/80">{e.detail}</p>
              </li>
            ))}
          </ol>
          <dl className="grid gap-6 sm:grid-cols-2">
            {Object.entries(stack).map(([g, items]) => (
              <div key={g}>
                <dt className={`${mono} text-[11px] uppercase tracking-[0.08em] text-flame`}>{g}</dt>
                <dd className="mt-2 text-lg leading-relaxed">{items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Close: the title block of the drawing ───────────── */

function TitleBlock() {
  return (
    <section id="pn-contact" aria-labelledby="pn-contact-title" className="scroll-mt-32 border-t border-flame/30">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <h2 id="pn-contact-title" className={`${display} max-w-[18ch] text-[clamp(2.4rem,5.4vw,5rem)] font-[700] leading-[0.95] tracking-[-0.035em]`}>
          Le prochain plan porte votre nom.
        </h2>
        <div className="mt-12 grid border-2 border-flame md:grid-cols-12">
          <dl className={`${mono} grid grid-cols-2 text-[12px] md:col-span-7`}>
            {[
              ["Projet", "Le vôtre"],
              ["Maître d'œuvre", "Alexandre Proust"],
              ["Délai", "Défini ensemble"],
              ["Échelle", "Du MVP au produit"],
              ["Lieu", "Rennes et à distance"],
              ["Réponse", "Personnelle"],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-r border-flame/60 p-4">
                <dt className="uppercase tracking-[0.08em] text-flame">{k}</dt>
                <dd className={`${display} mt-2 text-xl font-[600] text-bone`}>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="grid content-between gap-6 bg-flame p-6 text-ink md:col-span-5 md:p-8">
            <p className="text-xl font-[600] leading-snug">
              Décrivez votre projet en quelques lignes : je reviens vers vous avec un premier découpage et une estimation.
            </p>
            <div className="grid gap-3">
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent("Un projet à vous présenter")}`}
                className="inline-flex min-h-14 w-fit items-center gap-2.5 bg-ink px-6 text-lg font-semibold text-bone transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Mail size={20} strokeWidth={2.25} className="icon-draw" aria-hidden />
                Présenter mon projet
              </a>
              <p className={`${mono} text-[12px]`}>{profile.email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Assistant: the margin notebook ───────────── */

type Chat = ReturnType<typeof useScriptedChat>;

function Notes({ chat, open, setOpen, onAsk }: { chat: Chat; open: boolean; setOpen: (v: boolean) => void; onAsk: (q: string, id?: string) => void }) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dockRef = useRef<HTMLButtonElement>(null);
  const mood = chat.status === "thinking" ? "thinking" : chat.status === "streaming" ? "talking" : "idle";

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [chat.messages, chat.status, reduce]);
  useEffect(() => {
    if (!open) return;
    // Focus goes into the drawer, and back to whatever opened it on close
    const opener = document.activeElement as HTMLElement | null;
    const dock = dockRef.current;
    requestAnimationFrame(() => inputRef.current?.focus());
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      // The dock button is shown again (hidden removed) in the commit that runs this cleanup
      const target = opener && opener !== document.body && document.contains(opener) ? opener : dock;
      target?.focus({ preventScroll: true });
    };
  }, [open, setOpen]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || chat.busy) return;
    onAsk(value);
    setValue("");
  };

  return (
    <>
      {/* Always mounted (hidden while the drawer is open) so focus can come back to it */}
      <button
        ref={dockRef}
        type="button"
        hidden={open}
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex min-h-14 items-center gap-3 border-2 border-flame bg-ink py-2 pl-3 pr-5 font-semibold shadow-[0_14px_40px_-12px_rgba(0,0,0,.9)] transition-transform hover:-translate-y-0.5"
      >
        <Spark size={34} mood={mood} />
        Une question sur le plan ?
      </button>
      <AnimatePresence>
        {open && (
          <motion.aside
            aria-label="Notes de l'assistant"
            data-lab-modal-open=""
            initial={reduce ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 right-0 top-[var(--lab-h)] z-50 flex w-[min(460px,100vw)] flex-col border-l-2 border-flame bg-[#0d0a08] shadow-[-30px_0_60px_-20px_rgba(0,0,0,.9)]"
          >
            <div className="flex items-center justify-between border-b border-flame/40 px-5 py-3">
              <div className="flex items-center gap-3">
                <Spark size={36} mood={mood} />
                <div>
                  <p className="font-semibold">Notes de l&apos;assistant</p>
                  <p className={`${mono} text-[10.5px] text-[#a89e94]`}>RÉPONSES RÉDIGÉES À L&apos;AVANCE</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fermer les notes" className="grid size-10 place-items-center hover:bg-white/10">
                <X size={19} strokeWidth={2.25} className="icon-spin" aria-hidden />
              </button>
            </div>
            <div ref={threadRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-5" style={sheet}>
              <ol className="grid gap-5">
                {chat.messages.map((m, i) =>
                  m.role === "user" ? (
                    <li key={m.id} className={`${mono} border-l-2 border-flame pl-3 text-[12.5px] leading-relaxed text-flame`}>
                      <span className="sr-only">Vous : </span>Q. {m.text}
                    </li>
                  ) : (
                    <li key={m.id}>
                      <Frame className="grid gap-3 bg-ink/90 p-4">
                        <p className={`${mono} text-[10.5px] text-[#a89e94]`}>NOTE {String(i + 1).padStart(2, "0")}</p>
                        <span className="sr-only">Assistant : </span>
                        <StreamedText message={m} className="leading-relaxed text-bone/90" />
                        {m.done && m.blocks.length > 0 && <AnswerBlocks blocks={m.blocks} />}
                      </Frame>
                    </li>
                  ),
                )}
                {chat.status === "thinking" && <li className={`${mono} text-[12px] text-[#a89e94]`}>Rédaction de la note…</li>}
              </ol>
              {chat.suggestions.length > 0 && (
                <div className="mt-5 grid gap-2">
                  {chat.suggestions.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => chat.askIntent(s)}
                      className="flex min-h-10 items-center justify-between gap-3 border border-flame/40 bg-ink/80 px-3 text-left text-[15px] transition-colors hover:border-flame"
                    >
                      {s.question}
                      <MessageSquareText size={16} strokeWidth={2.25} className="icon-draw shrink-0 text-flame" aria-hidden />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <form onSubmit={submit} className="flex gap-2 border-t border-flame/40 p-3">
              <label htmlFor="pn-ask" className="sr-only">Votre question</label>
              <input
                id="pn-ask"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Annoter le plan d'une question…"
                autoComplete="off"
                className="min-h-11 min-w-0 flex-1 border border-flame/40 bg-ink px-3 text-[16px] outline-none placeholder:text-[#8f8479] focus-visible:border-flame focus-visible:outline-none"
              />
              <button type="submit" disabled={!value.trim() || chat.busy} className="min-h-11 bg-flame px-4 font-semibold text-ink disabled:opacity-40">
                Envoyer
              </button>
            </form>
            <ChatAnnouncer messages={chat.messages} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
