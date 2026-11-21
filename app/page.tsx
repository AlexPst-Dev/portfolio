import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import Career from "@/app/components/home/Career";
import { ChatProvider } from "@/app/components/home/ChatProvider";
import Companion from "@/app/components/home/Companion";
import Contact from "@/app/components/home/Contact";
import Footer from "@/app/components/home/Footer";
import Header from "@/app/components/home/Header";
import Hero from "@/app/components/home/Hero";
import Method from "@/app/components/home/Method";
import Offers from "@/app/components/home/Offers";
import Projects from "@/app/components/home/Projects";
import { offers, profile, stack } from "@/app/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/app/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
};

const home = `${SITE_URL}/`;

// Who the site is about and what it offers, limited to what the page itself shows
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${home}#website`,
      url: home,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "fr-FR",
      publisher: { "@id": `${home}#person` },
    },
    {
      "@type": "Person",
      "@id": `${home}#person`,
      name: profile.name,
      url: home,
      jobTitle: "Développeur fullstack TypeScript freelance",
      description: profile.short,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Rennes", addressCountry: "FR" },
      sameAs: [profile.github, profile.linkedin],
      knowsAbout: ["TypeScript", "Intelligence artificielle", ...Object.values(stack).flat()],
      makesOffer: offers.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.title, description: o.pitch, provider: { "@id": `${home}#person` } },
      })),
    },
  ],
};

export default function Home() {
  return (
    <ChatProvider>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-flame focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">
        <Hero />
        <Offers />
        <Method />
        <Projects />
        <Career />
        <Contact />
      </main>
      <Footer />
      <Companion />
      <JsonLd data={structuredData} />
    </ChatProvider>
  );
}
