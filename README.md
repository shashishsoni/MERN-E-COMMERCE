KanjiAnime - Anime Merchandise E-Commerce Platform
KanjiAnime is an e-commerce platform dedicated to anime merchandise and collectibles. The platform offers users an intuitive and seamless shopping experience, showcasing various anime products with advanced features like a cart system, authentication, and promo code application.

Table of Contents
KanjiAnime - Anime Merchandise E-Commerce Platform
Table of Contents
Features
Tech Stack
Installation
Project Structure
Components
Context Management
Cart System
Authentication
API Services
License
Features
Display of anime products with images, descriptions, and categories.
Add products to the cart with quantity management.
Apply promo codes for discounts.
Calculate subtotal and grand total.
Authentication (Sign In, Sign Up).
Account management in the NavBar.
Ethereum Deposit Tracker (SDE Hiring Task).
Tech Stack
Frontend: React, TypeScript, Tailwind CSS
Backend: Node.js, Express, Mongoose
Authentication: Context API for user state management, JWT-based authentication
Cart Management: Custom context API for cart state management
Styling: Tailwind CSS
Ethereum Integration: ethers.js for blockchain interaction
Installation
You can install the dependencies using either npm or Yarn. Follow the instructions below to get started.

Using npm
Clone the repository:

bash
Copy code
git clone https://github.com/username/kanjianime.git
cd kanjianime
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the project root directory and add your MongoDB connection string, authentication secrets, and any other necessary configuration.

env
Copy code
MONGODB_URI=<your-mongo-db-connection-string>
JWT_SECRET=<your-jwt-secret>
ETHEREUM_NODE=<alchemy-or-other-node-url>
Start the development server:

bash
Copy code
npm start
Build the production version:

bash
Copy code
npm run build
Using Yarn
Clone the repository:

bash
Copy code
git clone https://github.com/username/kanjianime.git
cd kanjianime
Install dependencies:

bash
Copy code
yarn install
Set up environment variables:

Create a .env file in the project root directory and add your MongoDB connection string, authentication secrets, and any other necessary configuration.

env
Copy code
MONGODB_URI=<your-mongo-db-connection-string>
JWT_SECRET=<your-jwt-secret>
ETHEREUM_NODE=<alchemy-or-other-node-url>
Start the development server:

bash
Copy code
yarn start
Build the production version:

bash
Copy code
yarn build
Project Structure
plaintext
Copy code
src/
├── @types/
├── assets/
├── components/
│   ├── Navigation/
│   ├── Cart/
├── context/
│   ├── AppContext.tsx
├── pages/
│   ├── Home.tsx
│   ├── Cart.tsx
│   ├── SignIn.tsx
│   ├── SignUp.tsx
├── services/
│   ├── http.service.ts
├── utils/
│   ├── auth.util.ts
├── App.tsx
└── index.tsx
@types: Type definitions for products, user data, etc.
assets: Static images and assets for the website.
components: Reusable components like NavBar, Cart, etc.
context: Contains the global state management (AppContext.tsx).
pages: Main pages like Home, Cart, SignIn, and SignUp.
services: API service functions like getInventory for fetching product data.
utils: Utility functions for authentication and other common tasks.
Components
NavBar: Manages navigation and authentication states (Sign In, Sign Out, Sign Up).
Cart: Displays the list of items added to the cart with quantity management (increment, decrement).
ProductDisplay: Renders the products on the home page with add-to-cart functionality.
Context Management
We use the Context API to manage global states such as:

User Authentication: Handles user login, logout, and signup.
Cart Management: Handles adding, updating, and removing items in the shopping cart.
Example of using AppContext in Cart:
tsx
Copy code
const { Cart, setUserCart } = useAppContext();

const handleQuantityChange = (productId: string, quantityChange: number) => {
  setUserCart(
    Cart.map((item) =>
      item._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + quantityChange) }
        : item
    )
  );
};
Cart System
Initial Quantity: Products added to the cart start with a quantity of 1 by default.
Quantity Management: Users can increment or decrement the quantity of products in the cart, but it’s capped at a minimum of 1.
Add to Cart Functionality:
tsx
Copy code
onClick={() => {
  setUserCart((prev) => {
    const existingItem = prev.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      return prev.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      return [...prev, { ...item, quantity: 1 }];
    }
  });
}}
Authentication
The authentication system manages:

Sign Up: Registers a new user with additional fields like firstname, lastname, and confirmPassword.
Sign In: Authenticates users, and once logged in, the NavBar displays account options.
API Services
API service functions are located in services/http.service.ts, handling API requests such as fetching product inventory.

Example:
tsx
Copy code
export const getInventory = async () => {
  try {
    const response = await axios.get('/api/inventory');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
License
This project is licensed under the MIT License.
