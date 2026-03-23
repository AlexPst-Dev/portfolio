import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Alexandre PROUST pour collaborer sur vos projets web. Disponible pour missions freelance et opportunites professionnelles.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return <ContactContent />;
}
