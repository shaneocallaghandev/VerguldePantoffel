import { useState } from "react";
import "../assets/styles/pages/Admin.css"; // Import your CSS file for styling

const Admin = () => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  const categories = [
    "Beelden",
    "Buffetkasten",
    "Diversen",
    "Grafiek",
    "Haardplaten/ijzers",
    "Kandelaars",
    "Kasten",
    "Religieuze kunst/kruizen",
    "Retro/Vintage",
    "Schalen/Servies",
    "Sieraden",
    "Spiegels",
    "Tafels",
    "Tuin",
    "Vazen",
    "Verlichting",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleClearLastImage = () => {
    setNewItem((prev) => ({
      ...prev,
      images: prev.images.slice(0, -1), // Remove the last image from the array
    }));
  };


  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));

    try {
      setUploading(true);
      const response = await fetch("https://verguldepantoffelbe.onrender.com/api/items/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      const { imageUrls } = await response.json();
      setNewItem((prev) => ({
        ...prev,
        images: [...prev.images, ...imageUrls],
      }));
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.description || !newItem.price || !newItem.category) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("https://verguldepantoffelbe.onrender.com/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item");
      }

      alert("Item added successfully!");
      setNewItem({
        name: "",
        description: "",
        price: "",
        category: "",
        images: [],
      });
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <form onSubmit={handleAddItem} className="admin-form">
        {/* Left Section */}
        <div className="form-left">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={newItem.category}
              onChange={handleChange}
              list="categories"
              required
            />
            <datalist id="categories">
              {categories.map((category, index) => (
                <option key={index} value={category} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Right Section */}
        <div className="form-right">
          <div>
            <label>Upload Images:</label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
            />
            {uploading && <p>Uploading images...</p>}
            <ul>
              {newItem.images.map((url, index) => (
                <li key={index}>
                  <img src={url} alt={`Uploaded ${index}`} width="100" />
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={handleClearLastImage} className="clear-last-image-button"         >
            X</button>
          <button type="submit" className="add-item-button">Add Item</button>
        </div>
      </form>
    </div>
  );
};

export default Admin;