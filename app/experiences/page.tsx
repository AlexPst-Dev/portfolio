import Link from "next/link";

export default function Experiences() {
  return (
    <section className="min-h-screen flex flex-col p-8">
      <h1>EXPERIENCES</h1>
      <Link href="/" className="hover:underline">
        Retour
      </Link>
      <h3>Freelance — Développeur & Designer Web </h3>
      <p>02/2025 - aujourd&apos;hui | Rennes</p>
      <ul>
        <li>
          Développement d&apos;une PWA pour Hyperion : Application mobile (React
          Native + Expo) avec back-end ExpressJS et MySQL, mise en relation
          coachs / soignants sportifs.
        </li>
        <li>
          Création d&apos;un site vitrine pour un coach sportif : Design Figma +
          développement AstroJS.
        </li>
        <li>
          Prestations freelance : Gestion complète de projets web, du design à
          la mise en production (Figma, Astro, NextJS).
        </li>
      </ul>

      <h3>Artefacto — Développeur Fullstack </h3>
      <p>09/2022 - 09/2024 | Rennes</p>
      <ul>
        <li>Refonte du site web avec Astro + Strapi.</li>
        <li>Migration de projets PHP vers NestJS.</li>
        <li>Veille technique sur l&apos;intégration 3D web (BabylonJS).</li>
        <li>
          Développement d&apos;une application RSE interne (Trug&apos;Planet) :
          Angular + NestJS + MySQL.
        </li>
      </ul>

      <h3>Lioncoach — Développeur Fullstack</h3>
      <p>09/2021 - 09/2022 | Rennes</p>
      <ul>
        <li>Refonte du site WordPress + composants PHP.</li>
        <li>
          Développement d&apos;une plateforme web clients : VueJS + NestJS +
          MySQL.
        </li>
      </ul>
    </section>
  );
}
