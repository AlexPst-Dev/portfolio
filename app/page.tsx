import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Portfolio d'Alexandre PROUST, developpeur web freelance specialise en Next.js, React Native et conception UI/UX sur Figma.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <section
      aria-label="Presentation du developpeur"
      className="min-h-screen flex flex-col-reverse md:flex-row justify-between items-center"
    >
      <header id="leftPart" className="w-full md:w-[54%]">
        <div id="titles">
          <h1 className="leading-none">Alexandre PROUST</h1>
          <h2>Développeur & Designer Web Freelance</h2>
          <h3>NextJS | React Native | Figma</h3>
        </div>
        <p className="mt-2">
          {`Développeur Front-End freelance, je conçois des sites et MVP web, du
          design à la mise en production. J'utilise Figma pour l'UX/UI et NextJS pour le développement. Je collabore
          avec des PME sur des projets web et reste ouvert à des opportunités
          salariées.`}
        </p>
      </header>

      <div className="rightPart flex justify-center w-full md:w-[46%]">
        <Image
          src="/pp-alexandre-proust-website.png"
          alt="Portrait professionnel d'Alexandre PROUST en fond sombre"
          width={500}
          height={500}
          priority
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiMyMjIyMjIiLz48L3N2Zz4="
          className="object-contain max-w-full h-auto"
        />
      </div>
    </section>
  );
}
