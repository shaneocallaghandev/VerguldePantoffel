import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../assets/styles/header.css";

const Header = () => {
  return (
    <header>
      <div>
        <img src={logo} alt="LogoHeader" className="logo" />
      </div>
      <nav>
        <ul>
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
