import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.portfolio.alx-pst.tech"),
  title: {
    default: "Alexandre PROUST | Développeur & Designer Web Freelance",
    template: "%s | Alexandre PROUST",
  },
  description:
    "Alexandre PROUST est développeur et designer web freelance à Rennes. Il conçoit des applications Next.js, React Native et des interfaces UI/UX sur Figma.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Alexandre PROUST" }],
  creator: "Alexandre PROUST",
  other: {
    "profile:linkedin":
      "https://www.linkedin.com/in/alexandre-proust-48437919b/",
    "profile:github": "https://github.com/AlexPst-Dev",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Portfolio Alexandre PROUST",
    title: "Alexandre PROUST | Développeur & Designer Web Freelance",
    description:
      "Portfolio professionnel d'Alexandre PROUST: projets web, expérience et contact.",
    images: [
      {
        url: "https://www.portfolio.alx-pst.tech/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aperçu du portfolio d'Alexandre PROUST",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <JsonLd />
        <Navbar />
        <main>{children}</main>
        <footer className="px-4 md:px-10 lg:px-32 py-8 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Alexandre PROUST. Tous droits réservés.
          </p>
        </footer>
      </body>
    </html>
  );
}
