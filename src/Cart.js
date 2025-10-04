import React, { useState } from 'react';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaCreditCard } from 'react-icons/fa';

const Cart = ({ cartItems = [], onUpdateCart, onRemoveFromCart, onClearCart }) => {
  // Aggregate items by ID
  const aggregatedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(accItem => accItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
    } else {
      acc.push({
        ...item,
        quantity: 1,
        totalPrice: item.price
      });
    }
    return acc;
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      onRemoveFromCart(itemId);
      return;
    }
    
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const currentQuantity = aggregatedItems.find(agg => agg.id === itemId)?.quantity || 0;
      const difference = newQuantity - currentQuantity;
      
      if (difference > 0) {
        // Add items
        for (let i = 0; i < difference; i++) {
          onUpdateCart(item);
        }
      } else if (difference < 0) {
        // Remove items
        for (let i = 0; i < Math.abs(difference); i++) {
          onRemoveFromCart(itemId);
        }
      }
    }
  };

  const calculateTotal = () => {
    return aggregatedItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    alert(`Order placed! Total: $${calculateTotal()}\nThank you for your order!`);
    onClearCart();
  };

  if (aggregatedItems.length === 0) {
    return (
      <div className="cart">
        <div className="cart-header">
          <h2>🛒 Your Cart</h2>
        </div>
        <div className="empty-cart">
          <FaShoppingCart className="empty-cart-icon" />
          <h3>Your cart is empty</h3>
          <p>Add some delicious items from our menu!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>🛒 Your Cart</h2>
        <p>{aggregatedItems.length} unique item(s) • {cartItems.length} total items</p>
      </div>

      <div className="cart-items">
        {aggregatedItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <p className="item-price">${item.price.toFixed(2)} each</p>
            </div>

            <div className="quantity-controls">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="quantity-btn"
                disabled={item.quantity <= 1}
              >
                <FaMinus />
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="quantity-btn"
              >
                <FaPlus />
              </button>
            </div>

            <div className="item-total">
              <span className="total-price">${item.totalPrice.toFixed(2)}</span>
              <button 
                onClick={() => onRemoveFromCart(item.id)}
                className="remove-btn"
                title="Remove all"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${calculateTotal()}</span>
        </div>
        <div className="summary-row">
          <span>Tax (8.5%):</span>
          <span>${(calculateTotal() * 0.085).toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${(parseFloat(calculateTotal()) * 1.085).toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-actions">
        <button onClick={onClearCart} className="clear-cart-btn">
          Clear Cart
        </button>
        <button onClick={handlePlaceOrder} className="place-order-btn">
          <FaCreditCard />
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
