# Prompt for a design AI (Figma AI, Penpot, or another tool)

Copy everything below the line into the design tool. It describes the whole context, because the tool cannot see the current site.

---

## Role

You are a senior web designer known for expressive portfolio and studio sites. Design **three distinct landing-page directions** for the portfolio of a freelance developer, plus a simple way to switch between them in the prototype.

## Who the site is for

**Alexandre Proust** is a full-stack TypeScript developer based in Rennes, France, who also works remotely.

- Four years of TypeScript in production.
- Freelance since February 2025.
- He positions himself as a **product builder / AI integrator**: he takes an idea all the way to production (framing, design, code, deployment) and uses AI at every step.

The site is in **French**. Use the French copy given below as-is, and keep headlines short.

The site has to win **freelance clients**, not job interviews. The audience has three groups:

1. **Startup founders**, who need a first product (an MVP) shipped fast without hiring a team.
2. **Small and mid-sized companies**, which have an existing tool and want to add AI to it.
3. **Agencies and studios**, which need a reliable developer who can also design.

A visitor should understand within five seconds:

- what he builds;
- that AI is part of both the product and how he builds it;
- how to start a conversation with him.

## What is wrong with the current site

The current site is a plain black page with white text, a few orange touches and a procedural list of projects. It looks like a template and says nothing about the AI angle. An interviewer called it bland.

The new site must feel **made by someone who builds products with AI**: confident, expressive, with real motion, and still readable.

## Brand (fixed: do not invent a new palette)

- **Colours:**

  | Role | Hex |
  |---|---|
  | Near-black background | `#0a0806` |
  | Warm off-white (text) | `#f5efe8` |
  | Warm grey (secondary text) | `#a89e94` |
  | Brand orange (logo, large fields) | `#bb4d00` |
  | Bright orange (text and small marks on black; about 7:1 contrast) | `#ff6a13` |

  The site is dark-first. Orange is the only accent.
- **Logo:** a four-pointed sparkle with a smaller twin sparkle and **two oval eyes**. It is a small character, so it can become the face of the AI assistant (blinking, looking around, "thinking").
- **Icons:** thick, rounded line icons (Lucide style). Draw them yourself to explore:
  - character-like glyph icons that have eyes, in the spirit of the logo;
  - line icons whose strokes draw or move on hover.

  No emoji and no unicode arrows used as icons.
- **Type:** free choice, but avoid the overused defaults (Inter, Roboto, Poppins, Montserrat, Space Grotesk). Variable fonts with a width or optical-size axis are welcome, because they can be animated.

## Content (real: do not add anything)

**Promise (main statement):** "J'emmène votre idée jusqu'en production, avec l'IA à chaque étape."

**Role line:** "Product builder", with "Développeur fullstack TypeScript" as secondary.

**Facts:**

- "4 ans de TypeScript en production"
- "Rennes et à distance"
- "Freelance depuis février 2025"
- "Disponible pour de nouvelles missions"

**Two offers:**

1. **"Un MVP propulsé par l'IA"**, for founders and startups. It turns an idea into a live product. Deliverables:
   - scope;
   - mockups and a clickable prototype;
   - web or mobile app in TypeScript;
   - deployment and handover.
2. **"De l'IA dans votre produit"**, for SMEs, product teams and agencies. It adds AI to an existing tool (an assistant that knows your documents, content generation, automated tasks). Deliverables:
   - the right use case, costed;
   - a prototype on your data;
   - integration into the existing stack;
   - monitoring of answer quality and costs.

**Method, in four steps.** Each step shows what the human decides and what AI accelerates:

- **Idée:** define the problem and the users; AI explores the market and lists the risks.
- **Design:** he chooses the direction; AI generates several prototypes to compare.
- **Code:** he sets the architecture and reviews every line; coding agents write and test under his supervision.
- **Prod:** he deploys and hands over; AI monitors and summarises feedback.

**Four projects.** Use the real names and placeholder screenshot frames:

