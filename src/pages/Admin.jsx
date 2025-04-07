import { useState } from "react";
import items from "../data"; // Import the existing items array
import "../assets/styles/pages/Admin.css"; // Import your CSS file for styling

const Admin = () => {
  const [newItem, setNewItem] = useState({
    id: items.length + 1,
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

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

  const handleAddItem = (e) => {
    e.preventDefault();
    items.push({ ...newItem, price: parseFloat(newItem.price) });
    alert("Item added successfully!");
    setNewItem({
      id: items.length + 1,
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <form onSubmit={handleAddItem}>
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
            list="categories" // Link to the datalist
            required
          />
          <datalist id="categories">
            {categories.map((category, index) => (
              <option key={index} value={category} />
            ))}
          </datalist>
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={newItem.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default Admin;