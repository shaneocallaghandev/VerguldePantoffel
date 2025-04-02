import { useParams } from "react-router-dom";
import items from "../data";
import "../assets/styles/pages/Detail.css";

const Detail = () => {
  const { id } = useParams(); // Get the item ID from the route parameter
  const item = items.find((item) => item.id === parseInt(id)); // Find the item by ID

  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <div className="detail-page">
    <div className="detail-container">
        <button className="back-button" onClick={() => window.history.back()}>
        Terug 
        </button>
      <div className="detail-card">
        <img src={item.image} alt={item.name} className="detail-image" />
        <div className="detail-info">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>
            <strong>Categorie:</strong> {item.category}
          </p>
          <p>
            <strong>Prijs:</strong>{" "}
            {new Intl.NumberFormat("nl-NL", {
              style: "currency",
              currency: "EUR",
            }).format(item.price)}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Detail;