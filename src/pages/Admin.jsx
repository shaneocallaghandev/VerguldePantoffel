import { useState, useEffect } from "react";
import { WithContext as ReactTags } from 'react-tag-input';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../components/SortableItem";
import "../assets/styles/pages/Admin.css"; // Import your CSS file for styling

const Admin = () => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: [],
    images: [],
    favorite: false,
  });

  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]); // Store selected files before uploading
  const [previews, setPreviews] = useState([]); // Store image preview URLs
  const [categoryTags, setCategoryTags] = useState([]);

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
  // Categories
      // Convert tags to array of strings for newItem
      useEffect(() => {
        setNewItem(prev => ({
          ...prev,
          category: categoryTags.map(tag => tag.text)
        }));
      }, [categoryTags]);

      const handleDelete = i => {
        setCategoryTags(categoryTags.filter((tag, index) => index !== i));
      };

      const handleAddition = tag => {
        // Capitalize first letter
        const formattedTag = tag.text.charAt(0).toUpperCase() + tag.text.slice(1);
        // Prevent duplicates
        if (!categoryTags.some(t => t.text === formattedTag)) {
          setCategoryTags([...categoryTags, { id: formattedTag, text: formattedTag }]);
        }
      };


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Capitalize the first letter of the category
    const formattedValue =
    name === "category" ? value.charAt(0).toUpperCase() + value.slice(1) : value;

    setNewItem({ ...newItem, [name]: formattedValue });
  };

  const handleImageSelection = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
  
    // Append the new files to the existing files
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  
    // Generate preview URLs for the new files and append them to the existing previews
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
  };


  const handleRemoveImage = (previewUrl) => {
    const index = previews.indexOf(previewUrl);
    if (index === -1) return;
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = previews.indexOf(active.id);
      const newIndex = previews.indexOf(over.id);
      setFiles((prev) => arrayMove(prev, oldIndex, newIndex));
      setPreviews((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.description || !newItem.price || !newItem.category.length) {
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
        category: [],
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
 
      <div className ="go-to-beheer">
        <a href="/beheer" className="custom-button">Naar Beheer</a>
      </div>

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
              maxLength="45"
              required
            />
          {/* Show remaining characters only if the user has started typing */}
          {newItem.name.length > 0 && (
            <p>{45 - newItem.name.length} tekens resterend</p>
          )}
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
            <label>Categorie(ën):</label>
            <ReactTags
              tags={categoryTags}
              suggestions={categories.map(cat => ({ id: cat, text: cat }))}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              placeholder="Kies uit de lijst of typ en druk op enter"
              allowNew
            />
                  {/* Custom tag layout */}
            <div className="category-tags-container">
              {categoryTags.map((tag, idx) => (
                <span className="category-tag" key={idx}>
                  {tag.text}
                  <button
                    type="button"
                    className="category-tag-remove"
                    onClick={() => handleDelete(idx)}
                    aria-label={`Verwijder ${tag.text}`}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
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
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={previews} strategy={horizontalListSortingStrategy}>
                <ul className="image-preview-list">
                  {previews.map((preview) => (
                    <SortableItem key={preview} id={preview} image={preview} onRemove={handleRemoveImage} />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </div>
            <button type="submit" className="add-item-button">Add Item</button>

          <div className ="category-list-info">
            <h6>Beschikbare Categorieën:</h6>
            <ul>
              {categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Admin;