- **Hyperion Connect** (freelance, mobile app/PWA): connects athletes, coaches, doctors and partners. React Native, Expo, Express, MySQL.
- **Artefacto** (company website): rebuilt in Astro with the Strapi CMS. Figma design.
- **MG Coaching** (freelance, landing page): a sports coach's landing page, built for speed and SEO. Next.js, Tailwind.
- **TimeIt** (personal, web app): an activity timer **coded end to end with an AI agent IDE**. This is the AI proof project, so give it a visible "built with AI" marker.

**Career:**

- Freelance (2025 to now);
- Artefacto, full-stack developer (2022 to 2024): Angular, NestJS, Astro;
- Lioncoach, full-stack developer (2021 to 2022): Vue, NestJS.

**Stack groups:**

- Product & design: Figma, AI prototyping, UX
- Front: React, Next.js, React Native, Expo, Astro, Tailwind
- Back: Node.js, NestJS, Express, MySQL, Strapi
- AI & delivery: Claude Code, coding agents, Docker, CI/CD

**Contact:** an email form and links to GitHub and LinkedIn.

There are **no testimonials, client logos or metrics**. Do not invent any, including "+50 projects" or star ratings.

## Must-have: an AI assistant (chatbot) that explains the work

Each direction has a built-in assistant. It answers visitors' questions about:

- the projects;
- the two offers and which one fits them;
- the method;
- timelines ("Combien de temps pour un MVP ?");
- the stack;
- working with agencies;
- how to get in touch.

Answers are pre-written for now, and the design must say so honestly. Example: "Réponses rédigées à l'avance, en attendant le vrai modèle".

The assistant is a **design element, not a generic floating support bubble**. Give it a clear embodiment in each direction, for example:

- the logo character;
- a command bar;
- a conversation that is the page itself;
- annotations on a drawing;
- a command palette.

Show these states:

- closed / entry point;
- open with suggested questions as chips;
- the "thinking" state;
- an answer that contains **rich blocks**, not just text: project cards, the two offer cards, the four method steps, and a contact block.

## Motion (annotate it on the frames)

Describe the intended motion for each direction:

- the hero entrance;
- one signature motion moment (examples: the name's letters changing width, a pipeline that runs, a portrait made of particles, a technical drawing that draws itself);
- hover states on projects;
- the assistant's open/close and streaming answer.

Every motion needs a **reduced-motion alternative**: a static end state, with no information lost.

## Accessibility

- WCAG 2.2 AA contrast. Orange text only in `#ff6a13` on black.
- Visible focus rings.
- Tap targets of at least 44 px.
- A readable body size: 16 px minimum, 18 to 20 px for lead text.
- The chat must work by keyboard. Focus moves into the panel and returns to the button that opened it.

## Directions already explored (do not repeat them)

Five coded directions already exist. Explore **different** territory:

1. **Pipeline:** the stages IDÉE / DESIGN / CODE / PROD run across the hero; a terminal-style command bar.
2. **Conversation:** the page is a chat; a portrait beside a live chat panel.
3. **Étincelle:** a particle portrait, with the logo character as a companion that comments on each section.
4. **Plan:** a blueprint / technical-drawing world; an exploded isometric drawing of the product layers.
5. **Index:** giant kinetic type; a filterable project index and a ⌘K command palette.

## Deliverables

- **Three directions.** For each one:
  - a name and a one-sentence concept;
  - a **desktop frame at 1440 px** (full landing: hero, offers, method, projects, career/stack, contact, footer);
  - a **mobile frame at 390 px** (hero and the open assistant at least);
  - the type pairing and how the orange is used.
- **A prototype switcher:** a slim neutral top bar with three tabs (01, 02, 03) and previous/next arrows. It switches between the three directions and stays separate from each design's own navigation.
- **Avoid:**
  - generic SaaS templates and bento grids of identical cards;
  - purple or blue gradients, glassmorphism, 3D blobs;
  - small all-caps "eyebrow" labels above every heading;
  - stock photos and fake data.
