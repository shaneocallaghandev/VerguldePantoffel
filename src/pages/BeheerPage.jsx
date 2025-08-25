import { useEffect, useState } from "react";
import { fetchItems } from "../data"; // Import the fetchItems function
import "../assets/styles/pages/BeheerPage.css"; // Import your CSS file for styling
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../components/SortableItem"; // Custom component for sortable items

const BeheerPage = () => {
  const [items, setItems] = useState([]); // State to store fetched items
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors
  const [editingItem, setEditingItem] = useState(null); // State to track the item being edited
  const [formData, setFormData] = useState({}); // State to store form data
  const [imageOrder, setImageOrder] = useState([]); // State to track the order of images

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


  const handleEdit = (item) => {
    setEditingItem(item); // Set the item being edited
    setFormData(item); // Pre-fill the form with the item's details
    setImageOrder(item.images || []); // Initialize the image order with the item's images
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleDragEnd = (event) => {
  const { active, over } = event;

  if (active.id !== over.id) {
    const oldIndex = imageOrder.findIndex((image) => image === active.id);
    const newIndex = imageOrder.findIndex((image) => image === over.id);

    setImageOrder((prevOrder) => arrayMove(prevOrder, oldIndex, newIndex));
  }
};

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
       // Include the reordered images in the form data
      const updatedData = { ...formData, images: imageOrder };

      const response = await fetch(
        `https://verguldepantoffelbe.onrender.com/api/items/${editingItem._id}`,
        {
          method: "PATCH", // Use PATCH or PUT depending on your backend
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData), // Send the updated data
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await response.json();

      // Update the item's details in the state
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        )
      );

      alert("Item updated successfully!");
      setEditingItem(null); // Close the edit modal
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Failed to update item.");
    }
  };

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
    const item = items.find((item) => item._id === id);
    const updatedSoldStatus = !item.sold; // Toggle the sold status

    const response = await fetch(
      `https://verguldepantoffelbe.onrender.com/api/items/${id}`,
      {
        method: "PATCH", // Use PATCH or PUT depending on your backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sold: updatedSoldStatus }), // Update the sold status
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update item");
    }

    // Update the item's sold status in the state
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, sold: updatedSoldStatus } : item
      )
    );
    alert(`Item marked as ${updatedSoldStatus ? "sold" : "unsold"}!`);
  } catch (err) {
    console.error("Error updating item:", err);
    alert("Failed to update sold status.");
  }
};

  const handleToggleFavorite = async (id) => {
  try {
    const item = items.find((item) => item._id === id);
    const updatedFavoriteStatus = !item.favorite;

    const response = await fetch(
      `https://verguldepantoffelbe.onrender.com/api/items/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: updatedFavoriteStatus }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update favorite status");
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, favorite: updatedFavoriteStatus } : item
      )
    );
  } catch (err) {
    console.error("Error updating favorite status:", err);
    alert("Failed to update favorite status.");
  }
};

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Show an error message if fetching fails
  }

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
};

  return (
    <div className="test-page">
      <h1>Items Bewerken</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Titel</th>
            <th>Beschrijving</th>
            <th>Prijs</th>
            <th>Categorie</th>
            <th>Datum</th>
            <th>Acties</th>
            <th>Favoriet</th>
            <th>Verkocht</th>
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
              <td>{item.dateAdded ? formatDate(item.dateAdded) : "N/A"}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={item.favorite || false}
                  onChange={() => handleToggleFavorite(item._id)}
                />
              </td>
              <td>
                <input
                  type="checkbox" 
                  checked={item.sold || false}
                  onChange={() => handleSetAsSold(item._id)}          
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingItem && (
        <div className="edit-modal">
          <form onSubmit={handleFormSubmit}>
            <h2>Edit Item</h2>
            <label>
              Titel:
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleFormChange}
                maxLength={45}
              />
                {/* Show remaining characters only if the user has started typing */}
                {formData.name.length > 0 && (
                  <p>{45 - formData.name.length} tekens resterend</p>
                )}
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={formData.category || ""}
                onChange={handleFormChange}
              />
            </label>

            {/* Drag-and-Drop for Images */}
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={imageOrder} strategy={verticalListSortingStrategy}>
                <ul className="image-list">
                  {imageOrder.map((image) => (
                    <SortableItem key={image} id={image} image={image} />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>

            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingItem(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

export default BeheerPage;