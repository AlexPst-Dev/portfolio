export default function Experiences() {
  return (
    <div className="flex flex-col w-full gap-8 pb-8">
      {/** Experiences */}
      <section className="flex flex-col">
        <h1>EXPERIENCES</h1>
        <div className="flex flex-col gap-4">
          <>
            <div className="flex flex-col gap-2">
              <h3>Freelance — Développeur & Designer Web </h3>
              <p>02/2025 - Aujourd&apos;hui | Rennes</p>
            </div>
            <ul className="list-disc list-inside">
              <li>
                Conception et développement d'une PWA mobile (React Native +
                Expo, ExpressJS, MySQL) permettant la mise en relation de coachs
                et professionnels du sport, avec gestion complète des
                utilisateurs, événements et programmes.
              </li>
              <li>
                Structuration d'une architecture backend scalable, permettant de
                gérer plusieurs types d'utilisateurs et flux métier complexes.
              </li>
              <li>
                Réalisation d'un site vitrine sous Next.js à partir de maquettes
                Figma, améliorant la clarté de l'offre et l'engagement
                utilisateur.
              </li>
              <li>
                Pilotage de projets web de bout en bout (UX/UI → développement →
                livraison), réduisant les délais de production grâce à une
                approche itérative et centrée utilisateur.
              </li>
              <li>
                Collaboration directe avec les clients pour cadrer les besoins,
                aboutissant à des solutions sur mesure alignées avec leurs
                objectifs business.
              </li>
              <li>
                Adaptation rapide des priorités projets, livrant des
                fonctionnalités clés dans des délais courts sans compromettre la
                qualité.
              </li>
            </ul>
          </>
          <>
            <div className="flex flex-col gap-2">
              <h3>Artefacto — Développeur Fullstack </h3>
              <p>09/2022 - 09/2024 | Rennes</p>
            </div>
            <ul className="list-disc list-inside">
              <li>
                Développement d'une application interne RSE (Angular, NestJS,
                MySQL) facilitant les dons de congés à des associations,
                améliorant l'engagement des collaborateurs.
              </li>
              <li>
                Participation à la refonte du site web avec Astro et Strapi,
                optimisant les temps de chargement et la maintenabilité du
                contenu.
              </li>
              <li>
                Migration des applications legacy PHP vers NestJS, améliorant la
                performance, la scalabilité et la maintenabilité du code.
              </li>
              <li>
                Implémentation d'une authentification sécurisée via JSON Web
                Tokens, renforçant la protection des données utilisateurs.
              </li>
              <li>
                Correction des bugs critiques et refactorisation du code
                existant, réduisant la dette technique et améliorant la
                stabilité globale des applications.
              </li>
              <li>
                Réalisation d'une veille technique sur les technologies 3D web
                (BabylonJS), contribuant à l'innovation sur les projets
                immersifs de l'entreprise
              </li>
            </ul>
          </>
          <>
            <div className="flex flex-col gap-2">
              <h3>Lioncoach — Développeur Fullstack</h3>
              <p>09/2021 - 09/2022 | Rennes</p>
            </div>
            <ul className="list-disc list-inside">
              <li>
                Refonte d'un site web sous WordPress (PHP), améliorant la
                structure et la lisibilité du contenu
              </li>
              <li>
                Développement d'une plateforme de gestion clients (VueJS,
                NestJS, MySQL) permettant aux coachs de suivre leurs clients et
                programmes, optimisant leur organisation quotidienne.
              </li>
              <li>
                Analyse des solutions concurrentes pour identifier des
                opportunités d'amélioration produit et aligner les
                fonctionnalités avec les attentes du marché.
              </li>
              <li>
                Collaboration avec des designers UI/UX pour concevoir des
                interfaces plus intuitives, améliorant l'expérience utilisateur
                globale.
              </li>
            </ul>
          </>
        </div>
      </section>
      {/** Diplomes */}
      <section className="flex flex-col gap-4">
        <h1>DIPLOMES</h1>
        <div className="flex flex-col gap-2">
          <h3>Mastère Développeur Fullstack — Sup De Vinci</h3>
          <p>09/2022 - 09/2024 | Rennes </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3>Bachelor Développeur Web — Sup De Vinci</h3>
          <p>09/2021 - 09/2022 | Rennes </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3>
            BTS Systèmes d&apos;Information aux Organisations — Pôle Sup De La
            Salle
          </h3>
          <p> 09/2019 - 09/2021 | Rennes</p>
        </div>
      </section>
    </div>
  );
}
