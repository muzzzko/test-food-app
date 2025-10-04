import React, { useState } from 'react';
import Menu from './Menu';
import Cart from './Cart';
import Contact from './Contact';

function App() {
  const [screen, setScreen] = useState('home');
  const [cartItems, setCartItems] = useState([]);

  const navItems = [
    { label: 'Home', value: 'home' },
    { label: 'Menu', value: 'menu' },
    { label: 'Cart', value: 'cart' },
    { label: 'Contact', value: 'contact' },
  ];

  // Cart management functions
  const addToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        const newItems = [...prevItems];
        newItems.splice(itemIndex, 1);
        return newItems;
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'menu':
        return <Menu cartItems={cartItems} onAddToCart={addToCart} />;
      case 'cart':
        return (
          <Cart 
            cartItems={cartItems} 
            onUpdateCart={addToCart}
            onRemoveFromCart={removeFromCart}
            onClearCart={clearCart}
          />
        );
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return (
          <div className="home">
            <div className="home-hero">
              <div className="hero-content">
                <h1>Welcome to Foodies!</h1>
                <p className="hero-subtitle">Your favorite food ordering app</p>
                <p className="hero-description">
                  Discover delicious meals from our carefully curated menu. 
                  Order with ease and enjoy fast delivery to your doorstep.
                </p>
                <button 
                  onClick={() => setScreen('menu')} 
                  className="cta-button"
                >
                  🍽️ Start Ordering
                </button>
              </div>
            </div>
            
            <div className="home-features">
              <div className="feature-card">
                <div className="feature-icon">🚚</div>
                <h3>Fast Delivery</h3>
                <p>Get your food delivered in 30 minutes or less</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🍕</div>
                <h3>Fresh Ingredients</h3>
                <p>Only the finest, freshest ingredients in every dish</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⭐</div>
                <h3>Top Rated</h3>
                <p>Rated 4.9/5 by thousands of satisfied customers</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <header className="app-header">
        <div className="header-container">
          <div className="logo">
            Foodies
          </div>
          <nav>
            <ul className="nav-list">
              {navItems.map((item) => (
                <li
                  key={item.value}
                  className={`nav-item ${screen === item.value ? 'active' : ''}`}
                  onClick={() => setScreen(item.value)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main style={{ padding: '32px' }}>{renderScreen()}</main>
    </div>
  );
}

export default App;
