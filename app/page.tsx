import type { Metadata } from "next";
import LabShell from "./_lab/LabShell";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Alexandre PROUST, product builder : il emmène votre idée jusqu'en production, avec l'IA à chaque étape. Développeur fullstack TypeScript freelance à Rennes.",
  alternates: {
    canonical: "/",
  },
  // test-ui branch: five design proposals, not for indexing
  robots: { index: false, follow: false },
};

export default function Home() {
  return <LabShell />;
}
