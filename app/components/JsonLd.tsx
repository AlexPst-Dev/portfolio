/**
 * SEO note:
 * This component injects Person JSON-LD structured data for richer search snippets.
 */
import { SITE_URL } from "@/app/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alexandre PROUST",
  url: SITE_URL,
  jobTitle: "Développeur Fullstack TypeScript Freelance",
  sameAs: [
    "https://github.com/AlexPst-Dev",
    "https://www.linkedin.com/in/alexandre-proust-48437919b/",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "React Native",
    "Expo",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Figma",
    "Node.js",
    "Express.js",
    "NestJS",
    "MySQL",
    "Angular",
    "Astro",
    "Strapi",
    "PHP",
    "Vue.js",
    "Babylon.js",
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  );
}
