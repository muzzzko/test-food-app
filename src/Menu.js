import React, { useEffect, useState, useCallback } from 'react';
import FoodItem from './FoodItem';

// Simulate API configuration
const API_CONFIG = {
  baseUrl: 'https://api.foodies.com',
  endpoints: {
    menu: '/api/v1/menu',
    categories: '/api/v1/categories'
  },
  timeout: 5000
};

// Simulate API service
const apiService = {
  async fetchMenu() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    // Simulate occasional API failures (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('API Error: Unable to fetch menu items');
    }
    
    // Simulate API response structure
    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'Margherita Pizza',
          description: 'Classic pizza with fresh mozzarella and basil.',
          price: 12.99,
          image:
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 2,
          name: 'Cheeseburger',
          description: 'Juicy beef patty with cheese, lettuce, and tomato.',
          price: 10.99,
          image:
            'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 3,
          name: 'Caesar Salad',
          description: 'Crisp romaine lettuce with Caesar dressing and croutons.',
          price: 8.99,
          image:
            'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 4,
          name: 'Spaghetti Carbonara',
          description: 'Pasta with creamy sauce, pancetta, and parmesan.',
          price: 14.99,
          image:
            'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 5,
          name: 'Tiramisu',
          description: 'Classic Italian dessert with coffee and mascarpone.',
          price: 6.99,
          image:
            'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 6,
          name: 'Chicken Tikka Masala',
          description: 'Tender chicken in a spiced tomato cream sauce.',
          price: 13.49,
          image:
            'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 7,
          name: 'Sushi Platter',
          description: 'Assorted fresh sushi rolls and nigiri.',
          price: 18.99,
          image:
            'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 8,
          name: 'Vegan Buddha Bowl',
          description: 'Quinoa, chickpeas, roasted veggies, and tahini dressing.',
          price: 11.99,
          image:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 9,
          name: 'Pad Thai',
          description: 'Rice noodles, shrimp, peanuts, bean sprouts, and lime.',
          price: 12.49,
          image:
            'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 10,
          name: 'BBQ Ribs',
          description: 'Slow-cooked pork ribs with tangy BBQ sauce.',
          price: 16.99,
          image:
            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 11,
          name: 'Greek Salad',
          description: 'Tomatoes, cucumber, olives, feta, and olive oil.',
          price: 9.49,
          image:
            'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 12,
          name: 'Falafel Wrap',
          description: 'Crispy falafel, hummus, veggies, and tahini in pita.',
          price: 8.99,
          image:
            'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 13,
          name: 'Pepperoni Pizza',
          description: 'Mozzarella, tomato sauce, and spicy pepperoni.',
          price: 13.99,
          image:
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 14,
          name: 'Fish & Chips',
          description: 'Crispy battered fish with fries and tartar sauce.',
          price: 15.49,
          image:
            'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 15,
          name: 'Egg Fried Rice',
          description: 'Wok-fried rice with eggs, peas, and carrots.',
          price: 7.99,
          image:
            'https://images.unsplash.com/photo-1550547660-7a46a7cb9f9b?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 16,
          name: 'Buffalo Wings',
          description: 'Spicy chicken wings served with blue cheese dip.',
          price: 10.49,
          image:
            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 17,
          name: 'Miso Soup',
          description: 'Traditional Japanese soup with tofu and seaweed.',
          price: 4.99,
          image:
            'https://images.unsplash.com/photo-1604908813178-12f3e8c27bb8?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 18,
          name: 'Avocado Toast',
          description: 'Sourdough toast topped with smashed avocado and seeds.',
          price: 7.49,
          image:
            'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 19,
          name: 'Pancake Stack',
          description: 'Fluffy pancakes with maple syrup and berries.',
          price: 9.99,
          image:
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 20,
          name: 'Chocolate Lava Cake',
          description: 'Warm chocolate cake with a gooey molten center.',
          price: 6.49,
          image:
            'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 21,
          name: 'Chicken Alfredo',
          description: 'Fettuccine pasta tossed in creamy Alfredo sauce with grilled chicken.',
          price: 14.49,
          image:
            'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 22,
          name: 'Beef Tacos',
          description: 'Soft tortillas filled with seasoned beef, salsa, and cheese.',
          price: 9.99,
          image:
            'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 23,
          name: 'Veggie Burger',
          description: 'Plant-based patty with avocado, lettuce, tomato, and vegan mayo.',
          price: 11.49,
          image:
            'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 24,
          name: 'Pho Bo',
          description: 'Vietnamese beef noodle soup with herbs and lime.',
          price: 12.99,
          image:
            'https://images.unsplash.com/photo-1604908813178-12f3e8c27bb8?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 25,
          name: 'Ramen Bowl',
          description: 'Rich pork broth, noodles, chashu, egg, and scallions.',
          price: 13.99,
          image:
            'https://images.unsplash.com/photo-1604908813178-12f3e8c27bb8?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 26,
          name: 'Shrimp Scampi',
          description: 'Garlic butter shrimp served over linguine pasta.',
          price: 15.99,
          image:
            'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 27,
          name: 'Greek Gyro',
          description: 'Pita stuffed with seasoned meat, tomatoes, onions, and tzatziki.',
          price: 10.49,
          image:
            'https://images.unsplash.com/photo-1590845947670-c009801ffa74?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 28,
          name: 'Caprese Salad',
          description: 'Tomatoes, fresh mozzarella, basil, and balsamic glaze.',
          price: 8.49,
          image:
            'https://images.unsplash.com/photo-1568158879083-c4280a0b9a4b?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 29,
          name: 'Butter Chicken',
          description: 'Creamy tomato-based curry with tender chicken pieces.',
          price: 14.99,
          image:
            'https://images.unsplash.com/photo-1625944526115-3e2f8c0f3b68?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 30,
          name: 'Beef Bulgogi',
          description: 'Korean marinated beef with rice and kimchi.',
          price: 16.49,
          image:
            'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 31,
          name: 'Poke Bowl',
          description: 'Fresh tuna, rice, edamame, avocado, and sesame dressing.',
          price: 13.49,
          image:
            'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 32,
          name: 'Quattro Formaggi Pizza',
          description: 'Four-cheese blend on a crispy thin crust.',
          price: 14.99,
          image:
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 33,
          name: 'Nasi Goreng',
          description: 'Indonesian fried rice with chicken and fried egg.',
          price: 11.99,
          image:
            'https://images.unsplash.com/photo-1550547660-7a46a7cb9f9b?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 34,
          name: 'Burrito Bowl',
          description: 'Rice, beans, grilled chicken, salsa, and guacamole.',
          price: 12.49,
          image:
            'https://images.unsplash.com/photo-1552332386-0f52f88f1e4b?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 35,
          name: 'Clam Chowder',
          description: 'Creamy New England-style clam chowder with potatoes.',
          price: 7.99,
          image:
            'https://images.unsplash.com/photo-1544025162-4f1f2e0a3f4a?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 36,
          name: 'Chicken Caesar Wrap',
          description: 'Grilled chicken, romaine, parmesan, and Caesar dressing in a wrap.',
          price: 9.99,
          image:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 37,
          name: 'Penne Arrabbiata',
          description: 'Spicy tomato sauce with garlic and chili on penne pasta.',
          price: 11.49,
          image:
            'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 38,
          name: 'BBQ Chicken Pizza',
          description: 'Tangy BBQ sauce, grilled chicken, onions, and cilantro.',
          price: 13.99,
          image:
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 39,
          name: 'Spinach Artichoke Dip',
          description: 'Creamy spinach and artichoke dip served with tortilla chips.',
          price: 8.49,
          image:
            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 40,
          name: 'Cheesecake',
          description: 'Rich and creamy cheesecake with a graham cracker crust.',
          price: 6.99,
          image:
            'https://images.unsplash.com/photo-1541782814454-8b6b5d53f1b9?auto=format&fit=crop&w=400&q=80',
        },
      ],
      meta: {
        total: 40,
        page: 1,
        limit: 40,
        timestamp: new Date().toISOString()
      }
    };
  }
};

