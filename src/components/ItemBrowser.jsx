//Refactoring of Itembrowser to seperate it from Verkoop page
import PropTypes from "prop-types";

ItemBrowser.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        .isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      sold: PropTypes.bool.isRequired,
      category: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]).isRequired,
    })
  ).isRequired,
};

const ItemBrowser = ({ items }) => {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      {items.map((item) => (
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
              <p className="card-price">
                {new Intl.NumberFormat("nl-NL", {
                  style: "currency",
                  currency: "EUR",
                }).format(item.price)}
              </p>
              <p className="card-category">
                <strong>Categorie:</strong>{" "}
                {Array.isArray(item.category)
                  ? item.category.join(", ")
                  : item.category}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemBrowser;