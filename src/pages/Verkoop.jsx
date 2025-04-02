import "../assets/styles/pages/Verkoop.css";
import items from "../data";
import { useState } from "react";
import { Link } from "react-router-dom";

const Verkoop = () => {

  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(items.map((item) => item.category))];
 
  // Filter items based on the selected category
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

      const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + "...";
        }
        return text;
      };
      

  return (
  <div className="main-container d-flex flex-row align-items-center">

    {/* Sidebar */}
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 custom-sidebar">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline">Categorieën</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {categories.map((category, index) => (
                <li key={index} className="nav-item">
                <button
                  className={`nav-link align-middle px-0 text-white ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <span className="ms-1 d-none d-sm-inline">{category}</span>
                </button>
              </li>
              ))}
            </ul>
          </div>
        </div>
    {/* Main Content */}      
    <div className="container py-5">

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
    {filteredItems.map((item) => (
      <div key={item.id} className="col d-flex justify-content-center">
        <Link to={`/detail/${item.id}`} style={{ textDecoration: "none" }}>
        <div className="card hover-card shadow-sm">
          <img
            src={item.image}
            className="card-img"
            alt={item.name}
          />
          <div className="card-overlay">
          <p className="card-description">{truncateText(item.description, 100)}</p>
            <p className="card-category">
              <strong>Categorie:</strong> {item.category}
            </p>
            <h5 className="card-title">{item.name}</h5>
            <p className="card-price">
              {new Intl.NumberFormat("nl-NL", {
                style: "currency",
                currency: "EUR",
              }).format(item.price)}
            </p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Verkoop;