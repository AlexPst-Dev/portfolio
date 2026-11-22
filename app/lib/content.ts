/**
 * Content of the home page and of the spark's answers.
 * Every fact comes from the current site (projects, experiences) or PRODUCT.md.
 * No metrics, testimonials or client logos: none exist yet.
 */

export const profile = {
  name: "Alexandre Proust",
  firstName: "Alexandre",
  role: "Product builder",
  // The one-line promise, used as the main statement
  promise: "J'emmène votre idée jusqu'en production, avec l'IA à chaque étape.",
  short:
    "Développeur fullstack TypeScript devenu product builder : je cadre, je conçois, je développe et je déploie des produits web qui embarquent de l'IA.",
  facts: [
    { value: "4 ans", label: "de TypeScript en production" },
    { value: "Rennes", label: "et à distance" },
    { value: "Freelance", label: "depuis février 2025" },
  ],
  availability: "Disponible pour de nouvelles missions",
  email: "alexandre-proust.dev@proton.me",
  github: "https://github.com/AlexPst-Dev",
  linkedin: "https://www.linkedin.com/in/alexandre-proust-48437919b/",
};

export type Offer = {
  id: "mvp" | "integration";
  title: string;
  forWho: string;
  pitch: string;
  deliverables: string[];
};

export const offers: Offer[] = [
  {
    id: "mvp",
    title: "Un MVP propulsé par l'IA",
    forWho: "Fondateurs et startups",
    pitch:
      "Vous avez une idée, je la transforme en produit en ligne : cadrage, design, développement, déploiement. L'IA fait partie du produit et de la façon de le construire.",
    deliverables: [
      "Cadrage des fonctionnalités et du périmètre",
      "Maquettes et prototype cliquable",
      "Application web ou mobile en TypeScript",
      "Mise en production et passation",
    ],
  },
  {
    id: "integration",
    title: "De l'IA dans votre produit",
    forWho: "PME, équipes produit et agences",
    pitch:
      "Votre outil existe déjà. J'y ajoute ce que l'IA fait bien : un assistant qui connaît vos documents, de la génération de contenu, des tâches automatisées.",
    deliverables: [
      "Choix du bon cas d'usage, chiffré en coût et en risque",
      "Prototype branché sur vos données",
      "Intégration dans votre stack existante",
      "Suivi de la qualité des réponses et des coûts",
    ],
  },
];

export type Step = {
  id: "idee" | "design" | "code" | "prod";
  name: string;
  human: string;
  ai: string;
};

/** The product-builder method: what the human decides, what AI accelerates. */
export const method: Step[] = [
  {
    id: "idee",
    name: "Idée",
    human: "On définit le problème, les utilisateurs et ce qui fait qu'un MVP est réussi.",
    ai: "L'IA aide à explorer le marché, reformuler les besoins et lister les risques.",
  },
  {
    id: "design",
    name: "Design",
    human: "Je tranche la direction visuelle et le parcours utilisateur.",
    ai: "L'IA génère plusieurs pistes et prototypes à comparer en quelques heures.",
  },
  {
    id: "code",
    name: "Code",
    human: "Je fixe l'architecture et je relis chaque ligne qui part en production.",
    ai: "Des agents de code écrivent, testent et refactorisent sous ma supervision.",
  },
  {
    id: "prod",
    name: "Prod",
    human: "Je déploie, je mesure et je vous transmets un produit que vous maîtrisez.",
    ai: "L'IA surveille, résume les retours et propose les prochaines améliorations.",
  },
];

export type Project = {
  id: "marcellie" | "hyperion" | "artefacto" | "mgcoaching" | "timeit";
  title: string;
  context: string;
  kind: string;
  role: string;
  summary: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  /** Built with or around AI */
  ai?: string;
};

export const projects: Project[] = [
  {
    id: "marcellie",
    title: "Les Ailes de Marcellie",
    context: "Freelance",
    kind: "Site e-commerce",
    role: "Design, développement et mise en production avec Claude Code",
    summary:
      "La boutique en ligne d'une créatrice de couture. Elle gère son catalogue seule dans Airtable, ses clients paient par carte via SumUp, le stock se met à jour à chaque vente et la confirmation part par e-mail toute seule.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Airtable", "SumUp", "Docker", "Claude Code"],
    image: "/les-ailes-de-marcellie-website.jpeg",
    // Staging copy kept for the portfolio (branch dev); the client's live shop is lesailesdemarcellie.com
    liveUrl: "https://lesailesdemarcellie.alx-pst.tech",
    ai: "Codé avec Claude Code",
  },
  {
    id: "hyperion",
    title: "Hyperion Connect",
    context: "Freelance",
    kind: "Application mobile",
    role: "Conception et développement fullstack",
    summary:
      "Une PWA qui met en relation sportifs, coachs, médecins et partenaires : comptes, événements, programmes et partage d'informations.",
    stack: ["React Native", "Expo", "Express", "MySQL", "Figma"],
    image: "/hyperion-connect-img.jpg",
    liveUrl: "https://hyperion-connect.com",
    githubUrl: "https://github.com/AlexPst-Dev/hyperion-connect-frontend",
  },
  {
    id: "artefacto",
    title: "Artefacto",
    context: "Artefacto",
    kind: "Site vitrine",
    role: "Refonte du site, design Figma",
    summary:
      "Le site de l'entreprise, reconstruit en Astro avec le CMS Strapi pour que l'équipe gère son contenu seule, plus rapide à charger et plus simple à maintenir.",
    stack: ["Astro", "Strapi", "TypeScript", "SCSS", "Figma"],
    image: "/artefacto-website.jpeg",
    liveUrl: "https://artefacto-ar.com",
  },
  {
    id: "mgcoaching",
    title: "MG Coaching",
    context: "Freelance",
    kind: "Landing page",
    role: "Design Figma et développement",
    summary:
      "La landing page d'un coach sportif, pensée pour la vitesse d'affichage et le référencement naturel.",
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Figma"],
    image: "/mg-coaching-website-img.jpeg",
    liveUrl: "https://mg-coaching.alx-pst.tech",
  },
  {
    id: "timeit",
    title: "TimeIt",
    context: "Projet personnel",
    kind: "Application web",
    role: "Produit codé entièrement avec un IDE IA",
    summary:
      "Un minuteur d'activités sportives développé de bout en bout avec Antigravity, l'IDE agentique de Google : un test grandeur nature du développement assisté par IA.",
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Antigravity"],
    image: "/timeit-img.jpg",
    liveUrl: "https://timeit.alx-pst.tech",
    githubUrl: "https://github.com/AlexPst-Dev/TimeIt",
    ai: "Codé avec un agent IA",
  },
];

export const experience = [
  {
    period: "2025 — aujourd'hui",
    title: "Freelance",
    detail: "Développeur et designer web : applications, sites, MVP.",
  },
  {
    period: "2022 — 2024",
    title: "Artefacto",
    detail: "Développeur fullstack : Angular, NestJS, migration PHP vers NestJS, Astro et Strapi, veille 3D.",
  },
  {
    period: "2021 — 2022",
    title: "Lioncoach",
    detail: "Développeur fullstack : plateforme de suivi client en VueJS et NestJS.",
  },
];

export const stack = {
  "Produit & design": ["Figma", "Prototypage IA", "UX"],
  Front: ["React", "Next.js", "React Native", "Expo", "Astro", "Tailwind CSS"],
  Back: ["Node.js", "NestJS", "Express", "MySQL", "Strapi"],
  "IA & livraison": ["Claude Code", "Agents de code", "Docker", "CI/CD"],
};

