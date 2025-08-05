import { useState } from "react";
import "../assets/styles/pages/Admin.css"; // Import your CSS file for styling

const Admin = () => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
    favorite: false,
  });

  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]); // Store selected files before uploading
  const [previews, setPreviews] = useState([]); // Store image preview URLs

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

  const handleImageSelection = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
  
    // Append the new files to the existing files
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  
    // Generate preview URLs for the new files and append them to the existing previews
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
  };


  const handleClearLastImage = () => {
    setFiles((prevFiles) => prevFiles.slice(0, -1)); // Remove the last file
    setPreviews((prevPreviews) => prevPreviews.slice(0, -1)); // Remove the last preview
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.description || !newItem.price || !newItem.category) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setUploading(true);

    // Upload images first
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

      const uploadResponse = await fetch("https://verguldepantoffelbe.onrender.com/api/items/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload images");
      }

      console.log("uploadResponse", uploadResponse);

      const { imageUrls } = await uploadResponse.json();

      console.log("Uploaded Image URLs:", imageUrls);
      
      // Add the uploaded image URLs to the item
      const itemWithImages = { ...newItem, images: imageUrls };

      // Add the item to the database
      const response = await fetch("https://verguldepantoffelbe.onrender.com/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemWithImages),
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
        favorite: false,
      });
      setFiles([]); // Clear the selected files
      setPreviews([]); // Clear the previews
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <form onSubmit={handleAddItem} className="admin-form">
        {/* Left Section */}
        <div className="form-left">
          <div>
            <label>Titel:</label>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Beschrijving:</label>
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Prijs:</label>
            <input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Categorie:</label>
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
          <div>
            <label>Markeer als Favoriet:</label>
            <input
              type="checkbox"
              name="favorite"
              checked={newItem.favorite || false}
              onChange={(e) =>
                setNewItem({ ...newItem, favorite: e.target.checked })
              }
            />
          </div>
          <div className ="go-to-item-overview">
            <a href="/test" className="custom-button">Item Overview</a>
          </div>
        </div>

        {/* Right Section */}
        <div className="form-right">
          <div>
            <label>Upload Images:</label>
            <input
              type="file"
              multiple
              onChange={handleImageSelection}
            />
            {uploading && <p>Uploading images...</p>}
            <ul className="image-preview-list">
               {previews.map((preview, index) => (
                <li key={index} className="image-preview-item">
                  <img src={preview} alt={`Preview ${index}`} className="image-preview" />
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={handleClearLastImage} className="clear-last-image-button"         >
           Delete Image </button>
          <button type="submit" className="add-item-button">Add Item</button>
        </div>
      </form>
    </div>
  );
};

export default Admin;