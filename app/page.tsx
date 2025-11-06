import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col-reverse md:flex-row justify-center items-center">
      <div id="leftPart" className="w-full md:w-[54%]">
        <div id="titles">
          <h1>Alexandre PROUST</h1>
          <h2>Développeur & Designer Web Freelance</h2>
          <h3>NextJS et AstroJs</h3>
        </div>
        <div id="links" className="mt-4">
          <ul className="flex gap-8 list-disc ml-4">
            <li className="hover:underline">
              <a href="./projects/">Projets</a>
            </li>
            <li className="hover:underline">
              <a href="./degrees/">Diplômes</a>
            </li>
            <li className="hover:underline">
              <a href="./experiences/">Experiences</a>
            </li>
          </ul>
        </div>
        <p className="mt-2">
          {`Développeur Front-End freelance, je conçois des sites et MVP web, du
          design à la mise en production. J'utilise Figma pour l'UX/UI et des
          frameworks comme Astro ou NextJS pour le développement. Je collabore
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
