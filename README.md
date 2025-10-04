# 🍽️ Foodies – React Food Ordering App (Prototype)

Welcome to **Foodies**, a simple yet elegant food ordering application prototype built with **React.js**. This prototype simulates the core user experience of a modern food delivery platform — from browsing the menu and adding items to the cart, to placing an order and submitting a contact form.

---

## 🚀 Live Preview

Coming soon…

---

## 📦 Project Structure

```
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── Menu.js
│   ├── Cart.js
│   ├── FoodItem.js
│   ├── Contact.js
│   ├── styles.css
│   └── index.js
├── package.json
└── README.md
```

---

## ✨ Features

### 🌐 Navigation Bar

- Persistent navbar with app logo and links: `Home`, `Menu`, and `Contact`
- Screen-based navigation using React `useState` (no routing library)

### 🏠 Home Screen

- Welcome message and brand tagline
- “Start Ordering” button to enter the menu

### 📋 Menu Screen

- Displays a static list of food items (mock data)
- Each item shows: name, description, price, and "Add to Cart" button

### 🛒 Cart Section

- Real-time cart updates with added items
- Ability to remove individual items
- Displays total price and "Place Order" button

### ✅ Order Confirmation Screen

- Message confirming successful order
- Option to return to the menu and continue browsing

### 📞 Contact Page

- Contact form with fields: Name, Email, and Message
- Displays a thank-you message upon submission (mocked)

---

## 🎨 Tech Stack & Tools

- **React.js v18**
- **HTML5 + CSS3**
- Functional components with `useState`
- No external routing or backend integration

---

## 🎨 UI/UX Highlights

- Clean, responsive layout using Flexbox
- Aesthetic color palette:
  - Primary: `#ff6b6b`
  - Secondary: `#4ecdc4`
  - Background: `#f7f7f7`
- Smooth hover effects and consistent typography
- Card-based layout for menu and form sections

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/foodies-react-prototype.git
cd foodies-react-prototype
npm install
npm start
```

Then open your browser at: [http://localhost:3000](http://localhost:3000)

---

## 💡 Future Enhancements (Optional)

- Add routing via React Router
- Integrate backend for order and form handling
- Add user authentication and profile pages
- Dynamic categories, images, and search filter

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

Designed for prototyping and learning purposes. Inspired by the simplicity of food delivery apps like Foodpanda, Uber Eats, and DoorDash.

---

> Built with ❤️ using React.
