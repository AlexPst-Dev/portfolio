export default function Navbar() {
  return (
    <nav className="flex w-full justify-end pr-6 mt-4">
      <ul className="flex gap-8 list-none">
        <li className="hover:underline">
          <a href="./projects/">Projets</a>
        </li>
        <li className="hover:underline">
          <a href="./degrees/">Diplômes</a>
        </li>
        <li className="hover:underline">
          <a href="./experiences/">Experiences</a>
        </li>
      </ul>
    </nav>
  );
}
