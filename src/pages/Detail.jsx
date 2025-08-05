import { useParams } from "react-router-dom";
import "../assets/styles/pages/detail.css";
import { useState } from "react";
import { useEffect } from "react";
import { fetchItemsByID } from "../data.js"; // Import the API function to fetch items

const Detail = () => {
  const { id } = useParams(); // Get the item ID from the route parameter
  const [item, setItem] = useState(null); // State to store the fetched item
  const [selectedImage, setSelectedImage] = useState(null); // State for the selected image
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  // Fetch the item details when the component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await fetchItemsByID(id); // Use the fetchItemsByID function
        setItem(data); // Set the fetched item in state
        setSelectedImage(data.images[0]); // Set the first image as the default selected image
      } catch (err) {
        setError(err.message); // Set the error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchItem();
  }, [id]);


  // Render loading, error, or the main content
  if (loading) {
    return <p>Loading item details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
              {item.images.map((image, index) => (
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