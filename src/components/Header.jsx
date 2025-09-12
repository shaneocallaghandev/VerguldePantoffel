import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logo.png";
import "../assets/styles/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <button className="hamburger" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </button>
      <div>
        <img src={logo} alt="LogoHeader" className="logo" />
      </div>
      <nav>
        <ul className={menuOpen ? "show" : ""}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/verkoop">Verkoop</Link>
          </li>
          <li>
            <Link to="/restauratie">Restauratie</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;