import "../assets/styles/pages/Verkoop.css";
import items from "../data";

const Verkoop = () => {
  return (<div className="main-container">
    <div className="container py-5">
      <h2 className="text-center mb-4">Onze Verkoopbare Producten</h2>
      <p className="text-center mb-5">Bekijk de verschillende items die we aanbieden.</p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
    {items.map((item) => (
      <div key={item.id} className="col d-flex justify-content-center">
        <div className="card hover-card shadow-sm">
          <img
            src={item.image}
            className="card-img"
            alt={item.name}
          />
          <div className="card-overlay">
          <p className="card-description">{item.description}</p>
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
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Verkoop;