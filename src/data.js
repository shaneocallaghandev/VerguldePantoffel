import beeld1 from "./assets/images/beeld1.jpg";
import beeld2 from "./assets/images/beeld2.jpg";
import buffetkast1 from "./assets/images/buffetkast1.jpg";
import buffetkast2 from "./assets/images/buffetkast2.jpg";

const categories = [
  {
    name: "Beelden",
    items: [
      {
        id: 1,
        name: "Beeld 1",
        image: beeld1, // Use the imported image
        description: "Een prachtig beeld.",
        price: 120.0,
      },
      {
        id: 2,
        name: "Beeld 2",
        image: beeld2,
        description: "Een ander prachtig beeld.",
        price: 150.0,
      },
    ],
  },
  {
    name: "Buffetkasten",
    items: [
      {
        id: 3,
        name: "Buffetkast 1",
        image: buffetkast1,
        description: "Een mooie buffetkast.",
        price: 300.0,
      },
      {
        id: 4,
        name: "Buffetkast 2",
        image: buffetkast2,
        description: "Een andere mooie buffetkast.",
        price: 350.0,
      },
    ],
  },
];

export default categories;