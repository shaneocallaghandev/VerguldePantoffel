import "../assets/styles/pages/Verkoop.css";
import categories from "../data";

const Verkoop = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Onze Verkoopbare Producten</h2>
      <p className="text-center mb-5">Bekijk de verschillende items die we aanbieden.</p>

      {categories.map((category, index) => (
        <div key={index} className="mb-5">
          <h3 className="mb-3">{category.name}</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {category.items.map((item) => (
              <div key={item.id} className="col">
                <div className="card shadow-sm">
                  <img
                    src={item.image}
                    className="bd-placeholder-img card-img-top"
                    alt={item.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Verkoop;