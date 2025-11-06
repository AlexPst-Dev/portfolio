import Link from "next/link";

export default function Degrees() {
  return (
    <section className="min-h-screen flex flex-col p-8">
      <h1>DIPLOMES</h1>
      <Link href="/" className="hover:underline">
        Retour
      </Link>
      <h3>Mastère Développeur Fullstack — Sup De Vinci</h3>
      <p>09/2022 - 09/2024 | Rennes </p>
      <h3>Bachelor Développeur Web — Sup De Vinci</h3>
      <p>09/2021 - 09/2022 | Rennes </p>
      <h3>
        BTS Systèmes d&apos;Information aux Organisations — Pôle Sup De La Salle
      </h3>
      <p> 09/2019 - 09/2021 | Rennes</p>
    </section>
  );
}
