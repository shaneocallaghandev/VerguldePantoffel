import { useEffect, useState } from "react";
import { fetchItems } from "../data"; // Import the fetchItems function
import "../assets/styles/pages/TestPage.css"; // Import your CSS file for styling

const TestPage = () => {
  const [items, setItems] = useState([]); // State to store fetched items
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const getItems = async () => {
      try {
        const fetchedItems = await fetchItems(); // Fetch items from the API
        setItems(fetchedItems); // Set the fetched items in state
      } catch (err) {
        setError(err.message); // Set the error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://verguldepantoffelbe.onrender.com/api/items/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Remove the deleted item from the state
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      alert("Item deleted successfully!");
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item.");
    }
  };

  const handleSetAsSold = async (id) => {
    try {
      const response = await fetch(
        `https://verguldepantoffelbe.onrender.com/api/items/${id}`,
        {
          method: "PATCH", // Use PATCH or PUT depending on your backend
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sold: true }), // Update the sold status
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      // Update the item's sold status in the state
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, sold: true } : item
        )
      );
      alert("Item marked as sold!");
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Failed to mark item as sold.");
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Show an error message if fetching fails
  }

  return (
    <div className="test-page">
      <h1>Items Bewerken</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="item-image"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>€{item.price}</td>
              <td>{item.category}</td>
              <td>{item.sold ? "Yes" : "No"}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => alert(`Edit item: ${item.name}`)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
                {!item.sold && (
                  <button
                    className="sold-button"
                    onClick={() => handleSetAsSold(item._id)}
                  >
                    Verkocht
                  </button>
                )}               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestPage;