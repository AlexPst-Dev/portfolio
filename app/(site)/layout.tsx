import Navbar from "@/app/components/Navbar";

/** Layout of the current (pre-redesign) pages: projects, experiences, contact, old home. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="site-main">{children}</main>
      <footer className="px-4 md:px-10 lg:px-32 py-8 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Alexandre PROUST. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
