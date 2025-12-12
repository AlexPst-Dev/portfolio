export default function Navbar() {
  return (
    <nav className="flex w-full justify-between py-8 px-32 sticky top-0 z-50 bg-neutral-900/20 backdrop-blur-md border-b border-neutral-800">
      <a className="hover:underline" href="./">
        Alexandre Proust
      </a>
      <ul className="flex gap-8 list-none">
        <li className="hover:underline">
          <a href="./projects/">Projets</a>
        </li>
        <li className="hover:underline">
          <a href="./experiences/">Experiences</a>
        </li>
        <li>
          <a
            href="/contact/"
            className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Contactez-moi
          </a>
        </li>
      </ul>
    </nav>
  );
}
