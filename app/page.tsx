import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col-reverse md:flex-row justify-center items-center">
      <div id="leftPart" className="w-full md:w-[54%]">
        <div id="titles">
          <h1>Alexandre PROUST</h1>
          <h2>Développeur & Designer Web Freelance</h2>
          <h3>NextJS</h3>
        </div>
        <p className="mt-2">
          {`Développeur Front-End freelance, je conçois des sites et MVP web, du
          design à la mise en production. J'utilise Figma pour l'UX/UI et NextJS pour le développement. Je collabore
          avec des PME sur des projets web et reste ouvert à des opportunités
          salariées.`}
        </p>
      </div>

      <div className="rightPart flex justify-center">
        <Image
          src="/pp-alexandre-proust-website.jpg"
          alt="Photo d'Alexandre"
          width={500}
          height={500}
          priority
          className="object-contain"
        />
      </div>
    </section>
  );
}
