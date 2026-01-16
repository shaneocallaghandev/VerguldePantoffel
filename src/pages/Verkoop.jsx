import "../assets/styles/pages/verkoop.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchItems } from "../data.js"; // Import the API function to fetch items
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Verkoop = () => {
  // State to track the fetched items, loading status, and errors
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || "All"
  );

  useEffect(() => {
    // 1. Show cached data immediately if available
    const cachedItems = localStorage.getItem("items");
    if (cachedItems) {
      setItems(JSON.parse(cachedItems));
      setLoading(false);
    }

    // 2. Always fetch fresh data in the background
    const getItems = async () => {
      try {
        const fetchedItems = await fetchItems();
        setItems(fetchedItems);
        localStorage.setItem("items", JSON.stringify(fetchedItems));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

    // Save the selected category to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);
  
  const categories = [
    "All",
    ...Array.from(
      new Set(
        items.flatMap(item =>
          Array.isArray(item.category) ? item.category : [item.category]
        )
      )
    ),
  ];


// Sort items by newest date first
const sortedItems = [...items].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

// Filter items based on the selected category
const filteredItems =
  selectedCategory === "All"
    ? sortedItems
    : sortedItems.filter(item =>
        Array.isArray(item.category)
          ? item.category.includes(selectedCategory)
          : item.category === selectedCategory
      );


  // Truncate text for item descriptions
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-container d-flex flex-row align-items-center">
      {/* Sidebar */}
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 custom-sidebar">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-5">Categorieën</span>
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
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
                  <span className="ms-1">{category}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
          {loading? (
              <div className="row">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="col d-flex justify-content-center">
                    <div className="card hover-card shadow-sm">
                      <Skeleton height={200} />
                      <Skeleton count={3} />
                    </div>
                  </div>
                ))}
              </div>
          ): ( 
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredItems.map((item) => (
            <div key={item._id} className="col d-flex justify-content-center">
              <Link to={`/detail/${item._id}`} style={{ textDecoration: "none" }}>
                <div className="card hover-card shadow-sm">
                  {item.sold && <div className="sold-banner">Sold</div>}
                  <img
                    src={item.images[0]} // Access the first image from the images array
                    className="card-img"
                    alt={item.name}
                    loading="lazy"
                  />
                  <div className="card-overlay">
                    <p className="card-description">
                      {truncateText(item.description, 100)}
                    </p>
                    <p className="card-category">
                      <strong>Categorie:</strong> {" "}
                      {Array.isArray(item.category) ? item.category.join(", ") : item.category}
                    </p>
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-price">
                      {item.sold ? (
                        <em>Verkocht</em>
                      ) : (
                        new Intl.NumberFormat("nl-NL", {
                          style: "currency",
                          currency: "EUR",
                        }).format(item.price)
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
          )}
      </div>
    </div>
  );
};

export default Verkoop;