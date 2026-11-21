import { profile } from "@/app/lib/content";
import { wrap } from "./styles";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      {/* Bottom padding keeps the last line clear of the spark */}
      <div className={`${wrap} flex flex-wrap items-center justify-between gap-4 pb-32 pt-8 text-sm text-ash`}>
        <p>© {new Date().getFullYear()} Alexandre Proust · Rennes</p>
        <ul className="flex gap-2">
          <li>
            <a href={profile.github} rel="me noopener" target="_blank" className="inline-flex min-h-11 items-center px-2 hover:text-bone">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.linkedin} rel="me noopener" target="_blank" className="inline-flex min-h-11 items-center px-2 hover:text-bone">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
