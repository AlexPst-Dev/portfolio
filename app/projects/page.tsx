import Link from "next/link";

export default function Projects() {
  return (
    <section className="min-h-screen flex flex-col p-8">
      <h1>PROJETS</h1>
      <Link href="/" className="hover:underline">
        Retour
      </Link>
    </section>
  );
}
