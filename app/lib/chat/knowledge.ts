import type { Project } from "@/app/lib/content";

/**
 * Scripted knowledge of the test-ui assistant. Answers are written in advance
 * (no model call yet) and the assistant says so when asked.
 */

export type Block =
  | { type: "projects"; ids?: Project["id"][] }
  | { type: "offers" }
  | { type: "method" }
  | { type: "stack" }
  | { type: "experience" }
  | { type: "contact" };

export type Intent = {
  id: string;
  /** How the question reads as a suggestion chip */
  question: string;
  keywords: string[];
  text: string;
  blocks?: Block[];
  followUps?: string[];
};

export const intents: Intent[] = [
  {
    id: "offers",
    question: "Que peux-tu faire pour moi ?",
    keywords: ["faire", "propose", "offre", "service", "aider", "besoin", "prestation", "travailler"],
    text: "Deux choses, surtout. Soit vous partez d'une idée et Alexandre la mène jusqu'à un produit en ligne, avec l'IA dedans. Soit votre produit existe et il y ajoute ce que l'IA fait bien.",
    blocks: [{ type: "offers" }],
    followUps: ["method", "integration", "contact"],
  },
  {
    id: "integration",
    question: "Ajouter de l'IA à mon produit existant ?",
    keywords: ["existant", "ajouter", "integrer", "integration", "chatbot", "assistant", "documents", "donnees", "automatiser", "automatisation", "rag"],
    text: "Oui. On commence par choisir le cas d'usage qui vaut vraiment le coup, avec son coût et ses risques. Ensuite un prototype branché sur vos données, puis l'intégration dans votre stack. Et on mesure : qualité des réponses, coût par requête, temps de réponse.",
    followUps: ["method", "stack", "contact"],
  },
  {
    id: "mvp",
    question: "Combien de temps pour un MVP ?",
    keywords: ["temps", "delai", "combien", "duree", "semaines", "mvp", "prix", "cout", "tarif", "budget"],
    text: "Ça dépend surtout du périmètre, et Alexandre préfère ne pas annoncer un chiffre au hasard. Le plus simple : décrivez votre projet en quelques lignes, il revient vers vous avec une estimation et un découpage en étapes.",
    blocks: [{ type: "contact" }],
    followUps: ["method", "offers"],
  },
  {
    id: "method",
    question: "Comment utilises-tu l'IA ?",
    keywords: ["ia", "intelligence", "methode", "comment", "process", "processus", "agent", "claude", "outil"],
    text: "À chaque étape, mais jamais en pilote automatique. L'IA accélère l'exploration, le prototypage, l'écriture et les tests. Alexandre garde les décisions : la direction, l'architecture et la relecture de ce qui part en production.",
    blocks: [{ type: "method" }],
    followUps: ["site", "projects"],
  },
  {
    id: "projects",
    question: "Montre-moi tes projets",
    keywords: ["projet", "projets", "realisation", "realisations", "portfolio", "exemple", "exemples", "travaux", "fait"],
    text: "Voici cinq projets livrés : une boutique en ligne avec paiement par carte, une application mobile, un site vitrine avec CMS, une landing page et une application codée entièrement avec un agent IA.",
    blocks: [{ type: "projects" }],
    followUps: ["marcellie", "timeit"],
  },
  {
    id: "marcellie",
    question: "Une boutique en ligne avec l'IA ?",
    keywords: ["marcellie", "e-commerce", "ecommerce", "boutique", "sumup", "airtable", "paiement", "vendre", "couture", "panier"],
    text: "Oui : Les Ailes de Marcellie, la boutique d'une créatrice de couture. Alexandre a fait le design, le code et la mise en production avec Claude Code, en relisant chaque ligne. Elle gère ses produits et son stock seule dans Airtable, le paiement par carte passe par SumUp, et chaque commande payée déclenche un e-mail de confirmation.",
    blocks: [{ type: "projects", ids: ["marcellie"] }],
    followUps: ["method", "offers"],
  },
  {
    id: "hyperion",
    question: "Parle-moi d'Hyperion Connect",
    keywords: ["hyperion", "mobile", "react native", "expo", "application mobile", "sport"],
    text: "Une app pour la communauté sportive d'Hyperion : sportifs, coachs, médecins et partenaires s'y retrouvent pour planifier des sessions et partager des informations. Alexandre l'a conçue et développée de bout en bout, avec un backend pensé pour plusieurs types d'utilisateurs. Elle a été livrée mais jamais lancée : l'entreprise cliente a fermé avant la sortie. Le code est public sur GitHub.",
    blocks: [{ type: "projects", ids: ["hyperion"] }],
    followUps: ["stack", "projects"],
  },
  {
    id: "timeit",
    question: "TimeIt, codé avec une IA ?",
    keywords: ["timeit", "antigravity", "minuteur", "ide"],
    text: "Oui, de bout en bout, avec Antigravity, l'IDE agentique de Google. C'était un test grandeur nature : voir jusqu'où un agent peut porter un produit, et où l'œil humain reste indispensable.",
    blocks: [{ type: "projects", ids: ["timeit"] }],
    followUps: ["method", "site"],
  },
  {
    id: "artefacto",
    question: "Et le site Artefacto ?",
    keywords: ["artefacto", "astro", "strapi", "cms", "vitrine"],
    text: "Le site d'Artefacto, refait en Astro avec Strapi pour que l'équipe gère son contenu sans développeur. Design sur Figma, puis intégration.",
    blocks: [{ type: "projects", ids: ["artefacto"] }],
    followUps: ["projects", "experience"],
  },
  {
    id: "mgcoaching",
    question: "La landing MG Coaching ?",
    keywords: ["mg", "coaching", "coach", "landing", "seo"],
    text: "Une landing page en Next.js pour un coach sportif, dessinée sur Figma et optimisée pour s'afficher vite et bien remonter sur Google.",
    blocks: [{ type: "projects", ids: ["mgcoaching"] }],
    followUps: ["projects", "offers"],
  },
  {
    id: "stack",
    question: "Quelle est ta stack ?",
    keywords: ["stack", "techno", "technologies", "langage", "typescript", "react", "next", "node", "nest", "outils"],
    text: "TypeScript du front au back : React, Next.js et React Native côté interface, Node.js avec NestJS ou Express côté serveur. Côté IA, des agents de code au quotidien, et Docker pour livrer.",
    blocks: [{ type: "stack" }],
    followUps: ["experience", "method"],
  },
  {
    id: "experience",
    question: "Quel est ton parcours ?",
    keywords: ["parcours", "experience", "cv", "carriere", "avant", "diplome", "formation", "annees"],
    text: "Quatre ans de développement fullstack : Lioncoach, puis Artefacto, en alternance pendant un mastère. Freelance depuis février 2025.",
    blocks: [{ type: "experience" }],
    followUps: ["stack", "projects"],
  },
  {
    id: "agency",
    question: "Tu travailles avec des agences ?",
    keywords: ["agence", "agences", "studio", "renfort", "sous-traitance", "equipe"],
    text: "Oui, en renfort sur des projets clients : intégration front soignée, motion, ou une fonctionnalité IA à ajouter. Il s'adapte à vos outils et à vos délais.",
    followUps: ["offers", "contact"],
  },
  {
    id: "site",
    question: "Comment ce site a-t-il été fait ?",
    keywords: ["site", "portfolio", "ce site", "refonte", "page"],
    text: "Avec Claude Code. Cinq directions de design ont été construites et comparées avant d'en garder une : c'est la méthode qu'Alexandre applique à vos produits, appliquée à lui-même.",
    followUps: ["method", "who"],
  },
  {
    id: "who",
    question: "Tu es une vraie IA ?",
    keywords: ["vraie", "robot", "humain", "qui es", "tu es", "bot", "gpt", "modele", "reel"],
    text: "Pas encore. Pour l'instant, mes réponses ont été rédigées à l'avance à partir du parcours d'Alexandre. La version finale sera branchée sur un vrai modèle, avec ses garde-fous.",
    followUps: ["site", "contact"],
  },
  {
    id: "contact",
    question: "Comment te contacter ?",
    keywords: ["contact", "contacter", "email", "mail", "appel", "rendez", "joindre", "ecrire", "disponible", "dispo"],
    text: "Le plus direct, c'est un email : décrivez votre projet en quelques lignes, Alexandre vous répond personnellement.",
    blocks: [{ type: "contact" }],
    followUps: ["offers"],
  },
];

