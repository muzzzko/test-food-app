import React from 'react';
import { 
  FaPizzaSlice, 
  FaHamburger, 
  FaIceCream, 
  FaFish, 
  FaAppleAlt,
  FaCookieBite,
  FaCoffee,
  FaWineGlassAlt,
  FaBreadSlice,
  FaDrumstickBite,
  FaCarrot,
  FaLemon,
  FaCheese,
  FaEgg,
  FaPepperHot
} from 'react-icons/fa';

// Function to get appropriate icon based on food name
const getFoodIcon = (name) => {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('pizza')) return <FaPizzaSlice className="food-icon" />;
  if (nameLower.includes('burger') || nameLower.includes('cheeseburger')) return <FaHamburger className="food-icon" />;
  if (nameLower.includes('ice cream') || nameLower.includes('dessert') || nameLower.includes('cake') || nameLower.includes('tiramisu') || nameLower.includes('cheesecake')) return <FaIceCream className="food-icon" />;
  if (nameLower.includes('fish') || nameLower.includes('sushi') || nameLower.includes('salmon') || nameLower.includes('tuna')) return <FaFish className="food-icon" />;
  if (nameLower.includes('salad') || nameLower.includes('vegetable') || nameLower.includes('veggie') || nameLower.includes('bowl')) return <FaCarrot className="food-icon" />;
  if (nameLower.includes('chicken') || nameLower.includes('wings') || nameLower.includes('drumstick')) return <FaDrumstickBite className="food-icon" />;
  if (nameLower.includes('bread') || nameLower.includes('toast') || nameLower.includes('sandwich')) return <FaBreadSlice className="food-icon" />;
  if (nameLower.includes('coffee') || nameLower.includes('latte') || nameLower.includes('cappuccino')) return <FaCoffee className="food-icon" />;
  if (nameLower.includes('wine') || nameLower.includes('beer') || nameLower.includes('drink')) return <FaWineGlassAlt className="food-icon" />;
  if (nameLower.includes('cheese') || nameLower.includes('dairy')) return <FaCheese className="food-icon" />;
  if (nameLower.includes('egg') || nameLower.includes('omelet')) return <FaEgg className="food-icon" />;
  if (nameLower.includes('spicy') || nameLower.includes('chili') || nameLower.includes('pepper')) return <FaPepperHot className="food-icon" />;
  if (nameLower.includes('lemon') || nameLower.includes('citrus')) return <FaLemon className="food-icon" />;
  if (nameLower.includes('apple') || nameLower.includes('fruit')) return <FaAppleAlt className="food-icon" />;
  if (nameLower.includes('cookie') || nameLower.includes('sweet')) return <FaCookieBite className="food-icon" />;
  
  // Default icon
  return <FaAppleAlt className="food-icon" />;
};

const FoodItem = ({ name, description, price, onAddToCart, image }) => {
  return (
    <div className="food-item">
      <div className="food-image-container">
        <img
          src={image}
          alt={name}
          className="food-thumbnail"
        />
        <div className="food-icon-overlay">
          {getFoodIcon(name)}
        </div>
      </div>
      <div className="food-content">
        <h3>{name}</h3>
        <p className="food-description">{description}</p>
        <div className="food-price">
          <span className="price-label">Price:</span>
          <span className="price-value">${price.toFixed(2)}</span>
        </div>
        <button className="add-to-cart-btn" onClick={onAddToCart}>
          <FaCookieBite className="btn-icon" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodItem;
