import type { Metadata } from "next";
import { Chivo } from "next/font/google";
import JsonLd from "@/app/components/JsonLd";
import Navbar from "./components/Navbar";
import { SITE_URL } from "@/app/lib/site";
import "./globals.css";

const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alexandre PROUST | Développeur & Designer Web Freelance",
    template: "%s | Alexandre PROUST",
  },
  description:
    "Alexandre PROUST est développeur et designer web freelance à Rennes. Il conçoit des applications web et mobiles en TypeScript (React, Next.js, React Native, Node.js) et leurs interfaces sur Figma.",
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
        url: "/og-image.jpg",
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
    <html lang="fr" className={chivo.variable}>
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