export const fallback: Intent = {
  id: "fallback",
  question: "",
  keywords: [],
  text: "Je n'ai pas de réponse rédigée pour cette question : pour l'instant, je ne connais que ce qu'Alexandre a écrit à l'avance. Essayez une des questions ci-dessous, ou écrivez-lui directement.",
  followUps: ["offers", "projects", "contact"],
};

export const greeting =
  "Bonjour, je suis l'assistant d'Alexandre. Posez-moi vos questions sur ses projets, sa méthode ou ce qu'il peut construire pour vous.";

export const starterIds = ["offers", "method", "projects", "mvp"];

export const intentById = (id: string) => intents.find((i) => i.id === id);

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ");

/** Pick the intent whose keywords best match the question. */
export function matchIntent(question: string): Intent {
  const q = ` ${normalize(question)} `;
  let best: Intent | undefined;
  let bestScore = 0;
  for (const intent of intents) {
    if (normalize(intent.question).trim() === q.trim()) return intent;
    let score = 0;
    for (const k of intent.keywords) {
      const key = normalize(k).trim();
      // Whole-word match counts double; multi-word keys weigh more
      if (q.includes(` ${key} `)) score += 2 * key.split(" ").length;
      else if (key.length > 4 && q.includes(key)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return best ?? fallback;
}
