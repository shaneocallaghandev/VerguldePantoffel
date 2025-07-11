import { useParams } from "react-router-dom";
import items from "../data";
import "../assets/styles/pages/detail.css";
import { useState } from "react";

const Detail = () => {
  const { id } = useParams(); // Get the item ID from the route parameter
  const item = items.find((item) => item.id === parseInt(id)); // Find the item by ID

  // Use the first image in the array as the default main image
  const [selectedImage, setSelectedImage] = useState(item?.image[0]);
  	
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
          <div className="image-container">
           {/* Main Image */}
           <img src={selectedImage} alt={item.name} className="detail-image" />

           {/* Thumbnails */}
              <div className="thumbnail-container">
              {item.image.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${
                  selectedImage === image ? "active-thumbnail" : ""
                }`}
                onClick={() => setSelectedImage(image)} // Set the clicked image as the main image
              />
               ))}
              </div>
          </div>
    
          <div className="detail-info">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p><strong>Categorie:</strong> {item.category}</p>
            <p><strong>Prijs:</strong>{" "}
            {new Intl.NumberFormat("nl-NL", {
              style: "currency",
              currency: "EUR",
            }).format(item.price)}
            </p>
          </div> 
        </div>
        {/* <button className = "volgende">Volgende</button> */}
      </div>
    </div>
  );
};

export default Detail;