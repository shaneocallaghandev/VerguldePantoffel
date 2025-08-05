import beeld1 from "./assets/images/beeld1.jpg";
import beeld2 from "./assets/images/beeld2.jpg";
import buffetkast1 from "./assets/images/buffetkast1.jpg";
import buffetkast2 from "./assets/images/buffetkast2.jpg";
import lamp1 from "./assets/images/lamp1.jpg";
import glazenStolp from "./assets/images/glazenStolp.jpg";
import glazenStolp1 from "./assets/images/glazenStolp1.jpg";
import glazenStolp2 from "./assets/images/glazenStolp2.jpg";
import glazenStolp3 from "./assets/images/glazenStolp3.jpg";
import degue from "./assets/images/degue.jpg";
import degue1 from "./assets/images/degue1.jpg";


const BACKEND_URL = "https://verguldepantoffelbe.onrender.com/api/items"; // Replace with your Render backend URL

const fetchItems = async () => {
  try {
    const response = await fetch(BACKEND_URL); // Fetch data from the backend
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Fetched items:", data); // Log the fetched items to the console
    return data; // Return the fetched items
  } catch (error) {
    console.error("Error fetching items:", error);
    return []; // Return an empty array in case of an error
  }
};

  // fetch and log items to the console when page loads 
  window.addEventListener("DOMContentLoaded", () => {
  fetchItems();
  });


  const fetchItemsByID = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/${id}`); // Fetch item by ID
      if (!response.ok) { 
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Parse the JSON response
      console.log("Fetched item by ID:", data); // Log the fetched item to the console    
      return data; // Return the fetched item
    } catch (error) {
      console.error("Error fetching item by ID:", error);
      return null; // Return null in case of an error
    } 
  };

// Define all items with a category property
const items = [
  {
    id: 1,
    name: "Beeld 1",
    image: [beeld1],
    description: "Een prachtig beeld.",
    price: 120.0,
    sold: false,
    category: "Beelden", // Category property
  },
  {
    id: 2,
    name: "Beeld 2",
    image: [beeld2],
    description: "Een prachtig beeld uit 1700 van een vrouw.",
    price: 150.0,
    sold: false,
    category: "Beelden", // Category property
  },
  {
    id: 3,
    name: "Buffetkast 1",
    image: [buffetkast1],
    description: "Een mooie buffetkast.",
    price: 300.0,
    sold: false,
    category: "Buffetkasten", // Category property
  },
  {
    id: 4,
    name: "Buffetkast 2",
    image: [buffetkast2],
    description: "Een mooie buffetkast uit zuid frankrijk.",
    price: 350.0,
    sold: false,
    category: "Buffetkasten", // Category property
  },
  {
    id:5,
    name: "Art Deco Lamp",
    image: [lamp1],
    description: "Een uitzonderlijke Art Déco hanglamp met drie hangkappen en een midden schotel in zacht oranje roze glas. De lamp heeft een ijzeren frame dat erg mooi is. Wil je de lamp hebben? Kom maar halen.",
    price: 200.0,
    sold: true,
    category: "Verlichting",
  },
  {
    id:6,
    name: "Glazen Stolp",
    image: [glazenStolp,glazenStolp1,glazenStolp2,glazenStolp3],
    description: "Retro geel glazen jaren vijftig stolp met schotel. Een vrolijke geel glazen boter of kaas stolp met schotel uit de jaren vijftig in perfecte staat. Diameter schotel 21 cm. diameter stolp 16.5cm. Hoogte ongeveer 9cm.",
    price: 50.0,
    sold: false,
    category: "Schalen/Servies"
  },
  {
    id: 7,
    name: "Degue Art-Déco Lamp",
    image: [degue,degue1],
    description: "Een puntgave helder blauwe art déco lamp met middenschotel en 3 kappen aan verchroomde armen.Frankrijk Degue 1930. De lamp is opnieuw bedraad heeft nieuwe fittingen.",
    price: 650.0,
    sold: false,
    category: "Verlichting",
  },
];

export default items;
export { fetchItems, fetchItemsByID }; // Export the fetchItems function for use in other components