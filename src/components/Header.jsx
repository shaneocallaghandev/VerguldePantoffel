import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/images/logo.png";
import "../assets/styles/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header>
      <button className="hamburger" onClick={toggleMenu} ref={hamburgerRef}>
        &#9776; {/* Hamburger icon */}
      </button>
      <div>
        <img src={logo} alt="LogoHeader" className="logo" />
      </div>
      <nav ref={menuRef}>
        <ul className={menuOpen ? "show" : ""}>
          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li>
            <Link to="/verkoop" onClick={closeMenu}>Verkoop</Link>
          </li>
          <li>
            <Link to="/restauratie" onClick={closeMenu}>Restauratie</Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;