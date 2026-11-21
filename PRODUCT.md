# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Prospects who might hire Alexandre Proust as a freelancer:

- **Startup founders** who need an MVP built from idea to production, with AI inside the product.
- **SMEs (PME)** that want AI added to a product or internal tool they already run (an assistant on their own data, content generation, automations).
- **Agencies and studios** looking for a technical reinforcement on client projects (front-end integration, motion, AI features).

They land on the portfolio from a link (LinkedIn, a proposal, an interview) and decide within a minute whether he can carry their project. Salaried (CDI) recruiting is not the target of the redesign.

## Product Purpose

A personal portfolio that wins freelance work. Success: a prospect remembers the profile, understands what he can deliver for them, and gets in touch.

## Positioning

**Product builder / AI integrator developer**: he carries a product from idea to production — framing, design, development, deployment — using AI at every step, backed by four years of full-stack TypeScript (React, Next.js, React Native, Node.js/NestJS/Express). The AI experience is recent: show it through proof (the portfolio itself built with AI, AI features shipped), never through inflated claims.

Offers to put forward:

1. **AI-powered MVP**: from idea to a product online (framing, design, development, deployment).
2. **AI integration into an existing product**: chatbot on the client's data, business assistant, content generation, automations.

## Operating Context

- Freelance based in Rennes, available for missions.
- Stack in use: Next.js 16 (App Router), React 19, Tailwind CSS 4, Docker deployment (`output: "standalone"`), contact form via Resend server action.
- Live site: https://portfolio.alx-pst.tech

## Capabilities and Constraints

- The site includes an AI chatbot that explains his projects and services to prospects. On the `test-ui` exploration branch its answers are **scripted** (pre-written, streamed); a real model call comes later.
- The redesign must be expressive and use motion, while staying readable and accessible.
- Undecided: final visual direction (five proposals compared on `test-ui`, scored by the user on his own rubric: personal appreciation, coherence, readability, accessibility, boldness/originality).

## Brand Commitments

- Name: Alexandre PROUST. Logo: `public/logo-portfolio.svg` (orange spark).
- Identity: black ground, white text, orange accent. The user wants proposals to differ by concept and structure, not by palette.
- Language: French.
- Icons: lucide-react by default (user's references from recent.design noted as inspiration).

## Evidence on Hand

- Portrait: none on the site for now (the old one was removed from `public/`; it is in git history).
- Projects (screenshots in `public/`): Hyperion Connect (React Native/Expo, Express, MySQL, Figma), Artefacto website (Astro, Strapi), MG Coaching landing page (Next.js), TimeIt (Next.js, built entirely with an AI IDE).
- Experience: freelance since 02/2025; Artefacto full-stack developer 09/2022–09/2024 (Angular, NestJS, Astro/Strapi, PHP→NestJS migration, BabylonJS watch); Lioncoach full-stack 09/2021–09/2022 (VueJS, NestJS, WordPress).
- Degrees: Mastère Développeur Fullstack and Bachelor Développeur Web (Sup De Vinci), BTS SIO.
- **No testimonials, client logos, metrics or AI case studies with numbers exist yet. Never invent them.**

## Product Principles

1. Proof over claims: every promise points to something built.
2. The site is itself the demonstration of the product-builder method.
3. A prospect understands the offer in one screen; the expressive layer never hides it.
4. Honest about the AI chatbot: it explains, it never pretends to be a person or to know what it doesn't.

## Accessibility & Inclusion

Readability and accessibility are explicit scoring criteria: WCAG AA contrast, keyboard access, visible focus, `prefers-reduced-motion` respected everywhere.
