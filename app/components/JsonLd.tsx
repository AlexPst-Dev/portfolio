/**
 * SEO note:
 * This component injects Person JSON-LD structured data for richer search snippets.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alexandre PROUST",
  url: "https://www.portfolio.alx-pst.tech",
  jobTitle: "Developpeur et Designer Web Freelance",
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
