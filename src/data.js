import beeld1 from "./assets/images/beeld1.jpg";
import beeld2 from "./assets/images/beeld2.jpg";
import buffetkast1 from "./assets/images/buffetkast1.jpg";
import buffetkast2 from "./assets/images/buffetkast2.jpg";
import lamp1 from "./assets/images/lamp1.jpg";

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
  }
];

export default items;