// Custom hook for API calls
const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.fetchMenu();
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error('Failed to fetch menu items');
      }
    } catch (err) {
      setError(err.message);
      console.error('API Error:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, refetch: fetchData };
};

const Menu = ({ cartItems = [], onAddToCart }) => {
  const { data: items, loading, error, refetch } = useApi();

  useEffect(() => {
    refetch();
  }, []); // Empty dependency array - only run once on mount

  const handleAddToCart = (item) => {
    onAddToCart(item);
    console.log('Added to cart:', item.name);
  };

  // Enhanced loading state
  if (loading) {
    return (
      <div className="menu">
        <h2>Menu</h2>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Fetching fresh menu items from our kitchen...</p>
          <small>API: {API_CONFIG.baseUrl}{API_CONFIG.endpoints.menu}</small>
        </div>
      </div>
    );
  }

  // Error state with retry functionality
  if (error) {
    return (
      <div className="menu">
        <h2>Menu</h2>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={refetch} className="retry-button">
            🔄 Try Again
          </button>
          <small>API: {API_CONFIG.baseUrl}{API_CONFIG.endpoints.menu}</small>
        </div>
      </div>
    );
  }

  return (
    <div className="menu">
      {cartItems.length > 0 && (
        <div className="cart-indicator">
          🛒 {cartItems.length} item(s) in cart
        </div>
      )}
      <div className="food-items">
        {items?.map((item) => (
          <FoodItem
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            onAddToCart={() => handleAddToCart(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
