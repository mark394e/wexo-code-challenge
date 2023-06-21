import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link className="link_tag" to="/">
              *LOGO*
            </Link>
          </li>
          <li>
            <Link className="link_tag" to="/allmovies">
              Film
            </Link>
          </li>
          <li>
            <Link className="link_tag" to="/allseries">
              Serier
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
