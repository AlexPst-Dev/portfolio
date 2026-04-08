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
      <header id="leftPart" className="w-full md:w-[60%]">
        <div className="flex flex-col gap-2">
          <div className="text-amber-700 px-2 py-1 rounded-md bg-amber-100 w-fit border-t border-l border-b-4 border-r-4 border-amber-700 cursor-pointer">
            <a href="/contact" className="hover:underline">
              Disponible — Freelance & CDI
            </a>
          </div>
          <h1 className="leading-none">Alexandre PROUST</h1>
          <h2 className="leading-none">
            Développeur <br /> Fullstack · UI/UX
          </h2>
          <h3>Next.js · React Native · Figma</h3>
        </div>
        <p className="mt-2">
          Je conçois des sites web et MVP de A à Z — du design Figma à la mise
          en production Next.js. Ouvert aux missions freelance comme aux
          opportunités en CDI.
        </p>
      </header>

      <div className="rightPart flex justify-center w-full md:w-[40%]">
        <Image
          src="/alexandre-proust-image.png"
          alt="Portrait professionnel d'Alexandre PROUST en fond sombre"
          width={500}
          height={500}
          priority
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiMyMjIyMjIiLz48L3N2Zz4="
          className="object-contain max-w-full h-auto border-amber-700 border-b-4 border-r-4 rounded-b-sm"
        />
      </div>
    </section>
  );
}
