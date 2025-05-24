// menuData.js

// ✅ Import Appetizer Images
import buffaloWingsImg from '../assets/Appetizer/A1-Chicken-Wings.png';
import bbqChickenImg from '../assets/Appetizer/A2-BBQ-Chicken-Boneless.png';
import beefFajitasImg from '../assets/Appetizer/A3-Beef-Fajitas.png';
import chickenFajitasImg from '../assets/Appetizer/A4-Chicken-Fajitas.png';
import chilliChickenImg from '../assets/Appetizer/A5-Chilli-Chicken.png';
import bonelessChickenImg from '../assets/Appetizer/A6-Crispy-Boneless-Chicken-Breast.avif'; // ⛔ was .avif

// 🛠 Replace remaining .avif with .png or .jpg versions

const menuData = [
  {
    category: "Appetizers",
    items: [
      {
        name: "Hot Buffalo Wings",
        price: "$12.95",
        description: "Crispy, spicy wings served with blue cheese dip.",
        image: buffaloWingsImg,
      },
      {
        name: "BBQ Chicken Wings",
        price: "$12.95",
        description: "Sweet and tangy BBQ sauce glazed wings.",
        image: bbqChickenImg,
      },
      {
        name: "Beef Fajitas",
        price: "$15.95",
        description: "Sizzling beef fajitas with peppers and onions.",
        image: beefFajitasImg,
      },
      {
        name: "Chicken Fajitas",
        price: "$14.95",
        description: "Tender chicken fajitas with seasoned veggies.",
        image: chickenFajitasImg,
      },
      {
        name: "Sweet Chili Chicken",
        price: "$15.95",
        description: "Crispy chicken tossed in a sweet and spicy chili sauce.",
        image: chilliChickenImg,
      },
      {
        name: "Crispy Boneless Chicken Breast",
        price: "$14.95",
        description: "Tender, crispy chicken breast served with house sauce.",
        image: bonelessChickenImg,
      },
      // ➕ continue with converted .png images
    ],
  },
  // ➕ Add soups, entrees, etc.
];

export default menuData;
